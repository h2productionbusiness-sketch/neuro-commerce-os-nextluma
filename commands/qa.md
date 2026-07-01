---
description: Run the Neuro-Commerce OS quality-assurance checklist for a phase. Usage: /qa [1|2|3|4]
---

# /qa — Quality Assurance

Run the QA checklist for phase `$ARGUMENTS` (or the active phase). The master checklist is the MCP
resource `nco://template/execution_checklist`.

- **Phase 1–3** — walk the phase checklist item by item; mark ✅ / ⚠️ / ❌ with a note for each.
- **Phase 4** — call the `run_iron_dome_qa` MCP tool with the campaign's ad-set specs; report PASS /
  WARNING / FAIL per check and the overall verdict. If anything is ⚠️ or ❌, **explicitly ask the
  user for permission to adjust** before proceeding to launch.

End with: overall status (CLEARED / PROCEED WITH CAUTION / BLOCKED) and the list of items to fix.
