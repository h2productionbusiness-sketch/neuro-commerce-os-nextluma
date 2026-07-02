#!/usr/bin/env node
// Neuro-Commerce OS — MCP server entry point.
// Implements tools/list, tools/call, resources/list, resources/read, prompts/list, prompts/get.
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema, CallToolRequestSchema,
  ListResourcesRequestSchema, ReadResourceRequestSchema,
  ListPromptsRequestSchema, GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { TOOLS, getTool } from "./tools.js";
import { listResources, readResource } from "./resources.js";
import { PROMPTS, getPrompt } from "./prompts.js";
import { listUiResources, readUiResource, checkSetup } from "./lib/ui.js";
import { EXTENSION_ID } from "@modelcontextprotocol/ext-apps/server";

const server = new Server(
  { name: "neuro-commerce-os-mcp", version: "2.0.0" },
  {
    capabilities: {
      tools: {}, resources: {}, prompts: {},
      // MCP Apps (Zero-Command UI): advertise the ui extension.
      extensions: { [EXTENSION_ID]: {} },
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map((t) => ({
    name: t.name, description: t.description, inputSchema: t.inputSchema,
    ...(t._meta ? { _meta: t._meta } : {}), // MCP Apps card-template links
  })),
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const tool = getTool(req.params.name);
  if (!tool) return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
  try {
    return await tool.handler(req.params.arguments || {});
  } catch (e) {
    return { content: [{ type: "text", text: `Tool error in ${tool.name}: ${String(e?.stack || e)}` }], isError: true };
  }
});

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [...listResources(), ...listUiResources()],
}));
server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
  const ui = req.params.uri.startsWith("ui://") ? readUiResource(req.params.uri) : null;
  return { contents: [ui ?? readResource(req.params.uri)] };
});

server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: PROMPTS.map((p) => ({ name: p.name, description: p.description, arguments: p.arguments })),
}));
server.setRequestHandler(GetPromptRequestSchema, async (req) => {
  const p = getPrompt(req.params.name);
  if (!p) throw new Error(`Unknown prompt: ${req.params.name}`);
  const textOut = p.build(req.params.arguments || {});
  return { description: p.description, messages: [{ role: "user", content: { type: "text", text: textOut } }] };
});

// Lightweight self-check (no transport) for CI / install verification.
if (process.argv.includes("--selfcheck")) {
  const r = listResources();
  console.log(JSON.stringify({
    ok: true, tools: TOOLS.length, resources: r.length, prompts: PROMPTS.length,
    toolNames: TOOLS.map((t) => t.name),
  }, null, 2));
  process.exit(0);
}

// v2.0 zero-command setup check: report missing capability keys at startup.
const setup = checkSetup();
if (setup.setupNeeded) {
  console.error(
    `Setup: ${setup.missing.length} optional key(s) unset (${setup.missing.slice(0, 4).join(", ")}${setup.missing.length > 4 ? "…" : ""}) — ` +
    `open the setup wizard (${setup.wizard}) or call save_os_configuration. All features degrade gracefully meanwhile.`
  );
}

// v2.0 neuroplasticity: consolidate memory when the last cycle is > 24h old.
// (stdio servers boot with each session — startup IS the nightly trigger.)
try {
  const { maybeRunCycle } = await import("./lib/neuroplasticity.js");
  const cycle = maybeRunCycle();
  if (cycle.ran) console.error(`Neuroplasticity cycle ran: deduped ${cycle.deduped}, pruned ${cycle.prunedOrphanChunks}.`);
} catch (e) {
  console.error("Neuroplasticity startup check skipped:", e.message);
}

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Neuro-Commerce OS MCP server running on stdio.");
