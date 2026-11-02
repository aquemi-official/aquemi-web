/* PlanChecker: the checker lays itself down in a diagonal wave, head tiles first: each tile rises out of its own
   bottom edge (clip-path, 0.7 s power3.inOut, 120 ms a step along the diagonal), its words follow 8 px, and the slash
   numerals roll up on the odometer (m.count). Once, under 2 s. Phones: the tabs and the shown plan's tiles in order.
   Term hover across plans is in the look (repeats). */
AQmotion.fx('PlanChecker', function (root, m) {
  root.querySelectorAll('.aq-plan-checker').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var vis = function (x) { return x.offsetParent !== null };
    var tl = m.tw(gsap.timeline({ paused: true })), plans = [].slice.call(el.querySelectorAll('.aq-plan-checker__plan')).filter(vis);
    var wipe = function (tiles, at) {
      if (!tiles.length) return;
      tl.fromTo(tiles, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.inOut', clearProps: 'clipPath' }, at);
      var words = [];
      tiles.forEach(function (t) { [].forEach.call(t.children, function (c) { words.push(c) }) });
      tl.from(words, { y: 8, autoAlpha: 0, duration: 0.4, stagger: 0.02, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at + 0.35);
    };
    var tabs = [].slice.call(el.querySelectorAll('.aq-plan-checker__tab')).filter(vis);
    if (tabs.length) wipe(tabs, 0);
    plans.forEach(function (p, j) {
      var col = tabs.length ? 0 : j, head = p.querySelector('.aq-plan-checker__head');
      var rest = [].slice.call(p.querySelectorAll('.aq-plan-checker__term, .aq-plan-checker__act')).filter(vis);
      wipe([head], (col + (tabs.length ? 1 : 0)) * 0.12);
      wipe(rest, (col + 1 + (tabs.length ? 1 : 0)) * 0.12);
    });
    m.on(el, function () {
      tl.play();
      plans.forEach(function (p, j) { var n = p.querySelector('.aq-plan-checker__num'); if (n) m.count(n, { now: true, delay: 0.3 + j * 0.12, duration: 1 }) });
    }, 'top 75%');
  });
});
