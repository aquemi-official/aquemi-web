/* GateLine: the water runs the pipe step by step. Every gate starts shut (filled bowtie); as the water reaches a joint
   the gate opens (fill clears, the handwheel turns) and the next run fills. At the gate after a hold step the water
   waits: that step's hold stamp strikes and the gate's "Hold" tag lands, then the gate opens. The shutdown step's run
   stays dry: its dashed bore and label print while the water stands, and the water picks up again after it. Each
   step's number, name and line rise as its run fills. One timeline, once, about 4 s. Phones: the same per step as
   each scrolls in, the water running down.
   Hover (mouse, after the entrance): a step seeks the water to it, the runs ahead drain and their gates shut, nearest
   first; leaving the pipe refills it. */
/* Seek ported from Subframe Motion "Chapter timeline scrubber" (cue-scrubber), MIT, (c) 2026 Subframe */
AQmotion.fx('GateLine', function (root, m) {
  root.querySelectorAll('.aq-gate-line').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var steps = [].slice.call(el.querySelectorAll('.aq-gate-line__step')), nar = m.narrow(), per = 0.45, done = false;
    var G = function (s, sel) { return s.querySelector(sel) };
    var sc = nar ? 'scaleY' : 'scaleX';
    function gateOpen(tl, s, at) {
      var g = G(s, '.aq-gate-line__gate'); if (!g) return;
      tl.fromTo(G(g, '.aq-gate-line__vfill'), { fillOpacity: 1 }, { fillOpacity: 0, duration: 0.25, ease: 'power2.out', clearProps: 'fillOpacity' }, at);
      tl.fromTo(G(g, '.aq-gate-line__vh'), { rotation: -90 }, { rotation: 0, duration: 0.3, ease: 'power2.inOut', clearProps: 'transform' }, at);
    }
    function stepIn(tl, s, i, at) {
      var w = G(s, '.aq-gate-line__water'), dry = G(s, '.aq-gate-line__dry'), prev = steps[i - 1];
      if (prev && prev.classList.contains('is-hold')) {
        var hs = G(prev, '.aq-gate-line__hold'), gk = G(s, '.aq-gate-line__gk');
        if (hs) tl.from(hs, { scale: 1.25, autoAlpha: 0, transformOrigin: '0 50%', duration: 0.3, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at);
        if (gk) tl.from(gk, { y: -8, autoAlpha: 0, duration: 0.3, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at + 0.1);
        at += 0.55;
      }
      gateOpen(tl, s, at); at += i ? 0.2 : 0;
      tl.from(s.querySelectorAll('.aq-gate-line__n, .aq-gate-line__t, .aq-gate-line__d'), { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at);
      if (w) { var o = {}; o[sc] = 0; o.duration = per; o.ease = 'none'; o.clearProps = 'transform'; tl.from(w, o, at) }
      if (dry) tl.from(dry, { autoAlpha: 0, duration: per, ease: 'power1.inOut', clearProps: 'opacity,visibility' }, at);
      var out = G(s, '.aq-gate-line__out'); if (out) tl.from(out, { autoAlpha: 0, duration: 0.2, clearProps: 'opacity,visibility' }, at + per);
      return at + per;
    }
    if (nar) {
      steps.forEach(function (s, i) { var tl = m.tw(gsap.timeline({ paused: true }));
        tl.from(G(s, '.aq-gate-line__ic'), { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, 0);
        stepIn(tl, s, i, 0.05); m.on(s, function () { tl.play() }, 'top 80%') });
      return;
    }
    var tl = m.tw(gsap.timeline({ paused: true, onComplete: function () { done = true } }));
    tl.from(el.querySelectorAll('.aq-gate-line__ic'), { y: 10, autoAlpha: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0);
    var at = 0.2; steps.forEach(function (s, i) { at = stepIn(tl, s, i, at) });
    m.on(el, function () { tl.play() }, 'top 70%');

    // seek: the water to the hovered step (cue-scrubber's seek: stages ahead empty, nearest first)
    var waters = steps.map(function (s) { return G(s, '.aq-gate-line__water') }), fills = steps.map(function (s) { var g = G(s, '.aq-gate-line__vfill'); return g });
    function seek(k, fast) {
      steps.forEach(function (s, j) {
        var on = j <= k, d = fast ? 0.1 : 0.16, dl = fast ? 0 : Math.abs(j - k) * 0.05;
        if (waters[j]) gsap.to(waters[j], { scaleX: on ? 1 : 0, transformOrigin: '0 50%', duration: d, delay: on ? dl : 0, ease: 'power2.out', overwrite: true });
        if (fills[j]) gsap.to(fills[j], { fillOpacity: on ? 0 : 1, duration: d, delay: dl, overwrite: true });
      });
    }
    steps.forEach(function (s, k) { s.addEventListener('pointerenter', function (ev) { if (done && ev.pointerType === 'mouse') seek(k) }) });
    el.addEventListener('pointerleave', function (ev) { if (done && ev.pointerType === 'mouse') seek(steps.length, true) });
  });
});
