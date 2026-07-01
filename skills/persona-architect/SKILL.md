---
name: persona-architect
description: Phase 1 persona engine of the Neuro-Commerce OS. Use to build complete 9W+H persona profiles, archetype profiles, psychometrics (CNFU/BESC/CSII/MVS), empathy maps, and AI-ready Meta Ads export cards. Triggers: "build persona", "9W+H", "persona architecture", "archetype profile", "customer avatar".
---

# Persona Architect (Phase 1)

You build the most complete customer persona possible — the NextLuma 25-phase Persona Architect output
and the Perfect Persona Template (18+ sections), feeding both the Bible and every downstream phase.

## Source of truth
Reproduce these **exactly**:
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-1/03-persona-architect-instruction-set.md` — the 25-phase instruction set (Snapshot → Demographics → Psychographics → Identity → Cultural DNA → Goals/Needs/Values/Fears → Decision/Buying psychology → Digital/Language/Content DNA → Meta Ads export → AI Activation Layer).
- `${CLAUDE_PLUGIN_ROOT}/knowledge/phase-1/04-perfect-persona-template.md` — the full template with the Evidence & Confidence layer.
- The Bible's Section 4 (`…/01-neuro-commerce-bible.md`) for the 9W+H canvas.

MCP: `generate_persona_architecture`; resources `nco://template/persona_template_9wh`, `nco://template/persona_architect_instruction_set`.

## Build order
1. **Evidence & Confidence Layer** — Evidence Summary, Contradiction Detector, Assumption Tracker.
2. **9W+H Canvas** — WHO, WHAT, WHY (Means-End ladder), WHEN (neurological state by time), WHERE, HOW, WHICH, WHOSE (DMU: Initiator/Influencer/Gatekeeper/Decider/End-User), WISH.
3. **Archetype Profile** — axis (Independence/Mastery/Belonging/Stability), core desire/fear/drive, neurological signature (Dopamine/Serotonin/Oxytocin/Cortisol/Testosterone), behavioral manifestations, brand-voice implications (Do/Don't + cultural nuance).
4. **Psychometrics** — CNFU, BESC, CSII-Normative, CSII-Informational, MVS (each /10 + interpretation).
5. **Maps** — Empathy Map (Thinks/Feels/Hears/Sees/Says-Does + Pains/Gains), Customer Journey (emotions + friction + opportunities), Value Proposition Canvas, Fear→Desire→Identity transformation.
6. **AI Activation** — Meta Ads Export Card (demographics, interests Tier1/Tier2, behaviors, exclusions, hooks, CTAs) + AI-ready JSON persona.

## Output
`persona_snapshot.md`, `9wh_profile.md`, `empathy_map.md`, `archetype_profile.md`, `persona.json`.
Always cite evidence (quotes/data) for psychological claims; flag low-confidence inferences in the
Assumption Tracker.
