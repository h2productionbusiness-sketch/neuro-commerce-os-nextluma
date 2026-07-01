---
name: brand-architecture
description: Phase 2 of the Neuro-Commerce OS. Use to build the NeuroBrand Operating System — brand neurological signature, positioning blueprint, semiotic + neuro-visual identity, messaging architecture, hook library, and the full 18-deliverable Brand Book. Triggers: "Start Phase 2", "Build Brand OS", "brand architecture", "brand positioning", "visual identity", "NeuroBrand".
---

# NeuroBrand Operating System (Phase 2)

> **Canonical skill.** This is the `neuro-commerce-os` plugin's Phase 2 skill. It supersedes any
> deprecated `nextluma-*` skill (e.g. `nextluma-phase-two-brand-architecture`) — proceed here.

You convert Phase 1 intelligence into a complete, neuroscience-grounded brand operating system:
**18 deliverables across 6 sections**, culminating in the Brand Book.

## Source of truth
Reproduce **exactly** from:
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-2/01-brand-architecture-deliverables.md` — the 18-deliverable master list (each with its sub-deliverables).
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-2/02-neurobrand-operating-system.md` — the framework (Brand Neurological Signature, StoryBrand, Symbolic/Status/Luxury codes, etc.).
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-2/03-brand-architecture-instruction-set.md` — step-by-step per deliverable + the Master Tool Stack & MCP config.

MCP: `execute_phase2_brand_architecture`; resources `nco://template/brand_os_template`, `nco://template/brand_deliverables_master_list`.

## The 18 deliverables
Section 1 — Executive & Strategic Intelligence: 01 Executive Intelligence Report, 02 Neuro-Psychographic Persona System, 03 Competitive Battlefield Intelligence, 04 Market Opportunity & Trend Report.
Section 2 — Brand Strategy: 05 Brand Positioning Blueprint, 06 Semiotic Brand System, 07 Neuro-Visual Identity Blueprint, 08 Messaging Architecture System.
Section 3 — Content & Creative: 09 Brand Content OS, 10 Creative Intelligence Matrix, 11 Hook & Attention Library.
Section 4 — Performance & Acquisition: 12 Meta Ads Intelligence Blueprint, 13 Funnel & Conversion Architecture, 14 Pricing & Offer Psychology Report.
Section 5 — Experience & Retention: 15 Customer Experience Blueprint.
Section 6 — AI & Systems: 16 AI Brand Knowledge System, 17 Behavioral Knowledge Graph, 18 Predictive Growth Intelligence Dashboard.

## Method (per the framework)
1. **Brand Neurological Signature** — Primary Utility classification → Primary/Secondary Chemical Trigger → Neurological Response Pattern → Emotional Byproduct → translate to brand systems (Persona-to-Brand Translation Matrix).
2. **Positioning** — StoryBrand (Hero/Conflict/Guide/Plan/CTA/Transformation); Achieve-Be-Do; Controlling Idea; Claim-Proof pairings; Fear→Reassurance, Desire→Promise, Identity→Positioning maps.
3. **Semiotics & Visual** — color/shape/typography psychology; Symbolic, Status, Luxury, Trust codes; Neuro-Chromatic system; attention paths, cognitive-load hierarchy, memory encoding.
4. **Messaging** — Voice & Tone, Messaging Framework, Power Language, Hook & CTA Engineering.
5. **Systems** — Content OS, Creative Intelligence, Hook Library, Meta Ads Blueprint, Funnel, Pricing/Offer, CX, AI Knowledge, Behavioral Graph, Predictive Dashboard.
6. **Assemble the Brand Book**; extract handoff documents for Phases 3 & 4.

## Tool stack & fallbacks
Image: Recraft/Higgsfield (or connected Canva/Figma MCP). Docs: Notion MCP → else markdown. Maps:
Miro MCP → else structured tables. Research: SerpAPI/Tavily via `analyze_market_intelligence`.

## Output
`brand_os.md`, `visual_identity_guide.md`, `messaging_framework.md`, `brand_book.md`. Run `/qa 2` at the end.
