/* ShopRoute: a spool walks the shop. The bays print up and their plan furniture draws in; then the spool enters by
   the door at the top left and travels the route: along the top lane, down the aisle, back along the bottom lane and
   out. The lane draws on behind it; each bay lights as the spool reaches its stop (the stop lands, the number
   decodes); a hold stop's stamp strikes, a witness tag slides in. The spool leaves
   by the bottom door. Phones: each bay's stop lands as it scrolls in. One timeline, once, under 5 s. */
AQmotion.fx('ShopRoute', function (root, m) {
  root.querySelectorAll('.aq-shop-route').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, D = window.DrawSVGPlugin;
    var bays = qa('.aq-shop-route__bay'), route = el.querySelector('.aq-shop-route__route'), wide = route && getComputedStyle(route).display !== 'none';
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tl.from(bays, { autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'opacity,visibility' }, 0);
    var furn = qa('.aq-shop-route__furn rect, .aq-shop-route__furn path, .aq-shop-route__furn circle');
    if (D && furn.length) tl.fromTo(furn, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, stagger: 0.006, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.1);
    var light = function (bay, at) {
      var stop = bay.querySelector('.aq-shop-route__stop'), n = bay.querySelector('.aq-shop-route__n'), stamp = bay.querySelector('.aq-shop-route__stamp'), wit = bay.querySelector('.aq-shop-route__wit');
      tl.call(function () { bay.classList.add('is-on') }, null, at).call(function () { bay.classList.remove('is-on') }, null, at + 0.5);
      if (stop) tl.from(stop, { scale: 0, duration: 0.3, ease: 'back.out(3)', clearProps: 'transform' }, at);
      if (n) tl.call(function () { m.scramble(n, 0) }, null, at);
      if (stamp) tl.fromTo(stamp, { scale: 1.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.22, ease: 'power4.in', clearProps: 'transform,opacity,visibility' }, at + 0.15);
      if (wit) tl.from(wit, { autoAlpha: 0, x: -10, duration: 0.35, clearProps: 'transform,opacity,visibility' }, at + 0.1);
    };
    if (!wide) {
      bays.forEach(function (bay, i) { light(bay, 0.4 + i * 0.3) });
      m.on(el, function () { tl.play() }, 'top 75%');
      return;
    }
    var segA = el.querySelector('.aq-shop-route__seg--a'), segB = el.querySelector('.aq-shop-route__seg--b'), segC = el.querySelector('.aq-shop-route__seg--c'),
      spool = el.querySelector('.aq-shop-route__spool'), gates = qa('.aq-shop-route__gate');
    var T0 = 0.6, A = 1.5, B = 0.4, Cc = 1.5;
    if (segA) tl.fromTo(segA, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: A, ease: 'none', clearProps: 'clipPath' }, T0);
    if (segB) tl.fromTo(segB, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: B, ease: 'none', clearProps: 'clipPath' }, T0 + A);
    if (segC) tl.fromTo(segC, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: Cc, ease: 'none', clearProps: 'clipPath' }, T0 + A + B);
    gates.forEach(function (g) { tl.from(g, { scaleY: 0, duration: 0.25, clearProps: 'transform' }, T0 + 0.3) });
    /* stops: a bay's arrival is its stop's x along its lane */
    var W = el.getBoundingClientRect().width || 1;
    bays.forEach(function (bay) {
      var s = bay.querySelector('.aq-shop-route__stop'); if (!s) return;
      var r = s.getBoundingClientRect(), x = (r.left + r.width / 2 - el.getBoundingClientRect().left) / W, back = bay.classList.contains('is-back');
      light(bay, back ? T0 + A + B + (1 - x) * Cc : T0 + x * A);
    });
    var addSpool = function () {
      if (!spool || !segA || !segC) return;
      spool.classList.add('is-live'); var a = segA.getBoundingClientRect(), c = segC.getBoundingClientRect(), r = spool.getBoundingClientRect(); spool.classList.remove('is-live');
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2, x0 = a.left - cx, xR = a.right - cx, yA = a.top + 1.5 - cy, yC = c.top + 1.5 - cy;
      tl.set(spool, { x: x0, y: yA, className: 'aq-shop-route__spool is-live' }, T0)
        .to(spool, { x: xR, duration: A, ease: 'none' }, T0)
        .to(spool, { y: yC, duration: B, ease: 'none' }, T0 + A)
        .to(spool, { x: x0, duration: Cc, ease: 'none' }, T0 + A + B)
        .to(spool, { autoAlpha: 0, duration: 0.3 }, T0 + A + B + Cc)
        .set(spool, { className: 'aq-shop-route__spool', clearProps: 'transform,opacity,visibility' });
    };
    m.on(el, function () { addSpool(); tl.play() }, 'top 70%');
  });
});
