---
name: n8n-automation
description: Local n8n automation for the Neuro-Commerce OS — install/run n8n, import the post-click lead pipeline, and trigger workflows from the plugin (Phase 4 post-click handoff, Phase 3 publishing, lead enrichment, offline-conversion upload). Triggers: "set up n8n", "automate leads", "post-click automation", "trigger a workflow", "webhook".
---

# n8n Automation

n8n is the OS's local automation/webhook engine (per the Phase 4 post-click handoff and the original
tool stack). It runs on your machine at **http://localhost:5678** and the plugin talks to it over webhooks.

## Tools
- **`install_n8n`** — OS-appropriate install/run commands + live reachability status.
- **`configure_n8n_webhook`** — setup steps + the bundled importable workflow JSON.
- **`trigger_n8n_workflow`** — POST a payload to an n8n webhook (localhost-restricted by default).
- Status is also surfaced by `install_n8n` (`/healthz` probe of `N8N_BASE_URL`).

## Install & run (Node route)
```bash
npm install -g n8n@1          # use the STABLE 1.x line (installed here: v1.123.62)
n8n start                      # serves http://localhost:5678  (set N8N_SECURE_COOKIE=false on localhost)
```
Or double-click **`automation/n8n/start-n8n.cmd`**.
> ⚠️ **Version caveat:** n8n **2.28.x** ships a broken dependency tree (mismatched `@langchain/core`,
> `./utils/uuid` exports error) that fails to boot on both Node 22 and 24. Stay on the **1.x** line until
> 2.x is fixed. 1.x runs fine on your global Node 24.
Docker fallback: `docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n -e N8N_SECURE_COOKIE=false docker.n8n.io/n8nio/n8n`.
Keep it running in its own terminal (or install as a service / `pm2 start n8n`).

## Link it to the plugin
1. Open http://localhost:5678, finish first-run setup.
2. Import **`${CLAUDE_PLUGIN_ROOT}/automation/n8n/lead-automation-pipeline.json`** (Workflows → Import).
3. Replace the `YOUR_*` placeholders (Vapi key/assistant, Meta ad-account/token).
4. **Activate** the workflow; open the Webhook node; copy the **Production URL** (`…/webhook/lead-capture`).
5. Set **`N8N_WEBHOOK_URL`** to that URL in `.mcp.json` (or pass `webhook_url` to `trigger_n8n_workflow`).
6. Point your Meta Lead Form / CRM webhook at the same URL so leads flow in.

## The bundled pipeline (Phase 4 post-click)
`Webhook (lead-capture) → Lead Scoring (Code) → High-Intent? (IF) → [HIGH] Vapi AI call + [both] Meta CAPI offline-conversion upload`.
This tells Meta which creatives produce *qualified* leads, so the algorithm optimizes for value, not just form-fills.

## How the plugin triggers automations
After a phase produces something automatable, call `trigger_n8n_workflow` with a payload, e.g.:
- Phase 3 publish: `{ action: "publish", platform, caption, media_url, schedule_time }` → an n8n "content-publish" workflow.
- Phase 4 lead: `{ email, phone, job_title, company_revenue }` → the lead pipeline.
- Deliverable handoff: `{ action: "save", target: "notion|drive", files: [...] }`.

## Security
- Webhook targets are restricted to **localhost / your `N8N_BASE_URL` host**. To POST to an external host, set `ALLOW_EXTERNAL_WEBHOOKS=1` (only if you trust it).
- Never put real API keys in the workflow JSON you commit — use n8n Credentials or `.mcp.json` env. The plugin never asks for tokens in chat.
