---
name: studio-image-loop
description: Image to text to image for website design. Describe generated or reference images as text-to-image keywords and reusable prompts, aggregate them into the style atlas (families, brand core, what scored, anti-patterns, prompt kit), write one image prompt per site section from the kit, generate concepts in Gemini through Claude in Chrome, and keep every image in the media gallery. Use when asked to analyse the images we have made, find the visual style or keywords, refresh the style atlas, write image prompts for sections, generate new concepts, or "run the image loop".
---

# Image loop: image → text → image

Three stages that run alone or as a loop. Paths come from `studio.config.json` `data`: `concepts` (generated originals), `atlas` (descriptions, STYLE-ATLAS.md, atlas.json), `prompt_kit`, `gallery`. **Read the project's notes first** (`notes["image-loop"]` in the config, if set): they hold this project's rules, naming and history, and they win over this file.

| What | Where |
| --- | --- |
| One JSON description per image | `<data.atlas>/images/<image name>.json` (schema `studio/schemas/image-description.schema.json`) |
| Counts, families, what scored and failed | `python studio/studio.py atlas` → `<data.atlas>/atlas.json`; viewer `studio/web/atlas.html` |
| The atlas text and the prompt kit | `<data.atlas>/STYLE-ATLAS.md`, `<data.prompt_kit>` (`pre`, `suf`, `directions`, `skip_types`, `seed`) |
| Section prompts | `python studio/studio.py prompts <queue.json> [page ids]` |
| Gemini helpers and capture | `studio/tools/image-loop/gemini-helpers.js`, `save_capture.py` |
| Describe workflow (fan-out, then synthesis) | `studio/workflows/describe-images.workflow.js` |

## 1. Image → text (describe)

New images only; described ones keep their JSON. With the user's opt-in to workflows: `Workflow({scriptPath: "studio/workflows/describe-images.workflow.js", args: {files: [...], dir: <abs data.concepts>, out: <abs data.atlas>, project: <project.name>, brand: <config brand>}})`. Without: read each image yourself (or one subagent per ~11 images) and write its JSON in the schema: style_family, art_direction, composition, layout_devices, palette, typography, rendering, line_and_texture, motifs, ui_patterns, motion_implied, mood, 25–40 `t2i_keywords`, a content-neutral `t2i_prompt` (with `<CONTENT>`), signature_idea, strengths, weaknesses, `brand_fit` 1–5 against `brand`. Describe what is there, not what it should be. Then `python studio/studio.py atlas`.

## 2. Text: read the atlas before prompting

Open the atlas viewer or `atlas.json`: the keywords that recur, the families, keywords that lean high-fit and low-fit. Keep `STYLE-ATLAS.md` current (brand core, families and their risks, hybrids to try, anti-patterns and negatives, unification options) and the prompt kit in step with it: `pre` = what to draw and the brand core, `directions` = one module per family or hybrid, `suf` = quality bar and negatives.

## 3. Text → image (generate)

1. `python studio/studio.py prompts <queue.json> [page ids]`: one item per section (`key`, `dir`, `mid`) from the site's own pages; directions rotate so neighbours differ. Hand-edit a `mid` for a section that deserves a specific idea.
2. Gemini through Claude in Chrome (gemini.google.com, model Pro; one tab): per image, open a new chat, set `window.PRE`/`window.SUF` from the kit, paste `gemini-helpers.js` in one `javascript_exec` (it stores itself in `localStorage`; reload it with the Trusted Types line in its header), `await nw(<mid>)`, wait 10 s ×4 + 8 s, `await cap()` (once more after 10 s if it returns `none`), zoom-capture the region it returns with `save_to_disk`, `ovx()`, then `python studio/tools/image-loop/save_capture.py <key> <png> <h> <data.concepts>`. Check the model picker says Pro once per run.
   - Do not download from the page or fetch blobs; never long JS waits. A quota message ends the run: build with what exists.
   - Judge each image as it lands: keep it when one clear visual idea explains the content; regenerate once (change a word) when it is generic.
3. Keep every image (name it in order, next number first), record what it was prompted for (the project's notes say where), `python studio/studio.py gallery`, then describe it (stage 1) so the atlas stays complete.

## Loop

generate → describe → `atlas` → read what scored and what failed → adjust the kit and the `mid`s → generate. Move one thing per turn: retire a family, try a hybrid, add a negative.

## Rules

- Images are ideas, never facts: never copy figures, standards, claims or logos from an image into the site.
- The brand's `never` list (config) applies to prompts and to judging images.
- Each image costs tokens to view: look once, at capture; use the JSON descriptions after that.
