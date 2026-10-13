# 读路径课改成说字段和主从，不再说「形状」「有多新」

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | `fs-read-shape` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

课标题「查询返回用例要的形状，并说明它有多新」把两件事收成「形状」和「有多新」。学员看不出是在问响应字段，还是在问刚提交的行能不能马上读到。

## 决策

- 采用：标题和关卡说明改成「详情只返回约定字段」以及「写明读主库，还是允许延迟的从库或缓存」。例子写出 `OrderDetail` 和构造查询，控制器返回这个类型。`example-code-blocks.js` 里原先那条短桩会盖住课文例子，已删掉该键。
- 不采用 / 刻意不做：不把 `@Transactional(readOnly = true)` 写成从库路由。只读提示不等于复制延迟。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | 重写 `fs-read-shape` |
| `curriculum/answer-walkthrough.js` | 参考答案与课文一致 |
| `curriculum/example-code-blocks.js` | 去掉 `fs-read-shape`，避免短桩覆盖 |
| `web/src/data/masteryGates.ts` | 关卡 1 的本课说明、关卡 3 交付第一条 |
| `docs/全栈主线精通审查.md` | 与主库/从库的说法对齐 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
cd web && node ../scripts/export-curriculum.mjs && node ../scripts/verify_content.mjs
```

- 结果：1063 课、3200 个知识点。
- 浏览器 `http://127.0.0.1:5174/#/java/fullstack/fs-read-shape`：标题为「详情接口只返回约定的字段，并写明读主库还是允许延迟的副本」，例子里有 `record OrderDetail`。

## 后续

- [ ] 不要把 `fs-read-shape` 再写回 `example-code-blocks.js`，除非写入的是学员应看到的全文。
