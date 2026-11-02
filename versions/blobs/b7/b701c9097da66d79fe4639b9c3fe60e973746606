/* GradeSwitch: the plate is screwed down (the screws turn a quarter), the strips wipe in one by one, and on each strip
   the knob travels from the first slot to the minimum grade and settles home (aq-settle, no bounce); slots your
   specification may call for then trace in, dashed. One timeline, once on scroll-in, under 3.5 s. */
AQmotion.fx('GradeSwitch', function (root, m) {
  root.querySelectorAll('.aq-grade-switch').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tl.from(el.querySelectorAll('.aq-grade-switch__screw'), { rotation: -90, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0);
    el.querySelectorAll('.aq-grade-switch__row').forEach(function (r, i) {
      var at = 0.2 + i * 0.3, sw = r.querySelector('.aq-grade-switch__sw'), k = sw ? +getComputedStyle(sw).getPropertyValue('--k') || 0 : 0, knob = r.querySelector('.aq-grade-switch__knob');
      tl.fromTo(r, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.inOut', clearProps: 'clipPath' }, at);
      if (knob) {
        if (k > 0) tl.from(knob, { xPercent: -100 * k, duration: 0.7, ease: 'aq-settle', clearProps: 'transform' }, at + 0.45);
        else tl.from(knob, { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at + 0.45);
      }
      var alt = r.querySelectorAll('.aq-grade-switch__slot.is-alt');
      if (alt.length) tl.from(alt, { autoAlpha: 0, scale: 0.9, duration: 0.4, clearProps: 'transform,opacity,visibility' }, at + 0.9);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
