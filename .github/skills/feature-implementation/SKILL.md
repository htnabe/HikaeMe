---
name: feature-implementation
description: "Workflow skill for feature and documentation additions. Use when: a user requests 「○○の機能を実装して」 / 「○○についてドキュメント追加して」 or equivalent English requests like 'implement [feature]' or 'add documentation for [topic]'. Guides the entire planning phase: request analysis → clarifying questions → structured TODO list generation → Conventional Commits branch creation → Serena MCP memory persistence."
---

# Feature Implementation & Documentation Skill

## Overview

This skill automates the planning and initialization phase for feature and documentation additions to the HikaeMe Hugo theme project. It ensures clarity, traceability, and consistency before implementation work begins.

**Scope:**
- ✅ Request analysis and scope clarification
- ✅ Structured TODO list generation
- ✅ Conventional Commits branch creation (feat/, docs/, fix/)
- ✅ Plan persistence in Serena MCP memory
- ❌ Actual implementation (handled in subsequent phases)
- ❌ PR submission or validation (follows after implementation)

---

## Workflow Phases

### Phase 1: Analysis

**Objective:** Parse the user's feature/documentation request and establish initial scope.

**Actions:**
1. Identify the type of request:
   - **Feature**: New functionality, UI enhancement, or behavior change
   - **Documentation**: New guide, API doc, or architecture explanation
   - **Fix**: Bug fix or improvement to existing feature
2. Extract core elements:
   - Feature/documentation name
   - Scope (which components: layouts, assets, exampleSite, etc.)
  - Affected areas (reference `docs/develop/project-structure.md` for file placement guidance)
   - Dependencies or related features (if any)

**Example Analysis Output:**
```
Request Type: Feature
Name: Search Result Highlighting
Scope: Frontend UI + Search Modal Partial
Affected Areas: 
  - assets/ts/algolia.ts (script logic)
  - assets/css/widgets/algolia.scss (styling)
  - layouts/partials/search-modal.html (template)
```

---

### Phase 2: Clarification

**Objective:** Ask focused questions to resolve ambiguities and establish acceptance criteria.

**Questions to ask (only if ambiguous):**
1. **Scope Clarity**: Does this feature affect other components (e.g., mobile responsiveness, accessibility)?
2. **Testing Strategy**: Should this include unit tests, E2E tests (Playwright), or both?
3. **Breaking Changes**: Will this modify existing APIs or Hugo parameters? (Important for theme users)
4. **Related Features**: Does this depend on other pending features or architectural changes?

**Goal:** Get explicit agreement on scope boundaries before proceeding to planning.

**Example Clarification:**
```
User Request: "Implement automatic theme color switching based on system preference"

Clarification Questions:
1. Should this respect existing manual color-toggle button, or should system preference take priority?
2. Should the preference be persisted in localStorage across page loads?
3. Do we need to test on both light and dark OS settings?

User Responses:
1. System preference first, toggle allows override
2. Yes, persist in localStorage
3. Yes, Playwright tests for both

→ Proceed to Planning with full scope established
```

---

### Phase 3: Planning

**Objective:** Generate a detailed, structured TODO list that guides implementation.

**Actions:**
1. Reference the project structure (`docs/develop/project-structure.md`) for file placement
2. Break the feature into discrete, reviewable tasks
3. Flag dependencies and review gates
4. Include validation steps (Hugo build, smoke test per `copilot-instructions.md`)

**TODO List Template:**

```
# TODO: [Feature/Doc Name]

## Pre-Implementation
- [ ] Confirm branch name and task structure with user
- [ ] (If feature) Review related existing code/patterns

## Implementation
- [ ] Task 1: [Specific, actionable item]
  - Related files: `path/to/file.ts`, `path/to/style.scss`
  - Dependencies: [List other tasks this depends on]
  - Acceptance: [Brief success criteria]
  
- [ ] Task 2: [Specific, actionable item]
  - Acceptance: [Brief success criteria]

## Testing & Validation
- [ ] Run Hugo production build: `cd exampleSite && hugo --gc --minify`
- [ ] Smoke test (if applicable): `npm run dev` and verify behavior
- [ ] (If feature) Verify no unintended file changes

## Documentation (if needed)
- [ ] Update README.md or relevant docs if user-facing
- [ ] Add comments to complex code sections

## Pull Request
- [ ] Create PR with `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] Reference this skill's plan in PR description
```

**Example Planning Output:**

```
# TODO: Add Reading Time Estimate

## Pre-Implementation
- [ ] Reference exampleSite content timing patterns

