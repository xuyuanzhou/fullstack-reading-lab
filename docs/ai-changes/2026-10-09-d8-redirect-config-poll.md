# D8 续抽：HTTP 302 LB 与配置中心盲轮询（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-seckill-client-cdn.md` 候选 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 93 页把 HTTP 重定向负载均衡写成“比较简单”；约第 202–205 页先推本地缓存定时轮询，再承认空跑，需拆成可核验说法。

## 决策

- 采用：`coverage-java-58.js` 两课；302 LB 挂分布式「流量」，配置中心挂 SCA「Nacos」旁。
- 不采用：不以 302 代替反代主入口；不以盲轮询代替 watch/推送；本刀暂不拆 MAC+线程可重入锁（约第 202 页，留给下一刀）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-58.js` | 2 课 |
| 图与 `scripts/curriculum.mjs`、`legacy/index.html`、`verify_content.mjs` | 接入 |
| 审计 / 队列 / 校订 / 交接 / README | 台账 D22–D23 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：752 课（前端 269 / Java 483），2263 知识点。

## 后续

- [x] HTTP 302 LB / 配置中心轮询开课
- [ ] D8 其余页继续主题抽查（候选：约第 202 页可重入锁 MAC+进程+线程 id）
- [ ] 下一空闲号先 ls：`coverage-java-59.js` / `coverage-frontend-32.js`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-58.js`、`mw-proxy-lb-gateway`、`sca-nacos-config`
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56
4. 禁区：勿上传库原文；勿全文盖章 206 页
