# 查询与缓存起始代码

这里是 `labs/order-g3` 的起始工程，不是参考实现。表结构、五条合成订单和第一页排序已经接上。下一页只比较 `created_at`，同一时间的另一行会被跳过。商品名仍按订单逐条查询，没有连接查询。`EXPLAIN` 看的是主键。读到的订单状态还没有放进缓存。

不要把这个目录加进 `labs/run-regression.sh`。回归只跑参考实现。`staleRefillKeepsThePreWriteStatus` 要留着，用来看见回填窗口。

## 要补上的行为

`nextPage` 的条件应是 `(created_at, id) < (?, ?)`，排序仍是 `created_at DESC, id DESC`。从 `id` 5 往后的一页应是 `id` 4，而不是 `id` 3。

`namesByJoin` 应一次连接 `sale_order` 和 `product`。它比 `namesByLookup` 少 5 次语句，商品名顺序仍是 pen、book、pen、book、pen。

`explainKey` 应解释带上述行比较的查询，使用的索引是 `idx_sale_created_id`。

`DetailCache.read` 在未命中时读库，并在 `beforePut` 之后把刚读到的状态放进缓存。数据库把 5 改成 `paid` 并删掉缓存键之后，若放入的仍是读取时的 `new`，缓存里的 5 仍是 `new`。

## 核对

需要本机 Docker。

```bash
cd labs/order-g3-start
./mvnw -s maven-settings.xml test
```

按当前代码，下面五项会失败：

- `keysetVisitsEachRowOnceAndEndsOnAnEmptyPage`：走到 `[5, 4, 3, 2]`，漏掉同一时刻的 `1`
- `createdAtOnlySkipsTheTiedRow`：从 `id` 5 往后得到 `3`，期望 `4`
- `joinUsesFewerStatementsThanPerOrderLookup`：语句次数差是 `0`，期望 `5`
- `keysetPlanUsesTheCreatedAtIndex`：索引名是 `PRIMARY`，期望 `idx_sale_created_id`
- `staleRefillKeepsThePreWriteStatus`：缓存里的 5 是 `null`，期望 `new`。数据库状态已经是 `paid`

补上 keyset、连接查询和回填之后，应与 `labs/order-g3` 一样 5 项通过。

固定版本与参考实现相同：Temurin 21、Spring Boot 3.4.5、MySQL 8.4、Testcontainers 1.20.6、Maven Wrapper 3.9.9。
