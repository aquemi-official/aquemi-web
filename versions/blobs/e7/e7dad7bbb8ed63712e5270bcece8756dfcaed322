/* FaultKnot: the title lands word by word in both colours at once (the core's word reveal, run here on the heading and
   its clipped twin together so the words stay whole across the split); the frame and grid fade up, the knotted pipe
   inks itself in, the steps rise left to right. Then the page's one scroll-linked story: as the section scrolls
   through the viewport the knot loosens step by step and runs straight at the step that brings the water back, and
   the step in reach lights its number. Readable at every scroll position; no pin; nothing under reduced motion (the
   static knot stands). Pointing at or focusing a step (look file) morphs to that step and returns to the scroll state. */
AQmotion.fx('FaultKnot', function (root, m) {
  root.querySelectorAll('.aq-fault-knot').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var real = el.querySelector('.aq-fault-knot__head > .aq-sec-head .aq-h1'), twin = el.querySelector('.aq-fault-knot__twin .aq-h1');
    var sp = [real, twin].map(function (h) { return h ? m.split(h, { type: 'words', mask: 'words', wordsClass: 'aq-m-word' }) : null });
    var words = [];
    sp.forEach(function (s) { if (!s) return; if (s.masks) s.masks.forEach(function (k) { k.style.paddingBottom = '0.12em'; k.style.marginBottom = '-0.12em' }); words.push(s.words) });
    var leads = [].slice.call(el.querySelectorAll('.aq-fault-knot__head .aq-lead'));
    var frame = el.querySelectorAll('.aq-fault-knot__frame, .aq-fault-knot__grid, .aq-fault-knot__flange');
    var pipe = [].slice.call(el.querySelectorAll('.aq-fault-knot__wall, .aq-fault-knot__bore'));
    var flow = el.querySelector('.aq-fault-knot__flow'), steps = [].slice.call(el.querySelectorAll('.aq-fault-knot__step'));
    var tl = m.tw(gsap.timeline({ paused: true }));
    if (window.CustomEase && !CustomEase.get('aq-word')) CustomEase.create('aq-word', 'M0,0 C0.22,1 0.36,1 1,1');
    if (words.length) {
      var n = words[0].length, gap = n > 1 ? Math.min(0.075, 0.9 / (n - 1)) : 0;
      words.forEach(function (w) { gsap.set(w, { yPercent: 100, autoAlpha: 0 }); tl.to(w, { yPercent: 0, autoAlpha: 1, duration: 0.52, ease: window.CustomEase ? 'aq-word' : 'expo.out', stagger: gap }, 0.05) });
      tl.call(function () { sp.forEach(function (s) { try { if (s) s.revert() } catch (x) {} }) }, null, 0.05 + gap * Math.max(0, n - 1) + 0.6);
    }
    if (leads.length) tl.from(leads, { y: 16, autoAlpha: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.6);
    tl.from(frame, { autoAlpha: 0, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,visibility' }, 0.2);
    if (window.DrawSVGPlugin && pipe.length) {
      tl.fromTo(pipe, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.8, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.35);
      if (flow) tl.from(flow, { autoAlpha: 0, duration: 0.5, clearProps: 'opacity,visibility' }, 1.9);
    }
    tl.from(steps, { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.9);
    m.on(el, function () { tl.play() }, 'top 85%');

    /* scroll story: progress 0..1 across the steps' stages (piecewise between each step's tension) */
    if (!window.fkSet) return;
    var amps = steps.map(function (s) { return +s.getAttribute('data-amp') }), k = amps.length - 1;
    if (k < 1) return;
    var last = -1;
    m.tw(ScrollTrigger.create({
      trigger: el, start: 'top 45%', end: 'bottom 75%',
      onUpdate: function (self) {
        var x = self.progress * k, i = Math.min(k - 1, Math.floor(x)), f = x - i, a = amps[i] + (amps[i + 1] - amps[i]) * f;
        a = Math.round(a * 200) / 200; el._fkRest = a; el._fkStep = Math.min(k, Math.round(x));
        if (el._fkHover || tl.isActive() || a === last) return; last = a;
        el.classList.add('is-scrub'); fkSet(el, null, null);
      }
    }));
  });
});
