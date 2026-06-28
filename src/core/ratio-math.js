import { maxSafeRatioInteger } from "../config.js";

const superscriptDigits = {
  "-": "⁻",
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
};

export function superscriptNumber(value) {
  return String(value)
    .split("")
    .map((character) => superscriptDigits[character] ?? character)
    .join("");
}

export function superscriptPowers(label) {
  return String(label)
    .replace(/\^(-?\d+)/g, (_, exponent) => superscriptNumber(exponent))
    .replace(/\s*\/\s*/g, "/");
}

export function gcd(a, b) {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  if (!Number.isFinite(x) || !Number.isFinite(y)) return 1;
  while (y !== 0) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
}

export function largestPrimeFactor(value) {
  let n = Math.abs(Math.trunc(value));
  let largest = 1;
  for (let factor = 2; factor * factor <= n; factor += factor === 2 ? 1 : 2) {
    while (n % factor === 0) {
      largest = factor;
      n /= factor;
    }
  }
  return Math.max(largest, n);
}

export function ratioLimitLabel(ratio) {
  const limit = ratioLimitValue(ratio);
  return limit ? `${limit}-limit` : "---";
}

export function ratioLimitValue(ratio) {
  const frac = parseFraction(ratio);
  if (!frac) return 0;
  return Math.max(largestPrimeFactor(frac.numerator), largestPrimeFactor(frac.denominator));
}

export function vectorFromFraction(frac) {
  const vector = new Map();
  addIntegerFactorsToVector(vector, Math.abs(frac.numerator), 1);
  addIntegerFactorsToVector(vector, Math.abs(frac.denominator), -1);
  return vector;
}

export function addIntegerFactorsToVector(vector, value, direction) {
  let n = Math.abs(Math.trunc(value));
  if (n <= 1) return;
  for (let factor = 2; factor * factor <= n; factor += factor === 2 ? 1 : 2) {
    while (n % factor === 0) {
      vector.set(factor, (vector.get(factor) || 0) + direction);
      if (vector.get(factor) === 0) vector.delete(factor);
      n /= factor;
    }
  }
  if (n > 1) vector.set(n, (vector.get(n) || 0) + direction);
}

export function cloneVector(vector) {
  return new Map(vector || []);
}

export function addVectors(a, b) {
  const result = cloneVector(a);
  b.forEach((exponent, prime) => {
    const next = (result.get(prime) || 0) + exponent;
    if (next) result.set(prime, next);
    else result.delete(prime);
  });
  return result;
}

export function subtractVectors(a, b) {
  const result = cloneVector(a);
  b.forEach((exponent, prime) => {
    const next = (result.get(prime) || 0) - exponent;
    if (next) result.set(prime, next);
    else result.delete(prime);
  });
  return result;
}

export function vectorKey(vector) {
  return [...vector.entries()]
    .filter(([, exponent]) => exponent !== 0)
    .sort(([a], [b]) => a - b)
    .map(([prime, exponent]) => `${prime}:${exponent}`)
    .join("|");
}

export function safeMultiply(value, factor) {
  if (factor === 1) return value;
  if (!Number.isFinite(value) || !Number.isFinite(factor)) return null;
  if (value > Math.floor(maxSafeRatioInteger / factor)) return null;
  return value * factor;
}

export function vectorToSafeFraction(vector) {
  let numerator = 1;
  let denominator = 1;
  const entries = [...vector.entries()].sort(([a], [b]) => a - b);
  for (const [prime, exponent] of entries) {
    const count = Math.abs(exponent);
    for (let i = 0; i < count; i += 1) {
      if (exponent > 0) {
        numerator = safeMultiply(numerator, prime);
        if (numerator === null) return null;
      } else {
        denominator = safeMultiply(denominator, prime);
        if (denominator === null) return null;
      }
    }
  }
  return { numerator, denominator };
}

export function vectorFactorLabel(vector) {
  const positive = [];
  const negative = [];
  [...vector.entries()].sort(([a], [b]) => a - b).forEach(([prime, exponent]) => {
    if (!exponent) return;
    const label = Math.abs(exponent) === 1 ? String(prime) : `${prime}${superscriptNumber(Math.abs(exponent))}`;
    if (exponent > 0) positive.push(label);
    else negative.push(label);
  });
  if (!positive.length && !negative.length) return "1";
  const numerator = positive.length ? positive.join("·") : "1";
  return negative.length ? `${numerator}/${negative.join("·")}` : numerator;
}

