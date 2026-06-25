import { els } from "./dom.js";
import { state } from "./state.js";
import {
  cancelFutureAudio as cancelFutureNoteAudio,
  ensureAudio,
  holdActiveAudio as holdActiveNoteAudio,
  resumeHeldAudio as resumeHeldNoteAudio,
  scheduleAudio as scheduleNoteAudio,
  scheduleVisibleAudio as scheduleVisibleNoteAudio,
  stopNode,
} from "./audio/audio-engine.js";
import { playDiesisPreview, playFrequencyPreview } from "./audio/preview.js";
import { syncWakeLock } from "./audio/wake-lock.js";
import { buildCandidates as buildCandidateList, chooseBase as chooseCandidateBase, chooseWeighted } from "./core/candidates.js";
import { cFrequency, nearestPitchLabel } from "./core/pitch.js";
import { clamp, randomBetween } from "./core/utils.js";
import {
  addVectors,
  approximateFraction,
  fractionLabel,
  vectorFactorLabel,
  vectorFromFraction,
  vectorKey,
  vectorToSafeFraction,
} from "./core/ratio-math.js";
import {
  diesisIndex,
  markDiesisDiscovered as recordDiesisDiscovered,
  resetDiesisCollection as clearDiesisCollection,
} from "./diesis/diesis-collection.js";
import { loadNamedCommas, loadRatioPresets } from "./data/loaders.js";
import {
  diesisFrequencies as getDiesisFrequencies,
  diesisRatioLabel as formatDiesisRatioLabel,
  isDifferenceAudible as isDiesisDifferenceAudible,
} from "./diesis/diesis-model.js";
import {
  renderDiesisControls as renderDiesisControlView,
  renderDiesisList as renderDiesisListView,
} from "./diesis/diesis-view.js";
import {
  activeAt,
  exactRatioBetween,
  hasDuplicateFrequency,
} from "./generation/note-model.js";
import { normalizeNoteGenerations } from "./generation/depth-normalization.js";
import { fillGenerationEventQueue } from "./generation/scheduler.js";
import { t } from "./i18n/i18n.js";
import { i18nHelpTargets, i18nTargets } from "./i18n/targets.js";
import { registerEventBindings } from "./ui/event-bindings.js";
import {
  canvasMetrics as getCanvasMetrics,
  frequencyFromCanvasY as getFrequencyFromCanvasY,
  noteAtCanvasPoint as getNoteAtCanvasPoint,
  rightEdgeOffset as getRightEdgeOffset,
} from "./ui/canvas-metrics.js";
import { drawRoundedRect, fitCanvasText } from "./ui/canvas-primitives.js";
import { activeRatioText as formatActiveRatioText } from "./ui/active-ratio.js";
import {
  updateParentDirectionLabels as syncParentDirectionControls,
  updateRatioCurveState as syncRatioCurveControls,
  updateVibratoState as syncVibratoControls,
} from "./ui/control-state.js";
import { closePairLabel, placeMarkerLabel } from "./ui/marker-layout.js";
import { setMobileToolsOpen, setMobileView as applyMobileView } from "./ui/mobile-view.js";
import {
  loadSelectedPreset as applySelectedPreset,
  renderPresetBrowser,
} from "./ui/preset-browser.js";
import {
  timerBadgeText as formatTimerBadgeText,
  timerCountdownText as formatTimerCountdownText,
  timerStatusText as formatTimerStatusText,
} from "./ui/timer-labels.js";
import { renderTimelineTable } from "./ui/timeline-table.js";
import { initialSeedDelay, tableRenderInterval } from "./config.js";


function timelineNow() {
  return state.isPaused && state.pausedAt !== null ? state.pausedAt : performance.now() / 1000;
}

function setCheckboxLabel(input, text) {
  if (!input?.parentNode) return;
  [...input.parentNode.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      node.textContent = `\n            ${text}\n          `;
    }
  });
}

