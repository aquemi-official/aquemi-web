/* WalkdownPins: the walkdown. The installed system draws itself on the sheet and the water runs the loop once
   (IsoKit choreography: parts back to front, pipe walls, then the flow through tank, pump, loop and both points of
   use); as the drawing settles, the check markers strike onto their parts in check order and the leader callouts draw
   out to their names. One timeline on scroll-in, under 5 s. Pointing at a row lights its part
   and pin (the look's handler; CSS). */
AQmotion.fx('WalkdownPins', function (root, m) {
  [].forEach.call(root.querySelectorAll('.aq-walkdown-pins'), function (el) {
    var sheet = el.querySelector('.aq-walkdown-pins__sheet'); if (!sheet) return; m.claim(sheet);
    var svg = sheet.querySelector('svg.aq-iso'), pins = [].slice.call(sheet.querySelectorAll('.aq-walkdown-pins__pin'));
    var tl = window.AQiso && AQiso.timeline(svg, m, { draw: 1.4, pipe: 0.7, flow: 1.3 });
    if (!tl) return;
    pins.forEach(function (p, i) { tl.fromTo(p, { scale: 1.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power3.in', clearProps: 'opacity,visibility,transform' }, 'flow+=' + (0.15 + i * 0.1)) });
    tl.from(sheet.querySelectorAll('.aq-walkdown-pins__lab'), { autoAlpha: 0, duration: 0.3, stagger: 0.1, clearProps: 'opacity,visibility' }, 'flow+=0.6');
    m.on(sheet, function () { tl.play() }, 'top 75%');
  });
});
