# 基础章课序教学审查与微调

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | basics outline reorder plan；`docs/课程选题与编辑记录.md` 基础章课序 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

前端「语言基础 / CSS / 浏览器」与「Java 基础」已按标准入门路径重组小节。用户要求再审查一遍：按教学内容排版，只调整归属与顺序，不新编、不乱造知识点。

## 决策

- 采用：只改 `OUTLINE` 内已有课的小节标题、顺序与归属；`java-memory` 已属 JVM，保持。
- 不采用：不重写课正文、不新增课、不合并/删除课、不改全栈主线 8 课。
- 刻意不做：不为「小节至少 2 课」硬造占位课；CSS 因此合并「盒模型」与「文档流」为一节「盒模型与文档流」，把 `aspect-ratio` 放回「现代特性」。

## 审查结论（按教学路径）

| 章 | 结论 |
| --- | --- |
| 语言基础 | 主干（值→对象→语法扩展→异步→模块迭代）在前；`js-timer-fn-not-string` 从异步挪到「易错」（属传参陷阱，不是事件循环主干）。 |
| CSS | `aspect-ratio` 归「现代特性」；盒模型与定位合并为一节，避免把层叠再塞回盒模型。 |
| 浏览器 | 表单：语义 → 校验 → FormData → 其它 HTML API → 小程序注意；存储：客户端 storage → HTTP 缓存 → bfcache → SW；跨域：CORS 主干再边界课。 |
| Java 基础 | `StringBuilder` 归「字符串与时间」；异常先边界再 Optional/finalize；集合先常用类型再 Stream/HashMap 细节与并发迭代陷阱。 |
| JVM | `java-memory` 留在「结构」，接在类加载之后。 |

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `scripts/curriculum.mjs` | 按上表微调四块 `OUTLINE` 与对应 `PATH_LEAD` 种子序 |
| `web/src/data/curriculum*.json` | `export:curriculum` 重导出 |
| `docs/课程选题与编辑记录.md` | 补一句：审查后微调归属，未新编课文 |
| `docs/ai-changes/README.md` | 本条索引 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：750 lessons / 2257 knowledge points；export matches publication manifest。

## 后续

- [ ] 若侧栏「盒模型与文档流」仍嫌粗，等有第二门纯盒模型课时再拆回两节（勿为拆而造课）
- [ ] 小程序 `wx:if` 仍挂在「表单与 HTML」末：仅一课，无法单独成「跨端」小节（`publishedOutline` 要求每节 ≥2 课）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`scripts/curriculum.mjs` 中 `OUTLINE` 的 `语言基础` / `CSS 与布局` / `浏览器` / `Java 基础` / `JVM`
3. 若续作：只动组织；课文事实仍以 coverage / lessons 源为准
4. 禁区：勿为凑小节数量新编空课；勿改全栈主线强制序
