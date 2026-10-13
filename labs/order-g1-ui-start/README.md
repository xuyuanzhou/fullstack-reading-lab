# 双框架起始代码

这里是 `labs/order-g1-ui` 的起始工程，不是参考实现。加载、空列表、成功提交和拒绝类型的文字已经接上。失败时会清空商品、幂等键、筛选词，并丢掉已经读到的订单。

要改成：失败后这些内容都还在。不要删掉现有测试。

不要把这个目录加进 `labs/run-regression.sh`。

## 核对

```bash
cd labs/order-g1-ui-start
npm test
```

按当前代码，下面四项会失败：

- `a failed submit keeps the sku and the idempotency key`
- `not-owner keeps the sku and the idempotency key`
- `an empty list, a loaded list, and a failed reload keep the filter`
- `a denied reload names not-owner and keeps the filter`

`a created order shows the id and keeps the key for a retry` 可以通过。空列表和读到数据的断言写在失败的那条 Vue 测试前半段；测试会在筛选词被清空时停住。

固定版本与参考实现相同：React 19.2.8、Vue 3.5.44、Vitest 5.0.4、Node 24.11.0。组件测试不启动数据库。
