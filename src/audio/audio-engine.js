import { state } from "../state.js";
import { clamp } from "../core/utils.js";

export function ensureAudio() {
  if (!state.audioContext) state.audioContext = new AudioContext();
  return state.audioContext;
}

export function estimatedGainAt(note, time) {
  if (time < note.start) return 0;
  if (!Number.isFinite(note.duration)) return note.volume;
  const attack = Math.min(0.5, note.duration * 0.2);
  const elapsed = time - note.start;
  if (elapsed < attack) return note.volume * clamp(elapsed / Math.max(0.001, attack), 0, 1);
  if (elapsed < note.duration * 0.3) return note.volume;
  const releaseSpan = Math.max(0.001, note.duration * 0.7);
  return note.volume * clamp(1 - ((elapsed - note.duration * 0.3) / releaseSpan), 0, 1);
}

export function stopNode(note, fadeSeconds = 0.45) {
  if (!note.nodes || !state.audioContext) return;
  const nodes = note.nodes;
  const audioNow = state.audioContext.currentTime;
  const wallNow = performance.now() / 1000;
  const gainParam = nodes.gain.gain;
  try {
    if (note.start > wallNow + 0.02) {
      gainParam.cancelScheduledValues(audioNow);
      gainParam.setValueAtTime(0, audioNow);
      nodes.oscillator.stop(audioNow + 0.01);
      if (nodes.vibratoOscillator) nodes.vibratoOscillator.stop(audioNow + 0.01);
      note.nodes = null;
      return;
    }

    if (typeof gainParam.cancelAndHoldAtTime === "function") {
      gainParam.cancelAndHoldAtTime(audioNow);
    } else {
      gainParam.cancelScheduledValues(audioNow);
      gainParam.setValueAtTime(estimatedGainAt(note, wallNow), audioNow);
    }
    gainParam.linearRampToValueAtTime(0, audioNow + fadeSeconds);
    nodes.oscillator.stop(audioNow + fadeSeconds + 0.03);
    if (nodes.vibratoOscillator) nodes.vibratoOscillator.stop(audioNow + fadeSeconds + 0.03);
  } catch (_) {
    // The node may have finished naturally.
  }
  note.nodes = null;
}
