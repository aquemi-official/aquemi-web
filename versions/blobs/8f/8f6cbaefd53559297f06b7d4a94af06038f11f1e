/* NoteSheet: the sheet is printed, the register is written, then the leader joins them. The paper prints from the top
   down (its drawing plays IsoKit's own draw-on: the tank, then the loop with its water), its lines rise in; the topic
   line drops in; each visible row wipes in left to right; then the leader draws out of row 01 into the sheet (down from
   the card on phones) and one light runs along it to the sheet: Ported from Subframe Motion "Animated beam connections"
   (animated-beam), MIT, (c) 2026 Subframe (a short highlight travels a measured connector to its target with a strong
   ease-out; here once, not looping, so the reveal settles). Once, about 2.8 s. Reduced motion: the finished state. */
AQmotion.fx('NoteSheet', function (root, m) {
  root.querySelectorAll('.aq-note-sheet').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) }, P = '.aq-note-sheet__';
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var paper = el.querySelector(P + 'paper');
    if (paper) tl.fromTo(paper, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clipPath' }, 0);
    var words = q(P + 'sk, ' + P + 'q, ' + P + 'st, ' + P + 'go, ' + P + 'std');
    if (words.length) tl.from(words, { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, 0.55);
    tl.from(q(P + 'tab'), { y: -8, autoAlpha: 0, duration: 0.35, stagger: 0.05, clearProps: 'transform,opacity,visibility' }, 0.3);
    var rows = q(P + 'row').filter(function (r) { return r.offsetParent !== null });
    rows.forEach(function (r, i) {
      tl.fromTo(r, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.inOut', clearProps: 'clipPath' }, 0.5 + i * 0.1);
    });
    var ld = el.querySelector(P + 'ld'), lit = ld && ld.querySelector('i');
    if (ld && ld.offsetParent !== null) {
      var down = ld.offsetWidth < 2, at = 0.6 + rows.length * 0.1 + 0.2;
      tl.fromTo(ld, down ? { scaleY: 0 } : { scaleX: 0 }, { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'power2.inOut', clearProps: 'transform' }, at);
      if (lit) tl.fromTo(lit, down ? { top: '100%', display: 'block', autoAlpha: 1 } : { left: '100%', display: 'block', autoAlpha: 1 },
        down ? { top: '-40%', duration: 0.9, ease: 'expo.out' } : { left: '-40%', duration: 0.9, ease: 'expo.out' }, at + 0.45)
        .to(lit, { autoAlpha: 0, duration: 0.25, clearProps: 'top,left,opacity,visibility,display' }, at + 1.2);
    }
    m.on(el, function () { tl.play() }, 'top 78%');
  });
});
