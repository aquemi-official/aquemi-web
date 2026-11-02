/* CutoverSchedule: time runs left to right. The water line runs along the top until the shutdown, where it stops, the
   dashed gap opens with its label, and the line runs on after it; in step with it each bar grows from its start as
   the line passes, its row's text rising; the hold diamond strikes and the hold stamp lands. One timeline, once,
   about 3.5 s. Phones: the same, rows rising as they come. Hover tints a bar (CSS). */
AQmotion.fx('CutoverSchedule', function (root, m) {
  root.querySelectorAll('.aq-cutover-schedule').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) }, tl = m.tw(gsap.timeline({ paused: true }));
    var rows = q('.aq-cutover-schedule__row'), water = q('.aq-cutover-schedule__water'), gap = el.querySelector('.aq-cutover-schedule__gap');
    var per = 0.55, t0 = 0.3, cut = rows.findIndex(function (r) { return r.classList.contains('is-cut') });
    tl.from(q('.aq-cutover-schedule__lk, .aq-cutover-schedule__grid'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0);
    if (water[0]) tl.from(water[0], { scaleX: 0, duration: cut < 0 ? per * rows.length : per * cut, ease: 'none', clearProps: 'transform' }, t0);
    if (gap) { tl.from(gap, { autoAlpha: 0, scaleY: 0, transformOrigin: '50% 100%', duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, t0 + per * cut);
      if (water[1]) tl.from(water[1], { scaleX: 0, duration: per * (rows.length - cut - 1), ease: 'none', clearProps: 'transform' }, t0 + per * (cut + 1)) }
    rows.forEach(function (r, i) {
      var at = t0 + i * per, bar = r.querySelector('.aq-cutover-schedule__bar');
      tl.from(r.querySelectorAll('.aq-cutover-schedule__n, .aq-cutover-schedule__t, .aq-cutover-schedule__d'), { y: 12, autoAlpha: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at - 0.15);
      tl.from(bar, { scaleX: 0, duration: per, ease: 'none', clearProps: 'transform' }, at);
      var dm = r.querySelector('.aq-cutover-schedule__diamond'), hs = r.querySelector('.aq-cutover-schedule__hold');
      if (dm) tl.from(dm, { scale: 0, duration: 0.3, ease: 'back.out(2.5)', clearProps: 'transform' }, at + per);
      if (hs) tl.from(hs, { scale: 1.3, autoAlpha: 0, duration: 0.3, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at + per + 0.05);
    });
    tl.from(el.querySelector('.aq-cutover-schedule__nts'), { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, t0 + rows.length * per);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
