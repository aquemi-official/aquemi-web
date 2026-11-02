StandardTiles sets a short grid of linked items as a Swiss tile grid three across: each item a slash-numbered navy or limestone tile carrying its standard or control tag, plus a blueprint tile that draws the item being pointed at and a flow block that sets its tag large.

- On the site: a `grid` block with `"look": "standard-tiles"` (renderer `assets/src/blocks/look-standard-tiles.js`); used on ind-meddevice ("Systems for device plants"). Origin: pass 9b concept ind-meddevice.2 (3 + 3 grid of slash-numbered navy and limestone link tiles, a blueprint tile and an abstract steel-blue tile); pass 9 sys-pw.2 and home's industry feed before it.
- Markup: `ol.aq-standard-tiles` → `li.__tile.is-navy` / `.is-stone` (alternating) → `a.__in` (`span.__no` "01" + `span.__sl` "/", Geist Mono Light 88; `span.__tag` outlined mono; `div.__body` with `h3.__t` and `span.__d` under a hairline; `span.__arrow`), then `li.__plate` (aria-hidden: `span.__frame` and one `span.__layer` per item with an IsoKit drawing on navy) and `li.__block` (aria-hidden: `span.__wedge` in `flow`, `span.__big` repeating the pointed item's tag).
- Drawings by the item's `icon`: `ro-membrane` → RO rack; `loop` → tank, pump and loop; `conductivity` → analyser on a line and control panel; `valve` → a diaphragm valve and gauge on a run. Other icons draw nothing (the layer is left out).
- Fields, as grid: `h`, `intro`, `items` [{t, d, icon, tag, link}]. Each tile is one link.
- Pointing at or focusing a tile selects it (project-index, in the renderer so it also works under reduced motion): its ground steps, its slash turns, the plate shows its drawing and the block its tag (240 ms, .2/.85/.25/1); the selection stays until another tile is chosen.
- Phones: the four tiles stacked full width, the plate and the block side by side under them.

## Motion

On scroll-in the tiles wipe down along the grid's diagonals (70 ms apart), the numerals roll up on odometer wheels (sliding-number, `m.count`), tags and bodies rise, the flow square opens from its corner and the plate draws its first system the IsoKit way. One timeline, under 3 s; nothing under reduced motion. The pointer selection is ported from Subframe Motion "Hover image preview list" (project-index).
