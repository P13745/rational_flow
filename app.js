const els = {
  languageToggle: document.querySelector("#languageToggle"),
  mobileControlsView: document.querySelector("#mobileControlsView"),
  mobileMainView: document.querySelector("#mobileMainView"),
  mobileListView: document.querySelector("#mobileListView"),
  startStop: document.querySelector("#startStop"),
  pauseResume: document.querySelector("#pauseResume"),
  seedMode: document.querySelector("#seedMode"),
  seed: document.querySelector("#seed"),
  clear: document.querySelector("#clear"),
  autoMode: document.querySelector("#autoMode"),
  listMode: document.querySelector("#listMode"),
  simpleRatioMode: document.querySelector("#simpleRatioMode"),
  equalRatioMode: document.querySelector("#equalRatioMode"),
  complexRatioMode: document.querySelector("#complexRatioMode"),
  ratioBiasCurve: document.querySelector("#ratioBiasCurve"),
  autoControls: document.querySelector("#autoControls"),
  listControls: document.querySelector("#listControls"),
  nMax: document.querySelector("#nMax"),
  dMax: document.querySelector("#dMax"),
  fractionList: document.querySelector("#fractionList"),
  presetsOpen: document.querySelector("#presetsOpen"),
  presetsClose: document.querySelector("#presetsClose"),
  presetsDialog: document.querySelector("#presetsDialog"),
  presetList: document.querySelector("#presetList"),
  presetName: document.querySelector("#presetName"),
  presetDescription: document.querySelector("#presetDescription"),
  presetRatios: document.querySelector("#presetRatios"),
  presetLoad: document.querySelector("#presetLoad"),
  minFreq: document.querySelector("#minFreq"),
  maxFreq: document.querySelector("#maxFreq"),
  minDur: document.querySelector("#minDur"),
  maxDur: document.querySelector("#maxDur"),
  nextMin: document.querySelector("#nextMin"),
  nextMax: document.querySelector("#nextMax"),
  windowSize: document.querySelector("#windowSize"),
  volume: document.querySelector("#volume"),
  allowDuplication: document.querySelector("#allowDuplication"),
  rootedDepth: document.querySelector("#rootedDepth"),
  parentBiasBasis: document.querySelector("#parentBiasBasis"),
  parentBiasDirection: document.querySelector("#parentBiasDirection"),
  parentBiasCurve: document.querySelector("#parentBiasCurve"),
  parentBiasStrength: document.querySelector("#parentBiasStrength"),
  vibratoEnabled: document.querySelector("#vibratoEnabled"),
  vibratoRateMin: document.querySelector("#vibratoRateMin"),
  vibratoRateMax: document.querySelector("#vibratoRateMax"),
  vibratoDepthMin: document.querySelector("#vibratoDepthMin"),
  vibratoDepthMax: document.querySelector("#vibratoDepthMax"),
  detailsOpen: document.querySelector("#detailsOpen"),
  detailsClose: document.querySelector("#detailsClose"),
  detailsDialog: document.querySelector("#detailsDialog"),
  helpOpen: document.querySelector("#helpOpen"),
  helpClose: document.querySelector("#helpClose"),
  helpDialog: document.querySelector("#helpDialog"),
  diesisOpen: document.querySelector("#diesisOpen"),
  diesisClose: document.querySelector("#diesisClose"),
  diesisDialog: document.querySelector("#diesisDialog"),
  diesisList: document.querySelector("#diesisList"),
  diesisBaseControls: document.querySelector("#diesisBaseControls"),
  diesisLimitFilter: document.querySelector("#diesisLimitFilter"),
  diesisDerivedToggle: document.querySelector("#diesisDerivedToggle"),
  diesisPowerToggle: document.querySelector("#diesisPowerToggle"),
  diesisCollectionFilter: document.querySelector("#diesisCollectionFilter"),
  diesisCollectionStats: document.querySelector("#diesisCollectionStats"),
  diesisRatioMode: document.querySelector("#diesisRatioMode"),
  diesisFactorMode: document.querySelector("#diesisFactorMode"),
  noteCount: document.querySelector("#noteCount"),
  lastDepth: document.querySelector("#lastDepth"),
  statusLabel: document.querySelector("#statusLabel"),
  detailLabel: document.querySelector("#detailLabel"),
  activeRatioLabel: document.querySelector("#activeRatioLabel"),
  noteRows: document.querySelector("#noteRows"),
  visualizer: document.querySelector("#visualizer"),
};

let audioContext = null;
let isRunning = false;
let isPaused = false;
let isDraining = false;
let pausedWasDraining = false;
let pausedAt = null;
let seedMode = "seed";
let mode = "auto";
let ratioBias = "simple";
let notes = [];
let rafId = null;
let schedulerTimer = null;
let startTime = performance.now() / 1000;
let nextEventTime = null;
let selectedNoteId = null;
let nextId = 1;
let namedCommaByRatio = new Map();
let namedCommaIntervals = [];
let ratioPresets = [];
let selectedPresetId = "";
let lastTableRenderAt = -Infinity;
let currentLanguage = ["ja", "en"].includes(localStorage.getItem("rationalFlowLanguage"))
  ? localStorage.getItem("rationalFlowLanguage")
  : "ja";