function applyTranslationTarget(selector, key, attribute = "text") {
  const element = document.querySelector(selector);
  if (!element) return;
  const value = t(key);
  if (attribute === "checkbox-label") {
    setCheckboxLabel(element, value);
  } else if (attribute === "aria-label") {
    element.setAttribute("aria-label", value);
  } else if (attribute === "title") {
    element.setAttribute("title", value);
  } else {
    element.textContent = value;
  }
}

function applyLanguage() {
  document.documentElement.lang = state.currentLanguage;
  document.title = t("title");
  els.languageToggle.textContent = t("langToggle");
  [...i18nTargets, ...i18nHelpTargets].forEach(([selector, key, attribute]) => {
    applyTranslationTarget(selector, key, attribute);
  });
  updateParentDirectionLabels();
  renderPresetBrowser();
  if (els.diesisDialog.open) {
    renderDiesisControls();
    renderDiesisList();
  }
  render(true);
}

function toggleLanguage() {
  state.currentLanguage = state.currentLanguage === "ja" ? "en" : "ja";
  localStorage.setItem("rationalFlowLanguage", state.currentLanguage);
  applyLanguage();
}

function setMobileView(view) {
  applyMobileView(view, { renderTable, drawCanvas });
}

function resetDiesisCollection() {
  clearDiesisCollection();
  if (els.diesisDialog.open) renderDiesisList();
}

function markDiesisDiscovered(entry) {
  if (!recordDiesisDiscovered(entry)) return;
  if (els.diesisDialog.open) renderDiesisList();
}

function ratioDisplayFromVector(vector, preferredMode = state.diesisRatioDisplay) {
  if (preferredMode !== "factors") {
    const frac = vectorToSafeFraction(vector);
    if (frac) return fractionLabel(frac);
  }
  return vectorFactorLabel(vector);
}

function getSettings() {
  const minFreq = Math.max(20, Number(els.minFreq.value) || 130);
  const maxFreq = Math.max(minFreq + 1, Number(els.maxFreq.value) || 2100);
  const minDur = Math.max(0.5, Number(els.minDur.value) || 5);
  const maxDur = Math.max(minDur, Number(els.maxDur.value) || 20);
  const nextMin = Math.max(0.05, Number(els.nextMin.value) || 1);
  const nextMax = Math.max(nextMin, Number(els.nextMax.value) || 3);
  const timerMinutes = Math.max(0, Number(els.timerMinutes.value) || 0);
  const ratioIntegerLimit = clamp(Math.floor(Number(els.ratioIntegerLimit.value) || 128), 1, 4096);
  const vibratoRateMin = Math.max(0, Number(els.vibratoRateMin.value) || 0);
  const vibratoRateMax = Math.max(vibratoRateMin, Number(els.vibratoRateMax.value) || 0);
  const vibratoDepthMin = Math.max(0, Number(els.vibratoDepthMin.value) || 0);
  const vibratoDepthMax = Math.max(vibratoDepthMin, Number(els.vibratoDepthMax.value) || 0);
  return {
    minFreq,
    maxFreq,
    minDur,
    maxDur,
    nextMin,
    nextMax,
    windowSize: Math.max(4, Number(els.windowSize.value) || 8),
    timerMinutes,
    volume: Math.max(0, Number(els.volume.value) || 0),
    ratioIntegerLimit,
    nMax: clamp(Math.floor(Number(els.nMax.value) || 8), 2, 512),
    dMax: clamp(Math.floor(Number(els.dMax.value) || 8), 2, 512),
    allowDuplication: els.allowDuplication.checked,
    rootedDepth: els.rootedDepth.checked && els.parentBiasBasis.value === "depth",
    ratioBias: state.ratioBias,
    ratioBiasCurve: els.ratioBiasCurve.value === "none" ? "linear" : els.ratioBiasCurve.value,
    parentBiasBasis: els.parentBiasBasis.value,
    parentBiasDirection: els.parentBiasDirection.value === "none" ? "low" : els.parentBiasDirection.value,
    parentBiasCurve: els.parentBiasCurve.value === "none" ? "linear" : els.parentBiasCurve.value,
    parentBiasStrength: Math.max(0, Number(els.parentBiasStrength.value) || 0),
    vibratoEnabled: els.vibratoEnabled.checked,
    vibratoRateMin,
    vibratoRateMax,
    vibratoDepthMin,
    vibratoDepthMax,
  };
}

