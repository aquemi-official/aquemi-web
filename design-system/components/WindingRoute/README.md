WindingRoute draws a treatment train as one winding pipe across a navy band, each stage a stop on the wave with its line glyph, so the reader follows the water stage by stage.

- On the site: a `diagram` block with `"look": "winding-route"` (renderer `assets/src/blocks/look-winding-route.js`). Origin: pass 9 concept `research/pass9/concepts/sys-pw.1.png`.
- Markup: `<section class="aq-section aq-band--navy aq-winding-route-sec">` → `<div class="aq-winding-route" style="--n:7">` with `svg.__line` (one wave stretched over the stops' band: `__fan` feed lines, `__pipe` limestone pipe, `__flow` water line, `__fan--out` outlet lines), `span.__drop` (motion only) and `ol.__stops` → `li.__stop.is-high|is-low` → `div.__mark` (decorative: `__seg` phone pipe bend, `.aq-spot` glyph, optional `__gas`, `__node`) and `div.__text` (`p.__code` "01 / label", `h3.__t`, `p.__d`).
- Geometry: stop i sits at the centre of column i, 25 % (high) or 75 % (low) down the band (`--band`: `space-32` + `space-24`); the glyph sits on the far side of the curve.
- Fields: `h`, `stages` (or `items`) `[{t, d, spot | icon, label, fx}]`. `label`: the short stop name in the mono code (default the first word of `t`). `fx: "gas"`: a few bubbles rise over that stop (CO₂ removal). `optional: true` (or a string, the word to show): a stage fitted only on some systems; its stop is drawn dashed (the node ring, and the phone bend) and its code reads "02 / Heat · Where fitted" (DR-018 rule 2: optional equipment is never drawn as standard); the stop gets `is-optional`.
- Tokens: `navy` ground, `limestone` pipe, `flow` water and node cores, `on-navy` / `on-navy-muted` text. Hover a column: its node grows and its glyph turns `on-navy`.
- Phones: the pipe turns vertical and winds down the left edge (one bend per stage, each row's `__seg`), the text beside it; glyphs hide.
- Up to eight stages. For a branched or interactive train use ProcessDiagram.

## Motion

Motion: the feed fan appears, then the route is wiped on left to right while a droplet rides the head of the water (its height read from the wave); each stop lights as the water reaches it (the node seats with a flow ring, the glyph prints in, the column rises and its code decodes); over a gas stop the bubbles rise; the outlet fan opens last. Phones: each stop's bend draws in turn and lights its stop. Under 5 s; nothing under reduced motion.

Pass 9 polish (phones): each stop has a fixed-height bend whose peak sits level with the stage name (`--wr-y`) and a straight `__tail` carrying the pipe down the rest of the stop; motion draws the bend, then the tail.

Ported (pass 9b): Subframe Motion "Race replay" (race-replay). After the run, one value binds the water's reach, the droplet's place on the wave and the stage reached: pointing along the band scrubs it, and a range input ("Follow the water", arrow keys, Home, End, aria-valuetext names the stage) does the same from the keyboard; stages not yet reached step back. Leaving lets the water run on to the outlet. Wide screens only.
