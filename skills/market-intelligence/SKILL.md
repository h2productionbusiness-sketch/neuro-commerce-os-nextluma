---
name: market-intelligence
description: Competitive battlefield mapping & congregation discovery for the Neuro-Commerce OS. Use for TAM/SAM/SOM sizing, competitor profiling, customer-signal extraction, congregation discovery, PESTLE, trend analysis, and white-space identification. Triggers: "market intelligence", "competitor analysis", "find congregations", "TAM SAM SOM", "customer signals".
---

# Market Intelligence System (Skill 3)

Map the competitive battlefield and find where the audience congregates.

## Source of truth
- Phase 1 Bible Section 5 (`${CLAUDE_PLUGIN_ROOT}/knowledge/phase-1/01-neuro-commerce-bible.md`) — Market Size, Porter's Five Forces, PESTLE, Competitor Landscape, Customer Signals, Congregation Discovery, Trends.
- Phase 2 Deliverable 03/04 (`…/knowledge/phase-2/01-brand-architecture-deliverables.md`) — Competitive Battlefield + Market Opportunity & Trend Report.
- MCP tool: `analyze_market_intelligence` (SerpAPI→Tavily→manual fallback). Prefer connected search/social MCPs (web_search, google_trends, reddit) for triangulation.

## Deliver
1. **Market sizing** — TAM/SAM/SOM + growth potential + additional-revenue opportunity.
2. **Competitive Positioning Matrix** + Strategic Group Map; deep profiles across 7 dimensions (messaging, visual, pricing, digital dominance, sentiment, strengths/weaknesses, gaps).
3. **Customer Signals** — Positive / Negative / Aspirational themes with frequency + verbatim quotes.
4. **Congregation Discovery** — ranked groups/subreddits/forums with **Quality Score /40** (Activity + Member Authenticity + Relevance + Size) and Meta targeting.
5. **PESTLE** + **Trends** (megatrends, micro-trends, audio trends) + **white-space opportunities**.

Triangulate every claim from 2+ sources; cite links; mark confidence.

## Competitive Creative Intelligence (video)
To analyze competitors' reels/ads, hand off to `video-content-diagnostics`: it uses the installed
video MCP tools to extract frames + transcript from competitor TikTok/IG/YouTube videos, then scores
their hooks, retention, pacing, and virality. Roll the teardowns into the competitor profiles
(messaging/visual dimensions) and the white-space analysis.

**Output:** Competitor Intelligence Report, Customer Signals, Congregation Log.
