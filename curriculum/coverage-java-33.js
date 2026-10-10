/* Batch 33: Full GC is not PermGen, TCP is not loss-proof, container root mapping. */
const COVERAGE_JAVA_33 = [
  {
    track:'java', group:'JVM', id:'jvm-full-gc-not-permgen',
    title:'Full GC 清的是堆，不是“永久代还在 HotSpot 里”',
    prompt:'为什么把 Full GC 背成“清年轻代、老年代和永久代”？',
    promptAnswer:'Full GC 收的是整个 Java 堆。没有永久代可清；元数据溢出是 Metaspace 上的另一类错误。',
    core:'JDK 8 起 HotSpot 去掉了永久代。类的元数据放在 Metaspace，这块内存在堆外，用 MetaspaceSize 和 MaxMetaspaceSize 约束，不再有 PermSize。Full GC 收的是 Java 堆：年轻代和老年代一起收。G1 还有年轻代回收，以及只带上一部分老年代分区的 Mixed GC。Mixed 不是 Full GC。日志里出现 Full 时，不要再找一块叫 PermGen 的区域。Metaspace 用满会触发类卸载，或者抛出 OutOfMemoryError: Metaspace。那是元空间不够，不是堆上还有一个永久代没被 Full GC 扫到。',
    why:'按永久代去读 JDK 8 及以后的 GC 日志，会去找 -XX:PermSize。这个参数已经被忽略。类加载器泄漏时堆不一定先满，先涨的是 Metaspace，用堆的 Full GC 次数对不上元空间溢出。',
    example:'在 JDK 8 上写 -XX:PermSize=32m，虚拟机会提示这个选项的支持已在 8.0 去掉。PrintFlagsFinal 里能看到 MetaspaceSize，看不到还能用的 PermSize。G1 日志里的 Mixed 只回收一部分老年代分区；Full 才是整堆回收。类加载器泄漏的报错是 Metaspace，不是 PermGen。',
    task:'划掉“Full GC 必清永久代”；写出 JDK 8 之后元数据在哪。',
    answer:'划掉“Full GC 必清永久代”。JDK 8 起没有永久代，类元数据在堆外的 Metaspace。Full GC 收的是整个 Java 堆，也就是年轻代和老年代。G1 的 Mixed GC 只附加一部分老年代分区，不要把它写成 Full GC。Metaspace 溢出是另一块内存上的 OutOfMemoryError。',
    keywords:'Full GC PermGen Metaspace HotSpot G1',
    diagram:'diagrams/jvm-full-gc.svg',
    points:['JDK 8+ 没有永久代','Full GC 主要清堆，不是一块叫 PermGen 的区','Metaspace OOM 和堆 OOM 不是同一块内存'],
    deep:[
      {title:'整堆回收和元空间回收不是同一个词',body:'Full GC 把堆收干净，年轻代和老年代都在这次里。G1 平时更多是年轻代回收，跟不上时用 Mixed 带上部分老分区，仍不必把整堆压实。类能不能卸载，看类加载器是否还活着，空间记在 Metaspace。堆已经 Full 过，元空间仍可能继续涨。'},
      {title:'怎样自己验证',body:'java -XX:+PrintFlagsFinal -version，应能看到 MetaspaceSize。再执行 java -XX:PermSize=32m -version，JDK 8 及以后应提示该选项已移除或被忽略。看一次 G1 日志，把 Young、Mixed、Full 分成三行，不要把 Mixed 记成清永久代。'}
    ],
    refs:[['JEP 122：Remove Permanent Generation','https://openjdk.org/jeps/122'],['HotSpot GC Tuning','https://docs.oracle.com/en/java/javase/21/gctuning/']]
  },
  {
    track:'frontend', group:'网络与安全', id:'tcp-reliable-not-never-lose',
    title:'TCP 尽力可靠，不是应用层永不丢包',
    prompt:'为什么把 TCP 背成“数据不会丢失、没有重复、并且一定按序到达”？',
    promptAnswer:'连接存活时，TCP 用校验和、序号、确认和重传，把字节流按顺序交给应用。连接会复位或超时，应用会看到错误，在途的数据可能到不了业务。',
    core:'连接还活着的时候，TCP 用校验和发现损坏，用序号把字节排好，用确认和重传补上没被确认的段。交给接收方应用的是这一条连接上的有序字节流，不会因为网络丢了一个段就在流里留一个洞。这不是“线路上从不丢包”。段会丢，TCP 再传。也不是“应用最终一定拿到”。对端复位、本端超时、链路断开，read 或 write 会失败，已经交给本地协议栈、还没被对端应用读走的字节，应用层可以再也看不到。按序只保证这一条连接里的字节顺序，不保证两个 HTTP 请求谁的业务先做完。应用自己超时重试时，服务端可能已经处理过第一次，所以仍要幂等。UDP 没有这套重传，数据报可以丢、可以乱序。',
    why:'按“TCP 永不丢、永不重”去掉超时和幂等，断线之后客户端重试，服务端把同一次支付做了两遍。套接字已经报错，业务却没有订单号可以认出第二次。',
    example:'连接建立后发送一次下单。中途拔掉对端或丢掉后续的包，发送方在超时后看到错误。若服务端已经提交了这一单，客户端不看订单号再发一次，就会多出一单。连接一直保持时，先写的字节不会排到后写的字节后面交给 read。',
    task:'划掉“TCP 一定不丢不重”；写出连接失败时应用还要做什么。',
    answer:'划掉“TCP 一定不丢不重，并且一定按序到达”。连接存活时，TCP 用校验和、序号、确认和重传，把字节流按顺序交给应用。连接会复位或超时，应用会看到错误，在途的数据可能到不了业务。应用仍要设超时，失败后的重试要能认出已经处理过的同一次请求。UDP 没有这套重传。',
    keywords:'TCP retransmission ACK UDP reliability',
    points:['可靠是校验、序号、ACK、重传，不是物理永不丢','连接失败时应用仍看到错误','UDP 无这套重传，丢了就是丢了'],
    deep:[
      {title:'重传补的是段，不是业务只执行一次',body:'没收到确认，TCP 会把同一个段再发出去。这可能让对端协议栈只交付一次，也可能让已经超时的应用再发一整个请求。前者是连接内的去重，后者是应用上看见的第二次调用。订单号要挡的是第二种。'},
      {title:'怎样自己验证',body:'给套接字一个较短的读超时。对端在收到请求后不回应并断开，本端应在超时或复位上报错，而不是永远阻塞在“TCP 保证送到”。服务端若在断开前已经写入订单，客户端用同一个订单号重试时，服务端应认出这一笔，而不是再插入一行。'}
    ],
    refs:[['RFC 9293 TCP','https://www.rfc-editor.org/rfc/rfc9293.html'],['RFC 768 UDP','https://www.rfc-editor.org/rfc/rfc768.html']]
  },
  {
    track:'java', group:'工程实践', id:'docker-root-not-host-root',
    title:'容器里的 root 不等于一定能当宿主机 root',
    prompt:'为什么把 Docker 安全背成“容器 root 就是宿主机 root，一提升权限就能无限制操作机器”？',
    promptAnswer:'容器 root 不等于无限制的宿主机 root。还有 capabilities、用户命名空间与 rootless。',
    core:'容器里 whoami 是 root，只说明这个进程在自己的用户命名空间里 uid 是 0。没有做用户命名空间重映射时，这个 0 就是宿主机上的 uid 0，身份确实大。即便如此，默认仍会丢掉一批 Linux capabilities，并套上 seccomp。容器有自己的挂载命名空间，里面的 /etc/shadow 是镜像里的文件，不是宿主机那一份，除非你把宿主机路径挂进去。--privileged 会把能力加回来，并放宽隔离，那才是“提升权限”之后危险的那种跑法。打开 userns-remap 后，容器里的 uid 0 映射到 /etc/subuid 里的一段普通号，例如从 231072 起，在宿主机上没有 root 特权。rootless 更进一步：守护进程本身就不是宿主机 root。两种映射都不是 2016 年“容器 root 等于宿主机 root”那一句能概括的。',
    why:'看见容器里是 root，就要么禁止一切容器，要么给容器加 --privileged。前者把用户命名空间能挡住的情况也禁了，后者把默认丢掉的能力又放了回来。只在容器里改 /etc/shadow，宿主机的影子文件通常根本没动。',
    example:'默认引擎上 docker run ubuntu id -u 得到 0。在宿主机上看这个容器进程，属主也是 root。容器里 cat /etc/shadow 读到的是镜像里的文件。同一台机器改成 userns-remap 或 rootless 之后，容器里 id -u 仍是 0，宿主机上该进程的 uid 是 subuid 里的高位号，而不是 0。',
    task:'写出 user namespace / rootless 时 uid 0 映射到哪；划掉“容器 root 必等于宿主机 root”。',
    answer:'划掉“容器 root 必等于宿主机 root”。没开用户命名空间时，容器 uid 0 就是宿主机 uid 0，但默认 capabilities 被丢掉，挂载命名空间也还在。userns-remap 把容器里的 0 映射到 subuid 里的普通用户。rootless 连守护进程都不是宿主机 root。--privileged 才是把收掉的能力加回去。',
    keywords:'Docker user namespace rootless capabilities',
    points:['默认可能把容器 uid 0 映射成宿主机 0','user namespace / rootless 会改映射','还靠 dropped capabilities 和 seccomp'],
    deep:[
      {title:'uid、能力、挂载是三道门',body:'uid 0 回答这个进程在宿主机上是不是 root。capabilities 回答它能不能做挂载、加载模块这类特权操作，默认没给全。挂载命名空间回答它写的路径是不是宿主机的文件。三道都打开，才接近在宿主机上以 root 操作。只看 whoami 只能看见第一道里面的名字。'},
      {title:'怎样自己验证',body:'docker run --rm ubuntu id -u，应是 0。不要去写宿主机的 /etc/shadow。在容器里 cat /etc/shadow，再在宿主机上看同一路径，内容应对不上，除非做了绑定挂载。然后看宿主机上该容器进程的 uid。若启用了 userns-remap，进程 uid 应落在 /etc/subuid 的那段里，而不是 0。rootless 时 docker info 能看到 rootless，进程属主也不是宿主机 root。'}
    ],
    refs:[['Docker：User namespace','https://docs.docker.com/engine/security/userns-remap/'],['Docker：Rootless mode','https://docs.docker.com/engine/security/rootless/']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_33) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
