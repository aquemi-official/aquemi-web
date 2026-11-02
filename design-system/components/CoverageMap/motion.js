/* CoverageMap: the readout comes on like an instrument. The region columns rise in one after another; the readout's
   rule runs across, the region in hand decodes (text-scramble), its stamp strikes, then the tile map is laid tile by tile
   from west to east and the base line follows. One entrance timeline under 2.5 s, once on scroll-in.
   Choosing another region (pointer, focus, a tile): its readout face decodes again and the stamp strikes (visitor-driven,
   may repeat; instant for keyboard). Nothing under reduced motion: the readout simply shows the region in hand. */
AQmotion.fx('CoverageMap', function (root, m) {
  var CLEAR = 'transform,opacity,visibility', CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  /* Ported from Subframe Motion "Text scramble effect" (text-scramble), MIT, (c) 2026 Subframe; after ibelick's
     motion-primitives text-scramble, MIT, (c) 2024 ibelick. 20 steps of 40 ms: each step shows the letters up to
     progress x length as they are and random capitals and digits after them (spaces and punctuation stay), then the
     text as it is. Works on every text node of the mono parts of a readout face, so placeholder chips keep their
     markup; the accessible text is restored at the end (and the face is an aria-live region that announces the end). */
  function scramble(face) {
    var nodes = [];
    face.querySelectorAll('.aq-coverage-map__sc').forEach(function (el) {
      var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n; while ((n = w.nextNode())) if (n.nodeValue.trim()) nodes.push({ n: n, t: n.nodeValue });
    });
    if (!nodes.length) return null;
    var st = { p: 0 }, steps = 20;
    function show(p) {
      var q = Math.floor(p * steps) / steps;
      nodes.forEach(function (o) {
        var t = o.t, L = t.length, s = '';
        for (var i = 0; i < L; i++) { var c = t[i]; s += (!/[A-Za-z0-9]/.test(c) || q * L > i) ? c : CHARS[Math.floor(Math.random() * CHARS.length)] }
        o.n.nodeValue = q >= 1 ? t : s;
      });
    }
    return gsap.to(st, { p: 1, duration: steps * 0.04, ease: 'none', onUpdate: function () { show(st.p) }, onComplete: function () { show(1) }, onInterrupt: function () { show(1) } });
  }
  function strike(face) {
    var s = face.querySelector('.aq-coverage-map__stamp'); if (!s) return null;
    return gsap.fromTo(s, { scale: 1.12, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.22, ease: 'power2.out', clearProps: CLEAR });
  }

  root.querySelectorAll('.aq-coverage-map').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var cols = [].slice.call(el.querySelectorAll('.aq-coverage-map__col')), now = el.querySelector('.aq-coverage-map__now'),
      tiles = [].slice.call(el.querySelectorAll('.aq-coverage-map__tile')), base = el.querySelector('.aq-coverage-map__base');
    var col = function (t) { return parseInt(t.style.gridColumnStart || t.style.gridColumn, 10) || 1 };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (cols.length) tl.fromTo(cols, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, clearProps: CLEAR }, 0.1);
    if (now) {
      tl.fromTo(now, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.inOut', clearProps: 'clipPath' }, 0);
      var face = now.querySelector('.aq-coverage-map__nv.is-on');
      if (face) {
        tl.add(function () { var t = scramble(face); if (t) m.tw(t) }, 0.45);
        var s = face.querySelector('.aq-coverage-map__stamp');
        if (s) tl.fromTo(s, { scale: 1.12, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.22, ease: 'power2.out', clearProps: CLEAR }, 1.0);
      }
    }
    tiles.forEach(function (t) {
      tl.fromTo(t, { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out', clearProps: CLEAR }, 0.7 + (col(t) - 1) * 0.09);
    });
    if (base) tl.fromTo(base, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.4, clearProps: CLEAR }, '>-0.1');
    var total = tl.duration(); if (total > 2.5) tl.timeScale(total / 2.5);
    m.on(el, function () { tl.play() }, 'top 75%');

    var run = [];
    el.addEventListener('aqcoverage', function (ev) {
      run.forEach(function (t) { t && t.kill() }); run = [];
      if (ev.detail.instant || !now) return;
      var f = now.querySelector('.aq-coverage-map__nv.is-on'); if (!f) return;
      run = [scramble(f), strike(f)];
    });
  });
});
