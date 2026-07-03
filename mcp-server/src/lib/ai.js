/**
 * ai.js — v3.0 unified LLM gateway.
 *
 * ARCHITECTURAL CORRECTION vs the master prompt's `callClaude`: an MCP server
 * cannot call Claude — Claude calls the server. So every generation call here
 * runs through OpenRouter when OPENROUTER_API_KEY is set, and otherwise
 * degrades to a READY-TO-RUN PROMPT SPEC that Claude (the caller) executes
 * itself. Same output contract either way; house rule #4 (graceful
 * degradation) holds everywhere.
 *
 *   chat(prompt, opts)   → { ok:true, text } | { ok:false, fallback:{prompt…} }
 *   vision(media, prompt)→ same, with image content (local path or URL)
 *   parseJsonLoose(text) → tolerant JSON extraction (fences, prose padding)
 */

import fs from "node:fs";
import path from "node:path";

const OR_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const CHAT_MODEL = () => process.env.OPENROUTER_CHAT_MODEL || "google/gemini-3.1-flash";
const VISION_MODEL = () => process.env.OPENROUTER_VISION_MODEL || "google/gemini-3.1-pro";

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif" };

export function aiAvailable() {
  return Boolean(process.env.OPENROUTER_API_KEY?.trim());
}

async function callOpenRouter(messages, model) {
  const res = await fetch(OR_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, messages }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenRouter ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenRouter returned no content");
  return text;
}

/**
 * Text generation. `json: true` asks for strict JSON output.
 * No API key → { ok:false, fallback } with the exact prompt for Claude to run.
 */
export async function chat(prompt, { model, json = false, system } = {}) {
  const finalPrompt = json
    ? `${prompt}\n\nReturn ONLY valid JSON — no markdown fences, no commentary.`
    : prompt;

  if (!aiAvailable()) {
    return {
      ok: false,
      fallback: {
        execute_with: "Claude (no OPENROUTER_API_KEY set — run this prompt yourself and use the result)",
        system: system || null,
        prompt: finalPrompt,
        expected: json ? "valid JSON" : "text",
      },
    };
  }

  const messages = [];
  if (system) messages.push({ role: "system", content: system });
  messages.push({ role: "user", content: finalPrompt });
  const text = await callOpenRouter(messages, model || CHAT_MODEL());
  return { ok: true, text, model: model || CHAT_MODEL() };
}

/** Encode a local image file or pass through an http(s)/data URL. */
export function toImageUrl(media) {
  if (/^(https?:|data:)/i.test(media)) return media;
  const abs = path.resolve(media);
  const mime = MIME[path.extname(abs).toLowerCase()];
  if (!mime) throw new Error(`Unsupported image type for vision: ${media}`);
  return `data:${mime};base64,${fs.readFileSync(abs).toString("base64")}`;
}

/**
 * Vision analysis (image path/URL + prompt). Used by the beauty assessor and
 * the emotion engine. No key → prompt-spec fallback describing what to view.
 */
export async function vision(media, prompt, { model, json = false } = {}) {
  const finalPrompt = json
    ? `${prompt}\n\nReturn ONLY valid JSON — no markdown fences, no commentary.`
    : prompt;

  if (!aiAvailable()) {
    return {
      ok: false,
      fallback: {
        execute_with: "Claude (no OPENROUTER_API_KEY — view the media yourself and answer the prompt)",
        media,
        prompt: finalPrompt,
        expected: json ? "valid JSON" : "text",
      },
    };
  }

  const content = [
    { type: "text", text: finalPrompt },
    { type: "image_url", image_url: { url: toImageUrl(media) } },
  ];
  const text = await callOpenRouter([{ role: "user", content }], model || VISION_MODEL());
  return { ok: true, text, model: model || VISION_MODEL() };
}

/** Tolerant JSON extraction: strips code fences and finds the first object/array. */
export function parseJsonLoose(text) {
  if (typeof text !== "string") throw new Error("parseJsonLoose: not a string");
  const stripped = text.replace(/```(?:json)?/gi, "").trim();
  try {
    return JSON.parse(stripped);
  } catch {
    const start = stripped.search(/[[{]/);
    if (start === -1) throw new Error("No JSON found in model output");
    for (let end = stripped.length; end > start; end--) {
      const candidate = stripped.slice(start, end);
      try { return JSON.parse(candidate); } catch { /* keep shrinking */ }
    }
    throw new Error("No parseable JSON found in model output");
  }
}
