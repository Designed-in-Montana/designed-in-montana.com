/* =========================================================================
   Designed in Montana — County & City Geography
   ---------------------------------------------------------------------------
   Stylized county shapes within each region, plus city dot locations.
   Coordinates are in each map's 1000x600 viewBox — not real lat/lng,
   but laid out geographically. Edit cities[] inside any county to add
   labeled dots as you start filling in town pages.
   ========================================================================= */

window.MT_GEOGRAPHY = {

  // -------------- SOUTHWEST (Gold West Country) --------------
  southwest: {
    label: 'Southwest Montana',
    sublabel: 'Gold West Country',
    color: '#3b5d3a',
    counties: [
      { id: 'beaverhead',      label: 'Beaverhead',       points: '60,400 60,560 320,560 340,500 320,440 280,400 220,380 160,380 100,390', cities: [] },
      { id: 'madison',         label: 'Madison',          points: '320,440 340,500 320,560 460,560 480,500 460,440 420,400 380,400', cities: [] },
      { id: 'gallatin',        label: 'Gallatin',         points: '460,440 480,500 460,560 620,560 640,500 620,440 580,400 520,400', cities: [] },
      { id: 'silver-bow',      label: 'Silver Bow',       points: '220,380 280,400 320,400 320,360 280,340 240,340 200,360', cities: [] },
      { id: 'deer-lodge',      label: 'Deer Lodge',       points: '160,300 240,300 240,340 200,360 160,360 140,340', cities: [] },
      { id: 'granite',         label: 'Granite',          points: '60,260 160,260 160,300 140,340 100,360 60,340', cities: [] },
      { id: 'powell',          label: 'Powell',           points: '60,140 240,140 280,180 280,260 240,300 160,300 160,260 60,260', cities: [] },
      { id: 'lewis-and-clark', label: 'Lewis & Clark',    points: '240,80 460,80 480,180 460,240 380,260 320,240 280,260 280,180 240,140', cities: [] },
      { id: 'jefferson',       label: 'Jefferson',        points: '280,260 320,240 380,260 420,300 420,360 380,400 320,400 320,360 280,340 280,260', cities: [] },
      { id: 'broadwater',      label: 'Broadwater',       points: '380,260 460,240 480,180 540,200 540,280 500,320 420,300 380,260', cities: [] }
    ]
  },

  // -------------- CENTRAL --------------
  central: {
    label: 'Central Montana',
    sublabel: 'Central Montana',
    color: '#6b8a4a',
    counties: [
      { id: 'teton',         label: 'Teton',         points: '80,80 240,80 240,200 80,200',
        cities: [
          { id: 'fairfield', label: 'Fairfield', x: 145, y: 150 },
          { id: 'choteau',   label: 'Choteau',   x: 120, y: 110 },
          { id: 'dutton',    label: 'Dutton',    x: 200, y: 165 }
        ] },
      { id: 'cascade',       label: 'Cascade',       points: '240,80 440,80 440,220 320,240 240,200', cities: [] },
      { id: 'chouteau',      label: 'Chouteau',      points: '440,80 700,80 700,220 540,220 440,220', cities: [] },
      { id: 'judith-basin',  label: 'Judith Basin',  points: '440,220 540,220 540,360 440,360',     cities: [] },
      { id: 'fergus',        label: 'Fergus',        points: '540,220 700,220 700,360 540,360',     cities: [] },
      { id: 'petroleum',     label: 'Petroleum',     points: '700,220 860,220 860,360 700,360',     cities: [] },
      { id: 'meagher',       label: 'Meagher',       points: '240,200 320,240 360,360 240,360 240,200', cities: [] },
      { id: 'wheatland',     label: 'Wheatland',     points: '360,360 440,360 440,500 360,500',     cities: [] },
      { id: 'golden-valley', label: 'Golden Valley', points: '440,360 540,360 540,500 440,500',     cities: [] },
      { id: 'musselshell',   label: 'Musselshell',   points: '540,360 700,360 700,500 540,500',     cities: [] }
    ]
  },

  // -------------- MISSOURI RIVER (Northeast) --------------
  'missouri-river': {
    label: 'Missouri River Country',
    sublabel: 'Northeast Plains',
    color: '#4a6c8c',
    counties: [
      { id: 'phillips',  label: 'Phillips',  points: '60,80 260,80 260,260 60,260', cities: [] },
      { id: 'valley',    label: 'Valley',    points: '260,80 480,80 480,260 260,260', cities: [] },
      { id: 'daniels',   label: 'Daniels',   points: '480,80 640,80 640,180 480,180', cities: [] },
      { id: 'sheridan',  label: 'Sheridan',  points: '640,80 800,80 800,260 640,260 640,180 480,180 480,260 640,260', cities: [] },
      { id: 'roosevelt', label: 'Roosevelt', points: '480,260 800,260 800,380 480,380', cities: [] },
      { id: 'mccone',    label: 'McCone',    points: '260,260 480,260 480,380 260,380', cities: [] },
      { id: 'garfield',  label: 'Garfield',  points: '60,260 260,260 260,440 60,440', cities: [] },
      { id: 'richland',  label: 'Richland',  points: '640,380 800,380 800,540 640,540', cities: [] },
      { id: 'dawson',    label: 'Dawson',    points: '460,380 640,380 640,540 460,540', cities: [] },
      { id: 'prairie',   label: 'Prairie',   points: '260,440 460,440 460,540 260,540', cities: [] }
    ]
  },

  // -------------- YELLOWSTONE (South Central) --------------
  yellowstone: {
    label: 'Yellowstone Country',
    sublabel: 'South Central Montana',
    color: '#b06a3b',
    counties: [
      { id: 'park',        label: 'Park',         points: '60,180 240,180 240,420 60,420', cities: [] },
      { id: 'sweet-grass', label: 'Sweet Grass',  points: '240,180 400,180 400,400 240,400', cities: [] },
      { id: 'stillwater',  label: 'Stillwater',   points: '400,180 600,180 600,400 400,400', cities: [] },
      { id: 'carbon',      label: 'Carbon',       points: '240,400 460,400 460,540 240,540', cities: [] },
      { id: 'yellowstone', label: 'Yellowstone',  points: '600,180 880,180 880,420 600,420', cities: [] },
      { id: 'big-horn',    label: 'Big Horn',     points: '460,400 880,420 880,540 460,540', cities: [] }
    ]
  },

  // -------------- SOUTHEAST (Custer Country) --------------
  southeast: {
    label: 'Southeast Montana',
    sublabel: 'Custer Country',
    color: '#c89545',
    counties: [
      { id: 'rosebud',      label: 'Rosebud',      points: '60,80 320,80 320,360 60,360', cities: [] },
      { id: 'treasure',     label: 'Treasure',     points: '60,360 220,360 220,500 60,500', cities: [] },
      { id: 'custer',       label: 'Custer',       points: '320,80 540,80 540,360 320,360', cities: [] },
      { id: 'powder-river', label: 'Powder River', points: '320,360 540,360 540,540 320,540', cities: [] },
      { id: 'fallon',       label: 'Fallon',       points: '540,80 720,80 720,260 540,260', cities: [] },
      { id: 'wibaux',       label: 'Wibaux',       points: '720,80 860,80 860,260 720,260', cities: [] },
      { id: 'carter',       label: 'Carter',       points: '540,260 860,260 860,540 540,540', cities: [] }
    ]
  }

};

