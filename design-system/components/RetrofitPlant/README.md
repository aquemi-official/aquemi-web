RetrofitPlant shows common upgrades on the running plant the way a retrofit drawing does: the existing plant faint on a navy blueprint, the stages an upgrade changes lit, and the upgrades as a tab list with the picked one's terms beside it.

Look `retrofit-plant` (`assets/src/blocks/look-retrofit-plant.js`) on a `table` block with `as: "router"`. Used on svc-upgrades, "Common upgrades and their requalification". Concept adapted: compliance.3 (a cutaway whose highlighted part follows the active card), with the retrofit drawing convention (existing light, new bold). The plant is VisitPlan's scene (`vpPlant`) without the report.

- Markup: `section.aq-band--navy.aq-retrofit-plant-sec` > `div.aq-retrofit-plant` > `__sheet` (`svg.aq-iso.aq-iso--navy.__svg.is-retro[data-on]`, `p.__legend` with `__sw--old|--new`) + `__pick` (`__tabs[role=tablist]` > `button.__tab[role=tab][data-on]` (`__tn`, `__tt`); `__panels` > `div.__panel[role=tabpanel]` (`is-off`) with `__mfig` (`svg.__mini`), `h3.__pt`, `dl.__terms` > `__term--1..3`, `p.__go` (`__gk`, link)).
- Fields: `h`, `intro`, `cols`, `rows` (the last cell `{t, link}`); new optional `parts`: one entry per row naming the stage(s) it changes (pre, gen, tank, loop, uv, toc, panel).
- Camera: the sheet (1080 × 430) frames the picked upgrade: `g.__cam` (inside a clip to the sheet's inner frame) carries a CSS transform per row (computed from the stages' port bounds, zoom 1 to 2.3, clamped so the plant fills the width), written on each tab as `data-cam` and on the svg (`data-cam`, `data-cam0` = the whole plant). A key plan (`g.__key`: the plant again as `<use>`, `rect.__kwin` the camera's window, "KEY PLAN") sits bottom left. A row without parts shows the whole plant.
- Tokens: navy band with ink remapped to on-navy; existing parts at 28 % opacity, lit parts `flow` (IsoKit `is-lit`); upgrade names Geist 300 22 px; downtime set larger.
- Phones (pass 12, audit svc-upgrades.1, S10): the blueprint stays. The sheet renders 552 px wide and is cropped to
  the column round its centre, where the camera puts the picked upgrade; the key plan (scaled 1.3) is moved into the
  crop (`--ky` on `__key`). The tabs become one row of numbered 44 px chips (the names stay in the tabs for screen
  readers; the panel title names the upgrade); one panel, the picked one (terms stacked, start-with link 44 px).
  Picking a chip moves the camera and the key-plan window as on desktop. From 4,367 px (7 cards) to about 1,300 px.
- Keyboard: tabs move with the arrow keys, Home and End.

Motion: the whole plant is drawn and the water runs it once at full strength (IsoKit, `keep: true`), then the plant drops to "existing", the sheet moves in on the picked upgrade (0.9 s CSS transition, key-plan window with it) and its stages light; the tabs and the panel rise. Once, under 5 s. Picking another upgrade fades the sheet over and moves the camera (CSS; none under reduced motion).
