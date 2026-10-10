/* Java 116: W3CSchool 续扫 — RESOURCE GROUP；CLUSTER SLOTS。 */
const COVERAGE_JAVA_116 = [
  {
    track:'java', group:'数据库', id:'mysql-resource-group-not-os-cgroup',
    title:'Resource Group 是线程 CPU/优先级绑定，不是操作系统 cgroup 配额',
    prompt:'为什么建了 MySQL Resource Group 并把慢查询塞进去，有人就以为“已经做完容器 CPU 隔离，吵闹邻居解决了”？',
    promptAnswer:'Resource Group 管的是服务器内线程与 CPU 亲和/优先级。不是 OS cgroup 配额。',
    core:'MySQL **Resource Group**（8.0+）把**用户线程**绑到 CPU 集合、调 VCPU 优先级，可用 `CREATE RESOURCE GROUP`、`SET RESOURCE GROUP` 或优化器提示 `/*+ RESOURCE_GROUP(name) */`。它作用在** mysqld 进程内部的线程调度提示**，**不是** Linux cgroup / 容器 `--cpus` / 整机隔离，也不能替代连接池、限流与慢 SQL 治理。权限与平台限制（如部分 macOS）要查现行文档。邻接 `mysql-slow-sql-optimize`、`thread-pool-formula-not-law`。不要把 Resource Group 背成“数据库版 Kubernetes 配额”。',
    why:'只建 Resource Group 不调容器 limit，宿主机仍被打满；或提示写错线程类型导致不生效还以为隔离坏了。',
    example:'为批量报表会话 `SET RESOURCE GROUP batch_low;` 或 `SELECT /*+ RESOURCE_GROUP(batch_low) */ ...`。在线 OLTP 仍靠索引与池化；容器 CPU 在编排层设 requests/limits。',
    task:'划掉“Resource Group=cgroup”。写出：它绑定的是什么；OS/容器配额还在哪一层。',
    answer:'Resource Group 约束 mysqld 内线程的 CPU 亲和与优先级。容器/OS 配额在编排与内核，不由它替代。',
    keywords:'MySQL Resource Group CPU 线程 cgroup',
    points:['绑定线程 CPU/优先级','不是 OS cgroup 配额','不能替代慢 SQL 与池化'],
    deep:[
      {title:'和提示',body:'RESOURCE_GROUP 提示只覆盖部分 DML；改完要看线程是否真进了目标组。'},
      {title:'怎样自己验证',body:'对照 performance_schema.threads / 资源组状态；容器 limit 与组内优先级是两层。'}
    ],
    refs:[['MySQL：Resource Groups','https://dev.mysql.com/doc/refman/8.4/en/resource-groups.html'],['MySQL：CREATE RESOURCE GROUP','https://dev.mysql.com/doc/refman/8.4/en/create-resource-group.html'],['MySQL：Optimizer Hints','https://dev.mysql.com/doc/refman/8.4/en/optimizer-hints.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-cluster-slots-not-app-shard-key',
    title:'CLUSTER SLOTS 是槽到节点的拓扑，不是业务分片键设计',
    prompt:'为什么有人执行了 CLUSTER SLOTS，就在评审里写“我们已经按用户 id 做了业务分片”？',
    promptAnswer:'SLOTS 描述 16384 槽谁负责。业务键如何落槽是另一回事。',
    core:'**`CLUSTER SLOTS`**（及 `CLUSTER NODES`/`SHARDS`）返回 **hash slot → 主从节点** 的拓扑，供客户端路由与重定向（MOVED/ASK）。槽一共 **16384**，键经 CRC16 映射进槽；`CLUSTER KEYSLOT key` 只回答**某一个键**落在哪槽。它**不**定义你的业务分片键、租户路由或跨键事务边界。要把订单与用户放到同节点，靠 **hash tag** `{userId}...` 等约定，见 `redis-cluster-incr-not-five-steps`、`redis-proxy-hash-not-cluster`。不要把「会跑 CLUSTER SLOTS」写成业务分片方案完成。',
    why:'多键事务/Lua 未加 tag 跨槽失败，却怪 SLOTS 命令；或把槽号当业务分片表主键。',
    example:'客户端缓存 SLOTS 映射后按 KEYSLOT 选节点。`MGET user:{42}:profile user:{42}:cart` 同槽；`user:42` 与 `cart:42` 无 tag 可能跨槽。',
    task:'划掉“SLOTS=业务分片键”。写出：SLOTS 回答什么；同槽多键还靠什么。',
    answer:'SLOTS 描述槽到节点拓扑。键如何落槽与同槽多键靠键名/hash tag 设计，不是 SLOTS 自动给的业务分片。',
    keywords:'Redis CLUSTER SLOTS KEYSLOT hash-tag 分片',
    points:['SLOTS 是槽→节点拓扑','KEYSLOT 算单键槽位','业务同槽靠 hash tag 等约定'],
    deep:[
      {title:'和代理',body:'有的代理自研哈希与 Cluster 槽不一致，见 redis-proxy-hash-not-cluster。'},
      {title:'怎样自己验证',body:'对带/不带 `{tag}` 的键跑 KEYSLOT；对照 SLOTS 看节点，再试跨槽 MGET 应失败。'}
    ],
    refs:[['Redis：CLUSTER SLOTS','https://redis.io/docs/latest/commands/cluster-slots/'],['Redis：CLUSTER KEYSLOT','https://redis.io/docs/latest/commands/cluster-keyslot/'],['Redis：Cluster specification','https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_116) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
