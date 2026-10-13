# 三个「一致」课：提问答案与分条收口

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `distributed-consistency-three-words` 审查 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查：promptAnswer 未点明混称会错修法；答案未分条；core「对得上」宜规范；deep 宜回链 CAP。

## 决策

- 采用：收紧 promptAnswer；答案五条；core「稍后收敛」；deep 链 `distributed-cap` / `distributed-one-db-first`。
- 不采用：整节重写；课上展开本地资料元讨论。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-48.js` | 上述正文与答案 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过

## 后续

- [ ] 浏览器打开本课扫一眼提问答案与参考答案分条

## 给下一模型

1. 先读：本文 + 契约第 11 节「正确性优先」
2. 再读：`curriculum/coverage-java-48.js` 中本课
3. 若续作：勾选「后续」
4. 禁区：勿把三层「一致」合成 CAP 一句写回 core
