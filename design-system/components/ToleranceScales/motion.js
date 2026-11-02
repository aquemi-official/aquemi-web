/* ToleranceScales: each instrument row calibrates as it scrolls in. The name rises, the ruler's ticks run out from
   the left, the nominal line drops, the acceptance band opens outwards from the nominal to its limits (the limit
   lines strike last) and the figure rises out of a mask. Once per row, about 1.4 s. Hover deepens a row's bands (CSS). */
AQmotion.fx('ToleranceScales', function (root, m) {
  root.querySelectorAll('.aq-tolerance-scales').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    [].forEach.call(el.querySelectorAll('.aq-tolerance-scales__row'), function (row) {
      var q = function (s) { return [].slice.call(row.querySelectorAll(s)) }, tl = m.tw(gsap.timeline({ paused: true }));
      tl.from(q('.aq-tolerance-scales__id > *'), { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0);
      tl.from(q('.aq-tolerance-scales__k, .aq-tolerance-scales__f, .aq-tolerance-scales__t'), { yPercent: 60, autoAlpha: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.1);
      tl.from(q('.aq-tolerance-scales__ticks'), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.6, stagger: 0.08, ease: 'power2.inOut', clearProps: 'transform' }, 0.15);
      tl.from(q('.aq-tolerance-scales__nom, .aq-tolerance-scales__ref'), { scaleY: 0, transformOrigin: '50% 0%', duration: 0.3, stagger: 0.08, clearProps: 'transform' }, 0.55);
      q('.aq-tolerance-scales__band').forEach(function (b, i) { b.style.transformBox = 'fill-box'; tl.from(b, { scaleX: 0, transformOrigin: '50% 50%', duration: 0.6, ease: 'power3.out', clearProps: 'transform' }, 0.7 + i * 0.08) });
      tl.from(q('.aq-tolerance-scales__lim'), { autoAlpha: 0, duration: 0.2, stagger: 0.08, clearProps: 'opacity,visibility' }, 1.1);
      m.on(row, function () { tl.play() }, 'top 82%');
    });
  });
});