function buildCandidates(baseFreq = null) {
  const settings = getSettings();
  return buildCandidateList({
    settings,
    mode: state.mode,
    fractionListValue: els.fractionList.value,
    baseFreq,
  });
}

function chooseBase(bases) {
  return chooseCandidateBase(bases, getSettings());
}

function scheduleAudio(note) {
  scheduleNoteAudio(note, getSettings());
}

function scheduleVisibleAudio(now = performance.now() / 1000) {
  scheduleVisibleNoteAudio(now, getSettings());
}

function cancelFutureAudio(now = performance.now() / 1000) {
  cancelFutureNoteAudio(now);
}

function holdActiveAudio(now = performance.now() / 1000) {
  holdActiveNoteAudio(now);
}

function resumeHeldAudio(now = performance.now() / 1000) {
  resumeHeldNoteAudio(now);
}

function applyPausedTimeShift() {
  if (state.pausedAt === null) return 0;
  const now = performance.now() / 1000;
  const delta = Math.max(0, now - state.pausedAt);
  if (delta <= 0) return 0;
  state.notes.forEach((note) => {
    note.start += delta;
  });
  if (state.nextEventTime !== null) state.nextEventTime += delta;
  state.startTime += delta;
  state.pausedAt = now;
  return delta;
}

function diesisFrequencies(ratio, mode = "normal") {
  const baseFrequency = cFrequency(state.diesisBaseOctave);
  return getDiesisFrequencies(ratio, baseFrequency, mode);
}

function isDifferenceAudible(ratio) {
  return isDiesisDifferenceAudible(ratio, cFrequency(state.diesisBaseOctave));
}

function previewDiesisInterval(ratio, mode = "normal") {
  const frequencies = diesisFrequencies(ratio, mode).filter((item) => item.frequency >= 20);
  if (!frequencies.length) return;
  const ctx = ensureAudio();
  ctx.resume();
  const settings = getSettings();
  const level = Math.min(0.035, Math.max(0.008, settings.volume || 0.025));
  playDiesisPreview(ctx, frequencies, level);
}

function previewFrequency(frequency) {
  if (!Number.isFinite(frequency) || frequency < 20) return;
  const ctx = ensureAudio();
  ctx.resume();
  const settings = getSettings();
  const level = Math.min(0.04, Math.max(0.01, settings.volume * 1.25 || 0.025));
  playFrequencyPreview(ctx, frequency, level);
}

function addNote(frequency, duration, start, ratio = "", baseFrequency = null, generation = 0, parentId = null, absoluteVector = null, rootId = null) {
  const settings = getSettings();
  const id = state.nextId;
  const note = {
    id,
    start,
    frequency,
    duration,
    ratio,
    baseFrequency,
    generation,
    parentId,
    rootId: rootId || id,
    absoluteVector: absoluteVector || new Map(),
    volume: Math.min(settings.volume, settings.volume / Math.sqrt(Math.max(1, activeAt(start).length + 1)) + 0.002),
    nodes: null,
  };
  state.nextId += 1;
  state.notes.push(note);
  state.selectedNoteId = note.id;
  if (state.isRunning) scheduleAudio(note);
  return note;
}

function seedNote(offset = 2, durationOverride = null, frequencyOverride = null) {
  const settings = getSettings();
  const frequency = frequencyOverride ?? randomBetween(settings.minFreq, settings.maxFreq);
  const duration = durationOverride ?? (state.seedMode === "drone" ? Infinity : randomBetween(settings.minDur, settings.maxDur));
  return addNote(frequency, duration, performance.now() / 1000 + offset, "", null, 0, null, new Map(), null);
}

function frequencyFromCanvasY(clientY) {
  return getFrequencyFromCanvasY(clientY, getSettings());
}

