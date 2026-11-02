/* TermsSheet: the terms are ruled in while the skid is drawn beside them. The head rule draws across from the left,
   then row by row (0.09 s apart) the number and the term rise 8 px and the values follow. The skid
   builds the IsoKit way (window.AQiso.timeline: parts draw back to front, the pipe, then the water runs to the tank)
   starting with the table. One timeline each, once, under 4 s. Pointing at a row lights its number (CSS). */
AQmotion.fx('TermsSheet', function (root, m) {
  root.querySelectorAll('.aq-terms-sheet').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var head = el.querySelector('.aq-terms-sheet__head'), rows = [].slice.call(el.querySelectorAll('.aq-terms-sheet__row')).filter(function (r) { return r.offsetHeight > 0 });
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (head) tl.from(head, { clipPath: 'inset(0 100% 0 0)', duration: 0.6, ease: 'power2.inOut', clearProps: 'clipPath' }, 0);
    rows.forEach(function (r, i) {
      var at = 0.25 + i * 0.09, lead = r.querySelectorAll('.aq-terms-sheet__n, .aq-terms-sheet__t'), rest = r.querySelectorAll('.aq-terms-sheet__v, .aq-terms-sheet__m, .aq-terms-sheet__note p, .aq-terms-sheet__go');
      if (lead.length) tl.from(lead, { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.05, clearProps: 'transform,opacity,visibility' }, at);
      if (rest.length) tl.from(rest, { y: 8, autoAlpha: 0, duration: 0.45, clearProps: 'transform,opacity,visibility' }, at + 0.1);
    });
    var svg = el.querySelector('.aq-terms-sheet__svg'), it = svg && window.AQiso && AQiso.timeline ? AQiso.timeline(svg, m, { draw: 1.6, pipe: 0.7, flow: 1.0 }) : null;
    m.on(el, function () { tl.play(); if (it) it.play() }, 'top 80%');
  });
});
