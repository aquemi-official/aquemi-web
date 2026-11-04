/* RedlineSheet: a design review in progress. The sheet unrolls from the top, then each markup in turn: the figure
   draws on as it was designed, the reviewer's pen rings the mistake with its revision cloud, the triangle and the
   failure strike, the mistake is struck through, and the correction is drawn into the figure in flow while its note
   writes in from the left. Pass 9b: first the P&ID band draws (pipes, then the water route), then a guided tour
   (Subframe Motion "Product tour spotlight", guided-inspection, MIT, (c) 2026 Subframe; the camera is AQrsCam in the
   renderer) turns the band's camera onto each failure's pin as its markup is drawn, and pulls back to the whole plan
   at the end. Pointing is ignored during the tour. Phones (pass 12): PhoneKit owns the band (a sticky strip panned to the
   pin being read), so the tour leaves the camera alone while it is on. One timeline, once, under 5 s. The section heading is left to
   the core. */
AQmotion.fx('RedlineSheet', function (root, m) {
  root.querySelectorAll('.aq-redline-sheet').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, D = window.DrawSVGPlugin;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tl.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.inOut', clearProps: 'clipPath' }, 0)
      .from(qa('.aq-redline-sheet__zones span, .aq-redline-sheet__block'), { autoAlpha: 0, duration: 0.4, stagger: 0.04, clearProps: 'opacity,visibility' }, 0.5);
    var band = el.querySelector('.aq-redline-sheet__band'), cam = window.AQrsCam || null, T0 = 0.55;
    if (band) {
      el.setAttribute('data-tour', '');
      tl.from(band, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.45);
      var bl = qa('.aq-redline-sheet__p', band), bw = qa('.aq-redline-sheet__p--w, .aq-redline-sheet__p--chev', band);
      if (D) { tl.fromTo(bl.filter(function (x) { return bw.indexOf(x) < 0 }), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, stagger: 0.01, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.5);
        tl.fromTo(bw, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, stagger: 0.02, ease: 'none', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.8); }
      tl.from(qa('.aq-redline-sheet__pl, .aq-redline-sheet__pin', band), { autoAlpha: 0, duration: 0.3, stagger: 0.02, clearProps: 'opacity,visibility' }, 1.0);
    } else T0 = 0;
    var draw = function (els, at, dur) {
      els = els.filter(function (x) { return x.getTotalLength });
      if (!els.length) return;
      if (D) tl.fromTo(els, { drawSVG: '0%' }, { drawSVG: '100%', duration: dur, ease: 'power2.inOut', stagger: 0.03, clearProps: 'strokeDasharray,strokeDashoffset' }, at);
      else tl.from(els, { autoAlpha: 0, duration: dur, clearProps: 'opacity,visibility' }, at);
    };
    qa('.aq-redline-sheet__item').forEach(function (it, i) {
      var at = 0.7 + T0 + i * 0.75, svg = it.querySelector('svg');
      var head = it.querySelector('.aq-redline-sheet__head'), rev = it.querySelector('.aq-redline-sheet__rev'), err = it.querySelector('.aq-redline-sheet__err'), fix = it.querySelector('.aq-redline-sheet__fix');
      var base = qa('.aq-redline-sheet__ln, .aq-redline-sheet__thin, .aq-redline-sheet__flw', svg), bars = qa('.aq-redline-sheet__bar, .aq-redline-sheet__txt, .aq-redline-sheet__paper, .aq-redline-sheet__avg', svg);
      var marks = qa('.aq-redline-sheet__mark .aq-redline-sheet__cl', svg), mlbl = qa('.aq-redline-sheet__mark text', svg), fixes = qa('.aq-redline-sheet__fixln', svg), flbl = qa('.aq-redline-sheet__fixg text', svg);
      if (band && cam) tl.call(function () { if (!el.hasAttribute('data-pk-on')) cam(band, i) }, null, at);
      tl.from(it.querySelector('.aq-redline-sheet__fig'), { autoAlpha: 0, y: 12, duration: 0.5, clearProps: 'transform,opacity,visibility' }, at);
      draw(base, at + 0.1, 0.6);
      if (bars.length) tl.from(bars, { autoAlpha: 0, scaleY: 0, transformOrigin: '50% 100%', duration: 0.4, stagger: 0.012, clearProps: 'transform,opacity,visibility' }, at + 0.2);
      draw(marks, at + 0.6, 0.55);
      if (mlbl.length) tl.from(mlbl, { autoAlpha: 0, duration: 0.2, clearProps: 'opacity,visibility' }, at + 1.0);
      if (head) tl.from(head, { autoAlpha: 0, x: -10, duration: 0.4, clearProps: 'transform,opacity,visibility' }, at + 0.15);
      if (rev) tl.fromTo(rev, { scale: 2, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.22, ease: 'power4.in', clearProps: 'transform,opacity,visibility' }, at + 0.9);
      if (err) tl.from(err, { clipPath: 'inset(0 100% 0 0)', duration: 0.45, ease: 'power2.inOut', clearProps: 'clipPath' }, at + 0.95);
      draw(fixes, at + 1.2, 0.45);
      if (flbl.length) tl.from(flbl, { autoAlpha: 0, duration: 0.25, clearProps: 'opacity,visibility' }, at + 1.5);
      if (fix) tl.from(fix, { clipPath: 'inset(0 100% 0 0)', duration: 0.5, ease: 'power2.inOut', clearProps: 'clipPath' }, at + 1.3);
    });
    if (band) tl.call(function () { if (cam && !el.hasAttribute('data-pk-on')) cam(band, null); el.removeAttribute('data-tour') }, null, tl.duration() - 0.3);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
