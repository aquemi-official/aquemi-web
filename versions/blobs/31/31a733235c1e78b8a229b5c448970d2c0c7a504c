/* ProjectRun: the steps advance with the reader's scroll.
   Wide screens: the look switches to its live state (is-live): a sticky stage beside the steps. As the reader scrolls,
   the water fills the run under the stage (smoothed, it follows the scroll and stops when the scroll stops), the stop
   it reaches lights, the step at the centre of the view turns full strength, its drawing prints in from the bottom and
   the big number decodes to it. On first entry the stage frame unrolls and the first stop seats.
   Phones: the water fills down the vertical run with the scroll and each node lights as the water passes it; each step
   rises in once. The reader drives every change; nothing plays on its own for more than a second. */
AQmotion.fx('ProjectRun', function (root, m) {
  root.querySelectorAll('.aq-project-run').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    var steps = qa('.aq-project-run__step'), n = steps.length; if (!n) return;
    if (m.narrow()) {
      // the water fills down the run with the scroll: step i's segment fills as the run's progress passes it
      // PhoneKit's strip drives the run while it is on (state, set in the look's renderer): the fill stands down
      var nodes = qa('.aq-project-run__node'), fill = function (p) {
        if (el.hasAttribute('data-pk-on')) { steps.forEach(function (s) { s.style.removeProperty('--w') }); return }
        steps.forEach(function (s, i) { var w = Math.max(0, Math.min(1, p * (n - 1) - i)); s.style.setProperty('--w', w.toFixed(3)); if (nodes[i]) nodes[i].classList.toggle('is-wet', p * (n - 1) >= i - 0.02) }) };
      fill(0);
      m.tw(ScrollTrigger.create({ trigger: el, start: 'top 65%', end: 'bottom 65%', onUpdate: function (st) { fill(st.progress) } }));
      steps.forEach(function (s) {
        var parts = qa('.aq-project-run__pic, .aq-project-run__text > *', s).filter(function (x) { return x.offsetParent !== null || !el.hasAttribute('data-pk-on') }), nd = s.querySelector('.aq-project-run__node');
        gsap.set(parts, { y: 18, autoAlpha: 0 });
        m.on(s, function () {
          m.tw(gsap.to(parts, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }));
          if (nd) m.tw(gsap.fromTo(nd, { scale: 0.4 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)', clearProps: 'transform' }));
        }, 'top 80%');
      });
      return;
    }
    el.classList.add('is-live');
    var stage = el.querySelector('.aq-project-run__stage'), run = el.querySelector('.aq-project-run__run'), cur = el.querySelector('.aq-project-run__cur');
    var arts = qa('.aq-project-run__art'), stops = qa('.aq-project-run__stop'), list = el.querySelector('.aq-project-run__steps');
    var k = -1, f = { v: 0 };
    var setF = function () { run.style.setProperty('--f', f.v.toFixed(4)) }, toF = gsap.quickTo(f, 'v', { duration: 0.45, ease: 'power2.out', onUpdate: setF });
    function go(i) {
      if (i === k) return; var first = k < 0; k = i;
      steps.forEach(function (s, j) { s.classList.toggle('is-on', j === i) });
      arts.forEach(function (a, j) { a.classList.toggle('is-on', j === i) });
      stops.forEach(function (s, j) { s.classList.toggle('is-on', j === i); s.classList.toggle('is-past', j < i) });
      var t = (i < 9 ? '0' : '') + (i + 1);
      if (cur && !first && window.ScrambleTextPlugin) m.tw(gsap.to(cur, { duration: 0.5, scrambleText: { text: t, chars: '0123456789', speed: 1 }, ease: 'none' }));
      else if (cur) cur.textContent = t;
      if (stops[i]) m.tw(gsap.fromTo(stops[i].querySelector('.aq-project-run__dot'), { boxShadow: '0 0 0 12px ' + getComputedStyle(document.documentElement).getPropertyValue('--flow-tint').trim() }, { boxShadow: '0 0 0 0px rgba(0,0,0,0)', duration: 0.6, ease: 'power2.out', clearProps: 'boxShadow' }));
    }
    // Progress through the list: when step i's centre crosses the view's centre, the water is at stop i
    m.tw(ScrollTrigger.create({ trigger: list, start: 'top center', end: 'bottom center',
      onUpdate: function (st) {
        var v = Math.max(0, Math.min(1, (st.progress * n - 0.5) / Math.max(1, n - 1)));
        toF(v);
        go(Math.max(0, Math.min(n - 1, Math.round(v * (n - 1)))));
      } }));
    go(0); setF();
    // First entry: the stage frame unrolls, the drawing prints, the first stop seats
    gsap.set(stage, { clipPath: 'inset(0 0 100% 0)' });
    m.on(el, function () {
      var tl = m.tw(gsap.timeline());
      tl.to(stage, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.inOut', clearProps: 'clipPath' }, 0)
        .from(cur, { yPercent: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.4)
        .from(qa('.aq-project-run__stop'), { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.5);
    }, 'top 75%');
    ScrollTrigger.refresh();
  });
});
