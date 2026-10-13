# 授权起始代码

这里是 `labs/order-g4` 的起始工程，不是参考实现。表结构、四个账号、三笔订单、匿名拒绝和跨租户拒绝已经接上。同一租户里的账号可以读该租户的任意订单，不看 `owner_id`，也不看是否撤销。商品查询把 `sku` 拼进语句，没有同时绑定租户和拥有者。

不要把这个目录加进 `labs/run-regression.sh`。回归只跑参考实现。

## 要补上的行为

`read` 在租户相同之后，还应要求订单的 `owner_id` 等于当前账号。角色名不能代替这一列。账号被撤销时返回 403，`type` 为 `revoked`，即使订单属于该账号。

`findBySku` 应使用参数 `tenant_id`、`owner_id` 和 `sku`。`pen' OR '1'='1` 返回 0 行。精确的 `pen` 只返回账号 10 的那一行。

## 核对

需要本机 Docker。

```bash
cd labs/order-g4-start
./mvnw -s maven-settings.xml test
```

按当前代码，下面四项会失败：

- `clerkDoesNotReadAnotherUsersOrder`：账号 11 读订单 1 得到 200，期望 403
- `ownerRoleDoesNotBypassTheRowOwner`：账号 10 读订单 3 得到 200，期望 403
- `revokedOwnerCannotReadOwnOrder`：账号 12 读订单 3 得到 200，期望 403
- `quotedSkuDoesNotReturnOtherOrders`：带引号的商品标识返回 3 行，期望 0 行

拥有者读自己的订单、匿名、跨租户可以通过。补上拥有者、撤销和参数绑定之后，应与 `labs/order-g4` 一样 7 项通过。

固定版本与参考实现相同：Temurin 21、Spring Boot 3.4.5、MySQL 8.4、Testcontainers 1.20.6、Maven Wrapper 3.9.9。这一组没有 OIDC、文件上传和跨站请求伪造。
