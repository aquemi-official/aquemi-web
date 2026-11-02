/* ShopFloor: the shop is drawn, then walked. On scroll-in the floor slab and walls draw, each station's equipment
   draws on back to front (IsoKit choreography), the walking route is laid, then a drop walks it from the shop door
   station to station: each station lights as it is reached, its pin drops in and its card's rule runs across. Then
   the plan hands over to the reader (hover, focus or, on wide screens, scrolling a card past the middle lights its
   station). Cards slide in from the right as they reach the view. Plan under 4.5 s; each card under 1 s. */
AQmotion.fx('ShopFloor', function (root, m) {
  root.querySelectorAll('.aq-shop-floor').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('svg.aq-iso'), pins = [].slice.call(el.querySelectorAll('.aq-shop-floor__pin'));
    var ready = function () { if (window.AQshopFloor) AQshopFloor.ready(el) };
    var card = function (id) { return el.querySelector('.aq-shop-floor__card[data-st="' + id + '"]') };
    var pin = function (id) { return el.querySelector('.aq-shop-floor__pin[data-st="' + id + '"]') };
    gsap.set(pins, { autoAlpha: 0, y: -12 });
    var it = svg && window.AQiso && AQiso.timeline(svg, m, { draw: 1.5, pipe: 0.6, flow: m.narrow() ? 1.4 : 1.8, keep: false,
      onStage: function (els, id) {
        var p = pin(id), c = card(id);
        if (p) { gsap.to(p, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }); p.classList.add('is-on'); setTimeout(function () { p.classList.remove('is-on') }, 700) }
        if (c) { c.classList.add('is-on'); setTimeout(function () { if (!el._sfHover) c.classList.remove('is-on') }, 700) }
      }, onDone: function () { gsap.to(pins, { autoAlpha: 1, y: 0, duration: 0.3, clearProps: 'transform,opacity,visibility' }); ready() } });
    if (it) { it.call(function () { el.classList.add('is-walking') }, null, 'flow').call(function () { el.classList.remove('is-walking') }, null, 'end+=0.4'); m.on(svg, function () { it.play() }, 'top 80%') }
    else { gsap.set(pins, { clearProps: 'all' }); ready() }
    [].forEach.call(el.querySelectorAll('.aq-shop-floor__card'), function (c, i) {
      var ct = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
      ct.from(c.querySelector('.aq-shop-floor__n'), { yPercent: 60, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, 0)
        .from(c.querySelector('.aq-shop-floor__body'), { x: 32, autoAlpha: 0, duration: 0.7, clearProps: 'transform,opacity,visibility' }, 0.08)
        .from(c.querySelectorAll('.aq-shop-floor__f, .aq-shop-floor__name, .aq-shop-floor__d, .aq-shop-floor__go'), { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0.3);
      m.on(c, function () { ct.delay(el.classList.contains('is-long') ? 0 : i * 0.12).play() }, 'top 90%');
    });
  });
});
