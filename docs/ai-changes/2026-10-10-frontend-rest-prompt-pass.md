# 前端轨剩余章提问可读性过一遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 承接 Java 收尾 `2026-10-10-java-rest-prompt-pass.md`；选型/React/Vue/主线/微前端此前已补 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

Java 轨「为什么」类已全部有 `promptAnswer`。前端除选型与 React/Vue/主线/微前端外，语言基础、浏览器、安全、跨端等仍缺参考答案。

## 决策

- 采用：前端轨剩余 **168 课**补上 `promptAnswer`（语言基础、TS、CSS、浏览器、网络与安全、安全、RN、Flutter、UniApp/Taro、Node、测试、工程实践）。约十余课改写叠句提问；把带「预测/对照练习口吻」的答案改成点破句。
- 结果：前端 why 类 `withAnswer 242 / 242`（含此前已补的选型与框架章）。
- 不采用 / 刻意不做：不在这一刀改机制正文或例子代码。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| 多份 `curriculum/coverage-frontend-*.js`、`coverage-*.js`、`lessons.js` 等 | 插入/改写 `promptAnswer`；部分改 `prompt` |
| `web/src/data/curriculum-*.json` | `export:curriculum` |

## 验证

```bash
node --input-type=module -e '…frontend why missing…'
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：前端 why `missing 0`。导出 907 课，校验通过。

## 后续

- [ ] 全库抽查：标题下可展开参考答案是否点破提问里的两件事
- [ ] 新课入库时同步写 `promptAnswer`，避免再积压

## 给下一模型

1. 先读：本文 + `2026-10-10-react-vue-prompt-pass.md` / `2026-10-10-java-rest-prompt-pass.md`
2. 筛 `!promptAnswer && /为什么|怎么|何时|哪/.test(prompt)` 应接近空
3. 禁区：`promptAnswer` 不要以练习「预测…」起头；yes/no 提问须直接答不是/不会/不能
