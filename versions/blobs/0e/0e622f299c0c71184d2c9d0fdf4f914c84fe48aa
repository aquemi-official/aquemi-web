/* SourceSkid: the package is built, then the makers' parts arrive in it. The cards rise in turn; the skid's frame and
   PP pipework draw on (IsoKit choreography); the parts that come from their makers are lowered into the frame from
   above, one group after the other, each callout's leader running out and its label rising as its group lands; then
   the water runs the pipework once. Ends static, under 4.5 s. Pointing at, focusing or pressing a callout lights its
   group and lifts a maker's group out of the frame (renderer + CSS). */
AQmotion.fx('SourceSkid', function (root, m) {
  root.querySelectorAll('.aq-source-skid').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, D = window.DrawSVGPlugin;
    var cards = q('.aq-source-skid__card'), svg = el.querySelector('svg.aq-iso');
    var tc = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tc.from(cards, { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.12, clearProps: 'transform,opacity,visibility' }, 0);
    m.on(el.querySelector('.aq-source-skid__cards') || el, function () { tc.play() }, 'top 82%');
    if (!svg || !window.AQiso) return;
    /* Ported from Subframe Motion "Exploded product view" (exploded-camera), MIT, (c) 2026 Subframe
       The parts travel along one axis into their places (here: lowered into the frame), 600 ms
       cubic-bezier(.22,1,.36,1), the library's values; the visitor's lift on a callout uses the same curve in CSS. */
    var ease = window.CustomEase ? (CustomEase.get('aq-explode') || CustomEase.create('aq-explode', 'M0,0 C0.22,1 0.36,1 1,1')) : 'power3.out';
    var tl = AQiso.timeline(svg, m, { draw: 1.3, pipe: 0.8, flow: 1.3 });
    if (!tl) return;
    var lifts = q('.aq-source-skid__lift', svg), leads = q('.aq-source-skid__lead', svg), calls = q('.aq-source-skid__call'), pins = q('.aq-source-skid__pin');
    var t = tl.labels.pipes != null ? tl.labels.pipes : 1.2;
    lifts.forEach(function (g, i) { tl.fromTo(g, { y: -46, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: ease, clearProps: 'transform,opacity,visibility' }, t + i * 0.3) });
    var byGrp = function (list, grp) { return list.filter(function (x) { return x.getAttribute('data-grp') === grp || (x.querySelector('[data-grp]') && x.querySelector('[data-grp]').getAttribute('data-grp') === grp) }) };
    calls.forEach(function (c, i) {
      var grp = c.querySelector('[data-grp]').getAttribute('data-grp'), j = lifts.map(function (g) { return g.getAttribute('data-grp') }).indexOf(grp);
      var at = j < 0 ? t - 0.2 : t + j * 0.3 + 0.35;
      var ld = byGrp(leads, grp), lp = ld.length ? q('.aq-source-skid__ll', ld[0]) : [];
      if (lp.length && D) tl.fromTo(lp, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, at);
      tl.from(c, { y: 10, autoAlpha: 0, duration: 0.45, clearProps: 'transform,opacity,visibility' }, at + 0.2);
      var pn = byGrp(pins, grp); if (pn.length) tl.from(pn, { scale: 0.6, autoAlpha: 0, duration: 0.3, clearProps: 'transform,opacity,visibility' }, at + 0.2);
    });
    m.on(svg, function () { tl.play() }, 'top 78%');
  });
});
