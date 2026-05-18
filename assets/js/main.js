/* =========================================================================
   Designed in Montana — Site JavaScript
   - Loads global header/footer from /includes/ into every page
   - Manages mobile nav, search bar wiring, active link state
   - Footer year auto-update
   ========================================================================= */

/**
 * Load an HTML partial into a placeholder element.
 * Used so /includes/header.html and /includes/footer.html drive every page.
 */
async function loadPartial(selector, url) {
  const slot = document.querySelector(selector);
  if (!slot) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    slot.innerHTML = await res.text();
  } catch (err) {
    console.warn(`Could not load ${url}:`, err);
  }
}

/** Mobile nav toggle wiring (runs after header is in DOM) */
function wireMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/** Mark current nav link active based on URL */
function wireActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav a[data-nav]').forEach(a => {
    const key = a.dataset.nav;
    if (path.includes(`/${key}.html`)) a.classList.add('active');
    if (key === 'regions' && path.includes('/businesses/')) a.classList.add('active');
  });
}

/** Update footer year automatically */
function updateFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/** Header search → search page with ?q= */
function wireHeaderSearch() {
  const form = document.getElementById('header-search-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    const input = form.querySelector('input[name="q"]');
    if (!input.value.trim()) {
      e.preventDefault();
      input.focus();
    }
    // otherwise let it submit naturally to /pages/search.html?q=...
  });
}

/** Boot the global layout on every page */
document.addEventListener('DOMContentLoaded', async () => {
  // Resolve include paths relative to site root
  const headerUrl = '/includes/header.html';
  const footerUrl = '/includes/footer.html';

  await Promise.all([
    loadPartial('#site-header-slot', headerUrl),
    loadPartial('#site-footer-slot', footerUrl)
  ]);

  wireMobileNav();
  wireActiveNav();
  wireHeaderSearch();
  updateFooterYear();

  // Fire a custom event so page-specific scripts know the chrome is ready
  document.dispatchEvent(new CustomEvent('chrome:ready'));
});
