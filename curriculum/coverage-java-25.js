/* Batch 25: Redis replication, JMS competing consumers, UUID primary keys, TCP framing. */
const COVERAGE_JAVA_25 = [
  {
    track:'java', group:'缓存', id:'redis-repl-psync-not-sql',
    title:'主从复制传的是 RDB 和命令流，不是 MySQL 的 binlog',
    prompt:'为什么把 Redis 复制背成“先发内存快照，再把语句当二进制日志发给从库重放”会对不上现行复制？',
    core:'持久化课里的 RDB，是某一时刻的整库快照。主从复制的第一段就用它：主库把当前数据打成 RDB 交给副本，副本先清空自己再载入。主库可以先写成磁盘上的 rdb 文件再发，也可以不写这个文件，直接把 RDB 的字节流给副本。快照只覆盖那一瞬间。之后的写入，主库按 Redis 自己的命令继续传，副本执行的是 SET 这种命令，不是 SQL，副本磁盘上也没有 binlog 文件。主库给这条命令流一个递增的位置，叫偏移。副本记下自己已经执行到的偏移。主库另外留下最近的一段命令，叫复制积压，默认大约 1MB，写满就盖住最老的字节。副本断线重连时报上复制 ID 和自己的偏移。这段还在积压里，主库只补后面的命令，这就是部分重同步，协议名叫 PSYNC。偏移已经被盖掉，或者复制 ID 对不上，就再传一次完整的 RDB。客户端收到写入成功时，副本不一定已经执行完，复制默认是异步的。集群的 16384 个槽决定键落在哪台主库，不决定这条命令流怎么续。',
    why:'按 MySQL 的习惯去副本上找 binlog，文件不存在，落后也无法用 seconds_behind 来对。主库 INFO replication 里的 master_repl_offset，和副本的 slave_repl_offset 拉开，就是副本还没执行到。重连之后看 INFO stats：sync_partial_ok 加一，是只补了命令；sync_full 加一，是积压里已经没有那个偏移，整份 RDB 又传了一遍。',
    example:'主库 SET user:1 ok，副本 GET 得到 ok，它执行的就是这条 Redis 命令。停掉副本两秒，主库再写两三条，积压还盖不住，拉起来后 sync_partial_ok 增加，副本不用重新载入 RDB。把副本停住，写入超过默认大约 1MB 的积压再连上，sync_full 增加，这次是全量。',
    task:'对照复制文档，划掉 MySQL 二进制日志；写出 PSYNC 解决什么。',
    answer:'划掉“把语句当 binlog 发给从库”。全量传的是 RDB 快照，增量传的是快照之后的 Redis 写命令。PSYNC 解决断线后要不要重做全量：复制 ID 一致，且副本报上的偏移还在积压里，就只补命令；否则重新传 RDB。它不让主库等副本执行完再应答客户端。',
    keywords:'Redis PSYNC 复制 backlog RDB 部分重同步',
    points:['全量传 RDB，增量传 Redis 写命令，不是 binlog','部分重同步取决于复制 ID 和偏移是否还在积压里','主从复制默认异步，和集群分槽不是同一条链路'],
    deep:[
      {title:'生产上看偏移，不要看断了几秒',body:'积压是固定长度的最近命令，不是无限日志。旧偏移被盖住就只能全量，条件和断线秒数无关。平时看两边偏移的差：差在变大，副本在落后，读请求打到它会读到旧值。某次写入必须到达至少 N 个副本再继续时，用 WAIT。它阻塞到副本确认或超时，返回的是实际确认的副本数；超时也不会撤回主库上已经成功的那次写入。'},
      {title:'怎样自己验证',body:'本机起两个实例，6379 做主库，6380 执行 REPLICAOF 127.0.0.1 6379。在 6379 上 SET k v，到 6380 GET，应得到 v。两边看 INFO replication，主库 master_repl_offset 和副本 slave_repl_offset 应接近。记下主库 INFO stats 里的 sync_partial_ok 和 sync_full。短暂停掉 6380 再写几条后拉起，sync_partial_ok 应加一。再停掉副本，写入超过积压（默认大约 1MB，测试主库也可以把 repl-backlog-size 调小）后拉起，sync_full 应加一。副本目录里不应有 MySQL 的 binlog 文件。'}
    ],
    refs:[['Redis replication','https://redis.io/docs/latest/operate/oss_and_stack/management/replication/'],['Redis Cluster spec','https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/']]
  },
  {
    track:'java', group:'消息队列', id:'activemq-queue-competing-consumers',
    title:'点对点队列可以有多个消费者争抢，不是两人专线',
    prompt:'为什么把 ActiveMQ 的 P2P 说成“一个 Queue 只有一个发送者和一个接收者”会错？',
    core:'前面的 JMS 课说，队列上一条消息由一个消费者拿走。拿走它的可以是同时听着这个队列的好几个进程中的一个，不是这个队列一辈子只能接一个进程。发送者同样可以有很多个。broker 把每条消息分给其中一个消费者，这叫竞争消费。加消费者是为了并行干活。预取课已经见过另一面：没确认的那一批还记在先连上的消费者名下，新进程不会立刻把那批抢走。每个人都要收到同一条时，用 Topic，一条消息发给各个订阅者。普通订阅者下线期间，Topic 不替它留消息。要留下，用持久订阅：连接上的 clientId 和订阅名两次都用同一个，broker 按这个身份补发。这仍是广播，不是把队列变成两人专线。broker 重启后消息还在不在，取决于发送时有没有按持久化方式保存。消费者拿到消息后崩溃、又没确认，broker 会再投一次，所以“只进一个进程”不等于“业务只执行一次”。多个竞争消费者之间没有全局顺序：第一条给了 A、第二条给了 B 时，B 可以先处理完。',
    why:'把“一条消息只给一个消费者”记成“队列只能挂一个进程”，积压时就不敢扩容，活全堆在一个进程上。加上消费者之后如果还假设先发送的先处理完，同一订单的两条消息会在两个进程里交错执行。',
    example:'订单队列挂三个 worker，发送 1001 和 1002。1001 只出现在其中一个进程的日志里，1002 可能在另一个进程里先打印完成。三个进程都要收到每一条时，改成 Topic，而不是再往这个队列上挂消费者。',
    task:'对照 JMS Queue/Topic，写出多消费者时消息怎么分；划掉“一个发送者一个接收者”。',
    answer:'划掉“一个发送者对一个接收者”。一个队列可以有多个发送者和多个消费者，每条消息只被其中一个消费者取走。Topic 把一条消息交给各个订阅者；非持久订阅不保留离线消息，持久订阅用固定的 clientId 和订阅名补发。竞争消费不保证两个进程之间谁先处理完。',
    keywords:'JMS Queue Topic 竞争消费者 持久订阅',
    points:['Queue 的多消费者是竞争，每条消息只交付一次','Topic 才广播，离线保留要靠持久订阅','竞争消费不保证跨进程的处理顺序'],
    deep:[
      {title:'先决定要吞吐还是要顺序',body:'要并行，就增加这个队列的消费者，并接受不同进程交错完成；业务用订单号跳过被再投的第二次。同一笔订单的创建和支付必须按顺序时，不要把这两条分给多个进程，让相关消息由同一个消费者处理。确认之前崩溃会再投，所以交付给一个进程，仍然要把处理写成可以重复执行。'},
      {title:'怎样自己验证',body:'用同一个队列名启动两个消费者，发送编号 1 到 10。每个编号只应出现在一个进程里，两边打印的顺序会交错。再向一个非持久 Topic 发送时关掉其中一个订阅者，它应错过这几条。改成持久订阅，两次连接使用同一个 clientId 和同一个订阅名，重新连上后应补到离线期间的消息。'}
    ],
    refs:[['ActiveMQ：How do I use durable subscribers','https://activemq.apache.org/components/classic/documentation/how-do-i-use-durable-subscribers'],['Jakarta Messaging','https://jakarta.ee/specifications/messaging/3.1/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'mysql-uuid-not-clustered-pk',
    title:'随机 UUID 不宜当 InnoDB 主键，Snowflake 也要防时钟回拨',
    prompt:'为什么分库后用 UUID 当主键，或把 Snowflake 的 41 位毫秒当成“永远够用、不用管时钟”？',
    core:'分库课已经说明：每台库里的自增只在本库唯一，随机 UUID 能避免撞号，但写入更碎。碎在哪，要看 InnoDB 把整行放在哪里。行在主键那棵树的叶子上，叶子按主键从小到大排。自增主键的新行加在最右边。随机 UUID 每次落在叶子中间，页满了就拆成两页，连续插入的两行也不在同一页。分库只是每台机器各有一棵这样的树，随机键的页分裂仍留在每一台上。UUID 有两种存法。16 字节的二进制只是键更短，插入位置仍然随机，页还是会拆。36 个字符的字符串更宽，二级索引的叶子要带上这份主键才能回表，索引变得又大又碎。分库真正要的是全局不重复，同时又尽量往一个方向插。号段、按步长错开的自增、Snowflake 都是在做这件事。Snowflake 的 64 位是 1 位符号、41 位毫秒、10 位机器、12 位同一毫秒里的序号。41 位毫秒从你选定的起点大约能数 69 年，不是无限。时钟往回跳时，若仍用回拨后的毫秒继续发号，可能和已经发出的号重复。处理是拒绝发号，或等到时钟走到已经用过的毫秒之后再发。号段服务挂了会停发，那是发号服务的单点，不是页分裂。',
    why:'只解决撞号、不看插入方向，每台分片的新行仍然打在索引中间，页分裂和文件变碎留在每一台。不管时钟的 Snowflake，在时间被拨回时会发出已经用过的号，两笔订单共用一个 id。',
    example:'订单表用随机 UUID 做主键，连续插入碰到的页号来回跳。改成号段或 Snowflake 后，短时间内的新行集中在树的右端。测试机把时钟拨回 1 秒再要下一个号，发号应停住或等待，而不是返回一个和拨回前重复的 id。',
    task:'对照 InnoDB 聚簇索引，写出 UUID 主键的写放大；列出 Snowflake 时钟回拨时的一种处理。',
    answer:'写放大有两处，要分开。随机键插在聚簇索引的叶子中间，页要分裂，这和键是 16 字节还是 36 个字符无关。键若是 36 个字符，二级索引叶子还要存放这份主键，索引跟着变宽；改成 16 字节只减轻这一处。时钟回拨时的一种处理是停止发号，直到时钟回到已经用过的那个毫秒之后，避免同一毫秒内的序号再走一遍。',
    keywords:'InnoDB 主键 UUID Snowflake 号段 时钟回拨',
    points:['聚簇索引按主键顺序存行，随机键造成页分裂','把 UUID 改成二进制只减小宽度，不改变随机插入','Snowflake 的 41 位毫秒约 69 年，回拨时要拒绝或等待'],
    deep:[
      {title:'主键要同时看顺序和字节数',body:'二级索引的叶子保存主键，查询未覆盖的列时靠它回表。主键又宽，二级索引就大；主键又随机，回表碰到的页也不相邻。所以“全局不重复”只满足了分库，还要让单个库上的插入大体朝一个方向，并且主键尽量短。'},
      {title:'怎样自己验证',body:'在测试库建三张 InnoDB 表，主键分别是 BIGINT 自增、BINARY(16)、CHAR(36)。后两张用随机 UUID 填充，BINARY(16) 可以用 UUID_TO_BIN(UUID())。各插入同样的几万行，看 information_schema.tables 的 data_length：两张随机主键通常比自增更大。再给另一列建同样的二级索引，比 index_length：CHAR(36) 最大，因为它的叶子里带着 36 个字符。若打开 innodb_metrics 的 index_page_splits，随机主键插入时这个 count 涨得更快。Snowflake 只在虚拟机里把时钟拨回一小段，下一次取号应失败或等待。'}
    ],
    refs:[['MySQL：Clustered and Secondary Indexes','https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html'],['Twitter Snowflake','https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake']]
  },
  {
    track:'frontend', group:'网络与安全', id:'tcp-stream-needs-framing',
    title:'TCP 是字节流，粘包要在应用层分帧',
    prompt:'为什么把粘包只当成“两次 send 一次 recv 读完”，用分隔符或定长就能在所有二进制协议里收工？',
    core:'上一课把 TCP 放在传输层：先三次握手，才有后面的 HTTP。握手成功之后，应用每次 read 到的并不是你某一次 send。TCP 保证字节按顺序、不重复地交到对方，不保留发送边界。两次小的 send 可能被一次 read 一起读出，一次大的 write 也可能要多次 read 才读完。少读了是半包，多读了是把下一条的开头也拿进来了，处理是同一件事：字节放进自己的缓冲区，按规则切出完整的一条，剩下的留到下一次 read。帧由应用划定。长度前缀是双方先约定用几个字节表示后面正文有多长，以及高位在前还是低位在前。高位在前常叫大端，数字 5 若用 4 字节，就是 00 00 00 05。接收端凑够这个长度再交给业务；长度超过约定上限就断开，避免按一个恶意数字去分配内存。分隔符只适合能保证那个字节不会出现在正文里的文本。二进制正文里如果出现同一个字节，一条会被切成两条，除非先把正文转义。定长只适合每条消息都是这个长度，短的要填充，长的这条规则本身不成立。UDP 一次接收对应一个数据报，所以通常不会把两次发送并成一条业务消息。接收缓冲区比数据报小，多出来的部分会被截掉。UDP 仍会丢、会乱序。',
    why:'二进制协议里只加一个换行，或假定每条都一样长，正文一旦含有那个字节，或者下一条更长，半条和下一条会拼成一个对象。调用方看到解析错误或串单，连接本身往往还在，这不是 TCP 重传。',
    example:'发送端连续写两条消息，每条都是 4 字节大端长度加正文。对端第一次 read 只得到长度和半个正文，必须继续读，凑够长度再解析。若改用字节 0 当分隔符，而正文里本身有一个 0，这一条会被切成两条。',
    task:'写出一种长度前缀帧；说明 UDP 为什么通常没有“粘包”这个问题。',
    answer:'长度前缀帧：双方约定长度占几个字节、高位在前还是低位在前，先写长度，再写恰好那么长的正文。接收端没凑够就继续读，凑够才是一条消息，并拒绝超过上限的长度。UDP 通常没有这种粘包，是因为一次接收对应一个数据报，发送边界还在。它仍会丢失和乱序；接收缓冲区小于数据报时，多出来的部分被截断。',
    keywords:'TCP 字节流 分帧 长度前缀 UDP 数据报',
    points:['TCP 不保留 send 的边界，应用要自己分帧','分隔符会被正文里的同样字节切断，定长只适用于固定大小','UDP 保留数据报边界，但不保证送达和顺序'],
    deep:[
      {title:'半包和并包用同一块缓冲区',body:'不能把一次 read 的返回值当成一条消息。少到的字节先留下，下次 read 拼上去；多到的字节切出第一条后，余下的留在缓冲区里当第二条的开头。长度、分隔符或定长，都是这块缓冲区的切分规则，不是 TCP 的一个开关。'},
      {title:'怎样自己验证',body:'本机用一段短脚本或 nc：客户端连上 TCP 后连续写出两条短消息，服务端每次只读 3 个字节并打印。会看到某一次读出的内容跨过两条消息的边界，或者只够一条的一半。按长度前缀把缓冲区重组后，应回到原来的两条。再发一个 UDP 数据报，一次接收应得到这一个数据报；把接收缓冲区改得比数据报更小，看到的是被截断的这一段，不是和别的报文粘在一起。'}
    ],
    refs:[['RFC 9293 TCP','https://www.rfc-editor.org/rfc/rfc9293'],['MDN：TCP','https://developer.mozilla.org/en-US/docs/Glossary/TCP']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_25) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
