/* StrikeGaps: row by row as they scroll in, the gap is set, then struck (the rule darkens through it),
   the requirement's arrow runs out and the fix is inserted word by word at the end of it. Once per row, about 1.6 s.
   Insertion ported from Subframe Motion "Animated sentence revision" (sentence-diff-motion), MIT, (c) 2026 Subframe */
AQmotion.fx('StrikeGaps', function (root, m) {
  root.querySelectorAll('.aq-strike-gaps').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el); var nar = m.narrow();
    var diff = window.CustomEase ? (CustomEase.get('aq-diff') || CustomEase.create('aq-diff', '.22,.72,.15,1')) : 'power3.out';
    [].forEach.call(el.querySelectorAll('.aq-strike-gaps__row'), function (r) {
      var tl = m.tw(gsap.timeline({ paused: true })), g = function (s) { return r.querySelector(s) };
      tl.from([g('.aq-index'), g('.aq-strike-gaps__was')], { y: 14, autoAlpha: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0);
      tl.fromTo(g('.aq-strike-gaps__wt'), { textDecorationColor: 'transparent' }, { textDecorationColor: getComputedStyle(r).getPropertyValue('--ink').trim() || 'currentColor', duration: 0.4, ease: 'power1.in', clearProps: 'textDecorationColor' }, 0.35);
      tl.from(g('.aq-strike-gaps__rt'), { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, 0.6);
      tl.from(g('.aq-strike-gaps__shaft'), nar ? { scaleY: 0, duration: 0.35, ease: 'power2.inOut', clearProps: 'transform' } : { scaleX: 0, duration: 0.45, ease: 'power2.inOut', clearProps: 'transform' }, 0.65);
      tl.from(g('.aq-strike-gaps__tip'), { autoAlpha: 0, duration: 0.15, clearProps: 'opacity,visibility' }, 1.0);
      // the fix is inserted the way sentence-diff inserts words: each rises 12 px into place, 260 ms, after a 60 ms lead
      var now = g('.aq-strike-gaps__now'), st = now && m.split(now, { type: 'words' });
      if (st && st.words.length) {
        tl.from(st.words, { y: 12, autoAlpha: 0, duration: 0.26, stagger: 0.035, ease: diff, clearProps: 'transform,opacity,visibility', onComplete: function () { st.revert() } }, 1.01);
      } else tl.from(now, { y: 12, autoAlpha: 0, duration: 0.4, ease: diff, clearProps: 'transform,opacity,visibility' }, 1.01);
      m.on(r, function () { tl.play() }, 'top 85%');
    });
  });
});
