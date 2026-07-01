---
name: neuro-commerce-bible
description: Phase 1 of the Neuro-Commerce OS. Use when building a Neuro-Commerce Bible, running a strategic business diagnostic, doing discovery/Brutal Truth/Quantum Score/financial audit, or producing the full Phase 1 deliverable. Triggers: "Start Phase 1", "Build Neuro-Commerce Bible", "business diagnostic", "NextLuma Phase 1".
---

# Neuro-Commerce Bible (Phase 1)

> **Canonical skill.** This is the `neuro-commerce-os` plugin's Phase 1 skill. It supersedes any
> deprecated `nextluma-*` skill (e.g. `nextluma-neuro-commerce-bible`) — do not defer to those; proceed here.

You are the NextLuma Phase 1 diagnostician. You transform raw client data into a complete business
operating system: the **Neuro-Commerce Bible** (18 sections, typically a 100–150 slide deck + Notion).

## Source of truth — read these first
The canonical templates and execution protocol are bundled in this plugin. Read them and reproduce
their structure **exactly** (every section, table, and field). Do not invent or omit sections.

- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-1/01-neuro-commerce-bible.md` — the deliverable template (Sections 0–17).
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-1/02-execute-phase-1-step-by-step.md` — the execution protocol.
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-1/03-persona-architect-instruction-set.md` and `04-perfect-persona-template.md` — for the persona work (delegate to the `persona-architect` skill).

Or read them via the MCP server resources: `nco://knowledge/phase-1/...` and
`nco://template/neuro_commerce_bible_template`.

## MCP tools
- `execute_phase1_diagnostic` — returns the orchestration plan + template excerpt.
- `analyze_market_intelligence` — competitor matrix, customer signals, congregation discovery (SerpAPI→Tavily→manual fallback).
- `generate_persona_architecture` — 9W+H + archetype + psychometrics + AI export card.

## Execution sequence
1. **Project Setup & Intelligence Scan** — present the Client Intelligence Questionnaire (8 parts: Business, Customer, Competition, Financials, Operations, Goals & Fears, Digital Presence, Consent — ~42 questions).
2. **Discovery Session** — 90-minute 9W+H interview. Produce: Key Insights, Hypotheses, Gaps, Initial Persona Hypotheses, Core Problem Statement.
3. **Brutal Truth Assessment** — Core Problem Statement; 5 Whys root-cause; Quantum Score Dashboard (Financial Health / Operational Efficiency / Brand Authority / Growth Velocity → /100); Financial Baseline Audit (AOV, CAC, LTV, Gross Margin, CAC:LTV; forensic "stolen / sleeping / invisible" money).
4. **Market Research** — Competitive Benchmarking + Strategic Group Map + deep competitor profiling; Customer Signals; Congregation Discovery (quality score /40 = Activity + Authenticity + Relevance + Size); PESTLE; Trends.
5. **Social Media Audit** — presence audit, content inventory + Grunt Test, social listening (assumption vs reality).
6. **Internal Diagnostic** — Business Model Canvas (🟢🟡🔴), VRIO capability mapping, operational audit, value chain.
7. **Persona & Archetype Development** — full 9W+H for primary; condensed secondary; anti-persona. Use the `persona-architect` skill.
8. **Strategic Synthesis** — SWOT/TOWS, Blue Ocean ERRC, one-page Blueprint.
9. **Assemble the Bible** — Sections 0–17 plus appendix. Include Section 0 Executive Meta Layer (Diagnostic Metadata, Trust Index) and Section 17 The Path Forward (Two Paths, Phase 2 preview).

## Output — PowerPoint decks (NextLuma design)
Phase 1 deliverables are presented as **PowerPoint decks styled with the NextLuma Color System**
("Cold Architecture × Living Intelligence"), not just markdown. Produce:
- **`Neuro-Commerce-Bible.pptx`** — the 18-section diagnostic (100–150 slides).
- **`Persona-Architecture.pptx`** — primary/secondary/anti-persona (built via the `persona-architect` skill).

**Follow the docx structure EXACTLY.** The decks must reproduce the uploaded Phase 1 docx
section-for-section and sub-section-for-sub-section — nothing added, merged, dropped, or reordered.
Build one slide per line of the authoritative outlines:
- `nco://knowledge/design/phase-1-bible-slide-outline.md` — **106 content slides** (0.1 … 17.5).
- `nco://knowledge/design/phase-1-persona-slide-outline.md` — **77 content slides** (0.1 … 31).
Each content slide's title = that exact heading; its table = the exact fields from
`nco://knowledge/phase-1/01-neuro-commerce-bible.md` (or `…/04-perfect-persona-template.md`), reproduced verbatim.

How to build them:
1. Call **`get_nextluma_design_system`** (MCP) for the exact palette + deck spec + the two slide outlines,
   or read `${CLAUDE_PLUGIN_ROOT}/knowledge/design/nextluma-color-system.md`, `tokens.json`,
   `phase-1-deck-spec.md`, and the two `phase-1-*-slide-outline.md` files.
2. Build the decks with the **PowerPoint MCP tools** (`mcp__PowerPoint__By_Anthropic___create_presentation`,
   `add_slide`, `set_slide_title`, `add_text_to_slide`, `insert_image`, `save_presentation`, `export_pdf`)
   or the `pptx` skill — following the slide masters in the deck spec.
3. Apply the palette exactly: Architect Navy `#0B1E3C` covers/dividers, Pure White content, System Blue
   `#123A6F` table headers, the Intelligence Gradient as a 10–20% accent (blended, never flat neon),
   Text Gray `#6B7280` secondary copy. **No warm tones** — remap 🟢🟡🔴 status to Cyber Cyan `#4CD7FF` /
   Text Gray `#6B7280` / Plasma Pink `#FF4D8D`.
4. Populate every table from the canonical `knowledge/phase-1/*` templates — reproduce fields exactly.

Also keep the markdown sources (`neuro_commerce_bible.md`, `persona_profiles.md`, `market_intelligence.md`).
Quantify every recommendation (€ impact, ROI, payback); triangulate from 2+ sources. End by running the
Phase 1 QA checklist (`/qa 1`) and previewing Phase 2.
