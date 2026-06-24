import { els } from "../dom.js";
import { state } from "../state.js";
import { t } from "../i18n/i18n.js";
import { ratioLimitLabel, ratioLimitValue } from "../core/ratio-math.js";

export function renderDiesisControls({ renderDiesisControls, renderDiesisList }) {
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
