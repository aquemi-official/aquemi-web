CostBalance draws what it costs to run a system as a balance around it: a dashed system boundary with the treatment train inside, every running cost a stream wired in from the left, the water that leaves (to drain) wired out to the right.

Look `cost-balance` (`assets/src/blocks/look-cost-balance.js`) on a `spec` block. Used on svc-service, "What it costs to run". Concept adapted: systems.2 (items pinned to either side of a boundary), drawn as a process engineer's mass balance (flat Swiss diagram).

- Markup: `div.aq-cost-balance` > `ol.__in` + `div.__sys` (`__edge`, `__train` with `__water` and `__g` > `.aq-icon.__ic`) + `ol.__out`; each stream `li.__s.__s--in|--out` with `__n`, `__txt` (`h3.__p`, `p.__v`, `p.__m` with `__mk`), `__wire` (`__line`, `__head`). Optional `p.__note` after.
- Fields: `h`, `cols` (the third names the "set by" key), `rows [{p, v, m, link, side}]`, `fold`, `fold_noun`, `note`; new optional `side: "out"` puts a row on the leaving side; new optional block field `glyphs` (Icon names for the train; default softener, carbon filter, RO, EDI, UV, tank).
- Tokens: wires `line-strong`, the outgoing wire dashed `flow`, the boundary dashed `ink-muted`, glyph boxes on `surface` with `line-strong`. Item names Geist 300 22 px, values mono.
- Desktop shows every stream; the fold applies on phones, where the balance runs top to bottom on one rail.

Motion: the boundary is drawn, the water line runs down through the train and each glyph seats; the streams arrive one by one (text, then its wire runs to the boundary and the arrowhead lands); last the water leaves along the outgoing wire. Once, about 3 s.
