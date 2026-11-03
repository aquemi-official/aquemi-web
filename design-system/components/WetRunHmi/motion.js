/* WetRunHmi: the route is laid, then the skid runs with water. The pipe walls draw along the route, the symbols draw,
   the points rise beside their stations in route order, all dry (empty pipe, blank readouts, unlit markers); then the
   switch's thumb springs to the water position and the water runs the route from the feed: each station's marker
   lights as the water passes it, the outlet readouts fill when it reaches the low run and the record's trend draws
   when it reaches the logger. Ends on the water position, as the page reads without script. Under 5 s, once.
   The switch is the reader's afterwards: choosing "with water" runs the water again (visitor-driven, may repeat);
   choosing "dry" empties the pipe. Up to tablet width the vertical pipe fills top to bottom instead (CSS).
   Ported from Subframe Motion "Sliding segmented control" (sliding-tabs), MIT, (c) 2026 Subframe (kept: one shared
   highlight that travels between the options on a spring, stiffness 460, damping 34, mass 1, no travel for keyboard
   input or reduced motion; replaced: motion's layoutId with the core spring on a translateX in %, the pill with a
   square flow thumb). */
AQmotion.fx('WetRunHmi', function (root, m) {
  var D = !!window.DrawSVGPlugin;
  [].forEach.call(root.querySelectorAll('.aq-wet-run-hmi'), function (w) {
    var fig = w.querySelector('.aq-wet-run-hmi__fig'), sw = w.querySelector('.aq-wet-run-hmi__switch'), thumb = w.querySelector('.aq-wet-run-hmi__thumb');
    if (!fig) return; m.claim(fig); if (sw) m.claim(sw);
    var qa = function (s) { return [].slice.call(w.querySelectorAll(s)) };
    var mode = function (wet) { if (window.wrhMode) window.wrhMode(w, wet) };
    /* the thumb on the spring */
    var st = { x: 100 }, sp = thumb ? m.spring(st, { stiffness: 460, damping: 34, mass: 1 }, function (o) { thumb.style.transform = 'translateX(' + o.x.toFixed(2) + '%)' }) : null;
    function slide(wet, jump) { if (!sp) return; var g = { x: wet ? 100 : 0 }; if (jump) sp.jump(g); else sp.to(g) }

    var svg = fig.querySelector('.aq-wet-run-hmi__svg'), wide = svg && svg.getBoundingClientRect().width > 0;
    var water = fig.querySelector('.aq-wet-run-hmi__water'), mk = qa('.aq-wet-run-hmi__mk'), rd = qa('.aq-wet-run-hmi__rdv'), tr = qa('.aq-wet-run-hmi__trend'), pts = qa('.aq-wet-run-hmi__pt');
    /* where along the route each station sits (0..1), from the route's own geometry */
    var at = {}, total = 0;
    if (wide && water && window.WRH_ST) {
      total = water.getTotalLength();
      Object.keys(window.WRH_ST).forEach(function (k) { var p = window.WRH_ST[k].p, best = 0, bd = 1e9; for (var l = 0; l <= total; l += 4) { var q = water.getPointAtLength(l), d = Math.abs(q.x - p[0]) + Math.abs(q.y - p[1]); if (d < bd) { bd = d; best = l } } at[k] = best / total });
    }
    var RUN = 2.2;
    /* one water run: the water draws along the route; markers, readouts and trend come up as it arrives */
    function run(tl, t0) {
      if (D && water) tl.fromTo(water, { drawSVG: '0%' }, { drawSVG: '100%', duration: RUN, ease: 'none', clearProps: 'strokeDasharray,strokeDashoffset' }, t0);
      mk.forEach(function (k) { var f = at[k.getAttribute('data-part')] || 0; tl.fromTo(k, { scale: 0.5 }, { scale: 1, duration: 0.4, ease: 'back.out(2.2)', clearProps: 'transform' }, t0 + f * RUN) });
      if (rd.length) tl.fromTo(rd, { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out', clearProps: 'transform' }, t0 + (at.outlet || 0.5) * RUN);
      if (D && tr.length) tl.fromTo(tr, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power1.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, t0 + (at.record || 0.8) * RUN);
    }
    var tl = m.tw(gsap.timeline({ paused: true }));
    tl.add(function () { mode(false); slide(false, true) }, 0);
    if (wide) {
      if (D) tl.fromTo(qa('.aq-wet-run-hmi__wall, .aq-wet-run-hmi__bore'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.0, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
      if (D) tl.fromTo(qa('.aq-wet-run-hmi__eq, .aq-wet-run-hmi__thin'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, stagger: 0.03, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.3);
    }
    tl.from(pts, { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.15, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.3);
    tl.add(function () { mode(true); slide(true) }, 1.3);
    if (wide) run(tl, 1.35);
    /* up to tablet width (pass 12): the strip's water runs feed to outlet and its markers pop as it passes */
    var strip = !wide && fig.querySelector('.aq-wet-run-hmi__strip'), sw2 = strip && strip.querySelector('.aq-wet-run-hmi__water'), smk = strip ? [].slice.call(strip.querySelectorAll('.aq-wet-run-hmi__smk')) : [];
    function srun(t, t0) {
      if (D && sw2) t.fromTo(sw2, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.2, ease: 'none', clearProps: 'strokeDasharray,strokeDashoffset' }, t0);
      smk.forEach(function (k) { var x = +k.querySelector('circle').getAttribute('cx') / 360; t.fromTo(k, { scale: 0.5, transformOrigin: '50% 50%', transformBox: 'fill-box' }, { scale: 1, duration: 0.35, ease: 'back.out(2.2)', clearProps: 'transform' }, t0 + x * 1.2) });
    }
    if (strip) srun(tl, 1.35);
    m.on(fig, function () { tl.play() }, 'top 75%');

    /* the reader's switch: thumb springs (jumps for keyboard), "with water" runs the water again */
    var again = null;
    if (sw) sw.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-wrh-mode]'); if (!b) return;
      var wet = b.getAttribute('data-wrh-mode') === 'wet', kb = ev.detail === 0;
      if (tl.isActive()) tl.progress(1);
      slide(wet, kb);
      if (again) { again.kill(); again = null }
      if (wet && wide && !kb) { again = m.tw(gsap.timeline()); run(again, 0) }
      else if (wet && strip && !kb) { again = m.tw(gsap.timeline()); srun(again, 0) }
    });
  });
});
