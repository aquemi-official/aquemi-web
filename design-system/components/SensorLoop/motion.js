/* SensorLoop: the loop is drawn and commissioned. The equipment draws back to front and the water runs the loop
   once (IsoKit's choreography, AQiso.timeline), each stage lighting as the water reaches it; as the water passes a
   measuring point its balloon strikes on, then every leader runs from its schedule card down (or up) to the balloon
   and the card prints. Last the bus: the taps drop into it and the data recording balloon lands at its end. Hover a
   card to light its leader, balloons and tap. One timeline, once, < 5 s. Phones: the cards rise in order. */
AQmotion.fx('SensorLoop', function (root, m) {
  root.querySelectorAll('.aq-sensor-loop').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s) { return [].slice.call(el.querySelectorAll(s)) }, svg = el.querySelector('svg.aq-iso');
    var cards = qa('.aq-sensor-loop__card').filter(function (c) { return !c.classList.contains('aq-fold-x') || !m.narrow() });
    var balls = qa('.aq-sensor-loop__ball'), leads = qa('.aq-sensor-loop__lead'), bus = qa('.aq-sensor-loop__bus, .aq-sensor-loop__tap, .aq-sensor-loop__node');
    var tl = svg && window.AQiso ? AQiso.timeline(svg, m, { draw: 1.3, pipe: 0.6, flow: 1.4, stagger: 0.04 }) : null;
    if (!tl) { tl = m.tw(gsap.timeline({ paused: true })) }
    var t0 = tl.duration() ? Math.max(1.3, tl.duration() - 1.2) : 0.3;
    gsap.set(balls, { autoAlpha: 0 }); gsap.set(bus, { autoAlpha: 0 });
    var flowAt = tl.labels && tl.labels.flow != null ? tl.labels.flow : t0;
    tl.to(balls, { autoAlpha: 1, duration: 0.25, stagger: 0.09, clearProps: 'opacity,visibility' }, flowAt + 0.2);
    tl.from(balls, { scale: 1.6, transformOrigin: '50% 50%', duration: 0.35, stagger: 0.09, ease: 'back.out(2)', clearProps: 'transform' }, flowAt + 0.2);
    if (!m.narrow()) {
      if (window.DrawSVGPlugin) { leads.forEach(function (l) { l.setAttribute('vector-effect', 'non-scaling-stroke') });
        tl.fromTo(leads, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: 0.07, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, flowAt + 0.5) }
      tl.from(cards, { y: function (i, c) { return c.classList.contains('aq-sensor-loop__card--b') ? 12 : -12 }, autoAlpha: 0, duration: 0.45, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, flowAt + 0.6);
    } else tl.from(cards, { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 0.2);
    tl.to(bus, { autoAlpha: 1, duration: 0.4, stagger: 0.03, clearProps: 'opacity,visibility' }, flowAt + 1.1);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