function canvasMetrics() {
  return getCanvasMetrics({ settings: getSettings(), now: timelineNow() });
}

function noteAtCanvasPoint(clientX, clientY) {
  return getNoteAtCanvasPoint(clientX, clientY, canvasMetrics());
}

function rightEdgeOffset() {
  return getRightEdgeOffset(getSettings());
}

function addGeneratedChild(playTime) {
  const settings = getSettings();
  const bases = state.notes.filter((note) => note.start <= playTime && note.start + note.duration >= playTime);
  if (!bases.length) return false;

  for (let i = 0; i < 16; i += 1) {
    const base = chooseBase(bases);
    const candidates = buildCandidates(base.frequency);
    if (!candidates.length) continue;
    const chosen = chooseWeighted(candidates);
    const frequency = base.frequency * chosen.ratio;
    if (!settings.allowDuplication && hasDuplicateFrequency(frequency, playTime)) continue;
    addNote(
      frequency,
      randomBetween(settings.minDur, settings.maxDur),
      playTime,
      fractionLabel(chosen.frac),
      base.frequency,
      base.generation + 1,
      base.id,
      addVectors(base.absoluteVector, vectorFromFraction(chosen.frac)),
      base.rootId,
    );
    return true;
  }
  return false;
}

function addManualNote() {
  if (state.isPaused) return;
  if (state.isDraining) return;
  if (!state.isRunning) {
    seedNote(2);
    render(true);
    return;
  }

  const added = addGeneratedChild(performance.now() / 1000 + rightEdgeOffset());
  if (!added && !state.notes.some((note) => note.start + note.duration > performance.now() / 1000)) {
    seedNote(rightEdgeOffset());
  }
  render(true);
}

function startCanvasSeed(event) {
  event.preventDefault();
  const source = event.touches?.[0] || event.changedTouches?.[0] || event;
  const hitNote = noteAtCanvasPoint(source.clientX, source.clientY);
  if (hitNote) {
    state.selectedNoteId = hitNote.id;
    previewFrequency(hitNote.frequency);
    render(true);
    return;
  }
  if (state.isRunning || state.isPaused || state.isDraining) return;
  state.notes.forEach((note) => stopNode(note, 0.24));
  state.notes = [];
  state.activeDiesisEncounterKeys = new Set();
  const note = seedNote(2, null, frequencyFromCanvasY(source.clientY));
  ensureAudio().resume();
  state.isRunning = true;
  state.isPaused = false;
  state.isDraining = false;
  state.pausedWasDraining = false;
  state.pausedAt = null;
  state.startTime = performance.now() / 1000;
  const settings = getSettings();
  state.timerEndTime = settings.timerMinutes > 0 ? state.startTime + settings.timerMinutes * 60 : null;
  state.timerCompleted = false;
  state.nextEventTime = null;
  state.selectedNoteId = note.id;
  scheduleAudio(note);
  fillEventQueue();
  queueScheduler(0.5);
  syncWakeLock();
  if (!state.rafId) tick();
  render(true);
}

function scheduleNext() {
  if (!state.isRunning) return;
  const settings = getSettings();
  fillEventQueue();
  queueScheduler(Math.min(0.5, settings.nextMin));
}

function queueScheduler(seconds) {
  window.clearTimeout(state.schedulerTimer);
  state.schedulerTimer = window.setTimeout(scheduleNext, Math.max(120, seconds * 1000));
}

function fillEventQueue() {
  const settings = getSettings();
  const now = performance.now() / 1000;
  fillGenerationEventQueue({
    addGeneratedChild,
    finishTimedRun,
    initialDelay: initialSeedDelay,
    now,
    rightEdgeOffset: rightEdgeOffset(),
    settings,
    state,
  });
}

function finishTimedRun() {
  if (!state.isRunning) return;
  state.isRunning = false;
  state.isDraining = true;
  state.timerEndTime = null;
  state.timerCompleted = true;
  state.nextEventTime = null;
  window.clearTimeout(state.schedulerTimer);
  state.schedulerTimer = null;
  syncWakeLock();
}

