# スタートガイド (日本語)

このドキュメントでは、HikaeMe テーマを使って Hugo サイトを新規セットアップする手順を説明します。

## 前提条件

以下のツールを事前に用意してください。

- [Hugo](https://gohugo.io/installation/)
- [Go](https://golang.org/doc/install)（Hugo Modules に必要）
- [Git](https://git-scm.com/)
- [Node.js と npm](https://nodejs.org/)
- GCC（ネイティブ依存のビルドに必要）
- Sass（SCSS コンパイラ）

VS Code 利用者向け（任意）として、Dev Container の実ファイル例を用意しています。

- [devcontainer.json の例](./assets/devcontainer.json)
- [postCreateCommand.sh の例](./assets/postCreateCommand.sh)

これらのファイルをプロジェクトルートの `.devcontainer/` ディレクトリ（例: `.devcontainer/devcontainer.json`）に配置すると、VS Code から Dev Container として認識されます。
環境確認コマンド:

```bash
hugo version
go version
git --version
node --version
npm --version
gcc --version
```

## セットアップ手順

### Hugo サイトを新規作成

```bash
hugo new site my-blog --format yaml
cd my-blog
git init
```

### サイトを Hugo Module として初期化

```bash
hugo mod init github.com/yourusername/my-blog
```

このコマンドでサイトをモジュールとして登録します。モジュール名は最終的な GitHub リポジトリ名と一致していなくても構いませんが、一意である必要があります。

### HikaeMe をモジュール依存として追加

サイト設定に module import を追加します。単一ファイル構成であれば `hugo.yaml` を編集し、次を追加します。

```yaml
module:
  imports:
    - path: "github.com/htnabe/HikaeMe"
```

設定を分割している場合は、同じ内容を `config/_default/module.yaml` に配置してください。

### 依存関係を取得

```bash
hugo mod get -u github.com/htnabe/HikaeMe
hugo mod npm pack
npm install
```

### 設定ファイルの構成

設定は次のどちらでも構いません。

- 小規模サイト向け: 単一の `hugo.yaml`
- 設定が増えたサイト向け: `config/_default/` で分割

このリポジトリでは設定量が多いため、`config/_default/` を採用しています。典型的な構成は次のとおりです。

```text
config/_default/
  hugo.yaml
  module.yaml
  params.yaml
  menus.yaml
  outputs.yaml
  outputFormats.yaml
  permalinks.yaml
```

### 開発サーバーを起動

```bash
hugo server -D
```

ブラウザで `http://localhost:1313` を開いて確認します。

## 最小構成サンプル (`hugo.yaml`)

```yaml
title: "My Blog"
baseURL: "https://example.com/"
languageCode: "ja"

module:
  imports:
    - path: "github.com/htnabe/HikaeMe"

params:
  author: "Your Name"
  description: "My personal blog"
```

このガイドでは簡潔さのため単一の `hugo.yaml` を使っています。実リポジトリの設定分割例は [exampleSite/config/_default/](../../exampleSite/config/_default/) を参照してください。

`hugo.yaml` をなるべく細かく分けて管理したい場合は [exampleSite/config/_default/](../../exampleSite/config/_default/) を参照してください。

## 多言語設定

HikaeMe は Hugo の多言語サイト構成に対応しています。

- 推奨構成は、デフォルト言語をルートに置く single host 構成です
- 既存のデフォルト言語 URL をそのまま正規 URL として維持できます
- 追加言語は `/en/` のようなプレフィックス配下で公開できます
- UI 文言は `i18n/ja.yaml`、`i18n/en.yaml` などの翻訳ファイルで管理できます

例:

```yaml
defaultContentLanguage: "ja"
defaultContentLanguageInSubdir: false

languages:
  ja:
    languageCode: "ja-JP"
    languageName: "日本語"
    weight: 1
  en:
    languageCode: "en-US"
    languageName: "English"
    weight: 2
```

言語ブロックに定義していない設定値はグローバル設定へフォールバックするため、差分だけを各言語に書く運用が可能です。
