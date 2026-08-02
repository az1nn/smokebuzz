# Design: UI Polish & Responsivity v1

## 0. Architecture overview

The HTML is a **mobile-down / max-width** design with two media-query tiers (`max-width:900px`, `max-width:560px`). The RN app must mirror that via a single source of truth. All four themes below flow through a small set of new shared primitives:

```
useBreakpoints ──► drives all grid/column/order logic (replaces inline ternaries)
Container       ──► width-caps every screen (1180px), incl. Cart/Checkout
SafeAreaProvider──► notch/home-indicator handling (web = no-op insets)
usePrefersReducedMotion ──► gates every new animation, all platforms
AppPressable    ──► press feedback for every Pressable (scale 0.96 + opacity)
Reveal          ──► scroll-triggered section entrances
ProductCard     ──► shared animated card (dedupes Home + Products copies)
ScreenTransition──► per-screen entrance transition (fade + rise)
```

---

## 1. Responsivity

### 1.1 `useBreakpoints` hook — single tier source of truth

Mirrors the HTML media queries (inverted to min-width mobile-first):

| HTML rule | RN breakpoint | `bp` value | `width` range |
|-----------|---------------|------------|----------------|
| (default) | base | `mobile` | `<= 560` |
| `@media(max-width:900px)` and not small | `sm` | `tablet` | `561 – 900` |
| (default, none of the above) | `md` | `desktop` | `> 900` |

```ts
// src/hooks/useBreakpoints.ts
export type Breakpoint = "mobile" | "tablet" | "desktop";
export interface Breakpoints {
  bp: Breakpoint;
  isMobile: boolean;   // width <= 560
  isTablet: boolean;   // width <= 900 (isTablet is true for mobile too — matches max-width queries)
  isDesktop: boolean;  // width > 900
}
export function useBreakpoints(): Breakpoints;
```

- Built on `useWindowDimensions()` (reactive to resize/orientation/responsive scaling).
- Column helpers exported alongside: `prodCols = isDesktop ? 4 : 2` (HTML: 4 → 2 → stays 2), `catCols = isDesktop ? 3 : isTablet ? 2 : 1`, `difCols = isDesktop ? 3 : 1`.

### 1.2 `Container` component — width-capping everywhere

```tsx
// src/components/Container.tsx
type ContainerProps = {
  maxWidth?: number;          // default 1180
  paddingX?: number;          // default 28 (px-7)
  className?: string;         // extra tailwind classes
  children: ReactNode;
};
```

