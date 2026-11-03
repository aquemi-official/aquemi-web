/* SkidSheet: the GA sheet draws itself (IsoKit's choreography: frame and parts back to front, pipes and leaders, then
   the water runs the skid once), then the tags strike in number order at the ends of their leaders (on phones, the dots
   on their parts); the rows rise as they scroll in. One timeline, once, under 5 s. Pointing at a row glides a ring to
   its tag (CSS in style.css, ported from Subframe Motion "Inside the image" (atlas-hotspots), MIT, (c) 2026 Subframe:
   the ring travels 250 ms cubic-bezier(0.2, 0.8, 0.2, 1), the chosen tag darkens in 180 ms). Reduced motion: the
   finished sheet, the ring moves without travel. */
AQmotion.fx('SkidSheet', function (root, m) {
  root.querySelectorAll('.aq-skid-sheet').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('.aq-skid-sheet__svg');
    /* the marks actually shown: tags on desktop and tablet, dots on phones (<= 600 px) */
    var marks = [].slice.call(el.querySelectorAll('.aq-skid-sheet__tag, .aq-skid-sheet__dot')).filter(function (k) { return getComputedStyle(k).display !== 'none'; });
    var rows = [].slice.call(el.querySelectorAll('.aq-skid-sheet__row'));
    var tl = window.AQiso && svg ? AQiso.timeline(svg, m, { draw: 1.2, pipe: 0.6, flow: 1.0, stagger: 0.05 }) : null;
    if (!tl) return;
    var t0 = (tl.labels.flow || 1.6) + 0.15;
    gsap.set(marks, { autoAlpha: 0 });
    marks.forEach(function (k, i) {
      var at = t0 + i * 0.12;
      tl.to(k, { autoAlpha: 1, duration: 0.2, clearProps: 'opacity,visibility' }, at)
        .from(k, { scale: 1.5, duration: 0.35, ease: 'power3.out', clearProps: 'scale' }, at);
    });
    var blk = el.querySelector('.aq-skid-sheet__block');
    if (blk && blk.offsetParent) tl.from(blk, { autoAlpha: 0, duration: 0.5, clearProps: 'opacity,visibility' }, 0.2);
    rows.forEach(function (r) {
      var t = m.tw(gsap.from(r, { y: 12, autoAlpha: 0, duration: 0.45, paused: true, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }));
      m.on(r, function () { t.play() }, 'top 92%');
    });
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
