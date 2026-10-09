# Agents（全工具入口）

本文件是**跨 AI 产品**的仓库约定入口，也是 **OpenAI Codex 的主入口**。Cursor、Codex、Claude Code、Copilot、Gemini、Windsurf、Continue、Aider 以及其它代理，只要改本仓库，都适用。

## 强制约定

1. **变更落盘**：修改任何仓库文件后，必须按 [docs/AI契约-变更记录规范.md](docs/AI契约-变更记录规范.md) 在 `docs/ai-changes/` 留下 Markdown，并更新 [docs/ai-changes/README.md](docs/ai-changes/README.md)。写法对照 [docs/ai-changes/EXAMPLES.md](docs/ai-changes/EXAMPLES.md)。
2. **先读再改**：动手前读变更索引最近 3～5 条；假定上一手可能是**另一家工具**写的。
3. **单一真相源**：细则只在契约正文；本文件与 `CODEX.md`、`CLAUDE.md`、`GEMINI.md`、`.github/copilot-instructions.md`、`.cursor/rules/*`、`.cursorrules` 仅为指针，勿另写一套规则。
4. **给下一模型**：变更记录里的「后续」必须可脱离当前聊天窗口执行。
5. **Codex**：除本文件外见 [CODEX.md](CODEX.md)；写变更记录时作者工具填 `Codex`。

未完成对应 MD = 未完成交付。
