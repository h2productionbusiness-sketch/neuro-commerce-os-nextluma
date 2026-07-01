---
name: tool-selector
description: Scans the Claude environment for the MCP servers/tools a Neuro-Commerce OS phase needs, reports what's available, and recommends + installs the missing ones (with the user's consent). Use at the start of an automated phase run, or when the user asks to "check/install tools", "what tools do I need", or "set up my stack".
---

# Tool Selector

Ensure the right tools are present before a phase runs. **Scan → report → recommend → install (with consent).**
Never install code silently; always show the exact command and get a yes first.

## What each phase needs
| Phase | Needed capabilities | Preferred MCP servers |
|-------|--------------------|-----------------------|
| 1 Bible | web search · docs · visual maps · **decks** | search (SerpAPI/Tavily or connected web_search/google_search), Notion, Miro, **PowerPoint / `pptx`** |
| 2 Brand | + image gen | Recraft/Higgsfield or Canva/Figma |
| 3 Content | + image · voiceover · video | Recraft/SD, edge-tts, `video-use`, `mcp-ffmpeg-helper`, CapCut/DaVinci (manual) |
| 4 Ads | Meta Ads · analytics | `ads_*` Meta MCP, Looker Studio |
| 5 Growth | analytics · docs | Looker Studio, Sheets, Notion |

The 13 plugin skills + the `neuro-commerce-os` MCP server (23 tools) are already bundled — nothing to install for those.

## Procedure
1. **Scan.** Enumerate what's connected this session: read the available `mcp__*` tools and the connected servers. In a terminal you can also run `claude mcp list` and `claude plugin list`.
2. **Match** each needed capability to an available server. Note the strong fallbacks the OS ships (search→manual, image→ready-prompt, tts→spec) so a missing tool never blocks — it degrades.
3. **Report** a table: Capability | Status (✅ available / ⚠️ fallback only / ❌ missing) | Server used.
4. **Recommend + install the missing** (only the genuinely missing, ⚠️/❌). Present the exact command and ask permission:
   - PowerPoint/pptx, Notion, Figma, Filesystem, etc. → Desktop **Extensions** (`.mcpb`) or the connectors panel.
   - CLI MCP servers → `claude mcp add <name> -- npx -y <package>` (or `uvx <package>`). Examples: `claude mcp add video-use -- npx -y video-use`.
   - Web-hosted (SerpAPI/Tavily) → add the URL/key via `claude mcp add` or the connector settings.
   If the user opts into auto-install, run the shown command via the terminal; otherwise hand them the command to run. **Confirm before each install.**
5. **Re-scan** and confirm, then return the final available toolset to the orchestrator.

## Guardrails
- Only recommend reputable packages; show the full command so the user sees exactly what runs.
- If a capability is missing and can't be installed now, proceed with the OS fallback and note the limitation — do not block the phase.
- Auth-gated connectors (Notion, Figma, Meta, GitHub…) can't be OAuth'd non-interactively — tell the user to authorize them via `/mcp` or the connector settings.
