import { state } from "../state.js";
import { clamp, randomBetween } from "../core/utils.js";

export function ensureAudio() {
  if (!state.audioContext) state.audioContext = new AudioContext();
  return state.audioContext;
}

export function scheduleAudio(note, settings) {
  if (note.nodes) return;
  const ctx = ensureAudio();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  let vibratoOscillator = null;
  let vibratoGain = null;
  const startAt = Math.max(ctx.currentTime + 0.01, note.start - performance.now() / 1000 + ctx.currentTime);
  const isDrone = !Number.isFinite(note.duration);
  const attack = isDrone ? 0.45 : Math.min(0.5, note.duration * 0.2);
  const releaseStart = startAt + note.duration * 0.3;
  const endAt = startAt + note.duration;

  oscillator.type = "triangle";
  oscillator.frequency.value = note.frequency;
  if (settings.vibratoEnabled && settings.vibratoRateMax > 0 && settings.vibratoDepthMax > 0) {
    const rate = randomBetween(settings.vibratoRateMin, settings.vibratoRateMax);
    const depth = randomBetween(settings.vibratoDepthMin, settings.vibratoDepthMax);
    if (rate > 0 && depth > 0) {
      vibratoOscillator = ctx.createOscillator();
      vibratoGain = ctx.createGain();
      vibratoOscillator.type = "sine";
      vibratoOscillator.frequency.value = rate;
      vibratoGain.gain.value = depth;
      vibratoOscillator.connect(vibratoGain).connect(oscillator.detune);
      vibratoOscillator.start(startAt);
    }
  }
  gain.gain.value = 0;
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(note.volume, startAt + attack);
  if (!isDrone) {
    gain.gain.setValueAtTime(note.volume, releaseStart);
    gain.gain.linearRampToValueAtTime(0, endAt);
  }
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(startAt);
  if (!isDrone) oscillator.stop(endAt + 0.03);
  note.nodes = { oscillator, gain, startAt, vibratoOscillator, vibratoGain };
  oscillator.onended = () => {
    if (vibratoOscillator) {
      try {
        vibratoOscillator.stop();
      } catch (_) {
        // The vibrato oscillator may already have been stopped explicitly.
      }
      vibratoOscillator.disconnect();
    }
    if (vibratoGain) vibratoGain.disconnect();
    oscillator.disconnect();
    gain.disconnect();
    if (note.nodes?.oscillator === oscillator) {
      note.nodes = null;
    }
  };
}

export function scheduleVisibleAudio(now, settings) {
  state.notes.forEach((note) => {
    const endsAfterNow = !Number.isFinite(note.duration) || note.start + note.duration > now;
    if (endsAfterNow && !note.nodes) scheduleAudio(note, settings);
  });
}

export function cancelFutureAudio(now) {
  state.notes.forEach((note) => {
    if (note.start > now && note.nodes) stopNode(note, 0.03);
  });
}

export function holdActiveAudio(now) {
  if (!state.audioContext) return;
  const audioNow = state.audioContext.currentTime;
  state.notes.forEach((note) => {
    const isActive = note.start <= now && (!Number.isFinite(note.duration) || note.start + note.duration > now);
    if (!isActive || !note.nodes) return;
    const heldGain = Math.max(0, estimatedGainAt(note, now));
    const gainParam = note.nodes.gain.gain;
    gainParam.cancelScheduledValues(audioNow);
    gainParam.setValueAtTime(heldGain, audioNow);
    note.nodes.pausedHold = true;
  });
}

export function resumeHeldAudio(now) {
  if (!state.audioContext) return;
  const audioNow = state.audioContext.currentTime;
  state.notes.forEach((note) => {
    if (!note.nodes?.pausedHold) return;
    note.nodes.pausedHold = false;
    const gainParam = note.nodes.gain.gain;
    const currentGain = Math.max(0, estimatedGainAt(note, now));
    gainParam.cancelScheduledValues(audioNow);
    gainParam.setValueAtTime(currentGain, audioNow);

    if (!Number.isFinite(note.duration)) {
      gainParam.linearRampToValueAtTime(note.volume, audioNow + 0.12);
      return;
    }

    const releaseStart = note.start + note.duration * 0.3;
    const end = note.start + note.duration;
    if (end <= now) {
      gainParam.linearRampToValueAtTime(0, audioNow + 0.05);
      return;
    }

    if (releaseStart > now) {
      gainParam.linearRampToValueAtTime(note.volume, audioNow + 0.12);
      gainParam.setValueAtTime(note.volume, audioNow + (releaseStart - now));
    }
    gainParam.linearRampToValueAtTime(0, audioNow + (end - now));
  });
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
