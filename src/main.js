import { els } from "./dom.js";
import { state } from "./state.js";
import { buildCandidates as buildCandidateList, chooseBase as chooseCandidateBase, chooseWeighted } from "./core/candidates.js";
import { cFrequency, nearestPitchLabel } from "./core/pitch.js";
import { clamp, randomBetween } from "./core/utils.js";
import {
  addVectors,
  approximateFraction,
  factorRatioLabel,
  fractionLabel,
  normalizeVectorsToPositive,
  parseFraction,
  positiveVectorFactorLabel,
  ratioLimitLabel,
  ratioLimitValue,
  subtractVectors,
  tryIntegerRatioFromVectors,
  vectorFactorLabel,
  vectorFromFraction,
  vectorKey,
  vectorToSafeFraction,
} from "./core/ratio-math.js";
import { readCookie, writeCookie } from "./storage/cookies.js";
import { localizedField, t } from "./i18n/i18n.js";
import { registerEventBindings } from "./ui/event-bindings.js";
import { setMobileView as applyMobileView } from "./ui/mobile-view.js";
import { diesisCollectionCookie, initialSeedDelay, tableRenderInterval } from "./config.js";

const i18nTargets = [
  ["header > div > p", "subtitle"],
  ["header .transport", "transport.label", "aria-label"],
  [".mobile-view-switch", "mobile.ariaLabel", "aria-label"],
  ["#mobileControlsView", "mobile.controls"],
  ["#mobileMainView", "mobile.main"],
  ["#mobileListView", "mobile.list"],
  ["#startStop", "transport.startStopTitle", "title"],
  ["#pauseResume", "transport.pauseTitle", "title"],
  ["#timerOpen", "labels.timer", "title"],
  ["#seedMode", "transport.seedModeTitle", "title"],
  ["#seed", "transport.seedTitle", "title"],
  ["#clear", "transport.clear"],
  ["#clear", "transport.clearTitle", "title"],
  [".controls .hint:nth-of-type(1)", "hints.fractionMode"],
  [".controls .hint:nth-of-type(2)", "hints.ratioBias"],
  ['label[for="nMax"]', "labels.numeratorMax"],
  ['label[for="dMax"]', "labels.denominatorMax"],
  ['label[for="fractionList"]', "labels.fractions"],
  ['label[for="minFreq"]', "labels.minHz"],
  ['label[for="maxFreq"]', "labels.maxHz"],
  ['label[for="minDur"]', "labels.durationMin"],
  ['label[for="maxDur"]', "labels.durationMax"],
  ['label[for="nextMin"]', "labels.nextMin"],
  ['label[for="nextMax"]', "labels.nextMax"],
  ['label[for="windowSize"]', "labels.window"],
  ['label[for="timerMinutes"]', "labels.timerMinutes"],
  ['label[for="volume"]', "labels.volume"],
  ["#allowDuplication", "labels.duplicate", "checkbox-label"],
  ["#rootedDepth", "labels.rootedDepth", "checkbox-label"],
  ["#collectionReset", "labels.resetCollection"],
  ["#detailsCollection h3", "dialogs.collectionTitle"],
  ["#detailsCollection p", "dialogs.collectionText"],
  ['label[for="parentBiasBasis"]', "labels.parentBias"],
  [".control-group small", "hints.parentBias"],
  ["#detailsOpen", "labels.settings"],
  ["#helpOpen", "labels.help"],
  ["#diesisOpen", "labels.diesis"],
  ['#globalRatioDisplay option[value="ratio"]', "dialogs.ratioMode"],
  ['#globalRatioDisplay option[value="factors"]', "dialogs.factorMode"],
  [".list-toolbar-title", "labels.timeline"],
  ["#timerDialog h2", "dialogs.timerTitle"],
  ["#timerDialog .details-head p", "dialogs.timerIntro"],
  ["#timerDialog .setting-block:nth-child(1) h3", "dialogs.timerDurationTitle"],
  ["#timerDialog .setting-block:nth-child(1) p", "dialogs.timerDurationText"],
  ["#timerDialog .setting-block:nth-child(2) h3", "dialogs.timerStatusTitle"],
  [".timer-readout div:nth-child(1) small", "labels.timer"],
  [".stats-readout div:nth-child(1) small", "labels.notes"],
  [".stats-readout div:nth-child(2) small", "labels.depth"],
  ["thead th:nth-child(1)", "table.start"],
  ["thead th:nth-child(2)", "table.hz"],
  ["thead th:nth-child(3)", "table.duration"],
  ["thead th:nth-child(4)", "table.depth"],
  ["thead th:nth-child(5)", "table.ratio"],
  ["#detailsDialog h2", "dialogs.settingsTitle"],
  ["#detailsDialog .details-head p", "dialogs.settingsIntro"],
  ["#detailsClose", "dialogs.closeTitle", "title"],
  ["#helpDialog h2", "dialogs.helpTitle"],
  ["#helpDialog .details-head p", "dialogs.helpIntro"],
  ["#helpClose", "dialogs.closeTitle", "title"],
  ["#helpTabAbout", "help.aboutTab"],
  ["#helpTabControls", "help.controlsTab"],
  ["#helpTabSettings", "help.settingsTab"],
  ["#presetsDialog h2", "dialogs.presetsTitle"],
  ["#presetsDialog .details-head p", "dialogs.presetsIntro"],
  ["#presetsClose", "dialogs.closeTitle", "title"],
  ["#presetLoad", "dialogs.loadPreset"],
  ["#diesisDialog h2", "dialogs.diesisTitle"],
  ["#diesisDialog .details-head p", "dialogs.diesisIntro"],
  ["#diesisClose", "dialogs.closeTitle", "title"],
  [".playback-group .toolbar-label", "dialogs.baseNote"],
  ['label[for="diesisLimitFilter"]', "dialogs.limitFilter"],
  ["#diesisDerivedToggle", "dialogs.showDerived", "checkbox-label"],
  ["#diesisPowerToggle", "dialogs.powerForm", "checkbox-label"],
  ['label[for="diesisCollectionFilter"]', "dialogs.collection"],
  [".display-group .toolbar-label", "dialogs.ratioDisplay"],
  ['#diesisRatioDisplay option[value="ratio"]', "dialogs.ratioMode"],
  ['#diesisRatioDisplay option[value="factors"]', "dialogs.factorMode"],
];

