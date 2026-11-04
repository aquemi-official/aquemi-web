EnquiryForm lays out a proposal, service or application request as a numbered data sheet on a quiet panel: numbered sections, numbered items and one submit.

Origin: concept L in design-system/inspiration/ (`concept-l-form.png`), rebuilt with Aquemi tokens for light and dark, without the concept's drawing frame, ruler ticks and revision strip.

## Markup

```html
<form class="aq-form" novalidate>
  <p class="aq-form__title"><span>Data sheet</span><span>2 sections · 6 required</span></p>
  <fieldset class="aq-form__section">
    <legend class="aq-form__legend"><span class="aq-form__num">1.0</span> System data</legend>
    <div class="aq-form__grid">
      <div class="aq-field">
        <label class="aq-field__label" for="ef-stage"><span class="aq-form__ref" aria-hidden="true">1.1</span>Project stage</label>
        <select class="aq-field__input" id="ef-stage" name="project-stage" required>…</select>
      </div>
      <fieldset class="aq-fieldset aq-field aq-form__full">
        <legend class="aq-field__label"><span class="aq-form__ref" aria-hidden="true">1.2</span>System type</legend>
        <div class="aq-checks"><label><input type="checkbox" name="system-type" value="…"> …</label></div>
      </fieldset>
    </div>
  </fieldset>
  <fieldset class="aq-form__section">…2.0 Site and contact…</fieldset>
  <div class="aq-form__actions"><button class="aq-btn aq-btn--primary aq-form__submit" type="submit">Request a proposal</button><span class="aq-small" role="status"></span>
    <p class="aq-small aq-form__note"><span class="aq-ph">[privacy notice link]</span></p></div>
</form>
```

