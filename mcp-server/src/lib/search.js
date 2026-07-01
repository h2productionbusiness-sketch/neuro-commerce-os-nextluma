// search.js — Market intelligence with fallback logic (per the docs' Fallback Decision Logic):
//   IF SerpAPI available -> use SerpAPI
//   ELSE IF Tavily available -> use Tavily
//   ELSE -> return a structured manual-research brief for Claude/the user.
const SERPAPI_KEY = process.env.SERPAPI_API_KEY || process.env.SERPAPI_KEY;
const TAVILY_KEY = process.env.TAVILY_API_KEY || process.env.TAVILY_KEY;

export function searchProvider() {
  if (SERPAPI_KEY) return "serpapi";
  if (TAVILY_KEY) return "tavily";
  return "fallback";
}

async function serpapiSearch(query, num = 10) {
  const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&num=${num}&api_key=${SERPAPI_KEY}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`SerpAPI ${r.status}`);
  const j = await r.json();
  const organic = (j.organic_results || []).map((x) => ({
    title: x.title, link: x.link, snippet: x.snippet,
  }));
  return { provider: "serpapi", query, results: organic, related: j.related_questions || [] };
}

async function tavilySearch(query, num = 10) {
  const r = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: TAVILY_KEY, query, max_results: num, search_depth: "advanced" }),
  });
  if (!r.ok) throw new Error(`Tavily ${r.status}`);
  const j = await r.json();
  const results = (j.results || []).map((x) => ({ title: x.title, link: x.url, snippet: x.content }));
  return { provider: "tavily", query, results, answer: j.answer };
}

export async function search(query, num = 10) {
  const provider = searchProvider();
  try {
    if (provider === "serpapi") return await serpapiSearch(query, num);
    if (provider === "tavily") return await tavilySearch(query, num);
  } catch (e) {
    return { provider: "fallback", query, error: String(e), fallback: manualBrief(query) };
  }
  return { provider: "fallback", query, fallback: manualBrief(query) };
}

function manualBrief(query) {
  return {
    note:
      "No live-search MCP/API key found (SERPAPI_API_KEY or TAVILY_API_KEY). " +
      "Falling back to manual mode per the NextLuma Fallback Decision Logic. " +
      "Use Claude's connected web-search/Google/Reddit MCP tools, or paste results manually.",
    suggested_queries: [
      `${query}`,
      `${query} reviews complaints`,
      `${query} competitors`,
      `${query} reddit OR forum discussion`,
      `best ${query} 2026`,
    ],
  };
}
