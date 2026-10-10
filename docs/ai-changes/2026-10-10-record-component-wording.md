# record 课去掉自造词「分量」

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | `java-record-accessor` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`java-record-accessor` 把 JEP 395 的 component 写成「分量」。这不是规范用语，读者不知道它指圆括号里的名字。

## 决策

- 采用：正文直接指 `Money(long cents, String currency)` 里的 `cents` 和 `currency`，并写明规范原词是 component。标题、要点、细节、例子、练习同步改掉。
- 不采用 / 刻意不做：不用「记录组件」再译一遍。不改其它课。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-ops-17.js` | `java-record-accessor` 去掉「分量」 |
| `curriculum/example-code-blocks.js` | 例子导语改为「取值方法是括号里的名字」 |
| `web/src/data/curriculum*.json`、`legacy/publication-order.js` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：907 lessons / 2729 knowledge points；导出与发布清单一致。课页 `#/java/java-basics/java-record-accessor` 正文出现 component 与 `cents()`，不再出现「分量」。

## 后续

- [ ] Java 基础类型与语法新课仍待确认后再写，不要趁这次改动开写。
