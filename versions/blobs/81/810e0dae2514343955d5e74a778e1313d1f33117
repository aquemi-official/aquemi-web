/* WasherTrace: the drawing builds the IsoKit way (parts back to front, then the pipes), the leaders draw out to their
   callouts, then the water runs from the loop to the chamber once: each station lights as the water reaches it, the
   readout's cursor rides the water's reach along the ruler and its numeral and tag tick over to the station reached.
   After that, pointing at or focusing a point's title seeks the water to that point (cue-scrubber): the water drains
   back or runs on, stations ahead go dark and the readout follows; leaving the points runs it back to the chamber.
   Ported from Subframe Motion "Chapter timeline scrubber" (cue-scrubber), MIT, (c) 2026 Subframe: the seek is one eased tween of a
   single reach value (0.5 s to 0.9 s by distance, power2.inOut), interruptible, everything else derived from it.
   Entrance under 5 s, nothing loops; nothing under reduced motion (the drawing, every callout and the readout at the
   chamber are complete without script). */
AQmotion.fx('WasherTrace', function (root, m) {
  root.querySelectorAll('.aq-washer-trace').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('svg.aq-iso'); if (!svg || !window.AQiso) return;
    var read = el.querySelector('.aq-washer-trace__read'), rn = el.querySelector('.aq-washer-trace__rn'), tag = el.querySelector('.aq-washer-trace__tag');
    var pts = [].slice.call(el.querySelectorAll('.aq-washer-trace__pt')), leads = [].slice.call(el.querySelectorAll('.aq-washer-trace__lead'));
    var marks = [].slice.call(el.querySelectorAll('.aq-washer-trace__mark')), n = pts.length, IDS = ['loop', 'inlet', 'chamber'];
    var titles = pts.map(function (p) { var t = p.querySelector('.aq-washer-trace__go'); return t ? t.textContent : '' });
    var cur = -1;
    function show(k) {
      if (k === cur) return; cur = k;
      if (rn) { rn.textContent = '0' + (k + 1); rn.classList.remove('is-tick'); void rn.offsetWidth; rn.classList.add('is-tick') }
      if (tag) { tag.textContent = titles[k] || ''; tag.classList.remove('is-tick'); void tag.offsetWidth; tag.classList.add('is-tick') }
      marks.forEach(function (mk, i) { mk.classList.toggle('is-on', i <= k) });
    }
    function focus(k) {
      pts.forEach(function (p, i) { p.classList.toggle('is-on', i === k) });
      leads.forEach(function (l, i) { l.classList.toggle('is-on', i === k) });
    }
    var tl = AQiso.timeline(svg, m, { draw: 1.3, pipe: 0.8, flow: 1.9, keep: true, drop: true,
      onStage: function (els, id) { var k = IDS.indexOf(id); if (k > -1 && k < n) { show(k); focus(k) } },
      onDone: function () { focus(-1); ready() } });
    if (!tl) return;
    var tf = tl.labels.flow || 0, te = tl.labels.end || tf + 1.9;
    tl.fromTo(read, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power2.inOut', clearProps: 'clipPath' }, 0);
    tl.call(function () { show(0); marks.forEach(function (mk) { mk.classList.remove('is-on') }) }, null, 0.01);
    tl.fromTo(read, { '--reach': 0 }, { '--reach': 1, duration: te - tf - 0.1, ease: 'none' }, tf);
    if (window.DrawSVGPlugin) tl.fromTo(el.querySelectorAll('.aq-washer-trace__lead path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, stagger: 0.12, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, 'pipes');
    tl.from(pts, { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 'pipes+=0.3');
    m.on(el, function () { tl.play() }, 'top 70%');

    /* cue-scrubber: one reach value drives the water, the lit stations and the readout */
    function ready() {
      if (!window.DrawSVGPlugin) return;
      var flows = [].slice.call(svg.querySelectorAll('.aq-iso__flow')), L = flows.map(function (f) { try { return f.getTotalLength() } catch (x) { return 1 } });
      var tot = L.reduce(function (a, b) { return a + b }, 0) || 1, C = [], acc = 0, stops = [];
      L.forEach(function (l) { C.push(acc); acc += l });
      IDS.slice(0, n).forEach(function (id, k) {
        var j = flows.findIndex(function (f) { var h = f.closest('[data-iso-to]'); return (f.getAttribute('data-iso-to') || (h && h.getAttribute('data-iso-to'))) === id });
        stops[k] = j < 0 ? (k + 1) / n : (C[j] + L[j]) / tot;
      });
      stops[n - 1] = 1;
      marks.forEach(function (mk, i) { mk.style.left = (stops[i] * 100).toFixed(2) + '%' });
      var st = { r: 1 }, seek = null;
      function apply() {
        var R = st.r * tot;
        flows.forEach(function (f, i) { var p = Math.max(0, Math.min(1, (R - C[i]) / L[i])); gsap.set(f, { drawSVG: '0% ' + (p * 100).toFixed(2) + '%' }) });
        read.style.setProperty('--reach', st.r.toFixed(4));
        var k = -1; stops.forEach(function (s, i) { if (st.r >= s - 0.002) k = i });
        IDS.slice(0, n).forEach(function (id, i) { AQiso.light(svg, id, i <= k) });
        if (k >= 0) show(k);
      }
      function go(k, hold) {
        var to = k < 0 ? 1 : stops[k], d = Math.abs(to - st.r);
        if (seek) seek.kill();
        focus(hold ? k : -1);
        seek = m.tw(gsap.to(st, { r: to, duration: d < 0.01 ? 0.01 : 0.5 + 0.4 * Math.min(1, d), ease: 'power2.inOut', onUpdate: apply,
          onComplete: function () { if (st.r >= 1) flows.forEach(function (f) { f.style.removeProperty('stroke-dasharray'); f.style.removeProperty('stroke-dashoffset') }) } }));
      }
      pts.forEach(function (p, i) {
        var b = p.querySelector('.aq-washer-trace__go');
        p.addEventListener('pointerenter', function (ev) { if (ev.pointerType === 'mouse') go(i, true) });
        if (b) { b.addEventListener('focus', function () { go(i, true) }); b.addEventListener('click', function () { go(i, true) }) }
      });
      var list = el.querySelector('.aq-washer-trace__pts');
      pts.forEach(function (p) { p.addEventListener('pointerleave', function (ev) { if (ev.pointerType === 'mouse' && !el.contains(document.activeElement)) go(-1) }) });
      list.addEventListener('focusout', function (ev) { if (!list.contains(ev.relatedTarget)) go(-1) });
    }
  });
});
