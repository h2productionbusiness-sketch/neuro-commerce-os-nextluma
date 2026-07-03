/**
 * classifier.js — v3.0 Business Classifier (71 industries + 2 generics).
 *
 * classifyBusiness(userPrompt) → { business_type, stage 1-5, primary_goal,
 * location, budget, target_audience, confidence, method }.
 *
 * Two layers:
 *   1. DETERMINISTIC — keyword registry over all 71 industries + stage/budget/
 *      location heuristics. Always runs; works with zero API keys.
 *   2. LLM REFINE — when OPENROUTER_API_KEY is set, the profile is refined by
 *      the gateway (ai.js); on any failure the deterministic result stands.
 *
 * Unknown industries fall back to generic-b2b / generic-b2c and the miss is
 * logged to the intelligence graph so the doctrine library learns its gaps.
 */

import { chat, aiAvailable, parseJsonLoose } from "./ai.js";
import { synapse } from "./synapse.js";

/* ------------------------------------------------------------------ */
/* the 71-industry registry (keys match knowledge/doctrines/<key>.md)  */
/* ------------------------------------------------------------------ */

export const INDUSTRIES = [
  // 1. Food & Beverage
  { key: "food-qsr", name: "QSR (Quick Service Restaurant)", sector: "Food & Beverage", rx: /\b(fast food|qsr|drive.?thru|burger joint|quick service)\b/i },
  { key: "fine-dining", name: "Fine Dining", sector: "Food & Beverage", rx: /\b(fine dining|michelin|gourmet restaurant|tasting menu|haute cuisine)\b/i },
  { key: "cafe", name: "Cafes & Coffee Shops", sector: "Food & Beverage", rx: /\b(caf[eé]|coffee shop|roaster(y|ie)|espresso bar|coffeehouse)\b/i },
  { key: "food-truck", name: "Food Trucks", sector: "Food & Beverage", rx: /\b(food truck|street food|mobile (food|kitchen))\b/i },
  { key: "catering", name: "Catering & Events Food", sector: "Food & Beverage", rx: /\b(catering|caterer|wedding food|corporate food)\b/i },
  { key: "bar-nightlife", name: "Bars & Nightlife", sector: "Food & Beverage", rx: /\b(bar|pub|nightclub|cocktail lounge|nightlife|club night)\b/i },
  { key: "brewery", name: "Breweries & Distilleries", sector: "Food & Beverage", rx: /\b(brewer(y|ies)|distiller(y|ies)|craft beer|winery|spirits brand)\b/i },
  { key: "restaurant", name: "Restaurant (general)", sector: "Food & Beverage", rx: /\b(restaurant|bistro|eatery|diner)\b/i },
  // 2. Fashion & Beauty
  { key: "luxury-fashion", name: "Luxury Fashion", sector: "Fashion & Beauty", rx: /\b(luxury (fashion|clothing|brand)|haute couture|designer (clothing|label)|high.?end fashion)\b/i },
  { key: "fast-fashion", name: "Fast Fashion", sector: "Fashion & Beauty", rx: /\b(fast fashion|affordable fashion|trend(y|-driven) clothing)\b/i },
  { key: "streetwear", name: "Streetwear & Urban", sector: "Fashion & Beauty", rx: /\b(streetwear|urban wear|hype brand|limited drops?|skate (brand|wear))\b/i },
  { key: "activewear", name: "Activewear & Athleisure", sector: "Fashion & Beauty", rx: /\b(activewear|athleisure|gym wear|yoga (wear|apparel)|sports apparel)\b/i },
  { key: "accessories", name: "Accessories", sector: "Fashion & Beauty", rx: /\b(accessories|handbags?|belts?|watches|sunglasses)\b/i },
  { key: "jewelry", name: "Jewelry", sector: "Fashion & Beauty", rx: /\b(jewel(le)?ry|engagement rings?|fine gems?|goldsmith)\b/i },
  { key: "cosmetics", name: "Cosmetics & Skincare", sector: "Fashion & Beauty", rx: /\b(cosmetics?|skincare|makeup|serums?|beauty (brand|products))\b/i },
  { key: "hair-salons", name: "Hair & Salons", sector: "Fashion & Beauty", rx: /\b(hair salon|barber(shop)?|hairdress|extensions studio|beauty salon)\b/i },
  { key: "fashion", name: "Fashion (general)", sector: "Fashion & Beauty", rx: /\b(fashion|clothing (brand|line|store)|apparel)\b/i },
  // 3. Technology & SaaS
  { key: "saas-b2b", name: "B2B SaaS", sector: "Technology & SaaS", rx: /\b(b2b saas|crm|erp|project management (tool|software)|software for (companies|businesses|teams))\b/i },
  { key: "saas-b2c", name: "B2C SaaS", sector: "Technology & SaaS", rx: /\b(b2c saas|consumer app|productivity app|lifestyle app|streaming (app|service))\b/i },
  { key: "paas-iaas", name: "PaaS & IaaS", sector: "Technology & SaaS", rx: /\b(paas|iaas|cloud (infrastructure|platform)|developer platform|hosting provider)\b/i },
  { key: "ai-ml", name: "AI & Machine Learning", sector: "Technology & SaaS", rx: /\b(ai (agent|platform|startup|tool)|machine learning|ml platform|data analytics platform|artificial intelligence)\b/i },
  { key: "cybersecurity", name: "Cybersecurity", sector: "Technology & SaaS", rx: /\b(cyber ?security|antivirus|vpn|infosec|penetration testing)\b/i },
  { key: "hardware-iot", name: "Hardware & IoT", sector: "Technology & SaaS", rx: /\b(iot|smart home|wearable|gadget|hardware startup|connected device)\b/i },
  { key: "telecom", name: "Telecom", sector: "Technology & SaaS", rx: /\b(telecom|internet provider|isp|mobile network|voip)\b/i },
  // 4. Automotive & Transport
  { key: "automotive", name: "Automotive Dealerships", sector: "Automotive & Transport", rx: /\b(car dealer(ship)?|auto dealer|used cars?|new cars? sales)\b/i },
  { key: "auto-parts", name: "Auto Parts & Repair", sector: "Automotive & Transport", rx: /\b(auto (parts|repair)|mechanic|tire shop|garage services?|aftermarket parts)\b/i },
  { key: "ev-charging", name: "Electric Vehicles & Charging", sector: "Automotive & Transport", rx: /\b(ev (startup|charging|brand)|electric vehicle|charging (network|stations?))\b/i },
  { key: "logistics", name: "Logistics & Supply Chain", sector: "Automotive & Transport", rx: /\b(logistics|freight|trucking|supply chain|fulfillment center|3pl)\b/i },
  { key: "ridesharing", name: "Ride-Sharing & Mobility", sector: "Automotive & Transport", rx: /\b(ride.?shar(e|ing)|scooter rental|bike rental|mobility (app|startup))\b/i },
  // 5. Real Estate & Construction
  { key: "real-estate-residential", name: "Residential Real Estate", sector: "Real Estate & Construction", rx: /\b(residential real estate|home sales|realtor|property listings?|real estate agent)\b/i },
  { key: "real-estate-commercial", name: "Commercial Real Estate", sector: "Real Estate & Construction", rx: /\b(commercial real estate|office space|retail lease|industrial property)\b/i },
  { key: "property-management", name: "Property Management", sector: "Real Estate & Construction", rx: /\b(property management|rental management|hoa|landlord services)\b/i },
  { key: "home-services", name: "Home Services", sector: "Real Estate & Construction", rx: /\b(plumb(er|ing)|electrician|landscap(er|ing)|cleaning (service|company)|handyman)\b/i },
  { key: "construction", name: "Construction & Contracting", sector: "Real Estate & Construction", rx: /\b(construction|general contractor|builder|contracting (firm|company))\b/i },
  { key: "real-estate", name: "Real Estate (general)", sector: "Real Estate & Construction", rx: /\b(real ?estate|property (business|company))\b/i },
  // 6. Health & Wellness
  { key: "fitness", name: "Fitness & Gyms", sector: "Health & Wellness", rx: /\b(gym|fitness (studio|brand|coach)|personal train(er|ing)|crossfit|pilates)\b/i },
  { key: "nutrition", name: "Nutrition & Supplements", sector: "Health & Wellness", rx: /\b(supplements?|protein powder|vitamins?|meal prep|nutrition brand)\b/i },
  { key: "mental-health", name: "Mental Health & Therapy", sector: "Health & Wellness", rx: /\b(mental health|therapy|counsel(ing|lor)|meditation app|mindfulness)\b/i },
  { key: "telemedicine", name: "Telemedicine", sector: "Health & Wellness", rx: /\b(telemedicine|telehealth|virtual (doctor|clinic)|online prescriptions?)\b/i },
  { key: "dental", name: "Dental & Orthodontics", sector: "Health & Wellness", rx: /\b(dentist|dental|orthodont|aligners?|cosmetic dentistry)\b/i },
  { key: "pharma", name: "Pharma & Biotech", sector: "Health & Wellness", rx: /\b(pharma(ceutical)?|biotech|drug development|pharmacy)\b/i },
  { key: "healthcare", name: "Healthcare (general)", sector: "Health & Wellness", rx: /\b(health(care)?|clinic|medical (practice|center)|wellness)\b/i },
  // 7. Education & Training
  { key: "edtech", name: "EdTech (Online Courses)", sector: "Education & Training", rx: /\b(online courses?|edtech|e-?learning|course platform|udemy|masterclass)\b/i },
  { key: "k12", name: "K-12 Schools", sector: "Education & Training", rx: /\b(k-?12|primary school|secondary school|private school)\b/i },
  { key: "higher-education", name: "Higher Education", sector: "Education & Training", rx: /\b(universit(y|ies)|college|trade school|higher education)\b/i },
  { key: "corporate-training", name: "Corporate Training", sector: "Education & Training", rx: /\b(corporate training|upskilling|leadership training|employee onboarding)\b/i },
  { key: "test-prep", name: "Test Prep & Tutoring", sector: "Education & Training", rx: /\b(tutor(ing)?|test prep|sat|gre|ielts|language (school|tutor))\b/i },
  { key: "coaching", name: "Coaching (general)", sector: "Education & Training", rx: /\b(coach(ing)? (business|program)|life coach|business coach|academy)\b/i },
  // 8. Entertainment & Media
  { key: "music", name: "Music & Streaming", sector: "Entertainment & Media", rx: /\b(musician|band|record label|music (brand|artist|streaming))\b/i },
  { key: "gaming", name: "Gaming", sector: "Entertainment & Media", rx: /\b(video game|mobile game|esports?|game studio|gaming)\b/i },
  { key: "sports", name: "Sports & Athletic Teams", sector: "Entertainment & Media", rx: /\b(sports (team|club|league|academy)|football club|athletic team)\b/i },
  { key: "film-tv", name: "Film & TV Production", sector: "Entertainment & Media", rx: /\b(film (production|studio)|tv production|production (company|house)|videograph)\b/i },
  { key: "publishing", name: "Publishing", sector: "Entertainment & Media", rx: /\b(publish(er|ing)|book (brand|series)|magazine|digital media brand)\b/i },
  { key: "news", name: "News & Journalism", sector: "Entertainment & Media", rx: /\b(news(paper| portal| site)?|journalis(m|t)|media outlet)\b/i },
  // 9. Financial & Legal
  { key: "banking", name: "Banking", sector: "Financial & Legal", rx: /\b(bank(ing)?|credit union|neobank)\b/i },
  { key: "insurance", name: "Insurance", sector: "Financial & Legal", rx: /\b(insurance|insurtech|underwriting)\b/i },
  { key: "investment", name: "Investment & Wealth", sector: "Financial & Legal", rx: /\b(invest(ment|ing)|wealth management|asset management|stockbroker|crypto (fund|exchange)|trading platform)\b/i },
  { key: "legal", name: "Legal Services", sector: "Financial & Legal", rx: /\b(law firm|attorney|lawyer|legal (services|tech))\b/i },
  { key: "accounting", name: "Accounting & Tax", sector: "Financial & Legal", rx: /\b(accounting|cpa|bookkeep|tax (prep|services))\b/i },
  // 10. B2B & Professional Services
  { key: "consulting", name: "Management Consulting", sector: "B2B & Professional Services", rx: /\b(consult(ing|ant)|strategy firm|advisory firm)\b/i },
  { key: "creative-agency", name: "Creative Agencies", sector: "B2B & Professional Services", rx: /\b((marketing|advertising|design|creative|branding) agency|studio for brands)\b/i },
  { key: "hr-recruitment", name: "HR & Recruitment", sector: "B2B & Professional Services", rx: /\b(recruit(ment|er)|staffing|headhunt|hr (tech|agency|firm))\b/i },
  { key: "it-services", name: "IT & Tech Services", sector: "B2B & Professional Services", rx: /\b(it (consulting|services)|managed services|msp|software (dev(elopment)? (agency|shop|house)))\b/i },
  // 11. Retail & E-commerce
  { key: "ecommerce", name: "General E-commerce", sector: "Retail & E-commerce", rx: /\b(e-?commerce|online (store|shop)|shopify|woocommerce|webshop)\b/i },
  { key: "retail", name: "Physical Retail", sector: "Retail & E-commerce", rx: /\b(boutique|department store|convenience store|brick.?and.?mortar|physical (store|shop))\b/i },
  { key: "dtc", name: "DTC (Direct-to-Consumer)", sector: "Retail & E-commerce", rx: /\b(dtc|d2c|direct.?to.?consumer)\b/i },
  { key: "cpg", name: "CPG (Consumer Packaged Goods)", sector: "Retail & E-commerce", rx: /\b(cpg|packaged goods|grocery brand|household products)\b/i },
  // 12. Public & Non-Profit
  { key: "nonprofit", name: "Non-Profits & NGOs", sector: "Public & Non-Profit", rx: /\b(non.?profit|ngo|charit(y|ies)|foundation|advocacy group)\b/i },
  { key: "government", name: "Government & Public Sector", sector: "Public & Non-Profit", rx: /\b(government|municipalit|public sector|city council)\b/i },
  { key: "religious", name: "Religious Organizations", sector: "Public & Non-Profit", rx: /\b(church|mosque|temple|synagogue|religious (organization|community))\b/i },
  // 13. Other Verticals
  { key: "agriculture", name: "Agriculture & Farming", sector: "Other Verticals", rx: /\b(farm(ing|er)?|agricultur|agritech|livestock|crops?)\b/i },
  { key: "manufacturing", name: "Manufacturing", sector: "Other Verticals", rx: /\b(manufactur(ing|er)|factory|industrial production|oem)\b/i },
  { key: "energy", name: "Energy & Utilities", sector: "Other Verticals", rx: /\b(energy (company|startup)|solar|wind (power|farm)|oil|gas|utilit(y|ies))\b/i },
  { key: "pet-services", name: "Pet Services", sector: "Other Verticals", rx: /\b(vet(erinar(y|ian))?|pet (hotel|food|groom|services|brand)|dog (walk|train))\b/i },
  { key: "hospitality", name: "Hotels & Hospitality", sector: "Other Verticals", rx: /\b(hotel|resort|bed.?and.?breakfast|guesthouse|hostel|riad)\b/i },
  { key: "events", name: "Event Management", sector: "Other Verticals", rx: /\b(event (planner|management|organizer)|wedding planner|conference organizer)\b/i },
];

