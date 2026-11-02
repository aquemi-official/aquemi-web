/* CostBalance: the boundary is drawn, the water line runs down through the train and each glyph seats as it passes;
   then the streams arrive one by one (each wire runs from its text to the boundary and its arrowhead lands), and last
   the water leaves to drain along the outgoing wire. One timeline, once, about 3 s. Phones: the streams rise in order,
   the train fills left to right. */
AQmotion.fx('CostBalance', function (root, m) {
  root.querySelectorAll('.aq-cost-balance').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)).filter(function (x) { return x.offsetParent || x.getClientRects().length }) };
    var tl = m.tw(gsap.timeline({ paused: true })), nar = m.narrow();
    var edge = el.querySelector('.aq-cost-balance__edge'), water = el.querySelector('.aq-cost-balance__water'), gl = q('.aq-cost-balance__g');
    var sin = q('.aq-cost-balance__s--in'), sout = q('.aq-cost-balance__s--out');
    tl.from(edge, { autoAlpha: 0, scale: 0.96, duration: 0.5, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0);
    tl.from(water, nar ? { scaleX: 0, duration: 0.9, ease: 'power1.inOut', clearProps: 'transform' } : { scaleY: 0, duration: 0.9, ease: 'power1.inOut', clearProps: 'transform' }, 0.2);
    tl.from(gl, { autoAlpha: 0, y: nar ? 0 : -8, x: nar ? -8 : 0, duration: 0.35, stagger: 0.12, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.25);
    sin.forEach(function (s, i) {
      var at = 0.6 + i * 0.18, t = s.querySelector('.aq-cost-balance__txt'), ln = s.querySelector('.aq-cost-balance__line'), hd = s.querySelector('.aq-cost-balance__head');
      tl.from(t, { autoAlpha: 0, x: nar ? 0 : -14, y: nar ? 12 : 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at);
      if (!nar) { tl.from(ln, { scaleX: 0, duration: 0.55, ease: 'power2.inOut', clearProps: 'transform' }, at + 0.15); tl.from(hd, { autoAlpha: 0, duration: 0.2, clearProps: 'opacity,visibility' }, at + 0.65) }
    });
    var tOut = 0.75 + sin.length * 0.18;
    sout.forEach(function (s, i) {
      var t = s.querySelector('.aq-cost-balance__txt'), ln = s.querySelector('.aq-cost-balance__line'), hd = s.querySelector('.aq-cost-balance__head');
      if (!nar) { tl.from(ln, { scaleX: 0, duration: 0.6, ease: 'power1.inOut', clearProps: 'transform' }, tOut + i * 0.2); tl.from(hd, { autoAlpha: 0, duration: 0.2, clearProps: 'opacity,visibility' }, tOut + 0.55 + i * 0.2) }
      tl.from(t, { autoAlpha: 0, x: nar ? 0 : 14, y: nar ? 12 : 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, tOut + 0.4 + i * 0.2);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
