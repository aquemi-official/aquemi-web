Hero opens every page: eyebrow, one display headline, one lead sentence, one primary button and one link.

- Markup: `<section class="aq-hero">` (add `aq-hero--home` on the home page) holding `<div class="aq-in">`, then either the text stack alone or `aq-hero__grid` with the text stack and one right-hand part (see the variants below), then the page's KeyFacts strip (`wKeyFacts(facts)` in `assets/src/parts/KeyFacts.js`; empty when the page has no facts). Wrap the page in `aq-page`.
- Ground: the hero sits on `surface` with generous white space; the headline is light (`display` 300 56/60, `display-xl` 300 72/76 on home) in sentence case. The right-hand part is line art: single-weight strokes, `flow` only where it marks the water path or a leader end. No frames, grid paper, registration crosses, scale rules or stamps.
- Text stack: `<div class="aq-stack">` with `<span class="aq-eyebrow">`, `<h1 class="aq-display">` (`aq-display-xl` on the home page only), `<p class="aq-lead">`, `<div class="aq-hero__actions">` holding one `aq-btn--primary` and one `aq-btn--link`, then optional `aq-tags`. Leave tags out when the eyebrow already names the standards or a standards band follows on the page. Tags (`tags: ["GUI-0001", "EU GMP Annex 15"]`) print through `tx()`, so a tag still in `[square brackets]` shows as a placeholder (`<span class="aq-tag"><span class="aq-ph">[panel standard]</span></span>`) and µ stays lower case.
- Both actions are built by `wBtn` (Button): the primary from `primary_cta`, `primary_cta_link` and `primary_cta_intent`; the link from `secondary_cta` `{label, link, intent}`. Either may carry an intent (options the linked form ticks on arrival) and either link may be a page id, `page#anchor`, `#anchor` or a call (`tel:[service phone number]`, see Button).
- The eyebrow names the system family and the standard: "Water for Injection · USP <1231> · Ph. Eur. 0169".
- One hero per page. No carousel, no background video.

## Pass 9: the first screen of a product site

What changed for every hero, calm enough to open all 27 pages:

- **Type:** the headline steps up to catalogue size: `aq-display` at `clamp(48px, 5.4cqi, 76px)`/1.02 (-0.035em), `aq-display-xl` on home at `clamp(56px, 6.4cqi, 88px)`/1 (-0.04em); phones 40/42 and 46/46. The eyebrow is led by a `space-8` 1.5 px `flow` rule (`space-6` on phones), the water line of the page. Lead at most 56 characters wide.
- **Sheet:** `aq-hero__sheet`, the first child of every hero (`HERO_SHEET` in Hero.js, `aria-hidden`): small registration crosses on a 48 px grid (`line-strong` at 55 %), masked to gather at the top right behind the figure and fade before the headline (on phones, a band across the top).
- **Equipment figure:** text 5 parts, figure 7 (it was 6 / 6), callout values `clamp(16px, 1.9cqi, 26px)`. A `flow` scan line (`aq-hero__scan`, inside `aq-hero__art`, hidden without motion) rides the print edge up the drawing as it wipes in.
- **Index and system index:** the rows hang off one pipe rail down the left: twin `line-strong` walls `space-2` apart, the `flow` water line in the bore, a tee and a 7 px node into every row. Each linked row ends in its page's icon (`pageIcon`, `aq-hero__index-ic`, `ink-subtle`). Hover or focus lights the row's tee, node, number, title and icon in `flow`, lifts the icon and slides the arrow. The system index sets its numbers in Geist 300 34/32 and titles 22/28. `--aq-rail`, `--aq-water` (on the `ol`) and `--aq-tee`, `--aq-node` (on each `li`) default to 1.
- Unchanged: every variant, the drawings, callouts and leaders, key facts, CTAs and intents, the hub-page index data, the drawn figures and the home loop.

## Which variant

