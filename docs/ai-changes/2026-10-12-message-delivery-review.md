# 消息重试与消费幂等：提问与确认口径对齐

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `message-delivery`；Kafka Delivery Semantics |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查发现：练习的第三时点写成「确认消息前」，和答案里的「确认之后」对不上；正文后半段重复；提问没有一句答案；覆盖稿把「确认前崩溃」写成会丢消息。

## 决策

- 采用：三种时点改为写库前、写库后确认前、确认后。确认晚于提交；确认没被服务端收下仍算确认前。撞上唯一键后仍要确认。至少一次、业务键、确认首次点击释义。相关课指向投递语义与 SETNX 课。
- 不采用：在本课展开 SETNX 命令；不把恰好一次整段搬进本课。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/extra-lessons.js` | `message-delivery` 正文、提问答案、练习与细节 |
| `curriculum/answer-walkthrough.js` | 去掉错误的「确认前崩溃会丢消息」，细节与源课对齐 |
| `curriculum/example-code-blocks.js` | 撞键后仍要确认 |
| `curriculum/knowledge-points.js` | 三点改为可核对命题 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
cd web && node ../scripts/export-curriculum.mjs && node ../scripts/verify_content.mjs
```

- 结果：1057 课 / 3181 知识点。浏览器打开该课：确认释义可点开；提问答案与三种时点已对齐。

## 后续

- [ ] 无

## 给下一模型

1. 先读：本文 + `curriculum/extra-lessons.js` 的 `message-delivery`
2. 再读：`answer-walkthrough.js` 同 id。覆盖稿更长时会盖住源课，改一边要核对另一边
3. 禁区：释义 〔〕 内不要写句号，核心模型按句切开时会把释义拆断
