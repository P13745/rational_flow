import { chooseWeighted } from "../core/candidates.js";
import { descendantIds } from "./note-model.js";

export function normalizeNoteGenerations({ now, settings, state }) {
  const living = state.notes.filter((note) => note.start + note.duration >= now);
  if (!living.length) return;
  const minGeneration = Math.min(...living.map((note) => note.generation));
  if (minGeneration <= 0) return;
  if (settings.rootedDepth) {
    normalizeRootedGenerations(living, settings, state);
    return;
  }
  state.notes.forEach((note) => {
    note.generation = Math.max(0, note.generation - minGeneration);
  });
}

function normalizeRootedGenerations(living, settings, state) {
  const livingById = new Map(living.map((note) => [note.id, note]));
  const groups = new Map();

  living.forEach((note) => {
    let root = note;
    while (root.parentId && livingById.has(root.parentId)) {
      root = livingById.get(root.parentId);
    }
    if (!groups.has(root.id)) groups.set(root.id, { root, notes: [], maxGeneration: root.generation });
    const group = groups.get(root.id);
    group.notes.push(note);
    group.maxGeneration = Math.max(group.maxGeneration, note.generation);
  });

  const candidates = [...groups.values()].filter((group) => group.root.generation > 0);
  if (!candidates.length) return;
  const selected = chooseRootedDepthGroup(candidates, settings);
  const decrement = Math.max(1, selected.root.generation);
  const selectedIds = descendantIds(selected.root.id);
  state.notes.forEach((note) => {
    if (selectedIds.has(note.id)) {
      note.generation = Math.max(0, note.generation - decrement);
    }
  });
}

function chooseRootedDepthGroup(groups, settings) {
  if (groups.length < 2) return groups[0];
  const scored = groups.map((group) => ({
    group,
    score: settings.parentBiasDirection === "high" ? group.maxGeneration : group.root.generation,
  }));
  const minScore = Math.min(...scored.map((item) => item.score));
  const maxScore = Math.max(...scored.map((item) => item.score));
  const span = Math.max(0.0001, maxScore - minScore);
  const curvePower = 1 + settings.parentBiasStrength * 5;
  return chooseWeighted(scored.map((item) => {
    const position = (item.score - minScore) / span;
    const target = settings.parentBiasDirection === "low" ? 1 - position : position;
    const weight = settings.parentBiasCurve === "exponential"
      ? Math.exp(target * curvePower)
      : 1 + target * curvePower;
    return { note: item.group, weight };
  })).note;
}
