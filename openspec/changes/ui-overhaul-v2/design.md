# Design: SmokeBuzz Tabacaria UI Overhaul

## Color System

The HTML uses CSS custom properties. These map to Tailwind theme extensions:

| CSS Variable | Value | Tailwind Key | Usage |
|---|---|---|---|
| `--noir` | `#0c0a08` | `noir` | Primary background |
| `--espresso` | `#1e150e` | `espresso` | Section backgrounds |
| `--espresso-2` | `#2b1d12` | `espresso-2` | Card gradients |
| `--cream` | `#f2ead6` | `cream` | Primary text |
| `--cream-dim` | `#cfc3a4` | `cream-dim` | Secondary text, muted |
| `--brass` | `#c9a24b` | `brass` | Borders, accent |
| `--brass-light` | `#e6c878` | `brass-light` | Titles, hover states |
| `--ember` | `#d9622b` | `ember` | Tertiary accent, numbers |
| `--line` | `rgba(201,162,75,0.28)` | `line` | Borders, dividers |

### Background mapping
- `bg-noir` → `#0c0a08` (main app bg)
- `bg-espresso` → `#1e150e` (section bg, tab bar)
- `bg-espresso-2` → `#2b1d12` (card gradients)
- `bg-white` → for product photo areas

### Text mapping
- `text-cream` → `#f2ead6` (headings, body text)
- `text-cream-dim` → `#cfc3a4` (descriptions, secondary)
- `text-brass-light` → `#e6c878` (titles, active tab)
- `text-brass` → `#c9a24b` (prices, accents)
- `text-ember` → `#d9622b` (special numbers)

### Border mapping
- `border-line` → `rgba(201,162,75,0.28)`

## Typography

| Font | Tailwind Family | Usage |
|---|---|---|
| Rye (serif) | `['Rye', 'serif']` | All h1/h2/h3, prices (.prod-price) |
| Jost (sans) | `['Jost', 'sans-serif']` | Body, nav, buttons, eyebrow |
| Cormorant Garamond (italic) | `['Cormorant_Garamond', 'serif']` | Quotes, lede paragraphs, accents |

### Font sizes (from HTML)
- `h1`: `clamp(2.6rem, 6vw, 4.6rem)` in RN: `text-3xl` to `text-5xl`
- `h2` (section): `clamp(1.9rem, 3.4vw, 2.8rem)` → `text-2xl` to `text-4xl`
- `h3` (card titles): `1.05rem` → `text-base`
- `.eyebrow`: `0.78rem` uppercase `tracking-[3px]`
- `.lede` (hero paragraph): `1.35rem` → `text-lg`
- Nav/buttons: `0.85rem-0.92rem` → `text-sm`
- `.prod-price`: `1.15rem` Rye → `text-lg` + font-rye

## Key Component Specs

### RopeDivider
```
<View className="h-[10px]" style={{
  backgroundImage: 'repeating-linear-gradient(115deg, #c9a24b 0px 6px, #2b1d12 6px 12px)',
  opacity: 0.55
}} />
```
Thin variant: `h-[4px]`

### TabBar (replaces existing)
- Background: `bg-espresso border-t border-line`
- Active tab: `border-t-2 border-brass-light text-brass-light`
- Inactive tab: `text-cream-dim`
- Cart badge: `bg-ember text-white`

### ProductCard
```tsx
<View className="bg-noir border border-line rounded-lg overflow-hidden">
  <View className="bg-white aspect-square p-4 items-center justify-center">
    <Image source={item.image} className="w-full h-full object-contain" />
  </View>
  <View className="p-5 pb-6">
    <Text className="text-brass-light font-rye text-base leading-tight mb-2">
      {item.name}
    </Text>
    <Text className="text-cream font-rye text-lg">R$ {item.price.toFixed(2)}</Text>
  </View>
</View>
```
- Grid: 2 columns (mobile), `gap-6` (RN `gap: 24` from HTML)
- Hover not applicable in RN; skip.
- Photo bg: white, aspect-ratio 1/1

### Button variants
```tsx
// Solid brass button
<Pressable className="bg-brass px-5 py-2.5 rounded items-center">
  <Text className="text-noir uppercase text-xs tracking-[0.8px] font-semibold">{label}</Text>
</Pressable>

// Ghost button
<Pressable className="border border-brass px-5 py-2.5 rounded items-center">
  <Text className="text-cream uppercase text-xs tracking-[0.8px]">{label}</Text>
</Pressable>
```

