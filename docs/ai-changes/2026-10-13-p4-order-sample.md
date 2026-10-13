# P4-01 下单样板在 MySQL 上跑通版本条件和幂等键

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 P4-01。P4-02～P4-06 未做 |
| 关联 | [全栈学习平台实施总计划](../全栈学习平台实施总计划-2026-10-13.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

关卡 1 / 关卡 2 需要一份能启动的下单样板：库存为 1 时并发只留下一笔订单，同一个幂等键重试也不再写一笔。数据库必须是 MySQL，不能用内存库代替。

## 决策

- 采用：`labs/order-g1g2` 使用 Spring Boot 3.4.5、JDBC、Flyway、MySQL 8.4 和 Testcontainers 1.20.6。库存按版本做条件更新。幂等键唯一，请求摘要是商品标识的 SHA-256。20 个线程用 `CyclicBarrier` 同时开始，核对时另开 JDBC 连接。先读后写、不带版本的更新会让「过期版本改不到行」这条断言失败。构建用项目内 Maven Wrapper 3.9.9，因为本机默认 Maven 3.6.2 低于编译插件要求的 3.6.3。`maven-settings.xml` 指向 Maven Central，避开本机默认仓库的握手失败。
- 不采用 / 刻意不做：不写 React 或 Vue。不把测试通过写进路线页勾选。不把 P3-05、P4-02～P4-06 或 P5～P8 标成完成。不改用 H2。不提交，不发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `labs/order-g1g2/` | 下单服务、Flyway 脚本、六条测试、启动说明、Maven Wrapper |
| `.gitignore` | 忽略该样板的 `target/` |
| `docs/全栈学习平台实施总计划-2026-10-13.md` | 只勾选 P4-01 |
| `docs/ai-changes/2026-10-13-p3-pause-resume.md` | 把「等待可运行实验」标为已续写到本文 |

## 验证

```bash
cd labs/order-g1g2
./mvnw -s maven-settings.xml test
```

- 结果：通过。`Tests run: 6, Failures: 0, Errors: 0, Skipped: 0`，`BUILD SUCCESS`。本机 JDK 为 Temurin 21.0.12.1，Node 为 24.11.0，Docker 为 24.0.5。首次拉取 `mysql:8.4` 和 `testcontainers/ryuk:0.11.0`。用本机 Maven 3.6.2 直接 `mvn test` 失败，原因是 `maven-compiler-plugin:3.13.0` 要求 Maven 3.6.3。
- 未执行：浏览器。这条改动不改路线页。网站勾选没有因为这次测试变成通过。

## 后续

- [x] P3-05 已续写到 [把下单样板接到当次任务](2026-10-13-p3-lab-loop.md)。测试通过本身不是页面上的通过。
- [ ] P4-02～P4-06：预备基础、双框架、查询与缓存、授权、工程回归。不要把这一份下单样板当成这六组都完成。
- [ ] P0-04 仍要模型小样本；没有授权就不买云。
- [ ] 不要把 `schema-migration`、`cookie-credential`、`http-methods` 等课的短例子块加回 `example-code-blocks.js`。

## 给下一模型

1. 先读本文和 `labs/order-g1g2/README.md`
2. 核对命令是 `./mvnw -s maven-settings.xml test`。Docker 必须可用。拉镜像失败时不要改成 H2
3. 若续作：做 P4-02。P3-05 已完成。不要重写这份样板，除非测试不再通过
4. 禁区：不把 `mvn test` 的结果写进 `gateCleared`，不清理他人未提交文件，不部署
