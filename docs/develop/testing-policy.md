# Testing Policy

This document defines where each test type should run in this repository.

## Policy

- Unit tests run locally and in CI.
- E2E tests (Playwright) run in CI only.

## Local Development

Run unit tests locally:

```bash
npm test
```

Do not run `npm run test:e2e` as part of local git hooks.

### Example Site Dependencies

Keep the root `package.json` as the source of dependency declarations. After
updating root dependencies, synchronize and install the example site's dependencies:

```bash
npm run sync:example-deps
```

This runs `hugo mod npm pack` and `npm install` inside `exampleSite`. Commit the
generated files under `exampleSite/packages/hugoautogen/` and
`exampleSite/package-lock.json` together with the root dependency changes.
The example site has its own lockfile; its complete resolved dependency tree does
not have to be identical to the root's tree.

Husky's **pre-push** hook runs `npm run check:example-deps` before unit tests.
The check compares root dependency declarations with the root lockfile, the
Hugo-generated workspace manifest, and the example site's lockfile workspace
metadata. It stops the push if they differ and does not modify or stage files.
It also rejects uncommitted dependency file changes so an uncommitted local fix
cannot hide stale committed dependencies.
It does not inspect installed `node_modules`; use the synchronization command to
update the local installation. No dependency synchronization check runs on commit.

## CI

CI checks dependency synchronization and installs both the root and example site
dependencies with `npm ci`. Test code and test runners remain at the repository
root; Hugo builds and E2E tests use the example site and its local `node_modules`.

CI runs both test categories for non-docs changes:

- Unit tests in the `test` job
- E2E tests in the `e2e` job

For pull requests that only change documentation files (`README.md`, `docs/**`, `.github/**/*.md`), both CI test commands are skipped:

- `npm test`
- `npm run test:e2e`

The CI job still installs dependencies, runs the Hugo production build, and validates Algolia JSON outputs for docs-only pull requests.

See [CI workflow](../../.github/workflows/ci.yml) for details.