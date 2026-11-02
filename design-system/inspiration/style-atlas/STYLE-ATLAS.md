# Style atlas: what 186 Gemini images say about the Aquemi look

This atlas covers every Gemini image made for the site (`../gemini/01`–`186`). It is for designers and for anyone writing image prompts. It records what keeps showing up, what works, what fails, and the vocabulary to prompt with. It does not replace the brand book (`../../README.md`); where the two disagree, the brand book rules until someone changes it.

`brand_fit` (1–5) in every description scores an image against the brand book **as it is written today** (calm, light type, line art, one accent). It does not score boldness or quality. The owner wants bolder, award-level sections, so a low score on a strong idea (`76`, `83`) means "needs reworking to fit", not "reject".

## 1. Corpus and method

| | |
| --- | --- |
| Images | 186 (`01`–`30` early concepts and drawings: 30; `31`–`67` later passes: 37; `68`–`94` pass 9, varied art directions: 27; `95`–`186` pass 9b, the ten kit modules in rotation: 92) |
| Section kinds | spec/limits 35, standards 23, equipment drawing 21, steps/timeline 21, options 20, router 16, documents 14, process diagram 13, other 6, hero 3, whole page 3, FAQ 2, closing 2, case study 2, icon/spot sheet 2, form 1, footer 1, nav 1 |
| Brand fit | mean 3.88. Scores: 5 ×32, 4 ×111, 3 ×32, 2 ×11. By era: early 3.43, later 3.97, pass 9 3.52, pass 9b **4.10** |
| Top rated (5) | `16`, `26`, `36`, `40`, `41`, `46`, `54`, `77`, `80`, `85`, `95`, `96`, `108`, `114`, `116`, `118`, `119`, `120`, `121`, `123`, `131`, `144`, `145`, `151`, `156`, `157`, `161`, `164`, `165`, `172`, `174`, `183` |
| Lowest (2) | `07`, `10`, `11`, `14`, `22` (off-offer subjects: WFI, steam, stainless), `76`, `82`, `83` (heavy type or photo props), `130` (glossy take with duplicated labels), `160`, `171` (empty or broken tables on a drawing sheet) |

**Method.** Each image was described once by an image-to-text pass into `images/<same stem>.json`. The schema has these fields: style_family, art_direction, composition, layout_devices, palette, typography, rendering, line_and_texture, motifs, ui_patterns, motion_implied, mood, t2i_keywords, t2i_prompt, signature_idea, strengths, weaknesses and brand_fit. `aggregate.py` (standard library only) turns those descriptions into `keywords.json`:

- `phrases_by_field`: every phrase in every field, normalised (lowercase, spelling merged, plurals folded), with the number of images it appears in.
- `concepts`: about 90 curated regex concepts that merge different wordings of one idea ("deep navy background", "navy page ground" → `navy_ground`). Each concept has image counts, its share in each era, mean fit with and without it, and its files. A phrase starting with "no …" counts as a negation, never as the thing it negates. `x_plain_table` (a table on a frame with no visual idea) was added for pass 9b.
- `families`: one primary family per image, assigned by ordered rules plus 15 overrides (`57`, `69`, `78`, `90`, and for pass 9b `115`, `118`, `124`, `146`, `147`, `154`, `155`, `163`, `166`, `175`, `182`; the reasons are in the script).
- `cooccurrence`, `brand_fit` (by era, family and section, and the fit lift of each concept), `era_shift`, `t2i_vocabulary`, `negations`.

`aggregate.py`'s `pass9` era runs from `68` up, so it holds pass 9 and 9b together. The separate pass 9 / pass 9b figures in this atlas split that era by image number (`68`–`94`, `95`+). All counts below are **images**, not mentions. They come from `keywords.json`.

**Re-run** after adding or re-describing images. Write one JSON per new `gemini/NN-*.png` in `images/`, using the same schema, then run:

```bash
python design-system/inspiration/style-atlas/aggregate.py
```

Then update the counts here. A new image's family comes from `FAMILY_RULES`, so check the printed family table and add an `OVERRIDES` entry if a hybrid lands in the wrong family.

## 2. The brand core: visual DNA already established

These traits appear in most images. They are what the generations agree on without being asked, and they belong in every prompt. Era shares read early → later → pass 9 → pass 9b.

