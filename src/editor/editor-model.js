import { clamp } from "../core/utils.js";
import {
  addVectors,
  approximateFraction,
  fractionLabel,
  subtractVectors,
  vectorFromFraction,
} from "../core/ratio-math.js";

function snapTime(value, snap) {
  if (!snap || snap <= 0) return value;
  return Math.round(value / snap) * snap;
}

export function createEditorRootNote({ editor, frequency, settings, start = 2 }) {
  const id = `e${editor.nextEditorId}`;
  editor.nextEditorId += 1;
  const note = {
    id,
    start: clamp(start, 0, editor.loopLength - 0.1),
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
  const snappedStart = snapTime(start, editor.timeSnap);
  note.start = clamp(snappedStart, 0, Math.max(0, editor.loopLength - note.duration));
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
  const nextEnd = clamp(snappedEnd, note.start + minDuration, editor.loopLength);
  note.duration = nextEnd - note.start;
  return note;
}

export function createEditorChildNote({ editor, parent, candidate, frequency, start, settings }) {
  const id = `e${editor.nextEditorId}`;
  editor.nextEditorId += 1;
  const note = {
    id,
    start: clamp(snapTime(start, editor.timeSnap), 0, editor.loopLength - 0.1),
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

export function deleteEditorNoteSubtree(editor, noteId) {
  const removeIds = new Set([noteId]);
  let changed = true;
  while (changed) {
    changed = false;
    editor.notes.forEach((note) => {
      if (note.parentId && removeIds.has(note.parentId) && !removeIds.has(note.id)) {
        removeIds.add(note.id);
        changed = true;
      }
    });
  }
  editor.notes = editor.notes.filter((note) => !removeIds.has(note.id));
  editor.selectedNoteIds = editor.selectedNoteIds.filter((id) => !removeIds.has(id));
  return removeIds;
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
