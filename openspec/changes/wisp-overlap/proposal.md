# Wisp-Overlap: Fix Wisp Circle Positioning for Proper Smoke-Layering Effect

## Context

The HomeScreen hero section renders 3 SVG wisp circles (smoke wisps) inside `Animated.View` elements with drift animations. Currently they are positioned far apart — wisp 1 at top-left (`top: "8%"`, `left: "6%"`), wisp 2 at bottom-right (`top: "55%"`, `right: "8%"`), and wisp 3 at top-right (`top: "20%"`, `right: "22%"`). This scatters them across the hero section with no overlap.

These positions were ported directly from the HTML source but fail to replicate the layered smoke effect because the circles never cross paths.

## Problem

- Wisp circles are spread across opposite corners of the hero section (top-left ↔ bottom-right ↔ top-right)
- No `zIndex` is set on any wisp, so layering is undefined
- The drift animation moves each wisp in the same directional pattern (up-left), but since they start far apart they never overlap during their cycle

## Objectives

1. Reposition the 3 wisp circles so they are clustered in the upper-center region of the hero section
2. Add explicit `zIndex` values to each wisp container to control visual layering
3. Preserve existing animation parameters (duration, delay, keyframes, colors, sizes) — only position and z-index change
