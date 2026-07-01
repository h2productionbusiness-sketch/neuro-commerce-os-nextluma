---
name: kontent-kreation
description: Phase 3 of the Neuro-Commerce OS. Use to run the Kontent Kreation Intelligence System — ideation, neuro-cinematic content briefs, scripts, storyboards, production specs, AI/real asset generation, platform exports, scheduling, and performance. Triggers: "Start Phase 3", "Build Content", "content production", "content calendar", "Kontent Kreation".
---

# Kontent Kreation Intelligence System (Phase 3)

You run the full content production pipeline (Phases 0–12). For the neuro-cinematic *craft* (lenses,
lighting, sound, shape psychology, hooks, film-emulation), use the companion **`inception-codex`** skill.

## Source of truth
Reproduce **exactly** from:
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-3/01-kontent-kreation-deliverables.md` — every deliverable, Phases 0–12.
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-3/02-kontent-kreation-instruction-set.md` — workflow, tool stack, and fallback decision logic.
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-3/03-inception-codex-v10-neuro-cinematic.md` — the craft engine.

MCP: `execute_phase3_content_production`, `create_content_strategy`, `generate_image_asset`, `generate_voiceover`.

## Initialization — user choice protocol (ASK FIRST)
1. **Production Mode** — AI-Generated vs Real Production.
2. **Posting Frequency** — Low (1–3/wk) · Medium (1/day) · High (2–3/day) · Insane (5+/day).

## Workflow (Phases 0–12)
0. **Intelligence Inputs** — Persona Report, Demand-State Matrix, Archetype Selection, Emotional Trigger Matrix, Offer Intelligence Report.
1. **Ideation** — Idea Bank (10–20), Trend Validation Sheet, Content Opportunity Matrix.
2. **Strategy** — NeuroCinematic Content Brief (use `inception-codex` template 5.1).
3. **Scripting** — Script (Draft→V2→Final) + Voiceover Script (timestamps).
4. **Storyboarding** — Storyboard Package (cards).
5. **Production** — Shot List, Lighting Plan, Audio Plan, Location Sheet, Call Sheet, Equipment Checklist.
6. **Asset Collection** — AI mode: `generate_image_asset` (Recraft→Leonardo→SD→prompt) + `generate_voiceover` (edge-tts→spec); Real mode: raw footage/audio/photos/B-roll.
7. **Post-Production** — Project File, Master Export, Colour & Film-Emulation Package.
8. **Distribution Assets** — Thumbnails, Captions & Subtitles, Hashtag Strategy, Metadata & SEO, Copy.
9. **Platform Exports** — TikTok, IG Reel, IG Feed, YouTube, LinkedIn, FB (specs from Inception Codex 6.4).
10. **Scheduling** — Posting Calendar, Campaign Schedule (circadian-aligned times).
11. **Performance** — Dashboard, Hook Performance Report, Content Scorecard, Virality Probability (VPS) & CPS.
12. **Supplemental Systems** — Trend/Competitive Intel, Budget, etc.

## Video diagnosis (analyze, not just create)
At Phase 1 (Ideation / Competitive Creative Intel) and Phase 11 (Performance), use the
`video-content-diagnostics` skill to ingest real reels via the installed video MCP tools and score
hook/retention/virality (`diagnose_video_content` → `score_social_content`). Use the teardown to brief
the next round of scripts and to detect creative fatigue (`detect_creative_fatigue`).

## Fallback logic
Apply the documented fallback chain for every tool (image, voiceover, video, scheduling). If no tool
is available, output the production-ready spec/prompt and tell the user how to produce it manually.

## Output
`scripts.md`, `storyboard.md`, `video_assets/*`, `thumbnails/*`, `posting_calendar.csv`. Run `/qa 3` at the end.