### Section container
- `.wrap` → `max-w-[1180px] mx-auto px-7` (RN: `px-7` on parent, center with `mx-auto`)

### Section heading
```tsx
<View className="mb-10">
  <Text className="text-cream-dim uppercase text-xs tracking-[3px] mb-2">{eyebrow}</Text>
  <Text className="text-brass-light font-rye text-3xl">{title}</Text>
  <Text className="text-cream-dim mt-4">{description}</Text>
</View>
```

## Screen Layouts

### HomeScreen (new) — scrollable landing page
Sections in order, all inside a `ScrollView`:
1. **Hero** — `min-h-[92vh]` with radial gradients, flex-center
   - Eyebrow text
   - h1 "SmokeBuzz Tabacaria" or similar
   - Lede paragraph (Cormorant Garamond italic)
   - Two CTA buttons (solid brass + ghost)
   - Logo image (`logo_smokebuzz.png`) in badge-wrap with animation
2. **RopeDivider**
3. **Sobre (About)** — Two-column grid (single column on mobile)
   - Logo image, story text, stat row (6+ Categorias, 100% Atendimento)
4. **RopeDivider thin**
5. **Diferenciais** — Three items (curadoria, atendimento, ambiente)
6. **Localização** — Two-column grid: info + map placeholder
7. **RopeDivider**
8. **Contato** — Centered, two CTA buttons
9. **Footer** — Brand logo + name, foot-links, age-note

### ProductsScreen — Destaques grid
- Section heading: "Direto do estoque" eyebrow, "Destaques da semana" title
- 2-column FlatList of ProductCards
- Each card: white photo bg → brass-light name → Rye price → "Add to Cart" brass button

### CartScreen
- Header: "Carrinho" in Rye brass-light
- Cart items: row with image, name (Rye), price (brass), quantity controls
- Remove button: ember colored "✕"
- Total section: Rye brass total, Pay button (ember/bold)

### CheckoutScreen
- Title in Rye brass-light
- Form inputs: `bg-espresso border-line text-cream` styled
- Validation errors in ember
- Order summary with item images
- Pay button: solid brass on white

## App.tsx Navigation
- **Screen type** extends to include "home"
- Default screen: "home" (shows HomeScreen)
- Tab bar: Home | Products | Cart
- Checkout is modal-like (no tab bar, like current)

## Existing files to modify

| File | Change |
|------|--------|
| `tailwind.config.js` | Add custom colors (noir, espresso, cream, brass, ember, line) and font families (rye, jost, cormorant) |
| `global.css` | No change — Tailwind directives already present |
| `App.tsx` | Add HomeScreen, extend Screen type, update TabBar styling, reorder screens |
| `src/types.ts` | Add "home" to Screen union type |
| `src/screens/ProductsScreen.tsx` | Full redesign to match HTML product grid |
| `src/screens/CartScreen.tsx` | Full redesign with brass/cream/ember theme |
| `src/screens/CheckoutScreen.tsx` | Full redesign with brass/cream/ember theme |
| `src/data/products.ts` | Add more products (expand to 8-12 items matching HTML categories) |

## New files to create

| File | Purpose |
|------|---------|
| `src/screens/HomeScreen.tsx` | Scrollable landing page (Hero, Sobre, Diferenciais, Localização, Contato, Footer) |
| `src/components/RopeDivider.tsx` | Repeating diagonal line divider |
| `src/components/SectionHeading.tsx` | Eyebrow + title + description |
| `src/components/BrassButton.tsx` | Reusable button components (solid, ghost) |

## Animation (minimal, using Animated API)
- Hero badge: subtle `translateY` float animation (6s loop)
- Fade-in on section mount (optional, non-blocking)

## Data Expansion
Increase products from 4 to 8-12 across categories:
- Sedas (2-3): Zomo Branca, Zomo Marrom Natural, +1 more
- Piteiras (2): Girls in Green, Papelito
- Isqueiros (2): Bic, Zippo (emoji fallback or new images)
- Charutos (2): National, Imported (emoji fallback)
- Acessórios (2): Papers, Filters (emoji fallback)

Existing product images (4) are retained; new items use emoji fallback until real images exist.