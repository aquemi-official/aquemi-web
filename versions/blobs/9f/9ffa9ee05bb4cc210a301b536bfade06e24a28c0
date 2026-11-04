/* RoomLimit: the package is set in the room, then the line is drawn round it and the tie-ins are keyed.
   On scroll-in the package draws itself (IsoKit's choreography: parts back to front, pipes, the water runs once), the
   battery-limit line fades in on the floor and its dashes creep once round the package, the tie-in nodes press onto the
   line, then the numbers strike in row order with their rows (desktop) or rise as the checklist scrolls in (phones).
   Once, under 5 s; nothing under reduced motion (the finished drawing shows).
   Selection (row to point) is in the look: ported from Subframe Motion "Inside the image" (atlas-hotspots), MIT,
   (c) 2026 Subframe. */
AQmotion.fx('RoomLimit', function (root, m) {
  root.querySelectorAll('.aq-room-limit').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var svg = el.querySelector('.aq-room-limit__svg');
    var tl = window.AQiso && svg ? AQiso.timeline(svg, m, { draw: 1.1, pipe: 0.5, flow: 0.9, stagger: 0.04 }) : null;
    if (!tl) return;
    var t0 = (tl.labels.flow || 1.4) + 0.1, pins = q('.aq-room-limit__pin'), labs = q('.aq-room-limit__lab');
    tl.fromTo(q('.aq-room-limit__bl'), { autoAlpha: 0, strokeDashoffset: 0 }, { autoAlpha: 1, strokeDashoffset: -58, duration: 1.2, ease: 'power1.out', clearProps: 'opacity,visibility,strokeDashoffset' }, t0 - 0.6)
      .from(q('.aq-room-limit__node'), { scale: 0, transformOrigin: '50% 50%', duration: 0.3, stagger: 0.08, ease: 'back.out(2)', clearProps: 'transform' }, t0)
      .from(labs, { autoAlpha: 0, duration: 0.4, stagger: 0.1, clearProps: 'opacity,visibility' }, t0);
    gsap.set(pins, { autoAlpha: 0 });
    var rows = q('.aq-room-limit__item').filter(function (x) { return x.offsetParent });
    if (m.narrow()) {
      tl.to(pins, { autoAlpha: 1, duration: 0.3, stagger: 0.05, clearProps: 'opacity,visibility' }, t0 + 0.2);
      rows.forEach(function (r) { var t = m.tw(gsap.from(r, { y: 12, autoAlpha: 0, duration: 0.45, paused: true, ease: 'power2.out', clearProps: 'transform,opacity,visibility' })); m.on(r, function () { t.play() }, 'top 92%') });
    } else {
      gsap.set(rows, { autoAlpha: 0, y: 10 });
      rows.forEach(function (r, k) {
        var i = r.getAttribute('data-r'), pin = el.querySelector('.aq-room-limit__pin[data-r="' + i + '"]'), at = t0 + 0.2 + k * 0.16;
        if (pin) tl.to(pin, { autoAlpha: 1, duration: 0.2, clearProps: 'opacity,visibility' }, at);
        tl.to(r, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at);
      });
      var rest = pins.filter(function (p) { return !rows.some(function (r) { return r.getAttribute('data-r') === p.getAttribute('data-r') }) });
      if (rest.length) tl.to(rest, { autoAlpha: 1, duration: 0.3, clearProps: 'opacity,visibility' }, t0);
    }
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
