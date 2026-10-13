# Outbox 课：短名、双写括注与至少一次收口

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `distributed-outbox` 审查后落地 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

短名只剩「事务消息与 Outbox」；缺 promptAnswer 与双写/Outbox 括注；答案未分条；keywords「事务消息」易与中间件事务消息混淆；origin 纠结本地 PDF。

## 决策

- 采用：标题「Outbox 消除双写空窗」；补 promptAnswer（有 Outbox 行 vs 从未写入）；括注双写与至少一次；自绘 SVG；去掉学员面 origin；refs 加 microservices.io；链幂等课。
- 不采用：课上展开本地资料元讨论。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/distributed-lessons.js` | Outbox 课正文 |
| `curriculum/diagrams/distributed-outbox.svg` | 机制图 |
| `web/public/diagrams/distributed-outbox.svg` | 同步 |
| `curriculum/example-code-blocks.js` / `knowledge-points.js` / `learningPaths.ts` | 对齐 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过（1056 / 3176）

## 后续

- [ ] 浏览器打开本课扫一眼短名与图

## 给下一模型

1. 先读：本文 + 契约第 11 节「正确性优先」
2. 再读：`curriculum/distributed-lessons.js` 中 `distributed-outbox`
3. 若续作：勾选「后续」
4. 禁区：勿写回「事务消息」当 Outbox 同义词；勿声称 Outbox=恰好一次
