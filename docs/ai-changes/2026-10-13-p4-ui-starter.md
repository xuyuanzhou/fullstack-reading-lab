# P4-03 双框架起始代码在失败时清空输入

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 只补上六组里双框架的起始代码。P4-03 未勾选 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md)、[双框架参考实现](2026-10-13-p4-dual-framework.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

双框架原来只有通过测试的 `labs/order-g1-ui`。起始代码需要让「失败后输入还在」这条规则仍然缺着，测试因此失败。

## 决策

- 采用：`labs/order-g1-ui-start` 在 React 提交失败时清空商品和幂等键，在 Vue 读取失败时清空筛选词和已读订单。拒绝类型的文字仍然显示。成功提交不清空幂等键。
- 不采用 / 刻意不做：不把起始工程加进 `labs/run-regression.sh`。不删掉保留输入的测试。不改参考实现。不勾选 P4-03。不提交，不发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `labs/order-g1-ui-start/` | 失败时清空输入的起始页面和说明 |
| `labs/README.md` | 写明回归不跑这个目录 |
| `.gitignore` | 忽略该目录的 `node_modules/` 和 `dist/` |
| `docs/全栈学习平台实施总计划-2026-10-13.md` | P4-03 仍未勾选 |

## 验证

```bash
cd labs/order-g1-ui-start
npx tsc --noEmit
npm test
```

- 结果：类型检查通过。测试按设计失败：5 项里 4 项失败、1 项通过。失败点都是商品或筛选词变成空字符串，期望仍是 `pen`。`sold-out`、`not-owner` 和「读取失败。」已经显示出来。通过的是 `a created order shows the id and keeps the key for a retry`。
- 未执行：没有跑回归脚本，也没有改 `labs/order-g1-ui`。

## 后续

- [x] 事务/幂等的起始代码已续写到 [库存更新不带版本条件](2026-10-13-p4-g1g2-starter.md)。查询/缓存、授权、工程回归还没有起始代码。
- [ ] 不要把 `order-g1-ui-start` 加进 `labs/run-regression.sh`。
- [ ] 失败后保留输入之后，起始工程应与 `labs/order-g1-ui` 一样 5 项通过。那是练习结果，不是把起始目录改成参考实现。

## 给下一模型

1. 先读本文和 `labs/order-g1-ui-start/README.md`
2. 参考实现在 `labs/order-g1-ui`。两边不要合成一个目录
3. 事务/幂等的起始代码已写到 [labs/order-g1g2-start](2026-10-13-p4-g1g2-starter.md)。若续作：给 `labs/order-g3` 做起始代码。不要为了让起始工程变绿而删掉保留输入的测试，也不要删掉版本条件和幂等键的测试
4. 禁区：不把起始工程的失败写进路线页，不部署
