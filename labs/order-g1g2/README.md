# 关卡 1 / 关卡 2 下单样板

这一份只验证：库存为 1 时只有一笔订单写成功，同一个幂等键不会再写一笔。数据库是 MySQL 8.4，测试用 Testcontainers 拉起，不用内存库代替。

没有 React 页面，也没有 Vue 页面。关卡 1 要求的双端界面不在这里。网站上的任务勾选仍然是自评，跑过这里的测试不会把路线页标成通过。

## 固定版本

| 项 | 版本 |
| --- | --- |
| JDK | Temurin 21.0.12.1 |
| Spring Boot | 3.4.5 |
| MySQL 镜像 | mysql:8.4 |
| Testcontainers | 1.20.6 |
| 构建 | Maven Wrapper 3.9.9。本机默认 Maven 3.6.2 低于编译插件要求的 3.6.3 |
| 站点 Node | 24.11.0。本样板不启动 Node |

## 核对

需要本机 Docker。

```bash
cd labs/order-g1g2
./mvnw -s maven-settings.xml test
```

`maven-settings.xml` 只指向 Maven Central。本机默认仓库握手失败时用这份设置，不改全局 Maven 配置。

`staleVersionUpdatesNoRow` 确认过期版本改不到行。`naiveWriteFailsTheStaleVersionContract` 用先读后写的更新去跑同一条契约，契约会失败。

手工启动需要自己准备 MySQL，再传入数据源：

```bash
docker run --rm -p 3306:3306 -e MYSQL_ROOT_PASSWORD=order -e MYSQL_DATABASE=orders mysql:8.4
./mvnw -s maven-settings.xml spring-boot:run -Dspring-boot.run.arguments="--spring.datasource.url=jdbc:mysql://127.0.0.1:3306/orders --spring.datasource.username=root --spring.datasource.password=order"
```

`GET /orders` 一开始是空数组。有订单后按 `id` 返回 `orderId` 和 `sku`。

`POST /orders`，请求头 `Idempotency-Key`，正文 `{"sku":"pen"}`。第一次返回 201。同一键、同一商品再请求返回 200，`replay` 为 true。同一键换成别的商品返回 409，`type` 为 `idempotency-conflict`。

## 评分边界

- 库存为 1 时，20 个不同的键只留下 1 笔订单，库存为 0。
- 同一个幂等键、同一商品再次提交返回 200，`replay` 为 true，订单仍是 1 笔。
- 同一个键换成别的商品返回 409，`type` 为 `idempotency-conflict`，库存和订单数不变。
- 过期版本的条件更新改到 0 行，数量仍是 1。
- `naiveWriteFailsTheStaleVersionContract` 必须因不带版本的更新而失败。这项测试要留着。
- `GET /orders` 先是空数组，创建后按 `id` 返回 `orderId` 和 `sku`。
- 这一组没有 React 或 Vue。网站上的勾选仍是自评。不用内存库代替 MySQL。
