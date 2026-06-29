import { els } from "../dom.js";
import { state } from "../state.js";
import { t } from "../i18n/i18n.js";

export function renderEditorTable({
  onDelete,
  onMute,
  onSelect,
  selectNote,
} = {}) {
  els.noteRows.textContent = "";
  const fragment = document.createDocumentFragment();

  const header = document.createElement("tr");
  header.className = "group-row editor";
  header.innerHTML = `<td colspan="5">${t("labels.editorTimeline")}<span>${state.editor.notes.length}</span></td>`;
  fragment.appendChild(header);

  if (!state.editor.notes.length) {
    const empty = document.createElement("tr");
    empty.className = "event-row editor empty";
    empty.innerHTML = `<td colspan="5">${t("editor.emptyGraph")}</td>`;
    fragment.appendChild(empty);
  } else {
    state.editor.notes
      .slice()
      .sort((a, b) => a.start - b.start || a.frequency - b.frequency)
      .forEach((note) => {
        const tr = document.createElement("tr");
        tr.className = `event-row editor${state.editor.selectedNoteIds.includes(note.id) ? " active" : ""}${note.muted ? " muted" : ""}`;
        tr.innerHTML = `
          <td>${note.start.toFixed(2)}</td>
          <td>${(note.start + note.duration).toFixed(2)}</td>
          <td>${note.frequency.toFixed(1)}</td>
          <td>${note.ratio || "---"}</td>
          <td class="editor-actions">
            <button type="button" data-action="mute">${note.muted ? t("editor.unmute") : t("editor.mute")}</button>
            <button type="button" data-action="delete">${t("editor.delete")}</button>
          </td>
        `;
        tr.addEventListener("click", (event) => {
          const action = event.target?.dataset?.action;
          if (action === "mute") {
            onMute?.(note.id);
            return;
          }
          if (action === "delete") {
            onDelete?.(note.id);
            return;
          }
          if (selectNote) selectNote(note.id, { extend: event.shiftKey || event.metaKey || event.ctrlKey });
          else state.editor.selectedNoteIds = [note.id];
          if (onSelect) onSelect();
          else renderEditorTable();
        });
        fragment.appendChild(tr);
      });
  }

  els.noteRows.appendChild(fragment);
}
