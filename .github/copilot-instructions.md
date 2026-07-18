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
- Remove unnecessary commented-out code when editing or refactoring; keep only comments that explain current, intentional behavior.
- Write all commit messages, PR text, and generated docs in English unless the user asks otherwise.
- Write skill files (`.github/skills/**/SKILL.md`) primarily in English; non-English trigger examples are allowed when they improve usability or reflect existing behavior.
- When reviewing changes (including pull requests), read `.github/prompts/review.prompt.md` first and follow its checklist and output format.
- When you need to understand folder or file placement, read `docs/develop/project-structure.md` first and follow its structure guidance.
- Direct merges to `main` and `dev` are not allowed; merge only through Pull Requests.
- Keep existing release tags as-is. Do not delete, move, or recreate published tags.
- Use semantic version tags in `vX.Y.Z` format.
- Keep the Go module import path aligned with the major version. For v2.x.x and later, include the `/vN` suffix required by Go Modules.
- Prepare release version updates on `dev` before the final PR to `main`; use `npm version <version> --no-git-tag-version` so no tag is created before merge.
- After the final PR is merged, only create the semantic `vX.Y.Z` git tag and publish the GitHub Release on `main`.
- Release operations must use tags in `vX.Y.Z` format, and `package.json` version must already match the tag without the leading `v` before tagging.

## Hugo / Template Guidelines

- Prefer Hugo built-in functions and existing partial structure.
- Reuse existing partials under `layouts/partials/` instead of duplicating markup.
- Keep theme behavior configurable via site params where applicable.
- Avoid hard-coded environment-specific values.
- For `js.Build` options, pass typed values (e.g. `"minify"` must be `true`/`false` as a bool, not a string). Hugo currently weak-casts string booleans, but do not rely on that behavior.

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

## Commit Message Guidelines

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.
- Format: `<type>[optional scope]: <description>`
- Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- Write messages in English (imperative mood, lowercase after the colon).
- Examples:
  - `feat: add split config support for config/_default/`
  - `docs: update getting-started guides for multilingual setup`
  - `fix: correct YAML indentation in params.yaml`
- When changes span multiple concerns, split into separate commits by type.

## Pull Request Guidelines

- When creating a pull request, always use `.github/PULL_REQUEST_TEMPLATE.md` as the body template.
- Fill in all sections of the template based on the actual changes made.
- Use `gh pr create` with `--base` and `--body` flags to submit PRs via the CLI.

## Output Expectations for AI Assistants

- Summarize what changed and why.
- Highlight risks or follow-up checks if any.
- Provide concise next steps for the user.
