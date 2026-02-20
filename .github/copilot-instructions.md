# Copilot Instructions

These instructions define how AI coding assistants should work in this repository.

## Scope
- Repository: Hugo theme project (`HikaeMe`)
- Main stack: Hugo templates, SCSS, TypeScript assets, static resources
- Primary test method: Hugo build and local server checks

## General Rules
- Keep changes minimal, targeted, and easy to review.
- Preserve existing naming, formatting, and template style.
- Do not refactor unrelated code while implementing a request.
- Do not introduce new frameworks or large dependencies unless explicitly requested.
- Write all commit messages, PR text, and generated docs in English unless the user asks otherwise.
- When reviewing changes (including pull requests), read `.github/prompts/review.prompt.md` first and follow its checklist and output format.
- When you need to understand folder or file placement, read `docs/project-structure.md` first and follow its structure guidance.

## Hugo / Template Guidelines
- Prefer Hugo built-in functions and existing partial structure.
- Reuse existing partials under `layouts/partials/` instead of duplicating markup.
- Keep theme behavior configurable via site params where applicable.
- Avoid hard-coded environment-specific values.

## Frontend Asset Guidelines
- Keep script/style loading order stable unless behavior requires change.
- Avoid adding blocking scripts unless necessary.
- Ensure compatibility with currently supported Bootstrap/Algolia setup.

## Dependency Update Policy
- Prefer safe upgrades (patch/minor) unless major upgrades are explicitly requested.
- Update lockfiles together with manifest files.
- Do not update unrelated packages in broad sweeps unless requested.

## Validation Checklist Before Finishing
- Run Hugo production build:
  - `cd exampleSite && hugo --gc --minify`
- If template/script behavior changed, run a local smoke test:
  - `npm run dev` (or `cd exampleSite && hugo server --gc --watch`)
- Confirm no unintended file changes in `git status`.

## Output Expectations for AI Assistants
- Summarize what changed and why.
- Highlight risks or follow-up checks if any.
- Provide concise next steps for the user.
