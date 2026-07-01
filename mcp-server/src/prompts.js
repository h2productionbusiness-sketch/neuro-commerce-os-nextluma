// prompts.js — the 4 MCP prompts that bootstrap each workflow.
export const PROMPTS = [
  {
    name: "start_neuro_commerce_os",
    description: "Initialize the complete Neuro-Commerce OS for a client.",
    arguments: [
      { name: "client", description: "Client / business name", required: true },
      { name: "industry", description: "Industry", required: false },
    ],
    build: (a) =>
      `I need to build a complete Neuro-Commerce OS for ${a.client || "[client]"}` +
      `${a.industry ? ` (${a.industry})` : ""}. Start with Phase 1 (the Neuro-Commerce Bible). ` +
      `Load the Client Intelligence Questionnaire, then walk me through discovery. ` +
      `Use the execute_phase1_diagnostic tool and the nco://knowledge/phase-1 templates. Here's what I know so far: …`,
  },
  {
    name: "build_persona_architecture",
    description: "Build complete 9W+H persona profiles with archetype.",
    arguments: [{ name: "persona_name", description: "Persona name/label", required: false }],
    build: (a) =>
      `Using the discovery-session data, build a complete 9W+H persona profile for ` +
      `${a.persona_name || "[persona]"} with archetype, psychometrics (CNFU/BESC/CSII/MVS), empathy map, ` +
      `and an AI-ready Meta Ads export card. Use generate_persona_architecture and the ` +
      `nco://template/persona_template_9wh template.`,
  },
  {
    name: "generate_creative_brief",
    description: "Generate a neuro-cinematic content brief.",
    arguments: [
      { name: "archetype", description: "Target archetype", required: false },
      { name: "emotion", description: "Target emotion", required: false },
      { name: "hook_type", description: "Hook type", required: false },
    ],
    build: (a) =>
      `Create a neuro-cinematic content brief for the ${a.archetype || "[archetype]"} archetype, ` +
      `targeting ${a.emotion || "[emotion]"} with hook type ${a.hook_type || "[hook_type]"}. ` +
      `Use execute_phase3_content_production and the Inception Codex (nco://template/content_brief_template).`,
  },
  {
    name: "deploy_ads_manifest",
    description: "Generate a complete Meta Ads campaign manifest.",
    arguments: [{ name: "objective", description: "Campaign objective", required: false }],
    build: (a) =>
      `Build a complete Meta Ads campaign manifest with Cold/Warm/Hot audiences, hooks, and creatives ` +
      `for a ${a.objective || "[objective]"} objective. Calculate unit economics first ` +
      `(calculate_unit_economics), engineer ad sets with the TEMP_ARCH_GOAL_PLATFORM_GEO_AGE convention, ` +
      `run run_iron_dome_qa, then deploy_ads_campaign.`,
  },
];

export function getPrompt(name) {
  return PROMPTS.find((p) => p.name === name);
}
