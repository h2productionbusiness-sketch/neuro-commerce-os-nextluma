// tools.js — The Neuro-Commerce OS tool suite (11 tools).
// Phase-execution tools return a deterministic ORCHESTRATION PLAN that points Claude at the
// canonical knowledge templates (the source-of-truth docs) + the exact deliverable list +
// the workflow steps + which connected tool / fallback to use. Capability tools do real work.
import { search, searchProvider } from "./lib/search.js";
import { generateImage, imageProvider } from "./lib/image.js";
import { synthesize } from "./lib/tts.js";
import { unitEconomics, BUDGET_ADEQUACY, MIN_AUDIENCE, TEMPERATURE } from "./lib/economics.js";
import { adSetName, splitBudget, buildManifestCsv, adsManagerInstructions, deployPythonScript, metaLiveAvailable, metaCreate } from "./lib/meta.js";
import { viralityScore, creativeFatigue, churnRisk } from "./lib/growth.js";
import { VIDEO_TOOLS, SOCIAL_SOURCES, ingestPlan, hookPerformance, contentScorecard, viralityAndCps } from "./lib/video.js";
import { readinessScore, scoreSegments } from "./lib/persona-scoring.js";
import { biblePlan, personaPlan } from "./lib/deckplan.js";
import { n8nStatus, triggerWebhook, installGuide, N8N_ENV } from "./lib/n8n.js";
import { STATE_TOOLS } from "./lib/state.js";
import { INTENT_TOOLS } from "./lib/intent.js";
import { VIDEOGEN_TOOLS } from "./lib/video-gen.js";
import { NEURO_TOOLS } from "./lib/neuro-tools.js";
import { excerpt, loadKnowledge, PLUGIN_ROOT } from "./lib/templates.js";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const json = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });
const text = (s) => ({ content: [{ type: "text", text: s }] });

// ── Phase deliverable maps (counts/titles match the docs exactly) ──────────────
const PHASE1_BIBLE_SECTIONS = [
  "0 Executive Meta Layer", "1 Business & Strategy", "2 Product/Service Intelligence",
  "3 Pricing & Monetization", "4 Customer & Behavior", "5 Market Intelligence",
  "6 Marketing & Acquisition", "7 Data & Technology", "8 Operations",
  "9 Financial Intelligence", "10 Strategic Synthesis (TOWS/Blue Ocean ERRC/Blueprint)",
  "11 Experimentation System", "12 Execution & Governance", "13 Risk & Scenarios",
  "14 Knowledge System", "15 Output Generation", "16 Quality Control", "17 The Path Forward",
];
const PHASE2_DELIVERABLES = [
  "01 Executive Intelligence Report", "02 Neuro-Psychographic Persona System",
  "03 Competitive Battlefield Intelligence", "04 Market Opportunity & Trend Report",
  "05 Brand Positioning Blueprint", "06 Semiotic Brand System",
  "07 Neuro-Visual Identity Blueprint", "08 Messaging Architecture System",
  "09 Brand Content Operating System", "10 Creative Intelligence Matrix",
  "11 Hook & Attention Library", "12 Meta Ads Intelligence Blueprint",
  "13 Funnel & Conversion Architecture", "14 Pricing & Offer Psychology Report",
  "15 Customer Experience Blueprint", "16 AI Brand Knowledge System",
  "17 Behavioral Knowledge Graph", "18 Predictive Growth Intelligence Dashboard",
];
const PHASE3_PHASES = [
  "0 Intelligence Inputs (Persona, Demand-State, Archetype, Emotional Trigger, Offer)",
  "1 Ideation (Idea Bank, Trend Validation, Opportunity Matrix)",
  "2 Strategy (NeuroCinematic Content Brief)", "3 Scripting (Script + Voiceover)",
  "4 Storyboarding (Storyboard Package)",
  "5 Production (Shot List, Lighting, Audio, Location, Call Sheet, Equipment)",
  "6 Asset Collection", "7 Post-Production (Project, Master Export, Colour/Film Emulation)",
  "8 Distribution Assets (Thumbnails, Captions, Hashtags, Metadata, Copy)",
  "9 Platform Exports (TikTok/IG Reel/IG Feed/YouTube/LinkedIn/FB)",
  "10 Scheduling (Posting Calendar, Campaign Schedule)",
  "11 Performance (Dashboard, Hook Report, Scorecard, Virality/CPS)",
  "12 Supplemental Systems",
];
const PHASE4_TEMPLATES = [
  "T-META-01 Campaign Strategy Brief", "T-META-02 Persona-to-Audience Translation Matrix",
  "T-META-03 Ad Set Engineering Registry", "T-META-04 Creative Testing Matrix",
  "T-META-05 Hook & Angle Performance Database", "T-META-06 Retargeting & Exclusion Stack",
  "T-META-07 Unit Economics Calculator", "T-META-08 Daily/Weekly Performance Dashboard",
  "T-META-09 Pre-Launch QA Checklist (Iron Dome)", "T-META-10 Hypothesis & Experimentation Log",
];

