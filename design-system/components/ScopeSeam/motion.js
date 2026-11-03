/* ScopeSeam: the ambient loop is drawn whole, then the seam is set. On scroll-in the navy drawing's lines draw on
   (DrawSVG, 1.1 s), the two tie-in nodes press onto the seam (scale from 0, 0.3 s, 0.1 s apart), then the dashed loop
   outside fades in and its dashes creep once in the flow direction, and the two lists rise in (8 px, 70 ms apart).
   Once, under 3 s; nothing under reduced motion (the finished drawing shows). */
AQmotion.fx('ScopeSeam', function (root, m) {
  root.querySelectorAll('.aq-scope-seam').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    /* only the pipes drawn at this width (desktop branches or the phone ones that turn down through the seam) */
    var solid = q('.aq-scope-seam__fig.is-in .aq-scope-seam__loop, .aq-scope-seam__tank, .aq-scope-seam__pump').filter(function (p) { return getComputedStyle(p).display !== 'none' });
    if (window.DrawSVGPlugin) tl.fromTo(solid, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', stagger: 0.05, clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
    tl.from(q('.aq-scope-seam__arrow, .aq-scope-seam__valve, .aq-scope-seam__pumpt, .aq-scope-seam__lab'), { autoAlpha: 0, duration: 0.4, stagger: 0.03, clearProps: 'opacity,visibility' }, 0.6)
      .from(q('.aq-scope-seam__node, .aq-scope-seam__nd'), { scale: 0, transformOrigin: '50% 50%', duration: 0.3, stagger: 0.1, ease: 'back.out(2)', clearProps: 'transform' }, 0.9)
      .from(q('.aq-scope-seam__fig.is-out .aq-scope-seam__svg'), { autoAlpha: 0, duration: 0.5, clearProps: 'opacity,visibility' }, 1.1)
      .fromTo(q('.aq-scope-seam__dash'), { strokeDashoffset: 0 }, { strokeDashoffset: -44, duration: 1.4, ease: 'power1.out', clearProps: 'strokeDashoffset' }, 1.1)
      .from(q('.aq-scope-seam__item, .aq-scope-seam__limit'), { autoAlpha: 0, y: 8, duration: 0.45, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, 0.5);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
