// image.js — AI image generation with fallback logic (per the docs):
//   IF Recraft key -> Recraft
//   ELSE IF Leonardo key -> Leonardo
//   ELSE IF local Stable Diffusion (AUTOMATIC1111) reachable -> SD
//   ELSE -> return a detailed, ready-to-paste text-to-image prompt.
const RECRAFT_KEY = process.env.RECRAFT_API_KEY;
const LEONARDO_KEY = process.env.LEONARDO_API_KEY;
const SD_URL = process.env.SD_API_URL || "http://127.0.0.1:7860";

export function imageProvider() {
  if (RECRAFT_KEY) return "recraft";
  if (LEONARDO_KEY) return "leonardo";
  return "fallback"; // SD is probed lazily on call
}

async function recraft(prompt, { style = "digital_illustration", size = "1024x1024" } = {}) {
  const r = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RECRAFT_KEY}` },
    body: JSON.stringify({ prompt, style, size }),
  });
  if (!r.ok) throw new Error(`Recraft ${r.status}`);
  const j = await r.json();
  return { provider: "recraft", prompt, images: (j.data || []).map((d) => d.url) };
}

async function leonardo(prompt, { width = 1024, height = 1024 } = {}) {
  const r = await fetch("https://cloud.leonardo.ai/api/rest/v1/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${LEONARDO_KEY}` },
    body: JSON.stringify({ prompt, width, height, num_images: 1 }),
  });
  if (!r.ok) throw new Error(`Leonardo ${r.status}`);
  const j = await r.json();
  return { provider: "leonardo", prompt, generationId: j?.sdGenerationJob?.generationId, note: "Poll Leonardo for the result image." };
}

async function stableDiffusion(prompt, { width = 1024, height = 1024, steps = 30 } = {}) {
  const r = await fetch(`${SD_URL}/sdapi/v1/txt2img`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, width, height, steps }),
  });
  if (!r.ok) throw new Error(`SD ${r.status}`);
  const j = await r.json();
  return { provider: "stable-diffusion", prompt, images_base64: (j.images || []).slice(0, 1) };
}

export async function generateImage(prompt, opts = {}) {
  const provider = imageProvider();
  try {
    if (provider === "recraft") return await recraft(prompt, opts);
    if (provider === "leonardo") return await leonardo(prompt, opts);
    // try local SD
    return await stableDiffusion(prompt, opts);
  } catch (e) {
    return {
      provider: "fallback",
      error: String(e),
      note:
        "No image API key (RECRAFT_API_KEY/LEONARDO_API_KEY) and no local Stable Diffusion at " +
        `${SD_URL}. Use Claude's connected Canva/Figma MCP, or paste this prompt into Recraft/Leonardo/Midjourney/DALL·E:`,
      ready_prompt: prompt,
    };
  }
}
