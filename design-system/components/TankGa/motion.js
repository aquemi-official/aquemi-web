/* TankGa: the GA sheet draws itself. The IsoKit choreography lays the equipment back to front (tank, pump, exchanger
   spool, vent, couplings), then the pipes, then runs the water once from the tank through the pump and the exchanger and
   back to the spray ball; the hidden inside of the tank (water line, dip pipe, spray ball and jets) fades in as the
   pipes are laid. With the pipes, each leader draws from its part out to its tag and the tag lands, 0.09 s apart in key
   order, and its row in the key rises in (8 px) as the tag lands. Once on scroll-in, about 3.5 s. Phones: the rows rise
   at once as the parts start, 0.04 s apart (the key below the strip must never sit empty). Reduced motion: nothing runs, the sheet is
   complete. Selection (hover, focus, click, PhoneKit reading line) lives in the look and needs no motion.
   Leader-and-tag landing ported from Subframe Motion "Image hotspots" (atlas-hotspots), MIT, (c) 2026 Subframe (kept:
   the numbered markers arriving staggered on their points with a short scale-up on power3.out, the list entry following
   its marker; replaced: the print with the IsoKit drawing, the marker pulse with a leader drawn from the part). */
AQmotion.fx('TankGa', function (root, m) {
  root.querySelectorAll('.aq-tank-ga').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('svg.aq-iso'), D = window.DrawSVGPlugin;
    var tl = window.AQiso && AQiso.timeline(svg, m, { draw: 1.3, pipe: 0.7, flow: 1.3 });
    if (!tl) return;
    var qa = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    tl.from(qa('.aq-tank-ga__inside'), { autoAlpha: 0, duration: 0.45, ease: 'power1.out', clearProps: 'opacity,visibility' }, 'pipes');
    var rows = qa('.aq-tank-ga__row'), nw = m.narrow();
    rows.forEach(function (r, i) {
      var t = el.querySelector('.aq-tank-ga__tag[data-i="' + r.getAttribute('data-i') + '"]'),
        g = el.querySelector('.aq-tank-ga__lead[data-part="' + r.getAttribute('data-part') + '"]'), at = 0.2 + i * 0.09;
      if (g) {
        var p = g.querySelector('path'), c = g.querySelector('circle');
        if (D && p) tl.fromTo(p, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, ease: 'power2.out', onComplete: function () { p.style.removeProperty('stroke-dasharray'); p.style.removeProperty('stroke-dashoffset') } }, 'pipes+=' + at);
        else if (p) tl.from(p, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, 'pipes+=' + at);
        if (c) tl.from(c, { autoAlpha: 0, duration: 0.2, clearProps: 'opacity,visibility' }, 'pipes+=' + at);
      }
      if (t) tl.from(t, { scale: 0.6, autoAlpha: 0, duration: 0.3, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 'pipes+=' + (at + 0.32));
      tl.from(r, { autoAlpha: 0, y: 8, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, nw ? 'parts+=' + (i * 0.04) : 'pipes+=' + (at + 0.32));
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
