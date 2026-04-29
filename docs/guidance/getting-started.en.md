# Getting Started (English)

This guide explains how to set up a new Hugo site with the HikaeMe theme.

## Prerequisites

Prepare the following tools:

- [Hugo](https://gohugo.io/installation/)
- [Go](https://golang.org/doc/install) (required for Hugo modules)
- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org/)
- GCC (required for compiling native dependencies)
- Sass (SCSS compiler)

For VS Code users (optional), sample dev container files are available here:

- [devcontainer.json example](./assets/devcontainer.json)
- [postCreateCommand.sh example](./assets/postCreateCommand.sh)

Copy these files into a `.devcontainer/` directory (for example `.devcontainer/devcontainer.json` and `.devcontainer/postCreateCommand.sh`) so VS Code can detect and use them.
Verify your environment:

```bash
hugo version
go version
git --version
node --version
npm --version
gcc --version
```

## Setup Steps

### Create a New Hugo Site

```bash
hugo new site my-blog --format yaml
cd my-blog
git init
```

### Initialize Your Site as a Hugo Module

```bash
hugo mod init github.com/yourusername/my-blog
```

This registers your site as a module. The module path does not need to match your final repository name, but it must be unique.

### Add HikaeMe as a Module Dependency

Add the module import to your site configuration. For a single-file setup, edit `hugo.yaml` and add:

```yaml
module:
  imports:
    - path: "github.com/htnabe/HikaeMe"
```

If you use a split configuration directory, place the same block in `config/_default/module.yaml`.

### Download Theme Dependencies

```bash
hugo mod get -u github.com/htnabe/HikaeMe
hugo mod npm pack
npm install
```

### Configuration Layout

You can use either of these layouts:

- Single-file config for small sites: `hugo.yaml`
- Split config for larger sites: `config/_default/`

This repository uses `config/_default/` to keep large settings manageable. A typical split layout looks like this:

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

### Start the Development Server

```bash
hugo server -D
```

Open `http://localhost:1313` in your browser.

## Minimal Configuration Example (`hugo.yaml`)

```yaml
title: "My Blog"
baseURL: "https://example.com/"
locale: "ja"

module:
  imports:
    - path: "github.com/htnabe/HikaeMe"

params:
  author: "Your Name"
  description: "My personal blog"
```

This guide uses a single `hugo.yaml` for brevity. If you prefer to split your configuration into multiple files, see [exampleSite/config/_default/](../../exampleSite/config/_default/) for a working example.

## Multilingual Setup

HikaeMe supports Hugo multilingual sites.

- Recommended setup: single host with the default language at the root
- Existing default-language URLs can remain canonical
- Secondary languages can live under prefixes such as `/en/`
- UI strings can be managed in `i18n/ja.yaml`, `i18n/en.yaml`, and other language files

Example:

```yaml
defaultContentLanguage: "ja"
defaultContentLanguageInSubdir: false

languages:
  ja:
    locale: "ja-JP"
    label: "Japanese"
    weight: 1
  en:
    locale: "en-US"
    label: "English"
    weight: 2
```

Hugo will fall back to global configuration values for keys not defined inside a language block, which makes it practical to localize only the settings that differ.

## Algolia Search with Multilingual Sites

### Output path behavior

Algolia JSON is generated at the **home** kind. Its output path depends on `defaultContentLanguageInSubdir`:

| `defaultContentLanguageInSubdir` | Default language | Other languages |
|---|---|---|
| `false` (default) | `/algolia.json` | `/en/algolia.json` |
| `true` | `/<defaultLang>/algolia.json` | `/en/algolia.json` |

With `false`, the root `/algolia.json` is the default-language index. This is expected Hugo behavior, not a bug. In this documentation's sample config, `defaultContentLanguage: "ja"`, so with `true` the default-language output path becomes `/ja/algolia.json`.

### Required config

**`config/_default/outputFormats.yaml`**

```yaml
Algolia:
  baseName: "algolia"
  isPlainText: true
  mediaType: "application/json"
  notAlternative: true
```

**`config/_default/outputs.yaml`**

```yaml
home:
  - "HTML"
  - "Algolia"
section:
  - "HTML"
```

Generate only at `home`, not `section`, to avoid duplicate records.

**`config/_default/params.yaml`**

```yaml
enableAlgolia: true

algolia:
  appId: "YOUR_APP_ID"
  searchOnlyApiKey: "YOUR_SEARCH_ONLY_API_KEY"
  indexName: "YOUR_INDEX_NAME"
  vars:
    - "title"
    - "summary"
    - "date"
    - "permalink"
  params:
    - "tags"
    - "categories"
```

### Per-language index names

To use separate Algolia indexes per language, override `indexName` in the language block:

```yaml
languages:
  ja:
    params:
      algolia:
        indexName: YOUR_JA_INDEX
  en:
    params:
      algolia:
        indexName: YOUR_EN_INDEX
```

### Content file naming

```text
content/
  posts/
    tech/
      article1.md        # default language
      article1.en.md     # English translation
  about.md
  about.en.md
```

### Verifying the output

```bash
cd exampleSite && hugo --gc --minify

# record counts (both should be non-zero)
jq 'length' public/algolia.json
jq 'length' public/en/algolia.json

# confirm no cross-language contamination
jq '[.[].permalink | contains("/en/")] | any' public/algolia.json   # expect false
jq '[.[].permalink | contains("/en/")] | all'  public/en/algolia.json  # expect true
```
