TankSection reads fabrication parameters off a blueprint of the storage tank cut in half on a navy band, each parameter a numbered callout on the part it governs and the rest in a parts schedule.

- On the site: a `spec` block with `"look": "tank-section"` (renderer `assets/src/blocks/look-tank-section.js`), sys-storage "Tank and pipework". Origin: no concept of its own; adapted from the build brief's "a cross-section of the tank" and the callout plate of `research/pass9/concepts/industries.3.png`, as the page's one blueprint section.
- Markup: `div.aq-tank-section` > `div.__fig` (three columns: labels, drawing, labels) > `div.__draw` > `svg.__svg` (hatched wall cut, water, spray jets, nozzles, vent filter, outlet with a butt joint, dimensions H and ID, detail circles A surface and B joint, leaders `path.__leader`, `g.__balloon`), `ol.__calls` of `li.__call.is-l|is-r` (`--y` its leader height; `span.__n`, `h3.__p`, `p.__v`, `p.__m`); then `table.__sched` (the block's `cols` as headers, rows without a part) and `div.__block` (title block, aria-hidden).
- Fields: `h`, `caption` (eyebrow and table caption), `cols`, `rows [{p, v, m, part, link, link_label}]`, `fold`, `fold_noun`. `part`: `spray`, `design`, `volume`, `contact`, `surface`, `joint` (each once). `at` (ParameterCallouts) is ignored here.
- Drawn in the renderer, flat (a section view is not isometric): `on-navy` lines, wall hatching in `on-navy-muted`, water in `flow` lightened towards `on-navy`, leaders and balloons in `limestone`. SVG text only for drawing letters (A, B, H, ID) and balloon numbers that repeat the list's.
- Fold: phones only, on the schedule rows (callouts always show).
- Phones: drawing full width with its balloons, callouts as a numbered list under it, schedule rows stacked.

## Motion

Motion: the blueprint is drawn as a draughtsman would: floor, legs and shell outline, the cut wall's hatching fills, nozzles, vent filter and outlet; the water level rises and the spray ball's jets open; the detail circles strike out from their marks; each leader runs to the side, its balloon pops and its label slides in along the hairline; the schedule rows follow. Under 5 s; nothing under reduced motion.

Pass 9 polish: the drawing grid sits behind the drawing column only (callout columns on clean navy); callout and schedule values are Geist, not mono.
