/* CutBand: the plant is drawn, then cut. The elevation draws on (frame, equipment, then the pipes) and the water runs
   the header and the loop once while the sample valves light; then the cutting plane crosses the page: a navy
   occluder with flow edges sweeps in from the left until it covers the band's whole width, holds, and under full
   cover the band's ground and table switch on; it travels on and off the right edge, leaving the table in place. The
   figure then rolls up on its odometer. One timeline on scroll-in, under 4 s; nothing hidden at the end.
   Ported from Subframe Motion "Foreground occlusion scene transition" (foreground-occlusion-wipe), MIT, (c) 2026
   Subframe (kept: one occluder 1.15 x the stage wide, two strokes sharing the crossing time with smoothstep easing,
   a covered hold, the scene swapped only under full cover, no traversal under reduced motion; replaced: the
   photographs with the band's empty and filled states, the queue and pause logic with one GSAP timeline, crossing
   520 ms for a full page width instead of 220 ms for a 600 px stage). */
AQmotion.fx('CutBand', function (root, m) {
  var D = window.DrawSVGPlugin;
  [].forEach.call(root.querySelectorAll('.aq-cut-band'), function (el) {
    var band = el.querySelector('.aq-cut-band__band'), occ = el.querySelector('.aq-cut-band__occ'), svg = el.querySelector('.aq-cut-band__svg');
    if (!band || !occ) return; m.claim(band); if (svg) m.claim(el.querySelector('.aq-cut-band__fig'));
    var qa = function (s) { return svg ? [].slice.call(svg.querySelectorAll(s)) : [] };
    var smooth = function (t) { return t * t * (3 - 2 * t) };
    var CROSS = 0.52, HOLD = 0.04, geo = {};
    function measure() { var vw = document.documentElement.clientWidth, r = band.getBoundingClientRect(), w = vw * 1.15;
      geo = { w: w, start: -r.left - w, mid: -r.left + (vw - w) / 2, end: vw - r.left }; occ.style.width = w + 'px' }
    var tl = gsap.timeline({ paused: true }); m.tw(tl);
    band.classList.add('is-cut');
    if (D) {
      tl.fromTo(qa('.aq-cut-band__frame, .aq-cut-band__eq, .aq-cut-band__ln, .aq-cut-band__trace'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, stagger: 0.02, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
      tl.fromTo(qa('.aq-cut-band__pipe, .aq-cut-band__smp'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.6);
      tl.fromTo(qa('.aq-cut-band__water'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: 'none', clearProps: 'strokeDasharray,strokeDashoffset' }, 1.0);
    }
    tl.from(qa('.aq-cut-band__hid, .aq-cut-band__pt'), { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, 1.6);
    /* the cutting plane: in to full cover, hold, swap, out */
    var t0 = 1.2, p = { x: 0 };
    tl.add(function () { measure(); occ.style.display = 'block'; gsap.set(occ, { x: geo.start }) }, t0);
    tl.fromTo(p, { x: 0 }, { x: 1, duration: CROSS / 2, ease: 'none', immediateRender: false, onUpdate: function () { gsap.set(occ, { x: geo.start + (geo.mid - geo.start) * smooth(p.x) }) } }, t0);
    tl.add(function () { band.classList.remove('is-cut') }, t0 + CROSS / 2);
    tl.fromTo(p, { x: 0 }, { x: 1, duration: CROSS / 2, ease: 'none', immediateRender: false, onUpdate: function () { gsap.set(occ, { x: geo.mid + (geo.end - geo.mid) * smooth(p.x) }) },
      onComplete: function () { occ.style.display = ''; gsap.set(occ, { clearProps: 'transform' }) } }, t0 + CROSS / 2 + HOLD);
    tl.from(band.querySelectorAll('.aq-cut-band__row'), { autoAlpha: 0, x: -12, duration: 0.4, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, t0 + CROSS / 2 + HOLD + 0.1);
    var fig = band.querySelector('.aq-cut-band__v.is-fig .aq-cut-band__val');
    if (fig) tl.add(function () { m.count(fig, { now: true, duration: 1.1 }) }, t0 + CROSS + 0.2);
    tl.add(function () { band.classList.remove('is-cut') }, t0 + CROSS + 0.3);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
