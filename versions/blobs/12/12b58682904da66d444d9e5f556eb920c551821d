/* CostSkid: the skid draws itself (IsoKit's choreography: parts back to front, pipes and leaders, then the water runs
   the train once), then the cost rows are wired in: each number strikes at its part in the table's order and its row
   prints, its parts lit for a moment as it lands. One timeline, once, under 5 s. Phones: the drawing plays the same,
   the rows rise as they scroll in. Hover and focus lighting is in the look. */
AQmotion.fx('CostSkid', function (root, m) {
  root.querySelectorAll('.aq-cost-skid').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('.aq-cost-skid__svg'), rows = [].slice.call(el.querySelectorAll('.aq-cost-skid__row')).filter(function (x) { return x.offsetParent });
    var pins = [].slice.call(el.querySelectorAll('.aq-cost-skid__pin'));
    var tl = window.AQiso && svg ? AQiso.timeline(svg, m, { draw: 1.1, pipe: 0.5, flow: 0.9, stagger: 0.04 }) : null;
    if (!tl) return;
    var t0 = (tl.labels.flow || 1.6) + 0.2;
    gsap.set(pins, { autoAlpha: 0 });
    tl.from(el.querySelectorAll('.aq-cost-skid__table thead th'), { autoAlpha: 0, y: 8, duration: 0.4, stagger: 0.05, clearProps: 'transform,opacity,visibility' }, 0.4);
    if (m.narrow()) {
      tl.to(pins, { autoAlpha: 1, duration: 0.3, stagger: 0.06, clearProps: 'opacity,visibility' }, t0);
      rows.forEach(function (r) { var t = m.tw(gsap.from(r, { y: 14, autoAlpha: 0, duration: 0.45, paused: true, ease: 'power2.out', clearProps: 'transform,opacity,visibility' })); m.on(r, function () { t.play() }, 'top 92%') });
    } else {
      gsap.set(rows, { autoAlpha: 0, y: 10 });
      rows.forEach(function (r, k) {
        var i = r.getAttribute('data-r'), pin = el.querySelector('.aq-cost-skid__pin[data-r="' + i + '"]'), at = t0 + k * 0.28;
        if (pin) tl.to(pin, { autoAlpha: 1, duration: 0.2, clearProps: 'opacity,visibility' }, at).from(pin, { scale: 1.6, duration: 0.35, ease: 'power3.out', clearProps: 'transform' }, at);
        tl.to(r, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at);
        if (window.csLight) { tl.call(csLight, [el, i, true], at); tl.call(csLight, [el, i, false], at + 0.45) }
      });
      var rest = pins.filter(function (p) { return !rows.some(function (r) { return r.getAttribute('data-r') === p.getAttribute('data-r') }) });
      if (rest.length) tl.to(rest, { autoAlpha: 1, duration: 0.3, clearProps: 'opacity,visibility' }, t0);
    }
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
