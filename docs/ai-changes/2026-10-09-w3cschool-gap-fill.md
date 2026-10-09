# 学点补全：对照 W3CSchool 分四批（15 新课 + 加厚）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 计划「W3CSchool gap fill」；用户要求全覆盖分批 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

学完部分课仍要外查相邻机制。对照 W3CSchool 现代 JS / Redis / MySQL 目录与本站 OUTLINE，分四批补新课并加厚 `deep` 交叉链；不照搬教程原文。

## 决策

- 采用：`coverage-frontend-29.js`（6）、`coverage-frontend-30.js`（3）、`coverage-java-53.js`（Redis/MySQL/DNS 共 6）；加厚存储/Promise/微前端/D8 等已有课。
- 不采用：不搬入门 Hello world；不逐条 Redis 命令备忘；DNS 两课草案合并为 `dns-lb-not-just-round-robin`（与既有台账一致）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-29.js` / `30.js` | 语言/浏览器/网络新课 |
| `curriculum/coverage-java-53.js` | Hash/ZSet/HLL、JOIN/HAVING、DNS |
| 若干既有 coverage | `deep` 邻接点 |
| `scripts/curriculum.mjs` 等 | 接入 OUTLINE |
| `docs/audits/FRONTEND_AUDIT_29.md` / `30.md`、`W3CSCHOOL_CROSSWALK.md` | 台账与对照表 |
| `README.md` | 741 / 2230 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：741 课（前端 266 / Java 475），2230 知识点。

## 后续

- [x] 四批新课与加厚
- [x] 主题→课 id 对照表
- [ ] 下一轮可扫 Proxy/Class、Redis Pub/Sub 机制边界
- [ ] 下一空闲号：先 `ls curriculum/coverage-java-5*.js` / `frontend-3*.js`

## 给下一模型

1. 先读：本文 + `docs/audits/W3CSCHOOL_CROSSWALK.md`
2. 再读：`coverage-frontend-29.js`、`30.js`、`coverage-java-53.js`
3. 若续作：从对照表未覆盖主题开下一批；勿覆盖 frontend-26/27；勿恢复已合并的两节 DNS 草案 id
4. 禁区：勿粘贴 W3CSchool 页文；SVG 必须 UTF-8
