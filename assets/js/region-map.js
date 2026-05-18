/* =========================================================================
   Designed in Montana — Region Map
   ---------------------------------------------------------------------------
   Builds an interactive SVG map of Montana divided into its 5 tourism
   regions. Hovering / clicking a region surfaces details + a quick search
   link that opens the search page filtered to that region.
   ========================================================================= */

window.MT_REGIONS = [
  {
    id: 'southwest',
    label: 'Southwest',
    sublabel: 'Gold West Country',
    color: '#3b5d3a',
    description: 'Historic mining towns, the Continental Divide, and cities like Butte, Helena, and Bozeman.',
    // polygon points in a 1000x520 viewBox
    points: '40,260 40,505 360,505 380,470 395,440 380,400 360,360 350,310 340,260 320,230 290,230 260,250 220,250 180,235 140,240 100,250'
  },
  {
    id: 'central',
    label: 'Central',
    sublabel: 'Central Montana',
    color: '#6b8a4a',
    description: 'A transition zone of prairies, island mountain ranges, and agriculture centered around the Lewistown area.',
    points: '100,250 140,240 180,235 220,250 260,250 290,230 320,230 340,260 350,310 360,360 380,400 395,440 460,440 540,430 580,400 600,360 615,310 610,260 600,210 590,170 560,150 520,150 480,140 440,140 400,135 360,140 320,160 280,170 240,190 200,210 160,225 130,240'
  },
  {
    id: 'missouri-river',
    label: 'Missouri River',
    sublabel: 'Missouri River Country',
    color: '#4a6c8c',
    description: 'Vast plains in the northeast, the Charles M. Russell National Wildlife Refuge, and Fort Peck Reservoir.',
    points: '600,210 590,170 560,150 520,150 480,140 440,140 400,135 360,140 320,160 280,170 280,40 960,40 960,180 960,260 940,290 910,300 870,290 830,280 790,275 750,265 720,250 690,235 660,225 630,215'
  },
  {
    id: 'yellowstone',
    label: 'Yellowstone',
    sublabel: 'Yellowstone Country',
    color: '#b06a3b',
    description: 'Northern gateway to Yellowstone National Park, rugged ranges including Granite Peak, and the city of Billings.',
    points: '380,400 395,440 460,440 540,430 580,400 600,360 615,310 610,260 600,210 630,215 660,225 690,235 720,250 720,400 700,440 680,470 650,500 600,505 550,505 500,505 460,505 420,505 380,505 380,470 395,440'
  },
  {
    id: 'southeast',
    label: 'Southeast',
    sublabel: 'Custer Country',
    color: '#c89545',
    description: 'Rolling badlands and prairies, home to historical sites like Little Bighorn Battlefield National Monument.',
    points: '720,250 750,265 790,275 830,280 870,290 910,300 940,290 960,260 960,505 920,505 880,505 840,505 800,505 760,505 720,505 680,505 650,500 680,470 700,440 720,400'
  }
];

/**
 * Build the interactive SVG into `target` (an element).
 * Pass an `onSelect(regionId)` callback to handle clicks.
 */
function buildRegionMap(target, options = {}) {
  const {
    onSelect = null,
    showLabels = true,
    selectedId = null
  } = options;

  const svg = `
    <svg class="map-svg" viewBox="0 0 1000 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of Montana regions">
      <defs>
        <filter id="mtshadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#21391f" flood-opacity="0.18"/>
        </filter>
        <pattern id="mtgrain" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="transparent"/>
          <circle cx="1.5" cy="1.5" r="0.3" fill="rgba(255,255,255,0.12)"/>
        </pattern>
      </defs>

      <!-- Subtle backdrop frame -->
      <rect x="20" y="20" width="960" height="500" fill="none" stroke="rgba(42,42,38,0.08)" stroke-dasharray="3 4"/>

      <g filter="url(#mtshadow)">
        ${window.MT_REGIONS.map(r => `
          <g class="region-group" data-region="${r.id}">
            <polygon class="region-shape ${selectedId === r.id ? 'active' : ''}"
                     points="${r.points}"
                     fill="${r.color}"
                     data-region="${r.id}"/>
            <polygon points="${r.points}" fill="url(#mtgrain)" pointer-events="none"/>
          </g>
        `).join('')}
      </g>

      ${showLabels ? `
        <g pointer-events="none">
          <!-- Southwest -->
          <text class="region-label" x="200" y="385">Southwest</text>
          <text class="region-sub"   x="200" y="402">Gold West Country</text>

          <!-- Central -->
          <text class="region-label" x="370" y="290">Central</text>
          <text class="region-sub"   x="370" y="307">Central Montana</text>

          <!-- Missouri River -->
          <text class="region-label" x="620" y="140">Missouri River</text>
          <text class="region-sub"   x="620" y="157">Missouri River Country</text>

          <!-- Yellowstone -->
          <text class="region-label" x="555" y="465">Yellowstone</text>
          <text class="region-sub"   x="555" y="482">Yellowstone Country</text>

          <!-- Southeast -->
          <text class="region-label" x="840" y="400">Southeast</text>
          <text class="region-sub"   x="840" y="417">Custer Country</text>
        </g>
      ` : ''}

      <!-- Compass rose -->
      <g transform="translate(940, 60)" pointer-events="none" opacity="0.55">
        <circle r="22" fill="none" stroke="rgba(42,42,38,0.25)" stroke-width="0.8"/>
        <path d="M 0 -18 L 4 0 L 0 18 L -4 0 Z" fill="#2a2a26"/>
        <path d="M -18 0 L 0 4 L 18 0 L 0 -4 Z" fill="rgba(42,42,38,0.4)"/>
        <text y="-26" text-anchor="middle" font-family="Fraunces, serif" font-size="10" font-weight="600" fill="#2a2a26">N</text>
      </g>
    </svg>
  `;

  target.innerHTML = svg;

  // Wire up clicks/hovers
  target.querySelectorAll('.region-shape').forEach(shape => {
    shape.addEventListener('click', () => {
      const id = shape.dataset.region;
      if (onSelect) onSelect(id);
    });
    shape.addEventListener('mouseenter', () => {
      const id = shape.dataset.region;
      const region = window.MT_REGIONS.find(r => r.id === id);
      if (region && options.onHover) options.onHover(region);
    });
  });
}

window.buildRegionMap = buildRegionMap;
