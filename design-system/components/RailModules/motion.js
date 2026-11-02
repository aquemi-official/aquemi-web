/* RailModules: the panel is fitted. The rail slides along the plate, the nameplate decodes, then the modules drop
   onto the rail one after another and seat with a small settle; their terminal screws turn home, each lamp tests
   (lights, then goes back to its rest state), and each module's leader runs down to its callout, which prints.
   Hover lifts a module off the rail and lights its lamp. One timeline, once, < 5 s. Phones: the vertical rail grows
   down and the modules slide onto it from the right. */
AQmotion.fx('RailModules', function (root, m) {
  root.querySelectorAll('.aq-rail-modules').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, nar = m.narrow();
    var mods = qa('.aq-rail-modules__m').filter(function (x) { return !nar || !x.classList.contains('aq-fold-x') });
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var rail = el.querySelector('.aq-rail-modules__rail'), base = el.querySelector('.aq-rail-modules__base span');
    if (rail) tl.from(rail, nar ? { scaleY: 0, transformOrigin: '50% 0%', duration: 0.8, clearProps: 'transform' } : { xPercent: -100, duration: 0.9, ease: 'power3.inOut', clearProps: 'transform' }, 0);
    if (base) { tl.from(base, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, 0.3); if (window.ScrambleTextPlugin) { var s = base.textContent; base.setAttribute('aria-label', s); tl.to(base, { duration: 0.6, scrambleText: { text: s, chars: 'upperCase', speed: 0.6 }, ease: 'none' }, 0.3) } }
    mods.forEach(function (mo, i) {
      var t = 0.5 + i * 0.22, body = mo.querySelector('.aq-rail-modules__body'), d = mo.querySelector('.aq-rail-modules__d');
      tl.from(body, nar ? { x: 40, autoAlpha: 0, duration: 0.55, clearProps: 'transform,opacity,visibility' } : { y: -40, autoAlpha: 0, duration: 0.6, ease: window.CustomEase && CustomEase.get('aq-settle') ? 'aq-settle' : 'power3.out', clearProps: 'transform,opacity,visibility' }, t);
      tl.from(qa('.aq-rail-modules__term i', mo), { rotation: '-=90', duration: 0.5, stagger: 0.02, ease: 'power2.out', clearProps: 'transform' }, t + 0.35);
      tl.call(function () { mo.classList.add('is-on') }, null, t + 0.55);
      tl.call(function () { mo.classList.remove('is-on') }, null, t + 1.25);
      if (d) {
        if (!nar) tl.fromTo(d, { '--rm-lead': 0 }, { '--rm-lead': 1, duration: 0.4, ease: 'power2.out', clearProps: '--rm-lead' }, t + 0.5);
        tl.from(d, { y: 8, autoAlpha: 0, duration: 0.45, clearProps: 'transform,opacity,visibility' }, t + 0.6);
      }
      if (nar) gsap.set(mo, { autoAlpha: 1 });
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
