# 🧠 Neuro-Commerce OS

**A complete, self-contained business operating system for Claude — Diagnostic → Brand → Content → Ads → Growth.**
Built by NextLuma Agency. Ships as a Claude Code plugin **and** a standalone MCP server, and executes
the entire NextLuma 5-phase framework from the bundled source documents.

```
PHASE 1  Neuro-Commerce Bible            18-section strategic diagnostic + persona architecture
PHASE 2  NeuroBrand Operating System     18 deliverables across 6 sections → Brand Book
PHASE 3  Kontent Kreation + Inception    neuro-cinematic content pipeline (Phases 0–12)
PHASE 4  Universal Meta Ads System       10 T-META templates, Iron Dome QA, safe deployment
PHASE 5  Predictive Growth Intelligence  forecasting, VPS, churn/fatigue, knowledge graph + loop
```

**13 skills · 5 specialized agents** (The Architect → Brand Architect → Content Engineer →
Ads Engineer → Growth Orchestrator, with a feedback loop) **+ video/social reel diagnostics**.
See `AGENTS.md`.

## What's inside

```
neuro-commerce-os/
├── .claude-plugin/
│   ├── plugin.json            # plugin manifest
│   └── marketplace.json       # one-plugin marketplace (for install)
├── .mcp.json                  # wires the bundled MCP server (env keys optional)
├── commands/                  # /neuro-commerce-os, /phase-1..5, /status, /deliverables, /qa, /export
├── skills/                    # 12 core skills + inception-codex + video-content-diagnostics
│                              #   (bible, persona, market-intel, pricing, brand, semiotic, kontent,
│                              #   hooks, meta-ads, predictive, customer-experience, knowledge-graph)
├── agents/                    # The Architect, Brand Architect, Content Engineer, Ads Engineer,
│                              #   Growth Orchestrator (+ AGENTS.md collaboration matrix)
├── knowledge/                 # ★ the 13 NextLuma source docs (canonical deliverable templates)
└── mcp-server/                # the standalone Neuro-Commerce OS MCP server (Node)
    ├── src/                   # index, tools (19), resources (24), prompts (4), lib/ (search/image/tts/economics/meta/growth)
    └── templates/             # CSV + checklist templates served as resources
```

The **`knowledge/`** folder is the source of truth: the skills and tools always point Claude back to
these documents so the deliverables are reproduced **exactly** as specified by NextLuma.

## The MCP server

`neuro-commerce-os-mcp` exposes **19 tools**, **24 resources**, and **4 prompts**.

| # | Tool | Purpose |
|---|------|---------|
| 1 | `execute_phase1_diagnostic` | Run the Neuro-Commerce Bible diagnostic |
| 2 | `execute_phase2_brand_architecture` | Build the NeuroBrand OS (18 deliverables) |
| 3 | `execute_phase3_content_production` | Neuro-cinematic content (Phases 0–12) |
| 4 | `execute_phase4_ads_campaign` | Meta Ads system (10 T-META templates) |
| 5 | `generate_persona_architecture` | 9W+H persona + archetype + psychometrics |
| 6 | `analyze_market_intelligence` | Competitors, signals, congregations (SerpAPI→Tavily→manual) |
| 7 | `create_content_strategy` | Content OS + emotional sequencing + calendar |
| 8 | `deploy_ads_campaign` | Manifest / Python / live API deployment |
| 9 | `generate_learning_loop` | Update personas/hooks/hypotheses from results |
| 10 | `calculate_unit_economics` | One-Third Rule: LTV, Max/Target CPA, Break-even/Target ROAS |
| 11 | `run_iron_dome_qa` | Phase 4 pre-launch QA (PASS/WARNING/FAIL) |
| 12 | `generate_image_asset` | Recraft→Leonardo→Stable Diffusion→ready-prompt |
| 13 | `generate_voiceover` | edge-tts→voiceover spec |
| 14 | `execute_phase5_growth_intelligence` | Predictive Growth & Learning Loop orchestration |
| 15 | `calculate_virality_score` | Virality Probability Score (6-factor VPS) |
| 16 | `detect_creative_fatigue` | Creative fatigue signals + fix (Inception Codex 8.4) |
| 17 | `score_churn_risk` | Churn-risk band + retention action |
| 18 | `diagnose_video_content` | Reel/video diagnosis plan — drives installed video MCP tools + Inception Codex checklist |
| 19 | `score_social_content` | Hook Performance (11.2) + Content Scorecard (11.3) + Virality/CPS (11.4) |

**Video / social diagnostics:** the `video-content-diagnostics` skill + `/diagnose-reel` command drive
your installed video-analysis MCP servers (`video-use`, `design-extract`, `mcp-video`,
`mcp-ffmpeg-helper`, `video-analyzer`, …) to extract frames + timestamps + transcript from a reel,
then diagnose hook (0–3s), retention/drop-off, pacing, pattern interrupts, and virality.

Resources: `nco://template/<name>` (named templates) and `nco://knowledge/<phase>/<file>` (full docs).
Prompts: `start_neuro_commerce_os`, `build_persona_architecture`, `generate_creative_brief`, `deploy_ads_manifest`.

### Free-tool fallback logic (built in)
- **Search:** SerpAPI → Tavily → manual research brief.
- **Image:** Recraft → Leonardo → local Stable Diffusion (`SD_API_URL`) → ready-to-paste prompt.
- **Voiceover:** edge-tts → production-ready voiceover spec.
- **Meta deploy:** live Graph API (if `META_ACCESS_TOKEN`) → Python script → manifest + Ads Manager guide.

All API keys are **optional** — with none set, every tool degrades gracefully to a usable manual output.

## Quick start

See **[INSTALL.md](INSTALL.md)**. In short:

```bash
# 1. install the MCP server deps
cd mcp-server && npm install && npm run selfcheck   # prints 19 tools / 24 resources / 4 prompts

# 2. add the marketplace + plugin in Claude Code
/plugin marketplace add "C:/Users/houce/Documents/NextLuma Agency/Claude plugin/neuro-commerce-os"
/plugin install neuro-commerce-os

# 3. run it
/neuro-commerce-os Full OS
```

## Usage

- `/neuro-commerce-os` — master orchestrator (menu or `Full OS` / `Phase N`).
- `/phase-1` … `/phase-5` — run a single phase.
- `/diagnose-reel <file-or-url> [platform] [own|competitor]` — teardown a reel's hook/retention/virality.
- `/status` · `/deliverables` · `/qa [1-5]` · `/export [md|notion|pptx|csv]`.

Optional API keys live in `.mcp.json` (or your environment): `SERPAPI_API_KEY`, `TAVILY_API_KEY`,
`RECRAFT_API_KEY`, `LEONARDO_API_KEY`, `SD_API_URL`, `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`.

> Security: the system never asks for your Meta access token in chat. For API deployment it generates a
> script you run yourself, or it uses the keys you placed in your environment.