function timelineNow() {
  return state.isPaused && state.pausedAt !== null ? state.pausedAt : performance.now() / 1000;
}

const i18nHelpTargets = [
  ["#detailsDialog .setting-block:nth-child(1) h3", "dialogs.parentBiasTitle"],
  ["#detailsDialog .setting-block:nth-child(1) p", "dialogs.parentBiasText"],
  ["#detailsDialog .setting-block:nth-child(2) h3", "dialogs.biasStructureTitle"],
  ["#detailsDialog .setting-block:nth-child(2) p", "dialogs.biasStructureText"],
  ["#detailsDialog .setting-block:nth-child(3) h3", "dialogs.ratioSourceTitle"],
  ["#detailsDialog .setting-block:nth-child(3) p", "dialogs.ratioSourceText"],
  ["#detailsDialog .setting-block:nth-child(4) h3", "dialogs.timingTitle"],
  ["#detailsDialog .setting-block:nth-child(4) p", "dialogs.timingText"],
  ["#detailsDialog .setting-block:nth-child(5) h3", "dialogs.vibratoTitle"],
  ["#detailsDialog .setting-block:nth-child(5) p", "dialogs.vibratoText"],
  ["#vibratoEnabled", "labels.vibratoEnabled", "checkbox-label"],
  [".vibrato-hint", "hints.vibrato"],
  ['label[for="vibratoRateMin"]', "labels.vibratoRateMin"],
  ['label[for="vibratoRateMax"]', "labels.vibratoRateMax"],
  ['label[for="vibratoDepthMin"]', "labels.vibratoDepthMin"],
  ['label[for="vibratoDepthMax"]', "labels.vibratoDepthMax"],
  ['label[for="ratioIntegerLimit"]', "labels.ratioIntegerLimit"],
  [".ratio-limit-hint", "hints.ratioIntegerLimit"],
  ["#helpAppOverview h3", "help.appTitle"],
  ["#helpAppOverview p", "help.appText"],
  ["#helpTerms h3", "help.termsTitle"],
  ["#helpTerms li:nth-child(1) span", "help.termSeed"],
  ["#helpTerms li:nth-child(2) span", "help.termDrone"],
  ["#helpTerms li:nth-child(3) span", "help.termParent"],
  ["#helpTerms li:nth-child(4) span", "help.termChild"],
  ["#helpTerms li:nth-child(5) span", "help.termRatio"],
  ["#helpTerms li:nth-child(6) span", "help.termTree"],
  ["#helpTerms li:nth-child(7) span", "help.termDepth"],
  ["#helpBasicFlow h3", "help.basicTitle"],
  ["#helpBasicFlow p", "help.basicText"],
  ["#helpCanvas h3", "help.canvasTitle"],
  ["#helpCanvas p", "help.canvasText"],
  ["#helpTransport h3", "help.transportTitle"],
  ["#helpTransport li:nth-child(1) span", "help.play"],
  ["#helpTransport li:nth-child(2) span", "help.pause"],
  ["#helpTransport li:nth-child(3) span", "help.stop"],
  ["#helpTransport li:nth-child(4) span", "help.clear"],
  ["#helpSeedDroneControl h3", "help.seedDroneTitle"],
  ["#helpSeedDroneControl p", "help.seedDrone"],
  ["#helpPlusControl h3", "help.plusTitle"],
  ["#helpPlusControl p", "help.plus"],
  ["#helpCanvasTapControl h3", "help.canvasTapTitle"],
  ["#helpCanvasTapControl p", "help.canvasTap"],
  ["#helpRatioSource h3", "dialogs.ratioSourceTitle"],
  ["#helpRatioSource li:nth-child(1) span", "help.ratioAuto"],
  ["#helpRatioSource li:nth-child(2) span", "help.ratioList"],
  ["#helpRatioSource li:nth-child(3) span", "help.ratioNumerator"],
  ["#helpRatioSource li:nth-child(4) span", "help.ratioDenominator"],
  ["#helpRatioSource li:nth-child(5) span", "help.ratioSimple"],
  ["#helpRatioSource li:nth-child(6) span", "help.ratioComplex"],
  ["#helpRatioSource li:nth-child(7) span", "help.ratioLinear"],
  ["#helpRatioSource li:nth-child(8) span", "help.ratioExponential"],
  ["#helpRatioSource li:nth-child(9) span", "help.ratioEqual"],
  ["#helpPitchRange h3", "help.pitchRangeTitle"],
  ["#helpPitchRange li:nth-child(1) span", "help.minHz"],
  ["#helpPitchRange li:nth-child(2) span", "help.maxHz"],
  ["#helpPitchRange li:nth-child(3) span", "help.volume"],
  ["#helpTiming h3", "dialogs.timingTitle"],
  ["#helpTiming li:nth-child(1) span", "help.timingDurationMin"],
  ["#helpTiming li:nth-child(2) span", "help.timingDurationMax"],
  ["#helpTiming li:nth-child(3) span", "help.timingNextMin"],
  ["#helpTiming li:nth-child(4) span", "help.timingNextMax"],
  ["#helpTiming li:nth-child(5) span", "help.timingWindow"],
  ["#helpParentBias h3", "dialogs.parentBiasTitle"],
  ["#helpParentBias li:nth-child(1) span", "help.parentEqual"],
  ["#helpParentBias li:nth-child(2) span", "help.parentDepth"],
  ["#helpParentBias li:nth-child(3) span", "help.parentRooted"],
  ["#helpParentBias li:nth-child(4) span", "help.parentTime"],
  ["#helpParentBias li:nth-child(5) span", "help.parentLinear"],
  ["#helpParentBias li:nth-child(6) span", "help.parentExponential"],
  ["#helpParentBias li:nth-child(7) span", "help.parentStrength"],
  ["#helpVibrato h3", "dialogs.vibratoTitle"],
  ["#helpVibrato p", "help.vibratoText"],
  ["#helpDepth h3", "help.depthTitle"],
  ["#helpDepth p", "help.depthText"],
  ["#helpActiveRatio h3", "help.activeRatioTitle"],
  ["#helpActiveRatio p", "help.activeRatioText"],
  ["#helpDiesisMarker h3", "help.diesisTitle"],
  ["#helpDiesisMarker p", "help.diesisText"],
  ["#helpTable h3", "help.tableTitle"],
  ["#helpTable li:nth-child(1) span", "help.tableStart"],
  ["#helpTable li:nth-child(2) span", "help.tableHz"],
  ["#helpTable li:nth-child(3) span", "help.tableDur"],
  ["#helpTable li:nth-child(4) span", "help.tableDepth"],
  ["#helpTable li:nth-child(5) span", "help.tableRatio"],
];
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

