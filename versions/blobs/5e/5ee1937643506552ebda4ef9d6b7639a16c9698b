/* RevisionRegister: the sheet is drawn, then its notes are written down the column. The navy frame rules round the
   sheet (clip from the top-left), the column's rule drops, the topic tabs drop in, the lead's triangle strikes and its
   quotation rises line by line; each visible note is then written in order: its number decodes and its line rules in
   left to right; the drawing plate prints from the bottom and the title block's cells appear. Once, under 3.5 s.
   Filtering glides (filter-mosaic, in the renderer); the drawing follows the note in hand (project-index, CSS). */
AQmotion.fx('RevisionRegister', function (root, m) {
  root.querySelectorAll('.aq-revision-register').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, P = '.aq-revision-register__';
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    tl.fromTo(el, { clipPath: 'inset(0 100% 100% 0)' }, { clipPath: 'inset(0 0% 0% 0)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clipPath' }, 0);
    var col = el.querySelector(P + 'col');
    if (col) tl.fromTo(col, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power2.inOut', clearProps: 'clipPath' }, 0.35);
    tl.from(q(P + 'tab'), { y: -8, autoAlpha: 0, duration: 0.35, stagger: 0.05, clearProps: 'transform,opacity,visibility' }, 0.5);
    var tri = el.querySelector(P + 'lk ' + P + 'tri');
    if (tri) tl.from(tri, { scale: 1.8, autoAlpha: 0, transformOrigin: '50% 50%', duration: 0.35, ease: 'power4.in', clearProps: 'transform,opacity,visibility' }, 0.7);
    var qp = el.querySelector(P + 'q p'), sp = qp && m.split(qp, { type: 'lines', mask: 'lines' });
    if (sp && sp.lines.length) tl.from(sp.lines, { yPercent: 105, duration: 0.7, stagger: 0.08, ease: 'power4.out' }, 0.75);
    var rest = q(P + 'lk span, ' + P + 'lt, ' + P + 'lstd, ' + P + 'go');
    if (rest.length) tl.from(rest, { y: 8, autoAlpha: 0, duration: 0.45, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0.85);
    q(P + 'note').filter(function (r) { return r.offsetParent !== null }).forEach(function (r, i) {
      var at = 0.8 + i * 0.16, no = r.querySelector(P + 'no');
      tl.fromTo(r.querySelector(P + 'nb'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'power2.inOut', clearProps: 'clipPath' }, at);
      if (no && window.ScrambleTextPlugin) { var t = no.firstChild && no.firstChild.nodeType === 3 ? no.firstChild : null; if (t) { var v = t.nodeValue; tl.to({}, { duration: 0.4, onUpdate: function () { var p = this.progress(); t.nodeValue = p < 1 ? v.replace(/\d/g, function () { return Math.floor(Math.random() * 10) }) : v }, onComplete: function () { t.nodeValue = v } }, at) } }
    });
    var dw = el.querySelector(P + 'fig');
    if (dw && dw.offsetParent) tl.fromTo(dw, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.out', clearProps: 'clipPath' }, 1.1);
    tl.from(q(P + 'tb > *'), { autoAlpha: 0, duration: 0.4, stagger: 0.08, clearProps: 'opacity,visibility' }, 1.3);
    m.on(el, function () { tl.play() }, 'top 78%');
  });
});
