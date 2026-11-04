ClauseCrosswalk sets a table of requirements against two regulations' clauses as an editorial crosswalk: the requirements large down the middle, each regulation a spine at the outer edge with its name set big and vertical and its clauses as chips, and a wire from every requirement to every clause it cites.

Look `clause-crosswalk` (`assets/src/blocks/look-clause-crosswalk.js`) on a four-column `table` block. Used on sys-monitoring, "Data integrity, clause by clause". Concepts adapted: industries.1 (numbered leaders fanning into rows) and systems.3 (each row wired to what answers it), in the editorial direction (oversized type, asymmetric spines).

- Markup: `<div class="aq-clause-crosswalk">` > `__spine--a` (`p.__reg`, `ol.__nodes` > `li.__node[data-rows]`), `svg.__wires--a` (`path.__wire[data-cw][data-cwn]`), `__heads`, `__mid` > `ol.__rows` > `li.__row` (index, `h3.__t`, `p.__how`, `p.__refs` with each regulation's clauses as text), `svg.__wires--b`, `__spine--b`. Spines and wires are aria-hidden; the rows carry the references.
- Geometry without measuring: rows share equal heights and chips spread with space-around, so row i sits at (i + 0.5) / N and chip j at (j + 0.5) / M of the same height; the wires are a stretched svg with non-scaling strokes.
- Fields: `cols [requirement, how, regulation A, regulation B]`, `rows [[t, how, clausesA, clausesB]]`, `fold` (phones only), `fold_noun`. Clauses split on "," and ";"; "(g)" after "11.10(d)" reads "11.10(g)"; chips sort in clause order.
- Tokens: names `ink` light 28 px, how `ink-muted`, chips `surface-raised` with `line-strong`, wires `line-strong`, hover `flow` and `flow-tint`.
- Phones: spines and wires go; each row shows its clauses as chips under how, the two regulations side by side.

Motion: the regulation names slide along their edges and the chips tick in down each spine; then the requirements arrive one at a time and each one's wires run out from it to its clauses on both sides. Once, under 5 s. Hover a requirement to light its wires and clauses, or a clause to light every requirement that cites it.

Phones (pass 12, audit S10): the crosswalk survives as a mini crosswalk per row. The two regulation names head the list once (`div.__pheads`); in each row regulation A's chips stack on a left rail and B's on a right rail (the row's `__ref--a` / `__ref--b`, labels kept for screen readers), short curves (`svg.__mini`, one path per chip, stretched like the desktop wires) run from every chip to the requirement set in a bordered box between them, and how runs full width under. Tapping a row lights its box, curves and chips. Motion: rows rise, then each row's curves draw out from the box to its chips. The page's phone fold still applies. Desktop unchanged.

Verify fixes (pass 12 V8): a rail with one chip draws a straight connector, tagged `.is-straight` and drawn with `shape-rendering: crispEdges` on phones, so it no longer renders speckled beside the curves.
