SensorLoop draws a spec block of signals where each one is measured: one instrumented storage and distribution loop in IsoKit line art with an ISA instrument balloon on every measuring point, instrument schedule cards above and below on leaders, and a dashed signal bus every instrument drops into.

Look `sensor-loop` (`assets/src/blocks/look-sensor-loop.js`) on a `spec` block. Used on sys-monitoring, "Sensors and signals". Concepts adapted: systems.3 and sys-pw.3 (callouts wired to the part that answers them), set as a P&ID-style instrument schedule.

- Markup: `<div class="aq-sensor-loop">` (12-column grid) > `ol.__cards` (display contents; `li.__card--t|--b|--free` with `__n`, `h3.__p`, `p.__v`, `p.__m`, placed by inline grid-row and grid-column) + `__fig` (`svg.aq-iso.__svg`: `g.__busg` with `__bus`, `__tap`, `__node`; the scaled IsoKit scene; `__lead` paths; `g.__ball` (`circle`, `__bar`, `__stem`, number `text`; `.is-more` for a further point)). `p.__note` after.
- The scene: tank, pump, UV unit, TOC and conductivity analysers, divert valve with drain, two points of use, the return overhead back to the tank with flow meter, pressure gauge and temperature wells.
- Fields: `h`, `caption` (printed as the eyebrow, as SpecTable does), `rows [{p, v, m, site}]`, `note`, `fold`, `fold_noun`. `site`: `toc | cond | temp | divert | flow | uv | data`; temperature and flow mark several points (dashed balloons for the further ones); `data` sits on the bus. A row without a site is a card only.
- Balloons go to the top or bottom card row by height, each row sorted left to right. Desktop shows every row; the fold applies on phones only.
- Drawn inline (not in IsoKit): the balloons, the bus, the flow meter body and the temperature wells.
- Phones: drawing first (leaders off, balloons enlarged), then the cards down a dashed vertical signal rail with their numbers on it.

Motion: IsoKit's choreography on the scene (equipment draws back to front, water runs the loop, stages light); the balloons strike on as the water passes, leaders run from the cards to them and the cards print; last the bus and its taps appear. Once, under 5 s. Hover a card to light its leader, balloons and tap.
