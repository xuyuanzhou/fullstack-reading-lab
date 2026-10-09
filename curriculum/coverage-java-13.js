/* Batch 13: short ES + Redis interview PDFs. */
const COVERAGE_JAVA_13 = [
  {
    track:'java', group:'搜索', id:'es-lucene-not-btree',
    title:'Lucene 和 ES 都是倒排索引，不是 B+ 树对比',
    prompt:'为什么“Lucene 用 B+ 树、只能一个库；ES 才用倒排索引做分布式”不能当答案？',
    core:'Elasticsearch 的全文检索建立在 Apache Lucene 上。Lucene 为词项建立倒排表：词 → 出现过的文档（及位置等信息）。ES 把多份 Lucene 索引组织成分片、副本和集群，对外提供 HTTP JSON API，并处理映射、刷新与近实时可见性——导论「ES 是什么」见 `es-what-and-when`，本课专纠「Lucene=B+ 树 / 只有 ES 才倒排」。资料把 Lucene 写成 B+ 树、遍历搜索、只能一个索引库，把倒排当成 ES 才有的发明，层次是反的。B+ 树常见于关系库二级索引，不是 Lucene 正文检索的主结构。ES 也不是“没有事务所以删除一定不可恢复”：有刷新、快照、版本/seq_no 乐观并发；删除后能否看见取决于 refresh 与副本，而不是“没有事务”四个字。动态映射的 _default_ 与默认 string 类型属于旧版本叙事。',
    why:'按“Lucene 是 B+ 树、ES 才用倒排”去对比，底层检索引擎会说错，分片、refresh 和映射演进也会被漏掉。区分信号是词指向文档列表，而不是一棵按键有序的树。画错结构，查询也会选错。',
    example:'商品标题分词后，“耳机”指向包含它的文档编号列表。ES 把这种 Lucene 索引放到多个分片上并行搜。不要画一棵 B+ 树当 Lucene。删除后要等 refresh 才从搜索里消失，不是立刻永远看不见。',
    task:'对照 ES 文档里的倒排索引说明，划掉资料中的 B+ 树对比，并写出 refresh 与“删除立即永远消失”的差别。',
    answer:'划掉资料里的 B+ 树对比：Lucene 和 ES 的检索都是倒排索引，词指向文档。ES 在此之上做分片和集群，不是另外发明一种索引。refresh 之后新文档才可搜，删除也不会简化成没有事务、立刻永远消失。映射怎么演进要单独看，不能并进这句对比。',
    keywords:'Elasticsearch Lucene 倒排索引 B+树 分片 mapping',
    points:['Lucene 用倒排表，不是用 B+ 树做全文检索','ES 在 Lucene 之上做分片、副本与 HTTP API','删除与可见性要看 refresh/副本，不是“没有事务”四个字'],
    deep:[
      {title:'倒排回答的是词',body:'倒排适合“哪些文档包含这些词”。按主键取整行、按范围扫有序键，不是它的形状。把 Lucene 画成 B+ 树，会用错查询，也会误解删除和 refresh。按词找文档，不是按键扫树。'},
      {title:'和导论',body:'产品定位与何时用见 es-what-and-when；近实时可见性展开见 es-refresh-visibility。'},
      {title:'怎样自己验证',body:'对照 ES 文档里的倒排索引说明，划掉资料中的 B+ 树句子。写一条标题检索，看命中的是分词后的词。再对比 refresh 前后，新文档并不是写入瞬间就能搜到。'},
    ],
    refs:[['Elasticsearch：倒排索引','https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html'],['Lucene：index 包说明','https://lucene.apache.org/core/9_11_1/core/org/apache/lucene/index/package-summary.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-legacy-vm-limits',
    title:'Redis 没有 VM 换页，字符串上限也不是 1GB 或 512KB',
    prompt:'为什么“Redis 自建 VM 避免系统调用、value 最大 1GB、key 最长 512KB”不能当现行答案？',
    core:'早期 Redis 试验过 Virtual Memory 把冷键换到磁盘，该方案早已废弃，现行版本不靠自研 VM 当内存不够的解决方案。内存不够应扩容、拆分、设 maxmemory 淘汰，或把权威数据放在磁盘数据库。字符串值的文档上限是 512 MB，不是资料里的 1GB，也不是另一份资料写的 key 512KB。Memcached 默认 item 约 1MB 受 slab 限制，可以改配置，但不能据此推出 Redis 一定更快。命令原子性不等于 MULTI/EXEC 能回滚；“全部成功或全部不执行”见既有 `redis-transaction`。',
    why:'把自建 VM、value 最大 1GB、key 最长 512KB 背成现行能力，容量规划会选错存储，也会把已经拿掉的换页当卖点。区分信号是文档里的字符串上限是 512MB，且没有 VM 换页。',
    example:'会话字符串留在 KB 级。大文件放对象存储或数据库，不放进 Redis。不要指望 Redis 把冷数据换到自己的 VM 文件里。命令的原子性也不是关系数据库那种失败回滚事务。上限以文档的 512MB 为准。',
    task:'在当前 Redis 文档里查 STRING 上限，确认没有 Virtual Memory 作为推荐特性；划掉 1GB / 512KB / 自建 VM 三句。',
    answer:'在现行文档里查 STRING：上限按文档是 512MB，不是 1GB，key 也不是 512KB 那句。Virtual Memory 换页划掉，现行没有这套推荐特性。命令在执行时独占，但不等于数据库事务，失败不会自动把前面的写入滚回去。三句旧限制都划掉。',
    keywords:'Redis Virtual Memory 512MB STRING Memcached',
    points:['Virtual Memory 换页方案已废弃','STRING 上限是 512MB，不是 1GB 或 512KB key','不要用错误体积上限或“一定更快”比较 Memcached'],
    deep:[
      {title:'原子不是事务回滚',body:'单条命令执行时不会被别的命令插进一半。这不等于多条命令可以一起提交或回滚。把 Redis 说成自带 VM 的关系库，容量和失败语义都会错。容量规划不要靠换页文件。'},
      {title:'怎样自己验证',body:'打开当前 Redis 字符串文档，核对上限是不是 512MB，并确认没有 Virtual Memory 作为推荐特性。把资料里的 1GB、512KB 和自建 VM 三句划掉。'},
    ],
    refs:[['Redis：Strings','https://redis.io/docs/latest/develop/data-types/strings/'],['Redis：Memory optimization','https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/memory-optimization/']]
  },
  {
    track:'java', group:'缓存', id:'redis-eviction-policy-menu',
    title:'内存满了不是只会 LRU，也不是只有旧的六种名字',
    prompt:'为什么把 Redis 淘汰背成“就是 LRU”或只背 volatile-lru 那六项不够？',
    core:'达到 maxmemory 后按 maxmemory-policy 淘汰。现行菜单包括 noeviction（写新数据报错）、allkeys 或 volatile 前缀搭配 lru / lfu / random，以及 volatile-ttl；新版本还有按最近修改的 lrm。LRU/LFU 都是近似算法，抽样估计，不是精确链表。volatile-* 只在带 TTL 的键里挑，没有过期键时行为接近禁止驱逐。资料里的 no-enviction 是拼写错误。要保留热点 20 万条，通常 allkeys-lru 或 allkeys-lfu 比“只从已设置过期的集合里 LRU”更符合“热点不一定设了 TTL”。哨兵与集群分工见既有 `redis-sentinel-cluster`。',
    why:'只背 LRU 或旧的六项名字，键都没有 TTL 时会以为还会淘汰，写入其实直接报错。区分信号是政策名以 volatile 还是 allkeys 开头，以及拼写要和现行文档一致。写入报错才是信号。',
    example:'缓存实例用 allkeys-lru，内存满了按近似 LRU 淘汰任意键。配置键不能丢时不要放进这个实例指望 volatile-lru：没有 TTL 的键不参与，内存仍满就会写入失败。资料里的 no-enviction 拼写也要划掉。',
    task:'对照当前 eviction 文档列出政策名，划掉资料中的六项穷尽和 no-enviction，说明没有 TTL 时 volatile-lru 会怎样。',
    answer:'对照现行淘汰文档列出政策名，不要停在旧的六项。LRU 只是其中一种近似，不是唯一行为。volatile 开头的政策只处理带过期时间的键；键都没有 TTL 时，volatile-lru 淘汰不了，写入会失败。no-enviction 这句拼写和“只有六项”都划掉。',
    keywords:'Redis maxmemory-policy LRU LFU noeviction volatile-ttl',
    points:['maxmemory-policy 决定满内存时怎么删','LRU/LFU 是近似抽样，不是唯一算法','volatile-* 只从带过期时间的键里挑'],
    deep:[
      {title:'没有 TTL 就进不了 volatile',body:'volatile 政策的候选集是设置了过期的键。全部键都不过期时，候选是空的，内存满了不会挑一个删掉。缓存和不能丢的配置应分开，而不是靠错政策碰运气。空候选集不会帮你删键。'},
      {title:'怎样自己验证',body:'打开当前 eviction 文档，抄下政策名，划掉六项穷尽和 no-enviction。在一个只剩 volatile-lru、且键都没有 TTL 的实例上写入，直到内存满，确认是报错而不是悄悄淘汰。'},
    ],
    refs:[['Redis：Key eviction','https://redis.io/docs/latest/develop/reference/eviction/']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_13) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
