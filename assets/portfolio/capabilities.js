(() => {
  const figure = document.querySelector('.specimen');
  const overview = figure?.querySelector('.capabilities');
  const cards = [...(overview?.querySelectorAll('[data-capability]') ?? [])];
  const panels = cards.map(card => document.getElementById('capability-' + card.dataset.capability));
  if (!overview || !cards.length || panels.some(panel => !panel?.querySelector('.capability-back'))) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const move = (el, from, to, duration) => !reduce.matches && el.animate
    ? el.animate([{opacity:from},{opacity:to}],{duration,easing:'ease-out'})
    : null;
  let active = -1;
  let switching = false;
  panels.forEach(panel => {
    panel.hidden = true;
    panel.querySelector('.capability-back').hidden = false;
  });

  cards.forEach((card, index) => {
    const panel = panels[index];
    const back = panel.querySelector('.capability-back');
    const open = async () => {
      if (switching || active !== -1) return;
      switching = true;
      const fading = cards.filter(item => item !== card).map(item => move(item, 1, 0, 130)).filter(Boolean);
      await Promise.allSettled(fading.map(animation => animation.finished));
      overview.hidden = true;
      panel.hidden = false;
      active = index;
      move(panel, 0, 1, 150);
      back.focus();
      switching = false;
    };
    const close = () => {
      if (active !== index) return;
      panel.hidden = true;
      overview.hidden = false;
      active = -1;
      move(overview, 0, 1, 150);
      card.focus();
    };
    card.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open();
    });
    back.addEventListener('click', close);
    panel.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
    });
  });
  const linked = panels.findIndex(panel => '#' + panel.id === location.hash);
  if (linked > -1) cards[linked].click();
})();
