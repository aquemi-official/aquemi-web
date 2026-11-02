/* SkidTags: the elevation is plotted (frame, then each piece of equipment in drawing order, its strokes drawn on), the
   water runs the three pipe runs in the order it flows, then each standard is tagged in number order: the leader is
   drawn out from the part's dot and its square tag is set at the end of it; the crosshair ring lands on the first
   tagged part last. The table rows rise in a short stagger as the table arrives. One timeline for the drawing, one for
   the table, both once and under 3 s. The shared selection (atlas-hotspots port) lives in the renderer, so it also
   works under reduced motion; the section heading is left to the core. */
AQmotion.fx('SkidTags', function (root, m) {
  root.querySelectorAll('.aq-skid-tags').forEach(function (el) {
    var stage = el.querySelector('.aq-skid-tags__stage'), table = el.querySelector('.aq-skid-tags__table');
    if (!stage || !m.free(stage)) return;
    m.claim(stage); if (table) m.claim(table);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, D = window.DrawSVGPlugin;
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    var strokes = qa('.aq-skid-tags__ground > *, .aq-skid-tags__plant .aq-skid-tags__eq, .aq-skid-tags__plant .aq-skid-tags__fn, .aq-skid-tags__plant .aq-skid-tags__dim');
    var solids = qa('.aq-skid-tags__sec, .aq-skid-tags__lab');
    if (D) tl.fromTo(strokes, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.inOut', stagger: { amount: 1.0 }, clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
    else tl.from(strokes, { autoAlpha: 0, duration: 0.5, stagger: { amount: 0.8 }, clearProps: 'opacity,visibility' }, 0);
    tl.from(solids, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 1.1);
    var water = qa('.aq-skid-tags__water > *, .aq-skid-tags__plant .aq-skid-tags__fl');
    if (D) tl.fromTo(water, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, ease: 'power1.inOut', stagger: 0.2, clearProps: 'strokeDasharray,strokeDashoffset' }, 0.9);
    else tl.from(water, { autoAlpha: 0, duration: 0.5, stagger: 0.2, clearProps: 'opacity,visibility' }, 0.9);
    qa('.aq-skid-tags__tag').forEach(function (t, i) {
      var at = 1.6 + i * 0.16, lead = el.querySelector('.aq-skid-tags__lead[data-part="' + t.getAttribute('data-part') + '"]');
      if (lead) {
        var ld = lead.querySelector('.aq-skid-tags__ld'), dot = lead.querySelector('.aq-skid-tags__dot');
        if (dot) tl.from(dot, { autoAlpha: 0, duration: 0.15, clearProps: 'opacity,visibility' }, at);
        if (ld && D) tl.fromTo(ld, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.3, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, at + 0.05);
        else if (ld) tl.from(ld, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, at + 0.05);
      }
      tl.from(t.firstElementChild, { autoAlpha: 0, scale: 0.6, duration: 0.3, clearProps: 'transform,opacity,visibility' }, at + 0.3);
    });
    var cross = el.querySelector('.aq-skid-tags__cross');
    if (cross) tl.from(cross, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, '>-0.05');
    m.on(stage, function () { tl.play() }, 'top 75%');
    if (table) {
      var rows = qa('tbody .aq-skid-tags__row', table), tt = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
      tt.from(table.querySelectorAll('thead th'), { autoAlpha: 0, duration: 0.4, stagger: 0.05, clearProps: 'opacity,visibility' }, 0);
      rows.forEach(function (r, i) { tt.from([].slice.call(r.children), { y: 12, autoAlpha: 0, duration: 0.45, clearProps: 'transform,opacity,visibility' }, 0.1 + i * 0.08) });
      m.on(table, function () { tt.play() }, 'top 85%');
    }
  });
});
