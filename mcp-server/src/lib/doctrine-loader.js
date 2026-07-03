/**
 * doctrine-loader.js — v3.0 Industry Doctrine Loader.
 *
 * Doctrines live at knowledge/doctrines/<key>.md in a machine-parseable
 * flat format (see the template in knowledge/doctrines/_TEMPLATE.md):
 * section headers + `- key: value` lines + one-line revenue strategies.
 * (Deliberate deviation from the master prompt's nested YAML-ish sketch:
 * flat lines parse deterministically; nested markdown does not.)
 *
 * loadDoctrine(key) → parsed doctrine object; unknown keys fall back to
 * generic-b2c / generic-b2b; every doctrine is cached after first parse.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { synapse } from "./synapse.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(__dirname, "..", "..", "..");
export const DOCTRINE_DIR = path.join(PLUGIN_ROOT, "knowledge", "doctrines");

const cache = new Map();

export function listDoctrines() {
  if (!fs.existsSync(DOCTRINE_DIR)) return [];
  return fs.readdirSync(DOCTRINE_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => f.replace(/\.md$/, ""));
}

/* ------------------------------------------------------------------ */
/* parser                                                              */
/* ------------------------------------------------------------------ */

const SECTION_MAP = {
  colors: "colors", typography: "typography", imagery: "imagery", layout: "layout",
  "ui patterns": "ui_patterns", "copy style": "copy_style",
  "channel preferences": "channel_preferences", "biometric targets": "biometric_targets",
};

function parseDoctrineText(text, key) {
  const doctrine = {
    business_type: key,
    name: (text.match(/^#\s*(.+?)\s*Doctrine/mi) || [])[1] || key,
    sector: (text.match(/^sector:\s*(.+)$/mi) || [])[1]?.trim() || null,
    colors: {}, typography: {}, imagery: {}, layout: {}, ui_patterns: {}, copy_style: {},
    channel_preferences: { primary: [], secondary: [] },
    biometric_targets: { target_emotions: [], primal_triggers: [], limbic_triggers: [] },
    revenue_strategies: { 1: [], 2: [], 3: [], 4: [], 5: [] },
  };

  let section = null;
  let stage = null;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();

    const h3 = line.match(/^###\s*(.+)$/);
    const h2 = line.match(/^##\s*(.+)$/);
    if (h3) {
      const title = h3[1].toLowerCase();
      const stageM = title.match(/stage\s*(\d)/);
      if (stageM) { stage = Number(stageM[1]); section = "revenue"; continue; }
      section = SECTION_MAP[Object.keys(SECTION_MAP).find((k) => title.includes(k))] || null;
      stage = null;
      continue;
    }
    if (h2) {
      const title = h2[1].toLowerCase();
      section = SECTION_MAP[Object.keys(SECTION_MAP).find((k) => title.includes(k))] || null;
      if (title.includes("revenue")) section = "revenue";
      stage = null;
      continue;
    }

    const kv = line.match(/^-\s*([a-z_ ]+):\s*(.+)$/i);
    if (!kv) continue;
    const k = kv[1].trim().toLowerCase().replace(/\s+/g, "_");
    const v = kv[2].trim().replace(/^"(.*)"$/, "$1");

    if (section === "revenue" && k === "strategy" && stage) {
      // - strategy: Name | description | priority: High | cost: $X | roi: $Y | tools: a,b | channel: ch
      const parts = v.split("|").map((p) => p.trim());
      const s = { name: parts[0] || "Strategy", description: parts[1] || "" };
      for (const p of parts.slice(2)) {
        const m = p.match(/^(priority|cost|roi|tools|channel):\s*(.+)$/i);
        if (!m) continue;
        const field = m[1].toLowerCase();
        if (field === "tools") s.tools = m[2].split(",").map((t) => t.trim()).filter(Boolean);
        else if (field === "cost") s.estimated_cost = m[2].trim();
        else if (field === "roi") s.estimated_roi = m[2].trim();
        else s[field] = m[2].trim();
      }
      doctrine.revenue_strategies[stage].push(s);
      continue;
    }

    if (section === "channel_preferences" && (k === "primary" || k === "secondary")) {
      doctrine.channel_preferences[k] = v.split(",").map((c) => c.trim().toLowerCase()).filter(Boolean);
      continue;
    }
    if (section === "biometric_targets" && doctrine.biometric_targets[k] !== undefined) {
      doctrine.biometric_targets[k] = v.split(",").map((c) => c.trim().toLowerCase()).filter(Boolean);
      continue;
    }
    if (section && doctrine[section] && typeof doctrine[section] === "object") {
      doctrine[section][k] = v;
    }
  }

  return doctrine;
}

/* ------------------------------------------------------------------ */
/* loader                                                              */
/* ------------------------------------------------------------------ */

/**
 * Load a doctrine by industry key. Falls back generic-b2c → built-in default
 * so callers ALWAYS get a complete doctrine object.
 */
export function loadDoctrine(businessType, { b2b = false } = {}) {
  const key = String(businessType || "").trim().toLowerCase();
  if (cache.has(key)) return cache.get(key);

  const tryKeys = [key, b2b ? "generic-b2b" : "generic-b2c", "generic-b2c"];
  for (const k of tryKeys) {
    const file = path.join(DOCTRINE_DIR, `${k}.md`);
    if (fs.existsSync(file)) {
      const doctrine = parseDoctrineText(fs.readFileSync(file, "utf8"), k);
      doctrine.fallback = k !== key ? k : null;
      if (k !== key) synapse.fire("doctrine:fallback", { requested: key, used: k });
      cache.set(key, doctrine);
      return doctrine;
    }
  }

  // Last resort: built-in default (doctrine dir missing entirely).
  const dflt = parseDoctrineText("", key);
  dflt.colors = { primary: "#0B1E3C", secondary: "#FFFFFF", accent: "#4CD7FF", psychology: "Authority, clarity, technical trust" };
  dflt.typography = { heading: "Playfair Display (Serif)", body: "Montserrat (Sans-serif)", psychology: "Elegant, readable" };
  dflt.layout = { style: "Clean, structured", white_space: "Moderate", psychology: "Professional, organized" };
  dflt.copy_style = { tone: "Professional, warm", length: "Medium", psychology: "Trustworthy" };
  dflt.channel_preferences = { primary: ["email", "instagram"], secondary: ["sms", "whatsapp"] };
  dflt.biometric_targets = { target_emotions: ["trust", "aspiration"], primal_triggers: ["belonging"], limbic_triggers: ["status"] };
  dflt.fallback = "built-in-default";
  cache.set(key, dflt);
  return dflt;
}

export function clearDoctrineCache() { cache.clear(); }

/* ------------------------------------------------------------------ */
/* MCP tool                                                            */
/* ------------------------------------------------------------------ */

const json = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });

export const DOCTRINE_TOOLS = [
  {
    name: "load_doctrine",
    description:
      "v3.0 DOCTRINE LOADER. Loads the industry doctrine (visual system, copy style, revenue strategies by stage 1-5, channel preferences, biometric targets) for a business type from knowledge/doctrines/. Unknown keys fall back to generic-b2c/generic-b2b — callers always get a complete doctrine. Use classify_business first to get the key.",
    inputSchema: {
      type: "object",
      properties: {
        business_type: { type: "string", description: "Industry key, e.g. 'luxury-fashion', 'saas-b2b', 'cafe'." },
        b2b: { type: "boolean", description: "Prefer the generic-b2b fallback when the key is unknown." },
      },
      required: ["business_type"],
    },
    handler: async (a) => json(loadDoctrine(a.business_type, { b2b: !!a.b2b })),
  },
];
