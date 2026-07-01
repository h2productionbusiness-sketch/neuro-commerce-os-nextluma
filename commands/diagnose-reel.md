---
description: Diagnose a social media reel/video (hook, retention, pacing, virality) using the video-analysis tools. Usage: /diagnose-reel <file-or-url> [platform] [own|competitor]
---

# /diagnose-reel — Video / Social Content Diagnosis

Invoke the **`video-content-diagnostics`** skill for: `$ARGUMENTS`

1. Parse `$ARGUMENTS` for the video reference (local path or URL), platform, and whether it's your own
   content or a competitor's. If no video is given, ask for the file path or URL.
2. Run **`diagnose_video_content`** (MCP) to get the ingest plan + diagnostic checklist.
3. Extract frames + timestamps with the best available video MCP server (`video-use` primary;
   `design-extract` / `mcp-video` / others as fallback), and pull the transcript/metadata from the
   connected social MCP (TikTok/IG/YouTube). Use `mcp-ffmpeg-helper` to isolate the 0–3s hook and
   sample frames at 3s / 25% / 50% / 75% / 100%.
4. Diagnose hook, retention/drop-off, pacing, pattern interrupts, craft, story arc, CTA — grounded in
   the Inception Codex (Sections 4, 7, 8).
5. Run **`score_social_content`** → Hook Performance (11.2), Content Scorecard (11.3), Virality/CPS (11.4).
6. Deliver a teardown: per-timestamp notes, the three scorecards, the single biggest lever, and 3–5
   concrete fixes. Route findings to `hook-attention-architecture`, `kontent-kreation`,
   `market-intelligence` (competitor), or `predictive-growth-intelligence` as appropriate.
