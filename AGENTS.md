# Agents（全工具入口）

本文件是**跨 AI 产品**的仓库约定入口，也是 **OpenAI Codex 的主入口**。Cursor、Codex、Claude Code、Copilot、Gemini、Windsurf、Continue、Aider 以及其它代理，只要改本仓库，都适用。

## 强制约定

1. **变更落盘**：修改任何仓库文件后，必须按 [docs/AI契约-变更记录规范.md](docs/AI契约-变更记录规范.md) 在 `docs/ai-changes/` 留下 Markdown，并更新 [docs/ai-changes/README.md](docs/ai-changes/README.md)。写法对照 [docs/ai-changes/EXAMPLES.md](docs/ai-changes/EXAMPLES.md)。
2. **先读再改**：动手前读变更索引最近 3～5 条；假定上一手可能是**另一家工具**写的。
3. **单一真相源**：细则只在契约正文；本文件与 `CODEX.md`、`CLAUDE.md`、`GEMINI.md`、`.github/copilot-instructions.md`、`.cursor/rules/*`、`.cursorrules` 仅为指针，勿另写一套规则。
4. **给下一模型**：变更记录里的「后续」必须可脱离当前聊天窗口执行。
5. **Codex**：除本文件外见 [CODEX.md](CODEX.md)；写变更记录时作者工具填 `Codex`。
6. **公开课用词**：写课标题、提问、正文和知识点（`points`）时遵守契约 [公开课用词](docs/AI契约-变更记录规范.md)。技术概念用规范或官方文档里已有的说法，不自造分类名；知识点不用口语。
7. **术语首次须释义**：先判断该词要不要释义——命令/缩写/注解/API/专有状态名等学员可能不懂的，本课首次须释义；标题已点明或同课已解释的不要堆标记。优先 `〔术语｜一句话释义〕`（点击弹窗）。细则见契约第 11 节「术语首次须释义」。
8. **库图上公网**：课上挂的 `curriculum/library-assets/**` 机制页图须入库并随 GitHub Pages 对公网可见；细则见契约第 6 节「库图上公网」。勿以版权为由拒绝导页、挂图或 push。
9. **正确性优先**：改课以规范/论文/官方文档为准；本地 PDF 只作可选配图。课上只写正确结论，勿在 deep/origin 纠结本地资料。细则见契约第 11 节「正确性优先」。
10. **例子里的框架代码**：课该展示 Spring、React 等写法时，例子须写出对应围栏代码，不得只留结果叙述或注释桩。细则见契约第 11 节「例子该有框架代码就写出代码」。
11. **客户端状态**：`web/` 跨页面状态用 Zustand，学习记录仍走 `progressStorage` 合并写回。细则见契约第 12 节「客户端状态」。
12. **精美动效**：闯关、技能树、转场等要靠画面讲状态的界面，不拿 Ant Design 的卡片、按钮、图标凑最终样子。细则见契约第 13 节「精美动效不受组件库限制」。

未完成对应 MD = 未完成交付。