export function positiveVectorFactorLabel(vector) {
  const parts = [];
  [...vector.entries()].sort(([a], [b]) => a - b).forEach(([prime, exponent]) => {
    if (exponent <= 0) return;
    parts.push(exponent === 1 ? String(prime) : `${prime}${superscriptNumber(exponent)}`);
  });
  return parts.length ? parts.join("·") : "1";
}

export function normalizeVectorsToPositive(vectors) {
  const primes = new Set();
  vectors.forEach((vector) => {
    vector.forEach((exponent, prime) => {
      if (exponent !== 0) primes.add(prime);
    });
  });
  const offsets = new Map();
  primes.forEach((prime) => {
    const minExponent = Math.min(...vectors.map((vector) => vector.get(prime) || 0));
    offsets.set(prime, minExponent < 0 ? -minExponent : 0);
  });
  return vectors.map((vector) => {
    const normalized = new Map();
    primes.forEach((prime) => {
      const exponent = (vector.get(prime) || 0) + (offsets.get(prime) || 0);
      if (exponent !== 0) normalized.set(prime, exponent);
    });
    return normalized;
  });
}

export function factorIntegerLabel(value) {
  let n = Math.abs(Math.trunc(value));
  if (n <= 1) return "1";
  const parts = [];
  for (let factor = 2; factor * factor <= n; factor += factor === 2 ? 1 : 2) {
    let exponent = 0;
    while (n % factor === 0) {
      exponent += 1;
      n /= factor;
    }
    if (exponent) parts.push(exponent === 1 ? String(factor) : `${factor}${superscriptNumber(exponent)}`);
  }
  if (n > 1) parts.push(String(n));
  return parts.join("·");
}

export function factorRatioLabel(ratio) {
  const frac = parseFraction(ratio);
  if (!frac) return ratio;
  return `${factorIntegerLabel(frac.numerator)}/${factorIntegerLabel(frac.denominator)}`;
}

export function parseFraction(raw) {
  const trimmed = raw.trim();
  const match = trimmed.match(/^(-?\d+)(?:\s*\/\s*(-?\d+))?$/);
  if (!match) return null;
  const numerator = Number(match[1]);
  const denominator = match[2] ? Number(match[2]) : 1;
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return null;
  const sign = denominator < 0 ? -1 : 1;
  const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
  return {
    numerator: sign * numerator / divisor,
    denominator: Math.abs(denominator) / divisor,
  };
}

export function fractionLabel(frac) {
  return `${frac.numerator}/${frac.denominator}`;
}

export function approximateFraction(value, maxDenominator = 4096) {
  if (!Number.isFinite(value) || value <= 0) return { numerator: 0, denominator: 1 };
  let lowerN = 0;
  let lowerD = 1;
  let upperN = 1;
  let upperD = 0;

  while (true) {
    const middleN = lowerN + upperN;
    const middleD = lowerD + upperD;
    if (middleD > maxDenominator) break;
    if (middleN / middleD < value) {
      lowerN = middleN;
      lowerD = middleD;
    } else {
      upperN = middleN;
      upperD = middleD;
    }
  }

  const lower = lowerN / lowerD;
  const upper = upperD === 0 ? Infinity : upperN / upperD;
  return Math.abs(value - lower) <= Math.abs(upper - value)
    ? { numerator: lowerN, denominator: lowerD }
    : { numerator: upperN, denominator: upperD };
}

export function reduceIntegerRatio(values) {
  const integers = values.map((value) => Math.max(1, Math.round(value)));
  const divisor = integers.reduce((current, value) => gcd(current, value), integers[0] || 1);
  return integers.map((value) => value / Math.max(1, divisor));
}

export function safeLcm(a, b) {
  const divisor = gcd(a, b);
  const reduced = a / Math.max(1, divisor);
  return safeMultiply(reduced, b);
}

export function tryIntegerRatioFromVectors(vectors) {
  const fractions = vectors.map(vectorToSafeFraction);
  if (fractions.some((frac) => !frac)) return null;
  let commonDenominator = 1;
  for (const frac of fractions) {
    commonDenominator = safeLcm(commonDenominator, frac.denominator);
    if (commonDenominator === null) return null;
  }
  const integers = [];
  for (const frac of fractions) {
    const multiplier = commonDenominator / frac.denominator;
    const value = safeMultiply(frac.numerator, multiplier);
    if (value === null) return null;
    integers.push(value);
  }
  return reduceIntegerRatio(integers);
}
