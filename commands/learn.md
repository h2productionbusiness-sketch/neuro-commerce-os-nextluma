---
description: Run the Neuro-Commerce OS self-improvement cycle — reflect on results, update memory + knowledge graph, propose next experiments. Usage: /learn [client]
---

# /learn — Self-Improvement Cycle

Invoke the `neuro-commerce-os:knowledge-graph-learning-loop` skill and run the learning cycle for:
`$ARGUMENTS`

Follow `nco://knowledge/system/memory-and-learning.md`:
1. **Load memory** — read `clients/<slug>/` (profile, personas, hooks.csv, performance.csv, insights.md).
2. **Reflect** — review closed campaigns/deliverables via `generate_learning_loop`: what met its goal, what didn't.
3. **Detect patterns** — `score_social_content` (winning hooks), `detect_creative_fatigue`, `score_churn_risk`, `score_persona_readiness` (readiness shifts).
4. **Update memory** — append to `hooks.csv` / `insights.md`, refine `personas/*.json`, update `knowledge-graph.json`.
5. **Recommend** — ICE-scored next experiments + persona/hook updates; ask before executing any change.

To make this recurring, use `/schedule` (cron) or `/loop` — the plugin does not run background jobs itself.
Output: updated memory files + a short "what changed & what to test next" summary.