/**
 * Render a county map for a given region into a target element.
 * Each county is clickable → links to /businesses/<region>/<county>/.
 */
function buildCountyMap(target, regionId) {
  const region = window.MT_GEOGRAPHY[regionId];
  if (!region) {
    target.innerHTML = '<p style="padding:40px; text-align:center; color:var(--fg-muted);">Region not found.</p>';
    return;
  }

  const html = `
    <svg class="map-svg" viewBox="0 0 920 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Counties in ${region.label}">
      <defs>
        <filter id="countyshadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#21391f" flood-opacity="0.12"/>
        </filter>
      </defs>
      <g filter="url(#countyshadow)">
        ${region.counties.map((c, i) => `
          <a href="/businesses/${regionId}/${c.id}/" class="county-link">
            <polygon
              points="${c.points}"
              fill="${region.color}"
              fill-opacity="${0.55 + (i % 4) * 0.1}"
              stroke="#f5f1e8"
              stroke-width="2"
              class="region-shape"/>
            <text class="region-label"
                  x="${getCentroid(c.points).x}"
                  y="${getCentroid(c.points).y}"
                  font-size="12">${c.label}</text>
          </a>
        `).join('')}
      </g>
    </svg>
  `;
  target.innerHTML = html;
}

/**
 * Render a city dots map for a given county into a target element.
 */
function buildCityMap(target, regionId, countyId) {
  const region = window.MT_GEOGRAPHY[regionId];
  if (!region) {
    target.innerHTML = '<p style="padding:40px; text-align:center; color:var(--fg-muted);">Region not found.</p>';
    return;
  }
  const county = region.counties.find(c => c.id === countyId);
  if (!county) {
    target.innerHTML = '<p style="padding:40px; text-align:center; color:var(--fg-muted);">County not found.</p>';
    return;
  }

  // Compute county bounding box so we can fill the SVG
  const pts = county.points.split(/\s+/).map(p => p.split(',').map(Number));
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);

  const cityDots = (county.cities || []).map(city => `
    <a href="/businesses/${regionId}/${countyId}/${city.id}/" class="city-link">
      <circle cx="${city.x}" cy="${city.y}" r="7" fill="#c89545" stroke="#f5f1e8" stroke-width="2"/>
      <circle cx="${city.x}" cy="${city.y}" r="14" fill="#c89545" fill-opacity="0.15"/>
      <text x="${city.x}" y="${city.y - 16}"
            text-anchor="middle"
            font-family="Fraunces, serif" font-size="13" font-weight="600"
            fill="#2a2a26">${city.label}</text>
    </a>
  `).join('');

  const empty = (county.cities || []).length === 0;

  target.innerHTML = `
    <svg class="map-svg" viewBox="${minX - 30} ${minY - 30} ${(maxX - minX) + 60} ${(maxY - minY) + 60}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cities in ${county.label} County">
      <defs>
        <filter id="cityshadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#21391f" flood-opacity="0.12"/>
        </filter>
      </defs>
      <g filter="url(#cityshadow)">
        <polygon points="${county.points}" fill="${region.color}" fill-opacity="0.6" stroke="#f5f1e8" stroke-width="2"/>
        <text x="${(minX + maxX) / 2}" y="${minY + 18}" text-anchor="middle"
              font-family="Fraunces, serif" font-size="14" font-weight="600" fill="#f5f1e8" letter-spacing="0.05em">
          ${county.label.toUpperCase()} COUNTY
        </text>
      </g>
      ${cityDots}
      ${empty ? `<text x="${(minX + maxX) / 2}" y="${(minY + maxY) / 2 + 10}" text-anchor="middle"
                  font-family="Inter Tight, sans-serif" font-size="13" fill="rgba(245,241,232,0.85)">
                  Cities coming soon
                </text>` : ''}
    </svg>
  `;
}

/** Naive centroid for label placement */
function getCentroid(points) {
  const pts = points.split(/\s+/).map(p => p.split(',').map(Number));
  const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  return { x, y: y + 4 };
}

window.buildCountyMap = buildCountyMap;
window.buildCityMap   = buildCityMap;
