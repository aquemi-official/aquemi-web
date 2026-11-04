/* LimitPlan: the limit is laid out first, then the package is drawn inside it and each connection is pinned in turn.
   The floor inside the battery limit fades up and the dash-dot limit line creeps once round; the package builds the
   IsoKit way (window.AQiso.timeline: parts back to front, the pipes, then the water runs); the site's side (cable,
   isolator, tag plate, field joint, gully) settles in with the pipes; then the numbered nodes press onto their
   connections in row order (0.12 s apart) while the rows rise 8 px beside them. Once, under 4.5 s; nothing runs under
   reduced motion (the drawing is complete without script).
   The pointer and focus feedback (row and node light together, a ring glides to the node) is in the look's renderer,
   ported from Subframe Motion "Inside the image" (atlas-hotspots), MIT, (c) 2026 Subframe: CSS transitions of 250 ms
   (ring) and 180 ms (node scale 1.12), none under reduced motion. */
AQmotion.fx('LimitPlan', function (root, m) {
  root.querySelectorAll('.aq-limit-plan').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var svg = el.querySelector('.aq-limit-plan__svg'); if (svg) m.claim(svg);
    var floor = el.querySelector('.aq-limit-plan__floor'), line = el.querySelector('.aq-limit-plan__line');
    var site = qa('.aq-limit-plan__g > .aq-iso__eq, .aq-limit-plan__g > .aq-iso__hid, .aq-limit-plan__g > .aq-iso__acc, .aq-limit-plan__g > .aq-iso__thin, .aq-limit-plan__cable, .aq-limit-plan__plate, .aq-limit-plan__g > .aq-iso__arrow');
    var leads = qa('.aq-limit-plan__lead, .aq-limit-plan__dot'), nodes = qa('.aq-limit-plan__node');
    var rows = qa('.aq-limit-plan__row').filter(function (r) { return r.offsetHeight > 0 });
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (floor) tl.from(floor, { autoAlpha: 0, duration: 0.6, ease: 'power1.out', clearProps: 'opacity,visibility' }, 0);
    if (line) tl.fromTo(line, { strokeDashoffset: 80, autoAlpha: 0 }, { strokeDashoffset: 0, autoAlpha: 1, duration: 1.2, ease: 'power2.out', clearProps: 'strokeDashoffset,opacity,visibility' }, 0);
    var it = svg && window.AQiso && AQiso.timeline ? AQiso.timeline(svg, m, { at: 0.3, draw: 1.3, pipe: 0.7, flow: 1.0 }) : null;
    var tp = it && it.labels && it.labels.pipes != null ? it.labels.pipes : 1.4;
    if (site.length) tl.from(site, { autoAlpha: 0, duration: 0.4, stagger: 0.03, clearProps: 'opacity,visibility' }, tp);
    var tn = tp + 0.5;
    if (leads.length) tl.from(leads, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, tn);
    nodes.forEach(function (n, i) { tl.from(n, { scale: 0.4, autoAlpha: 0, duration: 0.35, ease: 'back.out(2.4)', clearProps: 'transform,opacity,visibility' }, tn + 0.1 + i * 0.12) });
    rows.forEach(function (r, i) {
      var parts = r.querySelectorAll('.aq-limit-plan__no, .aq-limit-plan__t, .aq-limit-plan__c');
      var vis = [].filter.call(parts, function (p) { return p.offsetHeight > 0 });
      if (vis.length) tl.from(vis, { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.05, clearProps: 'transform,opacity,visibility' }, 0.2 + i * 0.09);
    });
    m.on(el, function () { tl.play(); if (it) it.play() }, 'top 80%');
  });
});