function loadDiesisCollection() {
  const raw = readCookie(diesisCollectionCookie);
  state.discoveredDiesisCounts = new Map();
  raw
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => {
      const [indexPart, countPart] = part.split(":");
      const index = parseInt(indexPart, 36);
      const count = countPart ? parseInt(countPart, 36) : 1;
      if (Number.isInteger(index) && index >= 0) {
        state.discoveredDiesisCounts.set(index, Math.max(1, Number.isInteger(count) ? count : 1));
      }
    });
}

function saveDiesisCollection() {
  const value = [...state.discoveredDiesisCounts.entries()]
    .sort(([a], [b]) => a - b)
    .map(([index, count]) => `${index.toString(36)}:${count.toString(36)}`)
    .join(".");
  writeCookie(diesisCollectionCookie, value);
}

function resetDiesisCollection() {
  state.discoveredDiesisCounts = new Map();
  saveDiesisCollection();
  if (els.diesisDialog.open) renderDiesisList();
}

function diesisIndex(entry) {
  return state.namedCommaIntervals.indexOf(entry);
}

function markDiesisDiscovered(entry) {
  const index = diesisIndex(entry);
  if (index < 0) return;
  state.discoveredDiesisCounts.set(index, (state.discoveredDiesisCounts.get(index) || 0) + 1);
  saveDiesisCollection();
  if (els.diesisDialog.open) renderDiesisList();
}

function setHelpPage(page) {
  document.querySelectorAll("[data-help-page]").forEach((element) => {
    const isTarget = element.dataset.helpPage === page;
    if (element.classList.contains("help-block")) {
      element.classList.toggle("hidden", !isTarget);
    } else if (element.tagName === "BUTTON") {
      element.classList.toggle("active", isTarget);
      element.setAttribute("aria-selected", String(isTarget));
    }
  });
}

function ratioDisplayFromVector(vector, preferredMode = state.diesisRatioDisplay) {
  if (preferredMode !== "factors") {
    const frac = vectorToSafeFraction(vector);
    if (frac) return fractionLabel(frac);
  }
  return vectorFactorLabel(vector);
}

function diesisRatioLabel(entry) {
  if (state.diesisRatioDisplay === "factors") {
    if (state.diesisShowPower && entry.display?.powerFactors) return entry.display.powerFactors;
    return entry.display?.factors || factorRatioLabel(entry.ratio);
  }
  if (state.diesisShowPower && entry.display?.powerRatio) return entry.display.powerRatio;
  return entry.display?.ratio || entry.ratio;
}

function installNamedCommas(data) {
  if (!data?.intervals) return false;
  state.namedCommaIntervals = data.intervals;
  state.namedCommaByVectorKey = new Map();
  data.intervals.forEach((entry) => {
    const frac = parseFraction(entry.ratio);
    if (!frac) return;
    const key = vectorKey(vectorFromFraction(frac));
    state.namedCommaByVectorKey.set(key, entry);
  });
  loadDiesisCollection();
  if (els.diesisDialog.open) {
    renderDiesisControls();
    renderDiesisList();
  }
  return true;
}

async function loadNamedCommas() {
  const hasFallback = installNamedCommas(window.NAMED_COMMAS_DATA);
  if (hasFallback) render();
  try {
    const response = await fetch("named_commas.json");
    if (!response.ok) throw new Error("named commas unavailable");
    const data = await response.json();
    if (installNamedCommas(data)) render();
  } catch (_) {
    // The generated JS fallback is installed before fetch, so direct file opening still works.
    if (!hasFallback && installNamedCommas(window.NAMED_COMMAS_DATA)) render();
  }
}

function installRatioPresets(data) {
  if (!data?.presets?.length) return false;
  state.ratioPresets = data.presets;
  state.selectedPresetId = state.ratioPresets[0]?.id || "";
  renderPresetBrowser();
  return true;
}

async function loadRatioPresets() {
  try {
    const response = await fetch("ratio_presets.json");
    if (!response.ok) throw new Error("ratio presets unavailable");
    const data = await response.json();
    installRatioPresets(data);
  } catch (_) {
    installRatioPresets(window.RATIO_PRESETS_DATA);
  }
}

