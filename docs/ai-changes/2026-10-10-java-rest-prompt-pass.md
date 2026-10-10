# Java 轨剩余章提问可读性过一遍（收尾）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 承接 `2026-10-10-java-ops-prompt-pass.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

设计模式 / 工程实践 / 交付与运行已补完。Java 轨仍余约 90 课「为什么」类提问无 `promptAnswer`（SCA、搜索、Nginx、网关、Netty、安全、测试、算法、系统设计及个别库/缓存课）。

## 决策

- 采用：上述剩余 **90 课**全部补上 `promptAnswer`；约 10 课重写叠句提问。至此 Java 轨「为什么 / 怎么 / 何时 / 哪」提问 `withAnswer` 为 **496 / 496**。
- 不采用 / 刻意不做：不在这一刀改机制正文。前端轨若还有缺答案的「为什么」另开刀。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| 多份 `curriculum/coverage-*.js` 等 | 插入 `promptAnswer`；部分改 `prompt` |
| `web/src/data/curriculum-*.json` | `export:curriculum` |

## 验证

```bash
node --input-type=module -e '…java why missing…'
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：Java 轨 why 类 `missing 0`。导出 907 课，校验通过。

## 后续

- [x] 前端轨剩余「为什么」→ `2026-10-10-frontend-rest-prompt-pass.md`
- [ ] 浏览器抽查 SCA / ES / Nginx 课标题下可展开参考答案

## 给下一模型

1. 先读：本文 + 本系列前几刀（core / spring / data / dist / ops）
2. 筛 `!promptAnswer && /为什么|怎么|何时|哪/.test(prompt)`，按 track 推进
3. 禁区：yes/no 提问必须有以「不是/不会/不能」起头的 `promptAnswer`；勿整段复制 `answer`
