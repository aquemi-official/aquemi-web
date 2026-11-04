OnboardingFan shows a supplier-onboarding set as an open folder with one tabbed paper fanned out per item, each paper carrying a status-stamp slot, so procurement sees every paper it checks before award and the status of each at a glance (look `onboarding-fan`, a docs block).

Pass 12 build E, concept `inspiration/gemini/255-p12-buying-onboarding.png` (audit row 32, buying#onboarding). Not
copied from the concept: its five numbered step captions over the fan (invented), the wordmark and the prompt text in
its phone frame. The papers, codes and statuses are the block's.

- **Markup** (renderer `assets/src/blocks/look-onboarding-fan.js`): `section.aq-onboarding-fan-sec > .aq-in >
  .aq-onboarding-fan` holding `__crown` (phones only: the tab tops, aria-hidden, a paper object so the tops stay paper in dark), the folder `__back` (with its own tab)
  and `__front` (the front lip with a thumb cut) as aria-hidden paper objects, and `ol.__papers`.
  Each `li.__paper` (`data-theme="light" data-paper`, so paper stays paper in dark): `__tab` with the `__code`, `h3.__t`
  (the item's link stretched over the whole paper), `__d` (what the paper is, when the item says more than its status)
  and `p.__stamp` (caption `__sk` "Status", value `__sv`).
- **Fields** (a docs block): `h`, `intro`, `items` [{`t`, `d`, `code`, `key`, `link`, `intent`}]. Codes come from the
  DocList lookup unless the item names its own. `key: true` edges the paper's tab and stamp in flow.
- **Status rule:** the first `[placeholder]` in `d` goes into the stamp; the rest of `d` (less a leading "Status:" and
  the colon before the placeholder) stays on the paper. An item with no placeholder puts its whole `d` in the stamp
  (its `d` is its status). Once a placeholder is filled in, the same split holds: "Status: x. Rest" puts x in the
  stamp, "What it is: x" puts the text after the last colon in it. The slot never shows a guessed status.
- **Wide** (over 1,100 px container): one fan, set in from the folder's sides by 80 px so the folder's own tab (32 px)
  shows in the left gutter. Each paper leans 2.4 deg a step from the middle about its bottom
  centre; tabs cut at their own place along the top edge (left paper's at the left, right paper's at the right); stamps
  sit on one line just above the folder's lip, slanted 2 deg. A paper pointed at or focused lifts 16 px out of the
  folder and stands upright over its neighbours; the folder's lip stays in front (220 ms; none under reduced motion).
- **Tablets** (1,100 px container and under): two fans, 4 + 3, the second fan in the folder.
- **Phones** (640 and under): the folder holds compact rows: tab chip (code) and title on one line, what the paper is
  (14 px), then the stamp slot holding the status (14 px; the "Status" caption is kept for screen readers only). The
  whole row is the link's target. A small fan of tab tops stands out of the folder above the rows, key tabs in flow.
  About 730 px for seven rows (1,066 px for the section with its heading on buying).
- **Motion** (`motion.js`): the folder settles, the papers fan out of one squared stack (Subframe "Archive folder",
  archive-folder, MIT), the codes print and each stamp slot is pressed in turn (Subframe "Activity stamp",
  activity-stamp, MIT). Phones: the tab tops fan up, the rows print, the stamps press. Under 2.5 s, once. The branch
  (phone or wide) and each paper's way to the stack are measured when the fan plays, not at set-up, so a container that
  crossed 640 px in between plays its own branch; until then the papers wait at opacity 0 (links stay in the tab order)
  and the stamp slots are blank. Nothing under reduced motion.
- **Tokens:** `limestone` (the folder), `surface-raised` (papers), `line-strong`, `ink`, `ink-muted` (descriptions and
  the "Status" caption: 6.4:1 on dimmed paper in dark), `flow`, `focus`, `shadow-overlay`, radii and spacing steps. PhoneKit is not used: every row is already one short,
  readable unit with nothing to pick or pin.
