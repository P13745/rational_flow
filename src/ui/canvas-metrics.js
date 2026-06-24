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

export function rightEdgeOffset(settings) {
  return settings.windowSize / 2;
}
