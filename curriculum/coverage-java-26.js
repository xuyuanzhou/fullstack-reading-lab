/* Batch 26: InnoDB AUTO_INCREMENT persistence, FLOAT precision, Dubbo retries, HashMap treeify. */
const COVERAGE_JAVA_26 = [
  {
    track:'java', group:'数据库', id:'mysql-autoinc-persists-8',
    title:'InnoDB 自增重启后不再从空洞里捡号，是 8.0 才持久化的',
    prompt:'为什么还把“删掉 15–17 行再重启，InnoDB 下一条一定是 15”当成现行默认？',
    promptAnswer:'8.0 起最大计数值写入 redo，并在检查点进入数据字典。正常重启从这份计数继续，默认不再按现存行的 MAX+1 捡回被删掉的末尾。',
    core:'自增在运行中本来就会跳号：回滚不会把刚分配的号还回去，并发插入也可能交错。这和“重启之后按表里还在的最大行号加一，把末尾空洞捡回来”不是一件事。8.0 起，当前最大计数值每次变化都写入 redo，每个检查点再写入数据字典。正常关机后重新启动，从这个保存的计数恢复，不再执行等价于 SELECT MAX(自增列)+1 的重算。所以插入到 17，删掉 15、16、17，正常重启后的下一条仍是 18。5.7 及更早的 InnoDB 把计数放在内存里，重启才按当时行里的最大值加一，末尾空洞可能变成 15。MyISAM 把计数放在表文件里，重启一般接着已经用过的最大值。8.4 手册还写明：异常退出时，如果这次计数的 redo 还没刷到磁盘，不保证已经分配过的值绝不复用。',
    why:'用 5.7 的实验解释 8.0 的账单，会以为删掉末尾再重启一定出现 15。现行实例正常重启拿到的是已经分配过的下一个号。对不上时先看版本，以及这次是不是正常关机，而不是把业务单号改成依赖这个空洞。',
    example:'在 8.4 的 InnoDB 上插入 id 1 到 17，删掉 15 及以后。SHOW TABLE STATUS 里的 Auto_increment 仍是 18。正常重启后再插入一行，id 是 18。把同一张表放回 5.7，重启才可能按当时还在的最大 id 加一，捡回 15。',
    task:'对照 InnoDB AUTO_INCREMENT 文档，写出 8.0 相对 5.7 改了什么；划掉“InnoDB 重启一定从 15 开始”。',
    answer:'8.0 起最大计数值写入 redo，并在检查点进入数据字典。正常重启从这份计数继续，默认不再按现存行的 MAX+1 捡回被删掉的末尾。划掉“InnoDB 重启一定从 15 开始”。5.7 及更早计数在内存里，那种重启才可能回到 15。异常退出且 redo 未刷盘时，手册不保证旧号绝不复用，所以自增仍然不能当连续业务编号。',
    keywords:'InnoDB AUTO_INCREMENT 8.0 redo MyISAM',
    points:['5.7 InnoDB 自增计数在内存，重启按 MAX+1','8.0 起写入 redo，重启默认不捡末尾空洞','自增不是连续业务编号'],
    deep:[
      {title:'正常关机和崩溃不是同一个保证',body:'正常关机再启动，计数来自数据字典里已经保存的最大值。崩溃恢复还会扫检查点之后的 redo，把更大的计数补上。进程在 redo 刷盘前被杀掉时，已经发过的号仍可能再出现一次。ALTER TABLE ... AUTO_INCREMENT = N 只能把计数调得比当前最大值更大，不能靠它把号拨回 15。'},
      {title:'怎样自己验证',body:'只在测试实例上建 InnoDB 表，插入到 id 17，删掉 id>=15。SHOW TABLE STATUS 的 Auto_increment 应为 18。正常重启 mysqld 后再插入，新行 id 应为 18，不是 15。接着执行 ALTER TABLE ... AUTO_INCREMENT=15，下一条插入仍不应变成 15。'}
    ],
    refs:[['InnoDB AUTO_INCREMENT Handling','https://dev.mysql.com/doc/refman/8.4/en/innodb-auto-increment-handling.html'],['MySQL 8.0：InnoDB Persistent Autoinc','https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-0.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-float-ieee-not-8-digits',
    title:'FLOAT 不是八位十进制精度，DOUBLE 也不是十八位',
    prompt:'为什么把 FLOAT 背成“8 位精度、4 字节”，把 DOUBLE 背成“18 位、8 字节”会对不上 IEEE 754？',
    promptAnswer:'FLOAT 大约 4 字节，十进制有效数字大约 7 位，划掉 8 位。DOUBLE 大约 8 字节，大约 15 到 16 位十进制，划掉 18 位。',
    core:'不带括号的 FLOAT 是 IEEE 754 单精度，存储大约 4 字节。尾数一共 24 位，其中 23 位写在字段里，1 位是隐含的，换算成十进制大约 7 位有效数字，不是 8 位。DOUBLE 是双精度，大约 8 字节，尾数 53 位，大约 15 到 16 位十进制，不是 18。口诀里的字节数这半句是对的，位数那半句把字节数当成了十进制精度。0.1 在二进制里是循环小数，放进浮点列再累加，十次常常不是 1。mysql 客户端里直接写 0.1+0.1，这些字面量按定点小数计算，结果可以正好是 1，不能拿来证明 FLOAT 精确。金额用 DECIMAL。FLOAT(M,D) 和 DOUBLE(M,D) 从 8.0.17 起过时，不写括号才是上面这种标准浮点。',
    why:'按 8 位和 18 位去留误差，单精度从大约第 7 位有效数字就开始漂，金额加几次 0.1 就对不上。若只在客户端把小数相加得到 1，会以为列类型没问题，真正写入 FLOAT 列之后才出现差额。',
    example:'表列是 FLOAT，插入十行 0.1，SUM 的结果不是 1。同样十行放进 DECIMAL(10,1)，SUM 是 1.0。同一台客户端上 SELECT 0.1 连加十次却可能显示 1，因为那次加法没有经过 FLOAT 列。',
    task:'对照数值类型文档，写出 FLOAT 与 DOUBLE 的字节数和大约十进制位数；划掉 8 和 18。',
    answer:'FLOAT 大约 4 字节，十进制有效数字大约 7 位，划掉 8 位。DOUBLE 大约 8 字节，大约 15 到 16 位十进制，划掉 18 位。金额用 DECIMAL，不用这两种浮点。FLOAT(M,D) 这种声明从 8.0.17 起已经过时。',
    keywords:'FLOAT DOUBLE IEEE 754 DECIMAL MySQL',
    points:['FLOAT 是单精度大约 7 位十进制','DOUBLE 大约 15–16 位，不是 18','金额不要用浮点'],
    deep:[
      {title:'字节数和有效数字是两套单位',body:'4 字节、8 字节说的是字段大概占多少存储。有效数字来自尾数的二进制位数，单精度 24 位大约对应 7 位十进制，双精度 53 位大约对应 15 到 16 位。把“4 字节”翻译成“8 位十进制”会把误差预算放宽一位，账在那一位上就不一致。'},
      {title:'怎样自己验证',body:'建 FLOAT 列，插入十个 0.1，SUM 应不是 1。再建 DECIMAL(10,1)，同样插入十个 0.1，SUM 应为 1.0。另外在客户端执行不经过列的 0.1 连加，它可以等于 1；这个结果不能用来给 FLOAT 列开脱。'}
    ],
    refs:[['MySQL：Numeric Types','https://dev.mysql.com/doc/refman/8.4/en/numeric-types.html'],['IEEE 754','https://en.wikipedia.org/wiki/IEEE_754']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'dubbo-timeout-retry-idempotent',
    title:'消费方超时不会掐掉提供方线程，默认还会再试',
    prompt:'为什么服务调用超时后，只把超时时间改大，却不处理幂等，脏数据还会来？',
    promptAnswer:'消费方超时不会中断提供方。写接口要幂等或关掉重试，只把超时改大不够。',
    core:'超时配在消费方，默认大约 1 秒。时间到了，消费方放弃等这一次响应，抛出超时。提供方那条业务线程默认还在跑，不会因为客户端已经不等了就被中断，插入仍可能提交。retries 默认是 2，表示第一次失败后再调用 2 次，一次用户请求最多大约 3 次到达提供方。超时和网络抖动都会走进这个重试。下单这种写入如果没有唯一业务键，三次调用就是三笔订单。把超时从 1 秒改成 5 秒，只是让消费方多等一会儿，提供方已经开始的那次仍然停不下来，超时之后默认仍会再试。读接口可以保留重试。写接口要么把 retries 设为 0，要么用唯一约束把第二次插不进去。',
    why:'只把超时改大，库里仍会出现多笔订单。消费方日志已经是超时，提供方日志却还在提交，两边的时间对不上。原因是放弃等待发生在消费方，默认重试会再打两次，而第一次并没有被取消。',
    example:'下单超时 1 秒，提供方睡 3 秒再插入并打日志。消费方先抛超时。此后提供方仍打印插入完成。retries 保持默认时，同一请求最多留下大约 3 行。把 retries 改成 0 再调一次，消费方仍可能超时，但行数应是 1，因为没有第二次调用，第一次却还是会提交。',
    task:'对照 Dubbo 超时与 retries，写出默认会试几次；说明超时会不会中断提供方。',
    answer:'消费方到点放弃等待，不会中断提供方线程，那边默认继续执行并可能提交。retries 默认 2，即失败后再试 2 次，连第一次最多大约 3 次调用。写接口要有唯一业务键，或者把 retries 设为 0。只把超时改大，代替不了这件事。',
    keywords:'Dubbo timeout retries 幂等 Triple',
    points:['超时发生在消费方，提供方线程默认继续','retries 默认 2，最多约 3 次调用','写操作要幂等或关闭重试'],
    deep:[
      {title:'少触发重试，不等于取消已经发出的那次',body:'超时调大之后，慢调用更可能在时限内返回，重试次数会下降。已经在提供方跑起来的那一次，不会因为消费方超时而回滚。retries 设为 0 只能阻止第二次和第三次。第一次若已经插库成功，消费方仍可能只看到超时，调用方需要能根据业务键查到这一笔，而不是再插一笔。'},
      {title:'怎样自己验证',body:'提供方睡 3 秒再插入一行并打印时间。消费方超时设为 1 秒，retries 先保持默认，发起一次调用。消费方应先报超时，提供方的插入日志应晚于这个报错，表里最多大约 3 行。再把 retries 设为 0 重试同一实验，报错还在，新增行数应为 1。'}
    ],
    refs:[['Dubbo：Timeout','https://dubbo.apache.org/en/overview/mannual/java-sdk/tasks/traffic-management/timeout/'],['Dubbo：Retries','https://dubbo.apache.org/en/overview/mannual/java-sdk/reference-manual/config/properties/']]
  },
  {
    track:'java', group:'Java 基础', id:'hashmap-treeify-need-capacity',
    title:'链表变红黑树不只看长度 8，还要桶数组够大',
    prompt:'为什么把 HashMap 冲突背成“链表大于 8 就立刻变红黑树”？',
    promptAnswer:'链表够长还不够，表容量也要达到树化门槛。容量不够时先扩容，不是大于 8 立刻变树。',
    core:'同一个桶上，HashMap 先把节点串成链表。JEP 180 为了缓解哈希碰撞，桶太长时改成红黑树。TREEIFY_THRESHOLD 是 8：这次插入让链表变成 9 个节点时才调用 treeifyBin。真正换成树还要表容量达到 MIN_TREEIFY_CAPACITY，也就是 64；容量还小就先扩容拆链表。节点变少时按 UNTREEIFY_THRESHOLD（6）退回链表。键相同且 equals 也相同，是覆盖原值，不会再挂一个节点。',
    example:'写一组 hashCode 都返回 1、equals 按各自编号区分的键，放进默认的 HashMap。前 8 个在同一个桶上组成链表。第 9 个插入时调用 treeifyBin，table 从 16 扩大，类名仍是 Node。继续插入，直到表容量不小于 64 且这个桶再次满足长度，桶上的类名才变成 TreeNode。',
    task:'对照 HashMap 源码常量，写出树化的两个条件；划掉“大于 8 立刻变树”。',
    answer:'两个条件都要有。常量 TREEIFY_THRESHOLD 是 8，源码在链表变成 9 个节点的那次插入调用 treeifyBin。表容量还要达到 MIN_TREEIFY_CAPACITY 64，才会真正变成红黑树。划掉“大于 8 立刻变树”：容量不够时这个方法里执行的是扩容。equals 相同的键是覆盖，不是再挂一个节点。',
    keywords:'HashMap TREEIFY_THRESHOLD MIN_TREEIFY_CAPACITY 红黑树',
    points:['冲突先拉链，相等 key 覆盖','树化要长度阈值和最小容量 64','普通 HashMap 不是线程安全结构'],
    deep:[
      {title:'6 是退回链表的阈值，不是树化的另一半',body:'UNTREEIFY_THRESHOLD 等于 6。扩容把一棵树拆开、或者删除之后节点太少时，桶可以变回链表。它不参与“这次插入要不要树化”的判断。树化只看这次长度有没有跨过 8 这个常量，以及数组是不是已经不小于 64。'},
      {title:'怎样自己验证',body:'在 HashMap.treeifyBin 上下断点。用 hashCode 固定、equals 互不相等的键连续 put 进 new HashMap<>()。第一次断住时看 table.length，应小于 64，并且方法走 resize。等到 table.length 不小于 64 再次进入，这个桶的节点类名应为 TreeNode。容量还是 16 时不应出现红黑树。'}
    ],
    refs:[['OpenJDK HashMap','https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/HashMap.java'],['JEP 180：HashMap collisions','https://openjdk.org/jeps/180']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_26) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
