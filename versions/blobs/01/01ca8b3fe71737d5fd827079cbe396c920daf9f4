/* CalcPad: the working is written, then the answers boxed. On scroll-in the key line fades in, each line's work is
   uncovered left to right (clip-path, 0.6 s, 0.12 s apart) like a pen running along the squared lines, and its answer
   box draws in after it (scale from the left edge, 0.35 s). Once, under 2 s; nothing under reduced motion. The lit box
   (pointer or tap) is the renderer's and style.css's, so it works with motion off. */
AQmotion.fx('CalcPad', function (root, m) {
  root.querySelectorAll('.aq-calc-pad').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } }));
    tl.from(q('.aq-calc-pad__key'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0);
    q('.aq-calc-pad__line').forEach(function (l, i) {
      var t = 0.15 + i * 0.12;
      tl.fromTo(l.querySelector('.aq-calc-pad__work'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power1.inOut', clearProps: 'clipPath' }, t)
        .from(l.querySelector('.aq-calc-pad__no'), { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, t)
        .from(l.querySelector('.aq-calc-pad__ans'), { scaleX: 0, transformOrigin: '0 50%', autoAlpha: 0, duration: 0.35, clearProps: 'transform,opacity,visibility' }, t + 0.45);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
