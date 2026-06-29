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
  return activeRatioTextForNotes({ active, state, t });
}

function activeRatioTextForNotes({ active, state, t }) {
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

function editorNoteIsActiveAt(note, playheadTime, loopLength) {
  const start = note.start;
  const duration = Math.min(note.duration, loopLength);
  const end = start + duration;
  if (duration >= loopLength) return true;
  if (end <= loopLength) return playheadTime >= start && playheadTime < end;
  return playheadTime >= start || playheadTime < end - loopLength;
}

export function editorActiveRatioText({ state, t }) {
  if (!state.editor.isLooping && !state.editor.isPaused) return `${t("status.activeRatio")}: ---`;
  const loopLength = Math.max(0.1, state.editor.loopLength);
  const active = state.editor.notes
    .filter((note) => !note.muted && editorNoteIsActiveAt(note, state.editor.playheadTime, loopLength))
    .sort((a, b) => a.frequency - b.frequency);
  return activeRatioTextForNotes({ active, state, t });
}
