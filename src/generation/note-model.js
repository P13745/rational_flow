import { state } from "../state.js";
import { subtractVectors } from "../core/ratio-math.js";

export function activeAt(time) {
  return state.notes.filter((note) => note.start <= time && note.start + note.duration >= time);
}

export function hasDuplicateFrequency(frequency, atTime) {
  return activeAt(atTime).some((note) => Math.abs(note.frequency - frequency) < 0.001);
}

export function descendantIds(rootId) {
  const ids = new Set([rootId]);
  let changed = true;
  while (changed) {
    changed = false;
    state.notes.forEach((note) => {
      if (!ids.has(note.id) && ids.has(note.parentId)) {
        ids.add(note.id);
        changed = true;
      }
    });
  }
  return ids;
}

export function exactRatioBetween(low, high) {
  if (!low.absoluteVector || !high.absoluteVector || low.rootId !== high.rootId) return null;
  return subtractVectors(high.absoluteVector, low.absoluteVector);
}
