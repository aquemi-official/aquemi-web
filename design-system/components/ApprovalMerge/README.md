ApprovalMerge shows who prepares and who approves each request as lanes that merge into one approval: each request large on the left, its preparer a node on that party's lane, a wire from every node into one bus that ends in a single stamp naming the approver.

Look `approval-merge` (`assets/src/blocks/look-approval-merge.js`) on a `table` block with `as: "roles"` (request, prepared by, approved by). Used on svc-upgrades, "After a water observation or out-of-trend results". Concepts adapted: 48-concept-roles (who writes, who approves) and industries.0 (rows routed by lines into columns), set as light editorial type.

- Markup: `div.__top` (the section head and `p.__hero[aria-hidden]` with `__fig`, `__unit`), then `div.aq-approval-merge(.is-one)` > `__heads` (`__hk`, `__lane-h.is-ours|yours|shared`) + `__body` > `ol.__rows` > `li.__row[style=--lane,--lanes]` (`.aq-index`, `h3.__t`, `__lanes` > `__track`, `p.__prep.is-*` (`__k`, `__node`, `__who`, `__det`), `__wire`, `p.__appr` (`__k`, `__stamp`)) + `__bus` (`__busline`, `__big` with `__bigk`, `__bigv`).
- Fields: `h`, `intro`, `cols`, `rows`, `caption_noun`, `fold`, `anchor`. Parties as RoleMatrix reads them (`roleParty`); "Aquemi: detail" splits into party and detail. One bus only when every row names the same approver; otherwise each row ends in its own stamp. A figure with a time unit in the intro is echoed huge (aria-hidden).
- Tokens: Aquemi nodes and lane `flow`, your side rings `ink`, shared dashed; requests Geist 300 24 px; the stamp 2 px `ink` on `surface-raised`.
- Phones: rows stack (index, request, party and detail). With one approver (pass 12, audit svc-upgrades.0, S10) the
  merge stays as a right-edge approval rail: each request ends in a node on it (filled `flow`: Aquemi prepares; open
  `ink` ring: you or your consultant; dashed: shared), joined by a short wire from its party line; the rail runs on
  under the last request into the one "Approved by You" stamp. The per-row approver chips are dropped (each row's
  approver stays in the markup for screen readers). The wire (`__wire`) carries the node (`::after`) and its stretch
  of rail (`::before`, clipped to the row), so the rail is continuous whatever the rows' heights. A request that
  links has a 44 px hit box. With several approvers each row keeps its own chip, as before. Desktop unchanged.

Motion: the intro figure counts up, lanes run down, each request rises with its node landing and its wire running to the bus; the bus fills and the one stamp strikes. Once, about 3 s. Phones: rows rise in order, each node lands on the rail, the stamp strikes last. Hover (mouse, after the entrance) traces a request's route in ink: its wire (`__lit`), then the bus from that row to the stamp (`__buslit`), and the stamp presses 0.97; the trace fades a third faster on leave (port of Subframe Motion animated-beam).
