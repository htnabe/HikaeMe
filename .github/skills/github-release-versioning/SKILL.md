---
name: github-release-versioning
description: "Release workflow for publishing a new GitHub version. Use when updating package.json version, creating a vX.Y.Z tag, and preparing a Pull Request to dev for release."
argument-hint: "Target version, for example v1.2.5"
---

# GitHub Release Versioning

## Purpose
- Standardize release preparation and publication for this repository.
- Keep package version, git tag, and GitHub Release consistent.
- Use `npm version` to update `package.json` and create the release tag in one operation.

## Language Rule
- Write all skill outputs, commit messages, Pull Request descriptions, and release notes in English.

## Repository Governance
- Direct merges to main and dev are not allowed.
- Merge changes to main and dev only through Pull Requests.
- Release and tag work must be done on a branch derived from dev, then submitted as a Pull Request targeting dev.

## Inputs
- targetVersion: required, must follow vX.Y.Z format (e.g., v1.2.3).
- releaseBranch: optional, defaults to chore/release-vX-Y-Z derived from targetVersion (e.g., chore/release-v1-2-3).

## Decision Rules
1. Validate targetVersion with pattern ^v[0-9]+\.[0-9]+\.[0-9]+$.
2. Abort if the working tree is not clean.
3. Abort if current branch is main or dev.
4. Abort if the release branch is not derived from dev.
5. Abort if target tag already exists locally or on remote.
6. Abort if `npm config get tag-version-prefix` is not `v`.
7. Derive bareVersion by removing the leading `v` from targetVersion.

## Procedure
1. Create a release branch from dev.
2. Derive bareVersion (X.Y.Z) from targetVersion (vX.Y.Z).
3. Run `npm version "${bareVersion}" -m "chore(release): v%s"`.
4. Confirm `package.json` is updated and git tag `vX.Y.Z` is created by `npm version`.
5. Run validation checks required by repository policy.
6. Push release branch and tag.
7. Open a Pull Request with base dev and head release branch.
8. After PR is merged, create a GitHub Release for vX.Y.Z.

## Validation Checklist
- package.json version matches targetVersion without leading v.
- Tag name matches targetVersion.
- Release commit message follows `chore(release): vX.Y.Z`.
- Branch and tag are pushed successfully.
- Pull Request to dev is open or merged.
- GitHub Release exists for targetVersion.

## Failure Handling
- Invalid targetVersion: stop and request a valid vX.Y.Z value.
- Dirty working tree: stop and ask to commit or stash changes.
- Existing tag: stop and bump to the next version.
- Invalid npm tag prefix: set `npm config set tag-version-prefix v` and retry.
- Wrong branch origin: recreate branch from dev.
- Failed push or release creation: stop, report error, and retry from the failed step.

## Example Prompts
- Run release workflow for v1.2.5.
- Run minor release workflow for v1.3.0 using npm version.
- Update package.json and create tag v2.0.0, then push and draft release.
