/* MacroLeaders: the macro opens like a membrane element unrolling, then each industry is called out from it.
   The leaves start pressed together and fan apart back to front; the PP pipe slides in along its own axis and the
   weld bead swells into place; water runs once along every leaf. Then, row by row, the numbered marker pops onto its
   arc, the leader shoots right from it to the row, and the row's cells arrive as the line lands. About 3.4 s.
   Phones: the band fans the same way; markers drop onto the rail and their rows follow. Pipe-pair (pass 12 round C):
   the two cut sections slide out of the page edge along their axes, the band between, then the same row callouts. */
AQmotion.fx('MacroLeaders', function (root, m) {
  root.querySelectorAll('.aq-macro-leaders').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s, c) { return (c || el).querySelector(s) }, qa = function (s, c) { return [].slice.call((c || el).querySelectorAll(s)) };
    var narrow = m.narrow(), D = window.DrawSVGPlugin;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var layers = qa('.aq-macro-leaders__layer');
    // leaves: pressed onto the middle leaf, then fanned out, back to front
    var pair = el.classList.contains('aq-macro-leaders--pair');
    /* pipe-pair: each cut section slides out along its own pipe axis (from the left page edge), the band between them
       after the first */
    if (pair) layers.forEach(function (g, i) {
      tl.from(g, { x: g.classList.contains('aq-macro-leaders__temp') ? -24 : -90, autoAlpha: 0, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.05 + i * 0.16);
    });
    else layers.forEach(function (g, i) {
      var dy = (2 - i) * 70;
      tl.from(g, { y: dy, rotation: (2 - i) * 2.2, svgOrigin: '560 380', autoAlpha: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.05 + (4 - i) * 0.07);
    });
    var pipe = q('.aq-macro-leaders__pipe'), bead = qa('.aq-macro-leaders__bead ellipse');
    if (pipe) tl.from(pipe, { x: -140, y: 44, autoAlpha: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.2);
    if (bead.length) tl.from(bead, { scale: 0.4, transformOrigin: '50% 50%', autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(2)', clearProps: 'transform,opacity,visibility' }, 0.9);
    var water = qa('.aq-macro-leaders__water');
    if (water.length) {
      if (D) tl.fromTo(water, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 1.4, ease: 'power1.inOut', stagger: 0.08, clearProps: 'strokeDasharray,strokeDashoffset' }, 0.8);
      else tl.from(water, { autoAlpha: 0, duration: 0.6 }, 0.8);
    }
    tl.from(qa('.aq-macro-leaders__lbl'), { autoAlpha: 0, duration: 0.4, stagger: 0.2, clearProps: 'opacity,visibility' }, 1.2);
    // header rule and labels
    var head = qa('thead th');
    tl.from(head, { autoAlpha: 0, y: 6, duration: 0.4, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0.3);
    // rows: marker, leader, cells
    qa('tbody tr').forEach(function (tr, i) {
      var at = 0.75 + i * 0.22, mk = q('.aq-macro-leaders__mk', tr), lead = q('.aq-macro-leaders__lead', tr);
      var cells = [q('.aq-macro-leaders__name', tr)].concat(qa('td', tr)).filter(Boolean);
      if (mk) tl.from(mk, { scale: 0, rotation: -120, duration: 0.45, ease: 'back.out(2.4)', clearProps: 'transform' }, at);
      if (lead) tl.fromTo(lead, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.inOut', clearProps: 'transform' }, at + 0.2);
      tl.from(cells, { x: narrow ? 0 : -14, y: narrow ? 10 : 0, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, at + 0.45);
      if (mk) tl.call(function () { m.scramble(mk, 0) }, null, at + 0.1);
    });
    m.on(el, function () { tl.play() }, 'top 78%');
  
    // Ported from Subframe Motion "Chart crosshair" (chart-crosshair), MIT, (c) 2026 Subframe
    // Reading a dense grid: a crosshair snaps to the cell under the pointer (a row rule along that industry and a
    // column rule down that attribute, 200 ms power3 like the library's snap), the column's head lights and the cell is
    // marked, so "medical devices x inspector" reads at a glance while the whole table stays in view. Keyboard focus on
    // a row's link snaps the row rule. Mouse and focus only; nothing under reduced motion.
    var table = el.querySelector('.aq-macro-leaders__table');
    if (table && !m.narrow()) {
      var hx = document.createElement('span'), vx = document.createElement('span');
      hx.className = 'aq-macro-leaders__xh'; vx.className = 'aq-macro-leaders__xv'; hx.setAttribute('aria-hidden', 'true'); vx.setAttribute('aria-hidden', 'true');
      el.appendChild(hx); el.appendChild(vx);
      var heads = [].slice.call(table.querySelectorAll('thead th')), qy = gsap.quickTo(hx, 'y', { duration: 0.2, ease: 'power3.out' }), qx = gsap.quickTo(vx, 'x', { duration: 0.2, ease: 'power3.out' }), live = false, cell = null;
      function snap(c, col) {
        var row = c.closest('tr'), er = el.getBoundingClientRect(), tr = table.getBoundingClientRect(), rr = row.getBoundingClientRect(), cr = c.getBoundingClientRect();
        gsap.set(hx, { left: tr.left - er.left, width: tr.width }); gsap.set(vx, { top: tr.top - er.top, height: tr.height });
        var y = rr.bottom - er.top - 1, x = cr.left - er.left;
        if (!live) { gsap.set(hx, { y: y, display: 'block' }); gsap.set(vx, { x: x, display: 'block' }); m.tw(gsap.to([hx].concat(col ? [vx] : []), { autoAlpha: 1, duration: 0.15, overwrite: 'auto' })); live = true } else { qy(y); qx(x) }
        if (!col) m.tw(gsap.to(vx, { autoAlpha: 0, duration: 0.1, overwrite: 'auto' })); else if (gsap.getProperty(vx, 'opacity') < 1) m.tw(gsap.to(vx, { autoAlpha: 1, duration: 0.15, overwrite: 'auto' }));
        var ci = [].indexOf.call(row.children, c);
        heads.forEach(function (h, j) { h.classList.toggle('is-col', col && j === ci) });
        if (cell) cell.classList.remove('is-cell'); cell = col ? c : null; if (cell) cell.classList.add('is-cell');
      }
      function clear() { live = false; m.tw(gsap.to([hx, vx], { autoAlpha: 0, duration: 0.13, overwrite: 'auto', onComplete: function () { if (!live) gsap.set([hx, vx], { display: 'none' }) } })); heads.forEach(function (h) { h.classList.remove('is-col') }); if (cell) cell.classList.remove('is-cell'); cell = null }
      table.addEventListener('pointerover', function (ev) { var c = ev.target.closest && ev.target.closest('tbody th, tbody td'); if (c && ev.pointerType === 'mouse') snap(c, true) });
      table.addEventListener('pointerleave', clear);
      table.addEventListener('focusin', function (ev) { var c = ev.target.closest && ev.target.closest('tbody th, tbody td'); if (c) snap(c, false) });
      table.addEventListener('focusout', function (ev) { if (!table.contains(ev.relatedTarget)) clear() });
    }
});
});
