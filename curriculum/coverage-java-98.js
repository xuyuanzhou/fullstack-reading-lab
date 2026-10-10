/* 《分布式高并发》D8：线程池公式；读写分离≠强一致读。 */
const COVERAGE_JAVA_98 = [
  {
    track:'java', group:'并发', id:'thread-pool-formula-not-law',
    title:'“线程数 = CPU×2”是启发式，不是容量定律',
    prompt:'为什么资料给线程池大小写成 CPU 核数的两倍就完事，上线后延迟和拒绝策略一起炸？',
    promptAnswer:'核数×2 缺等待比和队列/拒绝策略。要看活跃线程、队列深度与拒绝，并用压测校准。',
    core:'口诀 **Nthreads ≈ Ncpu × (1 + 等待/计算)** 或粗暴的 **×2**，只能当**起点**。真实容量取决于：任务是 CPU 密还是阻塞 IO、队列有界与否、拒绝策略、下游超时、上下文切换。把公式当真理会：IO 任务池过小排队爆炸，或 CPU 任务池过大抖动。虚拟线程改变的是“一请求一平台线程”成本模型，见 `java-virtual-threads`，也不等于无限并发下游。压测与池指标（活跃、队列、拒绝）比背核数倍数重要。邻接 `java-threads-not-linear-speedup`、`java-linked-blocking-unbounded`。',
    why:'按×2 配池，阻塞调用把机器打满；或无界队列把 OOM 藏到堆里。',
    example:'纯计算：池大小贴近核数并有界队列。混杂 JDBC：分开 CPU 池与 IO 池，IO 池按下游连接池与超时定，而不是统一×2。观察拒绝次数再调。',
    task:'划掉“池大小=核数×2”。写出：公式缺哪两类输入；上线前要看哪两个指标。',
    answer:'划掉定律。缺任务等待比与队列/拒绝策略。要看活跃线程、队列深度与拒绝，并用压测定。',
    keywords:'线程池 大小 CPU 启发式',
    origin:'《分布式高并发.pdf》常见线程池 sizing 口诀（核数倍数）',
    diagram:'diagrams/thread-pool-formula-not-law.svg',
    points:['核数倍数只是起点','区分 CPU 与阻塞任务','队列与拒绝策略要一起设计'],
    deep:[
      {title:'和虚拟线程',body:'可多挂起等待，仍受连接池、锁、速率限制约束；不是取消容量规划。'},
      {title:'怎样自己验证',body:'同一负载下对比×2 与按等待比估算的池，看 P99 与拒绝次数。'}
    ],
    refs:[['Java：Executor','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html'],['Java：虚拟线程','https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html'],['Java Concurrency in Practice（池大小讨论）','https://jcip.net/']]
  },
  {
    track:'java', group:'数据库', id:'rw-split-not-strong-consistency',
    title:'读写分离摊的是读负载，不是强一致读自己的写',
    prompt:'为什么资料画了“写主库、读从库”就说扩展完成，用户改完资料刷新却看到旧值？',
    promptAnswer:'读写分离优化读吞吐。要读到刚写的值需读主、等位点或缓存，不能默认从库。',
    core:'**读写分离**把读流量派到副本，主库承担写，能提高读吞吐，资料方向对。副本是**异步或半同步复制**时存在 **lag**，读自己的写（read-your-writes）不保证，见 `mysql-replica-lag`、`distributed-read-your-writes`。要会话一致可读：写后读主、按位点等待、或缓存刚写键。把“已经读写分离”写成“已经强一致水平扩展”会误导容量与正确性两边。邻接 `sync-replication-not-only-durability`。',
    why:'用户改昵称后列表仍旧；或故障切换后从库落后被当成主用。',
    example:'更新 profile 走主库；个人中心随后 GET 也走主或等 Seconds_Behind_Source≈0。公开广场流可读从库并接受短暂旧读。',
    task:'划掉“读写分离=强一致扩展”。写出：它优化什么；read-your-writes 要另加什么。',
    answer:'划掉等价。读写分离优化读吞吐。要读到刚写的值需读主、等位点或缓存，不能默认从库。',
    keywords:'读写分离 复制延迟 read-your-writes',
    origin:'《分布式高并发.pdf》读写分离架构常见省略延迟',
    diagram:'diagrams/rw-split-not-strong-consistency.svg',
    points:['读写分离摊读负载','副本可能落后于主','读己之写要额外策略'],
    deep:[
      {title:'和分库',body:'分片解决的是数据规模与写扩展，与副本读扩展不同维。'},
      {title:'怎样自己验证',body:'写主后立刻读从，在注入延迟的实验里应能看到旧值；读主则新。'}
    ],
    refs:[['MySQL：复制','https://dev.mysql.com/doc/refman/8.4/en/replication.html'],['MySQL：副本状态','https://dev.mysql.com/doc/refman/8.4/en/replication-administration-status.html'],['AWS：读写分离模式','https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_98) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
