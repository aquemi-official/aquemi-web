/* CodeIndex: the index is filed. Each row's rule runs across, the huge code slides in from its own edge and decodes
   like a stencil being cut, then the document's name and text rise beside it. Rows follow each other as they come
   into view. One timeline per row, once, under 1.6 s. Hover fills a code faintly (CSS). Compact (default): the chip is
   pressed in like a tab (scale from 0.6) and decodes, then the text rises. */
AQmotion.fx('CodeIndex', function (root, m) {
  root.querySelectorAll('.aq-code-index').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    el.querySelectorAll('.aq-code-index__row').forEach(function (row) {
      var code = row.querySelector('.aq-code-index__code'), text = row.querySelector('.aq-code-index__text'), right = row.classList.contains('is-r'), poster = el.classList.contains('aq-code-index--poster');
      var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
      if (code) {
        if (poster) tl.from(code, { xPercent: right ? 40 : -40, autoAlpha: 0, duration: 1.1, ease: 'power4.out', clearProps: 'transform,opacity,visibility' }, 0);
        else tl.from(code, { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: 'back.out(1.8)', clearProps: 'transform,opacity,visibility' }, 0);
        tl.call(function () { m.scramble(code, 0) }, null, 0.05);
      }
      if (text) tl.from(text.children, { y: 16, autoAlpha: 0, duration: 0.55, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, poster ? 0.35 : 0.15);
      m.on(row, function () { tl.play() }, 'top 88%');
    });
  });
});