## Implementation
- [ ] Task 1: Create Hugo partial for word count calculation
  - File: layouts/partials/reading-time.html
  - Acceptance: Partial accepts content string, returns minutes
  
- [ ] Task 2: Integrate partial into article layout
  - File: layouts/_default/single.html
  - Acceptance: Reading time displays below article title

- [ ] Task 3: Style reading time display
  - File: assets/css/widgets/article-card-sm.scss
  - Acceptance: Styling matches theme design system

## Testing & Validation
- [ ] Hugo build: cd exampleSite && hugo --gc --minify
- [ ] Smoke test: npm run dev, verify reading times on sample posts

## Documentation
- [ ] Add example usage to README.md (if config-driven)
```

---

### Phase 4: Confirmation

**Objective:** Present the complete plan to the user for approval before any git/filesystem operations.

**Actions:**
1. Display the branch name (Conventional Commits format)
2. Show the TODO list
3. Ask for explicit approval: "Proceed with these tasks and create the branch?"
4. Allow user to request modifications before proceeding

**Confirmation Prompt Template:**

```
📋 **PLAN SUMMARY**

**Branch Name:** feat/feature-name
**Type:** Feature / Documentation / Fix
**Scope:** [List affected components]

**TODO List:**
[Display full TODO list from Phase 3]

---

✅ Ready to proceed?
- Create branch `feat/feature-name`
- Save this plan to project memory (Serena MCP)
- Display plan in this conversation

**Actions:**
- Type `yes` or `👍` to proceed
- Type `modify` to adjust scope or tasks
- Type `cancel` to abort
```

---

### Phase 5: Branch Creation

**Objective:** Create the git branch to start implementation.

**Actions:**

1. **Create Git Branch** (after user approval)
   ```bash
   git checkout -b feat/feature-name
   git commit --allow-empty -m "chore: initialize feat/feature-name branch"
   ```
   - Branch naming follows `feat/`, `docs/`, `fix/` prefixes (Conventional Commits)
   - Brief empty commit establishes branch history

2. **Display Completion**
   ```
   ✅ **Ready to Implement**
   
   - Branch: `feat/feature-name` ✓ Created
   - TODO List: Saved in this conversation
   - Next Steps: Begin implementation following the TODO list above
   
   💡 **Tips:**
   - Reference this TODO list frequently during implementation
   - Update the list as tasks are completed
   - Use the branch name in commit messages
   - Follow the Validation Checklist from copilot-instructions.md before submitting PR
   ```

---

## Integration Points

### Referencing Existing Documentation

**During Analysis & Planning, cite:**
- `docs/develop/project-structure.md` — for file placement rules
- `.github/copilot-instructions.md` — for Validation Checklist, PR guidelines, dependency policies
- `theme.toml` & `README.md` — for theme scope and user-facing features

**Example Citation:**
```
Per docs/develop/project-structure.md:
- Global style changes → assets/css/
- Widget-specific styles → assets/css/widgets/
- Client logic → assets/ts/
∴ This feature touches: assets/css/widgets/new-feature.scss, assets/ts/new-feature.ts
```

### Hugo Build & Validation

Include in Phase 3 TODO:
```bash
# Production build (per copilot-instructions.md Validation Checklist)
cd exampleSite && hugo --gc --minify

# Local smoke test
npm run dev  # then verify behavior in http://localhost:1313
```

---

## Language Support

This skill responds to feature/documentation requests in **both Japanese and English**:

**Japanese Triggers:**
- 「○○の機能を実装して」
- 「○○についてドキュメント追加して」
- 「○○を改善して」
- 「バグ修正：○○」

**English Triggers:**
- "Implement [feature]"
- "Add documentation for [topic]"
- "Improve [feature]"
- "Fix: [issue]"

---

## Example Session

```
User: "ホームページに最新記事のスライドショーを実装してください"

[Skill Analysis & Clarification...]

Agent: "以下の📋プランをご確認ください..."

[Display Phases 1-4]

User: "Yes!"

[Phase 5 executes → branch creation]

Agent: "✅ Branch `feat/homepage-latest-posts-slideshow` created!
         Let's begin implementation!"
```

---

## When This Skill Does NOT Apply

❌ User is implementing features without an explicit request  
❌ User is refactoring existing code  
❌ User is debugging or fixing runtime errors  
❌ User is updating dependencies or infrastructure  
→ Use default agent for these tasks.

---

## References

- [Conventional Commits](https://www.conventionalcommits.org/) — branch naming standard
- [`copilot-instructions.md`](./.github/copilot-instructions.md) — project validation checklist
- [`docs/develop/project-structure.md`](./docs/develop/project-structure.md) — file placement rules
