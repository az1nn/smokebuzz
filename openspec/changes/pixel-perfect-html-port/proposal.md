# Proposal: Pixel-Perfect HTML Port

## Context

The GitHub Pages deployment at https://az1nn.github.io/smokebuzz/ is the canonical HTML design. The React Native app was ported from an earlier version of this HTML with many differences — wrong text content, missing sections, different spacing, incorrect component structures, and no hover/animation effects.

## Problem

The RN app diverges significantly from the HTML original. Comparing them side-by-side reveals:

- **Missing sections:** No sticky header navbar, no "Produtos/Categorias" section with 6 SVG-icon category cards, no smoke wisp animations
- **Wrong content:** Hero text (missing "Bem-vindo à"), Sobre body text, Localização info blocks (address/hours), Diferenciais titles, Contato heading/CTAs are all different from HTML
- **Incorrect styling:** Section padding (80px vs 104px), button border-radius (4px vs 2px), font choices (Jost where HTML uses Cormorant Garamond for descriptions), Portuguese price formatting (period vs comma)
- **Missing elements:** 3 smoke wisp SVG animations in hero, hover lift on product/category cards, `.prod-alt` secondary pricing text, 3-column stats in Sobre section, footer "Since 2026" tag

## Objectives

1. Match the HTML exactly — every text string, every color, every spacing, every animation
2. Preserve RN-specific functionality (add-to-cart, cart state, checkout) as layering on top of the HTML design
3. Add smoke wisp SVG animations to the hero section
4. Add the sticky header navbar (replacing or supplementing the bottom TabBar)
5. Add the "Categorias" section with 6 SVG icon cards
6. Fix all typography to use Cormorant Garamond for description paragraphs, Jost uppercase for stat labels
7. Fix price formatting to use comma as decimal separator (R$ 3,00)
8. Fix all spacing: section padding 104px (72px mobile), card padding 20px 20px 24px, button padding 11px 22px
9. Add hover/active press states matching HTML hover transitions
10. Add `.prod-alt` secondary pricing text where applicable