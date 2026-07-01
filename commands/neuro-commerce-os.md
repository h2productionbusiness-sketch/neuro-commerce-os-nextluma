---
description: ▶ START the Neuro-Commerce OS. The single front door — boots the plugin and runs all 5 phases. Usage: /neuro-commerce-os [Full OS | Phase 1-5]
---

# ▶ NEURO-COMMERCE OS — START

This is the **START button** for the Neuro-Commerce OS plugin. The user invoked it with: `$ARGUMENTS`

## 🔒 BINDING RULE — read first (prevents skill confusion)
You are now operating the **`neuro-commerce-os`** plugin. For this entire session you MUST use **only
this plugin's own components** and ignore any similarly-named ones from other marketplaces:

- ✅ USE the plugin MCP tools: `mcp__plugin_neuro-commerce-os__*`
  (e.g. `execute_phase1_diagnostic`, `generate_persona_architecture`, `calculate_unit_economics`,
  `diagnose_video_content`, `score_social_content`, …).
- ✅ USE the plugin skills, always namespaced: `neuro-commerce-os:neuro-commerce-bible`,
  `neuro-commerce-os:persona-architect`, `neuro-commerce-os:brand-architecture`,
  `neuro-commerce-os:kontent-kreation`, `neuro-commerce-os:meta-ads-system`, etc.
- ✅ USE the plugin agents: `neuro-commerce-os:the-architect`, `…:the-brand-architect`,
  `…:the-content-engineer`, `…:the-ads-engineer`, `…:the-growth-orchestrator`.
- ⛔ DO **NOT** invoke `nextluma-*`, `anthropic-skills:*`, or any other marketplace skill — even if the
  name looks identical (e.g. the deprecated `nextluma-neuro-commerce-bible`). They are NOT part of this
  plugin and will produce inconsistent results. If you ever notice a non-`neuro-commerce-os:` skill
  about to run for this work, stop and use the `neuro-commerce-os:` equivalent instead.

## Boot sequence
1. Say: "▶ Neuro-Commerce OS online — running the `neuro-commerce-os` plugin (13 skills, 5 agents,
   19 MCP tools). Source-of-truth docs loaded."
2. If `$ARGUMENTS` names a phase or "Full OS", go straight there. Otherwise show the menu:
   - **[1] Full OS** — all 5 phases, sequential (feedback loop)
   - **[2] Phase 1** — Neuro-Commerce Bible · agent `neuro-commerce-os:the-architect`
   - **[3] Phase 2** — NeuroBrand OS · `…:the-brand-architect`
   - **[4] Phase 3** — Kontent Kreation · `…:the-content-engineer`
   - **[5] Phase 4** — Universal Meta Ads · `…:the-ads-engineer`
   - **[6] Phase 5** — Predictive Growth · `…:the-growth-orchestrator`
   - **[7] Diagnose a reel** — `/diagnose-reel`
   - **[8] Custom**
3. Ask for client name + industry if not known.

## Phase routing (tool-first — these names are unique, so no collision)
| Phase | Start with this MCP tool | Then this plugin skill |
|-------|--------------------------|------------------------|
| 1 | `execute_phase1_diagnostic` | `neuro-commerce-os:neuro-commerce-bible` (+ `:persona-architect`, `:market-intelligence`, `:pricing-monetization`) |
| 2 | `execute_phase2_brand_architecture` | `neuro-commerce-os:brand-architecture` (+ `:semiotic-brand-system`) |
| 3 | `execute_phase3_content_production` | `neuro-commerce-os:kontent-kreation` (+ `:inception-codex`, `:hook-attention-architecture`) |
| 4 | `execute_phase4_ads_campaign` | `neuro-commerce-os:meta-ads-system` |
| 5 | `execute_phase5_growth_intelligence` | `neuro-commerce-os:predictive-growth-intelligence` (+ `:customer-experience-orchestration`, `:knowledge-graph-learning-loop`) |

Always start each phase by calling its MCP tool (uniquely named — cannot be confused with any other
skill), which returns the orchestration plan + the canonical templates, then proceed with the
namespaced plugin skill. After each phase: run `/qa`, confirm deliverables, carry outputs forward.

## Source of truth
The bundled `knowledge/` docs are canonical — read via `nco://knowledge/...` resources or the
plugin's `knowledge/` folder, and reproduce them exactly.

## Interactive commands
`/phase-1` `/phase-2` `/phase-3` `/phase-4` `/phase-5` · `/diagnose-reel` · `/status` · `/deliverables` · `/qa` · `/export`

Begin now.
