## Image Resize Targets

| File | Current Size | Current Dims | Target Dims |
|------|-------------|-------------|-------------|
| `logosmokebuzz-transparent.png` | 1,004 KB | 991 × 1024 | 300 × 310 |
| `piteira_longa_girls_in_green.png` | 382 KB | 1000 × 1000 | 300 × 300 |
| `piteira_tradicional_papelito.png` | 194 KB | 447 × 447 | 300 × 300 |
| `seda_zomo_branca.png` | 155 KB | 500 × 295 | 300 × 177 |
| `seda_zomo_marrom_natural.png` | 282 KB | 1000 × 1000 | 300 × 300 |

## Scripts

### `scripts/resize-images.js`
- Uses `jimp` (already installed as devDep)
- Reads all images from `assets/`
- Resizes to target dimensions maintaining aspect ratio
- Overwrites the original files in-place
- Usage: `node scripts/resize-images.js`

### `scripts/screenshot-compare.js`
- Uses `puppeteer` to launch headless Chrome
- Starts the web dev server (`expo start --web`)
- Navigates to each screen route
- Takes screenshots saved to `screenshots/`
- Usage: `node scripts/screenshot-compare.js`

## Cleanup
- Delete `assets/extracted/` directory (unused duplicates)
- Delete `assets/logo_smokebuzz.png` (unused old logo)
