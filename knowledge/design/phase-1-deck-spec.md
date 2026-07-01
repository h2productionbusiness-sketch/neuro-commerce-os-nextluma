<!-- Phase 1 PowerPoint deck specification. Applies the NextLuma Color System (see nextluma-color-system.md / tokens.json). -->
# Phase 1 — PowerPoint Deck Specification (NextLuma Design)

Phase 1 deliverables are delivered as **PowerPoint decks** styled with the NextLuma Color System
("Cold Architecture × Living Intelligence"). Build them with the **PowerPoint MCP tools**
(`mcp__PowerPoint__By_Anthropic___*`) or the `pptx` skill. Two decks:

- **`Neuro-Commerce-Bible.pptx`** — the 18-section diagnostic (100–150 slides).
- **`Persona-Architecture.pptx`** — primary/secondary/anti-persona (9W+H, archetype, psychometrics).

## Palette (exact — from tokens.json)
- **Architect Navy `#0B1E3C`** — dark backgrounds, headlines, authority.
- **System Blue `#123A6F`** — structural blocks, table headers, depth.
- **Charcoal Core `#1C1C1E`** — technical/near-black panels.
- **Pure White `#FFFFFF`** — dominant light background, body canvas.
- **Intelligence Gradient** `linear-gradient(90deg,#7B4DFF,#E056FD 33%,#4CD7FF 66%,#2F80ED)` — accent ONLY (10–20% of a slide): cover orb, divider bar, KPI hero, section number. Always blended, never a flat neon fill.
- **Plasma Pink `#FF4D8D`** — tiny floating accents only.
- **UI neutrals** — Light Panel Gray `#F3F4F6` (cards), Soft Border Gray `#E5E7EB` (dividers), Text Gray `#6B7280` (secondary text).

## Non-negotiable rules (from the color system)
1. Gradient only blended (soft transitions/blur) — never hard stops or flat neon fills.
2. Keep the gradient to ~10–20% of any slide — architecture is the canvas, intelligence is the signal.
3. **No warm tones.** The docs use 🟢🟡🔴 status — remap to cool equivalents:
   - Strong / Healthy → **Cyber Cyan `#4CD7FF`**
   - Neutral / Watch → **Text Gray `#6B7280`**
   - Weak / Critical → **Plasma Pink `#FF4D8D`**
   (Never use warm red/amber/green swatches.)
4. Premium, engineered, spacious. No clutter or decorative noise.

## Slide masters / types
| Type | Background | Title | Body | Accent |
|------|-----------|-------|------|--------|
| **Cover** | Architect Navy | Pure White, large | Text Gray subtitle | Gradient orb/bar (soft blur), "Confidential" tag |
| **Section divider** | Architect Navy / Charcoal | Pure White | — | Large gradient section number + thin gradient rule |
| **Content / table** | Pure White | Architect Navy | Charcoal/Text Gray | System Blue table header row (white text), alt rows Light Panel Gray, Soft Border Gray gridlines |
| **KPI / big number** | Pure White | Architect Navy label | — | The number in gradient fill or Electric Blue; one hero metric per slide |
| **Persona card** | Pure White + Light Panel Gray panel | Architect Navy name/title | Text Gray attributes | Gradient side-rail; archetype chip in System Blue |
| **Quote / VoC** | System Blue | Pure White quote | Text Gray attribution | Gradient quotation mark |
| **Closing / Two Paths** | Architect Navy | Pure White | — | Gradient CTA button |

- **Type:** clean geometric sans (e.g., Inter/Montserrat/Segoe UI). Titles Architect Navy on light, Pure White on dark. Secondary copy Text Gray only.
- **Glows/emphasis:** large soft blur of a gradient color behind a hero element — not flat highlights.

## Bible deck map (Sections 0–17 → slides)
Follow `knowledge/phase-1/01-neuro-commerce-bible.md` exactly; one section-divider slide per section, then one content slide per sub-section table.
0. Cover · Executive Meta Layer (Diagnostic Metadata, Trust Index — KPI + table)
1. Business & Strategy (Overview, Brutal Truth, 5 Whys, Quantum Score dashboard, Financial Baseline — KPI slides)
2. Product/Service Intelligence · 3. Pricing & Monetization · 4. Customer & Behavior (persona summary → detail decks)
5. Market Intelligence (competitor matrix, congregations, PESTLE) · 6. Marketing & Acquisition · 7. Data & Technology
8. Operations · 9. Financial Intelligence · 10. Strategic Synthesis (TOWS, Blue Ocean ERRC, Blueprint)
11. Experimentation · 12. Execution & Governance · 13. Risk & Scenarios · 14. Knowledge System
15. Output Generation · 16. Quality Control · 17. The Path Forward (Two Paths, Phase 2 preview — closing)

## Persona deck map
Cover → Persona Snapshot (card) → 9W+H (WHO…WISH, one slide each) → Archetype profile → Psychometrics
(CNFU/BESC/CSII/MVS — KPI bars in Electric Blue) → Empathy Map (2×2, Light Panel Gray quadrants) →
Customer Journey (cool status remap) → Meta Ads Export Card → closing.

## Build procedure
1. `create_presentation` (16:9).
2. Add slides per the map; set titles via `set_slide_title`, content via `add_text_to_slide`; apply the palette hexes above per slide type.
3. Insert gradient accents/orbs as images where the tool can't draw gradients natively (generate via `generate_image_asset` with a prompt for the blended intelligence gradient on transparent/navy).
4. Populate every table from the canonical `knowledge/phase-1/*` templates — reproduce fields exactly.
5. `save_presentation` → `Neuro-Commerce-Bible.pptx` and `Persona-Architecture.pptx`. Optionally `export_pdf` for a reference copy.
