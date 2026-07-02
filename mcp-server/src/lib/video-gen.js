/**
 * video-gen.js — v2.0 locked-character video generation.
 *
 * (Named video-gen.js because lib/video.js is the existing reel-DIAGNOSTICS
 * module; generation is a separate concern.)
 *
 * generateLockedVideo(character_id, prompt):
 *   1. loads the character from knowledge/system/character-registry.json
 *   2. reads every reference image and converts it to Base64 data URLs
 *   3. calls OpenRouter POST /api/v1/videos with input_references so the
 *      character stays visually IDENTICAL across every generated asset
 *   4. downloads the resulting MP4 to output/videos/ and returns the path
 *
 * Fallback philosophy (same as every other capability in this server):
 * with no OPENROUTER_API_KEY the tool degrades to a ready-to-run request
 * spec — payload, headers, curl — instead of failing.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(__dirname, "..", "..", "..");
export const REGISTRY_PATH = path.join(PLUGIN_ROOT, "knowledge", "system", "character-registry.json");
const OUTPUT_DIR = path.join(PLUGIN_ROOT, "output", "videos");

const OPENROUTER_VIDEOS_URL = "https://openrouter.ai/api/v1/videos";
const DEFAULT_MODEL = process.env.OPENROUTER_VIDEO_MODEL || "google/veo-3";

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

/* ---------------------------------------------------------------------- */
/* registry                                                               */
/* ---------------------------------------------------------------------- */

export function loadRegistry() {
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
}

export function getCharacter(characterId) {
  const reg = loadRegistry();
  const c = reg.characters?.[characterId];
  if (!c) {
    const known = Object.keys(reg.characters || {});
    throw new Error(`Unknown character "${characterId}". Registered: ${known.join(", ") || "(none)"}`);
  }
  return c;
}

/** Read the character's reference images as Base64 data URLs (missing files reported, not fatal). */
export function loadReferenceImages(character) {
  const refs = [];
  const missing = [];
  for (const rel of character.images || []) {
    const abs = path.join(PLUGIN_ROOT, rel);
    if (!fs.existsSync(abs)) {
      missing.push(rel);
      continue;
    }
    const mime = MIME[path.extname(abs).toLowerCase()];
    if (!mime) {
      missing.push(rel + " (unsupported type)");
      continue;
    }
    const b64 = fs.readFileSync(abs).toString("base64");
    refs.push({ type: "image", image_url: { url: `data:${mime};base64,${b64}` } });
  }
  return { refs, missing };
}

/* ---------------------------------------------------------------------- */
/* generation                                                             */
/* ---------------------------------------------------------------------- */

function buildPrompt(character, prompt) {
  const traits = (character.locked_traits || []).map((t) => `- ${t}`).join("\n");
  return (
    `${prompt}\n\nCHARACTER LOCK (non-negotiable visual constraints for ${character.name}):\n${traits}`
  );
}

function buildPayload(character, prompt, refs, model) {
  return {
    model: model || character.default_model || DEFAULT_MODEL,
    prompt: buildPrompt(character, prompt),
    input_references: refs,
  };
}

/**
 * Generate a character-locked video.
 * @param {{character_id:string, prompt:string, model?:string}} args
 */
export async function generateLockedVideo({ character_id, prompt, model }) {
  const character = getCharacter(character_id);
  const { refs, missing } = loadReferenceImages(character);

  if (!refs.length) {
    return {
      status: "blocked",
      reason: "No readable reference images — the character lock is impossible without them.",
      missing,
      fix: `Drop reference images at the paths listed in character-registry.json → characters.${character_id}.images`,
    };
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  const payload = buildPayload(character, prompt, refs, model);

  if (!apiKey) {
    // Graceful fallback: full ready-to-run spec (references summarized, not dumped).
    return {
      status: "fallback",
      reason: "OPENROUTER_API_KEY not set — returning the ready-to-run request spec.",
      character: character_id,
      request: {
        method: "POST",
        url: OPENROUTER_VIDEOS_URL,
        headers: { Authorization: "Bearer <OPENROUTER_API_KEY>", "Content-Type": "application/json" },
        payload: {
          ...payload,
          input_references: `[${refs.length} Base64 image reference(s) — built from ${character.images.length} registry path(s)]`,
        },
      },
      ...(missing.length ? { warnings: [`missing reference images: ${missing.join(", ")}`] } : {}),
      activate: "Set OPENROUTER_API_KEY in .mcp.json (or the environment) and re-run.",
    };
  }

  const res = await fetch(OPENROUTER_VIDEOS_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenRouter videos API ${res.status}: ${body.slice(0, 500)}`);
  }
  const data = await res.json();

  // Defensive extraction — provider payload shapes vary.
  const videoUrl =
    data?.data?.[0]?.url || data?.output?.[0]?.url || data?.video?.url || data?.url || null;
  const videoB64 = data?.data?.[0]?.b64_json || data?.video?.b64_json || null;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, `${character_id}-${Date.now()}.mp4`);

  if (videoB64) {
    fs.writeFileSync(outPath, Buffer.from(videoB64, "base64"));
  } else if (videoUrl) {
    const dl = await fetch(videoUrl);
    if (!dl.ok) throw new Error(`Video download failed: HTTP ${dl.status}`);
    fs.writeFileSync(outPath, Buffer.from(await dl.arrayBuffer()));
  } else {
    return {
      status: "submitted",
      note: "Provider returned no direct video URL — likely an async job. Raw response attached for follow-up.",
      response: data,
    };
  }

  return {
    status: "generated",
    character: character_id,
    model: payload.model,
    file: path.relative(PLUGIN_ROOT, outPath).replace(/\\/g, "/"),
    references_used: refs.length,
    ...(missing.length ? { warnings: [`missing reference images: ${missing.join(", ")}`] } : {}),
  };
}

/* ---------------------------------------------------------------------- */
/* MCP tool definition                                                    */
/* ---------------------------------------------------------------------- */

const json = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });

export const VIDEOGEN_TOOLS = [
  {
    name: "generate_locked_video",
    description:
      "CHARACTER-LOCKED video generation (v2.0). Generates a video via OpenRouter (/api/v1/videos) using the character's registry reference images as input_references, so the brand character looks IDENTICAL in every asset. Downloads the MP4 to output/videos/ and returns the path. Without OPENROUTER_API_KEY it returns the ready-to-run request spec instead of failing. Characters live in knowledge/system/character-registry.json.",
    inputSchema: {
      type: "object",
      properties: {
        character_id: { type: "string", description: "Character id from character-registry.json (e.g. 'luma')." },
        prompt: { type: "string", description: "Scene/action prompt. The character's locked_traits are appended automatically as hard constraints." },
        model: { type: "string", description: "Optional model override (default: character.default_model, then OPENROUTER_VIDEO_MODEL, then google/veo-3)." },
      },
      required: ["character_id", "prompt"],
    },
    handler: async (a) => json(await generateLockedVideo(a)),
  },
];
