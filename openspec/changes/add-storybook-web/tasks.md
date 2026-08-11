# Tasks: Add Web Storybook for all components

## Phase 1 — Install Dependencies

- [x] Install compatible Storybook 8.6, Essentials, A11y, Vite 5, PostCSS, and Autoprefixer development dependencies.

## Phase 2 — Create Storybook config files

- [x] Create `.storybook/main.ts` — Vite builder config with `react-native` → `react-native-web` alias, stories glob, addons.
- [x] Create `.storybook/preview.tsx` — import `../global.css`, wrap with `SafeAreaProvider`, set parameters.
- [x] Create `.storybook/preview-head.html` — Google Fonts `<link>` elements (Rye, Jost, Cormorant Garamond).

## Phase 3 — PostCSS config for Tailwind

- [x] Create `postcss.config.js` at repo root with `{ plugins: { tailwindcss: {}, autoprefixer: {} } }`.

## Phase 4 — Update package.json

- [x] Add script `"storybook": "storybook dev -p 6006"`.
- [x] Add script `"storybook:build": "storybook build"` (optional).

## Phase 5 — Update tailwind.config.js content glob

- [x] Ensure the existing `"./src/**/*.{ts,tsx}"` content glob collects component stories without scanning dependencies.

## Phase 6 — Write component stories

Create `src/components/*.stories.tsx` for each export:

- [x] `AppPressable.stories.tsx` — Default (scale), dim variant, children render, disabled state.
- [x] `BrassButton.stories.tsx` — Solid (default), ghost; md, sm; onPress stub.
- [x] `CategoryCard.stories.tsx` — Default with icon (import from `renderIcon`), title, description.
- [x] `Container.stories.tsx` — Children block, custom maxWidth, paddingX, className.
- [x] `ProductCard.stories.tsx` — Uses production product data, action spy, and altText variant.
- [x] `ProductCardSkeleton.stories.tsx` — Default (no props).
- [x] `Reveal.stories.tsx` — Default child with "Reveal text"; delay 100ms; y 48.
- [x] `RopeDivider.stories.tsx` — Default; thin variant.
- [x] `ScreenTransition.stories.tsx` — Render the real transition and provide an interactive remount demonstration.
- [x] `SectionHeading.stories.tsx` — All (eyebrow, title, description), title-only.
- [x] `StickyHeader.stories.tsx` — Provide stub `onNavPress`; test `scrolled` true/false; use the valid `activeSection` value `"categorias"`.

- [x] Apply a global Noir preview background matching the production canvas.
- [x] Present RopeDivider at full width with preview padding.
- [x] Use an image-backed production item in ProductCard's `RealProduct` story.

## Phase 7 — Static verification

- [x] `npm run storybook` — starts successfully with no terminal errors.
- [x] `npx tsc --noEmit` — zero errors in stories + build.
- [x] `npm test` — existing test suite passes unchanged.

## Phase 8 — Build verification

- [x] `npm run build:web` — dist regenerated without breaking changes.
- [ ] Manual browser check: storybook UI loads all stories; BrassButton hover, AppPressable press, CategoryCard hover, ProductCard add button work.

## Phase 9 — A11y checks

- [ ] Open A11y panel in Storybook for each story → no violations beyond expected (e.g., tab order on tabs not in scope).

## Phase 10 — Code review & commit

- [x] Run `code-review` subagent and apply its requested story and specification corrections.
- [ ] Commit: `"feat: add web storybook for all 11 components"`
- [ ] Push to origin/master.
