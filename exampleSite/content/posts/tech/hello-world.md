---
title: "Markdown記法の総合ガイド"
date: 2024-08-19T21:50:24+09:00
draft: false
toc: true
tags: [markdown, html]
categories: [Tech]
thumbnail: ""
---

Markdownは、簡単に構造化された文書を作成するための軽量マークアップ言語です。この記事では、Markdownの主要な記法と使い方を詳しく解説します。

## 1. 見出し

見出しは `#` を使って表現します。`#` の数が多いほど、小さな見出しになります。


## 2. 段落と改行

段落は空行で区切ります。単純な改行は段落を分けません。
強制的に改行したい場合は、行末に2つのスペースを入れるか、`<br>`タグを使用します。

例：
これは1つ目の段落です。
これは同じ段落の2行目です。

これは新しい段落です。
これは強制改行された行です。

## 3. 強調

*イタリック体* や **太字** を使って文字を強調できます。


## 4. リスト

### 順序なしリスト

- 項目1
- 項目2
  - サブ項目A
  - サブ項目B

### 順序付きリスト

1. 最初の項目
2. 2番目の項目
3. 3番目の項目

## 5. リンク

[表示テキスト](https://www.example.com) <= https://www.example.com

`[表示テキスト](URL)`

## 6. 画像

![代替テキスト](https://www.example.com)

`![代替テキスト](画像URL)`

## 7. 引用

> これは引用文です。
> 複数行にまたがることもできます。

## 8. コード

インラインコードは `` ` `` で囲みます。例：`var example = true`

コードブロックは ``` で囲みます：

- example

{{< highlight markdown >}}
```python {linenos=inline}
def hello_world():
    print("Hello, World!")
    print(sorted([*[num for num in [34, 12, 57, 23, 89, 45, 67, 1, 90, 33]], max([num for num in [34, 12, 57, 23, 89, 45, 67, 1, 90, 33]]) * 2]))
```
{{</ highlight >}}

- result

```python {linenos=inline}
def hello_world():
    print("Hello, World!")
    print(sorted([*[num for num in [34, 12, 57, 23, 89, 45, 67, 1, 90, 33]], max([num for num in [34, 12, 57, 23, 89, 45, 67, 1, 90, 33]]) * 2]))
```

あるいはショートコード{{</* highlight */>}}を使ってください

{{< highlight LaTeX "linenos=inline">}}
\documentclass[11pt,usenames,dvipsnames]{beamer}
\usetheme{CambridgeUS}
\usecolortheme{dolphin}
{{< / highlight >}}

## 9. 水平線

3つ以上の `-`, `*`, `_` で水平線を引けます。

---

## 10. テーブル

Bootstrapのテーブルのせいで通常のマークダウンのテーブルを書けないので、以下の様にショートコードを使ってください。

```
{{</* table "table" */>}}
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A1  | B1  | C1  |
| A2  | B2  | C2  |
{{</* table */>}}
```

上記は次の様に表示されます。

{{< table "table" >}}
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A1  | B1  | C1  |
| A2  | B2  | C2  |
{{</ table >}}

## 11. タスクリスト

```
- [x] 完了したタスク
- [ ] 未完了のタスク
```

↓

- [x] 完了したタスク
- [ ] 未完了のタスク

## 12. 取り消し線

~~取り消したいテキスト~~

`~~取り消したいテキスト~~`

## 13. 脚注

ここに脚注[^1]があります。

[^1]: これは脚注の内容です。

## まとめ

Markdownは非常に柔軟で使いやすい記法です。この基本的な記法を覚えれば、簡単に構造化された文書を作成できます。実際に使ってみて、自分のワークフローに組み込んでみてください。
