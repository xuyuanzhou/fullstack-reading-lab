# 学习课例子代码块第三批（+25，合计 62）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch2](2026-10-09-lesson-example-code-batch2.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第二批后仍缺 TS 判别/泛型、React Query、Vue 响应式、Java 并发集合等课的围栏代码。

## 决策

- 采用：继续只扩 `curriculum/example-code-blocks.js`。
- 不采用：改 core/why，或引入新字段。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +25 课围栏 example |
| `web/src/data/curriculum*.json` | export 产物 |

本批 id：`ts-narrowing`、`ts-generics`、`ts-structural`、`ts-const-readonly`、`ts-template-literal-types`、`query-invalidate`、`query-server-state`、`query-fn-calls-the-client`、`suspense`、`vue-reactivity`、`vue-computed-watch`、`vue-array-raw-proxy`、`react-memo-when`、`react-effect-timing`、`java-concurrent-map`、`java-equals-contract`、`java-optional`、`java-generics`、`java-synchronized-monitor`、`java-thread-start-run`、`java-dcl-volatile-enum`、`java-future-errors`、`java-thread-local-leak`、`hashmap-initial-16-not-max`、`java-record-accessor`。

## 验证

```bash
cd web && npm run export:curriculum
```

- 结果：含 \`\`\` 的 example = **62**；抽查 TS / Query / Vue / Java DCL 正常。

## 后续

- [x] 第四批 +26：见 [2026-10-09-lesson-example-code-batch4.md](2026-10-09-lesson-example-code-batch4.md)（合计 88）
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 已有 id 见本文件与 batch1/2，勿重复
2. 追加后 `cd web && npm run export:curriculum`，核对 fenced count
3. 约定仍见 `docs/课程例子代码块约定.md`
