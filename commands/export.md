---
description: Export Neuro-Commerce OS deliverables to files / Notion / decks. Usage: /export [md|notion|pptx|csv]
---

# /export — Export Deliverables

Export the produced deliverables in the requested format (`$ARGUMENTS`, default markdown):

- **md** — write each deliverable as a `.md` file into the working folder, organized by phase.
- **notion** — if the Notion MCP is connected, create a database/pages (Brand Book, Bible, etc.); else write markdown and tell the user to import.
- **pptx** — use the PowerPoint MCP / `pptx` skill to build the client deck (Phase 1 Bible is a 100–150 slide deck).
- **csv** — export tabular deliverables (Ad Set Registry, Posting Calendar, Unit Economics) as CSV; use the templates at `nco://template/meta_ads_template` and `nco://template/unit_economics_template`.

Confirm the destination folder before writing. Summarize what was exported and where.
