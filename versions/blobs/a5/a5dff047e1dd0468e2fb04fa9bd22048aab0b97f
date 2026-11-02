/* BinderSpines: the plant is drawn first (IsoKit's choreography: parts back to front, pipes along the route, the water
   once round the loop), the shelf runs out from the left, then the binders are filed onto it one by one, each sliding
   down into its place and settling; its paper label prints in, the clause decodes, the reading and the answer follow.
   One timeline, once on scroll-in, under 4.5 s. Folded binders (phones) are left alone; nothing under reduced motion. */
AQmotion.fx('BinderSpines', function (root, m) {
  root.querySelectorAll('.aq-binder-spines').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var nar = m.narrow(), tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var svg = el.querySelector('svg.aq-iso'), pt = svg && window.AQiso ? AQiso.timeline(svg, m, { draw: 1.3, flow: 1.6, keep: false }) : null;
    tl.from(el.querySelector('.aq-binder-spines__shelf'), { scaleX: 0, duration: 0.8, ease: 'power2.inOut', clearProps: 'transform' }, 0.1);
    var books = [].filter.call(el.querySelectorAll('.aq-binder-spines__book'), function (b) { return b.offsetParent !== null });
    books.forEach(function (b, i) {
      var at = 0.4 + i * 0.16, code = b.querySelector('.aq-binder-spines__code');
      tl.from(b, nar ? { x: -40, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' } : { y: -60, rotation: i % 2 ? 2 : -2, transformOrigin: '50% 100%', autoAlpha: 0, duration: 0.7, ease: 'aq-settle', clearProps: 'transform,opacity,visibility' }, at);
      tl.fromTo(b.querySelector('.aq-binder-spines__label'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power2.inOut', clearProps: 'clipPath' }, at + 0.35);
      if (code && window.ScrambleTextPlugin) { if (!code.getAttribute('aria-label')) code.setAttribute('aria-label', code.textContent); tl.to(code, { duration: 0.7, scrambleText: { text: code.textContent, chars: '0123456789.-', speed: 0.6 }, ease: 'none' }, at + 0.45) }
      tl.from(b.querySelectorAll('.aq-binder-spines__d, .aq-binder-spines__go'), { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, at + 0.55);
    });
    m.on(el, function () { tl.play(); if (pt) pt.play() }, 'top 75%');
  });
});
