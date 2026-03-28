# Project Structure Guide

This document explains the folder layout and the main files in this repository.
Use it as the first reference when you need to understand where to add or modify files.

## Top-Level Overview

- `.github/`
  - Repository-level AI and review prompts.
- `archetypes/`
  - Hugo content archetypes (default front matter templates).
- `assets/`
  - Source assets processed by Hugo Pipes.
  - `css/`: SCSS sources for theme styles.
  - `ts/`: TypeScript sources bundled by Hugo.
- `exampleSite/`
  - Example Hugo site for local testing and previews.
  - `content/`: sample pages and posts.
  - `layouts/partials/`: example-site-specific partial overrides.
  - `public/`: generated output (build artifact).
- `images/`
  - Image assets used by the theme/site.
- `layouts/`
  - Core Hugo templates for the theme.
  - `_default/`: base templates for list/single/summary pages.
  - `partials/`: reusable template fragments.
  - `shortcodes/`: custom shortcode templates.
- `resources/`
  - Hugo-generated cache/artifacts (`_gen/` is generated content).
- `static/`
  - Files served as-is (for example `robots.txt`, static images).
- `docs/`
  - Project documentation, including this file.

## Main Configuration and Metadata Files

- `hugo.yaml`
  - Theme-level Hugo configuration defaults.
- `theme.toml`
  - Hugo theme metadata.
- `package.json`
  - Node dependencies and scripts used for development tasks.
- `package-lock.json`
  - Exact resolved dependency versions.
- `package.hugo.json`
  - Hugo-related package snapshot/compatibility reference.
- `go.mod`
  - Go module declaration (used by Hugo module workflows).
- `README.md`
  - Main usage and setup instructions.

## Template and Asset Entry Points

- `layouts/_default/baseof.html`
  - Base layout wrapper for pages.
- `layouts/partials/head.html`
  - Shared head elements, CSS/JS includes, and CDN resources.
- `layouts/partials/header.html` / `layouts/partials/footer.html`
  - Shared page chrome.
- `assets/css/styles.scss`
  - Main SCSS entry point.
- `assets/ts/color-module.ts`
  - Theme color mode behavior.
- `assets/ts/algolia.ts`
  - Algolia search UI behavior.

## Working Rules for File Placement

- Prefer editing existing partials in `layouts/partials/` instead of duplicating markup.
- Place global style changes in `assets/css/` and keep widget-specific rules in `assets/css/widgets/`.
- Place client-side logic in `assets/ts/` and keep feature scope narrow.
- Use `exampleSite/` for testing behavior and content examples.
- Treat `exampleSite/public/` and `resources/_gen/` as generated outputs unless a task explicitly requires them.

## Quick Navigation Tips

- New page rendering behavior: start with `layouts/_default/`.
- Shared UI elements: start with `layouts/partials/`.
- Visual style updates: start with `assets/css/`.
- Script behavior updates: start with `assets/ts/`.
- Review expectations for PRs: see `.github/prompts/review.prompt.md`.
