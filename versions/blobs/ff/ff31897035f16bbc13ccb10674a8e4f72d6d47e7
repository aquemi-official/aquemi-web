SignatureBlocks sets a roles table (who writes, who reviews) as the signature block at the foot of each document, the party in each field shown by its box (look `signature-blocks`, table block `as: "roles"`).

Concept: 48-concept-roles (written by / approved by fields per document on navy).

## Markup
`<section class="aq-section aq-signature-blocks-sec" data-theme="dark">` > section head, `.aq-signature-blocks` > `p.__key` (three spans), the fold wrapping `ol.__list` > `li.__b` > `__head` (`__n`, `h3.__t`) and `__fields` > two `__f.is-us|is-you|is-both` (`__lab`, `__v`, `__line`).

## Fields
As the roles table: `cols` [document, written, reviewed], `rows` (cells strings or `{t, link}`), `fold`, `fold_noun`, optional `key` [ours, yours, shared] (default "Aquemi", "Your team", "Shared"). Party: a cell starting "Aquemi" is ours, "You"/"Your" yours, "Both" or "You, or Aquemi" shared.

## Rules
- Navy ground with the dark token set (`data-theme="dark"`), so `flow` reads light on it in both themes. Aquemi fields in a `flow` rule with `flow` mono type; your fields in a double `limestone` rule; shared in a dashed `ink-muted` rule. Each field has a signature line with a cross.
- Desktop: one block per row (name 4 of 12, fields 8 of 12). The fold applies on phones only.

## Motion
The key boxes stamp in; each block draws in from its top left as it scrolls in, its written field fills and its line is ruled, then the reviewer's, and the reviewer's signature inks over its faint impression (signature-draw port). Once per block, under 2 s.

Polish (pass 9b): the reviewer's signature line carries a signature (aria-hidden svg `__sig` with `__imp` and `__ink`).

Polish (pass 9): desktop sets the blocks two to a row (an odd last block runs the full width, name beside its fields); the party in a field is set in Geist, labels stay mono.

Phones (pass 12): the field labels ("Written or done by", "Reviewed by") and the key boxes go from 12 to 13 px with
0.1em tracking below 860 px; the stamps, the fold (5 of 8 documents, none referenced by a drawing) and desktop are
unchanged.

Pass 12 round C (svc-cq.1): the look is paper: the section is `data-theme="light"` with `data-paper` (dimmed in the dark theme), limestone ground, on-limestone ink, cards on surface-raised; party rules stamped in navy ink (single, double, dashed), the reviewer's signature in flow ink; key kept. At 600 px and under: labels 12 px at 0.04em on one line, the doer's empty x rule hidden, index beside the name, cards 16 px. Desktop changed on purpose (navy after navy on svc-cq).

Pass 12 round C fix round: per RC1 the section is a full-width `aq-band--limestone` band (warm stone in the dark theme) and each block `li.__b` carries `data-theme="light" data-paper`, so the blocks are the paper objects (dimmed in dark) instead of the whole section; the key stamps sit on the band and switch to `--on-limestone` ink in dark (light mode unchanged, navy). Tablets (601-860 px) set the blocks two to a row again (an odd last block full width); one column stays at 600 px and under.
