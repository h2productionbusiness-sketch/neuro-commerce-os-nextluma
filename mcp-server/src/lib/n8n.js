// n8n.js — local n8n automation integration for the Neuro-Commerce OS.
// Plugin → n8n: trigger workflows via webhooks (the Phase 4 post-click / Phase 3 publish handoff).
// Security: webhook targets are restricted to localhost / the configured N8N_BASE_URL host unless
// ALLOW_EXTERNAL_WEBHOOKS=1 — prevents the tool being used for SSRF to arbitrary hosts.
const N8N_BASE_URL = process.env.N8N_BASE_URL || "http://localhost:5678";
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || ""; // e.g. http://localhost:5678/webhook/lead-capture
const ALLOW_EXTERNAL = process.env.ALLOW_EXTERNAL_WEBHOOKS === "1";

function hostOf(u) { try { return new URL(u).hostname; } catch { return null; } }
function isLocal(h) { return h === "localhost" || h === "127.0.0.1" || h === "::1"; }

export function webhookAllowed(url) {
  const h = hostOf(url);
  if (!h) return false;
  if (isLocal(h)) return true;
  if (h === hostOf(N8N_BASE_URL)) return true;
  return ALLOW_EXTERNAL;
}

export async function n8nStatus() {
  try {
    const r = await fetch(`${N8N_BASE_URL}/healthz`, { method: "GET" });
    return { reachable: r.ok, status: r.status, base_url: N8N_BASE_URL };
  } catch (e) {
    return { reachable: false, base_url: N8N_BASE_URL, error: String(e), hint: "Start n8n (`n8n start`) or set N8N_BASE_URL." };
  }
}

export async function triggerWebhook(url, payload) {
  const target = url || N8N_WEBHOOK_URL;
  if (!target) return { ok: false, error: "No webhook URL. Pass one or set N8N_WEBHOOK_URL (e.g. http://localhost:5678/webhook/lead-capture)." };
  if (!webhookAllowed(target)) {
    return { ok: false, error: `Refused: ${target} is not a local n8n host. Set ALLOW_EXTERNAL_WEBHOOKS=1 to allow external targets (only if you trust it).` };
  }
  try {
    const r = await fetch(target, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload ?? {}),
    });
    let body; try { body = await r.json(); } catch { body = await r.text().catch(() => ""); }
    return { ok: r.ok, status: r.status, target, response: body };
  } catch (e) {
    return { ok: false, target, error: String(e), hint: "Is n8n running and the workflow Active with a matching webhook path?" };
  }
}

// OS-aware local install + start guidance (Node route preferred since the user has Node; Docker fallback).
export function installGuide(os = "windows") {
  const node = {
    install: "npm install -g n8n@latest",
    start: "n8n start   # opens http://localhost:5678",
    note: "Requires Node >= 22.22 (you have it). First start builds the local SQLite DB in ~/.n8n.",
  };
  const dockerCmd = os === "windows"
    ? 'docker run -d --restart unless-stopped --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n -e N8N_SECURE_COOKIE=false docker.n8n.io/n8nio/n8n'
    : 'docker run -d --restart unless-stopped --name n8n \\\n  -p 5678:5678 -v n8n_data:/home/node/.n8n -e N8N_SECURE_COOKIE=false docker.n8n.io/n8nio/n8n';
  return {
    recommended: "node",
    node,
    docker: { install: "Install Docker Desktop, then:", run: dockerCmd },
    open: "http://localhost:5678",
    link_to_plugin: "After n8n is up, import automation/n8n/*.json, activate a workflow, copy its Production webhook URL, and set N8N_WEBHOOK_URL in .mcp.json (or pass it to trigger_n8n_workflow).",
  };
}

export const N8N_ENV = { N8N_BASE_URL, N8N_WEBHOOK_URL, ALLOW_EXTERNAL };
