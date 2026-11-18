// Small, framework-free interactions for the MercyMed student prototype.
// No patient data is submitted to a server or stored in the browser.
(function () {
  'use strict';
  const doc = document.documentElement;
  const validLangs = ['en', 'ru', 'ky'];
  let lang = 'en';
  try {
    const stored = localStorage.getItem('mm-lang');
    if (validLangs.includes(stored)) lang = stored;
  } catch (_) {}

  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const moreMenu = document.querySelector('.nav-more');

  function setMenuOpen(opening) {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', menuButton.dataset['aria' + lang[0].toUpperCase() + lang.slice(1)] || menuButton.dataset.ariaEn || 'Menu');
    menuButton.querySelector('.menu-lines').textContent = opening ? '✕' : '☰';
    if (opening) {
      const labels = { en:'Close menu', ru:'Закрыть меню', ky:'Менюну жабуу' };
      menuButton.setAttribute('aria-label', labels[lang]);
    }
  }

  function applyLanguage(next) {
    if (!validLangs.includes(next)) return;
    lang = next;
    doc.dataset.lang = next;
    doc.lang = next;
    document.querySelectorAll('.tr').forEach(el => {
      if (el.dataset[next] !== undefined) el.textContent = el.dataset[next];
    });
    document.querySelectorAll('option[data-en]').forEach(el => {
      if (el.dataset[next] !== undefined) el.textContent = el.dataset[next];
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
    const notice = document.querySelector('.ky-notice');
    if (notice) notice.hidden = next !== 'ky';
    if (menuButton) setMenuOpen(mobileMenu && !mobileMenu.hidden);
    try { localStorage.setItem('mm-lang', next); } catch (_) {}
  }
  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => applyLanguage(b.dataset.lang)));
  applyLanguage(lang);

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => setMenuOpen(mobileMenu.hidden));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenuOpen(false)));
    window.addEventListener('resize', () => { if (window.innerWidth > 1000) setMenuOpen(false); });
  }
  if (moreMenu) {
    document.addEventListener('pointerdown', event => { if (!moreMenu.contains(event.target)) moreMenu.open = false; });
  }
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (moreMenu && moreMenu.open) {
      moreMenu.open = false;
      moreMenu.querySelector('summary')?.focus();
    }
    if (mobileMenu && !mobileMenu.hidden) {
      setMenuOpen(false);
      menuButton?.focus();
    }
  });

  const filters = document.querySelectorAll('.filter-btn');
  if (filters.length) {
    filters.forEach(btn => btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      document.querySelectorAll('.team-member').forEach(member => {
        member.hidden = category !== 'all' && member.dataset.specialty !== category;
      });
    }));
  }

  const demoForm = document.getElementById('demo-booking');
  const demoSuccess = document.getElementById('demo-success');
  if (demoForm && demoSuccess) {
    demoForm.addEventListener('submit', event => {
      event.preventDefault();
      demoForm.reset();
      demoForm.hidden = true;
      demoSuccess.hidden = false;
      demoSuccess.focus({ preventScroll: true });
    });
    document.getElementById('demo-again')?.addEventListener('click', () => {
      demoSuccess.hidden = true;
      demoForm.hidden = false;
      demoForm.querySelector('select')?.focus();
    });
  }
})();
