#!/usr/bin/env node
/**
 * ingest.js — RAG ingestion pipeline (v2.0).
 *
 * Reads heavy source documents (.docx via mammoth; .txt/.md when passed
 * explicitly), chunks them paragraph-aware (~1100 chars, 150-char overlap),
 * and inserts them into the intelligence_graph FTS5 table in neuro-memory.db.
 *
 * The Token Shield (.claudesignore / settings.json deny rules) blocks Claude
 * from reading these documents directly — THIS pipeline is the only doorway:
 * raw docs go in once, and tools retrieve small ranked snippets via
 * searchIntelligence() instead of burning context on whole files.
 *
 * Usage:
 *   node mcp-server/src/ingest.js                     # ingest knowledge/raw_docs/
 *   node mcp-server/src/ingest.js <dir-or-file> ...   # ingest specific paths
 *
 * Idempotent: re-ingesting a file first deletes its previous chunks.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mammoth from "mammoth";
import {
  clearSource,
  insertChunks,
  graphStats,
  memoryUnavailableReason,
  DB_PATH,
} from "./lib/memory.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(__dirname, "..", "..");
const DEFAULT_DIR = path.join(PLUGIN_ROOT, "knowledge", "raw_docs");

const CHUNK_MAX = 1100; // target chunk size (chars)
const CHUNK_OVERLAP = 150; // trailing overlap carried into the next chunk

/* ---------------------------------------------------------------------- */

/** Infer the OS phase from a filename so retrieval can filter by phase. */
function inferPhase(filename) {
  const f = filename.toLowerCase();
  if (/phase[-_ ]?1|bible|diagnostic|persona/.test(f)) return "phase-1";
  if (/phase[-_ ]?2|brand|semiotic|identity/.test(f)) return "phase-2";
  if (/phase[-_ ]?3|content|kontent|inception|script/.test(f)) return "phase-3";
  if (/phase[-_ ]?4|ads|meta|campaign/.test(f)) return "phase-4";
  if (/phase[-_ ]?5|growth|predictive|learning/.test(f)) return "phase-5";
  return "general";
}

/**
 * Paragraph-aware chunker: packs whole paragraphs up to CHUNK_MAX chars,
 * carrying a CHUNK_OVERLAP tail forward so no idea is cut mid-context.
 */
export function chunkText(text) {
  const paragraphs = text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 0);

  const chunks = [];
  let current = "";

  const flush = () => {
    if (current.trim().length >= 20) chunks.push(current.trim());
    current = current.length > CHUNK_OVERLAP ? current.slice(-CHUNK_OVERLAP) : "";
  };

  for (const para of paragraphs) {
    if (para.length > CHUNK_MAX) {
      // Oversized paragraph: hard-split on sentence boundaries.
      flush();
      let rest = para;
      while (rest.length > CHUNK_MAX) {
        let cut = rest.lastIndexOf(". ", CHUNK_MAX);
        if (cut < CHUNK_MAX * 0.5) cut = CHUNK_MAX;
        chunks.push(rest.slice(0, cut + 1).trim());
        rest = rest.slice(Math.max(cut + 1 - CHUNK_OVERLAP, 0));
      }
      current = rest;
      continue;
    }
    if (current.length + para.length + 1 > CHUNK_MAX) flush();
    current = current ? current + "\n" + para : para;
  }
  if (current.trim().length >= 20) chunks.push(current.trim());
  return chunks;
}

/** Extract plain text from a source file. */
async function extractText(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".docx") {
    const { value } = await mammoth.extractRawText({ path: file });
    return value;
  }
  if (ext === ".txt" || ext === ".md") {
    return fs.readFileSync(file, "utf8");
  }
  throw new Error(`unsupported file type: ${ext}`);
}

/** Collect ingestible files: directories yield .docx only; explicit files may be .docx/.txt/.md. */
function collectFiles(targets) {
  const files = [];
  for (const t of targets) {
    const abs = path.resolve(t);
    if (!fs.existsSync(abs)) {
      console.error(`  ! skipped (not found): ${t}`);
      continue;
    }
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(abs)) {
        if (entry.toLowerCase().endsWith(".docx") && !entry.startsWith("~$")) {
          files.push(path.join(abs, entry));
        }
      }
    } else if (/\.(docx|txt|md)$/i.test(abs)) {
      files.push(abs);
    } else {
      console.error(`  ! skipped (unsupported type): ${t}`);
    }
  }
  return files;
}

/* ---------------------------------------------------------------------- */

async function main() {
  const unavailable = memoryUnavailableReason();
  if (unavailable) {
    console.error("MEMORY UNAVAILABLE: " + unavailable);
    process.exit(1);
  }

  const targets = process.argv.slice(2).length ? process.argv.slice(2) : [DEFAULT_DIR];
  console.log(`Neuro-Commerce OS — RAG ingestion`);
  console.log(`DB: ${DB_PATH}`);

  const files = collectFiles(targets);
  if (!files.length) {
    console.log("Nothing to ingest (no .docx found in target paths).");
    process.exit(0);
  }

  let totalChunks = 0;
  for (const file of files) {
    const source = path.relative(PLUGIN_ROOT, file).replace(/\\/g, "/");
    try {
      const text = await extractText(file);
      const chunks = chunkText(text);
      const replaced = clearSource(source);
      const inserted = insertChunks(
        chunks.map((content, i) => ({
          content,
          source,
          phase: inferPhase(path.basename(file)),
          chunkIndex: i,
        }))
      );
      totalChunks += inserted;
      console.log(
        `  + ${source} → ${inserted} chunks` +
          (replaced ? ` (replaced ${replaced} old)` : "")
      );
    } catch (err) {
      console.error(`  ! failed: ${source} — ${err.message}`);
    }
  }

  const stats = graphStats();
  console.log(
    `\nDone. ${totalChunks} chunks ingested this run · ${stats.totalChunks} total in intelligence_graph.`
  );
  for (const s of stats.byPhase) console.log(`  ${s.phase}: ${s.chunks}`);
}

main().catch((err) => {
  console.error("INGEST FAILED:", err);
  process.exit(1);
});
