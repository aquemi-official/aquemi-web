/* BinderTabs: the binder is filled and signed in order. The cover swings open (it unfolds from the spine, scaleX), the
   rings close over the stack, then each divider drops onto the rings in turn, its tab sliding out from under the stack;
   the divider's sign-off writes itself before the next divider is filed, so the stages read as a sequence of
   signatures. One timeline on scroll-in, under 5 s. Phones: each divider is filed and signed as it scrolls in.
   Hover or focus pulls a divider's tab out (CSS). */
AQmotion.fx('BinderTabs', function (root, m) {
  var D = window.DrawSVGPlugin;
  [].forEach.call(root.querySelectorAll('.aq-binder-tabs'), function (el) {
    var cover = el.querySelector('.aq-binder-tabs__cover'), stack = el.querySelector('.aq-binder-tabs__stack'); if (!stack) return;
    m.claim(stack); m.claim(cover);
    var divs = [].slice.call(el.querySelectorAll('.aq-binder-tabs__div')), rings = el.querySelectorAll('.aq-binder-tabs__rings i');
    function file(tl, d, at) {
      var tab = d.querySelector('.aq-binder-tabs__tab'), sig = d.querySelector('.aq-binder-tabs__sign path');
      tl.fromTo(d, { y: -16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at);
      if (tab) tl.fromTo(tab, { xPercent: -100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at + 0.15);
      if (sig && D) tl.fromTo(sig, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: 'power1.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, at + 0.3);
    }
    if (m.narrow()) {
      divs.forEach(function (d) { var t = gsap.timeline({ paused: true }); m.tw(t); file(t, d, 0); m.on(d, function () { t.play() }, 'top 90%') });
      return;
    }
    var tl = gsap.timeline({ paused: true }); m.tw(tl);
    if (cover) tl.fromTo(cover, { scaleX: 0.2, transformOrigin: '100% 50%', autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.7, ease: 'power3.inOut', clearProps: 'transform,opacity,visibility' }, 0);
    if (rings.length) tl.fromTo(rings, { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out', clearProps: 'transform' }, 0.5);
    divs.forEach(function (d, i) { file(tl, d, 0.8 + i * 0.5) });
    m.on(stack, function () { tl.play() }, 'top 75%');
  });
});
