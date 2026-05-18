/* =========================================================================
   Designed in Montana — County & City Geography (real geometry)
   ---------------------------------------------------------------------------
   buildCountyMap(target, regionId)
       Renders the region's slice of Montana with each county a clickable
       polygon, plus the rest of MT in muted tone for context.
   buildCityMap(target, regionId, countyId)
       Renders one county filled, with dot markers for known cities.

   Real county boundaries come from window.MT_GEO_DATA (TIGER public-domain
   data, loaded by mt-geo-data.js). City dot coordinates are still
   hand-placed — add them inside the county's `cities` array when you
   create a new town page.
   ========================================================================= */

window.MT_GEOGRAPHY = {

  glacier: {
    label: 'Glacier',
    sublabel: 'Glacier Country',
    color: '#e8c5cc',
    counties: [
      { id: 'flathead', label: 'Flathead', cities: [] },
      { id: 'glacier',  label: 'Glacier',  cities: [] },
      { id: 'lake',     label: 'Lake',     cities: [] },
      { id: 'lincoln',  label: 'Lincoln',  cities: [] },
      { id: 'mineral',  label: 'Mineral',  cities: [] },
      { id: 'missoula', label: 'Missoula', cities: [] },
      { id: 'ravalli',  label: 'Ravalli',  cities: [] },
      { id: 'sanders',  label: 'Sanders',  cities: [] }
    ]
  },

  southwest: {
    label: 'Southwest Montana',
    sublabel: 'Gold West Country',
    color: '#d4a5b8',
    counties: [
      { id: 'beaverhead',      label: 'Beaverhead',    cities: [] },
      { id: 'broadwater',      label: 'Broadwater',    cities: [] },
      { id: 'deer-lodge',      label: 'Deer Lodge',    cities: [] },
      { id: 'gallatin',        label: 'Gallatin',      cities: [] },
      { id: 'granite',         label: 'Granite',       cities: [] },
      { id: 'jefferson',       label: 'Jefferson',     cities: [] },
      { id: 'lewis-and-clark', label: 'Lewis & Clark', cities: [] },
      { id: 'madison',         label: 'Madison',       cities: [] },
      { id: 'powell',          label: 'Powell',        cities: [] },
      { id: 'silver-bow',      label: 'Silver Bow',    cities: [] }
    ]
  },

  central: {
    label: 'Central Montana',
    sublabel: 'Central Montana',
    color: '#bcd1e8',
    counties: [
      { id: 'blaine',        label: 'Blaine',        cities: [] },
      { id: 'cascade',       label: 'Cascade',       cities: [] },
      { id: 'chouteau',      label: 'Chouteau',      cities: [] },
      { id: 'fergus',        label: 'Fergus',        cities: [] },
      { id: 'golden-valley', label: 'Golden Valley', cities: [] },
      { id: 'hill',          label: 'Hill',          cities: [] },
      { id: 'judith-basin',  label: 'Judith Basin',  cities: [] },
      { id: 'liberty',       label: 'Liberty',       cities: [] },
      { id: 'meagher',       label: 'Meagher',       cities: [] },
      { id: 'musselshell',   label: 'Musselshell',   cities: [] },
      { id: 'petroleum',     label: 'Petroleum',     cities: [] },
      { id: 'pondera',       label: 'Pondera',       cities: [] },
      { id: 'teton',         label: 'Teton',
        // ⬇ Add city dots here. lat/lon are projected to county SVG coords.
        cities: [
          { id: 'fairfield', label: 'Fairfield', lat: 47.6155, lon: -111.9982 },
          { id: 'choteau',   label: 'Choteau',   lat: 47.8125, lon: -112.1828 },
          { id: 'dutton',    label: 'Dutton',    lat: 47.8443, lon: -111.7066 }
        ]
      },
      { id: 'toole',         label: 'Toole',         cities: [] },
      { id: 'wheatland',     label: 'Wheatland',     cities: [] }
    ]
  },

  'missouri-river': {
    label: 'Missouri River',
    sublabel: 'North East',
    color: '#a3b88f',
    counties: [
      { id: 'daniels',   label: 'Daniels',   cities: [] },
      { id: 'dawson',    label: 'Dawson',    cities: [] },
      { id: 'garfield',  label: 'Garfield',  cities: [] },
      { id: 'mccone',    label: 'McCone',    cities: [] },
      { id: 'phillips',  label: 'Phillips',  cities: [] },
      { id: 'prairie',   label: 'Prairie',   cities: [] },
      { id: 'richland',  label: 'Richland',  cities: [] },
      { id: 'roosevelt', label: 'Roosevelt', cities: [] },
      { id: 'sheridan',  label: 'Sheridan',  cities: [] },
      { id: 'valley',    label: 'Valley',    cities: [] }
    ]
  },

  yellowstone: {
    label: 'Yellowstone',
    sublabel: 'South Central',
    color: '#f0e0a8',
    counties: [
      { id: 'big-horn',    label: 'Big Horn',    cities: [] },
      { id: 'carbon',      label: 'Carbon',      cities: [] },
      { id: 'park',        label: 'Park',        cities: [] },
      { id: 'stillwater',  label: 'Stillwater',  cities: [] },
      { id: 'sweet-grass', label: 'Sweet Grass', cities: [] },
      { id: 'yellowstone', label: 'Yellowstone', cities: [] }
    ]
  },

  southeast: {
    label: 'Southeast Montana',
    sublabel: 'Custer Country',
    color: '#f5e1c0',
    counties: [
      { id: 'carter',       label: 'Carter',       cities: [] },
      { id: 'custer',       label: 'Custer',       cities: [] },
      { id: 'fallon',       label: 'Fallon',       cities: [] },
      { id: 'powder-river', label: 'Powder River', cities: [] },
      { id: 'rosebud',      label: 'Rosebud',      cities: [] },
      { id: 'treasure',     label: 'Treasure',     cities: [] },
      { id: 'wibaux',       label: 'Wibaux',       cities: [] }
    ]
  }
};

