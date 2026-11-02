/* NumeralIndex: the index is ruled and set like type. Each rule draws across from the left, the outline numeral rolls up
   out of its slot as its digits decode, the situation and its need rise in, and the go-cell wipes open from the left.
   Rows follow one another down the index. One timeline, once on scroll-in, under 4 s; nothing under reduced motion. */
AQmotion.fx('NumeralIndex', function (root, m) {
  root.querySelectorAll('.aq-numeral-index').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var rows = [].slice.call(el.querySelectorAll('.aq-numeral-index__row'));
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    rows.forEach(function (r, i) {
      var at = i * 0.22, n = r.querySelector('.aq-numeral-index__n > span');
      tl.from(r.querySelector('.aq-numeral-index__rule'), { scaleX: 0, duration: 0.9, ease: 'power2.inOut', clearProps: 'transform' }, at);
      if (n) {
        tl.from(n, { yPercent: 100, duration: 0.9, ease: 'power4.out', clearProps: 'transform' }, at + 0.15);
        if (window.ScrambleTextPlugin) tl.to(n, { duration: 0.6, scrambleText: { text: n.textContent, chars: '0123456789', speed: 0.6 }, ease: 'none' }, at + 0.15);
      }
      tl.from(r.querySelectorAll('.aq-numeral-index__t, .aq-numeral-index__need'), { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, at + 0.25);
      tl.fromTo(r.querySelector('.aq-numeral-index__go'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.inOut', clearProps: 'clipPath' }, at + 0.35);
    });
    m.on(el, function () { tl.play() }, 'top 80%');
  });
});
