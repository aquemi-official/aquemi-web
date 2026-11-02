/* WitnessPlan: the package is drawn in the bay, then each way reaches it. The IsoKit drawing plays (frame and parts
   back to front, the feed and the sample line, the water once), the rows rise, then the leaders draw out from their
   rows into the drawing, 0.12 s apart, a light travelling each one to its part as its marker strikes. The first way
   stays chosen, as the page reads without script. Under 4.5 s, once. After that the reader drives it: choosing a way
   sends one light down its leader to the part; one raised panel with the flow edge springs from row to row (arrow
   keys jump it).
   Ported from Subframe Motion "Animated beam connections" (animated-beam), MIT, (c) 2026 Subframe (kept: connectors
   measured from the rendered nodes and re-laid by ResizeObserver (the look's lay()), a short highlight travelling
   each connector source to target with a strong ease-out, beams 0.7 s apart at entrance (here 0.12 s, five
   leaders); replaced: the looping gradient with a dash segment run once per choice, no loop).
   Ported from Subframe Motion "Sliding segmented control" (sliding-tabs), MIT, (c) 2026 Subframe (kept: one shared
   highlight on a spring, stiffness 460, damping 34, mass 1, no travel for keyboard input). */
AQmotion.fx('WitnessPlan', function (root, m) {
  var D = window.DrawSVGPlugin, W = window.AQwitness;
  var out = window.CustomEase ? (CustomEase.get('aq-beam') || CustomEase.create('aq-beam', 'M0,0 C0.16,1 0.3,1 1,1')) : 'expo.out';
  [].forEach.call(root.querySelectorAll('.aq-witness-plan'), function (el) {
    var fig = el.querySelector('.aq-witness-plan__fig'), leads = el.querySelector('.aq-witness-plan__leads'); if (!fig) return;
    m.claim(fig); m.claim(el.querySelector('.aq-witness-plan__list')); if (leads) m.claim(leads);
    var qa = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var opts = qa('.aq-witness-plan__opt'), mks = qa('.aq-witness-plan__mk'), svg = fig.querySelector('svg.aq-iso');
    /* a light down one leader (visitor-driven, may repeat) */
    function beam(i, at, tl) {
      var p = leads && leads.querySelector('.aq-witness-plan__lead[data-i="' + i + '"]'); if (!p) return;
      var L = p.getTotalLength ? p.getTotalLength() : 0; if (!L) return;
      var b = p.cloneNode(); b.setAttribute('class', 'aq-witness-plan__beam'); leads.appendChild(b);
      var seg = Math.min(48, L * 0.3); gsap.set(b, { strokeDasharray: seg + ' ' + (L + seg), strokeDashoffset: seg });
      var t = gsap.to(b, { strokeDashoffset: -L, duration: 0.9, ease: out, onComplete: function () { if (b.parentNode) b.parentNode.removeChild(b) } });
      if (tl) { t.pause(); tl.add(function () { t.play(0) }, at) }
    }
    var tl = (window.AQiso && svg && AQiso.timeline(svg, m, { draw: 1.3, pipe: 0.6, flow: 1.0 })) || gsap.timeline({ paused: true });
    m.tw(tl);
    if (leads) tl.fromTo(leads, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, immediateRender: true, clearProps: 'opacity,visibility' }, 1.9);
    tl.from(opts, { autoAlpha: 0, x: -12, duration: 0.45, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.2);
    tl.from(qa('.aq-witness-plan__zone'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.6);
    var at = 1.9;
    tl.add(function () {
      if (W) W.lay(el);
      var ps = leads ? [].slice.call(leads.querySelectorAll('.aq-witness-plan__lead')) : [];
      if (D && ps.length) gsap.fromTo(ps, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, stagger: 0.12, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' });
      ps.forEach(function (p, k) { gsap.delayedCall(0.4 + k * 0.12, function () { beam(p.getAttribute('data-i')) }) });
    }, at);
    mks.forEach(function (k, i) { tl.fromTo(k, { autoAlpha: 0, scale: 1.5 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.in', clearProps: 'opacity,visibility,transform' }, at + 0.55 + i * 0.12) });
    m.on(fig, function () { tl.play() }, 'top 70%');

    /* choosing a way sends a light down its leader */
    var kb = false;
    el.addEventListener('click', function (ev) { var o = ev.target.closest('.aq-witness-plan__opt'); if (o && !kb) beam(o.getAttribute('data-i')) });

    /* the indicator springs to the chosen row (jumps for keyboard input) */
    var list = el.querySelector('.aq-witness-plan__list'), bar = list && list.querySelector('.aq-witness-plan__ind');
    if (bar && opts.length) {
      var st = { y: 0, h: 0 }, sp = m.spring(st, { stiffness: 460, damping: 34, mass: 1 }, function (o) { bar.style.transform = 'translateY(' + o.y.toFixed(1) + 'px)'; bar.style.height = Math.max(0, o.h).toFixed(1) + 'px' });
      var ind = function (jump) { var p = list.querySelector('.aq-witness-plan__opt[aria-pressed="true"]'); if (!p) return; var lb = list.getBoundingClientRect(), b = p.getBoundingClientRect(), g = { y: b.top - lb.top, h: b.height }; if (jump || kb) sp.jump(g); else sp.to(g) };
      list.classList.add('has-ind'); ind(true);
      list.addEventListener('click', function (ev) { if (ev.target.closest('.aq-witness-plan__opt')) requestAnimationFrame(function () { ind() }) });
      list.addEventListener('keydown', function () { kb = true });
      list.addEventListener('pointerdown', function () { kb = false });
      if (window.ResizeObserver) new ResizeObserver(function () { ind(true) }).observe(list);
    }
  });
});
