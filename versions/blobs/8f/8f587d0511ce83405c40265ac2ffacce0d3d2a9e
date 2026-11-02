/* SuiteLoop: the plan is drawn like a site plan. The loop's walls run out round the sheet, the water follows along
   the supply run; one by one the suites' walls go up (each wipes down from the top), its drop is cut from the loop and
   the valve seats, then the water runs down that drop into the suite and settles back to the drawn state, and the
   suite's words read in. One timeline, once on scroll-in, under 5 s. */
AQmotion.fx('SuiteLoop', function (root, m) {
  root.querySelectorAll('.aq-suite-loop').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var nar = m.narrow(), tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var loop = el.querySelector('.aq-suite-loop__loop'), water = el.querySelector('.aq-suite-loop__water');
    tl.fromTo(loop, { clipPath: nar ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0% 0)', duration: 1.1, ease: 'power2.inOut', clearProps: 'clipPath' }, 0);
    tl.fromTo(water, { clipPath: nar ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0% 0)', duration: 1.6, ease: 'power1.inOut', clearProps: 'clipPath' }, 0.5);
    el.querySelectorAll('.aq-suite-loop__suite').forEach(function (s, i) {
      var at = 0.35 + i * 0.32, dw = s.querySelector('.aq-suite-loop__dw'), drop = s.querySelector('.aq-suite-loop__drop');
      tl.fromTo(s, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power2.inOut', clearProps: 'clipPath' }, at);
      if (drop && drop.offsetParent !== null) {
        tl.from(drop, nar ? { scaleX: 0, duration: 0.4, clearProps: 'transform' } : { scaleY: 0, duration: 0.4, clearProps: 'transform' }, at + 0.1);
        tl.from(s.querySelector('.aq-suite-loop__valve svg'), { scale: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform' }, at + 0.35);
        if (!nar && dw) { tl.fromTo(dw, { scaleY: 0 }, { scaleY: 1, duration: 0.45, ease: 'power1.in' }, at + 0.7); tl.to(dw, { scaleY: 0.001, duration: 0.5, ease: 'power2.inOut', clearProps: 'transform' }, at + 1.5) }
      }
      tl.from(s.querySelectorAll('.aq-suite-loop__tag, .aq-suite-loop__t, .aq-suite-loop__f, .aq-suite-loop__go'), { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, at + 0.4);
    });
    m.on(el, function () { tl.play() }, 'top 75%');

    /* Ported from Subframe Motion "Animated beam connections" (animated-beam), MIT, (c) 2026 Subframe (kept: a light
       that travels the connector from the source to the target each time the target is pointed at, strong ease-out,
       played once per visit; replaced: the curved beams with the loop's supply run, the source node with the supply
       chevron, the target tile with the suite's drop). Pointing at or focusing a suite sends a slug of water along the
       loop to that suite's drop, then the drop fills (CSS). Visitor-driven, may repeat; 0.25-0.6 s. */
    var beam = el.querySelector('.aq-suite-loop__beam'), arrow = el.querySelector('.aq-suite-loop__arrow'), cur = null;
    function run(s) {
      if (!beam || s === cur) return; cur = s;
      var drop = s.querySelector('.aq-suite-loop__drop'); if (!drop || drop.offsetParent === null) return;
      var lr = beam.parentNode.getBoundingClientRect(), dr = drop.getBoundingClientRect(), ar = arrow.getBoundingClientRect(), v = m.narrow();
      var from = v ? ar.top - lr.top : ar.left - lr.left, to = v ? dr.top + dr.height / 2 - lr.top : dr.left + dr.width / 2 - lr.left;
      var size = v ? beam.offsetHeight : beam.offsetWidth, d = Math.min(0.6, Math.max(0.25, Math.abs(to - from) / 1600)), p = {};
      gsap.killTweensOf(beam);
      p[v ? 'y' : 'x'] = to - size;
      var f = { x: 0, y: 0, scale: 1, opacity: 1 }; f[v ? 'y' : 'x'] = from;
      gsap.timeline().fromTo(beam, f, Object.assign({ duration: d, ease: 'power3.out' }, p)).to(beam, { opacity: 0, duration: 0.2, ease: 'power1.out' }).set(beam, { scale: 0 });
    }
    el.querySelectorAll('.aq-suite-loop__suite').forEach(function (s) {
      s.addEventListener('pointerenter', function (ev) { if (ev.pointerType !== 'touch') run(s) });
      s.addEventListener('focusin', function () { run(s) });
      s.addEventListener('pointerleave', function () { if (cur === s) cur = null });
      s.addEventListener('focusout', function (ev) { if (!s.contains(ev.relatedTarget) && cur === s) cur = null });
    });
  });
});
