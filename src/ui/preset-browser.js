import { els } from "../dom.js";
import { state } from "../state.js";
import { localizedField } from "../i18n/i18n.js";

export function renderPresetBrowser() {
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

export function loadSelectedPreset({ setMode, render }) {
  const selected = state.ratioPresets.find((preset) => preset.id === state.selectedPresetId);
  if (!selected) return;
  els.fractionList.value = selected.ratios.join(", ");
  setMode("list");
  els.presetsDialog.close();
  render(true);
}
