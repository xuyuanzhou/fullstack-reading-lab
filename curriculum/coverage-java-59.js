/* 《分布式高并发》D8：可重入锁身份与“可重入=避免死锁”。 */
const COVERAGE_JAVA_59 = [
  {
    track:'java', group:'分布式与高并发', id:'dist-lock-owner-not-mac-pid-tid',
    title:'可重入身份别绑 MAC + 进程号 + 线程号',
    prompt:'为什么资料写分布式可重入锁要记录「MAC 地址 + JVM 进程 ID + 线程 ID」和重入次数？',
    core:'可重入需要知道**还是不是同一个持有者**，并维护重入计数；身份应是**锁服务端存下的随机令牌**（UUID 等），释放与重入都比对令牌，见 `distributed-lock`、`redis-lock-setnx-expire-race`。资料用 MAC + PID + TID 拼身份，在云与容器里会翻车：MAC 可虚拟、可漂移、可撞车；PID/TID 会回收复用；多网卡、无 MAC 的命名空间更对不上。进程崩溃后旧身份若被新人拼出相同串，可能误当成“自己重入”而不真正互斥。数据库方案里写“主机信息 + 线程信息即可再分配锁”，是同一类错误。正确做法：占锁时写入唯一 token（可附 count），同 token 才允许 count+1；租约仍由服务端 TTL/会话管，不要靠墙钟，见 `redis-lock-getset-wall-clock`。',
    why:'两台容器克隆出相同 MAC，或 PID 回收后新进程拼出旧串，第二次“重入”其实是另一个进程进了临界区。',
    example:'实例 A 写入 `owner=aa:bb:cc:dd:ee:ff|1234|42`，count=1。A 崩溃。新进程拿到同一 PID 槽位与相似网卡配置，拼出相同 owner，被当成重入，count 再加，互斥失效。改成 `SET lock:order:9 <uuid> NX EX 30`，value 带 count；只有持有该 uuid 的客户端才能 INCR count 或续租，别人只能等租约过期。',
    task:'划掉“MAC+PID+TID=可靠持有者”。写出应用存什么当 owner，重入时比什么。',
    answer:'划掉「MAC+PID+TID=可靠持有者」。占锁写入随机 token（可附重入计数）；重入与释放都比对同一 token。租约用服务端 TTL/会话。容器与 PID 回收会让硬件/OS 身份撞车。',
    keywords:'分布式锁 可重入 token MAC 租约',
    origin:'《分布式高并发.pdf》约第 202 页：分布式可重入锁记录 MAC+进程+线程',
    diagram:'diagrams/dist-lock-owner-not-mac-pid-tid.svg',
    points:['可重入要比对锁上的持有者令牌','MAC/PID/TID 在容器与回收下会撞车','租约仍由服务端 TTL 或会话管理'],
    deep:[
      {title:'和 Redisson 可重入',body:'客户端库常见做法是 value 里带 UUID 与线程级计数，并用看门狗续租；身份仍是随机 UUID，不是网卡地址。细节以所用库文档为准，不要手写 MAC 拼接。'},
      {title:'怎样自己验证',body:'故意让两进程使用相同伪造 owner 串做“重入”，应能破坏互斥。改成随机 token 后，第二进程在 TTL 内不能当成重入成功。'}
    ],
    refs:[['Redis：分布式锁','https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/'],['Redis：SET','https://redis.io/docs/latest/commands/set/'],['Apache Curator：InterProcessMutex','https://curator.apache.org/docs/recipes-shared-reentrant-lock']]
  },
  {
    track:'java', group:'分布式与高并发', id:'dist-lock-reentrant-not-deadlock-cure',
    title:'可重入只防“自己锁自己”，不是分布式死锁解药',
    prompt:'为什么资料把“这把锁要是一把可重入锁”直接括注成“避免死锁”？',
    core:'**可重入**的含义是：同一持有者再次获取同一把锁时增加计数，而不是阻塞在自己已持有的锁上——这避免的是**同锁自死锁**，见单机 `java-reentrant-lock`。它**不**消除：A 持 lock1 等 lock2、B 持 lock2 等 lock1 的交叉死锁；也不消除忘释放、无过期、网络分区下的双持有。资料需求列表把可重入写成“避免死锁”，会让人以为开了重入计数就不用租约、顺序加锁和超时。分布式锁首先要**互斥 + 可过期/可恢复 + 持有者校验**；是否可重入是额外语义，按调用栈是否会重入同一锁键来决定，见 `distributed-lock`、`dist-lock-owner-not-mac-pid-tid`。',
    why:'业务开了重入计数，两个服务仍按相反顺序抢两把锁，线上卡死；复盘时有人说“不是已经可重入防死锁了吗”。',
    example:'线程 T 持有 `lock:order` 再调会再次抢同一 key 的方法：可重入则 count 从 1 到 2，不会自堵。服务 A 持 `lock:a` 等 `lock:b`，B 持 `lock:b` 等 `lock:a`：双方都可重入也解不开，需要统一加锁顺序、超时放弃或减小锁粒度。',
    task:'划掉“可重入=避免死锁”。各写一句：可重入解决什么；交叉死锁还要靠什么。',
    answer:'划掉「可重入=避免死锁」。可重入只避免同一持有者在同一锁上把自己堵死。交叉死锁靠加锁顺序、超时、更小临界区；忘释放靠租约与持有者校验。',
    keywords:'可重入 死锁 分布式锁 租约',
    origin:'《分布式高并发.pdf》约第 199 页：可重入锁（避免死锁）',
    diagram:'diagrams/dist-lock-reentrant-not-deadlock-cure.svg',
    points:['可重入避免同持有者在同锁上自堵','交叉死锁与忘释放不靠重入计数解决','分布式锁先互斥、租约与持有者校验'],
    deep:[
      {title:'和公平/阻塞',body:'资料并列写阻塞锁、公平锁“按需考虑”是对的。可重入同样是按需：调用不会重入同一 key 时，强行可重入只增加协议复杂度。'},
      {title:'怎样自己验证',body:'同线程两次获取同一 Redis 锁键：无重入协议时第二次应失败或阻塞；有 token+count 时应成功。两进程反向双锁并省略超时，应仍能卡住。'}
    ],
    refs:[['Oracle：ReentrantLock','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html'],['Redis：分布式锁','https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/'],['Apache Curator：InterProcessMutex','https://curator.apache.org/docs/recipes-shared-reentrant-lock']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_59) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
