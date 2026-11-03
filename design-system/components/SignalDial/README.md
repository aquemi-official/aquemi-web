SignalDial sets a spec block of signals as the instrument schedule (the real table) beside one multi-channel transmitter dial whose bezel turns to the chosen signal and reads it out: channel number large and light, the signal's name, a limit line, the design value and the basis on an outlined tag.

Look `signal-dial` (`assets/src/blocks/look-signal-dial.js`) on a `spec` block. Used on sys-monitoring, "Sensors and signals". Concept: `research/pass9b/concepts/sys-monitoring.2.png` (signals table beside a circular tick-dial readout). It replaced SensorLoop (pass 9).

- Markup: `div.aq-signal-dial` (grid: `table` left, `__fig` right) → `__fig` > `div.__dial` (`role="slider"`, `tabindex="0"`, `--sd-a` = bezel angle in degrees) holding `svg.__svg` (aria-hidden: `__rim`, `__rim2`, turning `g.__ring` of ticks `__tk` / `__tk--mid` / `__tk--stop[data-sd]` and stop numbers `__sn[data-sd]`, fixed `__fine` scale and `__index`) and `div.__read` (aria-hidden: `__ch`, `__num` > `__digits` + `__of`, `__name`, `__lim`, `__val`, `__tag`), then `p.__hint`. `table.__table` > `tr.__row[data-sd]` (`is-on` = chosen) > `th` > `button.__pick` (`aria-pressed`; `__n`, `__p`), `td.__v`, `td.__m` (+ `__go` link). `p.__note` after.
- Fields: `h`, `caption` (printed as the eyebrow, as SpecTable does), `cols`, `rows [{p, v, m, link, link_label, intent}]`, `note` (`fold`, `fold_noun` are no longer read: every row shows). The readout copies the chosen row's own cells; no copy lives in JS. Stops sit 24 degrees apart from 12 o'clock.
- Tokens: dial face `surface-raised` and `surface`, ticks `line-strong` / `ink`, chosen stop, index and limit line `flow`; the chosen row `flow-tint` with a `flow` bar. Channel number Geist Mono Light; table head mono caps `ink-subtle`.
- Behaviour (renderer, works without GSAP and under reduced motion): hover, click or focus a row turns the dial to it; the dial is a slider (drag 54 px a step, snaps on release; Arrow keys, Home, End), ported from Subframe Motion camera-wheel; the readout swaps like quote-tick (rises or drops 8 px from 0.2 opacity in 0.22 s). Under reduced motion the bezel jumps and the readout swaps without moving.
- Phones (pass 12, PhoneKit sticky figure; svc-service calibration and sys-monitoring sensors): the root carries
  `data-pk-sticky data-pk-bp="860" data-pk-h="160"`, the figure is the strip, each row `data-pk-row`. The strip shows
  the dial's top half (a 300 px dial, bezel numbers 12.75 px as seen) with only CH and the channel number at its
  centre (no name, value or basis on the face: the rows carry them). Every row shows (S7). The row on PhoneKit's
  reading line turns the dial (`pk:change` -> `set()`); each bezel stop is a 44 px tap target on a layer
  (`__bz > button.__chb`, aria-hidden, tabindex -1) that turns with the ring, and a tap scrolls its row to the reading
  line; the tapped row is held until the scroll ends (`scrollend`, 900 ms fallback) and re-aimed once without
  animation, so a section bar tucking mid-scroll cannot land it on a neighbour. The active tint is on the whole row
  under 860 px (no notch under the number column). Drag-to-turn is off while PhoneKit drives. The row's link is a 44 px outlined button. Reading text 14-15 px.
  Without JS: the 320 px dial over the whole table.
- Not for a long list of parameters with no single "instrument" reading (use SpecTable or ParamTiles).

Motion: the transmitter powers up: ticks come on round the bezel while it sweeps back from past the last channel to channel 01, the index drops, the channel number rolls up on the odometer (`m.count`), the limit line runs out and the readout and rows follow. Once, under 3 s.
