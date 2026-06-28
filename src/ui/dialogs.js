export function openDialog(dialog) {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

export function closeOnBackdrop(dialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

export function setHelpPage(page) {
  document.querySelectorAll("[data-help-page]").forEach((element) => {
    const isTarget = element.dataset.helpPage === page;
    if (element.classList.contains("help-block")) {
      element.classList.toggle("hidden", !isTarget);
    } else if (element.tagName === "BUTTON") {
      element.classList.toggle("active", isTarget);
      element.setAttribute("aria-selected", String(isTarget));
    }
  });
}
