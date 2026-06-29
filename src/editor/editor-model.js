import { clamp } from "../core/utils.js";
import {
  addVectors,
  approximateFraction,
  fractionLabel,
  subtractVectors,
  vectorToSafeFraction,
  vectorFromFraction,
} from "../core/ratio-math.js";

function snapTime(value, snap) {
  if (!snap || snap <= 0) return value;
  return Math.round(value / snap) * snap;
}

function wrapTime(value, loopLength) {
  const length = Math.max(0.1, loopLength);
  return ((value % length) + length) % length;
}

export function createEditorRootNote({ editor, frequency, settings, start = 2 }) {
  const id = `e${editor.nextEditorId}`;
  editor.nextEditorId += 1;
  const note = {
    id,
    start: clamp(wrapTime(start, editor.loopLength), 0, editor.loopLength - 0.1),
    duration: Math.min(editor.defaultDuration, editor.loopLength),
    frequency: clamp(frequency, settings.minFreq, settings.maxFreq),
    ratio: "",
    sourceRatio: "",
    baseFrequency: null,
    generation: 0,
    parentId: null,
    rootId: id,
    absoluteVector: new Map(),
    muted: false,
    lockedPitch: true,
    volume: settings.volume,
    nodes: null,
  };
  editor.notes.push(note);
  editor.selectedNoteIds = [id];
  return note;
}

export function moveEditorNote({ editor, note, start }) {
  const snappedStart = snapTime(wrapTime(start, editor.loopLength), editor.timeSnap);
  note.start = clamp(snappedStart, 0, Math.max(0, editor.loopLength - 0.1));
  return note;
}

export function resizeEditorNoteStart({ editor, note, start, minDuration = 0.1 }) {
  const originalEnd = note.start + note.duration;
  const snappedStart = snapTime(start, editor.timeSnap);
  const nextStart = clamp(snappedStart, 0, originalEnd - minDuration);
  note.start = nextStart;
  note.duration = originalEnd - nextStart;
  return note;
}

export function resizeEditorNoteEnd({ editor, note, end, minDuration = 0.1 }) {
  const snappedEnd = snapTime(end, editor.timeSnap);
  const nextEnd = clamp(snappedEnd, note.start + minDuration, note.start + editor.loopLength);
  note.duration = nextEnd - note.start;
  return note;
}

export function createEditorChildNote({ editor, parent, candidate, frequency, start, settings }) {
  const id = `e${editor.nextEditorId}`;
  editor.nextEditorId += 1;
  const note = {
    id,
    start: clamp(snapTime(wrapTime(start, editor.loopLength), editor.timeSnap), 0, editor.loopLength - 0.1),
    duration: Math.min(editor.defaultDuration, editor.loopLength),
    frequency: clamp(frequency, settings.minFreq, settings.maxFreq),
    ratio: candidate.ratio,
    sourceRatio: candidate.rawRatio,
    baseFrequency: parent.frequency,
    generation: parent.generation + 1,
    parentId: parent.id,
    rootId: parent.rootId,
    absoluteVector: addVectors(parent.absoluteVector, vectorFromFraction(candidate.frac)),
    muted: false,
    lockedPitch: true,
    volume: settings.volume,
    nodes: null,
  };
  note.duration = Math.min(note.duration, editor.loopLength - note.start);
  editor.notes.push(note);
  editor.selectedNoteIds = [id];
  return note;
}

export function toggleEditorNoteMute(note) {
  note.muted = !note.muted;
  return note;
}

export function deleteEditorNote(editor, noteId) {
  editor.notes = editor.notes.filter((note) => note.id !== noteId);
  editor.links = editor.links.filter((link) => link.aId !== noteId && link.bId !== noteId);
  editor.selectedNoteIds = editor.selectedNoteIds.filter((id) => id !== noteId);
  if (editor.selectedRelationKey?.includes(noteId)) editor.selectedRelationKey = null;
  return noteId;
}

