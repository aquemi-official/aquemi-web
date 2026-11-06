@AGENTS.md

## Claude Code specifics

- For anything about the development tooling as a whole (which tool does what, refreshing tool data, checks, page history, the studio bar, releasing the live site without the tooling, adding a tool, promoting dev → staging → main), use the `studio` skill. The tooling is the portable studio kit in `studio/` (guide: `studio/README.md`); Aquemi's settings for it are `studio.config.json`.
- For any design-system work (tokens, components, the guide, or publishing to the Claude design system), use the `aquemi-design-system` skill in `.claude/skills/`.
- When a design-system change is committed, offer to publish it to the Claude design system at https://claude.ai/artifact/Qk92oQ4PLCDVzKjaixEmDc so Claude chats, decks and designs stay in step with the repo.
- When designing anything for Aquemi outside this repo (a deck, a mock-up, a one-pager), build it from the Claude design system above rather than inventing a style.
- For image work (analysing the images we have made, the style atlas, writing image prompts, generating Gemini concepts), use the `studio-image-loop` skill; Aquemi's rules for it are `design-system/notes/image-loop.md`.
- For motion (animations, hover and press effects, scroll stories, shaders), use the `studio-motion` skill: it searches the Subframe Motion library (MCP server `subframe-motion` in `.mcp.json`); Aquemi's stack, rules and every port so far are in `design-system/notes/motion.md`.
- For studying other sites (competitors' sitemaps, page structures, their words and calls to action) and adapting our sitemap and copy, use the `studio-site-scan` skill; Aquemi's rules are `design-system/notes/site-scan.md`.
- Kit skills (`studio*`) are installed copies of `studio/skills/`: edit them there, then `python studio/studio.py install`.
