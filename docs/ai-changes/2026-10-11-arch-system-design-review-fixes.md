# 系统设计章审查：释义、收薄、答案分条与同步图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | 系统设计章审查；用户确认「需要」落地 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查系统设计章后：缺 promptAnswer / 首次术语释义；`cache` / `idempotency` 与专课重复；若干参考答案未分条；`arch-sync-vs-async` 缺图；导论未明确指向分布式章。

## 决策

- 采用：在课上补 promptAnswer 与括注（模块化单体、SLI/SLO、编排/协同、聚合）；通用能力课收薄并链 `cache-aside-steps` / `cache-db-double-write-race` / `distributed-idempotent-key`；答案分条；新增 `diagrams/arch-sync-async.svg`；`arch-chapter-aim` 指向分布式与高并发章。
- 不采用：重写整章大纲；在系统设计章展开 Outbox/CAP。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-122.js` | `arch-chapter-aim` 指向分布式章；答案分条 |
| `curriculum/coverage-path-07.js` | 单体/演进/水平扩展/微服务：释义、promptAnswer、答案分条 |
| `curriculum/coverage-path-08.js` | 同步异步 + 模块边界：释义、图、答案分条 |
| `curriculum/coverage-core-16.js` | SLO：SLI/SLO 括注、promptAnswer、答案分条 |
| `curriculum/coverage-path-10.js` | `arch-design-one-path`：promptAnswer、链旁路课 |
| `curriculum/coverage-path-11.js` | 聚合括注与 deep；答案分条 |
| `curriculum/lessons.js` | `cache` / `idempotency` 收薄并链专课 |
| `curriculum/coverage-path-06.js` | `idempotency` rewrite 对齐收薄；复制 promptAnswer |
| `curriculum/coverage-path-04.js` | cache deep 链旁路课 |
| `curriculum/knowledge-points.js` | cache / idempotency 要点对齐 |
| `curriculum/diagrams/arch-sync-async.svg` | 同步 vs 异步机制图 |
| `curriculum/answer-diagrams.js` | `arch-sync-vs-async` 答案箭头图 |
| `web/src/data/curriculum*.json` / `web/public/diagrams/` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过（现 1056 课 / 3176 知识点；含 `arch-soa-classic`）

## 后续补记（同日）

- 「拆分课」改为明确课 id：`arch-monolith-when` → `arch-microservice-split`；另清 `coverage-java-77/86` 与业务分库图中的同名含糊说法。
- `arch-monolith-when` 示例第三行「边界已破，再谈拆」改为：先收成模块 API，边界清干净再评估拆服务。
- `arch-modular-boundary`：参考答案与示例补五条过关标准、红绿灯；提问答案仍短列五条。
- 同课：「自有的表与迁移」补首次释义（表归属 + Flyway/Liquibase 类脚本归属）。
- `arch-scale-before-split`：水平扩展/无状态/会话外置/拐点释义；写清副本放大连接；链分片与限流课 id；新增 `arch-scale-out.svg` 与答案图。
- `arch-evolution-stages`：改为「容量线 + 服务化线」完整谱系（含垂直扩展、集群、经典 SOA、微服务），链 `split-vs-cluster` 与 SOA 分叉课；重绘演进图；标题同步。
- 演进图补水平扩展站拓扑（负载均衡/应用集群/缓存/文件/主从）；`arch-scale-before-split` 挂精绘 `arch-cluster-topology.svg`。
- 新增目录课 `arch-soa-classic`（夹在水平扩展与微服务之间），侧栏可见；附图 `arch-soa.svg`；README 课数 1056 / 3176。
- `microservices-not-just-soa-relabel`：按 Fowler 标准重写五条对照；不再以 PDF「本质还是 SOA」为纲；换挂 `soa-vs-microservices.svg`。
- 架构师主线关卡 4 必读插入 `arch-soa-classic`（`learningPaths.ts` + `docs/架构师主线设计.md`）；关卡 5 演进 job 文案对齐两条线。
- `arch-scale-before-split` 标题改为「瓶颈在应用再水平扩展，再谈拆服务」，避免短名「先水平扩展」被读成无条件加副本。
- `arch-microservice-split`：标题改为「按业务能力拆微服务，并接受分布式成本」（短名不再只剩「微服务」）；业务能力/数据归属/补偿括注；练习改为①②必写、有副作用才强制③；示例与图脚注对齐下单课「同步预留 + 异步履约 + 补偿」；keywords 去掉「分布式事务」；deep 链 `arch-sync-vs-async` / `mq-what-and-when`；主线 job 补分布式成本。
- `arch-sync-vs-async`：标题改为「同步异步怎么选，兼谈编排与协同」（短名不再只剩「服务间通信」）；正文点明 Saga 与编排/协同；练习加多步流程标编排或协同；答案与答案图补对照；重绘 `arch-sync-async.svg`；deep 链下单/消息课；Feign 改为同步客户端；`arch-modular-boundary` deep 去掉错误的「下一课」说法。

## 后续

- [ ] 浏览器打开 `arch-sync-vs-async`、`cache`、`idempotency`、`arch-chapter-aim` 扫一眼排版
- [x] 「拆分课」改成课 id
- [ ] 勿在系统设计章再展开 Outbox/CAP（已指分布式章）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：上述 coverage / lessons 路径
3. 若续作：勾选「后续」未完成项；改课源后必须再 export + verify
4. 禁区：勿把分布式章内容搬回系统设计章当正文复述
