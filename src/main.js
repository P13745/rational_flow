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
import { cFrequency } from "./core/pitch.js";
import { clamp, randomBetween } from "./core/utils.js";
import {
  addVectors,
  approximateFraction,
  fractionLabel,
  parseFraction,
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
  createEditorRootNote,
  createEditorChildNote,
  deleteEditorNote,
  editorRelations,
  removeEditorRelation,
  moveEditorNote,
  resizeEditorNoteEnd,
  resizeEditorNoteStart,
  selectedEditorInterval,
  toggleEditorNoteMute,
  toggleEditorBind,
} from "./editor/editor-model.js";
import {
  fillEditorPlaybackQueue,
  stopEditorScheduledAudio,
} from "./editor/editor-playback.js";
import { renderEditorTable } from "./editor/editor-table.js";
import {
  buildPartialGridCandidates,
  buildSingleRatioCandidates,
  expandCandidatesByOctaves,
  nearestCandidateByY,
} from "./editor/ratio-tools.js";
import {
  activeAt,
  exactRatioBetween,
  hasDuplicateFrequency,
} from "./generation/note-model.js";
import { normalizeNoteGenerations } from "./generation/depth-normalization.js";
import { fillGenerationEventQueue } from "./generation/scheduler.js";
import { applyLanguageTargets } from "./i18n/language-ui.js";
import { t } from "./i18n/i18n.js";
import { i18nHelpTargets, i18nTargets } from "./i18n/targets.js";
import { registerEventBindings } from "./ui/event-bindings.js";
import {
  canvasMetrics as getCanvasMetrics,
  editorCanvasMetrics as getEditorCanvasMetrics,
  editorNoteHitAtCanvasPoint as getEditorNoteHitAtCanvasPoint,
  frequencyFromCanvasY as getFrequencyFromCanvasY,
  noteAtCanvasPoint as getNoteAtCanvasPoint,
  rightEdgeOffset as getRightEdgeOffset,
} from "./ui/canvas-metrics.js";
import {
  updateParentDirectionLabels as syncParentDirectionControls,
  updateRatioCurveState as syncRatioCurveControls,
  updateVibratoState as syncVibratoControls,
} from "./ui/control-state.js";
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
import { updateStatusLabels } from "./ui/status-labels.js";
import { renderVisualizerCanvas } from "./ui/visualizer-renderer.js";
import { initialSeedDelay, tableRenderInterval } from "./config.js";

const productionAppUrl = "https://p13745.github.io/rational_flow/";

function timelineNow() {
  return state.isPaused && state.pausedAt !== null ? state.pausedAt : performance.now() / 1000;
}

