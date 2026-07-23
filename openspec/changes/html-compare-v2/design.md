## Detailed Fixes

### 1. Hero Badge Order on Mobile

**HTML:**
```css
@media (max-width: 900px) {
  .hero-grid .badge-wrap { order: -1; }
}
```
The badge `<div class="badge-wrap">` is placed first in the HTML source but appears above the text column via CSS grid. The text column appears second.

**RN (current):** Text column first, badge column second in the render tree.

**Fix:** Wrap text and badge in a View with `flexDirection: isMobile ? "column-reverse" : "row"` on mobile, or conditionally swap render order using `isMobile`.

**Best approach:** Use `flexDirection: isMobile ? "column-reverse" : "row"` on the parent View (currently className `w-full flex-row`). This reverses the visual order on mobile without changing the JSX tree order.

### 2. Small Button Variant

**HTML:**
```css
.btn-sm { padding: 8px 16px; font-size: 0.75rem; }
```

**Current BrassButton:** hardcoded `px-[22px] py-[11px]` (22×11) and `text-sm` (~14px).

**Fix:** Add optional `size` prop to BrassButton:
- `size="md"` (default): current `px-[22px] py-[11px] text-sm`
- `size="sm"`: `px-4 py-2 text-xs` (~12px, 16×8)

**Usage in ProductsScreen:** `<BrassButton label="Adicionar" size="sm" onPress={...} />`

### 3. Product Grid Gap

**HTML:** `.prod-grid { gap: 24px; }`

**RN (current):** `contentContainerClassName="p-2 pb-4"` on FlatList + `m-2` on each card item = ~16px effective gap.

**Fix:** Replace `m-2` with no margin on items, and use `gap` on the FlatList. However, React Native FlatList doesn't support `gap` directly. Instead:
- Set `contentContainerStyle={{ gap: 24 }}` on FlatList
- Remove `m-2` from product card (replace with no margin)
- Keep `p-2` on container for outer padding, or change to match HTML section padding

### 4. Products Section Background

**HTML:** `.destaques` wrapper has `background: var(--espresso)` — the entire section including heading and products.

**RN (current):** ScrollView uses `bg-noir` (black).

**Fix:** Change ScrollView in ProductsScreen to `bg-espresso`. This affects the entire products screen background.

### 5. Sobre Image Sizing

**HTML:** Grid `0.9fr 1.1fr` columns. Image inside `0.9fr` column — fills column width naturally. No max-width constraint.

**RN (current):** `maxWidth: Math.min(280, width * 0.4)` — caps at 280px on desktop, but with `0.9fr` on 1180px container, the column would be ~530px. So 280px is much smaller than HTML.

**Fix:** Change to `maxWidth: Math.min(420, width * 0.38)` — roughly matching the 0.9/(0.9+1.1) = 0.45 proportion of the grid.

## Component Changes

| File | Change |
|------|--------|
| `src/screens/HomeScreen.tsx` | Add `flexDirection: isMobile ? "column-reverse" : "row"` to hero parent View |
| `src/screens/HomeScreen.tsx` | Widen sobre image maxWidth from 280 to 420 |
| `src/components/BrassButton.tsx` | Add optional `size` prop (`"md"` \| `"sm"`) |
| `src/screens/ProductsScreen.tsx` | Change button to `size="sm"` |
| `src/screens/ProductsScreen.tsx` | Replace `m-2` on cards with `contentContainerStyle={{ gap: 24 }}` |
| `src/screens/ProductsScreen.tsx` | Change ScrollView from `bg-noir` to `bg-espresso` |