- Fields are TextField markup (`aq-field`, a real `<label for>`). Fields that need the full width (message, checkbox groups) add `aq-form__full`.
- Each numbered section is a `<fieldset class="aq-form__section">` with a `<legend class="aq-form__legend">`; the number (`1.0`) is part of the legend. Item numbers (`aq-form__ref`, `1.1`) sit inside the label and are `aria-hidden`.
- Mark optional fields, not required ones: `<span class="aq-field__optional">(optional)</span>`. Required inputs carry `required`; the form keeps `novalidate`, so the consumer provides validation and submission.
- Help text gets an `id` and the input points at it with `aria-describedby`. A select's first option is `<option value="">Choose…</option>`.
- An option may hold a `[placeholder]` (careers' "[PP fabrication job title]", news' consent "Yes, [legal entity name] may email me…"). It shows in the Placeholder style like any copy, and its `value` stays the label word for word, since intents and `data-when` match on it. In a checkbox or radio cell the text sits in one `<span>` so it flows as one line beside the box: `<label><input type="checkbox" value="Yes, [legal entity name] may…"> <span>Yes, <span class="aq-ph">[legal entity name]</span> may…</span></label>` (any option whose text carries markup, µ included, is wrapped the same way). A `<option>` holds text only, so an option with a placeholder takes the class itself, `<option class="aq-ph">[PP fabrication job title]</option>`: the browser's list draws it on the Placeholder's ground where the platform lets it, and once chosen the closed select shows in its mono on `caution-tint`; the site's placeholder switch (`is-clean`) returns it to a plain field.
- Block note (one line under the submit: the privacy notice link, a retention line): `<p class="aq-small aq-form__note">`, the same small `ink-muted` line in both shapes. A stepped form draws it under its last step's actions; a single sheet in its submit band, on its own line `space-4` under the button (`.aq-form__actions > .aq-form__note`). In page content it is the form block's `note` (`"note": "[privacy notice link]"`).
- The title row counts sections (or steps) and the required fields showing: the ones the visitor sees when the form opens, a conditional field only once its trigger is ticked (by the visitor, or by the linking page's intent). It follows the answers: ticking an option that opens a required follow-up raises it, and moving on lowers it again (`<span class="wform-req">7 required</span>`, kept current by the change handler in `assets/src/parts/EnquiryForm.js`). A count of every required field the form could ask for overstates the work (contact-proposal opened at "3 steps · 11 required" with 7 showing).
- The submit label says what happens: "Request a proposal", "Submit service request". One `aq-btn--primary` per form.

- Radio group (one answer): the checkbox-group markup with `type="radio"` and a shared `name`.
- File upload: `<input class="aq-field__file" type="file" multiple>` in a full-width `aq-field` (a `surface-sunken` field with a `line` border and `radius-sm`; the browser button drawn as a secondary button through `::file-selector-button`, the chosen file names in mono 13/20 `ink-muted`), optional by default, with help text naming the formats and saying files can be sent later. A request that cannot go without its file (careers' CV) makes it required, and it is then marked and checked like any required field: `required` on the input, no "(optional)", counted in the title row; Continue or Send with no file chosen shows "Attach a file." under it and gives the field TextField's error (a `fail` border with its 3 px `fail` edge), cleared as soon as a file is chosen.
- Conditional field: add `data-when="<option label>"` and `hidden`; the site shows it only while that option is ticked (for example pure steam capacity when "Pure steam generator" is chosen).
- Several triggers: separate option labels with `|` (`data-when="Sizing and budget proposal|Route assessment"`); the field shows while any of them is ticked. A tick inside a hidden conditional field does not count, so a follow-up question hides with its parent (for example an intent radio at the top of the form that reveals a sub-choice, which in turn reveals its own fields). Never use a label that repeats across groups, such as "Not sure yet", as a trigger.
- Elsewhere note: a request this form does not take is sent to the page whose form takes it (DR-014 rule 2: "I am qualifying suppliers" goes to cmp-quality's audit request; rule 12: one form per request). Add the option to the group as usual, then a field of kind `note` shown only while it is ticked:

  ```json
  {"kind": "note", "when": "I am qualifying suppliers",
   "label": "Supplier audits and questionnaire packs have their own request on Quality management.",
   "link": "cmp-quality#audit", "action": "Request a supplier audit"}
  ```

  `label` is the one line; `link` a page id or `page#anchor`; `action` the link's words, five or fewer (default: the linked block's heading, else the page's name); optional `intent`, options that form ticks on arrival.
  A note's link may also be a call, so a severity 1 line can carry a tappable number: `{"kind": "note", "when": "Severity 1: production stopped or water out of specification", "label": "Production stopped? Call as well.", "link": "tel:[service phone number]", "action": "Call"}`. It draws as every call link does (Button's call, on the phone rule `wnum` that `wtel` uses for the NavBar and Footer numbers): once the number is confirmed, `<a class="aq-btn aq-btn--link" href="tel:<digits>">Call 1 800 …</a>` with its digit groups on one line and no arrow; until then `<span class="aq-btn aq-btn--pending">Call <span class="aq-ph">[service phone number]</span></span>`, plain text, never a link. `action` is the lead word (default "Call"); the number is added after it when the action leaves it out. Use the same placeholder name as the NavBar and Footer, and fill it in the same commit. A call carries no `intent`. Markup: `<div class="aq-form__elsewhere aq-form__full" data-when="…" hidden>` holding `<p class="aq-form__elsewhere-t">` and the Button link variant. It is not a field: no item number (the fields after it keep their numbers in order), never required, nothing sent, never validated. Look: a full-width row like an option cell (`surface`, 1 px `line` border, `radius-sm`, `space-3` by `space-4` padding), the line in Geist 14/22 `ink-muted`, the link in `flow` with its arrow at the right; on phones the link drops under the line. The rest of the form stays usable, so a visitor who wants both can still send.
- Pre-set from the linking page: a link that routes to a page with a form can carry `data-intent="<option label>|<option label>"`. In page content: the hero's `primary_cta_intent` and `secondary_cta.intent`, the closing's `cta.intent`, a contact route's `intent`, a table or router cell's `intent` (`{"t": "Send your URS", "link": "contact-proposal", "intent": "I have a URS or a draft|Proposal against your URS"}`), an FAQ item's `intent` and a note's `intent`. On arrival the form ticks those options and opens the conditional fields they trigger, with the same cascade rule, so a visitor from the pretreatment page (`"I have water data, no system yet|Feed water review"`) lands on that situation with "Feed water review" ticked and its questions (peak demand, feed water source) showing. Every label must tick an option of a radio or checkbox group on the target form, so a follow-up comes after the situation that opens it ("I have a URS or a draft|URS gap review"); `python tools/design_system.py check` fails on any label that ticks nothing, wherever the intent sits (DR-014: a problem, not a warning). The visitor can still change the choice.
- Pre-set from the same page: a hero or closing button that jumps to the form's own block (`"cta": {"link": "#apply", "intent": "Speculative application"}` on careers) carries `data-intent` too. The jump ticks those options in place, with the same rules (only in fields showing, the first match of a radio, follow-ups opening in turn), and the conditional fields, the required count and any error line follow as if the visitor had ticked it; nothing re-renders, so answers already typed stay. A stepped form already moved past the step that holds the option goes back to it, as Back does. `check` reads the intent against the fields of the block the jump lands on and fails a jump to a block with no form. A `page#anchor` link to the same page (`careers#apply`) still works but re-renders the page, clearing what was typed.
- Steps, for long intake forms: `<form class="aq-form aq-form--steps">` keeps the data sheet's title row, adds `<ol class="aq-form__progress">` (one `<li>` per step, `aria-current="step"` on the active one), and makes each step one numbered section: `<fieldset class="aq-form__section aq-form__step" data-step="0">` with `<legend class="aq-form__legend"><span class="aq-form__num">1.0</span> Step 1 of 3: System scope</legend>`, its fields in `aq-form__grid` numbered 1.1, 1.2 … Inactive steps carry `hidden`. Each step ends in an `aq-form__actions` with Back (`aq-btn--secondary`) and Continue (`data-step-go="<index>"`); only the last has the submit. Technical questions first, contact details last; three steps at most. On the site, a form block with `steps` renders this way.

## Site renderer

`assets/src/blocks/form.js` builds this from a page's `form` block (fields from `assets/src/parts/EnquiryForm.js`).

- Section 1.0 holds the requirement fields: "System data" when any field has a unit, otherwise "Details".
- The trailing run of contact fields (labels with name, company, role, email, phone, site or contract) becomes 2.0: "Site and contact" when a site field is in it, otherwise "Contact". A form with no trailing contact run stays one section.
- A field with `"section": "<legend>"` starts a new section; a block-level `"sections": [..]` renames them in order.
- Items are numbered in order within their section or step (1.1, 1.2 …); a note takes no number, and neither does a conditional field while it is hidden (pass 12): `wRenum` in `parts/EnquiryForm.js` numbers the showing fields again whenever an answer opens or closes one (an empty `aq-form__ref` takes no room), so the sheet never skips a number (careers, contact-locations).
- Fields in a two-column row start at the top of their cell (`align-content: start`): a neighbour with a help line no longer pushes a field's input down (contact-locations' "Number of visitors").
- The block's `note` draws under the submit in both shapes (above: in a single sheet's submit band, under a stepped form's last actions).
- `name` is the label as a slug (`required-capacity`). The `wform` class and `wform-msg` status are hooked by `index.html` to show the draft-site message on submit; nothing is sent.

## Layout

- **Desktop:** a `surface-raised` panel with one 1 px `line` border and `space-8` padding; across its top edge the title strip (pass 9); each section a legend then a two-column field grid; the submit band under a `line` hairline.
- **Title strip:** the title row bleeds to the panel's edges as a `navy` strip (`space-4` / `space-8` padding): "Data sheet" in `on-navy` led by a short rule in `flow` lifted towards `on-navy`, the count in `on-navy-muted`, eyebrow style. Scoped as `.aq-form .aq-form__title` so the page's paragraph reset does not undo its bleed.
- **Progress (stepped form):** a pipeline. Each step is a `space-8` square node (`radius-sm`, 1 px `line-strong`, its number in mono 13) on one 1 px `line-strong` line running to the next node, the step's name under it (Geist 500 14/20). Steps passed take a `flow` node and a 1.5 px `flow` line; the current node is filled with `action` (`on-action` number); steps ahead stay `line-strong`. With motion a `flow` ring (`aq-form__mark`) sits round the current node and slides to the next one.
- **Legends:** the section number (`1.0`) in Geist 300 30/28 `flow` before the title.
- **Phone** (`@container (max-width: 860px)`): `space-4` side padding, the strip bleeding the same way, step names 14/20 (pass 12, the reading floor), one column, full-width submit. A short option list (`aq-checks--short`, set by the renderer when there are four or more options of 20 characters or fewer and no placeholder, such as news' topics) keeps two columns of 44 px cells where each is 140 px or wider (one column below that), at 14/20 type with `space-2` padding, hyphenated if a word is still too long.

## Token rules

- Panel on `surface-raised`, 1 px `line`, no shadow. Title row in the `eyebrow` style (mono 12/16, 500, 0.08em, uppercase, `ink-muted`) over a `line` hairline.
- Section legends in the `h3` style (Geist 500 20/28, 18/26 on phones), sentence case, with the section number in mono 13 `ink-subtle`; item numbers mono 12 `ink-subtle`.
- Checkbox options are 44 px cells on `surface` with a `line` border and `radius-sm`; a ticked cell takes a `flow` border, the `flow-tint` ground and a 3 px `flow` edge at its left (200 ms). The submit is `space-12` tall.
- Inputs keep TextField sizing and radius (44 px tall, `radius-sm`, 2 px `focus` ring with 2 px offset).

## When not to use

Not for a one-field signup in a footer or a search box; those don't need a data sheet.

## Motion

Motion (`motion.js`): the sheet is drawn up on scroll-in (title rule rules across, progress steps and legends wipe in with numbers decoding, fields rise in reading order, revision strip last). In the stepped form the progress is a pipeline (above); with motion, on Continue the water runs along the line just passed (`--aq-fill` 0 to 1 on that step) and the ring slides on to the new node with Flip, and the new step slides in from the side it was asked for. Validation (`parts/EnquiryForm.js`, works without motion): a field is checked when the visitor leaves it after typing and live while it shows an error; Continue and Send check every visible field, do not advance, move focus to the first problem and show an `aq-field__error` line under each (joined by `aria-describedby`, inputs `aria-invalid`); Send also says how many need attention. A blocked Continue or Send fires `aq:invalid` and the motion layer gives those fields one short shake.

Pass 9b (Subframe Motion `border-beam`, `address-check`, `loading-button`, `task-steps`): focus entering a field group runs one flow-light lap round it; error lines drop in and a field put right earns a pass tick; Send keeps one footprint through pending and alert faces; a passed step's node becomes a tick. Fields, names, pre-set, validation and submit handling are unchanged.
