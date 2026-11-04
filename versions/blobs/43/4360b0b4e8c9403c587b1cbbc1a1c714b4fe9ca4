/* BidRoute: a bid runs the route. The water fills the route's centre line from the left with a ringed marker at its
   head; as the marker reaches each station, the station's pictogram rises onto the route, its drop is drawn down to the
   card, and the card's number and text come up. One timeline, once on scroll-in, 3.6 s; the marker leaves at the end
   and everything settles static. Up to 1100 px (the riser layout) the cards come up in turn with their pictograms.
   Nothing runs under reduced motion: the section renders finished.
   Ported from Subframe Motion "Full send" (race-replay), MIT, (c) 2026 Subframe: one progress value drives the line's
   drawn length and the ringed marker together (its tick: progress += dt / 4600 ms, linear); here GSAP tweens the same
   progress over 3 s with a light ease-in-out, and the stations key off it instead of a lap timer. */
AQmotion.fx('BidRoute', function (root, m) {
  var NS = 'http://www.w3.org/2000/svg';
  root.querySelectorAll('.aq-bid-route').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var cards = [].slice.call(el.querySelectorAll('.aq-bid-route__card')),
      fig = el.querySelector('.aq-bid-route__fig'), svg = fig && fig.querySelector('svg');
    var wide = fig && fig.offsetParent !== null && svg;
    var parts = function (c) { return [c.querySelector('.aq-bid-route__no')].concat([].slice.call(c.querySelectorAll('.aq-bid-route__mini, .aq-bid-route__t, .aq-bid-route__e, .aq-bid-route__u'))).filter(Boolean) };
    if (!wide) {
      var t0 = gsap.timeline({ paused: true });
      cards.forEach(function (c, i) { t0.from(parts(c), { autoAlpha: 0, y: 12, duration: 0.45, stagger: 0.05, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, i * 0.14) });
      m.on(el, function () { t0.play() }, 'top 80%');
      return;
    }
    var h2o = svg.querySelector('.aq-bid-route__run .aq-bid-route__h2o'), sts = [].slice.call(svg.querySelectorAll('.aq-bid-route__st')),
      drops = [].slice.call(svg.querySelectorAll('.aq-bid-route__drop'));
    var vb = svg.viewBox.baseVal, W = vb.width, L = h2o.getTotalLength(), y = h2o.getPointAtLength(0).y;
    var xs = sts.map(function (g, i) { return W * (i + 0.5) / sts.length });
    var ring = document.createElementNS(NS, 'circle');
    ring.setAttribute('class', 'aq-bid-route__ring'); ring.setAttribute('r', '7'); ring.setAttribute('cy', y); ring.setAttribute('cx', 0);
    svg.appendChild(ring);
    gsap.set(h2o, { strokeDasharray: L, strokeDashoffset: L });
    gsap.set(ring, { autoAlpha: 0 });
    gsap.set(sts, { autoAlpha: 0, y: 10 });
    drops.forEach(function (d) { var l = d.getTotalLength(); gsap.set(d, { strokeDasharray: l, strokeDashoffset: l }) });
    cards.forEach(function (c) { gsap.set(parts(c), { autoAlpha: 0, y: 12 }) });
    var shown = [], st = { p: 0 };
    function arrive(i) {
      if (shown[i]) return; shown[i] = 1;
      gsap.to(sts[i], { autoAlpha: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)', clearProps: 'transform,opacity,visibility' });
      if (drops[i]) gsap.to(drops[i], { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', clearProps: 'stroke-dasharray,stroke-dashoffset' });
      if (cards[i]) gsap.to(parts(cards[i]), { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, delay: 0.2, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
    }
    var tl = gsap.timeline({ paused: true });
    tl.set(ring, { autoAlpha: 1 });
    tl.to(st, { p: 1, duration: 3, ease: 'power1.inOut', onUpdate: function () {
      var x = W * st.p; h2o.style.strokeDashoffset = L * (1 - st.p); ring.setAttribute('cx', x);
      xs.forEach(function (sx, i) { if (x >= sx - 24) arrive(i) });
    } });
    tl.to(ring, { autoAlpha: 0, duration: 0.3 });
    tl.add(function () { xs.forEach(function (sx, i) { arrive(i) }); gsap.set(h2o, { clearProps: 'stroke-dasharray,stroke-dashoffset' }); if (ring.parentNode) ring.parentNode.removeChild(ring) }, '+=0.6');
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
