# 资料核验记录（批次 40）

本批课程对照 MyBatis 3.5 日志与插件文档、PageHelper 现行插件类、MyBatis-Plus 安装与分页文档写成。2026-10 又按官网核对过 Spring Boot 3 的依赖名，把 Boot 2 starter、旧分页拦截器类名从课里划掉。不把私人长手册标成全文已核验。

| 课程 | 说法 |
| --- | --- |
| `mybatis-log-preparing-parameters` | DEBUG 是 Preparing + Parameters；不写 logImpl 走 SLF4J，LOG4J 自 3.5.9 弃用 |
| `mybatis-jdbc-log-inlines` | 改写后的 SQL 在 JDBC/连接池日志；Boot 3 用 `druid-spring-boot-3-starter`，StatFilter 默认关 |
| `mybatis-debug-boundsql` | 断点打在带 BoundSql 的 Executor |
| `mybatis-pagehelper-next-query` | 插件类是 `PageInterceptor`；Boot 3 用 starter 2.x，Boot 4 用 4.x；startPage 只影响下一次查询 |
| `mybatis-plus-page-argument` | Boot 3 用 `mybatis-plus-spring-boot3-starter` 加 `mybatis-plus-jsqlparser`；分页放在 InnerInterceptor 最后；3.5.9 起通用层用 `IRepository` |
| `mybatis-middleware-layers` | Spring `@Transactional` 里换不了已取出的连接；`@DSTransactional` 不是 XA |

对照过的页面：

- [MyBatis Logging](https://mybatis.org/mybatis-3/logging.html)、[settings](https://mybatis.org/mybatis-3/configuration.html#settings)
- [PageHelper 如何使用](https://pagehelper.github.io/docs/howtouse/)
- [MyBatis-Plus 安装](https://baomidou.com/getting-started/install/)、[分页](https://baomidou.com/plugins/pagination/)、[数据层接口](https://baomidou.com/guides/data-interface/)
- [Druid Boot 3 starter](https://github.com/alibaba/druid/blob/master/druid-spring-boot-starter/README_EN.md)、[dynamic-datasource](https://github.com/baomidou/dynamic-datasource-spring-boot-starter)