| Trait (concept) | Images | Notes |
| --- | --- | --- |
| Flat vector / flat UI mockup | 180 / 186 | Only the render and photo directions break it |
| Hairline 1–1.5 px strokes | 170 | Biggest positive fit lift of any trait: +0.76 (3.95 with, 3.19 without). 0.99 in pass 9b |
| Monospace for figures and codes | 145 | 0.43 → 0.81 → 0.81 → 0.87 |
| Steel-blue accent | 138 | 0.47 → 0.84 → 0.93 → 0.74. Fit lift +0.29 |
| Numbered items 01–0n | 136 | 0.40 → 0.51 → 0.59 → 0.97. Fit lift +0.55 |
| Line art | 131 | Fit lift +0.30 |
| Light-weight headline | 130 | Largest riser: 0.03 → 0.38 → 0.89 → 0.99. Fit lift +0.57 |
| Square corners | 122 | 0.33 → 0.41 → 0.48 → 0.91. Fit lift +0.46 |
| Deep navy ground | 115 | 0.47 → 0.59 → 0.78 → 0.63 |
| Warm limestone / paper ground | 107 | 0.07 → 0.62 → 0.63 → 0.71 |
| Generous negative space | 104 | 0.73 → 0.59 → 0.37 → 0.54: recovered in pass 9b, when "at most five labelled items" joined the base block |
| Table / matrix / register | 80 | Rising: 0.20 → 0.27 → 0.44 → 0.57. Fit lift only +0.14 (see §7, plain table) |
| Isometric equipment | 71 | Mostly drawings. Fit lift is negative (−0.05) |
| Drawing-sheet frame / zone refs | 64 | Fit lift fell from +0.43 to +0.01: in pass 9b the frame mostly held plain tables |
| Blueprint | 63 | Fit lift +0.25 |

What the images consistently leave out: shading (82), shadows (67), grain (42), hatching (27), device frames (23), people (23), texture (16).

Mood words: calm 119, technical 89, precise 68, confident 42, orderly 36, engineered 28, clear 22. "Dense" (13) is the only frequent mood word the brand does not want.

Most frequent t2i word pairs: steel blue 133, deep navy 131, ui mockup 129, square corner 117, light weight 102, flat ui 99, flat vector 75, sentence case 72, line drawing 67, line art 54, title block 45, leader line 45, drawing sheet 41, negative space 33.

**In one line:** deep navy and warm limestone grounds, one steel-blue line or figure, 1–1.5 px line drawings of real equipment, light headlines, mono numbers, numbered items, drawing-sheet furniture, square corners and space. Every family below is a variation on that core.

## 3. Style families

