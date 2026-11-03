---
name: motion-library
description: Find, port and ship motion for the Aquemi site from the Subframe Motion library (309 MIT React/WebGL examples - shaders, scroll stories, counters, buttons, diagrams) into our vanilla JS + GSAP stack and design tokens. Use when someone asks for an animation, a hover or press effect, a scroll reveal, a shader or ambient background, "more motion", "use Subframe", or to make a section feel alive; also before writing any new motion.js from scratch.
---

# Motion library: Subframe Motion → Aquemi

Subframe Motion (https://www.subframe.com/motion) is a library of 309 open-source (MIT) motion examples in three
categories: Components & interactions, Animation & motion, WebGL & shaders. The examples are React (some need the
`motion` package) or raw WebGL. Our site is vanilla JS, GSAP 3.13 and design tokens, so we **port** examples: keep
their motion mechanism and values, rewrite the shell.

| What | Where |
| --- | --- |
| MCP server (Claude Code loads it from the repo's `.mcp.json`) | `subframe-motion` → `https://mcp.subframe.com/motion/mcp`, no account. Tools: `search_motion_examples`, `get_motion_example`, `get_motion_guidance` |
| Same calls without the MCP (subagents, scripts) | `python .claude/skills/motion-library/tools/motion.py search "<words>" \| get <slug> --out <dir> \| guide <topics> \| catalog` |
| Every example: slug, category, runtime, look, description | `catalog.json` (next to this file; refresh with `motion.py catalog`) |
| What we ported, where it lives | the table below (keep it current) |
| Our WebGL runtime (ambient layers) | `assets/src/motion/gl.js` (`AQgl.def`, `AQgl.scan`) + component `FxShader` |
| Our GSAP layer | `assets/src/motion/core.js` (`AQmotion.fx`, helpers `m.on`, `m.tw`, `m.claim`, `m.split`, `m.count`…) |

## Finding the right example

1. Say what the section must explain, then what should move (atlas and brand book first: steady flow, hairline,
   navy/limestone, one steel-blue accent). Search in plain words, several phrasings; filter `--runtime webgl` or
   `--category`. Browse `catalog.json` by `look` when the words don't hit.
2. `get <slug> --out <scratch dir>`: read `motion`, `adapt` (names the code that drives the motion), `reducedMotion`,
   `limitations`, `packages`, `assets`, `license`. Read `guide adapting` once, and `scroll` / `ambient` /
   `text-and-numbers` / `feedback` for that kind of effect.
3. Reject examples that need photos or assets we don't have, or that would read as consumer/playful (stickers,
   physics toys, emoji, audio). Never stainless/chrome/brushed-metal looks: Aquemi is polypropylene only.

## Porting rules

- **Keep:** the mechanism (the shader, the spring or easing values, the stagger, the geometry), its reduced-motion
  branch and keyboard behaviour, and the MIT licence header (paste it at the top of the ported block with
  `Ported from Subframe Motion "<title>" (<slug>), MIT, (c) 2026 Subframe`).
- **Replace:** React state with DOM + GSAP (`gsap.to`, `quickTo` for pointer-follow, `ScrollTrigger` for
  scroll-linked, `Flip` for layout moves, `SplitText` for type); `motion` springs with GSAP eases of the same feel
  (`aq-settle`, `power3.out`, `elastic` never); demo colours with tokens (CSS `var(--flow)` in DOM, `colors:{u_x:'flow'}`
  in shaders); demo copy with the section's real copy.
- **WebGL:** one fragment shader per effect, registered with `AQgl.def('<name>', {frag, colors, uniforms, still,
  pointer, scale})` in the component's `motion.js` (runs before `AQmotion.fx`). Markup: host gets `aq-fx-host`,
  first child `<canvas class="aq-fx-shader" data-gl="<name>" aria-hidden="true">`. Multi-pass simulations
  (feedback buffers) need an AQgl extension; prefer single-pass analytic shaders.
- **Where the code goes:** a section's effect in that look's `design-system/components/<Look>/motion.js` (+ style.css);
  a site-wide effect in the shared component (Button, RelatedLinks, FAQ…) or `core.js`. Never add React, the `motion`
  package or another library.
- Tokens only in CSS; the design-system check must report 0 problems.

## Motion rules (brand book, Motion)

- **Scroll-triggered reveals** play once and settle within 5 s; travel ≤ 16 px for text.
- **Visitor-driven feedback** (hover, press, drag, scrub) may repeat; 100–200 ms for hover/press, exits a third faster.
- **Ambient layers** (FxShader): only while on screen, only the most visible one moves, one visible cycle ≥ 6 s, faint
  behind text, a still frame under reduced motion, at most two per page.
- **One pinned or scroll-linked story per page**: readable at every scroll position, skippable, never hijacks scroll
  speed, static layout under reduced motion.
- Nothing runs under `prefers-reduced-motion` except still frames and essential state changes.
- Verify with `research/tools/motioncheck.js <page> 1280` and `375` (0 errors, nothing left hidden) and watch the loud
  one with `film.js`.

## Ported so far

| Example (slug) | Ported as | Used on |
| --- | --- | --- |
| (fill in as you port) | | |
| tidal-caustics | FxCaustics (`caustics`, flow ink, transparent ground) | home hero (masked behind the loop) |
| ripple-memory | FxRipple (`ripple`, CPU wave field via AQgl `sim`, sponge edges, pointer trail) | Closing band, every page with < 2 other layers |
| contour-terrain | FxContour (`contour`, fwidth hairlines, index contours) | CoverageMap sheet, contact-locations |
| guilloche | FxGuilloche (`guilloche`, rosette placed by --fx-x/y/size) | CertSeals navy tile, cmp-quality |
| phosphor-trace | FxPhosphor (`phosphor`, glow on HmiTrend's own trace, written with the pen) | HmiTrend plot, sys-monitoring |
| truchet-ribbon | FxTruchet (`truchet`, twin-wall pipe tiles) | ManifoldRouter band, home |
| kiln-section | FxCutaway (`cutaway`, oblique ray-march of the RO element behind the SVG face) | MembraneFace tile, sys-pretreatment |
| sliding-number | `m.count` in core.js: odometer digit wheels (ones turn twice, tens once), separators and units fixed, restores the text node | KeyFacts, LimitBento, SpecTable, Readout, CaseStudy… (every `m.count`) |
| word-reveal | core.js section heads: words rise out of padded masks, 0.52 s, 75 ms apart, split reverted on landing | every section title |
| magnetic-button | Button/motion.js: primary leans to the pointer (×0.28, 160 px falloff) via `--aq-mx/--aq-my` | every primary button |
| slide-text-button | Button/motion.js: secondary label rolls up, its text-shadow copy rolls in | every secondary button (not the menu toggle) |
| press-depth | Button style.css + motion.js: sink, 0.97, tip ≤ 3° toward the press point (`--aq-px/--aq-py`) | every button but the link variant |
| spotlight-card | RelatedLinks/motion.js + style.css: flow light and lit border follow the pointer (spring 160/26) | RelatedLinks tiles |
| spring-accordion | FAQ/motion.js: 0.34 s height open / 0.24 s close, interruptible, lines rise 8 px, keyboard instant | FAQ |
| icon-morph (plus-minus, menu-close) | FAQ key plus→minus timing; NavBar toggle bars → cross | FAQ, phone menu toggle |
| border-beam | EnquiryForm/motion.js: one conic-light lap round the field group on focus entry, then removed | every enquiry form |
| address-check | EnquiryForm/motion.js: error lines drop in, borders turn in 150 ms, a field put right earns a pass tick | every enquiry form |
| loading-button | EnquiryForm/motion.js: Send's label / pending / alert faces at one footprint, spring crossfade | every enquiry form's Send |
| task-steps | EnquiryForm: a passed step's node becomes a tick that springs in (`--aq-pop`) | stepped forms (contact-proposal, careers…) |
| sliding-tabs | `m.spring` in core.js (460/34); SectionNav marker; NavBar flow rule (hover, focus, page to page) | SectionNav, NavBar |
| fluid-tab-rail | SectionNav/motion.js: flow-tint plate glides under the hovered link (65 ms smoothing) | SectionNav |
| curtain-index | NavBar/motion.js: phone menu height-push curtain (0.38 s, .76/0/.24/1), entries 35 ms apart | phone menu |
| animated-beam | ContactRoutes/motion.js `AQrouteBeam`: a glint runs the step rail to the clock, nodes pop as it passes | ContactRoutes (entrance close + hover/focus) |
| animated-beam | SystemRun/motion.js `AQbeam(svg, paths, {dur,len,stagger,dir,rev})`: travelling 4-stop userSpaceOnUse gradient on path copies (no non-scaling stroke), hover/focus loops | SystemRun (home), StrataRun (systems), StandardsOrbit arcs (compliance); DOM variant in PidRoutes (industries) |
| departure-board | IndustryFeed/motion.js `flap()`: split-flap cells, leaf rotateX 0→-180, 440 ms, 45 ms apart; hover re-flips | IndustryFeed (home) |
| exploded-camera | ExplodedService/motion.js: assemble/take-apart button (600 ms .22/1/.36/1), hover brings a part forward | ExplodedService (home) |
| spotlight-card | BudgetBento/motion.js: flow light under the mouse per tile | BudgetBento (systems) |
| border-beam | BatteryLimit/motion.js: offset-path rect() light round the card edge while hovered/focused | BatteryLimit (systems) |
| expandable-ledger | StandardWires/motion.js: fold opens rows from 0 height (210 ms .2/.8/.2/1), then wires them | StandardWires (systems) |
| race-replay | WindingRoute/motion.js: pointer/range-input scrub binds water reach, droplet and stage | WindingRoute (sys-pw) |
| atlas-hotspots | DocHotspots/motion.js: shared card/marker selection, crosshair ring glides (250 ms) | DocHotspots (sys-pw) |
| relief-board | StairRouter/motion.js: cards lift by exp(-d²/4.4) falloff round the hovered step | StairRouter (services) |
| cue-scrubber | HoldTimeline/motion.js: hover/focus seeks the water node by node to a stage, stages ahead dim | HoldTimeline (services) |
| chart-crosshair | MacroLeaders/motion.js: row + column rules snap to the cell, column head lights | MacroLeaders (industries) |
| guided-inspection | MarketCallouts/motion.js: dimmed drawing with a lit window gliding to the callout's part (550 ms) | MarketCallouts (industries) |
| orbiting-circles | StandardsOrbit/motion.js: nodes ride the outer orbit a quarter turn into their slots | StandardsOrbit (compliance) |
| archive-folder | ProofFolders/motion.js: sheets straighten and spread, slip lifts, on hover/focus | ProofFolders (compliance) |
| camera-wheel | SignalDial (renderer): role=slider dial, drag 54 px a step with snap, Arrow/Home/End; rows turn the bezel (CSS 600 ms) | SignalDial (sys-monitoring) |
| quote-tick | SignalDial readout and TraceLines readout tile: new figure rises/drops 8 px from 0.2 opacity in 0.22 s (CSS) | sys-monitoring, svc-design |
| shutter-scene | OptionChecker/motion.js: checkerboard squares open top-down 820 ms, 45 ms apart along diagonals | OptionChecker (sys-monitoring) |
| exploded-camera | LayerStack style.css: pointed plate lifts 8 px, 600 ms cubic-bezier(.22,1,.36,1) | LayerStack (sys-monitoring) |
| guided-inspection | RedlineSheet `AQrsCam`: P&ID band camera zooms x1.7 onto a failure's pin with a spotlight; entrance tour visits each pin | RedlineSheet (svc-design) |
| race-replay | LoopCircuit/motion.js: scroll-linked ringed marker on the water's route, pathLength fill behind it, stations and captions light on arrival (scrub 0.6, no pin) | LoopCircuit (sys-storage, the page's one scroll-linked story) |
| slider-detents | MethodBento/motion.js: hot-water rail probe, role=slider, detents at the marks (4.5 % pull), spring carriage 520/34/0.45, zone readout aria-live | MethodBento (sys-storage) |
| shutter-scene | TankTiles/motion.js: each tile's opposite-tone slats retract 820 ms, 45 ms apart, diagonal wave; numerals roll | TankTiles (sys-storage) |
| focus-lens | MembraneAtlas/motion.js: sharp micrograph copy masked by a radial gradient under a ring that follows the pointer (smoothing 18/s), soft field around it | MembraneAtlas (sys-pretreatment) |
| poem-scroll | DocPipe/motion.js: scroll progress fills the water along the snaking pipe, number and code strength 1 - (i - p·n)·0.45 (floor 0.45), valves turn open | DocPipe (sys-pretreatment, the page's one scroll-linked story) |
| guided-inspection | OptionTaps renderer: note numbers frame their part (×1.6, clamped), others dim, Escape/arrows; CSS transition, works under reduced motion | OptionTaps (sys-pretreatment) |
| signature-draw | JointSpine/motion.js: the pipe inked over its faint impression in one stroke (2.1 s, cubic-bezier(.37,.12,.28,1)) across drop, bend and CSS spine pieces by length; each joint strikes and its row prints as the ink reaches it | JointSpine (svc-fabrication) |
| frame-crop | JointMacro renderer + style.css: aperture copy clipped by inset() and four corner marks glide to the pointed row's part (620 ms .22/.8/.18/1), context copy fades; instant under reduced motion | JointMacro (svc-fabrication) |
| project-index | SpoolDossier renderer: mouse pointer-enter or focus selects a dossier part, selection persists, the spool shows its layer in 240 ms (.2/.85/.25/1) | SpoolDossier (svc-fabrication) |
| scroll-turntable | JointSteps/motion.js: scroll progress across the step rail picks the stage stepwise (no easing), sticky joint sheet shows it; hover/focus seeks (the page's one scroll-linked story) | JointSteps (svc-fabrication) |
| reading-lens | VersusSpread/motion.js: page-scroll reading lens over table rows (focus line 45 %, full within 1 row, then 1 - (d - 1) * 0.14, floor 0.6), flow-tint band on the core spring, "03 / 07" readout; the row in focus lights its parts on the sticky system drawing | VersusSpread (svc-fat-sat, the page's one scroll-linked story) |
| sliding-tabs | WetRunHmi/motion.js: Dry check / With water thumb on the core spring (460/34), jumps for keyboard; "with water" reruns the water along the route, markers light on arrival | WetRunHmi (svc-fat-sat) |
| signature-draw | TestSheet/motion.js: hold-point signatures inked over a faint offset impression (0.8 s, cubic-bezier(.37,.12,.28,1)) | TestSheet (svc-fat-sat) |
| ticket-tear | TestSheet/motion.js + style.css: the SAT slip arrives attached at the perforation, is pulled (x 26 px, 0.8°) and snaps free (240 ms .19/1/.22/1); hover pulls it slightly | TestSheet (svc-fat-sat) |
| sliding-tabs + transition-panel | WitnessPlan/motion.js: one raised indicator springs between the way cards (jumps for keyboard); the board caption enters 18 px from the side of travel, 0.24 s .25/1/.5/1 | WitnessPlan (svc-fat-sat) |
| text-roll | StageTiles/motion.js: two faces per glyph (preserve-3d), out 0→90° from 50% 25% in 0.32 s, in 90→0° from the foot 0.36 s, 120 ms behind, 25 ms per glyph, ease .25/1/.5/1; entrance and hover/focus replay | StageTiles (svc-cq) |
| foreground-occlusion-wipe | CutBand/motion.js: navy occluder 1.15 × page wide crosses in (smoothstep), 40 ms covered hold, the band and table switch on under full cover, exits right; 520 ms crossing | CutBand (svc-cq) |
| region-splice | PqCalendar renderer + style.css: region marker with edge handles over the sampling grid and the year scale, glides 240 ms to the pointed/focused phase's span; arrows, Home, End step phases (no dragging: the spans are facts) | PqCalendar (svc-cq) |
| signature-draw | SignatureBlocks/motion.js: the reviewer's signature inks over a faint offset impression (0.8 s, .37/.12/.28/1) after the line is ruled | SignatureBlocks (svc-cq) |
| animated-beam | WitnessPlan look + motion.js (pass 9b rebuild): leaders laid from the rendered rows to the parts (ResizeObserver), a dash light runs each leader at entrance and the chosen one per choice (strong ease-out, once); replaces the board caption's transition-panel | WitnessPlan (svc-fat-sat) |
| animated-beam | ApprovalMerge/motion.js: hover traces a request's route in ink, wire then bus to the stamp (0.2 s + 0.18 s), stamp presses 0.97; fades a third faster | ApprovalMerge (svc-upgrades) |
| sentence-diff-motion | StrikeGaps/motion.js: the fix inserted word by word after the strike (rise 12 px, 260 ms, 60 ms lead, cubic-bezier(.22,.72,.15,1)) | StrikeGaps (svc-upgrades) |
| project-index | ReviewReticles renderer + style.css: register rows (mouse, focus, click) slide the viewfinder's reel of drawings (240 ms .2/.85/.25/1, instant for keyboard) | ReviewReticles (svc-upgrades) |
| cue-scrubber | GateLine/motion.js: hover seeks the water to a step, runs ahead drain and gates shut nearest first; entrance opens each gate as the water reaches it | GateLine (svc-upgrades) |
| shape-morph | FaultKnot look file + style.css: one 220-point pipe path keeps its command structure, CSS `d` transition 0.7 s cubic-bezier(.4,0,.2,1) to the pointed step's knot tension (keyboard instant); FaultKnot/motion.js drives the same path from scroll progress (the page's one scroll-linked story) | FaultKnot (svc-service) |
| camera-wheel (reused) | SignalDial look reused as is for the calibration table (rows turn the bezel, dial is a slider) | SignalDial (svc-service) |
| mosaic-reveal | CheckerRouter/motion.js + style.css: the checker's tiles blink on in scattered order (steps, 0.24 s); the row in hand trades every tile for its inverse after --d × 45 ms, hard steps (CSS, instant under reduced motion) | CheckerRouter (ind-pharma) |
| scroll-turntable | GradeLadder/motion.js: the row on the reading line (45 % of the viewport; phones under the sticky band) is shown stepwise on the sticky instrument; hover/focus seeks (the page's one scroll-linked story) | GradeLadder (ind-pharma) |
| elastic-fader | GradeLadder style.css: oversized level number beside a vertical fader, fill scaled from its foot, 380 ms return to the level on (.22,1,.36,1) (overshoot and overtravel stretch dropped) | GradeLadder (ind-pharma) |
| process-choreography | DecisionPlant/motion.js: after the schematic draws and the water runs, leaders draw from each part toward its callout and the callout scales in from 0.96 as it arrives (1.12 s window, 0.12 s apart) | DecisionPlant (ind-pharma) |
| cue-scrubber | WasherTrace/motion.js: after the IsoKit entrance, pointing at or focusing a point seeks one reach value (0.5–0.9 s, power2.inOut) so the water drains back or runs on to that station; stations ahead go dark, the navy readout's cursor, numeral and tag follow | WasherTrace (ind-meddevice) |
| process-choreography | AuditManifold/motion.js: one progress value through overlapping segments fills header A row by row, each branch, then header B; each answer arrives (opacity, 6 px rise, 0.96 → 1, cubic out); hover/focus reruns a row's branches while its valves open | AuditManifold (ind-meddevice) |
| project-index | StandardTiles renderer + style.css: pointer-enter or focus selects a tile, the blueprint tile shows its IsoKit drawing (clip 240 ms .2/.85/.25/1), the flow block its tag; selection persists | StandardTiles (ind-meddevice) |
| atlas-hotspots | SkidTags renderer + style.css: drawing tags, row numbers and rows share one selection; tag and number press to 112 % (180 ms), part and leader turn flow, crosshair ring glides to the part (full-size layer translated, 250 ms .2/.8/.2/1, CSS, instant under reduced motion); arrows, Home, End | SkidTags (compliance) |
| animated-beam | SuiteLoop/motion.js: pointing at or focusing a suite sends a flow slug along the loop's supply run from the chevron to that suite's drop (0.25-0.6 s by distance, power3.out, fades 0.2 s), then the drop fills (CSS, 220 ms later) | SuiteLoop (ind-cdmo) |
| atlas-hotspots | AuditSkid look + style.css: one selection shared by the pins and the callouts (hover, focus, click; persists), crosshair ring glides 0.25 s cubic-bezier(.2,.8,.2,1), chosen pin fills and grows to 1.12, leader and IsoKit part turn flow, other callouts quiet to 0.62 | AuditSkid (ind-cdmo) |
| switch-button | DuplexTrains style.css + motion.js: aria-pressed swap of the train in service; arrows turn 180 deg in 700 ms cubic-bezier(.645,.045,.355,1), the A/B letter rolls over in 250 ms, a flow rule sweeps in 500 ms (replaces the shine gradient); water reruns through the train now in service (0.6 s) | DuplexTrains (ind-cdmo) |
| scroll-window | TieInRun/motion.js: one scroll progress (steps list across 60 % of the viewport) fanned into staggered stage phases, smoothstep((p - i/n) * n * 1.24), driving --p0..--p3 (new outlet fades in dashed, change boundary, dashes close and fills come in, water drawn into the branch); step and marker on the reading line lit (the page's one scroll-linked story) | TieInRun (ind-cdmo) |
| paper-fold | IndexSheet/motion.js: the sheet's leaf (the drawing panel) arrives folded over the index, blank back up, and swings open on its crease (rotateY -180° → 0, 720 ms, cubic-bezier(.25,.75,.2,1), backface-visibility hidden); then IsoKit draws the frame on it | IndexSheet (cmp-documentation) |
| cue-scrubber | StageStacks renderer: stage rail, nodes are buttons; hover/focus/press seeks one reach value (0.5–0.9 s by distance, power2.inOut, a third faster back), runs fill to it, stacks not reached go quiet; pressed holds (aria-pressed) | StageStacks (cmp-documentation) |
| compact-pagination | PdfAnatomy renderer + style.css: page turner for the drawn PDF (12 pages, one per bookmark), five-wide number window slides 250 ms cubic-bezier(.2,.8,.2,1), only visible numbers tabbable; bookmark and hit move, front page turns 230 ms, footer number/revision boxes stay and light | PdfAnatomy (cmp-documentation) |
| signature-draw | RecordSheet/motion.js: each record glyph inked over its faint offset impression (0.8 s, .37/.12/.28/1, 0.12 s apart, accent after the body); pointing at a process re-inks its row (0.45 s) | RecordSheet (cmp-quality) |
| type-press | NcrTiles/motion.js: slash numerals press up from slivers (translateY 55 %, scale 0.12 × 0.55, 760 ms .16/1/.3/1, 35 ms a glyph) as tiles land; the repair drawing then lifts the rejected length clear and drops the remade one in (replays on hover/focus) | NcrTiles (cmp-quality) |
| chart-crosshair | MarkingMatch/motion.js: flow-tint band snaps to the pointed row, flow bar slides under the pointed column head (180 ms), head lights | MarkingMatch (cmp-quality) |
| quote-tick | CertReadout look + style.css: selected certificate's reading enters 8 px from the side of travel (220 ms), numeral fades from flow-tint (800 ms); scale marker glides the side ruler; one entrance tour; FxGuilloche moved here from CertSeals (removed) | CertReadout (cmp-quality) |
| departure-board | CheckLedger/motion.js `clFlap`: each row's slash numeral turns over on split-flap leaves (rotateX 0 to -180 deg, 440 ms, .4/0/.2/1, 45 ms apart); hover re-flips (0.3 s) | CheckLedger (projects) |
| chart-crosshair | CheckLedger/motion.js: row rule + column rule glide to the pointed tile (200 ms power3), column name lights, tile tints; focus snaps the row rule | CheckLedger (projects) |
| guided-inspection | RecordAnatomy renderer + style.css: a lit window glides onto the pointed/focused title-block row's drawing (0.55 s .22/.75/.22/1, CSS), others quieten; entrance tour visits each drawing | RecordAnatomy (projects) |
| signature-draw | RecordAnatomy/motion.js: the approval's two signatures ink over faint offset impressions (0.8 s, .37/.12/.28/1) | RecordAnatomy (projects) |
| image-comparison | Colophon style.css + motion.js: one divider position (--cph-p) drives the limestone strip and the clip of the title's navy copy; entrance sweep 1.1 s power3.inOut (drag spring dropped) | Colophon (about) |
| expandable-ledger | Colophon/motion.js: fold opens rows from 0 height (210 ms .2/.8/.2/1, 30 ms apart; keyboard instant) | Colophon (about) |
| exploded-camera | SourceSkid motion.js + style.css: makers' groups lowered into the skid frame (600 ms .22/1/.36/1) after the package draws; callout hover/focus/press lifts a maker's group out with the same curve (CSS) | SourceSkid (about) |
| paper-fold | SiteTiles/motion.js: the sheet's outer columns swing open on their inner edges (rotateY 180 to 0, 720 ms .25/.75/.2/1, backs hidden), inner columns rise | SiteTiles (about) |
| score-follow | RoleLoop/motion.js: the water front runs the role loop at one linear tempo (2.6 s, DrawSVG), the bay it passes lights for 0.7 s, its branch shows and its card prints; hover fills a bay end to end (0.4 s) | RoleLoop (careers) |
| aperture-reveal | HirePath/motion.js: the test-joint plate opens through a clip-path circle 25 % → 80 % at 50 % 46 % (850 ms, cubic-bezier(.22,1,.36,1)), then its dimension hairlines draw | HirePath (careers) |
| score-follow | HirePath/motion.js: a playhead walks the dry step rail at one tempo (0.55 s a step), each gate fills and its number turns flow as it passes; pointing at a step seeks the head to its gate (0.3 s) | HirePath (careers) |
| filter-mosaic | RevisionRegister renderer: topic filter measures the notes before and inverts after (Web Animations, 280 ms cubic-bezier(.22,1,.36,1)), notes newly shown fade in 180 ms; instant under reduced motion | RevisionRegister (news) |
| project-index | RevisionRegister renderer + style.css: pointing at or focusing a note shows the drawing of the page it is applied on (240 ms .2/.85/.25/1 keyframe), the selection persists | RevisionRegister (news) |
| scroll-window | RequestMenu/motion.js: scroll progress (sheet top from the viewport foot to 30 %) mapped by clamp(p * 1.24), eased out, carries the oversized title in from beyond the right edge (26 % of its width, 18 % on phones), cropped like the concept until it lands; no fade (the page's one scroll-linked story) | RequestMenu (contact-proposal) |
| chart-crosshair | RequestMenu/motion.js + style.css: the pointed or focused menu line snaps a flow-tint band (no easing), its situation number lights, a flow bar under the column head | RequestMenu (contact-proposal) |
| scroll-window | RiserValves/motion.js: one scroll progress fanned into row phases clamp((p - i/n) * n * 1.24), each split into riser, valve + branch A, branch B run, elbow + rise (--rv-r/a/b/c); valve opens at half; drains on scroll back (the page's one scroll-linked story) | RiserValves (contact-service) |
| project-index | SitePlates look file + style.css: pointer-enter, focus or index press chooses a site; the navy plate's reel of IsoKit figures slides 240 ms cubic-bezier(.2,.85,.25,1) (instant for keyboard); choice persists, pins strike and callouts rise on arrival | SitePlates (contact-locations) |
| text-scramble | CoverageMap/motion.js: the readout face of the region in hand decodes, 20 steps of 40 ms, resolved left to right, random capitals and digits after (text nodes of the mono parts only, placeholder chips keep their markup); stamp strikes; entrance and every choice (not keyboard) | CoverageMap (contact-locations) |
| process-choreography | ApplicationWheel, UseMatrix and LimitWriters motion.js: trunk first, then the branches arrive in sequence (pass 12) | ApplicationWheel, UseMatrix, LimitWriters (industries) |
| chart-crosshair | FitReadout motion.js + style.css: the reading point follows the curve under the pointer and reads its value against the 80 °C line (pass 12) | FitReadout (industries) |
| archive-folder | LimitDrawer motion.js: folders and slips come out of the drawer (pass 12) | LimitDrawer (ind-process) |
| project-index | DrawingRegister look + style.css: the viewfinder glides by whole cells to the pointed, focused or tapped drawing (CSS 240 ms .2/.85/.25/1, instant under reduced motion) (pass 12) | DrawingRegister (ind-hospital-lab) |
| animated-beam | BuildingLoop/motion.js: after the loop draws from the plant, one stroke-dash glint laps it once (1.6 s, power1.inOut) (pass 12) | BuildingLoop (ind-hospital-lab) |
| process-choreography | TrainStrip/motion.js: the pipes draw in one pass and the stations arrive in sequence inside the window (0.24 s apart, from 0.96 scale) (pass 12) | TrainStrip (ind-hospital-lab) |
| animated-beam | IndustryDrops/motion.js: the twin-wall main is laid round the loop with the water behind it, each drop opens as the water passes its tee, its vignette draws and its text rises (about 3 s) (pass 12 B) | IndustryDrops (home) |
| process-choreography | Hero/motion.js for HeroScene: the scene draws back to front, the water runs once, each tag pops onto its part with its key row as the water reaches it (under 5 s) (pass 12 B; round C adds the compliance-matrix, shop-bay, site-map and reply-flow scenes under the same credit) | HeroScene heroes (systems, services, first-system, projects; compliance, about, careers, contact-proposal, contact-locations) |
| atlas-hotspots | LimitPlan, RoomLimit and SkidSheet look + style.css: row and node share one selection, the node presses to 112 % (180 ms), a ring glides to it (250 ms .2/.8/.2/1, instant under reduced motion) (pass 12 B) | LimitPlan (systems), RoomLimit (first-system), SkidSheet (sys-pw) |
| atlas-hotspots | TankGa look + motion.js: one selection shared by tags and key rows (hover, focus, click; persists), leaders draw from part to tag on entrance (pass 12 B) | TankGa (sys-storage) |
| signature-draw | GhostSkid/motion.js + style.css: each option ghost clips on and settles 10 px while its dashes run; the dashes run again on hover (pass 12 B) | GhostSkid (sys-pw) |
| process-choreography + guided-inspection | WasherZones/motion.js: zones stamp in as the water reaches them; on phones the strip camera pans and zooms to the card's zone (550 ms .22/.75/.22/1) (pass 12 B) | WasherZones (ind-meddevice) |
| shutter-scene + parallax-plates | ConfigCards/motion.js: navy shutter strips lift over each drawing (820 ms, 45 ms apart), then the water runs once; phone rail controls and count (pass 12 B) | ConfigCards (projects) |
| archive-folder | LimitFolders/motion.js: the rail settles, the folders rise left to right, then the slips slide up (under 2 s) (pass 12 B; replaces LimitDrawer on the page) | LimitFolders (ind-process) |
| project-index | ScenePlates look file + style.css: pointing at, focusing or pressing a plant slides the navy plate's reel to its scene (pass 12 B, sibling of SitePlates) | ScenePlates (ind-process) |
| process-choreography | ClauseTabs/motion.js (from "Asset crop workflow"): the page settles and the clauses print, the package builds through AQiso, each leader draws from its tab and its tag strikes on as it arrives (pass 12 D) | ClauseTabs (buying) |
| chart-crosshair | LevellingSheet look + style.css: the navy straightedge glides to the pointed or focused line (CSS 220 ms; instant for keyboard and reduced motion) (pass 12 D) | LevellingSheet (buying) |
| activity-stamp | LevellingSheet/motion.js: the sheets settle, the lines print, the gaps hatch in and our tick stamps down, then the straightedge is laid (pass 12 D) | LevellingSheet (buying) |
| editing-caret | CapitalRequest/motion.js: field by field the number box lands and the label types in behind a caret (one caret at a time), the text settles, the codes stamp into the margin (about 2.8 s) (pass 12 D) | CapitalRequest (first-system) |
| pinned-pass | FitEnvelope/motion.js: the package draws through AQiso and the band fills from 0, then each lockout tag drops onto its cord and swings to rest about its eyelet (far end 18 px at most; about 3.4 s) (pass 12 D) | FitEnvelope (urs-guide, ind-process) |
| race-replay | BidRoute/motion.js ("Full send"): the water fills the route behind a ringed marker, each station's pictogram rises, its drop draws and its card comes up (about 3.6 s, once) (pass 12 D) | BidRoute (urs-guide) |
| causal-cadence | RecordTrail/motion.js: each station's record sheet drops on its cord as the rail arrives (0.3 s per station, under 3.6 s); on phones each station plays as it scrolls in (pass 12 D) | RecordTrail (cmp-quality) |
| guided-inspection | ReceivingBench look + motion.js: the bench draws through `AQiso.timeline`, then tags, leader, circle A, the join and circle B; the spotlight ring glides to the pointed row's supply (550 ms .22/.75/.22/1) (pass 12 D) | ReceivingBench (cmp-quality) |
| archive-folder | ContractFolders/motion.js: the folder rises (0.42 s), the sheet comes up from a 1.5° tilt (0.48 s), the tabs slide out, the signature draws and the pen settles (pass 12 D) | ContractFolders (cmp-quality) |