- Renders `<View className={"w-full mx-auto " + className}` style={{ maxWidth, paddingHorizontal }} />`.
- **Replacements** (kill inline `max-w-[1180px] mx-auto px-7` repetition and the missing caps):
  - `HomeScreen` sections that already hardcode the pattern.
  - `ProductsScreen` grid + footer content.
  - `CartScreen` item list, total bar, empty state.
  - `CheckoutScreen` form + order summary.
- `StickyHeader` inner wrap and `Footer` also use it.

### 1.3 SafeArea — real device handling

| File | Change |
|------|--------|
| `App.tsx` | Wrap tree in `<SafeAreaProvider>` (single root). |
| `src/components/StickyHeader.tsx` | `const insets = useSafeAreaInsets();` → header `paddingTop: insets.top` (web returns 0 → visuals unchanged). |
| `App.tsx` TabBar | `paddingBottom: insets.bottom + 10` on the tab bar container. |
| `HomeScreen.tsx:180` | Replace `paddingTop: isMobile ? 20 : 16` with `insets.top + (isMobile ? 8 : 0)`; keep hero `min-h-[92vh]`. |

---

## 2. Motion system (the avant-garde layer)

### 2.1 `usePrefersReducedMotion` — all platforms

```ts
// src/hooks/usePrefersReducedMotion.ts
export function usePrefersReducedMotion(): boolean;
```

- **web:** `window.matchMedia("(prefers-reduced-motion: reduce)")` + change listener (replaces the inline `HomeScreen.tsx:128-135` block).
- **native:** `AccessibilityInfo.isReduceMotionEnabled()` + `addEventListener("reduceMotionChanged", …)`.
- Every animation below reads this; when true → jump to final state (no loops, no transforms).

### 2.2 Shared animated `ProductCard` (dedupe + ease)

Extract to `src/components/ProductCard.tsx`. Props:

```tsx
type ProductCardProps = {
  product: Product;
  altText?: string;            // secondary price line e.g. "Avulsa por R$1,00"
  onAdd: () => void;
};
```

Behavior spec (must match HTML exactly):
- Photo tile: `aspect-square bg-white rounded-lg p-[18px]`, `object-fit: contain`, emoji-or-image fallback.
- **Hover (web + native via Animated):** `translateY` 0 → `-6`, `border-color` `line` → `brass`, eased with `Animated.timing(..., { duration: 250, easing: Easing.bezier(0.22, 1, 0.36, 1), useNativeDriver: Platform.OS !== "web" })`. Reverse on leave.
- **Press:** scale 0.97 (via `AppPressable`); "Adicionar" uses `BrassButton size="sm"`.
- Name `font-rye text-brass-light`, price `font-rye text-cream`, alt price `font-jost text-[12.48px] text-cream-dim`.

Delete both duplicate implementations (`HomeScreen.tsx:502-547`, `ProductsScreen.tsx:72-108`) and the duplicated `altTexts` map (move to `src/data/products.ts` as `productAlt[productId]`).

### 2.3 Shared `CategoryCard` easing

`CategoryCard.tsx:13` currently does an instant `translateY: hovered ? -6 : 0`. Same treatment: `Animated.timing` 250ms bezier on transform + border-color. No API change.

### 2.4 `AppPressable` — press feedback everywhere

```tsx
// src/components/AppPressable.tsx — thin wrapper over Pressable
type Props = PressableProps & { feedback?: "scale" | "dim"; children: ReactNode };
```

- `scale`: spring `1 → 0.96` while pressed, release back (spring `friction: 6`). `dim`: opacity `1 → 0.85`.
- **Adopt across:** tab bar items (`App.tsx`), cart `-`/`+` steppers and ✕ remove (`CartScreen`), category card roots, product "Adicionar", hamburger toggle, desktop nav links.
- Reuses the `Animated.spring` pattern already proven in `BrassButton.tsx:22-35`.

### 2.5 Screen transitions

Wrap each screen render in `src/components/ScreenTransition.tsx`, keyed by `screen` in `App.tsx` so a new screen mounts fresh:

```tsx
type ScreenTransitionProps = { children: ReactNode };
```

- Mount: `opacity 0 → 1` (220ms) + `translateY 10 → 0` (280ms), `Easing.out(Easing.cubic)`.
- Reduced-motion: render children with no animation.
- Scroll position resets naturally (screens unmount on switch — no change needed).

### 2.6 Scroll-triggered section reveals (`Reveal`)

```tsx
// src/components/Reveal.tsx
type RevealProps = { y?: number; delay?: number; once?: boolean; children: ReactNode };
```

- Home sections are wrapped in `<Reveal>` (eyebrow/title content, stat row, dif-item grid cells with stagger `delay = index * 80`).
- **web:** `IntersectionObserver` (`threshold: 0.12`, unobserve after fire). **native:** compares its own `onLayout` y against the screen's `scrollY` Animated.Value (reusing the existing `sectionY` machinery in `HomeScreen.tsx:51-66`) and fires once when `y < scrollY + viewportHeight * 0.9`.
- Animation: `opacity 0 → 1` + `translateY 24 → 0`, 500ms `Easing.out(Easing.cubic)`, optional stagger.
- Non-Home screens: fire on mount (content is short); same `delay` stagger for grids.

### 2.7 Header: scrolled state + active-section highlight

- Lift a `scrolled` boolean up: `HomeScreen` reports `onScrollProgress` (throttled via `scrollEventThrottle:16`) → `App.tsx` state → `StickyHeader` prop.
- StickyHeader scrolled state: `background: rgba(12,10,8,0.98)` (was 0.86), `boxShadow: 0 8px 24px rgba(0,0,0,0.4)`, border stays `line`. Transition 200ms.
- Active section: `App` holds `activeSection`; HomeScreen computes it from the `sectionY` map on scroll. StickyHeader renders the matching desktop nav link with `text-brass-light` + a 1px brass underline. Only meaningful on `home` (header shows plain state on other tabs).

### 2.8 Hero upgrades

| Feature | Current | Target |
|---------|---------|--------|
| Wisp softness | flat solid `<Circle fill="brass/cream/ember">` | **soft radial-gradient wisps** via `react-native-svg` `<RadialGradient>` (color 45% → transparent), ~same geometry; works on web + native |
| Wisp drift | 14s/19s/23s stagger | unchanged timings, now `usePrefersReducedMotion` gated |
| Badge float | 3s translateY loop | unchanged loop, reduced-motion gated |
| Badge scroll parallax | — | on web + native: `scrollY * 0.15` translateY (badge lags the scroll) |
| Wisp mouse parallax | — | **web only:** window `mousemove` → normalized `-1..1` offsets, wisps translate ±10px, rAF-throttled, `pointer-events:none` preserved |
| Badge ring on add | — | see 2.9 |

- Remove web-only `filter`/`drop-shadow` casts only where the SVG radial gradient replaces them (`HomeScreen.tsx:246-254` stays for the badge drop-shadow).

### 2.9 Cart badge spring bump

`App.tsx` TabBar: observe `itemCount`. On increase, drive an `Animated.spring` on the badge `scale 1 → 1.25 → 1` (friction 4). Gives instant purchase feedback when "Adicionar" is tapped.

---

## 3. State & content

### 3.1 Skeleton shimmer loaders

- `src/components/ProductCardSkeleton.tsx` — layout-identical to `ProductCard` (white photo square, two text bars) with a shimmer overlay: an `Animated` translateX loop of a `brass` 8%-opacity bar across the card, 1.2s loop, reduced-motion gated.
- Used by **HomeScreen "Destaques"** and **ProductsScreen** during the (kept) 100ms mock fetch. Shows `prodCols` grid of 4 skeletons.

### 3.2 Products loading / error states (pt-BR + retry)

| State | Before | After |
|-------|--------|-------|
| Loading | `"Loading products..."` | 4× `ProductCardSkeleton` |
| Error | `"Failed to load products"` | Centered panel: ember rope icon, Rye title "Algo deu errado", Cormorant sub "Não foi possível carregar os produtos.", `BrassButton` ghost "Tentar novamente" → `refetch()` |

### 3.3 Cart empty state

Replace bare text (`CartScreen.tsx:17-21`) with a premium panel:
- Ember-toned SVG motif (reuse rope/leaf geometry), Rye heading "Seu carrinho está vazio", Cormorant italic sub "Explore o estoque e escolha seus favoritos.", `BrassButton solid` "Ver produtos" → `onNavigateProducts` (wire the new prop from `App.tsx`).

### 3.4 Checkout "R$ 0,00" bug

`CheckoutScreen.tsx:35` calls `clearCart()` before the success screen reads `total`. Fix: snapshot `orderTotal = total` before payment begins, pass to success UI. Verified by a unit test (see 5.1).

### 3.5 Localization sweep (pt-BR)

| Current | Target |
|---------|--------|
| `"CVV"` label | `"Código de segurança"` |
| `"Expiry must be MM/YY format"` | `"Validade deve estar no formato MM/AA"` |
| `"CVV must be 3 digits"` | `"O código deve ter 3 dígitos"` |
| `"Cardholder name is required"` | `"Informe o nome no cartão"` |
| `"Card number must be 16 digits"` | `"O número deve ter 16 dígitos"` |
| `"Payment declined"` | `"Pagamento recusado. Tente novamente."` |

(Exact strings re-checked against `useCheckoutForm.ts:26-35` / `usePayment.ts:16` at implementation; all values kept in a single `src/strings.ts` module.)

### 3.6 PWA theming

| File | Field | Before | After |
|------|-------|--------|-------|
| `public/manifest.json` | `theme_color` | `#0284c7` | `#0c0a08` |
| `public/manifest.json` | `background_color` | (check) | `#0c0a08` |
| `postbuild.js` | inline `<meta name="theme-color">` | `#0f172a` | `#0c0a08` |
| `app.json` | `web.themeColor`/`backgroundColor` | (check) | `#0c0a08` |

