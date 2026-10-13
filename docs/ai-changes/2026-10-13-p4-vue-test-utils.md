# P4-05 补上 Vue 组件挂载课

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 只补一节缺课。P4-05 未勾选 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md)、[能力差距](../project-execution/2026-10-13-p0-02-capability-gap.md)、[双框架路由](2026-10-13-p4-dual-routes.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

P0-02 按课名检索，Vue Test Utils 和 Vitest 没有对应课。测试组已经有 Testing Library 和 Playwright。订单双框架样板用 mount 挂组件，这一节课当时对不上。

## 决策

- 采用：新增 `vue-test-utils-mount`。Vitest 只运行测试函数。`mount` 渲染组件和子组件，`shallowMount` 把子组件换成桩。例子里写出 Vue 单文件组件和挂载测试。放进前端「测试 / 组件」，不放进九关。
- 不采用 / 刻意不做：不勾选 P4-05。OIDC、ESLint、锁文件、变异测试等缺课这次不写。不改 `masteryGates.ts`。不提交，不发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-03.js` | 新课 `vue-test-utils-mount` |
| `scripts/curriculum.mjs` | 列入测试组目录和导读顺序 |
| `README.md` | 课数 1064，知识点 3203，前端 365 |
| `labs/order-g1-ui/README.md` | 指向这节课 |
| `web/src/data/curriculum*.json` | 导出结果 |

## 验证

```bash
cd web
node ../scripts/export-curriculum.mjs
node ../scripts/verify_content.mjs
```

- 结果：导出 1064 课，前端 365、Java 699。验证通过：`1064 lessons / 3203 knowledge points`。
- 未执行：没有把这节课放进关卡必读，也没有改九关通过条件。

## 后续

- [x] OIDC 已续写到 [2026-10-13-p4-oidc.md](2026-10-13-p4-oidc.md)，课号 `oidc-id-token-pkce`。
- [ ] P4-05 其余缺课：ESLint、锁文件、变异测试。每节仍要有权威依据、术语释义和该有的框架代码，再导出验证。
- [ ] 不要为了凑齐课数去写 Next.js、Helm、Terraform 专章。那些不在这次九关必读里。
- [ ] 不要勾选 P4-02。

## 给下一模型

1. 先读本文和 `curriculum/coverage-path-03.js` 里的 `vue-test-utils-mount`
2. 课已在前端测试组。九关没有这条 id
3. 若续作：写下一节仍然缺着的课，或做 P4-06。不要把这一节标成 P4-05 全部完成
4. 禁区：不手改导出 JSON 当源，不部署
