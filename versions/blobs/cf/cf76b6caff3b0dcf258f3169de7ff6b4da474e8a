PqCalendar sets PQ phases as a short numbered stack beside one instrument readout: the sample count as a giant light numeral, the sampling grid that makes it and a tick scale of the year (look `pq-calendar`, steps block).

Concept: pass 9b svc-cq.3 (three slash-numbered phase rows beside a readout panel with a giant light sample count and a tick scale), keeping pass 9's sampling grid and year.

## Markup
`<section class="aq-section aq-band--limestone aq-pq-calendar-sec">` > section head, `.aq-pq-calendar[data-theme=light][data-on]` > `ol.__phases` > `li.__ph.is-p1|is-p2|is-rest[tabindex=0]` (`--g0/--g1/--y0/--y1` spans; `__n`, `__txt` > `h3.__t` with `__key`, `p.__d`, `p.__hold`) and `__panel` (`p.__total` > `__num`, `__unit`, `__eq`; `__zoomed` > `svg.__grid` + `__reg`; `__strip` > `__scale` > `svg.__year` + `__reg`, `__months`, `__ylab`).

## Fields
`items` [{`t`, `d`, `hold`, `days`}] (a phase without `days` is the routine plan to the year's end), `grid` {`points`, `days`, `rows`, `cols`, `unit`}, `year` {`weeks`, `months`, `label`}. The total shown is points x days.

## Rules
- Limestone band, figure forced light; phase 1 `navy`, phase 2 `flow`, routine ticks `on-limestone-muted`; count Geist light 168 px (phones 104 px).
- Pointing at or focusing a phase shows the region marker (flow tint, flow edges, handles) over its days and weeks; arrows, Home, End step the phases.

## Motion
The count rolls on its odometer while the grid fills day by day, the hold line drops, then the year's ticks rise and the tag lands; phases rise beside it. Once, under 4 s. The region marker glides 240 ms between phases (region-splice port), instant under reduced motion.