export const TOOLS = [
  // 1 ──────────────────────────────────────────────────────────────────────────
  {
    name: "execute_phase1_diagnostic",
    description: "Run the complete Neuro-Commerce Bible diagnostic (Phase 1): questionnaire → discovery → Brutal Truth (5 Whys, Quantum Score, Financial Audit) → market intelligence → persona architecture → assembled Bible (18 sections).",
    inputSchema: {
      type: "object",
      properties: {
        client_name: { type: "string" },
        industry: { type: "string" },
        interview_transcript: { type: "string", description: "Discovery session transcript (optional)" },
        questionnaire: { type: "string", description: "Completed Client Intelligence Questionnaire (optional)" },
        mode: { type: "string", enum: ["guided", "auto"], default: "guided", description: "'auto' runs the full automated Phase 1 orchestration end-to-end" },
      },
      required: ["client_name", "industry"],
    },
    handler: async (a) => (a.mode === "auto") ? json({
      phase: "Phase 1 — AUTOMATED ORCHESTRATION",
      client: a.client_name, industry: a.industry,
      run_via: "neuro-commerce-os:the-orchestrator agent (or /auto-phase1)",
      pipeline: [
        "1. TOOL SELECTOR — invoke `neuro-commerce-os:tool-selector`: scan MCPs (search, PowerPoint/pptx, Notion, Miro, video), report available, recommend + install (with consent) any missing.",
        "2. DATA COLLECTION — `get_phase1_intake`: ask the 42-question questionnaire, then run the 90-min discovery session (9W+H bank). Store answers structured.",
        "3. MARKET INTELLIGENCE — `analyze_market_intelligence`: competitors, customer signals, congregations (score /40).",
        "4. ANALYST — Brutal Truth (5 Whys, Quantum Score, Financial Audit) → Persona Architecture (all segments) → `score_persona_readiness` (Purchase Readiness %) → Strategic Synthesis (SWOT/TOWS/ERRC/Blueprint) → Opportunity € + ROI.",
        "5. DELIVERABLES — `get_phase1_deck_plan` + `get_nextluma_design_system`: build `Neuro-Commerce-Bible.pptx` (106 slides) and one `Persona-<name>.pptx` (77 slides) per persona, NextLuma-styled, via the PowerPoint MCP / pptx skill.",
        "6. COMPLETE — summarize findings + deliverable locations; ask: 'Proceed to Phase 2?'",
      ],
      gates: "Confirm each install before running it; confirm the persona list before generating per-persona decks. Never install code silently.",
      outputs: ["Neuro-Commerce-Bible.pptx (106 slides)", "Persona-<name>.pptx (77 slides each)", "market_intelligence.md", "phase1_data.json"],
    }) : json({
      phase: "Phase 1 — Neuro-Commerce Bible",
      client: a.client_name, industry: a.industry,
      knowledge_resources: [
        "nco://knowledge/phase-1/01-neuro-commerce-bible.md (DELIVERABLE TEMPLATE — reproduce exactly)",
        "nco://knowledge/phase-1/02-execute-phase-1-step-by-step.md (EXECUTION PROTOCOL)",
        "nco://knowledge/phase-1/03-persona-architect-instruction-set.md",
        "nco://knowledge/phase-1/04-perfect-persona-template.md",
      ],
      workflow: [
        "STEP 1.1 Load the Client Intelligence Questionnaire (8 parts, ~42 questions).",
        "STEP 1.2 Conduct the 90-minute discovery session (9W+H bank).",
        "STEP 1.3 Brutal Truth Assessment: 5 Whys, Quantum Score (/100), Financial Baseline Audit.",
        "STEP 1.4 Market Intelligence: competitor matrix, customer signals, congregation discovery (use analyze_market_intelligence).",
        "STEP 1.5 Persona Architecture: 9W+H + archetype (use generate_persona_architecture).",
        "STEP 1.6 Assemble the Neuro-Commerce Bible (all 18 sections).",
      ],
      deliverable_sections: PHASE1_BIBLE_SECTIONS,
      outputs: ["neuro_commerce_bible.md", "persona_profiles.md", "market_intelligence.md"],
      template_excerpt: excerpt("phase-1/01-neuro-commerce-bible.md", 3000),
      next: "When done, run /qa for the Phase 1 checklist, then execute_phase2_brand_architecture.",
    }),
  },

  // 2 ──────────────────────────────────────────────────────────────────────────
  {
    name: "execute_phase2_brand_architecture",
    description: "Build the complete NeuroBrand Operating System (Phase 2) — all 18 deliverables across 6 sections, from Phase 1 outputs.",
    inputSchema: {
      type: "object",
      properties: {
        phase1_outputs: { type: "string", description: "Bible + persona + market intel (or summary)" },
        brand_voice: { type: "string" },
        visual_identity: { type: "string" },
      },
      required: ["phase1_outputs"],
    },
    handler: async () => json({
      phase: "Phase 2 — NeuroBrand Operating System",
      knowledge_resources: [
        "nco://knowledge/phase-2/01-brand-architecture-deliverables.md (DELIVERABLE MASTER LIST — 18 deliverables)",
        "nco://knowledge/phase-2/02-neurobrand-operating-system.md (FRAMEWORK)",
        "nco://knowledge/phase-2/03-brand-architecture-instruction-set.md (STEP-BY-STEP + TOOL STACK)",
      ],
      workflow: [
        "Define Brand Neurological Signature (Four-Type Classification + Chemical Triggers).",
        "Build Persona-to-Brand Translation Matrix (10 dimensions).",
        "Create Brand Positioning Blueprint (Mission, Vision, Essence, Positioning, Archetype, Story).",
        "Design Semiotic + Neuro-Visual Identity (color/shape/typography psychology).",
        "Build Messaging Architecture (Voice/Tone, Framework, Power Language, Hook & CTA).",
        "Create Brand Content OS + Creative Intelligence Matrix + Hook Library.",
        "Build Meta Ads Intelligence, Funnel, Pricing/Offer, CX, AI Knowledge, Behavioral Graph, Predictive Dashboard.",
        "Assemble the Brand Book.",
      ],
      deliverables: PHASE2_DELIVERABLES,
      tool_stack: "Recraft/Higgsfield (image), Notion (Brand Book), Miro (maps), SerpAPI/Tavily (research), Pulse (social), Canva (templates). Use connected MCPs where present; else fallbacks.",
      outputs: ["brand_os.md", "visual_identity_guide.md", "messaging_framework.md", "brand_book.md"],
      template_excerpt: excerpt("phase-2/01-brand-architecture-deliverables.md", 3000),
    }),
  },

  // 3 ──────────────────────────────────────────────────────────────────────────
  {
    name: "execute_phase3_content_production",
    description: "Generate neuro-cinematic content (Phase 3 / Kontent Kreation + Inception Codex) across Phases 0–12. Honors production mode (AI vs Real) and posting frequency.",
    inputSchema: {
      type: "object",
      properties: {
        phase2_outputs: { type: "string" },
        content_brief: { type: "string" },
        production_mode: { type: "string", enum: ["AI", "REAL"], default: "AI" },
        posting_frequency: { type: "string", enum: ["Low", "Medium", "High", "Insane"], default: "Medium" },
      },
      required: ["phase2_outputs"],
    },
    handler: async (a) => json({
      phase: "Phase 3 — Kontent Kreation Intelligence System",
      production_mode: a.production_mode || "AI",
      posting_frequency: a.posting_frequency || "Medium",
      knowledge_resources: [
        "nco://knowledge/phase-3/01-kontent-kreation-deliverables.md (DELIVERABLES, Phases 0–12)",
        "nco://knowledge/phase-3/02-kontent-kreation-instruction-set.md (WORKFLOW + TOOL STACK + FALLBACK)",
        "nco://knowledge/phase-3/03-inception-codex-v10-neuro-cinematic.md (NEURO-CINEMATIC ENGINEERING — the craft bible)",
      ],
      workflow_phases: PHASE3_PHASES,
      asset_tools: "Images: generate_image (Recraft/Leonardo/SD fallback). Voiceover: synthesize (edge-tts fallback). Video: CapCut/DaVinci (manual). Scheduling: Posting Calendar.",
      posting_frequency_map: { Low: "1–3 posts/week", Medium: "1 post/day", High: "2–3 posts/day", Insane: "5+ posts/day" },
      outputs: ["scripts.md", "storyboard.md", "video_assets/*", "thumbnails/*", "posting_calendar.csv"],
      template_excerpt: excerpt("phase-3/03-inception-codex-v10-neuro-cinematic.md", 3000),
    }),
  },

  // 4 ──────────────────────────────────────────────────────────────────────────
  {
    name: "execute_phase4_ads_campaign",
    description: "Build & prepare Meta Ads campaigns (Phase 4 / Universal Meta Ads System) — all 10 T-META templates, Iron Dome QA, and deployment manifest/script.",
    inputSchema: {
      type: "object",
      properties: {
        phase3_outputs: { type: "string" },
        unit_economics: { type: "object", description: "{averagePurchaseValue, purchaseFrequency, customerLifespan, grossMargin}" },
        daily_budget: { type: "number" },
        objective: { type: "string", enum: ["Awareness", "Consideration", "Conversion", "Hybrid"], default: "Conversion" },
        deployment_mode: { type: "string", enum: ["API", "Manifest", "Python"], default: "Manifest" },
      },
    },
    handler: async (a) => {
      const econ = a.unit_economics ? unitEconomics(a.unit_economics) : null;
      return json({
        phase: "Phase 4 — Universal Meta Ads System",
        objective: a.objective || "Conversion",
        deployment_mode: a.deployment_mode || "Manifest",
        knowledge_resources: [
          "nco://knowledge/phase-4/01-meta-ads-deliverables-templates.md (T-META TEMPLATE SET)",
          "nco://knowledge/phase-4/02-meta-ads-acquisition-engine.md (STRATEGY ENGINE)",
          "nco://knowledge/phase-4/03-meta-ads-execution-protocol-instruction-set.md (EXECUTION PROTOCOL)",
        ],
        workflow: [
          "Present Campaign Configuration Matrix (objective/budget/audience/creative/deployment).",
          "Calculate Unit Economics (One-Third Rule) → calculate_unit_economics.",
          "Build Audience Architecture (persona→interests, Cold/Warm/Hot) → analyze_market_intelligence + temperature map.",
          "Select hooks & creatives (Creative Testing Matrix, 15-variant).",
          "Engineer ad sets (TEMP_ARCH_GOAL_PLATFORM_GEO_AGE) → deploy_ads_campaign.",
          "Build retargeting stack (3-Day Exclusion on Warm & Hot).",
          "Run Iron Dome QA → run_iron_dome_qa.",
          "Deploy (Manifest / Python / API) → deploy_ads_campaign.",
        ],
        templates: PHASE4_TEMPLATES,
        unit_economics: econ,
        temperature_segmentation: TEMPERATURE,
        outputs: ["campaign_brief.md", "ad_sets.csv", "creative_assets/*", "deployment (manifest.csv | launch_ads.py | API)"],
        template_excerpt: excerpt("phase-4/02-meta-ads-acquisition-engine.md", 2500),
      });
    },
  },

  // 5 ──────────────────────────────────────────────────────────────────────────
  {
    name: "generate_persona_architecture",
    description: "Build complete 9W+H persona profiles with archetype, empathy map, and the 25-phase Persona Architect output.",
    inputSchema: {
      type: "object",
      properties: {
        interview_transcript: { type: "string" },
        customer_signals: { type: "string" },
        psychographics: { type: "string" },
      },
    },
    handler: async () => json({
      module: "Persona Architect (Phase 1)",
      knowledge_resources: [
        "nco://knowledge/phase-1/03-persona-architect-instruction-set.md (25-phase instruction set)",
        "nco://knowledge/phase-1/04-perfect-persona-template.md (full template, 18+ sections)",
      ],
      build_order: [
        "9W+H Canvas: WHO, WHAT, WHY, WHEN, WHERE, HOW, WHICH, WHOSE, WISH.",
        "Archetype profile (axis, core desire/fear/drive, neurological signature).",
        "Psychometrics: CNFU, BESC, CSII-Norm, CSII-Info, MVS.",
        "Empathy map, Means-End chain, Customer Journey, Value Proposition Canvas.",
        "AI Activation: Meta Ads Export Card + AI-ready JSON persona.",
      ],
      outputs: ["persona_snapshot.md", "9wh_profile.md", "empathy_map.md", "archetype_profile.md", "persona.json"],
      template_excerpt: excerpt("phase-1/04-perfect-persona-template.md", 3000),
    }),
  },

  // 6 ──────────────────────────────────────────────────────────────────────────
  {
    name: "analyze_market_intelligence",
    description: "Run competitor analysis, customer-signal extraction, and congregation discovery. Uses SerpAPI→Tavily→manual fallback.",
    inputSchema: {
      type: "object",
      properties: {
        industry: { type: "string" },
        location: { type: "string" },
        target_persona: { type: "string" },
        queries: { type: "array", items: { type: "string" }, description: "Optional explicit search queries" },
      },
      required: ["industry"],
    },
    handler: async (a) => {
      const base = a.queries && a.queries.length
        ? a.queries
        : [
            `${a.industry} competitors ${a.location || ""}`.trim(),
            `${a.industry} customer complaints reviews`,
            `${a.industry} ${a.target_persona || "customers"} forum OR reddit discussion`,
            `best ${a.industry} ${a.location || ""} 2026`.trim(),
          ];
      const results = [];
      for (const q of base.slice(0, 6)) results.push(await search(q, 8));
      return json({
        provider: searchProvider(),
        industry: a.industry, location: a.location || null,
        searches: results,
        deliverables: ["competitor_matrix.md", "customer_signals.md", "congregations.md"],
        congregation_quality_criteria: "Activity(10) + Member Authenticity(10) + Relevance(10) + Size(10) = /40.",
      });
    },
  },

  // 7 ──────────────────────────────────────────────────────────────────────────
  {
    name: "create_content_strategy",
    description: "Build the Content OS with emotional sequencing, pillars, and a content calendar (Phase 2/3 bridge).",
    inputSchema: {
      type: "object",
      properties: {
        persona_profiles: { type: "string" },
        brand_os: { type: "string" },
        trend_data: { type: "string" },
        posting_frequency: { type: "string", enum: ["Low", "Medium", "High", "Insane"], default: "Medium" },
      },
    },
    handler: async (a) => json({
      module: "Content OS",
      knowledge_resources: [
        "nco://knowledge/phase-3/03-inception-codex-v10-neuro-cinematic.md (Content Mission, 3–5 Pillars, Emotional Trigger Matrix)",
      ],
      build: ["Content Mission Statement", "3–5 Content Pillars", "Demand-State Mapping", "Emotional sequencing (Fear→Desire→Identity)", "Content calendar"],
      posting_frequency: a.posting_frequency || "Medium",
      outputs: ["content_os.md", "emotional_sequencing.md", "content_calendar.csv"],
    }),
  },

  // 8 ──────────────────────────────────────────────────────────────────────────
  {
    name: "deploy_ads_campaign",
    description: "Engineer ad sets and produce a deployment artifact: manifest.csv + Ads Manager guide, a launch_ads.py script, or a live API call (only if META_ACCESS_TOKEN is set).",
    inputSchema: {
      type: "object",
      properties: {
        adsets: {
          type: "array",
          description: "Ad set specs: {temp, archetype, goal, platform, geo, age, objective, audience, creativeUrl, headline, primaryText, cta, dailyBudget, bidStrategy}",
          items: { type: "object" },
        },
        total_daily_budget: { type: "number" },
        mode: { type: "string", enum: ["Manifest", "Python", "API"], default: "Manifest" },
      },
      required: ["adsets"],
    },
    handler: async (a) => {
      const adsets = (a.adsets || []).map((s) => ({
        ...s,
        name: s.name || adSetName(s),
      }));
      const out = {
        mode: a.mode || "Manifest",
        named_adsets: adsets.map((s) => s.name),
        budget_split: a.total_daily_budget ? splitBudget(a.total_daily_budget) : null,
        naming_convention: "TEMP_ARCH_GOAL_PLATFORM_GEO_AGE",
      };
      if ((a.mode || "Manifest") === "Manifest") {
        out.manifest_csv = buildManifestCsv(adsets);
        out.ads_manager_instructions = adsManagerInstructions();
      } else if (a.mode === "Python") {
        out.python_script = deployPythonScript();
        out.note = "Save as launch_ads.py + ads.json. Replace the token. Claude never asks for the token directly.";
      } else if (a.mode === "API") {
        out.live_available = metaLiveAvailable();
        out.api_note = metaLiveAvailable()
          ? "META_ACCESS_TOKEN present — campaign/adset/ad creation can be executed via metaCreate, or use the connected ads_* MCP tools."
          : "No META_ACCESS_TOKEN. Falling back: use the connected ads_create_campaign/ads_create_ad_set/ads_create_ad MCP tools, or generate the Python script.";
      }
      return json(out);
    },
  },

  // 9 ──────────────────────────────────────────────────────────────────────────
  {
    name: "generate_learning_loop",
    description: "Update the knowledge graph / personas / hook DB with performance data and emit new hypotheses (continuous learning).",
    inputSchema: {
      type: "object",
      properties: {
        campaign_results: { type: "string" },
        persona_updates: { type: "string" },
        hook_performance: { type: "string" },
      },
    },
    handler: async () => json({
      module: "Learning Loop",
      steps: ["Ingest performance (CPA/ROAS/CTR/hook-rate).", "Update persona confidence + hook DB scores.", "Promote/kill creatives per Kill-Switch Hierarchy.", "Emit ICE-scored hypotheses for next cycle."],
      outputs: ["updated_personas.md", "updated_hooks.md", "new_hypotheses.md"],
    }),
  },

  // 10 ─────────────────────────────────────────────────────────────────────────
  {
    name: "calculate_unit_economics",
    description: "Compute LTV, Maximum CPA (One-Third Rule), Target CPA, Break-even ROAS, Target ROAS, and budget adequacy by goal.",
    inputSchema: {
      type: "object",
      properties: {
        averagePurchaseValue: { type: "number" },
        purchaseFrequency: { type: "number", default: 1 },
        customerLifespan: { type: "number", default: 1 },
        grossMargin: { type: "number", description: "0..1, e.g. 0.6 for 60%" },
      },
      required: ["averagePurchaseValue"],
    },
    handler: async (a) => json({
      ...unitEconomics(a),
      budget_adequacy_by_goal: BUDGET_ADEQUACY,
      minimum_audience_sizes: MIN_AUDIENCE,
    }),
  },

  // 11 ─────────────────────────────────────────────────────────────────────────
  {
    name: "run_iron_dome_qa",
    description: "Run the Phase 4 Iron Dome pre-launch QA checklist against a campaign spec and return PASS/WARNING/FAIL per check.",
    inputSchema: {
      type: "object",
      properties: {
        adsets: { type: "array", items: { type: "object" }, description: "Ad set specs to validate" },
        pixel_confirmed: { type: "boolean", default: false },
        capi_confirmed: { type: "boolean", default: false },
      },
      required: ["adsets"],
    },
    handler: async (a) => {
      const checks = [];
      const namePat = /^(COLD|WARM|HOT)_[^_]+_[^_]+_[^_]+_[^_]+_.+$/;
      const adsets = a.adsets || [];
      const badNames = adsets.filter((s) => !namePat.test(s.name || adSetName(s)));
      checks.push({ check: "Ad Set names follow TEMP_ARCH_GOAL_PLATFORM_GEO_AGE", status: badNames.length ? "FAIL" : "PASS", notes: badNames.map((s) => s.name).join(", ") });

      const warmHot = adsets.filter((s) => /warm|hot/i.test(s.temp || ""));
      const missingExcl = warmHot.filter((s) => !/3.?day|exclu/i.test(JSON.stringify(s)));
      checks.push({ check: "3-Day Exclusion applied to Warm & Hot", status: missingExcl.length ? "WARNING" : "PASS", notes: missingExcl.map((s) => s.name).join(", ") });

      const banned = adsets.filter((s) => /#?D5FF00/i.test(JSON.stringify(s)));
      checks.push({ check: "Visual OS (#D5FF00 banned, 20% Swiss-grid padding)", status: banned.length ? "FAIL" : "PASS", notes: banned.length ? "Banned color present" : "" });

      const lowBudget = adsets.filter((s) => /hot/i.test(s.temp || "") && Number(s.dailyBudget) > 0 && Number(s.dailyBudget) < 50);
      checks.push({ check: "Budget ≥ minimum (Conversions ≥ ~50 TND/€)", status: lowBudget.length ? "WARNING" : "PASS", notes: lowBudget.map((s) => `${s.name}: ${s.dailyBudget}`).join(", ") });

      checks.push({ check: "Pixel installed & firing", status: a.pixel_confirmed ? "PASS" : "UNKNOWN", notes: a.pixel_confirmed ? "" : "Confirm pixel is active." });
      checks.push({ check: "CAPI implemented", status: a.capi_confirmed ? "PASS" : "UNKNOWN", notes: a.capi_confirmed ? "" : "Confirm CAPI is configured." });

      const blocking = checks.filter((c) => c.status === "FAIL");
      const warnings = checks.filter((c) => c.status === "WARNING" || c.status === "UNKNOWN");
      return json({
        iron_dome_qa: checks,
        verdict: blocking.length ? "BLOCKED — fix FAILs before launch" : warnings.length ? "PROCEED WITH CAUTION — resolve warnings" : "CLEARED FOR LAUNCH",
        action: (blocking.length || warnings.length) ? "Ask the user for permission to adjust before proceeding." : "Proceed to deployment.",
      });
    },
  },

  // Bonus capability tools wrapping the asset generators (used inside Phase 3) ──
  {
    name: "generate_image_asset",
    description: "Generate an image asset (logo/social/thumbnail) via Recraft→Leonardo→local Stable Diffusion→ready-prompt fallback.",
    inputSchema: {
      type: "object",
      properties: { prompt: { type: "string" }, style: { type: "string" }, size: { type: "string" } },
      required: ["prompt"],
    },
    handler: async (a) => json({ provider_preference: imageProvider(), ...(await generateImage(a.prompt, { style: a.style, size: a.size })) }),
  },
  {
    name: "generate_voiceover",
    description: "Generate a voiceover via edge-tts, or return a production-ready voiceover spec if unavailable.",
    inputSchema: {
      type: "object",
      properties: { text: { type: "string" }, voice: { type: "string" }, outFile: { type: "string" } },
      required: ["text"],
    },
    handler: async (a) => json(await synthesize(a.text, { voice: a.voice, outFile: a.outFile })),
  },

  // 14 — Phase 5 orchestration ──────────────────────────────────────────────────
  {
    name: "execute_phase5_growth_intelligence",
    description: "Run Phase 5 — Predictive Growth Intelligence & Learning Loop: predictive dashboard, conversion/churn scoring, virality (VPS), creative-fatigue detection, causal attribution, and knowledge-graph update.",
    inputSchema: {
      type: "object",
      properties: {
        performance_data: { type: "string", description: "Campaign/content performance to analyze" },
        personas: { type: "string" },
      },
    },
    handler: async () => json({
      phase: "Phase 5 — Predictive Growth Intelligence",
      modules: [
        "Predictive Behaviors (Behavior→Prediction→Confidence)",
        "Trend Forecasting (Trend→Forecast→Timeline)",
        "Conversion Probability Scoring (Segment→Probability→Action)",
        "Churn Risk Analysis → score_churn_risk",
        "Content Performance Prediction + Virality (VPS) → calculate_virality_score",
        "Creative Fatigue Detection → detect_creative_fatigue",
        "Causal Attribution Framework (Variable→Confounder→Test Design)",
        "Marginal ROI Calculator",
        "Knowledge Graph update + Learning Loop → generate_learning_loop",
      ],
      outputs: ["predictive_dashboard.md", "churn_risk_report.md", "vps_scorecard.md", "hypothesis_log.md", "updated_personas.md", "knowledge_graph.md"],
      cadence: "Weekly → Monthly → Quarterly → Annually. Feed learnings back to Phase 1 (refine personas/strategy).",
    }),
  },

  // 15 ─────────────────────────────────────────────────────────────────────────
  {
    name: "calculate_virality_score",
    description: "Compute the Virality Probability Score (VPS) — 6-factor weighted model (Emotional Intensity 25%, Novelty 20%, Social Currency 20%, Practical Value 15%, Storytelling 10%, Pattern Interrupt 10%). Each factor 1–10.",
    inputSchema: {
      type: "object",
      properties: {
        emotionalIntensity: { type: "number" }, novelty: { type: "number" },
        socialCurrency: { type: "number" }, practicalValue: { type: "number" },
        storytellingQuality: { type: "number" }, patternInterruptStrength: { type: "number" },
      },
    },
    handler: async (a) => json(viralityScore(a)),
  },

  // 16 ─────────────────────────────────────────────────────────────────────────
  {
    name: "detect_creative_fatigue",
    description: "Detect creative fatigue from performance deltas (Inception Codex 8.4 thresholds) and recommend the fix.",
    inputSchema: {
      type: "object",
      properties: {
        ctrDeclinePct: { type: "number" }, frequency: { type: "number" },
        engagementDropPct: { type: "number" }, completionDeclinePct: { type: "number" },
      },
    },
    handler: async (a) => json(creativeFatigue(a)),
  },

  // 17 ─────────────────────────────────────────────────────────────────────────
  {
    name: "score_churn_risk",
    description: "Score customer/segment churn risk (0–10) with band and retention action.",
    inputSchema: {
      type: "object",
      properties: {
        recencyDays: { type: "number" }, engagementDrop: { type: "number", description: "0–10" },
        supportTickets: { type: "number", description: "0–10" }, nps: { type: "number", description: "0–10" },
        tenureMonths: { type: "number" },
      },
    },
    handler: async (a) => json(churnRisk(a)),
  },

  // 18 — Video/social content diagnostics ───────────────────────────────────────
  {
    name: "diagnose_video_content",
    description: "Diagnose a social media reel/video: returns the ingest plan (which installed video-analysis MCP tool to use to extract frames+timestamps+transcript), the frame-by-frame diagnostic checklist (hook 0–3s, retention/drop-off, pacing, pattern interrupts, shot/lighting/sound, CTA) grounded in the Inception Codex, and the scoring template. Use BEFORE score_social_content.",
    inputSchema: {
      type: "object",
      properties: {
        source: { type: "string", enum: ["file", "url"], default: "file" },
        video_ref: { type: "string", description: "Local path or URL of the reel/video" },
        platform: { type: "string", enum: ["tiktok", "instagram", "youtube", "facebook"], default: "tiktok" },
        purpose: { type: "string", enum: ["own", "competitor"], default: "own", description: "Diagnosing your own content or a competitor's" },
      },
    },
    handler: async (a) => json({
      module: "Video / Social Content Diagnostics",
      video_ref: a.video_ref || null,
      platform: a.platform || "tiktok",
      purpose: a.purpose || "own",
      available_video_tools: VIDEO_TOOLS,
      transcript_metadata_sources: SOCIAL_SOURCES[a.platform || "tiktok"] || [],
      ingest_plan: ingestPlan(a.source || "file", a.platform || "tiktok"),
      diagnostic_checklist: [
        "HOOK (0–3s): visual + verbal hook present? Pattern interrupt in first frame? Face/motion/stat/claim? Map to Inception Codex 4.5/4.6 Hook templates & Library by Archetype.",
        "RETENTION CURVE: identify drop-off points (3s, 25%, 50%, 75%, 100%). Where does attention fade? Is there a re-hook at ~3s/~7s? (Codex 3.14 Pacing, 7.1 Algorithm).",
        "PATTERN INTERRUPTS: count visual/audio interrupts and spacing (Codex 4.2–4.4).",
        "CRAFT: shot types, angles, movement, lighting, color/NeuroChromatic, sound frequency vs target emotion/archetype (Codex 3.x).",
        "STORY/ARC: emotional sequence (Fear→Desire→Identity); is there tension→payoff?",
        "CTA: present, single, friction-matched to goal?",
        "CAPTION/TEXT-ON-SCREEN: hook reinforced? readability (Swiss-grid 20% padding)?",
      ],
      scoring_next: "Then call score_social_content with the observed/known metrics to produce Hook Performance (11.2), Content Scorecard (11.3), and Virality/CPS (11.4).",
      knowledge_resources: [
        "nco://knowledge/phase-3/03-inception-codex-v10-neuro-cinematic.md (Sections 4 hooks, 7 algorithm, 8 performance)",
        "nco://knowledge/phase-3/01-kontent-kreation-deliverables.md (11.2–11.4 templates)",
      ],
    }),
  },

  // 19 ─────────────────────────────────────────────────────────────────────────
  {
    name: "score_social_content",
    description: "Score a diagnosed reel/video: Hook Performance tier (3s view rate + pattern-interrupt retention + CTR + engagement → Excellent/Good/Average/Poor with fixes), Content Scorecard (Hook/Visual/Audio/Story/CTA → /50 + tier), and Virality/CPS (VPS + CPS status + viral coefficient).",
    inputSchema: {
      type: "object",
      properties: {
        hook_metrics: { type: "object", description: "{threeSecondViewRate, patternInterruptRetention, ctr, engagementRate} (percentages)" },
        scorecard: { type: "object", description: "{hook, visual, audio, story, cta} each 1–10" },
        virality: { type: "object", description: "{vpsFactors:{emotionalIntensity,novelty,socialCurrency,practicalValue,storytellingQuality,patternInterruptStrength}, costPerShare, viralCoefficient}" },
      },
    },
    handler: async (a) => json({
      hook_performance: a.hook_metrics ? hookPerformance(a.hook_metrics) : null,
      content_scorecard: a.scorecard ? contentScorecard(a.scorecard) : null,
      virality_cps: a.virality ? viralityAndCps(a.virality) : null,
      note: "Tiers/benchmarks are transparent and configurable; VPS weights are fixed per the Inception Codex (8.2).",
    }),
  },

  // 20 — NextLuma design system (for PowerPoint deck styling) ────────────────────
  {
    name: "get_nextluma_design_system",
    description: "Return the NextLuma Color System tokens (exact hex values, intelligence gradient, UI neutrals, non-negotiable rules) and the Phase 1 PowerPoint deck spec — for building on-brand decks/visuals.",
    inputSchema: {
      type: "object",
      properties: {
        include_deck_spec: { type: "boolean", default: true, description: "Include the Phase 1 slide-by-slide deck spec" },
      },
    },
    handler: async (a) => {
      let tokens = null;
      const raw = loadKnowledge("design/tokens.json");
      try { tokens = raw ? JSON.parse(raw) : null; } catch { tokens = raw; }
      return json({
        design_system: "NextLuma — Cold Architecture × Living Intelligence",
        tokens,
        resources: [
          "nco://knowledge/design/nextluma-color-system.md",
          "nco://knowledge/design/tokens.json",
          "nco://knowledge/design/tokens.css",
          "nco://knowledge/design/phase-1-deck-spec.md",
          "nco://knowledge/design/phase-1-bible-slide-outline.md (106 content slides — EXACT docx order)",
          "nco://knowledge/design/phase-1-persona-slide-outline.md (77 content slides — EXACT docx order)",
        ],
        exact_slide_counts: { bible_content_slides: 106, persona_content_slides: 77, note: "One slide per docx sub-section; do not add/merge/drop/reorder." },
        status_remap_no_warm_tones: { strong: "#4CD7FF", neutral: "#6B7280", weak: "#FF4D8D" },
        deck_spec: (a.include_deck_spec === false) ? undefined : excerpt("design/phase-1-deck-spec.md", 6000),
      });
    },
  },

  // 21 — Phase 1 client intake (questionnaire + discovery session) ───────────────
  {
    name: "get_phase1_intake",
    description: "Return the Phase 1 client intake instruments: the Client Intelligence Questionnaire (42 questions, 8 parts) and/or the 90-minute Discovery Session guide (agenda + full 9W+H question bank + probing bank + checklists). Use at STEP 1/STEP 2, before building the Bible.",
    inputSchema: {
      type: "object",
      properties: {
        which: { type: "string", enum: ["questionnaire", "discovery", "both"], default: "both" },
      },
    },
    handler: async (a) => {
      const which = a.which || "both";
      const out = { module: "Phase 1 — Client Intake" };
      if (which === "questionnaire" || which === "both") {
        out.client_intelligence_questionnaire = loadKnowledge("phase-1/05-client-intelligence-questionnaire.md");
      }
      if (which === "discovery" || which === "both") {
        out.discovery_session_guide = loadKnowledge("phase-1/06-discovery-session-guide.md");
      }
      out.resources = [
        "nco://knowledge/phase-1/05-client-intelligence-questionnaire.md",
        "nco://knowledge/phase-1/06-discovery-session-guide.md",
      ];
      out.flow = "Send the questionnaire → run the 90-min discovery session → extract Key Insights/Hypotheses/Gaps/Persona Hypotheses/Core Problem → Brutal Truth → assemble the Bible.";
      return json(out);
    },
  },

  // 22 — Persona purchase-readiness scoring ─────────────────────────────────────
  {
    name: "score_persona_readiness",
    description: "Score each customer segment's Purchase Readiness % (Intent 40% · Pain frequency 30% · Demographic fit 20% · Behavioral cues 10%). Inputs are 0–10 signal strengths. Returns ranked personas with band + recommended action — for the Bible persona section and the per-persona decks.",
    inputSchema: {
      type: "object",
      properties: {
        segments: {
          type: "array",
          description: "Segments: {persona, archetype, intentSignals, painFrequency, demographicFit, behavioralCues} (each signal 0–10)",
          items: { type: "object" },
        },
      },
      required: ["segments"],
    },
    handler: async (a) => json({
      formula: "Intent 40% · Pain 30% · Demographic fit 20% · Behavioral cues 10% (each signal 0–10 → 0–100%)",
      ranked_personas: scoreSegments(a.segments || []),
    }),
  },

  // 23 — Deterministic Phase 1 deck plan (exact 106 / 77 slides) ─────────────────
  {
    name: "get_phase1_deck_plan",
    description: "Return the deterministic, ordered slide plan for the Phase 1 decks parsed from the authoritative outlines — every slide with its index, type (section-divider/content), chosen NextLuma master, title, and section. Guarantees the deck matches the docx exactly (Bible 106, Persona 77).",
    inputSchema: {
      type: "object",
      properties: {
        deck: { type: "string", enum: ["bible", "persona", "both"], default: "both" },
      },
    },
    handler: async (a) => {
      const deck = a.deck || "both";
      const out = {};
      if (deck === "bible" || deck === "both") out.bible = biblePlan();
      if (deck === "persona" || deck === "both") out.persona = personaPlan();
      out.instructions = "Build one PPTX slide per plan entry, in order. Title = entry.title; style = entry.master (see phase-1-deck-spec.md); populate content-slide tables verbatim from nco://knowledge/phase-1/01-neuro-commerce-bible.md or …/04-perfect-persona-template.md.";
      return json(out);
    },
  },

  // 24 — n8n: install guidance + status ─────────────────────────────────────────
  {
    name: "install_n8n",
    description: "Return OS-appropriate commands to install & run n8n locally (Node route preferred; Docker fallback), how to link it to the plugin, and the current reachability of the local n8n server.",
    inputSchema: {
      type: "object",
      properties: { os: { type: "string", enum: ["windows", "mac", "linux"], default: "windows" } },
    },
    handler: async (a) => json({ guide: installGuide(a.os || "windows"), status: await n8nStatus(), env: N8N_ENV }),
  },

  // 25 — n8n: configure webhook + export importable workflow ─────────────────────
  {
    name: "configure_n8n_webhook",
    description: "Return the n8n webhook setup steps plus the bundled importable workflow JSON (Phase 4 post-click lead-automation pipeline: webhook → scoring → route to AI voice / Meta CAPI offline conversion).",
    inputSchema: { type: "object", properties: {} },
    handler: async () => {
      const wfPath = join(PLUGIN_ROOT, "automation", "n8n", "lead-automation-pipeline.json");
      const workflow = existsSync(wfPath) ? readFileSync(wfPath, "utf-8") : "(workflow file not found)";
      return json({
        status: await n8nStatus(),
        steps: [
          "Open http://localhost:5678 and create/sign in to your local n8n.",
          "Workflows → Import from File/JSON → paste the workflow below (or import automation/n8n/lead-automation-pipeline.json).",
          "Replace YOUR_* placeholders (Vapi key + assistant, Meta ad account + access token).",
          "Toggle the workflow Active, open the Webhook node, copy the Production URL (…/webhook/lead-capture).",
          "Set N8N_WEBHOOK_URL to that URL in .mcp.json (or pass it to trigger_n8n_workflow).",
          "In Meta, point your Lead Form / CRM webhook at the same URL so leads flow in.",
        ],
        workflow_json: workflow,
        env: N8N_ENV,
      });
    },
  },

  // 26 — n8n: trigger a workflow (plugin → n8n automation link) ──────────────────
  {
    name: "trigger_n8n_workflow",
    description: "POST a JSON payload to an n8n webhook to trigger an automation (e.g. publish content, deploy post-click flow, sync a lead). Targets are restricted to your local n8n unless ALLOW_EXTERNAL_WEBHOOKS=1.",
    inputSchema: {
      type: "object",
      properties: {
        webhook_url: { type: "string", description: "n8n webhook URL (defaults to N8N_WEBHOOK_URL)" },
        payload: { type: "object", description: "JSON payload to send" },
      },
    },
    handler: async (a) => json(await triggerWebhook(a.webhook_url, a.payload)),
  },

  // ── v2.0 State Machine enforcers (lib/state.js) ──────────────────────────
  ...STATE_TOOLS,

  // ── v2.0 Intent Router front door (lib/intent.js) ────────────────────────
  ...INTENT_TOOLS,

  // ── v2.0 locked-character video generation (lib/video-gen.js) ────────────
  ...VIDEOGEN_TOOLS,

  // ── v2.0 NeuroSystem memory + consolidation (lib/neuro-tools.js) ─────────
  ...NEURO_TOOLS,
];

export function getTool(name) {
  return TOOLS.find((t) => t.name === name);
}
