// economics.js — Phase 4 unit-economics engine.
// Implements the One-Third Rule (CPA→LTV), break-even ROAS, target ROAS,
// and budget-adequacy guidance exactly as defined in the Acquisition Engine doc.

export function unitEconomics({
  averagePurchaseValue,
  purchaseFrequency = 1,
  customerLifespan = 1,
  grossMargin, // 0..1 (e.g. 0.6 for 60%)
}) {
  const ltv = round(averagePurchaseValue * purchaseFrequency * customerLifespan);
  const maxCPA = round(ltv / 3); // One-Third Rule
  const targetCPA = round(ltv / 4); // Healthy margin
  const breakevenROAS = grossMargin ? round(1 / grossMargin) : null; // 1 / gross margin
  const targetROAS = breakevenROAS ? round(breakevenROAS * 1.5) : null; // scaling threshold
  return {
    inputs: { averagePurchaseValue, purchaseFrequency, customerLifespan, grossMargin },
    LTV: ltv,
    Maximum_CPA: maxCPA,
    Target_CPA: targetCPA,
    Breakeven_ROAS: breakevenROAS,
    Target_ROAS: targetROAS,
    rules: {
      "One-Third Rule": "Maximum CPA = LTV / 3 (lower is better)",
      "Target CPA": "LTV / 4 for healthy margin",
      "Break-even ROAS": "1 / Gross Margin (minimum ROAS target)",
      "Target ROAS": "Break-even ROAS × 1.5 (scaling threshold)",
    },
  };
}

// Budget adequacy by goal — verbatim from PART 0.3 (currency: TND as in the doc).
export const BUDGET_ADEQUACY = {
  "Brand Awareness / Reach": { minDaily: "5–10 TND", requiredVolume: "1,000–5,000 impressions", rationale: "Enough to test creative" },
  Traffic: { minDaily: "10–20 TND", requiredVolume: "50–200 clicks", rationale: "Minimum for link-clicks" },
  "Video Views": { minDaily: "10–15 TND", requiredVolume: "500–2,000 views", rationale: "Enough for 25%+ completion" },
  "Lead Generation": { minDaily: "20–30 TND", requiredVolume: "5–15 leads", rationale: "To achieve 25 leads/week" },
  Conversions: { minDaily: "25–50+ TND", requiredVolume: "5–20 conversions", rationale: "5x CPA daily budget" },
  "Catalog Sales": { minDaily: "30–50+ TND", requiredVolume: "5–15 sales", rationale: "Product-level optimisation" },
};

// Minimum audience sizes (Iron Dome QA): 500k Cold, 10k Warm, 1k Hot
export const MIN_AUDIENCE = { Cold: 500000, Warm: 10000, Hot: 1000 };

export const TEMPERATURE = {
  Cold: { range: "0–30°", definition: "Never heard of you", sources: "Interests, Lookalikes (1–3%), Broad Demographics", bestGoals: "Video Views, Reach, Traffic", threeDayExclusion: "Not applicable" },
  Warm: { range: "31–60°", definition: "Knows you, some interaction", sources: "Video Viewers (25%+), Engagers, Site Visitors, Lead Form Openers", bestGoals: "Lead Generation, Messages, Traffic", threeDayExclusion: "CRITICAL: Exclude last 3 days of site visitors" },
  Hot: { range: "61–100°", definition: "Ready to buy", sources: "Cart Abandoners, Past Purchasers, High-Intent Visitors", bestGoals: "Conversions, Catalog Sales", threeDayExclusion: "Exclude recent converters (optional)" },
};

function round(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}
