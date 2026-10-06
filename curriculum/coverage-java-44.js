/* Redis mind map + 8张图解java: Collection vs Collections, AOF vs RDB, cluster CLI. */
const COVERAGE_JAVA_44 = [
  {
    track:'java', group:'Java 基础', id:'java-collection-vs-collections',
    title:'Collection 是接口，Collections 是工具类',
    prompt:'为什么图上把 Collection 和 Collections 画在一起，有人就把工具类当成集合根类型？',
    core:'`java.util.Collection` 是 List、Set、Queue 的根接口，变量类型通常写它。`java.util.Collections` 是只含静态方法的类：排序、同步包装、不可变视图、空集合。`java.util.Arrays` 同样是工具类，`asList` 不是 `java.util.ArrayList`，见 `java-arrays-aslist-fixed`。Map 不在 Collection 树上。不能 `new Collections()` 当业务容器，也不能把 `Collections.sort` 写成 `collection.sort` 就以为自己实现了 Collection。不可变视图仍可能被原列表改掉，见既有课。',
    why:'面试把 Collections 说成“集合顶层接口”，一写方法签名就找不到 add。把 Arrays 当成 ArrayList 的父类，asList 一 add 就抛错还以为是集合坏了。',
    example:'List<String> names = new ArrayList<>(); 类型也可以写成 Collection<String>。Collections.sort(names) 是静态调用。Arrays.asList("a") 的返回类型不是 java.util.ArrayList。',
    task:'划掉“Collections 是集合根接口”。分别写出 Collection、Collections、Arrays 各自能 new 吗、方法是实例还是静态。',
    answer:'Collection 是接口，不能直接 new，由 ArrayList 等实现。Collections 和 Arrays 是工具类，方法是静态的。Map 不在 Collection 树上。asList 见另一课。',
    keywords:'Collection Collections Arrays List Set Map',
    origin:'本地库「8张图解java」里 Collection 与 Collections 并排的图',
    diagram:'diagrams/java-collection-collections.svg',
    points:['Collection 是 List/Set/Queue 的根接口','Collections 只有静态方法，不是容器','Arrays 也是工具类，asList 不是 java.util.ArrayList'],
    deep:[
      {title:'Map 为什么不在树上',body:'Map 是键值对，没有 Collection 那种单一元素迭代契约。要遍历时用 entrySet、keySet，那些才是 Set。不要强迫 Map 实现 Collection。'},
      {title:'怎样自己验证',body:'打开三个类的 JavaDoc 第一句。Collection 写 interface，Collections 和 Arrays 写 class 且方法是 static。试 new Collections()，应没有可用的业务构造器。'}
    ],
    refs:[['Collection','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collection.html'],['Collections','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html'],['Arrays','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-aof-keeps-rdb',
    title:'打开 AOF 不会让 RDB 退役',
    prompt:'为什么思维导图写“AOF 默认关闭；一旦开启，RDB 就不作宕机恢复”？',
    core:'默认 `appendonly` 常常仍是 no，这时重启读 dump.rdb。打开 AOF 之后，**重启优先重放 AOF**，这只是启动选择，不是把 RDB 删掉。RDB 仍用于手动/定时快照、主从第一次全量、以及 AOF 重写时的 RDB preamble（Redis 4 起）。两种可以同时开。打开 AOF 也不等于零丢失，窗口看 fsync，见 `redis-persistence`。复制后续增量是命令流，不是 SQL，见 `redis-repl-psync-not-sql`。',
    why:'关掉 BGSAVE 以为开了 AOF 就够，从库全量同步变慢，重写后的 AOF 也失去 RDB 前缀带来的压缩。',
    example:'appendonly yes 且 save 仍配置时，目录里可同时有 appendonly.aof 和 dump.rdb。从库第一次同步仍可能先收一份 RDB。只开 AOF、每秒 fsync，断电仍可能丢最近一秒。',
    task:'划掉“AOF 一开 RDB 就退役”。写出重启读谁、复制全量用谁、重写 AOF 还能否带 RDB 前缀。',
    answer:'重启时若 AOF 开着就优先 AOF。复制全量和 AOF 重写仍会用到 RDB。默认也可以只开 RDB。打开 AOF 不是零丢失。',
    keywords:'Redis AOF RDB preamble persistence dump.rdb',
    origin:'本地库 Redis 思维导图的持久化枝',
    diagram:'diagrams/redis-aof-rdb.svg',
    points:['默认可以只开 RDB，重启读 dump.rdb','打开 AOF 后重启优先 AOF，RDB 仍用于快照和复制','AOF 重写可以带 RDB 前缀，不是互斥开关'],
    deep:[
      {title:'启动读哪个文件',body:'appendonly yes 时用 AOF 恢复。关掉 AOF 才用 RDB。这是启动顺序，不是“第二种文件非法”。备份策略可以两种都留。'},
      {title:'怎样自己验证',body:'读当前 redis.conf 的 appendonly 和 save。看数据目录里是否两种文件都在。对照持久化文档里 AOF rewrite 与 RDB preamble 的说明。'}
    ],
    refs:[['Redis：持久化','https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/'],['Redis：复制','https://redis.io/docs/latest/operate/oss_and_stack/management/replication/']]
  },
  {
    track:'java', group:'缓存', id:'redis-cluster-cli-not-trib',
    title:'创建集群用 redis-cli --cluster，不是 redis-trib',
    prompt:'为什么导图还指向 cluster-install.sh 和 Redis 3.0 才有的安装脚本？',
    core:'集群能力从 Redis 3.0 进入核心，这点仍对。**创建和运维入口**在 Redis 5 换成 `redis-cli --cluster`（create、add-node、reshard）。`redis-trib.rb` 已移除。槽位仍是 16384，不是一致性哈希，见 `redis-string-max-512mb`。哨兵不分片，见 `redis-sentinel-cluster`。导图上的 Cluster-install.sh 不能当现行答案。',
    why:'按旧脚本去找 redis-trib.rb，新版本包里没有这个文件，会误以为集群只能靠第三方 Codis。',
    example:'redis-cli --cluster create 127.0.0.1:7001 ... --cluster-replicas 1。不要再执行 redis-trib.rb create。CLUSTER NODES 里看 16384 个槽的分配。',
    task:'划掉 redis-trib 和 Codis 默认。写出创建命令，以及哨兵是否分片。',
    answer:'创建用 redis-cli --cluster。槽位 16384。哨兵只做主从切换。3.0 起核心才有集群，这点保留。',
    keywords:'Redis Cluster redis-cli redis-trib 16384',
    origin:'本地库 Redis 思维导图的集群枝',
    diagram:'diagrams/redis-cluster-cli.svg',
    points:['运维入口是 redis-cli --cluster','redis-trib.rb 已不是创建命令','集群从 3.0 进入核心，槽位仍是 16384'],
    deep:[
      {title:'和第三方代理',body:'Codis、Twemproxy 是旧分片方案。官方集群用槽和重定向。新部署不要把代理画成默认。'},
      {title:'怎样自己验证',body:'打开正在用的 Redis 文档里 Create a Redis Cluster，命令应是 redis-cli --cluster。本机 which redis-trib.rb 在现行安装里应找不到。'}
    ],
    refs:[['Redis：集群扩容','https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/'],['Redis：集群规范','https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_44) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
