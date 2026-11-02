/* MarkingMatch: the two rules land, the water runs to the closed gate, the schedule is read with a crosshair.
   Ported from Subframe Motion "Chart crosshair" (chart-crosshair), MIT, (c) 2026 Subframe
   (kept: the crosshair snaps to the nearest data point rather than following the raw pointer, its rules move in
   ~180 ms on a strong ease-out, the axis label of the point lights, the crosshair hides when the pointer leaves;
   replaced: the line chart with the schedule: a flow-tint band glides to the pointed row and a flow bar under the head
   slides to the pointed column, whose name lights).
   Entrance, once: the facts rise 16 px, 0.12 s apart; on the gate glyph the pipe draws, the water runs up to the valve
   and the gate drops shut (0.3 s, power4.in). The schedule's head fades in, then rows rise 8 px, 0.07 s apart, each
   tick drawn as its row lands. Under 3 s. */
AQmotion.fx('MarkingMatch', function (root, m) {
  root.querySelectorAll('.aq-marking-match').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var D = window.DrawSVGPlugin, facts = el.querySelectorAll('.aq-marking-match__fact'), gate = el.querySelector('.aq-marking-match__gate');
    var ft = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (facts.length) ft.from(facts, { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.12, clearProps: 'transform,opacity,visibility' }, 0);
    if (gate) {
      var pipe = gate.querySelectorAll('.aq-marking-match__pw, .aq-marking-match__vb, .aq-marking-match__vs'), wf = gate.querySelector('.aq-marking-match__wf'), gt = gate.querySelector('.aq-marking-match__gt');
      if (D) ft.fromTo(pipe, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, ease: 'power2.inOut', stagger: 0.08, clearProps: 'strokeDasharray,strokeDashoffset' }, 0.3);
      if (D && wf) ft.fromTo(wf, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.8, ease: 'power1.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.9);
      if (gt) ft.fromTo(gt, { y: -14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power4.in', clearProps: 'transform,opacity,visibility' }, 1.55);
    }
    m.on(el, function () { ft.play() }, 'top 80%');

    var table = el.querySelector('.aq-marking-match__table'); if (!table) return;
    var head = table.querySelector('.aq-marking-match__head'), rows = table.querySelectorAll('.aq-marking-match__row');
    var tt = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (head) tt.from(head, { autoAlpha: 0, duration: 0.5, clearProps: 'opacity,visibility' }, 0);
    [].forEach.call(rows, function (r, i) {
      tt.from(r, { y: 8, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, 0.15 + i * 0.07);
      var ok = r.querySelector('.aq-marking-match__ok path');
      if (D && ok) tt.fromTo(ok, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.35, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.4 + i * 0.07);
    });
    m.on(table, function () { tt.play() }, 'top 85%');

    // crosshair: snap to the pointed cell (desktop layout only)
    table.classList.add('is-live');
    var band = table.querySelector('.aq-marking-match__band');
    table.addEventListener('pointermove', function (ev) {
      if (m.narrow() || ev.pointerType === 'touch') return;
      var c = ev.target.closest && ev.target.closest('.aq-marking-match__c'); if (!c) return;
      var row = c.parentNode, tr = table.getBoundingClientRect(), rr = row.getBoundingClientRect(), col = c.getAttribute('data-c');
      if (!table.classList.contains('is-x') && band) band.style.transition = 'none';
      table.style.setProperty('--hy', (rr.top - tr.top) + 'px'); table.style.setProperty('--hh', rr.height + 'px'); table.style.setProperty('--hc', col);
      table.setAttribute('data-hc', col); table.classList.add('is-x');
      if (band && band.style.transition) { void band.offsetWidth; band.style.transition = '' }
    });
    table.addEventListener('pointerleave', function () { table.classList.remove('is-x'); table.removeAttribute('data-hc') });
  });
});
