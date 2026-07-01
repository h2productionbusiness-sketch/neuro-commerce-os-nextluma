---
description: Run Phase 1 fully automatically — tools → interview → research → analyst → NextLuma decks. Usage: /auto-phase1 [client] [industry]
---

# ▶ /auto-phase1 — Automated Phase 1

Activate **`neuro-commerce-os:the-orchestrator`** and run the end-to-end automated Phase 1 for:
`$ARGUMENTS`

> 🔒 Use the **`neuro-commerce-os`** plugin only (its MCP tools + namespaced skills). Do NOT use
> `nextluma-*` or other marketplace skills.

Start by calling `execute_phase1_diagnostic` with `mode:"auto"`, then execute the orchestrator pipeline:

1. **Tool Selector** (`neuro-commerce-os:tool-selector`) — scan MCPs; recommend + install missing (with consent).
2. **Data Collection** (`get_phase1_intake`) — ask the 42-question questionnaire, then the 90-min discovery session (9W+H). Store `phase1_data.json`.
3. **Market Intelligence** (`analyze_market_intelligence`) — competitors, signals, congregations.
4. **Analyst** — Brutal Truth (5 Whys, Quantum Score, Financial Audit) → Persona Architecture (all segments) → `score_persona_readiness` (Purchase Readiness %) → Strategic Synthesis → Opportunity €/ROI.
5. **Deliverables** (`get_phase1_deck_plan` + `get_nextluma_design_system`) — build `Neuro-Commerce-Bible.pptx` (106 slides) and one `Persona-<name>.pptx` (77 slides) per persona, NextLuma-styled, via the PowerPoint MCP / `pptx` skill. Personas listed with readiness %.
6. **Complete** — summarize + locations; ask "Proceed to Phase 2?"

If `$ARGUMENTS` lacks client/industry, ask for them first. Pause only at consent gates (installs, final
persona list). Everything else runs automatically.
