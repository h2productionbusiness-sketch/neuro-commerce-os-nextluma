# Installing the Neuro-Commerce OS

## Prerequisites
- **Node.js ≥ 18** (for the MCP server). Check: `node --version`.
- Claude Code (desktop or CLI).
- (Optional) `pip install edge-tts` for free voiceover; a local Stable Diffusion (AUTOMATIC1111) for free image gen.

## 1. Build the MCP server
```bash
cd "C:/Users/houce/Documents/NextLuma Agency/Claude plugin/neuro-commerce-os/mcp-server"
npm install
npm run selfcheck      # expect: { ok: true, tools: 19, resources: 24, prompts: 4 }
```

## 2. (Optional) Add API keys
Edit `.mcp.json` (plugin root) or set environment variables. All are optional — without them the
server uses its documented fallbacks.

| Variable | Enables |
|----------|---------|
| `SERPAPI_API_KEY` | Live market research (preferred) |
| `TAVILY_API_KEY` | Live market research (fallback) |
| `RECRAFT_API_KEY` | AI image generation (preferred) |
| `LEONARDO_API_KEY` | AI image generation (fallback) |
| `SD_API_URL` | Local Stable Diffusion (e.g. `http://127.0.0.1:7860`) |
| `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID` | Live Meta Ads API deployment |

## 3. Install the plugin in Claude Code
```text
/plugin marketplace add "C:/Users/houce/Documents/NextLuma Agency/Claude plugin/neuro-commerce-os"
/plugin install neuro-commerce-os
```
Then restart Claude Code (or reload plugins). Verify:
- `/help` lists the `neuro-commerce-os` commands.
- The MCP server `neuro-commerce-os` shows as connected.

## 4. Run
```text
/neuro-commerce-os Full OS
```
or a single phase: `/phase-1`, `/phase-2`, `/phase-3`, `/phase-4`.

## Manual MCP wiring (without the plugin)
To use only the MCP server in any MCP client, add:
```json
{
  "mcpServers": {
    "neuro-commerce-os": {
      "command": "node",
      "args": ["C:/Users/houce/Documents/NextLuma Agency/Claude plugin/neuro-commerce-os/mcp-server/src/index.js"]
    }
  }
}
```

## Troubleshooting
- **Server won't start:** run `node mcp-server/src/index.js --selfcheck` to see errors; ensure `npm install` ran.
- **Resources empty:** the `knowledge/` folder must sit at the plugin root (the server resolves it relative to itself).
- **Tools return "fallback":** that's expected when no API key is set — the output is still usable.
