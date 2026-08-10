# Design: Measured web performance optimization

## 1. Baseline First

Before asset or runtime edits, run `npm run build:web` and create:

- `docs/performance/baseline.json`: build commit, UTC timestamp, Node/npm versions, asset paths, raw/gzip sizes, and initial JS/CSS totals;
- `docs/performance/lighthouse-baseline.json`: three run summaries plus median LCP; and
- `docs/performance/web-performance.md`: exact environment, commands, result table, limitations, and follow-up decisions.

Reports must not include hostnames containing credentials, cookies, environment values, or absolute user paths.

## 2. Responsive Hero Contract

Generate transparent assets from `assets/logosmokebuzz-hero.png`:

```text
assets/hero/logosmokebuzz-hero-320.png
assets/hero/logosmokebuzz-hero-480.png
assets/hero/logosmokebuzz-hero-720.png
```

`scripts/resize-images.js` creates and maintains `assets/hero/manifest.json` as the source of truth:

```json
{
  "schemaVersion": 1,
  "source": "assets/logosmokebuzz-hero.png",
  "variants": [
    { "key": "mobile", "width": 320, "height": 320, "target": "assets/hero/logosmokebuzz-hero-320.png" },
    { "key": "tablet", "width": 480, "height": 480, "target": "assets/hero/logosmokebuzz-hero-480.png" },
    { "key": "desktop", "width": 720, "height": 720, "target": "assets/hero/logosmokebuzz-hero-720.png" }
  ]
}
```

The task validates unique keys/targets, exact decoded dimensions, transparency, file existence, and <=150 KB for all three repository variants. It records a SHA-256 for each in the build report without mutating the stable manifest schema. `HomeScreen` selects mobile for widths <=560, tablet for <=900, and desktop above 900, with density capped at the next variant rather than loading the source PNG. The wrapper/image reserve square `aspectRatio: 1` and explicit width/height from `badgeSize`.

Built matching never depends on Expo metadata. After `npm run build:web`, the budget checker recursively hashes files below `dist/`, matches each manifest target to exactly one emitted file with identical SHA-256 content, records its repository target and actual dist-relative emitted path, and fails on zero or ambiguous matches. It checks both each source target and each matched emitted file individually at <=153600 bytes. The original source is an authoring asset and must not hash-match or appear as an initial built reference.

Because Metro static requires must be analyzable, use a static map of literal `require()` calls rather than a computed path.

## 3. Budget Algorithm

Add `scripts/check-performance-budgets.js` and package script `performance:budget`. The script:

1. requires an existing `dist/` and parses `dist/index.html` for initial stylesheet/script references;
2. resolves only files inside `dist/`, rejecting traversal or missing files;
3. measures raw bytes with file size and gzip bytes with `zlib.gzipSync(..., { level: 9 })`;
4. reads only repository-owned `assets/hero/manifest.json`, validates its schema/dimensions/targets, hashes all `dist/` files, and uniquely content-matches every target without Expo metadata;
5. writes sorted `docs/performance/latest-build.json` with schema version, paths relative to repository root, raw/gzip values, totals, and pass/fail checks; and
6. exits `1` for missing inputs, malformed references, or exceeded budgets.

Budgets:

- every one of the three repository hero targets and every uniquely matched emitted variant: <=150 KB raw individually;
- each initial JS file: <=1.5 MB raw and <=500 KB gzip;
- total initial JS: <=2.0 MB raw and <=650 KB gzip;
- total initial CSS: <=250 KB raw and <=50 KB gzip.

Use binary KB (`1024` bytes). `tests/performance-budget.test.ts` runs the checker against named trees below `tests/fixtures/performance-budget/`: `pass`, `threshold-equal`, `hero-source-over`, `hero-emitted-over`, `missing-emitted`, `ambiguous-hash`, `malformed-manifest`, `traversal`, and `bundle-over`. It also checks deterministic ordering. If baseline exceeds a JS/CSS budget, first record it; closing requires reaching the budget or explicit dated user approval documented in the report.

## 4. Lighthouse Protocol

Lighthouse is not currently installed. Do not use `npx lighthouse` or any implicit downloader. Serving always uses the dependency-free repository script specified by the commerce change:

```json
"performance:serve": "node scripts/serve-dist-with-vercel-headers.js --port 4173",
"performance:lighthouse": "node scripts/run-lighthouse.js"
```

The server applies `vercel.json` headers to `dist`; before auditing, Network must show those response headers and the console must show no CSP violations. Preferred automation requires separate approval for exact pinned `lighthouse` and any required Chrome-launcher devDependency. `scripts/run-lighthouse.js` imports only the approved local `node_modules` package, fails with installation instructions when absent, launches three independent cold-cache mobile runs against `http://127.0.0.1:4173`, uses simulated throttling/mobile defaults and a fresh Chrome profile per run, and writes summaries. It records each LCP and numeric median; acceptance is LAB median LCP <=2500 ms, never field/p75 language.

Until dependency approval, use the manual fallback: build; run `node scripts/serve-dist-with-vercel-headers.js --port 4173`; verify headers/CSP in Network and console; open Chrome DevTools Lighthouse in Incognito with extensions disabled; select Mobile, Performance, simulated throttling, clear storage; run three times with a fresh Incognito session/cold cache; record tool/Chrome versions and each LCP; calculate the median. Manual output is acceptable evidence but does not add an automated Lighthouse script.

## 5. Measurement-Gated Follow-Ups

Eager screen imports are changed only if bundle analysis shows a separately loadable screen chunk would materially reduce initial JS and Expo supports the approach without a new production dependency. Continuous animations are paused offscreen only if a Performance trace shows meaningful main-thread/battery cost. Either finding requires updating this spec with evidence, files, compatibility behavior, and tests before implementation; neither is required for acceptance.
