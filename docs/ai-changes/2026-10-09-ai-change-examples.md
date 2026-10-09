# 契约补充写法与代码示例

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：缺少代码示例 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

契约与模板只有字段表，没有可抄的完整样例、bash 流程和正反对照，其它工具上手成本高。

## 决策

- 采用：新增 `docs/ai-changes/EXAMPLES.md`；契约 §4 增加最小代码示例并链到 EXAMPLES；模板加指向。
- 不采用：把长示例复制进 `CLAUDE.md` / `CODEX.md` 等指针文件。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/ai-changes/EXAMPLES.md` | 新建：新建命令、完整 MD 样例、正反对照、贴代码规矩 |
| `docs/AI契约-变更记录规范.md` | SSOT 表增加 EXAMPLES；§4.1 最小代码示例 |
| `docs/ai-changes/TEMPLATE.md` | 链到 EXAMPLES；改动清单下可选代码注释 |
| `docs/ai-changes/README.md` | 索引与 EXAMPLES 入口 |

## 验证

- 文档-only；未跑产品测试。

## 后续

- [ ] 无；若示例过时，优先改 EXAMPLES，勿在各工具入口分叉

## 给下一模型

1. 写变更记录时打开 `docs/ai-changes/EXAMPLES.md` 对照
2. 贴代码 ≤15 行；整文件用路径引用
3. 细则仍以 `docs/AI契约-变更记录规范.md` 为准
