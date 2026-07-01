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

const server = new Server(
  { name: "neuro-commerce-os-mcp", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {}, prompts: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema })),
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

server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources: listResources() }));
server.setRequestHandler(ReadResourceRequestSchema, async (req) => ({ contents: [readResource(req.params.uri)] }));

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

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Neuro-Commerce OS MCP server running on stdio.");
