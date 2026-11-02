/* NcrTiles: the numerals are pressed into their tiles, then the repair is made on the drawing.
   Ported from Subframe Motion "Type under pressure" (type-press), MIT, (c) 2026 Subframe
   (kept: each glyph rises from a narrow sliver, translateY 55 % scaleX 0.12 scaleY 0.55 to rest, from its foot, 760 ms
   cubic-bezier(.16,1,.3,1), 35 ms a glyph, opacity in over the first quarter; replaced: the heavy poster words with the
   tiles' light slash numerals, the button that swaps editions with each tile scrolling in).
   Tiles rise 16 px in reading order (0.08 s apart) and press their numeral as they land. The drawing tile then makes
   the repair: the pipe run draws on, the dimension marks the length to cut, the rejected length lifts clear of the
   run to its exploded place, the remade length drops into the gap and its two new joints strike in flow, the labels
   follow. About 3.6 s, once. Pointing at (or focusing into) the drawing or the step it shows replays the repair
   (visitor-driven). Nothing under reduced motion: the static drawing is the finished, exploded repair. */
AQmotion.fx('NcrTiles', function (root, m) {
  root.querySelectorAll('.aq-ncr-tiles').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var press = window.CustomEase ? (CustomEase.get('aq-press') || CustomEase.create('aq-press', 'M0,0 C0.16,1 0.3,1 1,1')) : 'expo.out';
    var tiles = [].slice.call(el.querySelectorAll('.aq-ncr-tiles__tile')).sort(function (a, b) { return a.compareDocumentPosition(b) & 4 ? -1 : 1 });
    var tl = m.tw(gsap.timeline({ paused: true }));
    tiles.forEach(function (t, i) {
      var at = i * 0.08, n = t.querySelector('.aq-ncr-tiles__n'), rest = t.querySelectorAll('.aq-ncr-tiles__t, .aq-ncr-tiles__d, .aq-ncr-tiles__hold');
      tl.from(t, { y: 16, autoAlpha: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at);
      if (n) {
        var s = m.split(n, { type: 'chars' }), ch = s ? s.chars : [n];
        tl.fromTo(ch, { yPercent: 55, scaleX: 0.12, scaleY: 0.55, autoAlpha: 0, transformOrigin: '50% 100%' },
          { yPercent: 0, scaleX: 1, scaleY: 1, autoAlpha: 1, duration: 0.76, ease: press, stagger: 0.035, clearProps: 'transform,opacity,visibility',
            onComplete: function () { if (s) s.revert() } }, at + 0.15);
      }
      if (rest.length) tl.from(rest, { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at + 0.3);
    });
    m.on(el, function () { tl.play() }, 'top 80%');

    // the repair, on the drawing tile
    var fig = el.querySelector('.aq-ncr-tiles__fig'); if (!fig) return;
    var svg = fig.querySelector('svg'), old = fig.querySelector('.aq-ncr-tiles__old'), neu = fig.querySelector('.aq-ncr-tiles__new'),
      beads = fig.querySelectorAll('.aq-ncr-tiles__nb'), dim = fig.querySelector('.aq-ncr-tiles__dim'), labs = fig.querySelectorAll('.aq-ncr-tiles__lab, .aq-ncr-tiles__figtag');
    var base = fig.querySelectorAll('.aq-ncr-tiles__base path, .aq-ncr-tiles__base2 path'), D = window.DrawSVGPlugin;
    // the lift: the old length sits 60 world units (z) above its place; GSAP moves svg groups in user units
    function liftPx() { return 60 }
    function repair(fast) {
      var k = fast ? 0.6 : 1, r = gsap.timeline();
      r.fromTo(old, { y: liftPx(), autoAlpha: 1 }, { y: 0, duration: 0.8 * k, ease: 'power2.inOut', clearProps: 'transform' }, 0)
        .fromTo(neu, { y: -liftPx() * 0.6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 * k, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.7 * k)
        .fromTo(beads, { scale: 1.6, transformOrigin: '50% 50%', autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.24 * k, ease: 'power4.in', stagger: 0.12, clearProps: 'transform,opacity,visibility' }, 1.2 * k);
      return r;
    }
    var ft = m.tw(gsap.timeline({ paused: true }));
    if (D && base.length) ft.fromTo(base, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: 'power2.inOut', stagger: 0.02, clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
    if (dim) ft.from(dim, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.8);
    gsap.set(old, { y: liftPx() }); gsap.set(neu, { autoAlpha: 0 });
    ft.add(repair(false), 1.1);
    if (labs.length) ft.from(labs, { autoAlpha: 0, y: 6, duration: 0.4, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 2.6);
    m.on(fig, function () { ft.play() }, 'top 75%');

    // replay on pointing at the drawing or its step (visitor-driven)
    var step = el.querySelector('.aq-ncr-tiles__tile.is-drawn'), busy = null;
    function replay() { if (ft.progress() < 1 || (busy && busy.isActive())) return; busy = repair(true) }
    [fig.parentNode, step].forEach(function (x) { if (x) { x.addEventListener('mouseenter', replay); x.addEventListener('focusin', replay) } });
  });
});