export const GENERIC_KEYS = { b2b: "generic-b2b", b2c: "generic-b2c" };

/* ------------------------------------------------------------------ */
/* deterministic heuristics                                            */
/* ------------------------------------------------------------------ */

const STAGE_RULES = [
  { stage: 1, name: "Idea/Validation", rx: /\b(just an idea|thinking about|want to start|validat(e|ing)|no product yet|planning to (start|launch|open))\b/i },
  { stage: 2, name: "Pre-Launch", rx: /\b(pre.?launch|prototype|mvp|beta|launching (soon|next)|seeking funding|before (we|I) launch)\b/i },
  { stage: 3, name: "Launch", rx: /\b(launch(ing)?|just (launched|opened|started)|first customers|new (brand|store|business))\b/i },
  { stage: 4, name: "Growth", rx: /\b(grow(ing|th)?|scal(e|ing)|more (sales|leads|customers)|product.?market fit|expand(ing)?)\b/i },
  { stage: 5, name: "Maturity", rx: /\b(established|mature|for \d+ years|optimiz(e|ing)|market leader|stable revenue)\b/i },
];

function detectStage(text) {
  for (const r of STAGE_RULES) if (r.rx.test(text)) return { stage: r.stage, stage_name: r.name };
  return { stage: 3, stage_name: "Launch" }; // sensible default: they came here to sell
}

