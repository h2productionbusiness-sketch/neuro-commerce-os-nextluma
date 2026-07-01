---
name: strategic-diagnostics
description: Phase 1 strategic-synthesis engine — Brutal Truth (5 Whys, Quantum Score, Financial Audit), TOWS, Blue Ocean ERRC, Perceptual Map, ROO/F.R.Y., risk register, and the One-Page Strategic Blueprint. Use for "brutal truth", "quantum score", "5 whys", "TOWS", "SWOT", "ERRC", "strategic blueprint", "risk register".
---

# Strategic Diagnostics (Phase 1 synthesis)

Consolidates the Phase 1 synthesis skills into one engine that turns diagnostic data into a defensible
strategy. Owned by the `p1-strategic-synthesis` sub-crew under The Architect.

## Capabilities absorbed
- **Brutal Truth Assessment** — Core Problem Statement, 5 Whys root cause, Quantum Score Dashboard (Financial Health / Operational Efficiency / Brand Authority / Growth Velocity → /100), Financial Baseline Audit (AOV/CAC/LTV/margin; "stolen / sleeping / invisible" money).
- **Strategic synthesis** — SWOT, TOWS Matrix, Blue Ocean ERRC Grid, Perceptual Map, Positioning Statement, ROO Pyramid, F.R.Y. Analysis, One-Page Strategic Blueprint (30/60/90).
- **Economics & risk** — Unit Economics, Growth-Opportunity map (€ impact + ROI), Risk Register.

## Method
1. From the Bible's diagnostic + market intel, run the Brutal Truth (5 Whys → root cause; Quantum Score /100; Financial Audit).
2. Build SWOT → TOWS (SO/ST/WO/WT strategies) and the Blue Ocean ERRC grid.
3. Quantify the opportunity (€ / ROI / payback) with `calculate_unit_economics`.
4. Assemble the One-Page Strategic Blueprint + Risk Register; feed positioning into Phase 2.

## MCP tools
- `calculate_unit_economics` — LTV, Max/Target CPA, Break-even/Target ROAS, budget adequacy.

## Source of truth
`nco://knowledge/phase-1/01-neuro-commerce-bible.md` — Sections 1.11–1.14 (Brutal Truth, 5 Whys, Quantum
Score, Financial Audit) and Section 10 (SWOT/TOWS/ERRC/Perceptual/Positioning/ROO/F.R.Y./Blueprint).
Reproduce those tables exactly.

## Rules
Use only neuro-commerce-os plugin components; never invoke nextluma-* or any other marketplace skill.
Quantify every recommendation (€, ROI, payback); triangulate from 2+ sources.
