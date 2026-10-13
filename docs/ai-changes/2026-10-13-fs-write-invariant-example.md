# 写入成功课补上条件更新和提交时机

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | `fs-write-invariant`；审查并优化「写入成功的定义是不变量已经提交」 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

成功的定义本来就对：不变量提交之后才写成功状态码。课上能看见的例子被 `example-code-blocks.js` 盖成一句 SQL 和注释。正文把「写成内存里的数」和「库存变负」说成同一件事，也没写明 200 却没有订单是外层接住了已回滚的异常。

## 决策

- 采用：先插入带唯一幂等键的订单行，再按 `WHERE qty >= 1` 扣库存；影响行数不是 1 就抛运行时异常。`DuplicateKeyException` 在 `@Transactional` 方法里接住时事务仍会提交，所以冲突分支里还没有扣库存。201 写在 `place` 正常返回之后。
- 不采用：不把「先读再写入算好的数」说成库存变负。那种写法是两张订单都在，库存停在后一次写入的值。不加条件的 `qty = qty - 1` 才会变成负数。不改关卡交付文案。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | `fs-write-invariant` 的正文、例子、答案、要点、相关课 |
| `curriculum/example-code-blocks.js` | 删除会覆盖本课例子的 SQL 注释 |
| `curriculum/answer-walkthrough.js` | 练习答案与课文同步 |
| `web/src/data/curriculum-bodies-java.json` | 导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：1063 课 / 3199 个知识点，内容校验通过。浏览器打开 `#/java/fullstack/fs-write-invariant`，例子里有唯一约束、条件更新、`@Transactional` 和 `JdbcTemplate.update`。

## 后续

- [ ] 不要再往 `example-code-blocks.js` 写 `fs-write-invariant`
- [ ] 隔离级别和快照读的细节留在 `mysql-mvcc`，不要搬回本课

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-06.js` 里 `fs-write-invariant`；`mysql-mvcc`
3. 若续作：有幂等键时先插入再扣库存。外层接住运行时异常再返回 200，数据库里可以没有这张订单
4. 禁区：不要把注释桩写回 `example-code-blocks.js`；不要改关卡交付文案
