/* HirePath: the plate opens on the test joint like an aperture (a circular crop from 25 % to 80 % in 850 ms), then its
   dimension hairlines draw and their labels print. The rail is walked by a playhead at one steady tempo: it slides
   down the dry rail and each gate it reaches fills, its number turning flow; at the foot the rail fills. Once,
   under 4 s. Pointing at a step glides the playhead to its gate (0.3 s) and parks it there until the pointer leaves.
   Ported from Subframe Motion "Circular image reveal" (aperture-reveal), MIT, (c) 2026 Subframe: the clip-path circle,
   its 25 % -> 80 % range, 850 ms and cubic-bezier(.22,1,.36,1).
   Ported from Subframe Motion "Score follow" (score-follow), MIT, (c) 2026 Subframe: the playhead's linear sweep at a
   set tempo, the note under it turning the accent, and seeking the head by pointing. */
AQmotion.fx('HirePath', function (root, m) {
  root.querySelectorAll('.aq-hire-path').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) }, P = '.aq-hire-path__';
    var plate = el.querySelector(P + 'plate'), head = el.querySelector(P + 'head'), ol = el.querySelector(P + 'steps'), steps = q(P + 'step');
    var y = function (s) { var g = s.querySelector(P + 'gate'); return ol.offsetTop + s.offsetTop + (g ? g.offsetTop + g.offsetHeight / 2 : 12) - 1 };
    el.classList.add('is-walk');
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })), tempo = 0.55;
    if (plate) tl.fromTo(plate, { clipPath: 'circle(25% at 50% 46%)' }, { clipPath: 'circle(80% at 50% 46%)', duration: 0.85, ease: CustomEaseOr(), clearProps: 'clipPath' }, 0);
    var dl = q(P + 'dl');
    if (dl.length && window.DrawSVGPlugin) tl.fromTo(dl, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, stagger: 0.18, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.6);
    tl.from(q(P + 'lbl text'), { autoAlpha: 0, duration: 0.4, stagger: 0.18, clearProps: 'opacity,visibility' }, 0.9);
    var t0 = 0.4, walk = tempo * Math.max(1, steps.length - 1);
    if (head && steps.length) {
      tl.fromTo(head, { y: function () { return y(steps[0]) } }, { y: function () { return y(steps[steps.length - 1]) }, duration: walk, ease: 'none' }, t0);
      steps.forEach(function (s, i) {
        var ic = s.querySelectorAll(P + 'ic');
        tl.call(function () { s.classList.add('is-on') }, null, t0 + tempo * i);
        if (ic.length) tl.from(ic, { y: -8, autoAlpha: 0, duration: 0.3, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, t0 + tempo * i + 0.1);
      });
      tl.call(function () { el.classList.remove('is-walk'); steps.forEach(function (s) { s.classList.remove('is-on') }); gsap.set(head, { clearProps: 'transform' }) }, null, t0 + walk + 0.35);
    } else tl.call(function () { el.classList.remove('is-walk') }, null, 0);
    m.on(el, function () { tl.play() }, 'top 75%');
    function CustomEaseOr() { return window.CustomEase ? (CustomEase.get('aq-aperture') || CustomEase.create('aq-aperture', '.22,1,.36,1')) : 'power3.out' }
    /* seek: point at a step and the playhead glides to its gate */
    if (!head) return;
    el.addEventListener('pointerover', function (ev) {
      var s = ev.target.closest && ev.target.closest(P + 'step'); if (!s || ev.pointerType === 'touch' || el.classList.contains('is-walk')) return;
      el.classList.add('is-seek'); gsap.to(head, { y: y(s), duration: head.__seen ? 0.3 : 0, ease: 'power2.out', overwrite: true }); head.__seen = 1;
    });
    el.addEventListener('pointerout', function (ev) {
      var s = ev.target.closest && ev.target.closest(P + 'steps'); if (!s || (ev.relatedTarget && s.contains(ev.relatedTarget))) return;
      el.classList.remove('is-seek'); head.__seen = 0;
    });
  });
});
