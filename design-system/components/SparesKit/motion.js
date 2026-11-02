/* SparesKit: the tray is laid and each part drops into its pocket: the pockets show first, then the parts settle
   into them one after another (a short drop and a settle), each slot's name and rules rising after its part. One
   timeline, once, about 2.5 s. Phones: each slot plays as it scrolls in. Hover lifts a part (CSS). */
AQmotion.fx('SparesKit', function (root, m) {
  root.querySelectorAll('.aq-spares-kit').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var slots = [].slice.call(el.querySelectorAll('.aq-spares-kit__slot')), key = el.querySelector('.aq-spares-kit__key');
    function play(list, t0) {
      var tl = m.tw(gsap.timeline({ paused: true }));
      list.forEach(function (s, i) {
        var at = t0 + i * 0.16, part = s.querySelector('.aq-spares-kit__part'), pocket = s.querySelector('.aq-spares-kit__pocket'), txt = s.querySelectorAll('.aq-spares-kit__t, .aq-spares-kit__rule');
        tl.from(pocket, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, at);
        tl.from(part, { y: -26, x: 6, autoAlpha: 0, duration: 0.6, ease: 'aq-settle', clearProps: 'transform,opacity,visibility' }, at + 0.12);
        tl.from(txt, { y: 12, autoAlpha: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at + 0.3);
      });
      return tl;
    }
    if (m.narrow()) { slots.forEach(function (s) { var t = play([s], 0); m.on(s, function () { t.play() }, 'top 88%') }); return }
    var tl = play(slots, 0);
    if (key) tl.from(key, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.2 + slots.length * 0.16);
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)' });
    tl.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.inOut', clearProps: 'clipPath' }, 0);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
