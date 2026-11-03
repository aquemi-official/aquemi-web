/* UseMatrix: the main fills, then each use column, then its cells.
   Ported from Subframe Motion "Animated workflow diagram" (process-choreography), MIT, (c) 2026 Subframe.
   Kept: trunk first (first 20 % of a 1.12 s run), then the branches in staggered windows with a cubic ease-out, the
   outputs arriving as each branch lands. Here each column's drop fills with water top down in turn, and as it lands
   its filled squares stamp in down the column (scale from 0.4, 60 ms apart); the open squares are drawn from the
   start. Phones: the tap rows step in once. Once, on entry; reduced motion: the finished table (the core does not run). */
AQmotion.fx('UseMatrix', function (root, m) {
  root.querySelectorAll('.aq-use-matrix').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var D = 1.12, heads = [].slice.call(el.querySelectorAll('.aq-use-matrix__h'));
    if (innerWidth < 860) {
      var taps = [].slice.call(el.querySelectorAll('.aq-use-matrix__row'));
      gsap.set(taps, { autoAlpha: 0, x: -8 });
      m.on(el, function () { m.tw(gsap.to(taps, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity,visibility' })) }, 'top 85%');
      return;
    }
    var n = heads.length || 1, water = heads.map(function (h) { return h.querySelector('.aq-use-matrix__water') });
    var cols = heads.map(function (h, j) { return [].slice.call(el.querySelectorAll('.aq-use-matrix__cell.is-set[data-c="' + j + '"] .aq-use-matrix__sq')) });
    gsap.set(water.filter(Boolean), { scaleY: 0 }); cols.forEach(function (c) { if (c.length) gsap.set(c, { scale: 0.4, autoAlpha: 0 }) });
    m.on(el, function () {
      var tl = m.tw(gsap.timeline());
      heads.forEach(function (h, j) {
        var t0 = D * (0.18 + 0.4 * j / n);
        if (water[j]) tl.to(water[j], { scaleY: 1, duration: D * 0.3, ease: 'power2.in', clearProps: 'transform' }, t0);
        if (cols[j].length) tl.to(cols[j], { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.06, ease: 'back.out(1.7)', clearProps: 'transform,opacity,visibility' }, t0 + D * 0.3);
      });
    }, 'top 75%');
  });
});
