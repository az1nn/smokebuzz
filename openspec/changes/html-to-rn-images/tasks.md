# Tasks: HTML to React Native Images & Product Data

## Phase 1: Extract Images (COMPLETED)
- [x] Extract 5 unique PNG images from HTML base64
- [x] Save to `assets/` with descriptive names
- [x] Verify dimensions and file sizes

## Phase 2: Create Custom Hooks (COMPLETED)
- [x] `src/hooks/useProducts.ts` — Load product data with async loading state
- [x] `src/hooks/useAddToCart.ts` — Encapsulate `useCart().addItem`
- [x] `src/hooks/useCartActions.ts` — Encapsulate cart operations (updateQuantity, removeItem, navigateToCheckout)
- [x] `src/hooks/useCheckoutForm.ts` — Form state, validation, `submit()` function
- [x] `src/hooks/usePayment.ts` — Mock payment processing with loading/error state (10% random failure)
- [x] `src/hooks/useNavigation.ts` — Navigation helpers (stubs — actual navigation is via App.tsx callbacks)

## Phase 3: Update Data Layer (COMPLETED)
- [x] `src/data/products.ts` — Replaced 12 emoji products with 4 real products using `require()` image paths
- [x] `src/types.ts` — Updated `Product.image` type to `ImageSourcePropType`
- [x] `src/data/products.ts` — Import path corrected to `../types`

## Phase 4: Update Screens with Hooks (COMPLETED)
- [x] `src/screens/ProductsScreen.tsx`:
  - Uses `useProducts()` for async product loading
  - Uses `useAddToCart()` for add button
  - Renders `<Image>` components instead of emoji text
  - Loading and error states handled
- [x] `src/screens/CartScreen.tsx`:
  - Uses `useCartActions()` for quantity/remove/checkout
  - Renders `<Image>` components
- [x] `src/screens/CheckoutScreen.tsx`:
  - Uses `useCheckoutForm()` with `submit()` for validation
  - Uses `usePayment()` for mock payment
  - Uses `useNavigation()` stubs
  - Renders `<Image>` components in order summary

## Phase 5: Update App.tsx (COMPLETED)
- [x] Uses `useCallback` for tab navigation handlers

## Phase 6: Verify (COMPLETED)
- [x] `npx jest` — 10/10 tests pass
- [x] `npx tsc --noEmit` — zero errors
- [x] `npx expo export -p web` — build succeeds, images exported

## Missing / Follow-up Items
- [ ] `logo_smokebuzz.png` (516KB) is not referenced anywhere — needs to be added to splash screen or header branding
- [ ] `useNavigation()` stubs emit empty callbacks — real navigation (e.g., `useNavigation` from react-navigation) or App.tsx callbacks should be wired through context
- [ ] `useProducts()` simulates 100ms async load — if products are truly synchronous, remove the async overhead
- [ ] Product images are large (PNG up to 516KB) — consider compressing or converting to WebP for mobile performance
- [ ] `assets/extracted/` directory contains duplicates of the same PNGs — should be cleaned up
- [ ] `index.html` (4.8MB) still contains base64 images — could delete the base64 data now that images are extracted