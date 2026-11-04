/* DecisionValve: the valve is set up, then turned. The supplies slide in from the left, their lines run in to the
   valve, the dial's position plate turns into place, the lever swings round from its rest to position 01, the lines
   out run to the cards and the cards slide in from the right, the first lit. On every choice afterwards the lit lines
   run again from the supply to the card (water through the new route). Once on scroll-in, under 3 s; nothing under
   reduced motion (the lever then simply jumps, by CSS). */
AQmotion.fx('DecisionValve', function (root, m) {
  root.querySelectorAll('.aq-decision-valve').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    if (window.AQdecisionValve) window.AQdecisionValve.layout(el); // the lines in their real geometry before DrawSVG measures them
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var lever = el.querySelector('.aq-decision-valve__lever'), dial = el.querySelector('.aq-decision-valve__dial'), ins = q('.aq-decision-valve__in'), outs = q('.aq-decision-valve__out');
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })), wide = !m.narrow();
    tl.from(q('.aq-decision-valve__colh'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0)
      .from(q('.aq-decision-valve__src'), { x: wide ? -32 : 0, y: wide ? 0 : 12, autoAlpha: 0, duration: 0.6, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, wide ? 0.05 : 0);
    if (dial) tl.from(dial, { autoAlpha: 0, rotation: -30, transformOrigin: '50% 50%', duration: 0.9, clearProps: 'transform,opacity,visibility' }, 0.3)
      .from(dial.querySelectorAll('.aq-decision-valve__posn'), { autoAlpha: 0, duration: 0.3, stagger: 0.08, clearProps: 'opacity,visibility' }, 0.8);
    if (window.DrawSVGPlugin && wide) {
      tl.fromTo(ins, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, stagger: 0.06, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.3)
        .fromTo(outs, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, stagger: 0.06, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 1.5);
    }
    if (lever) {
      var end = lever.style.getPropertyValue('--a') || '0deg';
      tl.set(lever, { transition: 'none' }, 0).fromTo(lever, { '--a': '-170deg' }, { '--a': end, duration: 1.1, ease: 'aq-settle' }, 0.7).set(lever, { clearProps: 'transition' });
    }
    tl.from(q('.aq-decision-valve__card'), { x: wide ? 32 : 0, y: wide ? 0 : 12, autoAlpha: 0, duration: 0.6, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, wide ? 1.6 : 0.5); // phone: no line draw to wait for
    m.on(el, function () { tl.play() }, 'top 75%');
    // a choice: water runs the new route, in then out
    el.addEventListener('click', function (ev) {
      var t = ev.target.closest('.aq-decision-valve__src, .aq-decision-valve__card'); if (!t || !window.DrawSVGPlugin || ev.target.closest('a')) return;
      var i = t.getAttribute('data-i'), a = el.querySelector('.aq-decision-valve__in[data-i="' + i + '"]'), b = el.querySelector('.aq-decision-valve__out[data-i="' + i + '"]');
      var r = m.tw(gsap.timeline());
      if (a) r.fromTo(a, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, ease: 'power1.in', clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
      if (b) r.fromTo(b, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, ease: 'power1.out', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.35);
    });
  });
});
