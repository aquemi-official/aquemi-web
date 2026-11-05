HeroScene is a hub hero's drawn scene: one isometric line drawing (IsoKit) with numbered tags, and a key under it whose rows carry the same numbers and link to what each tag is.

Pass 12, build round B (audit S17: the systems, services, first-system and Applications heroes had no drawing or the
generic three-icon line). Concepts: Gemini 222, 225, 229 and 233 (`design-system/inspiration/gemini/`); the concepts'
wording, codes, lead lines and metal frames never reach the page.

## Turning it on

Hero field `figure` with a `look` (the hero's own look switch; `figure` already picks the drawn figures). Look-only
fields only: page ids and the names of rows the page already has. No new copy, no figures.

| look | page | what is drawn | the key |
| --- | --- | --- | --- |
| `module-lineup` | systems | the system modules in water order, each on its own plinth stepping down one step at a time in water order (the same fall as the page's strata-run block below it), one pipe through all four (pretreatment: media and carbon vessels; PW generation: membrane rack and EDI; storage: tank; monitoring: panel and analyser) | the system index: `"index": ["sys-pretreatment", "sys-pw", "sys-storage", "sys-monitoring"]` (the hero's index field, set in water order so tag 01 is the first plinth) |
| `service-ring` | services | the PP package on its skid at the centre of a shop floor, one station per services page on a dashed ring round it, numbered clockwise from the top: URS desk, planning board, drafting board, fusion bench, test cart, binder table, service truck, lifting gantry over a module | the services index (`"index": true`) |
| `site-room` | first-system | an empty room: the package's footprint dashed on the floor and its outline dashed in the air, the water stub with its valve out of the left wall (the room's one flow line), a floor drain, an isolator box on the right wall, the door open into the room with a dashed way in to the footprint | `"from": "site"` (a block anchor on the page) and `"keys"`: the names of five of that block's rows, in tag order (`["The package", "Water supply", "Drain", "Power", "Way in"]`); a link to that block (its heading) closes the key. site-room numbers its tags and rows with the block's own row numbers (so the key reads 02 · 04 · 05 · 06 · 07 when those are the rows), and stays in step if the block is reordered |
| `use-fan` | projects (Applications) | the package at the back corner; one PP loop runs up out of it, along one edge of a quarter floor, round its rim and back; the floor is split into one sector per use, and a drop from the loop feeds each scene (make-up kettle, washer-disinfector, lab sink, filler over a conveyor, rinse conveyor through a spray arch) | `"uses"`: industry page ids in tag order; titles are each page's `nav_label` |
| `shop-bay` | about, careers | the shop floor: the package on its test stand (box-section PP posts, skid, membrane rack, a flat-top PP tank, panel), hosed to a flat-top PP test tank on its plinth; round it a drafting desk, a panel bench and a joining bench (method neutral, FD-18: two PP lengths butted on cradles, one plain girth line and a stencilled tag; no heater plate, bead or fusion machine), plus the binder table and the service van where a row keys them (service-ring builders reused) | `"from"`: a block anchor (`people` on about, `roles` on careers) and `"at"`: one station per row of that block in row order (`desk`, `panel`, `joint`, `stand`, `table`, `van`; `""` for none). Tags and rows carry the block's own row numbers; a link to the block closes the key |
| `site-map` | contact-locations | the sites on a limestone contour sheet: the office and the shop with its test-bay skid at the centre, two dashed travel rings round them, the service van on the outer ring, parts crates on a pallet | `"from": "locations"`, `"at"`: `office`, `shop`, `van`, `crates` per row; the row names are cut before a `, [placeholder]` tail ("Head office") |
| `reply-flow` | contact-proposal | paper in, paper out: a stack of URS sheets and a tender form on a clipboard, dashed routes into the engineer's desk, the reply out of it with the stamp beside its imprint | `"from": "requests"`, `"keys"`: three cells of that table as they stand (URS row, tender row, the written answer) |
| `compliance-matrix` | retired (was compliance, concept 234; replaced by edition-timeline, pass 13) | a ruled compliance matrix sheet (HTML: title, five heads, four numbered rows with the clause and proof placeholders and one flow tick per row) with a small PP package under its lower-right corner: a flat-top PP tank on its plinth, bead-ringed PP pipe to a generation module, the water leaving to the loop (not the concept's domed vessels). Decoration (`aria-hidden`) | look-only `title`, `cols` (5 heads, page words), `rows` (up to six `{c, t, d}`: the buyer's clause, the answer column 1-3, the proof document; or the older `cells` + `ticks`, one clause and proof repeated on every row). No key |
| `edition-timeline` | compliance (pass 13) | a ruled sheet (HTML and CSS only): the title, then three to five numbered stations on one flow line, and a dashed flow branch labelled with the new edition that leaves the line at the fork station and rejoins it at the join station (your approval). Desktop draws the line across; phones run it down the left with the branch as a bracket on the right. Decoration (`aria-hidden`) | look-only `title`, `steps` (`[{t, d}]`, 3-5), `fork`, `join` (station numbers), `branch` (the branch label). No key |

A scene whose key finds fewer rows than it needs (an index under 2 or 3 pages, a missing row name) renders nothing and
the hero falls back to its usual right-hand part.

## Markup

```html
<figure class="aq-hero-scene aq-hero-scene--ring">
  <div class="aq-hero-scene__draw" aria-hidden="true" style="--hs-r:487 / 325">
    <svg class="aq-iso aq-hero-scene__svg" …>… <g class="aq-iso__part" data-iso-id="k3">…</g> …</svg>
    <span class="aq-hero-scene__tag" data-k="3" style="left:…;top:…">03</span> …
  </div>
  <nav class="aq-hero-scene__key" aria-label="Pages in Services">
    <p class="aq-hero-scene__label">Services index · 8 pages</p>
    <ol><li data-k="3"><a class="aq-hero-scene__row" href="#svc-design" data-wp="svc-design"><span class="aq-hero-scene__t">Process design and engineering</span></a></li> …</ol>
  </nav>
</figure>
```

