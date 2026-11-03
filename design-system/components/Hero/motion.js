/* Hero: one timeline, cause before effect. The headline lines rise out of their mask while the eyebrow decodes, the
   lead and actions follow; then the right-hand drawing builds itself the way it would be drawn:
   - equipment figure: the drawing wipes up like a print, each leader grows out of its anchor on the drawing towards
     its callout, and the callout's reading appears when the line arrives
   - home loop: the guides fade in, the pipe draws round the figure of eight, the parts and labels land as the pipe
     passes them, then four flow dots travel the loop once and fade (all done in under 5 s)
   - index: the spine runs down and each numbered entry slides onto it
   - drawn scenes (HeroScene): the isometric scene draws back to front, the water runs its pipes once, and each
     numbered tag pops onto its part with its key row as the water reaches it
   - drawn figures: the pipe runs vignette to vignette (each wipes in as it is reached), folders slide into the
     binder back to front, the release record rises, its boxes tick and the stamp strikes; the route draws stop by stop
   The KeyFacts strip under the hero has its own choreography (KeyFacts/motion.js).
   A re-render that only opened or closed the phone menu keeps the hero still. */
(function () {
  var last = { page: null, menu: null };
  AQmotion.fx('Hero', function (root, m) {
    var hero = root.querySelector('.aq-hero'); if (!hero) return;
    m.claim(hero);
    var page = window.AQ ? AQ.page : location.hash, menu = !!root.querySelector('#wmenu-panel');
    var still = last.page === page && last.menu !== menu; last.page = page; last.menu = menu;
    if (still) { hero.setAttribute('data-aqm-still', ''); return }
    var t0 = Date.now(), narrow = m.narrow();
    var q = function (s, el) { return (el || hero).querySelector(s) }, qa = function (s, el) { return [].slice.call((el || hero).querySelectorAll(s)) };

    /* Text column */
    var tl = m.tw(gsap.timeline({ defaults: { ease: 'power3.out' } }));
    var h1 = q('h1'), s = h1 && m.split(h1, { type: 'lines', mask: 'lines', linesClass: 'aq-m-line' });
    if (s) tl.from(s.lines, { yPercent: 105, duration: 1, stagger: 0.09, ease: 'power4.out' }, 0.05);
    else if (h1) tl.from(h1, { y: 28, autoAlpha: 0, duration: 0.9 }, 0);
    var eb = q('.aq-eyebrow'); if (eb) { tl.from(eb, { autoAlpha: 0, duration: 0.3 }, 0); m.scramble(eb, 0) }
    var rest = qa('.aq-stack > .aq-lead, .aq-hero__actions, .aq-stack > .aq-tags');
    if (rest.length) tl.from(rest, { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 0.35);

    /* Drawing: starts with the text on wide screens; on phones (drawing below the actions) when it scrolls in */
    function figure(fig, build) {
      if (!fig) return;
      var t = build();
      if (!t) return;
      t.pause();
      m.on(fig, function () { t.delay(Date.now() - t0 < 400 ? (narrow ? 0.5 : 0.4) : 0.1).play() }, 'top 88%');
    }

    // Equipment figure: print wipe, then leaders out of the drawing to the callouts
    figure(q('.aq-hero__figure'), function () {
      var f = q('.aq-hero__figure'), art = q('.aq-illustration', f), t = m.tw(gsap.timeline({ defaults: { ease: 'power3.out' } }));
      if (art) { gsap.set(art, { clipPath: 'inset(100% 0 0 0)' }); t.to(art, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power3.inOut', clearProps: 'clipPath' }, 0) }
      // the flow scan line rides the print edge up the drawing, then fades
      var scan = q('.aq-hero__scan', f);
      if (art && scan) t.fromTo(scan, { autoAlpha: 1, top: '98%' }, { top: '2%', duration: 1.3, ease: 'power3.inOut' }, 0).to(scan, { autoAlpha: 0, duration: 0.35, clearProps: 'top' }, 1.3);
      // phones (pass 12): no leaders; the numbered pins pop onto the drawing, then the callout rows follow in order
      var svg = narrow ? null : q('.aq-hero__leaders--wide', f), co = qa('.aq-hero__callout', f), pins = narrow ? qa('.aq-hero__pins > .aq-hero__pin', f) : [];
      if (pins.length) t.from(pins, { scale: 0, autoAlpha: 0, duration: 0.4, stagger: 0.12, ease: 'back.out(2.4)', clearProps: 'transform,opacity,visibility' }, 0.95);
      if (co.length) gsap.set(co, { autoAlpha: 0, y: narrow ? 0 : 8 });
      if (svg) {
        var ln = qa('line', svg), dots = qa('circle:not(.is-start)', svg), starts = qa('circle.is-start', svg);
        gsap.set(dots.concat(starts), { autoAlpha: 0 });
        ln.forEach(function (l, i) {
          var x2 = l.getAttribute('x2'), y2 = l.getAttribute('y2'), at = 0.95 + i * 0.16;
          t.to(dots[i], { autoAlpha: 1, duration: 0.2 }, at);
          t.from(l, { attr: { x1: x2, y1: y2 }, duration: 0.55, ease: 'power2.inOut' }, at + 0.05);
          t.to(starts[i], { autoAlpha: 1, duration: 0.15 }, at + 0.55);
          if (co[i]) t.to(co[i], { autoAlpha: 1, y: 0, duration: 0.45, clearProps: 'transform,opacity,visibility' }, at + 0.5);
        });
        // other leader set (hidden at this width): leave it complete
      } else if (co.length) t.to(co, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, clearProps: 'transform,opacity,visibility' }, 0.9);
      return t;
    });

    // Home: the loop draws itself, then water runs round it once
    figure(q('.aq-hero__loop'), function () {
      // the drawing showing at this width: the upright loop on desktop, the one turned on its side on phones (pass 12)
      var f = q('.aq-hero__loop'), svg = qa('.aq-loop__svg', f).filter(function (v) { return v.getBoundingClientRect().width > 0 })[0], pipe = svg && q('.aq-loop__pipe', svg); if (!svg || !pipe) return null;
      var t = m.tw(gsap.timeline({ defaults: { ease: 'power2.out' } }));
      var guide = q('.aq-loop__guide', svg), rule = qa('.aq-loop__rule line', svg), parts = qa('.aq-loop__part > *', svg), arrows = qa('.aq-loop__arrow', svg), lead = qa('.aq-loop__lead line', svg), text = qa('.aq-loop__text text', svg);
      if (svg.classList.contains('aq-loop__svg--narrow')) { // phone: pins land on the parts, then the legend rows
        var pins = qa('.aq-loop__band > .aq-hero__pin', f), rows = qa('.aq-loop__legend li, .aq-loop__cap', f);
        if (pins.length) t.from(pins, { scale: 0, autoAlpha: 0, duration: 0.35, stagger: 0.1, ease: 'back.out(2.4)', clearProps: 'transform,opacity,visibility' }, 1.1);
        if (rows.length) t.from(rows, { autoAlpha: 0, y: 6, duration: 0.4, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 1.2);
      }
      if (guide) t.from(guide, { autoAlpha: 0, duration: 0.6 }, 0);
      if (rule.length) t.from(rule, { autoAlpha: 0, duration: 0.2, stagger: { amount: 0.6 } }, 0.1);
      if (window.DrawSVGPlugin) t.fromTo(pipe, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.6, ease: 'power1.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.2);
      if (parts.length) t.from(parts, { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 0.35, stagger: 0.07, ease: 'back.out(2)' }, 0.7);
      if (lead.length) t.from(lead, { attr: { x1: function (i, l) { return l.getAttribute('x2') } }, duration: 0.4, stagger: 0.15 }, 1.1);
      if (arrows.length) t.from(arrows, { autoAlpha: 0, duration: 0.3, stagger: 0.12 }, 1.2);
      if (text.length) t.from(text, { autoAlpha: 0, y: 4, duration: 0.4, stagger: 0.06 }, 1.2);
      if (window.MotionPathPlugin) {
        var ns = 'http://www.w3.org/2000/svg';
        for (var i = 0; i < 4; i++) {
          var c = document.createElementNS(ns, 'circle'); c.setAttribute('r', '4'); c.setAttribute('class', 'aq-loop__dot'); c.setAttribute('aria-hidden', 'true'); pipe.parentNode.appendChild(c);
          gsap.set(c, { autoAlpha: 0 });
          t.set(c, { autoAlpha: 1 }, 1.75 + i * 0.12);
          t.to(c, { duration: 2.4, ease: 'none', motionPath: { path: pipe, align: pipe, alignOrigin: [0.5, 0.5], start: i * 0.25, end: i * 0.25 + 1 } }, 1.75 + i * 0.12);
          t.to(c, { autoAlpha: 0, duration: 0.3, onComplete: function () { var d = this.targets()[0]; if (d && d.parentNode) d.parentNode.removeChild(d) } }, 1.75 + i * 0.12 + 2.4);
        }
      }
      return t;
    });

    // Index: the rail is laid down the left, each row's tee runs out and its node seats as the rail passes, the row
    // slides off the tee; then the water runs down the rail's bore once and lights each node it passes, briefly.
    figure(q('.aq-hero__index'), function () {
      var f = q('.aq-hero__index'), ol = q('ol', f), li = qa('ol > li', f), lab = q('.aq-hero__index-label', f), t = m.tw(gsap.timeline({ defaults: { ease: 'power3.out' } }));
      if (!ol || !li.length) return null;
      var per = Math.min(0.12, 0.8 / li.length), run = 0.3 + li.length * per;
      if (lab) { t.from(lab, { autoAlpha: 0, duration: 0.2 }, 0); t.add(function () { m.scramble(lab, 0) }, 0) }
      gsap.set(ol, { '--aq-rail': 0, '--aq-water': 0 });
      gsap.set(li, { '--aq-tee': 0, '--aq-node': 0 });
      var rows = li.map(function (l) { return l.firstElementChild }).filter(Boolean);
      gsap.set(rows, { x: -14, autoAlpha: 0 });
      t.to(ol, { '--aq-rail': 1, duration: run, ease: 'none' }, 0.05);
      li.forEach(function (l, i) {
        var at = 0.05 + (i + 0.5) * per * (run / (li.length * per + 0.3)) + 0.1;
        t.to(l, { '--aq-tee': 1, duration: 0.25, ease: 'power2.out' }, at)
          .to(l, { '--aq-node': 1, duration: 0.3, ease: 'back.out(3)' }, at + 0.12);
        if (rows[i]) t.to(rows[i], { x: 0, autoAlpha: 1, duration: 0.5, clearProps: 'transform,opacity,visibility' }, at + 0.15);
      });
      t.to(ol, { '--aq-water': 1, duration: 0.9 + li.length * 0.05, ease: 'power1.inOut' }, run * 0.6);
      return t;
    });

    // Drawn scenes (HeroScene: systems, services, first-system, projects). The IsoKit drawing builds back to front and
    // the water runs its pipes once (AQiso.timeline); each numbered tag and its key row land as the water reaches
    // that part, or in number order where no pipe feeds it (the ring's stations, the room's footprint).
    // Ported from Subframe Motion "Animated workflow diagram" (process-choreography), MIT, (c) 2026 Subframe: the
    // connectors draw toward each output, then each output fades up and scales in (cubic ease-out) as its connector
    // arrives. Reduced motion: no timeline, the scene is complete.
    figure(q('.aq-hero-scene'), function () {
      var f = q('.aq-hero-scene'), svg = q('svg.aq-iso', f);
      var t = svg && window.AQiso ? AQiso.timeline(svg, m, { draw: 1.3, pipe: 0.6, flow: 1.3 }) : null;
      if (!t) return null;
      var arrive = t.data.arrive, base = t.labels.pipes || 1, lab = q('.aq-hero-scene__label', f), more = q('.aq-hero-scene__more', f), last = base;
      if (lab) { t.from(lab, { autoAlpha: 0, duration: 0.25, clearProps: 'opacity,visibility' }, 0.2); t.add(function () { m.scramble(lab, 0) }, 0.2) }
      qa('.aq-hero-scene__tag', f).forEach(function (tag) {
        var k = tag.getAttribute('data-k'), at = arrive['k' + k] != null ? arrive['k' + k] : base + (k - 1) * 0.14, row = q('.aq-hero-scene__key li[data-k="' + k + '"]', f);
        last = Math.max(last, at);
        t.fromTo(tag, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.36, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at);
        if (row) t.from(row, { autoAlpha: 0, y: 8, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at + 0.06);
      });
      if (more) t.from(more, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, last + 0.3);
      return t;
    });

    // Drawn figures (aria-hidden decoration on a dashed frame)
    figure(q('.aq-hero__drawn'), function () {
      var f = q('.aq-hero__drawn'), t = m.tw(gsap.timeline({ defaults: { ease: 'power3.out' } })), lab = q('.aq-hero__drawn-label', f);
      if (lab) { t.from(lab, { autoAlpha: 0, duration: 0.2 }, 0); t.add(function () { m.scramble(lab, 0) }, 0) }
      var run = q('.aq-hero__pipe-run', f);
      if (run) { // spots: the pipe runs left to right, each vignette wipes in as the pipe reaches it
        var vig = qa('.aq-hero__vig', f), dots = qa('.aq-hero__pipe circle', f), arrow = q('.aq-hero__pipe-arrow', f), D = 1.6;
        if (window.DrawSVGPlugin) t.fromTo(run, { drawSVG: '0%' }, { drawSVG: '100%', duration: D, ease: 'none', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.1);
        if (arrow) t.from(arrow, { autoAlpha: 0, x: -3, duration: 0.25 }, 0.1 + D);
        vig.forEach(function (v, i) {
          var at = 0.1 + D * (parseFloat(v.style.left) || 50) / 100 - 0.25, sp = q('.aq-spot', v), tag = q('.aq-hero__vig-t', v);
          if (dots[i]) t.from(dots[i], { autoAlpha: 0, duration: 0.15 }, at + 0.2);
          if (sp) { gsap.set(sp, { clipPath: 'inset(100% 0 0 0)' }); t.to(sp, { clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clipPath' }, at) }
          if (tag) t.from(tag, { autoAlpha: 0, y: 6, duration: 0.4, clearProps: 'opacity,visibility' }, at + 0.45);
        });
        return t;
      }
      var folders = qa('.aq-hero__folder', f);
      if (folders.length) { // binder: folders slide in back to front, then the index rows
        t.from(folders, { y: -28, x: 16, autoAlpha: 0, duration: 0.6, stagger: 0.14, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.1);
        var rows = qa('.aq-hero__folder-list li, .aq-hero__folder-foot', f);
        if (rows.length) t.from(rows, { autoAlpha: 0, x: -8, duration: 0.35, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, 0.2 + folders.length * 0.14 + 0.3);
        return t;
      }
      var rec = q('.aq-hero__record', f), stamp = q('.aq-hero__stamp', f);
      if (rec) { // release record rises, each box ticks, the stamp strikes and the sheet jolts
        t.from(rec, { y: 24, autoAlpha: 0, duration: 0.7, clearProps: 'opacity,visibility' }, 0.1);
        var ticks = qa('li i', rec);
        if (ticks.length) t.from(ticks, { scale: 0, duration: 0.3, stagger: 0.16, ease: 'back.out(3)', clearProps: 'transform' }, 0.6);
        var sign = q('.aq-hero__record-sign', rec); if (sign) t.from(sign, { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, 0.6 + ticks.length * 0.16);
        var hit = 0.9 + ticks.length * 0.16;
        if (stamp) {
          t.fromTo(stamp, { scale: 1.6, rotation: -24, autoAlpha: 0 }, { scale: 1, rotation: -14, autoAlpha: 1, duration: 0.32, ease: 'power4.in', clearProps: 'transform,opacity,visibility' }, hit);
          t.to(rec, { x: 3, y: 2, duration: 0.06, yoyo: true, repeat: 1, ease: 'power1.inOut', clearProps: 'transform' }, hit + 0.32);
        }
        return t;
      }
      var route = q('.aq-hero__route-run', f);
      if (route) { // route: start node, the line runs stop to stop, each stop lands as the line reaches it
        var stops = qa('.aq-hero__stop', f), start = q('.aq-hero__route-start', f), guide = q('.aq-hero__route-guide', f), arr = q('.aq-hero__route-arrow', f), R = 2;
        if (guide) t.from(guide, { autoAlpha: 0, duration: 0.4 }, 0);
        if (start) t.from(start, { autoAlpha: 0, duration: 0.2 }, 0.1);
        if (window.DrawSVGPlugin) t.fromTo(route, { drawSVG: '0%' }, { drawSVG: '100%', duration: R, ease: 'none', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.2);
        [0.2, 0.5, 0.74].forEach(function (p, i) {
          var st = stops[i]; if (!st) return; var b = q('b', st), sp = q('span', st);
          if (b) t.from(b, { scale: 0, duration: 0.45, ease: 'back.out(2.2)', clearProps: 'transform' }, 0.2 + R * p - 0.1);
          if (sp) t.from(sp, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.2 + R * p + 0.15);
        });
        if (arr) t.from(arr, { autoAlpha: 0, duration: 0.2 }, 0.2 + R);
        return t;
      }
      return t;
    });

    // Photograph placeholder: wipes in like a print
    figure(q('.aq-photo'), function () { var ph = q('.aq-photo'); gsap.set(ph, { clipPath: 'inset(100% 0 0 0)' }); return m.tw(gsap.timeline().to(ph, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.inOut', clearProps: 'clipPath' })) });
  });
})();
