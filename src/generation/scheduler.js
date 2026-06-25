import { clamp } from "../core/utils.js";

export function sampleEventWait(settings) {
  const mean = (settings.nextMin + settings.nextMax) / 2;
  const exponential = -Math.log(Math.max(0.000001, 1 - Math.random())) * mean;
  return clamp(exponential, settings.nextMin, settings.nextMax);
}

export function firstSeedReadyTime(notes, now, initialDelay) {
  if (notes.some((note) => note.generation > 0)) return now;
  const living = notes.filter((note) => note.start + note.duration >= now);
  if (!living.length) return Infinity;
  return Math.min(...living.map((note) => Math.max(now, note.start + initialDelay)));
}

export function generationProbabilityAt({ timerEndTime, startTime, time }) {
  if (timerEndTime === null) return 1;
  const total = Math.max(1, timerEndTime - startTime);
  return clamp((timerEndTime - time) / total, 0, 1);
}

export function fillGenerationEventQueue({
  addGeneratedChild,
  finishTimedRun,
  initialDelay,
  now,
  rightEdgeOffset,
  settings,
  state,
}) {
  if (state.timerEndTime !== null && now >= state.timerEndTime) {
    finishTimedRun();
    return;
  }
  const horizon = now + rightEdgeOffset;
  const readyAt = firstSeedReadyTime(state.notes, now, initialDelay);
  if (!Number.isFinite(readyAt)) return;
  if (state.nextEventTime === null || state.nextEventTime < now) {
    state.nextEventTime = Math.max(now, readyAt) + sampleEventWait(settings);
  }

  let guard = 0;
  while (state.nextEventTime <= horizon && guard < 64) {
    if (state.timerEndTime !== null && state.nextEventTime >= state.timerEndTime) break;
    const probability = generationProbabilityAt({
      timerEndTime: state.timerEndTime,
      startTime: state.startTime,
      time: state.nextEventTime,
    });
    if (Math.random() <= probability) {
      addGeneratedChild(state.nextEventTime);
    }
    state.nextEventTime += sampleEventWait(settings);
    guard += 1;
  }
}
