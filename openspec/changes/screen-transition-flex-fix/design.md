# Design: ScreenTransition flex fix

## 1. Layout model to restore (pre-`ui-polish-v1` behavior)

```
SafeAreaProvider
└─ CartProvider
   └─ View (flex-1 bg-noir)                     // column flex, fills viewport
      ├─ StickyHeader                           // normal flow (sticky on web)
      ├─ ScreenTransition key={screen}          // NEW: must be flex:1 (fills remaining space)
      │   └─ Animated.View (flex: 1)            // bounded height restored
      │       └─ <Screen|Home|Products|Cart|Checkout>   // root flex-1 ScrollView/FlatList
      ├─ TabBar                                 // normal flow, sits at viewport bottom
      └─ StatusBar
```

Key invariant: the `Animated.View` returned by `ScreenTransition` must contribute `flex: 1` so its child (each screen's `flex:1` scroll container) receives a definite height and becomes the internal scroller. The TabBar, rendered after it in the column, returns to the viewport bottom.

## 2. Change

**File:** `src/components/ScreenTransition.tsx`

- Normal (animated) path — add `flex: 1` to the root `Animated.View` style, alongside the existing `opacity` and `transform`:

  ```tsx
  <Animated.View
    style={{ flex: 1, opacity, transform: [{ translateY }] }}
  >
  ```

- Reduced-motion path — add the same `flex: 1` to the plain `<Animated.View>` (currently style-less):

  ```tsx
  if (reduced) return <Animated.View style={{ flex: 1 }}>{children}</Animated.View>;
  ```

No other changes. On react-native-web `flex: 1` yields `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`, which gives the wrapper a bounded height inside the column; on native it is standard Yoga flex behavior. The wrapper never needed a fixed `height`.

## 3. Verification checklist (must all pass)

1. `npx tsc --noEmit` — zero errors.
2. `npm test` — 13/13 pass (existing node:test suites).
3. `npm run build:web` — export + postbuild OK.
4. Headless Edge probe against `dist/` (static server) at 1280×900 AND 390×844:
   - Tab bar ("Carrinho") `getBoundingClientRect().top` is within the viewport height (pinned at bottom), not ~5300/7700.
   - Exactly one scrollable element exists (the screen ScrollView, `overflow-y: auto` with `scrollHeight > clientHeight`).
   - `page.mouse.wheel({ deltaY })` moves that element's `scrollTop` (internal scroll works).
   - Real mouse click on tab-bar "Carrinho" lands on the element (rect within viewport) and navigates to the cart empty state ("Seu carrinho está vazio").
   - Desktop header nav click and mobile hamburger still work.
   - No `pageerror` / `console.error`.

## 4. Docs

Update `docs/ui-overhaul-v2-changes.md` with the ScreenTransition `flex:1` behavior if that doc describes ScreenTransition layout; otherwise leave untouched.
