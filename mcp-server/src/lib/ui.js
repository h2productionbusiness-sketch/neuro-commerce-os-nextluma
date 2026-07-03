/**
 * ui.js — the v2.0 Zero-Command UI layer (MCP Apps).
 *
 * Serves the knowledge/design/ dashboards as ui:// resources and adds the
 * configuration tools. Uses the @modelcontextprotocol/ext-apps protocol
 * constants directly (RESOURCE_MIME_TYPE, RESOURCE_URI_META_KEY) — the
 * package's registerAppTool/registerAppResource helpers require the
 * high-level McpServer, and this server is (deliberately) built on the
 * low-level Server API with 34 JSON-schema tools; re-registering them all
 * mid-flight would be churn without benefit. Same wire format either way.
 *
 * Hosts without MCP-Apps support simply see JSON — the cards are
 * progressive enhancement, never a dependency.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RESOURCE_MIME_TYPE, RESOURCE_URI_META_KEY } from "@modelcontextprotocol/ext-apps/server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(__dirname, "..", "..", "..");
const DESIGN_DIR = path.join(PLUGIN_ROOT, "knowledge", "design");
const MCP_JSON = path.join(PLUGIN_ROOT, ".mcp.json");

/* ---------------------------------------------------------------------- */
/* ui:// resources (item 21–22)                                           */
/* ---------------------------------------------------------------------- */

export const UI_RESOURCES = [
  { uri: "ui://neuro-commerce-os/welcome-dashboard", file: "welcome-dashboard.html", name: "OS Welcome Dashboard", description: "Engagement status, 18-step phase progress, Synapse feed, next action." },
  { uri: "ui://neuro-commerce-os/action-card", file: "action-card.html", name: "Action Card", description: "Generic card renderer: KPIs, ranked options with cost/quality meters, action buttons." },
  { uri: "ui://neuro-commerce-os/setup-wizard", file: "setup-wizard.html", name: "Setup Wizard", description: "Env-key onboarding; saves via save_os_configuration." },
  { uri: "ui://neuro-commerce-os/memory-manager", file: "memory-manager.html", name: "Memory Manager", description: "Inspect + override client facts, learnings, operator preferences." },
];

export function listUiResources() {
  return UI_RESOURCES.map((r) => ({
    uri: r.uri,
    name: r.name,
    description: r.description,
    mimeType: RESOURCE_MIME_TYPE,
  }));
}

export function readUiResource(uri) {
  const r = UI_RESOURCES.find((x) => x.uri === uri);
  if (!r) return null;
  const html = fs.readFileSync(path.join(DESIGN_DIR, r.file), "utf8");
  return { uri, mimeType: RESOURCE_MIME_TYPE, text: html };
}

/** _meta block linking a tool to its card template (item 23). */
export const cardMeta = (template = "action-card") => ({
  [RESOURCE_URI_META_KEY]: `ui://neuro-commerce-os/${template}`,
});

/* ---------------------------------------------------------------------- */
/* env / setup check (item 24)                                            */
/* ---------------------------------------------------------------------- */

const ENV_KEYS = [
  { name: "SERPAPI_API_KEY", enables: "Live market research (preferred provider)" },
  { name: "TAVILY_API_KEY", enables: "Live market research (fallback provider)" },
  { name: "RECRAFT_API_KEY", enables: "AI image generation (preferred)" },
  { name: "LEONARDO_API_KEY", enables: "AI image generation (fallback)" },
  { name: "SD_API_URL", enables: "Local Stable Diffusion image generation" },
  { name: "OPENROUTER_API_KEY", enables: "Locked-character video generation (generate_locked_video)" },
  { name: "OPENROUTER_VIDEO_MODEL", enables: "Video model override (default google/veo-3)" },
  { name: "ALTERLAB_API_KEY", enables: "Web scraping — competitor sites, blogs, directories (AlterLab)" },
  { name: "OUTSCRAPER_API_KEY", enables: "Google Maps scraping — places, reviews, local competitors (Outscraper)" },
  { name: "BRIGHTDATA_API_TOKEN", enables: "Social scraping — Meta/IG/TikTok/X/LinkedIn/YouTube/Reddit (Bright Data)" },
  { name: "META_ACCESS_TOKEN", enables: "Live Meta Ads deployment" },
  { name: "META_AD_ACCOUNT_ID", enables: "Live Meta Ads deployment (account)" },
  { name: "N8N_WEBHOOK_URL", enables: "Post-click automation triggers" },
];

export function checkSetup() {
  const keys = ENV_KEYS.map((k) => ({
    name: k.name,
    enables: k.enables,
    configured: Boolean(process.env[k.name]?.trim()),
  }));
  const missing = keys.filter((k) => !k.configured).map((k) => k.name);
  return {
    setupNeeded: missing.length > 0,
    configured: keys.filter((k) => k.configured).map((k) => k.name),
    missing,
    keys,
    wizard: "ui://neuro-commerce-os/setup-wizard",
    note: "All keys are optional — every capability has a documented fallback. Configure via save_os_configuration.",
  };
}

/* ---------------------------------------------------------------------- */
/* save_os_configuration (item 25)                                        */
/* ---------------------------------------------------------------------- */

const ALLOWED_KEYS = new Set([...ENV_KEYS.map((k) => k.name), "N8N_BASE_URL", "ALLOW_EXTERNAL_WEBHOOKS", "NEURO_MEMORY_DB"]);

