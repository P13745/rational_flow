import { els } from "../dom.js";
import { state } from "../state.js";
import { clamp } from "../core/utils.js";

export function frequencyFromCanvasY(clientY, settings) {
  const rect = els.visualizer.getBoundingClientRect();
  const minLog = Math.log2(settings.minFreq * 0.94);
  const maxLog = Math.log2(settings.maxFreq * 1.04);
  const y = clamp(clientY - rect.top, 44, rect.height - 44);
  const normalized = (rect.height - 44 - y) / Math.max(1, rect.height - 88);
  return clamp(2 ** (minLog + normalized * (maxLog - minLog)), settings.minFreq, settings.maxFreq);
}

export function canvasMetrics({ settings, now }) {
  const rect = els.visualizer.getBoundingClientRect();
  const minLog = Math.log2(settings.minFreq * 0.94);
  const maxLog = Math.log2(settings.maxFreq * 1.04);
  return {
    rect,
    settings,
    now,
    xOf: (time) => rect.width / 2 + ((time - now) / settings.windowSize) * rect.width,
    yOf: (frequency) => rect.height - 44 - ((Math.log2(frequency) - minLog) / (maxLog - minLog)) * (rect.height - 88),
  };
}

export function editorCanvasMetrics({ settings, editor }) {
  const rect = els.visualizer.getBoundingClientRect();
  const minLog = Math.log2(settings.minFreq * 0.94);
  const maxLog = Math.log2(settings.maxFreq * 1.04);
  const viewStart = editor.viewStart;
  const viewEnd = Math.max(viewStart + 0.1, editor.viewEnd);
  return {
    rect,
    settings,
    now: editor.playheadTime,
    mode: "editor",
    xOf: (time) => ((time - viewStart) / (viewEnd - viewStart)) * rect.width,
    yOf: (frequency) => rect.height - 44 - ((Math.log2(frequency) - minLog) / (maxLog - minLog)) * (rect.height - 88),
    timeFromX: (x) => viewStart + (x / Math.max(1, rect.width)) * (viewEnd - viewStart),
    frequencyFromY: (y) => 2 ** (minLog + ((rect.height - 44 - y) / Math.max(1, rect.height - 88)) * (maxLog - minLog)),
    playheadX: ((editor.playheadTime - viewStart) / (viewEnd - viewStart)) * rect.width,
    loopLength: editor.loopLength,
  };
}

export function noteAtCanvasPoint(clientX, clientY, metrics) {
  const { rect, xOf, yOf } = metrics;
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const hitRadius = 8;
  const candidates = state.notes
    .map((note) => {
      const x0 = xOf(note.start);
      const x1 = Number.isFinite(note.duration) ? xOf(note.start + note.duration) : rect.width + 16;
      const minX = Math.min(x0, x1) - hitRadius;
      const maxX = Math.max(x0, x1) + hitRadius;
      const noteY = yOf(note.frequency);
      const dy = Math.abs(y - noteY);
      const isHit = x >= minX && x <= maxX && dy <= hitRadius;
      return { note, dy, isHit };
    })
    .filter((item) => item.isHit)
    .sort((a, b) => a.dy - b.dy);
  return candidates[0]?.note || null;
}

export function editorNoteHitAtCanvasPoint(clientX, clientY, metrics, editorNotes) {
  const { rect, xOf, yOf } = metrics;
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const hitRadius = 12;
  const handleRadius = 16;
  const loopLength = Math.max(0.1, metrics.loopLength || 0.1);
  const candidates = editorNotes
    .flatMap((note) => {
      const start = note.start;
      const duration = Math.min(note.duration, loopLength);
      const end = start + duration;
      const noteY = yOf(note.frequency);
      const dy = Math.abs(y - noteY);
      const ranges = end <= loopLength
        ? [{ from: start, to: end, left: true, right: true }]
        : [
          { from: start, to: loopLength, left: true, right: false },
          { from: 0, to: end - loopLength, left: false, right: true },
        ];
      return ranges.map((range) => {
        const x0 = xOf(range.from);
        const x1 = xOf(range.to);
        const branchX = x1 + 18;
        const branch = range.right && Math.abs(x - branchX) <= handleRadius && dy <= handleRadius;
        const leftHandle = range.left && Math.abs(x - x0) <= handleRadius && dy <= handleRadius;
        const rightHandle = range.right && Math.abs(x - x1) <= handleRadius && dy <= handleRadius;
        const body = x >= Math.min(x0, x1) - hitRadius && x <= Math.max(x0, x1) + hitRadius && dy <= hitRadius;
        const kind = branch ? "branch" : leftHandle ? "resize-start" : rightHandle ? "resize-end" : body ? "move" : null;
        return {
          note,
          kind,
          distance: Math.min(Math.abs(x - x0), Math.abs(x - x1), dy),
          x,
        };
      });
    })
    .filter((item) => item.kind)
    .sort((a, b) => a.distance - b.distance);
  return candidates[0] || null;
}

export function rightEdgeOffset(settings) {
  return settings.windowSize / 2;
}
