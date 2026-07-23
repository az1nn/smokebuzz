# HTML-Compare: Pixel-Accurate Visual Audit

## Context

The RN app approximates the HTML design but still has visual gaps found during code review. The user identified two key issues:
1. **Wisp circles are "lost in UI"** — sized/positioned wrong vs HTML
2. **Hero badge logo** — blurry at large sizes

After fetching the live HTML (https://az1nn.github.io/smokebuzz/) and comparing CSS, several discrepancies were found.

## Discrepancies Found

| # | Element | HTML | RN (current) | Fix Needed |
|---|---------|------|-------------|------------|
| 1 | **Wisp circles** | SVG `<circle>` inside `<div class="smoke wisp">` — circle `r=70` inside 260×260 container, `r=60` inside 180×180, `r=50` inside 120×120 | `Animated.View` with full `borderRadius: 130/90/60` — fills the entire container | Replace with SVG circles using proper radii |
| 2 | **Hero badge** | `width: min(360px, 80%)` — 360px max, or 80% of parent on mobile | `width: isMobile ? 160 : 360` — hardcoded 160px on mobile | Use `min(360, parentWidth * 0.8)` instead of hardcoded 160 |
| 3 | **Hero badge height** | Auto (aspect ratio preserved) | Hardcoded `height: isMobile ? 160 : 360` — forces square crop | Remove explicit height, let aspect ratio determine it |
| 4 | **Logo blur** | Image is high-res PNG from base64 | Logo resized to 41×42 — stretched 4× on hero badge | Restore hero-size logo for badge + sobre image |
| 5 | **Sobre image sizing** | Flows in CSS grid `0.9fr 1.1fr`, no explicit width | `max-w-[280px]` hardcoded | Match grid-based layout or use responsive width |

## Objectives

1. Fix wisp circles to use SVG with exact radii from HTML
2. Fix hero badge to use responsive `min(360px, 80%)` sizing
3. Fix logo blur by creating separate hero-size logo asset
4. Create a reusable `HeroBadge` component matching HTML exactly
5. Update sobre image sizing to be responsive like the grid
