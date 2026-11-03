/* FitReadout: the instrument reads the curve, then the rules come up.
   Entry: the rating curve draws from the cold end to the limit line (1.1 s), the limit line drops in, the hatched field
   past it fades up, then the rule tiles and the tags step in. Once; reduced motion: the finished readout.
   Pointing: ported from Subframe Motion "Chart crosshair tooltip" (chart-crosshair), MIT, (c) 2026 Subframe. Kept: the
   reading point snaps to the plotted line under the pointer's x (here sampled along the curve), follows it with a
   short ease and returns to its rest when the pointer leaves; touch and keyboard see the rest state. */
AQmotion.fx('FitReadout', function (root, m) {
  root.querySelectorAll('.aq-fit-readout').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return el.querySelector(s) }, svg = q('.aq-fit-readout__chart'), curve = q('.aq-fit-readout__curve'), lim = q('.aq-fit-readout__lim'),
      dot = q('.aq-fit-readout__dot'), late = [q('.aq-fit-readout__out'), q('.aq-fit-readout__tail'), q('.aq-fit-readout__end')].filter(Boolean),
      tiles = [].slice.call(el.querySelectorAll('.aq-fit-readout__tile')), tags = [].slice.call(el.querySelectorAll('.aq-fit-readout__tag'));
    var L = curve && curve.getTotalLength ? curve.getTotalLength() : 0;
    if (L) gsap.set(curve, { strokeDasharray: L + ' ' + (L + 1), strokeDashoffset: L });
    if (lim) gsap.set(lim, { autoAlpha: 0 }); gsap.set(late, { autoAlpha: 0 }); gsap.set(tiles.concat(tags), { autoAlpha: 0, y: 12 });
    m.on(el, function () {
      var tl = m.tw(gsap.timeline({ defaults: { ease: 'power3.out' } }));
      if (L) tl.to(curve, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.1);
      if (lim) tl.fromTo(lim, { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 0.4, clearProps: 'transform,opacity,visibility' }, 1.0);
      if (late.length) tl.to(late, { autoAlpha: 1, duration: 0.5, clearProps: 'opacity,visibility' }, 1.2);
      if (tiles.length) tl.to(tiles, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, clearProps: 'transform,opacity,visibility' }, 0.3);
      if (tags.length) tl.to(tags, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, 0.9);
    }, 'top 75%');
    if (!svg || !dot || !L || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var P = [], i, p; for (i = 0; i <= 60; i++) { p = curve.getPointAtLength(L * i / 60); P.push([p.x, p.y]) }
    var cx = +dot.getAttribute('cx'), cy = +dot.getAttribute('cy'),
      qx = gsap.quickTo(dot, 'attr:cx', { duration: 0.18, ease: 'power3.out' }), qy = gsap.quickTo(dot, 'attr:cy', { duration: 0.18, ease: 'power3.out' });
    svg.addEventListener('pointermove', function (ev) {
      var r = svg.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * svg.viewBox.baseVal.width, best = P[0];
      P.forEach(function (pt) { if (Math.abs(pt[0] - x) < Math.abs(best[0] - x)) best = pt }); qx(best[0]); qy(best[1]);
    });
    svg.addEventListener('pointerleave', function () { qx(cx); qy(cy) });
  });
});
