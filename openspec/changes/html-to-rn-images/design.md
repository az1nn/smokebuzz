# Design: HTML to React Native Images & Product Data

## Extracted Images (in `assets/`)

| File | Dimensions | Size | Usage |
|------|------------|------|-------|
| `logo_smokebuzz.png` | 617x638 | 516 KB | App logo / splash / favicon |
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
- **image**: `require('../assets/seda_zomo_branca.png')`
- **category**: "Sedas"

### 2. Seda Zomo Marrom Natural
- **id**: "2"
- **name**: "Seda Zomo Marrom Natural"
- **description**: "Seda natural marrom, sem cloro"
- **price**: 3.50
- **image**: `require('../assets/seda_zomo_marrom_natural.png')`
- **category**: "Sedas"

### 3. Piteira Longa Girls in Green
- **id**: "3"
- **name**: "Piteira Longa Girls in Green"
- **description**: "Piteira de vidro longa, design exclusivo"
- **price**: 10.00
- **image**: `require('../assets/piteira_longa_girls_in_green.png')`
- **category**: "Piteiras"

### 4. Piteira Tradicional Papelito
- **id**: "4"
- **name**: "Piteira Tradicional Papelito"
- **description**: "Piteira de papel tradicional, caixa c/ 50"
- **price**: 6.00
- **image**: `require('../assets/piteira_tradicional_papelito.png')`
- **category**: "Piteiras"

## Type Changes
- `Product.image` changes from `string` (emoji) to `ImageSourcePropType` (from react-native)
- Use `require()` for local assets in product data

## Custom Hooks Architecture

### New Hooks Directory: `src/hooks/`

| Hook | Location | Responsibility |
|------|----------|----------------|
| `useProducts` | `src/hooks/useProducts.ts` | Fetch/load product data, loading state, error handling |
| `useAddToCart` | `src/hooks/useAddToCart.ts` | Add product to cart with quantity, haptic feedback |
| `useCartActions` | `src/hooks/useCartActions.ts` | Update quantity, remove item, navigate to checkout |
| `useCheckoutForm` | `src/hooks/useCheckoutForm.ts` | Form state, validation, submit handling |
| `usePayment` | `src/hooks/usePayment.ts` | Process mock payment, loading/success states |
| `useNavigation` | `src/hooks/useNavigation.ts` | Centralized navigation actions (tab switch, screen push) |

### Hook Patterns
- Each hook encapsulates a single concern
- Return tuple: `[state, actions]` or `{ state, actions }`
- Use `useCallback` for stable function references
- Handle side effects (navigation, haptics, async) inside hooks
- Components only call hooks, no inline handlers

## Component Updates

### ProductsScreen.tsx
- Replace `<Text className="text-4xl text-center mb-2">{item.image}</Text>` with:
```tsx
<Image 
  source={item.image} 
  className="w-32 h-32 object-contain mb-2" 
  resizeMode="contain"
/>
```
- Add `Image` import from `react-native`
- Use `useProducts()` for product data
- Use `useAddToCart()` for "Add to Cart" button

### CartScreen.tsx
- Use `useCartActions()` for quantity controls, remove, checkout navigation

### CheckoutScreen.tsx
- Use `useCheckoutForm()` for form state/validation
- Use `usePayment()` for payment processing

### Types
- Update `Product.image` type from `string` to `ImageSourcePropType` (from react-native)

## Logo Usage
- `logo_smokebuzz.png` can be used for:
  - Splash screen
  - App header/branding
  - Tab bar icon
  - Replace emoji in ProductsScreen header