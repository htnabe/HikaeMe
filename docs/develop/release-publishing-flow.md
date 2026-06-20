# Release Publishing Flow

This document defines how to publish releases for this repository.

## Policy Summary

- Development continues in the `v0.x.x` series.
- Breaking changes are allowed while pre-1.0, consistent with SemVer behavior for major version zero.
- Keep `v0` to avoid the Go Modules `/v2` import path requirement.
- Keep existing tags. Never delete, move, or recreate published tags.

## Branch and Merge Rules

- Direct merges to `main` and `dev` are not allowed.
- Changes must be merged through Pull Requests.
- Perform release publishing only after the final PR from `dev` to `main` is merged.

## Release Steps (Main Branch)

1. Ensure local `main` is up to date.
2. Verify working tree is clean.
3. Decide target tag in `v0.X.Y` format.
4. Run `npm version "0.X.Y" --tag-version-prefix v -m "chore(release): v%s"` on `main`.
5. Confirm updates:
   - `package.json` version is `0.X.Y`
   - `package-lock.json` version matches
   - tag `v0.X.Y` was created
6. Push `main` and the new tag.
7. Create the GitHub Release for `v0.X.Y` on `main`.

## Validation Checklist

- Target tag does not already exist locally or remotely.
- Release commit message follows `chore(release): vX.Y.Z`.
- Tag and `main` are both pushed.
- GitHub Release is created for the same tag.

## Failure Handling

- Invalid version format: use `v0.X.Y`.
- Dirty working tree: commit or stash first.
- Existing tag: bump to the next available version.
- Wrong branch: switch to updated `main` and retry.
