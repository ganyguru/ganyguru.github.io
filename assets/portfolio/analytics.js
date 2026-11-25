(() => {
  const page = document.documentElement.dataset.analyticsPage;
  const pages = {
    home: ['/', 'Portfolio homepage'],
    resume: ['/resume.html', 'Résumé'],
  };
  const events = {
    'resume-open': 'Open résumé',
    'preprint-open': 'Open 2026 arXiv preprint',
    'patent-electrolyte-open': 'Open electrolyte patent application',
    'patent-recovery-open': 'Open electrolyte recovery patent application',
    'linkedin-open': 'Open LinkedIn profile',
    'capability-tools-open': 'Open design and build tools',
    'capability-process-open': 'Open process development and validation',
    'capability-electrochemistry-open': 'Open electrochemistry and interfaces',
  };
  if (!Object.prototype.hasOwnProperty.call(pages, page)) return;

  const endpoint = 'https://cprganesh.goatcounter.com/count';
  const scriptUrl = 'https://gc.zgo.at/count.js';
  let started = false;
  let tracker;
  let counted = false;

  const send = (path, title, event) => {
    if (!tracker) return;
    try {
      if (tracker.filter()) return;
      const reported = new URL(tracker.url({path, title, event, referrer: ''}));
      if (reported.origin + reported.pathname !== endpoint) return;
      // Rebuild the request rather than transmitting the SDK URL: it contains location.search.
      const clean = new URL(endpoint);
      clean.searchParams.set('p', path);
      clean.searchParams.set('t', title);
      if (event) clean.searchParams.set('e', 'true');
      for (const key of ['s', 'b', 'rnd']) {
        const value = reported.searchParams.get(key);
        if (value && /^[a-z0-9]+$/i.test(value)) clean.searchParams.set(key, value);
      }
      fetch(clean.href, {
        method: 'POST', mode: 'no-cors', credentials: 'omit',
        referrerPolicy: 'no-referrer', keepalive: true,
      }).catch(() => {});
    } catch { /* Analytics is best-effort and never intercepts navigation. */ }
  };

  const view = () => {
    if (counted || document.visibilityState !== 'visible') return;
    counted = true;
    document.removeEventListener('visibilitychange', view);
    send(...pages[page], false);
  };

  const load = () => {
    if (started || location.hash === '#toggle-goatcounter') return;
    started = true;
    window.goatcounter = {no_onload: true, no_events: true};

    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    script.dataset.goatcounter = endpoint;
    script.src = scriptUrl;
    script.addEventListener('load', () => {
      const library = window.goatcounter;
      if (typeof library?.url !== 'function' || typeof library?.filter !== 'function') return;
      tracker = library;
      if (document.visibilityState === 'visible') view();
      else document.addEventListener('visibilitychange', view);
    }, {once: true});
    document.head.append(script);
  };

  const schedule = () => {
    if (typeof requestIdleCallback === 'function') requestIdleCallback(load, {timeout: 1500});
    else setTimeout(load, 100);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, {once: true});

  const trackClick = event => {
    if (!event.isTrusted || (event.type === 'auxclick' && event.button !== 1)) return;
    const id = event.target.closest?.('a[data-analytics-event]')?.dataset.analyticsEvent;
    if (id && Object.prototype.hasOwnProperty.call(events, id)) send(id, events[id], true);
  };
  document.addEventListener('click', trackClick, {capture: true, passive: true});
  document.addEventListener('auxclick', trackClick, {capture: true, passive: true});
})();
