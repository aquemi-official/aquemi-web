CodeIndex shows a short document set as an index in huge type: each document's filing code (JNT, MAT, WQR, PT) runs as oversized outline mono across its row, cropped by the page edge on alternating sides, with the document's number, name and contents beside it; the deciding documents' codes are drawn in flow.

- On the site: a `docs` block with `"look": "code-index"` (renderer `assets/src/blocks/look-code-index.js`), svc-fabrication "The fabrication dossier". No concept of its own (Gemini quota); adapted from `research/pass9/concepts/services.0.png` (huge cropped outline type).
- Markup: `section.aq-code-index-sec` → `div.aq-code-index` → fold wrapper → `ol.__list` of `li.__row` (`is-key`, `is-r` for the right-hand rows, `--i`): `span.__code` (aria-hidden), `div.__text` (`__n` "01 / JNT", `h3.__t` with the item's link and intent, `p.__d`). Optional block link → `p.__more`.
- Fields (a docs block): `h`, `intro`, `items` [{`t`, `d`, `code`, `key`, `link`, `intent`}], `link`, `link_label`, `intent`, `fold`, `fold_noun`. Codes from DocList's `docCode` unless `code` is given.
- Tokens: code outline `line-strong` (key documents `flow`) by `-webkit-text-stroke`, no fill; hover fills it faintly by `color-mix`. `line-strong` rules between rows.
- Phones: the code (76 px) over the text, sides still alternating.
- Use it for two to six documents. Longer lists: DocList.

## Motion

Motion: one timeline per row as it comes into view: the code slides in from its own edge and decodes, then the number, name and text rise. Under 1.6 s each; nothing under reduced motion.
