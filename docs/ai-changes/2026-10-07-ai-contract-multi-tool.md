# AI 契约改为跨工具（非仅 Cursor）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-07 |
| 状态 | 已完成 |
| 关联 | 用户：不仅 Cursor，也要用其它主流 AI 工具 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

初版入口偏 Cursor（`.cursor/rules`）。实际会并行使用 Claude、Copilot、Gemini 等，需要单一真相源 + 各产品薄适配层。

## 决策

- 采用：`docs/AI契约-变更记录规范.md` 为 SSOT；`AGENTS.md` 为跨工具总入口；`CLAUDE.md` / `GEMINI.md` / `.github/copilot-instructions.md` / `.cursorrules` 只做指针。
- 不采用：在每个工具里复制完整细则（易分叉）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/AI契约-变更记录规范.md` | 增加 SSOT、各工具入口表、作者工具字段、换工具接手规则 |
| `AGENTS.md` | 改为全工具入口表述 |
| `CLAUDE.md` / `GEMINI.md` | 新建指针 |
| `.github/copilot-instructions.md` | 新建 Copilot 仓库指令 |
| `.cursorrules` | 兼容短指针 |
| `.cursor/rules/ai-change-log.mdc` | 标明为 Cursor 适配层 |
| `docs/ai-changes/TEMPLATE.md` | 增加「作者工具」 |
| `docs/ai-changes/README.md` | 索引本条 |

## 验证

- 文档-only；未跑产品测试。
- 抽查：各入口均链回契约与 `docs/ai-changes/`。

## 后续

- [ ] 若启用 Windsurf / Continue 等专用规则文件，只加短指针，不复制正文
- [ ] 用户可把 `AGENTS.md` 摘要贴进不读仓库文件的网页版自定义指令

## 给下一模型

1. 不论当前产品是什么，先读 `AGENTS.md` 与 `docs/ai-changes/README.md`
2. 改规则只改 `docs/AI契约-变更记录规范.md`，同步检查指针文件是否仍短小一致
3. 写变更记录时填写「作者工具」
4. 不要删除其它工具的入口文件，除非用户要求收拢
