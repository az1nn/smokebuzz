# Tasks: UI Polish & Responsivity v1

Waves are independently reviewable — approve/disapprove per wave. Order matters: Wave A (shared primitives + cleanup) precedes Wave B (motion) which depends on them.

## Wave A — Foundations & cleanup

### Step 1 — Breakpoint system
**File:** `src/hooks/useBreakpoints.ts` (new)
- [x] Implement `useBreakpoints()` on `useWindowDimensions()` per design §1.1; export `Breakpoint`, `Breakpoints`.
- [x] Export column helpers: `prodCols = isDesktop ? 4 : 2`, `catCols = isDesktop ? 3 : isTablet ? 2 : 1`, `difCols = isDesktop ? 3 : 1`.
- [x] `HomeScreen.tsx:164-168` — replace static `Dimensions.get("window")` with `useBreakpoints()`; remove `isMobile = width < 900` ternary duplication and the `badgeSize = Math.min(360, width * 0.8)` inline calc if it becomes `width`-driven via the hook.

### Step 2 — Shared Container
**File:** `src/components/Container.tsx` (new)
- [x] Implement per design §1.2 (`w-full mx-auto`, `maxWidth` 1180, `paddingX` 28).
- [x] Replace hardcoded `max-w-[1180px] mx-auto px-7` in `HomeScreen` (all sections), `ProductsScreen`, `Footer`.
- [x] Wrap `CartScreen` list/total/empty and `CheckoutScreen` form/summary in `Container` (fixes full-viewport stretch on desktop).

### Step 3 — SafeArea
- [x] `App.tsx` — wrap in `<SafeAreaProvider>`.
- [x] `StickyHeader.tsx` — `useSafeAreaInsets().top` → header padding (web unaffected).
- [x] `App.tsx` TabBar — `insets.bottom + 10` bottom padding.
- [x] `HomeScreen.tsx:180` — replace `paddingTop: isMobile ? 20 : 16` with insets-aware value.

### Step 4 — Architecture cleanup
- [x] `src/data/categories.tsx` (new) — move `categorias` + `renderIcon` out of `ProductsScreen`; update imports.
- [x] `src/data/products.ts` — add `productAlt` map (move the two `altTexts` duplicates from `HomeScreen.tsx:31-34` / `ProductsScreen.tsx:12-15`).
- [x] `src/hooks/useCartActions.ts` — delete dead `handleCheckout` + `navigateToCheckout` (`:29-37`) and its export usage.
- [x] `src/hooks/useCheckoutForm.ts` — delete unused `validateAll` export (`:40-42`).
- [x] `App.tsx:87` / `ProductsScreen.tsx:47` — resolve `onNavigateCart`: wire it (cart badge on product add) or remove the prop; no dead props.
- [x] `src/components/ProductCard.tsx` (new) — extract shared card from the two duplicates; port layout verbatim (photo `aspect-square bg-white rounded-lg p-[18px]`, `BrassButton size="sm"`). Delete `HomeScreen.tsx:502-547` and `ProductsScreen.tsx:72-108` locals.
- [x] `src/strings.ts` (new) — central pt-BR strings module; migrate user-facing literals from `ProductsScreen`, `CartScreen`, `CheckoutScreen`, `useCheckoutForm`, `usePayment`.

## Wave B — Motion system

### Step 5 — Reduced-motion hook
**File:** `src/hooks/usePrefersReducedMotion.ts` (new)
- [x] Per design §2.1 (web `matchMedia` + native `AccessibilityInfo`). Remove the inline `HomeScreen.tsx:128-135` block; use the hook.

### Step 6 — Animated card + press feedback
- [x] `ProductCard.tsx` — hover `translateY -6` + `border-color line→brass`, `Animated.timing` 250ms `Easing.bezier(0.22,1,0.36,1)` both directions.
- [x] `CategoryCard.tsx` — same eased hover treatment (replace instant `translateY` at `:13`).
- [x] `src/components/AppPressable.tsx` (new) — scale/dim feedback wrapper.
- [x] Adopt `AppPressable` in: tab bar (`App.tsx`), cart steppers + remove (`CartScreen`), hamburger + desktop nav links (`StickyHeader`), category cards, product add buttons.

