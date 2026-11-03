StageTiles sets ordered stages as a Swiss row of navy and limestone tiles, each led by a huge light slash numeral, with the heading in a navy band over them (look `stage-tiles`, steps block).

Concept: pass 9b svc-cq.0 (C&Q stages as tiles with slash numerals, one blueprint pipe tile for IQ).

## Markup
`<section class="aq-section aq-stage-tiles-sec">` > `.aq-stage-tiles[.is-six]` > `__head` (section head) and `ol.__list` > `li.__tile.is-lime|is-navy[.has-art]` (`__art` > `svg.__svg` when the item has art, `__n` with the slash in `i`, `__body` > `__lab`, `h3.__t`, `p.__d`).

## Fields
`h`, `intro`, `items` [{`t`, `d`, `link`, `label`, `art`}]. `label`: a short line over the name, shown only when the name does not already contain it. `art`: "piping" puts the pipe-run blueprint (twin walls, joint lines at the bends drawn flush with the walls, with no bead or collar while the joining method is open (FD-18, DR-018), flow arrows, a title block) in place of the big numeral.

## Rules
- Tones run limestone, navy, navy by index so two limestone tiles never meet; navy neighbours get an `on-navy-muted` hairline.
- Numerals: Geist Mono light 96 px (art tile 40 px), slash in the muted tone; names Geist 21 px, text 14 px.
- Six stages, page wider than 1080 px: five columns, the heading over 01 to 04, 05 beside the heading, 06 under it (one subgrid over both rows). Otherwise the heading over a three-column grid; phones one column, numeral beside the words.
- Phones (pass 12, 1,606 to ~1,230 px): the heading band (the intro without its inset frame), the pipe-run drawing as a band under it (`div.__band`, a phone-only aria-hidden copy; the IQ tile's own drawing hides; motion draws whichever shows), then the stages as a 2-column grid of square tiles (equal rows, at least square up to 220 px tall, so tablet tiles do not grow into empty 360 px squares; the heading column aligned left): 44 px numeral, name, line at 14 px. Under 360 px one column. Desktop unchanged.
- A flow rule draws across a tile's top on hover or focus.

## Motion
Tiles wipe up in reading order; each numeral rolls in glyph by glyph (text-roll port), the IQ tile's pipes draw, the joints mark the bends and the water creeps once. Hover or focus rolls a tile's numeral again. Once, under 3 s; nothing under reduced motion.
