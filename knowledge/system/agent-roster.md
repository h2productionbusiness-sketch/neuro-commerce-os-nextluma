# Neuro-Commerce OS — Agent Roster (the "crew")

The v6.0 vision names ~200 specialized agents. **Engineering reality:** in Claude Code, every agent
`.md` adds always-on description tokens to *every* session, and 200 agent files would bloat context and
slow the plugin badly. So the crew is implemented as **5 orchestrating agents** (the phase owners) that
each play the specialized roles below as *hats*, drawing on the phase skills + MCP tools. This roster is
the canonical reference the owners follow — invoke a role by name and the owning agent performs it.

> Load-bearing rule: roles are behaviors, not separate processes. One phase agent performs many roles in
> sequence. This keeps the plugin fast while preserving the full specialization.

## Core owners (real agents)
The Architect (P1) · The Brand Architect (P2) · The Content Engineer (P3) · The Ads Engineer (P4) ·
The Growth Orchestrator (P5) · The Orchestrator (automated Phase 1 runner). See `agents/*.md`.

## Phase 1 — The Architect's crew (Diagnostic)
- **Discovery & Intake:** Intake Questionnaire Engineer · Discovery Session Conductor · Data Collector · Asset Inventory Specialist · Legal & Compliance Auditor · Stakeholder Mapper
- **Market Intelligence:** Competitive Intelligence Analyst · Signal Extraction Engineer · Congregation Discovery Specialist · Trend Forecaster · TAM/SAM/SOM Calculator · Pricing Intelligence Analyst · Channel Discovery Specialist · SEO/Keyword Analyst
- **Persona Architecture:** Persona Data Synthesizer · 9W+H Architect · Archetype Mapper · Psychometric Scorer · Identity System Engineer · Psychographic Profile Builder · Decision-Psychology Analyst · Cultural-DNA Specialist · Buying-Psychology Analyst · Digital-Intelligence Analyst · Emotional-Journey Mapper · Persona-Card Designer
- **Strategic Synthesis:** Brutal-Truth Analyst · TOWS Engineer · ERRC Builder · Strategic-Blueprint Architect · Unit-Economics Calculator · Growth-Opportunity Mapper · Risk-Assessment Engineer · Customer-Journey Mapper · Signal-to-Insight Translator · Executive-Summary Architect

## Phase 2 — The Brand Architect's crew
Strategic Foundations (Brand Neurological Signature, Chemical-Trigger, StoryBrand, Positioning, Semiotic,
Status/Trust Codes…) · Visual & Sensory (Neuro-Chromatic, Color Psychologist, Color-Exile Enforcer #D5FF00,
Shape/Form, Typography, Sensory, Visual-Hierarchy, Smashability, Scroll-Stopping, Neuro-Visual Blueprint) ·
Messaging & Narrative (Voice, Tone, Power-Language, Messaging-Framework, Belief-Proof, Origin/Transformation/
Mythology, Hook, CTA, Adaptive) · Structural & Governance (Singularity, Portfolio, Naming, Ecosystem,
Editorial, Info-Architecture, Multi-Platform, Content-OS) · Experiential (Workflow, Roles, Governance,
Style-Guide, Brand-Essence, Co-Creation, Trust-Zone, Identity-Transformation, Cultural-Adaptation).

## Phase 3 — The Content Engineer's crew (Inception Codex)
Neuro-Cinema Creator (master) · Brain-Signal Engineer · Shape Psychologist · Scene Architect · Composition
Director · Lens Selector · Camera Operator · Lighting Engineer · Sound Designer · Colour-Grading Artist ·
Shot Architect · Camera-Movement Director · Edit Strategist · Pattern-Interrupt Engineer · Film-Emulation
Scientist · VFX/Plugin Specialist · Scriptwriter · Voiceover Director · Episode Architect · Storyboard Artist ·
Format/Platform Strategists · Launch Director · QA Director (150-point) · Content-Brief Creator · Crew Coordinator.

## Phase 4 — The Ads Engineer's crew (Meta Ads)
Strategy & Intelligence (Acquisition Architect, Unit-Economics, Goal-Alignment, Budget-Adequacy, Profit-
Guardrail, Attribution-Window, Competitor-Interest Miner, Congregation Analyst, Ad-Library Spy) · Audience &
Targeting (Audience Engineer, Persona-to-Interest, Intersection, Exclusion 5-Layer Shield, Lookalike, Cold/
Warm/Hot Builders, 3-Day-Exclusion Enforcer, Retargeting-Layer Architect, Cart-Fixer) · Creative & Hook (Hook
Intelligence Master, Hook-Category, Archetype-to-Hook, Temperature-Hook, Hook-Performance, Angle Strategist,
Format-Angle Matcher) · Creative Production (Creative-Velocity 15-Variant, AI Image/Video, Visual-OS Enforcer,
Upscaling) · Media Buying & Scaling (Naming Convention, Temperature Architect, FB/IG Separator, Budget 20-30-
40-10, Bid-Strategy, Scaling-Logic, Kill-Switch, Automated-Rules, Dayparting) · Analytics & Attribution
(Performance Analyst, KPI Dashboard, Fatigue Detector, Funnel Diagnostician, Attribution Bridge, Signal
Hierarchy, Offline-Conversion Uploader) · Post-Click AI (n8n Webhook Engineer, Lead-Enrichment, AI-Voice/
WhatsApp Deployer, Financial Monitor/LTV Logger) · Experimentation (Hypothesis Engineer, A/B Specialist,
Weekly-Learning Coordinator).

## Phase 5 — The Growth Orchestrator's crew
Predictive-Behavior Analyst · Trend Forecaster · Conversion-Probability Scorer · Churn-Risk Analyst ·
Content-Performance Predictor · Customer-Experience Orchestrator · Knowledge-Graph Engineer · Learning-Loop
Generator · Predictive-Dashboard Engineer · Causal-Intelligence Analyst.

## Metacognitive crew (self-improvement)
Memory-System Engineer · Reflection Engine · Skill Improver · Tool Optimizer · Agent-Performance Evaluator.
Implemented via `client-memory` conventions + the `/learn` cycle (see `knowledge/system/memory-and-learning.md`).

## If you truly want separate agent files
Say so and I can generate a focused subset (e.g., 8–12 high-value specialist agents) as real `agents/*.md`.
I will not generate 200 — it would degrade every session. Quality over count.
