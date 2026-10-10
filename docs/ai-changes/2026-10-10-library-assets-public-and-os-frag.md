# 契约写明库图上公网；新建外部碎片课挂 os-p0125

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [握手后续](2026-10-10-library-sync-handshake-tls-types.md)；[架构决策](../架构决策-公开站点与本机资料.md)；契约第 6/8 节 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

握手台账后续仍有 OS 碎片算例。同时需在 AI 契约里写死：机制页图允许且必须随 github.io 对公网可见，避免模型以版权为由拒挂/拒 push。

## 决策

- 采用：契约第 6 节增加「库图上公网」；第 8 节验收增加库图入库勾选；`AGENTS.md` 增第 7 条；架构决策写明上公网策略。新建 `linux-external-fragmentation`←`os-p0125`，插在分段与分页之间。
- 不采用：把分段课图从 `os-p0123` 换成碎片页；硬挂 Redis embstr；整本 PDF 入库。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/AI契约-变更记录规范.md` | 第 6/8 节：库图上公网 |
| `AGENTS.md` | 第 7 条指针 |
| `docs/架构决策-公开站点与本机资料.md` | 上公网策略一句 |
| `curriculum/coverage-java-23.js` | 外部碎片定义课 |
| `scripts/curriculum.mjs` | OUTLINE + 检索标签 |
| 台账 / 握手后续勾选 | STATUS、batch-02、handshake MD |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：965 / 2903；export 与 publication manifest 一致。

## 后续

- [ ] AI 工具篇机制图仍无则跳过
- [ ] Redis embstr 仍跳过（亮白卷无专页）
- [ ] HTTPS 旧书图勿当成 TLS 1.3 固定包数证据

## 给下一模型

1. 先读：契约第 6 节「库图上公网」+ `docs/library-sync/STATUS.md` 跳过表
2. 新导页进 `curriculum/library-assets/` 后必须 `git add`（全局 `*.png` 例外）
3. 禁区：整本 PDF、`private-data/`、`config/library.path`、本机绝对路径
