(function () {
  'use strict';

  let menuEl = null;
  let openBtn = null;
  let closeBtn = null;
  let navItems = [];
  let isMenuOpen = false;

  function initMenu() {
    menuEl = document.getElementById('fullscreenMenu');
    openBtn = document.getElementById('navMenuBtn');
    closeBtn = document.getElementById('menuCloseActionBtn');
    navItems = document.querySelectorAll('.menu-link-item, .menu-nav-home-btn, .menu-talk-action');

    if (!menuEl) return;

    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    navItems.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href && href.startsWith('#')) {
          e.preventDefault();
          closeMenu();

          setTimeout(() => {
            const target = document.querySelector(href);

            if (target) {
              target.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }, 400);
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });
  }

  function openMenu() {
    if (!menuEl) return;

    isMenuOpen = true;
    menuEl.classList.add('is-open');
    menuEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    window.dispatchEvent(
      new CustomEvent('menuToggle', {
        detail: {
          open: true
        }
      })
    );
  }

  function closeMenu() {
    if (!menuEl) return;

    isMenuOpen = false;
    menuEl.classList.remove('is-open');
    menuEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    window.dispatchEvent(
      new CustomEvent('menuToggle', {
        detail: {
          open: false
        }
      })
    );
  }

  window.Menu = {
    init: initMenu,
    open: openMenu,
    close: closeMenu,
    isOpen: () => isMenuOpen
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
})();
