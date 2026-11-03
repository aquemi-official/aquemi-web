/* ConfigCards: the cards' drawings open behind a navy shutter that lifts strip by strip, card after card, then the water
   runs once from the package to the use in each card (IsoKit's flow, no line draw-on). One timeline, once, about 3 s.
   Ported from Subframe Motion "Staggered shutter reveal" (shutter-scene), MIT, (c) 2026 Subframe: panels lift upward
   in a 45 ms stagger, 820 ms each with a strong ease-out. Reduced motion: no shutter is inserted, nothing moves, the
   drawings are complete. */
AQmotion.fx('ConfigCards', function (root, m) {
  root.querySelectorAll('.aq-config-cards').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var cards = [].slice.call(el.querySelectorAll('.aq-config-cards__card'));
    var tl = gsap.timeline({ paused: true }); m.tw(tl);
    var narrow = m.narrow(), N = 5;
    cards.forEach(function (c, k) {
      var fig = c.querySelector('.aq-config-cards__fig'), svg = fig && fig.querySelector('svg.aq-iso');
      if (!fig) return;
      var sh = document.createElement('span'); sh.className = 'aq-config-cards__shutter'; sh.setAttribute('aria-hidden', 'true');
      for (var i = 0; i < N; i++) sh.appendChild(document.createElement('i'));
      fig.appendChild(sh);
      var at = (narrow ? Math.min(k, 2) : k) * 0.12;
      tl.to(sh.children, { scaleY: 0, duration: 0.82, ease: 'power4.out', stagger: 0.045 }, at)
        .add(function () { if (sh.parentNode) sh.parentNode.removeChild(sh) }, at + 0.82 + 0.045 * (N - 1));
      tl.from(c.querySelector('.aq-config-cards__body'), { y: 12, autoAlpha: 0, duration: 0.5, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at + 0.25);
      var iso = window.AQiso && svg ? AQiso.timeline(svg, m, { draw: 0, pipe: 0, flow: 1.0, drop: true }) : null;
      if (iso) { iso.paused(false); tl.add(iso, at + 0.55) }
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