---

## 4. Architecture cleanup

| File | Change |
|------|--------|
| `src/components/ProductCard.tsx` | **new** shared animated card (2.2) |
| `src/components/AppPressable.tsx` | **new** press-feedback wrapper (2.4) |
| `src/components/ScreenTransition.tsx` | **new** (2.5) |
| `src/components/Reveal.tsx` | **new** (2.6) |
| `src/components/ProductCardSkeleton.tsx` | **new** (3.1) |
| `src/components/Container.tsx` | **new** (1.2) |
| `src/hooks/useBreakpoints.ts` | **new** (1.1) |
| `src/hooks/usePrefersReducedMotion.ts` | **new** (2.1) |
| `src/data/categories.tsx` | **new** — move `categorias` + `renderIcon` out of `ProductsScreen` |
| `src/data/products.ts` | add `productAlt` map (alt prices); keep data identical |
| `src/strings.ts` | **new** — all user-facing pt-BR strings |
| `src/screens/HomeScreen.tsx` | use `useBreakpoints` + `Container` + `Reveal` + shared `ProductCard`; stop importing from `ProductsScreen`; remove inline reduced-motion block; safe-area hero; report scroll state/activeSection to App |
| `src/screens/ProductsScreen.tsx` | use shared `ProductCard`, `useBreakpoints`, skeletons, retry, `Container`; remove `categorias`/`renderIcon`/`altTexts` exports; drop unwired `onNavigateCart` or wire the cart badge CTA |
| `src/screens/CartScreen.tsx` | `Container`, `AppPressable`, empty state, `onNavigateProducts` |
| `src/screens/CheckoutScreen.tsx` | `Container`, total snapshot, L10n |
| `src/hooks/useCartActions.ts` | delete dead `handleCheckout`/`navigateToCheckout` (`:29-37`) |
| `src/hooks/useCheckoutForm.ts` | delete unused `validateAll` (`:40-42`); pt-BR messages |
| `src/context/CartContext.tsx` | no signature change (reducer default case added if missing) |
| `src/components/StickyHeader.tsx` | safe-area top, scrolled state, active-section prop, `AppPressable`, focus ring |
| `src/components/CategoryCard.tsx` | eased hover, `AppPressable` |
| `App.tsx` | `SafeAreaProvider`, `ScreenTransition`, `AppPressable` tab bar, badge bump, `scrolled`/`activeSection` lift, Cart `onNavigateProducts`, PWA colors |

