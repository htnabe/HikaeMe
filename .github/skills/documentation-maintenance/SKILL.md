---
name: documentation-maintenance
description: "Workflow skill for proactively updating stale docs and fixing docs path/layout drift. Use when: docs in README.md or docs/** are outdated, command usage has changed, or documentation file/folder placement changed."
---

# Documentation Maintenance Skill

## Overview

This skill standardizes how to keep repository documentation accurate when command usage, setup steps, or file placement changes over time.

**Primary goals:**
- Detect stale command examples and outdated explanations
- Update references when docs files/folders move
- Keep `README.md`, `docs/**`, `.github` guidance, and guidance assets aligned
- Prefer minimal, surgical edits; only reorganize structure when necessary to resolve path/layout drift or duplicated/conflicting instructions

**Scope:**
- `README.md`
- `docs/**`
- `.github/copilot-instructions.md`
- `.github/prompts/review.prompt.md`
- `docs/guidance/assets/**`

---

## Trigger Timing

Run this workflow when any of the following happens:
1. PR creation or PR update
2. Commands in setup/build/test flow changed
3. Documentation file/folder placement changed
4. Broken links or path resolution issues are reported

---

## Workflow Phases

### Phase 1: Drift Detection

**Objective:** Find where docs are stale or paths are invalid.

**Checks:**
1. Compare documented commands with current executable sources:
   - `package.json` scripts
   - `.devcontainer/postCreateCommand.sh`
   - CI or review checklists in `.github`
2. Verify docs links and relative paths from each markdown file location
3. Detect folder placement drift (moved/renamed docs files)
4. Identify duplicated instructions that should point to a shared source file

**Output format:**
```
Drift Report
- Command drift: [file + section + expected command]
- Path drift: [file + broken link + corrected link]
- Structure drift: [old path -> new path]
```

### Phase 2: Scope Confirmation

**Objective:** Confirm update boundaries before editing.

**Default inclusion:**
- `README.md`, `docs/**`, `.github` guidance docs, guidance assets

**Default exclusion:**
- Runtime source code behavior changes
- Dependency upgrades unrelated to doc accuracy

If uncertainty remains, ask focused clarification before editing.

### Phase 3: Update Strategy

**Objective:** Decide how to update docs safely and consistently.

**Rules:**
1. Prefer a single source of truth for examples (such as `docs/guidance/assets/*`)
2. In guides, prefer links to shared examples over duplicated code blocks
3. Keep edits minimal where possible, but allow section reorganization when readability improves
4. Preserve bilingual parity for paired docs when applicable

### Phase 4: Implementation

**Objective:** Apply changes and keep references coherent.

**Execution checklist:**
1. Update stale command text and explanations
2. Rewrite outdated file links using valid relative paths
3. Move or add example files when needed (`docs/guidance/assets/**`)
4. Replace duplicated inline examples with links to shared example files
5. Update cross-references in `.github` docs if docs paths changed

### Phase 5: Validation

**Objective:** Confirm documentation is internally consistent.

**Validation checklist:**
1. Run production build check when docs mention Hugo workflows:
   ```bash
   cd exampleSite && hugo --gc --minify
   ```
2. Verify no broken internal links in edited docs
3. Confirm referenced files actually exist
4. Confirm no unintended files were modified (`git status`)

### Phase 6: PR Preparation

**Objective:** Present changes with clear reasoning.

Include in PR description:
1. What drift was detected (commands/paths/structure)
2. Which files were updated and why
3. Whether sections were reorganized and rationale
4. Any remaining manual follow-up tasks

---

## Practical Patterns

### Pattern A: Command usage drift

When a documented command differs from actual workflow:
1. Update command in docs
2. Update explanation text that depends on the old command
3. Update troubleshooting guidance if symptoms changed

### Pattern B: File placement drift

When docs path changes:
1. Move/rename docs file
2. Update all inbound references
3. Update contributor guidance that cites old paths

### Pattern C: Shared setup examples

When setup snippets repeat in multiple guides:
1. Move canonical snippets to `docs/guidance/assets/*`
2. Link from each guide section to the canonical file
3. Keep local guide text concise and task-oriented

---

## Example Run

```
User request:
"README.md and docs setup commands are outdated, and docs folders changed."

Skill output summary:
- Updated stale setup commands in README/docs
- Repointed broken links to new docs paths
- Consolidated devcontainer examples under docs/guidance/assets
- Replaced duplicate snippets with references in prerequisites sections
```

---

## When This Skill Does NOT Apply

- Implementing runtime features unrelated to documentation
- Fixing application bugs without documentation impact
- Broad dependency migration not tied to docs accuracy

---

## References

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#examples)
- [`README.md`](../../../README.md)
- [`docs/develop/project-structure.md`](../../../docs/develop/project-structure.md)
- [`copilot-instructions.md`](../../copilot-instructions.md)
