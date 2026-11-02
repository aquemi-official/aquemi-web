/* ReviewReticles: the sheet is drawn up, then read. The frames and zone marks fade in, the register rows rise one by
   one (number and code, then the name, then the line); on the viewer the brackets close in from wide, the first
   drawing prints up, a scan line sweeps the window once and the title block lands. One timeline, once, about 2 s.
   Phones: per row as it scrolls in, its small viewfinder's brackets close, its drawing prints, the text rises.
   Visitor-driven (in the renderer, so it also works under reduced motion): pointing at, focusing or clicking a row
   slides the viewfinder's reel to its drawing.
   Reel ported from Subframe Motion "Hover image preview list" (project-index), MIT, (c) 2026 Subframe */
AQmotion.fx('ReviewReticles', function (root, m) {
  root.querySelectorAll('.aq-review-reticles').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (c, s) { return [].slice.call(c.querySelectorAll(s)) };
    function frame(tl, vf, at, d) {
      [['--tl', -1, -1], ['--tr', 1, -1], ['--bl', -1, 1], ['--br', 1, 1]].forEach(function (b) {
        tl.from(vf.querySelector('.aq-review-reticles__br' + b[0]), { x: b[1] * d, y: b[2] * d, autoAlpha: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at) });
      var sc = vf.querySelector('.aq-review-reticles__scan');
      tl.fromTo(sc, { top: '0%', opacity: 1 }, { top: '100%', duration: 0.9, ease: 'power1.inOut' }, at + 0.2);
      tl.to(sc, { opacity: 0, duration: 0.2, clearProps: 'top,opacity' }, at + 1.1);
    }
    if (m.narrow()) {
      q(el, '.aq-review-reticles__item').forEach(function (it) {
        var tl = m.tw(gsap.timeline({ paused: true })), vf = it.querySelector('.aq-review-reticles__mini');
        if (vf) { frame(tl, vf, 0, 10); tl.from(vf.querySelector('.aq-review-reticles__pic'), { clipPath: 'inset(100% 0 0 0)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clipPath' }, 0.15) }
        tl.from(q(it, '.aq-review-reticles__no2, .aq-review-reticles__code, .aq-review-reticles__t, .aq-review-reticles__d'), { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.3);
        m.on(it, function () { tl.play() }, 'top 85%');
      });
      return;
    }
    var tl = m.tw(gsap.timeline({ paused: true })), rows = q(el, '.aq-review-reticles__item'), big = el.querySelector('.aq-review-reticles__big');
    tl.from(q(el, '.aq-review-reticles__z'), { autoAlpha: 0, duration: 0.5, stagger: 0.05, clearProps: 'opacity,visibility' }, 0);
    rows.forEach(function (r, i) {
      var at = 0.15 + i * 0.12;
      tl.from(q(r, '.aq-review-reticles__no2, .aq-review-reticles__code'), { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, at);
      tl.from(q(r, '.aq-review-reticles__t, .aq-review-reticles__d'), { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at + 0.05);
    });
    if (big) {
      frame(tl, big, 0.3, 24);
      tl.from(big.querySelector('.aq-review-reticles__win'), { clipPath: 'inset(100% 0 0 0)', duration: 0.9, ease: 'power3.inOut', clearProps: 'clipPath' }, 0.5);
      tl.from(q(el, '.aq-review-reticles__tb span, .aq-review-reticles__no'), { autoAlpha: 0, duration: 0.3, stagger: 0.06, clearProps: 'opacity,visibility' }, 1.2);
    }
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
