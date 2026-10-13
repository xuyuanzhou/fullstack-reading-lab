# Dubbo 专节补进 Spring Cloud Alibaba

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | 补齐 Dubbo 调用路径、配置、注册、集群容错和生产失败；Spring、MyBatis、Nginx、Kafka、Redis、MySQL 沿用已有章 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

课表里 Dubbo 只有四节纠偏（协议不再冻结成 Hessian + ZooKeeper、默认加权随机、超时重试、注册中心宕机后的本地缓存），没有从一次调用讲到暴露、注册模式和线程池拒绝的路径。Spring、JPA、MyBatis、Nginx、Kafka、Redis、MySQL 已有专章，不应再复制一套。

## 决策

- 采用：在 Spring Cloud Alibaba 下新增「Dubbo」小节，共 12 课。新写 8 课，并把原有 4 课从「调用」移入这一节。事实以 Dubbo 3.3.5 源码默认值为准：协议名 `dubbo`、端口 20880、`register-mode=all`、集群容错 `failover`、retries 2（最多 3 次）、线程池 200、`queues=0` 即 `SynchronousQueue`。池满时 `AllChannelHandler` 走 `sendFeedback`，消费方收到失败，而不是先把超时当成唯一现象。
- 不采用 / 刻意不做：不把 Triple 写成“不配置就生效”的默认协议；不把 Dubbo 3 写成“已经没有接口级注册”；不重写 Spring、Hibernate/JPA、MyBatis、Nginx、Kafka、Redis、MySQL 专章；不另建面试题库或独立实训仓库。下单边界课用链接指向这些已有课。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-dubbo.js` | 新增 8 课 |
| `scripts/curriculum.mjs` | 发布该脚本；大纲增加 Dubbo 小节 |
| `legacy/index.html` | 按发布顺序引入脚本 |
| `web/src/data/curriculum*.json` | 导出 |
| `README.md` | 课数改为 1082 / 3257，并写明 Dubbo 小节 |

新课 id：`dubbo-one-call`、`dubbo-spring-expose`、`dubbo-register-mode`、`dubbo-zk-ephemeral`、`dubbo-cluster-failover`、`dubbo-thread-pool`、`dubbo-no-provider`、`dubbo-beside-stack`。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：1082 课 / 3257 个知识点，内容校验通过。浏览器打开 `#/java/spring-cloud-alibaba/dubbo-one-call`，RPC 释义能点开；`#/java/spring-cloud-alibaba/dubbo-beside-stack` 的例子里有 `@DubboService`、条件更新 SQL 和 `@DubboReference`。侧栏 Dubbo 为 0/12。

## 后续

- [ ] 若升级 Dubbo 小版本，先核对 `DEFAULT_PROTOCOL`、`DEFAULT_REGISTER_MODE`、`DEFAULT_THREADS` 是否仍是上述值
- [ ] 不要把这 8 课的 id 写进 `example-code-blocks.js`，否则会整段盖掉课文里的 Java
- [x] 不重写已有中间件与数据库章

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-dubbo.js`、`scripts/curriculum.mjs` 里 Spring Cloud Alibaba 的 Dubbo 小节
3. 若续作：只补 3.3.5 之后源码已经改变的默认值，或某一课例子被桩覆盖的情况
4. 禁区：不要把 Triple 写成零配置默认；不要把 `register-mode` 默认改写成只有 instance；不要把线程池拒绝说成消费方一定等到超时
