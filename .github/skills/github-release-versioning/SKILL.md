---
name: github-release-versioning
description: "Release workflow for publishing a new GitHub version. Use when updating package.json version, creating a vx.x.x tag, and preparing a Pull Request to dev for release."
argument-hint: "Target version, for example v1.2.5"
---

# GitHub Release Versioning

## Purpose
- Standardize release preparation and publication for this repository.
- Keep package version, git tag, and GitHub Release consistent.

## Language Rule
- Write all skill outputs, commit messages, Pull Request descriptions, and release notes in English.

## Repository Governance
- Direct merges to main and dev are not allowed.
- Merge changes to main and dev only through Pull Requests.
- Release and tag work must be done on a branch derived from dev, then submitted as a Pull Request targeting dev.

## Inputs
- targetVersion: required, must follow vx.x.x format.
- releaseBranch: optional, defaults to chore/release-vx-x-x.
- preRelease: optional, true or false.

## Decision Rules
1. Validate targetVersion with pattern ^v[0-9]+\.[0-9]+\.[0-9]+$.
2. Abort if the working tree is not clean.
3. Abort if current branch is main or dev.
4. Abort if the release branch is not derived from dev.
5. Abort if target tag already exists locally or on remote.

## Procedure
1. Create a release branch from dev.
2. Update package.json version to X.Y.Z (remove leading v from targetVersion).
3. Run validation checks required by repository policy.
4. Commit release preparation changes.
5. Create an annotated tag named vX.Y.Z.
6. Push release branch and tag.
7. Open a Pull Request with base dev and head release branch.
8. After PR is merged, create a GitHub Release for vX.Y.Z.

## Validation Checklist
- package.json version matches targetVersion without leading v.
- Tag name matches targetVersion and is annotated.
- Branch and tag are pushed successfully.
- Pull Request to dev is open or merged.
- GitHub Release exists for targetVersion.

## Failure Handling
- Invalid targetVersion: stop and request a valid vX.Y.Z value.
- Dirty working tree: stop and ask to commit or stash changes.
- Existing tag: stop and bump to the next version.
- Wrong branch origin: recreate branch from dev.
- Failed push or release creation: stop, report error, and retry from the failed step.

## Example Prompts
- Run release workflow for v1.2.5.
- Prepare a prerelease v1.3.0 from dev and open a Pull Request.
- Update package.json and create tag v2.0.0, then push and draft release.
