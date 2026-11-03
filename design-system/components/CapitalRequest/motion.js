/* CapitalRequest: the form fills itself in. The sheet is laid down, then field by field (0.4 s apart) the number box
   lands, the label types in behind a steel-blue caret, the typed text settles on the line, the field line rules in,
   the references stamp into the margin and the Attach link comes up. One timeline, once, about 2.8 s for 4 fields.
   Caret typing ported from Subframe Motion "Editing caret" (editing-caret), MIT, (c) 2026 Subframe: characters land
   on a stepped clock (here 34 ms a character, the label at most 0.7 s) with the caret riding the end of the string,
   then the caret blinks once and goes. Its reduced-motion branch (the finished text at once) is the core's: nothing
   here runs under prefers-reduced-motion, and the CSS default is the filled form. */
AQmotion.fx('CapitalRequest', function (root, m) {
  root.querySelectorAll('.aq-capital-request').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var sheet = el.querySelector('.aq-capital-request__sheet'), title = el.querySelector('.aq-capital-request__title'),
      fields = [].slice.call(el.querySelectorAll('.aq-capital-request__field')), prev = null;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (sheet) tl.from(sheet, { y: 24, autoAlpha: 0, duration: 0.7, clearProps: 'transform,opacity,visibility' }, 0);
    if (title) tl.from(title, { y: 8, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, 0.2);
    fields.forEach(function (f, i) {
      var at = 0.4 + i * 0.4, n = f.querySelector('.aq-capital-request__n'), type = f.querySelector('.aq-capital-request__type'),
        caret = f.querySelector('.aq-capital-request__caret'), d = f.querySelector('.aq-capital-request__d'),
        rule = f.querySelector('.aq-capital-request__rule'), codes = f.querySelectorAll('.aq-capital-request__code'),
        go = f.querySelector('.aq-capital-request__attach');
      if (n) tl.from(n, { scale: 0.85, autoAlpha: 0, duration: 0.3, clearProps: 'transform,opacity,visibility' }, at);
      if (type) {
        var chars = Math.max(1, (type.textContent || '').length), dur = Math.min(0.7, chars * 0.034),
          one = type.getBoundingClientRect().height < 40, w = type.offsetWidth;
        tl.fromTo(type, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: dur, ease: 'steps(' + chars + ')', clearProps: 'clipPath' }, at + 0.1);
        if (caret && one) {
          /* the caret is display:none at rest (the finished form has none); it shows only while it types */
          /* one caret at a time: the next field's typing retires the previous caret (one person filling the form) */
          if (prev) tl.set(prev, { clearProps: 'display,transform,opacity' }, at + 0.1);
          tl.set(caret, { display: 'block', opacity: 1, x: 0 }, at + 0.1)
            .to(caret, { x: w + 2, duration: dur, ease: 'steps(' + chars + ')' }, at + 0.1)
            .to(caret, { opacity: 0, duration: 0.01 }, at + 0.1 + dur + 0.18)
            .to(caret, { opacity: 1, duration: 0.01 }, at + 0.1 + dur + 0.36)
            .to(caret, { opacity: 0, duration: 0.15 }, at + 0.1 + dur + 0.54)
            .set(caret, { clearProps: 'display,transform,opacity' }, at + 0.1 + dur + 0.7);
          prev = caret;
        }
      }
      if (d) tl.from(d, { y: 8, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, at + 0.35);
      if (rule) tl.from(rule, { scaleX: 0, duration: 0.6, ease: 'power2.inOut', clearProps: 'transform' }, at + 0.25);
      if (codes.length) tl.from(codes, { scale: 1.25, rotation: -4, autoAlpha: 0, duration: 0.35, ease: 'power4.out', stagger: 0.12, clearProps: 'transform,opacity,visibility' }, at + 0.5);
      if (go) tl.from(go, { x: -6, autoAlpha: 0, duration: 0.4, clearProps: 'transform,opacity,visibility' }, at + 0.6);
    });
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
