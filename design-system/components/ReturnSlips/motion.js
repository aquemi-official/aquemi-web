/* ReturnSlips: each request goes in and its papers come back. Row by row, the hairline rule draws across, the situation
   rises, the pipe lays from it and the water runs to the arrow, then the returned slips are dealt out of the pipe one by
   one (sliding in from the left, a slight turn settling square). Rows follow one another; folded rows play when shown.
   One timeline, once on scroll-in, under 4 s; nothing under reduced motion. */
AQmotion.fx('ReturnSlips', function (root, m) {
  var CLEAR = 'transform,opacity,visibility';
  root.querySelectorAll('.aq-return-slips').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var rows = [].slice.call(el.querySelectorAll('.aq-return-slips__row')).filter(function (r) { return r.offsetParent !== null });
    if (!rows.length) return;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var cols = el.querySelector('.aq-return-slips__cols');
    if (cols) tl.fromTo(cols, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, clearProps: 'opacity,visibility' }, 0);
    rows.forEach(function (r, i) {
      var at = 0.1 + i * 0.5, have = r.querySelector('.aq-return-slips__have'), pipe = r.querySelector('.aq-return-slips__pipe'),
        slips = r.querySelectorAll('.aq-return-slips__slip');
      if (have) tl.fromTo(have, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, clearProps: CLEAR }, at);
      if (pipe) {
        tl.fromTo(pipe, { '--aq-pipe': 0 }, { '--aq-pipe': 1, duration: 0.35, ease: 'power2.inOut' }, at + 0.2);
        tl.fromTo(pipe, { '--aq-water': 0 }, { '--aq-water': 1, duration: 0.3, ease: 'none' }, at + 0.45);
      }
      if (slips.length) tl.fromTo(slips, { x: -32, rotation: -2.5, autoAlpha: 0 }, { x: 0, rotation: 0, autoAlpha: 1, duration: 0.55, stagger: 0.09, clearProps: CLEAR }, at + 0.6);
    });
    var total = tl.duration(); if (total > 4) tl.timeScale(total / 4);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
