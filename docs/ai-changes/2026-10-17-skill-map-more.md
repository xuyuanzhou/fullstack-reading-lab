# 技能树续挂模式、SQL、库表、微服务和拆分课文

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | 技能树；[2026-10-16-skill-map-gaps.md](2026-10-16-skill-map-gaps.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

10 月 16 日的拆分已在 main：设计模式四枚、SQL 生态三枚、库表设计三枚、微服务组件含配置中心与 SchedulerX、领域设计四枚、架构设计五枚，总数 110，架构列可收起。这些组里仍有课库课文没挂上。

## 决策

- 采用：只挂课库已有、且还没归到别的印章的课文。总数 111。新印章只有「短信」（`sca-sms-intro`，从 Spring Cloud Alibaba 印章挪出，前置 Spring），线稿是信封几何，不是品牌标志。
  - 设计模式：标准库和 Spring 里的例子挂到已有家族。模式目录加 `spring-getbean-hides-deps`。创建型加 `spring-factorybean-product`。结构型加缓冲流、JDK 动态代理、不可修改视图。行为型加 Comparator、Runnable、Spring 事件、JdbcTemplate 回调。
  - SQL 基础补上 NULL、HAVING、UNION、SELECT *、CTE、临时表、视图、存储过程、触发器、INSERT 列名、JOIN 启发式。
  - 查询优化补上索引章剩余课文，以及 OR/IN、子查询、Query Cache。
  - 表设计补范式、CHECK、宽列拆表、列数启发式、千万行拆分启发式。字段类型补 NULL、TEXT、VARCHAR 行宽、浮点、JSON、ENUM、外键禁令、手机号长度、自增持久化、UUID 主键。结构迁移补同表 DDL 合并启发式。
  - 微服务组件：Nacos 加上停机摘除。Dubbo 补上超时重试、线程池、Filter、QOS、找不到提供者、注册中心本地缓存、下单链路位置。Seata 加上 AT 第一阶段已提交。
  - 服务拆分加上 SOA 与微服务差别、拆分与集群、连接数推不出必须拆服务。
- 不采用 / 刻意不做：不移动 Sentinel。不给 Eureka、LoadBalancer、Next、Zustand、ZooKeeper 单开印章。Eureka 只有 `eureka-lease-30-90`，不并进 Nacos。慢查询章剩下的 Resource Group 不是排查步骤，不挂上慢查询排查。领域设计四课已经挂满，没有第五门领域课。复制、安装、容量口号仍留在课库，不塞进 SQL 基础或表设计。不改点亮规则，不收起架构列。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 短信印章；上述课文挂到已有印章 |
| `web/src/components/learning/SkillSigil.tsx` | 短信线稿 |
| `scripts/learning-platform.test.mjs` | 总数 111；短信不留在 Spring Cloud Alibaba |

## 验证

```bash
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：22 项通过。
- `#/skills` 页头 0/111。微服务组件收起为 0/8。搜索「短信」只剩这一枚，组名是微服务组件，前置是 Spring。架构列仍是领域设计 0/4、架构设计 0/5。

## 后续

- [ ] 不要把短信并回 Spring Cloud Alibaba
- [ ] 不要给 Eureka 或 LoadBalancer 单开印章
- [ ] 不要把架构列改回只有一个组

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/learningSkills.ts` 的 `sms`、`sql`、`sqlopt`、`column`、`dubbo`、`split`
3. 若续作：先有独立成章的课文再加印章。Sentinel 留在容量与防护
4. 禁区：勿改 `gateCleared`；勿把已读课重置；勿把 `skillLaneFolds('架构')` 改回 false
