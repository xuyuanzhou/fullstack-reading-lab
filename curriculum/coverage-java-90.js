/* 《分布式高并发》D8：雪花改参；LRU 链表+Hash。 */
const COVERAGE_JAVA_90 = [
  {
    track:'java', group:"分布式与高并发", id:"snowflake-params-need-capacity-math",
    title:"“雪花可按需改”先要做容量算术",
    prompt:"为什么资料写 snowflake 可按项目修改，并估数据中心与机器数？",
    core:"改 bit 分配可以，资料鼓励定制。但改了就要重算：每毫秒序列、时钟回拨策略、与已发出 id 的兼容。不是随便改。邻接 distributed-unique-id。",
    why:"把序列位改短，高峰撞号；或改长度导致下游字段溢出。",
    example:"先估峰值 QPS 与机器数，再定 worker/序列位；文档化时钟方案。",
    task:"划掉“随便改 bit”。写出改之前要估的两三个量。",
    answer:"划掉随便改。先估峰值、节点数、时钟策略与兼容。改位即改容量与风险。",
    keywords:"雪花 ID 位分配 时钟",
    origin:"《分布式高并发.pdf》约第 196 页附近：snowflake 可按需修改",
    diagram:"diagrams/snowflake-params-need-capacity-math.svg",
    points:["可定制但要算术","序列与节点位互斥","时钟回拨要有策略"],
    deep:[
      {title:"和 Redis 发号",body:"集群发号不是五节点各步长 5 那么简单，见 incr 课。"},
      {title:"怎样自己验证",body:"用峰值 QPS 验算每毫秒序列是否够用。"}
    ],
    refs:[["Twitter Snowflake 讨论","https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake"],["UUID 与有序 id","https://www.rfc-editor.org/rfc/rfc9562"],["分布式唯一 id 课邻接","https://dev.mysql.com/doc/refman/8.4/en/"]]
  },
  {
    track:'java', group:"缓存", id:"lru-needs-hash-and-list",
    title:"LRU 口诀要同时有哈希与链表",
    prompt:"为什么资料写 LRU 利用链表和 HashMap：尾部最近最久未访问？",
    core:"O(1) LRU 需要哈希定位+双向链表维护次序，资料方向对。易错只画链表忘哈希，或把容量淘汰当成 TTL（见 lru-capacity 课）。并发下还要锁或分段。",
    why:"面试只答链表，说不清为何查找是 O(1)。",
    example:"LinkedHashMap accessOrder 或手写 map+list。容量满淘汰尾；TTL 另轮询。",
    task:"划掉“LRU=一个链表”。画出查找与淘汰各碰哪个结构。",
    answer:"划掉单链表。哈希 O(1) 定位，链表维护次序。容量淘汰≠TTL。",
    keywords:"LRU HashMap 链表",
    origin:"《分布式高并发.pdf》约第 198 页附近：链表和 HashMap 实现 LRU",
    diagram:"diagrams/lru-needs-hash-and-list.svg",
    points:["哈希定位要分清","链表维护次序","容量与 TTL 分开"],
    deep:[
      {title:"和分布式缓存",body:"本地 LRU 与 Redis maxmemory 策略不同层。"},
      {title:"怎样自己验证",body:"手写 put/get，断言淘汰顺序与 O(1) 结构。"}
    ],
    refs:[["MDN Map","https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"],["Redis 淘汰","https://redis.io/docs/latest/develop/reference/eviction/"],["Java LinkedHashMap","https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/LinkedHashMap.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_90) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
