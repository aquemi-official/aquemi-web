/* AuditManifold: the water fills the table's pipework the way a workflow runs.
   Ported from Subframe Motion "Animated workflow diagram" (process-choreography), MIT, (c) 2026 Subframe: one progress
   value drives everything through overlapping segments (segment(p, start, end) clamped 0..1): the first header fills
   down row by row, each row's branch fills as the header passes it, then the second header and its branches, and each
   answer "arrives" when its branch reaches it (opacity, 6 px rise and 0.96 -> 1 scale on a cubic ease-out), as the
   example's outputs land. One run on scroll-in, 2.4 s, then the markup is exactly the static page.
   Pointing at or focusing a row is visitor-driven feedback: its valves open (CSS), its two branches run again (0.18 s
   each, the second after the first) and the other rows step back. Nothing under reduced motion. */
AQmotion.fx('AuditManifold', function (root, m) {
  root.querySelectorAll('.aq-audit-manifold').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var rows = [].slice.call(el.querySelectorAll('.aq-audit-manifold__row')).filter(function (r) { return r.offsetParent !== null });
    var R = rows.length; if (!R) return;
    function seg(v, a, b) { return Math.max(0, Math.min(1, (v - a) / (b - a))) }
    function out(v) { return 1 - Math.pow(1 - v, 3) }
    var parts = rows.map(function (r) {
      var q = function (s) { return r.querySelector(s) };
      return { hA: q('.aq-audit-manifold__pipe--a .aq-audit-manifold__hdr .aq-audit-manifold__w'), bA: q('.aq-audit-manifold__pipe--a .aq-audit-manifold__br .aq-audit-manifold__w'),
        hB: q('.aq-audit-manifold__pipe--b .aq-audit-manifold__hdr .aq-audit-manifold__w'), bB: q('.aq-audit-manifold__pipe--b .aq-audit-manifold__br .aq-audit-manifold__w'),
        go: q('.aq-audit-manifold__go'), read: q('.aq-audit-manifold__read') };
    });
    var st = { p: 0 }, T = 0.3;
    function paint() {
      var p = st.p;
      parts.forEach(function (o, i) {
        var a0 = T * i / R, a1 = T * (i + 1) / R, am = T * (i + 0.5) / R;
        if (o.hA) o.hA.style.transform = 'scaleY(' + seg(p, a0, a1).toFixed(3) + ')';
        if (o.bA) o.bA.style.transform = 'scaleX(' + seg(p, am, am + 0.16).toFixed(3) + ')';
        if (o.read) { var r = out(seg(p, am + 0.08, am + 0.24)); o.read.style.opacity = (0.35 + 0.65 * r).toFixed(3) }
        if (o.hB) o.hB.style.transform = 'scaleY(' + seg(p, 0.36 + a0, 0.36 + a1).toFixed(3) + ')';
        if (o.bB) o.bB.style.transform = 'scaleX(' + seg(p, 0.36 + am, 0.36 + am + 0.16).toFixed(3) + ')';
        if (o.go) { var g = out(seg(p, 0.36 + am + 0.1, 0.36 + am + 0.3)); o.go.style.opacity = g.toFixed(3); o.go.style.transform = 'translateY(' + ((1 - g) * 6).toFixed(2) + 'px) scale(' + (0.96 + g * 0.04).toFixed(4) + ')' }
      });
    }
    function clear() { parts.forEach(function (o) { [o.hA, o.bA, o.hB, o.bB, o.go, o.read].forEach(function (x) { if (x) { x.style.removeProperty('transform'); x.style.removeProperty('opacity') } }) }) }
    paint();
    var tl = m.tw(gsap.timeline({ paused: true }));
    tl.from(el.querySelectorAll('.aq-audit-manifold__hdr, .aq-audit-manifold__br, .aq-audit-manifold__valve, .aq-audit-manifold__fl'), { autoAlpha: 0, duration: 0.4, stagger: { amount: 0.4 }, ease: 'power1.out', clearProps: 'opacity,visibility' }, 0);
    tl.to(st, { p: 1, duration: 2.4, ease: 'none', onUpdate: paint, onComplete: clear }, 0.25);
    m.on(el, function () { tl.play() }, 'top 75%');

    /* rows: the visitor's pointer or focus opens a route */
    function on(r, yes) {
      r.classList.toggle('is-on', yes); el.classList.toggle('is-pointing', yes);
      if (!yes || tl.isActive()) return;
      var w = r.querySelectorAll('.aq-audit-manifold__br .aq-audit-manifold__w');
      m.tw(gsap.fromTo(w, { scaleX: 0 }, { scaleX: 1, duration: 0.18, stagger: 0.18, ease: 'power2.out', overwrite: true, clearProps: 'transform' }));
    }
    el.querySelectorAll('.aq-audit-manifold__row').forEach(function (r) {
      r.addEventListener('pointerenter', function (ev) { if (ev.pointerType === 'mouse') on(r, true) });
      r.addEventListener('pointerleave', function (ev) { if (ev.pointerType === 'mouse') on(r, false) });
      r.addEventListener('focusin', function () { on(r, true) });
      r.addEventListener('focusout', function (ev) { if (!r.contains(ev.relatedTarget)) on(r, false) });
    });
  });
});
