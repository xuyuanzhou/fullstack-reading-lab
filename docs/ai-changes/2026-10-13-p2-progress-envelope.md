# P2 学习记录写入现有进度

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 P2-01、P2-03、P2-04、P2-05。P2-02 的证据与评分来源未做 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md)；续 [P1](2026-10-13-p1-stable-ids.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

任务草稿原来写在单独的 `fs-learning-v2`。进度本体仍是版本 1。要把学习记录放进同一次读写，同时保住旧笔记，并且不能用数组合并把已撤销的草稿加回来。

## 决策

- 采用：`ProgressState.learning` 使用 schemaVersion 2。进度自己的 `revision` 继续管多标签笔记。没有 `learning` 字段的旧记录，只把 `pathChecks` 收成自评；首次读取时把原文写入 `${key}.learning-backup`，已有备份不覆盖。`schemaVersion` 大于 2 时只读，写回时用 `learningHeld` 还原原文。任务草稿的撤销用 `deleted`，删除标记优先。同一条草稿只有相对上次同步有改动时才覆盖；已撤销的不会被旧文本加回来。单独键 `fs-learning-v2` 只在进度里还没有草稿时并入内存，不删除该键。
- 不采用 / 刻意不做：不把 `learning` 当成关卡通过条件。`gateCleared` 仍看 `pathChecks`。不把旧 `pathChecks` 的并集改成删除标记。不在页面上写入 evidence 或评分来源。查看导入只预览，不合并进进度。不调用其他模型，不购买云，不提交。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/types/curriculum.ts` | 进度增加 learning、learningReadonly、learningHeld |
| `web/src/state/progressStorage.ts` | 读写、合并、一次性备份、未来版本回写、并入旧草稿键 |
| `web/src/state/progress.tsx` | 保存草稿走同一份进度；启动时尝试并入 fs-learning-v2 |
| `web/src/components/learning/CurrentTask.tsx` | 草稿从进度恢复；导出和导入预览 |
| `web/src/components/GateDock.tsx` | 交付勾选标明是自评 |
| `scripts/learning-platform.test.mjs` | 撤销合并、未来版本、备份、旧草稿并入 |
| `docs/全栈学习平台实施总计划-2026-10-13.md` | 勾选已落地的 P2 项 |

## 验证

```bash
cd web && npm test && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：`npm test` 38 项通过，0 失败。`tsc --noEmit -p web/tsconfig.app.json` 通过。
- 浏览器 `http://127.0.0.1:5175/#/paths`：刷新后 30 分钟草稿还在；切到 15 分钟能看到原先那条草稿。导出给出 schemaVersion 2 的文本。第 1 关交付处写着「这些勾选是自评，没有测试记录不算验证通过。」证据列表仍是空的。核对用的那句草稿已从本机进度里去掉。
- 未执行：模型小样本、云账号、手机视口、读屏、P4 实验、试学、发布。

## 后续

- [x] P2-02：页面写入 evidence 和评分来源。续作见 [2026-10-13-p2-evidence-source.md](2026-10-13-p2-evidence-source.md)。没有实验运行器时，待复核不能写成通过。
- [ ] P0-04：在不读取密钥的前提下做模型小样本；没有授权就不买云。
- [ ] P4 再做能跑的 G1/G2 实验。没有实验代码时，不要把 G0～G9 勾成已交付。
- [ ] 不要改 `FROZEN_DELIVERABLES` 的顺序。要加就追加，并更新哈希测试。
- [ ] 不要删除 `fs-learning-v2`，除非已经确认进度写入成功。

## 给下一模型

1. 先读本文、`web/src/state/progressStorage.ts` 和 `web/src/state/learningEvidence.ts`
2. 关卡通过仍只看 `pathChecks`。新草稿在 `progress.learning.attempts`
3. 若续作：先补 P2-02 的证据记录，或按计划做 P0-04。不要从 P4 的题目直接生成未测试的 Java 工程并标完成
4. 禁区：不清理他人未提交文件，不手改三份 `curriculum*.json`，不部署
