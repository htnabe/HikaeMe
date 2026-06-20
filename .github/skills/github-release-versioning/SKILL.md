---
name: github-release-versioning
description: "Release workflow for publishing a new GitHub version. Use when updating package.json via npm version, creating a vX.Y.Z tag, and creating a GitHub Release from main."
argument-hint: "Target version, for example v0.3.0"
---

# GitHub Release Versioning

## Purpose
- Standardize release preparation and publication for this repository.
- Keep package version, git tag, and GitHub Release consistent.
- Use `npm version` to update `package.json` and create the release tag in one operation.

## Canonical Policy Source
- Follow repository-wide release policy in `.github/copilot-instructions.md`.
- This skill focuses only on executable release steps and checks.

## Inputs
- targetVersion: required, must follow v0.X.Y format for the current policy (e.g., v0.3.0).

## Decision Rules
1. Validate targetVersion with pattern ^v0\.[0-9]+\.[0-9]+$.
2. Abort if the working tree is not clean.
3. Abort if current branch is not main.
4. Abort if target tag already exists locally or on remote.
5. Derive bareVersion by removing the leading `v` from targetVersion.

## Procedure
1. Merge the final release content to `main` through Pull Request workflow.
2. Check out and update local `main`.
3. Derive bareVersion (X.Y.Z) from targetVersion (vX.Y.Z).
4. Run validation checks required by repository policy.
5. Run `npm version "${bareVersion}" --tag-version-prefix v -m "chore(release): v%s"` on `main`.
6. Confirm `package.json` and `package-lock.json` are updated and git tag `vX.Y.Z` is created by `npm version`.
7. Push `main` and tag.
8. Create a GitHub Release for vX.Y.Z.

## Validation Checklist
- package.json version matches targetVersion without leading v.
- package-lock.json version matches package.json.
- Tag name matches targetVersion.
- Release commit message follows `chore(release): vX.Y.Z`.
- `main` and tag are pushed successfully.
- GitHub Release exists for targetVersion.

## Failure Handling
- Invalid targetVersion: stop and request a valid v0.X.Y value.
- Dirty working tree: stop and ask to commit or stash changes.
- Existing tag: stop and bump to the next version.
- Wrong branch: switch to updated `main` and retry.
- Failed push or release creation: stop, report error, and retry from the failed step.

## References
- `.github/copilot-instructions.md`

## Example Prompts
- Run release workflow for v0.3.0.
- Run patch release workflow for v0.3.1 using npm version on main.
- Update package.json on main and create tag v0.4.0, then push and draft release.
