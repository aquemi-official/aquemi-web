TwinRoute draws a FAT versus SAT comparison as two routes the same skid takes: our test bay and your site, each test a station on both pipes (look `twin-route`, table block `as: "versus"`).

Concept: adapted from systems.2 (the seam between our side and your side) and home.0 (one water line through real equipment): here the line splits into two routes, and the truck in the centre column carries the skid from one to the other.

## Markup
`<section class="aq-section aq-twin-route-sec">` > `.aq-twin-route` > `__head` (`__scene--fat`, `__road` with the truck and `__lane`, `__scene--sat`: IsoKit svgs, aria-hidden), `__labels` (`__lab--fat`, `__lab--test`, `__lab--sat` and two `__rail is-cap`), the fold wrapping `ol.__rows` > `li.__row` (`__res--fat`, `__rail--fat`, `h3.__test`, `__res--sat`, `__rail--sat`; each rail holds `__water` and `__node`), then `__end` (`__res--fat`, `__turn--fat`, `__reuse`, `__turn--sat`, `__res--sat`).

## Fields
As a versus table: `cols` [test, FAT label, SAT label], `rows` [[test, FAT cell, SAT cell]] (strings or `{t, link}`), `conclusion` [label, FAT side, SAT side], `fold`, `fold_noun`; new optional `route_labels` (small eyebrows over the two route labels). A cell starting "Not possible" breaks its pipe (dashed walls, no water, an open node with a cross).

## Rules
- One five-track grid (FAT | pipe | test | pipe | SAT) for scenes, labels, rows and conclusion, so every station lines up. Pipes are CSS twin walls in `line-strong` with a 2 px `flow` centre line; nodes `flow`.
- Test names large (20/28) in the middle; results 15/24 `ink-muted`, FAT right-aligned to its pipe, SAT left-aligned.
- The reuse label is the one navy block; both routes turn in to it.
- The fold applies on phones only; desktop shows every station.
- Phone: the two scenes side by side, the route labels become a mono key in front of each result, two thin rails down the left.
- Not for comparisons that are not one object at two places; use the versus table.

## Motion
The test bay draws and its water runs (IsoKit choreography), the lane draws and the truck drives across the centre column towards your site, then your site draws and its water runs to the point of use; the route labels rise and the caps fill. Each row is a station: as it scrolls in, water runs down the FAT pipe to its node, then down the SAT pipe (a broken run only shows its open node). The conclusion's turns draw in and the reuse label strikes. Each trigger once, under 5 s; nothing under reduced motion. Hover swells a row's nodes.

Polish (pass 9): each scene stands on a floor line and both routes drop from it (a cap rail on each side in the labels row, the truck lane on the same floor); on phones each scene carries its caption (`__cap`, the FAT / SAT column labels).
