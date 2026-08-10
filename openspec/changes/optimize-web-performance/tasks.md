# Tasks: Optimize web performance

## Gate 0 — Coordination and Baseline

- [ ] Complete/reconcile `openspec/changes/add-storybook-web/`, `.storybook/`, and `src/components/*.stories.tsx` independently; preserve unrelated `src/components/StickyHeader.tsx` edits.
- [ ] Land `stabilize-navigation-and-render-state`, record its commit in `docs/performance/web-performance.md`, and reuse `scripts/serve-dist-with-vercel-headers.js` from `harden-commerce-security-accessibility`.
- [ ] Run `node --version`, `npm --version`, and `npm run build:web`; write sanitized commit/environment and raw/gzip asset data to `docs/performance/baseline.json` and its explanation to `docs/performance/web-performance.md`.
- [ ] Run `node scripts/serve-dist-with-vercel-headers.js --port 4173`, verify applied headers/no CSP violations, perform three manual cold-cache mobile runs, and write raw runs/median to `docs/performance/lighthouse-baseline.json`.

## Phase 1 — Repository-Owned Hero Contract

- [ ] Extend `scripts/resize-images.js` to emit `assets/hero/manifest.json` plus `assets/hero/logosmokebuzz-hero-320.png`, `assets/hero/logosmokebuzz-hero-480.png`, and `assets/hero/logosmokebuzz-hero-720.png` from `assets/logosmokebuzz-hero.png`.
- [ ] In `scripts/resize-images.js`, validate manifest schema, unique source keys/targets, exact 320x320/480x480/720x720 dimensions, transparency, existence, and <=153600 bytes for every target.
- [ ] Create `tests/hero-selection.test.tsx` to validate manifest shape/dimensions, literal-require source selection at <=560/<=900/>900 widths, density cap behavior, explicit square geometry, and exclusion of the source PNG.
- [ ] Update `src/screens/HomeScreen.tsx` with a static literal-require map keyed by the manifest keys and reserved `width`, `height`, and `aspectRatio: 1`.

## Phase 2 — Budget Tooling

- [ ] Create fixture trees `tests/fixtures/performance-budget/{pass,threshold-equal,hero-source-over,hero-emitted-over,missing-emitted,ambiguous-hash,malformed-manifest,traversal,bundle-over}/`, each with minimal `dist/`, HTML, bundles, manifest, and hero bytes needed by its case.
- [ ] Create `tests/performance-budget.test.ts` for fixture exit codes, exact thresholds, raw/gzip totals, SHA-256 unique emitted matching, malformed/traversal rejection, and deterministic path/check ordering.
- [ ] Create `scripts/check-performance-budgets.js` to parse `dist/index.html`, safely resolve dist resources, read `assets/hero/manifest.json`, validate every source target, recursively hash dist files, uniquely match every emitted hero, calculate level-9 gzip sizes, and exit nonzero on any specified budget/error.
- [ ] Add `performance:budget` to `package.json`; update `package-lock.json` only if separately approved Lighthouse tooling is later installed.
- [ ] Run `npm run build:web && npm run performance:budget`; write schema-versioned, sorted, repository-relative results and source-to-emitted matches to `docs/performance/latest-build.json`.

## Phase 3 — Lighthouse Result

- [ ] Keep `performance:serve` as `node scripts/serve-dist-with-vercel-headers.js --port 4173`; add it to `package.json` without a server dependency.
- [ ] Request separate approval for exact pinned Lighthouse/launcher devDependencies before changing `package.json`/`package-lock.json`; never run an uninstalled tool through `npx`.
- [ ] If approved, create `scripts/run-lighthouse.js` that imports only the pinned local package, verifies availability, runs three isolated cold-cache mobile audits, and writes deterministic summaries; add `performance:lighthouse` to `package.json`.
- [ ] If not approved, use the exact manual protocol in `design.md`; in either path write Chrome/Lighthouse versions, three LCP values, and numeric median to `docs/performance/lighthouse-final.json`.

## Phase 4 — Evidence and Documentation

- [ ] Inspect `docs/performance/latest-build.json` and traces; leave screen imports unchanged unless evidence justifies a spec amendment and approval.
- [ ] Leave continuous animation lifecycle unchanged unless a trace justifies a spec amendment and approval.
- [ ] Update `docs/performance/web-performance.md` with baseline/final tables, commands, CSP-aware server verification, limitations, decisions, and exceptions.
- [ ] Update `docs/ui-overhaul-v2-changes.md` with manifest-owned responsive hero selection and reserved layout behavior.

## Verification Gate

- [ ] Run `npm test -- --runInBand`; `tests/performance-budget.test.ts`, `tests/hero-selection.test.tsx`, and existing suites pass.
- [ ] Run `npx tsc --noEmit` and `npm run build:web && npm run performance:budget`; all three source and emitted heroes independently pass <=150 KB and JS/CSS budgets pass.
- [ ] Serve with `node scripts/serve-dist-with-vercel-headers.js --port 4173`; verify headers/CSP, then verify three-run cold-cache mobile Lighthouse LAB median LCP <=2.5 seconds without field/p75 claims.
- [ ] Run code review, resolve every P0/P1 finding, then commit and push separately from specs and other changes.
