# Neuro-Commerce OS — Memory & Self-Improvement System

Implements v6.0 Directives 2/3 (Self-Improvement, Memory) and Parts 5 & 8, using file-based memory the
plugin can actually read/write across sessions — no fictional always-on daemon.

## Memory model (file-based client knowledge base)
For each client, keep a folder in the working project:
```
clients/<client-slug>/
  profile.json            # name, industry, revenue, employees, location, assets (logo/guidelines/financials Y/N), links
  phase1/  phase2/  ...    # deliverables per phase (decks, md, json)
  personas/<name>.json     # 9W+H + archetype + purchase-readiness %
  decisions.md             # every user choice + rationale (append-only)
  insights.md             # key learnings from experiments (append-only)
  hooks.csv               # hook performance DB: id,category,script,archetype,temp,CTR,CVR,CPA,winRate,status
  performance.csv         # CPA/ROAS/LTV/churn/VPS over time
  session-log.md          # session id, date, phases done, deliverables, next steps
```
**Rules:** at session start, read `profile.json` + `session-log.md` for the active client and load context —
**never ask what's already recorded.** After each deliverable/decision, append to the relevant file.
Proactively ask only for genuinely missing inputs (logo, financials, URLs, competitors); if the user says
"none", record that and proceed with fallbacks.

## Self-improvement (the `/learn` cycle — on demand, not a 6 AM daemon)
Run `/learn` (or after a campaign closes) — it uses `generate_learning_loop` and the growth tools:
1. **Reflect** — review closed campaigns/deliverables; what hit its goal, what didn't.
2. **Detect patterns** — winning hooks (`score_social_content`), fatigue (`detect_creative_fatigue`), churn (`score_churn_risk`), readiness shifts (`score_persona_readiness`).
3. **Update memory** — append to `hooks.csv`, `insights.md`, refine `personas/*.json` (readiness history), update the knowledge graph.
4. **Recommend** — ICE-scored next experiments; ask the user to approve before executing.

Cadence is the user's choice, not automatic. To make it recurring, use the built-in **`/schedule`** (cron
cloud agent) or **`/loop`** — e.g. a weekly `/learn` run. The plugin never runs background jobs on its own.

## Knowledge graph (behavioral)
Nodes: Personas · Archetypes · Hooks · Angles · Creatives · Campaigns · Platforms · Industries.
Edges (weighted by performance, recency-decayed): Persona→Hook · Archetype→Goal · Hook→Visual · Campaign→
Outcome · Audience→Conversion · Platform→Engagement. Store as `clients/<slug>/knowledge-graph.json`;
update via `generate_learning_loop`. Use it to predict CPA/CTR/CVR and best hook×visual before launch.

## Honest scope
- Persistence is **file-based** in the client folder — durable across sessions when you keep the folder.
- "Learns from every interaction / daily at 06:00" from the spec is realized as the **on-demand `/learn`
  cycle + optional `/schedule` cron**, not an always-running process (Claude Code plugins don't run daemons).
