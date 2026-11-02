/* CheckLedger: the schedule is posted row by row like a departure board. The column names decode; each row's navy
   tile wipes in and its slash numeral turns over on split-flap leaves; the row's tiles follow left to right, the
   time last. Once, under 3 s; folded rows appear whole when opened. Pointing at a row turns its numeral over again;
   pointing at a tile lays a crosshair over the grid (row rule and column rule) and lights the column's name. */
(function () {
  function clEase() { if (window.CustomEase && !CustomEase.get('aq-flap')) CustomEase.create('aq-flap', 'M0,0 C0.4,0 0.2,1 1,1'); return window.CustomEase ? 'aq-flap' : 'power2.inOut' }
  /* Ported from Subframe Motion "Split-flap departure board" (departure-board), MIT, (c) 2026 Subframe
     Each glyph is a cell whose leaf, a blank-ish glyph on its front and the real one on its back, turns over the cell's
     centre line (rotateX 0 to -180 deg, 440 ms, cubic-bezier(.4,0,.2,1), 45 ms between cells, the library's values).
     The real text is restored when the leaves rest. */
  function clFlap(el, dur, step) {
    if (!el) return null;
    if (el._flap) el._flap.progress(1);
    var txt = el.getAttribute('data-flap') || el.textContent; el.setAttribute('data-flap', txt);
    var G = '0123456789/', h = '<span class="aq-check-ledger__sr">' + txt.replace(/</g, '&lt;') + '</span>';
    [].forEach.call(txt, function (c) {
      var g = G[(Math.random() * G.length) | 0];
      h += '<span class="aq-cl-flap" aria-hidden="true"><span class="aq-cl-flap__s">' + c + '</span><span class="aq-cl-flap__leaf"><span class="aq-cl-flap__f">' + g + '</span><span class="aq-cl-flap__b">' + c + '</span></span><span class="aq-cl-flap__seam"></span></span>';
    });
    el.innerHTML = h;
    el._flap = gsap.timeline({ onComplete: function () { el.textContent = txt; el._flap = null } })
      .fromTo(el.querySelectorAll('.aq-cl-flap__leaf'), { rotationX: 0 }, { rotationX: -180, duration: dur, ease: clEase(), stagger: step });
    return el._flap;
  }
  AQmotion.fx('CheckLedger', function (root, m) {
    root.querySelectorAll('.aq-check-ledger').forEach(function (el) {
      if (!m.free(el)) return; m.claim(el);
      var q = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, wide = !m.narrow();
      var rows = q('.aq-check-ledger__row').filter(function (r) { return r.offsetParent !== null });
      var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
      var hc = q('.aq-check-ledger__hc');
      if (wide && hc.length) { tl.from(hc, { autoAlpha: 0, duration: 0.3, stagger: 0.06, clearProps: 'opacity,visibility' }, 0); hc.forEach(function (h, i) { tl.call(function () { m.scramble(h, 0) }, null, i * 0.06) }) }
      rows.forEach(function (r, i) {
        var at = 0.1 + i * 0.13, n = r.querySelector('.aq-check-ledger__n'), nv = r.querySelector('.aq-check-ledger__nv');
        var cells = q('.aq-check-ledger__c--go, .aq-check-ledger__c--t, .aq-check-ledger__c--no, .aq-check-ledger__c--time', r);
        tl.fromTo(n, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power3.inOut', clearProps: 'clipPath' }, at);
        if (nv) { gsap.set(nv, { autoAlpha: 0 }); tl.set(nv, { autoAlpha: 1, clearProps: 'opacity,visibility' }, at + 0.2).call(function (nv) { clFlap(nv, 0.44, 0.045) }, [nv], at + 0.2) }
        tl.from(cells, { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, at + 0.15);
        var fit = q('.aq-check-ledger__fit', r); if (fit.length) tl.fromTo(fit, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: 'power3.inOut', clearProps: 'clipPath' }, at + 0.4);
      });
      m.on(el, function () { tl.play() }, 'top 78%');
      // pointing at a row turns its numeral over again (after the entrance)
      rows.forEach(function (r) {
        var nv = r.querySelector('.aq-check-ledger__nv');
        r.addEventListener('pointerenter', function (ev) { if (ev.pointerType === 'mouse' && tl.progress() === 1 && !(nv && nv._flap)) clFlap(nv, 0.3, 0.03) });
      });

      /* Ported from Subframe Motion "Chart crosshair" (chart-crosshair), MIT, (c) 2026 Subframe
         A crosshair snaps to the tile under the pointer: a row rule along the check and a column rule down the
         attribute glide there (200 ms power3, the library's snap), the column's name lights and the tile tints, so
         "shop visit x what it does not prove" reads at a glance. Keyboard focus on a route snaps the row rule only. */
      if (!wide) return;
      var list = el.querySelector('.aq-check-ledger__rows'); if (!list) return;
      var hx = document.createElement('span'), vx = document.createElement('span');
      hx.className = 'aq-check-ledger__xh'; vx.className = 'aq-check-ledger__xv'; hx.setAttribute('aria-hidden', 'true'); vx.setAttribute('aria-hidden', 'true');
      el.appendChild(hx); el.appendChild(vx);
      var qy = gsap.quickTo(hx, 'y', { duration: 0.2, ease: 'power3.out' }), qx = gsap.quickTo(vx, 'x', { duration: 0.2, ease: 'power3.out' }), live = false, cell = null;
      function snap(c, col) {
        var row = c.closest('.aq-check-ledger__row'), er = el.getBoundingClientRect(), lr = list.getBoundingClientRect(), rr = row.getBoundingClientRect(), cr = c.getBoundingClientRect();
        gsap.set(hx, { left: lr.left - er.left, width: lr.width }); gsap.set(vx, { top: lr.top - er.top, height: lr.height });
        var y = rr.bottom - er.top - 1, x = cr.left - er.left - 1;
        if (!live) { gsap.set(hx, { y: y, display: 'block' }); gsap.set(vx, { x: x, display: 'block' }); m.tw(gsap.to([hx].concat(col ? [vx] : []), { autoAlpha: 1, duration: 0.15, overwrite: 'auto' })); live = true } else { qy(y); qx(x) }
        if (!col) m.tw(gsap.to(vx, { autoAlpha: 0, duration: 0.1, overwrite: 'auto' })); else if (gsap.getProperty(vx, 'opacity') < 1) m.tw(gsap.to(vx, { autoAlpha: 1, duration: 0.15, overwrite: 'auto' }));
        var ci = col ? c.getAttribute('data-col') : null;
        hc.forEach(function (h) { h.classList.toggle('is-col', ci !== null && h.getAttribute('data-col') === ci) });
        if (cell) cell.classList.remove('is-cell'); cell = col ? c : null; if (cell) cell.classList.add('is-cell');
      }
      function clear() { live = false; m.tw(gsap.to([hx, vx], { autoAlpha: 0, duration: 0.13, overwrite: 'auto', onComplete: function () { if (!live) gsap.set([hx, vx], { display: 'none' }) } })); hc.forEach(function (h) { h.classList.remove('is-col') }); if (cell) cell.classList.remove('is-cell'); cell = null }
      list.addEventListener('pointerover', function (ev) { var c = ev.target.closest && ev.target.closest('.aq-check-ledger__c'); if (c && ev.pointerType === 'mouse') snap(c, true) });
      list.addEventListener('pointerleave', clear);
      list.addEventListener('focusin', function (ev) { var c = ev.target.closest && ev.target.closest('.aq-check-ledger__c'); if (c) snap(c, false) });
      list.addEventListener('focusout', function (ev) { if (!list.contains(ev.relatedTarget)) clear() });
    });
  });
})();
