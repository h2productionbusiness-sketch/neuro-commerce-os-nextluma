---
name: video-content-diagnostics
description: Diagnose social media reels/videos (yours or competitors') using the installed video-analysis MCP tools. Use to analyze a TikTok/Reel/Short/YouTube video — extract frames + timestamps + transcript, then diagnose the hook (0–3s), retention/drop-off, pacing, pattern interrupts, craft, story arc and CTA, and score Hook Performance, Content Scorecard, and Virality. Triggers: "analyze this reel", "diagnose the hook", "why is retention low", "review this video", "competitor reel teardown", "analyze the video".
---

# Video / Social Content Diagnostics

Turn any reel into a frame-by-frame, neuroscience-grounded diagnosis of hook, retention, and virality —
then prescribe the fix. This is how the Neuro-Commerce OS "sees" video.

## Tooling — drive the installed video MCP servers
You have these video-analysis MCP servers available (use the best fit; fall back across them):

| Server | Best for | Needs |
|--------|----------|-------|
| `video-use` | **Primary**: local file OR URL → key frames + timestamps + `manifest.json` | ffmpeg (+ yt-dlp for URLs) |
| `design-extract` | screen recordings → scene-detected frames (copy/design/bug) | ffmpeg bundled |
| `mcp-video` | general video → frames (uvx) | uv/uvx |
| `mcp-ffmpeg-helper` | isolate the 0–3s hook, trim, sample frames at retention marks | ffmpeg |
| `video-analyzer`, `video-context`, `claude-video-analyzer`, `video-to-claude` | frame/transcript extraction | npx |

For **transcript / captions / engagement metadata**, also use the connected social MCPs:
TikTok (`tiktok_get_video`, `tiktok_get_video_subtitles`, `tiktok_get_video_comments`),
Instagram (`instagram_get_post`), YouTube (`youtube_get_video`, `youtube_get_video_transcription`),
Facebook (`facebook_get_post`).

## Orchestration (via the neuro-commerce-os MCP server)
1. **`diagnose_video_content`** — returns the ingest plan (which tool to call) + the diagnostic checklist + knowledge refs. Call this first.
2. Extract frames + timestamps with the chosen video tool; pull the transcript via the social MCP. Use `mcp-ffmpeg-helper` to isolate the **0–3s hook** and to sample frames at **3s / 25% / 50% / 75% / 100%**.
3. **`score_social_content`** — feed the observed/known metrics to produce the three scorecards below.

## The diagnosis (grounded in the Inception Codex)
- **Hook (0–3s)** — visual + verbal hook present? Pattern interrupt in frame 1? Face / motion / stat / bold claim? Map to Codex 4.5 Hook Templates + 4.6 Hook Library by Archetype.
- **Retention curve** — find the drop-off points (3s, 25%, 50%, 75%, 100%); is there a re-hook at ~3s and ~7s? (Codex 3.14 Pacing, 7.1 Algorithm).
- **Pattern interrupts** — count and spacing of visual/audio interrupts (Codex 4.2–4.4).
- **Craft** — shot types, angles, movement, lighting, NeuroChromatic palette, sound frequency vs target emotion/archetype (Codex 3.x).
- **Story arc** — emotional sequence Fear→Desire→Identity; tension → payoff.
- **CTA & caption** — single friction-matched CTA; caption reinforces the hook; Swiss-grid readability.

## Scores produced (Phase 3 deliverables 11.2–11.4)
- **Hook Performance (11.2)** — 3-Second View Rate + Pattern-Interrupt Retention + CTR + Engagement → tier (Excellent/Good/Average/Poor) + fixes.
- **Content Scorecard (11.3)** — Hook / Visual / Audio / Story / CTA (each /10) → /50 + tier (Gold/Silver/Bronze).
- **Virality & CPS (11.4)** — VPS (6-factor), Cost Per Share status, Viral Coefficient (K).

## Output
A reel teardown: per-timestamp notes, the three scorecards, the single biggest lever, and 3–5 concrete
fixes (re-shoot the hook, add an interrupt at the fade, tighten pacing, change CTA). For **competitor**
teardowns, feed findings into `market-intelligence` (Competitive Creative Intelligence) and the
`hook-attention-architecture` Hook Library. For **your own** content, feed into the `kontent-kreation`
production loop and `predictive-growth-intelligence` (fatigue + VPS) for the next iteration.