function trimNotes() {
  const now = performance.now() / 1000;
  const settings = getSettings();
  const keepAfter = now - settings.windowSize * 1.35;
  let removed = false;
  state.notes = state.notes.filter((note) => {
    const keep = note.start + note.duration >= keepAfter;
    if (!keep) {
      removed = true;
      stopNode(note);
    }
    return keep;
  });
  if (removed || now - state.lastGenerationNormalizeAt > 0.5) {
    normalizeGenerations(now);
    state.lastGenerationNormalizeAt = now;
  }
}

function normalizeGenerations(now = performance.now() / 1000) {
  normalizeNoteGenerations({ now, settings: getSettings(), state });
}

function findCloseActivePairs(activeNotes) {
  const maxPairScanNotes = 72;
  const scanNotes = activeNotes.length > maxPairScanNotes
    ? [...activeNotes].sort((a, b) => b.volume - a.volume).slice(0, maxPairScanNotes)
    : activeNotes;
  const pairs = [];
  for (let i = 0; i < scanNotes.length; i += 1) {
    for (let j = i + 1; j < scanNotes.length; j += 1) {
      const low = scanNotes[i].frequency <= scanNotes[j].frequency ? scanNotes[i] : scanNotes[j];
      const high = low === scanNotes[i] ? scanNotes[j] : scanNotes[i];
      const cents = 1200 * Math.log2(high.frequency / low.frequency);
      if (cents <= 0.01 || cents >= 100) continue;
      const exactVector = exactRatioBetween(low, high);
      const approximate = approximateFraction(high.frequency / low.frequency);
      const ratio = exactVector ? ratioDisplayFromVector(exactVector) : fractionLabel(approximate);
      const namedInterval = exactVector ? state.namedCommaByVectorKey.get(vectorKey(exactVector)) || null : null;
      pairs.push({
        low,
        high,
        cents,
        ratio,
        vector: exactVector,
        namedInterval,
      });
    }
  }
  return pairs.sort((a, b) => a.cents - b.cents);
}

