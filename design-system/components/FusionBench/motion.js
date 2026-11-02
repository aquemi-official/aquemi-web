/* FusionBench: the shop drawing is drawn, then called out. The sheet fades up and the bench builds back to front
   (AQiso.timeline: lines draw, the rinse water runs once); then each balloon's leader runs out from its part, the
   balloon lands and its parts-list row slides in beside the drawing in the same order. Parts lit on the way settle.
   One timeline, once, under 5 s. */
AQmotion.fx('FusionBench', function (root, m) {
  root.querySelectorAll('.aq-fusion-bench').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, D = window.DrawSVGPlugin;
    var svg = el.querySelector('svg.aq-iso'); if (!svg || !window.AQiso) return;
    var tl = AQiso.timeline(svg, m, { draw: 1.5, flow: 0.8, keep: false });
    if (!tl) return;
    var t = tl.duration() - 0.2;
    var rows = qa('.aq-fusion-bench__row').filter(function (r) { return r.offsetParent }), cap = qa('.aq-fusion-bench__cap, .aq-fusion-bench__cols');
    if (cap.length) tl.from(cap, { autoAlpha: 0, y: 8, duration: 0.4, clearProps: 'transform,opacity,visibility' }, 0.2);
    qa('.aq-fusion-bench__ball').forEach(function (b, i) {
      var k = b.getAttribute('data-k'), g = svg.querySelector('g[data-k="' + k + '"]'), line = g && g.querySelector('.aq-iso__leader-line'), at = Math.min(t, 1.6) + i * 0.16;
      if (line && D) tl.fromTo(line, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.35, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, at);
      tl.from(b, { scale: 0, autoAlpha: 0, duration: 0.3, ease: 'back.out(3)', clearProps: 'transform,opacity,visibility' }, at + 0.25);
    });
    if (rows.length) tl.from(rows, { x: 24, autoAlpha: 0, duration: 0.45, stagger: 0.16, clearProps: 'transform,opacity,visibility' }, Math.min(t, 1.6) + 0.2);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
