# 技能树再补课库里已有的岗位技能

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/技能树加页设计-2026-10-15.md`；`docs/ai-changes/2026-10-15-skill-more.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

48 项之后，课库里仍有 CSS、浏览器、微前端、Node.js、React Native、Flutter、小程序、设计模式、Spring Cloud 组件、RabbitMQ、Linux、Git 这些课文，技能页上没有对应印章。

## 决策

- 采用：再加 28 项，每项只挂课库里已有的课文。前置仍用 `allOf`，一节点最多两个。
- 采用：React Native 接 React，微前端和 Node.js 接 JavaScript，HTTPS 和 WebSocket 接 HTTP，AOP、Spring Security、OpenFeign、Nacos、Dubbo、Seata 接 Spring，PostgreSQL 和 MongoDB 接 MySQL，RabbitMQ 和 RocketMQ 接消息队列，Sentinel 接限流熔断。
- 不采用：不改九关石台和 `gateCleared`。不把已点亮写成认证。没有课文的单元不加空节点。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 76 项技能、课文和前置 |
| `web/src/components/learning/SkillSigil.tsx` | 新印章线稿 |
| `scripts/learning-platform.test.mjs` | 技能数改为 76，课文仍须在课库里 |
| `docs/技能树加页设计-2026-10-15.md` | 名单和前置 |

## 验证

```bash
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：20 项测试通过。浏览器总图是 5/76，九关石台仍在。点 CSS 进入「width 含不含 padding」。RabbitMQ 因消息队列未点亮而发暗，仍能打开「RabbitMQ」课文。

## 后续

- [x] 再补课库里已有课文的岗位技能
- [x] 基础验证已标技能。见 [2026-10-15-skill-checks.md](2026-10-15-skill-checks.md)
- [ ] 没有课文的路线图单元先不要画成节点

## 给下一模型

1. 先读：本文与 `docs/技能树加页设计-2026-10-15.md`
2. 再读：`web/src/data/learningSkills.ts` 的 `SKILL_VIEWS`
3. 若续作：只加课库里已有课文的技能。新 id 追加在 `LEARNING_SKILLS` 末尾，不要改动 `LEARNING_SKILLS[5]` 仍是双框架
4. 禁区：勿改闯关石台和 `gateCleared`；勿把已点亮写成认证；勿把发暗做成不能开课
