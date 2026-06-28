import { vectorFromFraction, parseFraction, vectorKey } from "../core/ratio-math.js";
import { loadDiesisCollection } from "../diesis/diesis-collection.js";

export function installNamedCommas(data, {
  isDiesisDialogOpen,
  renderDiesisControls,
  renderDiesisList,
  state,
}) {
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
  if (isDiesisDialogOpen()) {
    renderDiesisControls();
    renderDiesisList();
  }
  return true;
}

export async function loadNamedCommas({
  isDiesisDialogOpen,
  render,
  renderDiesisControls,
  renderDiesisList,
  state,
}) {
  const callbacks = {
    isDiesisDialogOpen,
    renderDiesisControls,
    renderDiesisList,
    state,
  };
  const hasFallback = installNamedCommas(window.NAMED_COMMAS_DATA, callbacks);
  if (hasFallback) render();
  try {
    const response = await fetch("named_commas.json");
    if (!response.ok) throw new Error("named commas unavailable");
    const data = await response.json();
    if (installNamedCommas(data, callbacks)) render();
  } catch (_) {
    // The generated JS fallback is installed before fetch, so direct file opening still works.
    if (!hasFallback && installNamedCommas(window.NAMED_COMMAS_DATA, callbacks)) render();
  }
}

export function installRatioPresets(data, { renderPresetBrowser, state }) {
  if (!data?.presets?.length) return false;
  state.ratioPresets = data.presets;
  state.selectedPresetId = state.ratioPresets[0]?.id || "";
  renderPresetBrowser();
  return true;
}

export async function loadRatioPresets({ renderPresetBrowser, state }) {
  try {
    const response = await fetch("ratio_presets.json");
    if (!response.ok) throw new Error("ratio presets unavailable");
    const data = await response.json();
    installRatioPresets(data, { renderPresetBrowser, state });
  } catch (_) {
    installRatioPresets(window.RATIO_PRESETS_DATA, { renderPresetBrowser, state });
  }
}
