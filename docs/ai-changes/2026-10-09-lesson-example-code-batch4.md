# 学习课例子代码块第四批（+26，合计 88）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch3](2026-10-09-lesson-example-code-batch3.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第三批后，浏览器 / 网络 / Spring / MyBatis / JPA 仍有大量口头代码 example。

## 决策

- 采用：继续只扩 `curriculum/example-code-blocks.js`。
- 不采用：改 core；本轮未动纯场景叙述课。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +26 课围栏 example |
| `web/src/data/curriculum*.json` | export 产物 |

本批：`cors`、`cors-credentials-allowlist`、`fetch-credentials`、`fetch-abort`、`fetch-platform-client`、`fetch-response-body-once`、`fetch-method-body-timeout`、`http-content-type-body`、`axios-rejects-http-errors`、`http-cache`、`cookie-credential`、`browser-storage`、`html-dialog-modal`、`html5-dataset-string`、`bfcache-pageshow`、`http-status-auth`、`spring-transaction`、`spring-aop-self-invocation`、`spring-mvc-restcontroller`、`spring-filter-vs-interceptor`、`spring-ioc-wiring`、`mybatis-parameters`、`mybatis-pagehelper-next-query`、`mybatis-log-preparing-parameters`、`jpa-modifying-clear`、`jpa-cascade-orphan`。

## 验证

```bash
cd web && npm run export:curriculum
```

- 结果：含 \`\`\` 的 example = **88**；抽查 cors / fetch-abort / spring-transaction / mybatis-parameters 正常。

## 后续

- [x] 第五批 +25：见 [2026-10-09-lesson-example-code-batch5.md](2026-10-09-lesson-example-code-batch5.md)（合计 113）
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 已有 id 见 batch1–4，勿重复
2. 追加后 export，核对 fenced count
3. 约定：`docs/课程例子代码块约定.md`
