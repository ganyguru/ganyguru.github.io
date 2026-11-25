(() => {
  const stage = document.querySelector('.capability-stage');
  const overview = stage?.querySelector('.capabilities');
  const cards = [...(overview?.querySelectorAll('[data-capability]') ?? [])];
  const panels = cards.map(card => document.getElementById('capability-' + card.dataset.capability));
  if (!overview || !cards.length || panels.some(panel => !panel?.querySelector('.capability-back'))) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = -1;
  let switching = false;
  let pendingClose = false;

  panels.forEach(panel => {
    panel.hidden = true;
    panel.querySelector('.capability-back').hidden = false;
  });

  const focusControl = target => {
    target.focus({preventScroll:true});
  };
  const showFocusIfNeeded = target => {
    const rect = target.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) {
      target.scrollIntoView({block:'nearest',behavior:reduce.matches?'instant':'smooth'});
    }
  };
  const finished = animations => Promise.allSettled(animations.map(animation => animation.finished));

  async function swap(outgoing, incoming, fading, target) {
    if (reduce.matches || !stage.animate) {
      outgoing.hidden = true;
      incoming.hidden = false;
      focusControl(target);
      showFocusIfNeeded(target);
      return;
    }

    const before = stage.getBoundingClientRect().height;
    const fade = fading.map(item => item.animate([{opacity:1},{opacity:0}], {
      duration:105, easing:'ease-out', fill:'forwards'
    }));
    await finished(fade);

    stage.classList.add('is-switching');
    stage.style.height = before + 'px';
    outgoing.hidden = true;
    incoming.hidden = false;
    fade.forEach(animation => animation.cancel());

    const after = incoming.getBoundingClientRect().height;
    const duration = 310;
    const size = stage.animate([{height:before + 'px'},{height:after + 'px'}], {
      duration, easing:'ease-in-out', fill:'forwards'
    });
    const reveal = incoming.animate([{opacity:0},{opacity:1}], {
      duration:235, easing:'ease-out'
    });
    focusControl(target);

    await finished([size, reveal]);
    stage.style.height = '';
    size.cancel();
    stage.classList.remove('is-switching');
    if (!pendingClose) showFocusIfNeeded(target);
  }

  cards.forEach((card, index) => {
    const panel = panels[index];
    const back = panel.querySelector('.capability-back');
    const open = async () => {
      if (switching || active !== -1) return;
      switching = true;
      active = index;
      await swap(overview, panel, cards.filter(item => item !== card), back);
      switching = false;
      if (pendingClose) { pendingClose = false; close(); }
    };
    const close = async () => {
      if (active !== index) return;
      if (switching) {
        if (!panel.hidden) pendingClose = true;
        return;
      }
      switching = true;
      await swap(panel, overview, [panel], card);
      active = -1;
      switching = false;
      pendingClose = false;
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
