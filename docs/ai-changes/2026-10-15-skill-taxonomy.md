# 技能树赛道重分与基础前置排序

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/技能树结构-2026-10-15.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

技能树列序把框架放在语言前面，并把 TCP、中间件产品、Java 语言混在同一「后端/前端」列，不符合从入门到精通的认知，赛道边界也不清。

## 决策

- 采用：八赛道——计算机基础、前端、Java、数据存储、中间件、分布式与高并发、工程与运维、架构；每赛道下设子分类（`group`）。完整树与对照表写入 `docs/技能树结构-2026-10-15.md`。
- 采用：基础前置——HTTP 要 TCP，JS 要 HTML，Spring 要 Java，MySQL 要 SQL，Redis/MQ 要 MySQL，K8s 要 Docker 等；页面按赛道→子分类→组内序渲染。
- 不采用：不改 `gateCleared`；不把已点亮写成认证；不为凑分类造无课文节点。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | `SKILL_LANES`、`SKILL_VIEWS.group`、`allOf`、`skillGroupsInLane` |
| `web/src/pages/SkillsPage.tsx` | 按赛道与子分类渲染 |
| `web/src/styles/_reading.scss` | `.skill-group` |
| `scripts/learning-platform.test.mjs` | 赛道与前置断言 |
| `docs/技能树结构-2026-10-15.md` | 完整结构与调整说明 |
| `docs/技能树加页设计-2026-10-15.md` | 指向新结构 |

## 验证

```bash
node --experimental-strip-types --test scripts/learning-platform.test.mjs
```

- 浏览器 `#/skills`：最左列是计算机基础（TCP 等）；Java 列先 Java 基础再 Spring；中间件与数据存储分列。

## 后续

- [ ] 勿把 Nacos/Dubbo 再塞回 Java 列
- [ ] 挂课增减不改动赛道边界时，只需改 `SKILL_LESSONS`

## 给下一模型

1. 先读：`docs/技能树结构-2026-10-15.md`
2. 再读：`learningSkills.ts` 的 `SKILL_VIEWS` / `LEARNING_SKILLS`
3. 若续作：新节点先定赛道与 `group`，再写 `allOf`（≤2）
4. 禁区：勿改 `gateCleared`；勿取消基础前置；勿把已点亮写成认证
