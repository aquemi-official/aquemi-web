SparesKit reads like-for-like rules off the spares kit: a tray (a shadow board seen from above) with one pocket per part, each part drawn flat in line art in its cut-out, and under it the answers: "=" like for like when, "≠" a change when, "→" what follows a change.

Look `spares-kit` (`assets/src/blocks/look-spares-kit.js`) on a `table` block (part, like for like, change, what follows). Used on svc-service, "Like for like, or a change?". Concept adapted: sys-pw.4 (options as physical objects laid out flat), kept matte and square, as a shadow board.

- Markup: `ol.aq-spares-kit` > `li.__slot` (`__well` with `svg.__art` (`g.__pocket`, `g.__part`) and `__n`; `h3.__t`; `dl.__rules` > `__rule--same|--change|--then` with `dt` (`__sym`) and `dd`) and a closing `li.__key` (`__keyh`, `__keyr`).
- Drawings (inline, flat): membrane element, probe with transmitter, program memory card, gasket and diaphragm, EDI module, UV lamp, vent filter cartridge. Inside a drawing `k-t` is a thin detail line and `k-a` a flow accent.
- Fields: `h`, `intro`, `cols`, `rows`, `fold`, `fold_noun`; new optional `kit` (one drawing name per row: membrane, probe, card, seal, edi, lamp, cartridge); without it the drawing is matched from the part name.
- Tokens: tray `surface-sunken` in a `line-strong` frame; pockets a deeper sunken mix; parts 1.5 px `ink` on `surface-raised`; names Geist 300 24 px; symbols in mono squares (`flow` for "what follows").
- Desktop shows the whole tray (four columns, two below 1080 px); the fold applies on phones, one pocket per row.

Motion: the pockets show, then each part drops into its pocket and settles, its name and rules rising after it. Once, about 2.5 s. Hover lifts a part out of its pocket.
