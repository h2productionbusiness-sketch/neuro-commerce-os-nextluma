// deckplan.js — parse the authoritative slide outlines into an ordered, deterministic slide plan.
import { loadKnowledge } from "./templates.js";

// Choose a slide master from the sub-section title (matches phase-1-deck-spec.md masters).
function masterFor(title) {
  const t = title.toLowerCase();
  if (/cover slide/.test(t)) return "cover";
  if (/agenda/.test(t)) return "content";
  if (/score|dashboard|index|economics|impact|opportunity in numbers|readiness/.test(t)) return "kpi";
  if (/persona card|snapshot|primary persona|secondary persona|tertiary|anti-persona/.test(t)) return "persona-card";
  if (/signals|voice of customer|quote/.test(t)) return "quote";
  if (/two paths|next steps|path forward/.test(t)) return "closing";
  return "content"; // default: table/content
}

// Parse an outline file (§ dividers + ▸ content lines) into a plan.
export function parseOutline(relPath) {
  const txt = loadKnowledge(relPath);
  if (!txt) return { error: `outline not found: ${relPath}`, slides: [] };
  const slides = [];
  let section = null, n = 0;
  for (const raw of txt.split("\n")) {
    const line = raw.trim();
    const div = line.match(/^§\s*SECTION DIVIDER\s*—\s*(.+)$/);
    const sub = line.match(/^▸\s*(.+)$/);
    if (div) {
      section = div[1].trim();
      slides.push({ index: ++n, type: "section-divider", master: "section-divider", title: section, section });
    } else if (sub) {
      const title = sub[1].trim();
      slides.push({ index: ++n, type: "content", master: masterFor(title), title, section });
    }
  }
  return { source: relPath, total_slides: slides.length, content_slides: slides.filter((s) => s.type === "content").length, slides };
}

export function biblePlan() { return parseOutline("design/phase-1-bible-slide-outline.md"); }
export function personaPlan() { return parseOutline("design/phase-1-persona-slide-outline.md"); }
