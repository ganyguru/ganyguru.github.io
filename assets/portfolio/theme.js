(() => {
  const root = document.documentElement;
  const themeKey = 'portfolio-theme';
  const paletteKey = 'portfolio-palette';
  const colors = {copper:['#f6f1e7','#1c1c18'],maroon:['#f4efe8','#261b20'],trainer:['#fff8e8','#171f35']};
  const device = matchMedia('(prefers-color-scheme: dark)');
  const read = key => {
    try { return localStorage.getItem(key); } catch { return null; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* Continue without persistence. */ }
  };
  const setTheme = value => {
    if (value === 'light' || value === 'dark') root.dataset.theme = value;
    else delete root.dataset.theme;
  };
  const validPalette = value => Object.prototype.hasOwnProperty.call(colors, value) ? value : 'copper';
  const setPalette = value => { root.dataset.palette = validPalette(value); };
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : device.matches;
  const syncChrome = () => document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', colors[validPalette(root.dataset.palette)][Number(isDark())]);
  setTheme(read(themeKey));
  setPalette(read(paletteKey));
  syncChrome();
  const sync = () => {
    document.querySelector('.theme-toggle')?.setAttribute('aria-pressed', String(isDark()));
    document.querySelectorAll('[data-palette-choice]').forEach(item =>
      item.setAttribute('aria-pressed', String(item.dataset.paletteChoice === root.dataset.palette)));
    syncChrome();
  };
  addEventListener('storage', event => {
    if (event.key === themeKey || event.key === null) setTheme(read(themeKey));
    if (event.key === paletteKey || event.key === null) setPalette(read(paletteKey));
    sync();
  });
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    const label = document.querySelector('.palette-control');
    if (!button || !label) return;
    button.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      setTheme(next);
      write(themeKey, next);
      sync();
    });
    label.querySelectorAll('[data-palette-choice]').forEach(item => item.addEventListener('click', () => {
      const started = root.dataset.palette;
      delete root.dataset.capTurn;
      setPalette(item.dataset.paletteChoice);
      if (started !== 'trainer' && root.dataset.palette === 'trainer' &&
          !matchMedia('(prefers-reduced-motion: reduce)').matches) root.dataset.capTurn = '';
      write(paletteKey, root.dataset.palette);
      sync();
    }));
    document.querySelector('.brand-rotor')?.addEventListener('animationend', event => {
      if (event.animationName === 'cap-turn') delete root.dataset.capTurn;
    });
    device.addEventListener?.('change', sync);
    sync();
    button.hidden = false;
    label.hidden = false;
  });
})();
