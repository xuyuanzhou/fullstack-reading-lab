# 订单样板回归

一条命令按顺序跑现有样板。数据库样板使用 MySQL 8.4，需要本机 Docker。这条命令不发布网站。

```bash
labs/run-regression.sh
```

| 样板 | 锁住的行为 |
| --- | --- |
| `order-g0` | 空列表、三条合成订单、非法金额、失败后保留草稿 |
| `order-g1-ui` | React 提交的加载、成功、失败和 `not-owner`；Vue 列表的空、成功、读取失败和 `not-owner`。失败后输入还在 |
| `order-g1g2` | MySQL 上的版本条件、幂等键、20 个并发、列表 |
| `order-g3` | keyset、重复创建时间、语句次数、回填窗口 |
| `order-g4` | 匿名、非拥有者、跨租户、撤销、参数化商品查询 |

`order-g1g2` 里的 `naiveWriteFailsTheStaleVersionContract` 必须失败于不带版本的更新。`order-g4` 里的 `not-owner` 一旦改名，`clerkDoesNotReadAnotherUsersOrder` 会变红。

`labs/order-g0-start` 是预备基础的起始代码，金额规则还没写，不在这条命令里。`labs/order-g1-ui-start` 是双框架的起始代码，失败后会清空输入，也不在这条命令里。`labs/order-g1g2-start` 是事务与幂等的起始代码，库存更新不带版本条件，同一个幂等键会再次插入，也不在这条命令里。`labs/order-g3-start` 是查询与缓存的起始代码，下一页只比较创建时间，商品名仍逐条查询，读到的状态不放进缓存，也不在这条命令里。`labs/order-g4-start` 是授权的起始代码，同一租户可读任意订单，商品标识拼进语句，也不在这条命令里。`labs/regression-start` 是工程回归的起始代码，检查失败后仍打印 `regression ok`，也不在这条命令里。参考的小样在 `labs/regression`，同样不在这条命令里。

`labs/order-g1-ui` 里 `npm run e2e` 已在本机 Playwright 跑过一条页面：sold-out 后保留输入、React 哈希路由、Vue 补记表单。这条浏览器回归不在上面的脚本里。还没有键盘路径、依赖扫描，也没有在 GitHub Actions 上跑过。
