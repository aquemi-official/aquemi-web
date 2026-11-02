/* RecordAnatomy: the sheet is drawn up and signed off field by field. The frame unrolls downwards, the zone band
   fades up; then the title block is read row by row: the lit window glides onto that row's drawing, the drawing
   draws on (the figure's bar rises under its dashed limit, the stamp strikes once), the field name decodes and the
   row's text rises. On the approval the two signatures ink over their faint impressions. The window lets go at the
   end. Once, under 4.5 s. Phones: each row's own drawing draws as the row arrives. */
AQmotion.fx('RecordAnatomy', function (root, m) {
  root.querySelectorAll('.aq-record-anatomy').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, wide = !m.narrow(), D = window.DrawSVGPlugin, lens = window.AQrecordLens;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var sheet = el.querySelector('.aq-record-anatomy__sheet');
    tl.fromTo(sheet, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.inOut', clearProps: 'clipPath' }, 0)
      .from(q('.aq-record-anatomy__band'), { autoAlpha: 0, duration: 0.5, clearProps: 'opacity,visibility' }, 0.4);
    var rows = q('.aq-record-anatomy__row');
    if (wide) tl.from(q('.aq-record-anatomy__zone'), { autoAlpha: 0, duration: 0.4, stagger: 0.06, clearProps: 'opacity,visibility' }, 0.45);
    function drawFig(svg, at) {
      if (!svg) return;
      var ln = q('path, circle', svg).filter(function (p) { return !p.closest('.aq-record-anatomy__stamp, .aq-record-anatomy__sig') && !p.classList.contains('aq-record-anatomy__imp') });
      if (D) tl.fromTo(ln, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, stagger: 0.025, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, at);
      var t = q('text', svg); if (t.length) tl.from(t, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, at + 0.1);
      var fill = svg.querySelector('.aq-record-anatomy__fill'); if (fill) tl.from(fill, { scaleY: 0, transformOrigin: '50% 100%', duration: 0.6, clearProps: 'transform' }, at + 0.3);
      /* Ported from Subframe Motion "SVG line drawing animation" (signature-draw), MIT, (c) 2026 Subframe:
         the signatures ink over their faint offset impressions in one stroke (0.8 s, cubic-bezier(.37,.12,.28,1)) */
      var sig = q('.aq-record-anatomy__sig path', svg), ink = window.CustomEase ? (CustomEase.get('aq-ink') || CustomEase.create('aq-ink', 'M0,0 C0.37,0.12 0.28,1 1,1')) : 'power2.inOut';
      if (sig.length && D) tl.fromTo(sig, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, stagger: 0.3, ease: ink, clearProps: 'strokeDasharray,strokeDashoffset' }, at + 0.2);
      var st = svg.querySelector('.aq-record-anatomy__stamp'); if (st) tl.from(st, { scale: 1.5, autoAlpha: 0, transformOrigin: '320px 44px', duration: 0.3, ease: 'power4.in', clearProps: 'transform,opacity,visibility' }, at + 0.9);
    }
    var t0 = wide ? 0.75 : 0.5, step = 0.62;
    rows.forEach(function (r, i) {
      var at = t0 + i * step, z = r.getAttribute('data-z');
      var zone = wide ? el.querySelector('.aq-record-anatomy__zone[data-z="' + z + '"] svg') : r.querySelector('.aq-record-anatomy__mini svg');
      if (wide && lens) tl.call(function (z) { lens.to(el, z) }, [z], at);
      drawFig(zone, at + 0.05);
      tl.from(q('.aq-record-anatomy__no-c, .aq-record-anatomy__t, .aq-record-anatomy__d', r), { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, at);
      var t = r.querySelector('.aq-record-anatomy__t'); if (t) tl.call(function (t) { m.scramble(t, 0) }, [t], at);
    });
    var end = t0 + rows.length * step + 0.7;
    if (wide && lens) tl.call(function () { lens.off(el); el._raTour = 0 }, null, end);
    tl.eventCallback('onStart', function () { el._raTour = wide ? 1 : 0 });
    m.on(el, function () { tl.play() }, 'top 72%');
  });
});
