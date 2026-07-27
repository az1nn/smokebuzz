# Proposal: Final HTML Gaps — HomeScreen Missing Sections & Dead Buttons

## Context

The React Native app has been iteratively ported from the canonical HTML reference (`https://az1nn.github.io/smokebuzz/`) over four prior spec cycles: `html-compare`, `html-compare-v2`, `pixel-perfect-html-port`, and `pixel-perfect-v2`. The last pass (pixel-perfect-v2) fixed ~50 visual discrepancies, leaving the app visually very close to the HTML on all sections that exist in both.

## Problem

Two categories of gaps remain:

### Category A: Missing Sections on HomeScreen

The HTML is a single-page scroll with this section order:

1. Header → Hero → Sobre → **Destaques (4 product cards)** → **Categorias (6 category cards)** → Diferenciais → Localização → Contato → Footer

The React app splits content across tabs:
- **Home tab:** Header → Hero → Sobre → Diferenciais → Localização → Contato → Footer
- **Products tab:** Destaques + Categorias

The Destaques and Categorias sections are **entirely absent from the HomeScreen**. Visitors on the Home tab see no product previews — they must tap "Produtos" to discover what's available. This reduces engagement and deviates from the HTML design intent.

### Category B: Dead Interactive Elements

Five interactive elements in the React app have empty `onPress={() => {}}` handlers where the HTML has real links:

| Location | HTML Target | React Behavior |
|----------|-------------|----------------|
| StickyHeader — "Chamar no Direct" | `instagram.com/smokebuzztabacaria` | No-op |
| Hero CTA — "Pedir pelo Instagram" | `instagram.com/smokebuzztabacaria` | No-op |
| Contato — "Chamar no Direct" | `instagram.com/smokebuzztabacaria` | No-op |
| Contato — "Enviar e-mail" | `mailto:contato@smokebuzz.com.br` | No-op |
| Footer nav links | Anchor scrolls to sections | No-op |

These dead buttons make the app feel incomplete and break the primary user flow (ordering via Instagram Direct).

## Objectives

1. Port Destaques (featured products) and Categorias (category cards) sections from ProductsScreen into HomeScreen, placed between Sobre and Diferenciais — matching HTML section order.
2. Wire all "Chamar no Direct" buttons to open the Instagram URL in browser/app.
3. Wire "Enviar e-mail" button to open the default mail client with the contact email.
4. Wire footer nav links to scroll to corresponding sections on HomeScreen.
5. Add hover states to nav links in StickyHeader for web parity.

## Non-Goals

- No changes to ProductsScreen (it should keep its independent Destaques + Categorias layout as the full catalog view).
- No changes to CartScreen or CheckoutScreen (existing functionality is correct).
- No new dependencies.
