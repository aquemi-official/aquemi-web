IndustryDrops draws one Purified Water header main with one drop per industry or use it serves, each drop ending in a small isometric point-of-use vignette. It is the look `industry-drops` of a `grid` block (pass 12, concept 219, home.2): "the same package, different limits by industry" as one picture.

- **Look:** `assets/src/blocks/look-industry-drops.js`. Fields, as `grid`: `h`, `intro`, `items [{t, d, tag, link}]`. No look-only fields: the vignette is chosen by the item's `link` page.
- **Markup:** `section.aq-industry-drops-sec > .aq-in > header + div.aq-industry-drops`, holding
  `svg.aq-industry-drops__main` (the measured main and drops), `.aq-industry-drops__pkg` (the package drawing with the
  `__out` and `__ret` anchors at its supply and return tips) and `ol.aq-industry-drops__list` (PhoneKit chips root) of
  `li.aq-industry-drops__item`, each with a phone-only `button.aq-industry-drops__chip` (number, mini vignette, title) and
  `.aq-industry-drops__body` (`__fig` with its `__tap` anchor, `__no`, `h3.__t` with the link `__go`, `__d`, `__tag`).
- **The main is a loop, never a dead leg.** It leaves the package on the supply riser, runs along the top of the first
  row of outlets, turns down at the end and comes back along the next row (a serpentine for more rows), and returns into
  the tank. An odd number of rows returns down the right and back under the last row. The script measures the anchors
  and redraws on every size change (ResizeObserver); each run is three strokes on one path: `__wall` (`line-strong`,
  7 px), `__bore` (`surface`, 4 px) and `__water` (`flow`, 1.5 px), every wall drawn before every bore so tees merge.
  Each drop ends in a flow arrowhead (`__head`) just above its vignette's inlet.
- **Vignettes by page** (IsoKit primitives, one sheet size and scale, floors on one line): `ind-pharma` granulation bowl,
  `ind-cdmo` two suite outlets on one tee, `ind-meddevice` open rinse bath with a parts basket, `ind-hospital-lab`
  washer-disinfector (cabinet, vertical glass door, rack shelves), `ind-personal-care` cream kettle with a mixer,
  `ind-process` spray rinse bar over a conveyor; any other page gets the IsoKit `outlet`. Polypropylene equipment only:
  no metal finishes, no names or numbers painted on equipment.
- **Desktop:** package column (10–19 rem; the outlets keep a 1 rem right margin so the main's turn stays inside the content edge) and a 3-column outlet grid; pointing at or focusing an outlet lights its drop
  in `flow` and its vignette's lines. The whole outlet is the link (stretched `__go`), focus ring on the outlet.
- **Phone (container 860 px and under):** PhoneKit `chips`. The main runs down the left edge and returns beside itself
  as a loop (CSS, no measuring), with a flow inlet arrowhead; the outlets become a 2-column grid (3 columns at 600–860 px) of tiles (number, mini vignette in `ink-muted`, title at
  14 px), each row teed off the main; the open tile is outlined in `flow` and its card runs full width under the grid:
  the title as a 48 px row link, the line at 15 px, the tag. A tap scrolls the open card into view when it opens below the fold. Without PhoneKit every card shows stacked beside the main.
- **Motion** (`motion.js`, once on scroll-in, about 3 s): the package draws, the twin wall is laid round the loop with
  the water following, and each drop opens as the water passes its tee (its place along the main), then its vignette
  draws and its text rises. Phones: tiles rise two by two, then the open card. Reduced motion: the finished drawing.
  Ported from Subframe Motion "Animated beam connections" (animated-beam), MIT, (c) 2026 Subframe.
- **Tokens only:** `line-strong`, `surface`, `surface-raised`, `flow`, `focus`, `navy`, `on-navy`, `ink`, `ink-muted`,
  `line`, spacing steps, Geist Sans and Mono.
- **Not for:** a list where the items are not uses of the same water (use the `grid` default or StandardTiles), or more
  than about nine outlets (the rows get too many turns; use a router such as ManifoldRouter). Drawings are aria-hidden:
  every word a reader needs is in the item text.
- **PhoneKit:** chips (pass 12).
