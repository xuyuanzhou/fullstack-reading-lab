# 补充 OpenAI Codex 入口

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-07 |
| 状态 | 已完成 |
| 关联 | 用户：codex 也需要 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

跨工具契约已覆盖 Cursor/Claude/Copilot/Gemini；需明确 Codex（默认读 `AGENTS.md`）。

## 决策

- 采用：`AGENTS.md` 标明为 Codex 主入口；新增短指针 `CODEX.md`；契约工具表增加 Codex 行。
- 不采用：把完整细则再抄进 `CODEX.md`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `CODEX.md` | 新建 Codex 指针 |
| `AGENTS.md` | 标明 Codex 主入口与作者工具写法 |
| `docs/AI契约-变更记录规范.md` | 工具表增加 Codex |
| `docs/ai-changes/TEMPLATE.md` | 作者工具选项含 Codex |
| `docs/ai-changes/README.md` | 索引本条 |

## 验证

- 文档-only。

## 后续

- [ ] 无；若 Codex 后续支持其它约定文件名，只加指针不复制正文

## 给下一模型

1. Codex 会话：先读 `AGENTS.md`，再读 `docs/ai-changes/README.md`
2. 变更记录作者工具填 `Codex`
3. 细则仍以 `docs/AI契约-变更记录规范.md` 为准
