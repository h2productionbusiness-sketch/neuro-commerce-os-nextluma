/**
 * synapse.js — the v2.0 Synapse: agent-to-agent message bus.
 *
 * A process-wide EventEmitter every module (state machine, memory, video,
 * phase tools) publishes to, plus a ring buffer so late joiners — and the
 * operator — can inspect what the crew has been telling each other.
 *
 * Canonical events:
 *   run:initialized        { client, blueprint }
 *   step:accepted          { step, client, progress }
 *   phase:complete         { phase, client }
 *   learning:stored        { client, category }
 *   memory:overridden      { scope, key, action }
 *   video:generated        { character, file }
 *   neuro:cycle-complete   { deduped, pruned }
 */

import { EventEmitter } from "node:events";

const RING_SIZE = 200;

class Synapse extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
    this.ring = [];
  }

  /** Publish an event: emitted live AND recorded in the ring buffer. */
  fire(type, payload = {}) {
    const evt = { type, payload, at: new Date().toISOString() };
    this.ring.push(evt);
    if (this.ring.length > RING_SIZE) this.ring.shift();
    this.emit(type, evt);
    this.emit("*", evt); // wildcard tap for loggers/dashboards
    return evt;
  }

  /** Most recent events, newest first (optionally filtered by type prefix). */
  recent(limit = 20, typePrefix = null) {
    const src = typePrefix
      ? this.ring.filter((e) => e.type.startsWith(typePrefix))
      : this.ring;
    return src.slice(-limit).reverse();
  }
}

/** The one shared bus (module-scoped singleton — same instance everywhere). */
export const synapse = new Synapse();
