# 查询与缓存：keyset 分页和回填窗口

这一组在 MySQL 8.4 上核对两件事。

排序同时用 `created_at` 和 `id`。只拿创建时间做下一页条件时，同一时间的另一行会被跳过。完整走完五条合成订单后，下一页是空的。

详情状态可以放进进程内缓存。数据库仍是权威。读库得到 `new` 之后，如果另一边把状态改成 `paid` 并删掉缓存，再把刚才读到的 `new` 放回去，下一次命中缓存仍是 `new`。库存不放进这个缓存。这个窗口用闩锁固定顺序，不用 `sleep`。删掉 `staleRefillKeepsThePreWriteStatus` 就看不见这个窗口。

没有 React 页面，也没有 Vue 页面。后发请求先返回的问题不在这里。

## 固定版本

| 项 | 版本 |
| --- | --- |
| JDK | Temurin 21.0.12.1 |
| Spring Boot | 3.4.5 |
| MySQL 镜像 | mysql:8.4 |
| Testcontainers | 1.20.6 |
| 构建 | Maven Wrapper 3.9.9 |

## 合成订单

五条订单。`id` 4 和 5 的 `created_at` 都是 `2026-10-13 10:00:00`。`id` 1 和 2 都是 `08:00:00`。商品只有 pen 和 book。

## 核对

需要本机 Docker。

```bash
cd labs/order-g3
./mvnw -s maven-settings.xml test
```

`maven-settings.xml` 只指向 Maven Central，不改全局 Maven 配置。

## 评分边界

- keyset 按 5、4、3、2、1 各出现一次，再向后是空页。
- 只比较 `created_at` 时，从 `id` 5 往后的一页是 `id` 3，漏掉同一时间的 `id` 4。
- 按订单逐条查商品名，比一次连接查询多 5 次语句。
- `EXPLAIN` 里 keyset 使用索引 `idx_sale_created_id`。
- 回填测试结束后，数据库状态是 `paid`，缓存里的 5 仍是 `new`。
