import { state } from "../state.js";

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

export function syncWakeLock() {
  if (shouldHoldWakeLock()) requestWakeLock();
  else releaseWakeLock();
}
