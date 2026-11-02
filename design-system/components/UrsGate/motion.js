/* UrsGate: the project line runs out towards the gate; as it passes each decision the stem grows from the line to the
   decision, its node seats, the numeral rolls up and the words rise in. The water follows along the line, the gate bar
   drops across its end and the giant word wipes in behind it. One timeline, once on scroll-in, under 4.5 s. */
AQmotion.fx('UrsGate', function (root, m) {
  root.querySelectorAll('.aq-urs-gate').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var nar = m.narrow(), tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var axis = el.querySelector('.aq-urs-gate__axis'), water = el.querySelector('.aq-urs-gate__water');
    tl.from(axis, nar ? { scaleY: 0, duration: 1.6, ease: 'power1.inOut', clearProps: 'transform' } : { scaleX: 0, duration: 1.6, ease: 'power1.inOut', clearProps: 'transform' }, 0);
    var items = [].filter.call(el.querySelectorAll('.aq-urs-gate__item'), function (x) { return x.offsetParent !== null });
    items.forEach(function (it, i) {
      var at = 0.2 + i * 0.26, n = it.querySelector('.aq-urs-gate__n > span');
      tl.from(it.querySelector('.aq-urs-gate__stem'), nar ? { scaleX: 0, duration: 0.4, clearProps: 'transform' } : { scaleY: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform' }, at);
      tl.from(it.querySelector('.aq-urs-gate__node'), { scale: 0, duration: 0.4, ease: 'back.out(2.5)', clearProps: 'transform' }, at);
      if (n) tl.from(n, { yPercent: it.classList.contains('is-low') && !nar ? -100 : 100, duration: 0.8, ease: 'power4.out', clearProps: 'transform' }, at + 0.2);
      tl.from(it.querySelectorAll('.aq-urs-gate__t, .aq-urs-gate__d, .aq-urs-gate__link'), { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, at + 0.3);
    });
    tl.from(water, nar ? { scaleY: 0, duration: 1.4, ease: 'power1.inOut', clearProps: 'transform' } : { scaleX: 0, duration: 1.4, ease: 'power1.inOut', clearProps: 'transform' }, 0.9);
    tl.from(el.querySelector('.aq-urs-gate__bar'), nar ? { scaleX: 0, duration: 0.5, ease: 'power3.inOut', clearProps: 'transform' } : { scaleY: 0, duration: 0.5, ease: 'power3.inOut', clearProps: 'transform' }, 2.1);
    tl.fromTo(el.querySelector('.aq-urs-gate__word'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power2.inOut', clearProps: 'clipPath' }, 2.35);
    tl.from(el.querySelector('.aq-urs-gate__mark'), { autoAlpha: 0, x: -8, duration: 0.4, clearProps: 'transform,opacity,visibility' }, 2.5);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
