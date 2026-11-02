/* DecisionPlant: the schematic is drawn (sheet, then the equipment back to front, then the pipes), the water runs the
   route once from the feed to the return, and then the decisions branch out of the plant: from each part a leader
   draws toward its callout and the callout rises in as its leader arrives, 0.12 s apart. Once on scroll-in, under 4 s.
   Ported from Subframe Motion "Asset crop workflow" (process-choreography), MIT, (c) 2026 Subframe (kept: one clock
   for the sequence, connector strokes drawn from the source toward each output (1.12 s), each output fading up and
   scaling in from 0.96 inside its own window as its connector arrives, cubic ease-out; replaced: the artwork and its
   crops with the plant and the decisions). Nothing under reduced motion: the drawing and leaders are complete. */
AQmotion.fx('DecisionPlant', function (root, m) {
  root.querySelectorAll('.aq-decision-plant').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('.aq-decision-plant__svg'), D = window.DrawSVGPlugin; if (!svg) return;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var q = function (s) { return [].slice.call(svg.querySelectorAll(s)) };
    tl.from(q('.aq-decision-plant__frame'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0);
    var parts = q('.aq-decision-plant__part');
    parts.forEach(function (p, i) { tl.from(p, { autoAlpha: 0, y: 6, duration: 0.45, clearProps: 'opacity,visibility,transform' }, 0.1 + i * 0.08) });
    var pipes = q('.aq-decision-plant__pipe'), flow = q('.aq-decision-plant__flow');
    if (D) {
      tl.from(pipes, { drawSVG: '0%', duration: 0.9, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.3);
      tl.from(flow, { drawSVG: '0%', duration: 1.4, ease: 'power1.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.9);
    }
    var mks = [].slice.call(el.querySelectorAll('.aq-decision-plant__mk'));
    tl.from(mks, { scale: 0.6, autoAlpha: 0, duration: 0.3, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 1.5);
    /* the branch: leaders are laid by the look's script; read them when the sequence reaches them */
    var items = [].filter.call(el.querySelectorAll('.aq-decision-plant__item'), function (x) { return x.offsetParent !== null });
    items.forEach(function (it) { gsap.set(it, { autoAlpha: 0 }) });
    tl.call(function () {
      var leads = el.querySelector('.aq-decision-plant__leads'), shown = leads && getComputedStyle(leads).display !== 'none';
      items.forEach(function (it, i) {
        var p = shown && leads.querySelector('.aq-decision-plant__lead[data-i="' + it.getAttribute('data-i') + '"]'), at = i * 0.12, w = 1.12 - 0.12 * (items.length - 1);
        if (p && D) m.tw(gsap.fromTo(p, { drawSVG: '100% 100%' }, { drawSVG: '0% 100%', duration: Math.max(0.5, w), delay: at, ease: 'power3.out', clearProps: 'strokeDasharray,strokeDashoffset' }));
        m.tw(gsap.fromTo(it, { autoAlpha: 0, scale: 0.96, transformOrigin: it.classList.contains('is-l') ? '100% 0' : '0 0' }, { autoAlpha: 1, scale: 1, duration: 0.45, delay: at + Math.max(0.5, w) * 0.6, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }));
      });
    }, null, 1.7);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
