# Design: Pixel-Perfect v2

## Component Changes

### 1. SectionHeading — Fix eyebrow color + spacing

**File:** `src/components/SectionHeading.tsx`

| Property | Current | Target |
|----------|---------|--------|
| Eyebrow color | `text-cream-dim` | `text-brass` |
| Eyebrow margin-bottom | `mb-2` (8px) | `mb-[14px]` |
| H2 font size | `text-3xl` (fixed 30px) | Use `useWindowDimensions` or `Dimensions` for clamp equivalent: `width < 560 ? "text-2xl" : width < 900 ? "text-3xl" : "text-4xl"` |
| H2 bottom margin | none | `mb-4` (16px) |

### 2. BrassButton — Fix font-weight mismatch

**File:** `src/components/BrassButton.tsx`

| Property | Current | Target |
|----------|---------|--------|
| Solid button font-weight | `font-semibold` (600) | Remove `font-semibold` — use body default weight |

### 3. RopeDivider — Fix positions in HomeScreen

**File:** `src/screens/HomeScreen.tsx`

Move thin rope dividers:
- Current: thin after Sobre, thin after Diferenciais
- Target: thin after Destaques (products), thin after Categorias

New order in HomeScreen:
```
Hero → Rope(normal) → Sobre → Rope(normal) → Destaques/Products → Rope(thin) → Categorias → Rope(thin) → Diferenciais → Rope(normal) → Localização → Rope(normal) → Contato → Footer
```

Wait — Destaques and Categorias are in ProductsScreen, not HomeScreen. The rope positions in the HTML are:
- After Hero → normal rope
- After Destaques → thin rope  
- After Categorias → thin rope
- After Localização → normal rope

Since Destaques and Categorias are together in ProductsScreen, add a thin rope between them in the ProductsScreen and a thin rope after Categorias.

### 4. Badge Image — Fix shape + add drop-shadow

**File:** `src/screens/HomeScreen.tsx`

| Property | Current | Target |
|----------|---------|--------|
| Badge border-radius | `borderRadius: isMobile ? 80 : 180` (circular) | No border-radius (square) |
| Badge drop-shadow | none | Add shadow style: `shadowColor: "#000", shadowOffset: { width: 0, height: 25 }, shadowOpacity: 0.55, shadowRadius: 45, elevation: 25` |

Or use the web-only `filter: drop-shadow(...)` via `style` prop with `as any` for web parity.

### 5. Wisp Animations — Fix drift keyframes

**File:** `src/screens/HomeScreen.tsx`

Replace the current 2-keyframe drift with 3-keyframe animation matching HTML:

HTML keyframes:
```
0%   { transform: translate(0,0) scale(1);     opacity: 0.35; }
50%  { transform: translate(20px,-60px) scale(1.15); opacity: 0.55; }
100% { transform: translate(-10px,-140px) scale(0.9); opacity: 0; }
```

All 3 wisps should reach `translateY: -140` at 100%. The 50% keyframe is at `-60`.

Add base opacity of `0.5` on all wisp containers (separate from animation values).

### 6. Hero Alignment — Fix responsive text alignment

**File:** `src/screens/HomeScreen.tsx`

| Viewport | Text alignment | CTA alignment | Badge order |
|----------|---------------|---------------|-------------|
| >900px (desktop) | Left | Left | After text (right column) |
| ≤900px (mobile) | Center | Center | Before text (`order: -1`) |

### 7. Hero h1 — Responsive sizing

Replace `text-5xl` (48px) with responsive equivalent:
- Desktop: ~73.6px (`text-7xl` or custom)
- Mobile: ~41.6px (`text-4xl`)

Use `isMobile` flag: `isMobile ? "text-4xl" : "text-7xl"`

### 8. Section Padding — Responsive

**File:** `src/screens/HomeScreen.tsx`

Replace all `py-[104px]` with responsive: `py-[104px]` on desktop, `py-[72px]` when `width <= 560`.

Use a helper or inline: `width <= 560 ? "py-[72px]" : "py-[104px]"`

### 9. Product Photo Padding

**File:** `src/screens/ProductsScreen.tsx`

Change `p-4` (16px) → `p-[18px]` on product photo container.

### 10. Category Grid — Fix breakpoints

**File:** `src/screens/ProductsScreen.tsx`

Current: 3 columns >900px, 1 column ≤900px
Target: 3 columns >900px, 2 columns >560px ≤900px, 1 column ≤560px

### 11. Category Icons — SVG components

Replace emoji with inline SVG path components. Each SVG:
- viewBox: `0 0 48 48`
- fill: `none`
- stroke: `currentColor`
- strokeWidth: `1.6`
- CSS: `color: var(--brass-light)`, `width: 44px`, `height: 44px`

SVG paths from HTML:
1. **Charutos** (pipe): `<rect x="4" y="21" width="34" height="7" rx="3.5"/><path d="M38 24h4a2 2 0 0 1 0 6l-4-1"/>`
2. **Cigarros**: `<rect x="10" y="6" width="10" height="36" rx="4"/><path d="M13 6c0-2 1-4 2-4s2 2 2 4"/>`
3. **Sedas & Piteiras**: `<rect x="6" y="14" width="30" height="20" rx="2"/><path d="M6 20h30M6 28h30"/>`
4. **Tabacos** (leaf): `<path d="M14 40c-4-8-2-16 4-22 3 4 3 8 1 11 5-1 8-6 7-12 6 5 8 14 3 21-3 4-9 5-15 2z"/>`
5. **Acessórios** (clock): `<circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 4"/>`
6. **Isqueiros** (lighter): `<rect x="16" y="16" width="16" height="24" rx="3"/><path d="M20 16c0-4 2-8 4-8s4 4 4 8"/>`

### 12. Sobre Image

Remove fixed `w-[200px] h-[200px]`, use responsive sizing instead (no explicit dimensions). Change `rounded-lg` to `rounded-[6px]`.

### 13. Mobile Menu Toggle (StickyHeader)

**File:** `src/components/StickyHeader.tsx`

Add a hamburger button (☰) visible only when screen width < 900px. On press, toggle a dropdown nav menu with all links + Direct button.

On web: use responsive display (hide nav links, show hamburger at ≤900px).
On native: the sticky header is already minimal (no nav links), so hamburger is less relevant but could show a modal.

### 14. Loc Section H2 margin

**File:** `src/screens/HomeScreen.tsx`

The localização section h2 has `margin-bottom: 30px` in HTML, but SectionHeading adds 56px. Either:
- Use a custom heading for this section (no SectionHeading)
- Or add `style={{ marginBottom: 30 }}` override

### 15. prefers-reduced-motion

**File:** `src/screens/HomeScreen.tsx`

Check for `prefers-reduced-motion` using `Platform.OS === 'web' && window.matchMedia('(prefers-reduced-motion: reduce)')` or a simple `useEffect` with media query. If reduced motion preferred, stop all animations.