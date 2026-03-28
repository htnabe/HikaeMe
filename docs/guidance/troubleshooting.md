# Troubleshooting

This page collects common setup and development issues for HikaeMe.

## Issue: `hugo mod get -u` fails with "module not found"

Solution:
1. Ensure your `hugo.yaml` has the correct module path.
2. Try clearing the cache:

```bash
hugo mod clean
rm -f go.sum
hugo mod tidy
hugo mod get -u
```

## Issue: `npm install` fails

Solution:
1. Ensure Node.js is installed: `node --version` (must match the version specified in `package.json`, currently >=20.19.0).
2. Clear npm cache:

```bash
npm cache clean --force
npm install
```

3. If issues persist, check whether `package.json` was generated:

```bash
ls package.json
```

## Issue: `hugo server` shows blank page or missing theme files

Solution:
1. Verify module is downloaded:

```bash
ls -la go.mod
```

If missing, run `hugo mod get -u` again.

2. Check for import errors:

```bash
hugo mod clean
hugo mod get -u
```

## Issue: Permission denied when running npm commands

Solution:

```bash
# Recommended: use a Node version manager to avoid global permission issues
# - nvm: https://github.com/nvm-sh/nvm
# - fnm: https://github.com/Schniz/fnm
#
# For more options and background, see:
# https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
```
