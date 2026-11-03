PlantStations draws a grid of points of use as an isometric plant room: the package in the back corner, a dashed route round the room to one numbered station per item, each station's tag keyed once to the numbered row beside the plan.

- On the site: a `grid` block with `"look": "plant-stations"` (renderer `assets/src/blocks/look-plant-stations.js`), on ind-personal-care "Where water goes in a personal care plant". Concept: pass 12 image 201 (take 2), `design-system/inspiration/gemini/201-p12-ind-personal-care-uses-take2.png`; rebuilt with the log's fixes: tags 13 px, one number per station, keyed once to the rows; stations come from the block's items (four here), never from the image.
- Drawing: IsoKit (`isoPart` ro, tank, outlet, module; `isoBoxD`, `isoCylD`, `isoPoly`, `isoArrow`). The room is a floor slab and two back walls; the route and its branches are dashed `flow` lines on the floor. A station is drawn by what its item names: a batching vessel (ingredient, batch, emulsion), a point of use with its hose (rinse and otherwise), a bench with bottles (laboratory, QC), a second line (household). No station carries words of its own.
- Markup: `div.aq-plant-stations` → `div.__plan.aq-iso-figure` (`svg.__svg`, `span.__tag[data-i]` per station, positioned with `isoPct`) and `ol.__rows` of `li.__row[data-i]` (`__in` a div, or a link when the item has one: `__no`, `__t`, `__d`).
- Fields: `h`, `intro`, `items [{t, d, link}]`. No new fields. Up to six stations; items past six are listed without one.
- Pointing at a row (or focusing its link) lights its station (`is-lit`), its branch and its tag (`flow`).
- **Phones** (≤ 860 px): the plan first, then every row. Up to 600 px the plan is trimmed to the room (drawn 124 % wide, its empty floor margins off the sides, tags 13 px); 601–860 px it shows whole, capped at 640 px and centred (the trim cut both back walls at 768). Every row shows; no fold, since every row has a tag on the plan (S7). About 1,020 px for four items (industry-feed was 1,200).
- Use it for three to six places in one plant that the same water reaches. For a list without a place, use IndustryFeed or a plain grid.

## Motion

IsoKit's choreography on the plan (equipment draws back to front, water runs the pipes), the dashed route creeps once, the tags drop onto their stations in row order as the rows rise in. Once, under 4 s; nothing under reduced motion.
