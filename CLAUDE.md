@AGENTS.md

## Claude Code specifics

- For anything about the development tooling as a whole (which tool does what, refreshing tool data, checks, the studio bar, releasing the live site without the tooling, adding a tool, promoting dev → staging → main), use the `aquemi-studio` skill in `.claude/skills/`. `studio/manifest.json` is its registry and `studio/README.md` its guide.
- For any design-system work (tokens, components, the guide, or publishing to the Claude design system), use the `aquemi-design-system` skill in `.claude/skills/`.
- When a design-system change is committed, offer to publish it to the Claude design system at https://claude.ai/artifact/Qk92oQ4PLCDVzKjaixEmDc so Claude chats, decks and designs stay in step with the repo.
- When designing anything for Aquemi outside this repo (a deck, a mock-up, a one-pager), build it from the Claude design system above rather than inventing a style.
- For image work (analysing the images we have made, the style atlas, writing image prompts, generating Gemini concepts), use the `image-prompt-loop` skill in `.claude/skills/`.
- For motion (animations, hover and press effects, scroll stories, shaders), use the `motion-library` skill in `.claude/skills/`: it searches the Subframe Motion library (MCP server `subframe-motion` in `.mcp.json`) and ports examples to GSAP and tokens.
