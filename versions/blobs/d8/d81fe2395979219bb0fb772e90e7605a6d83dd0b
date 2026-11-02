/* StageTiles: the stages are set like a poster. Each tile's ground wipes up in reading order, 90 ms apart; as it
   lands, its numeral rolls in letter by letter (each glyph hinges up from its foot, 25 ms apart); on the IQ tile the
   pipe walls draw along the run, the joints mark the bends and the water creeps once in the flow direction while the
   arrows light in order. One timeline on scroll-in, under 3 s. Pointing at a tile (or focusing its link) rolls its
   numeral once more: each glyph tips away while its copy hinges up behind it.
   Ported from Subframe Motion "3D text roll" (text-roll), MIT, (c) 2026 Subframe (kept: two faces per glyph in a
   preserve-3d wrapper, out face rotateX 0 to 90 from 50% 25% in 0.32 s, in face 90 to 0 from its bottom edge in
   0.36 s, 120 ms behind, 25 ms per glyph, ease cubic-bezier(.25,1,.5,1), full text at once under reduced motion;
   replaced: motion spans and keyed replay with GSAP on the tile's numeral, replayed on hover or focus). */
AQmotion.fx('StageTiles', function (root, m) {
  var D = window.DrawSVGPlugin;
  var ez = window.CustomEase ? (CustomEase.get('aq-roll') || CustomEase.create('aq-roll', 'M0,0 C0.25,1 0.5,1 1,1')) : 'power3.out';
  [].forEach.call(root.querySelectorAll('.aq-stage-tiles'), function (el) {
    var list = el.querySelector('.aq-stage-tiles__list'); if (!list) return; m.claim(list);
    var tiles = [].slice.call(list.querySelectorAll('.aq-stage-tiles__tile'));
    /* two faces per glyph; the numeral keeps its text for anything reading the DOM (it is aria-hidden) */
    var rolls = tiles.map(function (t) {
      var n = t.querySelector('.aq-stage-tiles__n'); if (!n) return null;
      var txt = n.textContent, faces = [];
      n.textContent = '';
      txt.split('').forEach(function (c, i) {
        var w = document.createElement('span'), a = document.createElement('span'), b = document.createElement('span');
        w.className = 'aq-stage-tiles__ch'; a.textContent = b.textContent = c;
        if (i === txt.length - 1) { w.className += ' aq-stage-tiles__sl'; a.style.color = b.style.color = 'var(--' + (t.classList.contains('is-lime') ? 'on-limestone-muted' : 'on-navy-muted') + ')' }
        w.appendChild(a); w.appendChild(b); n.appendChild(w); faces.push([a, b]);
      });
      gsap.set(faces.map(function (f) { return f[1] }), { rotateX: 90, transformOrigin: '50% 100%' });
      return faces;
    });
    function rollIn(tl, faces, at) {
      faces.forEach(function (f, i) { tl.fromTo(f[0], { rotateX: 90, transformOrigin: '50% 100%' }, { rotateX: 0, duration: 0.36, ease: ez }, at + i * 0.025) });
    }
    var tl = gsap.timeline({ paused: true }); m.tw(tl);
    tiles.forEach(function (t, i) {
      var at = i * 0.09;
      tl.fromTo(t, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: 'power3.inOut', clearProps: 'clipPath' }, at);
      tl.from(t.querySelector('.aq-stage-tiles__body'), { autoAlpha: 0, y: 12, duration: 0.45, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, at + 0.35);
      if (rolls[i]) rollIn(tl, rolls[i], at + 0.3);
    });
    var art = list.querySelector('.aq-stage-tiles__svg');
    if (art) {
      var at = 0.9;
      if (D) tl.fromTo(art.querySelectorAll('.aq-stage-tiles__pw, .aq-stage-tiles__pi'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, at);
      tl.from(art.querySelectorAll('.aq-stage-tiles__jt'), { autoAlpha: 0, duration: 0.2, stagger: 0.06, clearProps: 'opacity,visibility' }, at + 0.3);
      tl.from(art.querySelectorAll('.aq-stage-tiles__water'), { autoAlpha: 0, duration: 0.3, clearProps: 'opacity,visibility' }, at + 0.8);
      tl.fromTo(art.querySelectorAll('.aq-stage-tiles__water'), { strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: 1.2, ease: 'none', clearProps: 'strokeDashoffset' }, at + 0.8);
      tl.from(art.querySelectorAll('.aq-stage-tiles__ar'), { autoAlpha: 0, x: -3, duration: 0.25, stagger: 0.12, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, at + 0.9);
    }
    m.on(list, function () { tl.play() }, 'top 80%');

    /* hover / focus: roll the numeral once (visitor-driven, may repeat) */
    tiles.forEach(function (t, i) {
      var faces = rolls[i], busy = null; if (!faces) return;
      function roll() {
        if (busy || tl.isActive()) return;
        busy = gsap.timeline({ onComplete: function () { gsap.set(faces.map(function (f) { return f[0] }), { rotateX: 0 }); gsap.set(faces.map(function (f) { return f[1] }), { rotateX: 90 }); busy = null } });
        faces.forEach(function (f, k) {
          busy.fromTo(f[0], { rotateX: 0, transformOrigin: '50% 25%' }, { rotateX: 90, duration: 0.32, ease: ez }, k * 0.025);
          busy.fromTo(f[1], { rotateX: 90, transformOrigin: '50% 100%' }, { rotateX: 0, duration: 0.36, ease: ez }, k * 0.025 + 0.12);
        });
      }
      t.addEventListener('pointerenter', function (ev) { if (ev.pointerType !== 'touch') roll() });
      t.addEventListener('focusin', roll);
    });
  });
});
