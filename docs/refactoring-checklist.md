# Refactoring Checklist

Rational Flow のレファクタリングで既存挙動を保つための目視確認リストです。

## 起動

- [ ] `python3 -m http.server 8000` でローカルサーバーを起動できる。
- [ ] `http://localhost:8000/` でアプリが表示される。
- [ ] ブラウザの console に初期表示時の致命的な JavaScript error が出ない。

## 基本再生

- [ ] `Start` で再生が始まる。
- [ ] `Pause` で時間の進行と新規生成が止まり、鳴っている音は保持される。
- [ ] `Resume` で停止していた時間進行が再開する。
- [ ] 再生中の `Stop` で新規生成が止まり、画面内の音が自然に流れ切る。
- [ ] `Clear` で表示中の note が穏やかに減衰して消える。
- [ ] `Volume` が音量に反映される。

## Seed / Drone / 追加操作

- [ ] `Seed / Drone` の切替ができる。
- [ ] 停止中に `+` で seed または drone を追加できる。
- [ ] 再生中と一時停止中は `+` が期待通り無効化される。
- [ ] canvas をクリックまたはタップすると、停止中のみ高さに応じた seed / drone を追加できる。
- [ ] timeline list または canvas 上の bar をクリックすると、対象音を短く preview できる。

## 生成設定

- [ ] `Auto / List` の切替ができる。
- [ ] `Auto` で Numerator / Denominator の範囲から比率が生成される。
- [ ] `List` で指定した比率だけが候補になる。
- [ ] Preset dialog が開き、preset を読み込める。
- [ ] `Simple / Equal / Complex` の Ratio Bias が切り替わる。
- [ ] Parent Bias、curve、direction、Rooted Depth が期待通り表示・無効化される。
- [ ] Duration と Next Event の min / max が生成に反映される。
- [ ] Vibrato を有効化したときだけ main note に適用され、preview 音には適用されない。
- [ ] Ratio Integer Limit の値を変えてもアプリが落ちず、候補が狭まる場合は生成が疎になる。

## Canvas / Timeline

- [ ] canvas 上に note bar が右から左へ流れる。
- [ ] 再生ヘッドが表示される。
- [ ] `Active Ratio` が 1 行で表示され、長い場合は省略される。
- [ ] Ratio display の `Ratio / Factors` 切替が Active Ratio と diesis marker 表示に反映される。
- [ ] timeline table が Upcoming / Playing / Past の順で表示される。
- [ ] Upcoming は再生間近の項目が下に寄って表示される。
- [ ] Playing は周波数が高いものほど上に並ぶ。
- [ ] diesis marker の対象になっている Playing row が赤く表示される。

## Dialogs

- [ ] Advanced dialog が開閉する。
- [ ] Help dialog が開閉し、各ページに切り替えられる。
- [ ] Timer dialog が開閉し、開始・解除できる。
- [ ] Timer 有効時に header の timer 表示が破綻しない。
- [ ] Preset dialog が開閉し、preset 名・説明・中身が表示される。

## Diesis Marker / Diesis List

- [ ] 同時に鳴る 2 音の差が 100 cents 未満で、完全同一でない場合に marker が出る。
- [ ] 名前付きの比率に厳密一致した場合だけ diesis 名が marker に表示される。
- [ ] 複数の diesis marker が同時に表示できる。
- [ ] marker label が note の前面に出る。
- [ ] Diesis List dialog が開き、一覧が表示される。
- [ ] Base Note は C3 から C9 まで選べ、default は C5。
- [ ] Limit Filter は選択 limit 以下の entries を表示する。
- [ ] Derived の表示切替が動く。
- [ ] Ratio Display の Ratio / Factors が切り替わる。
- [ ] Power Form の表示切替が動く。
- [ ] Collection Filter の All / Seen / Unseen が切り替わる。
- [ ] 再生中に出会った diesis が保存され、星と回数に反映される。
- [ ] collection reset が動く。
- [ ] Diesis List の通常 preview、Delta preview、Fundamental preview が鳴る。
- [ ] Delta や Fundamental が 20Hz 未満になる場合は warning 表示になる。

## Mobile

- [ ] スマートフォン幅で Controls / Main / List の切替が動く。
- [ ] iPhone Safari 相当の縦画面で header が重ならない。
- [ ] モバイル時に Help / EN がブランド行の横に表示される。
- [ ] モバイル時に transport の主要操作が操作可能な大きさで表示される。
- [ ] `More` で Diesis List / Ratio / Timer 系の secondary tools を開閉できる。
- [ ] Diesis List dialog の toolbar が狭い幅でも潰れず、一覧部分をスクロールできる。

## 長時間動作

- [ ] 一定時間動かしても過去 note が増え続けて著しく重くならない。
- [ ] Timer 終了後、新規生成が止まり、wake lock が解除される。
- [ ] 分子分母や Active Ratio が巨大になっても、安全な範囲で Factors 表示へ fallback する。
