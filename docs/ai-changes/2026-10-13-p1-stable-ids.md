# P1 冻结交付物 id，并加上迁移函数与当次任务

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 P0-03、P0-05、P1。主存储切换续作见 2026-10-13-p2-progress-envelope.md |
| 关联 | [实施总计划](../全栈学习平台实施总计划-2026-10-13.md)、[P0-03 报告](../project-execution/2026-10-13-p0-03-baseline-verify.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

P0-01、P0-02 只登记了文件和课库差距。接下来要先有可重复的基线，再冻结旧 `gateId:index`，避免后面改交付物顺序时勾选错位。

## 决策

- 采用：40 条交付物用稳定 id 对齐当前顺序，并用输出文本的 SHA-256 卡住这份顺序。补读不再挡住过关。地图标记改用 `milestoneKind`。G1/G2 三道任务只作为合同，保存草稿，不把未运行代码标成通过。
- 采用：新的学习记录是独立信封。旧勾选迁成自评，阅读数不产生验证结论，撤销不会被另一份旧稿并集复活。
- 不采用：不把这套信封接进现有 `progressStorage.ts`。现有页面的勾选仍按旧键计算。不新建 Java/React/Vue 实验工程，不跑模型对照，不部署。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/deliverableMap.ts` | 冻结的交付物 id |
| `web/src/data/learningGraph.ts` | 必需/补读、替代组、依赖校验 |
| `web/src/data/learningSkills.ts` | React 与 Vue 分开的首批技能 |
| `web/src/data/learningTasks.ts` | G1/G2 三道任务合同 |
| `web/src/state/learningEvidence.ts` | 迁移、合并、导入预览 |
| `web/src/data/learningPaths.ts` | 补读不计入必修槽；显式里程碑标记 |
| `web/src/data/masteryGates.ts` | 第 3 关、第 9 关的 `milestoneKind` |
| `web/src/pages/PathPage.tsx`、`GateDock.tsx` | 不再用句子包含关系判断标记 |
| `web/src/components/learning/CurrentTask.tsx` | 当次任务 |
| `scripts/learning-platform.test.mjs` | 新测试，已接入 `web` 的 test 脚本 |
| `docs/project-execution/2026-10-13-p0-03-baseline-verify.md` | 基线命令结果和未决项 |

## 验证

- 隔离副本 `72437f4`：`npm test` 29 项通过，lint 退出码 0（旧警告），`tsc` 通过，`npm run build` 通过。
- 当前工作区：`npm test` 36 项通过。`tsc --noEmit -p web/tsconfig.app.json` 通过。
- 浏览器 `http://127.0.0.1:5175/#/paths`：九个关卡还在；第 3 关标记「全栈」，第 9 关标记「职责」。15 分钟任务是「写下这一笔订单的四段职责」，60 分钟是「同一幂等键的第二次请求」。保存后状态是「草稿已保存在本机。代码还没有在本站运行，结果是待复核。」证据列表为空。
- 未执行：模型小样本、云账号、手机视口、读屏、P4 实验、试学、发布。

## 后续

- [ ] P0-04：在不读取密钥的前提下做模型小样本；没有授权就不买云。
- [x] 把 `learningEvidence` 接到现有进度读写。续作见 [2026-10-13-p2-progress-envelope.md](2026-10-13-p2-progress-envelope.md)。
- [ ] P4 再做能跑的 G1/G2 实验。没有实验代码时，不要把 G0～G9 勾成已交付。
- [ ] 不要改 `FROZEN_DELIVERABLES` 的顺序来“插一条交付物”。要加就追加，并更新哈希测试。

## 给下一模型

1. 先读本文和 `docs/project-execution/2026-10-13-p0-03-baseline-verify.md`
2. 现有勾选仍在 `progress.pathChecks`。新草稿在 `localStorage` 键 `fs-learning-v2`
3. 若续作：先接存储，再写实验。不要从 P4 的题目文档直接生成一个未测试的 Java 工程并标完成
4. 禁区：不清理他人未提交文件，不手改三份 `curriculum*.json`，不部署
