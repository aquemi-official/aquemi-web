/* SitePlates: the ledger is ruled and filled, the plate is laid. The header rule draws across, the rows rise in one
   after another; the navy plate wipes in from the right, the site in hand is drawn on it (AQiso: lines back to front),
   its pins strike and its callouts follow. One timeline, once on scroll-in, under 3 s; nothing under reduced motion.
   Choosing another site: the reel slides (CSS, see the look file); the arriving figure's pins strike and its callouts
   rise 8 px in 0.3 s (visitor-driven, may repeat). */
AQmotion.fx('SitePlates', function (root, m) {
  var CLEAR = 'transform,opacity,visibility';
  root.querySelectorAll('.aq-site-plates').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var head = el.querySelector('.aq-site-plates__table thead'), sub = el.querySelector('.aq-site-plates__sub'),
      rows = [].slice.call(el.querySelectorAll('.aq-site-plates__row')).filter(function (r) { return r.offsetParent !== null }),
      plate = el.querySelector('.aq-site-plates__plate'), still = el.querySelector('.aq-site-plates__still.is-on');
    // every drawing on the plate is this component's: the ones off the window stay complete for when they slide in
    el.querySelectorAll('.aq-site-plates__plate svg').forEach(function (s) { m.claim(s) });
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (sub) tl.fromTo(sub, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, clearProps: 'opacity,visibility' }, 0.1);
    if (head) tl.fromTo(head, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.inOut', clearProps: 'clipPath' }, 0.1);
    if (rows.length) tl.fromTo(rows, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.09, clearProps: CLEAR }, 0.3);
    if (plate) tl.fromTo(plate, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 0.9, ease: 'power3.inOut', clearProps: 'clipPath' }, 0.15);
    if (still) {
      var svg = still.querySelector('svg'), pins = still.querySelectorAll('.aq-site-plates__pin'), calls = still.querySelectorAll('.aq-site-plates__cap, .aq-site-plates__calls li');
      if (calls.length) tl.fromTo(calls, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08, clearProps: CLEAR }, 0.7);
      if (svg) {
        var iso = window.AQiso && AQiso.timeline(svg, m, { draw: 1.1, flow: 0 });
        if (iso) tl.add(iso, 0.75);
        else if (window.DrawSVGPlugin) { var set = m.lines(svg); if (set.solid.length) tl.fromTo(set.solid, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', stagger: { amount: 0.4 }, clearProps: 'strokeDasharray,strokeDashoffset' }, 0.75) }
      }
      if (pins.length) tl.fromTo(pins, { scale: 1.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power2.out', stagger: 0.12, clearProps: CLEAR }, '>-0.3');
    }
    var total = tl.duration(); if (total > 3) tl.timeScale(total / 3);
    m.on(el, function () { tl.play() }, 'top 75%');
    el.addEventListener('aqsitepick', function (ev) {
      if (ev.detail.instant) return;
      var s = el.querySelector('.aq-site-plates__still.is-on'); if (!s) return;
      var p = s.querySelectorAll('.aq-site-plates__pin'), c = s.querySelectorAll('.aq-site-plates__calls li');
      if (p.length) gsap.fromTo(p, { scale: 1.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.24, ease: 'power2.out', stagger: 0.08, delay: 0.18, clearProps: CLEAR, overwrite: true });
      if (c.length) gsap.fromTo(c, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power3.out', stagger: 0.06, delay: 0.12, clearProps: CLEAR, overwrite: true });
    });
  });
});
