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

## CI

CI runs both categories for non-docs changes:

- Unit tests in the `test` job
- E2E tests in the `e2e` job

For pull requests that only change documentation files (`README.md`, `docs/**`, `.github/**/*.md`), both CI test commands are skipped:

- `npm test`
- `npm run test:e2e`

See [CI workflow](../../.github/workflows/ci.yml) for details.
