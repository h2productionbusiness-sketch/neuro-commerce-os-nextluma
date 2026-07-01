// templates.js — resolves and loads the canonical NextLuma knowledge base
// (the source-of-truth deliverable/instruction docs) and derived templates.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
// mcp-server/src/lib -> plugin root is three levels up
export const PLUGIN_ROOT = resolve(__dirname, "..", "..", "..");
export const KNOWLEDGE_DIR = join(PLUGIN_ROOT, "knowledge");
export const TEMPLATES_DIR = resolve(__dirname, "..", "..", "templates");

// Friendly resource name -> file path (knowledge base is the source of truth).
export const NAMED_TEMPLATES = {
  neuro_commerce_bible_template: join(KNOWLEDGE_DIR, "phase-1", "01-neuro-commerce-bible.md"),
  persona_template_9wh: join(KNOWLEDGE_DIR, "phase-1", "04-perfect-persona-template.md"),
  persona_architect_instruction_set: join(KNOWLEDGE_DIR, "phase-1", "03-persona-architect-instruction-set.md"),
  client_intelligence_questionnaire: join(KNOWLEDGE_DIR, "phase-1", "05-client-intelligence-questionnaire.md"),
  discovery_session_guide: join(KNOWLEDGE_DIR, "phase-1", "06-discovery-session-guide.md"),
  brand_os_template: join(KNOWLEDGE_DIR, "phase-2", "02-neurobrand-operating-system.md"),
  brand_deliverables_master_list: join(KNOWLEDGE_DIR, "phase-2", "01-brand-architecture-deliverables.md"),
  content_brief_template: join(KNOWLEDGE_DIR, "phase-3", "03-inception-codex-v10-neuro-cinematic.md"),
  content_deliverables_master_list: join(KNOWLEDGE_DIR, "phase-3", "01-kontent-kreation-deliverables.md"),
  meta_ads_acquisition_engine: join(KNOWLEDGE_DIR, "phase-4", "02-meta-ads-acquisition-engine.md"),
  meta_ads_template: join(TEMPLATES_DIR, "meta_ads_template.csv"),
  unit_economics_template: join(TEMPLATES_DIR, "unit_economics.csv"),
  execution_checklist: join(TEMPLATES_DIR, "execution_checklist.md"),
};

export function loadNamedTemplate(name) {
  const p = NAMED_TEMPLATES[name];
  if (!p || !existsSync(p)) return null;
  return readFileSync(p, "utf-8");
}

// Load a knowledge file by relative path, e.g. "phase-1/01-neuro-commerce-bible.md"
export function loadKnowledge(relPath) {
  const p = join(KNOWLEDGE_DIR, relPath);
  if (!existsSync(p)) return null;
  return readFileSync(p, "utf-8");
}

export function listKnowledge() {
  const out = [];
  if (!existsSync(KNOWLEDGE_DIR)) return out;
  for (const phase of readdirSync(KNOWLEDGE_DIR)) {
    const pdir = join(KNOWLEDGE_DIR, phase);
    let files;
    try { files = readdirSync(pdir); } catch { continue; }
    for (const f of files) {
      if (f.endsWith(".md") || f.endsWith(".json") || f.endsWith(".css")) out.push(`${phase}/${f}`);
    }
  }
  return out.sort();
}

// Return the first ~N chars of a knowledge doc, used to embed an excerpt in tool output
export function excerpt(relPath, chars = 4000) {
  const t = loadKnowledge(relPath);
  if (!t) return `(knowledge file not found: ${relPath})`;
  return t.length > chars ? t.slice(0, chars) + "\n\n…[truncated — read full file via resource]…" : t;
}
