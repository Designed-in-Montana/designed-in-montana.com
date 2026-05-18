/* =========================================================================
   Designed in Montana — Business Card Loader & Search
   ---------------------------------------------------------------------------
   Loads each business's flat-file data (tag.txt, description.txt,
   contact.txt, social.txt, logo.png) at runtime and renders cards.
   Powers the global search by name, county, town, and tags.
   ========================================================================= */

/** SVG icon library (centralized so cards stay tidy) */
const ICONS = {
  facebook:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.05-.41-2.22C2.18 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.18 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.34 4.14.63c-.79.31-1.46.72-2.13 1.39C1.34 2.68.93 3.35.62 4.14.34 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.27 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.29 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.27 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.29-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.27-2.15-.56-2.91-.31-.79-.72-1.46-1.39-2.13C21.32 1.34 20.65.93 19.86.62c-.76-.29-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>',
  threads:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.46 11.13c-.07-.04-.15-.07-.23-.1-.13-2.42-1.45-3.8-3.66-3.82h-.03c-1.32 0-2.42.56-3.1 1.59l1.21.83c.5-.76 1.29-.92 1.89-.92h.02c.74 0 1.31.22 1.66.65.26.31.43.74.5 1.28-.58-.1-1.2-.13-1.87-.09-1.88.11-3.09 1.21-3.01 2.74.04.78.43 1.45 1.09 1.88.56.37 1.29.55 2.04.51 1-.05 1.79-.43 2.34-1.13.42-.53.69-1.21.81-2.06.5.3.87.7 1.07 1.18.35.81.37 2.13-.7 3.2-.94.94-2.07 1.34-3.79 1.36-1.9-.01-3.34-.62-4.28-1.81-.88-1.12-1.34-2.73-1.36-4.79.02-2.06.48-3.67 1.36-4.79.94-1.19 2.38-1.8 4.28-1.81 1.91.01 3.38.62 4.36 1.83.48.6.85 1.34 1.08 2.22l1.4-.37c-.29-1.08-.74-2.01-1.34-2.77-1.26-1.55-3.1-2.35-5.49-2.36h-.01c-2.38.02-4.21.81-5.43 2.37C5.42 7.45 4.84 9.34 4.82 11.99v.01c.02 2.65.6 4.54 1.74 5.99 1.22 1.55 3.05 2.35 5.43 2.37h.01c2.12-.01 3.61-.57 4.84-1.79 1.61-1.61 1.56-3.63.93-4.88-.34-.66-.91-1.18-1.71-1.55h.4z"/></svg>',
  x:         '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  pinterest: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.16-.11-.95-.2-2.4.04-3.43.21-.93 1.39-5.92 1.39-5.92s-.36-.71-.36-1.76c0-1.65.96-2.88 2.15-2.88 1.02 0 1.51.76 1.51 1.68 0 1.02-.65 2.55-.99 3.97-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.75-2.24 3.75-5.47 0-2.86-2.06-4.86-5-4.86-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.13.89 2.73.1.12.11.22.08.34-.09.37-.29 1.19-.33 1.36-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.78 2.75-7.25 7.92-7.25 4.16 0 7.39 2.96 7.39 6.92 0 4.13-2.6 7.45-6.22 7.45-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.34-1.49 3.13C9.57 23.81 10.77 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg>',
  reddit:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72l1.25-3.9 3.3.75c0 .98.8 1.78 1.78 1.78s1.78-.8 1.78-1.78c0-.97-.8-1.77-1.78-1.77-.7 0-1.31.42-1.59 1.03l-3.6-.84-1.51 4.7c-2.35.07-4.5.7-6.16 1.72C5.41 8.98 4.5 8.5 3.55 8.5c-1.65 0-3 1.35-3 3 0 1.06.55 2 1.4 2.55-.01.18-.02.36-.02.55 0 3.4 4.13 6.16 9.07 6.16s9.07-2.76 9.07-6.16c0-.18-.01-.36-.03-.54.81-.55 1.36-1.49 1.36-2.55v-.01zM7 13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9.13 4.3c-1.13 1.13-3.3 1.22-3.93 1.22s-2.8-.08-3.94-1.22a.43.43 0 0 1 0-.6.42.42 0 0 1 .6 0c.72.72 2.25.97 3.34.97s2.6-.25 3.34-.97a.42.42 0 0 1 .6 0c.16.16.16.43-.01.6zm-.42-2.3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>',
  tiktok:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.36a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.79z"/></svg>',
  globe:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  map:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  phone:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>',
  mail:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
};

/**
 * Parse a simple key: value text file into an object.
 * Lines starting with # are comments. Blank lines ignored.
 */
function parseKeyValue(text) {
  const out = {};
  text.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf(':');
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim().toLowerCase();
    const value = trimmed.slice(idx + 1).trim();
    if (key && value) out[key] = value;
  });
  return out;
}

/** Parse tags file: comma- or newline-separated */
function parseTags(text) {
  return text.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
}

/** Fetch a text file; return '' if missing */
async function fetchText(path) {
  try {
    const r = await fetch(path);
    if (!r.ok) return '';
    return await r.text();
  } catch { return ''; }
}

/** Load all metadata files for a single business folder */
async function loadBusiness(entry) {
  const base = entry.folder;
  const [tagsTxt, descTxt, contactTxt, socialTxt] = await Promise.all([
    fetchText(`${base}/tag.txt`),
    fetchText(`${base}/description.txt`),
    fetchText(`${base}/contact.txt`),
    fetchText(`${base}/social.txt`)
  ]);

  return {
    ...entry,
    tags: parseTags(tagsTxt),
    description: descTxt.trim(),
    contact: parseKeyValue(contactTxt),
    social:  parseKeyValue(socialTxt),
    logo: `${base}/logo.png`
  };
}

