import { els } from "../dom.js";
import { state } from "../state.js";
import { t } from "../i18n/i18n.js";
import { factorRatioLabel, ratioLimitLabel, ratioLimitValue, superscriptPowers } from "../core/ratio-math.js";

const BASE_NOTE_OCTAVES = [3, 4, 5, 6, 7, 8, 9];

function syncBaseNoteOptions(select, selectedOctave) {
  const needsOptions =
    select.options.length !== BASE_NOTE_OCTAVES.length ||
    BASE_NOTE_OCTAVES.some((octave, index) => select.options[index]?.value !== String(octave));
  if (needsOptions) {
    select.replaceChildren(
      ...BASE_NOTE_OCTAVES.map((octave) => {
        const option = document.createElement("option");
        option.value = String(octave);
        option.textContent = `C${octave}`;
        return option;
      }),
    );
  }
  select.value = String(selectedOctave);
}

function showDialog(dialog) {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function linkLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (_) {
    return url;
  }
}

function pageLinkLabel(url, pageKind, target = "") {
  const parts = [linkLabel(url), pageKind];
  if (target) parts.push(target);
  return parts.filter(Boolean).join(" - ");
}

function label(key, fallback) {
  const value = t(key);
  return value === key ? fallback : value;
}

function appendField(parent, label, value) {
  if (value === undefined || value === null || value === "") return;
  const row = document.createElement("div");
  row.className = "diesis-detail-field";
  const term = document.createElement("dt");
  term.textContent = label;
  const description = document.createElement("dd");
  description.textContent = value;
  row.append(term, description);
  parent.appendChild(row);
}

function appendLinkField(parent, label, url, detail = "") {
  if (!url) return;
  const row = document.createElement("div");
  row.className = "diesis-detail-field";
  const term = document.createElement("dt");
  term.textContent = label;
  const description = document.createElement("dd");
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noreferrer";
  anchor.textContent = detail || linkLabel(url);
  description.appendChild(anchor);
  row.append(term, description);
  parent.appendChild(row);
}

function section(title) {
  const block = document.createElement("section");
  block.className = "diesis-detail-section";
  const heading = document.createElement("h3");
  heading.textContent = title;
  block.appendChild(heading);
  return block;
}

function denominatorDigitCount(ratio) {
  const denominator = String(ratio).split("/")[1] || "1";
  return denominator.replace(/^-/, "").length;
}

