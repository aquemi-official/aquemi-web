/* IndexSheet: the sheet opens. Its leaf arrives folded over the index (its blank back up) and swings open on its
   crease; the index rules itself in, row by row down both columns, numbers and entries rising after their rule; then
   the drawing on the opened leaf draws itself (IsoKit: base frame and posts back to front, rails, the spool) and the
   water runs the spool once. One timeline, once, under 4.5 s. Where the leaf sits over the grid (narrow widths) it does
   not fold; the rules and the drawing play the same.
   Ported from Subframe Motion "Paper unfold reveal" (paper-fold), MIT, (c) 2026 Subframe: the wing hinges on its
   inner edge from rotateY(-180deg) to 0 in 720 ms, cubic-bezier(.25,.75,.2,1), its back a blank face of the same
   paper with backface-visibility hidden, the sheet settling from a slight turn as it opens. */
AQmotion.fx('IndexSheet', function (root, m) {
  if (window.CustomEase && !CustomEase.get('aq-unfold')) CustomEase.create('aq-unfold', 'M0,0 C0.25,0.75 0.2,1 1,1');
  root.querySelectorAll('.aq-index-sheet').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var sheet = el.querySelector('.aq-index-sheet__sheet'), wing = el.querySelector('.aq-index-sheet__wing'), svg = el.querySelector('.aq-index-sheet__svg');
    var cells = q('.aq-index-sheet__cell').filter(function (c) { return c.offsetHeight > 0 });
    var side = wing && getComputedStyle(wing).order !== '-1';
    var tl = window.AQiso && svg ? AQiso.timeline(svg, m, { at: side ? 1 : 0.3, draw: 1.3, pipe: 0.6, flow: 1.3, stagger: 0.05 }) : null;
    if (!tl) tl = m.tw(gsap.timeline({ paused: true }));
    var ease = window.CustomEase ? 'aq-unfold' : 'power3.out';
    if (sheet) tl.from(sheet, { y: 24, rotation: -0.6, duration: 0.8, ease: 'power3.out', clearProps: 'transform' }, 0);
    if (wing && side) tl.fromTo(wing, { rotationY: -180, transformPerspective: 2400 }, { rotationY: 0, duration: 0.72, ease: ease, clearProps: 'transform' }, 0.4);
    var strip = el.querySelector('.aq-index-sheet__strip');
    if (strip) tl.from(strip, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0);
    cells.forEach(function (c, i) {
      var t = 0.35 + Math.floor(i / 2) * 0.12 + (i % 2) * 0.06, rule = c.querySelector('.aq-index-sheet__rule'), rest = c.querySelectorAll('.aq-index-sheet__n, .aq-index-sheet__body');
      if (rule) tl.from(rule, { scaleX: 0, duration: 0.5, ease: 'power2.inOut', clearProps: 'transform' }, t);
      tl.from(rest, { y: 10, autoAlpha: 0, duration: 0.45, ease: 'power3.out', stagger: 0.06, clearProps: 'transform,opacity,visibility' }, t + 0.15);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
