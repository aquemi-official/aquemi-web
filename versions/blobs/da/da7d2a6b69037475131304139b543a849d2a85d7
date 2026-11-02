/* RoleLoop: the loop is filled once. The twin wall draws round the cards, then the water runs the loop at one steady
   rate, like a playhead at a set tempo; as it passes a role's branch that bay lights for a beat, the branch shows
   (water to the valve, or through it when the role's copy says open) and the role's card prints in. Once, under 4.5 s.
   Pointing at a role fills its bay with water from end to end (0.4 s), the bay fading out a third faster (CSS).
   Ported from Subframe Motion "Score follow" (score-follow), MIT, (c) 2026 Subframe: the playhead's linear sweep at a
   fixed tempo and the current note turning the accent colour became the water front and the bay it is passing. */
AQmotion.fx('RoleLoop', function (root, m) {
  root.querySelectorAll('.aq-role-loop').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) }, P = '.aq-role-loop__';
    el.classList.add('is-pre');
    m.on(el, function () {
      if (window.AQroleLoop) AQroleLoop.lay(el);
      var cards = q(P + 'bay'), run = 2.6, t0 = 0.7, D = window.DrawSVGPlugin, pipe = q(P + 'wall, ' + P + 'bore'), water = el.querySelector(P + 'water');
      var tl = m.tw(gsap.timeline({ defaults: { ease: 'power3.out' } }));
      gsap.set(cards, { autoAlpha: 0 });
      el.classList.remove('is-pre');
      if (D) {
        tl.fromTo(pipe, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0)
          .fromTo(water, { drawSVG: '0%' }, { drawSVG: '100%', duration: run, ease: 'none', clearProps: 'strokeDasharray,strokeDashoffset' }, t0);
      }
      cards.forEach(function (c) {
        var at = t0 + run * (parseFloat(c.getAttribute('data-at')) || 0), i = c.getAttribute('data-i');
        var parts = q(P + 'seg[data-i="' + i + '"], ' + P + 'stub[data-i="' + i + '"]'), stub = el.querySelector(P + 'stub[data-i="' + i + '"]');
        if (stub) {
          tl.fromTo(stub, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, clearProps: 'opacity,visibility' }, Math.max(0, at - 0.2));
          var sq = stub.querySelector(P + 'sq');
          if (D && sq && getComputedStyle(sq).display !== 'none') tl.fromTo(sq, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.35, ease: 'none', clearProps: 'strokeDasharray,strokeDashoffset' }, at);
        }
        tl.call(function () { parts.forEach(function (x) { x.classList.add('is-lit') }); c.classList.add('is-lit') }, null, at)
          .call(function () { if (c.matches(':hover')) return; parts.forEach(function (x) { x.classList.remove('is-lit') }); c.classList.remove('is-lit') }, null, at + 0.7)
          .fromTo(c, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.55, clearProps: 'transform,opacity,visibility' }, at + 0.05);
      });
    }, 'top 75%');
    if (!window.DrawSVGPlugin) return;
    el.addEventListener('pointerover', function (ev) {
      var c = ev.target.closest && ev.target.closest(P + 'bay'); if (!c || ev.pointerType === 'touch' || c.__rlIn) return; c.__rlIn = 1;
      var s = el.querySelector(P + 'seg[data-i="' + c.getAttribute('data-i') + '"]');
      if (s) gsap.fromTo(s, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, ease: 'power3.out', overwrite: true });
    });
    el.addEventListener('pointerout', function (ev) {
      var c = ev.target.closest && ev.target.closest(P + 'bay'); if (!c || (ev.relatedTarget && c.contains(ev.relatedTarget))) return; c.__rlIn = 0;
    });
  });
});
