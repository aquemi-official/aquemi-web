/* DuplexTrains: the drawing is built through the IsoKit choreography (equipment back to front, pipes laid, the water
   run once through the train in service, the tank, both pumps and the loop), the train tags and the loop label come in
   with the pipes, and the option cards rise into the band one after another. Once on scroll-in, under 5 s.
   The swap (visitor-driven, may repeat): the trains trade duty in the drawing; motion runs the water again through the
   train now in service (0.6 s), while the switch turns its arrows and rolls its letter over (CSS).
   Ported from Subframe Motion "Theme toggle button" (switch-button), MIT, (c) 2026 Subframe (kept: one aria-pressed
   button, the icon turning 180 deg in 700 ms cubic-bezier(.645,.045,.355,1), the state label changing in 250 ms (here a roll, not a fade, so no face is left hidden) and
   a sweep across the button in 500 ms on the same curve; replaced: light/dark with the train in service, the shine
   gradient with a flow rule). Nothing under reduced motion: the state changes instantly. */
AQmotion.fx('DuplexTrains', function (root, m) {
  root.querySelectorAll('.aq-duplex-trains').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('svg.aq-iso'), D = window.DrawSVGPlugin;
    var cards = [].filter.call(el.querySelectorAll('.aq-duplex-trains__card'), function (c) { return c.offsetParent !== null });
    var tl = window.AQiso && AQiso.timeline(svg, m, { draw: 1.4, pipe: 0.7, flow: 1.6 });
    if (tl) {
      tl.from(el.querySelectorAll('.aq-duplex-trains__tag, .aq-duplex-trains__base'), { autoAlpha: 0, y: 8, duration: 0.5, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 'pipes');
      tl.from(cards, { y: 16, autoAlpha: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.5);
      m.on(el.querySelector('.aq-duplex-trains__fig') || svg, function () { tl.play() }, 'top 75%');
    }
    window.AQduplexRun = function (w, r) {
      if (!D) return;
      var f = [].slice.call(w.querySelectorAll('svg.aq-iso [data-iso-id="train' + r + '"] .aq-iso__flow, svg.aq-iso .aq-iso__flow[data-iso-id="train' + r + '"]'));
      if (!f.length) return;
      gsap.killTweensOf(f);
      gsap.fromTo(f, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' });
    };
  });
});
