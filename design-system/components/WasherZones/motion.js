/* WasherZones: the package draws itself the IsoKit way (equipment back to front, then the pipes, then the water runs
   the route once), and each zone stamps in as the water reaches it: its dashed frame settles in and its numbered tag
   drops onto the corner, while the rows rise in under the drawing. Generation stamps as the water sets off; then
   storage and loop, the washer's tie-in, and monitoring on the return, in the water's order.
   Ported from Subframe Motion "Animated workflow diagram" (process-choreography), MIT, (c) 2026 Subframe: the source
   first, then each branch's output arriving as its stretch of the flow lands (cubic ease-out, staggered windows).
   One timeline, once on scroll-in, under 4 s. Reduced motion: the finished drawing (the core does not run). The
   zone focus and the phone camera live in the renderer, so they work under reduced motion too. */
AQmotion.fx('WasherZones', function (root, m) {
  root.querySelectorAll('.aq-washer-zones').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('svg.aq-iso'); if (!svg || !window.AQiso) return;
    var tl = AQiso.timeline(svg, m, { draw: 1.2, pipe: 0.6, flow: 1.4, drop: true });
    if (!tl) return;
    var at = tl.data.arrive, t0 = tl.labels.flow || 2, when = [t0, at.loop, at.mon, at.tie];
    for (var z = 0; z < 4; z++) {
      var t = when[z] == null ? t0 + 0.3 * z : when[z];
      var fr = el.querySelectorAll('.aq-washer-zones__frame[data-z="' + z + '"]'), tg = el.querySelectorAll('.aq-washer-zones__tag[data-z="' + z + '"]');
      if (fr.length) tl.fromTo(fr, { autoAlpha: 0, scale: 0.96, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'cubic.out', clearProps: 'opacity,visibility,transform' }, t);
      if (tg.length) tl.fromTo(tg, { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' }, { autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.35, ease: 'cubic.out', clearProps: 'opacity,visibility,clipPath' }, t + 0.1);
    }
    var rows = el.querySelectorAll('.aq-washer-zones__row');
    if (rows.length) tl.from(rows, { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.3);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