let diesisBaseOctave = 5;
let diesisRatioDisplay = "ratio";
let diesisLimitFilter = Infinity;
let diesisShowDerived = true;
let diesisShowPower = true;
let diesisCollectionFilter = "all";
let discoveredDiesisIndexes = new Set();

const initialSeedDelay = 2;
const tableRenderInterval = 180;
const diesisCollectionCookie = "rf_diesis_seen";
const germanPitchClasses = ["C", "Cis/Des", "D", "Dis/Es", "E", "F", "Fis/Ges", "G", "Gis/As", "A", "B", "H"];
const i18nTargets = [
  ["header > div > p", "subtitle"],
  ["header .transport", "transport.label", "aria-label"],
  [".mobile-view-switch", "mobile.ariaLabel", "aria-label"],
  ["#mobileControlsView", "mobile.controls"],
  ["#mobileMainView", "mobile.main"],
  ["#mobileListView", "mobile.list"],
  ["#startStop", "transport.startStopTitle", "title"],
  ["#pauseResume", "transport.pauseTitle", "title"],
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
  ['label[for="volume"]', "labels.volume"],
  ["#allowDuplication", "labels.duplicate", "checkbox-label"],
  ["#rootedDepth", "labels.rootedDepth", "checkbox-label"],
  ['label[for="parentBiasBasis"]', "labels.parentBias"],
  [".control-group small", "hints.parentBias"],
  ["#detailsOpen", "labels.settings"],
  ["#helpOpen", "labels.help"],
  ["#diesisOpen", "labels.diesis"],
  [".list-toolbar-title", "labels.timeline"],
  [".readout div:nth-child(1) small", "labels.notes"],
  [".readout div:nth-child(2) small", "labels.depth"],
  ["thead th:nth-child(1)", "table.start"],
  ["thead th:nth-child(2)", "table.hz"],
  ["thead th:nth-child(3)", "table.duration"],
  ["thead th:nth-child(4)", "table.depth"],
  ["thead th:nth-child(5)", "table.ratio"],
  ["#detailsDialog h2", "dialogs.settingsTitle"],
  ["#detailsDialog .details-head p", "dialogs.settingsIntro"],
  ["#detailsClose", "dialogs.closeTitle", "title"],
  ["#helpDialog h2", "dialogs.helpTitle"],
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
  ["#diesisRatioMode", "dialogs.ratioMode"],
  ["#diesisFactorMode", "dialogs.factorMode"],
];

function timelineNow() {
  return isPaused && pausedAt !== null ? pausedAt : performance.now() / 1000;
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
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
  return min + (max - min) * Math.random();
}

function t(key) {
  const source = window.RF_I18N?.[currentLanguage] || window.RF_I18N?.ja || {};
  return key.split(".").reduce((value, part) => value?.[part], source) ?? key;
}

function localizedField(value) {
  if (value && typeof value === "object") {
    return value[currentLanguage] ?? value.ja ?? value.en ?? "";
  }
  return value ?? "";
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
  document.documentElement.lang = currentLanguage;
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
  currentLanguage = currentLanguage === "ja" ? "en" : "ja";
  localStorage.setItem("rationalFlowLanguage", currentLanguage);
  applyLanguage();
}

function setMobileView(view) {
  const nextView = ["controls", "main", "list"].includes(view) ? view : "main";
  document.body.dataset.mobileView = nextView;
  [
    [els.mobileControlsView, "controls"],
    [els.mobileMainView, "main"],
    [els.mobileListView, "list"],
  ].forEach(([button, buttonView]) => {
    button.classList.toggle("active", buttonView === nextView);
  });
  if (nextView === "list") renderTable();
  window.requestAnimationFrame(drawCanvas);
}

function readCookie(name) {
  const encoded = `${encodeURIComponent(name)}=`;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(encoded))
    ?.slice(encoded.length) || "";
}

