/* JointTag: the joint is made, then logged. The two pipe lengths slide in from either edge and meet; the fusion bead
   rolls up out of the seam; the lot markings print along each length and the joint number is sprayed on; the wire
   draws round the joint and down, the tag drops on it and swings to rest; the pins land on their parts and the fields
   print row by row. One timeline, once, under 4.5 s. */
AQmotion.fx('JointTag', function (root, m) {
  root.querySelectorAll('.aq-joint-tag').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, D = window.DrawSVGPlugin;
    var svg = el.querySelector('.aq-joint-tag__pipe svg'), tag = el.querySelector('.aq-joint-tag__tag');
    if (!svg || !tag) return;
    var bodies = qa('.aq-joint-tag__body, .aq-joint-tag__shade', svg), L = bodies.filter(function (b, i) { return i < 2 }), R = bodies.filter(function (b, i) { return i >= 2 });
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tl.from(L.concat(qa('.aq-joint-tag__print', svg).slice(0, 1)), { x: -260, duration: 0.9, ease: 'power3.inOut', clearProps: 'transform' }, 0)
      .from(R.concat(qa('.aq-joint-tag__print, .aq-joint-tag__sten, .aq-joint-tag__cut, .aq-joint-tag__cutm', svg).slice(1)), { x: 260, duration: 0.9, ease: 'power3.inOut', clearProps: 'transform' }, 0)
      .from(qa('.aq-joint-tag__hi, .aq-joint-tag__edge', svg), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.6)
      .from(qa('.aq-joint-tag__fuse', svg), { scaleX: 0, transformOrigin: '50% 50%', duration: 0.3, clearProps: 'transform' }, 0.85)
      .from(qa('.aq-joint-tag__bead, .aq-joint-tag__curl', svg), { scaleY: 0, transformOrigin: '50% 50%', transformBox: 'fill-box', duration: 0.6, ease: 'back.out(2)', clearProps: 'transform' }, 0.95)
      .from(qa('.aq-joint-tag__seam', svg), { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, 1.2)
      .from(qa('.aq-joint-tag__print rect', svg), { autoAlpha: 0, duration: 0.05, stagger: 0.012, clearProps: 'opacity,visibility' }, 1.2)
      .from(qa('.aq-joint-tag__sten', svg), { clipPath: 'inset(0 100% 0 0)', duration: 0.4, ease: 'power2.inOut', clearProps: 'clipPath' }, 1.4)
      .from(qa('.aq-joint-tag__coupon', svg), { autoAlpha: 0, y: -20, duration: 0.5, clearProps: 'transform,opacity,visibility' }, 1.3);
    var wire = qa('.aq-joint-tag__wire', svg);
    if (D) tl.fromTo(wire, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 1.5);
    tl.from(tag, { y: -50, rotation: -4, autoAlpha: 0, transformOrigin: '60.33% 0', duration: 0.5, ease: 'power2.in', clearProps: 'opacity,visibility' }, 1.9)
      .to(tag, { keyframes: [{ rotation: 2.2, duration: 0.35, ease: 'sine.out' }, { rotation: -1.1, duration: 0.35, ease: 'sine.inOut' }, { rotation: 0.4, duration: 0.3, ease: 'sine.inOut' }, { rotation: 0, duration: 0.25, ease: 'sine.inOut' }], clearProps: 'transform' }, 2.4)
      .from(qa('.aq-joint-tag__pin', svg), { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%', transformBox: 'fill-box', duration: 0.35, stagger: 0.08, ease: 'back.out(3)', clearProps: 'transform,opacity,visibility' }, 2.3);
    var fields = qa('.aq-joint-tag__field').filter(function (f) { return f.offsetParent });
    if (fields.length) tl.from(fields, { clipPath: 'inset(0 0 100% 0)', duration: 0.45, stagger: 0.07, ease: 'power2.out', clearProps: 'clipPath' }, 2.5);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
