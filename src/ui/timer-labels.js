import { t } from "../i18n/i18n.js";

export function timerCountdownText(timerEndTime, now) {
  if (timerEndTime === null) return "";
  const remaining = Math.max(0, timerEndTime - now);
  const minutes = Math.floor(remaining / 60);
  const seconds = Math.floor(remaining % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function timerStatusText({ timerCompleted, timerEndTime, now }) {
  if (timerCompleted) return t("status.done");
  const countdown = timerCountdownText(timerEndTime, now);
  if (!countdown) return t("status.noTimerSet");
  return `${countdown} ${t("status.timeLeft")}`;
}

export function timerBadgeText({ timerCompleted, timerEndTime, now }) {
  if (timerCompleted) return t("status.done");
  return timerCountdownText(timerEndTime, now) || t("status.off");
}
