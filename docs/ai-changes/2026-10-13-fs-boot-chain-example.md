# 写接口分段课的例子补上 Spring 代码

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | `fs-boot-chain`；审查并优化「写接口分成校验、用例、事务和响应」 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

课上能看见的例子被 `example-code-blocks.js` 整段盖掉，只剩一行注释里的 `@Transactional`。直接返回对象时 Spring MVC 默认是 200，和正文里的 201 对不上。校验注解、仓储和响应类型都没有出现。

## 决策

- 采用：例子写出请求类型（`@NotBlank`、`@Positive`）、控制器（`@Valid`、`@RequestBody`、`ResponseEntity` 201）、用例（`@Transactional`、库存不足抛运行时异常）和仓储接口。409 仍指向 `spring-mvc-exception`，不在本课重写异常处理器。
- 不采用：不恢复「漏到 HTTP」「堆在控制器」。事务仍标在用例上，持久化仍是仓储，不把标题改成四层。不把 `fs-boot-chain` 再写回 `example-code-blocks.js`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | `fs-boot-chain` 的正文、例子、答案、要点、相关课 |
| `curriculum/example-code-blocks.js` | 删除会覆盖本课例子的短注释 |
| `curriculum/answer-walkthrough.js` | 练习答案与课文同步 |
| `web/src/data/curriculum-bodies-java.json` | 导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：1063 课 / 3199 个知识点，内容校验通过。浏览器打开 `#/java/fullstack/fs-boot-chain`，例子里有四段 Java，没有原来的注释桩；「问题详情」释义能点开。

## 后续

- [ ] 不要再往 `example-code-blocks.js` 写 `fs-boot-chain`。那个表会整段覆盖本课例子
- [ ] 不要把 409 的 `@ExceptionHandler` 抄回本课

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-06.js` 里 `fs-boot-chain`；`docs/ai-changes/2026-10-11-fs-boot-chain-plain.md`
3. 若续作：分层仍是校验、用例、持久化、响应；事务在用例方法上。方法直接返回对象是 200，201 必须写在 `ResponseEntity` 或 `@ResponseStatus` 上
4. 禁区：不要把注释桩写回 `example-code-blocks.js`；不要改关卡交付文案
