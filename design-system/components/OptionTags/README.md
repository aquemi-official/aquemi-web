OptionTags lays a system's configuration options out as physical tags on a limestone table, so each option reads as a separate item the buyer can add to the base skid.

- On the site: an `options` block with `"look": "option-tags"` (renderer `assets/src/blocks/look-option-tags.js`). Origin: pass 9 concept `research/pass9/concepts/sys-pw.4.png` (flat-lay of shipping tags, a round tag, folders, sample vials).
- Markup: `<section class="aq-section aq-band--limestone aq-option-tags-sec">` → `<div class="aq-option-tags">` (three columns, a `navy` strip behind the third running off the right edge): `div.__label` (the section head on a paper label card, then `p.__base`: base glyph and "Base skid · <page>"), `ol.__list` (display: contents) of `li.__item--tag|round|folder` (`--r` tilt, `--c` / `--rw` desktop cell) → `svg.__string`, `div.__tag` → `span.__eyelet`, `.__body` (`h3.__t`, `p.__d`, `span.__foot` with the glyph stamp and the mono number); two decorative `svg.__vial`.
- Fields: `h`, `intro`, `items [{t, d, spot | icon, shape, link}]`, `spot` (base glyph), `base` (default "Base skid"), `fold`, `fold_noun`. `shape`: `tag` (default), `round`, or `folder` (folders sit on the navy strip). An item `link` makes the tag body the link.
- Fold: phones only (desktop shows the whole table). Hover or focus picks a tag up: it straightens and lifts.
- Tokens: `limestone` table, `surface-raised` tags with `line-strong` edges, `navy` strip with `limestone` folders, `flow` stamps and vial liquid lines. No shadows.
- Phones: one column, tilt reduced, folders on the limestone ground, vials hidden, fold button back.
- No folder among the items (pass 12): the navy strip is not drawn (`.is-flat`; it would stand empty) and the tags fill three columns on desktop.

## Motion

Motion: the label card's base line settles first; then each tag drops onto its place from above, turning as it falls and settling at its own tilt, its string pulling out from the eyelet; the stamp strikes a beat later; folders slide in from the right onto the navy strip; the vials roll in last. Under 5 s; folded tags appear whole when opened; nothing under reduced motion.

Pass 12 verify fixes: five options or fewer are never folded (the fold applies to longer lists, phones only); on phones the strings are hidden (tilt and eyelets keep the tag idea). Dark theme: the label lead uses `--ink-muted` (the card turns navy), the fold button the limestone inks.
