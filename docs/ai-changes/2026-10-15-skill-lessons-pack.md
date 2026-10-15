# 技能树挂课按课库主干补齐

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-15-skill-more.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

不少技能只挂了 1～2 篇课（如 JavaScript、React、Spring 各 1 篇），点亮太轻，也和课库里同主题的主干课对不上。

## 决策

- 采用：按课库已有课文扩 `SKILL_LESSONS`。主技能挂 8～15 篇核心课；与课库章节一一对应的（MyBatis、JPA、Netty、网关、算法、Nginx、搜索、Sentinel 等）取该组主干；大组（数据库 109、缓存 49）只取主干，不整章挂满。
- 采用：课 id 全部对照 `curriculum-index.json` 校验。课库本身只有一两篇的（如 PostgreSQL、Git、CDN）不强行凑数。
- 不采用：不改点亮规则与 `gateCleared`；不为没有课文的词条造假课。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 扩写全部技能的挂课列表（约 600+ 次引用） |
| `scripts/learning-platform.test.mjs` | 进度断言跟新挂课；主技能至少 8 篇 |

## 验证

```bash
node --experimental-strip-types --test scripts/learning-platform.test.mjs
```

- 结果：20 项通过。`#/skills` 上 React / Spring / MySQL 等点开后进度分母明显变大。

## 后续

- [ ] 课库以后再补的 PostgreSQL / Git / OSS 相关课，同步挂进对应技能
- [ ] 勿把 MySQL 整章 100+ 篇挂进一个节点

## 给下一模型

1. 先读：本文
2. 再读：`SKILL_LESSONS`、课库 `curriculum-index.json`
3. 若续作：只加课库里已有 id；主技能保持约 8～15 篇主干
4. 禁区：勿改 `gateCleared`；勿把已点亮写成认证；勿用正则乱挂无关课（曾误把跨源课挂进 OSS）
