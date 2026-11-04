/* ApplicationWheel: the water reaches every use from one package.
   Ported from Subframe Motion "Animated workflow diagram" (process-choreography), MIT, (c) 2026 Subframe.
   Kept: the trunk-then-branches choreography (one 1.12 s run, cubic ease-out; the trunk over the first 20 %, each
   branch over its own 30 % window, staggered, the output arriving as its branch lands). Here the hub's loop ring turns
   in first (the trunk), the segments open out of the hub one after another clockwise, each group's leader draws from
   its block to the rim and the block arrives as the leader lands. Once, on entry; reduced motion: the finished
   drawing (the core does not run). */
AQmotion.fx('ApplicationWheel', function (root, m) {
  root.querySelectorAll('.aq-application-wheel').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    if (window.awLead) window.awLead(el);
    var segs = [].slice.call(el.querySelectorAll('.aq-application-wheel__seg path')), nums = [].slice.call(el.querySelectorAll('.aq-application-wheel__num')),
      loop = el.querySelector('.aq-application-wheel__loop'), pkg = el.querySelector('.aq-application-wheel__pkg'),
      grps = [].slice.call(el.querySelectorAll('.aq-application-wheel__grp')), D = 1.12;
    gsap.set(segs, { scale: 0.82, autoAlpha: 0, svgOrigin: '200 200' }); gsap.set(nums, { autoAlpha: 0 });
    if (pkg) gsap.set(pkg, { autoAlpha: 0 });
    gsap.set(grps, { autoAlpha: 0, y: 12 });
    m.on(el, function () {
      var tl = m.tw(gsap.timeline({ defaults: { ease: 'power3.out' } })), n = segs.length || 1;
      if (loop) tl.fromTo(loop, { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: D * 0.6, ease: 'power2.out', clearProps: 'strokeDashoffset' }, 0);
      if (pkg) tl.to(pkg, { autoAlpha: 1, duration: 0.5, clearProps: 'opacity,visibility' }, 0);
      segs.forEach(function (s, i) {
        var t0 = D * (0.18 + 0.52 * i / n), g = grps[i], lead = el.querySelector('.aq-application-wheel__lead[data-i="' + i + '"] path');
        tl.to(s, { scale: 1, autoAlpha: 1, duration: D * 0.3, clearProps: 'transform,opacity,visibility' }, t0);
        if (nums[i]) tl.to(nums[i], { autoAlpha: 1, duration: 0.3, clearProps: 'opacity,visibility' }, t0 + 0.12);
        if (lead && lead.getTotalLength) {
          var L = lead.getTotalLength();
          tl.fromTo(lead, { strokeDasharray: L + ' ' + (L + 1), strokeDashoffset: L }, { strokeDashoffset: 0, duration: D * 0.3, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, t0 + 0.1);
        }
        if (g) tl.to(g, { autoAlpha: 1, y: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, t0 + D * 0.3);
      });
    }, 'top 75%');
  });
});