| # | Family | Images | Mean fit (range) | Eras early / later / p9 / p9b | Defining keywords (share in family) | Exemplars (fit) | Good for | Risks (images in family) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **Isolated equipment line art** (masks and spots) | 22 | 3.41 (2–4) | 16 / 6 / 0 / 0 | black ink on pure white, isometric, catalogue line art, single isolated object, white margin | `65` (4), `66` (4), `06` (4), `12` (4), `64` (4) | page-header drawings (Illustration masks), spot icons, explainer figures, hero callout targets | off-offer subjects 18 (stainless, WFI, steam: `07` `10` `11` `14` `22` all 2), dense 16, muddy when small 12, clichés 9 (`24`, `28`). The low fit comes from the subject, not the style. Pass 9b's isometric module put its drawings on limestone beside a table, so they landed in family 4 |
| 2 | **Navy blueprint pipe-route** | 27 | 4.04 (3–5) | 6 / 6 / 4 / 11 | navy ground, light line work on navy, blueprint, one continuous pipe route, P&ID, isometric | `16` (5), `46` (5), `85` (5), `96` (5), `108` (5), `121` (5), `144` (5) | process diagram, router, project steps, "how it fits together", a pipe as a table's spine (`121`, `158`, `186`) | dense 21, generator glitches 17, decorative valves and loops 9, off-offer 8, illegible 8, hard phone reflow 5. Heavy headlines in 9, none in pass 9b |
| 3 | **Navy drawing-sheet UI** (mono documents) | 22 | 3.68 (2–5) | 5 / 2 / 3 / 12 | navy, mono throughout, numbered rows, sheet frame, title block, table | `36` (5), `77` (5), `05` (4), `48` (4), `102` (4), `180` (4) | documents, standards tables, forms, footer, FAQ | glitches 13, dense 11, decorative connectors 10, **plain table only 9** (all pass 9b), invented codes 7, illegible 7, all-mono 4. Weakest pass 9b module (§3a) |
| 4 | **Limestone engineering sheet** | 39 | 4.00 (2–5) | 0 / 14 / 3 / 22 | limestone paper ground, hairline navy rules, mono, sheet frame and title block, numbered rows, isometric drawing beside a table | `54` (5), `119` (5), `145` (5), `151` (5), `164` (5), `34` (4) | spec sheets, fault lists, evidence maps, steps, nav, plan tiers, case record, standards keyed to a drawing (`164`) | decorative filler schematics 20 (`127`, `177`, `184`), glitches 19, dense 14, invented 13, generic 12, off-offer 7, phone 7, all-mono 7, extra neutrals (beige, peach) |
| 5 | **Instrument and data-viz** | 15 | **4.33** (4–5) | 1 / 4 / 2 / 8 | one huge figure, tick scale, limit line, dials, mono everywhere | `26` (5), `114` (5), `120` (5), `156` (5), `174` (5), `39` (4) | limits, key facts, versus, standards map, home hero, a readout set on a route (`156`) or beside a trace table (`120`) | invented figures 10, decorative scales that measure nothing 10 (`135`, `150`), dense 7, rounded 5, illegible 5, glow and sci-fi (`91`) |
| 6 | **Editorial oversized type** | 16 | 3.56 (2–5) | 2 / 2 / 3 / 9 | oversized headline, poster scale, crop marks, split, single accent | `123` (5), `165` (5), `35` (4), `110` (4), `142` (4), `178` (4) | statement band, hero, closing, case-study outcome, "first system" explainers, a package or dossier index (`123`, `165`) | glitches 9, dense 9, heavy bold caps 8 (2 in pass 9b: `110`, `125`), decorative 8, invented figures 8, hype 3. The type was too heavy, not the scale |
| 7 | **Swiss grid, bento and split** | 13 | 4.31 (2–5) | 0 / 0 / 3 / 10 | navy / limestone tiles, huge light numerals, mono values, the seam as a meaning | `80` (5), `116` (5), `118` (5), `131` (5), `157` (5), `172` (5) | design parameters, limits, scope / battery limit, stage sequences, link grids | glitches 11, invented 8, empty or abstract filler tiles 7 (`116`, `149`, `157`), dense 5, checkerboard busy at 7 items, heavy display type on `76` |
| 8 | **Banded page rhythm** (whole page) | 3 | **4.33** (3–5) | 0 / 3 / 0 / 0 | navy bands for drawings, limestone sheets for reading | `40` (5), `41` (5), `58` (3) | page-level rhythm (already `.aq-sheet`) | second neutral (beige), illegible at page scale, `58` too dense. Pass 9b's band module made single sections (a navy band over a limestone sheet), counted in families 2 and 4 |
| 9 | **Soft 3D product render** | 13 | 3.85 (2–5) | 0 / 0 / 3 / 10 | white matte PP skid, translucent water, studio light, hotspots / leaders | `161` (5), `89` (4), `94` (4), `100` (4), `112` (4), `129` (4) | options on the skid, document index, sticky scroll story, costs wired to the consumable | leaders to arbitrary parts 11, glitches 8, invented 8, generic skid 7, rounded cards 5, glossy and consumer feel 3 (`130`, a lighter-model take, fit 2), needs a real Aquemi model |
| 10 | **Photo-real tactile and macro** | 16 | 3.75 (2–5) | 0 / 0 / 6 / 10 | photo-real still life or macro, kraft / manila paper, stamps, folder tabs; in pass 9b the macro also came as line mesh, hatching, duotone shading or one large joint drawing (`105`, `124`, `154`, `155`, `166`) | `95` (5), `183` (5), `86` (4), `104` (4), `122` (4), `124` (4) | standards as files, timeline over craft, compliance index, a weld macro as a mood plate beside rules or steps | invented 11, glitches 10, dimension lines that measure nothing 9, dense 8, glossy/stock 6, illegible 5, off-offer 5 (macros read as stainless: `84`, `87`), off-palette kraft and red 3, hard to build responsively |

Families 1–5 and 8 account for 128 of 186 images: they are the house style. Families 6, 7, 9 and 10 (58 images, 15 in pass 9 and 39 in pass 9b) are the variety the owner asked for.

### 3a. Pass 9b: the ten kit modules, scored

Pass 9b rotated the ten style modules of §8 across 92 images (79 sections plus 13 retakes), so it is the first fair comparison of the modules on the same base block.

| Module | Images | Mean fit | Plain table only | Notes |
| --- | --- | --- | --- | --- |
| 5 Instrument | 8 | **4.50** | 2 | `114`, `120`, `156`, `174` all 5. Best when the readout sits on the drawing (`156`); scales often measure nothing |
| 7 Swiss / bento | 9 | 4.44 | 1 | `116`, `131`, `157`, `172` all 5. Numeral tiles turn rows into a sequence; filler tiles are the weak spot |
| 1 Equipment line art | 9 | 4.33 | 3 | Mostly the stock pairing: table on one side, unlinked isometric on the other (`115`, `145`, `151`) |
| 2 Navy pipe-route | 9 | 4.33 | 1 | The pipe as the table's spine or header (`121`, `158`, `186`); a zigzag route confuses the order (`126`, fit 3) |
| 10 Macro | 10 | 4.20 | 1 | Mood plate only; the macro never encodes the content (`95` is the exception: rules beside one annotated weld) |
| 8 Page rhythm | 8 | 4.12 | 3 | `164`: numbered tags on the drawing match the table rows |
| 6 Editorial | 9 | 4.00 | 2 | Light type mostly held; 2 spreads went heavy (`110`, `125`) |
| 9 Soft 3D | 10 | 3.90 | 1 | Leaders hit arbitrary parts; `130` glossy (fit 2) |
| 4 Limestone sheet | 9 | 3.89 | 1 | Filler schematics that show nothing (`109`, `127`, `128`, `177`, `184`), an empty table (`171`, fit 2) |
| 3 Navy sheet UI | 11 | **3.45** | **8** | 5 of the 13 retakes in pass 9b. Of 11 images, 8 are plain tables, 2 are broken grids or empty form blocks (`147`, `160`), and only `180` put drawings in the sheet. The concept log reached the same verdict on every page: "the drawing-sheet direction always yields tables" |

