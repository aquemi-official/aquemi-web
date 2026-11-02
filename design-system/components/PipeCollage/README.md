PipeCollage sets an evidence table as a Swiss poster: a geometric collage of flat pieces, one numbered piece per standard (a pressure vessel, a control panel, a flanged elbow, resin pellets, a fused joint) among plain filler tiles, beside the rows as asymmetric editorial blocks hung from hairline brackets.

- On the site: a `table` block with `"look": "pipe-collage"` (renderer `assets/src/blocks/look-pipe-collage.js`). Origin: no concept of its own (the Gemini quota ran out at compliance.4); adapted from `research/pass9/concepts/industries.2.png` (geometric pipe collage, facts as asymmetric editorial blocks).
- Markup: `<section class="aq-section aq-pipe-collage-sec">` → `div.aq-pipe-collage` with `div.__board` (aria-hidden, `data-theme="light"`, one svg 300 × 400: each tile a placing `<g transform>` around `g.__cell` with `data-edge`; a piece's cell is also `is-piece` with `data-pc`, its `__frame` and `text.__n`; shapes carry `data-f` for their fill or stroke role) and `div.__text` → `ol.__blocks` of `li.__block` (`data-pc`): an optional `__thumb` (the piece, phones only), `__head` (index, `h3.__std`), `p.__how`, `p.__proof` and `p.__go`, each with a `__k` column name.
- Fields, as a table: `cols`, `rows` (cells strings or `{t, link}`), `fold`, `fold_noun`. New optional field: `pieces`, one per row: `vessel`, `panel`, `pipe`, `pellets` or `weld` (each at most once). Pieces have fixed places on the board; a piece no row uses becomes a filler.
- Hover or focus on a block frames its piece in `flow` and dims the others.
- Desktop shows every block (the board shows every piece); the fold applies on phones only.
- Tokens: board fills `navy`, `limestone`, `surface-sunken`, `surface-raised`; `flow` only as a line; brackets `line-strong`, turning `flow` on hover.
- Phones: the board gives way to each block led by its own piece; blocks stack with a small alternate indent.
- Use it for three to six engineering or material standards, where a picture per row helps more than a drawing of the plant.

## Motion

Motion: when the board scrolls in, its tiles slide in from the edge they face (left column from the left, right from the right, middle from above), the elbow's pipe and the flow lines draw along their run and the numbers drop onto the pieces. Each block wipes down its bracket as it reaches the viewport and its lines rise after. Under 3 s; nothing under reduced motion.
