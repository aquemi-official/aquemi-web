FAQ answers the questions engineers and QA ask before they call, as question rows under a large outline counter: index, question and a square +/− key, with the answer opening under the question.

## Markup

```html
<section class="aq-section aq-faq-section"><div class="aq-in aq-split-section">
  <div class="aq-split-section__head">
    <header class="aq-sec-head"><h2 class="aq-h1">Questions engineers ask</h2></header>
    <div class="aq-faq__dial" aria-hidden="true" data-total="05"><span class="aq-faq__dial-n"><span>05</span></span><span class="aq-faq__dial-of"><span class="aq-faq__dial-k">questions</span></span></div>
  </div>
  <div class="aq-split-section__body"><div class="aq-faq">
    <details name="faq-1">
      <summary><span class="aq-index" aria-hidden="true">01</span><span class="aq-faq__q">How do we size generation against storage?</span><span class="aq-faq__sign" aria-hidden="true"><span class="aq-faq__glyph"></span></span></summary>
      <div class="aq-faq__a"><p>We start from your point-of-use demand profile over a full production day. …</p></div>
    </details>
    <details name="faq-1">…</details>
  </div></div>
</div></section>
```

- Native `<details>`/`<summary>`: it opens, closes and is keyboard-operable with no JavaScript. All rows start closed, so the list of questions is the first read.
- Give every `<details>` in one FAQ the same `name` (unique per FAQ on the page) so only one answer is open at a time.
- The index is the shared `.aq-index` (`01`, mono). `aq-faq__sign` holds one empty `aq-faq__glyph`; CSS draws the plus and turns it into a minus.
- The site renderer (`assets/src/blocks/faq.js`) puts it in a SplitSection (`aq-faq-section` on the section): the section head and the dial on the left (sticky, as every split head), the rows on the right (stacked on phones).

## The dial (pass 9)

Under the heading, `aq-faq__dial` (`aria-hidden`, decoration that repeats what the list says): the number of questions in very large outline numerals (Geist 300, `clamp(112px, 13cqi, 188px)`, no fill, a 1 px `line-strong` stroke) over a short rule and the word "questions". While a question is open it shows that question's number and "of 05", its stroke and rule in `flow`; closing the last open row turns it back to the count. `data-total` holds the count. Hidden on phones, where the heading sits right above the rows. Without JavaScript it shows the count.

## One link per answer

DR-009's "one line and a link": an answer whose full version lives on another page says one line and links there. The link is a field of the item, never markup inside the answer (the answer stays plain text, so nothing in page content is parsed as HTML):

```json
{"q": "Which limits apply to Purified Water?", "a": "The stricter of USP and Ph. Eur. on each attribute.", "link": "compliance#limits"}
{"q": "We do not have a URS yet. Is it too early to ask?", "a": "No. Tell us what you make and ask for a water scope review.",
 "link": "contact-proposal", "link_label": "Request a water scope review", "intent": "I know my product, not my water spec"}
```

- `link`: a page id or `page#anchor` (opens that page at the block with that `anchor`). A link to a page that does not exist renders nothing, and `check` warns on it and on a missing anchor.
- `link_label` (optional): the link's words, five or fewer (`check` counts them with the buttons). Without it a `page#anchor` link reads the target block's heading and a page link the page's name.
- `intent` (optional): option labels the linked page's form ticks on arrival, as on a button (`check` fails on labels that tick nothing, DR-014).
- Markup: after the answer's paragraph, `<p class="aq-faq__more">` holding the Button link variant (`aq-btn aq-btn--link`, `flow`, with its arrow), `space-4` under the answer.

## Layout

- Each question is a row between 1 px `line` hairlines, no frame. The summary: the index (mono, `flow` on hover and while open), the question in Geist 400 22/30 `ink` (18/26 on phones), and the key: a 44 px square (`radius-sm`, 1 px `line-strong`) holding a drawn 14 px plus in `ink`. Rows align to the question's first line.
- Hover: the question turns `flow` and steps 4 px right, the key's border turns `ink`. Open: a 2 px `flow` rule draws down the row's left edge, the key fills with `action` (navy; Limestone in dark) and its plus turns half a turn into a minus in `on-action`.
- Answer 17/28 (15/24 on phones) in `ink-muted` within `text-max`, under the question column.
- Focus: 2 px `focus` ring with 2 px offset on the summary.

## Writing

- At most eight questions per page and answers of 60 words or fewer (content budgets): the direct answer first, then the standard or number.
- Unknown facts go in `[square brackets]`.

## When not to use it

- Don't hide anything a buyer needs to decide (scope, standards, deliverables): put it in the page body.
- Not for long answers with lists or tables; link to a page instead.

## Motion

`motion.js`: on scroll-in the dial's numerals roll up into view while the rows wipe in from the left one after another, each question rising a step behind its hairline. Open and close ease the answer's height with GSAP (`aq-settle` open, 340 ms close); a row that closes leaves its `name` group while it animates, so opening another never snaps it shut (`is-closing` turns its key and rule back at once). The dial turns over to the open question's number (the old number rolls out, the new one in) and back to the count. The click handler covers Enter and Space on the summary; without JS or under reduced motion `<details>` opens and closes natively and the dial just switches its number.

Pass 9b (Subframe Motion `spring-accordion`, `icon-morph`): 0.34 s open, 0.24 s close, interruptible; the answer's lines rise 8 px; Enter/Space toggle instantly; the key's plus turns into a minus in about 260 ms.

## Phones (pass 12)

Answers at `--aq-faq-phone` (15/24), so a `[placeholder]` in an answer is a 13 px chip; questions 18/26; the key stays a 44 px square and the answer's one link is a 44 px Button link row. No dial.
- The answer's link (`.aq-faq__a .aq-btn--link`) is a 44 px inline-flex target at every width (pass 12 C).