/** Compute bounding box of an SVG path's M/L coordinates */
function _pathBBox(d) {
  const nums = d.match(/-?\d+(?:\.\d+)?/g) || [];
  if (nums.length < 2) return null;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < nums.length - 1; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i + 1]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { minX, maxX, minY, maxY };
}

/**
 * Render a county-level map for a given region.
 * Each county is its own clickable polygon → /businesses/<region>/<county>/
 */
function buildCountyMap(target, regionId) {
  if (!window.MT_GEO_DATA) {
    target.innerHTML = '<p style="padding:40px;text-align:center;color:var(--fg-muted);">Map geometry not loaded.</p>';
    return;
  }
  const region = window.MT_GEOGRAPHY[regionId];
  if (!region) {
    target.innerHTML = '<p style="padding:40px;text-align:center;color:var(--fg-muted);">Region not found.</p>';
    return;
  }

  const { viewBox, counties: allCounties } = window.MT_GEO_DATA;
  const inRegion = allCounties.filter(c => c.region === regionId);

  // Other counties drawn muted, for context
  const otherPaths = allCounties
    .filter(c => c.region !== regionId)
    .map(c => `<path d="${c.d}" fill="#ebe4d2" stroke="#dcd3bf" stroke-width="0.5" opacity="0.45" pointer-events="none"/>`)
    .join('');

  // Each region county has its own fill (slight variation for visual interest)
  // and is its own clickable link
  const baseColor = region.color;
  const countyPaths = inRegion.map((c, i) => {
    const variation = 0.6 + (i % 5) * 0.08;
    // Adjust label size so the rendered text fits inside the county width.
    // Approximate text width: characters × (font-size × 0.55 for serif caps mixed)
    const bb = _pathBBox(c.d);
    const w = bb.maxX - bb.minX;
    const charW = 0.55;
    const maxFs = 10;
    const minFs = 4.5;
    // size so that name fits within ~85% of county width
    const idealFs = (w * 0.85) / (c.name.length * charW);
    const fs = Math.max(minFs, Math.min(maxFs, idealFs));
    return `
      <a href="/businesses/${regionId}/${c.slug}/" class="county-link" data-county="${c.slug}">
        <path d="${c.d}"
              fill="${baseColor}"
              fill-opacity="${variation.toFixed(2)}"
              stroke="#f5f1e8"
              stroke-width="1"
              class="county-shape"/>
        <text x="${c.cx}" y="${c.cy}"
              text-anchor="middle"
              font-family="Fraunces, serif" font-size="${fs.toFixed(2)}" font-weight="600"
              fill="#ffffff" pointer-events="none"
              style="paint-order: stroke; stroke: rgba(33,57,31,0.5); stroke-width: ${(fs * 0.18).toFixed(2)}px; stroke-linejoin: round;">${c.name}</text>
      </a>
    `;
  }).join('');

  target.innerHTML = `
    <svg class="map-svg" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Counties in ${region.label}">
      <defs>
        <filter id="countyshadow"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#21391f" flood-opacity="0.12"/></filter>
        <style>
          .county-link { cursor: pointer; }
          .county-link:hover .county-shape { fill-opacity: 1; }
        </style>
      </defs>
      <g filter="url(#countyshadow)">${otherPaths}</g>
      <g filter="url(#countyshadow)">${countyPaths}</g>
    </svg>
  `;
}

/**
 * Project a lat/lon coordinate into the global MT SVG coordinate system.
 * Mirrors the projection used by the geo-data generator:
 * lon ∈ [-116.051, -104.041], lat ∈ [44.358, 49.001]
 * viewBox 1000×540, padding 30, cos(mid_lat) horizontal correction.
 */
