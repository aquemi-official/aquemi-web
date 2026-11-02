/* SpareSheet: the sheet's first part is drawn on the board (its outline inks in, then the centre line, the dimension
   lines run out from their extension lines and the balloon strikes), while the table's rows print top to bottom.
   Once, about 2 s. Choosing another row redraws that part the same way, shorter (0.7 s; repeats, visitor-driven).
   Nothing under reduced motion: the chosen part simply shows. */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches, live = {};
  function draw(g, d) {
    if (!g || !window.gsap) return null;
    var tl = gsap.timeline(), art = g.querySelectorAll('.aq-spare-sheet__art *'), dims = g.querySelectorAll('.aq-spare-sheet__cl, .aq-spare-sheet__dim');
    var txt = g.querySelectorAll('text, .aq-spare-sheet__ball, .aq-spare-sheet__dot');
    if (window.DrawSVGPlugin) {
      tl.fromTo(art, { drawSVG: '0%' }, { drawSVG: '100%', duration: d, stagger: { amount: d * 0.5 }, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
      tl.fromTo(dims, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: d * 0.6, ease: 'power3.out', clearProps: 'strokeDasharray,strokeDashoffset' }, d * 0.6);
    }
    tl.from(txt, { autoAlpha: 0, duration: 0.25, stagger: 0.04, clearProps: 'opacity,visibility' }, d * 0.9);
    return tl;
  }
  window.AQspareDraw = function (r, i) {
    if (reduce || !window.gsap || !r.hasAttribute('data-aqm')) return;
    var id = r.getAttribute('data-ss') || ''; if (live[id]) live[id].progress(1).kill();
    live[id] = draw(r.querySelector('.aq-spare-sheet__part[data-i="' + i + '"]'), 0.7);
  };
  var uid = 0;
  AQmotion.fx('SpareSheet', function (root, m) {
    root.querySelectorAll('.aq-spare-sheet').forEach(function (el) {
      if (!m.free(el)) return; m.claim(el); el.setAttribute('data-ss', 's' + (++uid));
      var tl = m.tw(gsap.timeline({ paused: true })), rows = [].slice.call(el.querySelectorAll('.aq-spare-sheet__row')).filter(function (x) { return x.offsetParent });
      var part = el.querySelector('.aq-spare-sheet__part.is-on'), d = draw(part, 1.3);
      if (d) { d.pause(); tl.add(d.play(), 0.1) }
      tl.from(el.querySelectorAll('.aq-spare-sheet__table thead th'), { y: 8, autoAlpha: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.2);
      tl.from(rows, { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.35);
      tl.from(el.querySelector('.aq-spare-sheet__tb'), { autoAlpha: 0, duration: 0.5, clearProps: 'opacity,visibility' }, 1.2);
      m.on(el, function () { tl.play() }, 'top 75%');
    });
  });
})();
