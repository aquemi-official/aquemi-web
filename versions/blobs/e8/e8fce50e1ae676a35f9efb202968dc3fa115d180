/* RiserValves: the page's one scroll-linked story. As the requests scroll up through the viewport, water rises down the
   riser row by row; at each request it opens the valve and runs branch A into the first response, then branch B under
   it and up into what follows, before going on to the next request. Scroll back and it drains. The words never fade
   (they enter once, 12 px, then stay at full contrast). Nothing under reduced motion: every pipe full, every valve open.

   Ported from Subframe Motion "Scroll-driven image reveal" (scroll-window), MIT, (c) 2026 Subframe: one scroll progress
   fanned into staggered phases, phase_i = clamp((p - i / n) * n * 1.24), so each row completes before the next begins;
   each row's phase is split again into riser, valve and branch A, branch B run, elbow and rise. */
AQmotion.fx('RiserValves', function (root, m) {
  root.querySelectorAll('.aq-riser-valves').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var rows = [].slice.call(el.querySelectorAll('.aq-riser-valves__row')), n = rows.length, list = el.querySelector('.aq-riser-valves__rows');
    if (!n || !list) return;
    function clamp(x) { return Math.max(0, Math.min(1, x)) }
    function seg(f, a, b) { return clamp((f - a) / (b - a)) }
    function paint(p) {
      rows.forEach(function (r, i) {
        var f = clamp((p - i / n) * n * 1.24), s = r.style, a = seg(f, 0.3, 0.6);
        s.setProperty('--rv-r', seg(f, 0, 0.35).toFixed(3));
        s.setProperty('--rv-a', a.toFixed(3));
        s.setProperty('--rv-b', seg(f, 0.5, 0.82).toFixed(3));
        s.setProperty('--rv-c', seg(f, 0.8, 1).toFixed(3));
        if (a >= 0.5) r.removeAttribute('data-rv'); else r.setAttribute('data-rv', 'shut');
      });
    }
    paint(0);
    m.tw(ScrollTrigger.create({ trigger: list, start: 'top 72%', end: 'bottom 62%', onUpdate: function (st) { paint(st.progress) }, onRefresh: function (st) { paint(st.progress) } }));

    var head = el.querySelector('.aq-riser-valves__colh');
    rows.forEach(function (r, i) {
      var words = r.querySelectorAll('.aq-riser-valves__req, .aq-riser-valves__k, .aq-riser-valves__v');
      gsap.set(words, { y: 12, autoAlpha: 0 });
      m.on(r, function () {
        m.tw(gsap.to(words, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out', stagger: 0.05, clearProps: 'transform,opacity,visibility' }));
      }, 'top 88%');
    });
    if (head) { gsap.set(head, { autoAlpha: 0 }); m.on(el, function () { m.tw(gsap.to(head, { autoAlpha: 1, duration: 0.4, clearProps: 'opacity,visibility' })) }, 'top 85%') }
  });
});
