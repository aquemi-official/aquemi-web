/* LimitFolders: the drawer opens and the folders stand up in it, then each slip comes up out of its folder.
   Ported from Subframe Motion "Folder open animation" (archive-folder), MIT, (c) 2026 Subframe. Kept: the paper coming
   out of the folder on the library's document curve (cubic-bezier(.22,1,.36,1), 480 ms) with a short stagger; pointing
   at a folder lifts its tab and draws its slip a step out (CSS, 240 ms, the same curve). Entry: the rail settles, the
   folders rise left to right (each back leaf and tab a beat before its front leaf), then the slips slide up to their
   resting angle. Once, under 2 s; reduced motion: the drawer as drawn. */
AQmotion.fx('LimitFolders', function (root, m) {
  var CLEAR = 'transform,opacity,visibility';
  root.querySelectorAll('.aq-limit-folders').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var ease = window.CustomEase ? (CustomEase.get('aq-relief') || CustomEase.create('aq-relief', 'M0,0 C0.22,1 0.36,1 1,1')) : 'power3.out';
    var folders = [].slice.call(el.querySelectorAll('.aq-limit-folders__f')), rail = el.querySelector('.aq-limit-folders__rail');
    var tl = m.tw(gsap.timeline({ paused: true }));
    if (rail) tl.fromTo(rail, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: ease, clearProps: CLEAR }, 0);
    folders.forEach(function (f, i) {
      var t = 0.08 + i * 0.08, tab = f.querySelector('.aq-limit-folders__tab'), front = f.querySelector('.aq-limit-folders__front'), slip = f.querySelector('.aq-limit-folders__slip');
      tl.fromTo(f, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.48, ease: ease, clearProps: CLEAR }, t);
      if (front) tl.fromTo(front, { y: 10 }, { y: 0, duration: 0.48, ease: ease, clearProps: 'transform' }, t + 0.06);
      if (slip) tl.fromTo(slip, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.48, ease: ease, clearProps: CLEAR }, t + 0.3);
      if (tab) tl.fromTo(tab, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out', clearProps: 'opacity,visibility' }, t);
    });
    m.on(el, function () { tl.play() }, 'top 85%');
  });
});
