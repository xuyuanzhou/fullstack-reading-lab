/* Batch 12: short Nginx / MyBatis / Kafka interview PDFs. */
const COVERAGE_JAVA_12 = [
  {
    track:'java', group:'Nginx', id:'nginx-gunzip-not-compress',
    title:'gunzip 是给客户端解压响应，不是给上游压请求',
    prompt:'为什么“用 gunzip 模块把请求压缩到上游”说反了？',
    core:'ngx_http_gunzip_module 是响应过滤器：当上游或磁盘上的内容带 Content-Encoding: gzip，而客户端不会 gzip 时，nginx 可以在输出前解压。它处理的是响应体，方向是“压缩内容 → 不解压的客户端”，不是“把客户端请求再压一遍发给 upstream”。真要和上游谈压缩，看的是 proxy 侧是否转发 Accept-Encoding、上游是否自己 gzip，以及 gzip / gzip_proxied 这些输出压缩指令。资料把 gunzip 写成“压缩请求到上游”，把模块名和数据方向都弄反了。',
    why:'按“用 gunzip 把请求压到上游”去省带宽，打开的却是给客户端解压的过滤器，请求体积不会变小，还多耗 CPU。区分信号是它改的是响应，gzip 才负责压缩输出。方向反了，带宽不会下降。',
    example:'静态目录里存的是 .gz 文件内容但响应头是 gzip，老浏览器没有 gzip：location 里 gunzip on，nginx 解压后再交给客户端。反向代理动态接口不要靠 gunzip 去压 POST。',
    task:'对照 ngx_http_gunzip_module 文档，标出它改的是请求还是响应；再列出 gzip 与 gunzip 各自的方向。',
    answer:'对照 gunzip 模块，它处理的是已经压缩、准备发给客户端的响应：客户端不会解压时，由 Nginx 解开再送出。它不改请求，也不会把请求压给上游。要压缩响应，用 gzip 一类指令，方向是服务器到客户端，和 gunzip 相反。请求压缩要另找路径。',
    keywords:'Nginx gunzip gzip Content-Encoding 反向代理',
    points:['gunzip 解压带 gzip 编码的响应','服务对象是不支持 gzip 的客户端','不要把它当成压缩请求到 upstream'],
    deep:[
      {title:'两个模块方向相反',body:'gzip 把要发出的响应压小。gunzip 把上游已经压过的响应解开，好让不支持压缩的客户端能读。想减少到上游的请求字节，这两个都不是那条路径。方向写反就白耗 CPU。'},
      {title:'怎样自己验证',body:'打开 ngx_http_gunzip_module 文档，标出它作用在响应上。再看 gzip 的说明，确认压缩的是输出。用不会解压的客户端访问，看谁在解压。看响应头里的编码。'},
    ],
    refs:[['nginx：ngx_http_gunzip_module','https://nginx.org/en/docs/http/ngx_http_gunzip_module.html'],['nginx：ngx_http_gzip_module','https://nginx.org/en/docs/http/ngx_http_gzip_module.html']]
  },
  {
    track:'java', group:'Nginx', id:'nginx-load-module',
    title:'模块不必全部在编译时钉死，可以 load_module',
    prompt:'为什么“nginx 不支持运行时选择模块，必须编译时选好”对现在的发行版不够？',
    core:'很多功能仍是编译开关，官方包也不是“任意 .so 都能热插”。但从 1.9.11 起，核心有 load_module，可在配置主上下文加载动态模块（例如 mail）。发行版提供的 nginx 往往把常用模块编成动态库，改配置再 reload 即可启用，不必为每个模块从源码重编。资料把早期静态链接习惯写成绝对定律，会让人以为加 stub_status 或 image filter 只能重编译。仍要注意：未随该二进制构建的第三方模块不能当运行时插件乱加载；reload 加载的是已构建的 .so，不是任意下载的代码。',
    why:'把“只能编译时选模块”当成现行答案，会拒绝发行版里已经编好的动态模块，排障时也绕去重编整个二进制。区分信号是 nginx -V 里有动态模块路径，配置里可以 load_module。',
    example:'主配置写 load_module modules/ngx_http_image_filter_module.so; 再 nginx -t && reload。源码自编时仍可用 --with-http_image_filter_module=dynamic。',
    task:'在当前 nginx -V 输出里找动态模块路径，对照文档确认 load_module 的出现版本，划掉资料里的“运行时完全不能选”。',
    answer:'nginx -V 里能看到模块路径，说明发行版可以带动态模块。文档里 load_module 从 1.9.11 起可以加载已经构建好的模块，不必为了加减一个模块就重编整个二进制。编译仍然决定有哪些模块可以被加载，不是运行中临时从源码变出新模块。资料里“运行时完全不能选”应划掉。',
    keywords:'Nginx load_module 动态模块 编译',
    points:['load_module 从 1.9.11 起可加载动态模块','发行版常用模块往往已是 .so','不能加载这份二进制从未构建过的任意模块'],
    deep:[
      {title:'加载不等于现场编译',body:'load_module 加载的是已经编好的动态模块文件。配置里写上它，启动时装进来。没有对应的二进制，光写指令也不会出现新能力。没有 .so 文件，指令不会变出模块。'},
      {title:'怎样自己验证',body:'执行 nginx -V，找出动态模块路径。对照文档里 load_module 的出现版本，确认 1.9.11 之后可以加载。把资料中“运行时完全不能选模块”划掉。'},
    ],
    refs:[['nginx：load_module','https://nginx.org/en/docs/ngx_core_module.html#load_module']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-rowbounds-memory',
    title:'RowBounds 默认是结果集上跳过，不是数据库 LIMIT',
    prompt:'为什么把 MyBatis 分页只背成“用 RowBounds 就分页了”会在大结果集上踩坑？',
    core:'RowBounds 给一个 offset 和 limit，默认执行器仍把 JDBC 查询跑完，再在结果集上跳过和截取。这是内存分页，不是自动改写成数据库的 LIMIT/OFFSET。数据量大时驱动仍可能拉回大量行。要物理分页，应在 SQL 里写数据库分页语法，或用插件在 StatementHandler 里按方言改写 SQL。资料说 RowBounds 是内存分页、插件才拼物理分页，这一句成立；但不要把 RowBounds 当成生产环境的默认分页方案。翻页深、排序不稳定时，还要考虑 keyset 而不是越来越大的 OFFSET。',
    why:'接口把页码交给 RowBounds 去翻后面的页，数据库会先查出前面的行，应用内存再跳过，大表上像整表都读回来了。区分信号是驱动读到的行数远大于页面上的 20 行。页码越大，读回来的行越多。',
    example:'小字典表用 RowBounds(0,20) 尚可。订单列表应 SELECT ... WHERE id > :lastId ORDER BY id LIMIT 20，或插件改写 LIMIT。',
    task:'对一万行表分别用 RowBounds(9900,20) 和 SQL LIMIT 20 OFFSET 9900，比较驱动读了多少行；再改成 keyset。',
    answer:'一万行上 RowBounds(9900,20) 默认仍把前面的行查回来，再在结果集上跳过，驱动读到的行数接近一万。SQL 里写 LIMIT 20 OFFSET 9900 才是数据库分页，但偏移仍然要扫过前面的行。改成按上次看到的键继续查的 keyset，才不用为前 99 页买单。插件改写 SQL 时，那才是方言里的 LIMIT。',
    keywords:'MyBatis RowBounds 分页 LIMIT 内存分页',
    points:['RowBounds 默认在结果集上 skip/limit','大结果仍会打到驱动和内存','物理分页要写 SQL 或用插件改写'],
    deep:[
      {title:'分页发生在哪一侧',body:'默认的 RowBounds 不改 SQL，截的是已经返回的结果。看起来接口有 offset 和 limit，数据库却可能没有少读。大偏移时内存和网络都先付出前面的页。'},
      {title:'怎样自己验证',body:'对一万行分别用 RowBounds(9900,20) 和 LIMIT/OFFSET，看驱动或通用日志里实际读了多少行。再改成按主键继续的 keyset，对比还要不要扫过前 9900 行。'},
    ],
    refs:[['MyBatis：Mapper XML sql','https://mybatis.org/mybatis-3/sqlmap-xml.html'],['MyBatis：plugins','https://mybatis.org/mybatis-3/configuration.html#plugins']]
  },
  {
    track:'java', group:'消息队列', id:'kafka-kraft-not-zk',
    title:'现行 Kafka 用 KRaft 管元数据，活着不再等于连上 ZooKeeper',
    prompt:'为什么“判断 broker 还活着必须维持 ZooKeeper 心跳，follower 还要及时同步 leader”不能当 Kafka 4 的默认答案？',
    core:'资料把集群存活绑在 ZooKeeper 连接上，这是 ZooKeeper 模式控制器时代的叙事。Kafka 从 KRaft 起用内置的元数据仲裁替代 ZK：broker 向控制器注册、用副本状态看 ISR，不再先问“有没有 ZK 会话”。Kafka 4.0 文档路径按无 ZooKeeper 的 KRaft 部署讲解。follower 必须及时复制、落后会离开 ISR，这一句仍然成立，它解释的是同步副本集合，不是 ZK 心跳。acks=-1 / all 等到的是 ISR，不是磁盘上每一个 follower，细节见既有 `kafka-producer-acks` 与 `kafka-isr-hwm`。新项目不要先背一套 ZK 四字命令当运维入口。',
    why:'面试仍答“必须连上 ZooKeeper 才算活着”，会在 KRaft 集群上找一个已经不存在的依赖，也会把 ISR 说成每一个 follower。区分信号是元数据在控制器，acks=all 等的是 ISR。',
    example:'新集群按 KRaft 格式化存储后，启动控制器和 broker，不部署 ZooKeeper。看 ISR 是否包含足够副本，而不是看 ZK 临时节点。acks=all 只等 ISR 里的副本确认，不要求每一个 follower 都跟上。',
    task:'对照当前 Kafka 文档的 KRaft 说明，划掉资料里的两条 ZK 存活条件，改写成控制器与 ISR；并注明 acks=all 等的是 ISR。',
    answer:'划掉“必须维持 ZooKeeper 心跳”和“follower 都要及时同步才算活着”。现行集群用 KRaft 控制器管元数据，副本是否跟上看 ISR。acks=all 等的是 ISR 中的副本，不是集群里每一个 follower。ZooKeeper 不是这套现行默认依赖。',
    keywords:'Kafka KRaft ZooKeeper ISR acks controller',
    points:['KRaft 用内置元数据仲裁替代 ZooKeeper','ISR 描述同步副本，不是 ZK 心跳','acks=all 等到 ISR，不是全部 follower'],
    deep:[
      {title:'ISR 不是全体副本',body:'落后太多的副本会留在 ISR 外面。acks=all 不会等它们。把“所有 follower 都写完”当成成功条件，会把正常的落后说成集群不健康。落后副本不在成功条件里。'},
      {title:'怎样自己验证',body:'对照当前 Kafka 文档的 KRaft 说明，把资料里的两条 ZK 存活条件划掉，改写成控制器和 ISR。再看 acks=all 的定义，确认等的是 ISR 而不是每一个 follower。'},
    ],
    refs:[['Kafka：KRaft','https://kafka.apache.org/documentation/#kraft'],['Kafka：acks','https://kafka.apache.org/documentation/#producerconfigs_acks']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_12) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
