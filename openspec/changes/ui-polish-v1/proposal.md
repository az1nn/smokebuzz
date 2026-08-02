# Proposal: UI Polish & Responsivity v1 — finishing the HTML-parity layer

## Context

SmokeBuzz Tabacaria (`meu-pwa-app`) is a React Native (0.74) + Expo web-PWA recreation of a single-page HTML reference (`index.html`, canonical at https://az1nn.github.io/smokebuzz/). Eleven spec cycles have achieved near-pixel-perfect **desktop** parity:

- Full design system ported 1:1 (`noir`/`espresso`/`espresso-2`/`cream`/`cream-dim`/`brass`/`brass-light`/`ember`/`line`; Rye / Jost / Cormorant).
- All 10 home sections in HTML order, rope dividers in the correct spots, responsive section padding.
- Hero smoke wisps (3 SVG circles, staggered drift), floating badge (6s float), `prefers-reduced-motion` on web.
- Sticky glassmorphism header (`rgba(12,10,8,0.86)` + blur(8px)) with mobile dropdown menu.
- Cart/checkout extension beyond the HTML (which routes purchases to Instagram DM) + PWA build pipeline.

What is **not** finished is the layer above pixel-parity: responsive rigor across the HTML's two mobile-down breakpoints (900px / 560px), motion quality (hover lifts are instant, no screen transitions, no scroll reveals), state handling (weak empty/loading/error, English strings, a checkout "R$ 0,00" bug), and the architecture cleanup that enables all of it (duplicated `ProductCard`, cross-screen imports, dead code).

## Problem

Audit findings (from `src/` exploration + spec history):

| # | Area | Gap | Impact |
|---|------|-----|--------|
| P1 | Responsivity | `HomeScreen.tsx:164` uses static `Dimensions.get("window")`; no resize/orientation reactivity | Layout doesn't adapt live; inconsistent with `useWindowDimensions()` everywhere else |
| P2 | Responsivity | `CartScreen` and `CheckoutScreen` have no `max-w` container | Rows/inputs/total-bar stretch full-viewport on large desktop (Home/Products cap at 1180px) |
| P3 | Responsivity | `react-native-safe-area-context@4.10.5` installed but unused; hero uses magic `paddingTop:20/16` (`HomeScreen.tsx:180`) | Notch/home-indicator collision on native; magic numbers |
| P4 | Motion | Card hover lifts `-6px` and color swaps are **instant** (`HomeScreen.tsx:513`, `ProductsScreen.tsx:75`, `CategoryCard.tsx:13`) | Feels cheap vs HTML `transition: transform .25s ease, border-color .25s ease` |
| P5 | Motion | No press feedback on tab bar (`App.tsx`), cart steppers/remove (`CartScreen.tsx:55-81`), category cards | No tactile affordance |
| P6 | Motion | No screen transitions (conditional render swap, `App.tsx:79-94`); no scroll-triggered reveals; wisps are flat hard-edged SVG circles (`HomeScreen.tsx:194-208`) | Static, non-premium feel vs soft HTML drifts |
| P7 | Motion | Reduced-motion only honored on web (`HomeScreen.tsx:128-135`) | Native always runs float/drift loops |
| P8 | States | Products loading/error are plain English text, no spinner/retry (`ProductsScreen.tsx:56-70`); `refetch` exposed but unused | Weak UX, dead API |
| P9 | States | Cart empty state is a bare text line (`CartScreen.tsx:17-21`) | Dead-end — no path back to products |
| P10 | States | Checkout success reads `total` **after** `clearCart()` → always "R$ 0,00" (`CheckoutScreen.tsx:35,54`) | Real bug |
| P11 | States | English UI residue: "CVV", all `useCheckoutForm` validation errors, "Payment declined" | Inconsistent pt-BR app |
| P12 | Theming | PWA `public/manifest.json` uses sky `#0284c7`; postbuild HTML uses slate `#0f172a` | Contradicts noir/brass identity |
| P13 | Architecture | `ProductCard` duplicated (`HomeScreen.tsx:502-547` + `ProductsScreen.tsx:72-108`); HomeScreen imports `categorias`/`renderIcon` from ProductsScreen (`HomeScreen.tsx:11`); dead `navigateToCheckout` (`useCartActions.ts:29-37`), unused `validateAll` (`useCheckoutForm.ts:40-42`), unwired `onNavigateCart` (`App.tsx:87`) | Coupling + drift risk |
| P14 | Accessibility | No focus-visible rings, no `aria`/`accessibilityRole`/labels on tabs, hamburger, steppers | Keyboard/AT unusable on web |

## Objectives

1. **Responsive rigor** — centralize the HTML's 900px/560px tiers in one `useBreakpoints` hook; make every width reactive; cap Cart/Checkout in a shared `Container`.
2. **SafeArea** — adopt `react-native-safe-area-context` end-to-end (header, tab bar, hero); delete the magic `paddingTop` numbers.
3. **Motion quality** — shared animated `ProductCard`/`CategoryCard` with eased hover (`250ms cubic-bezier(0.22,1,0.36,1)`, `-6px` lift), press micro-interactions everywhere, screen transitions, scroll-triggered section reveals, hero parallax + soft radial-gradient wisps, cart-badge spring bump.
4. **Motion system** — `usePrefersReducedMotion` honored on all platforms; every new animation gates on it.
5. **State & content** — shimmer skeleton loaders, premium empty/error states (pt-BR + retry), checkout total-snapshot fix, full localization sweep, PWA theming to noir/brass.
6. **Architecture** — extract shared `ProductCard` and `categories` module, kill cross-screen imports and dead code.
7. **Accessibility** — focus-visible rings, roles/labels on all interactive elements.

## Non-Goals

- No new product data, no backend, no real payment.
- No service worker / offline caching (documented as future in `html-foundation`).
- No navigation library; keep the `App.tsx` state machine.
- No design-token changes — palette/fonts stay identical to `tailwind.config.js`.
- No pixel-parity re-baselining of already-landed sections (only where this polish requires it).

## Status

Implementation complete (waves A-D). All non-goals above were respected (no new dependencies, no backend/payment, no nav library, no token changes).

Commits:
- `____COMMIT1____` — feat: ui-polish-v1 — responsive rigor, motion system, state polish, accessibility
- `____COMMIT2____` — docs: security keys & env vars policy + ignore .env