function notePairKey(aId, bId) {
  return [aId, bId].sort().join(":");
}

export function editorRelationKey(relation) {
  return `${relation.type}:${relation.id}`;
}

export function editorRelationRatioLabel(a, b) {
  const [low, high] = a.frequency <= b.frequency ? [a, b] : [b, a];
  if (low.rootId === high.rootId && low.absoluteVector && high.absoluteVector) {
    const vector = subtractVectors(high.absoluteVector, low.absoluteVector);
    const exact = vectorToSafeFraction(vector);
    if (exact) return fractionLabel(exact);
  }
  return fractionLabel(approximateFraction(high.frequency / low.frequency));
}

export function editorRelations(editor) {
  const notesById = new Map(editor.notes.map((note) => [note.id, note]));
  const relations = [];
  editor.notes.forEach((note) => {
    if (!note.parentId) return;
    const parent = notesById.get(note.parentId);
    if (!parent) return;
    relations.push({
      id: note.id,
      type: "parent",
      aId: parent.id,
      bId: note.id,
      a: parent,
      b: note,
      label: editorRelationRatioLabel(parent, note),
    });
  });
  editor.links.forEach((link) => {
    const a = notesById.get(link.aId);
    const b = notesById.get(link.bId);
    if (!a || !b) return;
    relations.push({
      id: link.id,
      type: "link",
      aId: a.id,
      bId: b.id,
      a,
      b,
      label: editorRelationRatioLabel(a, b),
    });
  });
  return relations;
}

export function findEditorRelationBetween(editor, aId, bId) {
  const key = notePairKey(aId, bId);
  return editorRelations(editor).find((relation) => notePairKey(relation.aId, relation.bId) === key) || null;
}

export function toggleEditorBind(editor, aId, bId) {
  if (!aId || !bId || aId === bId) return null;
  const existing = findEditorRelationBetween(editor, aId, bId);
  if (existing) {
    removeEditorRelation(editor, existing);
    return { action: "removed", relation: existing };
  }
  const id = `l${editor.nextEditorLinkId}`;
  editor.nextEditorLinkId += 1;
  const link = { id, aId, bId };
  editor.links.push(link);
  editor.selectedRelationKey = `link:${id}`;
  return { action: "added", relation: editorRelations(editor).find((relation) => relation.type === "link" && relation.id === id) };
}

export function removeEditorRelation(editor, relation) {
  if (!relation) return;
  if (relation.type === "link") {
    editor.links = editor.links.filter((link) => link.id !== relation.id);
  } else if (relation.type === "parent") {
    const child = editor.notes.find((note) => note.id === relation.bId);
    if (child) {
      child.ratio = "";
      child.sourceRatio = "";
      child.baseFrequency = null;
      child.generation = 0;
      child.parentId = null;
      child.rootId = child.id;
      child.absoluteVector = new Map();
    }
  }
  const key = editorRelationKey(relation);
  if (editor.selectedRelationKey === key) editor.selectedRelationKey = null;
}

export function selectedEditorInterval(editor) {
  if (editor.selectedNoteIds.length !== 2) return null;
  const notes = editor.selectedNoteIds
    .map((id) => editor.notes.find((note) => note.id === id))
    .filter(Boolean);
  if (notes.length !== 2) return null;
  const [low, high] = notes[0].frequency <= notes[1].frequency ? notes : [notes[1], notes[0]];
  const cents = 1200 * Math.log2(high.frequency / low.frequency);
  if (low.rootId === high.rootId && low.absoluteVector && high.absoluteVector) {
    const vector = subtractVectors(high.absoluteVector, low.absoluteVector);
    return {
      cents,
      vector,
      ratio: null,
      low,
      high,
    };
  }
  return {
    cents,
    vector: null,
    ratio: fractionLabel(approximateFraction(high.frequency / low.frequency)),
    low,
    high,
  };
}
