/**
 * intent.js — the v2.0 Intent Router.
 *
 * Classifies the operator's stated goal into a blueprint BEFORE any phase
 * work starts, then seeds the State Machine accordingly:
 *
 *   standard-ecommerce → the OS's native happy path (product catalog, DTC
 *                        funnel, Meta Ads economics) — Fast-Track eligible.
 *   custom-blueprint   → everything else (SaaS, services, F&B, real estate…)
 *                        — same 18 sections, but with routing emphasis and
 *                        operator-input flags tuned to the detected industry.
 *
 * The taxonomy deliberately mirrors knowledge/system/choice-architecture.md
 * (Phase 1, decision points 2 & 4): Industry list + Full/Fast-Track/Custom.
 */

import { initRun, requestNextStep, loadState, saveState } from "./state.js";
import { checkSetup } from "./ui.js";

/* ---------------------------------------------------------------------- */
/* signal taxonomy (mirrors choice-architecture industry list)             */
/* ---------------------------------------------------------------------- */

const INDUSTRY_SIGNALS = [
  { industry: "E-com", rx: /\b(e-?com(merce)?|online (store|shop)|shopify|woo-?commerce|dtc|d2c|drop-?ship|amazon fba|etsy|marketplace seller|product catalog|cart|checkout|skus?|retail brand)\b/i },
  { industry: "SaaS", rx: /\b(saas|software|app|platform|api|subscription software|b2b tool|crm|erp)\b/i },
  { industry: "Healthcare", rx: /\b(health|clinic|dental|medical|pharma|wellness|therapy|telehealth)\b/i },
  { industry: "Hospitality", rx: /\b(hotel|resort|travel|tourism|airbnb|booking|hospitality)\b/i },
  { industry: "Education", rx: /\b(course|coaching|academy|school|education|e-?learning|training program|bootcamp)\b/i },
  { industry: "Prof-Services", rx: /\b(agency|consult(ing|ant)|law firm|legal|accounting|freelanc|studio|services? (firm|business|company))\b/i },
  { industry: "Manufacturing", rx: /\b(manufactur|factory|industrial|wholesale|b2b supplier|oem)\b/i },
  { industry: "Real-Estate", rx: /\b(real ?estate|property|realtor|brokerage|rentals?|landlord)\b/i },
  { industry: "F&B", rx: /\b(restaurant|caf[eé]|coffee shop|food|beverage|bakery|catering|f&b|ghost kitchen)\b/i },
];

/** Signals that force custom even when product-selling words appear. */
const CUSTOM_OVERRIDES = /\b(b2b|enterprise|saas|consult|agency|clinic|restaurant|course|coaching|real ?estate|custom (blueprint|plan|strategy)|not (an? )?e-?com)\b/i;

/** Per-industry Phase-1 routing emphasis (step ids from run-state.json). */
const ROUTING = {
  "standard-ecommerce": {
    scope: "Fast-Track eligible",
    emphasize: ["p1-s02 Product Intelligence", "p1-s03 Pricing & Monetization", "p1-s05 Market Intelligence", "p1-s09 Financial Intelligence (One-Third Rule)"],
    lighter: ["p1-s07 Data & Technology", "p1-s08 Operations"],
    note: "Native happy path — catalog economics, DTC funnel, Meta Ads unit economics apply directly.",
  },
  SaaS: {
    scope: "Custom",
    emphasize: ["p1-s03 Pricing & Monetization (recurring revenue)", "p1-s04 Customer & Behavior (activation/churn)", "p1-s11 Experimentation System"],
    lighter: ["p1-s08 Operations"],
    note: "LTV driven by retention — churn scoring (Phase 5) matters early; One-Third Rule uses LTV over lifetime months.",
  },
  "Prof-Services": {
    scope: "Custom",
    emphasize: ["p1-s04 Customer & Behavior (trust signals)", "p1-s05 Market Intelligence (congregations)", "p1-s06 Marketing & Acquisition (lead gen)"],
    lighter: ["p1-s02 Product Intelligence"],
    note: "Lead-quality economics — post-click n8n pipeline (Phase 4) is the conversion engine.",
  },
  "F&B": {
    scope: "Custom",
    emphasize: ["p1-s05 Market Intelligence (local/Maps)", "p1-s06 Marketing & Acquisition (geo-targeted)"],
    lighter: ["p1-s07 Data & Technology"],
    note: "Local congregations + Google Maps signals dominate; geo-fenced Meta targeting in Phase 4.",
  },
  default: {
    scope: "Custom",
    emphasize: ["p1-s00 Executive Meta Layer (clarify goals)", "p1-s04 Customer & Behavior", "p1-s05 Market Intelligence"],
    lighter: [],
    note: "Run the full 18 sections; tune emphasis after the 42-Q intake sharpens the picture.",
  },
};

