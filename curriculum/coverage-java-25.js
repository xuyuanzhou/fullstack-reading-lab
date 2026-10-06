/* Batch 25: ten sources — Redis PSYNC, ActiveMQ queue, UUID PK, TCP framing. */
const COVERAGE_JAVA_25 = [
  {
    track:'java', group:'缓存', id:'redis-repl-psync-not-sql',
    title:'主从不是把内存快照加 MySQL binlog 重放一遍',
    prompt:'为什么把 Redis 复制背成“先发内存快照，再把语句当二进制日志发给从库重放”会对不上现行复制？',
    core:'全量同步是 RDB（或磁盘less）传到副本再载入，之后用复制积压缓冲区做增量，命令是 Redis 自己的传播，不是 MySQL binlog。PSYNC 能部分重同步，断线不一定从头快照。Cluster 是 16384 槽，只有主拥有槽，这点资料对。Twemproxy/Codis 是旧代理方案，不是现行默认。SETNX+getset 按时间戳抢锁有窗口，见 `redis-lock-setnx-expire-race`。虚拟内存那套早已不用，见 `redis-legacy-vm-limits`。',
    why:'把复制背成先发内存快照、再把语句当 MySQL binlog 重放，排延迟时会去从库找二进制日志，那里什么都没有。区分信号是增量是 Redis 自己的命令流，断线短时走 PSYNC，不必每次全量。',
    example:'主上执行 SET。副本收到的是同一条 Redis 命令，不是 INSERT。断线时间短、积压缓冲还在时走 PSYNC 部分重同步；积压不够才再传一份 RDB。不要去从库找 binlog。全量才走 RDB。',
    task:'对照复制文档，划掉 MySQL 二进制日志；写出 PSYNC 解决什么。',
    answer:'对照复制文档，划掉 MySQL 二进制日志：全量是 RDB 或磁盘less 传到副本再载入，增量是复制积压缓冲区里的 Redis 命令，不是 SQL。PSYNC 解决的是断线后的部分重同步，积压还在就不必从头再做一次全量快照。Cluster 的槽另算。',
    keywords:'Redis PSYNC 复制 backlog Cluster 16384',
    points:['增量复制是 Redis 命令流和积压缓冲，不是 binlog','PSYNC 支持部分重同步','Cluster 用 16384 槽，Codis 不是默认'],
    deep:[
      {title:'命令流不是 binlog',body:'从库重放的是 Redis 传播过来的命令，积压缓冲区用来补断线期间的增量。全量才是 RDB。把这套说成 MySQL 的二进制日志，排障会去找不存在的日志文件。Cluster 的 16384 槽仍只由主拥有，和这条复制链路不是同一件事。'},
      {title:'怎样自己验证',body:'打开复制文档，把“二进制日志重放”划掉。再写下一句：PSYNC 在积压缓冲还覆盖得住时做部分重同步，覆盖不住才重新全量。从库上应能看到 Redis 命令，而不是 INSERT。'},
    ],
    refs:[['Redis replication','https://redis.io/docs/latest/operate/oss_and_stack/management/replication/'],['Redis Cluster spec','https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/']]
  },
  {
    track:'java', group:'消息队列', id:'activemq-queue-competing-consumers',
    title:'点对点队列可以有多个消费者争抢，不是两人专线',
    prompt:'为什么把 ActiveMQ 的 P2P 说成“一个 Queue 只有一个发送者和一个接收者”会错？',
    core:'JMS Queue 是点对点语义：每条消息只给一个消费者。多个消费者可以同时听同一队列，消息被争抢，不是“链路上只有两个人”。Topic 才是发布订阅，一条给所有订阅者；持久订阅才在订阅者离线时把消息留下来。非持久 Topic 漏消息是设计如此。Queue 默认会把未消费消息留在 broker，不等于“绝对不丢”，还要看持久化和 ack。重复投递靠业务幂等，见 `mq-consume-idempotent-key`。',
    why:'把 Queue 说成一个发送者对一个接收者，扩容时会以为再加消费者进程没有用，订单仍堆在那一条专线上。区分信号是点对点只保证每条消息给到一个消费者，听的人可以有很多个，争抢的是每一条消息。',
    example:'订单队列上挂三个 worker，它们竞争消费，同一条订单只会进其中一个。要每个服务都收到，改用 Topic。订阅者离线还要留消息，才用持久订阅，普通 Topic 离线就是漏掉。未消费的还要看持久化和确认。',
    task:'对照 JMS Queue/Topic，写出多消费者时消息怎么分；划掉“一个发送者一个接收者”。',
    answer:'对照 JMS，划掉“一个 Queue 只有一个发送者和一个接收者”。多个消费者同时听同一队列时，消息被争抢，每条只交给其中一个。Topic 才是一条发给当前订阅者。持久订阅才会在订阅者离线时把消息留下来，非持久 Topic 漏消息是设计如此。',
    keywords:'JMS Queue Topic 竞争消费者 持久订阅',
    points:['Queue 多消费者是竞争消费不是单接收者专线','Topic 默认非持久会漏离线消息','去重靠业务幂等，不只靠 broker'],
    deep:[
      {title:'争抢不是专线',body:'点对点的“一个消费者”指的是每条消息的归属，不是整条队列只能接一个进程。三个 worker 一起听，broker 把每条分给其中一个。要所有人都收到，用 Topic。离线还要留着，才是持久订阅；非持久 Topic 在订阅者不在时把消息漏掉，是这种模型本来的行为。'},
      {title:'怎样自己验证',body:'对照 Queue 和 Topic：在一个队列上挂两个消费者，同一条消息应只进入其中一个。再把同一条发到非持久 Topic，离线的订阅者收不到；改成持久订阅后，离线期间的消息应能补上。'},
    ],
    refs:[['ActiveMQ：How do I use durable subscribers','https://activemq.apache.org/components/classic/documentation/how-do-i-use-durable-subscribers'],['JMS Queue','https://jakarta.ee/specifications/messaging/3.1/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'mysql-uuid-not-clustered-pk',
    title:'随机 UUID 不宜当 InnoDB 主键，Snowflake 也要防时钟回拨',
    prompt:'为什么分库后用 UUID 当主键，或把 Snowflake 的 41 位毫秒当成“永远够用、不用管时钟”？',
    core:'InnoDB 主键是聚簇索引，单调递增更好走顺序追加。UUID 无序、占 36 字符，页分裂和二次查找都贵。分库可以用号段、设置自增步长，或 Snowflake 一类：1 符号位、41 毫秒、10 机器、12 序列，约 69 年。时钟回拨会把同一毫秒序列打乱甚至重复，要拒绝或等时钟。单库自增号段在高并发生成器上仍是单点。现成方案见 `distributed-unique-id`。',
    why:'分库后把随机 UUID 当 InnoDB 主键，写入变成随机 IO，页分裂变多，扩容之后更慢。把 Snowflake 的 41 位毫秒当成永远不用管时钟，回拨时还会发出重复号。区分信号是聚簇索引适合大致单调的键。',
    example:'订单主键用号段或 Snowflake，让插入大致追加到索引末尾。文件名可以用 UUID。时钟回拨时拒绝发号或等到时钟追上，不要继续用回拨前的毫秒往下编。随机 UUID 会插进叶子中间，页因此要分裂，不是顺序追加。',
    task:'对照 InnoDB 聚簇索引，写出 UUID 主键的写放大；列出 Snowflake 时钟回拨时的一种处理。',
    answer:'对照聚簇索引，UUID 主键的写放大是：值无序，插入打进叶子中间，引起页分裂，键又宽到 36 个字符，二级索引还要再带上这份主键。一种回拨处理是拒绝发号，或等到时钟追上再继续，避免同一毫秒里的序列重复。单库自增的号段生成器本身仍是单点，扩容去不掉它。',
    keywords:'InnoDB 主键 UUID Snowflake 号段 时钟回拨',
    points:['聚簇主键适合单调递增','UUID 无序且宽，不适合当 InnoDB 主键','Snowflake 41 位毫秒约 69 年，要处理回拨'],
    deep:[
      {title:'聚簇索引跟着主键走',body:'InnoDB 把行存在主键那棵 B+ 树上，新主键如果大致递增，就追加在末尾。随机 UUID 每次插到叶子中间，页要分裂，键本身又占 36 个字符，二级索引叶子还要存这份主键，读写都变贵。文件名可以用 UUID，订单主键更适合号段或 Snowflake。'},
      {title:'怎样自己验证',body:'对照聚簇索引说明，写出 UUID 主键为什么造成页分裂。再看 Snowflake 的 41 位毫秒：时钟回拨时选择拒绝发号，或等到时钟追上，不要在回拨的毫秒上继续编序列。'},
    ],
    refs:[['MySQL：Clustered and Secondary Indexes','https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html'],['Twitter Snowflake','https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake']]
  },
  {
    track:'frontend', group:'网络与安全', id:'tcp-stream-needs-framing',
    title:'TCP 是字节流，粘包要在应用层分帧',
    prompt:'为什么把粘包只当成“两次 send 一次 recv 读完”，用分隔符或定长就能在所有二进制协议里收工？',
    core:'TCP 提供可靠字节流，不保留应用消息边界。发送两次小缓冲可能并成一段，一次大写也可能拆成多段。这叫没有消息边界，不叫 TCP 把包粘错。应用层要用长度前缀、分隔符或固定帧。UDP 是数据报，一次 recv 对应一次报文，但会丢、会乱序、过大交给 IP 分片。三次握手、滑动窗口、拥塞控制是可靠性的一部分，不能单独等于“所以永不丢”。交换机不只在数据链路层，三层交换机做转发。',
    why:'把粘包只当成两次 send 被一次 recv 读完，于是只在文本里加换行，二进制 RPC 没有分隔符时会把两条消息切错，或者把半条当成一整条。区分信号是 TCP 不保留应用消息边界，帧要应用层自己划。',
    example:'发送端先写 4 字节大端长度，再写 body。对端没攒够这个长度就继续读，不要把一次 read 的返回值当成一条业务消息。HTTP/1.1 用 Content-Length 或 chunked 做的是同一件事。',
    task:'写出一种长度前缀帧；说明 UDP 为什么通常没有“粘包”这个问题。',
    answer:'一种长度前缀帧是：先写固定字节的长度，再写这么长的 body，接收端按这个长度把字节流切回一条完整的消息。UDP 通常没有粘包，因为一次 recv 对应一个数据报，报文边界还在。它仍会丢、会乱序，过大时交给 IP 分片，所以没有粘包不等于可靠。',
    keywords:'TCP 粘包 拆包 分帧 UDP 滑动窗口',
    points:['TCP 是字节流，没有应用消息边界','用长度前缀或分隔符分帧','UDP 按报文，会丢会乱序'],
    deep:[
      {title:'流里没有消息边',body:'两次小的 send 可能被收成一段，一次大的 write 也可能拆开。这是字节流没有应用边界，不是 TCP 把包粘错。文本可以用换行当分隔符，二进制更稳的是长度前缀。三次握手和滑动窗口负责把字节可靠地送到，不负责告诉你一条业务消息从哪到哪。'},
      {title:'怎样自己验证',body:'写一帧：4 字节长度加 body，接收端必须攒够长度再解析，一次 read 不够就继续读。再对比 UDP：一次 recv 就是一个数据报，所以通常没有粘包；同时记下它会丢、会乱序。'},
    ],
    refs:[['RFC 9293 TCP','https://www.rfc-editor.org/rfc/rfc9293'],['MDN：TCP','https://developer.mozilla.org/en-US/docs/Glossary/TCP']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_25) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
