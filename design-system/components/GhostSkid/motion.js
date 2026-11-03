/* GhostSkid: the base skid draws itself solid (IsoKit's choreography: frame and parts back to front, pipes, the water
   runs it once); then each option clips on at its place in number order: its dashed ghost settles 10 px down onto the
   skid while its dashes run a short way along their lines, and its tag drops in. One timeline, once, under 5 s.
   The running dashes are ported from Subframe Motion "SVG line drawing animation" (signature-draw), MIT, (c) 2026
   Subframe: a stroke-dashoffset tween over the ink path, here 0.9 s on the dash pattern instead of one stroke; the same
   dash run repeats while a visitor points at an option (style.css). Reduced motion: the finished drawing, no running
   dashes. */
AQmotion.fx('GhostSkid', function (root, m) {
  root.querySelectorAll('.aq-ghost-skid').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('.aq-ghost-skid__svg');
    var ghosts = [].slice.call(el.querySelectorAll('.aq-ghost-skid__ghost'));
    var tags = [].slice.call(el.querySelectorAll('.aq-ghost-skid__tag, .aq-ghost-skid__ld'));
    var tl = window.AQiso && svg ? AQiso.timeline(svg, m, { draw: 1.1, pipe: 0.5, flow: 0.9, stagger: 0.06 }) : null;
    if (!tl) return;
    var t0 = (tl.labels.flow || 1.4) + 0.2;
    gsap.set(ghosts.concat(tags), { autoAlpha: 0 });
    ghosts.sort(function (a, b) { return +a.getAttribute('data-r') - +b.getAttribute('data-r') });
    ghosts.forEach(function (g, i) {
      var at = t0 + i * 0.32, tag = el.querySelectorAll('.aq-ghost-skid__tag[data-r="' + g.getAttribute('data-r') + '"], .aq-ghost-skid__ld[data-r="' + g.getAttribute('data-r') + '"]');
      var lines = g.querySelectorAll('.aq-iso__eq, .aq-iso__ln, .aq-iso__thin, .aq-iso__pipe-wall');
      tl.to(g, { autoAlpha: 1, duration: 0.3, clearProps: 'opacity,visibility' }, at)
        .from(g, { y: -10, duration: 0.5, ease: 'power3.out', clearProps: 'transform' }, at)
        .fromTo(lines, { strokeDashoffset: 14 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', clearProps: 'strokeDashoffset' }, at);
      if (tag.length) tl.to(tag, { autoAlpha: 1, duration: 0.25, clearProps: 'opacity,visibility' }, at + 0.25)
        .from(tag, { y: -8, duration: 0.4, ease: 'power3.out', clearProps: 'transform' }, at + 0.25);
    });
    tl.from(el.querySelectorAll('.aq-ghost-skid__item'), { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.1, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.3);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
