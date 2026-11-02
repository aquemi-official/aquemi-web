/* ApprovalMerge: the intro's figure counts up; the lanes run down the rows; each request rises with its node landing
   on its lane, and its wire runs right to the bus; the bus fills down and the one approval stamp strikes last. One
   timeline, once, about 3 s. Phones: rows rise in order, the stamps strike. Hover lights a row's wire (CSS) and, after
   the entrance, traces its route to the approval: an ink beam runs the wire, then the bus to the stamp, which answers
   with a small press; leaving fades the trace a third faster.
   Trace ported from Subframe Motion "Animated beam connections" (animated-beam), MIT, (c) 2026 Subframe */
AQmotion.fx('ApprovalMerge', function (root, m) {
  root.querySelectorAll('.aq-approval-merge').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var sec = el.closest('.aq-section'), fig = sec && sec.querySelector('.aq-approval-merge__fig');
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) }, tl = m.tw(gsap.timeline({ paused: true })), nar = m.narrow();
    var rows = q('.aq-approval-merge__row');
    if (fig) { var n = +fig.textContent, o = { v: 0 }; tl.to(o, { v: n, duration: 1.4, ease: 'power2.out', onUpdate: function () { fig.textContent = Math.round(o.v) }, onComplete: function () { fig.textContent = n } }, 0) }
    tl.from(q('.aq-approval-merge__track'), { scaleY: 0, transformOrigin: '50% 0%', duration: 0.5, stagger: 0.03, ease: 'none', clearProps: 'transform' }, 0.1);
    rows.forEach(function (r, i) {
      var at = 0.2 + i * 0.2;
      tl.from(r.querySelectorAll('.aq-index, .aq-approval-merge__t'), { y: 14, autoAlpha: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at);
      tl.from(r.querySelector('.aq-approval-merge__node'), { scale: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform' }, at + 0.15);
      tl.from(r.querySelectorAll('.aq-approval-merge__who, .aq-approval-merge__det'), { autoAlpha: 0, duration: 0.35, clearProps: 'opacity,visibility' }, at + 0.25);
      if (!nar) tl.from(r.querySelector('.aq-approval-merge__wire'), { scaleX: 0, duration: 0.5, ease: 'power2.inOut', clearProps: 'transform' }, at + 0.3);
      else tl.from(r.querySelector('.aq-approval-merge__stamp'), { scale: 1.3, autoAlpha: 0, duration: 0.3, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at + 0.3);
    });
    var tb = 0.2 + rows.length * 0.2 + 0.3;
    var bl = el.querySelector('.aq-approval-merge__busline'), big = el.querySelector('.aq-approval-merge__big');
    if (bl && !nar) tl.from(bl, { scaleY: 0, duration: 0.6, ease: 'power2.inOut', clearProps: 'transform' }, tb - 0.6);
    if (big && !nar) tl.from(big, { autoAlpha: 0, scale: 1.25, rotation: -4, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, tb);
    var done = nar; tl.eventCallback('onComplete', function () { done = true });
    m.on(el, function () { tl.play() }, 'top 75%');
    var bus = el.querySelector('.aq-approval-merge__bus'), bl2 = el.querySelector('.aq-approval-merge__buslit');
    if (nar || !bus || !bl2 || !big) return;
    rows.forEach(function (r) {
      var lit = r.querySelector('.aq-approval-merge__lit'), w = r.querySelector('.aq-approval-merge__wire');
      r.addEventListener('pointerenter', function (ev) {
        if (!done || ev.pointerType !== 'mouse' || !lit) return;
        var B = bus.getBoundingClientRect(), y = w.getBoundingClientRect().top - B.top, G = big.getBoundingClientRect(), sy = G.top + G.height / 2 - B.top, up = sy < y;
        gsap.set(bl2, { top: Math.min(y, sy), height: Math.abs(sy - y), transformOrigin: up ? '50% 100%' : '50% 0', opacity: 1, scaleY: 0 });
        gsap.fromTo(lit, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.2, ease: 'power2.in', overwrite: true });
        gsap.to(bl2, { scaleY: 1, duration: 0.18, delay: 0.2, ease: 'power2.out', overwrite: true });
        gsap.fromTo(big, { scale: 1 }, { scale: 0.97, duration: 0.09, delay: 0.38, yoyo: true, repeat: 1, ease: 'power2.out', overwrite: true, clearProps: 'transform' });
      });
      r.addEventListener('pointerleave', function () {
        if (!done || !lit) return;
        gsap.to(lit, { opacity: 0, duration: 0.13, overwrite: true, onComplete: function () { gsap.set(lit, { scaleX: 0, opacity: 1 }) } });
        gsap.to(bl2, { opacity: 0, duration: 0.13, overwrite: true, onComplete: function () { gsap.set(bl2, { scaleY: 0, opacity: 1 }) } });
      });
    });
  });
});
