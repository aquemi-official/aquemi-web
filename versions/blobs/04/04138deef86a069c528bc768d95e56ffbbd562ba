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
