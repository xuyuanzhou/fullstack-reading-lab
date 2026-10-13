# 异常映射课的例子补上几种失败

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | spring-mvc-exception |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`spring-mvc-exception` 课上的例子只有一段 409 的 `@ExceptionHandler`。校验、坏 JSON、404、500、处理器再抛、过滤器和 Accept 都只在正文里点到，例子里看不到响应长什么样。

## 决策

- 采用：例子改成同一笔 `POST /orders` 的多段响应。字段校验、非法 JSON、库存冲突（含事务已回滚）、资源不存在和没有映射的路径、未处理错误、处理器再抛、未登录与无权限、Accept 选出的 HTML，各留状态码和 Content-Type。
- 采用：去掉 `example-code-blocks.js` 里把该课例子覆盖成一段 Java 注释的条目，否则页面仍只显示那一段。
- 不采用：不把这些失败拆成新课，也不改知识点三条。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-05.js` | 展开 `spring-mvc-exception` 的例子；ProblemDetail 首次释义 |
| `curriculum/example-code-blocks.js` | 删除对该课例子的短覆盖 |
| `web/src/data/curriculum.json` | 导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：内容校验通过。浏览器打开该课例子，能看到 400、409、500 三段响应，以及过滤器与 Accept 两段说明。

## 后续

- [ ] 不要把短的 `@ExceptionHandler` 注释再写回 `example-code-blocks.js` 的 `spring-mvc-exception`，那会盖掉这段例子
- [ ] 业务 type 仍由各处理器写。打开 `spring.mvc.problemdetails.enabled` 只让 Spring MVC 自带异常变成 ProblemDetail

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-05.js` 里 `spring-mvc-exception` 的 `example`
3. 禁区：不要把堆栈或 SQL 写进 500 的示例正文
