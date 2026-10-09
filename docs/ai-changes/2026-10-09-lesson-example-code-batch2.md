# 学习课例子代码块第二批（+25，合计 37）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [2026-10-09-lesson-example-code-blocks.md](2026-10-09-lesson-example-code-blocks.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

试点 12 课后，语言基础 / React / Java 仍有大量「口头代码」example。

## 决策

- 采用：继续只改 `curriculum/example-code-blocks.js`，保持展示层不变。
- 不采用：本轮改 core/why。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +25 课：ES6、作用域/原型/代理、受控输入/key/effect/批处理、TS unknown/satisfies、FormData/history、Java asList/CME/switch/wait |
| `web/src/data/curriculum*.json` | export 产物 |

本批 id：`es6-default-param-call-time`、`es6-destructure-copies`、`es6-for-of-iterable`、`es6-rest-spread-position`、`es6-template-expression`、`js-microtask-vs-macrotask`、`js-optional-chaining`、`js-prototype-chain`、`js-class-extends-super`、`js-generator-yield-pause`、`js-proxy-get-set-trap`、`js-timer-fn-not-string`、`js-scope-tdz`、`controlled-input`、`identity`、`effects`、`react-setstate-batch`、`ts-unknown`、`ts-satisfies`、`formdata-multipart-upload`、`html5-pushstate-popstate`、`java-arrays-aslist-fixed`、`java-foreach-remove-cme`、`java-switch-arrow-no-fall`、`java-wait-sleep`。

## 验证

```bash
cd web && npm run export:curriculum
```

- 结果：含 \`\`\` 的 example = **37**；抽查 5 课围栏正常。

## 后续

- [x] 第三批 +25：见 [2026-10-09-lesson-example-code-batch3.md](2026-10-09-lesson-example-code-batch3.md)（合计 62）
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 先读 `docs/课程例子代码块约定.md` 与本文 id 列表，避免重复
2. 只追加 `EXAMPLE_CODE_BLOCKS`，保持短片段 + 一句观察
3. `cd web && npm run export:curriculum` 后核对 fenced count
