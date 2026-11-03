/* ReceivingBench: the bench is drawn, its supplies take their tags, the magnifier reads the lot marking and finds the
   same lot on the certificate; pointing at a supply's row puts a spotlight on that supply.
   Ported from Subframe Motion "Product tour spotlight" (guided-inspection), MIT, (c) 2026 Subframe
   (kept: the spotlight's cut-out glides to the chosen stop over 550 ms cubic-bezier(.22,.75,.22,1), keyboard moves
   apply at once, the stops stay reachable without motion; replaced: the floor plan with the bench drawing, the tour
   steps with the schedule rows (pointer or focus), the dimming mask with a flow ring on the supply and its tag in flow).
   Entrance, once (desktop): the bench and its supplies draw on back to front (IsoKit's AQiso.timeline, 1.4 s), the
   five tags drop in 0.08 s apart on their leaders, the magnifier leader draws from the pipe, circle A opens on the
   marking (scale 0.7 to 1), the join draws to circle B on the certificate and the match tick lands. Phones: circle A,
   the join, circle B, the tick. Rows rise 8 px, 0.07 s apart, each tick drawn as its row lands. Under 4 s. */
AQmotion.fx('ReceivingBench', function (root, m) {
  root.querySelectorAll('.aq-receiving-bench').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var D = window.DrawSVGPlugin, svg = el.querySelector('.aq-receiving-bench__svg'), pairSvg = el.querySelector('.aq-receiving-bench__pair');
    var desk = svg && svg.getBoundingClientRect().width > 0;
    function lensIn(tl, mag, t) {
      if (!mag) return t;
      var lead = mag.querySelector('.aq-receiving-bench__ml'), dot = mag.querySelector('.aq-receiving-bench__md'), lenses = mag.querySelectorAll('.aq-receiving-bench__lens'),
        join = mag.querySelector('.aq-receiving-bench__jl'), tk = mag.querySelectorAll('.aq-receiving-bench__tk, .aq-receiving-bench__tick'), labs = mag.querySelectorAll('.aq-receiving-bench__lab');
      if (dot) tl.from(dot, { autoAlpha: 0, duration: 0.2, clearProps: 'opacity,visibility' }, t);
      if (lead && D) tl.fromTo(lead, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, t + 0.05);
      if (lenses[0]) tl.from(lenses[0], { scale: 0.7, autoAlpha: 0, svgOrigin: centre(lenses[0]), duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, t + 0.3);
      if (join && D) tl.fromTo(join, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, t + 0.7);
      if (lenses[1]) tl.from(lenses[1], { scale: 0.7, autoAlpha: 0, svgOrigin: centre(lenses[1]), duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, t + 1.0);
      if (tk.length) tl.from(tk, { autoAlpha: 0, duration: 0.25, ease: 'power2.out', stagger: 0.08, clearProps: 'opacity,visibility' }, t + 1.4);
      if (labs.length) tl.from(labs, { autoAlpha: 0, duration: 0.3, stagger: 0.1, clearProps: 'opacity,visibility' }, t + 0.5);
      return t + 1.7;
    }
    function centre(g) { var c = g.querySelector('.aq-receiving-bench__rim'); return c ? c.getAttribute('cx') + ' ' + c.getAttribute('cy') : '0 0' }
    if (desk) {
      m.claim(svg);
      var tl = (window.AQiso && AQiso.timeline(svg, m, { draw: 1.4, pipe: 0, flow: 0 })) || m.tw(gsap.timeline({ paused: true }));
      var t0 = 1.5, tags = svg.querySelectorAll('.aq-receiving-bench__tag'), tls = svg.querySelectorAll('.aq-receiving-bench__tl, .aq-receiving-bench__td');
      if (tls.length) tl.from(tls, { autoAlpha: 0, duration: 0.3, stagger: 0.05, clearProps: 'opacity,visibility' }, t0);
      if (tags.length) tl.from(tags, { y: -8, autoAlpha: 0, duration: 0.35, ease: 'power3.out', stagger: 0.08, clearProps: 'transform,opacity,visibility' }, t0 + 0.1);
      lensIn(tl, svg.querySelector('.aq-receiving-bench__mag'), t0 + 0.5);
      m.on(svg, function () { tl.play() }, 'top 80%');
    } else if (pairSvg) {
      var tp = m.tw(gsap.timeline({ paused: true })); lensIn(tp, pairSvg.querySelector('.aq-receiving-bench__mag'), 0);
      m.on(pairSvg, function () { tp.play() }, 'top 85%');
    }
    var rows = [].filter.call(el.querySelectorAll('.aq-receiving-bench__row'), function (r) { return r.offsetParent !== null });
    var rt = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    rows.forEach(function (r, i) {
      rt.from(r, { y: 8, autoAlpha: 0, duration: 0.5, clearProps: 'transform,opacity,visibility' }, i * 0.07);
      var ok = r.querySelector('.aq-receiving-bench__ok path');
      if (D && ok) rt.fromTo(ok, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.35, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.25 + i * 0.07);
    });
    var list = el.querySelector('.aq-receiving-bench__list'); if (list) m.on(list, function () { rt.play() }, 'top 85%');
  });
});

/* Pointing at a row (or its supply on the bench) lights the pair; works without GSAP and under reduced motion
   (the spotlight then jumps; CSS drops its transition). */
(function () {
  function sync(el, key) {
    var svg = el.querySelector('.aq-receiving-bench__svg');
    el.querySelectorAll('[data-rb-key]').forEach(function (n) { n.classList.toggle('is-on', !!key && n.getAttribute('data-rb-key') === key) });
    if (!svg) return;
    svg.querySelectorAll('.aq-iso__part[data-iso-id]').forEach(function (p) { p.classList.toggle('is-lit', !!key && p.getAttribute('data-iso-id') === key) });
    var t = key && svg.querySelector('.aq-receiving-bench__tag[data-rb-key="' + key + '"]');
    if (t) { svg.style.setProperty('--rb-x', t.getAttribute('data-sx') + 'px'); svg.style.setProperty('--rb-y', t.getAttribute('data-sy') + 'px'); svg.classList.add('is-spot') }
    else svg.classList.remove('is-spot');
  }
  function keyOf(t) { var n = t && t.closest && t.closest('[data-rb-key], .aq-iso__part[data-iso-id]'); return n ? (n.getAttribute('data-rb-key') || n.getAttribute('data-iso-id')) : null }
  ['pointerover', 'focusin'].forEach(function (ev) {
    document.addEventListener(ev, function (e) {
      var el = e.target.closest && e.target.closest('.aq-receiving-bench'); if (!el) return;
      if (ev === 'pointerover' && e.pointerType === 'touch') return;
      sync(el, keyOf(e.target));
    });
  });
  document.addEventListener('pointerout', function (e) {
    var el = e.target.closest && e.target.closest('.aq-receiving-bench'); if (!el) return;
    if (!e.relatedTarget || !el.contains(e.relatedTarget)) sync(el, null);
  });
})();
