/* StairRouter: the type moves, then the stair is climbed. The outline words slide in from opposite sides while their
   letters rise one by one (both inks in step, so the word changes colour cleanly at the diagonal). Then the stair is
   built the way you would climb it: riser up, tread across, and the card lands on the tread as it is laid, its number
   decoding; one limestone drop climbs with the line and comes to rest at the top step. Last, the end word strikes in
   on the wedge, as soon as both the stair is up and the word is on screen. Under 4 s. Phones (the flight runs down the page): each step lays its tread and lands its card as it
   scrolls in; the end word strikes when it is reached. Hover lifts a card off its tread (CSS). Phones with the PhoneKit
   picker (pass 12): the chips rise in turn, and each card a chip opens lands with its rail climbing to its step. */
AQmotion.fx('StairRouter', function (root, m) {
  var CLEAR = 'transform,opacity,visibility,clipPath';
  [].forEach.call(root.querySelectorAll('.aq-stair-router-sec'), function (sec) {
    var fig = sec.querySelector('.aq-stair-router'), flight = fig && fig.querySelector('.aq-stair-router__flight');
    if (!flight) return;
    var q = function (s, el) { return (el || sec).querySelector(s) }, qa = function (s, el) { return [].slice.call((el || sec).querySelectorAll(s)) };
    var steps = qa('.aq-stair-router__step', flight), go = q('.aq-stair-router__go'), drop = q('.aq-stair-router__drop'), type = q('.aq-stair-router__type');
    [flight, go, drop, type].forEach(function (el) { if (el) m.claim(el) });
    if (window.AQpk) AQpk.scan();
    var stacked = getComputedStyle(flight).display === 'flex', picker = flight.hasAttribute('data-pk-on');

    // Outline type
    var rows = qa('.aq-stair-router__w'), chars = [];
    rows.forEach(function (w) { var s = m.split(w, { type: 'chars' }); if (s) chars = chars.concat(s.chars) });
    function playType(tl, at) {
      if (!rows.length) return;
      tl.fromTo(rows, { xPercent: function (i, el) { return el.classList.contains('aq-stair-router__w--a') ? 14 : -14 } }, { xPercent: 0, duration: 1.8, ease: 'expo.out', clearProps: 'transform' }, at);
      if (chars.length) tl.fromTo(chars, { yPercent: 70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', stagger: { each: 0.05, from: 'start' }, clearProps: CLEAR }, at);
    }
    function strikeGo(tl, at) {
      if (!go) return;
      tl.fromTo(go, { clipPath: 'inset(0% 100% 0% 0%)', x: -60 }, { clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: 0.9, ease: 'power4.out', clearProps: CLEAR }, at);
    }
    function parts(st) {
      return { n: q('.aq-stair-router__n', st), tread: q('.aq-stair-router__tread', st), riser: q('.aq-stair-router__riser', st), card: q('.aq-stair-router__card', st) };
    }
    function hide(p) {
      if (p.tread) gsap.set(p.tread, { scaleX: 0 });
      if (p.riser) gsap.set(p.riser, { scaleY: 0 });
      if (p.n) gsap.set(p.n, { autoAlpha: 0 });
      gsap.set(p.card, { autoAlpha: 0, y: 36, clipPath: 'inset(0% 0% 100% 0%)' });
    }
    function climb(tl, p, at, first) {
      var t = at;
      if (p.riser && !stacked) { tl.to(p.riser, { scaleY: 1, duration: 0.12, ease: 'none', clearProps: 'transform' }, t); t += 0.12 }
      if (p.riser && stacked) tl.to(p.riser, { scaleY: 1, duration: 0.3, ease: 'power2.out', clearProps: 'transform' }, t);
      if (p.tread) tl.to(p.tread, { scaleX: 1, duration: 0.22, ease: first ? 'power2.in' : 'none', clearProps: 'transform' }, t);
      if (p.n) { tl.to(p.n, { autoAlpha: 1, duration: 0.2, clearProps: 'opacity,visibility' }, t); var num = q('.aq-stair-router__num', p.n); if (num) tl.call(function () { m.scramble(num, 0) }, null, t) }
      tl.to(p.card, { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65, ease: 'power3.out', clearProps: CLEAR }, t + 0.08);
      return t + 0.22;
    }
    var P = steps.map(parts);

    // Phones with the picker (PhoneKit): the chips rise in turn as the flight comes in; the card a chip opens lands on
    // its rail (the rail's steps climb up to this one). Every card is readable without motion.
    if (picker) {
      var chips = qa('.aq-stair-router__chip', flight);
      if (chars.length) { gsap.set(chars, { autoAlpha: 0 }); m.on(sec, function () { playType(m.tw(gsap.timeline()), 0) }) }
      if (chips.length) { gsap.set(chips, { autoAlpha: 0, y: 12 }); m.on(flight, function () { m.tw(gsap.to(chips, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05, clearProps: CLEAR })) }, 'top 85%') }
      flight.addEventListener('pk:change', function (ev) {
        if (!ev.detail || !ev.detail.on || ev.detail.index < 0) return;
        var st = steps[ev.detail.index], card = st && q('.aq-stair-router__card', st); if (!card) return;
        m.tw(gsap.fromTo(card, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out', clearProps: CLEAR }));
        var ticks = qa('.aq-stair-router__rail i', card).slice(0, ev.detail.index + 1);
        if (ticks.length) m.tw(gsap.fromTo(ticks, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.25, ease: 'power2.out', stagger: 0.03, clearProps: 'transform' }));
      });
      if (go) { gsap.set(go, { clipPath: 'inset(0% 100% 0% 0%)' }); m.on(go, function () { strikeGo(m.tw(gsap.timeline()), 0) }, 'top 95%') }
      return;
    }

    if (!stacked) {
      P.forEach(hide); if (go) gsap.set(go, { clipPath: 'inset(0% 100% 0% 0%)' });
      if (chars.length) gsap.set(chars, { autoAlpha: 0 });
      m.on(fig, function () {
        var tl = m.tw(gsap.timeline());
        playType(tl, 0);
        // the drop's waypoints, relative to where it rests (the right end of the top tread)
        var dr = drop && drop.getBoundingClientRect(), cx = dr && dr.left + dr.width / 2, cy = dr && dr.top + dr.height / 2, way = [];
        var t = 0.35;
        P.forEach(function (p, i) {
          var r = p.tread.getBoundingClientRect(), y = r.top + r.height / 2;
          if (dr) { way.push([r.left - cx, y - cy, i ? 0.12 : 0]); way.push([r.right - cx, y - cy, 0.22]) }
          t = climb(tl, p, t, !i) + 0.04;
        });
        if (drop && way.length) {
          gsap.set(drop, { x: way[0][0], y: way[0][1] });
          var dt = 0.35 + 0.04;
          way.forEach(function (w, k) { if (!k) return; tl.to(drop, { x: w[0], y: w[1], duration: w[2], ease: 'none' }, dt); dt += w[2] + (k % 2 ? 0.04 : 0) });
          tl.set(drop, { clearProps: 'transform' }, dt + 0.05);
        }
        goAt = Date.now() + (t + 0.05) * 1000;
        tl.call(function () { relief = true }, null, t + 0.1);
      }, 'top 75%');

      // Ported from Subframe Motion "Relief board" (relief-board), MIT, (c) 2026 Subframe
      // The flight answers the pointer like the library's elevation field: the card the visitor points at (or focuses)
      // lifts furthest off its tread and its neighbours lift less with distance (height = lift x exp(-d^2 / 4.4), the
      // library's falloff; 300 ms, cubic-bezier(.22,1,.36,1)), so the stair reads as one route the reader is on.
      var relief = false, lift = parseFloat(getComputedStyle(fig).getPropertyValue('--space-3')) || 12;
      var rEase = window.CustomEase ? (CustomEase.get('aq-relief') || CustomEase.create('aq-relief', 'M0,0 C0.22,1 0.36,1 1,1')) : 'power3.out';
      function rise(k) {
        if (!relief) return;
        P.forEach(function (p, i) { var d = i - k; m.tw(gsap.to(p.card, { y: k < 0 ? 0 : -lift * Math.exp(-d * d / 4.4), duration: k < 0 ? 0.2 : 0.3, ease: rEase, overwrite: 'auto' })) });
      }
      steps.forEach(function (s, i) { s.addEventListener('pointerenter', function () { rise(i) }); s.addEventListener('focusin', function () { rise(i) }) });
      flight.addEventListener('pointerleave', function () { rise(-1) });
      flight.addEventListener('focusout', function (ev) { if (!flight.contains(ev.relatedTarget)) rise(-1) });
      // the end word strikes once the stair is up and the word is on screen, whichever comes later
      var goAt = 0;
      if (go) m.on(go, function () { var w = Math.max(0, (goAt - Date.now()) / 1000); strikeGo(m.tw(gsap.timeline({ delay: goAt ? w : 0.2 })), 0) }, 'top 92%');
      return;
    }

    // Stacked (phones and narrow screens): step by step as each scrolls in
    if (chars.length) { gsap.set(chars, { autoAlpha: 0 }); m.on(sec, function () { playType(m.tw(gsap.timeline()), 0) }) }
    P.forEach(function (p, i) {
      hide(p);
      m.on(steps[i], function () { climb(m.tw(gsap.timeline()), p, 0, true) }, 'top 88%');
    });
    if (go) { gsap.set(go, { clipPath: 'inset(0% 100% 0% 0%)' }); m.on(go, function () { strikeGo(m.tw(gsap.timeline()), 0) }, 'top 95%') }
  });
});
