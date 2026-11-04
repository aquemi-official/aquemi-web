SpoolDossier sets a document set beside the as-built isometric it indexes: the title huge and light at the top left, an isometric polypropylene spool at the right with numbered joints and lot-tagged lengths, and the documents in a hairline grid under them.

- On the site: a `docs` block with `"look": "spool-dossier"` (renderer `assets/src/blocks/look-spool-dossier.js`), svc-fabrication "The fabrication dossier". Concept: `research/pass9b/concepts/svc-fabrication.2.png` (huge light headline, dimensioned isometric PP spool, dossier parts in a split hairline grid).
- Markup: `section.aq-band--limestone.aq-spool-dossier-sec` → `div.aq-spool-dossier` (`data-theme="light"`): `__head` (the section head), `__fig` (IsoKit svg `aq-iso--limestone __svg`: lengths `g.__len` with `data-lot`, the tee `__fit`, the gauge part `cap`, dimensions without figures, `g.__lot` tags, `g.__j` joints with `__ring`, `__dot` and the number), `__parts` (the fold wrapper with `ol.__list` of `li.__item`: `__n`, `h3.__t`, `p.__d`).
- Fields (a docs block): `h`, `intro`, `items [{t, d, key, link, intent, layer}]`, `link`, `link_label`, `intent`, `fold`, `fold_noun`. `layer` (optional): `joints`, `lots`, `quals`, `test` (default from the item's words). Key documents' numbers are `flow`.
- Joints are method-neutral (FD-18): each a girth ring at pipe OD (two hairline half-ellipses), plain cut ends at J-01 and J-07, a PP end cap at J-06 with the test gauge on a stub; never a flange, collar or bead.
- Drawing labels (J-01 …, L1 …) are aria-hidden; they show what a joint map looks like, not a project's joints.
- Pointing at (mouse) or focusing a part shows its layer on the spool and keeps it shown: the joints and their numbers light, the lengths and lot tags light, every joint is ringed, or the water runs through to the test cap. Ported from Subframe Motion "Hover image preview list" (project-index): 240 ms on cubic-bezier(.2,.85,.25,1), instant under reduced motion.
- Phones: title, spool, then the parts in one column.

## Motion

Motion: IsoKit's timeline draws the spool (lengths back to front, the water once), then the joints dot in order with their numbers and the lot tags print; the parts rise in turn. Once, about 3.4 s; nothing under reduced motion.

Phones (pass 12, audit S9): the spool runs full bleed with its empty margins cropped (top and bottom; the drawing itself already reaches the side edges, so it holds about its size with J-01 and J-06 at the edges), its J- and L- labels at 13.5 units (12-13 px) with a limestone halo, and the four parts in a 2 x 2 grid (28 px numerals, 15 px text). Desktop unchanged.
