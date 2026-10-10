# Java 基础收短：基础结论不再单开「为什么」

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | Java 基础 49 课 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

Java 基础的核心模型常把同一结论再说一遍，文末依据里的规范名词（如 JLS 的 Evaluation of Arguments）上文没有解释。基础结论不必再单开一节「为什么」。

## 决策

- 采用：Java 基础 49 课去掉 `why`。核心改成短结论，并在正文里点明依据上的名词（语言规范章节、JEP、类名）。课页和旧阅读页在 `why` 为空时不渲染「为什么」，目录编号跟着可见章节走。其它章仍保留「为什么」。
- 不采用 / 刻意不做：不改 Java 基础以外的课体。不把「为什么」从校验里整列删掉，只改成可空。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/*` 中 Java 基础 49 课 | 缩短 `core`，删除 `why` |
| `scripts/curriculum.mjs` | `why` 可省略 |
| `web/src/data/reading.ts`、`LessonOutline.tsx`、`LessonPage.tsx` | 无 why 时不进目录、不渲染 |
| `legacy/app.js` | 空 why 不输出这一节 |
| `web/src/data/curriculum-*.json` | `export:curriculum` |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：907 课导出校验通过。浏览器打开值传递课，标题下没有「为什么」，核心写明「实参求值（Evaluation of Arguments）」，依据仍是这条 JLS。JVM 软引用课仍有「为什么」。

## 后续

- [ ] 其它章若也要拿掉基础结论的「为什么」，按课判断，不要整章清空
- [ ] 不要把 Java 基础的 `why` 按旧稿整段贴回去

## 给下一模型

1. 先读：本文
2. Java 基础课源已无 `why` 字段；校验允许省略，空字符串也不渲染
3. 依据上的英文名词应在核心里用中文说清，再出现括号里的原名
4. 禁区：不要为了凑「为什么」把结论再说一遍
