# 同一笔订单串起架构演进全流程

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | 系统设计 / 演进全流程 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

已有课把单体、集群、SOA、微服务拆成短概念，缺一条用同一笔订单走完容量线、服务化线、静态资源与分布式事务的连续讲解。

## 决策

- 采用：12 课放在 Java「系统设计 / 演进全流程」，从 `evo-order-through-stages` 起。每课一张 SVG。订单故事固定为创建、预留、支付、通知履约。
- 采用：集群写开源 Nginx 被动摘除与一次换一台；主从按 MySQL 8.4 半同步（等中继日志，超时退回异步）；TCC 按 Seata 文档，全局事务不覆盖支付等待。
- 不采用：把 CSDN 写成对象存储或 CDN。课上写明它是技术内容社区。源站对照七牛 Kodo、阿里云 OSS、腾讯云 COS、S3 + CloudFront。
- 不采用：把 Saga、TCC、本地消息表合成一种默认事务。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-13.js` | 12 课正文 |
| `curriculum/diagrams/evo-*.svg` | 12 张架构图 |
| `scripts/curriculum.mjs` | 注册脚本与「演进全流程」目录 |
| `curriculum/coverage-java-122.js`、`coverage-path-07.js` | 导论与演进谱系链到新系列 |
| `web/src/data/learningSkills.ts` | 技能挂上新课 id |
| `web/src/data/*`、`web/public/diagrams/evo-*.svg`、`legacy/publication-order.js` | 导出结果 |

## 验证

```bash
node --check curriculum/coverage-path-13.js
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：导出 1115 课；verify 通过；技能图测试通过。
- 浏览器：`/#/java/system-design/evo-order-through-stages` 可见总图与 12 课目录；CDN 课写出 CSDN 不是源站；下一课进入 SOA 课。

## 后续

- [ ] 不要把这 12 课再收成一课，也不要把 CSDN 改回「云存储」。
- [ ] 半同步细节以 MySQL 8.4 文档为准；不要写成「从库已能查到」。
- [x] 选择题已单独成「演进全流程」一门，见 [演进全流程单独一门选择题](2026-10-17-arch-evolution-drill.md)。不要改课上的选型结论，也不要并进关卡 8 的 Boss。

## 给下一模型

1. 先读本文，再读 `curriculum/coverage-path-13.js`。
2. 目录在 `scripts/curriculum.mjs` 的「演进全流程」。
3. 改课之后跑 `node scripts/export-curriculum.mjs` 与 `node scripts/verify_content.mjs`。
4. 入口：`/#/java/system-design/evo-order-through-stages`。
5. 禁区：不要把共享库写成一次本地事务；不要把用户支付放进 TCC 全局事务。
