(() => {
  const root = document.documentElement;
  const key = 'portfolio-theme';
  const device = matchMedia('(prefers-color-scheme: dark)');
  const read = () => {
    try { return localStorage.getItem(key); } catch { return null; }
  };
  const set = value => {
    if (value === 'light' || value === 'dark') root.dataset.theme = value;
    else delete root.dataset.theme;
  };
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : device.matches;
  const syncChrome = () => document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark() ? '#1c1c18' : '#f6f1e7');
  set(read());
  syncChrome();
  addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      set(read());
      syncChrome();
      document.querySelector('.theme-toggle')?.setAttribute('aria-pressed', String(isDark()));
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const sync = () => {
      button.setAttribute('aria-pressed', String(isDark()));
      syncChrome();
    };
    button.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      set(next);
      try { localStorage.setItem(key, next); } catch { /* Current page still follows the toggle. */ }
      sync();
    });
    device.addEventListener?.('change', sync);
    sync();
    button.hidden = false;
  });
})();
