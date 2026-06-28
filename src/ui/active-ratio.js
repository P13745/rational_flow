import {
  approximateFraction,
  normalizeVectorsToPositive,
  positiveVectorFactorLabel,
  subtractVectors,
  tryIntegerRatioFromVectors,
  vectorFromFraction,
} from "../core/ratio-math.js";
import { activeAt } from "../generation/note-model.js";

function relativeVectorForActiveNote(note, base) {
  if (note.absoluteVector && base.absoluteVector && note.rootId === base.rootId) {
    return subtractVectors(note.absoluteVector, base.absoluteVector);
  }
  return vectorFromFraction(approximateFraction(note.frequency / base.frequency));
}

export function activeRatioText({ now, state, t }) {
  if (!state.isRunning && !state.isPaused && !state.isDraining) return `${t("status.activeRatio")}: ---`;
  const active = activeAt(now).sort((a, b) => a.frequency - b.frequency);
  if (!active.length) return `${t("status.activeRatio")}: ---`;
  const base = active[0];
  const vectors = active.map((note) => relativeVectorForActiveNote(note, base));
  if (state.diesisRatioDisplay !== "factors") {
    const integers = tryIntegerRatioFromVectors(vectors);
    if (integers) return `${t("status.activeRatio")}: ${integers.join(" : ")}`;
  }
  const sameRoot = active.every((note) => note.absoluteVector && note.rootId === base.rootId);
  const factorVectors = sameRoot ? active.map((note) => note.absoluteVector) : vectors;
  const labels = normalizeVectorsToPositive(factorVectors).map(positiveVectorFactorLabel);
  return `${t("status.activeRatio")}: ${labels.join(" : ")}`;
}
