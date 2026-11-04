/* JointSpine: the pipe is inked over its own faint impression, top to bottom in one stroke: down beside the title,
   round the bend, down the spine past every joint and out of the section. As the ink reaches a joint its dot strikes
   and its row prints beside it. One timeline, once, about 2.6 s.
   Ported from Subframe Motion "SVG line drawing animation" (signature-draw), MIT, (c) 2026 Subframe
   (kept: the faint offset impression that is always there, the ink drawn over it as one stroke over 2100 ms on
   cubic-bezier(.37,.12,.28,1), the detail that appears when the stroke reaches it; replaced: one SVG path with the
   drop, the bend and the CSS pipe pieces sharing one progress by their length, the replay button with scroll-in). */
AQmotion.fx('JointSpine', function (root, m) {
  root.querySelectorAll('.aq-joint-spine').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    var sec = el.closest('.aq-section') || el, top0 = function (n) { return n.getBoundingClientRect().top };
    var ez = window.CustomEase ? (CustomEase.get('aq-sig') || CustomEase.create('aq-sig', 'M0,0 C0.37,0.12 0.28,1 1,1')) : 'power2.inOut';
    var rows = qa('.aq-joint-spine__row').filter(function (r) { return r.offsetParent });
    var bink = qa('.aq-joint-spine__bink path'), bend = el.querySelector('.aq-joint-spine__bend');
    var drop = el.querySelector('.aq-joint-spine__drop .aq-joint-spine__ink'), tail = el.querySelector('.aq-joint-spine__tail .aq-joint-spine__ink');
    var showBend = bend && bend.getBoundingClientRect().width > 0;
    var tl = m.tw(gsap.timeline({ paused: true }));
    /* rows wait for their joint */
    rows.forEach(function (r) {
      var cells = qa(':scope > h3, :scope > p, :scope > .aq-joint-spine__fh > *', r), j = r.querySelector('.aq-joint-spine__joint'), no = r.querySelector('.aq-joint-spine__no');
      r._tl = m.tw(gsap.timeline({ paused: true }));
      if (j) r._tl.from(j, { scaleX: 0, duration: 0.3, ease: 'power3.out', clearProps: 'transform' }, 0);
      if (no) r._tl.from(no, { autoAlpha: 0, x: r.classList.contains('is-r') ? -8 : 8, duration: 0.3, ease: 'power3.out', clearProps: 'opacity,visibility,transform' }, 0.05);
      if (cells.length) r._tl.from(cells, { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.05);
    });
    function run() {
      /* the stroke's pieces, measured now (in reading order) */
      var s0 = top0(sec), P = [], L = 0;
      function add(kind, n, len, extra) { if (!n || len <= 0) return; P.push({ k: kind, n: n, a: L, l: len, x: extra }); L += len }
      if (showBend && drop) { var dr = drop.getBoundingClientRect(), vis = Math.max(0, dr.bottom - s0); add('drop', drop, vis, dr.height) }
      if (showBend && bink.length) { bink.forEach(function (p) { p.setAttribute('pathLength', '1'); p.style.strokeDasharray = '1 1' }); add('bend', bink, 150) }
      rows.forEach(function (r) { var ink = r.querySelector('.aq-joint-spine__ink'), h = r.getBoundingClientRect().height, j = r.querySelector('.aq-joint-spine__joint');
        var jy = j ? j.getBoundingClientRect().top - r.getBoundingClientRect().top : h / 2; add('seg', ink, h, { r: r, jy: jy }) });
      if (tail) add('tail', tail, Math.max(60, sec.getBoundingClientRect().bottom - tail.getBoundingClientRect().top));
      P.forEach(function (q) { if (q.k !== 'bend') gsap.set(q.n, { scaleY: q.k === 'drop' ? (q.x - q.l) / q.x : 0 }) });
      var o = { p: 0 };
      tl.to(o, { p: 1, duration: 2.1 + Math.min(0.5, rows.length * 0.04), ease: ez, onUpdate: function () {
        var at = o.p * L;
        P.forEach(function (q) { var f = Math.max(0, Math.min(1, (at - q.a) / q.l));
          if (q.k === 'bend') q.n.forEach(function (p) { p.style.strokeDashoffset = String(1 - f) });
          else if (q.k === 'drop') gsap.set(q.n, { scaleY: (q.x - q.l + f * q.l) / q.x });
          else gsap.set(q.n, { scaleY: f });
          if (q.k === 'seg' && !q.x.r._hit && at >= q.a + q.x.jy) { q.x.r._hit = 1; q.x.r._tl.play() } });
      }, onComplete: function () {
        P.forEach(function (q) { if (q.k === 'bend') q.n.forEach(function (p) { p.style.removeProperty('stroke-dasharray'); p.style.removeProperty('stroke-dashoffset') }); else gsap.set(q.n, { clearProps: 'transform' }) });
        rows.forEach(function (r) { if (!r._hit) { r._hit = 1; r._tl.play() } });
      } });
      tl.play();
    }
    /* hide the ink until the stroke starts (the impression stays) */
    if (showBend && bink.length) bink.forEach(function (p) { p.setAttribute('pathLength', '1'); p.style.strokeDasharray = '1 1'; p.style.strokeDashoffset = '1' });
    qa('.aq-joint-spine__row .aq-joint-spine__ink').forEach(function (n) { gsap.set(n, { scaleY: 0 }) });
    if (tail) gsap.set(tail, { scaleY: 0 });
    if (showBend && drop) { var d0 = drop.getBoundingClientRect(), v0 = Math.max(0, d0.bottom - top0(sec)); if (d0.height) gsap.set(drop, { scaleY: (d0.height - v0) / d0.height }) }
    m.on(el, run, 'top 75%');
  });
});