export function saveOsConfiguration({ keys = {} }) {
  const rejected = Object.keys(keys).filter((k) => !ALLOWED_KEYS.has(k));
  const accepted = Object.entries(keys).filter(([k, v]) => ALLOWED_KEYS.has(k) && typeof v === "string" && v.trim());

  if (!accepted.length) {
    return { saved: false, reason: "No valid keys provided.", allowed: [...ALLOWED_KEYS], rejected };
  }

  const cfg = JSON.parse(fs.readFileSync(MCP_JSON, "utf8"));
  const server = cfg.mcpServers?.["neuro-commerce-os"];
  if (!server) return { saved: false, reason: ".mcp.json has no neuro-commerce-os server block." };
  server.env = server.env || {};

  const savedKeys = [];
  for (const [k, v] of accepted) {
    server.env[k] = v.trim();
    process.env[k] = v.trim(); // live immediately, no restart needed for new calls
    savedKeys.push(k);
  }
  fs.writeFileSync(MCP_JSON, JSON.stringify(cfg, null, 2) + "\n", "utf8");

  // Values are NEVER echoed back — key names only.
  return {
    saved: true,
    keys: savedKeys,
    persistedTo: ".mcp.json",
    liveNow: true,
    ...(rejected.length ? { rejected } : {}),
    setup: checkSetup(),
  };
}

/* ---------------------------------------------------------------------- */
/* suggest_model_routing (item 27)                                        */
/* ---------------------------------------------------------------------- */

const MODEL_ROUTES = {
  video: [
    { id: "google/veo-3", label: "Veo 3", detail: "Top realism + native audio — hero ads, brand films.", cost: 0.9, quality: 0.95, recommended: true },
    { id: "kling/kling-2", label: "Kling 2", detail: "Strong motion, mid cost — volume creative testing.", cost: 0.5, quality: 0.75 },
    { id: "minimax/hailuo", label: "Hailuo", detail: "Cheapest per clip — 15-variant hook batches.", cost: 0.2, quality: 0.55 },
  ],
  image: [
    { id: "recraft", label: "Recraft V3", detail: "Brand-styled vectors + text rendering — identity assets.", cost: 0.5, quality: 0.9, recommended: true },
    { id: "leonardo", label: "Leonardo", detail: "Fast iterations — mood boards, drafts.", cost: 0.3, quality: 0.7 },
    { id: "sd-local", label: "Local SD", detail: "Free at your GPU's pace — bulk backgrounds.", cost: 0.05, quality: 0.6 },
  ],
  copy: [
    { id: "claude-opus", label: "Claude Opus", detail: "Flagship strategy + long-form — Bible sections, brand narrative.", cost: 0.85, quality: 0.97, recommended: true },
    { id: "claude-sonnet", label: "Claude Sonnet", detail: "Fast, strong — ad variants, hooks at volume.", cost: 0.35, quality: 0.85 },
    { id: "claude-haiku", label: "Claude Haiku", detail: "Cheapest — classification, tagging, bulk rewrites.", cost: 0.1, quality: 0.65 },
  ],
};

export function suggestModelRouting({ task_type = "copy", budget_sensitivity = "balanced" }) {
  const options = MODEL_ROUTES[task_type] || MODEL_ROUTES.copy;
  // balanced weights quality 0.7 / cost 0.3 — pure (quality - cost) would
  // crown the cheapest option and contradict the recommended flags.
  const score = (o) => o.quality * 0.7 - o.cost * 0.3;
  const ranked = [...options].sort((a, b) =>
    budget_sensitivity === "cost-first" ? a.cost - b.cost
    : budget_sensitivity === "quality-first" ? b.quality - a.quality
    : score(b) - score(a)
  );
  return {
    card: {
      title: `Model routing — ${task_type}`,
      subtitle: `Ranked for: ${budget_sensitivity}`,
      kpis: [
        { label: "options", value: ranked.length },
        { label: "mode", value: budget_sensitivity },
      ],
      options: ranked,
      actions: [{ tool: "suggest_model_routing", label: "Re-rank cost-first", params: { task_type, budget_sensitivity: "cost-first" } }],
    },
    pick: ranked[0].id,
    rationale: `Best ${budget_sensitivity} trade-off for ${task_type}.`,
  };
}

/* ---------------------------------------------------------------------- */
/* MCP tool definitions                                                   */
/* ---------------------------------------------------------------------- */

const json = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });
const jsonCard = (obj, template) => ({ ...json(obj), _meta: cardMeta(template) });

export const UI_TOOLS = [
  {
    name: "save_os_configuration",
    description:
      "ZERO-COMMAND UI. Persist API keys / env values into .mcp.json (neuro-commerce-os server env block) and apply them to the live process. Whitelisted keys only; values are never echoed back. Pairs with the setup-wizard app (ui://neuro-commerce-os/setup-wizard).",
    inputSchema: {
      type: "object",
      properties: {
        keys: { type: "object", description: "Map of ENV_KEY → value, e.g. {\"OPENROUTER_API_KEY\": \"…\"}." },
      },
      required: ["keys"],
    },
    _meta: cardMeta("setup-wizard"),
    handler: async (a) => jsonCard(saveOsConfiguration(a), "setup-wizard"),
  },
  {
    name: "suggest_model_routing",
    description:
      "ZERO-COMMAND UI. Cost/quality model routing for a task type (video | image | copy) as an Action Card — ranked options with meters, a recommended pick, and re-rank actions. Modes: balanced | cost-first | quality-first.",
    inputSchema: {
      type: "object",
      properties: {
        task_type: { type: "string", enum: ["video", "image", "copy"], description: "What is being produced." },
        budget_sensitivity: { type: "string", enum: ["balanced", "cost-first", "quality-first"], description: "Ranking mode (default balanced)." },
      },
    },
    _meta: cardMeta("action-card"),
    handler: async (a) => jsonCard(suggestModelRouting(a ?? {}), "action-card"),
  },
];
