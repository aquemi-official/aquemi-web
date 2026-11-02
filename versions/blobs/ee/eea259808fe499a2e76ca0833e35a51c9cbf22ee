/* RecordSheet: the schedule is ruled, then each record's glyph is inked over its faint impression.
   Ported from Subframe Motion "Reed in one line" (signature-draw), MIT, (c) 2026 Subframe
   (kept: one stroke inked over a faint offset impression, 0.8 s, cubic-bezier(.37,.12,.28,1), the impression shown
   from the start, nothing under reduced motion; replaced: the heron with each record's glyph, its accent inked after
   the body, the replay button with pointing at a process, which re-inks that row's glyphs in 0.45 s).
   Entrance, once per row as it scrolls in: the name and the cells rise 8 px, the glyphs ink one
   after another (0.12 s apart). Under 2 s a row. */
AQmotion.fx('RecordSheet', function (root, m) {
  root.querySelectorAll('.aq-record-sheet').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var ink = window.CustomEase ? (CustomEase.get('aq-ink') || CustomEase.create('aq-ink', 'M0,0 C0.37,0.12 0.28,1 1,1')) : 'power2.inOut';
    var head = el.querySelector('.aq-record-sheet__cols'), tb = el.querySelector('.aq-record-sheet__tb');
    if (head) { gsap.set(head, { autoAlpha: 0 }); m.on(el, function () { m.tw(gsap.to(head, { autoAlpha: 1, duration: 0.5, clearProps: 'opacity,visibility' })) }, 'top 85%') }
    [].forEach.call(el.querySelectorAll('.aq-record-sheet__row'), function (row) {
      var name = row.querySelector('.aq-record-sheet__name'), txt = row.querySelectorAll('.aq-record-sheet__ctl p, .aq-record-sheet__recs li > span, .aq-record-sheet__no'),
        glyphs = [].slice.call(row.querySelectorAll('.aq-record-sheet__g'));
      var tl = m.tw(gsap.timeline({ paused: true }));
      if (name) tl.from(name, { y: 8, autoAlpha: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0);
      if (txt.length) tl.from(txt, { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.1);
      glyphs.forEach(function (g, j) {
        var a = g.querySelector('.aq-record-sheet__ink'), b = g.querySelector('.aq-record-sheet__acc'), at = 0.3 + j * 0.12;
        if (a) tl.fromTo(a, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: ink, clearProps: 'strokeDashoffset' }, at);
        if (b) tl.fromTo(b, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, ease: ink, clearProps: 'strokeDashoffset' }, at + 0.6);
      });
      m.on(row, function () { tl.play() }, 'top 88%');
      // pointing at a process re-inks its glyphs (visitor-driven: may repeat)
      var busy = false;
      row.addEventListener('mouseenter', function () {
        if (busy || tl.isActive() || tl.progress() < 1) return; busy = true;
        var paths = row.querySelectorAll('.aq-record-sheet__ink, .aq-record-sheet__acc');
        gsap.fromTo(paths, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, ease: ink, stagger: 0.06, clearProps: 'strokeDashoffset', onComplete: function () { busy = false } });
      });
    });
    if (tb) { gsap.set(tb, { autoAlpha: 0, y: 8 }); m.on(tb, function () { m.tw(gsap.to(tb, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity,visibility' })) }, 'top 95%') }
  });
});
