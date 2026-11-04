/* DrawingRegister: the sheet is drawn. Each frame's outline drawing inks on, left to right (solid strokes drawn, the
   water lines last), then the steel-blue viewfinder settles over the first drawing from a slightly larger square and
   its leader drops to the detail, whose large drawing inks on as the notes rise. One timeline, once, under 3.5 s.
   Selection itself is the renderer's (a CSS transition), so it works with motion off. */
AQmotion.fx('DrawingRegister', function (root, m) {
  root.querySelectorAll('.aq-drawing-register').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var frames = qa('.aq-drawing-register__frame'), vf = el.querySelector('.aq-drawing-register__vf');
    var pane = el.querySelector('.aq-drawing-register__pane.is-on');
    tl.from(frames, { autoAlpha: 0, y: 10, duration: 0.45, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 0);
    if (window.DrawSVGPlugin) frames.forEach(function (f, i) {
      var p = qa('path,circle,ellipse', f).filter(function (x) { return !x.classList.contains('aq-drawing-register__dash') });
      tl.fromTo(p, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: 'power2.inOut', stagger: 0.015, clearProps: 'strokeDasharray,strokeDashoffset' }, 0.15 + i * 0.1);
    });
    tl.from(qa('.aq-drawing-register__code,.aq-drawing-register__name'), { autoAlpha: 0, duration: 0.35, stagger: 0.04, clearProps: 'opacity,visibility' }, 0.4);
    if (vf && !m.narrow()) tl.fromTo(vf, { autoAlpha: 0, scale: 1.18 }, { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)', clearProps: 'opacity,visibility,scale' }, 1.1);
    if (pane) {
      tl.from(pane, { autoAlpha: 0, y: 12, duration: 0.5, clearProps: 'transform,opacity,visibility' }, 1.4);
      if (window.DrawSVGPlugin) tl.fromTo(qa('.aq-drawing-register__svg--big path,.aq-drawing-register__svg--big circle,.aq-drawing-register__svg--big ellipse', pane).filter(function (x) { return !x.classList.contains('aq-drawing-register__dash') }),
        { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: 'power2.inOut', stagger: 0.012, clearProps: 'strokeDasharray,strokeDashoffset' }, 1.5);
    }
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
