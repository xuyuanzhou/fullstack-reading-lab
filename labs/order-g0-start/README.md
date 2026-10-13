# 预备基础起始代码

这里是 `labs/order-g0` 的起始工程，不是参考实现。列表、三条合成订单和失败后保留草稿已经接上。金额规则还没写：负数和超过两位小数现在也会被收下。

不要把这个目录加进 `labs/run-regression.sh`。回归只跑参考实现。

## 要补上的行为

`OrderList.add` 在商品标识为空时拒绝。金额为负数、没有金额，或小数超过两位时，应抛出 `invalid-amount`，并且列表长度不变。

`page/orders.ts` 的 `amountProblem` 现在总是返回 `null`。`-1.00` 和 `1.234` 应返回 `invalid-amount`，`1.50` 应返回 `null`。

## 核对

```bash
cd labs/order-g0-start
./mvnw -s maven-settings.xml test
node --experimental-strip-types --test page/orders.test.mjs
```

按当前代码，下面三项会失败：

- `negativeAmountIsRejectedAndListStaysEmpty`
- `tooManyFractionDigitsAreRejected`
- `illegal amounts are rejected and a failed submit keeps the draft`

空列表和三条订单的测试可以通过。补上金额规则之后，应与 `labs/order-g0` 一样全部通过。

固定版本与参考实现相同：Temurin 21、Spring Boot 3.4.5、Maven Wrapper 3.9.9、Node 24.11.0。没有数据库。
