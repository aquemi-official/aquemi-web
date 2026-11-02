/* TankSection: the blueprint is drawn as a draughtsman would: floor and legs, then the shell's outline, the cut
   wall's hatching fills in, the head's nozzles and vent filter, the outlet pipe; the water level rises and the spray
   ball's jets open. The two detail circles strike out from their marks; then each callout's leader runs from the
   part to the side, its balloon pops and its label slides in along the hairline. The parts schedule rows follow.
   One timeline, once, under 5 s. */
AQmotion.fx('TankSection', function (root, m) {
  root.querySelectorAll('.aq-tank-section').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, svg = el.querySelector('.aq-tank-section__svg');
    var FR = function (t, set, v, at) { if (set && set.length !== 0) t.from(set, v, at); return t };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })), D = !!window.DrawSVGPlugin;
    var calls = qa('.aq-tank-section__call').filter(function (c) { return c.offsetParent !== null });
    if (svg) {
      var lines = qa('.aq-tank-section__floor, .aq-tank-section__thin, .aq-tank-section__ln, .aq-tank-section__bead, .aq-tank-section__dim, .aq-tank-section__det, .aq-tank-section__lead, .aq-tank-section__prof', svg);
      if (D) tl.from(lines, { drawSVG: '0%', duration: 1.1, stagger: 0.012, ease: 'power2.inOut' }, 0);
      else tl.from(lines, { autoAlpha: 0, duration: 0.8 }, 0);
      FR(tl, qa('.aq-tank-section__wall, .aq-tank-section__eq', svg), { autoAlpha: 0, duration: 0.6, stagger: 0.04, clearProps: 'opacity,visibility' }, 0.7);
      var water = svg.querySelector('.aq-tank-section__water');
      if (water) tl.from(water, { scaleY: 0, transformOrigin: '50% 100%', duration: 0.9, ease: 'power2.out', clearProps: 'transform' }, 1.0);
      FR(tl, qa('.aq-tank-section__jet', svg), { autoAlpha: 0, scale: 0.2, transformOrigin: '50% 0%', duration: 0.4, stagger: 0.03, clearProps: 'transform,opacity,visibility' }, 1.5);
      FR(tl, qa('.aq-tank-section__flow, .aq-tank-section__cut, .aq-tank-section__mark, .aq-tank-section__tx', svg), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 1.3);
      FR(tl, qa('.aq-tank-section__detail', svg), { scale: 0, transformOrigin: '50% 50%', autoAlpha: 0, duration: 0.6, stagger: 0.2, ease: 'back.out(1.6)', clearProps: 'transform,opacity,visibility' }, 1.6);
      var leads = qa('.aq-tank-section__leader', svg), balls = qa('.aq-tank-section__balloon', svg);
      leads.forEach(function (l, i) { var at = 2.1 + i * 0.22;
        if (D && calls.length) tl.from(l, { drawSVG: '0%', duration: 0.45, ease: 'power2.inOut' }, at);
        if (balls[i]) tl.from(balls[i], { scale: 0, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(2.4)', clearProps: 'transform' }, at + 0.15);
        if (calls[i]) tl.from(calls[i], { x: calls[i].classList.contains('is-r') ? 24 : -24, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, at + 0.35) });
    }
    var rows = qa('.aq-tank-section__sched tbody tr').filter(function (r) { return r.offsetParent !== null });
    if (rows.length) tl.from(rows, { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, 2.6);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
