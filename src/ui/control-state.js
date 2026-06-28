import { t } from "../i18n/i18n.js";

export function updateParentDirectionLabels(els) {
  const previousValue = els.parentBiasDirection.value === "none" ? "low" : els.parentBiasDirection.value;
  const isTime = els.parentBiasBasis.value === "time";
  const low = els.parentBiasDirection.querySelector('option[value="low"]');
  const high = els.parentBiasDirection.querySelector('option[value="high"]');
  if (low) low.textContent = t(isTime ? "modes.old" : "modes.shallow");
  if (high) high.textContent = t(isTime ? "modes.new" : "modes.deep");
  const isEqual = els.parentBiasBasis.value === "equal";
  const isDepth = els.parentBiasBasis.value === "depth";
  els.parentBiasDirection.disabled = isEqual;
  els.parentBiasCurve.disabled = isEqual;
  els.parentBiasStrength.disabled = isEqual;
  els.rootedDepth.disabled = !isDepth;
  els.parentBiasDirection.value = isEqual ? "none" : previousValue;
  if (isEqual) els.parentBiasCurve.value = "none";
  if (!isEqual && els.parentBiasCurve.value === "none") els.parentBiasCurve.value = "linear";
}

export function updateRatioCurveState(els, ratioBias) {
  const isEqual = ratioBias === "equal";
  els.ratioBiasCurve.disabled = isEqual;
  if (isEqual) els.ratioBiasCurve.value = "none";
  if (!isEqual && els.ratioBiasCurve.value === "none") els.ratioBiasCurve.value = "linear";
}

export function updateVibratoState(els) {
  const disabled = !els.vibratoEnabled.checked;
  [
    els.vibratoRateMin,
    els.vibratoRateMax,
    els.vibratoDepthMin,
    els.vibratoDepthMax,
  ].forEach((input) => {
    input.disabled = disabled;
  });
}
