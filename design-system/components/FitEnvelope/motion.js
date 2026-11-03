/* FitEnvelope: the package is drawn through the IsoKit choreography (skid, RO rack, product pipe, tank, drum, the water
   run into the tank); the label shows, the rated range fills the band from its low end; then each tag drops onto its
   cord and swings to rest about its eyelet, one after another. One timeline, once on scroll-in, about 3.4 s; settles
   static (every transform cleared). Tags folded away on phones are left alone. Nothing runs under reduced motion: the
   section renders finished.
   The tag swing is ported from Subframe Motion "Pinned pass" (pinned-pass), MIT, (c) 2026 Subframe: its cord is a
   verlet chain damped by 0.973 a frame and its badge turns with the last link (clamped to 42 degrees). Here one swing
   is precomputed from the same damping: a half period of 11 frames keeps 0.973^11 = 0.74 of the angle, so a 7 degree
   drop swings 7, -5.2, 3.8, -2.8, 2.1, -1.5, 1.1, -0.8 and rests; the tag turns about its eyelet, the swing scaled down
   so a wide tag's far end travels about 18 px at most. */
AQmotion.fx('FitEnvelope', function (root, m) {
  var SWING = [7, -5.2, 3.8, -2.8, 2.1, -1.5, 1.1, -0.8, 0];
  root.querySelectorAll('.aq-fit-envelope').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('svg.aq-iso'), fits = el.querySelector('.aq-fit-envelope__fits'),
      bar = el.querySelector('.aq-fit-envelope__bar'), ends = el.querySelectorAll('.aq-fit-envelope__end'),
      key = el.querySelector('.aq-fit-envelope__key');
    var tags = [].filter.call(el.querySelectorAll('.aq-fit-envelope__tag'), function (t) { return t.offsetParent !== null });
    var tl = window.AQiso && AQiso.timeline(svg, m, { draw: 1.3, pipe: 0.5, flow: 0.9 });
    if (!tl) tl = gsap.timeline({ paused: true });
    if (fits) tl.from(fits, { autoAlpha: 0, x: -6, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.1);
    if (bar) tl.from(bar, { scaleX: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform' }, 0.35);
    if (ends.length) tl.from(ends, { autoAlpha: 0, y: 4, duration: 0.35, stagger: 0.5, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.4);
    if (key) tl.from(key, { autoAlpha: 0, y: 6, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.5);
    tags.forEach(function (t, i) {
      /* the far end of a wide tag travels far: scale the swing so it moves at most about 18 px (7 degrees at most) */
      var at = 0.6 + i * 0.12, k = Math.min(7, Math.atan(18 / Math.max(1, t.offsetWidth)) * 180 / Math.PI) / 7,
        sw = SWING.map(function (a) { return Math.round(a * k * 100) / 100 });
      tl.from(t, { autoAlpha: 0, y: -12, duration: 0.3, ease: 'power2.in', clearProps: 'opacity,visibility' }, at);
      tl.fromTo(t, { rotation: sw[0] }, { keyframes: sw.slice(1).map(function (a) { return { rotation: a, duration: 0.17, ease: 'sine.inOut' } }), clearProps: 'transform' }, at + 0.22);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
