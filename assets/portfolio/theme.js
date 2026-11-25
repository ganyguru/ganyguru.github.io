(() => {
  const root = document.documentElement;
  const themeKey = 'portfolio-theme';
  const paletteKey = 'portfolio-palette';
  const colors = {copper:['#f6f1e7','#1c1c18'],evergreen:['#edf2ec','#1c1c1c'],burgundy:['#f5efe9','#241b20']};
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
  const validPalette = value => Object.prototype.hasOwnProperty.call(colors, value) ? value : 'evergreen';
  const setPalette = value => { root.dataset.palette = validPalette(value); };
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : device.matches;
  const syncChrome = () => document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', colors[validPalette(root.dataset.palette)][Number(isDark())]);
  setTheme(read(themeKey));
  setPalette(read(paletteKey));
  syncChrome();
  const sync = () => {
    document.querySelector('.theme-toggle')?.setAttribute('aria-pressed', String(isDark()));
    const picker = document.querySelector('.palette-control select');
    if (picker) picker.value = root.dataset.palette;
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
    const picker = label?.querySelector('select');
    if (!button || !picker) return;
    button.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      setTheme(next);
      write(themeKey, next);
      sync();
    });
    picker.addEventListener('change', () => {
      setPalette(picker.value);
      write(paletteKey, root.dataset.palette);
      sync();
    });
    device.addEventListener?.('change', sync);
    sync();
    button.hidden = false;
    label.hidden = false;
  });
})();
