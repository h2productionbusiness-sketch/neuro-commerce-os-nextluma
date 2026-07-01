// growth.js — Phase 5 Predictive Growth Intelligence.
// Virality Probability Score (VPS), Creative Fatigue Detection, and Churn-Risk scoring,
// faithful to the Inception Codex (8.2 / 8.4) and the Predictive Growth deliverables.

// VPS — 6-factor weighted model (each factor scored 1–10).
const VPS_WEIGHTS = {
  emotionalIntensity: 0.25,
  novelty: 0.20,
  socialCurrency: 0.20,
  practicalValue: 0.15,
  storytellingQuality: 0.10,
  patternInterruptStrength: 0.10,
};

export function viralityScore(factors = {}) {
  const used = {};
  let total = 0;
  for (const [k, w] of Object.entries(VPS_WEIGHTS)) {
    const v = clamp(Number(factors[k] ?? 0), 0, 10);
    used[k] = { score: v, weight: w, contribution: round(v * w) };
    total += v * w;
  }
  total = round(total);
  const interpretation = total > 7.5 ? "High virality potential" : total >= 5 ? "Moderate" : "Low";
  return { VPS: total, scale: "/10", interpretation, factors: used, weights: VPS_WEIGHTS };
}

// Creative Fatigue Detection — thresholds from Inception Codex 8.4.
export function creativeFatigue({ ctrDeclinePct, frequency, engagementDropPct, completionDeclinePct } = {}) {
  const signals = [];
  if (num(ctrDeclinePct) > 20) signals.push({ signal: "CTR decline >20%", window: "7–14 days", action: "Refresh creative angle" });
  if (num(frequency) > 3.5) signals.push({ signal: "Frequency >3.5", window: "7 days", action: "New audience segment" });
  if (num(engagementDropPct) > 15) signals.push({ signal: "Engagement drop >15%", window: "7–14 days", action: "New hook or visual" });
  if (num(completionDeclinePct) > 10) signals.push({ signal: "Completion rate decline >10%", window: "14 days", action: "Shorten content, improve pacing" });
  return {
    fatigue_detected: signals.length > 0,
    severity: signals.length >= 3 ? "High" : signals.length === 2 ? "Moderate" : signals.length === 1 ? "Low" : "None",
    signals,
    recommendation: signals.length ? "Rotate/refresh creative before performance collapses." : "Creative healthy — continue serving.",
  };
}

// Churn-Risk scoring — transparent composite (higher = more at risk).
// Inputs 0–10 where higher = worse for engagement/recency/support, lower NPS = worse.
export function churnRisk({ recencyDays = 0, engagementDrop = 0, supportTickets = 0, nps = 7, tenureMonths = 1 } = {}) {
  const recencyScore = clamp(num(recencyDays) / 9, 0, 10);          // 90d ≈ max
  const engScore = clamp(num(engagementDrop), 0, 10);
  const supportScore = clamp(num(supportTickets), 0, 10);
  const npsScore = clamp(10 - num(nps), 0, 10);
  const tenureBuffer = clamp(num(tenureMonths) / 12, 0, 1);          // longer tenure dampens risk
  const raw = (recencyScore * 0.3 + engScore * 0.3 + supportScore * 0.15 + npsScore * 0.25);
  const risk = round(raw * (1 - 0.2 * tenureBuffer));
  const band = risk >= 7 ? "Critical" : risk >= 5 ? "High" : risk >= 3 ? "Medium" : "Low";
  const action = {
    Critical: "Immediate win-back: personal outreach + incentive.",
    High: "Proactive retention: re-onboarding, value reminder, check-in.",
    Medium: "Nurture: habit reinforcement, milestone nudge.",
    Low: "Maintain: loyalty loop, advocacy ask.",
  }[band];
  return { churn_risk: risk, scale: "/10", band, action, components: { recencyScore, engScore, supportScore, npsScore, tenureBuffer } };
}

function num(n) { return Number.isFinite(Number(n)) ? Number(n) : 0; }
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
function round(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }
