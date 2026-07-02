/**
 * state.js — the v2.0 State Machine (execution enforcer).
 *
 * Wraps knowledge/system/run-state.json — the single source of truth for
 * "where are we in the engagement". Two enforcer tools are exposed:
 *
 *   request_next_step()   → the ONLY sanctioned way to ask "what do I do now"
 *   submit_deliverable()  → the ONLY sanctioned way to mark work done
 *
 * The lock rule: a deliverable is accepted only for the CURRENT step.
 * No skipping ahead, no back-filling, no silent parallelism — the OS
 * advances one verified step at a time, exactly like the docx protocol.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(__dirname, "..", "..", "..");
export const STATE_PATH = path.join(PLUGIN_ROOT, "knowledge", "system", "run-state.json");

const MIN_DELIVERABLE_CHARS = 40; // a one-liner is not a deliverable

/* ---------------------------------------------------------------------- */
/* persistence                                                            */
/* ---------------------------------------------------------------------- */

export function loadState() {
  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
}

export function saveState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n", "utf8");
  return state;
}

/* ---------------------------------------------------------------------- */
/* run lifecycle                                                          */
/* ---------------------------------------------------------------------- */

/**
 * Seed a fresh engagement (called by initialize_os_session, Step 4).
 * Resets every step to pending and activates the run.
 */
export function initRun({ client, blueprint = "standard-ecommerce" }) {
  const state = loadState();
  state.active = true;
  state.engagement = {
    client: client || "unnamed-client",
    blueprint,
    startedAt: new Date().toISOString(),
    completedAt: null,
  };
  state.currentPhase = "phase-1";
  state.currentStepIndex = 0;
  for (const phase of Object.values(state.phases)) {
    for (const s of phase.steps) {
      s.status = "pending";
      s.deliverable = null;
      s.submittedAt = null;
    }
  }
  state.history.push({ event: "run-initialized", client: state.engagement.client, blueprint, at: state.engagement.startedAt });
  return saveState(state);
}

function currentStep(state) {
  const phase = state.phases[state.currentPhase];
  return { phase, step: phase.steps[state.currentStepIndex] ?? null };
}

/* ---------------------------------------------------------------------- */
/* enforcer 1: request_next_step                                          */
/* ---------------------------------------------------------------------- */

export function requestNextStep({ client } = {}) {
  let state = loadState();

  // Convenience: allow bootstrapping a run directly from the enforcer.
  if (!state.active && client) state = initRun({ client });

  if (!state.active) {
    return {
      active: false,
      message:
        "No active engagement. Call initialize_os_session (or pass `client` here) to seed the run before requesting steps.",
    };
  }

  const { phase, step } = currentStep(state);
  if (!step) {
    return {
      active: true,
      phaseComplete: true,
      phase: state.currentPhase,
      message: `${state.currentPhase} is COMPLETE — all ${phase.steps.length} steps submitted. Proceed to the next phase handoff (knowledge/system/phase-handoffs.md).`,
    };
  }

  const done = phase.steps.filter((s) => s.status === "completed").length;
  return {
    active: true,
    client: state.engagement.client,
    blueprint: state.engagement.blueprint,
    phase: state.currentPhase,
    progress: `${done}/${phase.steps.length}`,
    step: {
      id: step.id,
      section: step.section,
      focus: step.focus,
      index: state.currentStepIndex,
    },
    knowledge: phase.knowledge,
    rules: [
      "Work ONLY on this step. submit_deliverable accepts ONLY this step id.",
      "Query the intelligence graph (RAG) for source material — do not read raw docs.",
      `A deliverable summary must be substantive (>= ${MIN_DELIVERABLE_CHARS} chars).`,
    ],
  };
}

/* ---------------------------------------------------------------------- */
/* enforcer 2: submit_deliverable                                         */
/* ---------------------------------------------------------------------- */

export function submitDeliverable({ step_id, summary, artifact_path = null }) {
  const state = loadState();

  if (!state.active) {
    return { accepted: false, reason: "No active engagement — initialize_os_session first." };
  }

  const { phase, step } = currentStep(state);
  if (!step) {
    return { accepted: false, reason: `${state.currentPhase} is already complete — nothing to submit.` };
  }

  // THE LOCK: only the current step may be submitted.
  if (step_id !== step.id) {
    const attempted = phase.steps.find((s) => s.id === step_id);
    return {
      accepted: false,
      reason: attempted
        ? `STATE LOCK: current step is ${step.id} (“${step.section}”). ` +
          (attempted.status === "completed"
            ? `${step_id} is already completed — no re-submission.`
            : `${step_id} is not reachable yet — no skipping ahead.`)
        : `Unknown step id: ${step_id}.`,
      currentStep: { id: step.id, section: step.section },
    };
  }

  const clean = String(summary ?? "").trim();
  if (clean.length < MIN_DELIVERABLE_CHARS) {
    return {
      accepted: false,
      reason: `Deliverable summary too thin (${clean.length} chars < ${MIN_DELIVERABLE_CHARS}). Submit a substantive summary of what was produced.`,
    };
  }

  step.status = "completed";
  step.deliverable = { summary: clean, artifact_path };
  step.submittedAt = new Date().toISOString();
  state.currentStepIndex += 1;
  state.history.push({ event: "deliverable-accepted", step: step.id, at: step.submittedAt });

  const finished = state.currentStepIndex >= phase.steps.length;
  if (finished) {
    state.engagement.completedAt = new Date().toISOString();
    state.history.push({ event: "phase-complete", phase: state.currentPhase, at: state.engagement.completedAt });
  }
  saveState(state);

  return {
    accepted: true,
    completed: step.id,
    progress: `${state.currentStepIndex}/${phase.steps.length}`,
    ...(finished
      ? { phaseComplete: true, message: `${state.currentPhase} COMPLETE — all ${phase.steps.length} deliverables locked in.` }
      : { next: requestNextStep().step }),
  };
}

/* ---------------------------------------------------------------------- */
/* MCP tool definitions (spread into TOOLS in tools.js)                   */
/* ---------------------------------------------------------------------- */

const json = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });

export const STATE_TOOLS = [
  {
    name: "request_next_step",
    description:
      "STATE MACHINE (enforcer). Returns the ONE step the engagement is currently on — id, Bible section, focus, progress, and the lock rules. Always call this before doing Phase work; never guess the next step. Pass `client` to bootstrap a run if none is active.",
    inputSchema: {
      type: "object",
      properties: {
        client: { type: "string", description: "Optional: client name — seeds a fresh run when no engagement is active." },
      },
    },
    handler: async (args) => json(requestNextStep(args)),
  },
  {
    name: "submit_deliverable",
    description:
      "STATE MACHINE (enforcer). Submit the deliverable for the CURRENT step only — the state lock rejects skipped, repeated, or unknown steps and thin summaries. On acceptance the pointer advances and the next step is returned.",
    inputSchema: {
      type: "object",
      properties: {
        step_id: { type: "string", description: "Id of the step being delivered (must equal the current step, e.g. p1-s00)." },
        summary: { type: "string", description: "Substantive summary of the produced deliverable (>= 40 chars)." },
        artifact_path: { type: "string", description: "Optional path/URI of the produced artifact (deck, doc, sheet)." },
      },
      required: ["step_id", "summary"],
    },
    handler: async (args) => json(submitDeliverable(args)),
  },
];
