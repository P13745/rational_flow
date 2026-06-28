import { gcd, parseFraction } from "./ratio-math.js";

export function fractionWithinIntegerLimit(frac, limit) {
  return Math.abs(frac.numerator) <= limit && Math.abs(frac.denominator) <= limit;
}

export function buildCandidates({ settings, mode, fractionListValue, baseFreq = null }) {
  const candidates = [];
  const ratioWeightOf = (numerator, denominator) => {
    if (settings.ratioBias === "equal") return 1;
    const complexity = Math.abs(numerator) + Math.abs(denominator);
    if (settings.ratioBias === "complex") {
      return settings.ratioBiasCurve === "exponential" ? complexity * complexity : complexity;
    }
    return settings.ratioBiasCurve === "exponential" ? 1 / (complexity * complexity) : 1 / complexity;
  };

  if (mode === "list") {
    const parts = fractionListValue.split(",");
    parts.forEach((part) => {
      const frac = parseFraction(part);
      if (!frac || frac.numerator === frac.denominator) return;
      if (!fractionWithinIntegerLimit(frac, settings.ratioIntegerLimit)) return;
      const ratio = frac.numerator / frac.denominator;
      const frequency = baseFreq === null ? null : baseFreq * ratio;
      if (frequency !== null && (frequency < settings.minFreq || frequency > settings.maxFreq)) return;
      const weight = ratioWeightOf(frac.numerator, frac.denominator);
      candidates.push({ ratio, weight, frac });
    });
    return candidates;
  }

  for (let denominator = 1; denominator <= settings.dMax; denominator += 1) {
    for (let numerator = 1; numerator <= settings.nMax; numerator += 1) {
      if (numerator === denominator) continue;
      const divisor = gcd(numerator, denominator);
      const frac = { numerator: numerator / divisor, denominator: denominator / divisor };
      if (!fractionWithinIntegerLimit(frac, settings.ratioIntegerLimit)) continue;
      const ratio = frac.numerator / frac.denominator;
      const frequency = baseFreq === null ? null : baseFreq * ratio;
      if (frequency !== null && (frequency < settings.minFreq || frequency > settings.maxFreq)) continue;
      const weight = ratioWeightOf(numerator, denominator);
      candidates.push({ ratio, weight, frac });
    }
  }

  return candidates;
}

export function chooseWeighted(candidates) {
  const total = candidates.reduce((sum, item) => sum + item.weight, 0);
  let pick = Math.random() * total;
  for (const item of candidates) {
    pick -= item.weight;
    if (pick <= 0) return item;
  }
  return candidates[candidates.length - 1];
}

export function chooseBase(bases, settings) {
  if (settings.parentBiasBasis === "equal" || bases.length < 2) {
    return bases[Math.floor(Math.random() * bases.length)];
  }

  const values = bases.map((note) => settings.parentBiasBasis === "time" ? note.start : note.generation);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const span = Math.max(0.0001, maxValue - minValue);
  const curvePower = 1 + settings.parentBiasStrength * 5;
  const weightedBases = bases.map((note) => {
    const value = settings.parentBiasBasis === "time" ? note.start : note.generation;
    const position = (value - minValue) / span;
    const target = settings.parentBiasDirection === "low" ? 1 - position : position;
    const weight = settings.parentBiasCurve === "exponential"
      ? Math.exp(target * curvePower)
      : 1 + target * curvePower;
    return { note, weight };
  });

  return chooseWeighted(weightedBases).note;
}
