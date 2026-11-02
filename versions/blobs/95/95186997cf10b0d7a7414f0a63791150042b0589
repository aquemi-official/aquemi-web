/* PdfAnatomy: the document opens. The viewer frame draws, the pages fan out from under the front page, the text
   prints down the page, the search hit and the current bookmark light, the footer boxes light page by page; then each
   leader runs out from its part to its callout and the callout slides in. The other rows rule in beside it, their
   signature lines drawn left to right. One timeline, once, under 3.5 s. */
AQmotion.fx('PdfAnatomy', function (root, m) {
  root.querySelectorAll('.aq-pdf-anatomy').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) }, one = function (s) { return el.querySelector(s) };
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var win = one('.aq-pdf-anatomy__win'), backs = q('.aq-pdf-anatomy__stack .aq-pdf-anatomy__page'), front = one('.aq-pdf-anatomy__front');
    if (win && window.DrawSVGPlugin) tl.from(win, { drawSVG: '0%', duration: 0.8, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
    if (front) tl.from(front, { y: 24, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, 0.3);
    var stack = one('.aq-pdf-anatomy__stack'); if (stack) tl.from(stack, { x: -28, y: 16, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, 0.55);
    var txt = q('.aq-pdf-anatomy__front .aq-pdf-anatomy__txt'); if (txt.length && window.DrawSVGPlugin) tl.from(txt, { drawSVG: '0%', duration: 0.25, stagger: 0.03, ease: 'none', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.6);
    tl.from(q('.aq-pdf-anatomy__hit, .aq-pdf-anatomy__cur, .aq-pdf-anatomy__field'), { autoAlpha: 0, duration: 0.35, stagger: 0.12, clearProps: 'opacity,visibility' }, 1.1);
    var boxes = q('.aq-pdf-anatomy__box'); if (boxes.length) tl.from(boxes, { autoAlpha: 0, duration: 0.25, stagger: 0.07, clearProps: 'opacity,visibility' }, 1.2);
    q('.aq-pdf-anatomy__lead').forEach(function (g, i) {
      var ln = g.querySelector('.aq-pdf-anatomy__leader'), dot = g.querySelector('.aq-pdf-anatomy__dot'), call = one('.aq-pdf-anatomy__call[data-c="' + g.getAttribute('data-c') + '"]'), t = 1.6 + i * 0.3;
      if (dot) tl.from(dot, { scale: 0, transformOrigin: '50% 50%', duration: 0.3, ease: 'power3.out', clearProps: 'transform' }, t);
      if (ln && window.DrawSVGPlugin) tl.from(ln, { drawSVG: '0%', duration: 0.5, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, t + 0.1);
      if (call && !m.narrow()) tl.from(call, { x: 16, autoAlpha: 0, duration: 0.45, clearProps: 'transform,opacity,visibility' }, t + 0.45);
    });
    if (m.narrow()) { var calls = q('.aq-pdf-anatomy__call, .aq-pdf-anatomy__pin'); if (calls.length) tl.from(calls, { autoAlpha: 0, y: 8, duration: 0.4, stagger: 0.1, clearProps: 'transform,opacity,visibility' }, 1.7) }
    var rows = q('.aq-pdf-anatomy__row'); if (rows.length) tl.from(rows, { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.15, clearProps: 'transform,opacity,visibility' }, 0.4);
    var sl = q('.aq-pdf-anatomy__sl'); if (sl.length) tl.from(sl, { clipPath: 'inset(0 100% 0 0)', duration: 0.5, stagger: 0.12, ease: 'power2.inOut', clearProps: 'clipPath' }, 0.9);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
