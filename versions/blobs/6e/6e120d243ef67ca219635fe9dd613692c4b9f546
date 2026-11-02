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