function writeCookie(name, value, maxAgeDays = 3650) {
  const maxAge = Math.max(1, Math.floor(maxAgeDays * 86400));
  document.cookie = `${encodeURIComponent(name)}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function loadDiesisCollection() {
  const raw = readCookie(diesisCollectionCookie);
  discoveredDiesisIndexes = new Set(
    raw
      .split(".")
      .map((part) => parseInt(part, 36))
      .filter((value) => Number.isInteger(value) && value >= 0)
  );
}

function saveDiesisCollection() {
  const value = [...discoveredDiesisIndexes]
    .sort((a, b) => a - b)
    .map((index) => index.toString(36))
    .join(".");
  writeCookie(diesisCollectionCookie, value);
}

function diesisIndex(entry) {
  return namedCommaIntervals.indexOf(entry);
}

function markDiesisDiscovered(entry) {
  const index = diesisIndex(entry);
  if (index < 0 || discoveredDiesisIndexes.has(index)) return;
  discoveredDiesisIndexes.add(index);
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

function gcd(a, b) {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function lcm(a, b) {
  return Math.abs(a * b) / Math.max(1, gcd(a, b));
}

function largestPrimeFactor(value) {
  let n = Math.abs(Math.trunc(value));
  let largest = 1;
  for (let factor = 2; factor * factor <= n; factor += factor === 2 ? 1 : 2) {
    while (n % factor === 0) {
      largest = factor;
      n /= factor;
    }
  }
  return Math.max(largest, n);
}

function ratioLimitLabel(ratio) {
  const limit = ratioLimitValue(ratio);
  return limit ? `${limit}-limit` : "---";
}

function ratioLimitValue(ratio) {
  const frac = parseFraction(ratio);
  if (!frac) return 0;
  return Math.max(largestPrimeFactor(frac.numerator), largestPrimeFactor(frac.denominator));
}

function factorIntegerLabel(value) {
  let n = Math.abs(Math.trunc(value));
  if (n <= 1) return "1";
  const parts = [];
  for (let factor = 2; factor * factor <= n; factor += factor === 2 ? 1 : 2) {
    let exponent = 0;
    while (n % factor === 0) {
      exponent += 1;
      n /= factor;
    }
    if (exponent) parts.push(exponent === 1 ? String(factor) : `${factor}^${exponent}`);
  }
  if (n > 1) parts.push(String(n));
  return parts.join("·");
}

function factorRatioLabel(ratio) {
  const frac = parseFraction(ratio);
  if (!frac) return ratio;
  return `${factorIntegerLabel(frac.numerator)} / ${factorIntegerLabel(frac.denominator)}`;
}

function diesisRatioLabel(entry) {
  if (diesisRatioDisplay === "factors") {
    if (diesisShowPower && entry.display?.powerFactors) return entry.display.powerFactors;
    return entry.display?.factors || factorRatioLabel(entry.ratio);
  }
  if (diesisShowPower && entry.display?.powerRatio) return entry.display.powerRatio;
  return entry.display?.ratio || entry.ratio;
}

function cFrequency(octave) {
  return 261.6255653005986 * 2 ** (octave - 4);
}

function parseFraction(raw) {
  const trimmed = raw.trim();
  const match = trimmed.match(/^(-?\d+)(?:\s*\/\s*(-?\d+))?$/);
  if (!match) return null;
  const numerator = Number(match[1]);
  const denominator = match[2] ? Number(match[2]) : 1;
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return null;
  const sign = denominator < 0 ? -1 : 1;
  const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
  return {
    numerator: sign * numerator / divisor,
    denominator: Math.abs(denominator) / divisor,
  };
}

function fractionLabel(frac) {
  return `${frac.numerator}/${frac.denominator}`;
}

function installNamedCommas(data) {
  if (!data?.intervals) return false;
  namedCommaIntervals = data.intervals;
  namedCommaByRatio = new Map(data.intervals.map((entry) => [entry.ratio, entry]));
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
  ratioPresets = data.presets;
  selectedPresetId = ratioPresets[0]?.id || "";
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

function approximateFraction(value, maxDenominator = 4096) {
  if (!Number.isFinite(value) || value <= 0) return { numerator: 0, denominator: 1 };
  let lowerN = 0;
  let lowerD = 1;
  let upperN = 1;
  let upperD = 0;

  while (true) {
    const middleN = lowerN + upperN;
    const middleD = lowerD + upperD;
    if (middleD > maxDenominator) break;
    if (middleN / middleD < value) {
      lowerN = middleN;
      lowerD = middleD;
    } else {
      upperN = middleN;
      upperD = middleD;
    }
  }

  const lower = lowerN / lowerD;
  const upper = upperD === 0 ? Infinity : upperN / upperD;
  return Math.abs(value - lower) <= Math.abs(upper - value)
    ? { numerator: lowerN, denominator: lowerD }
    : { numerator: upperN, denominator: upperD };
}

function reduceIntegerRatio(values) {
  const integers = values.map((value) => Math.max(1, Math.round(value)));
  const divisor = integers.reduce((current, value) => gcd(current, value), integers[0] || 1);
  return integers.map((value) => value / Math.max(1, divisor));
}

function nearestPitchLabel(frequency) {
  const midi = Math.round(69 + 12 * Math.log2(frequency / 440));
  const nearestFrequency = 440 * 2 ** ((midi - 69) / 12);
  const cents = 1200 * Math.log2(frequency / nearestFrequency);
  const name = germanPitchClasses[((midi % 12) + 12) % 12];
  const sign = cents >= 0 ? "+" : "";
  return `${name}${sign}${cents.toFixed(1)}¢`;
}

function getSettings() {
  const minFreq = Math.max(20, Number(els.minFreq.value) || 130);
  const maxFreq = Math.max(minFreq + 1, Number(els.maxFreq.value) || 2100);
  const minDur = Math.max(0.5, Number(els.minDur.value) || 5);
  const maxDur = Math.max(minDur, Number(els.maxDur.value) || 20);
  const nextMin = Math.max(0.05, Number(els.nextMin.value) || 1);
  const nextMax = Math.max(nextMin, Number(els.nextMax.value) || 3);
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
    volume: Math.max(0, Number(els.volume.value) || 0),
    nMax: clamp(Math.floor(Number(els.nMax.value) || 8), 2, 128),
    dMax: clamp(Math.floor(Number(els.dMax.value) || 8), 2, 128),
    allowDuplication: els.allowDuplication.checked,
    rootedDepth: els.rootedDepth.checked && els.parentBiasBasis.value === "depth",
    ratioBias,
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
  const candidates = [];
  const ratioWeightOf = (numerator, denominator) => {
    if (settings.ratioBias === "equal") return 1;
    const complexity = Math.abs(numerator) + Math.abs(denominator);
    if (settings.ratioBias === "complex") {
      return settings.ratioBiasCurve === "exponential" ? complexity * complexity : complexity;
    }
    return settings.ratioBiasCurve === "exponential" ? 1 / (complexity * complexity) : 1 / complexity;
  };

  if (mode === "list") {
    const parts = els.fractionList.value.split(",");
    parts.forEach((part) => {
      const frac = parseFraction(part);
      if (!frac || frac.numerator === frac.denominator) return;
      const ratio = frac.numerator / frac.denominator;
      const frequency = baseFreq === null ? null : baseFreq * ratio;
      if (frequency !== null && (frequency < settings.minFreq || frequency > settings.maxFreq)) return;
      const weight = ratioWeightOf(frac.numerator, frac.denominator);
      candidates.push({ ratio, weight, frac });
    });
    return candidates;
  }

  for (let denominator = 1; denominator <= settings.dMax; denominator += 1) {
    for (let numerator = 1; numerator <= settings.nMax; numerator += 1) {
      if (numerator === denominator) continue;
      const divisor = gcd(numerator, denominator);
      const frac = { numerator: numerator / divisor, denominator: denominator / divisor };
      const ratio = frac.numerator / frac.denominator;
      const frequency = baseFreq === null ? null : baseFreq * ratio;
      if (frequency !== null && (frequency < settings.minFreq || frequency > settings.maxFreq)) continue;
      const weight = ratioWeightOf(numerator, denominator);
      candidates.push({ ratio, weight, frac });
    }
  }

  return candidates;
}

function chooseWeighted(candidates) {
  const total = candidates.reduce((sum, item) => sum + item.weight, 0);
  let pick = Math.random() * total;
  for (const item of candidates) {
    pick -= item.weight;
    if (pick <= 0) return item;
  }
  return candidates[candidates.length - 1];
}

function chooseBase(bases) {
  const settings = getSettings();
  if (settings.parentBiasBasis === "equal" || bases.length < 2) {
    return bases[Math.floor(Math.random() * bases.length)];
  }

  const values = bases.map((note) => settings.parentBiasBasis === "time" ? note.start : note.generation);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const span = Math.max(0.0001, maxValue - minValue);
  const curvePower = 1 + settings.parentBiasStrength * 5;
  const weightedBases = bases.map((note) => {
    const value = settings.parentBiasBasis === "time" ? note.start : note.generation;
    const position = (value - minValue) / span;
    const target = settings.parentBiasDirection === "low" ? 1 - position : position;
    const weight = settings.parentBiasCurve === "exponential"
      ? Math.exp(target * curvePower)
      : 1 + target * curvePower;
    return { note, weight };
  });

  return chooseWeighted(weightedBases).note;
}

function ensureAudio() {
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
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
  notes.forEach((note) => {
    const endsAfterNow = !Number.isFinite(note.duration) || note.start + note.duration > now;
    if (endsAfterNow && !note.nodes) scheduleAudio(note);
  });
}

function cancelFutureAudio(now = performance.now() / 1000) {
  notes.forEach((note) => {
    if (note.start > now && note.nodes) stopNode(note, 0.03);
  });
}

function holdActiveAudio(now = performance.now() / 1000) {
  if (!audioContext) return;
  const audioNow = audioContext.currentTime;
  notes.forEach((note) => {
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
  if (!audioContext) return;
  const audioNow = audioContext.currentTime;
  notes.forEach((note) => {
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
  if (pausedAt === null) return 0;
  const now = performance.now() / 1000;
  const delta = Math.max(0, now - pausedAt);
  if (delta <= 0) return 0;
  notes.forEach((note) => {
    note.start += delta;
  });
  if (nextEventTime !== null) nextEventTime += delta;
  startTime += delta;
  pausedAt = now;
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
  if (!note.nodes || !audioContext) return;
  const nodes = note.nodes;
  const audioNow = audioContext.currentTime;
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
  const baseFrequency = cFrequency(diesisBaseOctave);
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

function multiplyFractions(a, b) {
  return parseFraction(`${a.numerator * b.numerator}/${a.denominator * b.denominator}`);
}

function divideFractions(a, b) {
  return parseFraction(`${a.numerator * b.denominator}/${a.denominator * b.numerator}`);
}

function addNote(frequency, duration, start, ratio = "", baseFrequency = null, generation = 0, parentId = null, absoluteRatio = null, rootId = null) {
  const settings = getSettings();
  const id = nextId;
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
    absoluteRatio: absoluteRatio || { numerator: 1, denominator: 1 },
    volume: Math.min(settings.volume, settings.volume / Math.sqrt(Math.max(1, activeAt(start).length + 1)) + 0.002),
    nodes: null,
  };
  nextId += 1;
  notes.push(note);
  selectedNoteId = note.id;
  if (isRunning) scheduleAudio(note);
  return note;
}

function activeAt(time) {
  return notes.filter((note) => note.start <= time && note.start + note.duration >= time);
}

function seedNote(offset = 2, durationOverride = null, frequencyOverride = null) {
  const settings = getSettings();
  const frequency = frequencyOverride ?? randomBetween(settings.minFreq, settings.maxFreq);
  const duration = durationOverride ?? (seedMode === "drone" ? Infinity : randomBetween(settings.minDur, settings.maxDur));
  return addNote(frequency, duration, performance.now() / 1000 + offset, "", null, 0, null, { numerator: 1, denominator: 1 }, null);
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
  const candidates = notes
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
  const bases = notes.filter((note) => note.start <= playTime && note.start + note.duration >= playTime);
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
      multiplyFractions(base.absoluteRatio, chosen.frac),
      base.rootId,
    );
    return true;
  }
  return false;
}

function addManualNote() {
  if (isPaused) return;
  if (isDraining) return;
  if (!isRunning) {
    seedNote(2);
    render(true);
    return;
  }

  const added = addGeneratedChild(performance.now() / 1000 + rightEdgeOffset());
  if (!added && !notes.some((note) => note.start + note.duration > performance.now() / 1000)) {
    seedNote(rightEdgeOffset());
  }
  render(true);
}

function startCanvasSeed(event) {
  event.preventDefault();
  const source = event.touches?.[0] || event.changedTouches?.[0] || event;
  const hitNote = noteAtCanvasPoint(source.clientX, source.clientY);
  if (hitNote) {
    selectedNoteId = hitNote.id;
    previewFrequency(hitNote.frequency);
    render(true);
    return;
  }
  if (isRunning || isPaused || isDraining) return;
  notes.forEach((note) => stopNode(note, 0.24));
  notes = [];
  const note = seedNote(2, null, frequencyFromCanvasY(source.clientY));
  ensureAudio().resume();
  isRunning = true;
  isPaused = false;
  isDraining = false;
  pausedWasDraining = false;
  pausedAt = null;
  startTime = performance.now() / 1000;
  nextEventTime = null;
  selectedNoteId = note.id;
  scheduleAudio(note);
  fillEventQueue();
  queueScheduler(0.5);
  if (!rafId) tick();
  render(true);
}

function scheduleNext() {
  if (!isRunning) return;
  const settings = getSettings();
  fillEventQueue();
  queueScheduler(Math.min(0.5, settings.nextMin));
}

function queueScheduler(seconds) {
  window.clearTimeout(schedulerTimer);
  schedulerTimer = window.setTimeout(scheduleNext, Math.max(120, seconds * 1000));
}

function sampleEventWait(settings) {
  const mean = (settings.nextMin + settings.nextMax) / 2;
  const exponential = -Math.log(Math.max(0.000001, 1 - Math.random())) * mean;
  return clamp(exponential, settings.nextMin, settings.nextMax);
}

function firstSeedReadyTime(now) {
  if (notes.some((note) => note.generation > 0)) return now;
  const living = notes.filter((note) => note.start + note.duration >= now);
  if (!living.length) return Infinity;
  return Math.min(...living.map((note) => Math.max(now, note.start + initialSeedDelay)));
}

function fillEventQueue() {
  const settings = getSettings();
  const now = performance.now() / 1000;
  const horizon = now + rightEdgeOffset();
  const readyAt = firstSeedReadyTime(now);
  if (!Number.isFinite(readyAt)) return;
  if (nextEventTime === null || nextEventTime < now) {
    nextEventTime = Math.max(now, readyAt) + sampleEventWait(settings);
  }

  let guard = 0;
  while (nextEventTime <= horizon && guard < 64) {
    addGeneratedChild(nextEventTime);
    nextEventTime += sampleEventWait(settings);
    guard += 1;
  }
}

function trimNotes() {
  const now = performance.now() / 1000;
  const settings = getSettings();
  const keepAfter = now - settings.windowSize * 1.35;
  notes = notes.filter((note) => {
    const keep = note.start + note.duration >= keepAfter;
    if (!keep) stopNode(note);
    return keep;
  });
  normalizeGenerations(now);
}

function normalizeGenerations(now = performance.now() / 1000) {
  const settings = getSettings();
  const living = notes.filter((note) => note.start + note.duration >= now);
  if (!living.length) return;
  const minGeneration = Math.min(...living.map((note) => note.generation));
  if (minGeneration <= 0) return;
  if (settings.rootedDepth) {
    normalizeRootedGenerations(living, settings);
    return;
  }
  notes.forEach((note) => {
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
  notes.forEach((note) => {
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
    notes.forEach((note) => {
      if (!ids.has(note.id) && ids.has(note.parentId)) {
        ids.add(note.id);
        changed = true;
      }
    });
  }
  return ids;
}

function exactRatioBetween(low, high) {
  if (!low.absoluteRatio || !high.absoluteRatio || low.rootId !== high.rootId) return null;
  return divideFractions(high.absoluteRatio, low.absoluteRatio);
}

function findCloseActivePairs(activeNotes) {
  const pairs = [];
  for (let i = 0; i < activeNotes.length; i += 1) {
    for (let j = i + 1; j < activeNotes.length; j += 1) {
      const low = activeNotes[i].frequency <= activeNotes[j].frequency ? activeNotes[i] : activeNotes[j];
      const high = low === activeNotes[i] ? activeNotes[j] : activeNotes[i];
      const cents = 1200 * Math.log2(high.frequency / low.frequency);
      if (cents <= 0.01 || cents >= 100) continue;
      const exactRatio = exactRatioBetween(low, high);
      const ratio = exactRatio ? fractionLabel(exactRatio) : fractionLabel(approximateFraction(high.frequency / low.frequency));
      pairs.push({
        low,
        high,
        cents,
        ratio,
        namedInterval: exactRatio ? namedCommaByRatio.get(ratio) || null : null,
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
  if (!isRunning && !isPaused && !isDraining) return `${t("status.activeRatio")}: ---`;
  const active = activeAt(now).sort((a, b) => a.frequency - b.frequency);
  if (!active.length) return `${t("status.activeRatio")}: ---`;
  const base = active[0];
  const fractions = active.map((note) => {
    if (note.absoluteRatio && base.absoluteRatio && note.rootId === base.rootId) {
      return divideFractions(note.absoluteRatio, base.absoluteRatio);
    }
    return approximateFraction(note.frequency / base.frequency);
  });
  const commonDenominator = fractions.reduce((current, frac) => lcm(current, frac.denominator), 1);
  const integers = reduceIntegerRatio(fractions.map((frac) => frac.numerator * (commonDenominator / frac.denominator)));
  return `${t("status.activeRatio")}: ${integers.join(" : ")}`;
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
  const activeNow = isRunning || isPaused || isDraining ? activeAt(now) : [];
  const closePairs = findCloseActivePairs(activeNow);
  closePairs.forEach((pair) => {
    if (pair.namedInterval) markDiesisDiscovered(pair.namedInterval);
  });
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
    const text = closePairLabel(pair);
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
  const now = timelineNow();
  const settings = getSettings();
  const leftEdgeTime = now - settings.windowSize / 2;
  const visible = notes.filter((note) => note.start + note.duration >= leftEdgeTime);
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

  els.noteRows.textContent = "";
  const fragment = document.createDocumentFragment();
  appendEventGroup(fragment, t("table.upcoming"), upcoming, now, "upcoming", { minRows: 7, total: allUpcoming.length, commaNoteIds, alignBottom: true });
  appendEventGroup(fragment, t("table.playing"), active, now, "playing", { minRows: 15, commaNoteIds });
  appendEventGroup(fragment, t("table.past"), past, now, "past", { commaNoteIds });
  els.noteRows.appendChild(fragment);
}

function appendEventGroup(fragment, label, items, now, state, options = {}) {
  const header = document.createElement("tr");
  header.className = `group-row ${state}`;
  const total = options.total ?? items.length;
  const countLabel = total === items.length ? String(items.length) : `${items.length}/${total}`;
  header.innerHTML = `<td colspan="5">${label}<span>${countLabel}</span></td>`;
  fragment.appendChild(header);

  const appendEmptyRow = () => {
    const tr = document.createElement("tr");
    tr.className = `event-row ${state} empty`;
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
    tr.className = `event-row ${state}${isSeed ? " seed" : ""}${note.id === selectedNoteId ? " active" : ""}${isCommaHit ? " comma-hit" : ""}`;
    tr.title = "Preview this note";
    const start = note.start - now;
    tr.innerHTML = `
      <td>${start >= 0 ? "+" : ""}${start.toFixed(1)}</td>
      <td>${note.frequency.toFixed(1)}</td>
      <td>${Number.isFinite(note.duration) ? note.duration.toFixed(1) : "drone"}</td>
      <td>${note.generation}</td>
      <td>${note.ratio || "---"}</td>
    `;
    tr.addEventListener("click", () => {
      selectedNoteId = note.id;
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
  ratioPresets.forEach((preset) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = preset.id === selectedPresetId ? "preset-item active" : "preset-item";
    button.textContent = localizedField(preset.name);
    button.addEventListener("click", () => {
      selectedPresetId = preset.id;
      renderPresetBrowser();
    });
    fragment.appendChild(button);
  });
  els.presetList.appendChild(fragment);

  const selected = ratioPresets.find((preset) => preset.id === selectedPresetId) || ratioPresets[0];
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
  const selected = ratioPresets.find((preset) => preset.id === selectedPresetId);
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
    button.className = octave === diesisBaseOctave ? "active" : "";
    button.addEventListener("click", () => {
      diesisBaseOctave = octave;
      renderDiesisControls();
      renderDiesisList();
    });
    els.diesisBaseControls.appendChild(button);
  }
  els.diesisRatioMode.classList.toggle("active", diesisRatioDisplay === "ratio");
  els.diesisFactorMode.classList.toggle("active", diesisRatioDisplay === "factors");
  els.diesisDerivedToggle.checked = diesisShowDerived;
  els.diesisPowerToggle.checked = diesisShowPower;
  els.diesisCollectionFilter.value = diesisCollectionFilter;
  els.diesisLimitFilter.value = Number.isFinite(diesisLimitFilter) ? String(diesisLimitFilter) : "all";
}

function renderDiesisList() {
  if (!els.diesisList) return;
  els.diesisList.textContent = "";
  const fragment = document.createDocumentFragment();
  const visibleBase = namedCommaIntervals
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => ratioLimitValue(entry.ratio) <= diesisLimitFilter)
    .filter(({ entry }) => diesisShowDerived || entry.source !== "derived");
  const discoveredVisible = visibleBase.filter(({ index }) => discoveredDiesisIndexes.has(index)).length;
  els.diesisCollectionStats.textContent = `${discoveredVisible} / ${visibleBase.length}`;
  visibleBase
    .filter(({ index }) => {
      if (diesisCollectionFilter === "seen") return discoveredDiesisIndexes.has(index);
      if (diesisCollectionFilter === "unseen") return !discoveredDiesisIndexes.has(index);
      return true;
    })
    .map(({ entry }) => entry)
    .sort((a, b) => b.cents - a.cents)
    .forEach((entry) => {
      const discovered = discoveredDiesisIndexes.has(diesisIndex(entry));
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
      star.textContent = discovered ? "⭐️" : "";
      row.append(actions, cents, ratio, limit, name, star);
      fragment.appendChild(row);
    });
  els.diesisList.appendChild(fragment);
}

function updateLabels() {
  const selected = notes.find((note) => note.id === selectedNoteId) || notes[notes.length - 1];
  els.startStop.textContent = isRunning || isPaused || isDraining ? "■" : "▶";
  els.pauseResume.textContent = isPaused ? "▶Ⅱ" : "Ⅱ";
  els.pauseResume.disabled = !isRunning && !isPaused && !isDraining;
  els.pauseResume.classList.toggle("active", isPaused);
  const seedControlsDisabled = isRunning || isPaused || isDraining;
  els.seed.disabled = isPaused;
  els.seedMode.disabled = seedControlsDisabled;
  els.seedMode.value = seedMode;
  const statusKey = isPaused ? "paused" : isRunning ? "running" : isDraining ? "draining" : "stopped";
  els.statusLabel.textContent = t(`status.${statusKey}`);
  els.noteCount.textContent = String(notes.length);
  els.lastDepth.textContent = String(selected?.generation ?? 0);
  els.activeRatioLabel.textContent = activeRatioText();
  els.autoMode.classList.toggle("active", mode === "auto");
  els.listMode.classList.toggle("active", mode === "list");
  els.simpleRatioMode.classList.toggle("active", ratioBias === "simple");
  els.equalRatioMode.classList.toggle("active", ratioBias === "equal");
  els.complexRatioMode.classList.toggle("active", ratioBias === "complex");
  els.autoControls.classList.toggle("hidden", mode !== "auto");
  els.listControls.classList.toggle("hidden", mode !== "list");
  updateRatioCurveState();
  updateParentDirectionLabels();
  updateVibratoState();

  if (!selected) {
    els.detailLabel.textContent = "---";
    return;
  }

  const base = selected.baseFrequency === null ? "seed" : `${selected.baseFrequency.toFixed(2)}Hz`;
  els.detailLabel.textContent = `${selected.frequency.toFixed(2)}Hz  ${nearestPitchLabel(selected.frequency)}  depth ${selected.generation}  ${selected.ratio || base}`;
}

function render(forceTable = false) {
  updateLabels();
  drawCanvas();
  const now = performance.now();
  if (forceTable || now - lastTableRenderAt >= tableRenderInterval) {
    renderTable();
    lastTableRenderAt = now;
  }
}

function tick() {
  trimNotes();
  if (isDraining && !notes.length) {
    isDraining = false;
    selectedNoteId = null;
  }
  render();
  rafId = isRunning || isDraining ? window.requestAnimationFrame(tick) : null;
}

function start() {
  ensureAudio().resume();
  window.clearTimeout(schedulerTimer);
  if (rafId) window.cancelAnimationFrame(rafId);
  rafId = null;
  notes.forEach(stopNode);
  notes = [];
  seedNote(2);
  isRunning = true;
  isPaused = false;
  isDraining = false;
  pausedWasDraining = false;
  pausedAt = null;
  startTime = performance.now() / 1000;
  nextEventTime = null;
  scheduleVisibleAudio();
  fillEventQueue();
  queueScheduler(0.5);
  render(true);
  if (!rafId) tick();
}

function stop() {
  clearAll();
}

function clearAll() {
  isRunning = false;
  isPaused = false;
  isDraining = false;
  pausedWasDraining = false;
  pausedAt = null;
  window.clearTimeout(schedulerTimer);
  schedulerTimer = null;
  nextEventTime = null;
  if (rafId) window.cancelAnimationFrame(rafId);
  rafId = null;
  notes.forEach(stopNode);
  notes = [];
  selectedNoteId = null;
  render(true);
}

function pause() {
  if ((!isRunning && !isDraining) || isPaused) return;
  pausedWasDraining = isDraining;
  isRunning = false;
  isDraining = false;
  isPaused = true;
  pausedAt = performance.now() / 1000;
  window.clearTimeout(schedulerTimer);
  schedulerTimer = null;
  holdActiveAudio(pausedAt);
  cancelFutureAudio(pausedAt);
  if (rafId) window.cancelAnimationFrame(rafId);
  rafId = null;
  render(true);
}

function resume() {
  if (!isPaused) return;
  const resumeToDraining = pausedWasDraining;
  applyPausedTimeShift();
  const now = performance.now() / 1000;
  pausedAt = null;
  pausedWasDraining = false;
  isPaused = false;
  isRunning = !resumeToDraining;
  isDraining = resumeToDraining;
  ensureAudio().resume();
  resumeHeldAudio(now);
  scheduleVisibleAudio(now);
  if (isRunning) {
    fillEventQueue();
    queueScheduler(0.5);
  }
  if (!rafId) tick();
}

function togglePause() {
  if (isPaused) resume();
  else pause();
}

function setSeedMode(nextSeedMode) {
  seedMode = nextSeedMode === "drone" ? "drone" : "seed";
  render();
}

function setMode(nextMode) {
  mode = nextMode;
  render();
}

function setRatioBias(nextBias) {
  ratioBias = nextBias;
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
  const isEqual = ratioBias === "equal";
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

els.startStop.addEventListener("click", () => {
  if (isRunning || isPaused || isDraining) stop();
  else start();
});
els.languageToggle.addEventListener("click", toggleLanguage);
[
  els.mobileControlsView,
  els.mobileMainView,
  els.mobileListView,
].forEach((button) => {
  button.addEventListener("click", () => setMobileView(button.dataset.mobileView));
});
els.pauseResume.addEventListener("click", togglePause);
els.seedMode.addEventListener("change", () => setSeedMode(els.seedMode.value));
els.seed.addEventListener("click", addManualNote);
els.clear.addEventListener("click", clearAll);
els.visualizer.addEventListener("click", startCanvasSeed);
els.visualizer.addEventListener("touchstart", startCanvasSeed, { passive: false });
els.autoMode.addEventListener("click", () => setMode("auto"));
els.listMode.addEventListener("click", () => setMode("list"));
els.simpleRatioMode.addEventListener("click", () => setRatioBias("simple"));
els.equalRatioMode.addEventListener("click", () => setRatioBias("equal"));
els.complexRatioMode.addEventListener("click", () => setRatioBias("complex"));
els.detailsOpen.addEventListener("click", () => {
  if (typeof els.detailsDialog.showModal === "function") {
    els.detailsDialog.showModal();
  } else {
    els.detailsDialog.setAttribute("open", "");
  }
});
els.detailsDialog.addEventListener("click", (event) => {
  if (event.target === els.detailsDialog) els.detailsDialog.close();
});
els.helpOpen.addEventListener("click", () => {
  setHelpPage("about");
  if (typeof els.helpDialog.showModal === "function") {
    els.helpDialog.showModal();
  } else {
    els.helpDialog.setAttribute("open", "");
  }
});
els.helpDialog.addEventListener("click", (event) => {
  if (event.target === els.helpDialog) els.helpDialog.close();
});
document.querySelectorAll(".help-tabs button").forEach((button) => {
  button.addEventListener("click", () => setHelpPage(button.dataset.helpPage));
});
els.presetsOpen.addEventListener("click", () => {
  renderPresetBrowser();
  if (typeof els.presetsDialog.showModal === "function") {
    els.presetsDialog.showModal();
  } else {
    els.presetsDialog.setAttribute("open", "");
  }
});
els.presetsDialog.addEventListener("click", (event) => {
  if (event.target === els.presetsDialog) els.presetsDialog.close();
});
els.presetLoad.addEventListener("click", loadSelectedPreset);
els.diesisOpen.addEventListener("click", () => {
  renderDiesisControls();
  renderDiesisList();
  if (typeof els.diesisDialog.showModal === "function") {
    els.diesisDialog.showModal();
  } else {
    els.diesisDialog.setAttribute("open", "");
  }
});
els.diesisDialog.addEventListener("click", (event) => {
  if (event.target === els.diesisDialog) els.diesisDialog.close();
});
els.diesisRatioMode.addEventListener("click", () => {
  diesisRatioDisplay = "ratio";
  renderDiesisControls();
  renderDiesisList();
});
els.diesisFactorMode.addEventListener("click", () => {
  diesisRatioDisplay = "factors";
  renderDiesisControls();
  renderDiesisList();
});
els.diesisDerivedToggle.addEventListener("input", () => {
  diesisShowDerived = els.diesisDerivedToggle.checked;
  renderDiesisList();
});
els.diesisPowerToggle.addEventListener("input", () => {
  diesisShowPower = els.diesisPowerToggle.checked;
  renderDiesisList();
});
els.diesisCollectionFilter.addEventListener("change", () => {
  diesisCollectionFilter = els.diesisCollectionFilter.value;
  renderDiesisList();
});
els.diesisLimitFilter.addEventListener("change", () => {
  const value = els.diesisLimitFilter.value;
  diesisLimitFilter = value === "all" ? Infinity : Number(value);
  renderDiesisList();
});

[
  els.nMax,
  els.dMax,
  els.ratioBiasCurve,
  els.fractionList,
  els.minFreq,
  els.maxFreq,
  els.minDur,
  els.maxDur,
  els.nextMin,
  els.nextMax,
  els.windowSize,
  els.volume,
  els.allowDuplication,
  els.rootedDepth,
  els.parentBiasBasis,
  els.parentBiasDirection,
  els.parentBiasCurve,
  els.parentBiasStrength,
  els.vibratoEnabled,
  els.vibratoRateMin,
  els.vibratoRateMax,
  els.vibratoDepthMin,
  els.vibratoDepthMax,
].forEach((el) => el.addEventListener("input", render));

window.addEventListener("resize", drawCanvas);
document.addEventListener("keydown", (event) => {
  const tagName = document.activeElement?.tagName;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(tagName)) return;
  if (event.code === "Space") {
    event.preventDefault();
    if (isRunning || isPaused || isDraining) togglePause();
    else start();
  }
  if (event.key.toLowerCase() === "n") {
    addManualNote();
  }
});

loadNamedCommas();
loadRatioPresets();
applyLanguage();
