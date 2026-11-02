ModulePlinth draws an options block with a base as modules standing on that base: an isometric plinth on a navy blueprint carries one block per option, each fed by a riser from the loop along the plinth, with numbered cards beside it.

- On the site: an `options` block (`"as": "modules"`) with `"look": "module-plinth"` (renderer `assets/src/blocks/look-module-plinth.js`); used on ind-cdmo ("Redundancy that keeps clients supplied"). Origin: no concept of its own (quota); adapted from sys-pw.4 (objects you pick up) and STYLE-ATLAS hybrid 1 (figure plate with numbered parts).
- Drawing: IsoKit (`isoBoxD`, `isoPoly`, `isoPipe`, `isoArrow`, `isoSheet`, `aq-iso--navy`). The kit has no plain module block, so the blocks (box, front panel, nameplate line in `flow`, top panel) are drawn in the renderer; candidate for the kit. HTML markers `span.__mk` (positioned with `isoPct`) and the base label `span.__base`.
- Markup: `div.aq-module-plinth` → `div.aq-iso-figure.__fig` (sticky on desktop) and `div.__list` → `ol.__cards` of `li.__card` (`span.__n`, `__spot`, `h3.__t` with the link, `p.__d`).
- Fields: `h`, `base`, `items` [{t, d, spot, link}], `fold`, `fold_noun` (phones only). Up to eight options are drawn.
- Hover/focus a card: its block lifts and turns `limestone`, its marker fills (CSS `:has`, one rule per position).
- Mid widths: drawing above the cards; phones one column, fold back on.

## Motion

The drawing builds through `AQiso.timeline` (sheet, plinth, modules back to front, risers and loop, then the water along the loop and up each riser); as the water reaches a module its marker drops on with a bounce; the cards deal in beside it. Once on scroll-in, under 5 s; settles static; nothing under reduced motion.
