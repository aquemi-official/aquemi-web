LoopCircuit draws how a storage and distribution loop works as one blueprint P&ID strip on a navy band, each station standing over its own numbered caption, under a display-scale headline.

- On the site: a `diagram` block with `"look": "loop-circuit"` (renderer `assets/src/blocks/look-loop-circuit.js`), sys-storage "How a loop works". Origin: pass 9b concept `research/pass9b/concepts/sys-storage.1.png` (a horizontal loop drawing whose stations sit over a numbered caption row); pass 9 built it as an HMI screen.
- Markup: `section.aq-band--navy.aq-loop-circuit-sec[data-theme="dark"]` > `div.aq-loop-circuit` > `div.__strip` > `svg.__svg` (column rules `path.__col`, pipes, `path.__flow--feed` and `--loop`, an unstroked `path.__route` the marker follows, chevrons, `g.__node[data-node]` per station), then `ol.__stages` of `li.__stage[data-node][data-at]` (`span.__mark` glyph for phones, `p.__no`, `h3.__t`, `p.__d`).
- Fields: `h`, `stages` (or `items`) `[{t, d, spot | icon, node}]`. `node`: `gen`, `tank`, `pump`, `hx`, `pou`, `sensors`, `spray` (default by position in that order). The strip is fixed at seven columns of these stations; the captions use the same seven columns so each station stands over its caption.
- Drawn in the renderer as flat P&ID symbols (bowtie valves, ISA pump circle, shell-and-tube exchanger, instrument bubbles with a dashed AE for TOC, tank in section with the spray ball, and detail A of the spray ball on the return riser), not IsoKit: the strip is a schematic. Tokens only; the section is dark-themed so `flow` is the water.
- Pointing at a caption lights its station (colour only; all content is visible without it).
- Phones (pass 12, S10): a vertical circuit. The supply pipe runs down the left edge through the stations' glyph
  markers (01 generation to 06 return sensors), turns at the foot (`__bt`) and the return comes back up the right edge
  (`__rp`) past the spray ball's marker (07, on the return) and over into the tank head (`__tt`, `__ts`). Twin walls
  `on-navy-muted`, water `flow`, a chevron per straight run (down on the supply, up on the return). The stop text
  sits between the two pipes. Sys-storage at 375 px: 1,169 -> 1,252 px.

## Motion

Motion: the strip prints in (column rules and pipes draw, then each station left to right, the tank level rises) and the captions rise, once, under 2 s. Then the page's one scroll-linked story, ported from Subframe Motion "Animated route path" (race-replay): as the band passes through the viewport a ringed marker follows the water's route from generation through the tank, pump, exchanger, outlets and return sensors, up the riser and home through the spray ball; the water line fills behind it and each station and caption lights as it arrives. Scrolling back runs it back; it never pins or changes scroll speed, and the drawing is complete at every position. Reduced motion: water lines drawn in full, no marker.
