/* When practice asks to draw, prepend a ```text figure if the answer has no fence yet. */
const ANSWER_DIAGRAMS = {
  'js-prototype-chain': [
    '实例 a ──getPrototypeOf──► Proto { method } ──► Object.prototype ──► null',
    '实例 b ─────────────────────▲',
    '字段 count 各在 a / b 上；method 只有一份，a.method === b.method',
  ].join('\n'),

  esm: [
    '入口 ──静态 import──► 页面 ──静态 import──► 请求函数',
    '              │',
    '              └──动态 import──► 很少用的页面（不进首屏模块图）',
  ].join('\n'),

  'tcp-is-l4-not-http-handshake': [
    '应用层    HTTP（请求行、状态码）',
    '传输层    TCP（三次握手在这里）',
    '网络层    IP',
    '链路层    …',
    '物理层    …',
    '',
    '划掉：把三次握手写成「HTTP 七层实现」',
  ].join('\n'),

  'auth-session-vs-jwt': [
    '① 浏览器会话 Cookie',
    '   浏览器自动附带 → 服务端会话；HttpOnly 脚本读不到；XSS 难偷票',
    '② localStorage 里的 JWT',
    '   脚本可读可带 Authorization；XSS 可拿走；过期靠前端删',
    '③ 服务间 JWT',
    '   不经浏览器；短时；调用方进程持有',
  ].join('\n'),

  'csrf-boundary': [
    '路径 A 脚本读跨源响应',
    '  页面脚本 ──fetch──► 他源 API ──响应体──► 脚本',
    '  管这条：CORS（无允许源则脚本读不到）',
    '',
    '路径 B 表单把 Cookie 提交到你的源',
    '  他站表单 ──POST──► 你的源（Cookie 可能自动附带）',
    '  管这条：SameSite / 来源校验（CORS 白名单挡不住附带）',
  ].join('\n'),

  context: [
    'ThemeProvider(value=dark)',
    '  └─ InputProvider(value=draft)',
    '       ├─ ThemeReader     → 读 dark',
    '       ├─ InputReader     → 读 draft',
    '       └─ ThemeReader2    → 仍读最近 ThemeProvider（dark）',
  ].join('\n'),

  'mfe-compare-matrix': [
    '方案            主缝                         不适合',
    'Federation      运行时模块 / shared           强文档隔离',
    'single-spa      生命周期 / activeWhen         自带 HTML 拉取',
    'qiankun         HTML entry                   容器未传真实元素',
    '无界            WebComponent + iframe        当成轻量 shared',
    'iframe          独立文档                     频繁通信',
    '构建时包        钉版本                       子应用单独发版',
  ].join('\n'),

  'mfe-routing-one-history': [
    '浏览器地址',
    '  ├─ /overview          → 壳',
    '  └─ /shop/*            → 壳分发 → 子应用（basename=/shop）',
    '',
    '缺服务器 SPA 回退：刷新 /shop/cart → 404（到不了壳）',
  ].join('\n'),

  'java-dcl-volatile-enum': [
    '线程 A：new 分配 → 写引用到 instance（构造未完成）',
    '线程 B：读到 instance ≠ null → 读字段仍是默认值',
    '（无 volatile 时上述交错可能发生）',
    '',
    '枚举常量：类初始化阶段安全发布，不必自写 DCL 锁',
  ].join('\n'),

  'algo-tree-walk': [
    '      A',
    '     / \\',
    '    B   C',
    '   /',
    '  D',
    '',
    '前序 A B D C   适合复制/打印结构',
    '中序 D B A C   适合 BST 有序输出',
    '后序 D B C A   适合删除/算子树',
  ].join('\n'),

  bfs: [
    '起点 S，四方向可走',
    '层 1 队列：S 的邻居（距离 1），入队时记 visited',
    '层 2 队列：层 1 的未访问邻居（距离 2）',
    '边权均为 1 时，首次到达目标的层数 = 最少步数',
  ].join('\n'),

  'jvm-areas': [
    '线程私有（规范）：PC、Java 虚拟机栈（栈帧）',
    '线程共享（规范）：堆、方法区（类结构语义）',
    '实现细节：方法区落在哪块物理内存、用何参数调节',
  ].join('\n'),

  'java-memory': [
    '静态缓存 ──► 订单 ──► 字节数组',
    '                 ▲',
    '请求方法已返回：局部变量没了，但这条链还在',
    '从缓存移除订单且无其他根 → 才不可达（何时回收由 GC 定）',
  ].join('\n'),

  'java-happens-before': [
    '写线程：写 payload/ready ──unlock(M) ──HB──► 读线程：lock(M) ──读 payload/ready',
    '无同一监视器（或其它同步边）时：不能从源码先后推出可见',
  ].join('\n'),

  'java-cas-aba-stamp': [
    '引用：A ──► B ──► A（三次赋值，引用看起来回到 A）',
    'stamp：1 ──► 2 ──► 3',
    '期望 (A,1) 的 CAS：stamp 已是 3 → 失败',
    '划掉业务代码里的 Unsafe',
  ].join('\n'),

  'mysql-replication-flow': [
    '源：事务 ──► binary log ──dump 线程──► 副本',
    '副本：──► relay log ──applier──► 数据',
    'relay ≠ binary 别名',
    '半同步多等：副本收到日志（不是等全部查询跑完）',
  ].join('\n'),

  'lru-needs-hash-and-list': [
    '查找：key ──哈希表 O(1)──► 链表结点',
    '淘汰：链表尾（最久未用）──► 同时删哈希项',
    '划掉：LRU = 只有一个链表',
  ].join('\n'),

  'spring-ioc-wiring': [
    '① 扫描 → ② 创建 → ③ 注入 → ④ 初始化',
    '实现类移出扫描包：失败在 ①/②（容器里没有该类型）',
    '两个候选无资格说明：失败在 ③',
  ].join('\n'),

  'spring-filter-vs-interceptor': [
    '容器 → Filter → Servlet → DispatcherServlet → Interceptor → 控制器',
    '静态资源：常经 Filter；不一定进 Interceptor',
    '控制器：Filter 与 Interceptor 都可能经过',
  ].join('\n'),

  'spring-propagation': [
    '外层 BEGIN',
    '  └─ 经代理 REQUIRES_NEW：外层挂起 → 内层 BEGIN → 内层 COMMIT',
    '外层 RESUME → 外层 ROLLBACK（只撤外层未提交；内层行已提交）',
    'this 调用：无挂起/无新事务',
  ].join('\n'),

  'jpa-cascade-orphan': [
    '订单 ──cascade persist/remove + orphan──► 明细（组合，可以）',
    '订单 ──仅外键──► 商品（共享引用，禁止 cascade remove）',
    '明细 ──×──► 商品（不要再级联）',
  ].join('\n'),

  'mybatis-middleware-layers': [
    '请求 → 数据源路由（选连接）',
    '     → MyBatis 拦截器（改语句/分页）',
    '     → 连接池 / JDBC 代理（看见最终 SQL）',
    '     → 分片改写（改表名）',
    '每一层只留一个产品；生成器不在运行链上',
  ].join('\n'),

  'mw-proxy-lb-gateway': [
    '入口跳',
    '  代理：转到哪（upstream）',
    '  均衡：选哪一台（健康检查）',
    '  网关：这个接口让不让过（鉴权/限流）',
    '一盒答两问 → 写出两段配置名',
  ].join('\n'),

  'gateway-one-hop': [
    '浏览器 → 网关 → 发现 → 订单服务 → 数据库',
    '令牌无效/入口超额：状态码出自网关',
    '对象不属于用户：状态码出自订单服务',
    '发现：只给地址，不产生上述拒绝',
  ].join('\n'),

  'gateway-auth-where': [
    '① 网关：校验令牌 → 主体是谁',
    '② 订单服务：行数据所有者 == 主体？',
    '只做 ①：别人的订单号仍可能通过',
  ].join('\n'),

  'netty-pipeline-handler': [
    '入站：拆帧 → 解码 → 业务 Handler（完整请求从这里开始）',
    '出站：业务 → 编码 → …（相反顺序）',
    '半包：拆帧未完成前，业务日志应为 0',
  ].join('\n'),

  'mq-consume-idempotent-key': [
    '路径一：SETNX 成功 → 写库前崩溃 → 键仍在 → 重投被拒 → 库无流水',
    '路径二：占位过期/未设 → 重投再写 → 可能双写',
    '应用：SET key token NX EX 秒数（NX+过期同一条）',
    '最终依据：库表唯一约束，不是单独 SETNX',
  ].join('\n'),

  'kafka-model': [
    '主题 T：分区 P0 P1 P2',
    '消费组 G1：成员各领分区；每条记录在 G1 内只被一个成员处理',
    '消费组 G2：从自己的位点再读一遍',
    '重放：只拨被回放那一组的位点',
  ].join('\n'),

  'kafka-isr-hwm': [
    '分区副本：Leader + ISR 内 Follower',
    '落后副本：踢出 ISR',
    '高水位（HWM）以内：消费者可读',
    'acks=all 等的是 ISR，不是机房每台机器',
  ].join('\n'),

  'kafka-offset': [
    '① poll',
    '   间隙崩溃 → 未提交 → 重启再读 → 业务补做',
    '② 写数据库',
    '   间隙崩溃 → 业务已在 → 再读按业务键跳过',
    '③ 提交 offset',
    '   之后崩溃 → 从下一位置继续',
  ].join('\n'),

  'rabbit-model': [
    '生产者 → 交换器 → 绑定 → 队列 A / 队列 B → 消费者 ack',
    'ack 后消息离开队列',
    '无绑定接住 → 不会静默留在某个队列（按策略丢弃/回退/死信）',
  ].join('\n'),

  'rabbit-ack': [
    '写库前崩溃：未 ack → 重投 → 恢复时写入订单',
    '写库后 ack 前崩溃：订单已在 → 重投按业务键跳过 → 再 ack',
    '过早 ack：两条都不会再来',
  ].join('\n'),

  'sca-what': [
    '浏览器 → 网关进程 → 订单服务 →（Feign）→ 库存服务',
    '保存地址：Nacos',
    '选择地址：订单进程内 LoadBalancer',
    '拒绝超额：订单进程内 Sentinel',
    '两库同提交：本示例未加 Seata 则没有',
  ].join('\n'),

  'sca-feign-timeout-retry': [
    '① 拿名单（Nacos）→ ② 选实例（LB）→ ③ 连接 → ④ 读取',
    '超时写在连接/读取；写接口默认不自动重试（除非幂等键）',
  ].join('\n'),

  'sca-seata-tcc-empty': [
    '取消先到：空回滚 → 库存无预留行',
    '确认重复：只生效一次 → 行数不因第二次确认再变',
    '尝试在取消之后：拒绝 → 不再新增预留（防悬挂）',
  ].join('\n'),

  'arch-monolith-when': [
    '模块 A ──表 a_*',
    '模块 B ──表 b_*',
    '禁止：A 直接 UPDATE b_*',
    '改为：A → 模块 B 的 API → B 改自己的表',
  ].join('\n'),

  'arch-sync-vs-async': [
    '同步：用户 → 订单 → 库存校验 → 当场成功/失败',
    '异步：支付成功 ─事件─► 积分 / 发货（可稍后）',
    '编排：协调者依次调多方；协同：各方听事件自行推进',
    '全部消息化 → 仍要：状态机 + 幂等 + 补偿 + 对账',
  ].join('\n'),

  'arch-scale-before-split': [
    '应用忙 / 库闲 → 加副本 → 吞吐↑',
    '应用闲 / 库忙 → 加副本 → 连接↑、锁更挤、吞吐不升',
    '先治查询与事务；共享库拆服务消不掉库瓶颈',
  ].join('\n'),

  'arch-evolution-stages': [
    '容量线：单体 → 垂直扩展 → 水平扩展/集群',
    '服务化线：模块化单体 → 经典 SOA → 微服务',
    '无信号停当前站；集群≠拆分；SOA≠微服务换名',
  ].join('\n'),

  'arch-soa-classic': [
    '经典 SOA：服务A ──ESB── 服务B',
    '              └─ 共享写库 ─┘',
    '微服务：服务A→自有库；服务B→自有库；API/事件直连',
  ].join('\n'),

  'microservices-not-just-soa-relabel': [
    '部署：协调发版 → 独立部署',
    '数据：共享库 → 服务自有数据',
    '集成：ESB 智能管道 → 智能端点、哑管道',
    'REST/多语言不是充分条件',
  ].join('\n'),

  'arch-split-order-case': [
    '用户 → 订单（同步创建）→ 库存（同步预留）→ 成功/错误立刻返回',
    '支付成功 ─异步─► 发货（失败 → 死信/补偿）',
    '超时未支付 ─异步─► 取消并释放预留',
    '订单库不直接 UPDATE 库存表',
  ].join('\n'),

  'distributed-cap': [
    '节点 A ╳ 分区 ╳ 节点 B（节点仍在，跨组消息到不了）',
    '关键库存写：失败或带超时的等待（两侧都成功 → 恢复对不上）',
    '资料写可两侧成功：路径上写明恢复如何合并',
    '等待超时后仍要落到失败或接受',
  ].join('\n'),

  'redis-lock-setnx-expire-race': [
    't1 SETNX 成功',
    't2 进程被杀（EXPIRE 未执行）→ 键永久留下',
    '改为：SET key token NX EX 秒数',
  ].join('\n'),

  'distributed-idempotent-key': [
    '同一本地事务：',
    '  INSERT 去重行(业务键)  +  UPDATE 库存',
    '第一次：插入成功，库存 -1',
    '第二次：唯一约束冲突，库存不变',
  ].join('\n'),

  'distributed-seckill': [
    '限流 → 资格校验 → 预扣(条件更新) → 建单',
    '              │失败释放预扣',
    '支付超时 → 幂等回补',
    '限流/资格可重试或拒绝；预扣影响行数≠1 则停',
  ].join('\n'),

  'distributed-consistent-hash': [
    '环：N1 — N2 — N3  （六键落在各弧上）',
    '加入 N4：只迁移 N4 顺时针接管弧上的键',
    '热点键：复制/拆分/局部缓存/限流（虚拟结点拆不开热点）',
  ].join('\n'),

  'distributed-bulkhead': [
    '进程共享池：HTTP 线程池、DB 池、下游客户端池…',
    '最慢下游：单独池 + 上限；舱满快速失败',
    '登录走自己的池，不被库存拖死',
  ].join('\n'),

  'cpu-heap-not-cpu-cache': [
    '列 A 硬件缓存：L1 / L2 / L3（伪共享在缓存行）',
    '列 B DRAM：堆（-Xmx 作用在这里）',
    '两列不能用同一个参数调',
  ].join('\n'),

  'linux-virtual-memory-isolation': [
    '进程 A → 虚拟地址空间 A → 物理页',
    '进程 B → 虚拟地址空间 B → 另一些物理页',
    '相同虚拟地址可并存；物理直访风险：互相覆盖、无隔离',
  ].join('\n'),

  'linux-virtual-addr-mmu': [
    'CPU 虚拟地址 → MMU 翻译 → 物理内存',
    '分段：按逻辑段；分页：按固定页（现行通用系统以分页为主）',
  ].join('\n'),
};

for (const lesson of window.LESSONS) {
  const figure = ANSWER_DIAGRAMS[lesson.id];
  if (!figure || !lesson.answer) continue;
  if (/```/.test(lesson.answer)) continue;
  lesson.answer = ['图：', '', '```text', figure, '```', '', lesson.answer].join('\n');
}
