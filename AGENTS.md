# Agent Workflow: OpenSpec SDD Loop

> This project uses the **OpenSpec Specification-Driven Development (SDD)** loop as its default development harness. Every change goes through three phases: **Propose** (define specs and tasks in `openspec/changes/`), **Apply** (implement exactly what is specified in `tasks.md`), and **Archive** (record and move completed specs to `openspec/archive/`).

**ALWAYS commit and push after completing changes.** Do not wait to be asked.

### Subagent-First Rule (Context Preservation)

The main agent acts as the **architect/orchestrator** and MUST preserve its own context window. **ALWAYS delegate to subagents** — never do heavy work inline in the main context. This applies to:

- **Reading/exploring** — Use the `explore` (or `general`) subagent to read files, search the codebase, and gather context. Do not read large files directly in the main context.
- **Writing/updating code** — Delegate implementation edits to a `general` subagent with a detailed task description.
- **Code review** — Always run the `code-review` subagent before every commit (never review inline).
- **Verification** — Delegate running tests, `tsc`, and builds to a subagent; have it return only the pass/fail summary and relevant errors.
- **Commit & push** — Delegate the git staging/commit/push steps to a subagent.

The main agent should only: plan, decide, dispatch subagents (in parallel when independent), and integrate their concise summaries. Keep raw file contents, test logs, and diffs inside subagents — return only what the architect needs to make the next decision.

### Required Workflow Order

Every change must follow this sequence — never skip or reorder:

1. **Spec** — Write `proposal.md`, `design.md`, `tasks.md` under `openspec/changes/<name>/`
2. **Commit & push** — Commit the spec files before writing any code
3. **Implement, test & code review** — Implement source changes per `tasks.md`, write/update tests, run full verification, pass `code-review` subagent
4. **Update specs & docs** — Update spec files and any docs to reflect what was actually built
5. **Commit & push** — Final commit with all implementation + test + spec updates

Do NOT combine spec commits with implementation commits. Each phase must be independently reviewable.

---

## Phase 1: Plan

**Goal:** Understand what needs to change before writing code.

1. **Read relevant files** — Read all files mentioned in the task, plus any files they import
2. **Trace the data flow** — Identify state, props, and side effects before modifying
3. **Scope the change** — Answer:
   - What is the smallest possible change?
   - Which files must be modified?
   - Will this change affect other screens?
4. **Produce a plan** — List files and changes in order. Example:
   ```
   1. src/components/Button.tsx — add `danger` variant
   2. app/(auth)/login.tsx — use new variant for delete action
   3. Run `npx tsc --noEmit` to verify types
   4. Run `npm run build` to verify build
   ```

**Do NOT** skip straight to code. If uncertain about the approach, use the Task tool to explore first. Always define changes first by creating exactly three separate files under `openspec/changes/<change-name>/` and waiting for the user's explicit approval before implementing any source code edits:
- `proposal.md`: Outlines the context, problem description, and high-level objectives.
- `design.md`: Details the API signatures, visual layouts, flowcharts, state variables, and component mappings.
- `tasks.md`: Provides a detailed, step-by-step checklist of edits and verification steps.

---

## Phase 2: Act

**Goal:** Implement the plan with minimal scope.

### Constraints

- **No new dependencies** unless explicitly approved. Check `package.json` first.
- **Never modify build scripts** in `package.json` unless the user explicitly requests it.
- **Desktop bridge rule:** Never use `require('fs')`, `ipcRenderer`, or Tauri APIs in `src/` frontend code. All native desktop I/O goes through `OpenBandNative` from `@bridge`.
- **Follow existing patterns.** If the project uses `View` + `className`, do that. Don't introduce `StyleSheet.create`.
- **Use the design system.** Import from `src/components/` whenever possible. Don't inline styles that exist as components.
- **No comments in code.** The code should be self-documenting.
- **Tailwind v3 syntax.** Use `@tailwind base/components/utilities` directives, NOT `@import "tailwindcss/..."` (that's v4).
- **Don't modify config files** (`tailwind.config.js`, `metro.config.js`, `babel.config.js`, `tsconfig.json`) unless the task explicitly requires it. (Adding `@bridge` alias to tsconfig.json is allowed for desktop architecture changes.)
- **Keep changes documentation updated:** Always consult and update `docs/ui-overhaul-v2-changes.md` when modifying visual layouts, themes, stylesheets, or core components to ensure all UI overhaul features remain fully documented.
- **No dead code.** Don't leave unused imports, variables, or files.
- **Root cause, not suppression.** For bugs, fix the underlying issue. Don't add try/catch wrappers that silence errors.
- **Test output format:** Every test must follow the node:test pattern — `▶ SuiteName` for describe blocks, `  ✔ test description (Xms)` for passing tests, and `✔ SuiteName (Xms)` at suite end. See legacy tests (`tests/presets.test.ts`, `tests/types.test.ts`) for reference.