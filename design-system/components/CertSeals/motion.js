/* CertSeals: the certificates are sealed. Tiles rise in from the left in turn; on each, the seal's ring draws round
   and its ticks turn into place, then the icon strikes into the centre like a stamp (large and light, down hard, a
   small jolt through the tile) and the tag and lines settle under it. One timeline, once, under 3 s. */
AQmotion.fx('CertSeals', function (root, m) {
  root.querySelectorAll('.aq-cert-seals').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var tiles = [].slice.call(el.querySelectorAll('.aq-cert-seals__tile')), D = window.DrawSVGPlugin;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tiles.forEach(function (t, i) {
      var at = i * 0.3, ring = t.querySelector('.aq-cert-seals__ring'), ticks = t.querySelector('.aq-cert-seals__ticks'), icon = t.querySelector('.aq-cert-seals__icon'),
        words = t.querySelectorAll('.aq-cert-seals__tag, .aq-cert-seals__t, .aq-cert-seals__d, .aq-cert-seals__go');
      tl.from(t, { y: 40, autoAlpha: 0, duration: 0.7, clearProps: 'transform,opacity,visibility' }, at);
      if (ring && D) tl.from(ring, { drawSVG: '0%', duration: 0.6, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, at + 0.25);
      if (ticks) tl.from(ticks, { rotation: -60, svgOrigin: '32 32', autoAlpha: 0, duration: 0.8, clearProps: 'transform,opacity,visibility' }, at + 0.25);
      if (icon) {
        tl.fromTo(icon, { scale: 2.2, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.22, ease: 'power4.in', clearProps: 'opacity,visibility' }, at + 0.75)
          .to(t, { y: 3, duration: 0.06, yoyo: true, repeat: 1, ease: 'power1.inOut', clearProps: 'transform' }, at + 0.97);
        tl.set(icon, { clearProps: 'transform' }, at + 1.0);
      }
      if (words.length) tl.from(words, { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, at + 0.5);
    });
    m.on(el, function () { tl.play() }, 'top 80%');
  });
});
