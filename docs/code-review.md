# Code Review — SmokeBuzz Tabacaria

Review Date: 2026-07-22
Reviewer: Agent
Scope: Full codebase audit

---

## Summary

| Metric | Value |
|--------|-------|
| TypeScript errors (`tsc --noEmit`) | 0 |
| Test suites passing | 2/2 (10/10 tests) |
| Build (`npm run build:web`) | Succeeds |
| Bugs found | 2 |
| Dead code | 2 instances |
| Production concerns | 1 |
| Polish/L10n issues | 1 |

---

## Bugs

### 1. Payment failure never shown to user

**File:** `src/screens/CheckoutScreen.tsx:25-27`

```tsx
const {
  processPayment,
  loading: paymentLoading,
  error: paymentError,   // destructured but never rendered
} = usePayment();
```

`paymentError` is destructured but never displayed in the UI. If `usePayment` hits its 10% random failure or throws, the user sees the spinner stop and nothing else — no error message, no retry option.

**Fix:** Render `paymentError` below the form or as a toast/banner when payment fails.

---

### 2. `RopeDivider` invisible on native RN

**File:** `src/components/RopeDivider.tsx:17-18`

```tsx
style={{
  backgroundImage: "repeating-linear-gradient(115deg, #c9a24b 0px 6px, #2b1d12 6px 12px)",
}}
```

`backgroundImage` in React Native `style` prop is web-only (react-native-web polyfill). On iOS/Android, this prop is ignored — the divider renders as a fully transparent, zero-opacity view. Works on PWA/web but breaks on native.

**Fix:** Use a repeating `View` elements (a row of small colored blocks) or an SVG/art-directed approach.

---

## Dead Code

### 1. `useNavigation.ts` — empty stubs, unused in practice

**File:** `src/hooks/useNavigation.ts`

All four callbacks (`goToCart`, `goToCheckout`, `goToProducts`, `goBack`) are empty functions. Navigation is handled entirely via props (`onNavigateProducts`, `onCheckout`, etc.) passed by `App.tsx`. The hook is imported by `useCartActions.ts` but the only consumer (`handleCheckout`) is never called by any screen.

**Fix:** Remove `useNavigation.ts` and its import from `useCartActions.ts`. If navigation stubs are needed later, re-introduce with a real provider.

### 2. `TabBar` dead `checkout` guard

**File:** `App.tsx:30`

```tsx
{tabs.map(({ key, label }) =>
  key === "checkout" ? null : ( ... )
)}
```

The `tabs` array only contains `home`, `products`, `cart` — `checkout` is never in the iteration, so the ternary branch is unreachable.

**Fix:** Remove the `key === "checkout"` check.

---

## Production Concerns

### 1. Tailwind content scan too narrow

**File:** `tailwind.config.js:3`

```js
content: ["./App.tsx"],
```

Only `App.tsx` is scanned for Tailwind class usage. All classes used in `src/screens/`, `src/components/`, `src/hooks/views` are at risk of being purged in production builds. Currently works because Metro/NativeWind bundling may keep them, but this is fragile.

**Fix:** Expand glob to cover all source files:

```js
content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
```

---

## Polish / Localization

### 1. CheckoutScreen in English, rest in Portuguese

**File:** `src/screens/CheckoutScreen.tsx`

- Labels: "Card Number", "Expiry", "CVV", "Cardholder Name" → should be Portuguese
- Success message: "Payment Successful!" → "Pagamento Confirmado!"
- Button: "Continue Shopping" → "Continuar Comprando"
- Header: "Checkout" → "Finalizar Pedido"

The rest of the app (ProductsScreen, CartScreen, HomeScreen) uses Portuguese consistently. Checkout should match.

---

## Code Quality Observations

### Minor
- `ProductsScreen.renderProduct` defined inline → recreated on every render. Extract to separate component for FlatList optimization.
- `CartContext` reducer has no exhaustive `default` handling → returns state silently on unknown actions.
- `useCheckoutForm.validateAll` exported but never consumed by any screen.
- `tsconfig.json` has `@/*` path alias configured but no imports use it.
- `assets/logo_smokebuzz.png` is 516KB — could be compressed or converted to WebP.
- `assets/extracted/` directory contains original base64 extraction artifacts — could be cleaned up.

### Good
- CartContext useReducer pattern is clean and well-typed.
- Custom hooks are properly memoized with `useCallback`.
- `useCart` guards against missing provider with a clear error.
- Component API (RopeDivider, SectionHeading, BrassButton) is minimal and consistent.
- Form validation is thorough (card number, expiry, CVV, name).
- HomeScreen animation uses `useNativeDriver: true` and cleans up on unmount.
- Empty states handled for both cart and product loading.
- Test coverage of CartContext is comprehensive (8 tests covering add, increment, quantity, remove, update, total, clear).

---

## Architecture Notes

- Navigation is state-driven (`useState<Screen>`) — works for 4 screens but won't scale to nested flows. Consider `react-navigation` if screen count grows.
- `useProducts` wraps synchronous mock data in a 100ms async delay — good for testing loading states but the artificial delay could be removed.
- Emoji fallback for 6/10 product images is pragmatic but `Product.image` as `string | ImageSourcePropType` is a loose type. Consider a discriminated union if more image sources are added.
- `usePayment` has a hardcoded 10% failure rate — intentional for testing. The failure state should be wired to UI (see Bug #1).

---

## Verification Commands

```bash
npm test                     # 10/10 pass
npx tsc --noEmit             # 0 errors
npm run build:web            # builds dist/
```
