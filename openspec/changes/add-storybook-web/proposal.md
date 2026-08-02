# Proposal: Add Storybook component gallery for all UI primitives

## Context

The SmokeBuzz Tabacaria app (Expo SDK 51, React Native 0.74, react-native-web) has 11 reusable UI components in `src/components/`: AppPressable, BrassButton, CategoryCard, Container, ProductCard, ProductCardSkeleton, Reveal, RopeDivider, ScreenTransition, SectionHeading, StickyHeader.

Developers need an interactive way to inspect, test, and iterate on these components independently of the running app. Storybook provides a browser-based component gallery with hot-reload, controls, and accessibility checks.

## Problem

Currently there is no isolated component preview environment. Changes must be verified via full app runs (`expo start --web`) or mobile simulators/emulators. This slows development and limits on-the-go inspection.

## Objectives

1. Install Storybook 8 (`@storybook/react-vite@8`) with Essentials and A11y addons.
2. Configure Vite via Storybook to resolve `react-native` → `react-native-web`, import `global.css`, and load Google Fonts.
3. Write one or more stories for **each of the 11 components**, demonstrating variants (BrassButton solid/ghost, size sm/md, etc.) and usage patterns.
4. Verify `npm run storybook` starts successfully on localhost:6006 with all 11 stories.
5. Ensure `npm run build:web` + existing tests remain unaffected.

## Non-Goals

- No on-device Storybook (`@storybook/react-native`).
- No new runtime dependencies in the app itself (only devDeps for dev tooling).
- No redesign or code changes to components beyond trivial story-level controls.
- No addition of new tests or changes to existing Jest test files.

## Status

Proposed. Awaiting approval.
