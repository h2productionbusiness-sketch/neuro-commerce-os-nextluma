// meta.js — Phase 4 Meta Ads deployment.
// Naming convention: TEMP_ARCH_GOAL_PLATFORM_GEO_AGE
// Three deployment branches per the Execution Protocol: [P] Manifest+Guide, [O] API, [Q] Hybrid.
import { MIN_AUDIENCE } from "./economics.js";

const BANNED_COLOR = "#D5FF00"; // Visual OS: banned

export function adSetName({ temp, archetype, goal, platform, geo = "Global", age = "30-45" }) {
  const clean = (s) => String(s || "").replace(/[^A-Za-z0-9+]/g, "");
  return `${String(temp).toUpperCase()}_${clean(archetype)}_${clean(goal)}_${clean(platform)}_${clean(geo)}_${age}`;
}

// Budget split by temperature (Cold 20–30%, Warm 30–40%, Hot 40–50%).
export function splitBudget(totalDaily) {
  return {
    Cold: round(totalDaily * 0.25),
    Warm: round(totalDaily * 0.35),
    Hot: round(totalDaily * 0.4),
    note: "Cold 20–30% / Warm 30–40% / Hot 40–50% (midpoints used; tune to goal).",
  };
}

// Build the manifest rows (Branch P) from a list of ad set specs.
export function buildManifestCsv(adsets) {
  const cols = [
    "Ad_Set_Name", "Campaign_Objective", "Audience_Details", "Creative_URL",
    "Headline", "Primary_Text", "CTA", "Daily_Budget", "Bid_Strategy",
  ];
  const esc = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = adsets.map((a) =>
    [a.name, a.objective, a.audience, a.creativeUrl || "", a.headline || "",
     a.primaryText || "", a.cta || "", a.dailyBudget || "", a.bidStrategy || ""]
      .map(esc).join(",")
  );
  return [cols.join(","), ...rows].join("\n");
}

export function adsManagerInstructions() {
  return `# Meta Ads Manager — Step-by-Step Launch Guide

For EACH row in manifest.csv:

1. **Create Campaign** → select the Campaign_Objective.
2. **Create Ad Set** → paste Audience_Details (interests + exclusions). Apply the 3-Day Exclusion on all WARM and HOT sets.
3. **Create Ad** → upload the creative (Creative_URL), paste Headline + Primary_Text, set the CTA.
4. **Apply budget** (Daily_Budget) and **Bid Strategy**, then publish.

Reminders:
- Confirm the Pixel is installed and firing, and CAPI is configured.
- Visual OS: ${BANNED_COLOR} is BANNED; enforce the 20% Swiss-grid padding.
- Do not launch any ad set whose audience is below the minimum size (Cold ${MIN_AUDIENCE.Cold.toLocaleString()}, Warm ${MIN_AUDIENCE.Warm.toLocaleString()}, Hot ${MIN_AUDIENCE.Hot.toLocaleString()}).`;
}

export function deployPythonScript(adAccountPlaceholder = "act_XXXXXXXXX") {
  return `import requests, json

# === USER INPUTS ===
ad_account_id = "${adAccountPlaceholder}"   # replace with your Meta Ad Account ID
access_token  = "REPLACE_WITH_YOUR_TOKEN"   # never commit this

with open("ads.json", "r", encoding="utf-8") as f:
    payload = json.load(f)

GRAPH = "https://graph.facebook.com/v20.0"

def create(node, body):
    r = requests.post(f"{GRAPH}/{ad_account_id}/{node}",
                      params={"access_token": access_token}, json=body)
    r.raise_for_status()
    return r.json()

# 1) Campaign  2) Ad Sets (apply 3-day exclusion on warm/hot)  3) Creatives  4) Ads
for camp in payload["campaigns"]:
    c = create("campaigns", camp["spec"])
    print("campaign", c)
    for aset in camp["adsets"]:
        aset["spec"]["campaign_id"] = c["id"]
        a = create("adsets", aset["spec"])
        print("adset", a)
        for ad in aset["ads"]:
            ad["spec"]["adset_id"] = a["id"]
            print("ad", create("ads", ad["spec"]))
print("DONE — review in Ads Manager before setting status to ACTIVE.")
`;
}

// Optional LIVE deploy via Graph API if a token is present in the environment.
const META_TOKEN = process.env.META_ACCESS_TOKEN;
const META_ACCOUNT = process.env.META_AD_ACCOUNT_ID;
export function metaLiveAvailable() {
  return Boolean(META_TOKEN && META_ACCOUNT);
}

export async function metaCreate(node, body) {
  if (!metaLiveAvailable()) {
    return { mode: "fallback", note: "No META_ACCESS_TOKEN / META_AD_ACCOUNT_ID. Use the generated Python script or the ads_* MCP tools instead." };
  }
  const url = `https://graph.facebook.com/v20.0/${META_ACCOUNT}/${node}?access_token=${META_TOKEN}`;
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json();
  return { mode: "live", status: r.status, response: j };
}

function round(n) { return Math.round((Number(n) + Number.EPSILON) * 100) / 100; }
