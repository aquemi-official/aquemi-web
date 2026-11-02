/* StageStacks: the file grows stage by stage. The water runs the axis from the first node to the arrow; as it reaches
   each stage the node seats, that stage's sheets drop onto its stack from the bottom up, and its name and step wipe in
   under the axis. Phones: the same, down the vertical axis. One timeline, once, about 3.5 s. */
AQmotion.fx('StageStacks', function (root, m) {
  root.querySelectorAll('.aq-stage-stacks').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var stages = [].slice.call(el.querySelectorAll('.aq-stage-stacks__stage')).filter(function (s) { return s.offsetHeight > 0 });
    var narrow = m.narrow(), per = Math.min(0.55, 3 / Math.max(1, stages.length));
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var ks = el.querySelectorAll('.aq-stage-stacks__stage:first-child .aq-stage-stacks__k');
    if (ks.length) tl.from(ks, { autoAlpha: 0, x: -12, duration: 0.5, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 0);
    stages.forEach(function (s, i) {
      var t = 0.15 + i * per, run = s.querySelector('.aq-stage-stacks__run'), node = s.querySelector('.aq-stage-stacks__node'),
        docs = [].slice.call(s.querySelectorAll('.aq-stage-stacks__doc')), head = s.querySelector('.aq-stage-stacks__head'), who = s.querySelector('.aq-stage-stacks__who');
      if (run) tl.from(run, narrow ? { scaleY: 0, transformOrigin: '50% 0', duration: per, ease: 'none', clearProps: 'transform' } : { scaleX: 0, transformOrigin: '0 50%', duration: per, ease: 'none', clearProps: 'transform' }, t);
      if (node) tl.from(node, { scale: 0, duration: 0.3, ease: 'power3.out', clearProps: 'transform' }, t);
      if (docs.length) tl.from(docs, { y: narrow ? -12 : -48, autoAlpha: 0, duration: 0.4, ease: 'power2.in', stagger: narrow ? 0.03 : 0.05, clearProps: 'transform,opacity,visibility' }, t + 0.05);
      if (head) tl.from(head, { clipPath: 'inset(0 100% 0 0)', duration: 0.5, ease: 'power2.inOut', clearProps: 'clipPath' }, t + 0.1);
      if (who) tl.from(who, { autoAlpha: 0, y: 10, duration: 0.45, clearProps: 'transform,opacity,visibility' }, t + 0.25);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
