// tts.js — Voiceover generation with fallback (per the docs):
//   IF edge-tts CLI available -> use it (free, offline-ish via Microsoft Edge voices)
//   ELSE -> return an SSML-ready voiceover spec + instructions for manual generation.
import { spawn } from "node:child_process";

export async function edgeTtsAvailable() {
  return new Promise((res) => {
    const p = spawn("edge-tts", ["--list-voices"], { shell: true });
    let ok = false;
    p.on("error", () => res(false));
    p.stdout.on("data", () => { ok = true; });
    p.on("close", () => res(ok));
    setTimeout(() => res(ok), 4000);
  });
}

export async function synthesize(text, { voice = "en-US-GuyNeural", outFile = "voiceover.mp3" } = {}) {
  const available = await edgeTtsAvailable();
  if (!available) {
    return {
      provider: "fallback",
      note:
        "edge-tts not found. Install with `pip install edge-tts`, or use Claude's connected tools / Google TTS. " +
        "Below is a production-ready voiceover spec.",
      voiceover_spec: { voice, text, pacing: "Match emotional arc; pause 300ms at scene cuts.", outFile },
    };
  }
  return new Promise((resolve) => {
    const args = ["--voice", voice, "--text", text, "--write-media", outFile];
    const p = spawn("edge-tts", args, { shell: true });
    let err = "";
    p.stderr.on("data", (d) => (err += d));
    p.on("error", (e) => resolve({ provider: "edge-tts", error: String(e) }));
    p.on("close", (code) =>
      resolve(code === 0
        ? { provider: "edge-tts", voice, outFile, status: "written" }
        : { provider: "edge-tts", error: err || `exit ${code}` })
    );
  });
}
