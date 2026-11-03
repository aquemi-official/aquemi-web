CostBalance draws what it costs to run a system as a balance around it: a dashed system boundary with the treatment train inside, every running cost a stream wired in from the left, the water that leaves (to drain) wired out to the right.

Look `cost-balance` (`assets/src/blocks/look-cost-balance.js`) on a `spec` block. Used on svc-service, "What it costs to run". Concept adapted: systems.2 (items pinned to either side of a boundary), drawn as a process engineer's mass balance (flat Swiss diagram).

- Markup: `div.aq-cost-balance` > `ol.__in` + `div.__sys` (`__edge`, `__train` with `__water` and `__g` > `.aq-icon.__ic`) + `ol.__out`; each stream `li.__s.__s--in|--out` with `__n`, `__txt` (`h3.__p`, `p.__v`, `p.__m` with `__mk`), `__wire` (`__line`, `__head`). Optional `p.__note` after.
- Fields: `h`, `cols` (the third names the "set by" key), `rows [{p, v, m, link, side}]`, `fold`, `fold_noun`, `note`; new optional `side: "out"` puts a row on the leaving side; new optional block field `glyphs` (Icon names for the train; default softener, carbon filter, RO, EDI, UV, tank).
- Tokens: wires `line-strong`, the outgoing wire dashed `flow`, the boundary dashed `ink-muted`, glyph boxes on `surface` with `line-strong`. Item names Geist 300 22 px, values mono.
- Desktop shows every stream; the fold applies on phones, where the balance runs top to bottom on one rail.

Motion: the boundary is drawn, the water line runs down through the train and each glyph seats; the streams arrive one by one (text, then its wire runs to the boundary and the arrowhead lands); last the water leaves along the outgoing wire. Once, about 3 s.

## Phones (pass 12)

Two modes, chosen by the data (no page field):
- **Pipe** (one glyph per incoming stream, e.g. buying "How a price is built"): each stream carries its own glyph (40 px box) at the left on one flow-blue water pipe that runs down into the leaving row, whose number becomes a flow chip with an arrowhead. The boundary box is not drawn.
- **Strip** (more streams than glyphs, e.g. first-system "What it costs"): the boundary with its train is a 56 px sticky mini-skid under the header (PhoneKit sticky figure, `data-pk-sticky`, `--pk-h: 56px` on the figure): arrow in, the dashed boundary with the glyphs on the water line, arrow out, and the number of the stream in view ("03 / 08"). The stream on the reading line lights what it names: a stream naming the package lights every glyph; one naming filters, membranes, resin or salt lights those glyphs; any other incoming stream lights the boundary; the leaving stream lights the water out. Keyword map `GW` in the look file.
- Both: basis lines 14 px; a stream with a link is one 44 px target (the link's `::before` covers the row). A note of the form "Short label: rest" (label 6 words or fewer, e.g. "First year, all in: ...") renders as a navy total card (label 24 px light, the rest 15 px); on desktop (pass 12 round C, ≥ 861 px) the same card sits out of flow in the right column under the leaving stream, its foot on the balance's foot, so it adds no height (288 px wide from about 1,100 px; narrower between 861 and 1,000 px so it stays a space-12 clear of the boundary, about 220 px at 880); a plain note stays an inline sentence.
