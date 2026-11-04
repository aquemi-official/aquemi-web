CertSeals sets certification status as a Swiss row of certificate tiles: a seal (ring of ticks round the item's line icon), the standard or mark it is held to set large and light, what it covers and its status.

- On the site: a `grid` block with `"look": "cert-seals"` (renderer `assets/src/blocks/look-cert-seals.js`), cmp-quality "Certification status". Origin: no concept of its own; adapted from 80-p9-sys-pw-2 (Swiss tiles, oversized values) with the stamp of 93-p9-compliance-2-take2.
- Markup: `<div class="aq-cert-seals">` > `ol.__list` > `li.__item` > `a.__tile` (with a link) or `div.__tile` > `__seal` (svg `__ticks`, `__ring`; `aq-icon.__icon`), `p.__tag` (`is-long` past 14 characters), `h3.__t`, `p.__d`, `__to` (where a linked tile goes), `__go`.
- Fields: `h`, `intro`, `items [{t, d, tag, icon, link}]`. A tile with a link is the link.
- Tokens: first tile `navy` (`on-navy`), the rest `limestone` in two shades (`on-limestone`); 1 px hairline gaps; tag 300 weight.
- Phone: tiles two a row below 1100 px container width, one a row below 560 px with the seal beside the words.
- Motion (`motion.js`): tiles rise in turn, each seal's ring draws and its ticks turn into place, the icon strikes like a stamp with a small jolt, the words settle. Under 3 s.
- Not for: choices that route to pages (LinkGrid).
- Pass 12 round C: live again on cmp-quality "Certification status" (ruling RC3; cert-readout stays in the library). Phones: tighter tiles (16 px padding, long placeholder tags at 16/23), about 1,080 px for five tiles.
- Pass 12 round C verify: a linked tile names where it goes (`__to`, the target's `wlabel`: nav label or block heading, 14 px muted), so its accessible name carries the destination (F4); on phones (560 px and under) the label is visually hidden and only the arrow shows, to keep five tiles near 1,080 px. At 561 to 1100 px tiles take their content height and an odd last tile spans the row as a wide row tile, so five tiles leave no empty cell (F2). Paper tiles are `is-paper` (was `data-theme="light"`); in the dark theme they take `--surface-raised` with `ink` text, as LimitBento's paper tiles do (F6).
