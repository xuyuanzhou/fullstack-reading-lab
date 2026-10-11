# 旁路缓存课：先讲清 Cache Aside 是什么

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | cache-aside-steps |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

标题直接写「旁路缓存：读时回填，写时删掉」，课上没先说明「旁路」指什么；也没写 Redis 以外还有什么、各自优势、现在主流是什么。

## 决策

- 采用：定义旁路；对照 Redis / Memcached / Caffeine 的层级与优势；写明跨实例共享时主流是 Redis，常见组合是 Caffeine 短 TTL 加 Redis。
- 不采用：改成自造译名；不把旁路绑死某一个 Spring 注解名；不展开 Hazelcast 等非入门默认选项。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-09.js` | 定义 + 实现对照 + 主流 Redis；答案与要点 |
| `curriculum/diagrams/cache-aside.svg` | 脚注写主流与备选 |
| `web/src/data/learningPaths.ts` | g3 job |
| `docs/AI契约-变更记录规范.md` | §11 旁路缓存可继续用 |
| `web/src/data/curriculum*.json` / `web/public/diagrams/` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过

## 后续

- [ ] 打开 `cache-aside-steps` 确认要点写明主流 Redis 与 Caffeine/Memcached
