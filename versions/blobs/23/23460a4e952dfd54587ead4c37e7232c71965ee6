/* SiteTiles: the sheet is unfolded, then each column's part is drawn. The frame and its zone band fade up; the two
   outer columns swing open on their inner edges like the wings of a gatefold while the inner two rise into place; then
   column by column the part draws itself in IsoKit's order (lines on back to front, solids settle, a stage lights
   once) as its number, title, line and link rise. Once, under 4.5 s. Phones: columns rise in turn, no fold. */
AQmotion.fx('SiteTiles', function (root, m) {
  root.querySelectorAll('.aq-site-tiles').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, wide = !m.narrow() && innerWidth >= 1100;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tl.from(q('.aq-site-tiles__band'), { autoAlpha: 0, duration: 0.5, stagger: 0.05, clearProps: 'opacity,visibility' }, 0);
    var cols = q('.aq-site-tiles__col'), n = cols.length;
    /* Ported from Subframe Motion "Paper unfold reveal" (paper-fold), MIT, (c) 2026 Subframe
       The wings turn about their hinges from 180 deg to flat (rotateY, 720 ms, cubic-bezier(.25,.75,.2,1), the
       library's values) with their backs hidden, so each wing appears as it swings past the edge; the middle panels
       settle from a slight tilt (the print's rotateZ settling becomes a 12 px rise). */
    var fold = window.CustomEase ? (CustomEase.get('aq-fold') || CustomEase.create('aq-fold', 'M0,0 C0.25,0.75 0.2,1 1,1')) : 'power3.out';
    if (wide) gsap.set(el.querySelector('.aq-site-tiles__cols'), { perspective: 1400 });
    cols.forEach(function (c, i) {
      var outer = wide && n > 2 && (i === 0 || i === n - 1), at = 0.2 + (outer ? 0.25 : 0);
      if (outer) tl.fromTo(c, { rotationY: i === 0 ? 180 : -180, transformOrigin: i === 0 ? '100% 50%' : '0% 50%', backfaceVisibility: 'hidden' }, { rotationY: 0, duration: 0.72, ease: fold, clearProps: 'transform,transformOrigin,backfaceVisibility' }, at);
      else tl.from(c, { y: 12, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, wide ? at : 0.15 + i * 0.15);
      var svg = c.querySelector('svg.aq-iso'), ts = (wide ? 0.9 : 0.4) + i * 0.3;
      tl.from(q('.aq-site-tiles__n, .aq-site-tiles__t, .aq-site-tiles__d, .aq-site-tiles__go', c), { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, ts);
      if (svg && window.AQiso) { var st = AQiso.timeline(svg, m, { draw: 1.1, pipe: 0.4, flow: 0.6 }); if (st) { st.paused(false); tl.add(st, ts + 0.1) } }
    });
    if (wide) tl.call(function () { gsap.set(el.querySelector('.aq-site-tiles__cols'), { clearProps: 'perspective' }) });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
