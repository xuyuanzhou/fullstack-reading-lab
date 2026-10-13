# P3-04 暂停不删记录，继续从 15 分钟看起

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 P3-04 的暂停、键盘焦点、手机宽度和减少动效。系统读屏软件未跑 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

当次任务能保存草稿，但不能暂停。回来时需要看到最近证据和未完成的任务，并且不能扣掉已有记录。课程仍然要能直接打开。

## 决策

- 采用：学习记录增加 `pause`，只记一天、一周或一个月和开始时间。暂停和继续都不改草稿、证据和旧勾选。继续时切到 15 分钟任务。任务按钮使用可见焦点。宽度 720px 以下按钮高度至少 44px。地图动效继续交给已有的 `prefers-reduced-motion`。
- 不采用 / 刻意不做：不锁课程，不补签，不发积压通知。不把暂停当成通过。不跑系统读屏软件，因此不声称读屏验收完成。不提交，不发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/state/learningEvidence.ts` | 暂停字段、写入和继续 |
| `web/src/state/progressStorage.ts` | 合并时保留暂停 |
| `web/src/state/progress.tsx` | 暂停写入同一份进度 |
| `web/src/components/learning/CurrentTask.tsx` | 暂停和继续 |
| `web/src/styles/_reading.scss` | 焦点和手机上的按钮高度 |
| `scripts/learning-platform.test.mjs` | 暂停后草稿和证据还在 |

## 验证

```bash
cd web && npm test && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：`npm test` 40 项通过，0 失败。`tsc --noEmit -p web/tsconfig.app.json` 通过。
- 浏览器 `http://127.0.0.1:5175/#/paths`：暂停一天后草稿条数不变，页面仍有课程链接。继续后回到「写下这一笔订单的四段职责」，原先草稿还在，暂停标记清空。390px 宽度下任务按钮高度 44px，页面没有横向溢出。`prefers-reduced-motion: reduce` 时地图光带动画名为 none。任务按钮可以获得焦点。
- 未执行：系统读屏软件、模型小样本、云账号、P4 实验、试学、发布。

## 后续

- [ ] P0-04：在不读取密钥的前提下做模型小样本；没有授权就不买云。
- [x] 可运行的 G1/G2 下单实验已续写到 [P4-01](2026-10-13-p4-order-sample.md)。页面闭环已续写到 [P3-05](2026-10-13-p3-lab-loop.md)。没有整包实验时，不要把 G0～G9 勾成已交付。
- [ ] 用系统读屏软件再走一遍暂停和保存。这次只核对了无障碍树和焦点。
- [ ] 不要改 `FROZEN_DELIVERABLES` 的顺序。要加就追加，并更新哈希测试。

## 给下一模型

1. 先读本文和 `web/src/components/learning/CurrentTask.tsx` 的暂停区块
2. `pause` 为空表示没有暂停。未知的 choice 读入后变成 null
3. 若续作：做 P4-02。P3-05 和 P4-01 已完成。不要用暂停或 15 分钟入口生成通过记录
4. 禁区：不清理他人未提交文件，不手改三份 `curriculum*.json`，不部署
