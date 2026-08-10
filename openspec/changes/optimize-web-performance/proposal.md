# Proposal: Optimize measurable web performance

## Context

The initial hero PNG is about 516 KB and lacks responsive delivery. The repository has no reproducible asset/bundle budget report or recorded Lighthouse baseline. Optimizations must begin from measurements and avoid speculative screen splitting or animation changes.

## Objectives

1. Capture and commit a reproducible web-build and Lighthouse lab baseline before optimization.
2. Deliver responsive hero assets with reserved geometry and no initially requested variant over 150 KB.
3. Add deterministic bundle/asset budget reporting and enforcement.
4. Meet a mobile Lighthouse lab LCP median of at most 2.5 seconds across three cold-cache runs.
5. Gate screen splitting and animation pausing on evidence rather than making them required changes.

## Scope and Dependencies

Implementation scope is limited to `assets/logosmokebuzz-hero.png`, `assets/hero/manifest.json`, the three generated files under `assets/hero/`, `scripts/resize-images.js`, `scripts/check-performance-budgets.js`, conditionally `scripts/run-lighthouse.js`, `src/screens/HomeScreen.tsx`, `package.json`, `package-lock.json`, `tests/performance-budget.test.ts`, `tests/hero-selection.test.tsx`, `tests/fixtures/performance-budget/`, `docs/performance/baseline.json`, `docs/performance/latest-build.json`, `docs/performance/lighthouse-baseline.json`, `docs/performance/lighthouse-final.json`, `docs/performance/web-performance.md`, and `docs/ui-overhaul-v2-changes.md`. The repository-owned `scripts/serve-dist-with-vercel-headers.js` from the commerce change is reused unchanged. No new production dependency is allowed without approval. Baseline follows `stabilize-navigation-and-render-state`. `add-storybook-web` remains independent; do not touch its unfinished files or unrelated `StickyHeader.tsx` edits.

## Success Criteria

Committed reports show before/after build sizes and a reproducible three-run cold-cache mobile Lighthouse lab median. Every hero candidate requested for the initial viewport is <=150 KB, layout space is reserved, budget checking exits nonzero on regression, and LCP median is <=2.5 seconds. Optional code splitting or animation pausing occurs only after a report identifies it as necessary.
