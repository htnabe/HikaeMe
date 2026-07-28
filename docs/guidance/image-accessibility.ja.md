# 画像アクセシビリティガイド

このページでは、HikaeMe の画像アクセシビリティ方針を説明します。

## 方針

- 生成されるすべての img 要素に alt 属性を付与します。
- 装飾画像は alt="" を明示します。
- 情報を持つ画像は、内容や目的が伝わる alt を設定します。

## alt に対する警告表示レベル

> [!IMPORTANT]
> 現在は警告ベースで適用しています。

- Markdown 画像は alt 属性を常時出力します（装飾画像は alt="" を許容します）。
- img shortcode で alt が未指定かつ caption も未指定の場合、warning を出します。
- 既存テンプレートと shortcode は alt 属性を常時出力します。

## 使い方

### Markdown 画像

```markdown
![短く意味のある説明](/img/example.webp)
```

### 装飾用 Markdown 画像

```markdown
![](/img/decorative-divider.svg)
```

### img Shortcode

推奨:

```markdown
{{< img src="img/example.webp" alt="短い説明" caption="任意のキャプション" >}}
```

互換運用（警告なし）:

```markdown
{{< img src="img/example.webp" caption="alt のフォールバックとして利用" >}}
```

## 今後の方針

> [!CAUTION]
> 移行ガイドの整備後、将来的に warning から build error へ厳格化する可能性があります。
