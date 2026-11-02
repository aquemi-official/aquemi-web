/* CertReadout: the instrument powers up, then reads each certificate once.
   Ported from Subframe Motion "Quote tick" (quote-tick), MIT, (c) 2026 Subframe
   (kept: each new reading enters 8 px from the side of travel in 220 ms ease-out and keeps a tint for 800 ms, the
   previous value replaced in place, nothing moves under reduced motion; replaced: the price feed with the visitor's
   pointer or focus on a line, the green/red flash with flow-tint, the delta row with the scale marker that glides along
   the side ruler. The reading itself is CSS in style.css and the selection is the look's own handler, so it works
   without GSAP).
   Entrance, once: the rulers wipe on from their zero ends, the giant reading rises 16 px, the lines follow 0.08 s
   apart with their top rule drawn; then a single tour reads lines 2 to the last and returns to the first (0.7 s a
   reading, about 3 s), skipped as soon as the visitor points at or focuses a line. */
AQmotion.fx('CertReadout', function (root, m) {
  root.querySelectorAll('.aq-cert-readout').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var box = el.querySelector('.aq-cert-readout__box'), rules = el.querySelectorAll('.aq-cert-readout__rule'), face = el.querySelector('.aq-cert-readout__face'),
      bits = el.querySelectorAll('.aq-cert-readout__no, .aq-cert-readout__mark'), lines = el.querySelectorAll('.aq-cert-readout__line');
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (box) tl.from(box, { autoAlpha: 0, duration: 0.6, clearProps: 'opacity,visibility' }, 0);
    if (rules.length) tl.fromTo(rules, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power2.inOut', stagger: 0.1, clearProps: 'clipPath' }, 0.15);
    if (face) tl.from(face, { y: 16, autoAlpha: 0, duration: 0.7, clearProps: 'transform,opacity,visibility' }, 0.35);
    if (bits.length) tl.from(bits, { autoAlpha: 0, duration: 0.4, stagger: 0.1, clearProps: 'opacity,visibility' }, 0.6);
    if (lines.length) tl.from(lines, { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 0.3);
    var n = lines.length, R = window.AQcertReadout;
    if (R && n > 1) {
      for (var k = 1; k <= n; k++) (function (k) {
        tl.call(function () { if (!el.hasAttribute('data-touched')) R.select(el, k % n) }, null, 1.4 + (k - 1) * 0.7);
      })(k);
    }
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
