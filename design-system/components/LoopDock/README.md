LoopDock shows a loop's options where they fit on the loop: one isometric storage and distribution loop on a full-width navy band, a numbered marker on the part each option adds and a leader from it down to the option's caption on the limestone below.

- On the site: an `options` block with `"look": "loop-dock"` (renderer `assets/src/blocks/look-loop-dock.js`), sys-storage "Options". Origin: pass 9b concept `research/pass9b/concepts/sys-storage.5.png` (one navy schematic band of the loop, leader lines out to three option captions on limestone below); pass 9 had the drawing on limestone with cards beside it.
- Markup: `div.aq-loop-dock` > `div.__band` (navy; `div.__plane` aria-hidden: `svg.aq-iso.aq-iso--navy`, `svg.__leads` with `path.__lead[data-c]` and `circle.__dot[data-c]`, `span.__mk[data-c]` markers; `span.__base` base label), `ol.__cards` (one column per option) of `li.__card[data-c][data-parts]` (`div.__body` or `a.__body` with `p.__no` number and glyph, `h3.__t`, `p.__d`).
- Fields: `h`, `intro`, `items [{t, d, spot | icon, part, link}]`, `spot` (base glyph), `base` (default "Base skid"), `fold`, `fold_noun`. `part`: an array of drawing ids the option adds: `uv`, `mod`, `cool` (default by position: `uv`; `mod` and `uv`; `cool`). The marker and leader sit on the first id. Order the items left to right along the loop (UV, module, point-of-use cooler) so the leaders never cross.
- Drawing: IsoKit parts only (tank, skid, pump, hx, analyzer, uv, two outlets, a small hx as the point-of-use cooler), pipes and the overhead return. Leaders drop straight down from the part, then slant to the top-left of their caption column.
- Pointing at or focusing a caption lights its parts (`is-lit`), its marker and its leader. Fold: phones only.
- Phones: the band full bleed with its markers (no leaders), the base label under the plate, captions stacked. Pass 12
  (S9): the plate crops to the drawing (`CROP` in the renderer: the loop, skid and every option's marker; `__zoom`
  sized by `--cw` / `--ch` and offset by `--cl` / `--ct`), so the loop runs about twice the size (about 355 px wide at
  375); markers 14 px on 28 px tags, base label 13 px. Sys-storage at 375 px: 952 -> 1,068 px.

## Motion

Motion: the loop draws itself with the shared IsoKit choreography (parts back to front, pipes, then the water from the tank through the module and UV out to the points of use and home overhead); each option's marker drops onto its part as the water reaches it, its leader runs down to the caption row and the caption rises. Under 5 s; nothing under reduced motion.

Pass 12 C: desktop captions take a `space-4` foot, so a closing placeholder chip does not sit on the card's bottom edge.
