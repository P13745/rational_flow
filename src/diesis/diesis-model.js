import { factorRatioLabel, parseFraction } from "../core/ratio-math.js";

export function diesisRatioLabel(entry, { displayMode, showPower }) {
  if (displayMode === "factors") {
    if (showPower && entry.display?.powerFactors) return entry.display.powerFactors;
    return entry.display?.factors || factorRatioLabel(entry.ratio);
  }
  if (showPower && entry.display?.powerRatio) return entry.display.powerRatio;
  return entry.display?.ratio || entry.ratio;
}

export function diesisFrequencies(ratio, baseFrequency, mode = "normal") {
  const frac = parseFraction(ratio);
  if (!frac) return [];
  const upperFrequency = baseFrequency * (frac.numerator / frac.denominator);
  const frequencies = [
    { frequency: baseFrequency, gain: 1 },
    { frequency: upperFrequency, gain: 1 },
  ];
  if (mode === "difference") {
    const diff = Math.abs(upperFrequency - baseFrequency);
    if (diff > 0) frequencies.push({ frequency: diff, gain: 0.8 });
  }
  return frequencies;
}

export function isDifferenceAudible(ratio, baseFrequency) {
  const frequencies = diesisFrequencies(ratio, baseFrequency, "difference");
  const difference = frequencies.at(-1)?.frequency || 0;
  return frequencies.length < 3 || difference >= 20;
}
