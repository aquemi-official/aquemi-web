/* ReleaseRun: the line is laid across the columns, then the water runs along it; as it reaches each step the node
   seats, the numeral rises out of its column filling from outline to solid, and the words follow. At the end the navy
   column closes up from the bottom under the arriving water. One timeline, once on scroll-in, under 4 s.
   Phones: the line and water draw down the rail, and each step rises on its own trigger as it comes into view. */
AQmotion.fx('ReleaseRun', function (root, m) {
  root.querySelectorAll('.aq-release-run').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var nar = m.narrow(), tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var cols = [].slice.call(el.querySelectorAll('.aq-release-run__col')), k = cols.length || 1, run = 2.2;
    tl.from(el.querySelector('.aq-release-run__line'), nar ? { scaleY: 0, duration: 0.8, ease: 'power2.inOut', clearProps: 'transform' } : { scaleX: 0, duration: 0.8, ease: 'power2.inOut', clearProps: 'transform' }, 0);
    if (nar) {   /* phones (pass 12 verify): each step rises as it comes into view; the end card keeps its navy from the start */
      tl.from(el.querySelector('.aq-release-run__water'), { scaleY: 0, duration: 1.2, ease: 'none', clearProps: 'transform' }, 0.3);
      cols.forEach(function (c) { var t = m.tw(gsap.timeline({ paused: true }));
        t.from(c.querySelectorAll('.aq-release-run__node, .aq-release-run__n, .aq-release-run__t, .aq-release-run__d'), { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
        m.on(c, function () { t.play() }, 'top 96%') });
      m.on(el, function () { tl.play() }, 'top 75%'); return;
    }
    tl.from(el.querySelector('.aq-release-run__water'), { scaleX: 0, duration: run, ease: 'none', clearProps: 'transform' }, 0.5);
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
