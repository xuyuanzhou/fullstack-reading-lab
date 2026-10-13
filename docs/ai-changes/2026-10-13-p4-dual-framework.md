# P4-02 双框架：React 提交，Vue 列表

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 只补上 P4-02 的双框架业务。P4-02 未勾选 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md)、[预备基础](2026-10-13-p4-g0-list.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

双框架业务要求用户端用 React 提交订单，管理端用 Vue 展示订单，Java 服务把订单存进真实数据库。已有的 MySQL 样板只有创建接口。

## 决策

- 采用：`labs/order-g1g2` 增加 `GET /orders`，按 id 返回 `orderId` 和 `sku`。`labs/order-g1-ui` 的 React 表单提交商品和幂等键，Vue 列表用 `ref` 与 `computed` 做筛选。两边都覆盖加载、空数据、成功和失败。失败后 React 保留商品和幂等键，Vue 保留筛选词和已经读到的订单。页面开发服务器把 `/orders` 转到 8080。组件测试使用替身接口。
- 不采用 / 刻意不做：不把 Vue 写成 React 表单的逐行翻译。不把按钮禁用当成库存保证。不覆盖五类失败落点、身份检查和 CI。不把组件测试写成路线页通过。不勾选 P4-02、P4-04 或 P5～P8。不提交，不发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `labs/order-g1g2/` | 订单列表接口和一条 MySQL 测试 |
| `labs/order-g1-ui/` | React 表单、Vue 列表、Vitest、启动说明、锁定依赖 |
| `.gitignore` | 忽略该页面的 `node_modules/` 和 `dist/` |
| `docs/全栈学习平台实施总计划-2026-10-13.md` | P4-02 仍未勾选，并写明双框架业务已有页面 |

## 验证

```bash
cd labs/order-g1g2 && ./mvnw -s maven-settings.xml -Dtest=PlaceOrderTest test
cd labs/order-g1-ui && npm test && npx tsc --noEmit
```

- 结果：MySQL `Tests run: 7, Failures: 0, Errors: 0, Skipped: 0`，`BUILD SUCCESS`。Vitest 2 个文件、3 项通过。`tsc --noEmit` 通过。
- 浏览器 `http://127.0.0.1:5176/`：Java 服务未启动时，提交后显示「网络未达」，商品 `pen` 和幂等键 `same-key` 还在，提交按钮恢复可点。管理端显示「读取失败。」，筛选词 `pen` 还在。成功路径由组件测试覆盖，这次没有对着正在运行的 MySQL 再点一次。

## 后续

- [x] 查询/缓存的 MySQL 样板已续写到 [keyset 与回填窗口](2026-10-13-p4-read-cache.md)。授权、工程回归还没有。React/Vue 请求竞态还不在那份样板里。
- [ ] P4-04：两框架的路由、表单状态和浏览器回归。这一页只有提交和列表。
- [ ] 五类失败落点、最小身份和 CI 还没有。
- [ ] 不要把 `GET /orders` 从 MySQL 样板撤掉，除非列表测试不再通过。

## 给下一模型

1. 先读本文和 `labs/order-g1-ui/README.md`
2. 组件测试不启动 Docker。要看真实列表，先启动 `labs/order-g1g2`
3. 若续作：做授权或工程回归。查询/缓存已有 `labs/order-g3`。不要把这一页标成 G1 实操全部完成
4. 禁区：不把测试结果写进 `gateCleared`，不把 MySQL 样板改成内存列表，不部署
