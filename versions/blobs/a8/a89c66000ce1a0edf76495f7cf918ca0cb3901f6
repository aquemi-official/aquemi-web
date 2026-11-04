/* TrainStrip: the water runs the train. The PVC feed and the PP pipe draw left to right in one pass (2 s), each
   station's equipment arrives as the water reaches it, its marker drops in, captions rise in turn. The station pace
   follows Subframe Motion "Process choreography" (process-choreography), MIT, (c) 2026 Subframe: parts arrive in
   sequence inside one window, a fixed step apart, scaling in from 0.96. Once, under 4.5 s. Phones: the riser's
   symbols pop and the rows rise. Reduced motion: nothing runs (the finished strip is the markup). */
AQmotion.fx('TrainStrip', function (root, m) {
  root.querySelectorAll('.aq-train-strip').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var stages = qa('.aq-train-strip__stage');
    if (!m.narrow()) {
      var pipes = qa('.aq-train-strip__svg > .aq-train-strip__pvc, .aq-train-strip__svg > .aq-train-strip__pp');
      if (window.DrawSVGPlugin) tl.fromTo(pipes, { drawSVG: '0%' }, { drawSVG: '100%', duration: 2, ease: 'power1.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
      qa('.aq-train-strip__node').forEach(function (g, i) {
        tl.from(g, { autoAlpha: 0, scale: 0.96, transformOrigin: '50% 50%', duration: 0.4, clearProps: 'transform,opacity,visibility' }, 0.2 + i * 0.24);
      });
      tl.from(qa('.aq-train-strip__mark'), { autoAlpha: 0, y: -8, duration: 0.35, stagger: 0.12, clearProps: 'transform,opacity,visibility' }, 1.2);
      tl.from(qa('.aq-train-strip__chev'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 2);
      tl.from(stages, { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 1.4);
    } else {
      tl.from(qa('.aq-train-strip__glyph'), { scale: 0.6, autoAlpha: 0, duration: 0.35, stagger: 0.1, ease: 'back.out(1.6)', clearProps: 'transform,opacity,visibility' }, 0);
      tl.from(stages, { y: 10, autoAlpha: 0, duration: 0.4, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0.1);
    }
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
