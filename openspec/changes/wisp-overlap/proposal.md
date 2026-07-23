# Wisp-Overlap: Fix Wisp Circle Positioning for Proper Smoke-Layering Effect

## Context

The HomeScreen hero section renders 3 SVG wisp circles (smoke wisps) inside `Animated.View` elements with drift animations. Despite using the same CSS positions as the HTML source (`top:8% left:6%`, `top:55% right:8%`, `top:20% right:22%`), the RN version rendered them incorrectly — all three were stacked vertically in the left-center area, the hero was excessively tall, and the wisps never overlapped during animation.

## Problem (Root Cause)

NativeWind's `className="absolute"` is silently ignored on `Animated.View` (React Native's animated wrapper). The wisps rendered as `position: relative` inside a flex container, causing:
1. All percentage offsets to be miscalculated (relative to normal flow, not the hero)
2. Hero height inflated from ~895px to ~1402px (wisps contributed to flex layout)
3. Zero overlap between circles (they stacked vertically instead of layering)
4. Excessive `paddingTop: 100/80` pushed content even further down

## Solution

1. Replace `className="absolute"` with `style={{ position: "absolute" }}` on each wisp `Animated.View`
2. Revert to exact HTML positions (original values before earlier repositioning attempts)
3. Reduce `paddingTop` from 100/80 to 20/16
