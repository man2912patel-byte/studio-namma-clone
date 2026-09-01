(function () {
  'use strict';

  function initNav() {
    const header = document.getElementById('siteNavHeader');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  window.Nav = {
    init: initNav
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
