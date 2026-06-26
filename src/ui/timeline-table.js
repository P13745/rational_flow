import { els } from "../dom.js";
import { state } from "../state.js";
import { t } from "../i18n/i18n.js";

function estimatePastFillerRows(upcomingRows, playingRows, pastRows) {
  const tableWrap = els.noteRows?.closest(".event-table-wrap");
  if (!tableWrap) return 0;
  const headerHeight = 29;
  const rowHeight = 33;
  const groupHeaders = 3;
  const usedHeight = groupHeaders * headerHeight + (upcomingRows + playingRows + pastRows) * rowHeight;
  const rect = tableWrap.getBoundingClientRect();
  const viewportFallback = Math.max(0, window.innerHeight - rect.top - 1);
  const availableHeight = Math.max(tableWrap.clientHeight, rect.height, viewportFallback);
  return Math.max(0, Math.ceil((availableHeight - usedHeight) / rowHeight));
}

function appendEventGroup(fragment, label, items, now, rowState, options = {}) {
  const header = document.createElement("tr");
  header.className = `group-row ${rowState}`;
  const total = options.total ?? items.length;
  const countLabel = total === items.length ? String(items.length) : `${items.length}/${total}`;
  header.innerHTML = `<td colspan="5">${label}<span>${countLabel}</span></td>`;
  fragment.appendChild(header);

  const appendEmptyRow = () => {
    const tr = document.createElement("tr");
    tr.className = `event-row ${rowState} empty`;
    tr.innerHTML = "<td>&nbsp;</td><td></td><td></td><td></td><td></td>";
    fragment.appendChild(tr);
  };
  const minRows = options.minRows || 0;
  const emptyRows = Math.max(0, minRows - items.length);
  if (options.alignBottom) {
    for (let i = 0; i < emptyRows; i += 1) appendEmptyRow();
  }

  items.forEach((note) => {
    const tr = document.createElement("tr");
    const isCommaHit = options.commaNoteIds?.has(note.id);
    const isSeed = !note.ratio;
    tr.className = `event-row ${rowState}${isSeed ? " seed" : ""}${note.id === state.selectedNoteId ? " active" : ""}${isCommaHit ? " comma-hit" : ""}`;
    tr.title = t("dialogs.previewNoteTitle");
    const start = note.start - now;
    tr.innerHTML = `
      <td>${start >= 0 ? "+" : ""}${start.toFixed(1)}</td>
      <td>${note.frequency.toFixed(1)}</td>
      <td>${Number.isFinite(note.duration) ? note.duration.toFixed(1) : t("table.drone")}</td>
      <td>${note.generation}</td>
      <td>${note.ratio || "---"}</td>
    `;
    tr.addEventListener("click", () => {
      state.selectedNoteId = note.id;
      options.previewFrequency(note.frequency);
      options.render(true);
    });
    fragment.appendChild(tr);
  });

  if (!options.alignBottom) {
    for (let i = 0; i < emptyRows; i += 1) appendEmptyRow();
  }
}

export function renderTimelineTable({
  now,
  settings,
  findCloseActivePairs,
  previewFrequency,
  render,
}) {
  const leftEdgeTime = now - settings.windowSize / 2;
  const visible = state.notes.filter((note) => note.start + note.duration >= leftEdgeTime);
  const allUpcoming = visible
    .filter((note) => note.start > now)
    .sort((a, b) => a.start - b.start);
  const upcoming = allUpcoming.slice(0, 7).sort((a, b) => b.start - a.start);
  const active = visible
    .filter((note) => note.start <= now && note.start + note.duration >= now)
    .sort((a, b) => b.frequency - a.frequency);
  const past = visible
    .filter((note) => note.start + note.duration < now)
    .sort((a, b) => (b.start + b.duration) - (a.start + a.duration));
  const commaNoteIds = new Set(findCloseActivePairs(active).flatMap((pair) => [pair.low.id, pair.high.id]));
  const upcomingRows = Math.max(7, upcoming.length);
  const playingRows = Math.max(15, active.length);
  const pastMinRows = Math.max(0, estimatePastFillerRows(upcomingRows, playingRows, past.length));

  els.noteRows.textContent = "";
  const fragment = document.createDocumentFragment();
  appendEventGroup(fragment, t("table.upcoming"), upcoming, now, "upcoming", {
    minRows: 7,
    total: allUpcoming.length,
    commaNoteIds,
    alignBottom: true,
    previewFrequency,
    render,
  });
  appendEventGroup(fragment, t("table.playing"), active, now, "playing", {
    minRows: 15,
    commaNoteIds,
    previewFrequency,
    render,
  });
  appendEventGroup(fragment, t("table.past"), past, now, "past", {
    minRows: pastMinRows,
    commaNoteIds,
    previewFrequency,
    render,
  });
  els.noteRows.appendChild(fragment);
}
