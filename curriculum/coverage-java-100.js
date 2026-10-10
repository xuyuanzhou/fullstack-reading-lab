/* 《分布式高并发》D8：容器里 -Xmx≠cgroup；缓存与库双写竞态。 */
const COVERAGE_JAVA_100 = [
  {
    track:'java', group:'JVM', id:'jvm-xmx-not-container-limit',
    title:'-Xmx 是堆上限，不是容器内存限额的同义词',
    prompt:'为什么资料写给 JVM 配 -Xmx=宿主机的 80% 就安全，容器却被 OOMKilled？',
    promptAnswer:'堆只是一块。元空间、直接内存、线程栈还在堆外；超 cgroup 常被内核直接杀掉。',
    core:'**-Xmx** 只限制 **Java 堆**。进程还要：元空间、线程栈、直接内存、代码缓存、原生库与 JVM 自身。容器还有 **cgroup 内存上限**；堆设得接近上限时，非堆一涨就触发 **OOMKill**，看起来像“JVM 没报 OOM 却被杀掉”。容器感知要开对应参数/JDK 版本（如使用容器指标作为 ergonomics 输入），并给非堆留余量，而不是把宿主机或 cgroup 上限直接抄进 -Xmx。邻接 `container-shares-host-kernel`、`jvm-oom-signals`。',
    why:'堆 4G、cgroup 4G，运行一段时间原生内存一涨被杀；或旧 JDK 看不见容器限额按宿主机核数/内存估错。',
    example:'cgroup 极限 512Mi：-Xmx256m，并观察 RSS/容器指标与 DirectByteBuffer。不要 -Xmx512m 顶满。K8s 的 requests/limits 与 -Xmx 要同一张容量表。',
    task:'划掉“-Xmx=容器内存”。写出：堆外还可能占哪两类；超 cgroup 时谁先杀进程。',
    answer:'划掉同义。堆外有元空间、直接内存、线程栈等。超 cgroup 常由内核 OOMKiller 杀进程，不一定先走出清晰的 Java heap OOM。',
    keywords:'Xmx cgroup OOMKill 容器 JVM',
    origin:'《分布式高并发.pdf》容器/JVM 内存口诀常见混淆',
    diagram:'diagrams/jvm-xmx-not-container-limit.svg',
    points:['Xmx 只限堆','容器还有 cgroup 总上限','非堆与原生内存要留白'],
    deep:[
      {title:'和虚机',body:'虚机有另一套隔离；容器共享内核，限额靠 cgroup，见 vm-vs-container-isolation-tradeoff。'},
      {title:'怎样自己验证',body:'在小 memory limit 的容器里把 -Xmx 顶满并分配直接内存，观察是否被 OOMKill。'}
    ],
    refs:[['Java：容器支持','https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html'],['Kubernetes：内存','https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/'],['OpenJDK：Native Memory Tracking','https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/tooldescr007.html']]
  },
  {
    track:'java', group:'缓存', id:'cache-db-double-write-race',
    title:'先写库再删缓存仍可能读到旧值，双写要谈竞态',
    prompt:'为什么资料把 Cache Aside 写成“更新数据库后删除缓存”就结束，线上仍偶发读到旧数据？',
    promptAnswer:'先改库还是先改缓存，并发下都会有窗口。要定失效顺序与对账，不能只喊双写。',
    core:'**Cache Aside** 常见路径：读未命中→载入；写→更新存储→**删除**缓存键，见 `cache-aside-steps`。删除失败、延迟、以及**并发读回填**都会让旧值回来：例如写库完成前另一请求读到旧行并写入缓存，随后删键过早或过晚都会错。资料若只画“写库→删缓存”两步成功路径，会低估竞态。可选缓解：延迟双删、版本号/逻辑过期、订阅 binlog 删键、把更新串到同一键的单飞。没有银弹；要写清一致性窗口。邻接 `redis-client-side-cache-invalidate`。',
    why:'高峰改价后极短时间又读到旧价；或删缓存重试失败却当成功。',
    example:'坏：更新库存后 DEL 一次，忽略并发回填。好：更新带版本；回填时比较版本；或延迟再删一次；删除失败入补偿队列。',
    task:'划掉“写库后删缓存=永不过期旧读”。写出：一种仍读到旧值的时序；一种缓解。',
    answer:'划掉永不过期。并发读可在删键前后把旧行填回缓存。可用延迟双删、版本校验或变更流删键降低窗口。',
    keywords:'Cache Aside 双写 竞态 删缓存',
    origin:'《分布式高并发.pdf》缓存更新步骤常省略并发回填',
    diagram:'diagrams/cache-db-double-write-race.svg',
    points:['写库删缓存仍有竞态窗口','并发回填会写回旧值','要版本/双删/变更流等策略'],
    deep:[
      {title:'和先更缓存',body:'先改缓存再写库更容易长期脏；旁路删除通常更稳，但仍要处理竞态。'},
      {title:'怎样自己验证',body:'两线程交错：A 写库、B 读旧回填、A 删键；构造旧值残留，再试延迟双删。'}
    ],
    refs:[['Redis：Cache Aside','https://redis.io/docs/latest/develop/use-cases/cache-aside/'],['Redis：DEL','https://redis.io/docs/latest/commands/del/'],['AWS：Caching best practices','https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/best-practices.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_100) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
