# Proposal: Stabilize navigation and render state

## Context

Home-section navigation can race screen mounting and layout, product rendering nests non-scrolling lists in a scroll view, static products simulate asynchronous loading, repeated scroll notifications create redundant state updates, reduced-motion consumers each subscribe independently, and cart actions share a state-changing context value.

## Objectives

1. Preserve typed home-section intent until layout-backed scrolling succeeds or is explicitly cancelled.
2. Use one virtualized Products list and synchronous static product data.
3. Emit scroll state only when it changes through a stable handler.
4. Share one reduced-motion external store subscription.
5. Split stable cart actions from state consumers while preserving a migration-compatible `useCart` API.
6. Add deterministic animation, navigation, workflow, and render-identity tests.

## Scope and Dependencies

Implementation scope is limited to `App.tsx`, `src/types.ts`, `src/components/StickyHeader.tsx` after its unrelated edits are reconciled, `src/screens/HomeScreen.tsx`, `src/screens/ProductsScreen.tsx`, `src/context/CartContext.tsx`, `src/hooks/useAddToCart.ts`, `src/hooks/useCartActions.ts`, `src/hooks/useProducts.ts`, `src/hooks/reducedMotionStore.ts`, `src/hooks/usePrefersReducedMotion.ts`, `tests/navigation-state.test.tsx`, `tests/HomeScreen.scroll.test.tsx`, `tests/ProductsScreen.test.tsx`, `tests/cart-context-identity.test.tsx`, `tests/reduced-motion-store.test.ts`, `tests/workflows.test.tsx`, `tests/setup/animated.ts`, `jest.config.js`, and `docs/ui-overhaul-v2-changes.md`. It does not change checkout security behavior or web performance assets. The commerce change should land first when both touch cart consumers; the performance change should baseline after this change. `add-storybook-web` must be completed/reconciled independently before implementation commits.

## Success Criteria

Every header section request either scrolls once and acknowledges its nonce or is explicitly cancelled. Products has one vertical `FlatList` scroll owner. Static products render on first commit. Duplicate scroll states cause no parent update. All hook consumers share one platform listener. Action-only cart consumers retain stable identities across state changes. Jest, TypeScript, Storybook build, and web build pass.
