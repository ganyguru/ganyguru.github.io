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
    const mark = document.querySelector('.brand-mark');
    if (mark) {
      const replay = () => {
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        for (const selector of ['img', '.brand-streaks']) {
          const part = mark.querySelector(selector);
          const animation = part?.getAnimations?.().find(item =>
            item.animationName === 'ball-turn' || item.animationName === 'ball-streak');
          if (animation) { animation.currentTime = 0; animation.play(); }
        }
      };
      mark.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse' || event.pointerType === 'pen') replay();
      });
      mark.closest('.brand')?.addEventListener('focus', event => {
        if (event.target.matches(':focus-visible')) replay();
      });
    }
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
