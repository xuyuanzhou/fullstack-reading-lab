# P4-02 工程回归：一条命令跑完订单样板

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 只补上本机回归脚本。P4-02 未勾选 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

六组样板已经分开能跑，还没有一条命令把它们按顺序跑完，也没有证明拒绝类型被改掉时测试会变红。

## 决策

- 采用：`labs/run-regression.sh` 依次跑 `order-g0`、`order-g1-ui`、`order-g1g2`、`order-g3`、`order-g4`。React 和 Vue 各增加一条 `not-owner`：失败后商品、幂等键、筛选词和已读到的订单还在。把授权样板的 `not-owner` 临时改成 `not_owner` 时，`clerkDoesNotReadAnotherUsersOrder` 变红；源码已改回。
- 不采用 / 刻意不做：不添加 GitHub Actions。不做浏览器端到端。不勾选 P4-02。不把回归结果写进路线页勾选。不提交，不发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `labs/run-regression.sh` | 按顺序运行五份样板 |
| `labs/README.md` | 回归矩阵和尚未覆盖的部分 |
| `labs/order-g1-ui/` | React、Vue 的 `not-owner` 测试 |
| `docs/全栈学习平台实施总计划-2026-10-13.md` | P4-02 仍未勾选 |

## 验证

```bash
labs/run-regression.sh
```

- 结果：脚本以 `regression ok` 结束。`order-g0` Java 4 项、Node 2 项通过。`order-g1-ui` 5 项通过，类型检查通过。`order-g3` 5 项通过。`order-g4` 7 项通过。`order-g1g2` 在同一条命令里通过，否则脚本会在它那里停下。
- 改名试验：`not-owner` 改为 `not_owner` 后，`clerkDoesNotReadAnotherUsersOrder` 失败，期望 `not-owner`，实际 `not_owner`。源码已恢复，随后的整段回归通过。
- 未执行：浏览器端到端、GitHub Actions、依赖扫描。

## 后续

- [ ] 浏览器端到端各跑一条下单路径，并核对键盘焦点。
- [ ] 若要在 GitHub Actions 跑这条回归，单独加工作流，不要把它接到现有的 Pages 发布。
- [x] 预备基础的起始代码已续写到 [订单列表起始工程](2026-10-13-p4-g0-starter.md)。其余五组还没有起始代码。
- [ ] 不要勾选 P4-02，除非端到端和上面标出的缺口也有运行记录。

## 给下一模型

1. 先读本文和 `labs/README.md`
2. 回归命令需要 Docker，因为三份样板启动 MySQL 8.4
3. 若续作：给其余五组补起始代码，或补一条浏览器路径。不要把 `order-g0-start` 加进回归脚本。不要把本机脚本写成已经在 CI 上跑过
4. 禁区：不把测试结果写进 `gateCleared`，不改 Pages 工作流去发布这些样板
