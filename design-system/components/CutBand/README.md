CutBand lays a short table of levels across a hairline drawing of the plant as a full-width navy band, like a cutting plane (look `cut-band`, spec block).

Concept: pass 9b svc-cq.4 (a navy band carrying the two-level table across a hairline skid drawing on a light ground).

## Markup
`<section class="aq-section aq-cut-band-sec">` > `.aq-cut-band` > `__head` (section head), `__fig` > `svg.__svg` (aria-hidden elevation: panel, RO rack, tank, header, loop, points of use with sample valves), `__band` (`__occ` motion occluder, `__cols`, `ol.__rows` > `li.__row` with `__n`, `h3.__p`, `p.__v[.is-fig]` > `__k` + `__val`, `__m` > `__k`, `__ref` lines and the row link), `p.__note`.

## Fields
As a spec block: `cols` [level, set at, basis], `rows` [{`p`, `v`, `m`, `level`, `hl`, `link`, `link_label`}], `note`. A short value with digits is set as a mono figure; `m` splits at ";" into lines; `link` becomes a link-variant button.

## Rules
- Light ground; the drawing in `flow` hairlines with `surface` fills, pipes `line-strong`; the band `navy` bleeding to the page edges (a `::before`, the section clips it).
- Level names light 30 px, figures mono light 36 px, basis mono 14 px, column names mono 12 px `on-navy-muted`.
- Phone (pass 12, audit svc-cq.4): the plant elevation gives way to a 12-month trend strip on chart paper (`__trend`
  > `__paper` > `svg.__tsvg` + `__tl` labels, aria-hidden): month rules, a shaded first stretch of dense dots
  (phases 1 and 2), weekly dots after it, the action level as a navy rule labelled with the action row's "set at"
  (here "<= 100 CFU/mL"), the alert level as a dashed rule named by the other row ("Alert level"), set from the
  shaded stretch (solid there) and carried on; one reading, mid-year, rings above the alert line, never the action
  line (clear of the labels at the right, so it never reads as their key). The strip is `data-theme="light"`: chart
  paper in both themes, so the navy rule, label and dots hold in dark. The dots
  are a drawn pattern, not data: no axis values, no counts, no new figures. Then the navy band with the rows stacked
  and column names inside each row. Built only when a row has `level: "action"`. Desktop unchanged.

## Motion
The drawing draws, the water runs header and loop; then a navy occluder with flow edges crosses the page, holds over the band, the band and its table switch on under full cover, and the occluder exits right (foreground-occlusion-wipe port). The figure rolls on its odometer. Once, under 4 s; nothing under reduced motion.

Pass 12 round C (svc-cq.4): from 861 px the trend card (`cbTrend`, `.aq-cut-band__trend`, `data-paper`) stands in the right column above the band, about 560 x 286, in place of the elevation; the elevation stays behind the look-only field `art: "plant"` (class `aq-cut-band--plant`). Motion: where the trend shows, its level rules draw and the readings print before the plane cuts.

Pass 12 round C fix round: CutBand claims the trend card (`m.claim`), so the generic line layer no longer draws its rules and grid; the dashed alert level stays dashed after the motion and the grid lines stay static.