function openDiesisDetail(entry) {
  if (!els.diesisDetailDialog) return;
  els.diesisDetailTitle.textContent = entry.name;
  els.diesisDetailSubtitle.textContent = `${Number(entry.cents).toFixed(5)}¢ · ${entry.ratio}`;
  els.diesisDetailBody.textContent = "";

  const ratioSection = section(label("dialogs.detailRatioSection", "Ratio Forms"));
  const ratioList = document.createElement("dl");
  ratioList.className = "diesis-detail-grid";
  appendField(ratioList, label("dialogs.detailRatio", "Ratio"), entry.display?.ratio || entry.ratio);
  appendField(ratioList, label("dialogs.detailFactors", "Factors"), superscriptPowers(entry.display?.factors || factorRatioLabel(entry.ratio)));
  appendField(ratioList, label("dialogs.detailPowerRatio", "Power Ratio"), entry.display?.powerRatio ? superscriptPowers(entry.display.powerRatio) : "");
  appendField(ratioList, label("dialogs.detailPowerFactors", "Power Factors"), entry.display?.powerFactors ? superscriptPowers(entry.display.powerFactors) : "");
  appendField(ratioList, label("dialogs.detailCents", "Cents"), `${Number(entry.cents).toFixed(5)}¢`);
  appendField(ratioList, label("dialogs.detailLimit", "Limit"), ratioLimitLabel(entry.ratio));
  ratioSection.appendChild(ratioList);

  const nameSection = section(label("dialogs.detailNameSection", "Name / Source"));
  const nameList = document.createElement("dl");
  nameList.className = "diesis-detail-grid";
  appendField(nameList, label("dialogs.detailName", "Name"), entry.name);
  appendField(nameList, label("dialogs.detailAliases", "Aliases"), entry.aliases?.length ? entry.aliases.join(", ") : "-");
  appendLinkField(
    nameList,
    label("dialogs.detailSourceUrl", "Source Page"),
    entry.sourceUrl,
    pageLinkLabel(entry.sourceUrl, label("dialogs.detailSourcePage", "Source page")),
  );
  appendLinkField(
    nameList,
    label("dialogs.detailReferenceUrl", "Reference Location"),
    entry.sourceTextUrl,
    pageLinkLabel(entry.sourceTextUrl, label("dialogs.detailReferencePage", "Reference"), entry.sourceTextTarget),
  );
  appendLinkField(
    nameList,
    label("dialogs.detailIndividualUrl", "Individual Page"),
    entry.individualUrl,
    pageLinkLabel(entry.individualUrl, label("dialogs.detailIndividualPage", "Individual page"), entry.individualPageTitle || entry.name),
  );
  nameSection.appendChild(nameList);

  let lookupSection = null;
  if (entry.nameLookupSources?.length) {
    lookupSection = section(label("dialogs.detailNameReferencesSection", "Name References"));
    const lookupList = document.createElement("dl");
    lookupList.className = "diesis-detail-grid";
    entry.nameLookupSources.forEach((source, index) => {
      appendLinkField(
        lookupList,
        source.site || `${label("dialogs.detailReference", "Reference")} ${index + 1}`,
        source.url,
        source.evidence || linkLabel(source.url),
      );
    });
    lookupSection.appendChild(lookupList);
  }

  const relationSection = section(label("dialogs.detailRelationsSection", "Relations"));
  const relationBody = document.createElement("div");
  relationBody.className = "diesis-relations";
  const makeJumpButton = (target, labelPrefix = "") => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "diesis-relation-button";
    button.textContent = `${labelPrefix}${target.name}`;
    button.addEventListener("click", () => openDiesisDetail(target));
    return button;
  };
  if (entry.derived?.baseId) {
    const base = state.namedCommaIntervals.find((candidate) => candidate.id === entry.derived.baseId);
    if (base) relationBody.appendChild(makeJumpButton(base, `${label("dialogs.detailBase", "Base Interval")}: `));
    appendLinkField(
      relationBody,
      label("dialogs.detailBaseUrl", "Base Page"),
      entry.derivedBaseUrl,
      pageLinkLabel(entry.derivedBaseUrl, label("dialogs.detailBasePage", "Base page"), base?.name || entry.derived.baseName),
    );
  }
  const derivedChildren = state.namedCommaIntervals.filter((candidate) => candidate.derived?.baseId === entry.id);
  derivedChildren.forEach((target) => relationBody.appendChild(makeJumpButton(target, `${label("dialogs.detailDerived", "Derived Interval")}: `)));
  if (!relationBody.childNodes.length) {
    const empty = document.createElement("p");
    empty.className = "diesis-detail-empty";
    empty.textContent = "-";
    relationBody.appendChild(empty);
  }
  relationSection.appendChild(relationBody);

  els.diesisDetailBody.append(ratioSection, nameSection);
  if (lookupSection) els.diesisDetailBody.appendChild(lookupSection);
  els.diesisDetailBody.appendChild(relationSection);
  showDialog(els.diesisDetailDialog);
}

export function renderDiesisControls({ renderDiesisControls, renderDiesisList }) {
  if (!els.diesisBaseControls) return;
  const baseSelect = els.diesisBaseControls;
  const selectedOctave = BASE_NOTE_OCTAVES.includes(state.diesisBaseOctave) ? state.diesisBaseOctave : 5;
  state.diesisBaseOctave = selectedOctave;
  syncBaseNoteOptions(baseSelect, selectedOctave);
  baseSelect.onchange = () => {
    state.diesisBaseOctave = Number(baseSelect.value);
    renderDiesisList();
  };
  els.globalRatioDisplay.value = state.diesisRatioDisplay;
  els.diesisRatioDisplay.value = state.diesisRatioDisplay;
  els.diesisDerivedToggle.checked = state.diesisShowDerived;
  els.diesisPowerToggle.checked = state.diesisShowPower;
  els.diesisCollectionFilter.value = state.diesisCollectionFilter;
  els.diesisLimitFilter.value = Number.isFinite(state.diesisLimitFilter) ? String(state.diesisLimitFilter) : "all";
  els.diesisDenominatorDigitsFilter.value = Number.isFinite(state.diesisDenominatorDigitsFilter)
    ? String(state.diesisDenominatorDigitsFilter)
    : "all";
}

