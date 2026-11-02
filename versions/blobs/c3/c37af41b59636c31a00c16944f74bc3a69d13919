/* StandardTiles: the grid is cut in along its diagonals (each tile wipes down from the top, 70 ms apart by row + column),
   the slash numerals roll up on odometer wheels (sliding-number, m.count), the flow block's square opens from its
   corner, and the blueprint tile draws its first system the IsoKit way. One timeline, once on scroll-in, under 3 s.
   The pointer/focus selection (project-index port) lives in the renderer so it also works under reduced motion. */
AQmotion.fx('StandardTiles', function (root, m) {
  root.querySelectorAll('.aq-standard-tiles').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var cells = [].slice.call(el.children), cols = m.narrow() ? 1 : 3;
    cells.forEach(function (c, i) {
      var at = ((i % cols) + Math.floor(i / cols)) * 0.07;
      tl.fromTo(c, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.inOut', clearProps: 'clipPath' }, at);
      var no = c.querySelector('.aq-standard-tiles__no');
      if (no) tl.call(function () { m.count(no, { now: true, duration: 0.9 }) }, null, at + 0.2);
      var rise = c.querySelectorAll('.aq-standard-tiles__tag, .aq-standard-tiles__body, .aq-standard-tiles__arrow');
      if (rise.length) tl.from(rise, { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, at + 0.35);
    });
    var wedge = el.querySelector('.aq-standard-tiles__wedge');
    if (wedge) tl.from(wedge, { scale: 0, duration: 0.8, ease: 'power3.inOut', clearProps: 'transform' }, 0.45);
    var big = el.querySelector('.aq-standard-tiles__big');
    if (big) tl.from(big, { y: 12, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, 0.9);
    var svg = el.querySelector('.aq-standard-tiles__layer.is-on svg.aq-iso');
    if (svg && window.AQiso) { var it = AQiso.timeline(svg, m, { draw: 1, pipe: 0.5, flow: 0.8, drop: false }); if (it) { it.paused(false); tl.add(it, 0.5) } }
    m.on(el, function () { tl.play() }, 'top 80%');
  });
});
