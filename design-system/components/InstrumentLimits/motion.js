/* InstrumentLimits: the instruments power up and read. The faceplates rise in; the dial's scale draws round, its ticks
   follow, the needle sweeps from zero up to the limit while the readout counts with it, and the red-line wedge strikes
   in as the needle arrives. The recorder's chart pen then lays the two runs of samples left to right, the action line
   runs along the top, and the alert line is drawn in from the end of the runs back across the chart: set from the
   data. One timeline on scroll-in, under 5 s. */
AQmotion.fx('InstrumentLimits', function (root, m) {
  var D = window.DrawSVGPlugin;
  [].forEach.call(root.querySelectorAll('.aq-instrument-limits'), function (el) {
    m.claim(el);
    var q = function (s) { return el.querySelector(s) }, qa = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var tl = gsap.timeline({ paused: true }); m.tw(tl);
    tl.from(qa('.aq-instrument-limits__plate'), { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.15, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0);
    var dial = q('.aq-instrument-limits__dial');
    if (dial) {
      var nd = dial.querySelector('.aq-instrument-limits__needle'), a0 = +dial.getAttribute('data-a0'), al = +dial.getAttribute('data-al');
      if (D) tl.fromTo(dial.querySelector('.aq-instrument-limits__scale'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.3);
      tl.from(dial.querySelectorAll('.aq-instrument-limits__tick'), { autoAlpha: 0, duration: 0.2, stagger: 0.02, clearProps: 'opacity,visibility' }, 0.4);
      if (nd) tl.fromTo(nd, { rotation: a0 - al, svgOrigin: '150 150' }, { rotation: 0, svgOrigin: '150 150', duration: 1.3, ease: 'power2.inOut', clearProps: 'transform' }, 0.9);
      var v = el.querySelector('.is-dial .aq-instrument-limits__v'); if (v) m.count(v, { now: false, duration: 1.3, delay: 0.9 });
      if (D) tl.fromTo(dial.querySelector('.aq-instrument-limits__red'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.35, ease: 'power3.in', clearProps: 'strokeDasharray,strokeDashoffset' }, 2.1);
    }
    var rec = q('.aq-instrument-limits__rec');
    if (rec) {
      tl.from(rec.querySelectorAll('.aq-instrument-limits__pt'), { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%', duration: 0.2, stagger: 0.03, clearProps: 'transform,opacity,visibility' }, 1.2);
      if (D) tl.fromTo(rec.querySelector('.aq-instrument-limits__act'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, clearProps: 'strokeDasharray,strokeDashoffset' }, 1.0);
      if (D) tl.fromTo(rec.querySelector('.aq-instrument-limits__alert'), { drawSVG: '40% 40%' }, { drawSVG: '0% 100%', duration: 0.9, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, 2.4);
    }
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
