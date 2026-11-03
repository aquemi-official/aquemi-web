/* ClauseTabs: the page settles on the clipboard and its clauses print row by row (8 px rise, 0.07 s apart) while the
   package builds the IsoKit way (parts back to front, the line, the water once); then, clause by clause, a leader
   draws from its tab to the part and its tag strikes onto the part as the leader arrives. Once on scroll-in, under
   4 s. Ported from Subframe Motion "Asset crop workflow" (process-choreography), MIT, (c) 2026 Subframe (kept: one
   clock for the sequence, connectors drawn from the source toward each output inside a 1.12 s window, each output
   scaling in from 0.96 as its connector arrives, cubic ease-out; replaced: the artwork and its crops with the
   proposal's tabs and the package's parts). Nothing under reduced motion: page, drawing, leaders and tags complete. */
AQmotion.fx('ClauseTabs', function (root, m) {
  root.querySelectorAll('.aq-clause-tabs').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var D = window.DrawSVGPlugin, tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var page = el.querySelector('.aq-clause-tabs__page'), rows = [].filter.call(el.querySelectorAll('.aq-clause-tabs__row'), function (r) { return r.offsetHeight > 0 });
    if (page) tl.from(page, { y: 12, duration: 0.6, clearProps: 'transform' }, 0);
    rows.forEach(function (r, i) {
      var kids = r.querySelectorAll('.aq-clause-tabs__t, .aq-clause-tabs__ph, .aq-clause-tabs__ours, .aq-clause-tabs__body');
      tl.from(kids, { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.04, clearProps: 'transform,opacity,visibility' }, 0.2 + i * 0.07);
    });
    var svg = el.querySelector('.aq-clause-tabs__svg'), it = svg && window.AQiso && AQiso.timeline ? AQiso.timeline(svg, m, { draw: 1.3, pipe: 0.5, flow: 0.8 }) : null;
    /* tags wait for their leaders (or, where the leaders are off, strike in order once the package is drawn) */
    var tags = [].slice.call(el.querySelectorAll('.aq-clause-tabs__tag'));
    tags.forEach(function (t) { gsap.set(t, { autoAlpha: 0 }) });
    /* the leaders wait too: hidden as a layer until their draw starts (lay() may rebuild the paths on resize) */
    var leadsSvg = el.querySelector('.aq-clause-tabs__leads');
    if (leadsSvg) gsap.set(leadsSvg, { autoAlpha: 0 });
    tl.call(function () {
      if (leadsSvg) gsap.set(leadsSvg, { clearProps: 'opacity,visibility' });
      var leads = el.querySelector('.aq-clause-tabs__leads'), shown = leads && getComputedStyle(leads).display !== 'none', pk = el.hasAttribute('data-pk-on'), n = tags.length, w = Math.max(0.5, 1.12 - 0.08 * (n - 1));
      tags.forEach(function (t, i) {
        var p = shown && leads.querySelector('.aq-clause-tabs__lead[data-i="' + t.getAttribute('data-i') + '"]'), at = i * 0.08;
        if (p && D) m.tw(gsap.fromTo(p, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: w, delay: at, ease: 'power3.out', clearProps: 'strokeDasharray,strokeDashoffset' }));
        /* on the phone strip the tags carry a counter-scale against the zoom (style.css): fade them only */
        if (pk) m.tw(gsap.fromTo(t, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, delay: at, ease: 'power3.out', clearProps: 'opacity,visibility' }));
        else m.tw(gsap.fromTo(t, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.3, delay: at + (p ? w * 0.8 : 0), ease: 'power3.out', clearProps: 'transform,opacity,visibility' }));
      });
    }, null, 1.2);
    m.on(el, function () { tl.play(); if (it) it.play() }, 'top 75%');
  });
});
