/* PlanSheets: the sheets are dealt onto the navy one after another (each column rises as one sheet, its fields
   printing top to bottom), the sheet numbers count in and the row labels follow down the left. One timeline, once,
   about 2 s. Phones: the shown sheet prints top to bottom. Row hover is CSS. */
AQmotion.fx('PlanSheets', function (root, m) {
  root.querySelectorAll('.aq-plan-sheets').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s) { return [].slice.call(el.querySelectorAll(s)).filter(function (x) { return !x.closest('.aq-fold-x') }) };
    var n = +getComputedStyle(el).getPropertyValue('--n') || 4, tl = m.tw(gsap.timeline({ paused: true }));
    if (m.narrow()) {
      var cells = qa('.aq-plan-sheets__c').filter(function (c) { return c.offsetParent });
      tl.from(cells, { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0);
    } else {
      for (var j = 1; j <= n; j++) {
        var col = qa('.aq-plan-sheets__c.t' + j), at = (j - 1) * 0.16;
        if (!col.length) continue;
        tl.from(col, { y: 28, duration: 0.7, ease: 'power3.out', clearProps: 'transform' }, at);
        tl.from(col, { autoAlpha: 0, duration: 0.4, stagger: 0.035, clearProps: 'opacity,visibility' }, at);
      }
      tl.from(qa('.aq-plan-sheets__label'), { x: -12, autoAlpha: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.3);
      tl.from(qa('.aq-plan-sheets__scale'), { scaleX: 0, transformOrigin: '0 50%', duration: 0.8, stagger: 0.16, ease: 'power2.inOut', clearProps: 'transform' }, 0.1);
    }
    qa('.aq-plan-sheets__no').forEach(function (no, i) { var t = no.textContent; tl.call(function () { m.scramble(no, 0) }, null, 0.2 + i * 0.16) });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
