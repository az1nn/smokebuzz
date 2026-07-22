# Tasks

## Step 1: Create data layer
- [ ] `src/data/products.ts` — mock product array
- [ ] `src/types.ts` — shared types (Product, CartItem)

## Step 2: Create CartContext
- [ ] `src/context/CartContext.tsx` — React Context with reducer (add, remove, updateQuantity, clear)
- [ ] Wrap App in CartProvider

## Step 3: Build screens
- [ ] `src/screens/ProductsScreen.tsx` — FlatList of product cards
- [ ] `src/screens/CartScreen.tsx` — FlatList of cart items + total + checkout button
- [ ] `src/screens/CheckoutScreen.tsx` — Card form → loading → success

## Step 4: Update App.tsx
- [ ] State-based navigation (currentScreen)
- [ ] Bottom tab bar with products/cart tabs
- [ ] Cart badge count on tab
- [ ] Wire all screens

## Step 5: Update tests
- [ ] `tests/App.test.tsx` — update expectations for new UI
- [ ] Add `tests/CartContext.test.tsx` — unit test cart operations

## Step 6: Verify
- [ ] Run `npx jest` — all tests pass
- [ ] Run `npx tsc --noEmit` — no type errors
