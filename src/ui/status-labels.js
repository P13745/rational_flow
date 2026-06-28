import { nearestPitchLabel } from "../core/pitch.js";
import { t } from "../i18n/i18n.js";
import { activeRatioText as formatActiveRatioText } from "./active-ratio.js";

export function updateStatusLabels({
  els,
  now,
  state,
  timerBadgeText,
  updateParentDirectionLabels,
  updateRatioCurveState,
  updateVibratoState,
}) {
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
  const seedActionLabel = t(state.isRunning || state.isDraining ? "transport.addChildTitle" : "transport.seedTitle");
  els.seed.setAttribute("title", seedActionLabel);
  els.seed.setAttribute("aria-label", seedActionLabel);
  els.activeRatioLabel.textContent = formatActiveRatioText({ now, state, t });
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

  const base = selected.baseFrequency === null ? t("labels.seed") : `${selected.baseFrequency.toFixed(2)}Hz`;
  els.detailLabel.textContent = `${selected.frequency.toFixed(2)}Hz  ${nearestPitchLabel(selected.frequency)}  ${t("labels.depth")} ${selected.generation}  ${selected.ratio || base}`;
}
