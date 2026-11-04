/* SensorLoop: the loop is drawn, then commissioned point by point. On scroll-in the pipe's walls draw round the loop
   in the water's direction (DrawSVG, 1.2 s), the equipment fades up behind it, then each balloon strikes on in water
   order (scale from 1.4, 0.3 s, 0.09 s apart) as its stem drops to the pipe, and the notes print in order along the foot.
   Once, under 3 s; nothing under reduced motion (the finished sheet shows). Pointing at a note lights its marks (CSS
   and the renderer, so it works with motion off). */
AQmotion.fx('SensorLoop', function (root, m) {
  root.querySelectorAll('.aq-sensor-loop').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = [].slice.call(el.querySelectorAll('.aq-sensor-loop__svg')).filter(function (s) { return s.getClientRects().length })[0];
    if (!svg) return;
    var q = function (s) { return [].slice.call(svg.querySelectorAll(s)) };
    var cards = [].slice.call(el.querySelectorAll('.aq-sensor-loop__card')).filter(function (c) { return c.getClientRects().length });
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (window.DrawSVGPlugin) tl.fromTo(q('.aq-sensor-loop__wall, .aq-sensor-loop__bore'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.2, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
    tl.from(q('.aq-sensor-loop__tank, .aq-sensor-loop__mk, .aq-sensor-loop__arrow'), { autoAlpha: 0, duration: 0.4, stagger: 0.06, clearProps: 'opacity,visibility' }, 0.3)
      .from(q('.aq-sensor-loop__stem, .aq-sensor-loop__bus, .aq-sensor-loop__ht'), { autoAlpha: 0, duration: 0.3, stagger: 0.05, clearProps: 'opacity,visibility' }, 0.9)
      .from(q('.aq-sensor-loop__ball'), { autoAlpha: 0, scale: 1.4, transformOrigin: '50% 50%', duration: 0.3, stagger: 0.09, ease: 'back.out(2)', clearProps: 'transform,opacity,visibility' }, 1.0)
      .from(cards, { autoAlpha: 0, y: 8, duration: 0.4, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, 1.1);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
