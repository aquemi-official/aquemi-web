/* LevellingSheet: the three sheets settle onto the ground (12 px, 0.08 s apart), the lines print down the sheet
   (8 px rise, 0.06 s apart), each line's quote cells fill in as it prints (written strokes run out from the left, gaps
   hatch in), our tick stamps down on every line and our answer prints after it, and the straightedge is laid across the first line (a wipe from its
   left end). Once on scroll-in, under 3 s. The stamp: ported from Subframe Motion "Activity stamp" (activity-stamp),
   MIT, (c) 2026 Subframe (kept: the mark pressed down from 1.22x scale and 60 % opacity to full size in 180 ms,
   cubic-bezier(.2,.9,.3,1); replaced: the day grid with the sheet's lines). The straightedge's glide between lines is
   the look's own (look-levelling-sheet.js, "Chart crosshair"). Nothing under reduced motion: the sheet is complete. */
AQmotion.fx('LevellingSheet', function (root, m) {
  root.querySelectorAll('.aq-levelling-sheet').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })), q = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    var papers = q('.aq-levelling-sheet__paper').filter(function (p) { return p.offsetWidth > 0 });
    if (papers.length) tl.from(papers, { y: 12, autoAlpha: 0, duration: 0.55, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 0);
    var heads = q('.aq-levelling-sheet__h').filter(function (h) { return h.offsetWidth > 0 });
    if (heads.length) tl.from(heads, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.2);
    q('.aq-levelling-sheet__row').forEach(function (r, i) {
      var at = 0.35 + i * 0.06, words = q('.aq-levelling-sheet__line, .aq-levelling-sheet__ask', r);
      tl.from(words, { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.04, clearProps: 'transform,opacity,visibility' }, at);
      var strokes = q('.aq-levelling-sheet__c.is-said i', r).filter(function (s) { return s.offsetWidth > 0 });
      if (strokes.length) tl.from(strokes, { scaleX: 0, transformOrigin: '0 50%', duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'transform' }, at + 0.15);
      var gaps = q('.aq-levelling-sheet__c.is-gap', r);
      if (gaps.length) tl.from(gaps, { clipPath: 'inset(0 100% 0 0)', duration: 0.45, ease: 'power2.inOut', clearProps: 'clipPath' }, at + 0.15);
      var tick = r.querySelector('.aq-levelling-sheet__tick');
      if (tick) tl.fromTo(tick, { scale: 1.22, autoAlpha: 0.6 }, { scale: 1, autoAlpha: 1, duration: 0.18, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at + 0.3);
      /* our answer prints with its line, just after the tick */
      var go = r.querySelector('.aq-levelling-sheet__go');
      if (go) tl.from(go, { autoAlpha: 0, x: -4, duration: 0.3, clearProps: 'transform,opacity,visibility' }, at + 0.32);
    });
    var edge = el.querySelector('.aq-levelling-sheet__edge');
    if (edge && getComputedStyle(edge).display !== 'none') tl.from(edge, { clipPath: 'inset(0 100% 0 0)', duration: 0.6, ease: 'power2.inOut', clearProps: 'clipPath' }, '-=0.2');
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
