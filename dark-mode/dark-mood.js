
(function () {
  'use strict';

  const THEME_KEY = 'namma_theme_mode';
  const root = document.documentElement;

  function initDarkMode() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    bindButtons();
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const labels = document.querySelectorAll('.dark-mode-label, #darkModeLabel');
    labels.forEach((label) => {
      label.textContent = theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE';
    });

    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  function bindButtons() {
    const buttons = document.querySelectorAll('.dark-mode-toggle, #darkModeBtn');
    buttons.forEach((btn) => {
      btn.removeEventListener('click', toggleTheme);
      btn.addEventListener('click', toggleTheme);
    });
  }

  window.DarkMode = {
    init: initDarkMode,
    toggle: toggleTheme,
    setTheme: setTheme,
    getTheme: () => root.getAttribute('data-theme') || 'light'
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
  } else {
    initDarkMode();
  }
})();
