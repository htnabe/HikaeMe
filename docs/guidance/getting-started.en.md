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

Edit `hugo.yaml` and add:

```yaml
module:
  imports:
    - path: "github.com/htnabe/HikaeMe"
```

### Download Theme Dependencies

```bash
hugo mod get -u github.com/htnabe/HikaeMe
hugo mod npm pack
npm install
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
languageCode: "ja"

module:
  imports:
    - path: "github.com/htnabe/HikaeMe"

params:
  author: "Your Name"
  description: "My personal blog"
```

Refer to the [example site config](../../exampleSite/hugo.yaml) for additional configuration options.
