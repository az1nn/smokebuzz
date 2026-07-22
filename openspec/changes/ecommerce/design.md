# Design

## Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| ProductsScreen | "products" | Grid of product cards with "Add to Cart" |
| CartScreen | "cart" | List of cart items, quantities, total, "Checkout" button |
| CheckoutScreen | "checkout" | Card form + mock processing + success |

## Navigation (State-based, no react-navigation)
- `App.tsx` holds `currentScreen` state
- Bottom tab bar: Products | Cart (with badge count)
- Tab bar navigates by setting state

## State

### CartContext
| Field | Type | Description |
|-------|------|-------------|
| items | CartItem[] | Products in cart with quantities |
| addItem | (product, qty) => void | Add or increment |
| removeItem | (productId) => void | Remove entirely |
| updateQuantity | (productId, qty) => void | Set specific quantity |
| total | number | Computed sum |
| clearCart | () => void | Reset after checkout |

### Data Model
```typescript
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};
```

## Mock Products (12 items)
Categories: Cigarettes, Lighters, Ashtrays, Accessories
Prices in R$ (BRL)

## Mock Payment
- Card form (number, expiry, CVV, name) - no validation
- "Process Payment" button → 2s simulated delay → success screen
- Success shows order summary + "Continue Shopping" button
