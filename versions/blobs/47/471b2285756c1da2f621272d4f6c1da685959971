/* PqCalendar: the year is sampled. The count rolls up on its odometer while the grid fills day by day, a column of
   samples at a time; at the hold point the dashed line drops through the grid and the second phase carries on in
   flow; then the year's ticks rise left to right (the daily weeks first, the routine ticks on to the year's end) and
   the year tag lands. The phases rise beside it. One timeline on scroll-in, under 4 s.
   Pointing at or focusing a phase moves the region marker (the look's handler and CSS):
   Ported from Subframe Motion "Waveform region selector" (region-splice), MIT, (c) 2026 Subframe (kept: a tinted
   region with edge handles over a ruler, its key map: arrows step, Home and End jump; replaced: dragging and resizing
   with fixed spans read from the phases (they are facts, not choices), so the region glides 240 ms between spans
   instead of tracking the pointer, and jumps under reduced motion). */
AQmotion.fx('PqCalendar', function (root, m) {
  [].forEach.call(root.querySelectorAll('.aq-pq-calendar'), function (el) {
    var panel = el.querySelector('.aq-pq-calendar__panel'); if (!panel) return; m.claim(panel); m.claim(el.querySelector('.aq-pq-calendar__phases'));
    var qa = function (s) { return [].slice.call(el.querySelectorAll(s)) }, q = function (s) { return el.querySelector(s) };
    var wks = qa('.aq-pq-calendar__wk'), dots = qa('.aq-pq-calendar__dot'), hl = q('.aq-pq-calendar__hl'), num = q('.aq-pq-calendar__num');
    var nd = 0; dots.forEach(function (d) { nd = Math.max(nd, +d.getAttribute('data-d') + 1) });
    var tl = gsap.timeline({ paused: true }); m.tw(tl);
    var t0 = 0.2, per = 1.6 / Math.max(1, nd);
    if (num) tl.add(function () { m.count(num, { now: true, duration: 1.4 }) }, t0);
    tl.from(qa('.aq-pq-calendar__unit, .aq-pq-calendar__eq'), { autoAlpha: 0, y: 8, duration: 0.4, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, t0 + 0.2);
    for (var d = 0; d < nd; d++) tl.fromTo(dots.filter(function (x) { return +x.getAttribute('data-d') === d }), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, ease: 'power2.out', clearProps: 'transform' }, t0 + 0.3 + d * per);
    if (hl) { var hd = +hl.getAttribute('x1') / (+q('.aq-pq-calendar__grid').viewBox.baseVal.width) * nd;
      tl.fromTo(hl, { scaleY: 0, transformOrigin: '50% 0' }, { scaleY: 1, duration: 0.35, ease: 'power3.in', clearProps: 'transform' }, t0 + 0.3 + hd * per) }
    tl.fromTo(wks, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.25, stagger: { amount: 0.9 }, ease: 'power2.out', clearProps: 'transform' }, t0 + 1.9);
    tl.from(qa('.aq-pq-calendar__months span, .aq-pq-calendar__ylab'), { autoAlpha: 0, duration: 0.3, stagger: 0.04, clearProps: 'opacity,visibility' }, t0 + 2.2);
    tl.from(qa('.aq-pq-calendar__ph'), { autoAlpha: 0, y: 12, duration: 0.45, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
