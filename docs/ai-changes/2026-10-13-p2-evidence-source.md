# P2-02 草稿另记一条待复核证据

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 P2-02。本站仍不运行实验，证据不会因此变成通过 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md)；续 [P2 进度信封](2026-10-13-p2-progress-envelope.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

草稿已经能保存，但页面没有证据，也没有评分来源。阅读次数和关卡勾选不能被当成验证通过。

## 决策

- 采用：保存非空草稿时，另写一条 `kind: self`、`source: self` 的证据。摘要只写字数，并写明本站没有运行代码。结果固定为待复核；就算记录里写成了通过，读入时也会改回待复核。人工评分题可以另记 0～4 的自评，来源仍是学员自己。旧勾选继续只进 `selfChecks`。`verifiedFromReading` 仍返回空数组。本地检查或人工评审且结果为通过时，`taskVerified` 才为真；当前页面不会写入这种记录。
- 不采用 / 刻意不做：不因为读完课或勾选交付就把任务标成通过。不在本站运行数据库或学员代码。不把自评分数当成认证。不提交，不发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/state/learningEvidence.ts` | 证据规范化、自评草稿证据、通过判定 |
| `web/src/state/progress.tsx` | 保存草稿时一并写入证据 |
| `web/src/state/progressStorage.ts` | 合并时比较评分 |
| `web/src/components/learning/CurrentTask.tsx` | 展示证据；人工评分题可选 0～4 |
| `scripts/learning-platform.test.mjs` | 自报不能通过，阅读不产生通过 |

## 验证

```bash
cd web && npm test && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：`npm test` 39 项通过，0 失败。`tsc --noEmit -p web/tsconfig.app.json` 通过。
- 浏览器 `http://127.0.0.1:5175/#/paths`：30 分钟任务写着「这段代码本站不运行，没有自动评分。」60 分钟保存后证据是「草稿 7 字。本站没有运行代码。结果是待复核。」来源是 self，verification 是 pending。15 分钟有「自评 0 到 4。这不是通过。」原先的草稿还在。核对用的 60 分钟记录已从本机进度去掉。
- 未执行：模型小样本、云账号、手机视口、读屏、P4 实验、试学、发布。

## 后续

- [ ] P0-04：在不读取密钥的前提下做模型小样本；没有授权就不买云。
- [ ] P4 再做能跑的 G1/G2 实验。没有实验代码时，不要把 G0～G9 勾成已交付，也不要把待复核改成通过。
- [ ] 不要改 `FROZEN_DELIVERABLES` 的顺序。要加就追加，并更新哈希测试。
- [ ] 不要删除 `fs-learning-v2`，除非已经确认进度写入成功。

## 给下一模型

1. 先读本文和 `web/src/state/learningEvidence.ts` 的 `evidenceOf`、`taskVerified`
2. 学员自报的证据读入后必须是 `verification: pending`
3. 若续作：P0-04 或 P4 的可运行实验。不要用阅读数或自评分数生成通过记录
4. 禁区：不清理他人未提交文件，不手改三份 `curriculum*.json`，不部署
