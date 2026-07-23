## Visual Comparison: HTML vs RN

### 1. Wisp Circles (`.smoke.wisp`)

**HTML:**
```html
<div class="smoke wisp" style="top:8%;left:6%;width:260px;height:260px">
  <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="70" fill="var(--cream)"/></svg>
</div>
<div class="smoke wisp w2" style="top:55%;right:8%;width:180px;height:180px">
  <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="60" fill="var(--brass)"/></svg>
</div>
<div class="smoke wisp w3" style="top:20%;right:22%;width:120px;height:120px">
  <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="50" fill="var(--ember)"/></svg>
</div>
```

**RN (current):**
```tsx
<Animated.View style={{ top: "8%", left: "6%", width: 260, height: 260, borderRadius: 130, backgroundColor: "#f2ead6" }} />
```

**Difference:** HTML uses SVG `<circle r="70">` inside a 260×260 container — visible circle is 140px diameter on a 260px transparent background. RN fills the entire 260×260 with color (borderRadius:130 makes it a 260px circle). The effective visible area is **3.4× larger** in RN.

**Fix:** Replace `Animated.View` with `Svg` + `Circle` using exact radii from HTML:
- Wisp 1: `r={70}` (140px dia) inside 260×260 container
- Wisp 2: `r={60}` (120px dia) inside 180×180 container
- Wisp 3: `r={50}` (100px dia) inside 120×120 container

### 2. Hero Badge (`.badge-wrap`)

**HTML CSS:**
```css
.badge-wrap img {
  width: min(360px, 80%);
  /* height: auto (implicit) */
  filter: drop-shadow(0 25px 45px rgba(0,0,0,0.55));
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-14px); }
}
```

**RN (current):**
```tsx
<View style={{ width: isMobile ? 160 : 360 }}>
  <Animated.Image style={{ width: isMobile ? 160 : 360, height: isMobile ? 160 : 360 }} />
</View>
```

**Differences:**
- HTML: width = min(360px, 80% of parent). RN: hardcoded 160px on mobile — might be too small
- HTML: height auto (preserves aspect ratio). RN: forces 1:1 square crop, distorting image
- HTML: float animation moves -14px. RN: same, correct

**Fix:**
```tsx
const badgeSize = Math.min(360, width * 0.8);
// Image: width=badgeSize, height=undefined (auto from Image resizeMode="contain")
```

### 3. Product Photo (`.prod-photo`)

**HTML:**
```css
.prod-photo { aspect-ratio: 1/1; padding: 18px; background: #fff; }
.prod-photo img { max-height: 100%; object-fit: contain; }
```

**RN (current):**
```tsx
<View className="bg-white aspect-square p-[18px] items-center justify-center">
  <Image className="w-full h-full object-contain" resizeMode="contain" />
</View>
```

**Difference:** HTML uses `max-height: 100%` (image can be narrower than container if aspect ratio differs). RN uses `w-full h-full` which stretches to fill. With `resizeMode="contain"` this should be equivalent, but `w-full h-full` may cause layout issues in React Native.

### 4. Sobre/About Image

**HTML:** No explicit width on `<img>`, just `max-width: 100%` from global img rule. The grid column is `0.9fr` (image) and `1.1fr` (text) with 60px gap.

**RN (current):**
```tsx
<Image className="w-full max-w-[280px]" />
```

### 5. Logo Assets

- HTML uses a large base64-encoded PNG as the badge image (high resolution, displays crisp at 360px)
- RN logo was resized to 41×42 (5 KB) — crisp at 36-44px (header/footer) but blurry at 160-360px (hero badge)

**Fix:** Separate hero logo (`logosmokebuzz-hero.png`) at ~300px for hero + sobre, keep small logo for header/footer.

## State Management

No state changes needed. All fixes are visual/layout only:
- Wisps: change from Animated.View to Svg wrapper component
- Badge: update dimension calculation
- Images: update source references

## Component Changes

| Component | File | Change |
|-----------|------|--------|
| HomeScreen | `src/screens/HomeScreen.tsx` | Replace 3 Animated.View wisps with Svg-based wisps; fix badge sizing; update sobre image |
| HomeScreen | `src/screens/HomeScreen.tsx` | Use `logosmokebuzz-hero.png` for hero badge + sobre section |
| StickyHeader | `src/components/StickyHeader.tsx` | No change (small logo works) |
| ProductsScreen | `src/screens/ProductsScreen.tsx` | Verify product photo sizing matches prod-photo CSS |

## Responsive Breakpoints

| Breakpoint | Hero Badge (HTML) | Hero Badge (RN fix) |
|------------|-------------------|---------------------|
| < 450px | min(360, 80%) = 80% of ~375 = **300px** | Same formula: `min(360, width*0.8)` |
| 900px | min(360, 80%) = **360px** | Same formula: `min(360, width*0.8)` |