/* ---------------------------------------------------------------------- */
/* classifier                                                             */
/* ---------------------------------------------------------------------- */

/**
 * Detect blueprint + industry from a free-text goal.
 * @param {{goal:string, industry?:string}} input
 */
export function detectIntent({ goal = "", industry = null }) {
  const text = String(goal);
  const hits = INDUSTRY_SIGNALS.filter((s) => s.rx.test(text)).map((s) => s.industry);
  const declared = industry && INDUSTRY_SIGNALS.some((s) => s.industry.toLowerCase() === industry.toLowerCase())
    ? INDUSTRY_SIGNALS.find((s) => s.industry.toLowerCase() === industry.toLowerCase()).industry
    : industry || null;

  const detectedIndustry = declared || hits[0] || "Other";
  const ecomSignal = hits.includes("E-com") || /e-?com/i.test(declared || "");
  const customOverride = CUSTOM_OVERRIDES.test(text);

  const blueprint = ecomSignal && !customOverride ? "standard-ecommerce" : "custom-blueprint";
  const confidence =
    declared || hits.length === 1 ? "high" : hits.length > 1 ? "medium" : "low";

  const routing =
    blueprint === "standard-ecommerce"
      ? ROUTING["standard-ecommerce"]
      : ROUTING[detectedIndustry] || ROUTING.default;

  return {
    blueprint,
    industry: detectedIndustry,
    confidence,
    signals: hits.length ? hits : ["none — defaulting"],
    routing,
    ...(confidence === "low"
      ? { clarify: "Goal text was ambiguous — confirm industry with the operator (choice-architecture Phase 1, point 2) before heavy work." }
      : {}),
  };
}

/* ---------------------------------------------------------------------- */
/* MCP tool: initialize_os_session                                        */
/* ---------------------------------------------------------------------- */

const json = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });

export const INTENT_TOOLS = [
  {
    name: "initialize_os_session",
    description:
      "FRONT DOOR of the Neuro-Commerce OS (v2.0). Call FIRST in every engagement: routes the operator's goal through the Intent Router (standard-ecommerce vs custom-blueprint, industry, routing emphasis), seeds the State Machine with a fresh 18-step Phase-1 run, and returns the session brief + first step. After this, work the loop: request_next_step → do the work → submit_deliverable.",
    inputSchema: {
      type: "object",
      properties: {
        client: { type: "string", description: "Client / business name for this engagement." },
        goal: { type: "string", description: "Free-text description of the business and what the operator wants (used for intent detection)." },
        industry: { type: "string", description: "Optional explicit industry override (SaaS, E-com, Healthcare, Hospitality, Education, Prof-Services, Manufacturing, Real-Estate, F&B, Other)." },
      },
      required: ["client", "goal"],
    },
    handler: async ({ client, goal, industry }) => {
      const intent = detectIntent({ goal, industry });
      initRun({ client, blueprint: intent.blueprint });

      // Record the routing decision in the run history (auditable).
      const state = loadState();
      state.engagement.industry = intent.industry;
      state.history.push({
        event: "intent-routed",
        blueprint: intent.blueprint,
        industry: intent.industry,
        confidence: intent.confidence,
        at: new Date().toISOString(),
      });
      saveState(state);

      const setup = checkSetup();
      return json({
        session: "initialized",
        client,
        intent,
        ...(setup.setupNeeded
          ? { setup: { missing: setup.missing, wizard: setup.wizard, note: setup.note } }
          : {}),
        firstStep: requestNextStep(),
        protocol: [
          "1. request_next_step — get the ONE current step",
          "2. Do the work (RAG-query the intelligence graph; never read raw docs)",
          "3. submit_deliverable — lock it in; the pointer advances",
          "Repeat until 18/18, then follow the phase handoff.",
        ],
      });
    },
  },
];
