# UI Overhaul v2: SmokeBuzz Tabacaria — HTML Design to React Native

## Context
The project has a fully-styled HTML landing page (`index.html`) designed as a premium tabacaria (tobacco shop) with an elaborate dark/warm aesthetic including multiple sections: Hero, About, Featured Products, Categories, Differentiators, Location, Contact, and Footer. The existing React Native app uses a generic slate/sky color scheme that bears no visual resemblance to the HTML design.

## Problem
1. **Visual mismatch** — The RN app uses `bg-slate-900/800`, `text-sky-400`, `bg-sky-500` while the HTML uses `--noir #0c0a08`, `--cream #f2ead6`, `--brass #c9a24b`, `--ember #d9622b`
2. **Typography** — The HTML uses Rye (headings), Jost (body), Cormorant Garamond (accents); the RN app uses system fonts
3. **Missing visual elements** — No rope dividers, SVG category icons, stat rows, hero badge animation, glassmorphism nav
4. **Layout** — The HTML has a full landing page (hero → sobre → destaques → categorias → diferenciais → localização → contato → footer); the RN app only has a basic products/cart/checkout flow
5. **Product cards** — HTML uses white photo background, brass-light titles, Rye prices; RN uses dark cards with sky accents

## Objectives
1. Replicate the HTML design system exactly in the React Native app (colors, typography, spacing)
2. Rebuild every screen to match the corresponding HTML section visually
3. Create a scrollable Home screen that matches the HTML landing page (Hero, Sobre, Diferenciais, Localização, Contato, Footer)
4. Redesign ProductsScreen to match the Destaques product grid
5. Redesign CartScreen with matching brass/cream/ember accents
6. Redesign CheckoutScreen with the tabacaria theme
7. Add rope dividers, SVG category icons, animations where feasible
8. Keep all existing functionality (cart, checkout, hooks) intact