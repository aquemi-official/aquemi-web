LimitBento sets a page's water-quality limits as a bento of tiles, one limit per tile with its value as an oversized Geist Mono numeral, around a tall navy water column that is filled to the stricter limit with the looser pharmacopoeia value marked high above it.

- On the site: a `spec` block with `"look": "limit-bento"` (renderer `assets/src/blocks/look-limit-bento.js`). Origin: pass 9 concept `research/pass9/concepts/compliance.0.png` (bento, big limit numerals, a tall water tile in the middle). The concept's decorative middle tile became the one data picture: the distance between the value we design to and the other pharmacopoeia's.
- Markup: `<section class="aq-section aq-limit-bento-sec">` → `div.aq-limit-bento` (a grid) with `__head` (the section head and the caption as a navy `__chip`), `figure.__col` (the water column: `__cap`, `__tank` with `ol.__scale` ticks, `__mark--alt` dashed, `__gap` dimension line, `__water` with the `__wave` surface, `__mark--lim`), and `ol.__tiles` (display: contents) of `li.__tile`: `__top` (index, mono name `__p`, icon `__ic`), optional `__lvl` chip, `p.__v` (comparator `__c`, numeral `__n`, unit `__u`), qualifier `__q`, basis `__m` (one tag per ";" part), the row link (`wGaugeGo`). The note follows the bento.
- Fields: `h`, `intro`, `caption`, `rows [{p, v, m, hl, level, link, icon, alt}]`, `note`. New optional row fields: `icon` (an Icon name in the tile corner); `alt {v, m}` on the row the column draws: the other pharmacopoeia's value for the same parameter (`"≤ 5.1 µS/cm at 25 °C"`, `"Ph. Eur."`). The column draws the first row with an `alt`; without one the bento has no column and the tiles take three across (`is-plain`). The scale is a ruler from 0 to the next round number above the larger value (`gaugeScale`), never data. A level chip prints only when the parameter name does not already say it.
- Grid (desktop): heading top left, the first tile under it, the column through both rows in the middle, the other tiles right; tiles from the fourth run on underneath. Every second tile is limestone paper with `data-theme="light"`, so its tags keep contrast in the dark theme.
- Tokens: `surface-raised` and `limestone` tiles, `navy` column, `limestone` water with a `flow` surface line, `on-navy` / `on-navy-muted` marks. Square corners; corner crosses in `line-strong`.
- Phones: heading, the column as a short band, then the tiles one by one; numerals step down to 56 px.
- Use it for three to six limits where one parameter differs between pharmacopoeias. For a type-led list with a guaranteed outlet value use LimitStack; for dials use LimitGauges.

## Motion

Motion: one timeline when the bento scrolls in. Tiles slide in from the side they sit on, each comparator rises and the limit counts up; the column wipes up from the floor, its ticks light, the water fills to the limit with the limit's mark riding the surface, the surface swells twice and settles, then the looser value's dashed mark drops in above. Under 4 s; nothing under reduced motion. The section heading is left to the core.

## Phones (pass 12)

The tile of the row the water column draws (card 01 on compliance) folds into the column under 860 px, so the same value is not read twice; a row with more than one basis or a link keeps its tile. Desktop unchanged.
