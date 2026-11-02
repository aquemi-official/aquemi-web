/* RecordSlips: each process prints its record. Row by row as it scrolls in: the process name rises, the slot drops
   into place, then the slip feeds out of the slot (clipped at the slot edge, sliding out from behind it) and its
   record lines tick in one after another. Phones: the slip feeds down out of the slot. One timeline per row, once,
   under 2 s. Rows behind the phone fold play when opened. */
AQmotion.fx('RecordSlips', function (root, m) {
  root.querySelectorAll('.aq-record-slips').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var narrow = m.narrow();
    [].forEach.call(el.querySelectorAll('.aq-record-slips__row'), function (row) {
      var name = row.querySelector('.aq-record-slips__name'), rest = row.querySelectorAll('.aq-record-slips__proc > .aq-index, .aq-record-slips__proc > p'),
        slot = row.querySelector('.aq-record-slips__slot'), slip = row.querySelector('.aq-record-slips__slip'), recs = row.querySelectorAll('.aq-record-slips__recs li');
      var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
      if (name) tl.from(name, { yPercent: 40, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, 0);
      if (rest.length) tl.from(rest, { autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'opacity,visibility' }, 0.15);
      if (slot) tl.from(slot, narrow ? { scaleX: 0, duration: 0.4, clearProps: 'transform' } : { scaleY: 0, duration: 0.4, clearProps: 'transform' }, 0.2);
      if (slip) tl.from(slip, narrow ? { yPercent: -60, clipPath: 'inset(60% 0 0 0)', duration: 0.8, ease: 'power2.out', clearProps: 'clipPath' } : { xPercent: -45, clipPath: 'inset(0 0 0 45%)', duration: 0.8, ease: 'power2.out', clearProps: 'clipPath' }, 0.45);
      if (slip) tl.set(slip, { clearProps: 'transform' });
      if (recs.length) tl.from(recs, { autoAlpha: 0, x: -8, duration: 0.35, stagger: 0.12, clearProps: 'transform,opacity,visibility' }, 0.9);
      m.on(row, function () { tl.play() }, 'top 85%');
    });
  });
});
