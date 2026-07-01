// resources.js — exposes the named templates AND the full knowledge base as MCP resources.
import { NAMED_TEMPLATES, loadNamedTemplate, listKnowledge, loadKnowledge } from "./lib/templates.js";

const NAMED = [
  { name: "neuro_commerce_bible_template", title: "Neuro-Commerce Bible Template (Phase 1)" },
  { name: "persona_template_9wh", title: "9W+H Perfect Persona Template (Phase 1)" },
  { name: "persona_architect_instruction_set", title: "Persona Architect Instruction Set (Phase 1)" },
  { name: "brand_os_template", title: "NeuroBrand Operating System (Phase 2)" },
  { name: "brand_deliverables_master_list", title: "Brand Architecture Deliverables (Phase 2)" },
  { name: "content_brief_template", title: "Inception Codex / NeuroCinematic Brief (Phase 3)" },
  { name: "content_deliverables_master_list", title: "Kontent Kreation Deliverables (Phase 3)" },
  { name: "meta_ads_acquisition_engine", title: "Meta Ads Acquisition Engine (Phase 4)" },
  { name: "meta_ads_template", title: "Meta Ads Manifest / Ad Set Registry Template (CSV)" },
  { name: "unit_economics_template", title: "Unit Economics Calculator Template (CSV)" },
  { name: "execution_checklist", title: "Master Execution & QA Checklist" },
];

export function listResources() {
  const named = NAMED.map((r) => ({
    uri: `nco://template/${r.name}`,
    name: r.name,
    title: r.title,
    mimeType: NAMED_TEMPLATES[r.name]?.endsWith(".csv") ? "text/csv" : "text/markdown",
  }));
  const knowledge = listKnowledge().map((rel) => ({
    uri: `nco://knowledge/${rel}`,
    name: rel,
    title: `Knowledge — ${rel}`,
    mimeType: "text/markdown",
  }));
  return [...named, ...knowledge];
}

export function readResource(uri) {
  if (uri.startsWith("nco://template/")) {
    const name = uri.slice("nco://template/".length);
    const body = loadNamedTemplate(name);
    if (body == null) throw new Error(`Unknown template: ${name}`);
    return { uri, mimeType: name.endsWith("template") && NAMED_TEMPLATES[name]?.endsWith(".csv") ? "text/csv" : "text/markdown", text: body };
  }
  if (uri.startsWith("nco://knowledge/")) {
    const rel = uri.slice("nco://knowledge/".length);
    const body = loadKnowledge(rel);
    if (body == null) throw new Error(`Unknown knowledge file: ${rel}`);
    return { uri, mimeType: "text/markdown", text: body };
  }
  throw new Error(`Unsupported resource URI: ${uri}`);
}
