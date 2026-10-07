# 建立 AI 变更落盘契约

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-07 |
| 状态 | 已完成 |
| 关联 | 用户要求：每次 AI 修改写入 MD，供后续大模型接力 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

仓库已有交接/审计类文档，但没有强制「每次改代码必须落盘」的入口；聊天记录无法被其他模型稳定消费。

## 决策

- 采用：`docs/ai-changes/` 为会话级变更主入口；详细规范见 `docs/AI契约-变更记录规范.md`。
- 后续已扩展为跨工具：见 [2026-10-07-ai-contract-multi-tool.md](2026-10-07-ai-contract-multi-tool.md)。
- 不采用：只写在 plan 文件、或只追加无限长的单一 CHANGELOG（难检索、易冲突）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/AI契约-变更记录规范.md` | 契约全文：何时写、写什么、续写规则、验收 |
| `docs/ai-changes/TEMPLATE.md` | 单条记录模板 |
| `docs/ai-changes/README.md` | 索引 |
| `docs/ai-changes/2026-10-07-*.md` | 本条 + 核心模型条目（示例） |
| `.cursor/rules/ai-change-log.mdc` | 常驻规则，指向契约 |
| `AGENTS.md` | 仓库入口，指向契约与索引 |

## 验证

- 文件已落盘；规则 `alwaysApply: true`。
- 未跑产品测试（文档-only）。

## 后续

- [ ] 后续每次有代码/课程改动，按契约追加条目并更新本目录 README
- [ ] 若契约条款调整，改规范文并再记一条

## 给下一模型

1. 先读 `docs/ai-changes/README.md` 与 `docs/AI契约-变更记录规范.md`
2. 有代码改动则任务结束前必须新增/更新 `docs/ai-changes/YYYY-MM-DD-*.md` 并更新索引
3. 课程专题长文仍可写 `docs/audits/` 等，但须在 ai-changes 留摘要链接
4. 不要删除本契约除非用户明确要求
