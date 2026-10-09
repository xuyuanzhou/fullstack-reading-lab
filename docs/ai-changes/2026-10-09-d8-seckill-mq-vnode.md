# D8 续抽：秒杀 MQ≠控库阀门；虚拟节点 32≠定律（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-leaky-zk-xmx-cache.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 53 页写 MQ 顶住即可控下单/扣库存；约第 100 页写虚拟节点通常设为 32 即均匀。首版 SVG 非 UTF-8，已用 Python 重写为合法 UTF-8（英文图注，避免编码损坏）。

## 决策

- 采用：`coverage-java-102.js`；挂「流量」。
- 不采用：不以 MQ 否定削峰；不以虚拟节点否定一致性哈希。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-102.js` | 2 课 |
| `curriculum/diagrams/*.svg` + `web/public/diagrams/` | UTF-8 图 |
| `scripts/curriculum.mjs` / `verify_content.mjs` / `legacy/index.html` | 接入 |
| 审计 / 队列 D90–D91 / 校订 / 交接 / README | 台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：859 节 / 2584 KP（前端 289 / Java 570）。

## 后续

- [x] 秒杀 MQ 阀门 / 虚拟节点 32 开课
- [ ] D8 其余页继续主题抽查（先 ls `coverage-java-103.js`）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 写 SVG 后必须 `Path.read_text(encoding='utf-8')`；中文图注易在工具链里损坏时可先英文
3. 空闲号先 ls；勿覆盖 java-56～102、frontend-26/27
4. 禁区：勿上传库原文；勿全文盖章 206 页
