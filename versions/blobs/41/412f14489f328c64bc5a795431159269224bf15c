FidelityLadder shows design stages as one drawing gaining detail on a navy blueprint band: every stage is a sheet with the same water package drawn at that stage's level (matrix, block route, P&ID, dimensioned isometric, frozen isometric, spools with their joints), joined by a run with a node per stage and a closed valve and "Hold point" stamp where you sign.

- On the site: a `steps` block with `"look": "fidelity-ladder"` (renderer `assets/src/blocks/look-fidelity-ladder.js`), svc-design "Design stages, and what you approve". No concept of its own (Gemini quota); adapted from `research/pass9/concepts/home.2.png` (a drawing per step along one run) on the navy ground of `sys-pw.1.png`.
- Markup: `section.aq-band--navy.aq-fidelity-ladder-sec` → `ol.aq-fidelity-ladder` (`--cols`) of `li.__st` (`is-hold`, `is-eol` end of a row, `is-bol`, `is-last`): `__sheet` (aria-hidden: flat svg or IsoKit svg `__svg`, `__no` "Sheet 01", `__lvl` level name, `__frz` stamp on the frozen sheet), `__run` (`__valve` before a hold, `__node`), `__body` (`__n`, `h3.__t` with the step's link via `stepTitle`, `p.__d`, `p.__hold` with `__stamp`).
- Fields (a steps block): `h`, `intro`, `items` [{`t`, `d`, `hold`, `link`, `sheet`}]. `sheet` (optional): `matrix`, `route`, `pid`, `iso`, `freeze`, `joints`; default that order by position. `hold` names who signs.
- Drawn here: the flat sheets (matrix, route, P&ID in ISA-style symbols) inline; the isometric spool with IsoKit (`isoPipe`, `isoDim`, `isoRingD`, `isoSvg` with `aq-iso--navy`).
- Tokens: `navy` ground, sheets `navy` mixed with `on-navy`, lines `on-navy-muted`, water `flow` mixed towards `on-navy`, hold stamp and valve `limestone`.
- Phones: one column, the run down the left edge with the valve turned along it.

## Motion

Motion: one timeline. The run extends stage by stage; at each node the sheet lights and its drawing draws on, the number decodes and the text rises; before a hold the valve turns open and the stamp strikes; the freeze stamp strikes on its sheet. About 4.5 s; nothing under reduced motion.

Phones (pass 12, optional item): the sheets at 70 % of the column with less space between stages (about 360 px shorter); the sheet footers stay 12 px. The thumbnails' inner labels are drawing texture, not reading text. Desktop unchanged.

Verify fixes (pass 12 V7): on phones the sheets' inner drawing labels (about 4 px at 70 %) are dropped; the drawing and the 12 px footers stay.

Pass 12 round C (svc-design.1): at 600 px and under each stage is a 120 px / 1fr grid: the sheet as a thumbnail in column 1 (level label 11 px, sheet number and inner labels hidden, DQ stamp 32 px), numeral and title in column 2, body and HOLD stamp full width; stage padding 20 px (first and last flush). 2,258 to 1,435 px at 375.

Pass 12 round C fix round (tablet, 601-860 px, was 3,001 px): the same two-column stage as phones, the sheet a 200 px thumbnail in column 1 (sheet number hidden, the level label kept, freeze stamp 40 px) and the numeral, title, body and HOLD stamp all in column 2 beside it.
