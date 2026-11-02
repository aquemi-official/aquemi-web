/* GradeMains: the mains are laid first (each twin-wall pipe runs out from the left, the dashed one last), the steps set
   in across the top, then every column drops its line down to its main and the valves seat with a small overshoot,
   column by column. Last, the water runs along each supplied main once, and the grades and notes read in under the
   columns. One timeline, once on scroll-in, under 4.5 s. Folded columns (phones) are left alone. */
AQmotion.fx('GradeMains', function (root, m) {
  root.querySelectorAll('.aq-grade-mains').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var vis = function (s) { return [].filter.call(el.querySelectorAll(s), function (x) { return x.offsetParent !== null || getComputedStyle(x).position === 'fixed' }) };
    var nar = m.narrow(), tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var pipes = vis('.aq-grade-mains__pipe');
    tl.from(vis('.aq-grade-mains__lname'), { x: nar ? 0 : -16, y: nar ? 10 : 0, autoAlpha: 0, duration: 0.5, stagger: 0.1, clearProps: 'transform,opacity,visibility' }, 0);
    tl.from(pipes, nar ? { scaleY: 0, duration: 1, stagger: 0.12, ease: 'power2.inOut', clearProps: 'transform' } : { scaleX: 0, duration: 1, stagger: 0.12, ease: 'power2.inOut', clearProps: 'transform' }, 0.05);
    var forms = [].filter.call(el.querySelectorAll('.aq-grade-mains__form'), function (f) { var h = f.querySelector('.aq-grade-mains__head'); return h && h.offsetParent !== null });
    forms.forEach(function (f, i) {
      var at = 0.5 + i * (nar ? 0.12 : 0.09);
      tl.from(f.querySelector('.aq-grade-mains__head'), { y: 14, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, at);
      tl.from(f.querySelector('.aq-grade-mains__drop'), nar ? { scaleX: 0, duration: 0.5, ease: 'power2.inOut', clearProps: 'transform' } : { scaleY: 0, duration: 0.55, ease: 'power2.inOut', clearProps: 'transform' }, at + 0.2);
      tl.from(f.querySelectorAll('.aq-grade-mains__tap svg'), { scale: 0, duration: 0.45, stagger: 0.08, ease: 'back.out(2.2)', clearProps: 'transform' }, at + 0.55);
      tl.from(f.querySelector('.aq-grade-mains__foot'), { y: 10, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, at + 0.7);
    });
    tl.from(vis('.aq-grade-mains__water'), nar ? { scaleY: 0, duration: 1.2, stagger: 0.1, ease: 'power1.inOut', clearProps: 'transform' } : { scaleX: 0, duration: 1.2, stagger: 0.1, ease: 'power1.inOut', clearProps: 'transform' }, 1.4);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
