import { diesisCollectionCookie } from "../config.js";
import { state } from "../state.js";
import { readCookie, writeCookie } from "../storage/cookies.js";

export function loadDiesisCollection() {
  const raw = readCookie(diesisCollectionCookie);
  state.discoveredDiesisCounts = new Map();
  raw
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => {
      const [indexPart, countPart] = part.split(":");
      const index = parseInt(indexPart, 36);
      const count = countPart ? parseInt(countPart, 36) : 1;
      if (Number.isInteger(index) && index >= 0) {
        state.discoveredDiesisCounts.set(index, Math.max(1, Number.isInteger(count) ? count : 1));
      }
    });
}

export function saveDiesisCollection() {
  const value = [...state.discoveredDiesisCounts.entries()]
    .sort(([a], [b]) => a - b)
    .map(([index, count]) => `${index.toString(36)}:${count.toString(36)}`)
    .join(".");
  writeCookie(diesisCollectionCookie, value);
}

export function resetDiesisCollection() {
  state.discoveredDiesisCounts = new Map();
  saveDiesisCollection();
}

export function diesisIndex(entry) {
  return state.namedCommaIntervals.indexOf(entry);
}

export function markDiesisDiscovered(entry) {
  const index = diesisIndex(entry);
  if (index < 0) return false;
  state.discoveredDiesisCounts.set(index, (state.discoveredDiesisCounts.get(index) || 0) + 1);
  saveDiesisCollection();
  return true;
}
