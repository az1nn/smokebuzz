# Tasks: UI Overhaul v2 — HTML Design to React Native

## Phase 1: Design System Foundation
- [ ] `tailwind.config.js` — Add custom colors (noir, espresso, espresso-2, cream, cream-dim, brass, brass-light, ember, line)
- [ ] `tailwind.config.js` — Add font families (Rye, Jost, Cormorant Garamond)
- [ ] Verify fonts are loadable in Expo (check app.json or babel config for font loading)

## Phase 2: Reusable Components
- [ ] `src/components/RopeDivider.tsx` — Diagonal line divider (normal + thin variants)
- [ ] `src/components/SectionHeading.tsx` — Eyebrow text + h2 title + optional description
- [ ] `src/components/BrassButton.tsx` — Two variants: `solid` (brass fill) and `ghost` (brass border)

## Phase 3: Home Screen (New)
- [ ] `src/screens/HomeScreen.tsx` — Scrollable landing page with sections:
  - [ ] **Hero**: Badge logo animation, headline, lede text, two CTA buttons
  - [ ] **RopeDivider**
  - [ ] **Sobre (About)**: Two-column grid with logo image, story text, stat row
  - [ ] **RopeDivider** (thin)
  - [ ] **Diferenciais**: Three items (curadoria, atendimento, ambiente)
  - [ ] **Localização**: Info + map placeholder
  - [ ] **RopeDivider**
  - [ ] **Contato**: Centered CTA buttons
  - [ ] **Footer**: Brand, links, age note

## Phase 4: Screen Redesigns
- [ ] `src/screens/ProductsScreen.tsx` — Full redesign:
  - Section heading "Direto do estoque" / "Destaques da semana"
  - 2-column FlatList with redesigned ProductCard
  - White photo bg, brass-light Rye title, Rye price
  - Brass "Add to Cart" button
- [ ] `src/screens/CartScreen.tsx` — Full redesign:
  - Rye brass-light "Carrinho" header
  - Item rows with image, Rye name, brass price
  - Quantity controls, ember remove button
  - Total in Rye brass, Pay button (solid brass)
- [ ] `src/screens/CheckoutScreen.tsx` — Full redesign:
  - Rye brass-light title
  - Form inputs styled with espresso/border-line/cream
  - Ember validation errors
  - Order summary with item images
  - Brass Pay button

## Phase 5: Data & Types
- [ ] `src/types.ts` — Add "home" to Screen union type
- [ ] `src/data/products.ts` — Expand to 8-12 products across categories (Sedas, Piteiras, Isqueiros, Charutos, Acessórios)
  - Keep existing 4 products with real images
  - Add new products with emoji fallback images
  - Use real categories from HTML (Charutos, Cigarros, Sedas & Piteiras, Tabacos, Acessórios, Isqueiros)

## Phase 6: App.tsx Updates
- [ ] `App.tsx` — Add HomeScreen import, add "home" route
- [ ] `App.tsx` — Update TabBar with brass/cream/ember styling
- [ ] `App.tsx` — Default screen is "home" (not "products")
- [ ] `App.tsx` — TabBar items: Home | Products | Cart
- [ ] `App.tsx` — StatusBar style stays "light"

## Phase 7: Verify
- [ ] `npx tsc --noEmit` — zero type errors
- [ ] `npx jest` — all tests pass (update test expectations for new design)
- [ ] `npx expo export -p web` — build succeeds

## Commit Order
1. [ ] Commit spec files (proposal.md, design.md, tasks.md)
2. [ ] Commit tailwind.config.js + types + data expansion
3. [ ] Commit components (RopeDivider, SectionHeading, BrassButton)
4. [ ] Commit HomeScreen
5. [ ] Commit redesigned screens (ProductsScreen, CartScreen, CheckoutScreen)
6. [ ] Commit App.tsx navigation + TabBar update
7. [ ] Commit test fixes + verification