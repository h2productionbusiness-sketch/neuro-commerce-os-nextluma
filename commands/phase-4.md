---
description: Phase 4 — Universal Meta Ads System (campaign build + Iron Dome QA + deploy). Usage: /phase-4
---

# PHASE 4 — UNIVERSAL META ADS SYSTEM

> 🔒 Use the **`neuro-commerce-os`** plugin only — its MCP tools + namespaced skills. Do NOT use
> `nextluma-*` or other marketplace skills, even if similarly named.

Start by calling `execute_phase4_ads_campaign`, then proceed with the
`neuro-commerce-os:meta-ads-system` skill. For: `$ARGUMENTS`

## Master Choice Matrix (ask first)
1. **Objective** — Awareness / Consideration / Conversion / Hybrid.
2. **Budget & Scaling Mode** — Low (5–15 TND) / Medium (15–40) / High (40–100+) / Custom.
3. **Audience Source** — AI-Recommended Interests / Upload Custom / Manual.
4. **Creative Source** — Generate AI / Use Existing / Provide URLs & Copy.
5. **Deployment Mode** — Automated API / Manifest + Guide / Python Script.

## Execution protocol
1. **Unit Economics** — `calculate_unit_economics` (One-Third Rule: Max CPA = LTV/3, Target CPA = LTV/4, Break-even ROAS = 1/Gross Margin, Target ROAS ×1.5).
2. **Audience Architecture** — persona→interests (T-META-02); Cold/Warm/Hot temperature segmentation.
3. **Hooks & Creatives** — Hook database + Creative Testing Matrix (15-variant protocol).
4. **Ad Set Engineering** — naming `TEMP_ARCH_GOAL_PLATFORM_GEO_AGE`; budget split Cold 20–30% / Warm 30–40% / Hot 40–50% (T-META-03).
5. **Retargeting Stack** — L1–L5 with the **3-Day Exclusion** on Warm & Hot (T-META-06).
6. **Iron Dome QA** — `run_iron_dome_qa`; fix every FAIL/WARNING before launch; ask permission to adjust.
7. **Deploy** — `deploy_ads_campaign` → manifest.csv + Ads Manager guide, or launch_ads.py, or live API. Never request the user's token directly.

## Deliverables (10 T-META templates)
Reproduce all 10 templates exactly from `nco://knowledge/phase-4/*`. Present the **Final Approval
Checkpoint** (campaign summary) before generating any deployable artifact.

When complete, run `/qa` (Iron Dome checklist).
