# HTML-Compare V2: Remaining Visual Discrepancies

## Context

After fixing wisps, hero badge sizing, and logo assets in V1, a thorough CSS comparison reveals **5 remaining gaps** between the RN app and the HTML original.

## Discrepancies

| # | Element | HTML | RN (current) | Impact |
|---|---------|------|-------------|--------|
| 1 | **Hero badge order on mobile** | `order: -1` — badge BEFORE text | Badge AFTER text (code order) | Visual mismatch on phones |
| 2 | **Product card button size** | `.btn-sm`: `padding: 8px 16px; font-size: 0.75rem` | Uses default `.btn`: `padding: 11px 22px; font-size: 0.85rem` | Buttons too large in cards |
| 3 | **Product grid gap** | `gap: 24px` | `m-2` on items ≈ 16px effective gap | Items too tightly packed |
| 4 | **Products section background** | `background: var(--espresso)` (#1e150e) | `bg-noir` (#0c0a08) | Wrong section color |
| 5 | **Sobre image sizing** | Grid `0.9fr` column — image fills column naturally | `maxWidth: min(280, width*0.4)` — too constrained | Image too small on desktop |

## Objectives

1. Reorder hero badge to appear before text on mobile (matching HTML `order: -1`)
2. Add `sm` variant to `BrassButton` for product card use
3. Fix product grid gap to match HTML 24px
4. Fix ProductsScreen background to `bg-espresso` matching `.destaques`
5. Fix sobre image to be less constrained (match grid column proportion)