function detectBudget(text) {
  if (/\b(enterprise|corporation|fortune \d+|large company)\b/i.test(text)) return "enterprise";
  if (/\b(funded|investors?|raised|series [a-c]|vc)\b/i.test(text)) return "funded";
  return "bootstrapped";
}

function detectLocation(text) {
  const m = text.match(/\b(?:in|based in|from|located in)\s+([A-Z][a-zA-Zà-ÿ-]+(?:[ ,]+[A-Z][a-zA-Zà-ÿ-]+)?)/);
  return m ? m[1].replace(/[ ,]+$/, "") : null;
}

const B2B_HINT = /\b(b2b|for (businesses|companies|teams|enterprises)|wholesale|corporate clients|agencies as clients)\b/i;

/* ------------------------------------------------------------------ */
/* classifier                                                          */
/* ------------------------------------------------------------------ */

function deterministicClassify(userPrompt) {
  const text = String(userPrompt);
  const hits = INDUSTRIES.filter((i) => i.rx.test(text));
  // Most specific wins: prefer non-general keys over the catch-all entries.
  const GENERAL = new Set(["restaurant", "fashion", "healthcare", "real-estate", "coaching", "ecommerce"]);
  const specific = hits.filter((h) => !GENERAL.has(h.key));
  const pick = specific[0] || hits[0] || null;

  let business_type, industry_name, sector, unknown = false;
  if (pick) {
    ({ key: business_type, name: industry_name, sector } = pick);
  } else {
    unknown = true;
    business_type = B2B_HINT.test(text) ? GENERIC_KEYS.b2b : GENERIC_KEYS.b2c;
    industry_name = business_type === GENERIC_KEYS.b2b ? "Generic B2B" : "Generic B2C";
    sector = "Generic";
  }

  const { stage, stage_name } = detectStage(text);
  return {
    business_type,
    industry_name,
    sector,
    stage,
    stage_name,
    primary_goal: /lead/i.test(text) ? "generate leads" : /brand/i.test(text) ? "build brand" : "generate revenue",
    location: detectLocation(text),
    budget: detectBudget(text),
    target_audience: null,
    confidence: pick ? (specific.length === 1 ? "high" : specific.length > 1 ? "medium" : "medium") : "low",
    method: "deterministic",
    ...(unknown ? { unknown_industry: true } : {}),
  };
}

