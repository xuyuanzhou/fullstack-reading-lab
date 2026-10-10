# 修复：补回 `fe-pick-decision-order` 并挂回 OUTLINE

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | loadCurriculum 断言失败；并行改 OUTLINE 时课体缺失 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`fe-pick-decision-order` 仍被 `fe-pick-by-surface` 与 PATH_LEAD 引用，但课体不在 coverage，OUTLINE「怎么选」也曾被去掉该 id，导致导出/校验失败。

## 决策

- 采用：在 `coverage-frontend-20.js` 补回三步顺序课；OUTLINE 挂回「怎么选」首位。
- 不采用：不删引用改成纯文字（保持可点课链）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 新增 `fe-pick-decision-order` |
| `scripts/curriculum.mjs` | OUTLINE 恢复 |
| `curriculum/diagrams/fe-pick-decision-order.svg` 等 4 张 | 中文被写成非法字节，重写成合法 UTF-8，并同步 `web/public/diagrams/` |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```
