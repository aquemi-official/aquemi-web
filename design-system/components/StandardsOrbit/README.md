StandardsOrbit draws a standards map as orbits round the plant: the Purified Water plant in isometric line art in the middle of a navy band, two elliptical rings round it, and each zone of the system a node on the outer ring with its standards beside it and an arc running in to the part that zone governs.

- On the site: a `standards-map` block with `"look": "standards-orbit"` (renderer `assets/src/blocks/look-standards-orbit.js`). Origin: pass 9 concept `research/pass9/concepts/compliance.1.png` (standards as nodes on orbit rings around a plant schematic, arcs touching the part they govern).
- Markup: `<section class="aq-section aq-band--navy aq-standards-orbit-sec">` → `div.aq-standards-orbit` → `div.__stage` (keeps the orbit svg's aspect, `--sw` / `--sh`) with `svg.__orbits` (`__ring`, `__ring--in`, `__ring--far`, `__tick`, `__arc`, `__end`, `g.__node` with `__halo` and `__dot`), `div.__plant` (an IsoKit svg, `aq-iso--navy`) and `ol.__zones` of `li.__zone.is-l|is-r|is-b` placed at `--x` / `--y` (its node): `__head` (index, `h3.__t` whose link jumps to the zone's proof section) and `ul.__codes` of `a.__code` chips (`data-smap-code`, `data-smap-to`: the standards-map click handler in `blocks/standardsmap.js` scrolls to the row naming the code, unfolding it first).
- Fields, as the standards map: `zones [{t, codes, to, spot}]`; a code may be `{t, to}`. `spot` picks the drawn part the arc touches: `ro-skid` RO rack, `storage-tank` tank and loop, `gauge` control panel, `weld` skid frame (fabrication), `binder` binders; any other spot gets a node and no arc. Zones take the slots left top, right top, right bottom, left bottom, bottom in order (five on the rings).
- Hover or focus on a zone (its title or any chip) lights its arc, node and drawn part (`is-on`, `is-lit`) and dims the other arcs; chips have a 44 px hit area.
- Tokens: `navy` ground, `on-navy` / `on-navy-muted` lines and text, `flow` mixed with `on-navy` for a lit arc. The drawing is IsoKit's navy style.
- Phones: the plant on top at full width, then the zones as a list strung on a vertical orbit line down the left, chips under each title.
- Use it for one map of five zones or fewer. For more zones use StandardsMap.

## Motion

Motion: one timeline when the stage scrolls in. The rings draw on from their sides and the ticks fade up while the plant builds (IsoKit: parts, pipes, a run of water); then each zone in turn: its node lands on the ring, its arc draws in to the part and the part lights as the arc touches it, and the zone's title and chips slide out from the node's side. Parts settle back at the end. Under 5 s; nothing under reduced motion. Phones (rings and arcs hidden) play the plant and the list.

Ported (pass 9b): Subframe Motion "Orbiting circles" (orbiting-circles): each node arrives by riding the outer orbit a quarter turn into its slot (once, settling). Pointing at or focusing a zone runs a signal (`AQbeam`) down its arc from the node into the part it governs.

## Phones (pass 12)

The sticky strip runs under 600 px (`data-pk-bp="599"`); 600-860 px keep the large plant with its pins, and the 44 px chips wrap at their own width.

The plant carries one numbered pin (01-05) per zone, on the part the zone governs (`__pin`, inside `__pan`, hidden above 860 px). The plant is a 180 px sticky strip under the header (PhoneKit sticky figure); the zone on the reading line lights its pin, its drawn part and its node on the orbit line. Zone titles are 44 px links; standard chips are 44 px tall, two to a row, wrapping inside the chip. The section clips with `overflow: clip` (not the navy band's `hidden`, which would stop the strip from sticking).
