import { nearestPitchLabel } from "../core/pitch.js";
import { t } from "../i18n/i18n.js";
import { activeRatioText as formatActiveRatioText } from "./active-ratio.js";

export function updateStatusLabels({
  els,
  editorIntervalText,
  now,
  state,
  timerBadgeText,
  updateParentDirectionLabels,
  updateRatioCurveState,
  updateVibratoState,
}) {
  if (state.workspaceMode === "editor") {
    const selectedEditorNote = state.editor.notes.find((note) => note.id === state.editor.selectedNoteIds[0]);
    els.startStop.textContent = state.editor.isLooping || state.editor.isPaused ? "■" : "▶";
    els.pauseResume.textContent = state.editor.isPaused ? "▶Ⅱ" : "Ⅱ";
    els.pauseResume.disabled = !state.editor.isLooping && !state.editor.isPaused;
    els.pauseResume.classList.toggle("active", state.editor.isPaused);
    els.seed.disabled = state.editor.isPaused;
    els.seedMode.disabled = state.editor.isLooping || state.editor.isPaused;
    els.seedMode.value = state.seedMode;
    els.statusLabel.textContent = state.editor.isPaused
      ? t("status.paused")
      : state.editor.isLooping
        ? t("status.editorLooping")
        : t("status.editorStopped");
    els.noteCount.textContent = String(state.editor.notes.length);
    const lastEditorNote = state.editor.notes[state.editor.notes.length - 1];
    els.lastDepth.textContent = String(lastEditorNote?.generation ?? 0);
    els.timerOpen.textContent = t("labels.timer");
    els.timerBadge.textContent = timerBadgeText();
    els.timerBadge.classList.remove("hidden");
    els.seed.setAttribute("title", t("editor.addRootTitle"));
    els.seed.setAttribute("aria-label", t("editor.addRootTitle"));
    els.activeRatioLabel.textContent = editorIntervalText || (selectedEditorNote
      ? `${t("editor.selectedNote")}: ${selectedEditorNote.frequency.toFixed(2)}Hz`
      : t("editor.activeRatioPlaceholder"));
    els.globalRatioDisplay.value = state.diesisRatioDisplay;
    if (els.diesisRatioDisplay) els.diesisRatioDisplay.value = state.diesisRatioDisplay;
    updateRatioCurveState();
    updateParentDirectionLabels();
    updateVibratoState();
    els.detailLabel.textContent = selectedEditorNote
      ? `${nearestPitchLabel(selectedEditorNote.frequency)}  ${selectedEditorNote.start.toFixed(2)}s-${(selectedEditorNote.start + selectedEditorNote.duration).toFixed(2)}s`
      : t("editor.detailPlaceholder");
    return;
  }

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
