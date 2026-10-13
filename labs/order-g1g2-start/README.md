# 事务与幂等起始代码

这里是 `labs/order-g1g2` 的起始工程，不是参考实现。表结构、列表和第一次下单已经接上。库存更新还不看 `version`，也不看剩余数量。同一个幂等键会再次插入，不会重放原订单，也不会在商品不同时返回 `idempotency-conflict`。

不要把这个目录加进 `labs/run-regression.sh`。回归只跑参考实现。

## 要补上的行为

`decrementIfVersion` 应只在 `sku`、传入的 `version` 和 `quantity >= 1` 同时成立时把数量减 1，并把 `version` 加 1。过期版本应改到 0 行。

`place` 应先按幂等键查找。键已存在且商品摘要相同，返回原来的 `orderId`，`replay` 为 true。键已存在但商品不同，抛出 `IdempotencyConflictException`。键不存在时再插入；并发下唯一约束冲突后，仍按上面的规则处理已有行。库存条件更新没有改到行时，抛出 `SoldOutException`。

## 核对

需要本机 Docker。

```bash
cd labs/order-g1g2-start
./mvnw -s maven-settings.xml test
```

按当前代码，下面五项会失败：

- `firstPostCreatesAndReplayReturnsTheSameOrder`
- `sameKeyWithAnotherSkuConflictsAndDoesNotChangeStock`
- `twentyBuyersLeaveOneOrderAndZeroStock`
- `twentyRetriesOfOneKeyLeaveOneOrder`
- `staleVersionUpdatesNoRow`

空列表后出现一笔订单的测试可以通过。`naiveWriteFailsTheStaleVersionContract` 也可以通过：它本来就要求不带版本的更新触犯契约。补上版本条件和幂等键之后，应与 `labs/order-g1g2` 一样 7 项通过。

固定版本与参考实现相同：Temurin 21、Spring Boot 3.4.5、MySQL 8.4、Testcontainers 1.20.6、Maven Wrapper 3.9.9。
