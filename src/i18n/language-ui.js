import { t } from "./i18n.js";

function setCheckboxLabel(input, text) {
  if (!input?.parentNode) return;
  [...input.parentNode.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      node.textContent = `\n            ${text}\n          `;
    }
  });
}

function applyTranslationTarget(selector, key, attribute = "text") {
  const element = document.querySelector(selector);
  if (!element) return;
  const value = t(key);
  if (attribute === "checkbox-label") {
    setCheckboxLabel(element, value);
  } else if (attribute === "aria-label") {
    element.setAttribute("aria-label", value);
  } else if (attribute === "title") {
    element.setAttribute("title", value);
  } else {
    element.textContent = value;
  }
}

export function applyLanguageTargets({ els, helpTargets, language, targets }) {
  document.documentElement.lang = language;
  document.title = t("title");
  els.languageToggle.textContent = t("langToggle");
  [...targets, ...helpTargets].forEach(([selector, key, attribute]) => {
    applyTranslationTarget(selector, key, attribute);
  });
}
