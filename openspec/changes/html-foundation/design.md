# Design

## Architecture
The app uses Expo for React Native development. The `expo export -p web` command generates a static PWA in `dist/`. The HTML template is the foundation that everything builds upon.

### Layout
The HTML template (`web/index.html`) defines the shell:
- `<head>`: Meta tags, manifest link, theme-color, apple-touch-icon, CSS preload
- `<body>`: The `<div id="root">` where React mounts, plus noscript fallback

### HTML Template Structure
```
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>smokebuzz</title>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#0284c7" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <link rel="apple-touch-icon" href="/icon.png" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="preload" href="/app.css" as="style" />
    <link rel="stylesheet" href="/app.css" />
  </head>
  <body>
    <div id="root"></div>
    <noscript>JavaScript is required.</noscript>
  </body>
</html>
```

### PWA Support
- `public/manifest.json` — Web app manifest for install prompt
- Service worker (future) — Offline cache support
- Icons: 192x192 and 512x512 PNGs

### Screens (rendered by React into #root)
| Screen | Route | Elements |
|--------|-------|----------|
| Products | default | Header, product grid (2-col), tab bar |
| Cart | cart | Header, item list with qty controls, total, checkout button |
| Checkout | checkout | Card form, order summary, pay button, success state |

### Data Flow
- Cart state managed by React Context (useReducer)
- Mock products in src/data/products.ts
- Mock payment: 2s simulated delay, then success

### Build Process
1. `npx expo export -p web` — generates dist/ with static files
2. `node postbuild.js` — injects manifest link, meta tags into HTML
3. Output: `dist/` directory → deployed to Vercel
