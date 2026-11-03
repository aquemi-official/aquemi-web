/* ClauseCrosswalk: the two regulations set in first (their names slide along the edge, their clause chips tick in
   down each spine), then the requirements arrive one at a time and each one's wires run out from it to every clause
   it cites, both sides at once, so the mapping is drawn row by row. One timeline, once, < 5 s. Phones: rows rise. */
AQmotion.fx('ClauseCrosswalk', function (root, m) {
  root.querySelectorAll('.aq-clause-crosswalk').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    var rows = qa('.aq-clause-crosswalk__row').filter(function (r) { return !m.narrow() || !r.classList.contains('aq-fold-x') });
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (!m.narrow()) {
      var regs = qa('.aq-clause-crosswalk__reg');
      tl.from(regs, { yPercent: function (i) { return i ? -12 : 12 }, autoAlpha: 0, duration: 0.8, clearProps: 'transform,opacity,visibility' }, 0);
      tl.from(qa('.aq-clause-crosswalk__node'), { x: function (i, n) { return n.closest('.aq-clause-crosswalk__spine--a') ? -8 : 8 }, autoAlpha: 0, duration: 0.3, stagger: 0.03, clearProps: 'transform,opacity,visibility' }, 0.2);
      tl.from(qa('.aq-clause-crosswalk__heads'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.3);
      var wires = qa('.aq-clause-crosswalk__wire');
      wires.forEach(function (w) { w.setAttribute('vector-effect', 'non-scaling-stroke') });
      if (window.DrawSVGPlugin) gsap.set(wires, { drawSVG: '0%' });
      rows.forEach(function (r, i) {
        var t = 0.6 + i * 0.28, id = r.getAttribute('data-cw');
        tl.from(r, { y: 14, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, t);
        var a = wires.filter(function (w) { return w.getAttribute('data-cw') === id && w.closest('.aq-clause-crosswalk__wires--a') });
        var b = wires.filter(function (w) { return w.getAttribute('data-cw') === id && w.closest('.aq-clause-crosswalk__wires--b') });
        if (window.DrawSVGPlugin) {
          if (a.length) tl.fromTo(a, { drawSVG: '100% 100%' }, { drawSVG: '0% 100%', duration: 0.6, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, t + 0.2);
          if (b.length) tl.fromTo(b, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, t + 0.2);
        }
      });
      tl.call(function () { wires.forEach(function (w) { w.style.removeProperty('stroke-dasharray'); w.style.removeProperty('stroke-dashoffset') }) });
    } else {
      /* phones (pass 12): each row rises, then its mini crosswalk's curves run out from the requirement box to its chips */
      tl.from(rows, { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.1, clearProps: 'transform,opacity,visibility' }, 0);
      if (window.DrawSVGPlugin) rows.forEach(function (r, i) {
        var a = qa('.aq-clause-crosswalk__mini--a path', r), b = qa('.aq-clause-crosswalk__mini--b path', r);
        if (a.length) tl.fromTo(a, { drawSVG: '100% 100%' }, { drawSVG: '0% 100%', duration: 0.5, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.25 + i * 0.1);
        if (b.length) tl.fromTo(b, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.25 + i * 0.1);
      });
    }
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
