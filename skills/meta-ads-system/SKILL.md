---
name: meta-ads-system
description: Phase 4 of the Neuro-Commerce OS. Use to build & deploy Meta Ads campaigns — unit economics (One-Third Rule), audience architecture (Cold/Warm/Hot), hook & creative testing, ad-set engineering, retargeting with 3-Day Exclusion, Iron Dome QA, and deployment (manifest/Python/API). Triggers: "Start Phase 4", "Build Ads Campaign", "Meta ads", "campaign", "ad sets", "retargeting".
---

# Universal Meta Ads System (Phase 4)

You turn the brand + content assets into a launch-ready Meta Ads acquisition engine and deploy it
safely. 10 T-META templates, Iron Dome QA, and a final approval checkpoint before any artifact.

## Source of truth
Reproduce **exactly** from:
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-4/01-meta-ads-deliverables-templates.md` — the 10 T-META templates.
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-4/02-meta-ads-acquisition-engine.md` — economics, audiences, hooks, testing, scaling, signals.
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-4/03-meta-ads-execution-protocol-instruction-set.md` — choice matrix, assembly, QA, deployment.

MCP: `execute_phase4_ads_campaign`, `calculate_unit_economics`, `deploy_ads_campaign`, `run_iron_dome_qa`.
Connected MCPs to prefer: the `ads_*` Meta Ads tools (create campaign/ad set/ad/audience, pixel).

## Master Choice Matrix (ASK FIRST)
Objective (Awareness/Consideration/Conversion/Hybrid) · Budget Mode (Low/Med/High/Custom) ·
Audience Source (AI/Custom/Manual) · Creative Source (AI/Existing/Provided) · Deployment (API/Manifest/Python).

## Execution protocol
1. **Economics** — `calculate_unit_economics`: LTV = APV × Freq × Lifespan; **Max CPA = LTV/3**; Target CPA = LTV/4; Break-even ROAS = 1/Gross Margin; Target ROAS = ×1.5. Check budget adequacy by goal.
2. **Audience Architecture (T-META-02)** — persona→interests (Tier1 core / Tier2 adjacent / behaviors / exclusions); temperature segmentation Cold (0–30°) / Warm (31–60°) / Hot (61–100°).
3. **Hooks & Creatives (T-META-04/05)** — hook database; Creative Testing Matrix (15-variant protocol); angle library by archetype; format–angle match.
4. **Ad Set Engineering (T-META-03)** — name `TEMP_ARCH_GOAL_PLATFORM_GEO_AGE`; budget split Cold 20–30% / Warm 30–40% / Hot 40–50%; ABO vs CBO; bid strategy by temperature/goal.
5. **Retargeting Stack (T-META-06)** — L1 Viewers, L2 Engagers, L3 Site Visitors, L4 Cart Abandoners, L5 Past Purchasers; apply the **3-Day Exclusion** on Warm & Hot; frequency caps.
6. **Signals** — Conversion Event Hierarchy, Pixel & CAPI, Learning Phase protocol.
7. **Iron Dome QA (T-META-09)** — `run_iron_dome_qa`. If any check is ⚠️/❌, **ask the user for permission to adjust** before proceeding.
8. **Deploy** — present the **Final Approval Checkpoint** (campaign summary), then `deploy_ads_campaign`:
   - Manifest: `manifest.csv` + `ads_manager_instructions.md` (+ `creative_prompts.txt` if AI gen failed).
   - Python: `launch_ads.py` + `ads.json` — instruct the user to add their token and run it.
   - API: only if `META_ACCESS_TOKEN` is set, else use connected `ads_*` MCP tools.
   **Never ask the user for their access token directly.**

## Diagnose video creatives before & during testing
For video ad creatives and UGC, use the `video-content-diagnostics` skill to score hook/retention
before launch (kill weak hooks early) and to read fatigue signals during the test
(`detect_creative_fatigue`). Winning hooks/angles flow into the Creative Testing Matrix and the
hook database.

## Output
`campaign_brief.md`, `ad_sets.csv`, `creative_assets/*`, and the chosen deployment artifact. Run `/qa 4`.