/** Load every business referenced in window.BUSINESSES */
async function loadAllBusinesses() {
  if (!window.BUSINESSES) return [];
  return Promise.all(window.BUSINESSES.map(loadBusiness));
}

/** Build a single business card element from a loaded business object */
function buildCard(biz) {
  const card = document.createElement('article');
  card.className = 'biz-card';

  // ---- Image (click → website) ----
  const websiteUrl = biz.contact.url || biz.contact.website || '#';
  const imgWrap = document.createElement(websiteUrl !== '#' ? 'a' : 'div');
  imgWrap.className = 'biz-card-img';
  if (websiteUrl !== '#') {
    imgWrap.href = websiteUrl;
    imgWrap.target = '_blank';
    imgWrap.rel = 'noopener';
    imgWrap.setAttribute('aria-label', `${biz.name} website`);
  }
  const img = document.createElement('img');
  img.src = biz.logo;
  img.alt = `${biz.name} logo`;
  img.loading = 'lazy';
  img.onerror = () => {
    // Graceful fallback if logo.png is missing
    img.style.display = 'none';
    imgWrap.style.display = 'flex';
    imgWrap.style.alignItems = 'center';
    imgWrap.style.justifyContent = 'center';
    imgWrap.style.color = 'var(--fg-muted)';
    imgWrap.style.fontFamily = 'var(--font-display)';
    imgWrap.style.fontSize = '22px';
    imgWrap.textContent = biz.name.charAt(0);
  };
  imgWrap.appendChild(img);
  card.appendChild(imgWrap);

  // ---- Body ----
  const body = document.createElement('div');
  body.className = 'biz-card-body';

  const nameEl = document.createElement('h3');
  nameEl.className = 'biz-card-name';
  nameEl.textContent = biz.name;
  body.appendChild(nameEl);

  const locEl = document.createElement('div');
  locEl.className = 'biz-card-loc';
  locEl.textContent = `${biz.townLabel} · ${biz.countyLabel} County`;
  body.appendChild(locEl);

  if (biz.description) {
    const descEl = document.createElement('p');
    descEl.className = 'biz-card-desc';
    descEl.textContent = biz.description;
    body.appendChild(descEl);
  }

  // ---- Social row ----
  const socialPlatforms = ['facebook', 'instagram', 'threads', 'x', 'pinterest', 'reddit', 'tiktok'];
  const socialRow = document.createElement('div');
  socialRow.className = 'biz-socials';
  let hasSocials = false;
  socialPlatforms.forEach(platform => {
    const url = biz.social[platform];
    if (!url) return;
    hasSocials = true;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', platform);
    a.innerHTML = ICONS[platform];
    socialRow.appendChild(a);
  });
  if (hasSocials) body.appendChild(socialRow);

  // ---- Contact list (address → maps, phone → tel, email → mailto) ----
  const list = document.createElement('ul');
  list.className = 'biz-contact';

  if (biz.contact.address) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.contact.address)}`;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `${ICONS.map}<span>${biz.contact.address}</span>`;
    li.appendChild(a);
    list.appendChild(li);
  }
  if (biz.contact.phone) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const telDigits = biz.contact.phone.replace(/[^\d+]/g, '');
    a.href = `tel:${telDigits}`;
    a.innerHTML = `${ICONS.phone}<span>${biz.contact.phone}</span>`;
    li.appendChild(a);
    list.appendChild(li);
  }
  if (biz.contact.email) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `mailto:${biz.contact.email}`;
    a.innerHTML = `${ICONS.mail}<span>${biz.contact.email}</span>`;
    li.appendChild(a);
    list.appendChild(li);
  }
  if (list.children.length) body.appendChild(list);

  card.appendChild(body);
  return card;
}

/**
 * Filter a list of loaded businesses by a free-text query.
 * Matches on: name, county, town, region, and tags.
 */
function filterBusinesses(list, query) {
  if (!query) return list;
  const q = query.toLowerCase().trim();
  return list.filter(b => {
    if (b.name.toLowerCase().includes(q)) return true;
    if (b.countyLabel.toLowerCase().includes(q)) return true;
    if (b.county.toLowerCase().includes(q)) return true;
    if (b.townLabel.toLowerCase().includes(q)) return true;
    if (b.town.toLowerCase().includes(q)) return true;
    if (b.regionLabel.toLowerCase().includes(q)) return true;
    if (b.region.toLowerCase().includes(q)) return true;
    if (b.tags.some(t => t.toLowerCase().includes(q))) return true;
    if ((b.description || '').toLowerCase().includes(q)) return true;
    return false;
  });
}

/** Render an array of businesses into a grid container */
function renderCards(container, businesses) {
  container.innerHTML = '';
  if (!businesses.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `<h3>Nothing matches yet</h3><p>Try a different town, county, or tag — or browse by region.</p>`;
    container.appendChild(empty);
    return;
  }
  businesses.forEach((b, i) => {
    const card = buildCard(b);
    card.style.animationDelay = `${i * 60}ms`;
    card.classList.add('fade-in');
    container.appendChild(card);
  });
}

// Expose for page scripts
window.MTBiz = {
  loadAllBusinesses,
  filterBusinesses,
  renderCards,
  buildCard
};
