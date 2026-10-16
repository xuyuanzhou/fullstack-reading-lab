# Spring 生态补上 Boot 和 Spring Cloud Alibaba

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 技能树 Java 组 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

Spring 生态只有 Spring、AOP、Spring Security、MyBatis、JPA。启动和装配课挂在 Spring 上，Spring Cloud Alibaba 的总览课没有印章。

## 决策

- 采用：在 Spring 后面加「Spring Boot」和「Spring Cloud Alibaba」。Boot 前置是 Spring，SCA 前置是 Boot。Boot 挂启动、外部配置、Boot 3 自动配置清单、WAR、DevTools、优雅停机。SCA 挂总览、组件地图、一次下单、断路器换代、已退出的 Netflix 组件、Stream 绑定、SchedulerX、短信。总数 95。Java 服务场景在 Spring 之后点亮 Boot。
- 不采用 / 刻意不做：不把 Nacos、Sentinel、Seata、Dubbo、OpenFeign、RocketMQ、对象存储从中间件挪过来。不把 AOP 的 CGLIB 默认课从 AOP 挪走。不新写课文。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | `boot`、`sca`；启动课和优雅停机从 Spring 挪到 Boot |
| `web/src/components/learning/SkillSigil.tsx` | 两枚线稿 |
| `scripts/learning-platform.test.mjs` | 总数 95；Java 场景下一步是 Boot |

## 验证

```bash
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：22 项通过。
- `#/skills` 展开「Spring 生态 0 / 7」：Spring、Spring Boot、Spring Cloud Alibaba、AOP、Spring Security、MyBatis、JPA。页头 0/95，Java 列 0/12，后端干线 0/32。
- 点开 Spring Boot 进入 `spring-enter-boot`。点开 Spring Cloud Alibaba 进入 `sca-what`。「Spring Cloud Alibaba」整行宽 131px，落在 136px 的名称格里。

## 后续

- [ ] 不要把 Nacos、Sentinel、Seata 再并进 SCA 这一枚
- [ ] 不要把 `spring-enter-boot` 挂回 Spring

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/learningSkills.ts` 的 `boot`、`sca`
3. 若续作：组件专课留在中间件各自的印章；SCA 印章只放还没有自己印章的总览和接入课
4. 禁区：勿改 `gateCleared`；勿把已读课重置
