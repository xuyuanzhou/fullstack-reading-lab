# 工程回归：失败的检查让命令停下

这一份只验证一件事：某一项检查退出码不是 0 时，后面的检查不再跑，进程也不打印 `regression ok`。

它不代替 `labs/run-regression.sh`。那条命令按顺序跑五份订单样板，需要 Docker。这里的四项检查是合成的，没有数据库。

## 核对

```bash
cd labs/regression
node --test regression.test.mjs
```

## 评分边界

- 通过：`pass-a` 和 `pass-b` 都出现，进程退出码是 0，输出含 `regression ok`。
- 失败：`fail-contract` 之后不再出现 `after-fail`，也不出现 `regression ok`，进程退出码不是 0。
- 这一组没有浏览器端到端、键盘路径、依赖扫描，也没有 GitHub Actions。不要把退出码不是 0 的结果重试到变绿。
