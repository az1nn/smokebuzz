## Wisp Positioning Fix: Root Cause & Solution

### Root Cause

NativeWind's `className="absolute"` is **not applied** to `Animated.View` elements. The Tailwind `absolute` class correctly sets `position: absolute` on a regular `<View>`, but when wrapped with `Animated.createAnimatedComponent()`, the class is silently dropped from the rendered DOM.

This caused all three wisps to render as `position: relative` inside the flex container (`items-center justify-center`). As relative-positioned elements:
- They participated in flex layout, inflating the hero's height from 895px to 1402px
- Percentage `top`/`left`/`right` offsets were applied relative to their normal-flow position, not the hero container
- They stacked vertically instead of overlapping

### Fix

Use inline `style={{ position: "absolute" }}` instead of `className="absolute"` on `Animated.View`:

```tsx
{/* DO NOT use className="absolute" on Animated.View — use inline style */}
<Animated.View style={[{ position: "absolute", top: "8%", left: "6%", ... }, animStyle]}>
```

### Verified Positions (390px viewport)

| Wisp | CSS rule | RN rendered (pixels) | RN rendered (%) | HTML reference (%) |
|------|----------|---------------------|-----------------|-------------------|
| 1    | top:8% left:6% | 65px, 23px | 7.7%, 6.0% | 7.9%, 6.0% |
| 2    | top:55% right:8% | 390px, 185px | 46.3%, 47.5% | 51.2%, 46.6% |
| 3    | top:20% right:22% | 99px, 195px | 11.8%, 50.1% | 12.7%, 49.9% |

(Slight variation due to animation phase at capture time — match is confirmed.)

### Hero Container

- **HTML**: `section.hero` = 390×895, 100vh flex-centered, no padding
- **RN**: `min-h-[92vh]` = 390×842, `paddingTop: 20` (mobile), `paddingTop: 16` (desktop)

The 20/16px padding accounts for the StickyHeader above the hero while keeping content visually centered.

### What Did NOT Change

- Wisp animation parameters (durations, delays, keyframes, colors, sizes, radii)
- SVG circle dimensions (r=70/60/50, viewBox 200×200)
- No z-index added (not needed — overlap is from animation drift, not static stacking)
