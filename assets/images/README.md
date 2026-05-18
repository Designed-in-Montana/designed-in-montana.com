# /assets/images/

General site imagery — logos, favicons, social share cards, and any other
brand or page-level assets that aren't tied to a specific business.
(Business logos live inside each business's own folder under `/businesses/`.)

## Folders

### `/logo/` — Brand logos
Use these in marketing material, email signatures, social profiles, or any
context where you need a high-quality "Designed in Montana" logo.

| File | Size | Use case |
|---|---|---|
| `logo-source.png` | 1192×536 | Master transparent PNG — pine ink + silver pen, no background |
| `logo-full.png` | 1200×630 | Primary logo on cream background |
| `logo-mark.png` | 800×360 | Tight mark on cream — for tighter spaces |
| `logo-dark.png` | 1200×630 | Cream-ink version for dark backgrounds (footer, dark pages) |
| `logo-square.png` | 800×800 | Square format for social profile pictures |
| `logo-transparent.png` | 1200×800 | Pine-ink logo on transparent — drop on any background |
| `logo-header.png` | 213×96 | Optimized header version (display ~48px high, retina-ready) |
| `logo-footer.png` | 213×96 | Cream-ink version for dark footer (display ~48px high) |

The header and footer use `logo-header.png` and `logo-footer.png` directly via `<img>` tags in `/includes/header.html` and `/includes/footer.html`. To swap the logo site-wide, replace those two PNGs and the other variants here.

### `/favicon/` — Browser tab and device icons
Wired into every page's `<head>`. If you change the logo, regenerate these
to match.

| File | Size | Use case |
|---|---|---|
| `favicon-16.png` | 16×16 | Browser tab (small) |
| `favicon-32.png` | 32×32 | Browser tab (retina) |
| `favicon.ico` | multi-res | Legacy browsers (also copied to `/favicon.ico`) |
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `android-chrome-192.png` | 192×192 | Android home screen |
| `android-chrome-512.png` | 512×512 | PWA splash, Android high-res |
| `favicon.png` | 64×64 | Generic fallback |

### `/site/` — Page-level imagery
Open Graph card, fallback images, placeholders.

| File | Size | Use case |
|---|---|---|
| `og-image.png` | 1200×630 | Social share card (Facebook, X, LinkedIn previews) |
| `placeholder-logo.png` | 800×600 | Copy this as `logo.png` when adding a new business — shows what size their logo needs to be |

## Adding new images

For any new general site imagery (page banners, illustrations, etc.), drop
them into `/assets/images/site/`. Keep them under 500KB each — large images
slow the page, and most use cases don't need more than that.

For business-specific logos, the file goes in **the business's own folder**:
`/businesses/<region>/<county>/<town>/<Business Name>/logo.png` — not here.
