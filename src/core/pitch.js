import { germanPitchClasses } from "../config.js";

export function cFrequency(octave) {
  return 261.6255653005986 * 2 ** (octave - 4);
}

export function nearestPitchLabel(frequency) {
  const midi = Math.round(69 + 12 * Math.log2(frequency / 440));
  const nearestFrequency = 440 * 2 ** ((midi - 69) / 12);
  const cents = 1200 * Math.log2(frequency / nearestFrequency);
  const name = germanPitchClasses[((midi % 12) + 12) % 12];
  const sign = cents >= 0 ? "+" : "";
  return `${name}${sign}${cents.toFixed(1)}¢`;
}