## 4. Unique directions worth keeping (one-offs)

| File | Idea | Why keep it |
| --- | --- | --- |
| `76-p9-systems-2` | The page split is the battery limit: our scope on navy, yours on limestone, tie-in points on the seam | Best "meaning in the layout" idea in the set. Fit 2 is all type and clutter |
| `80-p9-sys-pw-2` | Swiss checkerboard of numbered parameter tiles, one blueprint tile breaking the grid | Pass 9's only 5 from a non-blueprint direction; pass 9b repeated it four times (`116`, `131`, `157`, `172`) |
| `83-p9-services-0` | Giant cropped START / GO words behind a rising staircase of situation cards | The boldest motion idea. Needs light outline type, not heavy italic |
| `91-p9-compliance-1` | Standards as nodes on orbit rings around a plant schematic | A hero diagram built from brand line work. Lose the glow and make the rings mean something |
| `94-p9-compliance-3` | Sticky cutaway that switches "active state" as standard cards scroll past on a rail | The most buildable scroll story (GSAP ScrollTrigger pin) |
| `88-p9-industries-2` | Modernist paper-cut collage of pipes and tanks in navy / steel-blue / limestone | Ownable illustration language that is not line art. Cheap SVG, animatable |
| `164-p9b-compliance-4` | Numbered square tags on a skid elevation; the standards table's rows carry the same numbers | The fix for a table beside an unlinked drawing: each row points at the part it governs |
| `121-p9b-svc-fabrication-0` | A vertical pipe spine with numbered joints, each joint level with its row in the joint log | The same keying as `164`, done with the pipe itself |
| `158-p9b-ind-meddevice-3` | Pipe headers are the table's column joins: each auditor row flows to where we answer | Turns a table into a pipe-native reading path |
| `156-p9b-ind-meddevice-1` | A flow readout set on the loop-to-washer schematic, three stations on one route | Instrument and route in one frame |
| `13-art-svc-design` | Equipment rising out of its own 2D drawing | Design-to-build in one image, good for a "Design" service hero or a scroll morph |
| `37-concept-home-hero` | Purity as a plotted measurement: loop as concentric hairlines on axes | Data as illustration, no object needed |
| `53-concept-hold-points` | Client hold points as closed valves needing a signature stamp | Turns a QA concept into a pipe-native device |
| `45-concept-evidence` | Hairline wires trace a standard to the documents that prove it | Interaction idea for EvidenceMap (fan-out on select) |
| `72-p9-home-3` | Service promises pinned to an exploded pump | Exploded view as an information layout (fix: leaders must point at the parts they describe) |
| `84-p9-services-1` | Rising hold-point timeline drawn over a macro weld | Craft plus schedule in one frame. Redo as PP butt-fusion, not chrome |
| `31-art-ind-cdmo` | Roofless suites all fed by one overhead header | "One supply, many clients" as an architectural cutaway |
| `48-concept-roles` | Our stamps tinted, yours outlined | Ownership encoded by fill vs outline. Already RoleMatrix |

## 5. Intersections: families that combine well

Co-occurrence (images that carry both traits, with their mean fit):

| Pair | Images | Mean fit | Exemplars |
| --- | --- | --- | --- |
| mono + oversized numerals + light headline | 34 | **4.35** | `54`, `114`, `120`, `131`, `156`, `174` |
| line art + light headline | 88 | 4.17 | `54`, `119`, `131`, `164`, `165` |
| blueprint + light headline | 48 | 4.17 | `77`, `85`, `108`, `121`, `144` |
| light headline + line art + leader callouts | 31 | 4.16 | `54`, `77`, `121`, `164`, `172` (all 5), `91`, `94` |
| line art + table | 50 | 4.14 | `40` `41` `46` `77` `120` `121` `144` `145` `151` `164` (all 5) |
| oversized headline + line art | 25 | 4.08 | `123`, `165`, `35`, `37`, `90` |
| navy + limestone split in one section | 27 | 4.00 | `40`, `54`, `118`, `131`, `156` (all 5), `76` (2), `83` (2) |
| table + leader callouts | 27 | 4.00 | `164`, `121`, `77`, `95` |
| light headline + sheet frame | 46 | 3.93 | `54`, `36`, `41`, `119`; fell from 4.12 with the pass 9b drawing-sheet tables |
| 3D render + leader callouts | 17 | 3.76 | `161`, `89`, `94`, `90` |
| heavy headline + mono | 23 | 3.48 | the pairing that drags scores down |

