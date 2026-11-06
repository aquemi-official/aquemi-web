---
name: studio
description: Work with the studio, the kit of development and design tools beside this website (page history, media gallery, style atlas, site scans, the project's own tools, the studio bar on the draft site). Use when asked which tool or file does what, to refresh tool data after a change, to check or ship work, to look back through page versions or checkpoints, to release or preview the live site without the tooling, to change which published copies carry the studio, to add a tool, to set the kit up in a project, or to promote work between branches.
---

# Studio

The studio is a portable kit (the `studio/` folder) plus one project file, `studio.config.json` at the project root. The kit never names a project: everything about this site (name, brand, where its pages and data live, branches, what the live site is made of, its own extra tools and notes) is in the config. Read `studio/README.md` once; it is the full guide.

## Start of any task

1. Read `studio.config.json`: `project`, `brand` (book, voice, offer, never), `site.pages` (where the copy lives), `notes` (project rules per kit skill), `tools` (the project's own tools).
2. `python studio/studio.py about` lists every tool: what it is, when to use it, what it reads and writes, how to refresh it, its skill. Hand off to that skill: `studio-image-loop` (images, keywords, prompts, the atlas), `studio-motion` (animation), `studio-site-scan` (other sites, sitemaps, copy), or a project skill the config lists.

## After any change

1. Edit sources only. A tool's `outputs` are generated; never edit them by hand.
2. `python studio/studio.py status` names the tools whose sources changed after their outputs.
3. `python studio/studio.py refresh [tool ...]` runs the kit's generators (page index, WebP, gallery, atlas), then the project's own steps (config `refresh`), then the bar, then the project's checks (config `checks`) and `check`. It skips steps whose needs are missing (Pillow, a working folder) and says so; report skipped steps to the person you work for.
4. `python studio/studio.py check` must report 0 problems before you push. It proves the live site can be released without any studio file or broken link.

## Page history

- `python studio/studio.py history` stores every commit of the production branch (config `history.branch`) as content-addressed files and writes the index the viewer (`studio/web/history.html`) steps through. Run it on an up-to-date production branch after a release you want listed; it is heavy, so the non-production copies leave it out.
- Named checkpoints (about ten big moments) are config `history.checkpoints`: `{"commit", "title", "note"}`. Add one when a design pass lands.
- To answer "what did page X look like before Y": open the viewer at `#page=<id>`, step checkpoints, or use Compare. Without a browser: `git show <commit>:<file>`.

## Release and copies

- `release` in the config says which published copies carry the studio (`true`) and which are the live site (`false`). `live.keep` lists the only files the live site is made of. Studio wiring in site pages sits between `<!-- studio: ... -->` and `<!-- /studio -->`; the release cuts those blocks.
- `python studio/studio.py release <out>` writes the live site to a folder and fails on leftovers. The Pages workflow (`studio/templates/github/pages.yml`, copied into `.github/workflows/`) calls `assemble`, which also publishes `live/` (the released production branch) so it can be reviewed before the switch.
- Going live: review `live/`, set `"release": {"production": false}`, promote to production. The tooled copy then moves to `draft/`. Nothing is deleted.

## Add a tool

1. A page that reads generated data, with the studio block in its head (`<link rel="stylesheet" href="studio/web/studio.css">`, `<script defer src="studio/web/studio.js" data-tool="<id>"></script>`).
2. An entry in config `tools` (`id, name, page, what, when, sources, outputs, run, skill`, `ships: "studio"`), and a step in config `refresh` if it has a generator.
3. Generic enough for any site? Put it in the kit instead (`studio/kit.json`, `studio/web/`, `studio/lib/`) and never name the project there.
4. `python studio/studio.py build && python studio/studio.py check`.

## Set the kit up in another project

Copy the `studio/` folder to the project root, then `python studio/studio.py init` (writes a config from what it finds, adds the studio block to the site's pages, installs these skills, builds), `python studio/studio.py doctor`, review the config, `check`. After updating the kit folder later: `python studio/studio.py install`.

## Promote

Work on the work branch (config `branches.work`). Promote by pull request to review, then to production, with merge commits. The project's required checks must pass.
