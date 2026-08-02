# Proposal: Fix ScreenTransition flex regression (app "broken" — no scroll, tab bar off-screen)

## Context

`ui-polish-v1` (`7bc5fee`) introduced `src/components/ScreenTransition.tsx`, a fade+rise wrapper that renders each screen inside an `Animated.View`. Before polish, screens were direct flex children of the outer `<View className="flex-1 bg-noir">` (App.tsx), so each screen's root `flex-1 ScrollView` had a bounded height and scrolled internally.

Headless Edge diagnostics against the built `dist/` (1280×900 and 390×844) prove the regression:

- Root app div is exactly `height:900px` (`100vh`) with `overflow-y: visible`; body has `overflow: hidden`. Document `scrollHeight` is 5379px but clipped.
- **No element on the page is scrollable** (`overflow-y: auto/scroll` with `scrollHeight > clientHeight` = none). Wheel events move nothing (`window.scrollY` stays 0). This is the "scrolls don't work" symptom.
- Tab bar ("Carrinho" label) is at document y≈5336 on desktop (y≈7721 mobile) — **4400px below the viewport**, not pinned to the bottom. Users at the top cannot see or click it. Combined with the clipped document, navigation via tabs is impossible → "clicks don't work".
- No console errors, no pageerrors; the app renders fine — it is purely a layout/bounded-height collapse.

## Root cause

`ScreenTransition`'s `Animated.View` has no `flex: 1`, no `flexGrow`, no `height`. It is an auto-height block inserted between the `flex-1` outer View and each screen's `flex-1 ScrollView`. Inside an auto-height parent the inner `flex:1` ScrollView collapses to content height and never becomes the scroller; the column then overflows the 100vh root and the tab bar falls to the bottom of the content. Reduced-motion path (`<Animated.View>{children}</Animated.View>`) has the same defect.

## Objectives

1. Restore the bounded-height chain so each screen's `flex:1 ScrollView` scrolls internally again (both web and native, normal and reduced-motion paths).
2. Re-pin the TabBar to the bottom of the viewport as a normal-flow sibling below a full-height screen area.
3. Verify interactivity end-to-end with the headless Edge probe (real mouse clicks + wheel) rather than guessing.

## Non-Goals

- No layout redesign, no design-token changes, no dependency changes.
- No changes to screen content, motion timings, or reduced-motion behavior.
- No new tests beyond the existing suite + the external headless probe (diagnostic tooling stays outside the repo).

## Status

Implemented and verified. `ScreenTransition` root `Animated.View` now carries `flex: 1` in both the animated and reduced-motion paths. Headless Edge probe (desktop 1280×900 + mobile 390×844) confirms: single internal ScrollView restored, wheel scroll moves `scrollTop`, tab bar pinned within the viewport (desktop top 857/900, mobile 801/844), real tab click reaches the cart empty state, mobile hamburger + "Sobre" nav scroll works, zero console/page errors.

Commits:
- `0d0d756` — spec: screen-transition-flex-fix — restore bounded-height scroll chain
- (implementation commit follows)
