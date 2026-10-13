# 预备基础：订单列表

这一组只验证三件事：空列表、按提交顺序展示三条合成订单、非法金额被拒绝且列表不变。数据在进程内存里。并发、幂等和真实数据库在 `labs/order-g1g2`，不要用这里代替那一份。

没有 React 页面，也没有 Vue 页面。网站上的任务勾选仍然是自评。

## 固定版本

| 项 | 版本 |
| --- | --- |
| JDK | Temurin 21.0.12.1 |
| Spring Boot | 3.4.5 |
| 构建 | Maven Wrapper 3.9.9 |
| 页面 | Node 24.11.0，直接运行 TypeScript |
| 数据库 | 无。本样板不启动 Docker，也不使用 MySQL |

## 合成订单

| sku | amount |
| --- | --- |
| pen | 1.50 |
| book | 12.00 |
| cup | 3.25 |

## 核对

```bash
cd labs/order-g0
./mvnw -s maven-settings.xml test
node --experimental-strip-types --test page/orders.test.mjs
```

`maven-settings.xml` 只指向 Maven Central，不改全局 Maven 配置。

手工启动：

```bash
./mvnw -s maven-settings.xml spring-boot:run
```

`GET /orders` 一开始是空数组。`POST /orders` 的正文是 `{"sku":"pen","amount":"1.50"}`，成功是 201。`amount` 为负数或小数超过两位时返回 400，`type` 为 `invalid-amount`，列表不变。

页面模块是 `page/orders.ts`。请求失败时 `nextDraft` 保留原来的商品和金额。页面上的检查不能代替服务端的 400。

## 评分边界

- 通过：三条订单按 pen、book、cup 的顺序出现；空列表长度为 0；负数和超过两位小数返回 `invalid-amount`，并且 `GET /orders` 仍是原来的长度。
- 页面：失败后草稿字段还在；成功后草稿清空。
- 这一组没有覆盖双框架页面、事务、缓存、授权和工程回归。