function relativeVectorForActiveNote(note, base) {
  if (note.absoluteVector && base.absoluteVector && note.rootId === base.rootId) {
    return subtractVectors(note.absoluteVector, base.absoluteVector);
  }
  return vectorFromFraction(approximateFraction(note.frequency / base.frequency));
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

function ensureAudio() {
  if (!state.audioContext) state.audioContext = new AudioContext();
  return state.audioContext;
}

function scheduleAudio(note) {
  if (note.nodes) return;
  const settings = getSettings();
  const ctx = ensureAudio();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  let vibratoOscillator = null;
  let vibratoGain = null;
  const startAt = Math.max(ctx.currentTime + 0.01, note.start - performance.now() / 1000 + ctx.currentTime);
  const isDrone = !Number.isFinite(note.duration);
  const attack = isDrone ? 0.45 : Math.min(0.5, note.duration * 0.2);
  const releaseStart = startAt + note.duration * 0.3;
  const endAt = startAt + note.duration;

  oscillator.type = "triangle";
  oscillator.frequency.value = note.frequency;
  if (settings.vibratoEnabled && settings.vibratoRateMax > 0 && settings.vibratoDepthMax > 0) {
    const rate = randomBetween(settings.vibratoRateMin, settings.vibratoRateMax);
    const depth = randomBetween(settings.vibratoDepthMin, settings.vibratoDepthMax);
    if (rate > 0 && depth > 0) {
      vibratoOscillator = ctx.createOscillator();
      vibratoGain = ctx.createGain();
      vibratoOscillator.type = "sine";
      vibratoOscillator.frequency.value = rate;
      vibratoGain.gain.value = depth;
      vibratoOscillator.connect(vibratoGain).connect(oscillator.detune);
      vibratoOscillator.start(startAt);
    }
  }
  gain.gain.value = 0;
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(note.volume, startAt + attack);
  if (!isDrone) {
    gain.gain.setValueAtTime(note.volume, releaseStart);
    gain.gain.linearRampToValueAtTime(0, endAt);
  }
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(startAt);
  note.nodes = { oscillator, gain, startAt, vibratoOscillator, vibratoGain };
  oscillator.onended = () => {
    if (vibratoOscillator) {
      try {
        vibratoOscillator.stop();
      } catch (_) {
        // The vibrato oscillator may already have been stopped explicitly.
      }
      vibratoOscillator.disconnect();
    }
    if (vibratoGain) vibratoGain.disconnect();
    oscillator.disconnect();
    gain.disconnect();
    if (note.nodes?.oscillator === oscillator) {
      note.nodes = null;
    }
  };
}

function scheduleVisibleAudio(now = performance.now() / 1000) {
  state.notes.forEach((note) => {
    const endsAfterNow = !Number.isFinite(note.duration) || note.start + note.duration > now;
    if (endsAfterNow && !note.nodes) scheduleAudio(note);
  });
}

function cancelFutureAudio(now = performance.now() / 1000) {
  state.notes.forEach((note) => {
    if (note.start > now && note.nodes) stopNode(note, 0.03);
  });
}

function holdActiveAudio(now = performance.now() / 1000) {
  if (!state.audioContext) return;
  const audioNow = state.audioContext.currentTime;
  state.notes.forEach((note) => {
    const isActive = note.start <= now && (!Number.isFinite(note.duration) || note.start + note.duration > now);
    if (!isActive || !note.nodes) return;
    const heldGain = Math.max(0, estimatedGainAt(note, now));
    const gainParam = note.nodes.gain.gain;
    gainParam.cancelScheduledValues(audioNow);
    gainParam.setValueAtTime(heldGain, audioNow);
    note.nodes.pausedHold = true;
  });
}

function resumeHeldAudio(now = performance.now() / 1000) {
  if (!state.audioContext) return;
  const audioNow = state.audioContext.currentTime;
  state.notes.forEach((note) => {
    if (!note.nodes?.pausedHold) return;
    note.nodes.pausedHold = false;
    const gainParam = note.nodes.gain.gain;
    const currentGain = Math.max(0, estimatedGainAt(note, now));
    gainParam.cancelScheduledValues(audioNow);
    gainParam.setValueAtTime(currentGain, audioNow);

    if (!Number.isFinite(note.duration)) {
      gainParam.linearRampToValueAtTime(note.volume, audioNow + 0.12);
      return;
    }

    const releaseStart = note.start + note.duration * 0.3;
    const end = note.start + note.duration;
    if (end <= now) {
      gainParam.linearRampToValueAtTime(0, audioNow + 0.05);
      return;
    }

    if (releaseStart > now) {
      gainParam.linearRampToValueAtTime(note.volume, audioNow + 0.12);
      gainParam.setValueAtTime(note.volume, audioNow + (releaseStart - now));
    }
    gainParam.linearRampToValueAtTime(0, audioNow + (end - now));
  });
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

function estimatedGainAt(note, time) {
  if (time < note.start) return 0;
  if (!Number.isFinite(note.duration)) return note.volume;
  const attack = Math.min(0.5, note.duration * 0.2);
  const elapsed = time - note.start;
  if (elapsed < attack) return note.volume * clamp(elapsed / Math.max(0.001, attack), 0, 1);
  if (elapsed < note.duration * 0.3) return note.volume;
  const releaseSpan = Math.max(0.001, note.duration * 0.7);
  return note.volume * clamp(1 - ((elapsed - note.duration * 0.3) / releaseSpan), 0, 1);
}

function stopNode(note, fadeSeconds = 0.45) {
  if (!note.nodes || !state.audioContext) return;
  const nodes = note.nodes;
  const audioNow = state.audioContext.currentTime;
  const wallNow = performance.now() / 1000;
  const gainParam = nodes.gain.gain;
  try {
    if (note.start > wallNow + 0.02) {
      gainParam.cancelScheduledValues(audioNow);
      gainParam.setValueAtTime(0, audioNow);
      nodes.oscillator.stop(audioNow + 0.01);
      if (nodes.vibratoOscillator) nodes.vibratoOscillator.stop(audioNow + 0.01);
      note.nodes = null;
      return;
    }

    if (typeof gainParam.cancelAndHoldAtTime === "function") {
      gainParam.cancelAndHoldAtTime(audioNow);
    } else {
      gainParam.cancelScheduledValues(audioNow);
      gainParam.setValueAtTime(estimatedGainAt(note, wallNow), audioNow);
    }
    gainParam.linearRampToValueAtTime(0, audioNow + fadeSeconds);
    nodes.oscillator.stop(audioNow + fadeSeconds + 0.03);
    if (nodes.vibratoOscillator) nodes.vibratoOscillator.stop(audioNow + fadeSeconds + 0.03);
  } catch (_) {
    // The node may have finished naturally.
  }
  note.nodes = null;
}

function diesisFrequencies(ratio, mode = "normal") {
  const frac = parseFraction(ratio);
  if (!frac) return [];
  const baseFrequency = cFrequency(state.diesisBaseOctave);
  const upperFrequency = baseFrequency * (frac.numerator / frac.denominator);
  const frequencies = [
    { frequency: baseFrequency, gain: 1 },
    { frequency: upperFrequency, gain: 1 },
  ];
  if (mode === "difference") {
    const diff = Math.abs(upperFrequency - baseFrequency);
    if (diff > 0) frequencies.push({ frequency: diff, gain: 0.8 });
  }
  return frequencies;
}

function isDifferenceAudible(ratio) {
  const frequencies = diesisFrequencies(ratio, "difference");
  const difference = frequencies.at(-1)?.frequency || 0;
  return frequencies.length < 3 || difference >= 20;
}

function previewDiesisInterval(ratio, mode = "normal") {
  const frequencies = diesisFrequencies(ratio, mode).filter((item) => item.frequency >= 20);
  if (!frequencies.length) return;
  const ctx = ensureAudio();
  ctx.resume();
  const startAt = ctx.currentTime + 0.02;
  const duration = 2;
  const attack = 0.14;
  const release = 0.34;
  const settings = getSettings();
  const level = Math.min(0.035, Math.max(0.008, settings.volume || 0.025));

  frequencies.forEach((item) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = item.frequency;
    gain.gain.setValueAtTime(0, startAt);
    gain.gain.linearRampToValueAtTime(level * item.gain, startAt + attack);
    gain.gain.setValueAtTime(level * item.gain, startAt + duration - release);
    gain.gain.linearRampToValueAtTime(0, startAt + duration);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.03);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  });
}

