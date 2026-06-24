import { els } from "../dom.js";
import { state } from "../state.js";

function openDialog(dialog) {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeOnBackdrop(dialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

export function registerEventBindings({
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
}) {
  els.startStop.addEventListener("click", () => {
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

  window.addEventListener("resize", drawCanvas);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") syncWakeLock();
  });
  document.addEventListener("keydown", (event) => {
    const tagName = document.activeElement?.tagName;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(tagName)) return;
    if (event.code === "Space") {
      event.preventDefault();
      if (state.isRunning || state.isPaused || state.isDraining) togglePause();
      else start();
    }
    if (event.key.toLowerCase() === "n") {
      addManualNote();
    }
  });
}
