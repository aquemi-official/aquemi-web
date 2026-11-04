/* TraceLines: each requirement runs down its line. The code decodes at the start ring, then the line draws down
   station by station (the rail wipes down each stop in turn), every station's text arriving with it; dashed passes
   draw too, the terminus lands and the test-step chips branch out. The two lines run side by side, the second a beat
   behind. The station names slide in first. One timeline, once, under 4 s. */
AQmotion.fx('TraceLines', function (root, m) {
  root.querySelectorAll('.aq-trace-lines').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var docs = qa('.aq-trace-lines__dh, .aq-trace-lines__doc').filter(function (d) { return d.offsetParent });
    if (docs.length) tl.from(docs, { x: -16, autoAlpha: 0, duration: 0.5, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 0);
    qa('.aq-trace-lines__line').forEach(function (ln, j) {
      var t = 0.2 + j * 0.35, head = ln.querySelector('.aq-trace-lines__head'), code = ln.querySelector('.aq-trace-lines__code');
      if (head && head.offsetParent) tl.from(head, { y: 12, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, t);
      if (code) tl.call(function () { m.scramble(code, 0) }, null, t);
      t += 0.4;
      qa('.aq-trace-lines__st', ln).forEach(function (st) {
        tl.fromTo(st, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power2.inOut', clearProps: 'clipPath' }, t);
        /* only rendered chips: GSAP re-inserts an element inside a display:none body (the phone chips picker's closed
           lines) when it measures it, and the MET chip would land at the end of its sentence */
        var chips = qa('.aq-trace-lines__tests li, .aq-trace-lines__met', st).filter(function (c) { return c.offsetParent });
        if (chips.length) tl.from(chips, { x: -14, autoAlpha: 0, duration: 0.35, stagger: 0.12, clearProps: 'transform,opacity,visibility' }, t + 0.35);
        t += 0.42;
      });
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
