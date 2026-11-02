/* TwinRoute: the skid is tested twice. The test bay draws and the water runs it (IsoKit choreography), the truck drives
   across the centre column from the test bay towards your site, then the site draws and its water runs to the point of
   use. Each row is a station: as it scrolls in, the water runs down the FAT pipe to its node, then down the SAT pipe; a
   broken run (not possible) shows its open node with no water. The conclusion turns both routes in to the reuse label,
   which strikes in. Each trigger plays once, under 5 s. Hover swells a row's nodes (CSS). */
AQmotion.fx('TwinRoute', function (root, m) {
  [].forEach.call(root.querySelectorAll('.aq-twin-route'), function (el) {
    m.claim(el);
    var q = function (s, c) { return (c || el).querySelector(s) }, qa = function (s, c) { return [].slice.call((c || el).querySelectorAll(s)) };
    var fat = q('.aq-twin-route__scene--fat svg'), sat = q('.aq-twin-route__scene--sat svg'), truck = q('.aq-twin-route__truck-svg'), lane = q('.aq-twin-route__lane');
    var labs = qa('.aq-twin-route__lab'), caps = qa('.aq-twin-route__labels .aq-twin-route__water');
    var head = q('.aq-twin-route__head');
    if (head) {
      var tl = gsap.timeline({ paused: true }); m.tw(tl);
      var A = window.AQiso && AQiso.timeline(fat, m, { draw: 1.0, pipe: 0.5, flow: 0.8 }), B = window.AQiso && AQiso.timeline(sat, m, { draw: 1.0, pipe: 0.5, flow: 0.8 });
      if (A) { tl.add(function () { A.play() }, 0) }
      if (lane) tl.fromTo(lane, { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut', clearProps: 'transform' }, 0.9);
      if (truck) tl.fromTo(truck, { xPercent: -140, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 1.3, ease: 'power2.inOut', clearProps: 'transform,opacity,visibility' }, 1.0);
      if (B) { tl.add(function () { B.play() }, 1.9) }
      if (labs.length) tl.from(labs, { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.4);
      if (caps.length) tl.fromTo(caps, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: 'power1.in', stagger: 0.8, clearProps: 'transform' }, 1.2);
      m.on(head, function () { tl.play() });
    }
    qa('.aq-twin-route__row').forEach(function (row) {
      var r = gsap.timeline({ paused: true }); m.tw(r);
      ['fat', 'sat'].forEach(function (s, k) {
        var rail = q('.aq-twin-route__rail--' + s, row); if (!rail) return;
        var w = q('.aq-twin-route__water', rail), n = q('.aq-twin-route__node', rail), na = rail.classList.contains('is-na'), t = k * 0.35;
        if (w && !na) r.fromTo(w, { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: 'none', clearProps: 'transform' }, t);
        if (n) r.fromTo(n, { scale: 0 }, { scale: 1, duration: 0.35, ease: 'back.out(2)', clearProps: 'transform' }, t + (na ? 0.1 : 0.2));
      });
      r.from(qa('.aq-twin-route__test, .aq-twin-route__res', row), { autoAlpha: 0, y: 10, duration: 0.5, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0);
      m.on(row, function () { r.play() }, 'top 88%');
    });
    var end = q('.aq-twin-route__end');
    if (end) {
      var e = gsap.timeline({ paused: true }); m.tw(e);
      e.fromTo(qa('.aq-twin-route__turn', end), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power2.inOut', clearProps: 'clipPath' }, 0);
      e.fromTo(q('.aq-twin-route__reuse', end), { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power4.out', clearProps: 'transform,opacity,visibility' }, 0.6);
      e.from(qa('.aq-twin-route__res', end), { autoAlpha: 0, duration: 0.5, stagger: 0.1, clearProps: 'opacity,visibility' }, 0.2);
      m.on(end, function () { e.play() }, 'top 88%');
    }
  });
});
