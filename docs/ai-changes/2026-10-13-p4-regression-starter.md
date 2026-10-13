# P4-03 工程回归的起始代码在失败后继续

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 只补上六组里工程回归的起始代码。P4-03 未勾选 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md)、[本机回归](2026-10-13-p4-regression.md)、[授权起始代码](2026-10-13-p4-g4-starter.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

工程回归原来只有通过的 `labs/run-regression.sh`。起始代码需要让「检查失败就停下」仍然缺着，同一套小测试因此失败。

## 决策

- 采用：`labs/regression` 在检查退出码不是 0 时停下，不打印 `regression ok`。`labs/regression-start` 忽略该退出码，继续跑 `after-fail`，并打印 `regression ok`。检查名只接受字母、数字和连字符。
- 不采用 / 刻意不做：不把这两个目录加进 `labs/run-regression.sh`。不改五份订单参考样板。不跑那条需要 Docker 的回归。不添加 GitHub Actions。不勾选 P4-03。不提交，不发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `labs/regression/` | 失败即停的小样和测试 |
| `labs/regression-start/` | 失败后仍继续的起始脚本和同一套测试 |
| `labs/README.md` | 写明回归不跑这两个目录 |
| `docs/全栈学习平台实施总计划-2026-10-13.md` | P4-03 仍未勾选 |

## 验证

```bash
cd labs/regression && node --test regression.test.mjs
cd labs/regression-start && node --test regression.test.mjs
```

- 结果：参考实现 2 项通过。起始代码按设计失败：2 项里 1 项通过、1 项失败。失败的是 `a failed check stops the run`。输出里仍有 `after-fail` 和 `regression ok`，`includes('regression ok')` 实际是 `true`，期望 `false`。通过的是 `two passing checks finish with regression ok`。
- 未执行：没有跑 `labs/run-regression.sh`，也没有改它。

## 后续

- [x] 事务/幂等的评分边界已续写到 [下单样板评分边界](2026-10-13-p4-g1g2-scoring.md)。P4-03 已勾选。
- [ ] 不要把 `regression-start` 或 `regression` 加进 `labs/run-regression.sh`。
- [ ] 失败即停之后，起始工程应与 `labs/regression` 一样 2 项通过。那是练习结果，不是把起始目录改成参考实现。

## 给下一模型

1. 先读本文和 `labs/regression-start/README.md`
2. 同一套测试的参考实现在 `labs/regression`。五份订单样板的命令仍是 `labs/run-regression.sh`。三边不要合成一个目录
3. 评分边界已写入 [labs/order-g1g2/README.md](2026-10-13-p4-g1g2-scoring.md)，P4-03 已勾选。若续作：做 P4-04。不要为了让起始工程变绿而删掉失败即停的测试
4. 禁区：不把起始工程的失败写进路线页，不部署，不把这条小样接到 Pages 工作流
