MacroLeaders sets a comparison table beside a macro drawing (RO membrane leaves fanned over a plain PP pipe labelled "PP pipe"; no weld bead while the joining method is open, FD-18, DR-018) and calls each row out from it with a numbered marker and a leader, so a by-industry table reads as one piece of equipment serving every row.

- Look: `"look": "macro-leaders"` on a `table` block (renderer `assets/src/blocks/look-macro-leaders.js`). Fields as the table block: `cols` (first is the row name), `rows` (cells, strings or `{t, link}`). No new fields.
- Markup: `.aq-macro-leaders` > `figure.aq-macro-leaders__fig` (aria-hidden svg, `preserveAspectRatio="xMaxYMid slice"`, bleeding off the viewport's left edge) and `table.aq-macro-leaders__table` (explicit ARIA table roles, since phones change its display). The row name cell holds `.aq-macro-leaders__lead` (aria-hidden leader with its `.aq-macro-leaders__mk` marker) and `.aq-macro-leaders__name`; value cells hold an `.aq-macro-leaders__k` label shown on phones only.
- Leader length per row is `--k` (0 to 1, set by the renderer from the row's place), so the markers stand on an arc.
- The drawing uses flat tonal fills only (`surface-raised`, `surface-sunken`, `flow-tint`, an 18 % `ink` mix for the pipe's shaded side), `line-strong` edges, `line` hatching (permeate carrier, feed spacer mesh) and `flow` water lines. No gradients. Two short mono drawing labels.
- Row names in Geist Light 24 px; values 14 px; header in mono. Hover or focus within a row tints it `flow-tint` (the table's one highlighted row) and fills its marker and leader in `flow`.
- Phones (pass 12, S12/S18): no macro (on a phone it was an unlabelled crop); the value columns are named once in a legend (`p.__legend`, aria-hidden), each with a colour code (column 1 `flow`, 2 `ink`, 3 `caution`, 4 `line-strong`), and each row's values are lines with the same 3 px code rule at 15 px; rows stay records on the vertical rail of markers. Each cell's value is wrapped in `span.__v` so a placeholder never falls into a label column.
- Not for tables of more than about eight rows (the arc crowds), or without a first column that names the rows.

Motion (`motion.js`): the leaves start pressed together and fan apart back to front, the pipe slides in along its axis, water runs once along each leaf; then row by row the marker pops onto its arc, the leader shoots to the row and the cells arrive as it lands (about 3.4 s). Nothing under reduced motion.

Ported (pass 9b): Subframe Motion "Chart crosshair" (chart-crosshair): a row rule and a column rule snap to the cell under the pointer (200 ms), the column head turns `flow` and the cell takes the flow tint; keyboard focus on a row link snaps the row rule. Wide screens; rules out of the page at rest.

Pass 12 (phones): the second value code is a dashed ink rule in the key and the rows, so the two codes differ by pattern, not only by hue.

## Pass 12 round C: macro "pipe-pair"

Look-only `"macro": "pipe-pair"` (`.aq-macro-leaders--pair`) draws the PP-or-stainless question: two cut sections of
the same outside diameter running off the page edge (thick-wall natural PP over thin-wall 316L, hatched walls, the
bore in flow tint) with the 0-80 °C band of natural PP between them (tinted to 80, dashed beyond). The six markers keep
their arc at the drawing's right. Motion: the sections slide out of the page edge along their axes. The membrane macro
stays the default. Used on news.1. The pipe stubs start 2,000 units left of the faces so they leave the page at any
width; the three labels and the band share one left edge (x 36) so they clear the page edge from 861 px (13 px mono).