| Pages | Right-hand part | Grid class |
| --- | --- | --- |
| `home` | Loop drawing | `aq-hero__grid--loop` |
| `sys-*`, `svc-*`, `ind-*` with a drawing in `ART` | Equipment figure with callouts | `aq-hero__grid--figure` |
| `sys-*`, `svc-*`, `ind-*` without a drawing | Photograph placeholder | `aq-hero__grid` |
| Pages without a drawing that set `figure` (compliance, cmp-*, about, careers, news, contact-*) | Drawn figure: spots cluster, binder, stamp or route | `aq-hero__grid--figure aq-hero__grid--drawn` |
| Hub pages that set `figure.look` (systems, services, first-system, projects) | Drawn scene (HeroScene): an isometric scene with numbered tags and its key | `aq-hero__grid--figure aq-hero__grid--scene` |
| Pages without an `ART` drawing that set `figure.art` (cmp-quality, project-plan) | Hero drawing: a line drawing like the equipment figure, no callouts | `aq-hero__grid--figure` + `aq-hero__figure--drawing` |
| Hub and company pages (everything else) | Section index | `aq-hero__grid--index` |

`wHero` in `assets/src/parts/Hero.js` picks the variant from the page id; content files need no extra fields (except `hero_index: false` and the opt-in `index`, below).

## Equipment figure (pages with a drawing)

The equipment drawing large beside the headline, its key facts as quiet callouts joined to the drawing by hairline leaders.

- Markup: `aq-hero__grid aq-hero__grid--figure` (text and figure 6 parts each, vertically centred; the headline keeps the `display` size). On the right `<figure class="aq-hero__figure">` holding, in order: `<dl class="aq-hero__callouts aq-hero__callouts--top">` (the first two facts), `<div class="aq-hero__art">` with the Illustration (`role="img"`, `aria-label` from `ART`) and two leader SVGs (`aq-hero__leaders--wide`, viewBox 120 x 100, and `aq-hero__leaders--narrow`, viewBox 100 x 80; both `aria-hidden`), then `<dl class="aq-hero__callouts aq-hero__callouts--bottom">` (facts three and four). Each callout is `<div class="aq-hero__callout"><dt>label</dt><dd>value</dd></div>`.
- **Callouts only on `sys-*` pages**, whose facts are figures of the drawn module: an Aquemi design value, guarantee or capacity, labelled "what, where · basis" (`[minimum–maximum capacity, L/h]` over "Per skid · at your coldest feed"), never a public limit or a code (DR-010). Service and industry pages show the drawing alone and keep their facts in the KeyFacts strip under the grid. A fifth fact or later always goes to the strip.
- Desktop: the figure is 6:5 on `surface`, no frame; the drawing is a centred square 96 % of its height. Callouts sit in the four corners (27 % wide, 13 % tall): label Geist 13/18 sentence case in `ink-muted`, value Geist Mono 300 in `ink`, a `line` hairline on the side facing the drawing. A 1 px `line-strong` leader runs from the inner end of that hairline (an open node) to a fixed point on the drawing, ending in a small `flow` dot. Anchors per slot are `HERO_AT` in `assets/src/parts/Hero.js`: every drawing is a centred isometric skid, so they land on equipment.
- Phones (pass 12, S15/S16): the drawing comes first, at the full gutter width, in a box of the drawing's own ratio (`ART_R` in `Hero.js`, never taller than 5:4, so a wide drawing leaves no empty band). No leaders: numbered pins (`aq-hero__pin`, `surface` with a 1.5 px `flow` ring, mono numeral) sit on the drawing at the leaders' anchors, and the callouts follow as stacked rows: the pin's number, the label at 14 px, the value in mono 18/26. The `aq-hero__leaders--narrow` SVG stays in the markup but is not shown. A system page's box may go down to square (`heroBoxR`), so a near-square drawing also runs the full width (S9). Pins take `HERO_AT_P[page]` where the generic `HERO_AT` slot would mark the wrong part (sys-storage: dead leg on a branch valve, storage tank on the tank; sys-pw: skid outlet on the outlet pipe; sys-pretreatment: SDI at the RO-side connections), placed in the drawing's own square box (`heroPins`); the desktop leaders keep `HERO_AT`. Desktop: a hero--mist whose top callout label itself carries a placeholder (sys-pretreatment) gets `space-16` more top padding so the stacked label is not clipped by the hero's edge. Headline as every other hero on phones.
- **Adding a drawing**: put the mask in `assets/illustrations/<page id>.png` (see Illustration), run `python tools/images.py`, then add one line to `ART` in `assets/src/parts/Hero.js` (the text is the drawing's `aria-label`, naming only what is drawn, in the site's Canadian spelling) and its width / height ratio to `ART_R`. Then `python tools/design_system.py build`.
- Pages listed today: every `sys-*`, `svc-*` and `ind-*` page. Pass 12 added `ind-personal-care` (gallery 197), `ind-hospital-lab` (206, the plant-room floor outlines kept as the cue that the loop rises to the floor above) and `ind-process` (214), made with `tools/line_art.py`; the concept images' wording never reaches the page.

