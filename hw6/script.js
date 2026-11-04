// Small, framework-free interactions for the MercyMed HTML/CSS prototype.
// No patient data is transmitted or stored.
(function () {
  'use strict';
  const doc = document.documentElement;
  const validLangs = ['en', 'ru', 'ky'];
  let lang = 'en';
  try { const stored = localStorage.getItem('mm-lang'); if (validLangs.includes(stored)) lang = stored; } catch (_) {}

  function applyLanguage(next) {
    if (!validLangs.includes(next)) return;
    lang = next;
    doc.dataset.lang = next;
    doc.lang = next;
    document.querySelectorAll('.tr').forEach(el => {
      // Text from user-provided source; textContent prevents injected HTML.
      if (el.dataset[next] !== undefined) el.textContent = el.dataset[next];
    });
    document.querySelectorAll('option[data-en]').forEach(option => {
      if (option.dataset[next] !== undefined) option.textContent = option.dataset[next];
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
    const notice = document.querySelector('.ky-notice');
    if (notice) notice.hidden = next !== 'ky';
    try { localStorage.setItem('mm-lang', next); } catch (_) {}
  }
  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => applyLanguage(b.dataset.lang)));
  applyLanguage(lang);

  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const opening = mobileMenu.hidden;
      mobileMenu.hidden = !opening;
      menuButton.setAttribute('aria-expanded', String(opening));
      const sign = menuButton.querySelector('.menu-lines');
      if (sign) sign.textContent = opening ? '✕' : '☰';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.hidden = true;
      menuButton.setAttribute('aria-expanded','false');
    }));
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1000) { mobileMenu.hidden = true; menuButton.setAttribute('aria-expanded','false'); }
    });
  }

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
      event.preventDefault(); // Demonstration only: do not submit data.
      demoForm.reset();
      demoForm.hidden = true;
      demoSuccess.hidden = false;
      demoSuccess.focus({preventScroll:true});
    });
    document.getElementById('demo-again')?.addEventListener('click', () => {
      demoSuccess.hidden = true;
      demoForm.hidden = false;
    });
  }
})();
