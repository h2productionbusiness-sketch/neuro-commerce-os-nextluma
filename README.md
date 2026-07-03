# 🧠 Neuro-Commerce OS · v2.0.0

**A complete, self-contained business operating system for Claude — Diagnostic → Brand → Content → Ads → Growth.**
Built by NextLuma Agency. Ships as a Claude Code plugin **and** a standalone MCP server, executes the
entire NextLuma 5-phase framework from the bundled source documents, and automates the post-click
pipeline with local n8n.

```
PHASE 1  Neuro-Commerce Bible            18-section diagnostic + persona architecture → NextLuma PowerPoint decks
PHASE 2  NeuroBrand Operating System     18 deliverables across 6 sections → Brand Book
PHASE 3  Kontent Kreation + Inception    neuro-cinematic content pipeline (Phases 0–12)
PHASE 4  Universal Meta Ads System       10 T-META templates, Iron Dome QA, n8n post-click automation
PHASE 5  Predictive Growth Intelligence  forecasting, VPS, churn/fatigue, knowledge graph + learning loop
```

**18 skills · 22 agents** (5 phase commanders + The Orchestrator + 16 consolidated sub-crews) **+ video/
social reel diagnostics + local n8n automation + file-based memory & self-improvement.** The master
framework's 193 roles / 82 skills are consolidated ~10× with every capability preserved — see
`knowledge/system/agent-roster.md` and `knowledge/system/skill-capability-map.md`.

## What's inside

```
neuro-commerce-os/
├── .claude-plugin/            # plugin.json + marketplace.json
├── .mcp.json                  # wires the bundled MCP server (env keys optional)
├── commands/                  # /neuro-commerce-os, /auto-phase1, /phase-1..5, /diagnose-reel,
│                              #   /learn, /status, /deliverables, /qa, /export
├── skills/                    # 18 skills: bible, persona-architect, market-intelligence, pricing,
│                              #   strategic-diagnostics, brand-architecture, semiotic, kontent,
│                              #   inception-codex, hook-attention, meta-ads, predictive-growth,
│                              #   customer-experience, knowledge-graph, video-content-diagnostics,
│                              #   tool-selector, n8n-automation, client-memory
├── agents/                    # 22 agents: the-architect/-brand-architect/-content-engineer/
│                              #   -ads-engineer/-growth-orchestrator/-orchestrator + 16 p1..p5 sub-crews
├── knowledge/                 # ★ 13 NextLuma source docs + design/ (NextLuma color system + deck specs)
│                              #   + system/ (handoffs, choice-architecture, memory, agent roster)
├── automation/n8n/            # importable post-click workflow + start-n8n launcher
└── mcp-server/                # the standalone MCP server (Node)
    ├── src/                   # index, tools (26), resources (34), prompts (4),
    │                          #   lib/ (search, image, tts, economics, meta, growth, video, n8n,
    │                          #         persona-scoring, deckplan, templates)
    └── templates/             # CSV + checklist templates served as resources
```

The **`knowledge/`** folder is the source of truth: skills and tools point Claude back to these
documents so deliverables are reproduced **exactly** as specified by NextLuma.

## The MCP server

`neuro-commerce-os-mcp` exposes **36 tools**, **41 resources**, and **4 prompts**.

**New in v2.0** — the OS became an operating system in the literal sense:
- **Token Shield** — raw `.docx`/`.pdf` sources are context-banned (deny rules) and git-banned; the **RAG pipeline** (`npm run ingest`) chunks them into a SQLite FTS5 `intelligence_graph`, queried by meaning.
- **State Machine** — `initialize_os_session` → `request_next_step` → `submit_deliverable`: 18 locked Phase-1 steps, no skipping, no thin deliverables.
- **Intent Router** — standard-ecommerce vs custom-blueprint, per-industry step emphasis, clarify flag on ambiguity.
- **Character Registry** — `generate_locked_video`: OpenRouter `input_references` from registry images keep brand characters visually identical.
- **NeuroSystem** — `store_learning` / `prime_context` / `override_memory` over `neuro-memory.db`, the **Synapse** event bus, and a startup-triggered neuroplasticity consolidation cycle.
- **Zero-Command UI** — MCP Apps dashboards (`ui://neuro-commerce-os/*`): welcome dashboard, Action Cards, setup wizard (`save_os_configuration`), memory manager; `suggest_model_routing` cost/quality cards.
- **Scraper routing** — market intelligence routes maps→Outscraper, social→Bright Data, web→AlterLab per URL.

