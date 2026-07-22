# Proposal: Pixel-Perfect v2 — Remaining Gaps

## Context

The first pixel-perfect pass (v1) ported the major HTML design to RN. A comprehensive diff against the live GitHub Pages HTML revealed ~50 remaining differences across spacing, colors, layout, animations, breakpoints, and icons.

## Problem

The RN app still visibly diverges from the HTML in key areas:

- **Section eyebrow color wrong** — uses `text-cream-dim` instead of HTML's `text-brass`
- **Badge image wrong shape** — circular instead of square; missing drop-shadow
- **Rope dividers in wrong positions** — thin ropes after sobre/diferenciais instead of destaques/categorias
- **Missing mobile menu** — no hamburger toggle for nav on small screens
- **Category grid missing 2-col breakpoint** — goes 3→1 instead of 3→2→1
- **Category icons are emoji** — should be SVG icons matching HTML
- **Wisp animations wrong** — only 2 keyframes instead of HTML's 3; wisps 2/3 stop at -60 instead of -140
- **Hero text alignment always centered** — should be left on desktop, center on mobile
- **Hero h1 size fixed** — should use responsive `clamp()`
- **Section padding not responsive** — stays 104px, should be 72px at ≤560px
- **Product photo padding 16px** — should be 18px
- **Section heading eyebrow margin 8px** — should be 14px
- **Sobre image fixed 200×200** — should be responsive; border-radius 8px → 6px

## Objectives

1. Fix section heading eyebrow from `text-cream-dim` to `text-brass` everywhere
2. Fix badge image: remove border-radius (square), add drop-shadow
3. Move thin rope dividers to match HTML positions (after destaques, after categorias)
4. Add hamburger menu toggle for small screens
5. Fix category grid: add 2-column breakpoint at 900px
6. Replace emoji category icons with inline SVG components
7. Fix wisp drift: 3 keyframes (0→50%→100%), all wisps reach -140 Y, base opacity 0.5
8. Fix hero text/CTA alignment: left on desktop, centered only at ≤900px
9. Make hero h1 responsive (clamp equivalent)
10. Make section padding responsive (72px at ≤560px)
11. Fix product photo padding 16px → 18px
12. Fix section heading eyebrow margin 8px → 14px
13. Fix sobre image: responsive sizing, border-radius 6px
14. Make section heading h2 responsive (clamp)
15. Fix loc section h2 margin 56px → 30px
16. Add prefers-reduced-motion support