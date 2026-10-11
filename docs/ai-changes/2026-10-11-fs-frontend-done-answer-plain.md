# 前端收口课练习与参考答案改规范表述

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | `fs-frontend-done`；用户：参考答案不标准 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

参考答案用「算会」「还在不在」「对着源码现查」「能偷到」等口语，题干「盖住笔记」也不像验收标准。与契约「知识点/课上正文不用口语」不一致。

## 决策

- 采用：题干改为「不看笔记与实现源码」；答案改为六项编号清单，用语与 HTTP / Cookie / XSS 通行说法对齐。
- 不采用：改六项验收内容本身。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | `fs-frontend-done` 的 core / why / task / answer |
| `curriculum/answer-walkthrough.js` | 同步 answer |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
rg '下列六项均须能指出' web/src/data/curriculum-bodies-frontend.json
```

- 结果：导出含规范答案；无「盖住笔记」「对着源码现查」。

## 后续

- [ ] 其它课题干里的「还在不在」可分批改成「是否仍然存在 / 是否保留」
- [ ] 不要把「算会」「现查」写回参考答案

## 给下一模型

1. 先读：本文 + `fs-frontend-done` 的 `task` / `answer`
2. `answer-walkthrough.js` 与 coverage 源必须一致
