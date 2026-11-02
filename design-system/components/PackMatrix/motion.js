/* PackMatrix: the packs are dealt onto the matrix in a diagonal sweep (client by period), then one is pulled out of
   its slot and turns navy, the leader runs from it to the sheet, the sheet opens from the left under its strip and the
   documents are laid in, numerals rolling up. One timeline, once on scroll-in, under 4 s. Folded documents (phones)
   are left alone. */
AQmotion.fx('PackMatrix', function (root, m) {
  root.querySelectorAll('.aq-pack-matrix').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var pks = [].slice.call(el.querySelectorAll('.aq-pack-matrix__pk')), open = el.querySelector('.aq-pack-matrix__pk.is-open');
    tl.from(pks, { scale: 0.4, autoAlpha: 0, duration: 0.45, ease: 'back.out(1.8)', stagger: { each: 0.035, from: 'start', grid: 'auto' }, clearProps: 'transform,opacity,visibility' }, 0);
    if (open) tl.fromTo(open, { backgroundColor: 'transparent' }, { backgroundColor: getComputedStyle(open).backgroundColor, duration: 0.4, clearProps: 'backgroundColor' }, 0.75);
    tl.from(el.querySelectorAll('.aq-pack-matrix__ax'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.3);
    var lead = el.querySelector('.aq-pack-matrix__lead');
    if (lead && lead.offsetParent !== null) tl.from(lead, { scaleX: 0, duration: 0.6, ease: 'power2.inOut', clearProps: 'transform' }, 1.0);
    tl.fromTo(el.querySelector('.aq-pack-matrix__sheet'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clipPath' }, 1.3);
    var docs = [].filter.call(el.querySelectorAll('.aq-pack-matrix__doc'), function (d) { return d.offsetParent !== null });
    docs.forEach(function (d, i) {
      var at = 1.7 + i * 0.12;
      tl.from(d.querySelector('.aq-pack-matrix__n'), { yPercent: 70, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, at);
      tl.from(d.querySelectorAll('.aq-pack-matrix__t, .aq-pack-matrix__d'), { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, at + 0.1);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
