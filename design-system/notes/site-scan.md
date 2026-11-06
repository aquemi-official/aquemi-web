# Site scan notes for Aquemi

Aquemi's own rules for the kit skill `studio-site-scan` (`.claude/skills/studio-site-scan/SKILL.md`), read through
`studio.config.json` `notes.site-scan`.

## Whom we compare with

Makers and integrators of Purified Water systems for pharmaceutical, biotech, medical device, natural health product,
cosmetics and hospital or lab users, and the large water-treatment groups that sell into the same plants. Pass 10 of the
site drew on a 73-site competitor study (page history, checkpoint "Pass 10: copy and audience"). Scan a handful at a
time (`--max 30`), and keep findings in `research/scans/<site>/findings.md`.

## What we take, what we never take

- Take: how sites order a buyer's questions, which pages a sitemap gives each industry or system, the words engineers,
  validation leads and QA managers use (standards by name, units), how calls to action are worded and placed.
- Never take: sentences, figures, certifications, client names, case results or claims. A number on our site is a
  number Aquemi has confirmed; anything else is a `[placeholder]` (brand book, Placeholder component).
- Aquemi offers modular polypropylene Purified Water packages only, built in Ontario. Competitors' stainless,
  Water for Injection, pure steam and orbital-welding pages are context, not a gap for us to fill.
- Copy changes go into `content/pages/NN-<id>.json`, in the brand voice (`design-system/README.md`, "Content
  fundamentals"), then `python tools/specimens.py snapshot` and `python studio/studio.py refresh`.
