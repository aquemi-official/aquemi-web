/* OnboardingFan: the folder opens and the papers fan out of it, then each status slot is stamped.
   Wide: the folder settles (12 px), the papers start as one squared stack in the middle of the folder (each 3 px
   higher than the last, as filed) and fan out to their places, 0.05 s apart, in 480 ms on cubic-bezier(.22,1,.36,1);
   the tabs' codes print, then each stamp slot presses down from 1.22x scale and 60 % opacity in 180 ms.
   Phones: the tab tops fan out above the folder lip and the rows print down (8 px rise), stamps pressed in turn.
   Once on scroll-in, under 2.5 s. Nothing under reduced motion: the fan is complete.
   The fan: ported from Subframe Motion "Archive folder" (archive-folder), MIT, (c) 2026 Subframe (kept: the documents
   held as a stack with a 3 px step, fanned out by translate and rotate from the bottom centre in 480 ms on
   cubic-bezier(.22,1,.36,1); replaced: the three prints with the block's papers, the cover's rotateX with the folder
   settling). The stamp: Subframe Motion "Activity stamp" (activity-stamp), MIT, (c) 2026 Subframe (kept: the mark
   pressed from 1.22x and 60 % opacity to full size in 180 ms; replaced: the day grid with the papers' status slots). */
AQmotion.fx('OnboardingFan', function (root, m) {
  root.querySelectorAll('.aq-onboarding-fan').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    /* aq-word (motion core) is cubic-bezier(.22,1,.36,1), the example's ease */
    var fanEase = window.CustomEase && CustomEase.get('aq-word') ? 'aq-word' : 'expo.out';
    /* set up: every stamp slot stays blank until it is pressed; the folder, papers and tab tops wait at opacity 0
       (opacity, not visibility, so the papers' links stay in the tab order before the fan plays) */
    var papers = q('.aq-onboarding-fan__paper'), stamps = q('.aq-onboarding-fan__stamp');
    var parts = q('.aq-onboarding-fan__back, .aq-onboarding-fan__front, .aq-onboarding-fan__crown i');
    gsap.set(stamps, { autoAlpha: 0 }); gsap.set(parts.concat(papers), { opacity: 0 });
    /* the branch (phone rows or wide fan) and each paper's way to the stack are measured when the fan plays, so a
       container that crossed 640 px after set-up (a rotated tablet, a resized window) plays its own branch */
    m.on(el, function () {
      el.classList.add('is-fanning');
      gsap.set(parts.concat(papers), { clearProps: 'opacity' });
      var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' }, onComplete: function () { el.classList.remove('is-fanning') } }));
      var folder = q('.aq-onboarding-fan__back, .aq-onboarding-fan__front').filter(function (f) { return f.offsetWidth > 0 });
      if (folder.length) tl.from(folder, { y: 12, autoAlpha: 0, duration: 0.45, clearProps: 'transform,opacity,visibility' }, 0);
      var press = function (s, at) { tl.fromTo(s, { scale: 1.22, autoAlpha: 0.6 }, { scale: 1, autoAlpha: 1, duration: 0.18, immediateRender: false, clearProps: 'transform,opacity,visibility' }, at) };
      var crown = q('.aq-onboarding-fan__crown i').filter(function (c) { return c.offsetWidth > 0 });
      if (crown.length) {
        /* phones: the tab tops fan out of the folder, the rows print */
        tl.from(crown, { y: 20, rotation: 0, duration: 0.48, stagger: 0.04, ease: fanEase, clearProps: 'transform' }, 0.15);
        tl.from(papers, { y: 8, autoAlpha: 0, duration: 0.4, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0.3);
        stamps.forEach(function (s, i) { press(s, 0.55 + i * 0.06) });
      } else {
        /* wide: a squared stack in the middle of the folder fans out */
        var box = el.getBoundingClientRect(), cx = box.left + box.width / 2;
        papers.forEach(function (p, i) {
          var r = p.getBoundingClientRect(), dx = cx - (r.left + r.width / 2);
          tl.from(p, { x: dx, y: 40 - i * 3, rotation: (i % 2 ? 1 : -1) * 0.6, duration: 0.48, ease: fanEase, clearProps: 'transform' }, 0.3 + i * 0.05);
        });
        var codes = q('.aq-onboarding-fan__code');
        if (codes.length) tl.from(codes, { autoAlpha: 0, duration: 0.3, stagger: 0.04, clearProps: 'opacity,visibility' }, 0.75);
        stamps.forEach(function (s, i) { press(s, 1.0 + i * 0.07) });
      }
      tl.play();
    }, 'top 75%');
  });
});
