/* SheetPreviews: the documents are dealt. The sheets start as one squared stack in the first column and deal out to
   their columns, the top sheet (the last column) first, each turning flat as it lands; the index numerals rise out of their line; then each thumbnail draws
   itself (grid, curves, logic, seal) and the code decodes, the text following. Once on scroll-in, under 3 s.
   Phones: no deal; each sheet rises into place as it scrolls in. */
AQmotion.fx('SheetPreviews', function (root, m) {
  root.querySelectorAll('ol.aq-sheet-previews').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var items = [].slice.call(el.querySelectorAll('.aq-sheet-previews__item')), q = function (s, r) { return [].slice.call(r.querySelectorAll(s)) };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })), wide = !m.narrow();
    var x0 = items[0] ? items[0].getBoundingClientRect().left : 0;
    items.forEach(function (it, i) {
      var sh = it.querySelector('.aq-sheet-previews__sheet'), dx = x0 - it.getBoundingClientRect().left, at = 0.25 + (items.length - 1 - i) * 0.12;
      if (sh) {
        if (wide) tl.from(sh, { x: dx, y: -i * 6, rotation: (i % 2 ? 1 : -1) * (3 + i), duration: 0.9, ease: 'power3.inOut', clearProps: 'transform' }, at);
        else tl.from(sh, { y: 24, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, i * 0.1);
        var lines = q('.aq-sheet-previews__svg path, .aq-sheet-previews__svg rect:not(.aq-sheet-previews__paper)', sh);
        if (window.DrawSVGPlugin && lines.length) tl.fromTo(lines, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, stagger: 0.01, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, at + 0.7);
      }
      var num = it.querySelector('.aq-sheet-previews__num'); if (num) tl.from(num, { yPercent: 40, autoAlpha: 0, duration: 0.7, clearProps: 'transform,opacity,visibility' }, i * 0.08);
      tl.from(q('.aq-sheet-previews__code, .aq-sheet-previews__t, .aq-sheet-previews__d', it), { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, at + 0.8);
      var c = it.querySelector('.aq-sheet-previews__code'); if (c) tl.call(function () { m.scramble(c, 0) }, null, at + 0.8);
    });
    m.on(el, function () { tl.play() }, 'top 80%');
  });
});
