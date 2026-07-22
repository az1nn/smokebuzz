# Tasks: UI Overhaul v2 — HTML Design to React Native

## Phase 1: Design System Foundation (COMPLETED)
- [x] `tailwind.config.js` — Add custom colors (noir, espresso, espresso-2, cream, cream-dim, brass, brass-light, ember, line)
- [x] `tailwind.config.js` — Add font families (Rye, Jost, Cormorant Garamond)
- [x] Fonts are loaded via Expo (web-native, no custom font loading needed)

## Phase 2: Reusable Components (COMPLETED)
- [x] `src/components/RopeDivider.tsx` — Diagonal line divider (normal + thin variants)
- [x] `src/components/SectionHeading.tsx` — Eyebrow text + h2 title + optional description
- [x] `src/components/BrassButton.tsx` — Two variants: `solid` (brass fill) and `ghost` (brass border)

## Phase 3: Home Screen (COMPLETED)
- [x] `src/screens/HomeScreen.tsx` — Scrollable landing page with sections:
  - [x] **Hero**: Badge logo animation (Animated translateY float), headline, lede text, two CTA buttons
  - [x] **RopeDivider**
  - [x] **Sobre (About)**: Logo image, story text, stat row (6+ Categorias, 100% Atendimento)
  - [x] **RopeDivider** (thin)
  - [x] **Diferenciais**: Three items (curadoria, atendimento, ambiente) with ember numbers
  - [x] **Localização**: Info blocks + map placeholder
  - [x] **RopeDivider**
  - [x] **Contato**: Centered CTA buttons
  - [x] **Footer**: Brand logo, foot links, age note

## Phase 4: Screen Redesigns (COMPLETED)
- [x] `src/screens/ProductsScreen.tsx` — Full redesign:
  - Section heading "Direto do estoque" / "Destaques da semana"
  - 2-column FlatList with redesigned ProductCard
  - White photo bg, brass-light Rye title, Rye price
  - Brass "Adicionar" button (BrassButton solid)
  - Emoji items render as Text, image items as Image
- [x] `src/screens/CartScreen.tsx` — Full redesign:
  - Rye brass-light "Carrinho" header
  - Item rows with image, Rye name, brass price
  - Quantity controls, ember remove button
  - Total in Rye brass, "Finalizar Pedido" BrassButton
- [x] `src/screens/CheckoutScreen.tsx` — Full redesign:
  - Rye brass-light "Checkout" header
  - Form inputs: bg-espresso border border-line text-cream
  - Ember validation errors
  - Order summary with item images
  - "Pagar" BrassButton

## Phase 5: Data & Types (COMPLETED)
- [x] `src/types.ts` — Add "home" to Screen union type; `Product.image` accepts `ImageSourcePropType | string`
- [x] `src/data/products.ts` — Expanded from 4→10 products:
  - 4 real image products (Seda Zomo Branca, Seda Zomo Marrom Natural, Piteira Longa Girls in Green, Piteira Tradicional Papelito)
  - 6 emoji fallback products (Bic Lighter, Zippo Classic, Glass Ashtray, Rolling Papers, Filter Tips, Tobacco Pouch)
  - Categories: Sedas, Piteiras, Isqueiros, Acessórios

## Phase 6: App.tsx Updates (COMPLETED)
- [x] HomeScreen import and "home" route
- [x] TabBar: bg-espresso border-line, text-brass-light (active) / text-cream-dim (inactive)
- [x] Default screen: "home"
- [x] Tab items: Home | Produtos | Carrinho
- [x] Cart badge: bg-ember text-white
- [x] StatusBar: style="light"

## Phase 7: Verify (COMPLETED)
- [x] `npx tsc --noEmit` — zero type errors
- [x] `npx jest` — 10/10 tests pass
- [x] `npx expo export -p web` — build succeeds, app exported to dist/

## Commit History
1. [x] Commit spec files (676ab2d)
2. [x] Commit full implementation (affec38): tailwind config, components, HomeScreen, screen redesigns, App.tsx, tests