---
name: hook-attention-architecture
description: Scroll-stopping hook & pattern-interrupt engineering for the Neuro-Commerce OS. Use to engineer hooks that stop the scroll in under 1 second using neuroscience — pattern interrupts, hook templates by archetype, 3-second visuals, platform-specific rules, and hook scorecards. Triggers: "hooks", "pattern interrupt", "scroll-stopping", "3-second hook", "hook library".
---

# Hook & Attention Architecture (Skill 8)

Stop the scroll in <1 second by hijacking the orienting reflex.

## Source of truth
- Inception Codex Section 4 (`${CLAUDE_PLUGIN_ROOT}/knowledge/phase-3/03-inception-codex-v10-neuro-cinematic.md`) — Pattern Interrupt Neural Pathway, Pattern Interrupt Matrix, Visual/Audio interrupt techniques, Hook Engineering Templates, Hook Library by Archetype.
- Phase 2 Deliverable 11 — Hook & Attention Library; Phase 4 Hook Database (`…/knowledge/phase-4/02-meta-ads-acquisition-engine.md`, Part 2).
- MCP tool: `calculate_virality_score` (Pattern-Interrupt Strength is a VPS factor).

## Deliver
1. **Pattern Interrupt Neural Pathway** — Superior Colliculus → Locus Coeruleus → Amygdala.
2. **Pattern Interrupt Matrix** — 12 techniques (Glitch, Silence, Impossible Object, Anguished Face, Bass Drop, …).
3. **Visual** interrupts (Glitch, Impossible Object, Anguished Face) + **Audio** interrupts (Silence Drop, Sound Glitch, Bass Drop).
4. **Hook Engineering Templates** — 10+ formulas; **Hook Library by Archetype** (Pain, Curiosity, Status, Social Proof, Scarcity).
5. **3-Second Hook Visuals** — Face, Product, Text, Contrast, Action.
6. **Platform-Specific Hook Rules** — TikTok, Instagram, LinkedIn, YouTube.
7. **Hook Performance Scorecard** — CTR, VTR, Quality Score, Fatigue Level (use `detect_creative_fatigue`).

## Diagnose hooks from real video
To assess an actual reel's hook (not just design one), hand off to the `video-content-diagnostics`
skill: it drives the installed video MCP tools (`video-use`, `design-extract`, `mcp-video`, …) to
extract the 0–3s frames + transcript, then `score_social_content` returns the Hook Performance tier
(3-Second View Rate + Pattern-Interrupt Retention). Feed winning patterns back into the Hook Library.

**Output:** Hook Database, Attention Library, 3-Second Playbook.