## Hero drawing (opt-in hero field `figure.art`, pass 12 round D)

`"figure": {"art": "cmp-quality"}`: a page that is not an equipment page takes a line drawing as its hero, rendered as
the equipment figure (same Illustration mask in `ink-muted`, `ink` in dark, the `flow` scan line, no callouts or pins).
The drawing is `assets/illustrations/<id>.png` (+ `.webp`), its `aria-label` in `HERO_ART` in `Hero.js` and its ratio
in `ART_R`. It is kept out of `ART` on purpose: related cards, project-run and the other `ART` readers keep their own
drawing for these pages. `art` wins over any other figure fields, which stay so the page can switch back (cmp-quality
keeps its stamp plate fields, project-plan its route plate fields; `wHero` skips the drawn figure while `art` is set).
The stamp, route and other figure kinds stay in the library for any page that sets them.
- On today: `cmp-quality` (audit table: quality manual, nonconformance register, a pipe length with a fused joint, a
  shipment record; Gemini 239) and `project-plan` (schedule board: nine stage bars stepping down a ruled sheet, a hold
  diamond at each start, the package (a flat-bottom tank on its plinth beside a small frame) on a pallet at FAT, a
  truck at shipping, the handover binder after PQ; redrawn in code from Gemini 246, which baked the stage names into
  its bars). The pallet and the truck sit in the open field past the next row's bar, tied to their own bar by a dashed
  hairline, so no object crosses the staircase.
- Desktop: `aq-hero__figure--drawing` insets the drawing 2 % 4 % (not 10 %), so a near-square drawing holds its half
  of the hero.
- Phone: the box takes the drawing's own ratio at the full gutter width (`heroBoxR` allows down to square for these,
  as for `sys-*` and for `ART_FULL` pages: svc-upgrades), so there is no band above or below. cmp-quality crops to the
  table top on small phones (to 560 px: mask 139 % at 46 % 26 %, box 1.31) so the four records read at about 1.4x;
  from 561 px the whole table shows.
- Tablet (561 to 860 px): the drawing figure is at most 600 px wide and centred, so a near-square drawing does not
  make the hero 1,100 px tall.
- New drawings follow the PP drawing rules (BUILD-PLAN-C §0) and the stroke weight of the other masks (about 2 px at
  900 px; `tools/line_art.py` output).

## Drawn scene (opt-in hero field `figure.look`, pass 12 round B)

