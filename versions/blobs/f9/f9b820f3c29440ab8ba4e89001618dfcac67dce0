/* GradeLadder: the instrument is set up, then it reads along with you. Entrance (once, under 2.5 s): the ruler's ticks
   run up the scale, the grade labels set in, the fill rises to the first row's minimum and the minimum line sweeps up
   with it; the rows rise in. Then the page's one scroll-linked story: as the rows pass the reading line (45 % of the
   viewport; on phones just under the sticky band) the row on it is shown on the instrument, stepwise (no easing between
   rows; the fader glides 380 ms to the new grade). A row in hand (pointer, focus) takes over until the pointer leaves the
   rows. Readable at every scroll position; no pin; nothing under reduced motion (the row in hand still shows, instantly).
   Ported from Subframe Motion "Scroll turntable" (scroll-turntable), MIT, (c) 2026 Subframe (kept: scroll progress
   mapped stepwise to one indexed view shown in a sticky panel, seeking from the controls syncs the view; replaced: the
   32 cached jug frames with the table's rows and the instrument).
   Ported from Subframe Motion "Elastic fader" (elastic-fader), MIT, (c) 2026 Subframe (kept: the oversized level
   number beside a vertical fader, the fill scaled from its foot, the 380 ms return to the level; replaced: the
   overshooting cubic-bezier(.18,1.5,.35,1) and the overtravel stretch with a settle (.22,1,.36,1): no bounce). */
AQmotion.fx('GradeLadder', function (root, m) {
  root.querySelectorAll('.aq-grade-ladder').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var ins = el.querySelector('.aq-grade-ladder__inst'), nar = m.narrow(); if (!ins) return;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var ticks = [].slice.call(ins.querySelectorAll('.aq-grade-ladder__ruler i')).reverse();
    tl.from(ticks, nar ? { scaleY: 0, transformOrigin: '50% 100%', duration: 0.3, stagger: 0.015, clearProps: 'transform' } : { scaleX: 0, transformOrigin: '100% 50%', duration: 0.3, stagger: 0.015, clearProps: 'transform' }, 0);
    tl.from(ins.querySelectorAll('.aq-grade-ladder__mark'), { autoAlpha: 0, y: nar ? 0 : 10, duration: 0.5, stagger: 0.12, clearProps: 'transform,opacity,visibility' }, 0.2);
    tl.from(ins.querySelector('.aq-grade-ladder__fill'), nar ? { scaleX: 0, duration: 1, ease: 'power2.inOut', clearProps: 'transform' } : { scaleY: 0, duration: 1, ease: 'power2.inOut', clearProps: 'transform' }, 0.45);
    tl.from(ins.querySelector('.aq-grade-ladder__limit'), nar ? { x: 0, duration: 1, ease: 'power2.inOut', clearProps: 'transform' } : { y: 0, duration: 1, ease: 'power2.inOut', clearProps: 'transform' }, 0.45);
    tl.from(ins.querySelector('.aq-grade-ladder__read'), { autoAlpha: 0, y: 12, duration: 0.6, clearProps: 'transform,opacity,visibility' }, 0.3);
    var rows = [].filter.call(el.querySelectorAll('.aq-grade-ladder__row'), function (r) { return r.offsetParent !== null });
    tl.from(rows, { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0.35);
    m.on(el, function () { tl.play() }, 'top 75%');

    /* the reading line picks the row (stepwise) unless one is in hand */
    var list = el.querySelector('.aq-grade-ladder__rows'), A = window.AQladder;
    if (!list || !A || !window.ScrollTrigger) return;
    function read() {
      if (el.getAttribute('data-by') === 'hand') return;
      var line = m.narrow() ? ins.getBoundingClientRect().bottom + 24 : innerHeight * 0.45, best = null, bd = 1e9;
      [].forEach.call(list.children, function (r) { if (r.offsetParent === null) return; var b = r.getBoundingClientRect(), d = line < b.top ? b.top - line : line > b.bottom ? line - b.bottom : 0; if (d < bd) { bd = d; best = r } });
      if (best && !best.classList.contains('is-on')) A.show(el, best, 'scroll')
    }
    m.tw(ScrollTrigger.create({ trigger: list, start: 'top bottom', end: 'bottom top', onUpdate: read, onRefresh: read }));
  });
});
