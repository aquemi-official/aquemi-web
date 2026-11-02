/* AuditSkid: the system is drawn through the IsoKit choreography (equipment back to front, pipes laid, the water run
   once from the generation rack to the point of use), the pins come in on their parts with the pipes, then each
   document is pinned: its leader draws from the pin out to the callout and the callout rises in as the leader arrives,
   0.12 s apart, left side then right. Once on scroll-in, under 5 s; at the end the first document is selected (ring on
   its pin) without quieting the others. Selection itself lives in the look (hover, focus, click; CSS 0.25 s glide).
   Nothing under reduced motion: drawing, pins, leaders and callouts are complete. */
AQmotion.fx('AuditSkid', function (root, m) {
  root.querySelectorAll('.aq-audit-skid').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('svg.aq-iso'), D = window.DrawSVGPlugin;
    var pins = el.querySelectorAll('.aq-audit-skid__pin');
    var docs = [].filter.call(el.querySelectorAll('.aq-audit-skid__doc'), function (d) { return d.offsetParent !== null });
    var tl = window.AQiso && AQiso.timeline(svg, m, { draw: 1.4, pipe: 0.7, flow: 1.4 });
    if (!tl) return;
    tl.from(pins, { scale: 0.6, autoAlpha: 0, duration: 0.35, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 'pipes');
    gsap.set(docs, { autoAlpha: 0 });
    tl.call(function () {
      var leads = el.querySelector('.aq-audit-skid__leads'), shown = leads && getComputedStyle(leads).display !== 'none';
      docs.forEach(function (d, i) {
        var p = shown && leads.querySelector('.aq-audit-skid__lead[data-i="' + d.getAttribute('data-i') + '"]'), at = i * 0.12;
        if (p && D) m.tw(gsap.fromTo(p, { drawSVG: '100% 100%' }, { drawSVG: '0% 100%', duration: 0.6, delay: at, ease: 'power3.out', clearProps: 'strokeDasharray,strokeDashoffset' }));
        m.tw(gsap.fromTo(d, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45, delay: at + 0.35, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }));
      });
      m.tw(gsap.delayedCall(docs.length * 0.12 + 0.9, function () {
        if (window.AQauditSkid && !el.querySelector('.aq-audit-skid__doc.is-on') && docs[0]) { AQauditSkid.show(el, docs[0]); el.classList.remove('is-pointing') }
      }));
    }, null, 'flow');
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
