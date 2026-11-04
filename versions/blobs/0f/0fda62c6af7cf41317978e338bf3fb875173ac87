/* TitleBlock: the title block is filled in zone by zone. The rules stand from the start; each zone's tag presses in,
   its name and value rise 8 px, and its drawing is inked over its own faint impression (the fills show first, the
   lines draw on), the accents last. On the timing zone the flow line runs from the kickoff flag to the document stack
   before the skid is inked: the papers arrive first. The closing strip comes in at the end. One timeline, once,
   under 3.5 s. Nothing runs under reduced motion (the finished sheet is the static markup).
   Ported from Subframe Motion "Reed in one line" (signature-draw), MIT, (c) 2026 Subframe
   (kept: each line inked in one stroke over a faint impression, 0.8 s, cubic-bezier(.37,.12,.28,1), nothing under
   reduced motion; replaced: the heron with each zone's IsoKit drawing, the replay button with pointing at a zone,
   which re-inks its drawing in 0.45 s). */
AQmotion.fx('TitleBlock', function (root, m) {
  root.querySelectorAll('.aq-title-block').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var ink = window.CustomEase ? (CustomEase.get('aq-ink') || CustomEase.create('aq-ink', 'M0,0 C0.37,0.12 0.28,1 1,1')) : 'power2.inOut';
    var D = !!window.DrawSVGPlugin, q = function (r, s) { return [].slice.call(r.querySelectorAll(s)) };
    var ACC = '.aq-iso__acc, .aq-title-block__mark, .aq-title-block__run';
    /* IsoKit strokes are non-scaling: DrawSVG reads the vector-effect attribute to size its dashes, and parked paths
       draw with butt caps (no round-cap dots at 0%); clean() drops the inline dash and cap when a draw ends, since
       clearProps leaves DrawSVG's dashes behind (IsoKit motion.js, pass 12 C) */
    function nss(els) { els.forEach(function (p) { p.setAttribute('vector-effect', 'non-scaling-stroke'); p.style.strokeLinecap = 'butt' }); return els }
    function clean() { this.targets().forEach(function (p) { p.style.removeProperty('stroke-dasharray'); p.style.removeProperty('stroke-dashoffset'); p.style.removeProperty('stroke-linecap') }) }
    /* desktop: one timeline for the 2x2, zones 0.42 s apart; phones: each stacked zone plays as it scrolls in */
    var nar = m.narrow(), mk0 = function () { return m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })) }, tl = mk0();
    q(el, '.aq-title-block__zone').forEach(function (z, i) {
      var t = nar ? 0 : i * 0.42, own = nar ? mk0() : tl, tag = z.querySelector('.aq-title-block__tag'), svg = z.querySelector('.aq-title-block__svg');
      if (nar) { tl = own; m.on(z, function () { own.play() }, 'top 80%') }
      if (tag) tl.from(tag, { scale: 0.6, autoAlpha: 0, duration: 0.35, clearProps: 'transform,opacity,visibility' }, t);
      tl.from(q(z, '.aq-title-block__h, .aq-title-block__bd > *'), { y: 8, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, t + 0.05);
      if (!svg) return;
      tl.from(svg, { autoAlpha: 0.25, duration: 0.4, ease: 'none', clearProps: 'opacity,visibility' }, t);
      if (!D) return;
      var set = m.lines(svg); nss(set.solid); var acc = q(svg, ACC), body = set.solid.filter(function (p) { return acc.indexOf(p) < 0 && !p.closest('.aq-title-block__mark') });
      var run = svg.querySelector('.aq-title-block__run'), late = t + 0.15;
      if (run) {
        /* timing: kickoff flag, then the run to the documents, then the stack and the skid */
        var flag = q(svg, '.aq-title-block__mark');
        tl.fromTo(run, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.inOut', onComplete: clean }, t + 0.1);
        if (flag.length) tl.from(flag, { autoAlpha: 0, duration: 0.25, clearProps: 'opacity,visibility' }, t + 0.05);
        late = t + 0.55;
      }
      if (body.length) tl.fromTo(body, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, ease: ink, stagger: { amount: 0.3 }, onComplete: clean }, late);
      var rest = acc.filter(function (p) { return p !== run && !p.classList.contains('aq-title-block__mark') });
      /* only the lines that are inked keep the butt cap until they finish (the marks fade in, they are not drawn) */
      set.solid.forEach(function (p) { if (p !== run && body.indexOf(p) < 0 && rest.indexOf(p) < 0) p.style.removeProperty('stroke-linecap') });
      if (rest.length) tl.fromTo(rest, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.45, ease: ink, stagger: 0.08, onComplete: clean }, late + 0.6);
      if (!run) { var mk = q(svg, '.aq-title-block__mark'); if (mk.length) tl.from(mk, { autoAlpha: 0, y: -4, duration: 0.35, clearProps: 'transform,opacity,visibility' }, late + 0.7) }
      /* pointing at a zone re-inks its drawing (visitor-driven: may repeat) */
      var busy = false;
      z.addEventListener('mouseenter', function () {
        if (busy || own.isActive() || own.progress() < 1) return; busy = true; nss(set.solid);
        gsap.fromTo(set.solid, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.45, ease: ink, stagger: { amount: 0.15 }, onComplete: function () { clean.call(this); busy = false } });
      });
    });
    if (nar) return;
    var tb = el.querySelector('.aq-title-block__tb'); if (tb) tl.from(tb, { autoAlpha: 0, y: 8, duration: 0.45, clearProps: 'transform,opacity,visibility' }, 1.6);
    m.on(el, function () { tl.play() }, 'top 75%');
  });
});
