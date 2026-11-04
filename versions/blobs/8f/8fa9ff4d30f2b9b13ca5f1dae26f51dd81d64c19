WalkdownPins sets IQ and OQ checks as a table beside the installed system they inspect, each check's number on its part and a few parts called out by name (look `walkdown-pins`, spec block).

Concept: pass 9b svc-cq.2 (checks table left, isometric skid right labelled at the spots the checks inspect); before that compliance.3 and sys-pw.3, drawn with IsoKit on a light sheet.

## Markup
`<section class="aq-section aq-walkdown-pins-sec">` > section head, `.aq-walkdown-pins` > `__tab` (`__cols` column head, aria-hidden, and the fold wrapping `ol.__list` > `li.__row[data-row][data-lit][tabindex=0]` (`__n`, `h3.__t` with `__tag--iq|oq`, `p.__v`, `p.__m`)) and `__fig` > `__sheet` (IsoKit svg with `isoSheet` and leader callouts `g.__lead`, HTML `span.__lab[data-part]` names and `span.__pin[data-row]` number markers placed by `isoPct`).

## Fields
As a spec block: `cols`, `rows` [{`p`, `v`, `m`, `part`}], `labels` {part: short drawing name} (leader callouts, aria-hidden), `fold`, `fold_noun`. `p` "IQ · Joints" splits into the tag and the name. `part`: "branch", "joint", "analyzer", "coldest", "outlets", "panel", "skid", "gauge" (the drawing anchor and the parts that light); default "skid". Two markers on one part: the second sits 28 units right of the first in the pin data (pass 12 round C; 06 and 09 on the panel no longer touch).

## Rules
- Table 6 of 12 (number in flow mono, check, what we verify, basis in mono), sheet 6 of 12 and sticky. IQ tags ruled in `ink` (installed), OQ tags filled `flow` (running).
- Markers are small ruled squares with mono numbers; callout names mono 12 px over their shelves, stacked apart per side.
- Pointing at or focusing a row lights its parts (`is-lit`), its marker and its callout.
- Under 1080 px the sheet sits above the table; phones drop the column head and callouts (numbers pair rows and parts).
- Callout names never run under a check marker or over the loop pipe (sampled every 8 px): the renderer lifts a name
  (6 px at a time, those above it keeping 30 apart) until its box clears both, else steps it down (pass 12:
  "Conductivity" sat behind marker 04, then on the pipe, at 1280). Names have no knockout: nothing lies under them.

## Phones (pass 12, PhoneKit sticky figure)
- Every check is open on every width (no fold: each check has a marker, audit S7). `fold` / `fold_noun` are ignored.
- The root carries `data-pk-sticky data-pk-bp="860" data-pk-h="200" data-pk-zoom="1.8"`; the figure is the strip
  (`data-pk-fig`), the sheet its pan layer, each marker `data-pk-key="<row index>"`, each row `data-pk-row`.
- Under 860 px the look is a flex column (the strip first, `align-items: stretch`), so the strip holds for the whole
  list. The check on PhoneKit's reading line lights: its number in flow, the row on the raised surface, its marker
  filled flow, and its part on the sheet (`pk:change` drives the same `lit()` as hover). The sheet zooms 1.8x and pans
  to that marker (markers 14 px, 9 px numbers before the zoom, so about 16 px as seen). No leader callouts on phones.
- Tablets: the zoom follows the column, `min(1.8, 1.8 x 400 / column width)` (about 1.0 at 736 px; set in the markup
  from the window and again on resize), and columns of 600-860 px get a 280 px strip, so the skid stays in view.
- Without script: the sheet over all nine rows (the look's own 860 px rules).

## Motion
The installed system draws and the water runs the loop once (IsoKit choreography), then the markers strike onto their parts in check order and the callout names fade in (no bounce). Once, under 5 s.
