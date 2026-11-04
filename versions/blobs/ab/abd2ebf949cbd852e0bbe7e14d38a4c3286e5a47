WetRunHmi sets an explainer as the test bay's water route on a navy blueprint ground: one double-wall pipe runs across the section and folds down and back up, each point sits beside its station, and a two-position switch runs the skid dry or with water (look `wet-run-hmi`, prose block `as: "explainer"`).

Concept: pass 9b `svc-fat-sat.1` (one continuous double-line pipe route threading the numbered points on navy, each claim on a valve or instrument along it), built on the pass 9 dry/with-water switch.

## Markup
`<section class="aq-section aq-wet-run-hmi-sec" data-theme="dark">` > `.aq-in` > `.aq-wet-run-hmi.is-wet` > `__head` (section head, `__switch[role=group]` with `__thumb` and two `button.__mode[data-wrh-mode][aria-pressed]`) and `__fig` (the route svg, aria-hidden; HTML markers `span.__mk[data-part]` placed in % of the drawing; `ol.__pts` > `li.__pt[data-part][tabindex=0]` placed by inline left/top, with `__n`, `h3.__t`, `p.__d`).

## Fields
`h`, `points` [{`t`, `d`, `part`, `x`, `y`}], `modes` [dry label, wet label]. `part`: "divert" (the three-way valve with its branch to drain), "outlet" (conductivity and TOC on the low run), "record" (the logger on the last run); a point without one takes the next free part. `x`, `y`: optional text position in % of the drawing (defaults per part). `at` and `figure` are the fallback renderer's.

## Rules
- Navy ground in both themes (`data-theme="dark"` tokens inside). Heading light 300 at display scale. The pipe is a 10-unit `line-strong` wall with a `navy` bore (two hairline walls) and a 3-unit `flow` water line; symbols flat, 1.5-unit `line-strong`; readouts are bars, never invented figures.
- State on the root: `is-wet` (default, the page is complete without script) or `is-dry` (empty pipe, blank readouts, unlit markers). Switch buttons are 44 px tall with `aria-pressed`; arrow keys, Home and End move between them.
- Pointing at or focusing a point swells its station's marker (`:has`).
- Up to a 1080 px container the route turns vertical: one CSS pipe down the left, the numbers on it as round markers, the water filling it top down (empty when dry).

## Motion
The pipe walls draw along the route, symbols draw, points rise in route order, all dry; then the switch's thumb springs to water (ported from Subframe Motion `sliding-tabs`, MIT: one shared highlight on a 460 / 34 spring, no travel for keyboard input) and the water runs the route, each marker lighting as it arrives, the readouts filling at the low run and the trend drawing at the logger. Under 5 s, once. Choosing "with water" afterwards runs the water again (visitor-driven); "dry" empties the pipe.

Up to tablet width (pass 12, audit S10): a compact strip of the skid (`svg.__strip`, 360 x 150 units, about 150 px high on a phone) stands over the points: feed, pump, RO, the divert valve and its drain, COND and TOC with their readouts, the logger and its trend, and the points' numbers on their stations (`g.__smk`, keyed by part). It uses the wide route's classes, so the dry / water switch drives it the same way: dry empties the pipe, blanks readouts and trend and unlights the numbers. Motion: with water, the strip's water runs feed to outlet and its numbers pop as it passes. Tags 13.5 units (12+ px at 360). Desktop unchanged.
