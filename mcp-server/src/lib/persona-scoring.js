// persona-scoring.js — Purchase-Readiness scoring for Phase 1 personas.
// Weighted composite: Intent 40% · Pain frequency 30% · Demographic fit 20% · Behavioral cues 10%.
// Each input is a 0–10 signal strength; output is a 0–100% readiness score with a band + action.

const WEIGHTS = { intentSignals: 0.40, painFrequency: 0.30, demographicFit: 0.20, behavioralCues: 0.10 };

export function readinessScore({ intentSignals = 0, painFrequency = 0, demographicFit = 0, behavioralCues = 0 } = {}) {
  const s = {
    intentSignals: clamp(intentSignals), painFrequency: clamp(painFrequency),
    demographicFit: clamp(demographicFit), behavioralCues: clamp(behavioralCues),
  };
  const weighted = {};
  let total = 0;
  for (const [k, w] of Object.entries(WEIGHTS)) {
    weighted[k] = { signal: s[k], weight: w, contribution: round(s[k] * w * 10) }; // →/100
    total += s[k] * w * 10;
  }
  const pct = Math.round(total);
  const band =
    pct >= 80 ? "Hot — ready now" :
    pct >= 60 ? "Warm — nurturing" :
    pct >= 40 ? "Cool — educating" :
    "Cold — awareness";
  const action = {
    "Hot — ready now": "Direct-response offers, retargeting, scarcity/urgency; route to Conversion campaigns.",
    "Warm — nurturing": "Lead-gen, social proof, comparison content; email + retargeting.",
    "Cool — educating": "Problem-aware education, value content; top-of-funnel traffic/video views.",
    "Cold — awareness": "Broad reach + pattern-interrupt awareness; introduce the problem.",
  }[band];
  return { purchase_readiness_pct: pct, band, recommended_action: action, weights: WEIGHTS, breakdown: weighted };
}

// Score a list of persona segments and rank them by readiness.
export function scoreSegments(segments = []) {
  const scored = segments.map((seg) => ({
    persona: seg.persona || seg.name || "Unnamed",
    archetype: seg.archetype || null,
    ...readinessScore(seg),
  }));
  scored.sort((a, b) => b.purchase_readiness_pct - a.purchase_readiness_pct);
  return scored;
}

function clamp(n) { const x = Number(n); return Number.isFinite(x) ? Math.max(0, Math.min(10, x)) : 0; }
function round(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }
