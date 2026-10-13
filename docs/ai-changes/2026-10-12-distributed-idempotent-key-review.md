# 幂等业务键课：标题与至少一次口径

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `distributed-idempotent-key` 审查后落地 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

标题「最终一致靠同一业务键」易把最终一致收窄成只靠键；promptAnswer 未强调同事务；core「事务消息」易混。

## 决策

- 采用：标题改为「至少一次下同一业务键只生效一次」（无逗号，避免短名只剩「至少一次下」）；收紧 promptAnswer；括注业务键与至少一次/恰好一次；去掉易混「事务消息」；答案分条；deep 链邻课。
- 不采用：课上展开本地资料元讨论。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-48.js` | 本课正文 |
| `curriculum/example-code-blocks.js` / `learningPaths.ts` | 对齐 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过（1056 / 3176）

## 后续

- [ ] 浏览器打开本课扫一眼标题与参考答案

## 给下一模型

1. 先读：本文 + 契约第 11 节「正确性优先」
2. 再读：`curriculum/coverage-java-48.js` 中本课
3. 若续作：勾选「后续」
4. 禁区：勿写回「最终一致=只靠业务键」；勿声称端到端恰好一次
