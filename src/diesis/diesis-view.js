import { els } from "../dom.js";
import { state } from "../state.js";
import { t } from "../i18n/i18n.js";
import { ratioLimitLabel, ratioLimitValue } from "../core/ratio-math.js";

const BASE_NOTE_OCTAVES = [3, 4, 5, 6, 7, 8, 9];

function syncBaseNoteOptions(select, selectedOctave) {
  const needsOptions =
    select.options.length !== BASE_NOTE_OCTAVES.length ||
    BASE_NOTE_OCTAVES.some((octave, index) => select.options[index]?.value !== String(octave));
  if (needsOptions) {
    select.replaceChildren(
      ...BASE_NOTE_OCTAVES.map((octave) => {
        const option = document.createElement("option");
        option.value = String(octave);
        option.textContent = `C${octave}`;
        return option;
      }),
    );
  }
  select.value = String(selectedOctave);
}

export function renderDiesisControls({ renderDiesisControls, renderDiesisList }) {
  if (!els.diesisBaseControls) return;
  const baseSelect = els.diesisBaseControls;
  const selectedOctave = BASE_NOTE_OCTAVES.includes(state.diesisBaseOctave) ? state.diesisBaseOctave : 5;
  state.diesisBaseOctave = selectedOctave;
  syncBaseNoteOptions(baseSelect, selectedOctave);
  baseSelect.onchange = () => {
    state.diesisBaseOctave = Number(baseSelect.value);
    renderDiesisList();
  };
  els.globalRatioDisplay.value = state.diesisRatioDisplay;
  els.diesisRatioDisplay.value = state.diesisRatioDisplay;
  els.diesisDerivedToggle.checked = state.diesisShowDerived;
  els.diesisPowerToggle.checked = state.diesisShowPower;
  els.diesisCollectionFilter.value = state.diesisCollectionFilter;
  els.diesisLimitFilter.value = Number.isFinite(state.diesisLimitFilter) ? String(state.diesisLimitFilter) : "all";
}

export function renderDiesisList({
  diesisIndex,
  formatDiesisRatioLabel,
  isDifferenceAudible,
  previewDiesisInterval,
}) {
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
      ratio.textContent = formatDiesisRatioLabel(entry, {
        displayMode: state.diesisRatioDisplay,
        showPower: state.diesisShowPower,
      });
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