- Built by `wHeroScene(p)` in `assets/src/parts/HeroScene.js`; `wHero` (Hero.js) uses it when `figure.look` is set,
  with the grid `aq-hero__grid--figure aq-hero__grid--scene` (text 5 parts, scene 7).
- The drawing is decoration (`aria-hidden`); the key is the text. Tags are HTML over the drawing, placed with
  `isoPct`, so they stay 12–13 px at any width. Key numbers come from a CSS counter (empty alt text), never markup; site-room sets the counter per row (`counter-set`) to the block's row number, and its tags print the same number.
- Each tagged part carries `data-iso-id="k<n>"`; the tag and the key row carry `data-k="<n>"`. The site-room key rows
  are plain text (all five live in one section); its closing link jumps there. Pointing at a room row still lights its part (pointer only; keyboard users keep the numbers).
- Parts the kit lacks (plinths, tables, planning board, fusion bench, test cart, gantry, door, drain, isolator,
  washer, filler, rinse conveyor, kettle) are drawn in HeroScene.js with IsoKit's part builder (`isoB`) and its
  primitives, so they draw, light and animate as kit parts. Candidates to join the kit: the table and the gantry.

## Tokens and rules

- Lines and fills as IsoKit (`line-strong` on `surface`, `surface-sunken` for plinths, the quarter floor, the package's floor pad (use-fan) and the cut
  wall; `flow` only for water: the pipes and drops, the room's water stub). The room's way in is a dashed `ink-subtle`
  route with an arrow; the footprint a dashed `ink-muted` line.
- Tags: Geist Mono 500 12/1 (13 on phones), `ink-inverse` on an `ink` chip, `radius-sm`; plinth and floor tags centred
  on their point, the others hang above it.
- Key: label in the eyebrow style (Geist Mono 12/16, uppercase, `ink-muted`); rows at least 44 px, number in a
  `line-strong` outlined chip, title Geist 15/20 in `ink`, a `flow` arrow when the row links; `line` hairlines between.
  Two columns (line-up, ring, fan); three for the room's five short names.
- Hover or focus on a row turns its part's lines `flow` and fills its tag and number chip `flow` (`:has`, k1–k8; a
  visitor-driven state, also under reduced motion). Focus adds the 2 px `focus` ring.

## Phone

- Under the actions at the full width: the line-up, ring and fan drawings run to the screen edges at 480 px and under
  (the room keeps the gutter), tags 13 px, no band above or below the drawing (its box takes the drawing's own ratio).
- The key goes to one row per line (two columns for the room), rows 44 px, titles 15 px. Every row stays: no fold, since
  every tag points at one (S7).
- Measured at 375 px: systems hero 883 px, services 1,226, first-system 1,030, projects 1,177 (the primary button in
  the first screen on all four).

## Motion

In `Hero/motion.js` (the hero claims its own drawing): `AQiso.timeline` draws the scene back to front and runs the
water once; each tag pops onto its part (fade up and scale in, cubic ease-out) with its key row as the water reaches
that part, or in number order where no pipe feeds it. Ported from Subframe Motion "Animated workflow diagram"
(process-choreography), MIT, (c) 2026 Subframe. Under 5 s; nothing under reduced motion (the scene is complete).

## When not to use it

- Detail pages with an equipment drawing keep the equipment figure; pages whose figure is a document keep the drawn
  binder, stamp or route.
- Never add a scene that names a part or a use the page does not: the key must come from the page's own index or rows.

## Round C (pass 12, c03-heroes)

- Four scenes above (shop-bay, site-map, reply-flow, compliance-matrix) replace the generic three-icon line on about,
  careers, contact-locations, contact-proposal and compliance (audit-c §8 H1, group-6 compliance).
- Span key rows (site-room, shop-bay, site-map, reply-flow) take focus (`tabindex="0"`); focus lights the part as hover
  does, with the 2 px `focus` ring. `hsKey` option `cols` sets the desktop columns as a class (`__key--c2`, `__key--c3`).
- use-fan: scene 01 (ind-pharma) is a flat-top PP make-up tank on a plinth, not a dished kettle on legs; at 860 px and
  under the key is hidden (the next block lists the same five industries; projects phone hero 1,177 → 920 px).
- service-ring at 600 px and under: the drawing shows through a window cut to the stations and their tags (`hsCrop`,
  `--hs-cl/-cr/-ct/-cb`), tags 15 px.
- compliance-matrix phones: the sheet at the full gutter, rows 14 px on one line, the package as a 112 px inset at the
  sheet's top right (compliance phone hero 785 → 756 px).
- Motion (Hero/motion.js): the new scenes run the same AQiso choreography; the matrix sheet rises, its rows rule in and
  each tick lands in its column.
- Verify fixes (round C): the compliance package sits clear under the sheet's lower right on desktop (scene
  `padding-bottom: 36% - space-6`, so it never covers row 04's proof chip); from 861 to 1,160 px the sheet takes the full
  column with 48 px tick columns, 12 px sans heads and no row numbers; the compact phone rows apply at 600 px and under
  only (601-860 keeps the desktop rows with the top-right inset); the Proof head carries its column rule. hsCrop keeps
  2 % of the frame as margin on each side so the end stations clear the screen edge. shop-bay keeps a 2-column key from
  601 to 860 px.