export function renderDiesisList({
  diesisIndex,
  formatDiesisRatioLabel,
  isDifferenceAudible,
  previewDiesisInterval,
}) {
  if (!els.diesisList) return;
  els.diesisList.textContent = "";
  const fragment = document.createDocumentFragment();
  const visibleBase = state.namedCommaIntervals
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => ratioLimitValue(entry.ratio) <= state.diesisLimitFilter)
    .filter(({ entry }) => denominatorDigitCount(entry.ratio) <= state.diesisDenominatorDigitsFilter)
    .filter(({ entry }) => state.diesisShowDerived || entry.source !== "derived");
  const discoveredVisible = visibleBase.filter(({ index }) => state.discoveredDiesisCounts.has(index)).length;
  els.diesisCollectionStats.textContent = `${discoveredVisible} / ${visibleBase.length}`;
  visibleBase
    .filter(({ index }) => {
      if (state.diesisCollectionFilter === "seen") return state.discoveredDiesisCounts.has(index);
      if (state.diesisCollectionFilter === "unseen") return !state.discoveredDiesisCounts.has(index);
      return true;
    })
    .map(({ entry }) => entry)
    .sort((a, b) => b.cents - a.cents)
    .forEach((entry) => {
      const discoveryCount = state.discoveredDiesisCounts.get(diesisIndex(entry)) || 0;
      const discovered = discoveryCount > 0;
      const row = document.createElement("div");
      row.className = `diesis-item${discovered ? " discovered" : ""}`;
      const actions = document.createElement("div");
      actions.className = "diesis-actions";
      [
        ["normal", "▶", t("dialogs.playIntervalTitle")],
        ["difference", "Δ", t("dialogs.playDifferenceTitle")],
      ].forEach(([mode, label, title]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "diesis-play";
        if (mode === "difference" && !isDifferenceAudible(entry.ratio)) button.classList.add("warning");
        button.textContent = label;
        button.title = title;
        button.addEventListener("click", () => previewDiesisInterval(entry.ratio, mode));
        actions.appendChild(button);
      });
      const cents = document.createElement("span");
      cents.className = "diesis-cents";
      cents.textContent = `${Number(entry.cents).toFixed(2)}¢`;
      const ratio = document.createElement("span");
      ratio.className = "diesis-ratio";
      ratio.textContent = formatDiesisRatioLabel(entry, {
        displayMode: state.diesisRatioDisplay,
        showPower: state.diesisShowPower,
      });
      const limit = document.createElement("span");
      limit.className = "diesis-limit";
      limit.textContent = ratioLimitLabel(entry.ratio);
      const name = document.createElement("span");
      name.className = "diesis-name";
      name.textContent = entry.name;
      const detail = document.createElement("button");
      detail.type = "button";
      detail.className = "diesis-play diesis-detail-button";
      detail.textContent = "i";
      detail.title = label("dialogs.detailTitle", "Details");
      detail.addEventListener("click", () => openDiesisDetail(entry));
      const star = document.createElement("span");
      star.className = "diesis-star";
      if (discovered) {
        const starIcon = document.createElement("span");
        starIcon.setAttribute("aria-hidden", "true");
        starIcon.textContent = "⭐️";
        const count = document.createElement("small");
        count.textContent = String(discoveryCount);
        star.append(starIcon, count);
      }
      row.append(actions, cents, ratio, limit, name, detail, star);
      fragment.appendChild(row);
    });
  els.diesisList.appendChild(fragment);
}
