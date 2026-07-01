---
name: client-memory
description: File-based memory for the Neuro-Commerce OS — persist and recall client data, decisions, personas, hook performance, and deliverables across sessions so the OS never re-asks known facts. Use at session start to load a client, and after each deliverable/decision to save. Triggers: "load client", "remember this", "continue previous session", "what do we know about [client]".
---

# Client Memory

Give the OS durable, cross-session memory using files in the working project — no daemon, no re-asking.

## Layout (per client)
```
clients/<client-slug>/
  profile.json      # name, industry, revenue, employees, location, assets(Y/N), links
  phase1..phase5/   # deliverables (decks, md, json)
  personas/<name>.json   # 9W+H + archetype + purchase-readiness % (with history)
  decisions.md      # append-only: choice + rationale + date
  insights.md       # append-only: experiment learnings
  hooks.csv         # id,category,script,archetype,temp,CTR,CVR,CPA,winRate,status
  performance.csv   # date,campaign,CPA,ROAS,LTV,churn,VPS
  knowledge-graph.json
  session-log.md    # session id, date, phases done, deliverables, next steps
```

## Protocol
- **On start / "load client":** read `profile.json` + `session-log.md`; summarize what's known and what phase is next. **Never ask for data already on file.**
- **Proactively request only genuinely missing inputs:** logo, brand guidelines, financials (AOV/LTV/margin), website, socials, Google Maps, existing content, customer list, competitors. If the user says "none", record `"none"` and use fallbacks.
- **After each deliverable/decision:** write the output into the phase folder; append the choice+rationale to `decisions.md`; update `session-log.md` with next steps.
- **Feeds `/learn`:** the learning cycle reads/writes `hooks.csv`, `insights.md`, `personas/*.json`, `knowledge-graph.json`.

## Notes
- Memory is only as durable as the `clients/` folder — keep it in the project (or a synced drive).
- If a Notion/Airtable MCP is connected, mirror `profile.json` + deliverables there via `deploy_to_notion` conventions; otherwise the local files are the source of truth.
