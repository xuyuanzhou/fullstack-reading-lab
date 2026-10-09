# D8 续抽：秒杀控制 JS 与客户端门闩（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-delete-cdn.md` 候选 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 51 页声称开抢 JS「不会被 CDN 缓存」；约第 49–52 页一边 Disable 按钮、一边承认不能信客户端。需要拆成可核验说法。

## 决策

- 采用：`coverage-java-56.js` 两课，挂在分布式「流量」目录、秒杀课旁。
- 不采用：不否定静态大页上 CDN；不以客户端优化代替库存原子扣减。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-56.js` | 2 课 |
| 图与 `scripts/curriculum.mjs`、`legacy/index.html`、`verify_content.mjs` | 接入 |
| 审计 / 队列 / 校订 / 交接 / README | 台账 D20–D21；745 / 2242 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：745 课（前端 266 / Java 479），2242 知识点。

## 后续

- [x] 秒杀 JS / 客户端门闩开课
- [ ] D8 其余页继续主题抽查
- [x] 下一空闲号已由 W3CSchool 第二轮占用为 `coverage-java-57.js`；再下为 `coverage-java-58.js`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-56.js`、`distributed-seckill`
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27
4. 禁区：勿上传库原文；勿全文盖章 206 页
