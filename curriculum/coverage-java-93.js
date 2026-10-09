/* 《分布式高并发》D8：UUID 形态；多主自增 offset/step。 */
const COVERAGE_JAVA_93 = [
  {
    track:'java', group:'分布式与高并发', id:'uuid-not-only-random-string',
    title:'“UUID 无序、只能字符串”说的是常见用法，不是规格',
    prompt:'为什么资料把 UUID 优点写成全球唯一、性能好，缺点写成没有排序、往往字符串存储、空间大？',
    core:'随机 UUID（常见 v4）近似无序、用 `CHAR(36)` 会又宽又碎——资料当主键时的痛点成立，见 `mysql-uuid-not-clustered-pk`。但把“没有排序 / 往往字符串”写成 UUID 定律会过时：**RFC 9562** 的 **UUID v7** 把 Unix 时间写进高位，可在同一发号域内趋势有序；存储可用 **16 字节二进制**（MySQL `BINARY(16)` / `UUID_TO_BIN`），不必永远 36 字符。选型问：要全局唯一、要否时间有序、要否当聚簇键。乱序 v4 仍慎做 InnoDB 主键；有序 UUID 也要看时钟与实现质量。',
    why:'面试背“UUID 不能排序、必须字符串”，排斥 v7/二进制方案，或反过来以为任意 UUID 都适合当聚簇主键。',
    example:'业务主键用雪花/号段；若坚持 UUID，优先评估 v7 + `BINARY(16)`，并用 `UUID_TO_BIN(?, 1)` 一类变换改善局部性（以现行函数为准）。展示层再格式化成带连字符的字符串。',
    task:'划掉“UUID=无序字符串”。写出：v4 与 v7 在顺序上的差别；存储上除 CHAR(36) 外的选项。',
    answer:'划掉定律。v4 近似随机无序；v7 可时间有序。存储可用 16 字节二进制。乱序键仍不宜当 InnoDB 聚簇主键。',
    keywords:'UUID v7 RFC9562 BINARY 有序',
    origin:'《分布式高并发.pdf》约第 193 页：UUID 无排序、往往字符串存储',
    diagram:'diagrams/uuid-not-only-random-string.svg',
    points:['常见痛点来自随机 v4 与宽字符串','v7 可带时间有序','可用十六字节二进制存储'],
    deep:[
      {title:'和雪花',body:'雪花也是时间+机器+序列；与 v7 同属“有序唯一”家族，运维契约不同（位分配 vs UUID 布局）。'},
      {title:'怎样自己验证',body:'生成一批 v4 与 v7，按二进制比较是否大致随时间递增；对比 CHAR(36) 与 BINARY(16) 索引宽度。'}
    ],
    refs:[['RFC 9562','https://www.rfc-editor.org/rfc/rfc9562'],['MySQL：UUID_TO_BIN','https://dev.mysql.com/doc/refman/8.4/en/miscellaneous-functions.html#function_uuid-to-bin'],['MySQL：UUID()','https://dev.mysql.com/doc/refman/8.4/en/miscellaneous-functions.html#function_uuid']]
  },
  {
    track:'java', group:'分布式与高并发', id:'db-autoinc-offset-step-needs-ops',
    title:'多主“起点不同、步长相同”是人工分段，不是自动集群发号',
    prompt:'为什么资料写多个 Master 设不同起始数字、相同步长，就能有效生成集群唯一 ID 并降低负载？',
    core:'`auto_increment_offset` / `auto_increment_increment`（或等价配置）让各主发出互不重叠的序列，资料图示（1,4,7… / 2,5,8…）方向对。但这是**运维写死的分段契约**：主数量变化要重算步长与偏移；切换、重建、误配会撞号或大段空洞；它也不等于“多主写入已经解决复制冲突”。与 Redis“五节点各步长 5”同类误解：分段要钉死所有者，见 `redis-cluster-incr-not-five-steps`、`db-sequence-batch-not-gapless`。要弹性扩缩发号，更常看号段服务或雪花，而不是指望改两个变量就高可用。',
    why:'加第四台主却忘了改步长，号段重叠；或以为双主复制打开 offset 就永不单点。',
    example:'两主：`increment=2`，主 A `offset=1`，主 B `offset=2`。扩到三主前停写、改 `increment=3` 与各 offset，并校验已用最大值。文档写清谁拥有哪一段。',
    task:'划掉“设好起点步长=集群自动发号”。写出：扩主时要改什么；与真正故障转移的关系。',
    answer:'划掉自动。这是人工互斥分段。扩缩主数要改步长/偏移并防撞。复制拓扑高可用是另一问题，不靠这两个变量单独完成。',
    keywords:'AUTO_INCREMENT offset increment 多主',
    origin:'《分布式高并发.pdf》约第 194 页：多 Master 不同起始、相同步长发号',
    diagram:'diagrams/db-autoinc-offset-step-needs-ops.svg',
    points:['offset/increment 是运维分段','扩缩主数要重算契约','不代替复制与冲突设计'],
    deep:[
      {title:'和单主自增',body:'单主简单但有单点；多主分段换来协调成本。选之前先写清 RPO 与发号可用性目标。'},
      {title:'怎样自己验证',body:'两实例配置不同 offset，并行插入，检查无交集；故意用错 increment 观察重叠。'}
    ],
    refs:[['MySQL：auto_increment_increment','https://dev.mysql.com/doc/refman/8.4/en/replication-options-master.html#sysvar_auto_increment_increment'],['MySQL：AUTO_INCREMENT','https://dev.mysql.com/doc/refman/8.4/en/example-auto-increment.html'],['MySQL：复制选项','https://dev.mysql.com/doc/refman/8.4/en/replication-options-master.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_93) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
