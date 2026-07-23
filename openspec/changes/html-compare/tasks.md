## Task Checklist

### Phase 1: Create Hero Logo Asset
- [ ] Generate `assets/logosmokebuzz-hero.png` at ~300px using jimp (resize from the existing small logo, or regenerate from a source)
- [ ] Update `scripts/resize-images.js` to include hero logo target

### Phase 2: Fix Wisp Circles (SVG)
- [ ] Replace 3 `Animated.View` wisps in `src/screens/HomeScreen.tsx` with `Svg` + `Circle` components from react-native-svg
  - Wisp 1: container 260×260, circle `r={70}`, fill cream, viewBox="0 0 200 200"
  - Wisp 2: container 180×180, circle `r={60}`, fill brass, viewBox="0 0 200 200"
  - Wisp 3: container 120×120, circle `r={50}`, fill ember, viewBox="0 0 200 200"
- [ ] Keep the same animation (wispInterpolate with translateX/Y/scale) applied to the outer Animated.View
- [ ] Remove the `borderRadius` and `backgroundColor` from the container (replaced by SVG)

### Phase 3: Fix Hero Badge Sizing
- [ ] Replace hardcoded `width: isMobile ? 160 : 360` with `const badgeSize = Math.min(360, width * 0.8)`
- [ ] Remove explicit `height` from the Animated.Image (use `resizeMode="contain"` only)
- [ ] Keep the badge container width equal to `badgeSize`
- [ ] Update sobre section image to use responsive sizing:
  - Replace `max-w-[280px]` with `width: Math.min(280, width * 0.4)` (matching 0.9fr grid column proportionally)
  
### Phase 4: Update Logo References
- [ ] In HomeScreen, change hero badge logo source from `logosmokebuzz-transparent.png` to `logosmokebuzz-hero.png`
- [ ] In HomeScreen, change sobre section logo source to `logosmokebuzz-hero.png`
- [ ] Keep StickyHeader and footer using `logosmokebuzz-transparent.png` (small version)

### Phase 5: Verify
- [ ] Run `npx tsc --noEmit` — zero errors
- [ ] Run `npm test` — 10/10 pass
- [ ] Run `npm run resize:images` to generate hero logo
- [ ] Commit & push
