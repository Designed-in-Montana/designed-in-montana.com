# Designed in Montana

A directory and backlink hub for Montana small businesses — both brick-and-mortar and online — helping them get noticed for what makes Montana what it is.

**Live tagline:** *Helping Montana get noticed.*
**Contact:** support@designed-in-montana.com · (406) 402-6461

---

## What this site is

A static, file-driven directory. Every business gets its own folder under `/businesses/<region>/<county>/<town>/<Business Name>/`, and a handful of plain text files inside that folder describe the business. The site reads those files at runtime to render the business card on the search and listing pages.

No databases. No build step. No backend. Just folders, text files, and a logo.

---

## Project structure

```
/
├── index.html                          ← homepage
├── /pages/
│   ├── about.html
│   ├── contact.html
│   ├── regions.html                    ← interactive region map
│   ├── requirements.html
│   └── search.html                     ← global search
│
├── /includes/                          ← edit these to update every page
│   ├── header.html                     ← global header (nav, search bar, logo)
│   └── footer.html                     ← global footer (social icons, links)
│
├── /assets/
│   ├── /css/style.css                  ← single stylesheet
│   ├── /js/
│   │   ├── main.js                     ← loads header/footer everywhere
│   │   ├── mt-geo-data.js              ← real Montana county geometry (TIGER public domain)
│   │   ├── region-map.js               ← the big MT region SVG map
│   │   ├── geography.js                ← county maps + city dots
│   │   ├── businesses.js               ← manifest of all businesses (EDIT THIS WHEN ADDING)
│   │   └── business-loader.js          ← card rendering + search engine
│   └── /images/                        ← see /assets/images/README.md
│       ├── /logo/                      ← brand logos (4 sizes/styles)
│       ├── /favicon/                   ← tab icons, app icons, .ico
│       └── /site/                      ← OG image, placeholders, page imagery
│
└── /businesses/
    ├── /glacier/                       ← Glacier Country (8 counties)
    ├── /southwest/                     ← Gold West Country (10 counties)
    │   ├── index.html                  ← region page w/ county map
    │   ├── /beaverhead/index.html      ← county page
    │   ├── /broadwater/index.html
    │   └── ... (10 counties)
    ├── /central/                       ← Central Montana (15 counties)
    │   ├── index.html
    │   ├── /teton/
    │   │   ├── index.html
    │   │   └── /fairfield/
    │   │       ├── index.html          ← town page
    │   │       └── /Mountain Wizard LLC/
    │   │           ├── tag.txt
    │   │           ├── description.txt
    │   │           ├── contact.txt
    │   │           ├── social.txt
    │   │           └── logo.png
    │   └── ... (15 counties)
    ├── /missouri-river/                ← Missouri River / North East (10 counties)
    ├── /yellowstone/                   ← Yellowstone / South Central (6 counties)
    └── /southeast/                     ← Custer Country (7 counties)
```

---

## How the global header & footer work

The header and footer live in **one file each**:

- `/includes/header.html`
- `/includes/footer.html`

Every page has two empty placeholder divs:

```html
<div id="site-header-slot"></div>
<!-- ... page content ... -->
<div id="site-footer-slot"></div>
```

`main.js` fetches the include files at page load and injects them. Edit either include once and the change appears on every page.

---

## Adding a new business

Listing requirements are detailed at `/pages/requirements.html`. Once a business meets them, follow these 5 steps:

### Step 1 — Create the folder

Match the business's location to the right region, county, and town:

```
/businesses/<region>/<county>/<town>/<Business Name>/
```

Region IDs (use exactly these slugs):
- `glacier` · Glacier Country
- `southwest` · Southwest Montana (Gold West Country)
- `central` · Central Montana
- `missouri-river` · Missouri River (North East)
- `yellowstone` · Yellowstone (South Central)
- `southeast` · Southeast Montana (Custer Country)

County and town folders use lowercase-with-dashes (e.g. `lewis-and-clark`, `big-horn`, `fairfield`). All county folders already exist. **Town folders may not** — if it's a new town, create it.

The business folder itself uses the **proper-cased company name with spaces** (e.g. `Mountain Wizard LLC`). This name becomes the card title automatically.

### Step 2 — Add the 5 files

Inside the new business folder, create these files:

**`tag.txt`** — searchable tags, one per line or comma-separated:
```
web design
ecommerce
local
fairfield
montana
```

**`description.txt`** — a single short paragraph (1-3 sentences) describing the business:
```
Mountain Wizard LLC builds clean, fast, hand-crafted websites and digital tools
for Montana small businesses — based out of Fairfield, working statewide.
```

**`contact.txt`** — `key: value` pairs, one per line:
```
url: https://example.com
address: 123 Main St, Fairfield, MT 59436
phone: (406) 555-0100
email: hello@example.com
```

