/* ModulePlinth: the drawing is built through the IsoKit choreography (sheet, plinth, then each module drawn back to
   front, risers and loop laid, the water run along the loop and up each riser in turn). As the water reaches a module
   its marker drops onto it with a small bounce; the cards are dealt in beside the drawing in the same order. One
   timeline, once on scroll-in, under 5 s; settles static. Folded cards (phones) are left alone. */
AQmotion.fx('ModulePlinth', function (root, m) {
  root.querySelectorAll('.aq-module-plinth').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('svg.aq-iso'), mks = el.querySelectorAll('.aq-module-plinth__mk');
    var cards = [].filter.call(el.querySelectorAll('.aq-module-plinth__card'), function (c) { return c.offsetParent !== null });
    var shown = {};
    var tl = window.AQiso && AQiso.timeline(svg, m, { draw: 1.5, pipe: 0.7, flow: 1.8,
      onStage: function (els, id) { var k = String(id).replace('m', ''), mk = el.querySelector('.aq-module-plinth__mk[data-k="' + k + '"]'); if (mk && !shown[k]) { shown[k] = 1; gsap.fromTo(mk, { y: -14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: 'back.out(2.4)', clearProps: 'transform,opacity,visibility' }) } } });
    if (!tl) return;
    gsap.set(mks, { autoAlpha: 0 });
    tl.from(el.querySelector('.aq-module-plinth__base'), { autoAlpha: 0, y: 8, duration: 0.5, clearProps: 'transform,opacity,visibility' }, 'pipes');
    tl.from(cards, { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.4);
    // whatever the water timing, every marker is shown by the end
    tl.add(function () { gsap.set(mks, { clearProps: 'transform,opacity,visibility' }) }, 'end');
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
