/* Colophon: the split arrives. While the title lands (core word reveal), the limestone strip is off the page edge;
   then the divider sweeps in from the left to its place, and as it passes, the title's letters on the strip turn navy
   (one divider position drives both the strip and the copy's clip). Then the ledger rows follow: number and item on
   the strip, the fact wiping in left to right, the evidence after. Once, under 3 s. Opening the fold lets the hidden
   rows grow open from nothing. */
AQmotion.fx('Colophon', function (root, m) {
  root.querySelectorAll('.aq-colophon').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    /* Ported from Subframe Motion "Before and after image slider" (image-comparison), MIT, (c) 2026 Subframe
       One divider position drives the "after" layer's clip, inset(0 (100 - position)% 0 0): here the divider is the
       strip's edge and the after layer is the navy copy of the title. The drag spring becomes a one-off entrance sweep
       (1.1 s, power3.inOut) since nothing here is dragged. */
    gsap.set(el, { '--cph-p': 0 });
    tl.to(el, { '--cph-p': 1, duration: 1.1, ease: 'power3.inOut', clearProps: '--cph-p' }, 0.55);
    var hd = q('.aq-colophon__head span'); if (hd.length) tl.from(hd, { autoAlpha: 0, y: -6, duration: 0.4, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 1.1);
    q('.aq-colophon__row').filter(function (r) { return r.offsetParent !== null }).forEach(function (r, i) {
      var at = 1.2 + i * 0.1;
      tl.from(q('.aq-colophon__n, .aq-colophon__pt', r), { autoAlpha: 0, x: -10, duration: 0.45, stagger: 0.05, clearProps: 'transform,opacity,visibility' }, at)
        .fromTo(r.querySelector('.aq-colophon__v'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.65, ease: 'power2.inOut', clearProps: 'clipPath' }, at + 0.08)
        .from(r.querySelector('.aq-colophon__m'), { y: 8, autoAlpha: 0, duration: 0.45, clearProps: 'transform,opacity,visibility' }, at + 0.3);
    });
    m.on(el, function () { tl.play() }, 'top 80%');

    /* Ported from Subframe Motion "Expandable table rows" (expandable-ledger), MIT, (c) 2026 Subframe
       Opening the fold grows each newly shown row from no height (210 ms, cubic-bezier(.2,.8,.2,1), the library's
       open values), 30 ms apart; closing is instant (the core fold scrolls back). */
    var btn = el.querySelector('.aq-fold__btn'), ease = window.CustomEase ? (CustomEase.get('aq-ledger') || CustomEase.create('aq-ledger', 'M0,0 C0.2,0.8 0.2,1 1,1')) : 'power2.out';
    if (btn) btn.addEventListener('click', function (ev) {
      var d = ev.detail === 0 ? 0 : 0.21;
      requestAnimationFrame(function () {
      var w = btn.closest('.aq-fold'); if (!w || !w.classList.contains('is-open') || !d) return;
      if (tl.isActive()) tl.progress(1);
      var rows = q('.aq-fold-x', w);
      rows.forEach(function (r, i) { m.tw(gsap.fromTo(r, { height: 0, opacity: 0, overflow: 'hidden' }, { height: 'auto', opacity: 1, duration: d, delay: i * 0.03, ease: ease, clearProps: 'height,opacity,overflow' })) });
      });
    });
  });
});
