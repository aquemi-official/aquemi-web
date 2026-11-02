/* ReleaseRun: the line is laid across the columns, then the water runs along it; as it reaches each step the node
   seats, the numeral rises out of its column filling from outline to solid, and the words follow. At the end the navy
   column closes up from the bottom under the arriving water. One timeline, once on scroll-in, under 4 s. */
AQmotion.fx('ReleaseRun', function (root, m) {
  root.querySelectorAll('.aq-release-run').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var nar = m.narrow(), tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var cols = [].slice.call(el.querySelectorAll('.aq-release-run__col')), k = cols.length || 1, run = 2.2;
    tl.from(el.querySelector('.aq-release-run__line'), nar ? { scaleY: 0, duration: 0.8, ease: 'power2.inOut', clearProps: 'transform' } : { scaleX: 0, duration: 0.8, ease: 'power2.inOut', clearProps: 'transform' }, 0);
    tl.from(el.querySelector('.aq-release-run__water'), nar ? { scaleY: 0, duration: run, ease: 'none', clearProps: 'transform' } : { scaleX: 0, duration: run, ease: 'none', clearProps: 'transform' }, 0.5);
    cols.forEach(function (c, i) {
      var at = 0.5 + run * i / k, n = c.querySelector('.aq-release-run__n'), col = n ? getComputedStyle(n).color : '';
      if (c.classList.contains('is-end')) tl.fromTo(c, { backgroundColor: 'rgba(0,0,0,0)' }, { backgroundColor: getComputedStyle(c).backgroundColor, duration: 0.6, ease: 'power2.out', clearProps: 'backgroundColor' }, at - 0.1);
      tl.from(c.querySelector('.aq-release-run__node'), { scale: 0, duration: 0.4, ease: 'back.out(2.5)', clearProps: 'transform' }, at);
      if (n) tl.fromTo(n, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, clearProps: 'transform,opacity,visibility' }, at + 0.05);
      tl.from(c.querySelectorAll('.aq-release-run__t, .aq-release-run__d'), { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, at + 0.25);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
