# Fix-Images: Reduce Asset Sizes & Add Visual Testing Scripts

## Context

The app has 4 PNG product images (up to 1000x1000px, 382KB) and a logo (991x1024px, 1MB). These are enormous for mobile and web, causing:
- Slow image loading / layout shifts
- Bloated web export (`expo export -p web`)
- Possible out-of-memory on low-end devices

## Objectives

1. Resize all product images to max 300px on the longest edge
2. Resize the logo to a reasonable size (400px max)
3. Remove unused duplicate images from `assets/extracted/`
4. Remove unused old logo (`logo_smokebuzz.png`)
5. Add `scripts/resize-images.js` — Node.js script to resize PNGs using jimp
6. Add `scripts/screenshot-compare.js` — Puppeteer script to snapshot all screens for visual regression testing
7. Fix any layout-display issues with images in the code
