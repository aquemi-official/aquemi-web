NoteSheet is the notes register with its featured note previewed as a tall folded-corner drawing sheet beside the numbered rows, one flow leader joining the sheet to the note's row (pass 12 E, concept 254).

- On the site: News, "The notes register" (`register` block, `"look": "note-sheet"`; renderer
  `assets/src/blocks/look-note-sheet.js`, which also carries the topic filter). RevisionRegister and NotesRegister,
  the earlier looks of the same block, stay in the library.
- Fields (a `register` block): `h`, `intro`, `topics`, `items [{t, topic, std, date, link, featured, spot, d}]`,
  `fold`, `fold_noun`. The featured item is the one with `featured: true`, else the first of the first topic. Never a
  date that is not given; a placeholder date stays a placeholder (shown on its row). Counts follow DR-018 rule 6 (a
  dated note counts as a note, an undated one as a topic) in the hidden live count.
- The sheet's drawing: when the featured item's `spot` is `storage-tank` (or it has no spot and links to sys-storage),
  IsoKit draws a flat-bottom PP storage tank on its plinth with its loop: the low outlet stub, a PP diaphragm valve on
  it, the riser and the return over the roof into the return nozzle, flow arrows, a floor line (house PP rules: no
  legs, dished head, flanges or metal ball valve). Any other spot draws its Spot vignette; no spot, no drawing.
- Markup: `section.aq-band--limestone.aq-note-sheet-sec` → section head (title, intro) → `div.aq-note-sheet` (grid) →
  `aside.__sheet` (the 1 px `line-strong` outline, clipped to the folded corner) → `div.__paper` (`surface-raised`;
  the fold flap is its `::after` on `surface-sunken`) → `div.__fig` (svg `aq-iso--ink`), `p.__sk` ("Featured" and
  the row number in flow), `p.__q` (the reader's question, `d`), `h3.__st` (the title; its link covers the sheet),
  `p.__go` ("Read the note" when the note is on this page, else "Applied on <page>"), `p.__std` (the standard in mono,
  over a `line` rule). Then `div.__list` → `div.__topics[role=group]` (`button.__tab[aria-pressed][data-topic]`, "All"
  first, counts in mono), `p.__count[aria-live]` (visually hidden), the fold → `ol.__rows` → `li.__row[data-topic]`
  (`.is-lead` for the featured one, which carries `span.__ld`, the leader): `span.__no`, `h3.__t` (its link covers the
  row), `p.__meta` (`span.__tp` topic, `span.__code` standard, each `; `-separated code a nowrap `span.__seg`, as in `p.__std`, `span.__date` when the item has a date).
- Desktop: sheet 4 / list 7 columns with a `space-16` gutter; the sheet is sticky (`space-24` from the top) so it
  stays beside the rows when Show all opens. Topic line: Geist 500 17/24 `ink-muted`, pressed `ink` with a 2 px `flow`
  underline, over a 2 px `line-strong` rule. Rows on `line-strong` hairlines; titles Geist 19/26 `ink`; topic 15/22
  `ink-muted` and standard mono 13/20 `ink-muted` at the right (tab counts mono 12/16 `ink-muted`; both AA on limestone). Tabs at least 44 px wide. The featured row sits between two 2 px `flow` rules,
  its number in `flow`, and its leader (1.5 px `flow`, a dot at the sheet end) runs from the row's middle across the
  gutter, its dot on the sheet's outline.
- Container 861-1120 px: a `space-12` gutter (the leader shortened to match), the topic line 16 px with `space-6` gaps,
  and the row's topic and standard under its title, so titles keep their width.
- Container 860 px and below: the sheet becomes a compact card above the list (a 168 px drawing strip over a `line`
  rule, "Featured 01", the title at 18/25, Read the note, the standard in mono 14/21; the question is left out), the
  topic line one sideways-scrolling row of 44 px chips, rows as number and title with topic and standard under the
  title at 14/21, each whole row one link. The leader turns down the left edge: from the card's foot past the chips to
  row 01's top flow rule (only while row 01 is the first row). At 601-860 px the card runs in two columns (a 200 px drawing at the left behind a `line` rule, the text
  beside it). At 600 px and below the drawing strip is 180 px and,
  under "All", rows 01-03 show (Show all opens the rest); a chosen topic shows every match and hides Show all.
- Phone helpers: no PhoneKit. The list is already one link per row and the card one unit; nothing to pick or pin.
- Tokens only; dark scopes follow RC1 (the limestone band turns warm stone, the paper `surface-raised`).
- Not for documents a buyer receives (DocList) or for comparisons (CompareTable).

## Motion

`motion.js`: the paper prints from the top down (its drawing plays IsoKit's own draw-on: tank, then loop and water),
the sheet's lines rise in, the topic line drops in, each visible row wipes in left to right, then the leader draws out
of row 01 into the sheet (up into the card on phones) and one light runs along it to the sheet. Ported from Subframe
Motion "Animated beam connections" (animated-beam), MIT, (c) 2026 Subframe: once, not looping. About 2.8 s. Filtering
(renderer): rows that stay glide to their new places, new ones fade in (filter-mosaic, MIT). Reduced motion: the
finished state, filtering instant.
