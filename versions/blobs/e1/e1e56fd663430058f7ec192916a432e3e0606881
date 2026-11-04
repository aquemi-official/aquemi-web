TitleBlock sets delivery terms as the ruled title block of a drawing sheet: each row one zone with a numbered tag, its name, a small IsoKit drawing of what it delivers, the value and the note.

- On the site: a `spec` block with `"look": "title-block"` (renderer `assets/src/blocks/look-title-block.js`),
  cmp-documentation "Delivery and signatures" (`#delivery`). Pass 12 round E, audit row 22, concept 256
  (`design-system/inspiration/gemini/256-p12-cmp-documentation-delivery.png`). Replaces PdfAnatomy on that page;
  PdfAnatomy stays in the library.
- Taken from the concept: the bookmarked page with number boxes in its footer, the kickoff-to-ship strip with the
  document stack before the skid, the archive box with a page inside, square numbered tags keyed to the rows. Not
  copied: its invented values (`[PDF, digital & physical]`, `[3 required]`, `AQ-2026-001`), the ship pictogram, the
  wordmark, the headline's full stop. Every word in the zones is the block's own copy.
- Markup: `<div class="aq-title-block">` (its own inline-size container) > `__sheet` > `ol.__zones[.is-odd]` >
  `li.__zone.is-<drawing>[.is-hl]` > `__hd` (`span.__tag` 01, 02 … aria-hidden; `h3.__h`), `__fig` (aria-hidden
  IsoKit `svg.__svg`), `__bd` (`p.__k` the second column's name; the value as `p.__v`, `ul.__parts` or `ul.__sigs`;
  `__m` > `p.__k` the third column's name, `p.__mt` the note; optional `p.__go` link). Then `__tb` (aria-hidden): the
  section title over blank `No.` and `Rev.` fields.
- Value forms: choices written "a; b; or c" become signature lines (one per choice, an x at the start, nothing signed,
  the last prefixed "or"); a value with commas on the page-drawing zone becomes its parts with flow square markers
  (search, bookmark, footer boxes, the three things the drawing shows); any other value is set at 19/28 with
  placeholders at 15 px mono (15 px on signature lines, 14 px in the notes).
- Drawings (IsoKit, `aq-iso--raised`, line-strong on surface-raised, accents in flow): `page` (three standing pages,
  the front one with header, text, a search hit, a ribbon bookmark and the number and revision boxes in its footer),
  `sign` (a sheet lying flat with one signature line per choice and the IsoKit stamp, its imprint at the end of the
  first line), `time` (a ruled strip from a kickoff flag through the document stack to the IsoKit RO skid; flow up to
  the documents, dashed on to the skid), `box` (an open archive box with the kept copy standing in it, a flow label
  slot). Chosen from the row's name and value; `rows[].draw` (look-only) overrides.
- The highlighted row (`hl`) fills its tag with flow. Rules: sheet border 1.5 px line-strong, zone rules 1 px
  line-strong, note rule 1 px dashed line. Type: names 300 26/34 (24/30 on phones), column names 12 px mono caps
  ink-subtle, notes 15/23 ink-muted.
- Desktop: zones in a 2x2 (an odd last zone spans the row), drawing at the zone's right (15 rem wide, up to 12 rem
  tall), the closing strip under the right half. Under 1,040 px the drawing sits beside the name only and the value
  runs the zone's width; from 601 to 1,040 px the zones of a pair share their heading row (subgrid), so their values
  start level.
- Phones (container under 600 px): no outer frame, gutter or strip: the zones stack between full-width line-strong
  rules on the section ground, the tag beside the name and the drawing (10 rem, up to 7 rem tall) beside them; the
  column name printed once, on the first zone; reading text 14 px or more (values 18 px, notes 15 px, placeholders in
  notes 14 px); signature lines 48 px tall. The timing zone sets its strip under the name at the column's width (7.5 rem
  tall, left-aligned) so the skid at its end reads.
  No PhoneKit: each zone is already one readable unit with its own drawing, nothing to pick or pin.
- Motion (`motion.js`, signature-draw, MIT): zone by zone (0.42 s apart; on phones each zone as it scrolls in) the
  tag presses in, the copy rises 8 px, the drawing inks over its faint fills (0.8 s, cubic-bezier(.37,.12,.28,1)),
  accents last; on the timing zone the flow line runs from the kickoff flag to the documents before the skid inks.
  Pointing at a zone re-inks its drawing. IsoKit strokes are non-scaling, so the inked lines carry the
  `vector-effect` attribute and butt caps while they draw, and each draw ends by removing its inline dash and cap
  (clearProps leaves DrawSVG's dashes behind). Nothing under reduced motion.
- Not for terms that need a table to compare (use SpecTable) or for a single drawn document with callouts (PdfAnatomy).
