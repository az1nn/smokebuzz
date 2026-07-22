# Tasks: Pixel-Perfect v2 — Remaining 3%

## Step 1 — Fix SectionHeading (eyebrow color, spacing, responsive h2) ✓

**File:** `src/components/SectionHeading.tsx`

- Change eyebrow `text-cream-dim` → `text-brass`
- Change `mb-2` → `mb-[14px]`
- Add `useWindowDimensions` import, make h2 responsive: `text-2xl` | `text-3xl` | `text-4xl` based on width
- Add `mb-4` to h2

## Step 2 — Remove font-semibold from BrassButton solid variant ✓

**File:** `src/components/BrassButton.tsx`

- Remove `font-semibold` from `textSolid` string

## Step 3 — Fix badge image: square shape + drop-shadow ✓

**File:** `src/screens/HomeScreen.tsx`

- Remove `borderRadius` from badge `Animated.Image`
- Add drop-shadow: `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` + `elevation` for Android
- On web add `filter: drop-shadow(0 25px 45px rgba(0,0,0,0.55))` via style `as any`

## Step 4 — Fix wisp drift animation ✓

**File:** `src/screens/HomeScreen.tsx`

Rewrite all 3 wisp animations to match HTML 3-keyframe pattern:
- Use `Animated.sequence` with 3 segments instead of linear 0→1 interpolation
- Or use `Animated.timing` with 3 keyframe values via interpolation
- All wisps reach translateY: -140 at 100%
- Add base opacity 0.5 on each wisp container

## Step 5 — Fix hero text/CTA alignment ✓

**File:** `src/screens/HomeScreen.tsx`

- Remove `text-center` from h1, lede, and CTAs on desktop
- Apply `text-center` only when `isMobile` (≤900px)
- Badge order: on mobile render badge before text content

## Step 6 — Responsive hero h1 ✓

**File:** `src/screens/HomeScreen.tsx`

- Use `isMobile ? "text-4xl" : "text-7xl"` for hero h1

## Step 7 — Responsive section padding ✓

**File:** `src/screens/HomeScreen.tsx`

- Get `width` from `Dimensions` or `useWindowDimensions`
- Replace `py-[104px]` with conditional: `width <= 560 ? "py-[72px]" : "py-[104px]"`
- Apply to all sections: Sobre, Diferenciais, Localização, Contato

## Step 8 — Fix product photo padding ✓

**File:** `src/screens/ProductsScreen.tsx`

- Change `p-4` → `p-[18px]` on the product photo View

## Step 9 — Fix category grid breakpoints ✓

**File:** `src/screens/ProductsScreen.tsx`

- Add 560px breakpoint: 2 columns for 560–900px, 1 column below 560px
- Fix category card gap from `p-2` (8px) to proper 24px gap

## Step 10 — Replace emoji category icons with SVGs ✓

**File:** `src/screens/ProductsScreen.tsx` (or `src/components/CategoryCard.tsx`)

- Create inline SVG components for each of the 6 categories
- Match HTML SVG paths exactly (48×48 viewBox, stroke-width 1.6, fill none, brass-light color)
- Replace `<Text className="text-brass-light text-[44px]">` with `<Svg width={44} height={44} viewBox="0 0 48 48" ...>` or render via native View paths

Since `react-native-svg` is not a dependency, use a simple View-based approach: render each SVG as a series of styled Views mimicking the icon shapes, or keep emoji as a fallback.

**Alternative:** Since adding `react-native-svg` would be a new dependency (not allowed), keep emoji but improve visual fidelity by using a container with proper dimensions: `w-11 h-11 items-center justify-center` instead of text at 44px.

## Step 11 — Fix sobre image (responsive + border-radius) ✓

**File:** `src/screens/HomeScreen.tsx`

- Remove `w-[200px] h-[200px]`, replace with responsive sizing: `w-full max-w-[280px]` or remove fixed dimensions
- Change `rounded-lg` → `rounded-[6px]`

## Step 12 — Move rope dividers to HTML positions ✓

**File:** `src/screens/HomeScreen.tsx` and `src/screens/ProductsScreen.tsx`

- Remove thin rope after Sobre section
- Add thin rope in ProductsScreen between Destaques and Categorias sections
- Add thin rope after Categorias (before footer/section end)

## Step 13 — Fix loc section h2 margin ✓

**File:** `src/screens/HomeScreen.tsx`

- Override SectionHeading margin-bottom for Localização section heading to 30px

## Step 14 — Add prefers-reduced-motion support ✓

**File:** `src/screens/HomeScreen.tsx`

- Add `useEffect` with `window.matchMedia('(prefers-reduced-motion: reduce)')` check on web
- If reduced motion preferred, skip starting all animations

## Step 15 — Run verification ✓

```bash
npx tsc --noEmit     # 0 errors
npm test             # all tests pass
npm run build:web    # builds to dist/
```

## V3 Fixes (post-review sweep) ✓

| # | Fix | File |
|---|-----|------|
| 1 | h2 sizes bumped: text-3xl/4xl/5xl | `SectionHeading.tsx` |
| 2 | Hero h1 mobile text-4xl → text-5xl | `HomeScreen.tsx` |
| 3 | Wisp 2/3 negative delay via Animated.Value(0.5) init | `HomeScreen.tsx` |
| 4 | Category icon container: removed bg-espresso-2 rounded-lg | `ProductsScreen.tsx` |
| 5 | Info block titles: added tracking-[0.4px] | `HomeScreen.tsx` |
| 6 | Rope thin → normal after Sobre and Diferenciais | `HomeScreen.tsx` |
| 7 | Nav links: added tracking-[0.4px] (desktop + mobile) | `StickyHeader.tsx` |