function previewFrequency(frequency) {
  if (!Number.isFinite(frequency) || frequency < 20) return;
  const ctx = ensureAudio();
  ctx.resume();
  const startAt = ctx.currentTime + 0.02;
  const duration = 1;
  const attack = 0.06;
  const release = 0.22;
  const settings = getSettings();
  const level = Math.min(0.04, Math.max(0.01, settings.volume * 1.25 || 0.025));
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(level, startAt + attack);
  gain.gain.setValueAtTime(level, startAt + duration - release);
  gain.gain.linearRampToValueAtTime(0, startAt + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.03);
  oscillator.onended = () => {
    oscillator.disconnect();
    gain.disconnect();
  };
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

function activeAt(time) {
  return state.notes.filter((note) => note.start <= time && note.start + note.duration >= time);
}

function seedNote(offset = 2, durationOverride = null, frequencyOverride = null) {
  const settings = getSettings();
  const frequency = frequencyOverride ?? randomBetween(settings.minFreq, settings.maxFreq);
  const duration = durationOverride ?? (state.seedMode === "drone" ? Infinity : randomBetween(settings.minDur, settings.maxDur));
  return addNote(frequency, duration, performance.now() / 1000 + offset, "", null, 0, null, new Map(), null);
}

function frequencyFromCanvasY(clientY) {
  const rect = els.visualizer.getBoundingClientRect();
  const settings = getSettings();
  const minLog = Math.log2(settings.minFreq * 0.94);
  const maxLog = Math.log2(settings.maxFreq * 1.04);
  const y = clamp(clientY - rect.top, 44, rect.height - 44);
  const normalized = (rect.height - 44 - y) / Math.max(1, rect.height - 88);
  return clamp(2 ** (minLog + normalized * (maxLog - minLog)), settings.minFreq, settings.maxFreq);
}

function canvasMetrics() {
  const rect = els.visualizer.getBoundingClientRect();
  const settings = getSettings();
  const now = timelineNow();
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

function noteAtCanvasPoint(clientX, clientY) {
  const { rect, xOf, yOf } = canvasMetrics();
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

function rightEdgeOffset() {
  return getSettings().windowSize / 2;
}

function hasDuplicateFrequency(frequency, atTime) {
  return activeAt(atTime).some((note) => Math.abs(note.frequency - frequency) < 0.001);
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

function sampleEventWait(settings) {
  const mean = (settings.nextMin + settings.nextMax) / 2;
  const exponential = -Math.log(Math.max(0.000001, 1 - Math.random())) * mean;
  return clamp(exponential, settings.nextMin, settings.nextMax);
}

function firstSeedReadyTime(now) {
  if (state.notes.some((note) => note.generation > 0)) return now;
  const living = state.notes.filter((note) => note.start + note.duration >= now);
  if (!living.length) return Infinity;
  return Math.min(...living.map((note) => Math.max(now, note.start + initialSeedDelay)));
}

function fillEventQueue() {
  const settings = getSettings();
  const now = performance.now() / 1000;
  if (state.timerEndTime !== null && now >= state.timerEndTime) {
    finishTimedRun();
    return;
  }
  const horizon = now + rightEdgeOffset();
  const readyAt = firstSeedReadyTime(now);
  if (!Number.isFinite(readyAt)) return;
  if (state.nextEventTime === null || state.nextEventTime < now) {
    state.nextEventTime = Math.max(now, readyAt) + sampleEventWait(settings);
  }

  let guard = 0;
  while (state.nextEventTime <= horizon && guard < 64) {
    if (state.timerEndTime !== null && state.nextEventTime >= state.timerEndTime) break;
    if (Math.random() <= generationProbabilityAt(state.nextEventTime)) {
      addGeneratedChild(state.nextEventTime);
    }
    state.nextEventTime += sampleEventWait(settings);
    guard += 1;
  }
}

function generationProbabilityAt(time) {
  if (state.timerEndTime === null) return 1;
  const total = Math.max(1, state.timerEndTime - state.startTime);
  const remaining = clamp((state.timerEndTime - time) / total, 0, 1);
  return remaining;
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
  const settings = getSettings();
  const living = state.notes.filter((note) => note.start + note.duration >= now);
  if (!living.length) return;
  const minGeneration = Math.min(...living.map((note) => note.generation));
  if (minGeneration <= 0) return;
  if (settings.rootedDepth) {
    normalizeRootedGenerations(living, settings);
    return;
  }
  state.notes.forEach((note) => {
    note.generation = Math.max(0, note.generation - minGeneration);
  });
}

function normalizeRootedGenerations(living, settings) {
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

function descendantIds(rootId) {
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

function exactRatioBetween(low, high) {
  if (!low.absoluteVector || !high.absoluteVector || low.rootId !== high.rootId) return null;
  return subtractVectors(high.absoluteVector, low.absoluteVector);
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

function closePairLabel(pair) {
  const base = `${pair.ratio}  ${pair.cents.toFixed(1)}¢`;
  return pair.namedInterval ? `${pair.namedInterval.name}  ${base}` : base;
}

function rectsOverlap(a, b, padding = 4) {
  return !(
    a.x + a.width + padding < b.x ||
    b.x + b.width + padding < a.x ||
    a.y + a.height + padding < b.y ||
    b.y + b.height + padding < a.y
  );
}

function placeMarkerLabel(x, y, width, height, canvasWidth, canvasHeight, occupiedRects, index) {
  const offsets = [
    [24, 0],
    [-24, 0],
    [24, -30],
    [-24, -30],
    [24, 30],
    [-24, 30],
    [72, 0],
    [-72, 0],
    [72, -34],
    [-72, -34],
    [72, 34],
    [-72, 34],
  ];

  for (let i = 0; i < offsets.length; i += 1) {
    const [dx, dy] = offsets[(i + index) % offsets.length];
    const side = dx >= 0 ? 1 : -1;
    const left = clamp(x + dx + (side > 0 ? 0 : -width), 4, canvasWidth - width - 4);
    const top = clamp(y + dy - height / 2, 4, canvasHeight - height - 58);
    const rect = { x: left, y: top, width, height };
    if (!occupiedRects.some((other) => rectsOverlap(rect, other))) {
      occupiedRects.push(rect);
      return rect;
    }
  }

  const fallback = {
    x: clamp(x + 24, 4, canvasWidth - width - 4),
    y: clamp(y + index * (height + 4) - height / 2, 4, canvasHeight - height - 58),
    width,
    height,
  };
  occupiedRects.push(fallback);
  return fallback;
}

function activeRatioText(now = timelineNow()) {
  if (!state.isRunning && !state.isPaused && !state.isDraining) return `${t("status.activeRatio")}: ---`;
  const active = activeAt(now).sort((a, b) => a.frequency - b.frequency);
  if (!active.length) return `${t("status.activeRatio")}: ---`;
  const base = active[0];
  const vectors = active.map((note) => relativeVectorForActiveNote(note, base));
  if (state.diesisRatioDisplay !== "factors") {
    const integers = tryIntegerRatioFromVectors(vectors);
    if (integers) return `${t("status.activeRatio")}: ${integers.join(" : ")}`;
  }
  const sameRoot = active.every((note) => note.absoluteVector && note.rootId === base.rootId);
  const factorVectors = sameRoot ? active.map((note) => note.absoluteVector) : vectors;
  const labels = normalizeVectorsToPositive(factorVectors).map(positiveVectorFactorLabel);
  return `${t("status.activeRatio")}: ${labels.join(" : ")}`;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  const r = Math.min(radius, width / 2, height / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function fitCanvasText(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  const suffix = "...";
  let low = 0;
  let high = text.length;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    const candidate = `${text.slice(0, mid)}${suffix}`;
    if (ctx.measureText(candidate).width <= maxWidth) low = mid;
    else high = mid - 1;
  }
  return `${text.slice(0, low)}${suffix}`;
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

function estimatePastFillerRows(upcomingRows, playingRows, pastRows) {
  const tableWrap = els.noteRows?.closest(".event-table-wrap");
  if (!tableWrap) return 0;
  const headerHeight = 29;
  const rowHeight = 33;
  const groupHeaders = 3;
  const usedHeight = groupHeaders * headerHeight + (upcomingRows + playingRows + pastRows) * rowHeight;
  const rect = tableWrap.getBoundingClientRect();
  const viewportFallback = Math.max(0, window.innerHeight - rect.top - 1);
  const availableHeight = Math.max(tableWrap.clientHeight, rect.height, viewportFallback);
  return Math.max(0, Math.ceil((availableHeight - usedHeight) / rowHeight));
}

function renderTable() {
  const now = timelineNow();
  const settings = getSettings();
  const leftEdgeTime = now - settings.windowSize / 2;
  const visible = state.notes.filter((note) => note.start + note.duration >= leftEdgeTime);
  const allUpcoming = visible
    .filter((note) => note.start > now)
    .sort((a, b) => a.start - b.start);
  const upcoming = allUpcoming.slice(0, 7).sort((a, b) => b.start - a.start);
  const active = visible
    .filter((note) => note.start <= now && note.start + note.duration >= now)
    .sort((a, b) => b.frequency - a.frequency);
  const past = visible
    .filter((note) => note.start + note.duration < now)
    .sort((a, b) => (b.start + b.duration) - (a.start + a.duration));
  const commaNoteIds = new Set(findCloseActivePairs(active).flatMap((pair) => [pair.low.id, pair.high.id]));
  const upcomingRows = Math.max(7, upcoming.length);
  const playingRows = Math.max(15, active.length);
  const pastMinRows = Math.max(0, estimatePastFillerRows(upcomingRows, playingRows, past.length));

  els.noteRows.textContent = "";
  const fragment = document.createDocumentFragment();
  appendEventGroup(fragment, t("table.upcoming"), upcoming, now, "upcoming", { minRows: 7, total: allUpcoming.length, commaNoteIds, alignBottom: true });
  appendEventGroup(fragment, t("table.playing"), active, now, "playing", { minRows: 15, commaNoteIds });
  appendEventGroup(fragment, t("table.past"), past, now, "past", { minRows: pastMinRows, commaNoteIds });
  els.noteRows.appendChild(fragment);
}

function appendEventGroup(fragment, label, items, now, rowState, options = {}) {
  const header = document.createElement("tr");
  header.className = `group-row ${rowState}`;
  const total = options.total ?? items.length;
  const countLabel = total === items.length ? String(items.length) : `${items.length}/${total}`;
  header.innerHTML = `<td colspan="5">${label}<span>${countLabel}</span></td>`;
  fragment.appendChild(header);

  const appendEmptyRow = () => {
    const tr = document.createElement("tr");
    tr.className = `event-row ${rowState} empty`;
    tr.innerHTML = "<td>&nbsp;</td><td></td><td></td><td></td><td></td>";
    fragment.appendChild(tr);
  };
  const minRows = options.minRows || 0;
  const emptyRows = Math.max(0, minRows - items.length);
  if (options.alignBottom) {
    for (let i = 0; i < emptyRows; i += 1) appendEmptyRow();
  }

  items.forEach((note) => {
    const tr = document.createElement("tr");
    const isCommaHit = options.commaNoteIds?.has(note.id);
    const isSeed = !note.ratio;
    tr.className = `event-row ${rowState}${isSeed ? " seed" : ""}${note.id === state.selectedNoteId ? " active" : ""}${isCommaHit ? " comma-hit" : ""}`;
    tr.title = "Preview this note";
    const start = note.start - now;
    tr.innerHTML = `
      <td>${start >= 0 ? "+" : ""}${start.toFixed(1)}</td>
      <td>${note.frequency.toFixed(1)}</td>
      <td>${Number.isFinite(note.duration) ? note.duration.toFixed(1) : "Drone"}</td>
      <td>${note.generation}</td>
      <td>${note.ratio || "---"}</td>
    `;
    tr.addEventListener("click", () => {
      state.selectedNoteId = note.id;
      previewFrequency(note.frequency);
      render(true);
    });
    fragment.appendChild(tr);
  });

  if (!options.alignBottom) {
    for (let i = 0; i < emptyRows; i += 1) appendEmptyRow();
  }
}

function renderPresetBrowser() {
  if (!els.presetList) return;
  els.presetList.textContent = "";
  const fragment = document.createDocumentFragment();
  state.ratioPresets.forEach((preset) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = preset.id === state.selectedPresetId ? "preset-item active" : "preset-item";
    button.textContent = localizedField(preset.name);
    button.addEventListener("click", () => {
      state.selectedPresetId = preset.id;
      renderPresetBrowser();
    });
    fragment.appendChild(button);
  });
  els.presetList.appendChild(fragment);

  const selected = state.ratioPresets.find((preset) => preset.id === state.selectedPresetId) || state.ratioPresets[0];
  if (!selected) {
    els.presetName.textContent = "---";
    els.presetDescription.textContent = "---";
    els.presetRatios.value = "";
    els.presetLoad.disabled = true;
    return;
  }

  els.presetLoad.disabled = false;
  els.presetName.textContent = localizedField(selected.name);
  els.presetDescription.textContent = localizedField(selected.description);
  els.presetRatios.value = selected.ratios.join(", ");
}

function loadSelectedPreset() {
  const selected = state.ratioPresets.find((preset) => preset.id === state.selectedPresetId);
  if (!selected) return;
  els.fractionList.value = selected.ratios.join(", ");
  setMode("list");
  els.presetsDialog.close();
  render(true);
}

function renderDiesisControls() {
  if (!els.diesisBaseControls) return;
  els.diesisBaseControls.textContent = "";
  for (let octave = 3; octave <= 9; octave += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `C${octave}`;
    button.className = octave === state.diesisBaseOctave ? "active" : "";
    button.addEventListener("click", () => {
      state.diesisBaseOctave = octave;
      renderDiesisControls();
      renderDiesisList();
    });
    els.diesisBaseControls.appendChild(button);
  }
  els.globalRatioDisplay.value = state.diesisRatioDisplay;
  els.diesisRatioDisplay.value = state.diesisRatioDisplay;
  els.diesisDerivedToggle.checked = state.diesisShowDerived;
  els.diesisPowerToggle.checked = state.diesisShowPower;
  els.diesisCollectionFilter.value = state.diesisCollectionFilter;
  els.diesisLimitFilter.value = Number.isFinite(state.diesisLimitFilter) ? String(state.diesisLimitFilter) : "all";
}

function renderDiesisList() {
  if (!els.diesisList) return;
  els.diesisList.textContent = "";
  const fragment = document.createDocumentFragment();
  const visibleBase = state.namedCommaIntervals
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => ratioLimitValue(entry.ratio) <= state.diesisLimitFilter)
    .filter(({ entry }) => state.diesisShowDerived || entry.source !== "derived");
  const discoveredVisible = visibleBase.filter(({ index }) => state.discoveredDiesisCounts.has(index)).length;
  els.diesisCollectionStats.textContent = `${discoveredVisible} / ${visibleBase.length}`;
  visibleBase
    .filter(({ index }) => {
      if (state.diesisCollectionFilter === "seen") return state.discoveredDiesisCounts.has(index);
      if (state.diesisCollectionFilter === "unseen") return !state.discoveredDiesisCounts.has(index);
      return true;
    })
    .map(({ entry }) => entry)
    .sort((a, b) => b.cents - a.cents)
    .forEach((entry) => {
      const discoveryCount = state.discoveredDiesisCounts.get(diesisIndex(entry)) || 0;
      const discovered = discoveryCount > 0;
      const row = document.createElement("div");
      row.className = `diesis-item${discovered ? " discovered" : ""}`;
      const actions = document.createElement("div");
      actions.className = "diesis-actions";
      [
        ["normal", "▶", t("dialogs.playIntervalTitle")],
        ["difference", "Δ", t("dialogs.playDifferenceTitle")],
      ].forEach(([mode, label, title]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "diesis-play";
        if (mode === "difference" && !isDifferenceAudible(entry.ratio)) button.classList.add("warning");
        button.textContent = label;
        button.title = title;
        button.addEventListener("click", () => previewDiesisInterval(entry.ratio, mode));
        actions.appendChild(button);
      });
      const cents = document.createElement("span");
      cents.className = "diesis-cents";
      cents.textContent = `${Number(entry.cents).toFixed(2)}¢`;
      const ratio = document.createElement("span");
      ratio.className = "diesis-ratio";
      ratio.textContent = diesisRatioLabel(entry);
      const limit = document.createElement("span");
      limit.className = "diesis-limit";
      limit.textContent = ratioLimitLabel(entry.ratio);
      const name = document.createElement("span");
      name.className = "diesis-name";
      name.textContent = entry.name;
      const star = document.createElement("span");
      star.className = "diesis-star";
      if (discovered) {
        const starIcon = document.createElement("span");
        starIcon.setAttribute("aria-hidden", "true");
        starIcon.textContent = "⭐️";
        const count = document.createElement("small");
        count.textContent = String(discoveryCount);
        star.append(starIcon, count);
      }
      row.append(actions, cents, ratio, limit, name, star);
      fragment.appendChild(row);
    });
  els.diesisList.appendChild(fragment);
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
  els.activeRatioLabel.textContent = activeRatioText();
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
  if (state.timerEndTime === null) return "";
  const remaining = Math.max(0, state.timerEndTime - timelineNow());
  const minutes = Math.floor(remaining / 60);
  const seconds = Math.floor(remaining % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function timerStatusText() {
  if (state.timerCompleted) return "Done";
  const countdown = timerCountdownText();
  if (!countdown) return "No Timer Set";
  return `${countdown} left`;
}

function timerBadgeText() {
  if (state.timerCompleted) return "Done";
  return timerCountdownText() || "OFF";
}

function setMobileToolsOpen(open) {
  const isOpen = Boolean(open);
  const transport = document.querySelector(".transport");
  if (!transport || !els.mobileToolsToggle) return;
  transport.dataset.toolsOpen = String(isOpen);
  els.mobileToolsToggle.setAttribute("aria-expanded", String(isOpen));
  els.mobileToolsToggle.textContent = isOpen ? "Less ▴" : "More ▾";
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

function shouldHoldWakeLock() {
  return (state.isRunning || state.isPaused || state.isDraining) && !state.timerCompleted;
}

async function requestWakeLock() {
  if (state.wakeLockSentinel || state.wakeLockRequestPending) return;
  if (!("wakeLock" in navigator) || document.visibilityState !== "visible") return;
  state.wakeLockRequestPending = true;
  try {
    state.wakeLockSentinel = await navigator.wakeLock.request("screen");
    state.wakeLockSentinel.addEventListener("release", () => {
      state.wakeLockSentinel = null;
      if (shouldHoldWakeLock() && document.visibilityState === "visible") {
        window.setTimeout(requestWakeLock, 0);
      }
    });
  } catch (_) {
    state.wakeLockSentinel = null;
  } finally {
    state.wakeLockRequestPending = false;
  }
}

function releaseWakeLock() {
  const sentinel = state.wakeLockSentinel;
  state.wakeLockSentinel = null;
  if (sentinel) sentinel.release().catch(() => {});
}

function syncWakeLock() {
  if (shouldHoldWakeLock()) requestWakeLock();
  else releaseWakeLock();
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
  const previousValue = els.parentBiasDirection.value === "none" ? "low" : els.parentBiasDirection.value;
  const isTime = els.parentBiasBasis.value === "time";
  const low = els.parentBiasDirection.querySelector('option[value="low"]');
  const high = els.parentBiasDirection.querySelector('option[value="high"]');
  if (low) low.textContent = isTime ? "Old" : "Shallow";
  if (high) high.textContent = isTime ? "New" : "Deep";
  const isEqual = els.parentBiasBasis.value === "equal";
  const isDepth = els.parentBiasBasis.value === "depth";
  els.parentBiasDirection.disabled = isEqual;
  els.parentBiasCurve.disabled = isEqual;
  els.parentBiasStrength.disabled = isEqual;
  els.rootedDepth.disabled = !isDepth;
  els.parentBiasDirection.value = isEqual ? "none" : previousValue;
  if (isEqual) els.parentBiasCurve.value = "none";
  if (!isEqual && els.parentBiasCurve.value === "none") els.parentBiasCurve.value = "linear";
}

function updateRatioCurveState() {
  const isEqual = state.ratioBias === "equal";
  els.ratioBiasCurve.disabled = isEqual;
  if (isEqual) els.ratioBiasCurve.value = "none";
  if (!isEqual && els.ratioBiasCurve.value === "none") els.ratioBiasCurve.value = "linear";
}

function updateVibratoState() {
  const disabled = !els.vibratoEnabled.checked;
  [
    els.vibratoRateMin,
    els.vibratoRateMax,
    els.vibratoDepthMin,
    els.vibratoDepthMax,
  ].forEach((input) => {
    input.disabled = disabled;
  });
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
  setHelpPage,
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
loadNamedCommas();
loadRatioPresets();
applyLanguage();
