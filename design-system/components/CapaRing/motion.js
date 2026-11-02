/* CapaRing: the loop closes. The far ring and its ticks draw, the record's name settles in the centre, then the water
   runs the ring clockwise from the first node: each node seats as the water reaches it and its step slides in from its
   side; at a hold node the water waits (the valve shuts with a small jolt) before it goes on; back at the first node
   the ring closes and the line swells once. One timeline, once, about 4.5 s. Phones: the same ring, the steps rule in
   under it. */
AQmotion.fx('CapaRing', function (root, m) {
  root.querySelectorAll('.aq-capa-ring').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var flow = el.querySelector('.aq-capa-ring__flow'), nodes = q('.aq-capa-ring__node'), steps = q('.aq-capa-ring__step'), core = el.querySelector('.aq-capa-ring__core');
    var n = nodes.length || 1, narrow = m.narrow(), D = window.DrawSVGPlugin;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tl.from(q('.aq-capa-ring__far, .aq-capa-ring__base'), { autoAlpha: 0, scale: 0.92, transformOrigin: '50% 50%', duration: 0.8, clearProps: 'transform,opacity,visibility' }, 0);
    tl.from(q('.aq-capa-ring__tick'), { autoAlpha: 0, duration: 0.02, stagger: 0.008, clearProps: 'opacity,visibility' }, 0.1);
    if (core) tl.from(core, { autoAlpha: 0, scale: 0.85, duration: 0.8, clearProps: 'transform,opacity,visibility' }, 0.3);
    if (narrow && steps.length) tl.from(steps, { clipPath: 'inset(0 100% 0 0)', duration: 0.5, ease: 'power2.inOut', stagger: 0.08, clearProps: 'clipPath' }, 0.4);
    if (D && flow) gsap.set(flow, { drawSVG: '0% 0%' });
    var t = 0.7, seg = 0.42;
    nodes.forEach(function (g, i) {
      var dot = g.querySelector('.aq-capa-ring__dot'), lead = g.querySelector('.aq-capa-ring__lead'), lab = g.querySelectorAll('text, .aq-capa-ring__valve'), st = steps[i];
      if (i > 0 && D && flow) { tl.to(flow, { drawSVG: '0% ' + (i / n * 100) + '%', duration: seg, ease: 'none' }, t); t += seg }
      tl.from(dot, { scale: 0, transformOrigin: '50% 50%', duration: 0.35, ease: 'back.out(2.5)', clearProps: 'transform' }, t);
      if (lab.length) tl.from(lab, { autoAlpha: 0, duration: 0.2, clearProps: 'opacity,visibility' }, t + 0.1);
      if (lead && !narrow) tl.from(lead, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, t + 0.1);
      if (st && !narrow) tl.from(st, { x: st.classList.contains('is-l') ? -24 : 24, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, t + 0.1);
      if (g.classList.contains('is-hold')) { tl.to(g, { x: 2, duration: 0.05, yoyo: true, repeat: 3, ease: 'none', clearProps: 'transform' }, t + 0.3); t += 0.55 }
    });
    if (D && flow) { tl.to(flow, { drawSVG: '0% 100%', duration: seg, ease: 'none' }, t); t += seg; tl.set(flow, { clearProps: 'strokeDasharray,strokeDashoffset' }, t) }
    if (flow) tl.to(flow, { strokeWidth: 6, duration: 0.25, yoyo: true, repeat: 1, ease: 'power1.inOut', clearProps: 'strokeWidth' }, t);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
