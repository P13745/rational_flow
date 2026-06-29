import { fractionLabel, gcd } from "../core/ratio-math.js";

function reduceFraction(numerator, denominator) {
  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
  };
}

function candidateFromParts(numerator, denominator, direction = "above") {
  const frac = reduceFraction(numerator, denominator);
  const ratio = direction === "under" ? denominator / numerator : numerator / denominator;
  const vectorFrac = direction === "under"
    ? { numerator: frac.denominator, denominator: frac.numerator }
    : frac;
  return {
    frac: vectorFrac,
    rawRatio: `${numerator}/${denominator}`,
    ratio: fractionLabel(vectorFrac),
    numericRatio: ratio,
  };
}

export function buildPartialGridCandidates({
  base,
  numeratorMin,
  numeratorMax,
  direction = "above",
}) {
  const denominator = Math.max(1, Math.floor(base) || 32);
  const min = Math.max(1, Math.floor(numeratorMin) || denominator + 1);
  const max = Math.max(min, Math.floor(numeratorMax) || min);
  const candidates = [];
  for (let numerator = min; numerator <= max; numerator += 1) {
    if (direction === "both") {
      candidates.push(candidateFromParts(numerator, denominator, "above"));
      candidates.push(candidateFromParts(numerator, denominator, "under"));
    } else {
      candidates.push(candidateFromParts(numerator, denominator, direction));
    }
  }
  return candidates;
}

export function buildSingleRatioCandidate(input) {
  const match = String(input || "").trim().match(/^(\d+)\s*\/\s*(\d+)$/);
  if (!match) return null;
  const numerator = Number(match[1]);
  const denominator = Number(match[2]);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) return null;
  return candidateFromParts(numerator, denominator, "above");
}

export function candidateFrequency(parent, candidate) {
  return parent.frequency * candidate.numericRatio;
}

export function nearestCandidateByY(pointerY, candidates, metrics, parent) {
  const ranked = candidates
    .map((candidate) => {
      const frequency = candidateFrequency(parent, candidate);
      return {
        candidate,
        frequency,
        distance: Math.abs(pointerY - metrics.yOf(frequency)),
      };
    })
    .sort((a, b) => a.distance - b.distance);
  return ranked[0] || null;
}
