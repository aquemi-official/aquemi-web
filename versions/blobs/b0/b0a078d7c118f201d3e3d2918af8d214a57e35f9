/* RecordTrail: the rail runs station to station and each station drops its record sheet when the rail arrives.
   Ported from Subframe Motion "Causal cadence" (causal-cadence), MIT, (c) 2026 Subframe
   (kept: a second action cued from the arrival of the first, not from its start: the travel is a cubic ease-out and the
   follower starts after the travel completes plus a fixed offset; reduced motion shows the final pose at once;
   replaced: the white point crossing a strip with the rail drawing from node to node, the caption with the record
   sheet dropping 16 px on its cord, the play button with the trail scrolling into view).
   Desktop, once, when the trail is a quarter in view: per station 0.3 s apart, the node pops in flow, its name and
   text rise 8 px, the rail draws to the next node (0.3 s, power3.out), the sheet drops 0.12 s after the node lands;
   the turns fade in with the row end; the stack takes the last sheet and its count. Until its
   station plays, a cord and its clip stay hidden (is-pending / is-run), so no bare cords show ahead of the rail. Under 3.6 s for eight stations.
   Phones: each station plays on its own as it scrolls in (the trail is long); folded stations are left as rendered.
   Pointing at a station lights its node and cord (CSS). */
AQmotion.fx('RecordTrail', function (root, m) {
  root.querySelectorAll('.aq-record-trail').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var narrow = m.narrow(), gap = 0.3;
    var sts = [].filter.call(el.querySelectorAll('.aq-record-trail__st'), function (li) { return li.offsetParent !== null });
    var stack = el.querySelector('.aq-record-trail__stack'), key = el.querySelector('.aq-record-trail__key');
    function station(tl, li, t) {
      var q = function (s) { return li.querySelector(s) };
      var node = q('.aq-record-trail__node'), rail = q('.aq-record-trail__rail'), hang = q('.aq-record-trail__hang'), sheet = q('.aq-record-trail__sheet'),
        turn = q('.aq-record-trail__turn'), end = q('.aq-record-trail__end');
      tl.call(function () { li.classList.add('is-lit') }, null, t);
      tl.call(function () { li.classList.add('is-run') }, null, t + 0.1);
      tl.from(node, { scale: 0.2, autoAlpha: 0, duration: 0.25, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, t);
      if (hang) tl.from(hang.children, { y: 8, autoAlpha: 0, duration: 0.4, ease: 'power3.out', stagger: 0.06, clearProps: 'transform,opacity,visibility' }, t + 0.04);
      if (sheet) tl.from(sheet, { y: -16, autoAlpha: 0, duration: 0.45, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, t + 0.25 + 0.12);
      if (rail && getComputedStyle(rail).display !== 'none') tl.from(rail, narrow ? { scaleY: 0, duration: 0.3, ease: 'power3.out', clearProps: 'transform' } : { scaleX: 0, duration: 0.3, ease: 'power3.out', clearProps: 'transform' }, t + 0.1);
      if (turn && !narrow) tl.from(turn, { autoAlpha: 0, duration: 0.35, ease: 'power1.out', clearProps: 'opacity,visibility' }, t + 0.25);
      if (end) tl.from(end, { autoAlpha: 0, duration: 0.35, ease: 'power1.out', clearProps: 'opacity,visibility' }, t + 0.2);
      tl.call(function () { li.classList.remove('is-lit') }, null, t + 0.6);
    }
    function pile(tl, t) {
      if (!stack || stack.offsetParent === null) return;
      var ps = stack.querySelectorAll('.aq-record-trail__ps, .aq-record-trail__pr'), c = stack.querySelector('.aq-record-trail__count');
      tl.from(ps, { y: -10, autoAlpha: 0, duration: 0.35, ease: 'power3.out', stagger: 0.06, clearProps: 'transform,opacity,visibility' }, t);
      if (c) tl.from(c, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, t + 0.3);
    }
    if (key) { var kt = m.tw(gsap.timeline({ paused: true })); kt.from(key.children, { y: 8, autoAlpha: 0, duration: 0.4, ease: 'power3.out', stagger: 0.08, clearProps: 'transform,opacity,visibility' }); m.on(key, function () { kt.play() }, 'top 88%') }
    if (!narrow) {
      el.classList.add('is-pending');
      var tl = m.tw(gsap.timeline({ paused: true }));
      sts.forEach(function (li, i) { station(tl, li, i * gap) });
      pile(tl, sts.length * gap + 0.25);
      tl.call(function () { el.classList.remove('is-pending') });
      m.on(el.querySelector('.aq-record-trail__run') || el, function () { tl.play() }, 'top 75%');
    } else {
      sts.forEach(function (li) { var t1 = m.tw(gsap.timeline({ paused: true })); station(t1, li, 0); if (li.classList.contains('is-last')) pile(t1, 0.5); m.on(li, function () { t1.play() }, 'top 85%') });
    }
  });
});