What this says: the strongest images put **data (table, mono figures) beside a line drawing, joined by leaders or matching numbers, under a light headline**, and giant light numerals now score highest of all. A table with only a frame around it does not count as that pairing; it is the plain-table failure in §7. The split and editorial-scale ideas score low only when they carry heavy type.

**Hybrids worth generating next**

1. **Light editorial + figure plate.** `78`'s oversized stacked headline and number staircase, set in light weight, with a line-drawn PP loop in place of the glass knot. Every leader goes to a named part. Exemplars: `78`, `54`, `37`, `35`, `123`, `165`.
2. **Swiss readout grid.** `80`'s checkerboard, each tile a `26`-style readout: huge light numeral, tick scale, limit line. One tile is the drawing. Exemplars: `80`, `26`, `39`, `90`, `131`, `114`.
3. **Sticky drawing, scrolling sheet.** `94`'s pinned visual and card rail with a line-art cutaway instead of the render. Cards are limestone sheets with title blocks. Exemplars: `94`, `54`, `16`, `41`.
4. **Battery-limit split, calm.** `76`'s seam as scope boundary, with light type and P&ID tie-in nodes on the seam. Each card sits on the side that supplies it. Exemplars: `76`, `40`, `85`, `118`.
5. **Kinetic light type router.** `83`'s cropped giant word as a light outline, over a single pipe that carries the situation cards (`16`, `33`). Exemplars: `83`, `16`, `33`, `35`.
6. **Monochrome macro plate + spec table.** `86`'s figure-plate layout with the macro duotoned to navy and limestone, a PP weld or membrane only, and `77`'s leader discipline. Exemplars: `86`, `87`, `77`, `95`, `183`.
7. **Keyed drawing + table (from pass 9b).** One drawing of the real part with numbered square tags; the table's rows carry the same numbers, so every row points at its hardware. Use it for any section whose content is a table. Exemplars: `164`, `121`, `77`, `158`.

## 6. Reusable UX vocabulary

**Layout devices** (images):

| Device | Images | Fit with | Exemplars |
| --- | --- | --- | --- |
| numbered items 01–0n | 136 | 4.03 | `80`, `54`, `131` |
| square corners | 122 | 4.04 | `77`, `85` |
| generous negative space | 104 | 3.98 | `26`, `16` |
| hairline rules between rows | 84 | 4.08 | `78`, `80` |
| table / matrix / register | 80 | 3.96 | `77`, `34`, `164` |
| one continuous pipe / route linking items | 71 (some are literal pipes inside equipment drawings) | 3.99 | `16`, `46`, `85`, `121` |
| drawing-sheet frame / zone refs | 64 | 3.89 | `36`, `41`, `38` |
| leader-line callouts | 63 (0.10 → 0.27 → 0.63 → 0.36 by era) | 3.90 | `77`, `54`, `72` |
| split screen / two halves | 50 | 3.92 | `76`, `54`, `40` |
| title block | 46 | 3.80 | `36`, `41` |
| cards | 44 | 3.73 | `62`, `94` |
| ruler / tick scale | 38 | 4.05 | `26`, `39`, `174` |
| margin notes | 36 | 4.00 | `54`, `27` |
| hotspots / node dots | 30 (0.02 in pass 9b) | 3.77 | `81`, `89` |
| crop / registration marks, corner brackets | 29 | 3.76 | `32`, `16` |
| dimension lines | 29 | 4.03 | `37`, `86` |
| graph-paper / dot grid ground | 26 (none in pass 9, 10 in pass 9b) | 4.12 | `16`, `39` |
| tabs / folder tabs | 18 | 3.50 | `38`, `62` |
| bento / colour tiles | 16 | **4.25** | `80`, `116`, `131`, `157`, `172` |
| stamps / signature blocks | 13 | 3.31 | `48`, `53` |
| stepped / staircase | 12 | 3.58 | `16`, `78`, `83` |
| sticky visual + rail | 11 | 4.00 | `94`, `54`, `79` |
| folding rows / accordion | 8 | 4.12 | `43`, `41`, `36` |
| one highlighted row or value | 7 | 3.86 | `45`, `78`, `55` |

**Motion implied** (images). Most of these map directly to GSAP:

