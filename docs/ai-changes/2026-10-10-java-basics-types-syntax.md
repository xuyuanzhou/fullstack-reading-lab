# Java 基础补上类型和语法

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | Java 基础；此前只排了课，未写正文 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

原来的 Java 基础 49 课是纠错，读完仍不会声明类型、写条件、循环和类。需要先有一轮能写出普通类的类型和语法，49 课留在后面。

## 决策

- 采用：新增 21 课。类型 8 课：八种基本类型与整数除法、引用和 null、字段默认值与 var、加宽和变窄、包装类、数组、String、List/Set/Map。语法 13 课：运算符、if、冒号 switch、循环、方法重载、构造器、static、包和四档访问、覆盖、接口、throw/throws、diamond、enum。定义课不写「为什么」。规范用语在正文里用中文说明并标上英文。目录改为类型 → 语法 → 入门纠错 → 面向对象 → 异常 → 集合 → 字符串与时间 → 易错。
- 不采用 / 刻意不做：不把接口、异常、泛型、enum 并成一课。不改 49 课正文。装箱缓存、字符串常量池、箭头 switch、跨包 protected 仍留在原来的纠错课，新课只加交叉引用。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-117.js` | 类型 8 课 |
| `curriculum/coverage-java-118.js` | 语法 13 课 |
| `scripts/curriculum.mjs` | 发布清单、目录、PATH_LEAD、JDK 5/7 版本标记 |
| `legacy/index.html` | 按同样顺序加载 117、118 |
| `README.md`、`docs/核对交接.md` | 课数改为 928 / 2792，下一空闲号 119 |
| `web/src/data/curriculum*.json`、`legacy/publication-order.js` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：928 lessons / 2792 knowledge points；导出与发布清单一致。

## 后续

- [ ] 下一空闲文件是 `coverage-java-119.js`。不要再把类型课写成纠错课。
