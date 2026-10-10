# 本机知识库 → 公开课同步台账

政策见 [架构决策](../架构决策-公开站点与本机资料.md)。管道：

```bash
python3 reader/export_page_asset.py \
  --doc 'Java-面试八股文&面试题库/6-Java专题分类/分布式高并发/分布式高并发.pdf' \
  --page 19 --slug distributed-hc --name p0019
# 嵌套媒体（docx 内嵌图）同样用资料 id：
# --doc '…/improve_build.docx!/word/media/rId39.png' --slug frontend-local --name webpack-devtool-2
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

| 批 | 范围 | 状态 | 明细 |
| --- | --- | --- | --- |
| 1 | 《分布式高并发》机制课 | 已完成首轮 + D8 续挂 | [batch-01-distributed-hc.md](batch-01-distributed-hc.md) |
| 2 | 图解计算机必备基础 | 已完成续轮（含 OS / Redis 导图） | [batch-02-illustrated-basics.md](batch-02-illustrated-basics.md) |
| 3 | Java 专题已映射 | 已完成续轮（8 图解 + Redis 枝） | [batch-03-java-topics.md](batch-03-java-topics.md) |
| 4 | 前端八股已映射 | 已完成续轮（路线图 / BOM / webpack） | [batch-04-frontend.md](batch-04-frontend.md) |
| 5 | 面经 / 其他 / AI | 面经导图已挂；AI 路线挂手册图（非 curriculum track） | [batch-05-long-tail.md](batch-05-long-tail.md) |

资产根目录：`curriculum/library-assets/`（须 git 跟踪；导出到 `web/public/library-assets/` 再进 Pages）。`*.png` 全局忽略对该目录无效。

收口状态：[STATUS.md](STATUS.md)。带 `origin` 仍用自绘 SVG 的 3 课见 [batch-05](batch-05-long-tail.md)「暂留」。
