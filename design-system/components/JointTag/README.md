JointTag shows a joint log as a traceability tag hanging from the joint it records: a polypropylene pipe in side view, fused at a double-rolled bead, runs off both page edges, and the tag on its wire carries one form box per log field, each field's number pinned on the part of the joint it describes.

- On the site: a `table` block with `"look": "joint-tag"` (renderer `assets/src/blocks/look-joint-tag.js`), svc-fabrication "One joint, one log line". No concept of its own (Gemini quota); adapted from `research/pass9/concepts/sys-pw.4.png` (tags as physical objects) and the macro weld of `industries.1.v2.png`.
- Markup: `section.aq-joint-tag-sec` → `div.aq-joint-tag`: `__pipe` (aria-hidden svg: `__body`, `__shade`, `__hi`, `__edge`, `__fuse`, `__bead`, `__curl`, `__seam`, `__print` lot markings, `__sten` joint number, `__cut` and `__cutm` cut-out line, `__wire`, `g.__coupon` (the fused test coupon on its `__bench`: `__cb`, `__cs`, `__ce`, `__cbd`), `g.__pin` per field with `data-k`) and `__tag` (light paper, `data-theme="light"`): `__eye`, `p.__th` (column legend, aria-hidden), the fold wrapper with `ol.__fields` of `li.__field` (`data-k`): `aq-index`, `h3.__name`, `__proves` (`__k--sr` label), `__rec` (`__k`, the record on a dashed fill-in line).
- Fields, as a table: `cols` [field, what it proves, record], `rows`, `fold`, `fold_noun`. Optional `parts` (one per row: `num`, `lot`, `welder`, `bead`, `visual`, `coupon`, `sign`, `cut`; default from the field's words). The fold applies on phones only: on desktop the tag is the whole log line.
- Tokens: the pipe is `limestone` with `on-limestone` mixes (an object, the same in both themes); tag `surface-raised` with `line` rules; pins `navy`, lit `flow`; field hover `flow-tint`.
- Pointing at or focusing into a field lights its pin.
- Phones: the drawing re-cropped round the joint (190 % wide), the tag full width, fields in one column with their labels.

## Motion

Motion: one timeline. The two lengths slide in from the edges and meet, the bead rolls up out of the seam, the lot markings print and the joint number is sprayed on, the wire draws round the joint, the tag drops on it and swings to rest, the pins land and the fields print box by box. About 4 s; nothing under reduced motion.
