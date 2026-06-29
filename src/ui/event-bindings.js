import { els } from "../dom.js";
import { state } from "../state.js";
import { closeOnBackdrop, openDialog, setHelpPage } from "./dialogs.js";

export function registerEventBindings({
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
}) {
  els.startStop.addEventListener("click", () => {
    if (state.workspaceMode === "editor") {
      if (state.editor.isLooping || state.editor.isPaused) stopEditorLoop();
      else startEditorLoop();
      return;
    }
    if (state.isRunning || state.isPaused || state.isDraining) stop();
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
  els.playWorkspace.addEventListener("click", () => setWorkspaceMode("play"));
  els.editorWorkspace.addEventListener("click", () => setWorkspaceMode("editor"));
  els.pauseResume.addEventListener("click", () => {
    if (state.workspaceMode === "editor") toggleEditorPause();
    else togglePause();
  });
  els.seedMode.addEventListener("change", () => setSeedMode(els.seedMode.value));
  els.seed.addEventListener("click", addManualNote);
  els.clear.addEventListener("click", () => {
    if (state.workspaceMode === "editor") clearEditorClip();
    else clearAll();
  });
  els.visualizer.addEventListener("pointerdown", handleCanvasPointer);
  els.visualizer.addEventListener("pointermove", handleCanvasPointer);
  els.visualizer.addEventListener("pointerup", handleCanvasPointer);
  els.visualizer.addEventListener("pointercancel", handleCanvasPointer);
  els.autoMode.addEventListener("click", () => setMode("auto"));
  els.listMode.addEventListener("click", () => setMode("list"));
  els.editorPartialGrid.addEventListener("click", () => setEditorRatioSource("partialGrid"));
  els.editorSingleRatio.addEventListener("click", () => setEditorRatioSource("single"));
  els.simpleRatioMode.addEventListener("click", () => setRatioBias("simple"));
  els.equalRatioMode.addEventListener("click", () => setRatioBias("equal"));
  els.complexRatioMode.addEventListener("click", () => setRatioBias("complex"));

  els.detailsOpen.addEventListener("click", () => openDialog(els.detailsDialog));
  closeOnBackdrop(els.detailsDialog);

  els.helpOpen.addEventListener("click", () => {
    setHelpPage("about");
    openDialog(els.helpDialog);
  });
  closeOnBackdrop(els.helpDialog);
  document.querySelectorAll(".help-tabs button").forEach((button) => {
    button.addEventListener("click", () => setHelpPage(button.dataset.helpPage));
  });

  els.presetsOpen.addEventListener("click", () => {
    renderPresetBrowser();
    openDialog(els.presetsDialog);
  });
  closeOnBackdrop(els.presetsDialog);
  els.presetLoad.addEventListener("click", loadSelectedPreset);

  els.diesisOpen.addEventListener("click", () => {
    renderDiesisControls();
    renderDiesisList();
    openDialog(els.diesisDialog);
  });
  closeOnBackdrop(els.diesisDialog);
  closeOnBackdrop(els.diesisDetailDialog);

  const setRatioDisplayMode = (nextMode) => {
    state.diesisRatioDisplay = nextMode;
    renderDiesisControls();
    renderDiesisList();
    render(true);
  };
  els.globalRatioDisplay.addEventListener("change", () => setRatioDisplayMode(els.globalRatioDisplay.value));
  els.diesisRatioDisplay.addEventListener("change", () => setRatioDisplayMode(els.diesisRatioDisplay.value));
  els.diesisDerivedToggle.addEventListener("input", () => {
    state.diesisShowDerived = els.diesisDerivedToggle.checked;
    renderDiesisList();
  });
  els.diesisPowerToggle.addEventListener("input", () => {
    state.diesisShowPower = els.diesisPowerToggle.checked;
    renderDiesisList();
  });
  els.diesisCollectionFilter.addEventListener("change", () => {
    state.diesisCollectionFilter = els.diesisCollectionFilter.value;
    renderDiesisList();
  });
  els.diesisLimitFilter.addEventListener("change", () => {
    const value = els.diesisLimitFilter.value;
    state.diesisLimitFilter = value === "all" ? Infinity : Number(value);
    renderDiesisList();
  });
  els.diesisDenominatorDigitsFilter.addEventListener("change", () => {
    const value = els.diesisDenominatorDigitsFilter.value;
    state.diesisDenominatorDigitsFilter = value === "all" ? Infinity : Number(value);
    renderDiesisList();
  });
  if (els.mobileToolsToggle) {
    els.mobileToolsToggle.addEventListener("click", () => {
      const transport = document.querySelector(".transport");
      setMobileToolsOpen(transport?.dataset.toolsOpen !== "true");
    });
  }

  els.timerOpen.addEventListener("click", () => openDialog(els.timerDialog));
  closeOnBackdrop(els.timerDialog);
  els.collectionReset.addEventListener("click", resetDiesisCollection);

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
    els.timerMinutes,
    els.volume,
    els.allowDuplication,
    els.rootedDepth,
    els.parentBiasBasis,
    els.parentBiasDirection,
    els.parentBiasCurve,
    els.parentBiasStrength,
    els.ratioIntegerLimit,
    els.vibratoEnabled,
    els.vibratoRateMin,
    els.vibratoRateMax,
    els.vibratoDepthMin,
    els.vibratoDepthMax,
  ].forEach((el) => el.addEventListener("input", render));
  [
    els.editorGridBase,
    els.editorGridDirection,
    els.editorGridNumeratorMin,
    els.editorGridNumeratorMax,
    els.editorSingleRatioInput,
    els.editorPairSelect,
  ].forEach((el) => el.addEventListener("input", () => {
    syncEditorControls();
    render(true);
  }));

  window.addEventListener("resize", drawCanvas);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") syncWakeLock();
  });
  document.addEventListener("keydown", (event) => {
    const tagName = document.activeElement?.tagName;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(tagName)) return;
    if (event.code === "Space") {
      event.preventDefault();
      if (state.workspaceMode === "editor") {
        if (state.editor.isLooping || state.editor.isPaused) toggleEditorPause();
        else startEditorLoop();
      } else if (state.isRunning || state.isPaused || state.isDraining) togglePause();
      else start();
    }
    if (event.key.toLowerCase() === "n") {
      addManualNote();
    }
    if (state.workspaceMode === "editor" && (event.key === "Delete" || event.key === "Backspace")) {
      event.preventDefault();
      deleteSelectedEditorNotes();
    }
  });
}
