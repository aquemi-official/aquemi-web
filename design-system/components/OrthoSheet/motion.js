/* OrthoSheet: the GA sheet draws itself view by view (IsoKit's choreography on each svg: the furniture, the parts, the
   pipes and leaders, then the water runs the skid once), the plan starting as the elevation's parts finish; then the
   tags strike in number order at the ends of their leaders (on phones, the dots on their parts); the rows rise as they
   scroll in. Once, under 5 s. Pointing at a row glides a ring to its tag (CSS in style.css, ported from Subframe Motion
   "Inside the image" (atlas-hotspots), MIT, (c) 2026 Subframe: the ring travels 250 ms cubic-bezier(0.2, 0.8, 0.2, 1),
   the chosen tag darkens in 180 ms). Reduced motion: the finished sheet, the ring moves without travel. */
AQmotion.fx('OrthoSheet', function (root, m) {
  root.querySelectorAll('.aq-ortho-sheet').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    if (!window.AQiso) return;
    var shown = function (k) { return getComputedStyle(k).display !== 'none' && k.offsetParent !== null; };
    var svgs = [].slice.call(el.querySelectorAll('.aq-ortho-sheet__svg')).filter(function (s) { return s.parentNode.offsetParent !== null && getComputedStyle(s.parentNode).display !== 'none'; });
    var tls = svgs.map(function (s, i) { return AQiso.timeline(s, m, { draw: 1.1, pipe: 0.5, flow: 0.8, stagger: 0.04, at: i * 0.5 }); }).filter(Boolean);
    if (!tls.length) return;
    var last = tls[tls.length - 1], t0 = (last.labels.flow || 2.2) + 0.15;
    /* the marks actually shown, in row order: tags on desktop and tablet, dots on phones */
    var marks = [].slice.call(el.querySelectorAll('.aq-ortho-sheet__tag, .aq-ortho-sheet__dot')).filter(shown)
      .sort(function (a, b) { return a.getAttribute('data-r') - b.getAttribute('data-r'); });
    gsap.set(marks, { autoAlpha: 0 });
    marks.forEach(function (k, i) {
      var at = t0 + i * 0.1;
      last.to(k, { autoAlpha: 1, duration: 0.2, clearProps: 'opacity,visibility' }, at)
        .from(k, { scale: 1.5, duration: 0.35, ease: 'power3.out', clearProps: 'scale' }, at);
    });
    var blk = el.querySelector('.aq-ortho-sheet__block');
    if (blk && blk.offsetParent) tls[0].from(blk, { autoAlpha: 0, duration: 0.5, clearProps: 'opacity,visibility' }, 0.2);
    el.querySelectorAll('.aq-ortho-sheet__row').forEach(function (r) {
      var t = m.tw(gsap.from(r, { y: 12, autoAlpha: 0, duration: 0.45, paused: true, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }));
      m.on(r, function () { t.play(); }, 'top 92%');
    });
    m.on(el, function () { tls.forEach(function (tl) { tl.play(); }); }, 'top 70%');
  });
});
