/* RequestMenu: the oversized title slides in from beyond the right edge as the sheet scrolls up (scroll-linked, so it
   reads cropped the way the concept sets it and lands whole before the menu is read), the skid draws itself and the
   water runs through it once, the menu's lines follow in reading order; pointing at a line bands it and lights its
   column head. Nothing under reduced motion: the title sits in place and the menu is complete without script. */
AQmotion.fx('RequestMenu', function (root, m) {
  root.querySelectorAll('.aq-request-menu-wrap').forEach(function (wrap) {
    var el = wrap.querySelector('.aq-request-menu');
    if (!el || !m.free(el)) return; m.claim(el);

    /* Ported from Subframe Motion "Scroll-driven image reveal" (scroll-window), MIT, (c) 2026 Subframe: one scroll
       progress mapped to a phase with clamp(p * 1.24), so the move completes before the end of its range and holds;
       here the phase carries the title in from the right edge (no fade: the words stay at full contrast). */
    var mast = wrap.querySelector('.aq-request-menu__mast');
    if (mast) {
      var clamp = function (n) { return Math.max(0, Math.min(1, n)) };
      var paint = function (p) { var f = clamp(p * 1.24), e = 1 - Math.pow(1 - f, 2); gsap.set(mast, { x: (1 - e) * mast.offsetWidth * (m.narrow() ? 0.18 : 0.26) }) };
      m.tw(ScrollTrigger.create({ trigger: wrap, start: 'top bottom', end: 'top 30%', onUpdate: function (s) { paint(s.progress) }, onRefresh: function (s) { paint(s.progress) } }));
    }

    var svg = el.querySelector('svg.aq-iso'), fig = el.querySelector('.aq-request-menu__fig');
    var tl = svg && window.AQiso ? AQiso.timeline(svg, m, { draw: 1.3, pipe: 0.6, flow: 1.3 }) : null;
    if (tl && fig) m.on(fig, function () { tl.play() }, 'top 80%');

    var lines = [].filter.call(el.querySelectorAll('.aq-request-menu__line'), function (r) { return !r.closest('.aq-fold-x') });
    var cells = lines.map(function (r) { return r.children });
    if (lines.length) {
      var flat = []; cells.forEach(function (c) { flat.push.apply(flat, c) });
      gsap.set(flat, { y: 12, autoAlpha: 0 });
      m.on(el.querySelector('.aq-request-menu__table') || el, function () {
        m.tw(gsap.to(flat, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out', stagger: 0.035, clearProps: 'transform,opacity,visibility' }));
      }, 'top 80%');
    }
  });
});

/* Ported from Subframe Motion "Chart crosshair tooltip" (chart-crosshair), MIT, (c) 2026 Subframe: the crosshair snaps
   to the cell under the pointer (no easing); the row takes the band (CSS) and the column's head lights. Visitor-driven,
   so it also runs under reduced motion. */
(function () {
  function set(tab, col) { tab.querySelectorAll('.aq-request-menu__h').forEach(function (h) { h.classList.toggle('is-on', h.getAttribute('data-col') === col) }) }
  function at(ev) { var c = ev.target.closest && ev.target.closest('.aq-request-menu__table [data-col]'); if (!c || c.tagName === 'TH' && c.classList.contains('aq-request-menu__h')) return; set(c.closest('table'), c.getAttribute('data-col')) }
  document.addEventListener('pointerover', at);
  document.addEventListener('focusin', at);
  document.addEventListener('pointerout', function (ev) { var t = ev.target.closest && ev.target.closest('.aq-request-menu__table'); if (t && !t.contains(ev.relatedTarget)) set(t, null) });
  document.addEventListener('focusout', function (ev) { var t = ev.target.closest && ev.target.closest('.aq-request-menu__table'); if (t && !t.contains(ev.relatedTarget)) set(t, null) });
})();
