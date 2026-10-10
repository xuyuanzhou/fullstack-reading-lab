# 批 5：面经 / 其他 / AI

## 跳过规则

- 笔试题**原卷照片**不进站（例：万达 `1.jpg`/`2.jpg`）→ 课用自绘 SVG，台账注明。
- 面经 **同文/副本/duplicate**：不整卷进站；只给已有课补 `origin`。
- 密码页、乱码非说法材料：`accuracy_status=不适用`，勿导出。

## 面经 / 导图续挂

| 课 id | 资料 | 资产 |
| --- | --- | --- |
| `kafka-kraft-not-zk` | Kafka 思维导图 | `illustrated-basics/kafka-mindmap.png` |
| `jvm-no-permgen-hotspot` / `jvm-platform-classloader-not-ext` | JVM 思维导图 | `jvm-mindmap.png` |
| `java-stack-prefer-deque` | 数据结构思维导图 | `ds-algo-mindmap.png` |
| `redis-lock-setnx-expire-race` | Redis 导图 + 蚂蚁面经说法 | `redis-mindmap.png` |

## 暂留自绘 SVG（明确跳过换库图）

| 课 id | 原因 |
| --- | --- |
| `java-switch-arrow-no-fall` | 笔试题原卷不进站 |
| `binlog-not-change-event-bus` | HC / MySQL 短卷无专页；保留纠错 SVG |
| `cache-db-double-write-race` | 同上；正文已写清竞态，不硬挂无关页 |

## AI 路线：手册图已挂（非 curriculum track）

公开课 AI 走 `web/src/data/aiCatalog.ts` + `/ai/...`，**不**扩 `OUTLINE` 的 frontend/java track。  
`AiDiagram`：先渲染内嵌示意（若有），再渲染手册 PNG（若有），互不覆盖。

| AI 课 key | 资产 |
| --- | --- |
| `transformer` / `rag` / `agent` / `langchain` / `langgraph` | 手册首批 |
| `agent-practice` | `agent-practice-002.png` |
| `harness` | `harness-002.png` |
| `rag-assistant` / `travel-agent` / `office-agents` | 项目架构图 |
| `rag-interview` | 内嵌示意 + `rag-002.png` |
| `agent-interview` | 内嵌示意 + `interview-agent-rag-002.png` |

未挂：`llm-interview`（题库图是无关云盘架构）。

工具篇 Codex / Claude Code / Vibe：**明确跳过挂图**（库内多为宣传封面与 IDE/设置截图，无机制架构图）。`source_review` 已注明。

面经「仅题号 / 无答案」：已批量注「跳过整卷进站」（约 25 条）。

## source_review

已把批 2～4 挂过的导图/docx 草稿回写为「已发布课程」；AI 手册五条为「已有草稿」。
