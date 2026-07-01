---
description: Phase 1 — build the Neuro-Commerce Bible (diagnostic + persona architecture). Usage: /phase-1 [client name]
---

# PHASE 1 — THE NEURO-COMMERCE BIBLE

> 🔒 Use the **`neuro-commerce-os`** plugin only. Start with its MCP tools (uniquely named) and use its
> namespaced skills `neuro-commerce-os:neuro-commerce-bible` / `neuro-commerce-os:persona-architect`.
> Do **NOT** use `nextluma-*` or any other marketplace skill, even if similarly named.

Execute Phase 1 for: `$ARGUMENTS` — begin by calling `execute_phase1_diagnostic`, then proceed with
the `neuro-commerce-os:neuro-commerce-bible` skill (and `neuro-commerce-os:persona-architect`).

Drive it with the MCP server:
1. `execute_phase1_diagnostic` — orchestration plan + the canonical Bible template.
2. `analyze_market_intelligence` — competitors, customer signals, congregations.
3. `generate_persona_architecture` — 9W+H + archetype + psychometrics + AI export card.

## Execution protocol (from the source docs)
1. **Project Setup & Intelligence Scan** — issue the Client Intelligence Questionnaire (8 parts, ~42 questions).
2. **Discovery Session** — 90-minute 9W+H interview; produce Key Insights / Hypotheses / Gaps / Persona Hypotheses / Core Problem Statement.
3. **Brutal Truth Assessment** — 5 Whys, Quantum Score (/100), Financial Baseline Audit.
4. **Market Research** — competitor intelligence, customer signal extraction, congregation discovery, PESTLE.
5. **Social Media Audit** — presence, content, social listening.
6. **Internal Diagnostic** — Business Model Canvas, VRIO, operational audit.
7. **Persona & Archetype Development** — full 9W+H per primary/secondary/anti-persona.
8. **Assemble the Bible** — all 18 sections (0–17).

## Deliverables — PowerPoint decks (NextLuma design)
Present Phase 1 as **PowerPoint decks styled with the NextLuma Color System** (Cold Architecture ×
Living Intelligence):
- **`Neuro-Commerce-Bible.pptx`** (18 sections, 100–150 slides) and **`Persona-Architecture.pptx`**.
- Call **`get_nextluma_design_system`** for the exact palette + deck spec (or read
  `nco://knowledge/design/nextluma-color-system.md` + `phase-1-deck-spec.md`).
- Build with the **PowerPoint MCP tools** (`mcp__PowerPoint__By_Anthropic___*`) or the `pptx` skill,
  following the slide masters. Palette: Architect Navy `#0B1E3C`, Pure White, System Blue `#123A6F`
  table headers, Intelligence Gradient accent (10–20%, blended), Text Gray secondary. **No warm tones**
  (remap status colors to cyan/gray/plasma-pink).
- Populate every table from `nco://knowledge/phase-1/*` and reproduce the structure exactly. Keep the
  markdown sources too (`neuro_commerce_bible.md`, `persona_profiles.md`, `market_intelligence.md`).

When complete, run `/qa` (Phase 1 checklist), then `/phase-2`.