/**
 * Classify a business from a free-text prompt.
 * Deterministic base + optional LLM refinement (never a hard dependency).
 */
export async function classifyBusiness(userPrompt) {
  const base = deterministicClassify(userPrompt);

  // Log unknown industries so the doctrine library learns its gaps.
  if (base.unknown_industry) {
    synapse.fire("doctrine:unknown-industry", { prompt: String(userPrompt).slice(0, 120), fallback: base.business_type });
    try {
      const { insertChunks, memoryUnavailableReason } = await import("./memory.js");
      if (!memoryUnavailableReason()) {
        insertChunks([{
          content: `[industry-gap] No doctrine matched: "${String(userPrompt).slice(0, 200)}" — fell back to ${base.business_type}. Consider authoring a dedicated doctrine.`,
          source: "learning/global",
          phase: "industry-gaps",
          chunkIndex: `gap-${Date.now()}`,
        }]);
      }
    } catch { /* memory optional */ }
  }

  if (!aiAvailable()) return base;

  try {
    const keys = INDUSTRIES.map((i) => i.key).join(", ");
    const res = await chat(
      `Classify this business.\nINDUSTRY KEYS: ${keys}, ${GENERIC_KEYS.b2b}, ${GENERIC_KEYS.b2c}\n` +
      `STAGES: 1=Idea/Validation 2=Pre-Launch 3=Launch 4=Growth 5=Maturity\n` +
      `Business description: ${userPrompt}\n` +
      `Return JSON: {"business_type":"<key>","stage":1-5,"primary_goal":"...","location":"city, country or null","budget":"bootstrapped|funded|enterprise","target_audience":"age, gender, psychographics"}`,
      { json: true }
    );
    if (res.ok) {
      const refined = parseJsonLoose(res.text);
      const valid = INDUSTRIES.some((i) => i.key === refined.business_type) ||
        [GENERIC_KEYS.b2b, GENERIC_KEYS.b2c].includes(refined.business_type);
      if (valid) {
        const meta = INDUSTRIES.find((i) => i.key === refined.business_type);
        return {
          ...base,
          ...refined,
          industry_name: meta?.name || base.industry_name,
          sector: meta?.sector || base.sector,
          stage: Math.min(Math.max(Number(refined.stage) || base.stage, 1), 5),
          confidence: "high",
          method: "llm-refined",
        };
      }
    }
  } catch { /* deterministic result stands */ }

  return base;
}

/* ------------------------------------------------------------------ */
/* MCP tool                                                            */
/* ------------------------------------------------------------------ */

const json = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });

export const CLASSIFIER_TOOLS = [
  {
    name: "classify_business",
    description:
      "v3.0 BUSINESS CLASSIFIER. Detects which of the 71 industries (+ generic-b2b/b2c fallback) a business belongs to, plus stage (1 Idea → 5 Maturity), goal, location, and budget tier. Deterministic keyword layer always works; with OPENROUTER_API_KEY the profile is LLM-refined. Unknown industries are logged to the intelligence graph as doctrine gaps.",
    inputSchema: {
      type: "object",
      properties: {
        user_prompt: { type: "string", description: "Free-text description of the business and goals." },
      },
      required: ["user_prompt"],
    },
    handler: async (a) => json(await classifyBusiness(a.user_prompt)),
  },
];
