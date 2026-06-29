import { clamp } from "../core/utils.js";
import { drawRoundedRect, fitCanvasText } from "./canvas-primitives.js";
import { closePairLabel, placeMarkerLabel } from "./marker-layout.js";

function editorNoteSegments(note, loopLength) {
  const duration = Math.min(note.duration, loopLength);
  const end = note.start + duration;
  if (end <= loopLength) return [{ from: note.start, to: end, startVisible: true, endVisible: true }];
  return [
    { from: note.start, to: loopLength, startVisible: true, endVisible: false },
    { from: 0, to: end - loopLength, startVisible: false, endVisible: true },
  ];
}

function ratioLabelIsAboveOne(label) {
  const match = String(label || "").trim().match(/^(\d+)(?:\/(\d+))?$/);
  if (!match) return true;
  const numerator = Number(match[1]);
  const denominator = match[2] ? Number(match[2]) : 1;
  return denominator > 0 && numerator / denominator > 1;
}

export function renderVisualizerCanvas({
  canvas,
  closeNoteIds,
  closePairs,
  editorDrag,
  editorGridLines = [],
  editorRelations = [],
  metrics,
  notes,
  selectedNoteId,
  selectedRelationKey = null,
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

  if (metrics.mode === "editor") {
    editorGridLines.forEach((line) => {
      ctx.strokeStyle = "rgba(104,207,183,0.28)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, line.y);
      ctx.lineTo(w, line.y);
      ctx.stroke();
    });

    ctx.strokeStyle = "rgba(239,200,74,0.72)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(clamp(metrics.playheadX, 0, w), 0);
    ctx.lineTo(clamp(metrics.playheadX, 0, w), h);
    ctx.stroke();
  }

  const visible = metrics.mode === "editor" ? notes : notes.filter((note) => {
    const endX = Number.isFinite(note.duration) ? xOf(note.start + note.duration) : w + 40;
    return endX >= -40 && xOf(note.start) <= w + 40;
  });

  visible.forEach((note) => {
    if (metrics.mode === "editor") return;
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

  if (metrics.mode === "editor") {
    editorRelations.forEach((relation) => {
      const x0 = xOf(relation.a.start);
      const y0 = yOf(relation.a.frequency);
      const x1 = xOf(relation.b.start);
      const y1 = yOf(relation.b.frequency);
      const relationKey = `${relation.type}:${relation.id}`;
      const isSelectedRelation = relationKey === selectedRelationKey;
      ctx.strokeStyle = isSelectedRelation ? "rgba(104,207,183,0.95)" : "rgba(239,200,74,0.46)";
      ctx.lineWidth = isSelectedRelation ? 2.4 : 1.5;
      ctx.setLineDash(relation.type === "link" ? [4, 4] : []);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.setLineDash([]);

      const lx = clamp((x0 + x1) / 2, 32, w - 32);
      const ly = clamp((y0 + y1) / 2, 24, h - 72);
      const text = relation.label || "";
      ctx.font = "12px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      const labelW = ctx.measureText(text).width + 14;
      const labelH = 22;
      ctx.fillStyle = "rgba(16,19,18,0.86)";
      ctx.strokeStyle = isSelectedRelation ? "#68cfb7" : "rgba(239,200,74,0.54)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      drawRoundedRect(ctx, lx - labelW / 2, ly - labelH / 2, labelW, labelH, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = isSelectedRelation ? "#b8f2e6" : "#f3f1e8";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, lx, ly);
    });
  }

  visible.forEach((note) => {
    const y = yOf(note.frequency);
    const isSelected = note.id === selectedNoteId;
    const isBase = !note.ratio;
    const isClose = closeNoteIds.has(note.id);
    ctx.strokeStyle = note.muted
      ? "rgba(171,181,173,0.34)"
      : isClose ? "#f0574c" : isSelected ? "#efc84a" : isBase ? "#68cfb7" : "rgba(243,241,232,0.84)";
    ctx.lineWidth = isSelected ? 4 : 2;
    ctx.lineCap = "round";
    const segments = metrics.mode === "editor"
      ? editorNoteSegments(note, Math.max(0.1, metrics.loopLength || 0.1))
      : [{ from: note.start, to: Number.isFinite(note.duration) ? note.start + note.duration : note.start + metrics.settings.windowSize, startVisible: true, endVisible: true }];
    segments.forEach((segment) => {
      const x0 = xOf(segment.from);
      const x1 = Number.isFinite(note.duration) ? xOf(segment.to) : w + 16;
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.stroke();
    });

    const x0 = xOf(note.start);
    const x1 = Number.isFinite(note.duration) ? xOf(note.start + Math.min(note.duration, metrics.loopLength || note.duration)) : w + 16;

    const startIsVisible = x0 >= 0 && x0 <= w;

    const shouldShowNoteRatio = note.ratio && startIsVisible && metrics.mode !== "editor";
    if (shouldShowNoteRatio) {
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

    if (metrics.mode === "editor" && isSelected) {
      const handleSize = 11;
      ctx.fillStyle = "#101312";
      ctx.strokeStyle = "#68cfb7";
      ctx.lineWidth = 2;
      segments.forEach((segment) => {
        const handleXs = [];
        if (segment.startVisible) handleXs.push(xOf(segment.from));
        if (segment.endVisible) handleXs.push(xOf(segment.to));
        handleXs.forEach((handleX) => {
        ctx.beginPath();
        drawRoundedRect(ctx, handleX - handleSize / 2, y - handleSize / 2, handleSize, handleSize, 2);
        ctx.fill();
        ctx.stroke();
        });
      });
      segments
        .filter((segment) => segment.endVisible)
        .forEach((segment) => {
          ctx.beginPath();
          ctx.arc(xOf(segment.to) + 18, y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });
    }
  });

  if (metrics.mode === "editor" && editorDrag?.kind === "branch" && editorDrag.candidateFrequency !== null) {
    const parent = notes.find((note) => note.id === editorDrag.noteId);
    if (parent) {
      const x0 = xOf(parent.start + parent.duration);
      const y0 = yOf(parent.frequency);
      const x1 = xOf(editorDrag.childStart);
      const y1 = yOf(editorDrag.candidateFrequency);
      ctx.strokeStyle = "rgba(104,207,183,0.72)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(16,19,18,0.92)";
      ctx.strokeStyle = "#68cfb7";
      const label = ratioLabelIsAboveOne(editorDrag.candidate?.ratio) ? editorDrag.candidate?.ratio || "" : "";
      if (label) {
        ctx.font = "12px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        const labelW = ctx.measureText(label).width + 14;
        const labelH = 24;
        ctx.beginPath();
        drawRoundedRect(ctx, clamp(x1 + 8, 4, w - labelW - 4), clamp(y1 - labelH - 8, 4, h - labelH - 58), labelW, labelH, 5);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#b8f2e6";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, clamp(x1 + 8, 4, w - labelW - 4) + labelW / 2, clamp(y1 - labelH - 8, 4, h - labelH - 58) + labelH / 2);
      }
    }
  }

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
