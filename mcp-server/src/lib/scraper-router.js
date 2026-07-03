/**
 * scraper-router.js — v2.0 scraping provider router (item 28).
 *
 * Market intelligence pulls from three very different surface types, and
 * each has a specialist provider:
 *
 *   MAPS    (Google Maps places, reviews, local competitors) → Outscraper
 *   SOCIAL  (Meta/IG/TikTok/X/LinkedIn/YouTube/Reddit)        → Bright Data
 *   WEB     (everything else: sites, blogs, directories)      → AlterLab
 *
 * routeScraper(url) picks the provider per URL; analyze_market_intelligence
 * attaches the routed plan to its output. Provider API keys are optional —
 * with none set the plan documents exactly what to fetch where (the same
 * graceful-fallback contract as every other capability).
 */

const MAPS_RX = /(?:maps\.google\.|google\.[a-z.]+\/maps|goo\.gl\/maps|\/maps\/place|maps\.app\.goo\.gl)/i;
const SOCIAL_RX = /(?:facebook\.com|instagram\.com|tiktok\.com|(?<![a-z])x\.com|twitter\.com|linkedin\.com|youtube\.com|youtu\.be|reddit\.com|threads\.net|pinterest\.)/i;

const PROVIDERS = {
  outscraper: {
    name: "Outscraper",
    surface: "maps",
    envKey: "OUTSCRAPER_API_KEY",
    use: "Google Maps places, reviews, ratings, local competitor density",
  },
  brightdata: {
    name: "Bright Data",
    surface: "social",
    envKey: "BRIGHTDATA_API_TOKEN",
    use: "Social profiles, posts, comments, engagement (Meta/IG/TikTok/X/LinkedIn/YouTube/Reddit)",
  },
  alterlab: {
    name: "AlterLab",
    surface: "web",
    envKey: "ALTERLAB_API_KEY",
    use: "General web: competitor sites, blogs, directories, review platforms",
  },
};

/** Route one URL to its scraping provider. */
export function routeScraper(url) {
  const provider = MAPS_RX.test(url) ? "outscraper" : SOCIAL_RX.test(url) ? "brightdata" : "alterlab";
  const p = PROVIDERS[provider];
  return {
    url,
    provider,
    surface: p.surface,
    ready: Boolean(process.env[p.envKey]?.trim()),
  };
}

/** Route a batch of URLs → grouped plan + per-provider readiness. */
export function buildScrapingPlan(urls = []) {
  const unique = [...new Set(urls.filter((u) => /^https?:\/\//i.test(u)))].slice(0, 24);
  const routed = unique.map(routeScraper);
  const byProvider = {};
  for (const r of routed) (byProvider[r.provider] ??= []).push(r.url);

  return {
    rules: "maps → Outscraper · social → Bright Data · web → AlterLab",
    providers: Object.fromEntries(
      Object.entries(PROVIDERS).map(([id, p]) => [
        id,
        { name: p.name, use: p.use, envKey: p.envKey, configured: Boolean(process.env[p.envKey]?.trim()) },
      ])
    ),
    routed,
    byProvider,
    note: routed.some((r) => !r.ready)
      ? "Unconfigured providers still get a documented fetch plan — set the env key(s) via save_os_configuration to execute live."
      : "All routed providers are configured.",
  };
}

/** Pull URL-ish strings out of arbitrary search-result JSON (defensive). */
export function extractUrls(obj, cap = 24) {
  const found = [];
  const walk = (v) => {
    if (found.length >= cap) return;
    if (typeof v === "string") {
      const m = v.match(/https?:\/\/[^\s"'<>)\]}]+/g);
      if (m) found.push(...m);
    } else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(obj);
  return [...new Set(found)].slice(0, cap);
}
