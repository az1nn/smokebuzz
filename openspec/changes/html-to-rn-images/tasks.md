# Tasks: HTML to React Native Images & Product Data

## Phase 1: Extract Images (COMPLETED)
- [x] Extract 5 unique PNG images from HTML base64
- [x] Save to `assets/` with descriptive names
- [x] Verify dimensions and file sizes

## Phase 2: Create Custom Hooks
- [ ] `src/hooks/useProducts.ts` — Load product data from `src/data/products.ts`, return `{ products, loading, error }`
- [ ] `src/hooks/useAddToCart.ts` — Encapsulate `useCart().addItem` with haptic feedback, return `addToCart(product, qty?)`
- [ ] `src/hooks/useCartActions.ts` — Encapsulate cart operations: `updateQuantity`, `removeItem`, `navigateToCheckout`
- [ ] `src/hooks/useCheckoutForm.ts` — Form state for card fields, validation, return `{ values, errors, handleChange, handleSubmit }`
- [ ] `src/hooks/usePayment.ts` — Process payment: `processPayment(amount) => Promise<{ success: boolean }>`, loading state
- [ ] `src/hooks/useNavigation.ts` — Centralized navigation: `goToCart()`, `goToCheckout()`, `goToProducts()`, `goBack()`

## Phase 3: Update Data Layer
- [ ] `src/data/products.ts` — Replace 12 emoji products with 4 real products from HTML (with `require()` image paths)
- [ ] `src/types.ts` — Update `Product.image` type to `ImageSourcePropType` from `react-native`

## Phase 4: Update Screens with Hooks
- [ ] `src/screens/ProductsScreen.tsx`:
  - Import `Image` from `react-native`
  - Use `useProducts()` for product data
  - Use `useAddToCart()` for add button
  - Render product images with `<Image source={item.image} className="w-32 h-32 object-contain mb-2" />`
- [ ] `src/screens/CartScreen.tsx`:
  - Use `useCartActions()` for quantity buttons, remove, checkout
- [ ] `src/screens/CheckoutScreen.tsx`:
  - Use `useCheckoutForm()` for form handling
  - Use `usePayment()` for payment processing
  - Use `useNavigation()` for "Continue Shopping" button

## Phase 5: Update App.tsx
- [ ] Import and use `useNavigation()` for tab bar navigation
- [ ] Optionally use logo image in header/tab bar

## Phase 6: Verify
- [ ] Run `npx jest` — all tests pass
- [ ] Run `npx tsc --noEmit` — no type errors
- [ ] Run `npm run build:web` — build succeeds