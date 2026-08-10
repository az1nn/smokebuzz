# Design: Navigation and render-state stabilization

## 1. Typed Section Requests

Define shared contracts in `src/types.ts`:

```ts
export type HomeSection = "destaques" | "categorias" | "sobre" | "localizacao" | "contato";
export type HomeSectionRequest = { section: HomeSection; nonce: number };
```

`StickyHeader.onNavPress`, `AppInner`, and `HomeScreen` use `HomeSection`, not arbitrary strings. `AppInner` owns `pendingSectionRequest: HomeSectionRequest | null` and a monotonic nonce ref. A header press switches to home and replaces pending intent with the latest request. `HomeScreen` stores section offsets; on request or layout, it attempts the scroll. Only after an offset exists and `scrollTo` is invoked does it call `onSectionRequestHandled(nonce)`. App clears only a matching nonce.

Cancellation is explicit: selecting a non-home tab after a pending request was created cancels it; a newer header request supersedes the prior nonce; unmount alone does not acknowledge. Selecting Home directly keeps a pending request. Unknown sections are impossible at the typed boundary. Tests cover request-before-mount, request-before-layout, supersession, matching/stale acknowledgement, cancellation, and repeated selection.

## 2. Scroll State

Export `HomeScrollState = { scrolled: boolean; activeSection: HomeSection | null }`. Home uses one `useCallback` scroll listener and a ref containing the last emitted semantic state. It computes section order from measured offsets, then calls `onScrollState` only when either field changes. `Animated.event` is memoized when its dependencies are stable, preventing handler replacement on render. Time throttling may limit computation but cannot be the correctness mechanism.

## 3. Products and Static Data

`useProducts` returns a module-stable catalog immediately:

```ts
type ProductsResult = {
  products: readonly Product[];
  loading: false;
  error: null;
  refetch: () => Promise<void>;
};
```

`refetch` is one stable resolved no-op retained for source compatibility. No timer, effect, or mount state is used.

`ProductsScreen` renders one vertical `FlatList<Product>` with its title in `ListHeaderComponent`, categories/dividers in `ListFooterComponent`, and no wrapping `ScrollView` or disabled nested list. `renderItem`, header/footer, keys, and add handlers are stable or memoized. Responsive column changes may remount via `key={numColumns}`; scroll reset on breakpoint change is accepted and tested. The obsolete skeleton path is removed from this screen, while the reusable skeleton component remains.

## 4. Cart Context Split

Provide exact contexts:

```ts
export type CartStateValue = {
  items: readonly CartItem[];
  total: number;
  itemCount: number;
};
export type CartActionsValue = {
  addItem(product: Product, quantity?: number): void;
  removeItem(productId: string): void;
  updateQuantity(productId: string, quantity: number): void;
  clearCart(): void;
};
export function useCartState(): CartStateValue;
export function useCartActionsContext(): CartActionsValue;
export function useCart(): CartStateValue & CartActionsValue;
```

The provider memoizes dispatch callbacks once, actions independently, and derived state from items. `useCart` combines both for compatibility and therefore may rerender on state changes; new and migrated action-only hooks use `useCartActionsContext`, while badges/summaries use `useCartState`. Existing `useCartActions` remains the workflow wrapper and is renamed only in a later breaking change. Tests assert stable action references and no action-only probe rerender after cart mutations.

## 5. Reduced-Motion Store

Implement a module-level store used through `useSyncExternalStore`:

```ts
type ReducedMotionStore = {
  getSnapshot(): boolean;
  getServerSnapshot(): false;
  subscribe(listener: () => void): () => void;
};
```

The first subscriber creates exactly one web `matchMedia` change listener or one native `AccessibilityInfo` listener; the last unsubscribe removes it. Native initial preference is resolved once per active subscription generation and ignored after teardown. All listeners receive changes from the cached snapshot. `tests/reduced-motion-store.test.ts` resets the singleton with `jest.resetModules()`; no reset export is added to the public app API.

## 6. Deterministic Tests

`tests/setup/animated.ts`, loaded through `jest.config.js` `setupFilesAfterEnv`, mocks `Animated.timing`, `spring`, `sequence`, and `loop` so `.start(callback)` completes predictably and `.stop()` is observable. Tests mock the reduced-motion store before rendering animation components and never wait on wall-clock timers. `tests/workflows.test.tsx` covers header-to-section navigation, product-to-cart, quantity/remove, and screen transitions; focused files cover render counts and listener lifecycle.
