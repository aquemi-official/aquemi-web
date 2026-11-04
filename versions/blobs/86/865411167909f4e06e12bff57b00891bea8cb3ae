/* BuildingLoop: the building is ruled in (slabs and walls), then the loop leaves the plant and runs the floors in one
   stroke (2.2 s, power1.inOut); each stop's drop, ring and margin name land as the water passes it; then one
   light runs the loop once, a glint along the pipe.
   Ported from Subframe Motion "Animated beam" (animated-beam), MIT, (c) 2026 Subframe: a short bright dash travels
   the path once (here a stroke-dash window on a copy of the loop path, no gradient), at the example's pace
   (about 1.6 s a lap, power1.inOut). Captions rise in turn. Once, under 5 s. Reduced motion: the finished drawing. */
AQmotion.fx('BuildingLoop', function (root, m) {
  root.querySelectorAll('.aq-building-loop').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var loop = el.querySelector('.aq-building-loop__loop'), glint = el.querySelector('.aq-building-loop__glint');
    var stops = qa('.aq-building-loop__stop'), labels = qa('.aq-building-loop__label'), caps = qa('.aq-building-loop__cap');
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tl.from(qa('.aq-building-loop__slab,.aq-building-loop__wall,.aq-building-loop__gr'), { autoAlpha: 0, duration: 0.5, stagger: 0.05, clearProps: 'opacity,visibility' }, 0);
    var run = 2.2, at = 0.5;
    if (loop && loop.getTotalLength) {
      var L = loop.getTotalLength();
      tl.fromTo(loop, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: run, ease: 'power1.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, at);
      if (glint) {
        tl.set(glint, { stroke: 'var(--flow)', strokeWidth: 5, strokeDasharray: '60 ' + L, strokeDashoffset: 60 }, at + run);
        tl.to(glint, { strokeDashoffset: -L, duration: 1.6, ease: 'power1.inOut' }, at + run);
        tl.set(glint, { clearProps: 'stroke,strokeWidth,strokeDasharray,strokeDashoffset' });
      }
    }
    stops.forEach(function (s, i) {
      var t = at + run * (0.18 + 0.8 * (i + 0.5) / Math.max(stops.length, 1));
      tl.from(s, { autoAlpha: 0, y: -6, duration: 0.4, clearProps: 'transform,opacity,visibility' }, t);
      var lb = labels.filter(function (l) { return l.getAttribute('data-bl') === s.getAttribute('data-bl') });
      if (lb.length) tl.from(lb, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, t + 0.1);
    });
    tl.from(caps, { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, m.narrow() ? 0.4 : at + 1);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
