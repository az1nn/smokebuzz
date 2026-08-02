# Tasks: Add Web Storybook for all components

## Phase 1 — Install Dependencies

- [ ] `npm install -D @storybook/react-vite@^8.2.0 @storybook/addon-essentials@^8.2.0 @storybook/addon-a11y@^8.2.0 vite@^5 @storybook/react-vite@latest --save-dev` (verify peer deps satisfied automatically or pin versions if needed).

## Phase 2 — Create Storybook config files

- [ ] Create `.storybook/main.ts` — Vite builder config with `react-native` → `react-native-web` alias, stories glob, addons.
- [ ] Create `.storybook/preview.tsx` — import `../global.css`, wrap with `SafeAreaProvider`, set parameters.
- [ ] Create `.storybook/preview-head.html` — Google Fonts `<link>` elements (Rye, Jost, Cormorant Garamond).

## Phase 3 — PostCSS config for Tailwind

- [ ] Create `postcss.config.js` at repo root with `{ plugins: { tailwindcss: {}, autoprefixer: {} } }`.

## Phase 4 — Update package.json

- [ ] Add script `"storybook": "storybook dev -p 6006"`.
- [ ] Add script `"storybook:build": "storybook build"` (optional).

## Phase 5 — Update tailwind.config.js content glob

- [ ] Extend `content` array with `"./**/*.stories.ts{,x}"` so classNames in stories are collected.

## Phase 6 — Write component stories

Create `src/components/*.stories.tsx` for each export:

- [ ] `AppPressable.stories.tsx` — Default (scale), dim variant, children render, disabled state.
- [ ] `BrassButton.stories.tsx` — Solid (default), ghost; md, sm; onPress stub.
- [ ] `CategoryCard.stories.tsx` — Default with icon (import from `renderIcon`), title, description.
- [ ] `Container.stories.tsx` — Children block, custom maxWidth, paddingX, className.
- [ ] `ProductCard.stories.tsx` — Uses `products[0]`; onAdd → `console.log`; altText variant.
- [ ] `ProductCardSkeleton.stories.tsx` — Default (no props).
- [ ] `Reveal.stories.tsx` — Default child with "Reveal text"; delay 100ms; y 48.
- [ ] `RopeDivider.stories.tsx` — Default; thin variant.
- [ ] `ScreenTransition.stories.tsx` — Child text; use ` Animated.View` with opacity 1 (no animation wait). Gating by `usePrefersReducedMotion` requires a wrapper or mocking; simplified: render children directly, noting the wrapper’s absence in story preview.
- [ ] `SectionHeading.stories.tsx` — All (eyebrow, title, description), title-only.
- [ ] `StickyHeader.stories.tsx` — Provide stub `onNavPress`; test `scrolled` true/false; `activeSection` "home".

## Phase 7 — Static verification

- [ ] `npm run storybook` — start successfully, verify no console errors.
- [ ] `npx tsc --noEmit` — zero errors in stories + build.
- [ ] `npm test` — 13/13 pass (existing tests unchanged).

## Phase 8 — Build verification

- [ ] `npm run build:web` — dist regenerated without breaking changes.
- [ ] Manual browser check: storybook UI loads all stories; BrassButton hover, AppPressable press, CategoryCard hover, ProductCard add button work.

## Phase 9 — A11y checks

- [ ] Open A11y panel in Storybook for each story → no violations beyond expected (e.g., tab order on tabs not in scope).

## Phase 10 — Code review & commit

- [ ] Run `code-review` subagent.
- [ ] Commit: `"feat: add web storybook for all 11 components"`
- [ ] Push to origin/master.