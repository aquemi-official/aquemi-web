/* IsoKit: an isometric drawing builds the way it would be drawn, then the water runs through it once.
   1. the sheet furniture fades up; 2. each part's lines draw on, back to front, and its ground fill settles in behind
   them (so hidden lines disappear as the part becomes solid); 3. the pipe walls draw along the route, dimensions and
   leaders follow; 4. the water (.aq-iso__flow) runs the route in DOM order, a droplet riding its head, and each stage
   lights (is-lit) as the water reaches it (a pipe's data-iso-to names the part's data-iso-id), then settles back.
   Everything ends static within 5 s; nothing runs under reduced motion (the drawing is complete without script).
   Looks reuse the same choreography through window.AQiso.timeline(svg, m, opts) on their own trigger and timing.
   This component takes every svg.aq-iso that no other component claimed, including ones claimed after it runs. */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function qa(s, el) { return [].slice.call(el.querySelectorAll(s)) }
  function len(el) { try { return el.getTotalLength() } catch (x) { return 0 } }
  function stroked(el) { var c = getComputedStyle(el); return c.stroke && c.stroke !== 'none' && parseFloat(c.strokeWidth) > 0 }
  function dashed(el) { var d = getComputedStyle(el).strokeDasharray; return d && d !== 'none' && d !== '0' && d !== '0px' }
  // DrawSVG reads the vector-effect attribute (not CSS) to size its dashes on non-scaling strokes
  function nss(els) { els.forEach(function (el) { el.setAttribute('vector-effect', 'non-scaling-stroke') }); return els }
  var SHAPES = 'path,circle,ellipse,line,polyline,polygon,rect';
  // a path parked at drawSVG 0% is a zero-length dash: with the kit's round caps it paints as a dot, so each path waits
  // and draws with butt caps; clean() drops the inline cap at the end, so the kit's round caps return (pass 12 C, G-C3)
  // clearProps leaves DrawSVG's dashes behind here; with non-scaling strokes a stale dash would cut lines on resize
  function clean(els) { els.forEach(function (el) { el.style.removeProperty('stroke-dasharray'); el.style.removeProperty('stroke-dashoffset'); el.style.removeProperty('stroke-linecap') }) }
  function done() { clean(this.targets()) }

  /* light / unlight a stage by id (parts and pipes carrying data-iso-id) */
  function light(svg, id, on) {
    var els = qa('[data-iso-id="' + id + '"]', svg);
    els.forEach(function (el) { el.classList.toggle('is-lit', on !== false) });
    return els;
  }

  /* timeline(svg, m, opts) -> a paused GSAP timeline (null under reduced motion or without GSAP).
     opts: draw (equipment seconds, 1.6), pipe (0.9), flow (1.6, the whole route), at (start offset), stagger (between
     parts, auto), drop (droplet on the water head, true), keep (stages stay lit, false), play (start now, false),
     onStage(els, id, index) when the water reaches a stage, onDone(). Labels on the timeline: 'parts', 'pipes', 'flow',
     'end', and tl.data.arrive[id] = time the water reaches each stage, so a look can add its own tweens in step. */
  function timeline(svg, m, o) {
    o = o || {};
    if (reduce || !window.gsap || !svg) return null;
    var D = window.DrawSVGPlugin, MP = window.MotionPathPlugin;
    var tl = gsap.timeline({ paused: !o.play }); if (m && m.tw) m.tw(tl);
    tl.data = { arrive: {} };
    var at = o.at || 0, tDraw = o.draw == null ? 1.6 : o.draw, tPipe = o.pipe == null ? 0.9 : o.pipe, tFlow = o.flow == null ? 1.6 : o.flow;
    var sheet = qa('.aq-iso__sheet', svg), parts = qa('.aq-iso__part', svg), pipes = qa('.aq-iso__pipe', svg).filter(function (p) { return !p.closest('.aq-iso__part') });
    var flows = qa('.aq-iso__flow', svg), notes = qa('.aq-iso__dim, .aq-iso__leader', svg), arrows = qa('.aq-iso__arrow', svg);
    function split(el, skip) {
      var solid = [], dash = [], fill = [];
      qa(SHAPES, el).forEach(function (s) {
        if (s.closest('clipPath') || (skip && s.matches(skip))) return;
        if (s.classList.contains('aq-iso__eq') || s.classList.contains('aq-iso__pipe-body')) fill.push(s);
        if (!stroked(s)) return;
        if (dashed(s) || len(s) < 3) dash.push(s); else solid.push(s);
      });
      return { solid: nss(solid), dash: dash, fill: fill };
    }
    function build(set, t, dur) {
      if (D && set.solid.length) tl.fromTo(set.solid, { drawSVG: '0%', strokeLinecap: 'butt' }, { drawSVG: '100%', duration: dur, ease: 'power2.inOut', stagger: { amount: dur * 0.35 }, onComplete: done }, t);
      else if (set.solid.length) tl.from(set.solid, { autoAlpha: 0, duration: dur * 0.6, clearProps: 'opacity,visibility' }, t);
      if (set.fill.length) tl.fromTo(set.fill, { fillOpacity: 0 }, { fillOpacity: 1, duration: dur * 0.7, ease: 'power1.out', clearProps: 'fillOpacity' }, t + dur * 0.55);
      if (set.dash.length) tl.from(set.dash, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, t + dur * 0.8);
    }

    // 1. sheet
    if (sheet.length) tl.from(sheet, { autoAlpha: 0, duration: 0.5, ease: 'power1.out', clearProps: 'opacity,visibility' }, at);
    // 2. equipment, back to front (DOM order)
    var t0 = at + 0.15, n = parts.length, dur = Math.min(0.9, tDraw * 0.6), stg = o.stagger != null ? o.stagger : (n > 1 ? (tDraw - dur) / (n - 1) : 0);
    tl.addLabel('parts', t0);
    parts.forEach(function (p, i) { build(split(p, '.aq-iso__flow'), t0 + i * stg, dur) });
    // 3. pipes and annotation
    var tp = t0 + Math.max(dur, tDraw * 0.7); tl.addLabel('pipes', tp);
    if (pipes.length) {
      var ps = tPipe / Math.max(1, pipes.length), pd = Math.min(tPipe, Math.max(0.35, ps * 2));
      pipes.forEach(function (p, i) { build(split(p, '.aq-iso__flow'), tp + i * ps * 0.85, pd) });
    }
    notes.forEach(function (nn, i) { build(split(nn), tp + 0.2 + i * 0.08, 0.5); var tx = qa('text', nn); if (tx.length) tl.from(tx, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, tp + 0.6 + i * 0.08) });
    // 4. water
    var tf = tp + tPipe + 0.05; tl.addLabel('flow', tf);
    var L = flows.map(function (f) { return Math.max(1, len(f)) }), tot = L.reduce(function (a, b) { return a + b }, 0) || 1, t = tf, seen = {}, k = 0;
    var ctm = svg.getScreenCTM && svg.getScreenCTM(), sc = ctm && ctm.a ? ctm.a : 1;
    flows.forEach(function (f, i) {
      var d = Math.max(0.12, tFlow * L[i] / tot), drop = f.classList.contains('aq-iso__flow--drop') || dashed(f);
      if (drop) tl.from(f, { autoAlpha: 0, duration: Math.min(0.3, d), clearProps: 'opacity,visibility' }, t);
      else if (D) { nss([f]); tl.fromTo(f, { drawSVG: '0%', strokeLinecap: 'butt' }, { drawSVG: '100%', duration: d, ease: 'none', onComplete: done }, t) }
      else tl.from(f, { autoAlpha: 0, duration: d, clearProps: 'opacity,visibility' }, t);
      if (MP && o.drop !== false && !drop && L[i] > 8) {
        var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('class', 'aq-iso__drop'); c.setAttribute('r', (2.6 / sc).toFixed(2)); c.setAttribute('aria-hidden', 'true');
        f.parentNode.insertBefore(c, f.nextSibling); gsap.set(c, { autoAlpha: 0 });
        tl.set(c, { autoAlpha: 1 }, t);
        tl.to(c, { duration: d, ease: 'none', motionPath: { path: f, align: f, alignOrigin: [0.5, 0.5] } }, t);
        tl.to(c, { autoAlpha: 0, duration: 0.15, onComplete: function () { var e = this.targets()[0]; if (e && e.parentNode) e.parentNode.removeChild(e) } }, t + d);
      }
      t += d;
      var host = f.closest('[data-iso-to]'), part = f.closest('.aq-iso__part[data-iso-id]');
      var id = f.getAttribute('data-iso-to') || (host && host.getAttribute('data-iso-to')) || (part && part.getAttribute('data-iso-id'));
      if (id && !seen[id]) {
        seen[id] = 1; tl.data.arrive[id] = t; var idx = k++;
        tl.call(function (id, idx) { var els = light(svg, id, true); if (o.onStage) o.onStage(els, id, idx) }, [id, idx], t);
      }
    });
    arrows.forEach(function (a, i) { tl.from(a, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, tf + tFlow * (i + 0.5) / arrows.length) });
    var te = t + 0.1; tl.addLabel('end', te);
    tl.call(function () { clean(qa(SHAPES, svg)) }, null, te);
    if (!o.keep) tl.call(function () { Object.keys(seen).forEach(function (id) { light(svg, id, false) }) }, null, Math.min(te + 0.6, (o.at || 0) + 4.8));
    if (o.onDone) tl.call(o.onDone, null, te);
    return tl;
  }
  window.AQiso = { timeline: timeline, light: light };

  AQmotion.fx('IsoKit', function (root, m) {
    var svgs = qa('svg.aq-iso', root).filter(function (s) { return m.free(s) && s.getAttribute('data-iso-motion') !== 'off' });
    // hold them now so the generic line draw leaves them alone; decide once every component has claimed its own
    svgs.forEach(function (s) { m.claim(s) });
    Promise.resolve().then(function () {
      svgs.forEach(function (s) {
        if (s.parentElement && s.parentElement.closest('[data-aqm]')) return;
        var tl = timeline(s, m); if (tl) m.on(s, function () { tl.play() }, 'top 85%');
      });
    });
  });
})();
