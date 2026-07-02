/**
 * neuroplasticity.js — the v2.0 nightly consolidation cycle.
 *
 * What a brain does in sleep, the OS does here:
 *   1. DEDUPE   — collapse duplicate learnings in intelligence_graph
 *   2. PRUNE    — drop learning chunks whose client_context was deleted
 *   3. COMPACT  — VACUUM the database
 *   4. STAMP    — record neuro.lastCycleAt in operator_preferences
 *
 * Scheduling reality (honest engineering): an MCP stdio server only lives
 * while a session is open, so a literal 3 a.m. timer would almost never
 * fire. Instead:
 *   - maybeRunCycle() runs at server startup when the last cycle is > 24h
 *     old (servers boot daily in practice — that IS the nightly cycle), and
 *   - run_neuroplasticity_cycle (MCP tool) / `npm run neuro-cycle` allow
 *     explicit runs, e.g. from an n8n schedule (automation/n8n/).
 */

import { getDb, getPreference, setPreference, memoryUnavailableReason } from "./memory.js";
import { synapse } from "./synapse.js";

const CYCLE_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24h

/** Run the consolidation cycle now. Returns a report. */
export function runCycle() {
  const unavailable = memoryUnavailableReason();
  if (unavailable) return { ran: false, reason: unavailable };

  const db = getDb();

  // 1. DEDUPE — identical content within the same source keeps one copy.
  const dupes = db
    .prepare(
      `SELECT rowid FROM intelligence_graph
       WHERE rowid NOT IN (
         SELECT MIN(rowid) FROM intelligence_graph GROUP BY source, content
       )`
    )
    .all();
  for (const d of dupes) {
    db.prepare("DELETE FROM intelligence_graph WHERE rowid = ?").run(d.rowid);
  }

  // 2. PRUNE — learning chunks for clients that no longer have any context.
  const orphans = db
    .prepare(
      `SELECT DISTINCT source FROM intelligence_graph
       WHERE source LIKE 'learning/%'
         AND substr(source, 10) NOT IN (SELECT DISTINCT client FROM client_context)`
    )
    .all();
  let pruned = 0;
  for (const o of orphans) {
    const r = db.prepare("SELECT count(*) AS n FROM intelligence_graph WHERE source = ?").get(o.source).n;
    db.prepare("DELETE FROM intelligence_graph WHERE source = ?").run(o.source);
    pruned += r;
  }

  // 3. COMPACT
  db.exec("VACUUM");

  // 4. STAMP
  const at = new Date().toISOString();
  setPreference("neuro.lastCycleAt", at);

  const report = { ran: true, at, deduped: dupes.length, prunedOrphanChunks: pruned };
  synapse.fire("neuro:cycle-complete", report);
  return report;
}

/** Startup hook: run the cycle only when the last one is > 24h old. */
export function maybeRunCycle() {
  if (memoryUnavailableReason()) return { ran: false, reason: "memory unavailable" };
  const last = getPreference("neuro.lastCycleAt");
  if (last && Date.now() - Date.parse(last) < CYCLE_INTERVAL_MS) {
    return { ran: false, reason: `last cycle ${last} is < 24h old` };
  }
  return runCycle();
}
