# 工程回归起始代码

这里是 `labs/regression` 的起始工程，不是参考实现。两项通过的检查已经接上。某项检查退出码不是 0 时，脚本仍继续跑后面的检查，并打印 `regression ok`。

不要把这个目录加进 `labs/run-regression.sh`。那条命令只跑五份订单参考样板。

## 要补上的行为

`fail-contract` 退出码不是 0 时，进程应停下。后面的 `after-fail` 不再执行。输出里不出现 `regression ok`。进程退出码不是 0。

## 核对

```bash
cd labs/regression-start
node --test regression.test.mjs
```

按当前代码，`a failed check stops the run` 会失败：输出里仍有 `regression ok` 和 `after-fail`，进程退出码是 0。

`two passing checks finish with regression ok` 可以通过。补上失败即停之后，应与 `labs/regression` 一样 2 项通过。

这一组没有浏览器端到端、键盘路径、依赖扫描，也没有 GitHub Actions。