| # | Tool | Purpose |
|---|------|---------|
| 1 | `execute_phase1_diagnostic` | Run the Neuro-Commerce Bible diagnostic (`mode:"auto"` for full orchestration) |
| 2 | `execute_phase2_brand_architecture` | Build the NeuroBrand OS (18 deliverables) |
| 3 | `execute_phase3_content_production` | Neuro-cinematic content (Phases 0–12) |
| 4 | `execute_phase4_ads_campaign` | Meta Ads system (10 T-META templates) |
| 5 | `execute_phase5_growth_intelligence` | Predictive Growth & Learning Loop orchestration |
| 6 | `generate_persona_architecture` | 9W+H persona + archetype + psychometrics |
| 7 | `analyze_market_intelligence` | Competitors, signals, congregations (SerpAPI→Tavily→manual) |
| 8 | `create_content_strategy` | Content OS + emotional sequencing + calendar |
| 9 | `deploy_ads_campaign` | Manifest / Python / live API deployment |
| 10 | `generate_learning_loop` | Update personas/hooks/hypotheses from results |
| 11 | `calculate_unit_economics` | One-Third Rule: LTV, Max/Target CPA, Break-even/Target ROAS |
| 12 | `run_iron_dome_qa` | Phase 4 pre-launch QA (PASS/WARNING/FAIL) |
| 13 | `generate_image_asset` | Recraft→Leonardo→Stable Diffusion→ready-prompt |
| 14 | `generate_voiceover` | edge-tts→voiceover spec |
| 15 | `calculate_virality_score` | Virality Probability Score (6-factor VPS) |
| 16 | `detect_creative_fatigue` | Creative fatigue signals + fix (Inception Codex 8.4) |
| 17 | `score_churn_risk` | Churn-risk band + retention action |
| 18 | `diagnose_video_content` | Reel/video diagnosis plan — drives installed video MCP tools |
| 19 | `score_social_content` | Hook Performance (11.2) + Content Scorecard (11.3) + Virality/CPS (11.4) |
| 20 | `get_nextluma_design_system` | NextLuma palette + Phase 1 deck spec (exact 106/77 slide plans) |
| 21 | `get_phase1_intake` | 42-question Client Intelligence Questionnaire + 90-min Discovery guide |
| 22 | `score_persona_readiness` | Purchase-Readiness % (Intent 40 · Pain 30 · Demo 20 · Behavioral 10) |
| 23 | `get_phase1_deck_plan` | Deterministic slide plan for the Bible (106) + Persona (77) decks |
| 24 | `install_n8n` | Local n8n install commands + live reachability status |
| 25 | `configure_n8n_webhook` | n8n setup + importable post-click workflow JSON |
| 26 | `trigger_n8n_workflow` | POST to an n8n webhook (localhost-restricted; SSRF-guarded) |

Resources: `nco://template/<name>`, `nco://knowledge/<phase-or-system>/<file>`.
Prompts: `start_neuro_commerce_os`, `build_persona_architecture`, `generate_creative_brief`, `deploy_ads_manifest`.

## Highlights
- **Phase 1 → NextLuma PowerPoint decks.** `Neuro-Commerce-Bible.pptx` (106 slides) + `Persona-<name>.pptx`
  (77 slides), exact docx structure, styled with the NextLuma color system ("Cold Architecture × Living Intelligence").
- **Automated Phase 1.** `/auto-phase1` runs tool-selection → guided interview → market research → analyst
  (with persona purchase-readiness %) → decks, pausing only at consent gates.
- **Local n8n automation.** Install + import the post-click pipeline (Webhook → Lead Scoring → AI voice /
  Meta CAPI offline-conversion). Use n8n **1.x** — 2.28.x has a broken `@langchain/core` dep.
- **Memory & self-improvement.** `client-memory` persists client state across sessions; `/learn` runs the
  reflection/knowledge-graph cycle. See `knowledge/system/memory-and-learning.md`.

### Free-tool fallback logic (built in)
- **Search:** SerpAPI → Tavily → manual brief · **Image:** Recraft → Leonardo → local Stable Diffusion → ready-prompt
- **Voiceover:** edge-tts → spec · **Meta deploy:** live Graph API → Python script → manifest + Ads Manager guide

All API keys are **optional** — with none set, every tool degrades gracefully to a usable manual output.

## Install (managed plugin from this repo)

```text
/plugin marketplace add https://github.com/h2productionbusiness-sketch/neuro-commerce-os
/plugin install neuro-commerce-os
```
Then build the MCP server deps once:
```bash
cd mcp-server && npm install && npm run selfcheck   # { ok: true, tools: 36, resources: 41, prompts: 4 }
```

## Usage
- `/neuro-commerce-os` — master orchestrator (client identification → asset inventory → execution mode → phase).
- `/auto-phase1 [client] [industry]` — fully automated Phase 1.
- `/phase-1` … `/phase-5` — run a single phase · `/diagnose-reel <file-or-url>` — reel teardown.
- `/learn` — self-improvement cycle · `/status` · `/deliverables` · `/qa [1-5]` · `/export [md|notion|pptx|csv]`.

Optional env keys (`.mcp.json`): `SERPAPI_API_KEY`, `TAVILY_API_KEY`, `RECRAFT_API_KEY`, `LEONARDO_API_KEY`,
`SD_API_URL`, `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`, `N8N_BASE_URL`, `N8N_WEBHOOK_URL`.

> Security: the system never asks for your Meta access token in chat. n8n webhook targets are restricted
> to localhost unless `ALLOW_EXTERNAL_WEBHOOKS=1`.
