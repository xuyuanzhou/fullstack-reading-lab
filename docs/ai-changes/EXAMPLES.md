# 变更记录：写法示例

规范：[AI契约-变更记录规范.md](../AI契约-变更记录规范.md)  
空白模板：[TEMPLATE.md](TEMPLATE.md)  
仓库内完整真迹示例：[2026-10-07-core-model-layout.md](2026-10-07-core-model-layout.md)

---

## 1. 新建一条记录（命令示例）

```bash
# 1) 先看最近改了什么
sed -n '1,20p' docs/ai-changes/README.md

# 2) 从模板复制（按当天日期与短 slug）
cp docs/ai-changes/TEMPLATE.md docs/ai-changes/2026-10-09-fix-lesson-nav.md

# 3) 编辑该 MD 后，把一行插进 README 表格最上方（手写或编辑器均可）
```

README 索引新增一行示例：

```markdown
| 2026-10-09 | 进行中 | [修复课时目录高亮](2026-10-09-fix-lesson-nav.md) |
```

---

## 2. 完整填写示例（推荐风格）

下面是一条**虚构**的「小修」示例，长度适合大多数任务。真实长文见 `2026-10-07-core-model-layout.md`。

````markdown
# 修复 LessonOutline 高亮不同步

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：目录点了但高亮还停在上一节 |
| 作者类型 | AI |
| 作者工具 | Codex |

## 背景

点击「为什么」后，`IntersectionObserver` 仍把 `active` 留在「要点」，窄屏目录与侧栏不一致。

## 决策

- 采用：收紧 `rootMargin`，并在 `click` 时立刻 `setActive`。
- 不采用：改成监听 `hashchange`（本页不用 hash）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/LessonOutline.tsx` | click 同步 active；observer `rootMargin` 改为 `-20% 0px -50% 0px` |

关键片段（可选，≤15 行）：

```tsx
onClick={() => {
  const target = document.getElementById(`lesson-${id}`)
  setActive(id)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}}
```

## 验证

```bash
cd web && npx tsc --noEmit
```

- 结果：通过。
- 手测：打开任意课，连点目录三项，高亮跟随。

## 后续

- [ ] 若仍抖：再查 `section` 的 `tabIndex` / 吸顶高度，勿重写整页滚动
- [ ] 不要为了高亮去改 `LESSON_NAV` 文案

## 给下一模型

1. 先读本文与 `LessonOutline.tsx`
2. 续作只动 observer 参数或 click，不要引入路由 hash
3. 完成后把状态改为已完成并更新 `docs/ai-changes/README.md`
````

---

## 3. 正反对照（改动清单 / 后续）

### 改动清单

```markdown
<!-- ❌ 太虚：下一模型不知道改了哪 -->
| `web/src` | 修了一些 bug |

<!-- ❌ 整文件粘贴：噪音过大 -->
| `reading.ts` | （后面跟 200 行 diff） |

<!-- ✅ 路径 + 行为 -->
| `web/src/data/reading.ts` | `structureCore`：句中「顺序是」也识别为 facet |
```

### 给下一模型

```markdown
<!-- ❌ 依赖聊天 -->
1. 按我们刚才说的继续

<!-- ❌ 不可执行 -->
1. 优化一下体验

<!-- ✅ 可换工具执行 -->
1. 先读 `docs/ai-changes/README.md` 与本文
2. 再读 `web/src/data/reading.ts` 中的 `structureCore`
3. 禁区：不要改 `curriculum.json` 里的 core 原文来迁就排版
```

### 验证

````markdown
<!-- ❌ -->
- 结果：应该没问题

<!-- ✅ -->
```bash
cd web && npx tsc --noEmit
```
- 结果：通过；未跑 e2e（写明未跑）
````

---

## 4. 在记录里贴代码时的规矩

允许（帮助定位）：

```ts
/** Turn lesson.core into lead / facets / beats. */
export function structureCore(core: string): StructuredCore {
  const sentences = sentencesOf(core)
  // ...
}
```

禁止：

- 贴整个组件 / 整份 scss
- 贴含密钥、本机私人路径、未公开原件正文的片段

宁可写：`见 web/src/pages/LessonPage.tsx` 中 `structureCore(lesson.core)` 的调用处。

---

## 5. 文档-only / 换工具接手（短例）

```markdown
# 契约增加 EXAMPLES

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：缺少代码示例 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景
契约与模板只有字段说明，没有可抄的填写样例。

## 决策
- 采用：新增 `docs/ai-changes/EXAMPLES.md`，契约内链过去。
- 不采用：把长示例全文塞进各工具入口文件。

## 改动清单
| 路径 | 变更 |
| --- | --- |
| `docs/ai-changes/EXAMPLES.md` | 新建：命令、完整例、正反对照 |

## 验证
- 文档-only；未跑产品测试。

## 后续
- [ ] 无

## 给下一模型
1. 写变更记录前可先打开本 EXAMPLES 对照
2. 细则仍以契约正文为准
```

换工具续写同一主题时，在元信息改「作者工具」，并在「后续」勾掉已完成项即可，不必新开空壳文件。
