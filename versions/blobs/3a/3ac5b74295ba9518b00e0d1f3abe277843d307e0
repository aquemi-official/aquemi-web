/* RevisionSheet: the sheet is laid down (rises and turns to its angle, the backing sheet after it), then the steps
   rule in down the list. On desktop the marks then follow the scroll (look script). On phones the strip's sheet
   follows the step being read (PhoneKit; without it, the sheet plays its marks through once, a step every 0.6 s). One timeline, once, under 4 s. */
AQmotion.fx('RevisionSheet', function (root, m) {
  root.querySelectorAll('.aq-revision-sheet').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var paper = el.querySelector('.aq-revision-sheet__paperwrap'), steps = [].slice.call(el.querySelectorAll('.aq-revision-sheet__step')),
      n = +el.getAttribute('data-n') || steps.length, R = window.AQrevsheet;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (paper) tl.from(paper, { y: 60, rotation: -5, autoAlpha: 0, duration: 0.9, ease: 'power4.out', clearProps: 'transform,opacity,visibility' }, 0);
    tl.from(steps, { clipPath: 'inset(0 100% 0 0)', duration: 0.6, ease: 'power2.inOut', stagger: 0.08, clearProps: 'clipPath' }, 0.15);
    /* phones with PhoneKit's strip: the scroll drives the marks, so no play-through */
    if (m.narrow() && R && !el.hasAttribute('data-pk-on')) {
      el._rsAuto = 1; R.set(el, 0);
      for (var k = 1; k <= n; k++) (function (k) { tl.call(function () { R.set(el, k) }, null, 0.6 + k * 0.6) })(k);
      tl.call(function () { el._rsAuto = 0; R.set(el, n) }, null, 0.8 + n * 0.6);
    }
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
