/**
 * memory.js — the Neuro-Commerce OS memory core (v2.0).
 *
 * SQLite-backed persistent memory ("neuro-memory.db") with three tables:
 *   1. operator_preferences  — key/value prefs of the human operator
 *   2. client_context        — per-client facts, decisions, deliverable state
 *   3. intelligence_graph    — FTS5 full-text index of ingested source docs (RAG)
 *
 * Uses Node's BUILT-IN sqlite (node:sqlite, Node >= 22.5) — deliberately NOT the
 * native `sqlite3` npm package: this repo commits node_modules so the plugin runs
 * out-of-the-box cross-platform, and native binaries would lock it to one OS/arch.
 * If the runtime lacks node:sqlite, every export degrades gracefully with a clear
 * reason instead of crashing the MCP server.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Default DB location: mcp-server/neuro-memory.db (gitignored via *.db). */
export const DB_PATH =
  process.env.NEURO_MEMORY_DB ||
  path.join(__dirname, "..", "..", "neuro-memory.db");

let _db = null;
let _unavailable = null; // string reason when sqlite is not usable

/** Why memory is unavailable (null when everything is fine). */
export function memoryUnavailableReason() {
  if (_db) return null;
  if (_unavailable) return _unavailable;
  probe();
  return _unavailable;
}

function probe() {
  try {
    const sqlite = process.getBuiltinModule?.("node:sqlite");
    if (!sqlite?.DatabaseSync) {
      _unavailable =
        "node:sqlite is not available — Node >= 22.5 required (found " +
        process.version +
        "). Memory/RAG tools are disabled; everything else still works.";
    }
  } catch (err) {
    _unavailable = "node:sqlite probe failed: " + err.message;
  }
}

/** Open (or return the cached) database, creating the schema on first use. */
export function getDb() {
  if (_db) return _db;
  const sqlite = process.getBuiltinModule?.("node:sqlite");
  if (!sqlite?.DatabaseSync) {
    probe();
    throw new Error(_unavailable || "node:sqlite unavailable");
  }
  const db = new sqlite.DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS operator_preferences (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS client_context (
      client     TEXT NOT NULL,
      key        TEXT NOT NULL,
      value      TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (client, key)
    );
    CREATE VIRTUAL TABLE IF NOT EXISTS intelligence_graph USING fts5(
      content,
      source      UNINDEXED,
      phase       UNINDEXED,
      chunk_index UNINDEXED,
      ingested_at UNINDEXED
    );
  `);
  _db = db;
  return _db;
}

/* ---------------------------------------------------------------------- */
/* intelligence_graph (RAG)                                               */
/* ---------------------------------------------------------------------- */

/**
 * Remove all chunks previously ingested from `source` (idempotent re-ingest).
 * @returns {number} rows deleted
 */
export function clearSource(source) {
  const db = getDb();
  const before = db
    .prepare("SELECT count(*) AS n FROM intelligence_graph WHERE source = ?")
    .get(source).n;
  db.prepare("DELETE FROM intelligence_graph WHERE source = ?").run(source);
  return before;
}

/**
 * Insert document chunks into the intelligence graph.
 * @param {Array<{content:string, source:string, phase:string, chunkIndex:number}>} chunks
 * @returns {number} rows inserted
 */
export function insertChunks(chunks) {
  const db = getDb();
  const now = new Date().toISOString();
  const stmt = db.prepare(
    "INSERT INTO intelligence_graph (content, source, phase, chunk_index, ingested_at) VALUES (?, ?, ?, ?, ?)"
  );
  let n = 0;
  for (const c of chunks) {
    stmt.run(c.content, c.source, c.phase ?? "general", String(c.chunkIndex ?? n), now);
    n++;
  }
  return n;
}

/** Escape a free-text query into a safe FTS5 MATCH expression (implicit AND). */
function toFtsQuery(query) {
  const tokens = String(query)
    .split(/\s+/)
    .map((t) => t.replace(/["']/g, "").trim())
    .filter(Boolean);
  if (!tokens.length) return null;
  return tokens.map((t) => `"${t}"`).join(" ");
}

/**
 * Full-text search over ingested knowledge. Returns ranked snippets — the RAG
 * retrieval surface every tool should use instead of reading whole documents.
 * @param {string} query
 * @param {{phase?:string, limit?:number}} [opts]
 */
export function searchIntelligence(query, opts = {}) {
  const db = getDb();
  const fts = toFtsQuery(query);
  if (!fts) return [];
  const limit = Math.min(Math.max(opts.limit ?? 8, 1), 50);
  const where = opts.phase ? "AND phase = ?" : "";
  const params = opts.phase ? [fts, opts.phase, limit] : [fts, limit];
  return db
    .prepare(
      `SELECT
         snippet(intelligence_graph, 0, '>>', '<<', ' … ', 24) AS snippet,
         content, source, phase, chunk_index AS chunkIndex,
         round(bm25(intelligence_graph), 4) AS rank
       FROM intelligence_graph
       WHERE intelligence_graph MATCH ? ${where}
       ORDER BY bm25(intelligence_graph)
       LIMIT ?`
    )
    .all(...params);
}

/** Corpus stats: total chunks + breakdown per source and per phase. */
export function graphStats() {
  const db = getDb();
  const total = db.prepare("SELECT count(*) AS n FROM intelligence_graph").get().n;
  const bySource = db
    .prepare(
      "SELECT source, count(*) AS chunks FROM intelligence_graph GROUP BY source ORDER BY source"
    )
    .all();
  const byPhase = db
    .prepare(
      "SELECT phase, count(*) AS chunks FROM intelligence_graph GROUP BY phase ORDER BY phase"
    )
    .all();
  return { dbPath: DB_PATH, totalChunks: total, bySource, byPhase };
}

/* ---------------------------------------------------------------------- */
/* operator_preferences + client_context (used by the Step-6 memory tools) */
/* ---------------------------------------------------------------------- */

export function setPreference(key, value) {
  getDb()
    .prepare(
      `INSERT INTO operator_preferences (key, value, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
    )
    .run(key, String(value));
}

export function getPreference(key) {
  return (
    getDb().prepare("SELECT value FROM operator_preferences WHERE key = ?").get(key)
      ?.value ?? null
  );
}

export function setClientFact(client, key, value) {
  getDb()
    .prepare(
      `INSERT INTO client_context (client, key, value, updated_at)
       VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(client, key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
    )
    .run(client, key, String(value));
}

export function getClientContext(client) {
  return getDb()
    .prepare(
      "SELECT key, value, updated_at FROM client_context WHERE client = ? ORDER BY key"
    )
    .all(client);
}
