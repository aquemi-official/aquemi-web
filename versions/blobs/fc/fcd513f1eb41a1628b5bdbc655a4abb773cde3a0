/* IndustryDrops: the package draws itself, then the header main is laid from the supply riser round the loop (twin
   wall growing, the water following it), and each drop opens as the water passes its tee: the drop runs down to its
   arrowhead, the outlet's vignette draws the IsoKit way and its number, title, line and tag rise in. One timeline, once
   on scroll-in, about 3 s; reduced motion shows the finished drawing (nothing here runs).
   Ported from Subframe Motion "Animated beam connections" (animated-beam), MIT, (c) 2026 Subframe (kept: the measured
   connector paths, the highlight travelling each path toward its node with a strong ease-out, nodes offset in turn;
   replaced: the looping gradient beams with one pass of water along a twin-wall main, the 0.7 s offsets with each
   drop's place along the main). Phones: the outlet tiles rise in two by two and the open card follows. */
AQmotion.fx('IndustryDrops', function (root, m) {
  root.querySelectorAll('.aq-industry-drops').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var K = 'aq-industry-drops', q = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var list = el.querySelector('.' + K + '__list');
    if (list && list.hasAttribute('data-pk-on')) {
      var chips = q('.' + K + '__chip');
      tl.from(chips, { y: 12, autoAlpha: 0, duration: 0.5, stagger: function (i) { return Math.floor(i / 2) * 0.09 + (i % 2) * 0.04 }, clearProps: 'transform,opacity,visibility' }, 0);
      var open = q('.' + K + '__body:not([hidden])');
      if (open.length) tl.from(open, { y: 12, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, 0.35);
      m.on(el, function () { tl.play() }, 'top 85%');
      return;
    }
    if (window.AQindustryDrops) AQindustryDrops.lay(el);
    var svg = el.querySelector('.' + K + '__main'), pkg = el.querySelector('.' + K + '__pkg svg.aq-iso');
    var main = q('path[data-r$="-main"]', svg), water = svg && svg.querySelector('path[data-r="water-main"]');
    if (pkg && window.AQiso) { var pt = AQiso.timeline(pkg, m, { draw: 0.7, pipe: 0.3, flow: 0.4, drop: false }); if (pt) { pt.paused(false); tl.add(pt, 0) } }
    var L = 0; try { L = water ? water.getTotalLength() : 0 } catch (x) { L = 0 }
    var T0 = 0.5, LAY = 1.1;
    if (L) {
      main.forEach(function (p) {
        var isW = p.getAttribute('data-r') === 'water-main';
        tl.fromTo(p, { strokeDasharray: L + ' ' + L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: isW ? LAY + 0.2 : LAY, ease: isW ? 'power1.inOut' : 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, isW ? T0 + 0.15 : T0);
      });
    }
    /* where each tee sits along the main (0..1), sampled once */
    var pts = [];
    if (L) for (var s = 0; s <= 160; s++) { var P = water.getPointAtLength(L * s / 160); pts.push([P.x, P.y, s / 160]) }
    function along(x, y) { var b = 0, bd = 1e12; pts.forEach(function (p) { var d = (p[0] - x) * (p[0] - x) + (p[1] - y) * (p[1] - y); if (d < bd) { bd = d; b = p[2] } }); return b }
    q('.' + K + '__item').forEach(function (it) {
      var k = it.getAttribute('data-k'), drops = svg ? q('path[data-k="' + k + '"]', svg) : [], at = T0 + 0.4;
      var w = drops.filter(function (p) { return p.getAttribute('data-r') === 'water-drop' })[0];
      if (w && L) { var mm = /M([\d.-]+) ([\d.-]+)/.exec(w.getAttribute('d') || ''); if (mm) at = T0 + 0.15 + (LAY + 0.2) * along(+mm[1], +mm[2]) }
      drops.forEach(function (p) {
        var l = 0; try { l = p.getTotalLength() } catch (x) { l = 0 } if (!l) return;
        tl.fromTo(p, { strokeDasharray: l + ' ' + l, strokeDashoffset: l }, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.in', clearProps: 'strokeDasharray,strokeDashoffset' }, p.getAttribute('data-r') === 'head-drop' ? at + 0.3 : at);
      });
      var fig = it.querySelector('.' + K + '__fig svg.aq-iso');
      if (fig && window.AQiso) { var ft = AQiso.timeline(fig, m, { draw: 0.45, pipe: 0.15, flow: 0.25, drop: false }); if (ft) { ft.paused(false); tl.add(ft, at + 0.3) } }
      var rise = q('.' + K + '__body > .' + K + '__no, .' + K + '__t, .' + K + '__d, .' + K + '__tag', it);
      if (rise.length) tl.from(rise, { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.05, clearProps: 'transform,opacity,visibility' }, at + 0.3);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