const _PROJ = {
  lonMin: -116.051, lonMax: -104.041,
  latMin: 44.358,   latMax: 49.001,
  vbW: 1000, vbH: 540, padding: 30
};
function _projectLatLon(lat, lon) {
  const midLat = (_PROJ.latMin + _PROJ.latMax) / 2;
  const cosLat = Math.cos(midLat * Math.PI / 180);
  const adjLonRange = (_PROJ.lonMax - _PROJ.lonMin) * cosLat;
  const adjLatRange = (_PROJ.latMax - _PROJ.latMin);
  const innerW = _PROJ.vbW - _PROJ.padding * 2;
  const innerH = _PROJ.vbH - _PROJ.padding * 2;
  const scale = Math.min(innerW / adjLonRange, innerH / adjLatRange);
  const projW = adjLonRange * scale;
  const projH = adjLatRange * scale;
  const offsetX = _PROJ.padding + (innerW - projW) / 2;
  const offsetY = _PROJ.padding + (innerH - projH) / 2;
  return {
    x: offsetX + (lon - _PROJ.lonMin) * cosLat * scale,
    y: offsetY + (_PROJ.latMax - lat) * scale
  };
}

/**
 * Render a single-county map zoomed in, with city dot markers.
 */
function buildCityMap(target, regionId, countyId) {
  if (!window.MT_GEO_DATA) {
    target.innerHTML = '<p style="padding:40px;text-align:center;color:var(--fg-muted);">Map geometry not loaded.</p>';
    return;
  }
  const region = window.MT_GEOGRAPHY[regionId];
  if (!region) {
    target.innerHTML = '<p style="padding:40px;text-align:center;color:var(--fg-muted);">Region not found.</p>';
    return;
  }
  const county = region.counties.find(c => c.id === countyId);
  if (!county) {
    target.innerHTML = '<p style="padding:40px;text-align:center;color:var(--fg-muted);">County not found.</p>';
    return;
  }
  const geoCounty = window.MT_GEO_DATA.counties.find(c => c.slug === countyId);
  if (!geoCounty) {
    target.innerHTML = '<p style="padding:40px;text-align:center;color:var(--fg-muted);">Geometry missing.</p>';
    return;
  }

  // Zoom viewBox to this county
  const bbox = _pathBBox(geoCounty.d);
  const pad = 20;
  const topPad = 35; // extra room above for the county title
  const vbX = bbox.minX - pad;
  const vbY = bbox.minY - topPad;
  const vbW = (bbox.maxX - bbox.minX) + pad * 2;
  const vbH = (bbox.maxY - bbox.minY) + topPad + pad;

  const cityMarkup = (county.cities || []).map(city => {
    const { x, y } = _projectLatLon(city.lat, city.lon);
    // Dot/text sizing — county-zoom viewBox is small (~20-80 units) so the
    // SVG renders text at large effective px. Use small numeric values.
    const r1 = Math.max(1.5, vbW * 0.014);
    const r2 = Math.max(4, vbW * 0.035);
    const sw = Math.max(0.5, vbW * 0.005);
    const fs = Math.max(3, vbW * 0.025);
    return `
      <a href="/businesses/${regionId}/${countyId}/${city.id}/" class="city-link">
        <circle cx="${x}" cy="${y}" r="${r2}" fill="#c89545" fill-opacity="0.15"/>
        <circle cx="${x}" cy="${y}" r="${r1}" fill="#c89545" stroke="#f5f1e8" stroke-width="${sw}"/>
        <text x="${x}" y="${y - r2 - fs * 0.2}"
              text-anchor="middle"
              font-family="Fraunces, serif" font-size="${fs}" font-weight="600"
              fill="#2a2a26">${city.label}</text>
      </a>
    `;
  }).join('');

  const empty = !(county.cities || []).length;
  const titleX = bbox.minX + (bbox.maxX - bbox.minX) / 2;
  // Position title ABOVE the county polygon (in the padding zone) so it never gets clipped by the shape
  const titleY = bbox.minY - Math.max(4, vbH * 0.025);
  const titleSize = Math.max(2.5, vbW * 0.028);

  target.innerHTML = `
    <svg class="map-svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cities in ${county.label} County">
      <defs>
        <filter id="cityshadow"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#21391f" flood-opacity="0.15"/></filter>
        <style>
          .city-link { cursor: pointer; }
          .city-link:hover circle:first-of-type { fill: #b06a3b; }
        </style>
      </defs>
      <text x="${titleX}" y="${titleY}"
            text-anchor="middle"
            font-family="Fraunces, serif" font-size="${titleSize}" font-weight="700"
            fill="#21391f" letter-spacing="0.08em">${county.label.toUpperCase()} COUNTY</text>
      <g filter="url(#cityshadow)">
        <path d="${geoCounty.d}" fill="${region.color}" fill-opacity="0.75" stroke="#f5f1e8" stroke-width="${Math.max(1.5, vbW * 0.005)}"/>
      </g>
      ${cityMarkup}
      ${empty ? `<text x="${titleX}" y="${bbox.minY + (bbox.maxY-bbox.minY)/2 + 2}"
                  text-anchor="middle"
                  font-family="Inter Tight, sans-serif" font-size="${Math.max(2.5, vbW * 0.022)}"
                  fill="rgba(245,241,232,0.85)">Cities coming soon</text>` : ''}
    </svg>
  `;
}

window.buildCountyMap = buildCountyMap;
window.buildCityMap   = buildCityMap;