function drawCanvas() {
  const canvas = els.visualizer;
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);

  const { settings, now, xOf, yOf } = canvasMetrics();
  const w = rect.width;
  const h = rect.height;
  const activeNow = state.isRunning || state.isPaused || state.isDraining ? activeAt(now) : [];
  const closePairs = findCloseActivePairs(activeNow);
  const nextEncounterKeys = new Set();
  closePairs.forEach((pair) => {
    if (!pair.namedInterval) return;
    const index = diesisIndex(pair.namedInterval);
    const key = `${index}:${Math.min(pair.low.id, pair.high.id)}:${Math.max(pair.low.id, pair.high.id)}`;
    nextEncounterKeys.add(key);
    if (!state.activeDiesisEncounterKeys.has(key)) markDiesisDiscovered(pair.namedInterval);
  });
  state.activeDiesisEncounterKeys = nextEncounterKeys;
  const closeNoteIds = new Set(closePairs.flatMap((pair) => [pair.low.id, pair.high.id]));

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

  const visible = state.notes.filter((note) => {
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
    const isSelected = note.id === state.selectedNoteId;
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

function renderTable() {
  renderTimelineTable({
    now: timelineNow(),
    settings: getSettings(),
    findCloseActivePairs,
    previewFrequency,
    render,
  });
}

function loadSelectedPreset() {
  applySelectedPreset({ setMode, render });
}

function renderDiesisControls() {
  renderDiesisControlView({ renderDiesisControls, renderDiesisList });
}

function renderDiesisList() {
  renderDiesisListView({
    diesisIndex,
    formatDiesisRatioLabel,
    isDifferenceAudible,
    previewDiesisInterval,
  });
}

function updateLabels() {
  const selected = state.notes.find((note) => note.id === state.selectedNoteId) || state.notes[state.notes.length - 1];
  els.startStop.textContent = state.isRunning || state.isPaused || state.isDraining ? "■" : "▶";
  els.pauseResume.textContent = state.isPaused ? "▶Ⅱ" : "Ⅱ";
  els.pauseResume.disabled = !state.isRunning && !state.isPaused && !state.isDraining;
  els.pauseResume.classList.toggle("active", state.isPaused);
  const seedControlsDisabled = state.isRunning || state.isPaused || state.isDraining;
  els.seed.disabled = state.isPaused;
  els.seedMode.disabled = seedControlsDisabled;
  els.seedMode.value = state.seedMode;
  const statusKey = state.isPaused ? "paused" : state.isRunning ? "running" : state.isDraining ? "draining" : "stopped";
  els.statusLabel.textContent = t(`status.${statusKey}`);
  els.noteCount.textContent = String(state.notes.length);
  els.lastDepth.textContent = String(selected?.generation ?? 0);
  els.timerOpen.textContent = t("labels.timer");
  els.timerBadge.textContent = timerBadgeText();
  els.timerBadge.classList.remove("hidden");
  els.seed.setAttribute("title", state.isRunning || state.isDraining ? "Add Child" : "Add Seed");
  els.seed.setAttribute("aria-label", state.isRunning || state.isDraining ? "Add Child" : "Add Seed");
  els.activeRatioLabel.textContent = formatActiveRatioText({ now: timelineNow(), state, t });
  els.autoMode.classList.toggle("active", state.mode === "auto");
  els.listMode.classList.toggle("active", state.mode === "list");
  els.simpleRatioMode.classList.toggle("active", state.ratioBias === "simple");
  els.equalRatioMode.classList.toggle("active", state.ratioBias === "equal");
  els.complexRatioMode.classList.toggle("active", state.ratioBias === "complex");
  els.globalRatioDisplay.value = state.diesisRatioDisplay;
  if (els.diesisRatioDisplay) els.diesisRatioDisplay.value = state.diesisRatioDisplay;
  els.autoControls.classList.toggle("hidden", state.mode !== "auto");
  els.listControls.classList.toggle("hidden", state.mode !== "list");
  updateRatioCurveState();
  updateParentDirectionLabels();
  updateVibratoState();

  if (!selected) {
    els.detailLabel.textContent = "---";
    return;
  }

  const base = selected.baseFrequency === null ? "Seed" : `${selected.baseFrequency.toFixed(2)}Hz`;
  els.detailLabel.textContent = `${selected.frequency.toFixed(2)}Hz  ${nearestPitchLabel(selected.frequency)}  Depth ${selected.generation}  ${selected.ratio || base}`;
}

function timerCountdownText() {
  return formatTimerCountdownText(state.timerEndTime, timelineNow());
}

function timerStatusText() {
  return formatTimerStatusText({
    timerCompleted: state.timerCompleted,
    timerEndTime: state.timerEndTime,
    now: timelineNow(),
  });
}

function timerBadgeText() {
  return formatTimerBadgeText({
    timerCompleted: state.timerCompleted,
    timerEndTime: state.timerEndTime,
    now: timelineNow(),
  });
}

function render(forceTable = false) {
  updateLabels();
  drawCanvas();
  const now = performance.now();
  if (forceTable || now - state.lastTableRenderAt >= tableRenderInterval) {
    renderTable();
    state.lastTableRenderAt = now;
  }
}

function tick() {
  if (state.isRunning && state.timerEndTime !== null && performance.now() / 1000 >= state.timerEndTime) {
    finishTimedRun();
  }
  trimNotes();
  if (state.isDraining && !state.notes.length) {
    state.isDraining = false;
    state.selectedNoteId = null;
    state.timerEndTime = null;
    state.timerCompleted = false;
    syncWakeLock();
  }
  render();
  state.rafId = state.isRunning || state.isDraining ? window.requestAnimationFrame(tick) : null;
}

function start() {
  ensureAudio().resume();
  const settings = getSettings();
  window.clearTimeout(state.schedulerTimer);
  if (state.rafId) window.cancelAnimationFrame(state.rafId);
  state.rafId = null;
  state.notes.forEach(stopNode);
  state.notes = [];
  state.activeDiesisEncounterKeys = new Set();
  seedNote(2);
  state.isRunning = true;
  state.isPaused = false;
  state.isDraining = false;
  state.pausedWasDraining = false;
  state.pausedAt = null;
  state.startTime = performance.now() / 1000;
  state.timerEndTime = settings.timerMinutes > 0 ? state.startTime + settings.timerMinutes * 60 : null;
  state.timerCompleted = false;
  state.nextEventTime = null;
  scheduleVisibleAudio();
  fillEventQueue();
  queueScheduler(0.5);
  syncWakeLock();
  render(true);
  if (!state.rafId) tick();
}

function stop() {
  clearAll();
}

function clearAll() {
  state.isRunning = false;
  state.isPaused = false;
  state.isDraining = false;
  state.pausedWasDraining = false;
  state.pausedAt = null;
  state.timerEndTime = null;
  state.timerCompleted = false;
  window.clearTimeout(state.schedulerTimer);
  state.schedulerTimer = null;
  state.nextEventTime = null;
  if (state.rafId) window.cancelAnimationFrame(state.rafId);
  state.rafId = null;
  state.notes.forEach(stopNode);
  state.notes = [];
  state.activeDiesisEncounterKeys = new Set();
  state.selectedNoteId = null;
  syncWakeLock();
  render(true);
}

function pause() {
  if ((!state.isRunning && !state.isDraining) || state.isPaused) return;
  state.pausedWasDraining = state.isDraining;
  state.isRunning = false;
  state.isDraining = false;
  state.isPaused = true;
  state.pausedAt = performance.now() / 1000;
  window.clearTimeout(state.schedulerTimer);
  state.schedulerTimer = null;
  holdActiveAudio(state.pausedAt);
  cancelFutureAudio(state.pausedAt);
  if (state.rafId) window.cancelAnimationFrame(state.rafId);
  state.rafId = null;
  syncWakeLock();
  render(true);
}

function resume() {
  if (!state.isPaused) return;
  const resumeToDraining = state.pausedWasDraining;
  const pausedDuration = performance.now() / 1000 - state.pausedAt;
  applyPausedTimeShift();
  if (state.timerEndTime !== null) state.timerEndTime += pausedDuration;
  const now = performance.now() / 1000;
  state.pausedAt = null;
  state.pausedWasDraining = false;
  state.isPaused = false;
  state.isRunning = !resumeToDraining;
  state.isDraining = resumeToDraining;
  ensureAudio().resume();
  resumeHeldAudio(now);
  scheduleVisibleAudio(now);
  if (state.isRunning) {
    fillEventQueue();
    queueScheduler(0.5);
  }
  syncWakeLock();
  if (!state.rafId) tick();
}

function togglePause() {
  if (state.isPaused) resume();
  else pause();
}

function setSeedMode(nextSeedMode) {
  state.seedMode = nextSeedMode === "drone" ? "drone" : "seed";
  render();
}

function setMode(nextMode) {
  state.mode = nextMode === "list" ? "list" : "auto";
  render();
}

function setRatioBias(nextBias) {
  state.ratioBias = nextBias;
  render();
}

function updateParentDirectionLabels() {
  syncParentDirectionControls(els);
}

function updateRatioCurveState() {
  syncRatioCurveControls(els, state.ratioBias);
}

function updateVibratoState() {
  syncVibratoControls(els);
}

registerEventBindings({
  addManualNote,
  clearAll,
  drawCanvas,
  loadSelectedPreset,
  render,
  renderDiesisControls,
  renderDiesisList,
  renderPresetBrowser,
  resetDiesisCollection,
  setMobileToolsOpen,
  setMobileView,
  setMode,
  setRatioBias,
  setSeedMode,
  start,
  startCanvasSeed,
  stop,
  syncWakeLock,
  toggleLanguage,
  togglePause,
});
loadNamedCommas({
  isDiesisDialogOpen: () => els.diesisDialog.open,
  render,
  renderDiesisControls,
  renderDiesisList,
  state,
});
loadRatioPresets({ renderPresetBrowser, state });
applyLanguage();
