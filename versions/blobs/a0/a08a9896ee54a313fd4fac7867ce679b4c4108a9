/* LimitWriters: one pipe out of the package, one sheet per limit-writer.
   Ported from Subframe Motion "Animated workflow diagram" (process-choreography), MIT, (c) 2026 Subframe.
   Kept: the trunk then the branches, staggered over one 1.12 s run with a cubic ease-out, each output card arriving as
   its branch lands. Here the package settles, the header pipe wipes open from the outlet, then the sheets slide in
   from their tees one by one; the stage lists follow. Once, on entry; reduced motion: the finished drawing (the core
   does not run). */
AQmotion.fx('LimitWriters', function (root, m) {
  root.querySelectorAll('.aq-limit-writers').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var D = 1.12, skid = el.querySelector('.aq-limit-writers__skid'), pipe = el.querySelector('.aq-limit-writers__pipe'),
      sheets = [].slice.call(el.querySelectorAll('.aq-limit-writers__sheet')), rows = [].slice.call(el.querySelectorAll('.aq-limit-writers__row, .aq-limit-writers__ch'));
    if (skid) gsap.set(skid, { autoAlpha: 0, y: 12 });
    if (pipe) gsap.set(pipe, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(sheets, { autoAlpha: 0, x: -16 }); gsap.set(rows, { autoAlpha: 0, y: 10 });
    m.on(el, function () {
      var tl = m.tw(gsap.timeline({ defaults: { ease: 'power3.out' } })), n = sheets.length || 1;
      if (skid) tl.to(skid, { autoAlpha: 1, y: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, 0);
      if (pipe) tl.to(pipe, { clipPath: 'inset(0 0% 0 0)', duration: D * 0.5, ease: 'power2.inOut', clearProps: 'clipPath' }, D * 0.2);
      sheets.forEach(function (s, i) { tl.to(s, { autoAlpha: 1, x: 0, duration: D * 0.3, clearProps: 'transform,opacity,visibility' }, D * (0.45 + 0.4 * i / n)) });
      if (rows.length) tl.to(rows, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, clearProps: 'transform,opacity,visibility' }, D * 0.8);
    }, 'top 75%');
  });
});
