# 授权：谁能读这一笔订单

两个租户，账号 10 和 12 的角色名都是 `owner`，11 是 `clerk`，20 在另一个租户。身份只来自测试用的请求头 `Account-Id`，不是登录协议。

能读到订单的条件是：账号存在、没有被撤销、租户与订单相同、并且就是这一行的 `owner_id`。角色名不能代替 `owner_id`。

商品查询把租户、拥有者和商品标识都放在参数里。传入 `pen' OR '1'='1` 不会带出别人的订单。

## 固定版本

| 项 | 版本 |
| --- | --- |
| JDK | Temurin 21.0.12.1 |
| Spring Boot | 3.4.5 |
| MySQL 镜像 | mysql:8.4 |
| Testcontainers | 1.20.6 |
| 构建 | Maven Wrapper 3.9.9 |

## 合成数据

| 账号 | 租户 | 角色 | 撤销 | 订单 |
| --- | --- | --- | --- | --- |
| 10 | 1 | owner | 否 | 1，sku `pen` |
| 11 | 1 | clerk | 否 | 无 |
| 12 | 1 | owner | 是 | 3，sku `tape` |
| 20 | 2 | owner | 否 | 2，sku `book` |

## 核对

需要本机 Docker。

```bash
cd labs/order-g4
./mvnw -s maven-settings.xml test
```

`GET /orders/1`，请求头 `Account-Id: 10`，返回 200 和 `pen`。没有这个请求头是 401，`type` 为 `anonymous`。11 读 1 是 403 `not-owner`。20 读 1 是 403 `cross-tenant`。12 读自己的 3 是 403 `revoked`。10 读 3 也是 `not-owner`。

## 评分边界

- 拥有者能读自己的订单。
- 匿名、非拥有者、跨租户、已撤销各自有拒绝测试，成功读取的测试仍在。
- 带引号的商品标识返回 0 行；精确的 `pen` 只返回账号 10 的那一行。
- 这一组没有 OIDC、文件上传、跨站请求伪造和工程回归。
