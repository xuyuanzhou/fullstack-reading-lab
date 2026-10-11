# 公开课去掉口语「连发」

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | `fs-four-layers`、`fs-write-ui`；用户：连发是专业术语吗 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

参考答案写「只是减少连发」。「连发」是口语，不是重复提交 / 重复点击的通行说法。

## 决策

- 采用：改成「重复点击」或「再次提交」，与正文「双击 / 防重复点击」一致。
- 不采用：把消息队列练习里「连发三条事件」一并改掉（那里是连续发送，另义）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | `fs-four-layers` answer；`fs-write-ui` core |
| `curriculum/answer-walkthrough.js` | 同步 answer |
| `curriculum/lessons.js` | 幂等课 core 里的「只减少连发」 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
rg '连发' curriculum/coverage-path-06.js curriculum/answer-walkthrough.js curriculum/lessons.js
```

- 结果：上述文件无「连发」；答案为「这只减少重复点击」。

## 后续

- [ ] 消息队列「连发三条」若显得口语，可改成「连续发送三条」
- [ ] 不要把「重复点击」再改回「连发」

## 给下一模型

1. 先读：本文
2. 公开课用词：不为好读保留口语分类名或套话
