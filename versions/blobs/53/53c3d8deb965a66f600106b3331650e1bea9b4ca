SiteTiles sets a short grid of what changes for a site as one navy drawing sheet: a framed sheet with its zone band, the title large in the top left, and one column per item with its number, title, one isometric part (IsoKit) that makes the change visible, its line and its link.

- On the site: About, "What changes for a Canadian site" (`grid` block, `"look": "site-tiles"`; renderer `assets/src/blocks/look-site-tiles.js`). Origin: pass 9b concept `research/pass9b/concepts/about.2.png` (a navy drawing sheet, four columns each holding one line-drawn part); replaces the pass 9 flat figure plates.
- Markup: `div.aq-site-tiles` (`--n` columns) → `div.__band--t` / `--b` (aria-hidden zone numbers, one per column) and `--l` / `--r` (letters), `div.__head` (the section head), `ol.__cols` of `li.__col.is-<fig>` (rows shared through subgrid) → `span.__n`, `h3.__t`, `div.__plate` (aria-hidden `svg.aq-iso.aq-iso--navy.__svg`, or a Spot), `p.__d`, `p.__go` link.
- Figures (`fig`, default from the item's `icon`): `spool` (a PP spool with a diaphragm valve and a pressure gauge, for `gauge`), `stamp` (a stamp and its imprint), `softener` (twin resin vessels and a brine tank), `truck` (a truck with a crated load, for `wrench`). Any other icon shows as a Spot. No figure carries a value.
- Fields (a `grid` block): `h`, `intro`, `items [{t, d, link, link_label, icon, fig}]`. Best for 3 to 4 items.
- Tokens: `aq-band--navy`; frame and rules `on-navy` hairlines; title Geist Light 64 `limestone`; column titles Geist Light 26 `on-navy`, lines `on-navy-muted`; IsoKit navy line work. Pointing at or focusing a column turns its part's lines towards `flow` and fills its zone number `limestone` (CSS `:has`, no script).
- Phones: the sheet keeps its frame; one column per row with the drawing beside the number and title, the line and link under them; two columns between 860 and 1100 px.

## Motion

Motion: the zone band fades up; the two outer columns swing open on their inner edges like a gatefold's wings while the inner two rise (ported from Subframe Motion paper-fold: rotateY 180 to 0 deg, 720 ms, cubic-bezier(.25,.75,.2,1), backs hidden); then column by column the part draws in IsoKit's order (lines on back to front, solids settle) as its number, title, line and link rise. Once, under 4.5 s; on phones the columns rise in turn, no fold. Nothing under reduced motion.
