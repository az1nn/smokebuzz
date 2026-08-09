# Repository Guidelines

## Project Structure

This Expo/React Native TypeScript app starts at `App.tsx`. Screens live in `src/screens/`, UI in `src/components/`, state in `src/context/`, workflows in `src/hooks/`, data in `src/data/`, and types in `src/types.ts`. Tests are in `tests/`, with stubs in `__mocks__/`. Assets belong in `assets/`; web support is in `public/`, `scripts/`, and `postbuild.js`. Specifications and documentation live in `openspec/changes/` and `docs/`.

## Commands

- `npm start` starts Expo; `npm run web`, `npm run android`, and `npm run ios` target platforms.
- `npm test` runs Jest.
- `npx tsc --noEmit` checks TypeScript.
- `npm run build:web` exports the processed PWA to `dist/`.

## Clean Code and Architecture

Use two-space indentation and existing patterns. Name components in `PascalCase`, hooks as `useCamelCase`, and variables/functions in `camelCase`. Keep screens focused on composition: presentation belongs in components, state in contexts, side effects in hooks, and contracts in types. Prefer small functions, explicit props, immutable state, and early returns. Remove dead code and fix root causes.

Reuse design-system components and NativeWind `className` styles; do not introduce `StyleSheet.create` or duplicate UI. Use Tailwind v3 syntax. Dependencies and build/config changes require approval. Future desktop I/O must cross `OpenBandNative` from `@bridge`, never frontend filesystem, Electron, or Tauri imports. Update `docs/ui-overhaul-v2-changes.md` for visual or core-component changes.

## Agent and OpenSpec Workflow

The main agent delegates exploration, implementation, verification, review, and Git operations to subagents, retaining concise summaries. Code changes require exactly `proposal.md`, `design.md`, and `tasks.md` under `openspec/changes/<change-name>/`, followed by user approval. Commit and push the specification before implementation. Implement only approved tasks, update specs/docs, delegate verification and review, then push a separate implementation commit. Markdown-only context/documentation changes are exempt. Always commit and push completed work.

## Testing

Write Jest `*.test.tsx` suites with `describe` and `it`, asserting observable behavior. Cover success, failure, and meaningful boundaries. Keep mocks in `__mocks__/`; never weaken assertions to pass CI. Before delivery, run tests, type checking, and the relevant build.

## Security

Follow `docs/SEGURANCA_CHAVES_SECRETAS.md`. Never commit `.env` files or credentials, embed secrets in versioned files, log them, or use realistic example keys. `EXPO_PUBLIC_` values are exposed in web bundles; allow only public URLs and publishable keys. Keep service-role, JWT, database, payment, OAuth, and deploy secrets in backend/CI storage. Validate variables, redact logs, authorize server-side, require RLS for client-accessible tables, and rotate suspected exposures immediately.

## Commits and Pull Requests

Use focused subjects matching history, such as `feat: add checkout validation` or `docs: clarify security rules`. Never combine specification and implementation commits. PRs should state intent and scope, link the OpenSpec change or issue, list verification, include UI screenshots, and note security, migration, or configuration impact.
