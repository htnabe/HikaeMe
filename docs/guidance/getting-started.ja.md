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

`hugo.yaml` を編集し、次を追加します。

```yaml
module:
  imports:
    - path: "github.com/htnabe/HikaeMe"
```

### 依存関係を取得

```bash
hugo mod get -u github.com/htnabe/HikaeMe
hugo mod npm pack
npm install
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

追加の設定については[exampleSite の設定例](../../exampleSite/hugo.yaml)を参照してください。
