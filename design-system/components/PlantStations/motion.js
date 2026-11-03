/* PlantStations: the room is drawn, then the water walks the route. On scroll-in the IsoKit choreography plays on the
   plan (equipment draws back to front, 1.2 s), the dashed route creeps once in the flow direction, and each station's
   tag drops onto it in row order (0.3 s, 0.12 s apart) as its row rises in beside the plan. Once, under 4 s; nothing
   under reduced motion (the finished plan shows; pointing at a row still lights its station, by CSS). */
AQmotion.fx('PlantStations', function (root, m) {
  root.querySelectorAll('.aq-plant-stations').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('svg.aq-iso'), q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var tl = (window.AQiso && svg) ? AQiso.timeline(svg, m, { draw: 1.2, flow: 1.2 }) : null;
    if (!tl) tl = m.tw(gsap.timeline({ paused: true }));
    tl.fromTo(q('.aq-plant-stations__route'), { strokeDashoffset: 0 }, { strokeDashoffset: -44, duration: 1.6, ease: 'power1.out', clearProps: 'strokeDashoffset' }, 0.4)
      .from(q('.aq-plant-stations__tag'), { autoAlpha: 0, y: -8, duration: 0.3, stagger: 0.12, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.9)
      .from(q('.aq-plant-stations__row'), { autoAlpha: 0, y: 8, duration: 0.4, stagger: 0.12, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.9);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
