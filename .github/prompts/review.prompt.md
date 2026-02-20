---
agent: "agent"
description: "Review a pull request for this Hugo theme and validate quality, safety, and release readiness."
---

# PR Review Prompt

You are reviewing a pull request for this repository.

## Goal
Provide a practical, high-signal review focused on correctness, regressions, and maintainability.

## Inputs
- PR title and description
- Changed files and diff
- CI/build results (if available)
- Local verification notes (if available)

## Review Checklist

### 1) Scope and Intent
- [ ] Does the PR clearly state what problem it solves?
- [ ] Are the changes limited to the stated scope?
- [ ] Are unrelated changes avoided?

### 2) Correctness
- [ ] Does the implementation match the intended behavior?
- [ ] Are edge cases considered (missing params, optional sections, empty states)?
- [ ] Are there obvious logic errors in templates/scripts?

### 3) Hugo / Template Quality
- [ ] Does it follow existing Hugo partial/layout patterns?
- [ ] Are variables, conditionals, and blocks used safely?
- [ ] Is there any duplicated markup that should be reused via partials?

### 4) Frontend / Assets
- [ ] Are script and stylesheet URLs valid and versioned appropriately?
- [ ] If CDN resources changed, are SRI `integrity` hashes updated correctly?
- [ ] Is loading behavior (defer/async/preload) reasonable and non-breaking?

### 5) Dependencies
- [ ] Are dependency updates justified and scoped?
- [ ] Are `package.json` and lockfile changes consistent?
- [ ] Any known vulnerability or compatibility concerns introduced?

### 6) Security and Safety
- [ ] No secrets, tokens, or private data included?
- [ ] No unsafe HTML/script injection paths introduced?
- [ ] External links/resources are trusted and constrained?

### 7) Performance and Accessibility
- [ ] No obvious performance regressions (blocking assets, unnecessary payload)?
- [ ] Basic accessibility concerns addressed (semantic HTML, contrast-sensitive changes, etc.)?

### 8) Testing and Verification
- [ ] Build passes (`cd exampleSite && hugo --gc --minify`)
- [ ] Local smoke behavior validated when needed (`npm run dev`)
- [ ] Any manual test steps in the PR are reproducible?

### 9) Documentation and Release Readiness
- [ ] README/config/docs updated when behavior changed?
- [ ] Commit/PR descriptions are clear and in English?
- [ ] No wording inconsistencies, typos, or grammar mistakes in user-facing text and docs?
- [ ] Change is safe to merge into `dev`?

## Required Output Format
Use the following structure:

1. **Summary**
   - One short paragraph describing what the PR changes.

2. **Findings**
   - List issues by severity: `Critical`, `Major`, `Minor`, `Nit`.
   - For each issue: file path, brief explanation, and suggested fix.

3. **Checklist Result**
   - Report pass/fail for each checklist section above.

4. **Verdict**
   - `Approve`, `Request Changes`, or `Comment`.
   - Include a concise reason.

## Review Principles
- Be specific and actionable.
- Prefer root-cause feedback over style-only comments.
- Avoid speculative concerns without evidence in the diff.
- Keep the review concise but complete.
