# 表结构迁移课改成按版本脚本核对

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | schema-migration |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

这一课把「每条脚本在空库和旧库上结果相同」和「跳过一条脚本就在启动时失败」说死了。课上例子还被盖成 `migrate up`，Flyway 没有这条命令。

## 决策

- 采用：版本脚本只应用一次；空库从第一版跑到当前，才与按同样版本升级的旧库一致。已应用脚本改文件会在校验和处失败。从未应用的文件被删掉，migrate 不会因此停住。删列和回填拆开发布。例子留下 SQL 和 Spring Boot 配置。
- 不采用：不把「大表加索引或改列会锁表」写成一律锁表。InnoDB 加二级索引可以 INPLACE。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-05.js` | 重写 `schema-migration` 的正文、例子、练习和依据 |
| `curriculum/example-code-blocks.js` | 去掉会整段盖掉例子的 `migrate up` |
| `web/src/data/curriculum.json` | 导出 |
| `web/src/data/curriculum-bodies-java.json` | 导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：内容校验通过。浏览器打开该课，例子里有 `V1`、`V2`、`V3` 和 `spring.flyway.locations`，没有 `migrate up`。

## 后续

- [ ] 不要把 `schema-migration` 再写回 `example-code-blocks.js`，那个表会整段覆盖课文例子

## 给下一模型

1. 先读：本文 + `curriculum/coverage-path-05.js` 里 `schema-migration`
2. 再读：Flyway Versioned migrations、Spring Boot 的 data-initialization
3. 禁区：不要写「跳过一条中间脚本，启动必定失败在缺列」
