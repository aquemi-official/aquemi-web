GradeMains draws a grade table as water mains on a navy blueprint: one horizontal main per water grade, each product or process step dropping a line to the main(s) it takes water from, with a valve at every tap.

- On the site: a `table` block with `"as": "grades"` and `"look": "grade-mains"` (renderer `assets/src/blocks/look-grade-mains.js`); used on ind-pharma (grade by dosage form). Origin: `design-system/inspiration/gemini/46-concept-grade-lanes.png` (lanes across, steps dropping to them), built in full on navy.
- Markup: `div.aq-grade-mains` (CSS grid: a lane-name column and one column per row) → `p.__colh`, per main `p.__lname` (`__lt`, `__ln`) and `span.__pipe` (twin wall, `span.__water` centre line), `ol.__forms` (display: contents) of `li.__form` (display: contents) → `div.__head` (index, `h3.__t`), `span.__drop`, `span.__tap` per tap (inline ISA valve svg; `.is-alt` open), `div.__foot` (`p.__g` grade with mono label, `p.__note`, a visually hidden list of the taps). Grid positions ride on inline custom properties (`--gc`, `--tr`, `--deep`; phone `--pr`, `--pf`, `--pc`, `--pd`).
- Fields: `cols`, `rows` [step, grade, note], `fold`, `fold_noun` (phones only). Added: `lanes` [{id, t, note, off}] (top to bottom; `off` draws the main dashed, for a grade we do not supply), `taps` [["pw", "wfi?"], …] per row (lane ids; `?` = an alternative the note names, drawn as an open valve).
- Tokens: `navy` band, mains in `on-navy-muted`, water `flow` mixed toward `on-navy`, valves `limestone` (filled = minimum, open = alternative), grades in Geist Mono `limestone`. Hover a column: its drop and valves light. Caption title block "Aquemi · nav · N steps".
- Phones: the mains turn upright at the right (three 48 px lanes with vertical names); each step is a row tapping across; the fold returns.

## Motion

The mains are laid from the left (the dashed one too), the steps set in across the top, then column by column the drop falls to its main and the valves seat with an overshoot; the water runs along each supplied main and the grades and notes read in. Once on scroll-in, under 4.5 s; nothing under reduced motion.
