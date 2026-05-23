---
title: "Webフォントの選び方: 実践ガイド"
date: 2026-02-22T10:00:00+09:00
draft: false
toc: true
tags: [typography, css, webfonts]
categories: [Tech]
thumbnail: ""
---

タイポグラフィはWebデザインで見落とされがちですが、可読性や印象、そして信頼感に大きく影響します。この記事では、システムフォントからGoogle Fontsまで、Webフォント選定で押さえるべきポイントを整理します。

## 1. システムフォント: 追加コストゼロの選択肢

システムフォントはユーザーのOSに最初から入っているため、追加のネットワークリクエストが発生しません。結果として表示が速く、フォント読み込みによるレイアウトシフトも抑えられます。

代表的なフォントスタックの例は次のとおりです。

```css
font-family:
  "Hiragino Sans", "Hiragino Kaku Gothic ProN", /* macOS / iOS */
  "Yu Gothic UI", "Yu Gothic", "Meiryo",         /* Windows */
  "Noto Sans CJK JP",                            /* Linux / Android */
  system-ui, -apple-system,
  sans-serif;
```

**メリット:**
- 外部リクエストが不要
- すぐに利用できる
- OSの見た目になじみやすい

**デメリット:**
- デザイン上の個性を出しにくい
- プラットフォームごとに見え方が変わる

## 2. Google Fonts: 豊富な選択肢と導入のしやすさ

Google Fontsには多数の無料フォントファミリーがあり、HTMLの`<head>`に`<link>`を追加するだけで導入できます。

```html
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
  rel="preload stylesheet"
  as="style"
/>
```

`display=swap`を指定すると、Webフォント読み込み中はシステムフォントで表示されるため、文字が見えなくなる時間を減らせます。

**メリット:**
- 選択肢が非常に多い
- 無料で使える
- CDN配信で比較的高速

**デメリット:**
- 外部ネットワークへの依存が発生する
- リクエスト先がGoogleになるため、プライバシー面の配慮が必要
- 設定次第ではFOUTが発生する

## 3. 多言語サイトでの考慮点

日本語と英語を併用するサイトでは、両方の文字を自然に表示できるフォント選びが重要です。

| 用途 | 推奨フォント | 補足 |
|---|---|---|
| 本文（英字） | Noto Sans | クセが少なく読みやすい |
| 本文（日本語） | Noto Sans JP | Noto Sansと組み合わせやすい |
| 見出し・装飾 | Orbitron, Raleway | 主に英字向け |

Noto Sans JPは日本語と英字の両方をカバーしやすく、表示の一貫性を取りやすい定番候補です。

## 4. パフォーマンスのポイント

### サブセットを意識する

必要な文字範囲だけ読み込むと、転送量を抑えられます。日本語を含む場合は、対象文字の範囲設定を確認しましょう。

### ウェイトを増やしすぎない

フォントのウェイトは増えるほど読み込み負荷が上がります。実際に使うものだけに絞るのが基本です。

```
family=Noto+Sans+JP:wght@400;700
```

100〜900をすべて読み込むのではなく、必要最小限にしましょう。

### Preconnectを使う

`preconnect`を設定すると、フォント配信ドメインへの接続を先行して確立できます。

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

## 5. `font-feature-settings`の活用

日本語では`font-feature-settings: "palt"`を使うことで、約物まわりの詰めが改善され、読みやすい組版になる場合があります。

```css
body {
  font-feature-settings: "palt";
  letter-spacing: 0.05em;
}
```

小さな設定ですが、日本語本文の読み心地を改善しやすいポイントです。

## 6. フォールバック戦略

フォントスタックの最後には必ず汎用ファミリー（`sans-serif`など）を置きましょう。指定フォントが使えない場合でも、表示崩れを最小限にできます。

```css
font-family:
  "Noto Sans JP",   /* preferred */
  "Hiragino Sans",  /* macOS fallback */
  "Yu Gothic UI",   /* Windows fallback */
  sans-serif;       /* last resort */
```

## まとめ

- パフォーマンス重視なら**システムフォント**が有力です。
- 表示の統一感を重視するなら**Google Fonts**（例: Noto Sans JP）を検討しましょう。
- フォント指定は必ず**フォールバックチェーン**を用意します。
- 日本語本文では`font-feature-settings: "palt"`や字間調整も効果的です。

フォント選定は、見た目・速度・可読性のバランスです。まずはシンプルに始め、実測しながら改善していくのがおすすめです。