`"figure": {"look": "module-lineup" | "service-ring" | "site-room" | "use-fan", …}`: a hub page's own isometric scene
with numbered tags, and a key whose rows carry the same numbers (the page's index, the named rows of one of its blocks,
or a list of industry pages). Markup, data, phone and motion: `design-system/components/HeroScene/README.md`. On today:
`systems` (module-lineup; its `index` lists the four system pages in water order), `services` (service-ring, keyed to
the services index), `first-system` (site-room, keyed to the "What your site needs" rows) and `projects` (use-fan,
keyed to the five industry pages). A scene replaces the big index or the section index: the key is that index.
`figure.look` wins over the other `figure` kinds, `index` and `hero_index`; ignored on `home` and pages in `ART`.

## Drawn figure (opt-in hero field `figure`)

For pages with no equipment drawing, a quiet line-art figure in place of the index, built from what the system already has (Spots, Icons, SVG and CSS; no new raster art). On today: `compliance`, `cmp-documentation`, `cmp-quality`, `about`, `careers`, `news`, `contact-proposal`, `contact-service`, `contact-locations`.

- Data, one of:
  - `"figure": {"spots": ["ro-skid", "storage-tank", "pretreatment"], "label": "Generation · storage · pretreatment"}`: 2–4 Spot vignettes in a zig-zag, joined along their bases by one drawn `flow` pipe ending in an arrow, each tagged `01 Reverse osmosis skid` (number in `ink-subtle` mono, name Geist 13/18 sentence case in `ink-muted` on a `surface` chip so the pipe passes behind). An entry may be `{"spot": "pid", "t": "Design"}`; an Icon name falls back to the icon (as `wSpot`). Names come from `SPOT_NAME` in `Hero.js`, in plain words: "Reverse osmosis skid", "Electrodeionization stack" (a figure tag may be the only place a page names that equipment; a page that wants the short form names the entry, `{"spot": "ro-skid", "t": "RO skid"}`); `uv-ozone` reads "UV", since no ozone option is offered (DR-013).
  - Where the pipe drops from a vignette's base to a lower neighbour, its riser runs down beside that vignette's tag, so the tag keeps inside the gap between the risers (`--tw`, set per vignette by `wHeroSpots`, caps the tag's width) and a long name wraps, "Electrodeionization" at its soft hyphen. On a phone the middle tag of three may take three lines; it never covers the pipe.
  - `"figure": {"plate": "binder", "label": "Turnover package", "items": [...], "foot": "Indexed to your URS"}`: a stack of folders drawn in `line-strong` hairlines (front folder `surface-raised`, the ones behind `surface-sunken`), numbered divider tabs staggered up and right, the front tab marked by a 1 px `flow` top line, the title Geist 400 sentence case over a `line` hairline, the index (`items`, at most 6; 4 on phones) on `line` rows with `ink-subtle` mono numbers, and the foot caption.
  - `"figure": {"plate": "stamp", "label": "Released", "title": "Release record", "items": [...], "sub": "QA"}`: a release record on `surface-raised` whose rows end in ticked boxes (`flow` tick), closed by a status line: a `flow` tick and the label, with "Signed · QA" beside it. No rubber stamp; `ring` and `ring2` are no longer drawn.
  - `"figure": {"plate": "route", "stops": ["Your request", "Engineer review", "Written reply"]}`: one 1.5 px `flow` route from an open start node through three numbered stops (Geist Mono 300 in a `line-strong` circle on `surface`) to an arrow, over a `line` ground hairline. Stop names Geist sentence case. Labels sit right of stop 1, under stop 2, over stop 3.
  - `label` (any kind) is an eyebrow-style caption (Geist Mono 12/16, 0.08em, uppercase, `ink-muted`) at the top left.
- Only state what the page states. Stop names, folder names and record rows paraphrase the page's own sections; never add figures.
- Markup: `<figure class="aq-hero__drawn aq-hero__drawn--spots|binder|stamp|route" aria-hidden="true">` (decorative: the headline and lead carry the meaning). Line work is an SVG with viewBox 120 x 100 over the 6:5 frame (non-scaling strokes); stops, vignettes and folders are positioned in percent. `figure` wins over `index` and `hero_index`; ignored on `home` and on pages with a drawing in `ART`. Built by `wHeroDrawn(p.figure)` in `Hero.js`.
- Desktop: text and figure 6 parts each, as the equipment figure. No frame or grid. Sizes inside scale with the figure (container units).
- Phone (pass 12, S15): under the actions at the full gutter width (6:5). A spots figure without a label is pulled up by 12 % of its width, the empty top of its zig-zag, so no band opens between the actions and the drawing; vignette tags at 14/18. The stamp (buying's proposal card) drops its 6:5 frame: the record runs the full width with 14 px rows and a 20/26 title. The binder shows four rows and no icon. A call in the actions (contact-service's "Call [service phone number]", a `tel:` link once confirmed, Button's pending text until then) becomes a full-width outlined 48 px button under the primary. Tablet (481-860 px): the call buttons stop at 480 px and the spots figure at 560 px, centred.
- Motion: the spots pipe runs vignette to vignette, folders slide into the binder, the record's boxes tick, the route draws stop by stop (`motion.js`).

## Photograph (detail pages without a drawing)

- Grid: text 7 parts, image 5 parts. The image stretches to the full height of the text stack so their tops and bottoms align.
- Image: a real photograph of a finished skid or installed loop. Until one exists, use `<div class="aq-photo" role="img">` with a caption saying what the photo must show. The placeholder is a plain `surface-sunken` area with a `line` border and its mono caption.
- Key facts: a KeyFacts strip may close the hero, below the grid, with three or four figures from the page.

## Section index (hub and company pages)

- Markup: `aq-hero__grid aq-hero__grid--index` (text 7 parts, index 5 parts, vertically centred). On the right `<nav class="aq-hero__index" aria-label="Pages in Systems">` holding `<p class="aq-hero__index-label">Systems · 7 pages</p>` and an `<ol>` of `<li><a class="aq-hero__index-item" href="#sys-pw" data-wp="sys-pw"><span class="aq-hero__index-t">Purified Water (PW) generation</span></a></li>`. An item that cannot link is a `<span class="aq-hero__index-item">`.
- The shared row grammar: `line` hairlines between rows (at least 44 px tall). The numbers `01`–`0N` are the shared index style (Geist Mono 13/24, `ink-subtle`), from a CSS counter with empty alt text; never write them in the markup. Titles are Geist 400 16/24 sentence case in `ink`; linked titles end in a `flow` arrow and the page's icon. The rows hang off the pipe rail (Pass 9, above); hover lights the row in `flow`; focus adds the 2 px `focus` ring. No fills or cards.
- The label above the rows is eyebrow style (Geist Mono 12/16, 0.08em, uppercase, `ink-muted`).
- Data: the pages whose `section` equals this page's `section`, other than the page itself, in `pages.json` order. On the section's own hub (the page NAVSECT links to: systems, services, industries, compliance, projects, about) the label reads "Systems · 7 pages"; on any other page of the section (cmp-*, careers, news, contact-*) it reads "Also in Company", so the index works as a section switcher.
- Fallback: a page alone in its section (today only `projects`) lists its own section headings (`blocks[].h`, leaving out `related`, at most seven) under "On this page". Headings link only when their block has a `nav` anchor; the rest are plain items. With fewer than two headings the hero stays text-only.
- Keep the page's hero tags under the actions: the index replaces the photograph, not the standards.
- **Turning it off:** when the section right under the hero already lists the same pages with more to say, set `"hero_index": false` on the page (the systems hub uses the large `index` instead). The hero is then the text stack alone at full width; no other page changes. Don't repeat a list the reader sees one scroll later.
- Phones (`@container (max-width: 860px)`): the index stacks under the tags, full width.

## System index (opt-in hero field `index`)

The hub's child pages as a larger numbered index beside the headline. On today: `industries`, `compliance` (`systems` and `services` show it as their scene's key, above).

- Data: `"index": true` lists the other pages of this page's `section` in `pages.json` order (as the section index); `"index": ["sys-pw", "sys-storage"]` lists those page ids in that order (unknown ids are skipped). Titles are each page's `nav_label`; every entry links to its page. `index` wins over `hero_index`. Ignored on `home` and on `sys-*`, `svc-*`, `ind-*` detail pages. Built by `heroBigIndex(p)` in `Hero.js`; nothing else in the hero changes.
- Markup: the section index markup with `aq-hero__index aq-hero__index--big` on the nav and `aq-hero__grid--big-index` added to the grid (text and index 6 parts each); the label reads "Systems index · 7 pages".
- Desktop: the section index rows on the rail with numbers in Geist 300 34/32, titles 22/28 and `space-4` row padding, icons `space-8`; no frame. Hover turns the title `flow`. The KeyFacts strip stays below the grid.
- Phone: under the actions (and tags), full width, titles 17/24.

## Loop drawing (home)

- Markup: `aq-hero--home` with `aq-hero__grid aq-hero__grid--loop` (text 7 parts, drawing 5 parts, vertically centred); the headline is `aq-display-xl`. On the right `<figure class="aq-hero__loop" role="img" aria-label="…">` holding an inline `<svg viewBox="0 0 440 520" aria-hidden="true">`. The figure's `aria-label` is the text alternative; the SVG text is decorative.
- A fine-line figure-eight distribution loop with a heat exchanger, conductivity (CE) and TOC sensor bubbles, a point-of-use valve, four `flow` arrows and small Geist annotations (sentence case). No construction lines or scale rules. The weight sits on the diagonal: the sensors top right, the heat exchanger bottom left, the valve at the foot.
- No filter on the loop: WHO TRS 1033 says filtration should not be used in distribution loops or at take-off user points, and the drawing has no generation or tank to show one upstream.
- Colours: the pipe is `flow` (the water path), parts `currentColor` (`ink-muted` on the figure), leaders `line-strong`, arrows `flow`, part fills `surface` so the pipe breaks behind them. Strokes are 1 px (pipe 1.5 px) with `vector-effect: non-scaling-stroke`. No literal colours.
- Annotations name the loop and its parts: "Distribution loop · PP", USP <645> at the conductivity sensor, USP <643> at the TOC sensor, the heat exchanger and the furthest point of use. No figure is drawn: the home facts are Aquemi's own figures and sit in the KeyFacts strip, and a pharmacopoeia limit drawn at the point of use would read as our result (DR-010).
- The heat exchanger is labelled with sys-storage's placeholder, `[heat exchanger, standard or option]`, on two lines (`aq-loop__ph`: the Placeholder's mono in `ink`, brackets kept, since SVG text has no ground for the `caution-tint` chip; with the site's placeholder highlight off it reads like the other labels). Drawn as standard it would read as hot-water sanitization, which the PP loop does not promise (DR-013). Once Aquemi confirms, the label becomes "Heat exchanger" (standard) or "Heat exchanger, option", in the same commit as sys-storage.
- The home hero has no photograph slot and no arc motif any more (the `aq-arc` styles remain for `AQ.ARC`). Its KeyFacts strip follows the grid.
- Size: never drawn larger than its viewBox. The figure is at most 440 px wide (`space-32` × 3 + `space-12` + `space-2`), set to the end of its column, so at 1,280 px it draws 1:1 (440 × 520) where the column is 480 px. Scaled up, the 11 px labels painted at 12 px and ran past their own SVG box (in Chrome a label's box is its extent in the drawing's units), so the rendered QA read "Distribution loop · PP" as text wider than its box (114 > 104 px) and "standard or option]" likewise. At 1:1 or smaller every label fits its box and keeps its CSS size. Keep new labels inside the viewBox.
- Phones (pass 12): the text stack opens into the grid (`display: contents`) so the order is eyebrow, headline, lead, the loop, then the actions. The loop is a second drawing of the same figure turned on its side (`aq-loop__svg--narrow`, `matrix(0 -1 1 0 0 440)`, viewBox 515 × 255) at the full gutter width, about 170 px tall, under a mono caption "Distribution loop · PP"; its parts carry numbered pins (`LOOP_PINS`) and the four labels sit in a 2 × 2 legend at 14 px (the heat exchanger keeps its placeholder). The sensors sit 44 apart on this drawing so their pins do not touch. No caustic layer on phones; headline 40/42; padding `space-8`. The upright drawing (`aq-loop__svg--wide`) is unchanged on desktop.
- Compact (pass 12 verify): the narrow loop is at most 132 px tall (`aq-loop__band` capped at 132 × 515 / 255 px and centred, so the pins, percentages of the band, stay on their parts), the mono caption is not shown (the legend names the parts), the legend is tighter and the hero's top padding `space-6`, which brings "Talk to an engineer" back to about 770 px from the top of a 375 × 812 screen. On tablets the loop figure stops at 520 px, centred.

## Phones

The hero must fit about 1.5 phone screens including its facts, and the primary button must be in the first screen when the lead is 35 words or fewer (content budget).

- Padding `space-12` top and bottom (home `space-8`). Headline: `display` 40/42 (36/40 on `ind-cdmo` at 380 px or less, `data-hero` on the section names the page), `display-xl` 46/46 (home 40/42); lead 17/26.
- Order: eyebrow, headline, lead, actions, then the figure. The equipment figure is full width with its callouts above and below the drawing (see above); the KeyFacts strip lists one fact per row. The photograph placeholder is 2:1.

## Motion

`motion.js`: one timeline, cause before effect. The headline lines rise out of their mask while the eyebrow decodes, the lead and actions follow; then the right-hand part builds the way it would be drawn: the equipment drawing prints up behind the flow scan line (a hero drawing set with `figure.art` prints top-down instead, so the project-plan schedule fills in stage order) and each leader grows out of its anchor to its callout; the index rail is laid down the left, each row's tee and node seat as it passes and the row slides off the tee, then the water runs down the rail once; the home loop draws and four flow dots travel it once; drawn figures build piece by piece. Under 5 s; nothing under reduced motion; a re-render that only opened the phone menu keeps the hero still. Phones (pass 12): the equipment figure's pins pop onto the drawing in order and the callout rows follow; the home loop animates whichever drawing is showing (the side-on one on phones, its flow dots run inside its rotated group), then its pins and legend rows land.

## Flow mist ground

System pages with an equipment drawing (`sys-*`) carry `aq-hero--mist`: one faint `flow-tint` bloom in the top-right corner behind the drawing, over `surface` (the brand book's Gradient grounds). The headline and lead stay on plain ground; text keeps 6.8:1 or better in both themes. No other hero takes a gradient.

## Pass 12 round C (c03-heroes)

- Binder plate: the front sheet shows all six rows wherever it has room; only a phone page (`@media (max-width: 600px)`)
  cuts it to four (the 860 px container rule matched the figure's own container at 1,280).
- A KeyFacts strip that closes the hero ends it 32 px sooner (desktop 64 → 32, phone 48 → 16; home keeps its padding);
  at 600 px and under the strip follows a figure at 16 px.
- svc-upgrades (desktop): its one fact sits under the actions in the text column (hero 924 → 807 px at 1,280).
- cmp-quality (desktop): the shipment record about 560 px wide with 16 px rows; buying's card unchanged.
- Home loop on phones: sensor 2 moved along the loop so pins 1 and 2 keep about 8 px between them.
- Verify fixes (round C): the 6/6 grid for the shop-bay, site-map and reply-flow scenes is desktop only (861 px and
  up), so phones keep one column. Binder rows are 13-14 px with 12 px mono numerals; the front sheet's rows share its
  height (six rows fill the paper at every width); on phones the plate stands at 12:13 and a long row wraps instead of
  ending in an ellipsis. A KeyFacts strip closing a phone hero ends it at `space-6`.

