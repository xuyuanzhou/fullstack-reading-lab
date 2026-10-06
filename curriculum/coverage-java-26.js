/* Batch 26: InnoDB AUTO_INCREMENT 8.0, Dubbo timeout retries, HashMap treeify. */
const COVERAGE_JAVA_26 = [
  {
    track:'java', group:'数据库', id:'mysql-autoinc-persists-8',
    title:'InnoDB 自增重启后不再从空洞里捡号，是 8.0 才持久化的',
    prompt:'为什么还把“删掉 15–17 行再重启，InnoDB 下一条一定是 15”当成现行默认？',
    core:'MyISAM 把自增计数写在表文件里，重启一般接着最大已用值。InnoDB 在 5.7 及更早把计数放在内存，重启后会按当时数据里的 MAX+1 重新算，所以删掉末尾几行再重启可能复用空洞。从 8.0 起计数会写入 redo，恢复后继续往前分配，默认不再回到 15。OPTIMIZE 或重建表仍可能改计数。不要用自增当业务连续编号，复制和回滚都会留空洞。题单里把 RC 写成会脏读也不对，已提交读禁止脏读，见 `mysql-isolation-levels`。FLOAT 不是“8 位精度四个字节”那种口诀，见 `mysql-float-ieee-not-8-digits`。',
    why:'还按 5.7 的口诀说删掉末尾再重启，下一条一定捡回 15。在 8.0 及以后的实例上，重启拿到的是继续往前的号，对账会对不上。区分信号是 8.0 起计数写入 redo，默认不再从空洞里捡号。',
    example:'在 8.4 的 InnoDB 上插入 1 到 17，删掉 15、16、17 再重启，下一次插入通常是 18，不是 15。只有把同一张表放回 5.7，重启才可能按当时数据的 MAX+1 捡回 15。MyISAM 则把计数写在表文件里。',
    task:'对照 InnoDB AUTO_INCREMENT 文档，写出 8.0 相对 5.7 改了什么；划掉“InnoDB 重启一定从 15 开始”。',
    answer:'对照 AUTO_INCREMENT 文档，8.0 相对 5.7 改的是：计数写入 redo，恢复后继续往前分配，默认不再回到被删掉的末尾空洞。划掉“InnoDB 重启一定从 15 开始”。5.7 及更早计数在内存里，重启才按 MAX+1 重算。自增仍不要当连续业务编号，复制和回滚都会留空洞。',
    keywords:'InnoDB AUTO_INCREMENT 8.0 redo MyISAM',
    points:['5.7 InnoDB 自增计数在内存，重启按 MAX+1','8.0 起写入 redo，重启默认不捡末尾空洞','自增不是连续业务编号'],
    deep:[
      {title:'重启接着往前分配',body:'8.0 起自增值跟 redo 一起恢复，删掉表尾几行再重启，下一条仍往前走。5.7 重启会按当时行里的最大值加一再算，末尾空洞可能被捡回来。OPTIMIZE 或重建表仍可能改这个计数，所以它也不是业务上的连续单号。'},
      {title:'怎样自己验证',body:'对照 AUTO_INCREMENT 说明，把“重启一定从 15 开始”划掉，并写出 8.0 起写入 redo。再用 5.7 的行为对照：只有计数还在内存里时，删掉末尾再重启才可能回到 15。'},
    ],
    refs:[['InnoDB AUTO_INCREMENT Handling','https://dev.mysql.com/doc/refman/8.4/en/innodb-auto-increment-handling.html'],['MySQL 8.0：InnoDB Persistent Autoinc','https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-0.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-float-ieee-not-8-digits',
    title:'FLOAT 不是八位十进制精度，DOUBLE 也不是十八位',
    prompt:'为什么把 FLOAT 背成“8 位精度、4 字节”，把 DOUBLE 背成“18 位、8 字节”会对不上 IEEE 754？',
    core:'MySQL FLOAT 默认是单精度，大约 4 字节、二进制 24 位尾数，十进制有效数字大约 6–7 位，不是 8。DOUBLE 是双精度、8 字节、大约 15–16 位十进制，不是 18。声明 FLOAT(M,D) / DOUBLE(M,D) 在 8.0.17 起已过时，新版本按标准浮点存。金额、数量不要用 FLOAT。CHAR_LENGTH 计字符、LENGTH 计字节这点资料方向对。',
    why:'把 FLOAT 背成 8 位十进制、DOUBLE 背成 18 位，误差预算会按错数量级，金额加几次 0.1 就对不上，还以为类型没问题。区分信号是单精度大约 6 到 7 位有效数字，双精度大约 15 到 16 位。',
    example:'把 0.1 放进 FLOAT 或 DOUBLE，连加十次，结果常常不是 1.0。钱和数量改用 DECIMAL。FLOAT 大约 4 字节，DOUBLE 大约 8 字节，不要按 8 位和 18 位去估能存几位小数。',
    task:'对照数值类型文档，写出 FLOAT 与 DOUBLE 的字节数和大约十进制位数；划掉 8 和 18。',
    answer:'对照数值类型文档，FLOAT 大约 4 字节，十进制有效数字大约 6 到 7 位，划掉 8 位。DOUBLE 大约 8 字节，大约 15 到 16 位十进制，划掉 18 位。金额不要用这两种浮点，用 DECIMAL。FLOAT(M,D) 这种声明在 8.0.17 起已经过时。',
    keywords:'FLOAT DOUBLE IEEE 754 DECIMAL MySQL',
    points:['FLOAT 是单精度大约 6–7 位十进制','DOUBLE 大约 15–16 位，不是 18','金额不要用浮点'],
    deep:[
      {title:'有效数字不是那个口诀',body:'单精度尾数是二进制 24 位，换算成十进制大约 6 到 7 位，不是 8。双精度大约 15 到 16 位，不是 18。字节数倒是大约 4 和 8，口诀把精度和字节捆错了。0.1 这种十进制小数在二进制里常常存不准，所以钱要用 DECIMAL。'},
      {title:'怎样自己验证',body:'对照数值类型文档，写出 FLOAT、DOUBLE 的大约字节数和十进制位数，并把 8 位、18 位划掉。再把 0.1 连加十次，看结果是不是 1.0；金额改成 DECIMAL 后，同一笔加法应能对上。'},
    ],
    refs:[['MySQL：Numeric Types','https://dev.mysql.com/doc/refman/8.4/en/numeric-types.html'],['IEEE 754','https://en.wikipedia.org/wiki/IEEE_754']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'dubbo-timeout-retry-idempotent',
    title:'消费方超时不会掐掉提供方线程，默认还会再试',
    prompt:'为什么服务调用超时后，只把超时时间改大，却不处理幂等，脏数据还会来？',
    core:'超时主要配在消费方。到点之后消费方放弃等响应，提供方线程默认还在跑，不会因为客户端超时就被中断。`retries` 默认 2，表示失败后再试 2 次，合计最多 3 次。超时、网络抖动都会触发重试，非幂等写接口会重复下单。消费方超时优先于提供方超时。协议清单里的 dubbo/rmi/http 是旧默认叙述，现行 Triple 走 HTTP/2，不要把 Hessian+ZK 当成冻结搭配，见 `dubbo-hessian-zk-not-frozen`。注册中心挂了仍可靠本地缓存，见 `dubbo-registry-down-local-cache`。',
    why:'只把超时改大，提供方那次写入并没有停，默认还会再试两次。非幂等的下单会落两笔，对账对不上，还以为是超时秒数配小了。区分信号是超时发生在消费方，retries 默认是 2，提供方线程还在跑。',
    example:'下单超时配成 1 秒，提供方实际 3 秒才写完库。消费方到点已经放弃，并按默认再试，库里出现两笔订单。写接口要把 retries 设成 0，或者用幂等键认出第二次。客户端放弃之后，提供方那次调用并不会被掐掉。',
    task:'对照 Dubbo 超时与 retries，写出默认会试几次；说明超时会不会中断提供方。',
    answer:'对照超时和 retries：消费方到点放弃等待，不会把提供方线程中断，那边默认还在跑。retries 默认 2，表示失败后再试 2 次，连第一次最多大约 3 次调用。写接口必须做成幂等，或者把重试关掉，否则超时一次就可能多写一笔。调大超时代替不了幂等。',
    keywords:'Dubbo timeout retries 幂等 Triple',
    points:['超时发生在消费方，提供方线程默认继续','retries 默认 2，最多约 3 次调用','写操作要幂等或关闭重试'],
    deep:[
      {title:'放弃等待不是取消执行',body:'消费方超时只表示自己不再等这次响应。提供方线程默认继续把订单写完。retries 默认 2，超时或抖动都会再打一次，非幂等接口就会多出一笔。把超时调大只能减少触发，不能代替幂等键。'},
      {title:'怎样自己验证',body:'对照配置写出 retries 默认是 2，连同第一次最多大约 3 次。再确认超时不会中断提供方：客户端已经放弃时，服务端那次写入仍可能提交。写接口要么关掉重试，要么用幂等键挡住第二次。'},
    ],
    refs:[['Dubbo：Timeout','https://dubbo.apache.org/en/overview/mannual/java-sdk/tasks/traffic-management/timeout/'],['Dubbo：Retries','https://dubbo.apache.org/en/overview/mannual/java-sdk/reference-manual/config/properties/']]
  },
  {
    track:'java', group:'Java 基础', id:'hashmap-treeify-need-capacity',
    title:'链表变红黑树不只看长度 8，还要桶数组够大',
    prompt:'为什么把 HashMap 冲突背成“链表大于 8 就立刻变红黑树”？',
    core:'同一哈希桶先拉链。JDK 8 起，桶上节点数达到 `TREEIFY_THRESHOLD`（8）时尝试树化，但若表容量小于 `MIN_TREEIFY_CAPACITY`（64）会先扩容，避免小表过早成树。退化阈值是 6。树化解决的是同一桶过长，不是“哈希冲突只能链表”。equals 相等则覆盖，不等才挂到桶上。容量要 2 的幂。多线程结构修改仍要 ConcurrentHashMap 或加锁，见 `java-concurrent-map`。',
    why:'把冲突背成链表一到 8 就立刻变红黑树，在容量还是 16 的小表里会一直等树化，实际上先发生的是扩容。区分信号是还要表容量至少 64，不够就先 resize，并不是链表一满就变树。',
    example:'连续放入哈希落在同一桶的键。桶上节点到 8 时，如果 table 还小于 64，HashMap 先扩容，不会马上变成树。容量到 64 之后，同一桶再达到阈值才树化。退化阈值是 6。键相等则覆盖，不是再挂一个节点。',
    task:'对照 HashMap 源码常量，写出树化的两个条件；划掉“大于 8 立刻变树”。',
    answer:'对照源码常量，树化要同时满足两件事：桶上节点达到 TREEIFY_THRESHOLD，也就是 8；表容量至少是 MIN_TREEIFY_CAPACITY，也就是 64。划掉“大于 8 立刻变树”：容量不够时先扩容。普通 HashMap 仍不能并发改结构。',
    keywords:'HashMap TREEIFY_THRESHOLD MIN_TREEIFY_CAPACITY 红黑树',
    points:['冲突先拉链，相等 key 覆盖','树化要长度阈值和最小容量 64','普通 HashMap 不是线程安全结构'],
    deep:[
      {title:'小表先把桶摊开',body:'同一桶先用链表。节点数到 8 只是尝试树化的门槛。表还小于 64 时，扩容更能把键散开，所以先 resize，而不是在很小的数组上建树。容量够了再树化；节点少回 6 时可以退化。equals 相同的键是覆盖，不是再挂一个节点。'},
      {title:'怎样自己验证',body:'在 HashMap 里找到 TREEIFY_THRESHOLD 和 MIN_TREEIFY_CAPACITY。写出两个条件：桶上大约 8 个节点，并且表容量至少 64。容量 16 时把“立刻变树”划掉，确认走的是扩容。'},
    ],
    refs:[['OpenJDK HashMap','https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/HashMap.java'],['JEP 180：HashMap collisions','https://openjdk.org/jeps/180']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_26) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
