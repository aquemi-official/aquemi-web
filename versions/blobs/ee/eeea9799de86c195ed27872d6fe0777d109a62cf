BidRoute draws how a bid travels through a URS as one route through numbered stations, one per table row, each station a line pictogram of what that practice does to the bids, with the rows as cards under their stations.

- On the site: a `table` block with `"look": "bid-route"` (renderer `assets/src/blocks/look-bid-route.js`); live on
  urs-guide "Must-haves, preferences and how bids answer" (`#priority`). Pass 12 build round D, from concept 245 take 2
  (`design-system/inspiration/gemini/245-p12-urs-guide-priority-take2.png`). Taken: one route joining six stations
  (barrier gate, balance beam, a pinch where the lane narrows, tick sheet, slip, fanned price strips), numbered, and
  the phone riser. Not taken: the concept's lorem rows (the cards are the page's six rows), its heavy band (drawn as
  the house twin-wall pipe), "Show all" (every row stays open: the route is the idea).
- Pictograms (`icons`, look-only, one per row in row order; default this order): `gate` a navy barrier post and striped
  boom over the route (a must-have: one shortfall ends a bid); `beam` a balance beam on a fulcrum, two weights (a
  preference: weighed against the other bids); `pinch` two jaws closing on the route, the pipe slimmer in the throat
  (too many must-haves: fewer suppliers can bid); `sheet` an answer sheet, one mark per row (meets, meets with a note,
  differs, meets); `slip` a deviation slip with numbered rows (keyed to your rows); `strips` three fanned price strips.
  An unknown icon draws a plain ring station. Pictograms carry no words or figures.
- Fields, as a table: `h`, `intro`, `cols` [practice, what it does to the bids, use it for], `rows`
  [[practice, effect, use]] (cells may be `{t, link, intent}`), `icons`.
- Markup: `div.aq-bid-route` (`--n` rows) → `div.__fig` (aria-hidden `svg.__svg`, viewBox 1200 wide: `path.__drop` per
  station, `g.__run` the twin-wall route (`__w` 13 wide in `line-strong`, `__g` 10 wide in the ground, `__h2o` the
  water), `g.__st[data-k]` per station) and `ol.__cards` of `li.__card[data-k]` (`span.__no`, `span.__mini` the
  station's own small drawing for narrow layouts, `h3.__t`, `p.__e`, `p.__u` with the "Use it for" label). The first
  two column names are read per card by screen readers only (`__sr`).
- Desktop (over 1100 px): stations at the centres of `--n` equal columns, pictograms at 1.22x; each drop leaves its
  station and turns into its card's number at the card's left (the pinch's drop leaves its lower jaw's apex; on the
  wide route its jaws reach 30, not 48, so the drop's elbow passes clear). The cards share a four-row subgrid, so the
  "Use it for" rules line up across the row. Pointing at or focusing a card or a station lifts the station 4 px (the
  pinch, part of the route, lights in place), draws it and its drop in `flow` and fills its number. The water runs on
  through the pinch's throat (fewer suppliers can bid; the route is not closed).
- Up to 1100 px and phones: the route becomes a riser (the same twin-wall pipe standing) down the left with the numbers
  on it; each card has its station's pictogram (on a short run of route): 561 to 1100 px in a 96 px column at the left
  of its text, phones at the right of its title; on phones the "Use it for" label runs inline. Reading text 14 px, titles 16 px.
- Motion (`motion.js`): the water fills the route from the left with a ringed marker at its head; at each station the
  pictogram rises, the drop is drawn and the card comes up (ported from Subframe Motion "Full send", `race-replay`,
  MIT). Narrow layouts: the cards come up in turn. Once, about 3.6 s; reduced motion: the finished state.
- Tokens only: `line-strong`, `surface`, `surface-raised`, `action` (gate post, boom stripes, weights), `flow`, `ink`,
  `ink-muted`, `ink-subtle`, `line`.
- Do not use it for rows that are not stages a bid passes through; a plain list of practices is a table.
