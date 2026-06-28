import { clamp } from "../core/utils.js";

export function closePairLabel(pair) {
  const base = `${pair.ratio}  ${pair.cents.toFixed(1)}¢`;
  return pair.namedInterval ? `${pair.namedInterval.name}  ${base}` : base;
}

function rectsOverlap(a, b, padding = 4) {
  return !(
    a.x + a.width + padding < b.x ||
    b.x + b.width + padding < a.x ||
    a.y + a.height + padding < b.y ||
    b.y + b.height + padding < a.y
  );
}

export function placeMarkerLabel(x, y, width, height, canvasWidth, canvasHeight, occupiedRects, index) {
  const offsets = [
    [24, 0],
    [-24, 0],
    [24, -30],
    [-24, -30],
    [24, 30],
    [-24, 30],
    [72, 0],
    [-72, 0],
    [72, -34],
    [-72, -34],
    [72, 34],
    [-72, 34],
  ];

  for (let i = 0; i < offsets.length; i += 1) {
    const [dx, dy] = offsets[(i + index) % offsets.length];
    const side = dx >= 0 ? 1 : -1;
    const left = clamp(x + dx + (side > 0 ? 0 : -width), 4, canvasWidth - width - 4);
    const top = clamp(y + dy - height / 2, 4, canvasHeight - height - 58);
    const rect = { x: left, y: top, width, height };
    if (!occupiedRects.some((other) => rectsOverlap(rect, other))) {
      occupiedRects.push(rect);
      return rect;
    }
  }

  const fallback = {
    x: clamp(x + 24, 4, canvasWidth - width - 4),
    y: clamp(y + index * (height + 4) - height / 2, 4, canvasHeight - height - 58),
    width,
    height,
  };
  occupiedRects.push(fallback);
  return fallback;
}
