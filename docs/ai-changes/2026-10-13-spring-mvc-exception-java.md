# 异常映射课的例子补回 Spring 代码

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | spring-mvc-exception |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

扩写例子时删掉了原来的 `@ExceptionHandler`。课上只剩 HTTP 响应，看不到这些正文是哪段 Spring 代码写出的。

## 决策

- 采用：例子保留几种失败的响应，并加回 `@RestControllerAdvice`（400、409、404、500）和未登录时的 `AuthenticationEntryPoint`。
- 不采用：不恢复成只有一行 409 注释的短例子。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-05.js` | `spring-mvc-exception` 的例子加回两段 Java |
| `web/src/data/curriculum.json` | 导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：内容校验通过。浏览器打开该课例子，能看到 `@RestControllerAdvice` 和 `AuthenticationEntryPoint` 两段 Java，HTTP 响应仍在。

## 后续

- [ ] 不要再往 `example-code-blocks.js` 写 `spring-mvc-exception`。那个表会整段覆盖本课例子

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-05.js` 里 `spring-mvc-exception` 的 `example`
3. 禁区：500 的处理器不要把异常信息写进 `detail`
