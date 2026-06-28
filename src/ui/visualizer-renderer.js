import { clamp } from "../core/utils.js";
import { drawRoundedRect, fitCanvasText } from "./canvas-primitives.js";
import { closePairLabel, placeMarkerLabel } from "./marker-layout.js";

export function renderVisualizerCanvas({
  canvas,
  closeNoteIds,
  closePairs,
  metrics,
  notes,
  selectedNoteId,
}) {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);

  const { settings, xOf, yOf } = metrics;
  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#101312";
  ctx.fillRect(0, 0, w, h);

  const minMidi = Math.floor(69 + 12 * Math.log2(settings.minFreq / 440));
  const maxMidi = Math.ceil(69 + 12 * Math.log2(settings.maxFreq / 440));
  ctx.font = "11px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  for (let midi = minMidi; midi <= maxMidi; midi += 1) {
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    const y = yOf(frequency);
    const pitchClass = ((midi % 12) + 12) % 12;
    const isC = pitchClass === 0;
    ctx.strokeStyle = isC ? "rgba(243,241,232,0.24)" : "rgba(255,255,255,0.065)";
    ctx.lineWidth = isC ? 1.6 : 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
    if (isC) {
      ctx.fillStyle = "rgba(243,241,232,0.44)";
      ctx.fillText(`C${Math.floor(midi / 12) - 1}`, 10, y - 8);
    }
  }

  const visible = notes.filter((note) => {
    const endX = Number.isFinite(note.duration) ? xOf(note.start + note.duration) : w + 40;
    return endX >= -40 && xOf(note.start) <= w + 40;
  });

  visible.forEach((note) => {
    if (!note.ratio || note.baseFrequency === null) return;
    const x = xOf(note.start);
    const y = yOf(note.frequency);
    const yBase = yOf(note.baseFrequency);
    const upward = note.frequency >= note.baseFrequency;
    ctx.strokeStyle = "rgba(239,200,74,0.45)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, yBase);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(239,200,74,0.92)";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 5, y + (upward ? 9 : -9));
    ctx.lineTo(x + 5, y + (upward ? 9 : -9));
    ctx.closePath();
    ctx.fill();
  });

  visible.forEach((note) => {
    const x0 = xOf(note.start);
    const x1 = Number.isFinite(note.duration) ? xOf(note.start + note.duration) : w + 16;
    const y = yOf(note.frequency);
    const isSelected = note.id === selectedNoteId;
    const isBase = !note.ratio;
    const isClose = closeNoteIds.has(note.id);
    ctx.strokeStyle = isClose ? "#f0574c" : isSelected ? "#efc84a" : isBase ? "#68cfb7" : "rgba(243,241,232,0.84)";
    ctx.lineWidth = isSelected ? 4 : 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();

    const startIsVisible = x0 >= 0 && x0 <= w;

    if (note.ratio && startIsVisible) {
      const text = note.ratio;
      ctx.font = "12px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      const labelW = ctx.measureText(text).width + 12;
      const labelH = 22;
      const lx = x0 + 8 + labelW / 2;
      const ly = clamp((y + yOf(note.baseFrequency)) / 2, labelH / 2 + 4, h - labelH / 2 - 56);
      ctx.fillStyle = "rgba(16,19,18,0.82)";
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      drawRoundedRect(ctx, lx - labelW / 2, ly - labelH / 2, labelW, labelH, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#f3f1e8";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, lx, ly);
    }

    if (isSelected && startIsVisible) {
      ctx.font = "11px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(104,207,183,0.95)";
      ctx.fillText(`d${note.generation}`, clamp(x0, 18, w - 18), clamp(y - 16, 14, h - 66));
    }
  });

  const occupiedMarkerLabels = [];
  closePairs.forEach((pair, index) => {
    const yLow = yOf(pair.low.frequency);
    const yHigh = yOf(pair.high.frequency);
    const yMid = (yLow + yHigh) / 2;
    const yHundredCents = yOf(pair.low.frequency * 2 ** (100 / 1200));
    const markerHeight = Math.max(8, Math.abs(yHundredCents - yLow));
    const markerTop = clamp(yMid - markerHeight / 2, 4, h - markerHeight - 58);
    const x = w / 2;
    ctx.fillStyle = "rgba(240, 87, 76, 0.14)";
    ctx.fillRect(x - 8, markerTop, 16, markerHeight);
    ctx.strokeStyle = "rgba(240, 87, 76, 0.86)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, yLow);
    ctx.lineTo(x, yHigh);
    ctx.stroke();
    ctx.font = "12px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    const text = fitCanvasText(ctx, closePairLabel(pair), Math.min(260, w - 24));
    const labelW = ctx.measureText(text).width + 14;
    const labelH = 24;
    const labelRect = placeMarkerLabel(x, yMid, labelW, labelH, w, h, occupiedMarkerLabels, index);
    ctx.fillStyle = "rgba(52, 18, 17, 0.94)";
    ctx.strokeStyle = "rgba(240, 87, 76, 0.86)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    drawRoundedRect(ctx, labelRect.x, labelRect.y, labelRect.width, labelRect.height, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffd2cc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, labelRect.x + labelRect.width / 2, labelRect.y + labelRect.height / 2);
  });
}