**`social.txt`** — same `key: value` format. **Leave the value blank for any platform the business doesn't use** — the icon won't show on the card. Supported platforms:
```
facebook:  https://facebook.com/example
instagram: https://instagram.com/example
threads:
x:         https://x.com/example
pinterest:
reddit:
tiktok:
youtube:   https://youtube.com/@example
linkedin:  https://linkedin.com/company/example
```
Icons that are filled in will be displayed centered in a single row on the card. Icons left blank will be hidden, and the remaining icons stay centered.

**`logo.png`** — the business's logo. **Required size: 800×600 pixels** (4:3 aspect ratio) at minimum, PNG with transparent or light background. Anything larger will scale down; anything with the wrong ratio will be letterboxed (the image is rendered `object-fit: contain` with padding, so logos won't get cropped).

### Step 3 — Register the business in the manifest

Open `/assets/js/businesses.js` and add a new entry to the `window.BUSINESSES` array:

```js
{
  name: "Mountain Wizard LLC",
  region: "central",
  regionLabel: "Central Montana",
  county: "teton",
  countyLabel: "Teton",
  town: "fairfield",
  townLabel: "Fairfield",
  folder: "/businesses/central/teton/fairfield/Mountain Wizard LLC"
}
```

`folder` must exactly match the actual path, including capitalization and spaces.

### Step 4 — (If new town) Add a town page

If the town doesn't yet have an `index.html` in its folder, copy the existing one from `/businesses/central/teton/fairfield/index.html` and update the town/county/region labels in the breadcrumb, hero, and filter line.

### Step 5 — (Optional) Plot the city dot on the county map

To make the new town appear as a labeled dot on the county map, open `/assets/js/geography.js`, find the right region's `counties` array, find the county, and add a city to its `cities` array using real latitude and longitude:

```js
{ id: 'teton', label: 'Teton', cities: [
  { id: 'fairfield', label: 'Fairfield', lat: 47.6155, lon: -111.9982 },
  { id: 'YOUR-TOWN', label: 'Your Town', lat: 47.8125, lon: -112.1828 }   // ← new
]}
```

The lat/lon get projected into the same coordinate system used by the county polygons (drawn from US Census TIGER data), so the dot will sit at the geographically correct spot inside its county. Look up the town's lat/lon in Google Maps (right-click → first line of coordinates) or on Wikipedia.

Once that's added, the dot becomes a clickable link to that town's page automatically.

---

## What each card shows

A rendered business card pulls data from the folder like this:

| Card element | Source |
|---|---|
| Image (at top) | `logo.png` — click opens the `url` from contact.txt |
| Name | The business's folder name |
| Town · County | From `businesses.js` manifest entry |
| Description | `description.txt` |
| Social icons (one row, centered) | Each filled platform in `social.txt`. Missing platforms simply don't show. |
| Address | `contact.txt` → opens in Google Maps |
| Phone | `contact.txt` → opens phone dialer |
| Email | `contact.txt` → opens email client |

---

## Search

The global search bar (in the header) and the dedicated `/pages/search.html` both search by:
- Business name
- County name (e.g. "teton", "Yellowstone")
- Town name
- Region name
- Any tag in `tag.txt`
- Words in `description.txt`

Region filter pills further narrow results.

The interactive map on the home and `/pages/regions.html` pages uses each region as a quick-search trigger: clicking a region jumps to `/pages/search.html?region=<region-id>`.

---

## URL patterns

| Page | URL |
|---|---|
| Homepage | `/` |
| Regions overview | `/pages/regions.html` |
| Region landing | `/businesses/central/` |
| County landing | `/businesses/central/teton/` |
| Town landing | `/businesses/central/teton/fairfield/` |
| Search | `/pages/search.html?q=...&region=...` |
| About | `/pages/about.html` |
| Contact | `/pages/contact.html` |
| Requirements | `/pages/requirements.html` |

---

## Starter listings (Phase 1)

The directory ships with three businesses already entered for Fairfield, Teton County:

1. **Mountain Wizard LLC**
2. **Montana Wizard**
3. **Montana Stream**

Their folders and data files are real working examples — copy their structure when adding new businesses.

---

## Notes on hosting

This is a fully static site. Drop the whole directory on any web host (Netlify, GitHub Pages, S3+CloudFront, plain Nginx, etc.). The only requirement is that the host serves `index.html` at directory URLs (most do by default).

Because the cards fetch `tag.txt` / `description.txt` / `contact.txt` / `social.txt` via the browser's `fetch()`, you **must** serve over HTTP, not open `file://` directly. For local testing:

```bash
cd designed-in-montana
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Roadmap / work-in-progress

The requirements page is intentionally marked as a work in progress — the listing criteria will grow over time. Other planned improvements:

- City-level page generator (auto-create town pages from manifest)
- Listing submission form (currently email-only)
- More detailed individual business pages (not just cards)
- RSS feed of newly added businesses
- Better county map polygons (currently stylized, not geographic)
