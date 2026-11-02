/* ResponseClock: the dial is drawn (case, face, the minute ticks running round), then the hand sweeps once from
   twelve through every station: each station strikes as the hand reaches it and its step rises in the list; at the
   step that starts the clock the running arc appears. The hand comes to rest on that station. One timeline, once,
   about 3.5 s. Phones: the same, the list rows rising as the hand passes. Hover turns the hand (CSS transition). */
AQmotion.fx('ResponseClock', function (root, m) {
  root.querySelectorAll('.aq-response-clock').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) }, hand = el.querySelector('.aq-response-clock__hand');
    var st = q('.aq-response-clock__st'), steps = q('.aq-response-clock__step'), run = el.querySelector('.aq-response-clock__run');
    var rest = hand.style.getPropertyValue('--a') || '0deg', tl = m.tw(gsap.timeline({ paused: true }));
    var D = window.DrawSVGPlugin;
    if (D) { q('.aq-response-clock__case, .aq-response-clock__face').forEach(function (c) { c.setAttribute('vector-effect', 'non-scaling-stroke') });
      tl.fromTo(q('.aq-response-clock__case'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0) }
    tl.from(q('.aq-response-clock__face, .aq-response-clock__crown, .aq-response-clock__btn, .aq-response-clock__track'), { autoAlpha: 0, duration: 0.5, clearProps: 'opacity,visibility' }, 0.2);
    tl.from(q('.aq-response-clock__ticks'), { rotation: -90, svgOrigin: '200 210', autoAlpha: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.2);
    gsap.set(st, { autoAlpha: 0 }); gsap.set(steps, { autoAlpha: 0, y: 14 }); if (run) gsap.set(run, { autoAlpha: 0 });
    hand.style.transition = 'none';
    tl.set(hand, { '--a': '0deg' }, 0);
    tl.from(hand, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, 0.6);
    var t = 0.9, per = 0.42;
    steps.forEach(function (s, i) {
      var a = +s.getAttribute('data-a') || 0, at = t + (i ? per : 0.15);
      tl.to(hand, { '--a': a + 'deg', duration: i ? per : 0.15, ease: 'power1.inOut' }, t);
      tl.to(st[i], { autoAlpha: 1, duration: 0.2, clearProps: 'opacity,visibility' }, at - 0.05);
      tl.from(st[i] && st[i].querySelector('circle'), { scale: 1.7, transformOrigin: '50% 50%', duration: 0.35, ease: 'back.out(2)', clearProps: 'transform' }, at - 0.05);
      tl.to(s, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at - 0.05);
      if (run && s.classList.contains('is-start')) tl.to(run, { autoAlpha: 1, duration: 0.6, clearProps: 'opacity,visibility' }, at);
      t = at;
    });
    tl.to(hand, { '--a': rest, duration: 0.6, ease: 'power2.inOut' }, t + 0.3);
    tl.call(function () { hand.style.transition = '' }, null, t + 0.95);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
