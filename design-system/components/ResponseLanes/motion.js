/* ResponseLanes: the clock starts. Lane by lane, the start mark sets, the line draws out to the right and each stop's
   node lands as the line reaches it, its clock rising beneath. Severity 1 draws fastest and the rest a little slower in
   order, so urgency reads from the pace, calmly; a single drop of water then runs severity 1's lane once and fades.
   Numerals rise out of their slot. One timeline, once on scroll-in, under 4.5 s; nothing under reduced motion. */
AQmotion.fx('ResponseLanes', function (root, m) {
  var CLEAR = 'transform,opacity,visibility';
  root.querySelectorAll('.aq-response-lanes').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var rows = [].slice.call(el.querySelectorAll('.aq-response-lanes__row')), phone = m.narrow();
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var head = el.querySelector('.aq-response-lanes__head');
    if (head && !phone) tl.fromTo(head, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, clearProps: 'opacity,visibility' }, 0);
    rows.forEach(function (r, i) {
      var sev = +(r.getAttribute('data-sev') || 0), at = 0.15 + i * 0.32, dur = sev ? 0.45 + 0.2 * (sev - 1) : 0.9;
      var num = r.querySelector('.aq-response-lanes__num'), t = r.querySelector('.aq-response-lanes__t'),
        line = r.querySelector('.aq-response-lanes__line'), start = r.querySelector('.aq-response-lanes__start'),
        stops = [].slice.call(r.querySelectorAll('.aq-response-lanes__stops > li'));
      if (num) tl.fromTo(num, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: 'power4.out', clearProps: CLEAR }, at);
      if (t) tl.fromTo(t, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, clearProps: CLEAR }, at + 0.05);
      if (start) tl.fromTo(start, { scale: 0 }, { scale: 1, duration: 0.25, ease: 'back.out(3)', clearProps: 'transform' }, at + 0.1);
      if (line) tl.fromTo(line, { '--aq-line': 0 }, { '--aq-line': 1, duration: dur, ease: 'power1.inOut' }, at + 0.15);
      stops.forEach(function (s, k) {
        var a2 = at + 0.15 + dur * (k + 1) / (stops.length + 0.5), node = s.querySelector('.aq-response-lanes__node'), v = s.querySelector('.aq-response-lanes__v');
        if (node) tl.fromTo(node, { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(3)', clearProps: 'transform' }, a2);
        if (v) tl.fromTo(v, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, clearProps: CLEAR }, a2 + 0.05);
      });
      if (sev === 1 && line && !phone) {
        var drop = line.querySelector('i');
        if (drop) {
          tl.fromTo(drop, { x: 0, opacity: 1 }, { x: function () { return line.offsetWidth - drop.offsetWidth }, duration: 1.1, ease: 'power1.inOut', immediateRender: false }, at + 0.15 + dur);
          tl.to(drop, { opacity: 0, duration: 0.25, clearProps: 'transform,opacity' }, '>-0.1');
        }
      }
    });
    var total = tl.duration(); if (total > 4.5) tl.timeScale(total / 4.5);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
