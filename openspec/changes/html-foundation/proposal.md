# HTML-First PWA Foundation

## Context
The app is currently built as an Expo React Native project that generates a PWA website as output. The generated HTML (dist/index.html) is a thin shell that loads a JavaScript bundle which renders everything via React.

## Problem
The HTML output is treated as a secondary artifact rather than the primary foundation. The HTML should be designed intentionally as the base of the application — with proper semantic structure, meta tags, manifest, service worker, and fallback content that works even before JavaScript loads.

## Objectives
- Restructure the project so the HTML output is the base for all app
- Create a well-designed HTML template with semantic structure
- Ensure the PWA manifest, service worker, and meta tags are properly integrated
- Keep React Native as the development framework but treat the HTML as the primary output
- The app must work as a standalone PWA website when built
