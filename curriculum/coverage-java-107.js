/* Java 107: W3CSchool 续扫 — 直方图统计；Redis 分片 Pub/Sub。 */
const COVERAGE_JAVA_107 = [
  {
    track:'java', group:'数据库', id:'mysql-histogram-not-index',
    title:'优化器直方图是数据分布统计，不是又一种索引',
    prompt:'为什么有人执行 ANALYZE TABLE 建了直方图，就以为“已经给这列加了索引”？',
    promptAnswer:'直方图提供值分布统计以改善估算。索引提供查找/排序访问路径。',
    core:'**直方图（histogram）**是优化器用来估计**列值分布**的统计信息（桶、频率），帮助选计划、估行数，见 `mysql-explain-analyze`。它**不**提供按键定位数据的 B-Tree/哈希访问路径，也不能代替你为过滤列建索引。`ANALYZE TABLE` 更新统计（可含直方图）；没有合适索引时，再准的直方图也只是让「全表扫多少行」估得更准，不是变成索引查找。邻接 `mysql-low-selectivity-index-heuristic`、`mysql-index`。',
    why:'把直方图当成“轻量索引”写进设计评审；或从不更新统计却抱怨优化器变笨。',
    example:'对 `status` 建直方图后，优化器更清楚 `status=\'closed\'` 很稀有。若无索引，计划仍可能是扫表，只是 rows 估计更合理。高频等值过滤仍要评估真正的二级索引。',
    task:'划掉“直方图=索引”。写出：直方图帮优化器做什么；索引多提供什么。',
    answer:'直方图提供值分布统计以改善估算。索引提供查找/排序访问路径。统计再准也不能替代缺失的索引。',
    keywords:'MySQL histogram ANALYZE 统计 索引',
    points:['直方图是分布统计','不是访问路径','ANALYZE 更新统计仍可能全表扫'],
    deep:[
      {title:'和扩展统计',body:'除直方图外还有其它优化器统计；都服务估算，不替代 DDL 索引。'},
      {title:'怎样自己验证',body:'无索引列建直方图前后对比 EXPLAIN rows；再加索引对比 type/key 是否变化。'}
    ],
    refs:[['MySQL：Optimizer Statistics','https://dev.mysql.com/doc/refman/8.4/en/optimizer-statistics.html'],['MySQL：Histogram Statistics','https://dev.mysql.com/doc/refman/8.4/en/optimizer-statistics.html#histogram-statistics-analysis'],['MySQL：ANALYZE TABLE','https://dev.mysql.com/doc/refman/8.4/en/analyze-table.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-sharded-pubsub-not-cluster-queue',
    title:'分片 Pub/Sub 摊的是发布路径，不是把 Pub/Sub 变成集群队列',
    prompt:'为什么 Redis Cluster 上开了 Sharded Pub/Sub，有人就说“终于有可靠的集群消息队列了”？',
    promptAnswer:'它优化 Cluster 上的发布扇出。仍无队列语义：不持久、无消费组位点、无订阅即丢。',
    core:'**Sharded Pub/Sub**（如 `SSUBSCRIBE` / `SPUBLISH`）把频道映射到集群槽，让发布更贴分片、减少广播风暴，适合 Cluster 拓扑。它改善的是**发布扩展与扇出路径**，并不把 Pub/Sub 变成带持久化、消费位点、重放的队列。消息仍是**尽最大努力投递**：无订阅者即丢、不保证堆积与 ACK。可靠异步仍看 Stream / 外部 MQ，见 `redis-pubsub-not-reliable-queue`、`redis-stream-vs-pubsub`。不要把“分片”听成“可靠”。',
    why:'用 Sharded Pub/Sub 传订单状态并假设可重放；或与 Cluster 槽迁移期行为未做演练。',
    example:'实时协作光标用 SPUBLISH 扇出；下单履约仍走 Stream 或 Kafka。槽迁移时核对客户端是否支持分片订阅协议。',
    task:'划掉“Sharded Pub/Sub=集群版可靠队列”。写出：它优化什么；可靠性上仍缺什么。',
    answer:'它优化 Cluster 上的发布扇出。仍无队列语义：不持久、无消费组位点、无订阅即丢。可靠投递另选 Stream/MQ。',
    keywords:'Redis Sharded Pub/Sub SSUBSCRIBE Cluster',
    points:['分片 Pub/Sub 优化扇出路径','不是可靠队列','无订阅者仍会丢'],
    deep:[
      {title:'和普通 PUBLISH',body:'非分片 Pub/Sub 在 Cluster 上常需广播到所有节点；分片把频道钉在槽上。'},
      {title:'怎样自己验证',body:'无订阅者 SPUBLISH 后无堆积；对照 XADD 可被消费组稍后读取。'}
    ],
    refs:[['Redis：Sharded Pub/Sub','https://redis.io/docs/latest/develop/pubsub/#sharded-pubsub'],['Redis：SSUBSCRIBE','https://redis.io/docs/latest/commands/ssubscribe/'],['Redis：SPUBLISH','https://redis.io/docs/latest/commands/spublish/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_107) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
