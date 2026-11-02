CutoverSchedule sets how an upgrade runs as a schedule: each step a row with its bar on one shared, not-to-scale timeline, a hold diamond where someone signs, and your system's water line above, broken only at the step that names a planned shutdown.

Look `cutover-schedule` (`assets/src/blocks/look-cutover-schedule.js`) on a `steps` block with holds. Used on svc-upgrades, "How an upgrade runs". Concept adapted: services.1 (hold points as nodes on a line), set as a Gantt: downtime as a schedule.

- Markup: `div.aq-cutover-schedule` > `__lane` (`__lk`, `__ltrack` with `__water` segments and `__gap` (`__gl`)) + `ol.__rows` > `li.__row` (`is-cut`, `is-hold`) (`__n`, `__txt` (`h3.__t` with `a.__go`, `p.__d`, `p.__hold` with `__hk`), `__track[aria-hidden]` (`__grid`, `__bar` with `__diamond`)) + `p.__nts`.
- Fields: `h`, `items [{t, d, hold, link}]`, `ground`; new optional `lane` (the water line's drawing label). Every bar is the same length (the page gives no durations; "Not to scale" says so). The shutdown step is the first whose text names a shutdown; its words label the gap.
- Tokens: water `flow` 3 px; bars 1.5 px `ink` on `surface-raised`, the shutdown bar filled `ink`; hold stamp 1.5 px `ink` mono.
- Phones: each step's text over its track.

Motion: time runs left to right: the water line runs to the shutdown, the gap opens with its label, the line runs on; each bar grows as the line passes, its row rising; the hold diamond and stamp strike. Once, about 3.5 s. Hover tints a bar.