| Motion | Images | GSAP form | Exemplars |
| --- | --- | --- | --- |
| lines, leaders, pipes draw on | 137 | stroke-dashoffset / DrawSVG on enter | `77`, `54`, `72` |
| items light up in sequence | 103 | stagger timeline keyed to the flow position | `01`, `79`, `91` |
| pulse / glow on a node | 54 | opacity pulse, once | `81`, `89` |
| figures count up | 53 (fit 4.13, +0.35 lift) | tweened number with tabular mono | `26`, `80`, `90` |
| needles, dials, bars sweep or fill | 53 | rotation / scaleX from 0 | `50`, `44`, `68` |
| water or a pulse travels the pipe | 50 | MotionPath dot, or a gradient stroke scrubbed by ScrollTrigger | `01`, `16`, `74`, `84` |
| slide / assemble / explode | 49 | from offsets; exploded views on scroll | `72`, `88`, `92` |
| hover or select highlights a route | 41 | hover timeline | `77`, `85`, `91` |
| mechanical (impeller spins, valve turns) | 37 | rotation, once | `73`, `85` |
| scroll-driven / sticky / pinned | 30 | ScrollTrigger pin + scrub | `94`, `84`, `89` |
| row or card expands | 24 | height / clip-path | `43`, `15` |
| type writes on / kinetic type | 14 | SplitText, or a horizontal ticker | `83`, `72`, `69` |
| stamp lands | 9 | short drop with one settle (the brand book bans bounce) | `48`, `53`, `92` |

The brand book caps motion at a 16 px translate with no parallax on text, and AGENTS.md says motion plays once in under 5 s. Most of the bolder ideas (pinned scroll stories, exploded views, kinetic type, flow scrubbed to scroll) break those rules. If the owner wants them, the Motion section of the brand book has to change first.

## 7. What fails repeatedly (anti-patterns)

From weaknesses and brand_fit_why (images flagged; era shares read early → later → pass 9 → pass 9b):

| Failure | Images | Typical files | Prompt fix |
| --- | --- | --- | --- |
| dense, cluttered, busy | 96 (0.87 → 0.65 → 0.63 → 0.32) | `52`, `58`, `93` | "one idea, at most 5 labelled items, half the frame empty". Working since it joined the base block |
| generator glitches: duplicated labels, garbled text | 93 (0.20 → 0.43 → 0.63 → 0.59) | `68`, `70`, `90`, `147`, `160` | ask for fewer labels, use `<CONTENT>` placeholders, never trust image text |
| decorative lines or metaphors that mean nothing | 86 (0.27 → 0.24 → 0.56 → 0.59) | `23`, `79`, `91`, `127`, `177`, `184` | "every connector links two named things; number the parts on the drawing and give the rows the same numbers" |
| invented figures, names or fake live UI | 73 (0.58 in pass 9b: prices, staff names, clause codes, certificate details) | `26`, `44`, `137`, `174`, `179` | "placeholder figures in [brackets]" |
| illegible or muddy at small or phone size | 52 | `10`, `61`, `94` | "few large labels, no micro text" |
| cliché props or a generic skid | 47 | `24`, `28`, `29` | name the real object |
| off-offer equipment: stainless, WFI, steam, stills | 46 | `07`, `11`, `14`, `22`, `87` | "white polypropylene (PP) pipe and skid, PVC pretreatment vessels, butt-fusion welds" |
| monospace everywhere | 26 | `05`, `21`, `63` | "mono only for figures, units and codes" |
| heavy, bold, condensed caps headline | 25 (0.07 in pass 9b) | `18`, `19`, `76`, `83` | "light-weight 300 sans headline in sentence case" |
| rounded corners or capsules | 24 | `44`, `47`, `51`, `113`, `148` | "square corners" |
| **plain table on a frame, no visual idea** | 23 (all pass 9b: 25 % of it) | `102`, `103`, `132`, `159`, `168`, `169` | the navy drawing-sheet module produced 8 of these from 11 images. Make the sheet hold one drawing with numbered tags and put the content in notes keyed to them (§8, module 3); add "no plain table filling the frame" |
| hard to reflow to phone | 18 | `46`, `53` | "stacks to one column" |
| glossy, photo-real, skeuomorphic props | 16 | `81`, `82`, `92`, `130` | keep renders matte and rare |
| hype copy ("99.9999% pure", "GUARANTEED", "Seamless") | 14 | `37`, `78`, `81` | "no slogans" |
| off-palette colour or second neutral (red, green, peach, beige, kraft) | 13 | `19`, `43`, `47`, `92` | "only navy, limestone, white and one steel blue" |
| glow, bloom, sci-fi | 8 | `79`, `87`, `91` | "no glow" |

**The stock pairing.** The concept log names one pattern again and again in pass 9b: a table on one side, an isometric skid or plant on the other, and nothing linking them (`97`, `113`, `145`, `151`, `153`, `175`, `182`). It scores well (the line art + table pair in §5) but reads as the same section every time. Keep it only when the drawing is keyed to the rows (`164`, `121`, hybrid 7).

