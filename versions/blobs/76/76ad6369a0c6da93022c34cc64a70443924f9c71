/* ContractFolders: each folder opens and its sheet comes up out of it.
   Ported from Subframe Motion "Archive folder" (archive-folder), MIT, (c) 2026 Subframe
   (kept: the documents fan up and out of the folder with a slight rotation over 480 ms and the cover moves over 420 ms,
   both strongly eased out; reduced motion shows the open pose at once; replaced: the click with the folder scrolling
   into view, the three prints with the folder's one sheet and its index tabs, the 46 degree cover fold with the
   folder rising 12 px; hover keeps the fan as CSS: the sheet lifts 4 px and the tabs spread).
   Entrance, once per folder (0.15 s apart on desktop): the folder rises 12 px and fades in (0.42 s), the sheet comes up
   16 px from a 1.5 degree tilt (0.48 s), the items land 0.05 s apart, the tabs slide out of the sheet's edge, the
   signature line draws and the pen settles onto it; the link row fades in last. Under 2 s a folder. */
AQmotion.fx('ContractFolders', function (root, m) {
  root.querySelectorAll('.aq-contract-folders').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var strong = window.CustomEase ? (CustomEase.get('aq-fold-out') || CustomEase.create('aq-fold-out', 'M0,0 C0.16,1 0.3,1 1,1')) : 'expo.out';
    var fs = el.querySelectorAll('.aq-contract-folders__f'), narrow = m.narrow();
    var all = narrow ? null : m.tw(gsap.timeline({ paused: true }));
    [].forEach.call(fs, function (f, i) {
      var tl = all || m.tw(gsap.timeline({ paused: true })), t = all ? i * 0.15 : 0;
      var q = function (s) { return f.querySelector(s) }, qa = function (s) { return f.querySelectorAll(s) };
      var folder = q('.aq-contract-folders__folder'), sheet = q('.aq-contract-folders__sheet'), items = qa('.aq-contract-folders__items li'),
        ix = qa('.aq-contract-folders__ix'), sl = q('.aq-contract-folders__sl'), pen = q('.aq-contract-folders__pen'), go = q('.aq-contract-folders__go'), m2 = q('.aq-contract-folders__m');
      tl.from(folder, { y: 12, autoAlpha: 0, duration: 0.42, ease: strong, clearProps: 'transform,opacity,visibility' }, t);
      if (sheet) tl.from(sheet, { y: 16, rotation: -1.5, transformOrigin: '0% 100%', autoAlpha: 0, duration: 0.48, ease: strong, clearProps: 'transform,opacity,visibility' }, t + 0.18);
      if (items.length) tl.from(items, { y: 6, autoAlpha: 0, duration: 0.35, ease: 'power3.out', stagger: 0.05, clearProps: 'transform,opacity,visibility' }, t + 0.4);
      if (ix.length && !narrow) tl.from(ix, { xPercent: -100, autoAlpha: 0, duration: 0.3, ease: 'power3.out', stagger: 0.05, clearProps: 'transform,opacity,visibility' }, t + 0.55);
      if (m2) tl.from(m2, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, t + 0.8);
      if (sl) tl.from(sl, { scaleX: 0, transformOrigin: '0% 50%', duration: 0.45, ease: 'power2.inOut', clearProps: 'transform' }, t + 0.85);
      if (pen) tl.from(pen, { x: 24, y: -10, autoAlpha: 0, duration: 0.5, ease: strong, clearProps: 'transform,opacity,visibility' }, t + 1.0);
      if (go) tl.from(go, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, t + 0.9);
      if (!all) m.on(f, function () { tl.play() }, 'top 85%');
    });
    if (all) m.on(el, function () { all.play() }, 'top 80%');
  });
});
