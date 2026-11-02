/* ReaderSplit: the two halves meet across the seam. Row by row the reader slides in from the left, the node strikes on the seam, the tie shoots across
   and the reading arrives from the right. One timeline, once on scroll-in, under 3.5 s. Folded rows are left alone. */
AQmotion.fx('ReaderSplit', function (root, m) {
  root.querySelectorAll('.aq-reader-split-sec').forEach(function (sec) {
    var el = sec.querySelector('.aq-reader-split__rows'); if (!el || !m.free(el)) return; m.claim(el);
    var nar = m.narrow(), tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var rows = [].filter.call(el.querySelectorAll('.aq-reader-split__row'), function (r) { return r.offsetParent !== null });
    rows.forEach(function (r, i) {
      var at = 0.1 + i * 0.22;
      tl.from(r.querySelector('.aq-reader-split__who'), { x: -40, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, at);
      if (!nar) {
        tl.from(r.querySelector('.aq-reader-split__node'), { scale: 0, rotation: 45, duration: 0.4, ease: 'back.out(2.5)', clearProps: 'transform' }, at + 0.25);
        tl.fromTo(r.querySelector('.aq-reader-split__tie'), { clipPath: 'inset(0 50% 0 50%)' }, { clipPath: 'inset(0 0% 0 0%)', duration: 0.4, clearProps: 'clipPath' }, at + 0.3);
      }
      tl.from(r.querySelector('.aq-reader-split__what'), { x: nar ? 0 : 40, y: nar ? 12 : 0, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, at + 0.3);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
