# Pass 9b build notes: contact-proposal.2 and contact-service.2

Built 2026-11-01 on port 8769. Only block 2 of each page changed; contact-routes, the forms, the service FAQ and
contact-locations untouched. `check`: 0 problems; `check --budgets` 0 overruns on both pages; motioncheck 0 errors and
0 hidden at 1280 and 375 on both pages.

## contact-proposal.2 "What each request returns": `request-menu` / RequestMenu (replaces `return-slips`)
- Concept followed (contact-proposal.2): limestone sheet, the title oversized and light across the top right, an
  isometric skid drawing at the left (sticky on desktop), and a four-column menu (situation / what comes back / when /
  cost) with numbered situations, When in Geist Mono and Cost in the flow accent. Ignored the concept's invented times
  and "free".
- Built as a real table: one `tbody` per situation, the situation a `th scope=rowgroup` with rowspan, one line per
  returned item (the " · " parts of the returns, when and cost cells line up item by item). Fold (4 of 6) kept, the
  quality-page audit link kept, every placeholder kept.
- Drawing: IsoKit skid base, tank, two filter housings piped in series, a closed module; the open frame (four posts,
  top rails) drawn as single IsoKit centre-line runs (no frame part in the kit).
- Motion: scroll-window port (the page's one scroll-linked story) slides the title in from beyond the right edge,
  cropped like the concept until it lands whole; AQiso draws the skid and runs the water once; cells follow in reading
  order; chart-crosshair port bands the pointed line and lights its column head.
- Phone: title 40 to 56 px, drawing above the menu, each line stacks the item over When and Cost with mono keys.
- Copy: nothing cut or added; returned items get a capital first letter.

## contact-service.2 "Response times by request": `riser-valves` / RiserValves (replaces `response-lanes`)
- Concept followed (contact-service.2, one of the strongest): navy sheet, a vertical riser in the gutter between the
  requests and the answers; at each request a branch tees off through a gate valve into the first response, and a
  second branch leaves the riser at the foot of the row, runs under the first response and turns up into what follows.
  Riser opens under a flange at the top and closes at the last row. "Severity N" over its description; the three
  other requests follow under a stronger rule, numbered on (05 to 07).
- Drawn in CSS (twin walls, water centre line) with two small fixed-size inline SVGs (gate valve with lever, elbow);
  the riser is one segment per row so it stays continuous at any row height.
- Motion: scroll-window port, the page's one scroll-linked story: as the rows pass, water fills the riser row by row,
  opens each valve, runs branch A, then branch B and its rise; scrolling back drains it. Text enters once and never
  dims. Hover or focus within a row opens its valve and lights both branches. Reduced motion / no JS: all full, open.
- Phone: riser down a 64 px left gutter; request, first response and what follows stacked; both branches are short
  tees into the zone keys.
- Copy: nothing cut or added.

## Removed
- ReturnSlips and ResponseLanes (renderers `look-return-slips.js`, `look-response-lanes.js` and component folders);
  no other page used them. research/pass9/build/contact.md still describes them as pass 9 history.

## Still weak
- RequestMenu's When and Cost columns are narrow for the long placeholders (three-line chips in row 01); reads better
  once real times and costs replace them.
- The riser's water shows clearly only once scrolled; at rest (static) everything is full, which is the honest end state.

# Pass 9b · locations (contact-locations.1 and .2)

Built 2026-11-02 on port 8768. Only blocks 1 and 2 of contact-locations changed (renderers, components); the page file,
contact-routes, the visit form and the closing are untouched. `check`: 0 problems; `check --budgets contact-locations`:
0 overruns; motioncheck 0 errors and 0 hidden at 1280 and 375. Checked light and dark, keyboard (index and region
buttons choose, instantly), reduced motion (complete and still).

## contact-locations.1 "Where to find us": `site-plates` / SitePlates (upgraded in place)
- Concept weak (log): kept its composition, not its picture. The title set large and light (up to 96 px) with "Sites ·
  04" under it, a real ledger table (site / what happens here / address / contact and hours, mono addresses and
  contacts, vertical hairlines) and, where the concept had the unrelated weld macro, a navy plate that draws the site
  in hand (the pass 9 IsoKit scenes) with numbered pins on the parts and what happens here as numbered callouts.
  No address, coordinate or map invented.
- Motion: project-index port (pointer, focus or the index button slides the plate's reel, choice persists; instant for
  keyboard); entrance: head rule draws, rows rise, plate wipes in, AQiso draws the site, pins strike.
- Phone: title, plate, then each site a card with its cells labelled. Fold (2 of 4) kept, both links kept.
- Copy: nothing cut or added (the empty head-office cell stays empty, per the todo).

## contact-locations.2 "Can you support my site?": `coverage-map` / CoverageMap (upgraded in place)
- Concept followed: one column per region on hairlines (index, region large and light, fields), and the instrument
  readout in the top right cell: the region in hand, its severity 1 on-site time as the large figure (only the cell's
  own text: today the placeholder, kept as a chip; the concept's "04 HR", tick scale and MAX tag are not built), a
  round seal stamp with the CRN body and seal acronyms taken from the last column (TSSA / PEO, RBQ / OIQ, Technical
  Safety BC / EGBC, ABSA / APEGA; none for other provinces), the column's label with "in [centres served]" under it.
  The pass 9 tile map lives on inside the readout (region's tiles lit, base marked); FxContour kept behind it.
- Motion: text-scramble port (the readout face decodes on entrance and on each choice), stamp strikes, tiles laid
  west to east; the pass 9 per-row scroll sync and the back.out tile ease are gone.
- Phone: readout first (tiles ≥ 44 px tall choose a region there), regions stacked under it.
- Copy: nothing cut or added.

## Still weak
- The readout's big figure is a placeholder chip until the severity 1 times exist; it was designed for a short figure.
- The office plate has no callouts (its "What happens here" is empty until FD-33).