**Negative keywords** (paste at the end of every prompt):
`no bold or heavy headline, no condensed display type, no italic display, no all-caps headline, no monospace body text, no rounded corners, no pills, no glow, no bloom, no neon, no lens flare, no gradients except a faint ground, no drop shadows, no glossy reflections, no photographs, no stock props, no clipboards, no toolboxes, no laptops, no people, no lab coats, no water splashes, no droplets, no molecules, no globes, no stainless steel, no tri-clamps, no orbital welding, no distillation columns, no steam generators, no red, no green, no orange, no beige, no kraft paper, no device frame, no micro text, no duplicated labels, no slogans, no decorative connector lines, no plain table filling the frame`

## 8. Prompt kit

Assemble prompts as **base + one style module + one section module + content + negatives**. Keep the content to the section's real words, or use `<CONTENT>` with placeholders. Never copy figures back out of an image.

**Base block** (the brand core in t2i vocabulary):

> A 1440 px wide desktop website section, flat straight-on UI mockup, no device frame, no people. Aquemi, maker of modular polypropylene Purified Water systems for pharmaceutical plants. Palette: deep navy (#0F2A47) and warm limestone off-white grounds, pure white, one steel-blue accent used as a line or a single figure. Large light-weight sans-serif headline in sentence case, monospace only for figures, units and standard codes. Square corners, hairline 1–1.5 px rules and line drawings, numbered items, generous negative space. Calm, precise, engineered. Show one idea clearly with at most five labelled items.

**Style modules** (pick one, 1–2 lines each). Modules 3 and 4 were rewritten after pass 9b: the old wording ("engineering drawing sheet on navy … hairline table rules", "… navy hairline diagram, numbered notes …") gave plain tables and filler schematics.

| Family | Module |
| --- | --- |
| 1 Equipment line art | isometric technical line drawing of white polypropylene equipment, catalogue illustration, uniform hairline strokes, isolated on the ground, no shading, no hatching |
| 2 Navy pipe-route | technical blueprint on deep navy, pale blue-white hairline line art, one continuous double-line pipe in steel blue linking every item, P&ID valve symbols at the joints |
| 3 Navy sheet UI | engineering drawing sheet on navy, zone-reference border and title block, mono document codes; the sheet's main field is one large hairline line drawing of the white polypropylene part or skid, with numbered square tags, and the content sits beside it as short numbered notes keyed to those tags, not a table filling the sheet |
| 4 Limestone sheet | limestone paper drawing sheet with a fine navy border, title block bottom right, one navy hairline drawing of the real polypropylene part or loop the section is about, numbered notes in a narrow column whose numbers are pinned on the drawing |
| 5 Instrument | instrument-panel readout: one oversized light numeral with its unit, a fine tick scale and a single limit line with a small outlined limit tag |
| 6 Editorial | editorial magazine spread, dramatic asymmetric layout, oversized light-weight headline cropped by the frame, one striking line-drawn figure, hairline rules |
| 7 Swiss / bento | Swiss International Typographic Style, strict modular grid of square navy and limestone tiles, huge light numerals with slash, one tile holds a blueprint drawing |
| 8 Page rhythm | long page alternating navy drawing bands and limestone reading sheets, each band one picture |
| 9 Soft 3D (rare) | one matte white polypropylene skid in soft 3D isometric render, even studio light, translucent pale-blue water, hairline leader lines to labels |
| 10 Macro (rare) | macro close-up of a polypropylene butt-fusion weld or membrane, duotone navy and limestone, shallow depth of field, crisp hairline annotations over it |

**Section modules:**

| Section | Module |
| --- | --- |
| Hero | headline and one lead line left, the page's equipment drawing right with leader-line callouts to three key figures |
| Spec / limits | limits as rows: parameter, mono value with unit, standard reference. One row highlighted in steel blue |
| Table / register (any section whose content is a table) | one drawing of the real part with numbered square tags; each row starts with the same number, so it points at its hardware (hybrid 7). Never the table alone in a frame |
| Process / steps | stages strung along one continuous pipe, numbered 01–05, each with a short title and what it leaves behind |
| Router | three to five situations on the left, each routed by one line to its system and first step |
| Standards / evidence | each standard code in mono, joined by a hairline to the part of the plant it governs and to its proof document |
| Documents | documents as a register or binder index: code, title, revision, who signs |
| Options | options shown on the skid they attach to, each a numbered module on the drawing |
| Band / closing | one large light statement, one measured figure as proof, one action |

**Example prompts**

1. *Limits as a Swiss readout grid (hybrid 2):* [base] + "Swiss International Typographic Style, strict modular grid of square navy and limestone tiles; each tile is an instrument readout with one huge light numeral, its unit in mono, a fine tick scale and a single steel-blue limit line; one tile holds a white isometric line drawing of a polypropylene skid on navy. Section: Purified Water release limits: conductivity, TOC, microbial action level, each with its pharmacopoeia reference in mono." + negatives.
2. *Standards as a sticky drawing (hybrid 3):* [base] + "Left 60 %: a pinned navy blueprint cutaway of white polypropylene pipework and a storage tank in hairline line art, the active part outlined in steel blue. Right: limestone drawing sheets stacked on a thin vertical rail, each with a title block, a mono standard code, what it requires and the document that proves it." + negatives.
3. *Scope as a battery-limit split (hybrid 4):* [base] + "Section split exactly in half, navy left, limestone right; the vertical seam is the battery limit. Left: what Aquemi supplies, as numbered hairline-framed items. Right: what the site provides. Tie-in points (feed water, drain, power, compressed air) are small P&ID nodes sitting on the seam, each labelled in mono. Light headline crossing the seam." + negatives.

## 9. Toward unification

Three ways to unify the families into one system:

| | A. Drawing set | B. Measured editorial | C. Material and line |
| --- | --- | --- | --- |
| **Idea** | The site is a set of engineering drawings. Every section is a different sheet type: general arrangement (GA), P&ID, schedule, detail, datasheet, register. Variety comes from sheet type, not art direction. This is the current site, made consistent. | Editorial-scale light typography and numbers do the shouting: huge light headlines, figures as heroes, Swiss tiles and splits. Line drawings appear as figure plates with leaders. Variety comes from scale, crop and grid. | The line-drawing system above, plus a rare "material moment" per page: a matte PP render, a duotone macro of a weld or membrane. It shows the product's real material, which no line drawing can. |
| **Core keywords** | blueprint, navy ground, limestone sheet, title block, zone frame, P&ID, one continuous pipe, hairline, mono codes | oversized light headline, giant light numerals, Swiss grid, asymmetric spread, split seam, hairline rules, figure plate, leader callouts | white polypropylene, matte render, translucent water, duotone macro, hotspots, sticky reveal, plus the A keywords |
| **Absorbs** | 1, 2, 3, 4, 8 (113 images) | 5, 6, 7, with 1 and 4 as figure plates | 9, 10, with 1 and 2 as the base |
| **System impact** | Tokens unchanged. Components: a shared sheet frame / title-block primitive, P&ID glyph set, pipe-route primitive. Motion: line-draw and flow only. | Tokens: add a `display-xxl` step (light 300, clamp to about 160 px), a display size for mono numerals, tile grid spacing, a navy/limestone tile pair. Components: ReadoutGrid, Split (seam), EditorialSpread, FigurePlate. Motion: count-up, mask-reveal type, light kinetic type. | Tokens: an image treatment (duotone navy/limestone map), a render ground. Components: StickyStory (pin + rail), Hotspot. Assets: a real Aquemi 3D model and macro photos. Motion: ScrollTrigger pin/scrub. |
| **Risk** | Blueprint everywhere, which the owner already rejected. Dense: 21 of 27 navy-route images flagged. A drawing sheet with nothing but a table in it (8 of 11 pass 9b navy sheets) | Bold type drifts back to heavy caps (25 images failed on that, 6 of them in pass 9b). Needs strict "light only" rules | Glossy and stock look (`81`, `82`, `92`, `130`), wrong-material renders (`84`, `87`), needs assets that do not exist yet |

**Recommendation: B as the spine, A as its drawing language, C as a capped accent.** That means:

- Measured editorial sets the page's voice. Big light type, numbers as heroes, Swiss/split grids for variety and "chaos". Pass 9b backs this: instrument readouts (4.50) and Swiss tiles (4.44) were its two best modules, and mono + giant numerals + light headline is now the best-scoring pairing (34 images, 4.35).
- Drawings and data always appear together (line art + table: 50 images, mean fit 4.14), and the drawing is keyed to the data by numbers or leaders. The drawing set supplies every figure, so blueprint becomes one sheet among many instead of the whole page.
- At most one material moment (render or duotone macro) per page, only of real PP equipment.
- Per page: one loud section (hybrid 1, 4 or 5), the rest calm. Never two adjacent sections in the same family.
- Two changes to the brand book make this possible: allow light display type well above `display-xl`, and loosen Motion for one pinned or scrubbed story per page.

This keeps what the 32 five-rated images share: all 32 have hairline strokes; 31 have mono figures and numbered items; 30 have a light headline; 29 have square corners; 26 have a steel-blue accent; 25 have a navy ground; 24 have line art. It also delivers the boldness the owner asked for through scale and composition, not through the heavy type, glow and props that cause the low scores.
