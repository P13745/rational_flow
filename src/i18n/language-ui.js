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

function applyDataTranslationAttributes() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.setAttribute("title", t(element.dataset.i18nTitle));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-checkbox-label]").forEach((element) => {
    setCheckboxLabel(element, t(element.dataset.i18nCheckboxLabel));
  });
}

export function applyLanguageTargets({ els, helpTargets, language, targets }) {
  document.documentElement.lang = language;
  document.title = t("title");
  applyDataTranslationAttributes();
  els.languageToggle.textContent = t("langToggle");
  [...targets, ...helpTargets].forEach(([selector, key, attribute]) => {
    applyTranslationTarget(selector, key, attribute);
  });
}
