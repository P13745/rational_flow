# Current Structure

Rational Flow のレファクタリング前の構造メモです。今後の分割作業では、ここに書いた責務を段階的に移動します。

## File Sizes

2026-06-25 時点の主なファイル規模です。

```text
index.html             592 lines
styles.css            3366 lines
app.js                2458 lines
translations.js        370 lines
named_commas_data.js  1878 lines
ratio_presets_data.js  304 lines
README.md               51 lines
```

## index.html

`index.html` は、header、mobile view switch、controls sidebar、canvas stage、timeline table、Advanced / Help / Timer / Presets / Diesis List dialogs をすべて含んでいます。

現時点では静的文言と翻訳対象が混在しています。将来的には `data-i18n` 系属性を使い、HTML 構造と翻訳処理の結合を下げる予定です。

## styles.css

`styles.css` は全 UI のスタイルを 1 ファイルで持っています。

主な責務は次の通りです。

- token / reset / base controls
- app layout
- sidebar controls
- canvas stage
- timeline table
- dialogs
- Diesis List
- mobile layout
- header / transport の responsive 調整

後半には `Final`, `Last`, `proposal`, `refinement` などの作業履歴コメント付き override が多く残っています。特に header、transport、Diesis toolbar、mobile layout は後ろの指定ほど強く、どの指定が最終的に効いているか追いづらくなっています。

Phase 1 では CSS を `styles/` 配下に機能別分割し、最終的に効く指定を正式な場所へ移します。

## app.js

`app.js` は現在のアプリの大半の責務を持つ single entry script です。

含まれている主な責務は次の通りです。

- DOM 参照の集約
- top-level mutable state
- i18n helper と selector ベースの翻訳適用
- mobile view 切替
- cookie-based Diesis collection
- Help page 切替
- fraction / ratio / prime-vector 計算
- named commas / presets の install
- settings 読み取り
- candidate generation と parent choice
- Web Audio の作成、schedule、preview、pause / resume / stop
- note model と generation scheduler
- canvas hit testing と drawing
- diesis marker 検出と label 配置
- timeline table rendering
- preset browser rendering
- Diesis List rendering
- label / timer status 更新
- wake lock
- event listener binding

top-level の `let` は audio state、timeline state、settings、Diesis state、render state にまたがっています。Phase 2 では DOM 参照、state、entry point、event bindings をまず分ける予定です。

## translations.js

`translations.js` は `window.RF_I18N` として UI 文言を提供しています。`app.js` 側の selector 対応表で DOM に適用されます。

現状の弱点は、HTML 構造変更や selector 変更で翻訳適用が壊れやすいことです。Phase 7 では `src/i18n/messages.js` と `data-i18n` 属性ベースへ移行する予定です。

## Data Files

`named_commas_data.js` と `ratio_presets_data.js` は、それぞれ `window.NAMED_COMMAS_DATA`、`window.RATIO_PRESETS_DATA` を提供しています。

対応する `.json` ファイルも残っていますが、現行アプリ実行時に直接読み込まれているのは `.js` 側です。Phase 2 以降もしばらくは window global 方式を維持し、後の段階で `data/` 配下へ移動する方針です。

## Current Script Loading

現在の読み込みはおおむね次の形です。

```html
<script src="ratio_presets_data.js"></script>
<script src="named_commas_data.js"></script>
<script src="translations.js"></script>
<script src="app.js"></script>
```

Phase 2 では `type="module"` の `src/main.js` を entry point にします。

## Refactoring Order

安全性のため、次の順序で進めます。

1. Phase 0: Baseline docs と回帰 checklist
2. Phase 1: CSS 分割
3. Phase 2: ES modules の entry / DOM / state 整理
4. Phase 3: core pure functions 分離
5. Phase 4: Diesis feature module 化
6. Phase 5: audio / scheduler 分離
7. Phase 6: UI rendering / controller 整理
8. Phase 7: i18n / HTML 保守性改善
9. Phase 8: cleanup / architecture docs

各 phase では、ユーザー向け挙動を変えず、[refactoring-checklist.md](refactoring-checklist.md) を基準に確認します。
