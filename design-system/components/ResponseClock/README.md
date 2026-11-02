ResponseClock tells what happens when something goes wrong as a response clock: a large stopwatch dial with one numbered station per step around its rim, a running arc from the step that starts the clock, and the steps listed beside it with huge light numbers.

Look `response-clock` (`assets/src/blocks/look-response-clock.js`) on a `steps` block without holds. Used on svc-service, "When something goes wrong". Concept adapted: services.1 (nodes on one line with stage callouts) bent round a dial, with the atlas's light numerals.

- Markup: `section.aq-band--navy.aq-response-clock-sec` > `div.aq-response-clock` > `__fig` (`svg.__dial`: `__crown`, `__btn`, `__case`, `__face`, `__ticks`, `__track`, `__run`, `g.__st[data-i]` (`is-start`), `g.__hand` turned by `--a`) + `ol.__steps` > `li.__step[data-i][data-a]` (`__n`, `__body` with `h3.__t` (`a.__go`), `p.__d`).
- Fields: `h`, `intro`, `items [{t, d, link}]`. Stations sit from twelve o'clock clockwise over 300°. The step whose text names the clock starts the dashed arc; the arc marks no end, because no time is given.
- Tokens: navy band, ink remapped to on-navy, face 5 % on-navy, the arc a lightened `flow`, hand and pointed station `limestone`.
- Phones: the dial (72 % wide) above the list.

Motion: the case draws, the ticks turn in, then the hand sweeps once from twelve through every station; each station strikes and its step rises as the hand arrives; at the start step the running arc appears; the hand comes to rest there. Once, about 3.5 s. Pointing at or focusing a step turns the hand to its station.
