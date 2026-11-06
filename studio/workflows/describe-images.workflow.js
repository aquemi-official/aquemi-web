export const meta = {
  name: 'describe-images',
  description: 'Image to text over a set of images: per-image keywords and a reusable prompt, then a refreshed style atlas',
  phases: [{ title: 'Describe', detail: 'one agent per ~11 images, writes one JSON per image' }, { title: 'Synthesize', detail: 'keyword counts, style families, brand core, prompt kit' }],
}
// Studio kit workflow. Run from the project root (needs the user's opt-in to workflows):
//   Workflow({scriptPath: "studio/workflows/describe-images.workflow.js", args: {
//     files: ["12-hero.png", ...],                    // file names inside dir (new images only; described ones keep their JSON)
//     dir: "<absolute path of the image folder>",     // studio.config.json data.concepts, absolute
//     out: "<absolute path of the atlas folder>",     // studio.config.json data.atlas, absolute
//     project: "<project name>", brand: {summary, voice, offer, never, book}, // studio.config.json project.name and brand
//     context: "<optional: where to find what each image was prompted for>",
//     synthesize: true                                 // false: only describe
//   }})
// Without workflows, do the same by hand or with one subagent per ~11 images (studio-image-loop skill).
const A = Array.isArray(args) ? { files: args } : args
const files = A.files || []
const DIR = A.dir, OUT = A.out
if (!DIR || !OUT || !files.length) throw new Error('args need files, dir and out (absolute paths; see the header of this file)')
const PROJECT = A.project || 'the website'
const B = A.brand || {}
const BRAND = [B.summary, B.voice && ('Voice: ' + B.voice), B.offer && ('Offer: ' + B.offer), (B.never || []).length && ('Never: ' + B.never.join('; ')), B.book && ('Brand book: ' + B.book)].filter(Boolean).join('\n')
const groups = []
for (let i = 0; i < files.length; i += 11) groups.push(files.slice(i, i + 11))

const SCHEMA_TEXT = `{
 "file": "<file name>",
 "prompted_for": "<what the image was asked to be, from the README tables or research/pass9/sections.json; '' if unknown>",
 "section_kind": "<hero | process diagram | spec/limits | router | steps/timeline | documents | options | standards | FAQ | form | closing | footer | nav | case study | equipment drawing | icon/spot sheet | whole page | other>",
 "style_family": "<2-4 words naming its visual family, e.g. 'blueprint line art', 'editorial oversized type', 'soft 3D product render'>",
 "art_direction": ["<3-6 tags>"],
 "composition": ["<layout and composition traits>"],
 "layout_devices": ["<concrete devices: leader-line callouts, sticky visual, staircase cards, orbit rings, pipe route linking items...>"],
 "palette": ["<colours as seen, with role: 'deep navy ground', 'off-white sheet', 'single blue accent line'...>"],
 "typography": ["<type traits: light condensed caps, mono figures, oversized cropped numerals...>"],
 "rendering": ["<medium: flat vector, 1.5px line art, isometric, soft 3D render, paper cut-out, photo-real macro...>"],
 "line_and_texture": ["<stroke weight, grids, hatching, dot grids, paper grain, shadows...>"],
 "motifs": ["<recurring objects/ideas: water drop, pipe, tank, stamp, title block, gauge...>"],
 "ui_patterns": ["<web UI patterns visible: tabs, accordion, tiles, hotspots, progress rail...>"],
 "motion_implied": ["<what would animate: water travels pipe, gauge sweeps...>"],
 "mood": ["<3-5 adjectives>"],
 "t2i_keywords": ["<25-40 short text-to-image keyword phrases, most important first, the vocabulary an image model would need to reproduce this look (style, medium, composition, palette, lighting, detail); model-agnostic; no brand names>"],
 "t2i_prompt": "<a 70-120 word text-to-image prompt that would regenerate this look for a new section, content-neutral (use <CONTENT> where the section's content goes)>",
 "signature_idea": "<one sentence: the memorable idea>",
 "strengths": ["<what works for this site and its readers>"],
 "weaknesses": ["<what fails: clutter, illegible, cliché, off-brand...>"],
 "brand_fit": <1-5>,
 "brand_fit_why": "<one line against the brand given below>"
}`

phase('Describe')
const described = await parallel(groups.map((g, gi) => () => agent(
  `Image-to-text for the ${PROJECT} design study. Look at each of these images (one at a time, with the Read tool; they are concepts, references, drawings or screens made or collected for the ${PROJECT} website):\n` +
  g.map(f => `- ${DIR}/${f}`).join('\n') +
  `\n\nThe brand, to score brand_fit against:\n${BRAND || '(no brand summary given: score against a calm, precise, professional site)'}\n` +
  (A.context ? `\nContext for 'prompted_for': ${A.context}\n` : '') +
  `\nFor EACH image write ${OUT}/images/<file name without extension>.json (UTF-8, valid JSON) with exactly this shape:\n${SCHEMA_TEXT}\n` +
  `Be concrete and visual; describe what is actually in the image, not what it should be. Ignore invented text in the image except to note typography. t2i_keywords must be reusable generation vocabulary (e.g. 'isometric line drawing', 'hairline 1.5 px strokes', 'deep navy background', 'oversized cropped numerals', 'soft studio lighting', 'leader-line callouts', 'generous negative space'). Create the images/ folder if missing. Do not edit any other file. Return a one-line summary per image: file | style_family | brand_fit.`,
  { label: `describe:${gi + 1}`, phase: 'Describe' })))
log(`described ${described.filter(Boolean).length}/${groups.length} groups`)

if (A.synthesize === false) return { described: described.filter(Boolean).length }
phase('Synthesize')
const atlas = await agent(
  `You are the style analyst for the ${PROJECT} website design study. Every image described so far has a JSON description in ${OUT}/images/*.json (schema: style_family, art_direction, composition, layout_devices, palette, typography, rendering, line_and_texture, motifs, ui_patterns, motion_implied, mood, t2i_keywords, t2i_prompt, signature_idea, strengths, weaknesses, brand_fit). The images are in ${DIR}. The brand:\n${BRAND || '(none given)'}\n\n` +
  `1. Run \`python studio/studio.py atlas\` from the project root (it counts keywords, families and what scored or failed into ${OUT}/atlas.json) and read its output; add your own analysis script only if the counts miss something.\n` +
  `2. Write or update ${OUT}/STYLE-ATLAS.md, for designers and future prompt writing, concise and specific (tables welcome): corpus and method; the brand core (traits across most images, with counts); style families (6-10: defining keywords, 3-5 exemplar files, good for which sections, risks, average brand_fit); unique one-offs worth keeping; intersections and 4-6 hybrid directions to generate next; recurring layout devices and motion ideas; anti-patterns and the negative keywords; toward unification (2-3 directions and a recommendation).\n` +
  `3. Write or update the prompt kit (the path in studio.config.json data.prompt_kit) as JSON: {"_about", "pre": base block (brand core in t2i vocabulary, what to draw), "suf": quality bar + negative keywords, "directions": [one module per family or hybrid, 1-2 lines each], "skip_types": [section types not worth an image], "seed": 9}. Keep any keys already there that you do not replace.\n` +
  `Never invent images or counts; cite file names. Return a 10-line summary of the findings.`,
  { label: 'synthesize', phase: 'Synthesize' })
return { described: described.filter(Boolean).length, atlas }
