---
name: image-prompt-loop
description: Image to text to image for Aquemi design work. Describe generated or reference images as text-to-image keywords and prompts, aggregate them into the style atlas (families, brand core, anti-patterns, prompt kit), then write new section prompts from the kit and generate concepts in Gemini through Claude in Chrome by editing the chat's first prompt. Use when someone asks to analyse the images we have made, find our visual style or keywords, refresh the style atlas, write image prompts for site sections, generate new Gemini concepts, or "run the image loop".
---

# Image prompt loop: image → text → image

Three stages that can run alone or as a loop. Everything lives in this repo:

| What | Where |
| --- | --- |
| Every Gemini original, numbered oldest first | `design-system/inspiration/gemini/NN-<kind>-<subject>.png` (+ README tables saying what each was prompted for) |
| One JSON description per image (image → text) | `design-system/inspiration/style-atlas/images/<image>.json` |
| Aggregation (re-runnable, stdlib) and its output | `design-system/inspiration/style-atlas/aggregate.py` → `keywords.json` |
| The atlas: brand core, families, intersections, anti-patterns, prompt kit, unification options | `design-system/inspiration/style-atlas/STYLE-ATLAS.md` |
| Prompt kit as data (base, art-direction modules, negatives) | `tools/kit.json` (next to this file) |
| Section prompts from page files | `tools/section_prompts.py` |
| Gemini helpers (edit-first-prompt, capture) | `tools/gemini-helpers.js` |
| Describe workflow (fan-out image → text, then synthesis) | `tools/describe.workflow.js` |

## 1. Image → text (describe)

For new images (or the whole set), run the describe workflow with the file names as `args` (an array):
`Workflow({scriptPath: ".claude/skills/image-prompt-loop/tools/describe.workflow.js", args: ["95-....png", ...]})`.
It needs the user's opt-in to a workflow; without one, do the same by hand or with one subagent per ~11 images:
Read each image and write `style-atlas/images/<name>.json` in the schema in the script (`SCHEMA_TEXT`: style_family,
art_direction, composition, layout_devices, palette, typography, rendering, line_and_texture, motifs, ui_patterns,
motion_implied, mood, 25–40 `t2i_keywords`, a content-neutral `t2i_prompt`, signature_idea, strengths, weaknesses,
brand_fit 1–5). Describe what is in the image, not what it should be. The synthesis agent then re-runs
`aggregate.py` over ALL JSONs and rewrites `STYLE-ATLAS.md`. Already-described images keep their JSON; only pass new ones.

## 2. Text: read the atlas before prompting

`STYLE-ATLAS.md` §2 (brand core), §3 (families and their risks), §5 (intersections and hybrids to try next), §7
(anti-patterns and the negative keywords), §8 (prompt kit), §9 (unification options and the recommendation). When the
atlas changes, update `tools/kit.json` (`pre` = base block, `directions` = style modules, `suf` = quality bar +
negatives) so new prompts follow it.

## 3. Text → image (generate in Gemini)

1. Prompts: `python tools/section_prompts.py tools/kit.json <queue.json> [page ids]` writes one item per section
   (`key`, `dir`, `mid`). Art directions rotate in shuffled rounds so neighbours differ. Hand-edit a `mid` when a
   section deserves a specific idea (e.g. a hybrid from atlas §5).
2. Gemini (gemini.google.com, model Pro, through Claude in Chrome; one tab, the only tab in the group):
   - Send the first prompt by typing it (any section), so the chat has one user message.
   - Set `window.PRE`/`window.SUF` from `kit.json`, then paste `tools/gemini-helpers.js` into one `javascript_exec`.
     It stores the helpers in `localStorage.p9`.
   - Per image, one `browser_batch`: load helpers if missing
     (`eval(trustedTypes.createPolicy('p'+Date.now(),{createScript:s=>s}).createScript(localStorage.p9))` — plain
     eval is blocked), `await go(<mid>)`, `computer wait` 10 s ×4 + 8 s, `navigate` to the chat URL (a reload: after a
     generation, screenshots of the tab often freeze), wait for `model-response img`, load helpers, `await cap()`,
     `computer zoom` region `[0,0,w*0.6125,h*0.6125]` with `save_to_disk:true, scale:1`, `ovx()`. Then
     `python tools/save_capture.py <key> <saved png> <h> <out dir>` (crops to the real height; keeps earlier takes as
     `.vN`). Gemini returns 1024 px wide images of varying height (572–718).
   - **Current interface (since 2026-11-01): one fresh chat per image, no reload.** Saved chats now often reload
     blank after a generation, so the edit-and-reload loop above breaks. Per image instead: `navigate`
     `https://gemini.google.com/app` (a new chat, context-free by construction), load helpers, `await nw(<mid>)`,
     wait 10 s ×4 + 8 s, then without reloading `await cap()` (if it returns 'none', wait 10 s and call it once more),
     zoom-save, `ovx()`, `save_capture.py`. Each image leaves one chat in the history; that is fine. Check once per run
     that the model picker says Pro: it falls back to Flash-Lite between sessions. Tall images (over ~720 px) need a
     taller zoom region than the previous capture: use the `cap()` numbers every time.
   - Editing the first prompt each time gives a fresh, context-free generation (earlier images do not steer it).
     To regenerate the same prompt, change a word (" Take 2."): identical text leaves Update disabled.
   - Do not download images from the page (the second automatic download raises Chrome's multiple-downloads prompt
     and freezes the tab); do not fetch blobs (CSP); never long JS waits (they freeze the tab).
   - Quota: the reply "I can create more images as soon as your limit resets" ends the run; the model menu shows the
     reset time per model (all models share it). Stop and build with what exists.
   - Judge each image as it lands: keep it when one clear visual idea explains the content; regenerate once when it is
     generic (text over wallpaper, stacked boxes, plain table) or fell back to blueprint against its direction.
3. Keep every image: copy to `design-system/inspiration/gemini/NN-<kind>-<subject>.png` (next numbers), add rows to
   the README table (what it was prompted for, the idea), run `python tools/gallery.py`, then describe them (stage 1)
   so the atlas stays complete.
4. Make it readable: `python tools/research.py` rewrites `research.html` (the Design research page on the site: every
   concept beside the section it became, every description, the themes, atlas, build notes and this skill) and copies
   the pass's text records from `../research/pass9*` into the repo's `research/`. Run it after each of stages 1 and 3.

## Loop

generate (3) → describe (1) → re-aggregate → read what scored and what failed (2) → adjust `kit.json` and the
`mid`s → generate. Each turn of the loop should move one thing: a family to retire, a hybrid to try, a negative to add.

## Rules

- Images are ideas, never facts: never copy figures, standards, claims or logos out of an image into the site.
- Aquemi offers polypropylene Purified Water packages only: prompts and judgements reject stainless, WFI, pure steam,
  stills and orbital welding (atlas §7: 30 images went off-offer).
- Screenshots and image views cost tokens: view each generated image once, at capture; use the JSON descriptions for
  everything after.
