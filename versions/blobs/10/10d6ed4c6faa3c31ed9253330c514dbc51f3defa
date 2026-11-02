/* VisitPlan: the plant is drawn and the water runs it once (IsoKit's choreography), then the technician walks the
   route: a dot travels the dashed walk from the first stop to the sign-off, each stop's ring fills as it arrives (its
   parts light for a moment) and its card prints under the sheet. One timeline, once, under 5 s. Phones: each stop's
   row rises as it scrolls in, its small drawing printing up. Hover and focus lighting is in the look. */
AQmotion.fx('VisitPlan', function (root, m) {
  root.querySelectorAll('.aq-visit-plan').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var cards = [].slice.call(el.querySelectorAll('.aq-visit-plan__stop'));
    if (m.narrow()) {
      cards.forEach(function (c) { var t = m.tw(gsap.timeline({ paused: true }));
        t.from(c, { y: 16, autoAlpha: 0, duration: 0.5, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0);
        var mini = c.querySelector('.aq-visit-plan__mini'); if (mini) t.from(mini, { clipPath: 'inset(100% 0 0 0)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clipPath' }, 0.1);
        m.on(c, function () { t.play() }, 'top 90%') });
      return;
    }
    var svg = el.querySelector('.aq-visit-plan__svg'), walk = el.querySelector('.aq-visit-plan__walk');
    var marks = [].slice.call(el.querySelectorAll('.aq-visit-plan__mark'));
    var tl = window.AQiso ? AQiso.timeline(svg, m, { draw: 1.0, pipe: 0.5, flow: 1.1, stagger: 0.05 }) : null;
    if (!tl) return;
    var tw = tl.labels.pipes || 1, dur = 2.3, t0 = tw + 0.5;
    gsap.set(cards, { autoAlpha: 0, y: 12 }); gsap.set(marks, { autoAlpha: 0 });
    tl.from(walk, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, tw);
    var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('class', 'aq-visit-plan__walker'); dot.setAttribute('r', '6'); dot.setAttribute('aria-hidden', 'true');
    svg.appendChild(dot); gsap.set(dot, { autoAlpha: 0 });
    tl.set(dot, { autoAlpha: 1 }, t0);
    tl.to(dot, { duration: dur, ease: 'none', motionPath: { path: walk, align: walk, alignOrigin: [0.5, 0.5] } }, t0);
    var prev = null;
    marks.forEach(function (mk, k) {
      var at = t0 + dur * (+mk.getAttribute('data-f') || 0);
      tl.to(mk, { autoAlpha: 1, duration: 0.2, clearProps: 'opacity,visibility' }, at - 0.05);
      tl.from(mk.querySelector('circle'), { scale: 1.8, transformOrigin: '50% 50%', duration: 0.35, ease: 'power3.out', clearProps: 'transform' }, at - 0.05);
      var card = el.querySelector('.aq-visit-plan__stop[data-stop="' + mk.getAttribute('data-stop') + '"]'), ids = card ? String(card.getAttribute('data-parts') || '').split(' ') : [];
      tl.call(function (on, ids, mk) { if (prev) prev(); ids.forEach(function (id) { if (id) AQiso.light(svg, id, true) }); mk.classList.add('is-on');
        prev = function () { ids.forEach(function (id) { if (id) AQiso.light(svg, id, false) }); mk.classList.remove('is-on') } }, [true, ids, mk], at);
      if (card) tl.to(card, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at);
    });
    var rest = cards.filter(function (c) { return !el.querySelector('.aq-visit-plan__mark[data-stop="' + c.getAttribute('data-stop') + '"]') });
    if (rest.length) tl.to(rest, { autoAlpha: 1, y: 0, duration: 0.4, clearProps: 'transform,opacity,visibility' }, t0 + dur);
    tl.to(dot, { autoAlpha: 0, duration: 0.3 }, t0 + dur + 0.3);
    tl.call(function () { if (prev) prev(); prev = null; if (dot.parentNode) dot.parentNode.removeChild(dot) }, null, t0 + dur + 0.7);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
