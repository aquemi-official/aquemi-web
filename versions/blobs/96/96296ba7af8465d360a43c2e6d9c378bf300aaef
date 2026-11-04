/* GradeCrosswalk: the navy blocks land down the middle one after another; as each lands its wires run out to the
   standards it cites, both sides at once, and a chip ticks in the first time a wire reaches it, so the crosswalk is
   drawn water by water. One timeline, once, under 4 s. Phones: blocks rise with their citation rows. Reduced motion:
   nothing runs (the finished layout is the markup). */
AQmotion.fx('GradeCrosswalk', function (root, m) {
  root.querySelectorAll('.aq-grade-crosswalk').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var rows = qa('.aq-grade-crosswalk__row');
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (!m.narrow()) {
      var wires = qa('.aq-grade-crosswalk__wire'), nodes = qa('.aq-grade-crosswalk__node'), seen = {};
      tl.from(qa('.aq-grade-crosswalk__head'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0);
      gsap.set(nodes, { autoAlpha: 0 });
      if (window.DrawSVGPlugin) gsap.set(wires, { drawSVG: '0%' });
      rows.forEach(function (r, i) {
        var t = 0.2 + i * 0.3, id = r.getAttribute('data-gc');
        tl.from(r.querySelector('.aq-grade-crosswalk__block'), { y: 14, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, t);
        var mine = wires.filter(function (w) { return w.getAttribute('data-gc') === id });
        var a = mine.filter(function (w) { return w.closest('.aq-grade-crosswalk__wires--a') }), b = mine.filter(function (w) { return w.closest('.aq-grade-crosswalk__wires--b') });
        if (window.DrawSVGPlugin) {
          if (a.length) tl.fromTo(a, { drawSVG: '100% 100%' }, { drawSVG: '0% 100%', duration: 0.55, ease: 'power2.out' }, t + 0.25);
          if (b.length) tl.fromTo(b, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.55, ease: 'power2.out' }, t + 0.25);
        }
        mine.forEach(function (w) {
          var k = w.getAttribute('data-gcn'); if (seen[k]) return; seen[k] = 1;
          var n = el.querySelector('.aq-grade-crosswalk__node[data-gcn="' + k + '"]'); if (!n) return;
          var left = !!n.closest('.aq-grade-crosswalk__rail--a');
          tl.fromTo(n, { autoAlpha: 0, x: left ? 10 : -10 }, { autoAlpha: 1, x: 0, duration: 0.35, clearProps: 'transform,opacity,visibility' }, t + 0.6);
        });
      });
      tl.call(function () { gsap.set(nodes, { clearProps: 'opacity,visibility' }); wires.forEach(function (w) { w.style.removeProperty('stroke-dasharray'); w.style.removeProperty('stroke-dashoffset') }) });
    } else tl.from(rows, { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.1, clearProps: 'transform,opacity,visibility' }, 0);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
