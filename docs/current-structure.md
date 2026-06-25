# Current Structure

Rational Flow のレファクタリング前の構造メモです。今後の分割作業では、ここに書いた責務を段階的に移動します。

## File Sizes

2026-06-25 時点の主なファイル規模です。

```text
index.html             602 lines
styles/               3350 lines total
src/main.js           1259 lines
src/dom.js              82 lines
src/config.js            5 lines
src/state.js            39 lines
src/audio/audio-engine.js 163 lines
src/audio/preview.js    38 lines
src/audio/wake-lock.js  35 lines
src/diesis/diesis-collection.js 45 lines
src/diesis/diesis-model.js 31 lines
src/diesis/diesis-view.js 101 lines
src/ui/canvas-metrics.js 50 lines
src/ui/canvas-primitives.js 30 lines
src/ui/dialogs.js       25 lines
src/ui/event-bindings.js 157 lines
src/ui/marker-layout.js 53 lines
src/ui/mobile-view.js   24 lines
src/ui/preset-browser.js 44 lines
src/ui/timer-labels.js  19 lines
src/ui/timeline-table.js 112 lines
src/generation/note-model.js 30 lines
src/core/candidates.js  81 lines
src/core/pitch.js       14 lines
src/core/ratio-math.js 257 lines
src/core/utils.js        7 lines
src/storage/cookies.js  13 lines
src/i18n/i18n.js        13 lines
translations.js        370 lines
named_commas_data.js  1878 lines
ratio_presets_data.js  304 lines
README.md               51 lines
```

## index.html

`index.html` は、header、mobile view switch、controls sidebar、canvas stage、timeline table、Advanced / Help / Timer / Presets / Diesis List dialogs をすべて含んでいます。

現時点では静的文言と翻訳対象が混在しています。将来的には `data-i18n` 系属性を使い、HTML 構造と翻訳処理の結合を下げる予定です。

## styles/

Phase 1 で、旧 `styles.css` は `styles/` 配下の機能別 CSS に分割されました。`index.html` は明示的に次の順序で読み込みます。

```text
styles/tokens.css
styles/base.css
styles/layout.css
styles/header.css
styles/controls.css
styles/dialogs.css
styles/timeline.css
styles/visualizer.css
styles/diesis.css
styles/responsive.css
styles/header-responsive.css
```

主な責務は次の通りです。

- `tokens.css`: color token と CSS variables
- `base.css`: reset、typography、form、button などの基礎
- `layout.css`: `.app`、`.workbench`、主要 pane
- `header.css`: brand、transport、header controls
- `controls.css`: sidebar controls、readout
- `dialogs.css`: details/help/timer/preset dialog
- `timeline.css`: timeline table と event row
- `visualizer.css`: canvas stage、status、nowline
- `diesis.css`: Diesis List toolbar と rows
- `responsive.css`: 既存の breakpoint と component 横断の viewport 指定
- `header-responsive.css`: header / transport / mobile More まわりの最終 responsive override

挙動維持を優先したため、`Final`, `Last`, `proposal`, `refinement` などの作業履歴コメント付き override は、まだ CSS 内に残っています。ヘッダー系の最終 override は `header-responsive.css` に切り出しました。次の整理段階では、Diesis List や dialog などの viewport 指定も正式な component CSS へ吸収し、不要な重複を削除します。

## src/main.js / src/dom.js / src/config.js / src/state.js / src/ui/event-bindings.js / src/core/pitch.js

Phase 2 の入口整理で、旧 `app.js` は `src/main.js` に移動しました。`index.html` は `type="module"` で `src/main.js` を読み込みます。

DOM 参照は `src/dom.js` の `els` に分離され、固定定数の一部は `src/config.js` に分離されています。主要な mutable state は `src/state.js` の `state` object に集約されています。通常 note audio の scheduling / pause / stop helper は `src/audio/audio-engine.js`、Preview audio の oscillator / gain 生成は `src/audio/preview.js`、Wake Lock の取得と解放は `src/audio/wake-lock.js` に分離されています。Diesis collection の cookie 読み書きと発見数更新は `src/diesis/diesis-collection.js` に分離されています。Diesis の ratio label と preview frequency 計算は `src/diesis/diesis-model.js`、Diesis List の DOM 生成は `src/diesis/diesis-view.js` に分離されています。event listener 登録は `src/ui/event-bindings.js` に分離されています。canvas metrics / hit test は `src/ui/canvas-metrics.js`、canvas primitive は `src/ui/canvas-primitives.js`、marker label layout は `src/ui/marker-layout.js` に分離されています。dialog helper は `src/ui/dialogs.js`、mobile view 切替は `src/ui/mobile-view.js`、preset browser は `src/ui/preset-browser.js`、timer label formatting は `src/ui/timer-labels.js`、timeline table rendering は `src/ui/timeline-table.js` に分離されています。note model helper は `src/generation/note-model.js` に分離されています。候補生成と weighted choice は `src/core/candidates.js` に分離されています。音名表示と C 周波数 helper は `src/core/pitch.js` に、fraction / prime-vector / ratio limit 系の純粋関数は `src/core/ratio-math.js` に分離されています。小さな numeric utility は `src/core/utils.js`、cookie helper は `src/storage/cookies.js` に分離されています。翻訳 lookup helper は `src/i18n/i18n.js` に分離されています。

`src/main.js` はまだアプリの大半の責務を持つ entry script です。

含まれている主な責務は次の通りです。

- `src/dom.js` から受け取った DOM 参照の利用
- `src/state.js` の mutable state 利用
- i18n helper と selector ベースの翻訳適用
- mobile view 切替
- cookie-based Diesis collection
- Help page 切替
- mode / settings 読み取り
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
- `src/ui/event-bindings.js` に渡す handler 群

`src/main.js` はまだ state を直接読み書きし、主要ロジックも多く残っています。Phase 3 では、まず挙動に影響しにくい pitch helper を `src/core/pitch.js` に移し、続いて fraction / prime-vector / ratio limit 系の純粋関数を `src/core/ratio-math.js` に移しました。候補生成と parent choice の計算は `src/core/candidates.js` に移しました。次の分割では、Diesis、audio/scheduler、UI rendering を段階的に feature module へ移します。

## translations.js

`translations.js` は `window.RF_I18N` として UI 文言を提供しています。`src/main.js` 側の selector 対応表で DOM に適用されます。

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
<script type="module" src="src/main.js"></script>
```

データファイルと翻訳ファイルは、まだ window global を提供する通常 script として読み込まれています。

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
