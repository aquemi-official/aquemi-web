## The studio (development and design tooling)

This project uses the **studio kit** in `{kit}/`: page history, media gallery, style atlas (image → keywords → prompts), site scans (other sites' sitemaps, outlines and words), motion porting, and a studio bar on every draft page. The kit is generic; `studio.config.json` at the root says everything about this project (brand, where pages and data live, branches, what the live site is made of, its own tools and notes). The live site is released without any of it.

- Read `{kit}/README.md` before working on any tool. Claude Code skills: `studio` (the kit as a whole), `studio-image-loop`, `studio-motion`, `studio-site-scan`.
- `python {kit}/studio.py about` says which tool does what; `status` what a change made stale; `refresh` regenerates it all and runs the checks; `check` must report 0 problems before you push.
- Never edit generated files (a tool's `outputs`). Studio wiring in site pages stays between `<!-- studio: ... -->` and `<!-- /studio -->`. Edit kit files in `{kit}/`, then `python {kit}/studio.py install`.
