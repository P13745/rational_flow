import { state } from "../state.js";

export function t(key) {
  const source = window.RF_I18N?.[state.currentLanguage] || window.RF_I18N?.ja || {};
  return key.split(".").reduce((value, part) => value?.[part], source) ?? key;
}

export function localizedField(value) {
  if (value && typeof value === "object") {
    return value[state.currentLanguage] ?? value.ja ?? value.en ?? "";
  }
  return value ?? "";
}
