# Design: HTML to React Native Images & Product Data

## Extracted Images (in `assets/`)

| File | Dimensions | Size | Usage |
|------|------------|------|-------|
| `logo_smokebuzz.png` | 617x638 | 516 KB | App logo / splash / favicon (NOT YET WIRED) |
| `seda_zomo_branca.png` | 500x295 | 158 KB | Product: Seda Zomo Branca |
| `seda_zomo_marrom_natural.png` | 1000x1000 | 288 KB | Product: Seda Zomo Marrom Natural |
| `piteira_longa_girls_in_green.png` | 447x447 | 198 KB | Product: Piteira Longa Girls in Green |
| `piteira_tradicional_papelito.png` | 447x447 | 198 KB | Product: Piteira Tradicional Papelito |

## Product Data Mapping (from HTML)

### 1. Seda Zomo Branca
- **id**: "1"
- **name**: "Seda Zomo Branca"
- **description**: "Seda de arroz branca, combustão lenta"
- **price**: 3.00
- **image**: `require("../../assets/seda_zomo_branca.png")`
- **category**: "Sedas"

### 2. Seda Zomo Marrom Natural
- **id**: "2"
- **name**: "Seda Zomo Marrom Natural"
- **description**: "Seda natural marrom, sem cloro"
- **price**: 3.50
- **image**: `require("../../assets/seda_zomo_marrom_natural.png")`
- **category**: "Sedas"

### 3. Piteira Longa Girls in Green
- **id**: "3"
- **name**: "Piteira Longa Girls in Green"
- **description**: "Piteira de vidro longa, design exclusivo"
- **price**: 10.00
- **image**: `require("../../assets/piteira_longa_girls_in_green.png")`
- **category**: "Piteiras"

### 4. Piteira Tradicional Papelito
- **id**: "4"
- **name**: "Piteira Tradicional Papelito"
- **description**: "Piteira de papel tradicional, caixa c/ 50"
- **price**: 6.00
- **image**: `require("../../assets/piteira_tradicional_papelito.png")`
- **category**: "Piteiras"

## Type Changes
- `Product.image` changed from `string` (emoji) to `ImageSourcePropType` (from react-native)
- Use `require()` for local assets in product data

## Custom Hooks Architecture

### Hooks Directory: `src/hooks/`

| Hook | File | Export | Description |
|------|------|--------|-------------|
| `useProducts` | `useProducts.ts` | `{ products, loading, error, refetch }` | Async load products with 100ms simulated delay |
| `useAddToCart` | `useAddToCart.ts` | `{ addToCart }` | Wraps `useCart().addItem` with `useCallback` |
| `useCartActions` | `useCartActions.ts` | `{ updateQuantity, removeItem, clearCart, navigateToCheckout }` | Cart operations with quantity guard |
| `useCheckoutForm` | `useCheckoutForm.ts` | `{ formData, errors, isValid, handleChange, handleBlur, submit, reset }` | Form state, validation, `submit()` returns `boolean` |
| `usePayment` | `usePayment.ts` | `{ processPayment, loading, error }` | Mock 2s payment with 10% failure rate |
| `useNavigation` | `useNavigation.ts` | `{ goToCart, goToCheckout, goToProducts, goBack }` | Stub callbacks — not wired to App.tsx |

### Hook Patterns
- Each hook encapsulates a single concern
- Uses `useCallback` for stable function references
- Handles loading/error states where applicable
- Components call hooks, no inline handler logic

## Component Updates

### ProductsScreen.tsx
- Uses `useProducts()` for async product loading with loading/error states
- Uses `useAddToCart()` for "Add to Cart" button
- Renders `<Image source={item.image} className="w-32 h-32 object-contain mb-2 mx-auto" />`
- Image, Text, and button are center-aligned

### CartScreen.tsx
- Uses `useCartActions()` for quantity controls, remove, checkout navigation
- Renders `<Image source={item.product.image} className="w-16 h-16 object-cover rounded-lg mr-3" />`

### CheckoutScreen.tsx
- Uses `useCheckoutForm()` with `submit()` returning boolean for validation on submit
- Uses `usePayment()` for mock payment processing
- Uses `useNavigation()` stubs (goToProducts not actively used)
- Renders item images in order summary row

### Types
- `Product.image` type: `ImageSourcePropType` (imported from react-native)

## Known Gaps
- `logo_smokebuzz.png` is extracted but not used anywhere
- `useNavigation` stubs are not connected to App.tsx navigation callbacks
- `useProducts` adds artificial 100ms async delay for mock data — unnecessary for real sync data