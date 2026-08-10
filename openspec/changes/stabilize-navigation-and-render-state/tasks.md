# Tasks: Stabilize navigation and render state

## Gate 0 — Coordination

- [ ] Complete/reconcile `openspec/changes/add-storybook-web/`, `.storybook/`, and `src/components/*.stories.tsx` independently; reconcile rather than overwrite current `src/components/StickyHeader.tsx` edits.
- [ ] Land `harden-commerce-security-accessibility` first when it changes `src/context/CartContext.tsx`, `src/screens/CheckoutScreen.tsx`, or shared consumers; retain its validation semantics.

## Phase 1 — Typed Navigation and Scroll

- [ ] Add `HomeSection`, `HomeSectionRequest`, and `HomeScrollState` in `src/types.ts`.
- [ ] Create `tests/navigation-state.test.tsx` for request-before-mount/layout, matching and stale acknowledgement, newest-request supersession, direct-Home retention, explicit non-home cancellation, and repeated section presses.
- [ ] Update `App.tsx` with monotonic nonce creation, pending request ownership, typed props, guarded acknowledgement, and cancellation rules.
- [ ] Reconcile and update `src/components/StickyHeader.tsx` so `onNavPress` and section maps use `HomeSection` without discarding unrelated work.
- [ ] Create `tests/HomeScreen.scroll.test.tsx` for layout-triggered scroll/acknowledgement, threshold and active-section transitions, duplicate notification suppression, and stable handler identity.
- [ ] Update `src/screens/HomeScreen.tsx` with layout-backed attempt/acknowledgement, typed section offsets, semantic last-emitted state, and memoized animated scroll handler.

## Phase 2 — Virtualized Static Catalog

- [ ] Update `src/hooks/useProducts.ts` to return module-stable products, literal `loading: false`, `error: null`, and a stable resolved no-op `refetch` without timer/effect/state.
- [ ] Create `tests/ProductsScreen.test.tsx` for first-render products, no scheduled timer/effect, one vertical `FlatList`, header/footer content, add-to-cart, stable callbacks, and breakpoint column remount behavior.
- [ ] Update `src/screens/ProductsScreen.tsx` to one vertical `FlatList` with memoized header/row/footer and remove its wrapper `ScrollView`, disabled nested list, and skeleton branch.

## Phase 3 — Cart Consumer Stability

- [ ] Update `src/context/CartContext.tsx` with exported `CartStateValue`/`CartActionsValue`, separate internal providers, once-memoized actions, derived state, `useCartState`, `useCartActionsContext`, and compatibility `useCart`.
- [ ] Update `src/hooks/useAddToCart.ts` and `src/hooks/useCartActions.ts` to consume action context only.
- [ ] Migrate `App.tsx`, `src/screens/CartScreen.tsx`, and the reconciled `src/screens/CheckoutScreen.tsx` to the narrow state/action hooks appropriate to each use.
- [ ] Create `tests/cart-context-identity.test.tsx` for stable action references, derived-state changes, compatibility `useCart`, and no action-only consumer rerender on mutations.

## Phase 4 — Reduced Motion and Deterministic Animation

- [ ] Create `src/hooks/reducedMotionStore.ts` with cached snapshots, first/last subscriber platform listener lifecycle, native generation guard, and SSR false snapshot.
- [ ] Update `src/hooks/usePrefersReducedMotion.ts` to consume the store through `useSyncExternalStore`.
- [ ] Create `tests/reduced-motion-store.test.ts` using `jest.resetModules()` for web/native first-subscribe, shared listener, propagation, SSR, stale async native resolution, and final-unsubscribe cleanup.
- [ ] Create `tests/setup/animated.ts` with deterministic `Animated.timing`, `spring`, `sequence`, and `loop` start/stop mocks; register it in `jest.config.js` `setupFilesAfterEnv`.
- [ ] Create `tests/workflows.test.tsx` for header-to-section, products-to-cart, quantity/remove, reduced-motion, and screen-transition workflows with no wall-clock waits.
- [ ] Update `docs/ui-overhaul-v2-changes.md` with typed navigation, list virtualization, synchronous data, context split/migration, and shared reduced-motion behavior.

## Verification Gate

- [ ] Run `npm test -- --runInBand`; all six named new suites and existing suites pass without open handles.
- [ ] Run `npx tsc --noEmit`, `npm run storybook:build`, and `npm run build:web`; zero errors after independent Storybook reconciliation.
- [ ] Manually verify product/navigation/cart flows at mobile, tablet, and desktop widths.
- [ ] Run code review, resolve every P0/P1 finding, then commit and push separately from specs and other changes.
