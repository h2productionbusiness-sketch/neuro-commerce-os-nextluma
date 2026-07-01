// video.js — Social/video content diagnostics.
// Orchestrates the installed video-analysis MCP servers to ingest a reel (frames + timestamps +
// transcript), then scores Hook / Pattern-Interrupt Retention / Content Scorecard / VPS / CPS,
// faithful to Phase 3 deliverables 11.2–11.4 and the Inception Codex (Sections 4, 7, 8).
import { viralityScore } from "./growth.js";

// Registry of video tools the OS knows how to drive. The OS prefers a frame+timestamp extractor,
// falls back across the others, and pulls transcript/metadata from connected social MCPs.
export const VIDEO_TOOLS = [
  { server: "video-use", best: "Local file OR URL → key frames + timestamps + manifest.json. Primary reel ingester.", needs: "ffmpeg (+ yt-dlp for URLs)" },
  { server: "design-extract", best: "Screen recordings → scene-detected key frames (copy/design/bug). Project-scoped; bundles ffmpeg.", needs: "none (ffmpeg bundled)" },
  { server: "mcp-video", best: "General video → frames for analysis (uvx).", needs: "uv/uvx" },
  { server: "mcp-ffmpeg-helper", best: "FFmpeg ops — isolate the 0–3s hook, trim, transcode, sample frames at marks.", needs: "ffmpeg" },
  { server: "video-analyzer", best: "Frame/scene analysis.", needs: "npx" },
  { server: "video-context", best: "Video → context frames/transcript.", needs: "npx" },
  { server: "claude-video-analyzer", best: "Video frame analysis.", needs: "npx" },
  { server: "video-to-claude", best: "Video → Claude-readable frames.", needs: "npx" },
];

// Connected social MCPs for transcript / captions / engagement metadata (not part of this server).
export const SOCIAL_SOURCES = {
  tiktok: ["tiktok_get_video", "tiktok_get_video_subtitles", "tiktok_get_video_comments"],
  instagram: ["instagram_get_post", "instagram_get_post_comments"],
  youtube: ["youtube_get_video", "youtube_get_video_transcription", "youtube_get_video_comments"],
  facebook: ["facebook_get_post", "facebook_get_post_comments"],
};

export function ingestPlan(source = "file", platform = "tiktok") {
  const isUrl = source === "url";
  const steps = [];
  if (isUrl) {
    steps.push(`Pull metadata + transcript/subtitles via the connected social MCP (${(SOCIAL_SOURCES[platform] || []).join(", ") || "platform tools"}).`);
    steps.push("Ingest frames via `video-use` (needs yt-dlp for URLs). If yt-dlp is missing, download the file first, then treat as a local file.");
  } else {
    steps.push("Ingest frames + timestamps via `video-use` (manifest.json) — primary. Fallbacks: `mcp-video`, `design-extract`, `video-analyzer`, `video-context`, `claude-video-analyzer`, `video-to-claude`.");
    steps.push("Use `mcp-ffmpeg-helper` to isolate the 0–3s HOOK window and to sample frames at the retention marks (3s, 25%, 50%, 75%, 100%).");
    steps.push("If a transcript is needed and absent, generate captions from audio or read on-screen text from the extracted frames.");
  }
  return steps;
}

// ── Hook Performance (Deliverable 11.2) ──────────────────────────────────────
// Transparent benchmark bands (configurable). Inputs are percentages (0–100).
// Bands calibrated to the doc's worked example (72% 3s-view → "Good").
function tier3sViewRate(p) {
  if (p >= 75) return "Excellent";
  if (p >= 55) return "Good";
  if (p >= 35) return "Average";
  return "Poor";
}
function tierRetention(p) {
  if (p >= 70) return "Excellent";
  if (p >= 50) return "Good";
  if (p >= 30) return "Average";
  return "Poor";
}

export function hookPerformance({ threeSecondViewRate, patternInterruptRetention, ctr, engagementRate } = {}) {
  const t1 = tier3sViewRate(num(threeSecondViewRate));
  const t2 = tierRetention(num(patternInterruptRetention));
  const order = { Excellent: 4, Good: 3, Average: 2, Poor: 1 };
  const overall = order[t1] <= order[t2] ? t1 : t2; // weakest of hook/retention drives the verdict
  const fixes = [];
  if (t1 === "Average" || t1 === "Poor") fixes.push("Hook (0–3s) weak: open on a face close-up / pattern interrupt / bold claim or stat; cut the slow intro.");
  if (t2 === "Average" || t2 === "Poor") fixes.push("Mid-retention drop: add a pattern interrupt at the fade point, tighten pacing, re-hook at ~3s and ~7s.");
  if (num(ctr) > 0 && num(ctr) < 1.5) fixes.push("Low CTR: stronger CTA + clearer value/benefit in caption and end-card.");
  return {
    three_second_view_rate: { value: threeSecondViewRate, tier: t1 },
    pattern_interrupt_retention: { value: patternInterruptRetention, tier: t2 },
    ctr, engagement_rate: engagementRate,
    performance_tier: overall,
    recommendations: fixes.length ? fixes : ["Strong hook + retention — scale this angle and spin variants."],
  };
}

// ── Content Scorecard (Deliverable 11.3) — each sub-score 1–10, total /50 ─────
export function contentScorecard({ hook, visual, audio, story, cta } = {}) {
  const parts = { hook: cap(hook), visual: cap(visual), audio: cap(audio), story: cap(story), cta: cap(cta) };
  const total = Object.values(parts).reduce((a, b) => a + b, 0);
  const tier = total >= 40 ? "Gold" : total >= 30 ? "Silver" : total >= 20 ? "Bronze" : "Needs Work";
  const weakest = Object.entries(parts).sort((a, b) => a[1] - b[1])[0];
  return { scores: parts, total: `${total}/50`, tier, weakest_dimension: weakest[0], note: `Lift '${weakest[0]}' first for the biggest gain.` };
}

// ── Virality Prediction & CPS (Deliverable 11.4) ─────────────────────────────
export function viralityAndCps({ vpsFactors, costPerShare, viralCoefficient } = {}) {
  const vps = vpsFactors ? viralityScore(vpsFactors) : null;
  let cpsStatus = null;
  if (costPerShare != null) {
    const c = num(costPerShare);
    cpsStatus = c <= 0.10 ? "Excellent (≤€0.10)" : c <= 0.30 ? "Decent (€0.10–0.30)" : c <= 0.60 ? "High (€0.30–0.60)" : "Poor (>€0.60)";
  }
  const k = num(viralCoefficient);
  // Calibrated to the doc example (K=1.2 → "Moderate").
  const kStatus = k > 1.5 ? `Viral (K=${k})` : k >= 0.5 ? `Moderate (K=${k})` : k > 0 ? `Low (K=${k})` : null;
  return { VPS: vps, cost_per_share: costPerShare ?? null, cps_status: cpsStatus, viral_coefficient: viralCoefficient ?? null, viral_coefficient_status: kStatus };
}

function num(n) { return Number.isFinite(Number(n)) ? Number(n) : 0; }
function cap(n) { return Math.max(0, Math.min(10, num(n))); }
