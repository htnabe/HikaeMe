---
name: github-release-versioning
description: "Release workflow for publishing a new GitHub version. Use when preparing package.json with npm version on dev, then creating a vX.Y.Z tag and GitHub Release from main."
argument-hint: "Target version, for example v2.0.2"
---

# GitHub Release Versioning

## Purpose

- Standardize release preparation and publication for this repository.
- Keep package version, git tag, and GitHub Release consistent.
- Prepare package version updates on `dev` before the final PR to `main`.
- Create the release tag only after the prepared release has been merged to `main`.

## Canonical Policy Source

- Follow repository-wide release policy in `.github/copilot-instructions.md`.
- This skill focuses only on executable release steps and checks.

## Inputs

- targetVersion: required, must follow vX.Y.Z format (e.g., v2.0.2).

## Decision Rules

1. Validate targetVersion with pattern ^v[0-9]+\.[0-9]+\.[0-9]+$.
2. Derive bareVersion by removing the leading `v` from targetVersion.
3. Abort if the working tree is not clean before changing versions or creating tags.
4. Abort if target tag already exists locally or on remote.
5. Prepare package version updates on `dev`; tag creation is reserved for `main` after merge.

## Procedure

1. Check out and update local `dev`.
2. Derive bareVersion (X.Y.Z) from targetVersion (vX.Y.Z).
3. Confirm target tag does not exist locally or on remote.
4. Run `npm version "${bareVersion}" --no-git-tag-version` on `dev`.
5. Confirm `package.json` and `package-lock.json` are updated and no git tag was created.
6. Run validation checks required by repository policy on the prepared `dev` branch and confirm PR CI passes.
7. Commit the release preparation changes, then merge `dev` to `main` through Pull Request workflow.
8. Check out and update local `main` after the PR is merged.
9. Confirm `package.json` and `package-lock.json` already match bareVersion.
10. Create the release tag on `main` with `git tag -a "${targetVersion}" -m "${targetVersion}"`.
11. Push the tag.
12. Create a GitHub Release for targetVersion.

## Validation Checklist

- package.json version matches targetVersion without leading v.
- package-lock.json version matches package.json.
- Tag name matches targetVersion.
- The version update on `dev` did not create a tag before merge.
- The release preparation commit follows Conventional Commits, for example `chore(release): prepare vX.Y.Z`.
- Tag is created on `main` after the prepared release PR is merged.
- Tag is pushed successfully.
- GitHub Release exists for targetVersion.

## Failure Handling

- Invalid targetVersion: stop and request a valid vX.Y.Z value.
- Dirty working tree: stop and ask to commit or stash changes.
- Existing tag: stop and bump to the next version.
- Wrong branch for preparation: switch to updated `dev` and retry.
- Wrong branch for tagging: switch to updated `main` and retry.
- Failed push or release creation: stop, report error, and retry from the failed step.

## References

- `.github/copilot-instructions.md`

## Example Prompts

- Run release workflow for v2.0.2.
- Run patch release workflow for v2.0.3 using npm version on dev without creating a tag.
- Prepare package.json on dev, merge to main, create tag v2.1.0, then push and draft release.
