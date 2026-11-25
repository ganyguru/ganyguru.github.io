(() => {
  const root = document.documentElement;
  const key = 'portfolio-theme';
  const device = matchMedia('(prefers-color-scheme: dark)');
  const set = () => {
    try { root.dataset.theme = localStorage.getItem(key) || ''; } catch {}
    if (!['light', 'dark'].includes(root.dataset.theme)) delete root.dataset.theme;
  };
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : device.matches;
  const sync = () => {
    document.querySelector('.theme-toggle')?.setAttribute('aria-pressed', String(isDark()));
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark() ? '#171f35' : '#fff8e8');
  };
  set();
  sync();
  addEventListener('storage', event => {
    if (event.key === key || event.key === null) { set(); sync(); }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.addEventListener('click', () => {
      root.dataset.theme = isDark() ? 'light' : 'dark';
      try { localStorage.setItem(key, root.dataset.theme); } catch {}
      sync();
    });
    device.addEventListener?.('change', sync);
    sync();
    button.hidden = false;
  });
})();
