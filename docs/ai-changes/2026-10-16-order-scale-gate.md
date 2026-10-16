# 高并发下单单开笔试专关

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | [高并发下单笔试关-2026-10-16.md](../高并发下单笔试关-2026-10-16.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

面试里的一套题要同时考 10 万级下单架构、50 倍流量、五千万行订单连表超时、`IN` 状态索引、状态频繁变更对索引的代价，以及秒级延迟下同步和异步怎么切。九关各自的过关标准装不下这一卷。

## 决策

- 采用：新关 `g-order-scale`，不放进 `MASTERY_GATES`。总图底部单独一座「笔试专关」。六题 `OS-W1`～`OS-W6` 各 10 分，架构 30、数据库 30，由人打。题号 `OS-` 在这一关都算基础验证，但技能树不从这里点亮。阅读复用已有八课。
- 不采用：塞进关卡 3、6 或 7；改九关 id 或冻结交付键；为这一卷新写课文；站内自动判 60 分。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/orderScaleGate.ts` | 专关、评分维度、六题 |
| `web/src/data/gateVerify.ts` | 注册试卷；`OS-` 算基础 |
| `web/src/components/learning/CurrentTask.tsx` | 这一关走笔试稿，不走四选一 |
| `web/src/pages/PathPage.tsx` | 总图入口；`?gate=g-order-scale` 打开专关 |
| `web/src/styles/_reading.scss` | 专关面板和评分列表 |
| `docs/高并发下单笔试关-2026-10-16.md` | 阅卷标准与架构图要求 |
| `scripts/learning-platform.test.mjs` | 专关不在九关里，满分 60 |

## 验证

```bash
node --test scripts/learning-platform.test.mjs
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：`scripts/learning-platform.test.mjs` 21 项通过。`web` 下 `tsc --noEmit -p tsconfig.app.json` 通过。浏览器打开 `#/paths?gate=g-order-scale`，可见评分 30+30、八课、四项交付、OS-W1～W6。

## 后续

- [ ] 不要把 `g-order-scale` 推进 `MASTERY_GATES` 或改成「第 10 关」
- [ ] 不要让 `OS-` 题点亮技能树
- [ ] 五千万行仍不是拆表开关；阅卷时先看检查行数

## 给下一模型

1. 先读：本文 + `docs/高并发下单笔试关-2026-10-16.md`
2. 再读：`web/src/data/orderScaleGate.ts`、`web/src/data/masteryGates.ts`
3. 若续作：改题只改 `ORDER_SCALE_EXAMS` 和阅卷文档，保持六题各 10 分
4. 禁区：勿改九关 `gateCleared` 键；勿把缓存扣减写成库存权威
