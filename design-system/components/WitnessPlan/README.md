WitnessPlan sets the ways to witness a FAT as ruled rows whose leader lines run into the package standing in the test bay; choosing a way lights its leader, marker and part (look `witness-plan`, options block).

Concept: pass 9b svc-fat-sat.3 (five witness modes as ruled rows with mono numerals whose leaders run into one white PP skid in its frame).

## Markup
`<section class="aq-section aq-witness-plan-sec">` > `.aq-witness-plan` > `__side` (section head, `ol.__list` > `li.__ind` (aria-hidden indicator) and `li` > `button.__opt[data-i][data-part][aria-pressed]` with `__n`, `__t`, `__d`), `__fig` > `__sheet` (IsoKit svg `.__svg` with the bay frame `__bay`, HTML `span.__zone.is-bay|is-cam`, `span.__mk[data-i]` markers), and `svg.__leads` (aria-hidden; `path.__lead[data-i]` laid out by the look's script from the rendered rows; `window.AQwitness.lay/show`).

## Fields
`h`, `intro`, `items` [{`t`, `d`, `part`}], `zones` [bay label, remote label] (short drawing labels, aria-hidden). `part`: "panel", "camera", "gauge", "documents", "analyzer", "ro" or "tank" (default "ro").

## Rules
- IsoKit light drawing (white PP package: skid, RO rack, tank, panel, analyser, gauge, binders; the camera drawn inline) inside the bay's open frame in `line-strong`.
- Leaders are each row's underline carried into the drawing to the marker, 1 px `line-strong`; the chosen one 1.5 px `flow`, its marker filled `flow`, its part lit.
- Arrow keys, Home and End move between the ways and choose. Under 1080 px the drawing sits between the heading and the rows, leaders off; numbers pair rows and parts.

## Motion
The IsoKit drawing plays, rows rise, leaders draw out of their rows and a light runs each one to its part as its marker strikes (animated-beam port); the first way stays chosen. Choosing a way sends one light down its leader; the raised indicator springs between rows (sliding-tabs port). Once, under 4.5 s; nothing under reduced motion.

Phones (pass 12, audit S8/S9): the room's frame and its zone labels are cropped away, and the drawing is a PhoneKit sticky strip (`data-pk-sticky`, 220 px, `data-pk-zoom="1.2"`; markers carry `data-pk-key`, each way's `li` is a `data-pk-row`). PhoneKit zooms the sheet onto the marker of the way on the reading line, and that way is chosen as it arrives (row, marker and part light); tapping a way brings it to the reading line (smooth, instant with reduced motion). Markers 24 px with 12 px figures. Without script the drawing stands above the ways. Desktop unchanged.

Verify fixes (pass 12 V1, V2): the list isolates its stacking context (`isolation: isolate`), so the sliding chosen-way panel (`__ind`, z-index -1) paints above the section ground at every width; under 1080 px it had been hidden behind it with motion on. Where the leaders are off (1080 and under) the markers strike as soon as the package is drawn (0.5 s) instead of after the leaders (2.45 s).

Pass 12 round C (svc-fat-sat.3): while PhoneKit is on, a marker the strip's crop cuts gets `.is-clip` (opacity 0) from the look's script when the pan settles (`transitionend` on the sheet, and 460 ms after `pk:change`); the chosen way's marker never fades.
