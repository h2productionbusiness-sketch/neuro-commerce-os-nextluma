/**
 * neuro-tools.js — the v2.0 NeuroSystem memory tools.
 *
 *   store_learning   — persist a validated learning; becomes RAG-searchable
 *   prime_context    — session-start brief: facts + learnings + prefs + run state
 *   override_memory  — operator correction: set/delete a fact or preference
 *   run_neuroplasticity_cycle — consolidation (dedupe/prune/vacuum) on demand
 *
 * All storage lives in neuro-memory.db (schema created by lib/memory.js in
 * Step 2). Learnings are double-written: a client_context fact for the
 * ledger, AND an intelligence_graph chunk so future sessions FIND them by
 * meaning, not by key.
 */

import {
  getDb,
  memoryUnavailableReason,
  setPreference,
  setClientFact,
  getClientContext,
  insertChunks,
  searchIntelligence,
} from "./memory.js";
import { loadState } from "./state.js";
import { synapse } from "./synapse.js";
import { runCycle } from "./neuroplasticity.js";

const json = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });

const guard = () => {
  const reason = memoryUnavailableReason();
  return reason ? { available: false, reason } : null;
};

/* ---------------------------------------------------------------------- */

export function storeLearning({ client, category = "general", learning, source = "operator" }) {
  const blocked = guard();
  if (blocked) return blocked;

  const clean = String(learning ?? "").trim();
  if (clean.length < 15) {
    return { stored: false, reason: `Learning too thin (${clean.length} chars < 15) — store validated insights, not fragments.` };
  }

  const key = `learning:${category}:${Date.now()}`;
  setClientFact(client, key, clean);
  insertChunks([
    { content: `[${category}] ${clean}`, source: `learning/${client}`, phase: category, chunkIndex: key },
  ]);

  synapse.fire("learning:stored", { client, category });
  return { stored: true, client, category, key, ragSearchable: true };
}

export function primeContext({ client }) {
  const blocked = guard();
  if (blocked) return blocked;

  const facts = getClientContext(client);
  const learnings = facts.filter((f) => f.key.startsWith("learning:"));
  const plain = facts.filter((f) => !f.key.startsWith("learning:"));

  const db = getDb();
  const prefs = db.prepare("SELECT key, value FROM operator_preferences ORDER BY key").all();

  let run = null;
  try {
    const s = loadState();
    if (s.active) {
      const phase = s.phases[s.currentPhase];
      const step = phase.steps[s.currentStepIndex] ?? null;
      run = {
        client: s.engagement.client,
        blueprint: s.engagement.blueprint,
        phase: s.currentPhase,
        progress: `${phase.steps.filter((x) => x.status === "completed").length}/${phase.steps.length}`,
        currentStep: step ? { id: step.id, section: step.section } : "phase complete",
      };
    }
  } catch { /* run-state unreadable — omit */ }

  return {
    client,
    facts: plain.map((f) => ({ [f.key]: f.value })),
    learnings: learnings.slice(-10).map((l) => l.value),
    operatorPreferences: Object.fromEntries(prefs.map((p) => [p.key, p.value])),
    activeRun: run,
    recentSynapseEvents: synapse.recent(5).map((e) => `${e.at} ${e.type}`),
    protocol: "Treat these as established facts — do NOT re-ask the client for any of them.",
  };
}

export function overrideMemory({ scope = "client", client, key, value, action = "set" }) {
  const blocked = guard();
  if (blocked) return blocked;

  const db = getDb();
  if (scope === "operator") {
    if (action === "delete") {
      db.prepare("DELETE FROM operator_preferences WHERE key = ?").run(key);
    } else {
      setPreference(key, value);
    }
  } else {
    if (!client) return { done: false, reason: "client is required for scope=client" };
    if (action === "delete") {
      db.prepare("DELETE FROM client_context WHERE client = ? AND key = ?").run(client, key);
      // learnings also leave the RAG index so they cannot resurface
      if (key.startsWith("learning:")) {
        db.prepare("DELETE FROM intelligence_graph WHERE source = ? AND chunk_index = ?").run(`learning/${client}`, key);
      }
    } else {
      setClientFact(client, key, value);
    }
  }

  synapse.fire("memory:overridden", { scope, key, action });
  return { done: true, scope, key, action, note: "Operator override is final — the OS will not re-learn a deleted fact from stale context." };
}

/* ---------------------------------------------------------------------- */

export const NEURO_TOOLS = [
  {
    name: "store_learning",
    description:
      "NEUROSYSTEM. Persist a validated learning (hook result, persona correction, market insight) to neuro-memory.db. Double-written: client_context ledger + intelligence_graph (FTS5) so future sessions retrieve it by MEANING via RAG. Fires learning:stored on the Synapse.",
    inputSchema: {
      type: "object",
      properties: {
        client: { type: "string", description: "Client this learning belongs to." },
        category: { type: "string", description: "Category: hooks | persona | market | economics | creative | general." },
        learning: { type: "string", description: "The validated insight (>= 15 chars). State it as a reusable fact." },
        source: { type: "string", description: "Where it came from (campaign id, experiment, operator)." },
      },
      required: ["client", "learning"],
    },
    handler: async (a) => json(storeLearning(a)),
  },
  {
    name: "prime_context",
    description:
      "NEUROSYSTEM. Call at SESSION START (the Orchestrator's first move): returns the client's established facts, last 10 learnings, operator preferences, active run-state position, and recent Synapse events — so the OS never re-asks what it already knows.",
    inputSchema: {
      type: "object",
      properties: { client: { type: "string", description: "Client to prime for." } },
      required: ["client"],
    },
    handler: async (a) => json(primeContext(a)),
  },
  {
    name: "override_memory",
    description:
      "NEUROSYSTEM. Operator correction with final authority: set or delete a client fact / operator preference. Deleting a learning also removes it from the RAG index so it cannot resurface. Fires memory:overridden on the Synapse.",
    inputSchema: {
      type: "object",
      properties: {
        scope: { type: "string", enum: ["client", "operator"], description: "client_context or operator_preferences." },
        client: { type: "string", description: "Required when scope=client." },
        key: { type: "string", description: "Fact/preference key (e.g. 'primary-market' or 'learning:hooks:...')." },
        value: { type: "string", description: "New value (action=set)." },
        action: { type: "string", enum: ["set", "delete"], description: "Default: set." },
      },
      required: ["key"],
    },
    handler: async (a) => json(overrideMemory(a)),
  },
  {
    name: "run_neuroplasticity_cycle",
    description:
      "NEUROSYSTEM. Run the consolidation cycle now: dedupe identical learnings, prune orphaned learning chunks, VACUUM the DB, stamp neuro.lastCycleAt. Auto-runs at server startup when the last cycle is > 24h old; also schedulable via n8n or `npm run neuro-cycle`.",
    inputSchema: { type: "object", properties: {} },
    handler: async () => json(runCycle()),
  },
];
