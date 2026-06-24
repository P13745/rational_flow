export function timerCountdownText(timerEndTime, now) {
  if (timerEndTime === null) return "";
  const remaining = Math.max(0, timerEndTime - now);
  const minutes = Math.floor(remaining / 60);
  const seconds = Math.floor(remaining % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function timerStatusText({ timerCompleted, timerEndTime, now }) {
  if (timerCompleted) return "Done";
  const countdown = timerCountdownText(timerEndTime, now);
  if (!countdown) return "No Timer Set";
  return `${countdown} left`;
}

export function timerBadgeText({ timerCompleted, timerEndTime, now }) {
  if (timerCompleted) return "Done";
  return timerCountdownText(timerEndTime, now) || "OFF";
}
