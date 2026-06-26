import { els } from "../dom.js";
import { t } from "../i18n/i18n.js";

export function setMobileView(view, { renderTable, drawCanvas }) {
  const nextView = ["controls", "main", "list"].includes(view) ? view : "main";
  document.body.dataset.mobileView = nextView;
  [
    [els.mobileControlsView, "controls"],
    [els.mobileMainView, "main"],
    [els.mobileListView, "list"],
  ].forEach(([button, buttonView]) => {
    button.classList.toggle("active", buttonView === nextView);
  });
  if (nextView === "list") renderTable();
  window.requestAnimationFrame(drawCanvas);
}

export function setMobileToolsOpen(open) {
  const isOpen = Boolean(open);
  const transport = document.querySelector(".transport");
  if (!transport || !els.mobileToolsToggle) return;
  transport.dataset.toolsOpen = String(isOpen);
  els.mobileToolsToggle.setAttribute("aria-expanded", String(isOpen));
  els.mobileToolsToggle.textContent = t(isOpen ? "mobile.less" : "mobile.more");
}