function applyLanguage() {
  applyLanguageTargets({
    els,
    helpTargets: i18nHelpTargets,
    language: state.currentLanguage,
    targets: i18nTargets,
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
  if (state.workspaceMode === "editor") {
    return getEditorCanvasMetrics({ settings: getSettings(), editor: state.editor });
  }
  return getCanvasMetrics({ settings: getSettings(), now: timelineNow() });
}

function syncEditorControls() {
  const gridBase = Number(els.editorGridBase.value);
  const gridMin = Number(els.editorGridNumeratorMin.value);
  const gridMax = Number(els.editorGridNumeratorMax.value);
  if (Number.isFinite(gridBase) && els.editorGridBase.value !== "") {
    state.editor.gridBase = Math.max(1, Math.floor(gridBase));
  }
  if (Number.isFinite(gridMin) && els.editorGridNumeratorMin.value !== "") {
    state.editor.gridNumeratorMin = Math.max(1, Math.floor(gridMin));
  }
  if (Number.isFinite(gridMax) && els.editorGridNumeratorMax.value !== "") {
    state.editor.gridNumeratorMax = Math.max(state.editor.gridNumeratorMin, Math.floor(gridMax));
  }
  state.editor.gridDirection = ["above", "under", "both"].includes(els.editorGridDirection.value)
    ? els.editorGridDirection.value
    : "above";
  state.editor.singleRatioInput = els.editorSingleRatioInput.value;
  state.editor.singleDirection = ["above", "both"].includes(els.editorSingleDirection.value)
    ? els.editorSingleDirection.value
    : "above";
  state.editor.binderMode = els.editorBinderMode.checked;
}

function setControlValueUnlessEditing(element, value) {
  if (!element || document.activeElement === element) return;
  element.value = String(value);
}

function editorRatioCandidates() {
  syncEditorControls();
  if (state.editor.ratioSource === "single") {
    return buildSingleRatioCandidates(state.editor.singleRatioInput, state.editor.singleDirection);
  }
  return buildPartialGridCandidates({
    base: state.editor.gridBase,
    numeratorMin: state.editor.gridNumeratorMin,
    numeratorMax: state.editor.gridNumeratorMax,
    direction: state.editor.gridDirection,
  });
}

function expandedEditorRatioCandidates() {
  const candidates = editorRatioCandidates();
  return state.editor.ratioSource === "single"
    ? candidates
    : expandCandidatesByOctaves(candidates, -4, 4);
}

function selectedEditorParents(excludeNoteId = null) {
  return state.editor.selectedNoteIds
    .map((id) => state.editor.notes.find((note) => note.id === id))
    .filter((note) => note && note.id !== excludeNoteId);
}

function editorGridParents({ excludeNoteId = null, preserveParentOf = null, fallbackToAll = true } = {}) {
  const selectedParents = selectedEditorParents(excludeNoteId);
  if (selectedParents.length) return selectedParents;
  if (preserveParentOf?.parentId) {
    const parent = state.editor.notes.find((note) => note.id === preserveParentOf.parentId);
    if (parent && parent.id !== excludeNoteId) return [parent];
  }
  if (!fallbackToAll) return [];
  return state.editor.notes.filter((note) => note.id !== excludeNoteId);
}

function editorGridTargets({ metrics, parents, excludeNoteId = null } = {}) {
  if (!state.editor.notes.length) return [];
  const candidates = expandedEditorRatioCandidates();
  const settings = getSettings();
  const gridParents = parents || editorGridParents({ excludeNoteId });
  const targets = [];
  gridParents.forEach((parent) => {
    candidates.forEach((candidate) => {
      const frequency = parent.frequency * candidate.numericRatio;
      if (frequency < settings.minFreq || frequency > settings.maxFreq) return;
      targets.push({
        parent,
        candidate,
        frequency,
      });
    });
  });
  return targets;
}

function captureEditorRelationSnapTargets(note) {
  if (!note) return [];
  return editorRelations(state.editor)
    .filter((relation) => relation.aId === note.id || relation.bId === note.id)
    .map((relation) => {
      const other = relation.aId === note.id ? relation.b : relation.a;
      const frac = parseFraction(relation.label);
      if (!other || !frac) return null;
      const ratio = Math.abs(frac.numerator / frac.denominator);
      if (!Number.isFinite(ratio) || ratio <= 0) return null;
      return {
        otherId: other.id,
        ratio,
        label: relation.label,
        noteIsHigher: note.frequency >= other.frequency,
      };
    })
    .filter(Boolean);
}

function editorRelationSnapTargets(note, preservedRelations = null) {
  if (!note) return [];
  const settings = getSettings();
  const relations = preservedRelations || captureEditorRelationSnapTargets(note);
  return relations.flatMap((relation) => {
      const other = state.editor.notes.find((item) => item.id === relation.otherId);
      const frac = parseFraction(relation.label);
      const ratio = relation.ratio;
      if (!Number.isFinite(ratio) || ratio <= 0) return [];
      if (!other || !frac) return [];
      const frequency = relation.noteIsHigher ? other.frequency * ratio : other.frequency / ratio;
      if (frequency < settings.minFreq || frequency > settings.maxFreq) return [];
      return [{
        parent: other,
        candidate: {
          frac: relation.noteIsHigher ? frac : { numerator: frac.denominator, denominator: frac.numerator },
          rawRatio: relation.label,
          ratio: relation.label,
          numericRatio: relation.noteIsHigher ? ratio : 1 / ratio,
        },
        frequency,
        preserveRelation: true,
      }];
    });
}

function nearestEditorGridTarget(clientY, metrics, options = {}) {
  const pointerY = clientY - metrics.rect.top;
  const targets = [
    ...editorGridTargets({ metrics, ...options }),
    ...(options.preserveNote ? editorRelationSnapTargets(options.preserveNote, options.preservedRelations) : []),
  ];
  targets.forEach((target) => {
    target.distance = Math.abs(pointerY - metrics.yOf(target.frequency));
  });
  return targets.sort((a, b) => a.distance - b.distance)[0] || null;
}

function editorGridPreviewLines(metrics) {
  if (state.workspaceMode !== "editor") return [];
  const drag = state.editor.drag;
  const parents = drag?.gridParentIds
    ? drag.gridParentIds.map((id) => state.editor.notes.find((note) => note.id === id)).filter(Boolean)
    : selectedEditorParents();
  const seen = new Set();
  const preserveNote = drag?.noteId
    ? state.editor.notes.find((note) => note.id === drag.noteId)
    : state.editor.selectedNoteIds.length === 1
      ? state.editor.notes.find((note) => note.id === state.editor.selectedNoteIds[0])
      : null;
  if (!parents.length && !preserveNote) return [];
  return [
    ...editorGridTargets({ metrics, parents }),
    ...editorRelationSnapTargets(preserveNote, drag?.preservedRelations || null),
  ]
    .map((target) => {
      const y = metrics.yOf(target.frequency);
      const key = Math.round(y * 2) / 2;
      if (seen.has(key)) return null;
      seen.add(key);
      return { y, label: target.candidate.ratio };
    })
    .filter(Boolean)
    .slice(0, 96);
}

function applyEditorGridTarget(note, target) {
  note.frequency = target.frequency;
  if (target.preserveRelation) return;
  note.ratio = target.candidate.ratio;
  note.sourceRatio = target.candidate.rawRatio;
  note.baseFrequency = target.parent.frequency;
  note.generation = target.parent.generation + 1;
  note.parentId = target.parent.id;
  note.rootId = target.parent.rootId;
  note.absoluteVector = addVectors(target.parent.absoluteVector, vectorFromFraction(target.candidate.frac));
}

function clearEditorGridTarget(note) {
  note.ratio = "";
  note.sourceRatio = "";
  note.baseFrequency = null;
  note.generation = 0;
  note.parentId = null;
  note.rootId = note.id;
  note.absoluteVector = new Map();
}

function refreshEditorBaseFrequencies() {
  const notesById = new Map(state.editor.notes.map((note) => [note.id, note]));
  state.editor.notes.forEach((note) => {
    const parent = note.parentId ? notesById.get(note.parentId) : null;
    note.baseFrequency = parent ? parent.frequency : null;
  });
}

function transposeAllEditorNotes(drag, targetFrequency) {
  if (!Number.isFinite(targetFrequency) || targetFrequency <= 0) return;
  const originals = new Map(drag.transposeFrequencies || []);
  const originFrequency = originals.get(drag.noteId);
  if (!Number.isFinite(originFrequency) || originFrequency <= 0) return;
  const settings = getSettings();
  let ratio = targetFrequency / originFrequency;
  let minRatio = 0;
  let maxRatio = Infinity;
  originals.forEach((frequency) => {
    if (!Number.isFinite(frequency) || frequency <= 0) return;
    minRatio = Math.max(minRatio, settings.minFreq / frequency);
    maxRatio = Math.min(maxRatio, settings.maxFreq / frequency);
  });
  ratio = clamp(ratio, minRatio, maxRatio);
  state.editor.notes.forEach((note) => {
    const original = originals.get(note.id);
    if (!Number.isFinite(original) || original <= 0) return;
    note.frequency = original * ratio;
  });
  refreshEditorBaseFrequencies();
}

function distanceToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  if (!lengthSquared) return Math.hypot(px - ax, py - ay);
  const tValue = clamp(((px - ax) * dx + (py - ay) * dy) / lengthSquared, 0, 1);
  return Math.hypot(px - (ax + tValue * dx), py - (ay + tValue * dy));
}

function editorRelationAtCanvasPoint(clientX, clientY) {
  const metrics = canvasMetrics();
  const pointerX = clientX - metrics.rect.left;
  const pointerY = clientY - metrics.rect.top;
  const hitRadius = 12;
  return editorRelations(state.editor)
    .map((relation) => ({
      relation,
      distance: distanceToSegment(
        pointerX,
        pointerY,
        metrics.xOf(relation.a.start),
        metrics.yOf(relation.a.frequency),
        metrics.xOf(relation.b.start),
        metrics.yOf(relation.b.frequency),
      ),
    }))
    .filter((hit) => hit.distance <= hitRadius)
    .sort((a, b) => a.distance - b.distance)[0]?.relation || null;
}

function selectEditorNote(noteId, { extend = false } = {}) {
  state.editor.selectedRelationKey = null;
  if (extend) {
    const selected = new Set(state.editor.selectedNoteIds);
    if (selected.has(noteId)) selected.delete(noteId);
    else selected.add(noteId);
    state.editor.selectedNoteIds = [...selected].slice(-2);
    return;
  }
  state.editor.selectedNoteIds = [noteId];
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
  if (state.workspaceMode === "editor") {
    const settings = getSettings();
    createEditorRootNote({
      editor: state.editor,
      frequency: randomBetween(settings.minFreq, settings.maxFreq),
      settings,
      start: Math.min(2, Math.max(0, state.editor.loopLength - state.editor.defaultDuration)),
    });
    render(true);
    return;
  }
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

function previewCanvasNoteAt(clientX, clientY) {
  const hitNote = noteAtCanvasPoint(clientX, clientY);
  if (!hitNote) {
    state.canvasPreviewLastNoteId = null;
    return false;
  }
  if (hitNote.id === state.canvasPreviewLastNoteId) return true;
  state.canvasPreviewLastNoteId = hitNote.id;
  state.selectedNoteId = hitNote.id;
  previewFrequency(hitNote.frequency);
  render(true);
  return true;
}

function startCanvasSeedAt(clientY) {
  if (state.isRunning || state.isPaused || state.isDraining) return;
  state.notes.forEach((note) => stopNode(note, 0.24));
  state.notes = [];
  state.activeDiesisEncounterKeys = new Set();
  const note = seedNote(2, null, frequencyFromCanvasY(clientY));
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

function editorNoteAtCanvasPoint(clientX, clientY) {
  return getEditorNoteHitAtCanvasPoint(clientX, clientY, canvasMetrics(), state.editor.notes);
}

function handleEditorCanvasPointer(event) {
  if (event.type === "pointerdown") {
    if (state.editor.binderMode) {
      const relation = editorRelationAtCanvasPoint(event.clientX, event.clientY);
      if (relation) {
        removeEditorRelation(state.editor, relation);
        state.editor.selectedNoteIds = [];
        state.editor.drag = null;
        render(true);
        return;
      }
      const hit = editorNoteAtCanvasPoint(event.clientX, event.clientY);
      state.editor.drag = null;
      if (!hit) {
        state.editor.selectedNoteIds = [];
        state.editor.selectedRelationKey = null;
        render(true);
        return;
      }
      const selected = new Set(state.editor.selectedNoteIds);
      if (selected.has(hit.note.id)) selected.delete(hit.note.id);
      else selected.add(hit.note.id);
      state.editor.selectedNoteIds = [...selected].slice(-2);
      state.editor.selectedRelationKey = null;
      if (state.editor.selectedNoteIds.length === 2) {
        const [aId, bId] = state.editor.selectedNoteIds;
        const result = toggleEditorBind(state.editor, aId, bId);
        if (result?.action === "removed") state.editor.selectedNoteIds = [bId];
      }
      render(true);
      return;
    }
    const hit = editorNoteAtCanvasPoint(event.clientX, event.clientY);
    state.editor.drag = null;
    if (!hit) {
      const metrics = canvasMetrics();
      const settings = getSettings();
      const gridParents = editorGridParents({ fallbackToAll: true });
      const pointerX = event.clientX - metrics.rect.left;
      const pointerY = event.clientY - metrics.rect.top;
      const start = Math.min(
        Math.max(0, metrics.timeFromX(pointerX)),
        Math.max(0, state.editor.loopLength - state.editor.defaultDuration),
      );
      const gridTarget = nearestEditorGridTarget(event.clientY, metrics, { parents: gridParents });
      const note = createEditorRootNote({
        editor: state.editor,
        frequency: gridTarget ? gridTarget.frequency : metrics.frequencyFromY(pointerY),
        settings,
        start,
      });
      if (gridTarget) applyEditorGridTarget(note, gridTarget);
      state.editor.drag = {
        pointerId: event.pointerId,
        kind: "place",
        noteId: note.id,
        grabOffset: 0,
        startedAt: performance.now(),
        candidate: gridTarget?.candidate || null,
        candidateFrequency: gridTarget?.frequency || null,
        childStart: start,
        gridParentIds: gridParents.map((parent) => parent.id),
      };
      els.visualizer.setPointerCapture?.(event.pointerId);
      render(true);
      return;
    }
    const { note, kind } = hit;
    const metrics = canvasMetrics();
    const pointerTime = metrics.timeFromX(event.clientX - metrics.rect.left);
    selectEditorNote(note.id, { extend: event.shiftKey || event.metaKey || event.ctrlKey });
    previewFrequency(note.frequency);
    state.editor.drag = {
      pointerId: event.pointerId,
      kind,
      noteId: note.id,
      grabOffset: pointerTime - note.start,
      start: note.start,
      duration: note.duration,
      originX: event.clientX,
      originY: event.clientY,
      startedAt: performance.now(),
      candidate: null,
      candidateFrequency: null,
      childStart: null,
      gridParentIds: editorGridParents({ excludeNoteId: note.id, preserveParentOf: note }).map((parent) => parent.id),
      preservedRelations: captureEditorRelationSnapTargets(note),
      transposeFrequencies: state.editor.notes.map((item) => [item.id, item.frequency]),
    };
    els.visualizer.setPointerCapture?.(event.pointerId);
    render(true);
    return;
  }

  const drag = state.editor.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;

  if (event.type === "pointermove") {
    const note = state.editor.notes.find((item) => item.id === drag.noteId);
    if (!note) return;
    const metrics = canvasMetrics();
    const pointerTime = metrics.timeFromX(event.clientX - metrics.rect.left);
    if (drag.kind === "place") {
      const pointerY = event.clientY - metrics.rect.top;
      moveEditorNote({ editor: state.editor, note, start: pointerTime });
      const gridParents = drag.gridParentIds
        .map((id) => state.editor.notes.find((item) => item.id === id))
        .filter((item) => item && item.id !== note.id);
      const gridTarget = gridParents.length || note.parentId || state.editor.links.length
        ? nearestEditorGridTarget(event.clientY, metrics, { parents: gridParents, preserveNote: note, preservedRelations: drag.preservedRelations })
        : null;
      if (gridTarget) {
        applyEditorGridTarget(note, gridTarget);
        drag.candidate = gridTarget.candidate;
        drag.candidateFrequency = gridTarget.frequency;
      } else {
        clearEditorGridTarget(note);
        note.frequency = metrics.frequencyFromY(pointerY);
        drag.candidate = null;
        drag.candidateFrequency = null;
      }
      drag.childStart = note.start;
    } else if (drag.kind === "resize-start") {
      resizeEditorNoteStart({ editor: state.editor, note, start: pointerTime });
    } else if (drag.kind === "resize-end") {
      resizeEditorNoteEnd({ editor: state.editor, note, end: pointerTime });
    } else if (drag.kind === "branch") {
      const pointerY = event.clientY - metrics.rect.top;
      const nearest = nearestCandidateByY(pointerY, expandedEditorRatioCandidates(), metrics, note);
      if (nearest) {
        drag.candidate = nearest.candidate;
        drag.candidateFrequency = nearest.frequency;
        drag.childStart = Math.min(
          Math.max(0, pointerTime),
          Math.max(0, state.editor.loopLength - state.editor.defaultDuration),
        );
      }
    } else {
      if (state.editor.transposeAll) {
        const pointerY = event.clientY - metrics.rect.top;
        const gridParents = drag.gridParentIds
          .map((id) => state.editor.notes.find((item) => item.id === id))
          .filter((item) => item && item.id !== note.id);
        const gridTarget = performance.now() - drag.startedAt > 450 && (gridParents.length || note.parentId || state.editor.links.length)
          ? nearestEditorGridTarget(event.clientY, metrics, { parents: gridParents, preserveNote: note, preservedRelations: drag.preservedRelations })
          : null;
        transposeAllEditorNotes(drag, gridTarget?.frequency || metrics.frequencyFromY(pointerY));
        render();
        return;
      }
      moveEditorNote({ editor: state.editor, note, start: pointerTime - drag.grabOffset });
      if (performance.now() - drag.startedAt > 450) {
        const pointerY = event.clientY - metrics.rect.top;
        const gridParents = drag.gridParentIds
          .map((id) => state.editor.notes.find((item) => item.id === id))
          .filter((item) => item && item.id !== note.id);
        const gridTarget = gridParents.length || note.parentId || state.editor.links.length
          ? nearestEditorGridTarget(event.clientY, metrics, { parents: gridParents, preserveNote: note, preservedRelations: drag.preservedRelations })
          : null;
        if (gridTarget) {
          applyEditorGridTarget(note, gridTarget);
        } else {
          clearEditorGridTarget(note);
          note.frequency = metrics.frequencyFromY(pointerY);
        }
      }
    }
    render();
    return;
  }

  if (event.type === "pointerup" && drag.kind === "branch") {
    const parent = state.editor.notes.find((item) => item.id === drag.noteId);
    const distance = Math.hypot(event.clientX - drag.originX, event.clientY - drag.originY);
    if (parent && drag.candidate && drag.candidateFrequency && drag.childStart !== null && distance > 16) {
      createEditorChildNote({
        editor: state.editor,
        parent,
        candidate: drag.candidate,
        frequency: drag.candidateFrequency,
        start: drag.childStart,
        settings: getSettings(),
      });
    }
  }

  state.editor.drag = null;
  if (els.visualizer.hasPointerCapture?.(event.pointerId)) {
    els.visualizer.releasePointerCapture(event.pointerId);
  }
  render(true);
}

function handleCanvasPointer(event) {
  event.preventDefault();
  if (state.workspaceMode === "editor") {
    handleEditorCanvasPointer(event);
    return;
  }
  if (event.type === "pointerdown") {
    state.canvasPreviewPointerId = event.pointerId;
    state.canvasPreviewLastNoteId = null;
    els.visualizer.setPointerCapture?.(event.pointerId);
    if (previewCanvasNoteAt(event.clientX, event.clientY)) return;
    startCanvasSeedAt(event.clientY);
    return;
  }
  if (event.pointerId !== state.canvasPreviewPointerId) return;
  if (event.type === "pointermove") {
    previewCanvasNoteAt(event.clientX, event.clientY);
    return;
  }
  state.canvasPreviewPointerId = null;
  state.canvasPreviewLastNoteId = null;
  if (els.visualizer.hasPointerCapture?.(event.pointerId)) {
    els.visualizer.releasePointerCapture(event.pointerId);
  }
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
  const metrics = canvasMetrics();
  if (state.workspaceMode === "editor") {
    renderVisualizerCanvas({
      canvas: els.visualizer,
      closeNoteIds: new Set(),
      closePairs: [],
      editorDrag: state.editor.drag,
      editorGridLines: editorGridPreviewLines(metrics),
      editorRelations: editorRelations(state.editor),
      metrics,
      notes: state.editor.notes,
      selectedNoteId: state.editor.selectedNoteIds[0] || null,
      selectedRelationKey: state.editor.selectedRelationKey,
    });
    return;
  }
  const { now } = metrics;
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

  renderVisualizerCanvas({
    canvas: els.visualizer,
    closeNoteIds,
    closePairs,
    editorDrag: null,
    editorGridLines: [],
    editorRelations: [],
    metrics,
    notes: state.notes,
    selectedNoteId: state.selectedNoteId,
    selectedRelationKey: null,
  });
}

function renderTable() {
  if (state.workspaceMode === "editor") {
    renderEditorTable({
      onDelete: (noteId) => {
        deleteEditorNote(state.editor, noteId);
        stopEditorScheduledAudio({ editor: state.editor, stopNode });
        render(true);
      },
      onMute: (noteId) => {
        const note = state.editor.notes.find((item) => item.id === noteId);
        if (note) toggleEditorNoteMute(note);
        stopEditorScheduledAudio({ editor: state.editor, stopNode });
        render(true);
      },
      onSelect: () => render(true),
      selectNote: selectEditorNote,
    });
    return;
  }
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
  updateStatusLabels({
    els,
    editorIntervalText: editorIntervalText(),
    now: timelineNow(),
    state,
    timerBadgeText,
    updateParentDirectionLabels,
    updateRatioCurveState,
    updateVibratoState,
  });
}

function editorIntervalText() {
  const interval = selectedEditorInterval(state.editor);
  if (!interval) return "";
  const ratio = interval.vector ? ratioDisplayFromVector(interval.vector) : interval.ratio;
  const named = interval.vector ? state.namedCommaByVectorKey.get(vectorKey(interval.vector)) : null;
  return named
    ? `${ratio}, ${interval.cents.toFixed(2)} cents, ${named.name}`
    : `${ratio}, ${interval.cents.toFixed(2)} cents`;
}

function renderWorkspaceControls() {
  const isEditor = state.workspaceMode === "editor";
  const tableHeadings = isEditor
    ? [t("table.start"), t("table.end"), t("table.hz"), t("table.ratio"), t("table.actions")]
    : [t("table.start"), t("table.hz"), t("table.duration"), t("table.depth"), t("table.ratio")];
  els.playWorkspace.classList.toggle("active", !isEditor);
  els.editorWorkspace.classList.toggle("active", isEditor);
  els.autoControls.classList.toggle("hidden", isEditor || state.mode !== "auto");
  els.listControls.classList.toggle("hidden", isEditor || state.mode !== "list");
  els.editorControls.classList.toggle("hidden", !isEditor);
  els.editorPartialGrid.classList.toggle("active", state.editor.ratioSource === "partialGrid");
  els.editorSingleRatio.classList.toggle("active", state.editor.ratioSource === "single");
  els.editorGridControls.classList.toggle("hidden", state.editor.ratioSource !== "partialGrid");
  els.editorSingleControls.classList.toggle("hidden", state.editor.ratioSource !== "single");
  setControlValueUnlessEditing(els.editorGridBase, state.editor.gridBase);
  setControlValueUnlessEditing(els.editorGridNumeratorMin, state.editor.gridNumeratorMin);
  setControlValueUnlessEditing(els.editorGridNumeratorMax, state.editor.gridNumeratorMax);
  els.editorGridDirection.value = state.editor.gridDirection;
  setControlValueUnlessEditing(els.editorSingleRatioInput, state.editor.singleRatioInput);
  els.editorSingleDirection.value = state.editor.singleDirection;
  els.editorBinderMode.checked = state.editor.binderMode;
  els.editorTransposeAll.checked = state.editor.transposeAll;
  if (isEditor) renderEditorSaveSlots();
  document.querySelectorAll(".play-only-control").forEach((element) => {
    element.classList.toggle("hidden", isEditor);
  });
  document.querySelectorAll(".editor-only-control").forEach((element) => {
    element.classList.toggle("hidden", !isEditor);
  });
  els.stage.dataset.workspaceMode = state.workspaceMode;
  els.listToolbarTitle.textContent = isEditor ? t("labels.editorTimeline") : t("labels.timeline");
  els.mobileListView.textContent = isEditor ? t("labels.editorTimeline") : t("labels.timeline");
  document.querySelectorAll("thead th").forEach((heading, index) => {
    heading.textContent = tableHeadings[index] || "";
  });
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
  if (state.workspaceMode === "editor") {
    const now = performance.now();
    const shouldUpdateUi = forceTable || now - state.editor.lastUiRenderAt >= 250;
    if (shouldUpdateUi) {
      updateLabels();
      renderWorkspaceControls();
      state.editor.lastUiRenderAt = now;
    }
    drawCanvas();
    if (forceTable) renderTable();
    return;
  }
  updateLabels();
  renderWorkspaceControls();
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
  if (state.editor.isLooping && state.editor.loopStartWallTime !== null) {
    const now = performance.now() / 1000;
    state.editor.playheadTime = (now - state.editor.loopStartWallTime) % state.editor.loopLength;
    if (now - state.editor.lastPlaybackQueueAt >= 0.1) {
      fillEditorPlaybackQueue({
        editor: state.editor,
        now,
        scheduleAudio,
        settings: getSettings(),
      });
      state.editor.lastPlaybackQueueAt = now;
    }
  }
  trimNotes();
  if (state.isDraining && !state.notes.length) {
    state.isDraining = false;
    state.selectedNoteId = null;
    state.timerEndTime = null;
    state.timerCompleted = false;
    syncWakeLock();
  }
  const frameNow = performance.now();
  const editorFrameDue = !state.editor.isLooping || frameNow - state.editor.lastFrameRenderAt >= 1000 / 30;
  if (editorFrameDue) {
    render();
    if (state.editor.isLooping) state.editor.lastFrameRenderAt = frameNow;
  }
  state.rafId = state.isRunning || state.isDraining || state.editor.isLooping ? window.requestAnimationFrame(tick) : null;
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

function startEditorLoop() {
  ensureAudio().resume();
  if (state.isRunning || state.isPaused || state.isDraining) clearAll();
  stopEditorScheduledAudio({ editor: state.editor, stopNode });
  state.workspaceMode = "editor";
  state.editor.isLooping = true;
  state.editor.isPaused = false;
  state.editor.loopStartWallTime = performance.now() / 1000 - state.editor.pausedAtLoopTime;
  state.editor.playheadTime = state.editor.pausedAtLoopTime;
  state.editor.lastPlaybackQueueAt = -Infinity;
  state.editor.lastFrameRenderAt = -Infinity;
  state.editor.lastUiRenderAt = -Infinity;
  fillEditorPlaybackQueue({
    editor: state.editor,
    now: performance.now() / 1000,
    scheduleAudio,
    settings: getSettings(),
  });
  syncWakeLock();
  render(true);
  if (!state.rafId) tick();
}

function stopEditorLoop() {
  stopEditorScheduledAudio({ editor: state.editor, stopNode });
  state.editor.isLooping = false;
  state.editor.isPaused = false;
  state.editor.loopStartWallTime = null;
  state.editor.pausedAtLoopTime = 0;
  state.editor.playheadTime = 0;
  state.editor.lastPlaybackQueueAt = -Infinity;
  state.editor.lastFrameRenderAt = -Infinity;
  syncWakeLock();
  if (state.rafId && !state.isRunning && !state.isDraining) {
    window.cancelAnimationFrame(state.rafId);
    state.rafId = null;
  }
  render(true);
}

function clearEditorClip() {
  stopEditorLoop();
  state.editor.notes = [];
  state.editor.links = [];
  state.editor.selectedNoteIds = [];
  state.editor.selectedRelationKey = null;
  state.editor.drag = null;
  render(true);
}

function deleteSelectedEditorNotes() {
  if (!state.editor.selectedNoteIds.length) return;
  [...state.editor.selectedNoteIds].forEach((noteId) => deleteEditorNote(state.editor, noteId));
  stopEditorScheduledAudio({ editor: state.editor, stopNode });
  render(true);
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

function toggleEditorPause() {
  if (!state.editor.isLooping && !state.editor.isPaused) return;
  if (state.editor.isPaused) {
    state.editor.isPaused = false;
    state.editor.isLooping = true;
    state.editor.loopStartWallTime = performance.now() / 1000 - state.editor.pausedAtLoopTime;
    state.editor.lastPlaybackQueueAt = -Infinity;
    state.editor.lastFrameRenderAt = -Infinity;
    fillEditorPlaybackQueue({
      editor: state.editor,
      now: performance.now() / 1000,
      scheduleAudio,
      settings: getSettings(),
    });
    if (!state.rafId) tick();
  } else {
    state.editor.playheadTime = state.editor.loopStartWallTime === null
      ? 0
      : (performance.now() / 1000 - state.editor.loopStartWallTime) % state.editor.loopLength;
    state.editor.pausedAtLoopTime = state.editor.playheadTime;
    state.editor.isLooping = false;
    state.editor.isPaused = true;
    stopEditorScheduledAudio({ editor: state.editor, stopNode });
    if (state.rafId && !state.isRunning && !state.isDraining) {
      window.cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }
  }
  syncWakeLock();
  render(true);
}

function setWorkspaceMode(nextMode) {
  const normalizedMode = nextMode === "editor" ? "editor" : "play";
  if (state.workspaceMode === normalizedMode) return;
  if (normalizedMode === "editor") {
    if (state.isRunning || state.isPaused || state.isDraining) clearAll();
  } else {
    stopEditorLoop();
  }
  state.workspaceMode = normalizedMode;
  render(true);
}

function setSeedMode(nextSeedMode) {
  state.seedMode = nextSeedMode === "drone" ? "drone" : "seed";
  render();
}

function setMode(nextMode) {
  state.mode = nextMode === "list" ? "list" : "auto";
  render();
}

function setEditorRatioSource(nextSource) {
  state.editor.ratioSource = nextSource === "single" ? "single" : "partialGrid";
  render(true);
}

function encodeEditorPayload(payload) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return `rf1:${btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")}`;
}

function decodeEditorPayload(raw) {
  const text = String(raw || "").trim();
  let code = text;
  try {
    const url = new URL(text);
    code = url.searchParams.get("loop") || text;
  } catch (_) {
    code = text;
  }
  const encoded = code.startsWith("rf1:") ? code.slice(4) : code;
  const padded = encoded.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(encoded.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function vectorEntries(vector) {
  return [...(vector || new Map()).entries()];
}

function importVector(entries) {
  return new Map(Array.isArray(entries) ? entries.map(([prime, exponent]) => [Number(prime), Number(exponent)]).filter(([prime, exponent]) => Number.isFinite(prime) && Number.isFinite(exponent) && exponent !== 0) : []);
}

function editorSlotStorageKey(slot) {
  return `rationalFlowEditorSlot${slot}`;
}

function editorText(key, values = {}) {
  return Object.entries(values).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    t(`editor.${key}`),
  );
}

function setEditorTransferStatus(key, values = {}) {
  if (!els.editorTransferStatus) return;
  els.editorTransferStatus.textContent = key ? editorText(key, values) : "";
}

function createEditorLoopCode() {
  syncEditorControls();
  const noteIds = new Set(state.editor.notes.map((note) => note.id));
  const payload = {
    version: 2,
    kind: "rational-flow-editor-loop",
    settings: {
      minFreq: Number(els.minFreq.value),
      maxFreq: Number(els.maxFreq.value),
      windowSize: Number(els.windowSize.value),
      volume: Number(els.volume.value),
    },
    editor: {
      loopLength: state.editor.loopLength,
      viewStart: state.editor.viewStart,
      viewEnd: state.editor.viewEnd,
      defaultDuration: state.editor.defaultDuration,
      timeSnap: state.editor.timeSnap,
      nextEditorId: state.editor.nextEditorId,
      nextEditorLinkId: state.editor.nextEditorLinkId,
      ratioSource: state.editor.ratioSource,
      singleRatioInput: state.editor.singleRatioInput,
      singleDirection: state.editor.singleDirection,
      transposeAll: state.editor.transposeAll,
      gridBase: state.editor.gridBase,
      gridNumeratorMin: state.editor.gridNumeratorMin,
      gridNumeratorMax: state.editor.gridNumeratorMax,
      gridDirection: state.editor.gridDirection,
      notes: state.editor.notes.map((note) => {
        const absoluteVector = vectorEntries(note.absoluteVector);
        const needsFrequency = !note.rootId || note.rootId === note.id || !noteIds.has(note.rootId);
        return {
          id: note.id,
          start: note.start,
          duration: note.duration,
          ...(needsFrequency ? { frequency: note.frequency } : {}),
          ratio: note.ratio,
          sourceRatio: note.sourceRatio,
          generation: note.generation,
          parentId: note.parentId,
          rootId: note.rootId,
          absoluteVector,
          muted: note.muted,
          volume: note.volume,
        };
      }),
      links: state.editor.links.map((link) => ({ id: link.id, aId: link.aId, bId: link.bId })),
    },
  };
  return encodeEditorPayload(payload);
}

function exportEditorLoop() {
  const code = createEditorLoopCode();
  if (els.editorTransferCode) {
    els.editorTransferCode.value = code;
    els.editorTransferCode.focus();
    els.editorTransferCode.select();
  }
  setEditorTransferStatus("exportReady", { length: code.length });
}

function createEditorLoopUrl(baseUrl = window.location.href) {
  const url = new URL(baseUrl);
  url.searchParams.set("loop", createEditorLoopCode());
  return url.toString();
}

function exportEditorLoopUrl() {
  const url = createEditorLoopUrl();
  if (els.editorTransferCode) {
    els.editorTransferCode.value = url;
    els.editorTransferCode.focus();
    els.editorTransferCode.select();
  }
  setEditorTransferStatus("urlReady", { length: url.length });
}

function formatShareTimestamp() {
  return new Date().toLocaleString(state.currentLanguage === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function shareEditorLoopToTwitter() {
  const sharedUrl = createEditorLoopUrl(productionAppUrl);
  const intentUrl = new URL("https://twitter.com/intent/tweet");
  intentUrl.searchParams.set("text", `#RationalFlow ${formatShareTimestamp()}`);
  intentUrl.searchParams.set("url", sharedUrl);
  window.open(intentUrl.toString(), "_blank", "noopener,noreferrer");
  setEditorTransferStatus("twitterReady", { length: sharedUrl.length });
}

function finiteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function applyEditorLoopCode(raw) {
  if (!raw) return;
  let payload;
  try {
    payload = decodeEditorPayload(raw);
  } catch (_) {
    setEditorTransferStatus("importInvalid");
    return false;
  }
  if (payload?.kind !== "rational-flow-editor-loop" || payload.version !== 2 || !payload.editor) {
    setEditorTransferStatus("importUnsupported");
    return false;
  }
  const editor = payload.editor;
  stopEditorLoop();
  state.workspaceMode = "editor";
  state.editor.loopLength = Math.max(0.5, finiteNumber(editor.loopLength, 8));
  state.editor.viewStart = finiteNumber(editor.viewStart, 0);
  state.editor.viewEnd = Math.max(state.editor.viewStart + 0.5, finiteNumber(editor.viewEnd, state.editor.loopLength));
  state.editor.defaultDuration = Math.max(0.1, finiteNumber(editor.defaultDuration, 2));
  state.editor.timeSnap = Math.max(0, finiteNumber(editor.timeSnap, 0.25));
  state.editor.nextEditorId = Math.max(1, Math.floor(finiteNumber(editor.nextEditorId, 1)));
  state.editor.nextEditorLinkId = Math.max(1, Math.floor(finiteNumber(editor.nextEditorLinkId, 1)));
  state.editor.ratioSource = editor.ratioSource === "single" ? "single" : "partialGrid";
  state.editor.singleRatioInput = String(editor.singleRatioInput || "3/2");
  state.editor.singleDirection = editor.singleDirection === "both" ? "both" : "above";
  state.editor.transposeAll = Boolean(editor.transposeAll);
  state.editor.gridBase = Math.max(1, Math.floor(finiteNumber(editor.gridBase, 8)));
  state.editor.gridNumeratorMin = Math.max(1, Math.floor(finiteNumber(editor.gridNumeratorMin, 8)));
  state.editor.gridNumeratorMax = Math.max(state.editor.gridNumeratorMin, Math.floor(finiteNumber(editor.gridNumeratorMax, 16)));
  state.editor.gridDirection = ["above", "under", "both"].includes(editor.gridDirection) ? editor.gridDirection : "above";
  state.editor.notes = (Array.isArray(editor.notes) ? editor.notes : []).map((note) => {
    const importedFrequency = Number(note.frequency);
    return {
      id: String(note.id || `e${state.editor.nextEditorId++}`),
      start: Math.min(Math.max(0, finiteNumber(note.start, 0)), Math.max(0, state.editor.loopLength - 0.1)),
      duration: Math.min(Math.max(0.1, finiteNumber(note.duration, state.editor.defaultDuration)), state.editor.loopLength),
      frequency: Number.isFinite(importedFrequency) && importedFrequency > 0 ? importedFrequency : null,
      ratio: String(note.ratio || ""),
      sourceRatio: String(note.sourceRatio || ""),
      baseFrequency: note.baseFrequency === null || note.baseFrequency === undefined ? null : finiteNumber(note.baseFrequency, null),
      generation: Math.max(0, Math.floor(finiteNumber(note.generation, 0))),
      parentId: note.parentId === null || note.parentId === undefined ? null : String(note.parentId),
      rootId: String(note.rootId || note.id || ""),
      absoluteVector: importVector(note.absoluteVector),
      muted: Boolean(note.muted),
      lockedPitch: true,
      volume: Math.max(0, finiteNumber(note.volume, getSettings().volume)),
      nodes: null,
    };
  });
  const noteIds = new Set(state.editor.notes.map((note) => note.id));
  state.editor.notes.forEach((note) => {
    if (!note.rootId || !noteIds.has(note.rootId)) note.rootId = note.id;
    if (note.parentId && !noteIds.has(note.parentId)) note.parentId = null;
  });
  const notesById = new Map(state.editor.notes.map((note) => [note.id, note]));
  let importFailed = false;
  state.editor.notes.forEach((note) => {
    if (importFailed || note.frequency !== null) return;
    const root = notesById.get(note.rootId);
    const exact = root?.frequency !== null ? vectorToSafeFraction(note.absoluteVector) : null;
    if (!exact) {
      importFailed = true;
      return;
    }
    note.frequency = root.frequency * exact.numerator / exact.denominator;
  });
  if (importFailed) {
    setEditorTransferStatus("importInvalid");
    state.editor.notes = [];
    state.editor.links = [];
    return false;
  }
  state.editor.notes.forEach((note) => {
    const parent = note.parentId ? notesById.get(note.parentId) : null;
    if (parent) note.baseFrequency = parent.frequency;
    else note.baseFrequency = null;
  });
  const maxNoteId = state.editor.notes.reduce((maxId, note) => {
    const match = note.id.match(/^e(\d+)$/);
    return match ? Math.max(maxId, Number(match[1])) : maxId;
  }, 0);
  state.editor.nextEditorId = Math.max(state.editor.nextEditorId, maxNoteId + 1);
  state.editor.links = (Array.isArray(editor.links) ? editor.links : [])
    .map((link) => ({ id: String(link.id || `l${state.editor.nextEditorLinkId++}`), aId: String(link.aId || ""), bId: String(link.bId || "") }))
    .filter((link) => link.aId !== link.bId && noteIds.has(link.aId) && noteIds.has(link.bId));
  const maxLinkId = state.editor.links.reduce((maxId, link) => {
    const match = link.id.match(/^l(\d+)$/);
    return match ? Math.max(maxId, Number(match[1])) : maxId;
  }, 0);
  state.editor.nextEditorLinkId = Math.max(state.editor.nextEditorLinkId, maxLinkId + 1);
  state.editor.selectedNoteIds = [];
  state.editor.selectedRelationKey = null;
  state.editor.drag = null;
  state.editor.playbackNotes = [];
  state.editor.scheduledEvents.clear();
  if (payload.settings) {
    if (Number.isFinite(Number(payload.settings.minFreq))) els.minFreq.value = String(payload.settings.minFreq);
    if (Number.isFinite(Number(payload.settings.maxFreq))) els.maxFreq.value = String(payload.settings.maxFreq);
    if (Number.isFinite(Number(payload.settings.windowSize))) els.windowSize.value = String(payload.settings.windowSize);
    if (Number.isFinite(Number(payload.settings.volume))) els.volume.value = String(payload.settings.volume);
  }
  render(true);
  setEditorTransferStatus("importDone");
  return true;
}

function importEditorLoop() {
  applyEditorLoopCode(els.editorTransferCode?.value || "");
}

function renderEditorSaveSlots() {
  for (let slot = 1; slot <= 3; slot += 1) {
    const element = document.querySelector(`#editorSlot${slot}Status`);
    if (!element) continue;
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(editorSlotStorageKey(slot)) || "null");
    } catch (_) {
      saved = null;
    }
    if (!saved?.savedAt || !saved?.code) {
      element.textContent = editorText("slotEmpty", { slot });
      continue;
    }
    const time = new Date(saved.savedAt).toLocaleString(state.currentLanguage === "ja" ? "ja-JP" : "en-US", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    element.textContent = editorText("slotSaved", { slot, time });
  }
}

function saveEditorSlot(slot) {
  localStorage.setItem(editorSlotStorageKey(slot), JSON.stringify({
    savedAt: new Date().toISOString(),
    code: createEditorLoopCode(),
  }));
  renderEditorSaveSlots();
}

function loadEditorSlot(slot) {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(editorSlotStorageKey(slot)) || "null");
  } catch (_) {
    saved = null;
  }
  if (!saved?.code) {
    setEditorTransferStatus("slotEmpty", { slot });
    return;
  }
  applyEditorLoopCode(saved.code);
}

function loadEditorLoopFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("loop");
  if (!code) return;
  if (els.editorTransferCode) els.editorTransferCode.value = code;
  if (!applyEditorLoopCode(code)) return;
  setEditorTransferStatus("urlLoaded");
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
  clearEditorClip,
  deleteSelectedEditorNotes,
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
  setEditorRatioSource,
  exportEditorLoop,
  exportEditorLoopUrl,
  shareEditorLoopToTwitter,
  importEditorLoop,
  saveEditorSlot,
  loadEditorSlot,
  syncEditorControls,
  setRatioBias,
  setSeedMode,
  setWorkspaceMode,
  start,
  startEditorLoop,
  handleCanvasPointer,
  stop,
  stopEditorLoop,
  syncWakeLock,
  toggleLanguage,
  togglePause,
  toggleEditorPause,
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
loadEditorLoopFromUrl();
