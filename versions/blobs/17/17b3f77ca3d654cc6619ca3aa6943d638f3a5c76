FitEnvelope draws where the package fits and what it does not take as a boundary: our polypropylene package stands inside a dashed "fits" envelope with its rated temperature range as a steel-blue band at the foot, and every exclusion hangs outside the envelope as a numbered tag tied to its edge.

- On the site: a `table` block with `"look": "fit-envelope"` (renderer `assets/src/blocks/look-fit-envelope.js`); live on
  urs-guide "When polypropylene is the wrong choice" (`#pp-rows`, seven tags). Built so ind-process "Where it fits, and
  what we do not supply" (`#fit`, a `spec` callouts block) can take it too: see Fields. Pass 12 build round D, from
  concept 237 (`design-system/inspiration/gemini/237-p12-urs-guide-pp-rows.png`; 238 is the same idea for ind-process).
  Taken from the concept: the dashed envelope with its label, the 0 to 80 °C band at its foot, the sanitant drum
  inside, numbered tags outside, one per row, and the phone order (envelope, then the tags, three and "Show all").
  Not taken: the concept's two round-topped vessels on a legged frame (drawn here as IsoKit PP parts), the tags' short
  invented labels (each tag carries the row's own words), the "Aquemi" page label.
- Drawing: IsoKit on the envelope's ground (`--surface` set to `surface-sunken` inside it, so hidden-line fills match the
  band): a closed PP `skid` carrying the `ro` rack, the flat-bottom PP `tank` on its plinth beside it, product pipe from
  the rack's outlet into the tank's inlet (socket-fusion collars, the water as flow), and a PP chemical drum (closed
  head, two rolling hoops, bung and vent; drawn by the look with IsoKit's part builder `isoB`, paper-white fill). No
  stainless, flanges, legs or handwheels (PP rules, BUILD-PLAN-C §0).
- Fields:
  - **table** (urs-guide): `h`, `intro`, `cols` [need, why, instead], `rows` [[need, why, instead]]; instead may be
    `{t, link, intent}` (a table cell).
  - **spec** (ind-process, `as: "callouts"`): `rows` [{`p`, `v`, `m`, `link`, `link_label`, `in`}] read as need = `p`,
    why = `v`, instead = `m`; `link` + `link_label` adds a link row under the tag. A row with `"in": true` is not a tag:
    it is listed inside the envelope under the band as what fits: `p` bold, then `v` (ink) and `m` (muted) on their own
    lines, then the link on its own line (a 44 px target that adds no layout). 861 to 1100 px the list runs in two
    columns; wide, the tags hang at mid-height of the envelope and the drawing is 380 px at most. Tags are numbered in
    order among the rows that are not `in`.
  - `scale` (look-only, DR-018): `{from, to, unit, label}`. The band's two ends (`from`, `to unit`) and the envelope's
    label (urs-guide: `{"from": 0, "to": 80, "unit": "°C", "label": "Fits"}`). Its figures must already be stated in a
    reading field of the same block (urs-guide row 2, "rated 0 to 80 °C"; ind-process row "Temperature"). No `scale`:
    no band and no label.
  - `fold`, `fold_noun` (default "tags"): phones only; every tag shows on desktop.
- Markup: `section.aq-band--sunken.aq-fit-envelope-sec` (a band, so the page's alternating grounds restart after it) →
  `div.aq-fit-envelope` (`--n` tags) → `div.__env` (`p.__fits` label, `div.__hold` sticky: `div.aq-iso-figure.__fig`,
  `div.__band` with `span.__bar` and two `span.__end`, optional `ul.__in`) and `div.__tags` (`p.__key` the three column
  names once, aria-hidden; `ol.__list[data-pk-picker=accordion]` of `li.__tag[data-k]`: `span.__cord`, `h3.__ph` with
  the phone head button, `div.__desk[data-pk-desk]` with `span.__stub` (eyelet `__eye`, number `__no`) and `h3.__t`,
  `div.__body[data-pk-body]` with `p.__why` and `p.__inst`). The column names are repeated in each tag for screen
  readers (`__sr`); "Look instead for" shows per tag below 1100 px.
- Desktop (over 1100 px): the envelope 5 of 12 columns, the tags 7; a tag reads across as the table did (need, why,
  instead) under the key line. The envelope stretches the tags' height; its drawing and band stay in view (sticky,
  centred in the view). Each tag's cord runs from a knot on the envelope's dashed edge through its eyelet. 861 to
  1100 px: the envelope full width on top (drawing at most 420 px wide), then the tags on one cord from the envelope's
  foot through every eyelet (the cord threads into each eyelet and out again, never across the ring); the need across
  the tag, why and instead under it. Pointing at or focusing a tag lights its rim and cord in `flow`.
- Phones (PhoneKit accordion, 860 px): envelope first (drawing at most 250 px wide, 400 px from 561 px, band), then the
  tags as one chain on the same one cord: 52 px heads (stub with eyelet and number, the need at 15 px,
  chevron), why and instead (14 px) open under the tapped tag, none open at first; past `fold`, "Show all". Without
  script every tag shows open.
- Motion (`motion.js`): the package drawn by the IsoKit choreography, the label, the band filling from its low end, then
  each tag drops onto its cord and swings to rest about its eyelet (the swing ported from Subframe Motion "Pinned
  pass", `pinned-pass`, MIT). Once, about 3.4 s; reduced motion: the finished state.
- Tokens only: `line-strong`, `surface`, `surface-raised`, `surface-sunken`, `flow`, `ink`, `ink-muted`, `ink-subtle`.
  Local layout properties (`--fe-gap`, `--fe-stub`, `--fe-cut`, `--fe-eye-y`) always carry a fallback.
- Do not use it for a list of options or for rows without an exclusion: the tags say "not this package".