### Step 7 — Screen transitions
- [x] `src/components/ScreenTransition.tsx` (new) — fade 220ms + rise 280ms per §2.5; reduced-motion bypass.
- [x] `App.tsx` — wrap each screen render, keyed by `screen`.

### Step 8 — Scroll reveals
- [x] `src/components/Reveal.tsx` (new) — web `IntersectionObserver` / native `onLayout`+`scrollY` per §2.6.
- [x] Wrap Home sections + stat row + dif grid (stagger 80ms). Non-home screens: mount-triggered reveal.

### Step 9 — Header scroll state + active section
- [x] `HomeScreen` — report throttled scroll (`scrollEventThrottle:16`) + computed `activeSection` (from `sectionY`) up to `App`.
- [x] `StickyHeader` — scrolled state (bg `0.98`, shadow, 200ms), `activeSection` prop → brass-light + underline on matching desktop nav link.

### Step 10 — Hero upgrades
- [x] Wisps: replace flat `<Circle fill>` with `react-native-svg` `<RadialGradient>` soft circles (design §2.8); keep drift timings 14/19/23s.
- [x] Badge scroll parallax: `scrollY * 0.15` translateY.
- [x] Web-only mouse parallax on wisps (±10px, rAF-throttled).
- [x] Cart badge bump: `Animated.spring` scale `1→1.25→1` on `itemCount` increase in `App.tsx` TabBar.
- [x] All hero loops gated on `usePrefersReducedMotion`.

## Wave C — State & content

### Step 11 — Skeletons + loading/error
- [x] `src/components/ProductCardSkeleton.tsx` (new) — shimmer per §3.1.
- [x] `HomeScreen` "Destaques": render 4 skeletons during load.
- [x] `ProductsScreen`: skeleton grid during load; error panel with Rye title + Cormorant sub + `BrassButton ghost` "Tentar novamente" → `refetch()`.

### Step 12 — Cart empty state
- [x] Replace bare text (`CartScreen.tsx:17-21`) with ember motif + Rye heading + Cormorant sub + `BrassButton solid` "Ver produtos" → `onNavigateProducts` (new prop from `App`).

### Step 13 — Checkout total snapshot fix
- [x] `CheckoutScreen.tsx` — capture `orderTotal = total` before `usePayment`/`clearCart()`; success UI renders snapshot. Verified by test 5.1.1.

### Step 14 — L10n + PWA theming
- [x] Translate `useCheckoutForm` messages + `usePayment` error + "CVV" label per §3.5 (via `src/strings.ts`).
- [x] `public/manifest.json`, `postbuild.js`, `app.json` — theme/background colors → `#0c0a08` (§3.6).

## Wave D — Accessibility

### Step 15 — A11y pass
- [x] Roles/labels per design §5 table (tabs, hamburger, steppers, remove, add buttons).
- [x] Web focus-visible ring: brass `outline`, offset 2, on all interactive elements.
- [x] `aria-hidden`/`accessibilityElementsHidden` on decorative wisps + rope dividers.
- [x] Tab bar: `accessibilityState.selected` on active tab; cart tab announces count.

### Step 16 — Tests
- [x] Add tests per §5.1 (`tests/ui-polish.test.ts`): checkout snapshot total, pt-BR form messages, `Container` maxWidth.
- [x] Follow `node:test` output format (`▶` / `✔`) per AGENTS.md.

## Verify

- [x] `npx tsc --noEmit` — zero errors ✓
- [x] `npm test` — all suites pass ✓ (13/13)
- [x] `npm run build:web` — export + postbuild OK ✓
- [ ] `npm run screenshots` — visual diff at 1280/900/560 passes; hover, press, badge bump, reveals, reduced-motion verified manually (Playwright). _(blocked: puppeteer/puppeteer-core not installed and no system Chrome — visual diff deferred)_

## Commit & push

```bash
git add openspec/changes/ui-polish-v1
git commit -m "spec: ui-polish-v1 — responsive rigor, motion system, state polish, accessibility"
git push
```
