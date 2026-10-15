# 技能树补上已有课文的岗位技能

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/技能树加页设计-2026-10-15.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

技能页只有十几个名字，课库里已经有 TypeScript、JVM、JPA、测试、持续集成这些课，却没有对应节点。

## 决策

- 采用：在原有点亮规则上补 31 项。每项都挂课库里已有的课文。新增一列「架构」。前置仍用 `allOf`，一节点最多两个。
- 采用：JPA 接 Spring，Pinia 接 Vue，服务端状态接 React，SQL、Elasticsearch、表结构接 MySQL，Kafka、待发事件、补偿接消息队列，Compose 和密钥接 Docker。
- 不采用：不改九关石台和 `gateCleared`。没有课文的单元不加空节点。不把已点亮写成认证。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 48 项技能、课文和前置 |
| `scripts/learning-platform.test.mjs` | 课文必须在课库里，图不能有环 |
| `docs/技能树加页设计-2026-10-15.md` | 名单和前置 |

## 验证

```bash
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：20 项测试通过。浏览器 `#/skills` 能看到 TypeScript、JVM、测试和架构列；点 TypeScript 进入课文；总图九关仍在。

## 后续

- [x] 补上已有课文的岗位技能
- [x] 再补 CSS、跨端、Spring Cloud 和 Linux 等已有课文。见 [2026-10-15-skill-fill.md](2026-10-15-skill-fill.md)
- [x] 基础验证已标技能。见 [2026-10-15-skill-checks.md](2026-10-15-skill-checks.md)
- [ ] 没有课文的路线图单元先不要画成节点

## 给下一模型

1. 先读：本文与 `docs/技能树加页设计-2026-10-15.md`
2. 再读：`web/src/data/learningSkills.ts` 的 `SKILL_VIEWS`
3. 若续作：只加课库里已有课文的技能。新 id 追加在 `dual-framework` 之后的图节点里，不要改动 `LEARNING_SKILLS[5]` 仍是双框架这一事实
4. 禁区：勿改闯关石台和 `gateCleared`；勿把已点亮写成认证；勿把发暗做成不能开课
