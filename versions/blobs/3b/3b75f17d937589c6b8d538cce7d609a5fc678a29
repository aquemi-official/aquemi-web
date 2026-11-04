/* LimitDrawer: the folders come up out of the drawer, then their slips.
   Ported from Subframe Motion "Folder open animation" (archive-folder), MIT, (c) 2026 Subframe. Kept: the paper coming
   out of the folder on the library's document curve (cubic-bezier(.22,1,.36,1), 480 ms) with a short stagger;
   pointing at a folder lifts its tab and draws its slip a step out (CSS, 240 ms, the same curve), settling back on
   leave. Entry: folders rise row by row (left to right), each tab a beat before its body, then the slip slides up out
   of the folder to its resting angle. Once; reduced motion: the drawer as drawn. */
AQmotion.fx('LimitDrawer', function (root, m) {
  root.querySelectorAll('.aq-limit-drawer').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var ease = window.CustomEase ? (CustomEase.get('aq-relief') || CustomEase.create('aq-relief', 'M0,0 C0.22,1 0.36,1 1,1')) : 'power3.out';
    [].slice.call(el.querySelectorAll('.aq-limit-drawer__f')).forEach(function (f, i) {
      var tab = f.querySelector('.aq-limit-drawer__tab'), body = f.querySelector('.aq-limit-drawer__body'), slip = f.querySelector('.aq-limit-drawer__slip');
      gsap.set([tab, body].filter(Boolean), { autoAlpha: 0, y: 28 }); if (slip) gsap.set(slip, { autoAlpha: 0, y: 18 });
      m.on(f, function () {
        var tl = m.tw(gsap.timeline({ delay: (i % 3) * 0.08 }));
        if (tab) tl.to(tab, { autoAlpha: 1, y: 0, duration: 0.48, ease: ease, clearProps: 'transform,opacity,visibility' }, 0);
        if (body) tl.to(body, { autoAlpha: 1, y: 0, duration: 0.48, ease: ease, clearProps: 'transform,opacity,visibility' }, 0.06);
        if (slip) tl.to(slip, { autoAlpha: 1, y: 0, duration: 0.48, ease: ease, clearProps: 'transform,opacity,visibility' }, 0.3);
      }, 'top 90%');
    });
  });
});