---

## 5. Accessibility

| Element | `accessibilityRole` | Label / state |
|---------|--------------------|---------------|
| Tab bar items | `button` (or `tab` w/ `accessibilityState.selected`) | "Home" / "Produtos" / "Carrinho"; cart shows count |
| Hamburger | `button` | "Abrir menu" / "Fechar menu"; `aria-expanded` on web |
| Product "Adicionar" | `button` | "Adicionar {nome} ao carrinho" |
| Cart `-` / `+` | `button` | "Diminuir quantidade" / "Aumentar quantidade" |
| Cart ✕ remove | `button` | "Remover {nome}" |
| Hero CTAs / footer links | `link` | existing text |
| Focus (web) | — | `outline: 2px solid var(--brass)` offset 2, focus-visible only, on all `AppPressable`/links |

- All decorative SVG wisps/rope get `accessibilityElementsHidden` / `aria-hidden` on web.
- Tab order on web follows visual order (default).

### 5.1 Tests

Add to `tests/` (Jest, `node:test`-style output per AGENTS.md):

1. `CartContext` total is **not** zeroed before order snapshot → checkout success renders the pre-clear total.
2. `useCheckoutForm` messages are pt-BR (assert on two messages).
3. `Container` renders `maxWidth` inline style.

---

## 6. Verification

```bash
npm test          # all suites pass
npx tsc --noEmit  # zero type errors
npm run build:web # expo export + postbuild OK
npm run screenshots  # visual diff vs HTML at 1280/900/560 widths
```

Manual passes (Playwright/Puppeteer via `scripts/screenshot-compare.js`): 1280px desktop, 900px tablet, 560px mobile; hover lift eased; press feedback; cart badge bump; reduced-motion on/off; native notch insets (Android emulator).
