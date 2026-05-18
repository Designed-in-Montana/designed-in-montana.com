/* =========================================================================
   Designed in Montana — Region Map (real Montana geometry)
   ---------------------------------------------------------------------------
   Uses real county boundaries from US Census TIGER (loaded from
   mt-geo-data.js). The 6 regions are drawn by grouping counties that
   belong to each region with a shared fill color. All 56 counties are now assigned. (Counties outside our
   region would be drawn in a muted tone to preserve the state shape.
   ========================================================================= */

window.MT_REGIONS = [
  {
    id: 'glacier',
    label: 'Glacier',
    sublabel: 'Glacier Country',
    color: '#e8c5cc',
    description: 'Montana\'s northwest corner — anchored by Glacier National Park, Flathead Lake, the Bitterroot and Flathead valleys, and the Crown of the Continent.'
  },
  {
    id: 'southwest',
    label: 'Southwest',
    sublabel: 'Gold West Country',
    color: '#d4a5b8',
    description: 'Historic mining towns, the Continental Divide, and cities like Butte, Helena, and Bozeman.'
  },
  {
    id: 'central',
    label: 'Central',
    sublabel: 'Central Montana',
    color: '#bcd1e8',
    description: 'A wide band across the heart of the state — prairies, island mountain ranges, agriculture, and the Lewistown area.'
  },
  {
    id: 'missouri-river',
    label: 'Missouri River',
    sublabel: 'North East',
    color: '#a3b88f',
    description: 'Vast plains in the northeast, the Charles M. Russell National Wildlife Refuge, and Fort Peck Reservoir.'
  },
  {
    id: 'yellowstone',
    label: 'Yellowstone',
    sublabel: 'South Central',
    color: '#f0e0a8',
    description: 'Northern gateway to Yellowstone National Park, rugged ranges including Granite Peak, and the city of Billings.'
  },
  {
    id: 'southeast',
    label: 'Southeast',
    sublabel: 'Custer Country',
    color: '#f5e1c0',
    description: 'Rolling badlands and prairies, home to historical sites like Little Bighorn Battlefield National Monument.'
  }
];

/**
 * Label anchor points for each region (in 1000x540 viewBox).
 * Pre-tuned so labels sit on the visual center of each region.
 */
const REGION_LABEL_ANCHORS = {
  'glacier':        { x: 175, y: 175, sublabel_y: 191 },
  'southwest':      { x: 340, y: 400, sublabel_y: 416 },
  'central':        { x: 470, y: 145, sublabel_y: 161 },
  'missouri-river': { x: 790, y: 130, sublabel_y: 146 },
  'yellowstone':    { x: 540, y: 400, sublabel_y: 416 },
  'southeast':      { x: 825, y: 340, sublabel_y: 356 }
};

/**
 * Build the interactive region map into `target`.
 * Options: onHover(region), onSelect(regionId), showLabels, selectedId
 */
function buildRegionMap(target, options = {}) {
  const {
    onHover = null,
    onSelect = null,
    showLabels = true,
    selectedId = null
  } = options;

  if (!window.MT_GEO_DATA) {
    target.innerHTML = '<p style="padding:40px;color:var(--fg-muted);text-align:center;">Map geometry not loaded.</p>';
    return;
  }

  const { viewBox, counties } = window.MT_GEO_DATA;

  // Since all 56 counties are now assigned to one of 6 regions, no orphans remain.
  // (Kept this hook just in case future data has unassigned counties.)
  const otherPaths = counties
    .filter(c => !c.region)
    .map(c => `<path d="${c.d}" fill="#dcd3bf" stroke="#c8bea6" stroke-width="0.4" opacity="0.7" pointer-events="none"/>`)
    .join('');

  // Each region renders as a solid block. We dilate the region fill very
  // slightly via a thicker fill-colored stroke on every county, which makes
  // the white seams between same-region counties disappear visually — only
  // borders between *different* regions remain visible.
  const regionGroups = window.MT_REGIONS.map(region => {
    const regCounties = counties.filter(c => c.region === region.id);
    const isActive = selectedId === region.id;
    const paths = regCounties
      .map(c => `<path d="${c.d}"/>`)
      .join('');
    return `
      <g class="region-group ${isActive ? 'active' : ''}"
         data-region="${region.id}"
         fill="${region.color}"
         stroke="${region.color}"
         stroke-width="1.5"
         stroke-linejoin="round"
         style="cursor: pointer; transition: filter .25s var(--ease);">
        ${paths}
      </g>
    `;
  }).join('');

  // Region labels (Fraunces, big, with subtitle below)
  let labelMarkup = '';
  if (showLabels) {
    labelMarkup = window.MT_REGIONS.map(r => {
      const a = REGION_LABEL_ANCHORS[r.id];
      if (!a) return '';
      return `
        <g pointer-events="none">
          <text class="region-label" x="${a.x}" y="${a.y}">${r.label}</text>
          <text class="region-sub"   x="${a.x}" y="${a.sublabel_y}">${r.sublabel}</text>
        </g>
      `;
    }).join('');
  }

  target.innerHTML = `
    <svg class="map-svg" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of Montana regions">
      <defs>
        <filter id="mtshadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#21391f" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect x="20" y="20" width="960" height="500" fill="none" stroke="rgba(42,42,38,0.06)" stroke-dasharray="3 4"/>
      <g filter="url(#mtshadow)">
        ${otherPaths}
        ${regionGroups}
      </g>
      ${labelMarkup}
      <g transform="translate(940, 60)" pointer-events="none" opacity="0.55">
        <circle r="22" fill="none" stroke="rgba(42,42,38,0.25)" stroke-width="0.8"/>
        <path d="M 0 -18 L 4 0 L 0 18 L -4 0 Z" fill="#2a2a26"/>
        <path d="M -18 0 L 0 4 L 18 0 L 0 -4 Z" fill="rgba(42,42,38,0.4)"/>
        <text y="-26" text-anchor="middle" font-family="Fraunces, serif" font-size="10" font-weight="600" fill="#2a2a26">N</text>
      </g>
    </svg>
  `;

  target.querySelectorAll('.region-group').forEach(g => {
    g.addEventListener('mouseenter', () => {
      g.style.filter = 'brightness(1.12)';
      if (onHover) {
        const region = window.MT_REGIONS.find(r => r.id === g.dataset.region);
        if (region) onHover(region);
      }
    });
    g.addEventListener('mouseleave', () => {
      g.style.filter = '';
    });
    g.addEventListener('click', () => {
      if (onSelect) onSelect(g.dataset.region);
    });
  });
}

window.buildRegionMap = buildRegionMap;
