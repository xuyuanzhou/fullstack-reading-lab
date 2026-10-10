/* Java 53: W3CSchool Redis/MySQL 缺口 + D8 DNS 轮询。 */
const COVERAGE_JAVA_53 = [
  {
    track:'java', group:'缓存', id:'redis-hash-field-update',
    title:'对象字段用 Hash，整份 JSON 字符串每次都重写',
    prompt:'为什么把用户资料存成一个 String 的 JSON，改昵称却要 GET 整份再 SET？',
    promptAnswer:'局部字段更新用 Hash。整份替换可用 String。',
    core:'Redis **Hash** 把多个字段放在一个键下，`HSET`/`HGET` 可改单个字段，不必重写整份文档。适合「同一对象、字段常局部更新」。整份快照、要一次性替换时，String + JSON 也可以，但改一个字段成本是整键读写。字段极多、要二级索引时，Hash 不是关系数据库。类型总览见 `redis-data-types`。集群上一个 Hash 键仍落在一个槽，见 `redis-cluster-incr-not-five-steps`。',
    why:'全量 JSON 在 String 里，资料页只改头像也整键重写，并发下还容易互相覆盖。',
    example:'`HSET user:9 name Alice avatar a.png`。只改名：`HSET user:9 name Bob`。用 String 存 JSON 则要读出、改字段、再 SET 整串。',
    task:'划掉“对象只能 JSON String”。写出局部改字段与整份替换各更贴近哪种结构。',
    answer:'局部字段更新用 Hash。整份替换可用 String。Hash 仍是一个键一个槽，不是表。',
    keywords:'Redis Hash HSET JSON String',
    points:['Hash 可按字段读写','整份 JSON String 改一字段要整键重写','一个 Hash 键在 Cluster 里仍在一个槽'],
    deep:[
      {title:'和 Pipeline',body:'多个 HGET 可用 pipeline 少 RTT，见 `redis-pipeline`。不要把 N 次网络往返当成 Hash 的错。'},
      {title:'怎样自己验证',body:'对同一逻辑对象分别用 Hash 与 String 改一个字段，对比命令次数与并发覆盖。'}
    ],
    refs:[['Redis：Hash','https://redis.io/docs/latest/develop/data-types/hashes/'],['Redis：HSET','https://redis.io/docs/latest/commands/hset/']]
  },
  {
    track:'java', group:'缓存', id:'redis-zset-rank-range',
    title:'排行榜用 ZSet 的分与范围，不要每次全排序',
    prompt:'为什么每次打开排行榜都把全表 ID 拉回应用里 sort？',
    promptAnswer:'ZADD 写分。ZREVRANGE 取 TopN。',
    core:'**Sorted Set** 每个成员带一个分（score），Redis 按分维护顺序。`ZADD` 写入或更新分，`ZRANGE`/`ZREVRANGE` 取一段，`ZRANK`/`ZREVRANK` 查名次。适合排行榜、延时队列（分用时间戳）。成员唯一；同分时按成员字典序。不要用 List 手动保持有序却忽略并发插入。大 Key 与热 key 见 `redis-big-hot-key`。',
    why:'应用侧全量排序，流量一大 CPU 和带宽先炸，Redis 其实已经能按分切一段。',
    example:'`ZADD board 100 u1 250 u2`。前三名：`ZREVRANGE board 0 2 WITHSCORES`。某人涨分再 ZADD 同一成员即可。',
    task:'写出写入比分、取 TopN、查某人名次各用哪类命令；划掉“拉回 Java sort”。',
    answer:'ZADD 写分。ZREVRANGE 取 TopN。ZREVRANK 查名次。不要每次全量拉回应用排序。',
    keywords:'Redis ZSet 排行榜 ZRANGE ZADD',
    points:['ZSet 按 score 有序','TopN 与名次用范围/排名命令','同分再按成员序，成员必须唯一'],
    deep:[
      {title:'和延时任务',body:'分用执行时间戳，定时 ZRANGEBYSCORE 取出到期成员。仍要处理重复消费。'},
      {title:'和 GEO',body:'附近点查询用 GEO（底层也是 ZSet/geohash），不要把排行榜 ZSet 当成地图索引，见 redis-geo-on-zset-not-gis。'},
      {title:'怎样自己验证',body:'插入多成员后改一个分，确认范围结果顺序变化，无需应用 sort。'}
    ],
    refs:[['Redis：Sorted sets','https://redis.io/docs/latest/develop/data-types/sorted-sets/'],['Redis：ZRANGE','https://redis.io/docs/latest/commands/zrange/']]
  },
  {
    track:'java', group:'缓存', id:'redis-hyperloglog-approx',
    title:'HyperLogLog 只估基数，不保存每个元素',
    prompt:'为什么用 HyperLogLog 统计 UV 之后，却列不出“都有谁访问过”？',
    promptAnswer:'近似 UV 用 HyperLogLog。要成员或精确集合用 Set（或数据库）。',
    core:'HyperLogLog（`PFADD`/`PFCOUNT`）用固定小内存**估算**不重复个数，有标准误差，**不能**取出成员列表，也不能精确去重导出。要精确集合用 Set；要排行用 ZSet。UV 估算、巨大基数且能接受误差时用 HLL。合并多个 HLL 用 `PFMERGE`。类型总览见 `redis-data-types`。',
    why:'产品要“导出今日访客名单”，存的却是 HLL，最后只能道歉重采。',
    example:'`PFADD uv:2026-10-09 userA userB`。`PFCOUNT` 约等于不重复人数。无法 SMEMBERS。要名单应 `SADD` 或落库。',
    task:'划掉“HLL=省内存的 Set”。写出：要近似 UV、要成员列表，各用什么。',
    answer:'近似 UV 用 HyperLogLog。要成员或精确集合用 Set（或数据库）。HLL 列不出都有谁。',
    keywords:'HyperLogLog PFCOUNT 基数 UV',
    points:['HLL 估算基数，固定省内存','无法列出成员','要精确集合用 Set，不要用 HLL 冒充'],
    deep:[
      {title:'误差',body:'官方说明有标准误差量级。对账金额、库存件数不要用 HLL。'},
      {title:'怎样自己验证',body:'PFADD 少量已知成员，PFCOUNT 接近个数但 SMEMBERS 类命令不存在于该结构。'}
    ],
    refs:[['Redis：HyperLogLog','https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/'],['Redis：PFCOUNT','https://redis.io/docs/latest/commands/pfcount/']]
  },
  {
    track:'java', group:'数据库', id:'mysql-inner-join-match',
    title:'INNER JOIN 只保留两表都匹配的行',
    prompt:'为什么 INNER JOIN 之后左边表有的用户消失了？',
    promptAnswer:'只要匹配行用 INNER。保留左表无匹配用 LEFT。',
    core:'`INNER JOIN` 只输出**联结条件为真**的行组合。左表有、右表无匹配的行不会出现。需要保留左表全部行时用 `LEFT JOIN`，再对右表列看 NULL；`WHERE` 里写右表列 `= ?` 会把外连接打回内连接效果，见 `sql-outer-join-where`。`CROSS JOIN` 是笛卡尔积，通常要显式过滤。先写清“没匹配时还要不要左表行”，再选 INNER 还是 OUTER。',
    why:'用户表 INNER JOIN 订单后，“从未下单的用户”从结果里蒸发，报表人数对不上。',
    example:'`SELECT u.id FROM users u INNER JOIN orders o ON u.id=o.user_id` 只有下过单的用户。要全部用户加下单数，用 LEFT JOIN + COUNT。',
    task:'划掉“JOIN 就是把表拼一起”。写出：只要双方都有、要保留左表无匹配，各用哪种 JOIN。',
    answer:'只要匹配行用 INNER。保留左表无匹配用 LEFT。WHERE 过滤右表列可能把 LEFT 变成实质 INNER。',
    keywords:'INNER JOIN LEFT JOIN SQL 联结',
    points:['INNER JOIN 丢弃无匹配行','LEFT JOIN 保留左表，右表侧可为 NULL','WHERE 右表条件可能抵消外连接'],
    deep:[
      {title:'和 ON vs WHERE',body:'过滤联结条件优先写在 ON。WHERE 在联结之后过滤，对外连接更易踩坑。'},
      {title:'怎样自己验证',body:'造一个无订单用户，INNER 结果应无他；LEFT 应有他且订单列为 NULL。'}
    ],
    refs:[['MySQL：JOIN','https://dev.mysql.com/doc/refman/8.4/en/join.html'],['MySQL：外连接','https://dev.mysql.com/doc/refman/8.4/en/outer-join-simplification.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-group-by-having',
    title:'GROUP BY 聚合后，用 HAVING 过滤组，不要塞进 WHERE',
    prompt:'为什么 WHERE COUNT(*) > 10 直接语法报错或结果不对？',
    promptAnswer:'支付条件进 WHERE。COUNT>10 进 HAVING。',
    core:'`WHERE` 在**分组前**过滤行；`GROUP BY` 把行收成组并算 `COUNT/SUM/...`；`HAVING` 在**分组后**过滤组。对聚合结果设门槛必须用 HAVING（或子查询）。`SELECT` 列表里非聚合列在 ONLY_FULL_GROUP_BY 下必须出现在 GROUP BY。和 `mysql-where-having` 的易混点衔接：WHERE 不能引用分组后的聚合别名。',
    why:'把“订单数大于 10 的用户”写成 WHERE COUNT，数据库拒绝或算错，改成先取出再在应用过滤。',
    example:'`SELECT user_id, COUNT(*) c FROM orders GROUP BY user_id HAVING c > 10`。先 WHERE status=\'paid\' 再 GROUP，付费订单再计数。',
    task:'写出：只统计已支付、只要订单数>10 的用户，WHERE 与 HAVING 各放哪一句。',
    answer:'支付条件进 WHERE。COUNT>10 进 HAVING。聚合门槛不能指望 WHERE。',
    keywords:'GROUP BY HAVING COUNT 聚合',
    points:['WHERE 在分组前过滤行','HAVING 在分组后过滤组','聚合门槛用 HAVING 或子查询'],
    deep:[
      {title:'和 ONLY_FULL_GROUP_BY',body:'选了未分组、未聚合的列会报错。要么写入 GROUP BY，要么用聚合函数。'},
      {title:'和窗口函数',body:'要保留明细行并挂排名/组内累计，用 OVER，不要硬 GROUP BY，见 mysql-window-keeps-rows。'},
      {title:'怎样自己验证',body:'对比 WHERE 与 HAVING 位置错误时的报错信息；修正后组数应变少。'}
    ],
    refs:[['MySQL：GROUP BY','https://dev.mysql.com/doc/refman/8.4/en/group-by-modifiers.html'],['MySQL：HAVING','https://dev.mysql.com/doc/refman/8.4/en/select.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'dns-lb-not-just-round-robin',
    title:'DNS 负载均衡不是“调小 TTL 的简单轮询”就够',
    prompt:'为什么资料把 DNS 负载均衡写成简单轮询，并把刷新时间调得很小？',
    promptAnswer:'DNS 负载还有缓存与 TTL。不是简单轮询就均匀，故障摘除也慢。',
    core:'DNS 可以把一名多址解析到多台，**解析器与多层缓存**决定客户端实际拿到哪条记录；不是业务进程里可控的 round-robin 负载均衡器。TTL 调极小会增加 DNS 查询流量，也不能立刻让全球缓存都忘掉已下线的 IP，见资料易夸大的“调小就及时且随机”。真正按实例健康摘流，要在反向代理 / 云 LB / 客户端负载均衡上做，见 `nginx-upstream-passive`、`mw-proxy-lb-gateway`。地理 DNS 是另一能力，也不等于感知应用健康。',
    why:'只靠 DNS 轮询下线一台机器，用户仍打到缓存里的死 IP；把 TTL 调到几秒，解析流量先爆。',
    example:'双 A 记录指向两台 Web。一台宕机后，仍有客户端因缓存打到坏地址。摘流应在健康检查的负载均衡上做；DNS 更适合粗粒度容灾与就近接入。',
    task:'划掉“DNS=可控轮询+调小 TTL 就实时”。写出 DNS 做得到与做不到的各一句。',
    answer:'DNS 能多名多址与粗粒度调度。做不到可靠感知实例健康与立即全局失效。精细摘流交给 LB。TTL 极小有流量代价。',
    keywords:'DNS 负载均衡 TTL 健康检查',
    origin:'《分布式高并发.pdf》约第 92 页：DNS 负载均衡与调小刷新时间',
    points:['DNS 多记录受解析缓存约束','TTL 调极小不能保证立刻摘掉死 IP','实例级健康摘流应在 LB，不是只靠 DNS'],
    deep:[
      {title:'和反向代理',body:'反向代理在 HTTP 层选上游，能做主动/被动健康检查。DNS 在更外层，两者职责不同。'},
      {title:'TTL 与查询量',body:'把 TTL 拧到几秒会放大 DNS 查询，仍不能保证全球瞬时忘掉死 IP。秒级摘除放在 LB，不要只靠拧 TTL。'},
      {title:'怎样自己验证',body:'dig 同一名字多次，观察是否总变。宕一台后看客户端是否仍解析到它，对照 LB 健康检查是否已摘除。'}
    ],
    refs:[['RFC 1035：DNS','https://www.rfc-editor.org/rfc/rfc1035'],['Nginx：负载均衡','https://nginx.org/en/docs/http/load_balancing.html'],['Cloudflare：DNS TTL','https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_53) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
