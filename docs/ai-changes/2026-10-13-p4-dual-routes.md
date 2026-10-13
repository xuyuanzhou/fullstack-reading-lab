# P4-04 双框架各自的路由和浏览器回归

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 P4-04。P4-02 未勾选 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md)、[双框架参考实现](2026-10-13-p4-dual-framework.md)、[评分边界](2026-10-13-p4-g1g2-scoring.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

双框架原来只有 React 表单和 Vue 列表，没有各自的路由，也没有在浏览器里跑过回归。

## 决策

- 采用：React 用哈希路由，`/sent/4` 读出订单号，并用组件自己的状态把「标成已看到」变成「已看到」。Vue 用路径 `/draft`，表单字段是商品标识和备注；没写全时显示「还没写全。」，记下之后字段还在。Playwright 用页面替身接口跑这条路径。
- 不采用 / 刻意不做：不把 React 的幂等键表单改写成 Vue。不改 `labs/order-g1-ui-start`。不把 `npm run e2e` 加进 `labs/run-regression.sh`。不勾选 P4-02。不提交，不发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `labs/order-g1-ui/src/react/UserApp.tsx` | React 哈希路由 |
| `labs/order-g1-ui/src/react/SentNote.tsx` | 路由订单号和已看到状态 |
| `labs/order-g1-ui/src/vue/DraftForm.vue` | Vue 自己的补记表单 |
| `labs/order-g1-ui/src/vue/router.ts` | 列表和 `/draft` |
| `labs/order-g1-ui/e2e/order-page.spec.ts` | 浏览器回归 |
| `labs/order-g1-ui/package.json` | 固定 react-router 7.18.4、vue-router 4.6.4、Playwright 1.64.0 |
| `docs/全栈学习平台实施总计划-2026-10-13.md` | 勾选 P4-04，P4-02 仍未勾选 |

## 验证

```bash
cd labs/order-g1-ui
npm test
npx tsc --noEmit
npm run e2e
```

- 结果：组件测试 8 项通过。类型检查通过。Playwright 1 项通过：sold-out 后商品仍是 `pen`、幂等键仍是 `same-key`，页面出现「路由订单 4」和「已看到」，Vue 补记出现「已记下。」且两个字段仍在。浏览器地址是 `http://127.0.0.1:5191/`。
- 未执行：没有跑 `labs/run-regression.sh`，没有 GitHub Actions。

## 后续

- [x] Vue 组件挂载课已续写到 [mount 与 Vitest](2026-10-13-p4-vue-test-utils.md)。P4-05 仍未勾选。
- [ ] 不要勾选 P4-02。OIDC、上传、请求竞态和 GitHub Actions 仍缺。
- [ ] 不要把 `npm run e2e` 加进 `labs/run-regression.sh`，除非那条脚本的运行记录也包含它。

## 给下一模型

1. 先读本文和 `labs/order-g1-ui/README.md`
2. 起始代码仍在 `labs/order-g1-ui-start`，失败后清空输入。不要把它改成带路由的参考实现
3. `vue-test-utils-mount` 已入库。若续作：继续 P4-05 里还没写的缺课，或做 P4-06。不要为了勾选 P4-02 去写一个没跑过的 GitHub Actions
4. 禁区：不部署，不把 Playwright 结果写进路线页勾选
