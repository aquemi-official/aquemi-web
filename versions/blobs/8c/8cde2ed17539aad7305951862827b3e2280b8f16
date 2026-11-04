/* MethodBento: the tiles are set down one by one: the navy hot-water tile wipes open from the left, the paper tiles
   rise, the empty tile's outline name slides in last. Inside the hot-water tile the bulb fills and the heat runs up
   the rail (solid, then dashed, then the struck part), each temperature mark dropping in as the heat reaches it.
   The line drawings draw on, the sanitant disperses dot by dot along the pipe and the UV rays flicker on.
   One timeline, once, under 5 s. Then the rail becomes a probe the visitor can drag (or key) to any temperature: it
   snaps to the marks and the tile reads out the zone (slider-detents port, below). */
AQmotion.fx('MethodBento', function (root, m) {
  root.querySelectorAll('.aq-method-bento').forEach(function (el) {
    if (!m.free(el)) return;
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, tiles = qa('.aq-method-bento__tile');
    tiles.forEach(m.claim);
    var FR = function (t, set, v, at) { if (set && set.length !== 0) t.from(set, v, at); return t };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })), D = !!window.DrawSVGPlugin;
    tiles.forEach(function (t, i) {
      var at = i * 0.18;
      if (t.classList.contains('is-hot')) {
        tl.fromTo(t, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clipPath' }, at);
        var bulb = t.querySelector('.aq-method-bento__bulb'), hot = qa('.aq-method-bento__hot', t), marks = qa('.aq-method-bento__mark', t);
        if (bulb) tl.from(bulb, { scale: 0, duration: 0.4, ease: 'back.out(2)', clearProps: 'transform' }, at + 0.5);
        hot.forEach(function (h, k) { tl.from(h, { scaleX: 0, transformOrigin: '0% 50%', duration: k === 0 ? 0.9 : 0.45, ease: k === 0 ? 'power2.in' : 'none', clearProps: 'transform' }, at + 0.7 + (k ? 0.9 + (k - 1) * 0.45 : 0)) });
        marks.forEach(function (mk, k) { tl.from(mk, { y: -10, autoAlpha: 0, duration: 0.4, clearProps: 'transform,opacity,visibility' }, at + 1.55 + k * 0.45) });
        FR(tl, qa('.aq-method-bento__tick', t), { autoAlpha: 0, duration: 0.3, stagger: 0.015, clearProps: 'opacity,visibility' }, at + 0.6);
        FR(tl, qa('.aq-method-bento__dl, .aq-method-bento__t, .aq-method-bento__no', t), { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, at + 0.4);
      } else if (t.classList.contains('aq-method-bento__gap')) {
        tl.from(t, { autoAlpha: 0, duration: 0.5, clearProps: 'opacity,visibility' }, 0.9)
          .from(t.querySelector('.aq-method-bento__ghost'), { x: 40, autoAlpha: 0, duration: 0.8, clearProps: 'transform,opacity,visibility' }, 1.1);
      } else {
        tl.from(t, { y: 24, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, 0.3 + at);
        var ln = qa('.aq-method-bento__ln, .aq-method-bento__th, .aq-method-bento__fill', t);
        if (D) tl.from(ln, { drawSVG: '0%', duration: 0.8, stagger: 0.04, ease: 'power2.inOut' }, 0.5 + at);
        if (D) FR(tl, qa('.aq-method-bento__fl', t), { drawSVG: '0%', duration: 0.6, stagger: 0.05 }, 1.0 + at);
        FR(tl, qa('.aq-method-bento__dot', t), { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%', duration: 0.25, stagger: 0.03, clearProps: 'transform,opacity,visibility' }, 1.2 + at);
        FR(tl, qa('.aq-method-bento__ray', t), { autoAlpha: 0, duration: 0.15, stagger: { each: 0.04, from: 'center' }, clearProps: 'opacity,visibility' }, 1.2 + at);
      }
    });
    m.on(el, function () { tl.play() }, 'top 75%');

    /* The probe: the visitor drags a reading along the hot-water rail (or uses the arrow keys) and the tile says which
       zone that temperature falls in. Ported from Subframe Motion "Snapping range slider" (slider-detents), MIT,
       (c) 2026 Subframe (adapted from ddoemonn/interior, MIT, (c) 2026 ozzy). Kept: detents that attract within 4.5 %
       of the range while dragging, pointer capture, the spring-driven carriage (stiffness 520, damping 34, mass 0.45),
       full slider keys (arrows, Page Up/Down, Home, End). Replaced: the demo track with our rail, its marks as detents. */
    qa('.aq-method-bento__scale').forEach(function (sc) {
      var marks = qa('.aq-method-bento__mark', sc).map(function (mk) { return { v: parseFloat(mk.style.getPropertyValue('--at')) || 0, l: (mk.querySelector('.aq-method-bento__ml') || {}).textContent || '' } });
      if (!marks.length || !m.spring) return;
      var base = sc.getAttribute('data-base') || '', name = (sc.closest('.aq-method-bento__tile').querySelector('.aq-method-bento__t') || {}).textContent || '';
      var probe = document.createElement('div'); probe.className = 'aq-method-bento__probe';
      probe.innerHTML = '<div class="aq-method-bento__thumb" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal"><span class="aq-method-bento__needle" aria-hidden="true"></span></div>';
      var read = document.createElement('p'); read.className = 'aq-method-bento__read'; read.setAttribute('aria-live', 'polite');
      sc.appendChild(probe); sc.appendChild(read); /* pass 12: the readout lives in the scale (the desktop band) */
      var th = probe.querySelector('.aq-method-bento__thumb'); th.setAttribute('aria-label', name.trim() + ': try a temperature');
      var val = 50, car = { x: 50 };
      var sp = m.spring(car, { stiffness: 520, damping: 34, mass: 0.45 }, function (o) { th.style.left = o.x + '%' });
      function zone(v) { var z = base, k = -1; marks.forEach(function (mk, i) { if (v >= mk.v) { z = mk.l; k = i } }); return { t: z, k: k } }
      function set(v, snap, jump) {
        v = Math.max(0, Math.min(100, Math.round(v)));
        if (snap) marks.forEach(function (mk) { if (Math.abs(v - mk.v) <= 4.5) v = mk.v });
        val = v; var z = zone(v);
        th.setAttribute('aria-valuenow', v); th.setAttribute('aria-valuetext', v + ' °C: ' + z.t);
        read.innerHTML = '<span class="aq-method-bento__rv">' + v + ' °C</span><span class="aq-method-bento__rl"></span>';
        read.lastChild.textContent = z.t; sc.setAttribute('data-zone', z.k + 1);
        jump ? sp.jump({ x: v }) : sp.to({ x: v });
      }
      set(50, false, true);
      function at(x) { var r = probe.getBoundingClientRect(); return (x - r.left) / r.width * 100 }
      probe.addEventListener('pointerdown', function (ev) { if (ev.button) return; probe.setPointerCapture(ev.pointerId); probe.classList.add('is-drag'); th.focus({ preventScroll: true }); set(at(ev.clientX), true); ev.preventDefault() });
      probe.addEventListener('pointermove', function (ev) { if (probe.hasPointerCapture && probe.hasPointerCapture(ev.pointerId)) set(at(ev.clientX), true) });
      ['pointerup', 'pointercancel'].forEach(function (t) { probe.addEventListener(t, function () { probe.classList.remove('is-drag') }) });
      th.addEventListener('keydown', function (ev) {
        var d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[ev.key];
        if (d) set(val + d, false, true); else if (ev.key === 'Home') set(0, false, true); else if (ev.key === 'End') set(100, false, true); else return;
        ev.preventDefault();
      });
    });
  });
});
