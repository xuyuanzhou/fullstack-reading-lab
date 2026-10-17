# 画图把三处超时和熔断拆开

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [画图补上 TCC 的短框和空回滚](2026-10-17-draw-tx-tcc.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

治理图只在页脚写了「超时」。同一笔远程预留上，调用方、网关和借连接是三处超时，重试和熔断也不是同一支箭头。需要一张可抄的图，并写出配置、只再试一次的代码和怎样校验。

## 决策

- 采用：新课 `draw-three-clocks`，放在「系统设计 / 画图」末尾，文件是 `coverage-java-134.js`。OpenFeign 连接 200 毫秒、读取 800 毫秒。网关 `proxy_read_timeout` 为 2 秒。Hikari `connectionTimeout` 为 200 毫秒，语句另计。预留失败只再调用一次，幂等键不变。熔断打开后不再向库存发起调用。
- 不采用：不把三处超时合成一个三秒。不把 504 写成 SQL 已超时。不把熔断画成重试。不加选择题，不并进九关 Boss。不改 `coverage-java-128.js`。通信图、数据流图不单开。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-134.js` | 三处超时、一次重试、熔断和校验 SQL |
| `curriculum/diagrams/draw-three-clocks.svg` | 三段箭头、重试格、熔断格 |
| `curriculum/coverage-path-13.js` | 治理课指向这张图 |
| `curriculum/coverage-java-125.js` | 选题课补上超时要分开画 |
| `scripts/curriculum.mjs`、`legacy/index.html`、`web/src/data/learningSkills.ts` | 发布 134 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
```

- 结果：导出 1135 课、3418 个知识点（前端 368，Java 767）。内容校验通过。选择题与技能图 36 项通过。页面 `#/java/system-design/draw-three-clocks` 打开后，图上是网关读取 2s、订单读取 800ms、借连接 200ms。例子里有 `connection-timeout`、`tryAcquirePermission` 和 `callOnce`。课表「画图」为 0/29。

## 后续

- [ ] 不要把三处超时合成一个三秒
- [ ] 504 只说明网关读取等待到了，不能写成库存 SQL 已超时
- [ ] 借连接超时不取消已经借出的语句
- [ ] 预留重试必须带原来的幂等键，且只再调用一次
- [ ] 熔断打开后不再画从订单服务到库存服务的箭头
- [ ] 不要把 `coverage-java-128.js` 改成画图课
- [ ] 通信图、数据流图不单开

## 给下一模型

1. 先读本文，再读 `curriculum/coverage-java-134.js`
2. 三处数字分别是 OpenFeign 读取 800 毫秒、Nginx `proxy_read_timeout` 2 秒、Hikari `connectionTimeout` 200 毫秒
3. `reserve` 在 `tryAcquirePermission` 失败时直接返回拒绝，超时只再走一次 `callOnce`
4. 示意图用 UTF-8 写入。改课之后跑导出和 `node scripts/verify_content.mjs`
5. 入口：`/#/java/system-design/draw-three-clocks`
