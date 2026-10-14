# Dubbo 专节补 Filter、标签、QOS 与序列化白名单

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | 续 [2026-10-13-dubbo-track.md](2026-10-13-dubbo-track.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

上一刀补了调用路径、暴露、注册模式、ZooKeeper、集群容错和线程池。面试和生产里还常问：附件怎么传、灰度怎么切机器、发布如何先摘流量、反序列化为什么突然失败。

## 决策

- 采用：再加 4 课，事实对齐 Dubbo 3.3.5。附件键 `dubbo.tag` / `dubbo.force.tag`（force 默认 false）。QOS 默认端口 22222，`offline` 先 `unregister`。序列化检查默认 `STRICT`（`AllowClassNotifyListener.DEFAULT_STATUS`）。
- 不采用 / 刻意不做：不写泛化调用专课；不把标签写成可以代替 version；不把 serialize-check-status 写成生产默认 DISABLE。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-dubbo.js` | 新增 4 课 |
| `scripts/curriculum.mjs` | Dubbo 小节改为 16 个 id |
| `web/src/data/curriculum*.json` | 导出 |
| `README.md` | 1086 / 3269，Java 718 |

新课 id：`dubbo-filter-attachment`、`dubbo-tag-router`、`dubbo-qos-offline`、`dubbo-serialize-allowlist`。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：1086 课 / 3269 个知识点，内容校验通过。浏览器打开 `#/java/spring-cloud-alibaba/dubbo-tag-router`，标题与 `dubbo.tag` / `dubbo.force.tag` 例子在页上；侧栏 Dubbo 为 0/16。

## 后续

- [x] 浏览器抽查 `dubbo-tag-router`
- [ ] 不要把这 4 个 id 写进 `example-code-blocks.js`
- [x] 不重写 Spring / MySQL / Redis 专章

## 给下一模型

1. 先读：本文 + `2026-10-13-dubbo-track.md`
2. 再读：`curriculum/coverage-dubbo.js`
3. 若续作：可补泛化调用或条件路由，先核 3.3.5 文档路径是否仍 200
4. 禁区：勿把 Triple 写成零配置默认；勿把 force.tag 默认写成 true
