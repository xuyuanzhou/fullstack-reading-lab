/* Batch 06: independently written lessons from page-specific Vue and MySQL review. */
const COVERAGE_BATCH_06 = [
{
    track:'frontend',
    group:'Vue',
    id:'vue-composition-options',
    title:'组合式 API 与选项式 API：复杂组件怎么组织',
    prompt:'复杂组件里，为什么不能把“改用 Composition API”说成解决所有问题？Options API 会被淘汰吗？',
    promptAnswer:'Composition 便于按功能拆函数，不是淘汰 Options。Options 仍受支持；不能说换 API 就解决所有问题。',
    core:'Options API 按 data、computed、methods、watch 等选项分桶；同一业务关注点的代码往往散落在文件各处。Composition API 用导入的函数组织状态、计算、侦听器和生命周期，同一关注点可以放在一个组合式函数里，也更容易做 TypeScript 推断。Vue 官方说明 Options API 没有弃用计划：低到中等复杂度场景仍可使用；组合式 API 的优势主要出现在规模变大、需要复用有状态逻辑时。mixins 的属性来源不清、命名冲突和隐式耦合，是官方不再推荐它作为 Vue 3 复用方案的原因，而不是“选项式写不了复杂页面”。',
    why:'错把“改用 Composition API”当成复杂组件的唯一正确答案，也会把 mixin 的问题说成整个 Options API 已经失败。官方仍保留选项式，没有弃用计划。能分开的信号是：同一关注点的代码是散在 data、methods、watch 里，还是收在一个组合式函数里。',
    example:'一个同时含搜索输入、请求状态和弹窗开关的组件：选项式写法会在 data、methods、watch 之间跳转；抽出 useSearch() 与 useDialog() 后，修改搜索只需打开对应函数。小型展示组件继续用 Options API 并不违反官方定位。',
    task:'把同一行为分别写成 Options API 组件和 setup/组合式函数；统计改搜索逻辑要改几处。再写出为何不能对面试官说“Composition 全面替代 Options”。',
    answer:'Options API 按选项分桶，改搜索要在 data、methods、watch 之间跳。把搜索收进 useSearch、弹窗收进 useDialog 后，改搜索主要改这一个函数，复用时返回明确的 ref，而不是混入说不清来源的字段。对面试不能说 Composition 全面替代 Options：选项式仍受支持，低到中等复杂度可以继续用；组合式解决的是规模变大后的导航、类型推断，以及 mixin 式复用，不是所有页面的唯一写法。',
    vue:'composition',
    keywords:'Vue 3 Composition API Options API setup composable mixin TypeScript 组织 复用',
    points:['Options 按选项分桶，Composition 按关注点组织','Options API 没有弃用计划','官方不再推荐 mixin 作为 Vue 3 复用主路径'],
    refs:[['Vue：Composition API FAQ','https://vuejs.org/guide/extras/composition-api-faq.html'],['Vue：Composables','https://vuejs.org/guide/reusability/composables.html']],
    deep:[
      {
        title:'按关注点而不是按选项桶',
        body:'选项式把同一功能拆进几个选项。组合式把状态、计算和侦听放在一个函数里，返回值写明对外是什么。mixin 的问题是来源不清和命名冲突，不是选项式不能写页面。数一数要改的位置。'
      },
      {
        title:'怎样自己验证',
        body:'把同一个搜索加弹窗的组件写成两种风格，数改搜索逻辑要动几处。选项式应跨多个选项，组合式应集中在一个函数。再列出 mixin 里说不清来源的字段，确认这不是“Options 必须淘汰”的证据。'
      }
    ]
  },
{
    track:'frontend',
    group:'Vue',
    id:'vue-tree-shake-options',
    title:'Vue 体积：树摇依赖构建条件，不是框架名称',
    prompt:'为什么“用了 Composition API 就会自动剪掉无用代码”并不完整？',
    promptAnswer:'树摇要 ESM、生产构建和无副作用标记。Options API 相关代码默认保留，除非显式关掉且工程里已无选项式组件。',
    core:'树摇（tree-shaking）发生在 ESM 静态导入、生产构建和无副作用标记都成立时。Vue 的 esm-bundler 构建可通过编译期标志关掉未使用的运行时能力；例如把 __VUE_OPTIONS_API__ 设为 false，才能让打包器移除 Options API 相关代码，默认值仍是 true。组合式 API 与 script setup 还因直接访问局部变量、减少实例代理，通常更利于压缩。业务模块同样需要未被引用才可能被删除；副作用导入、动态 require、把整个库挂到全局，都会留下代码。',
    why:'错把“用了 Composition API”当成构建会自动剪掉无用代码，默认仍保留 Options API 的运行时。依赖里只要还有选项式组件，关掉编译标志就会把它们剪坏。能分开的信号是：产物里这段代码是否还有引用，以及 __VUE_OPTIONS_API__ 实际是 true 还是 false。',
    example:'生产构建中分别比较：默认标志、显式 __VUE_OPTIONS_API__=false、以及一个从未调用的具名导出工具函数。只有未被引用且无副作用的 ESM 导出才应从产物中消失。',
    task:'在 Vite 或 webpack 生产构建里打开 sourcemap，确认未使用的具名导出是否还在包内；记录当前 __VUE_OPTIONS_API__ 的值，并解释依赖里若仍使用 Options API 为何不能随意关闭该标志。',
    answer:'树摇要同时满足 ESM 静态导入、生产构建和无副作用标记，缺一条就会留下代码。__VUE_OPTIONS_API__ 默认是 true，只有显式设为 false，打包器才可能移除 Options API 相关运行时。依赖或业务里仍有选项式组件时不能关这个标志，否则那些组件会坏。体积结论必须带上这次构建配置，不能只报框架名字。未使用的具名导出还要在 sourcemap 里确认它是否真的消失。',
    vue:'compiler',
    keywords:'Vue tree-shaking ESM __VUE_OPTIONS_API__ esm-bundler Vite webpack 生产构建 副作用',
    points:['树摇需要 ESM、生产构建和无副作用条件','__VUE_OPTIONS_API__ 默认 true，关闭后才可能移除相关运行时','依赖若仍用 Options API 则不能随意裁掉'],
    refs:[['Vue：Compile-Time Flags','https://vuejs.org/api/compile-time-flags.html'],['Vue：Composition API FAQ','https://vuejs.org/guide/extras/composition-api-faq.html']],
    deep:[
      {
        title:'标志和引用一起看',
        body:'框架能被树摇，不表示这次构建已经剪过。要有 ESM、生产模式，并且没有副作用导入或整库挂到全局。Options API 的运行时还要编译标志显式关掉，默认留着。'
      },
      {
        title:'怎样自己验证',
        body:'在生产构建里打开 sourcemap，搜一个从未调用的具名导出，看它还在不在包内。再查 __VUE_OPTIONS_API__ 的值。若依赖里仍有选项式组件，把标志改成 false 后应能看到那些组件失效，因此不能为了体积贸然关掉。'
      }
    ]
  },
{
    track:'java',
    group:'数据库',
    id:'mysql-second-nf',
    title:'第二范式不是“表有主键”',
    prompt:'给订单明细表加一个自增主键，表就一定满足第二范式吗？',
    core:'关系满足第一范式后，第二范式还要求：每个非主属性都完全函数依赖于每一个候选键，不能只依赖于复合候选键的一部分。第三范式进一步要求非主属性不经传递依赖于候选键。给表加一个代理主键，并不能自动消除“商品名称只依赖于商品编号”这类部分依赖。第一范式关注属性不可再分、避免重复组；它也不等于“所有关系数据库都已经设计正确”。实际建模常在规范化与查询性能之间取舍，但取舍应写明冗余字段如何同步，而不是改写范式定义。',
    why:'错把加上自增主键当成已经满足第二范式，订单行里的商品名称仍只依赖商品编号，改名时有的行改到、有的行没改到。主键让行能区分，却不消除部分依赖。能分开的信号是：非主属性是不是只由复合候选键的一部分决定。',
    example:'候选键是 (order_id, product_id) 的明细表若同时存放 product_name，而 product_name 只由 product_id 决定，则违反 2NF。应拆出商品表，明细只保留商品键；若为展示历史名称而保留快照，那是有意识的反规范化，需要更新规则。',
    task:'列出一张含复合业务键和重复描述列的表，标出候选键、非主属性和部分依赖，再给出满足 2NF 的拆表或快照方案。',
    answer:'先列出候选键和每个非主属性的函数依赖。候选键是 (order_id, product_id) 时，product_name 只由 product_id 决定，这是部分依赖，违反第二范式，加自增主键消除不了它。满足 2NF 的做法是把商品名称拆到商品表，明细只留商品键。若为保留下单时的名称而冗余，那是单独的快照决定，要写明何时写入、以后还改不改，不能把这叫做“有主键所以符合范式”。',
    keywords:'MySQL 2NF 3NF 候选键 部分依赖 传递依赖 范式 反规范化 主键',
    points:['2NF 禁止非主属性对候选键的部分依赖','加主键不能自动满足第二范式','反规范化要单独规定冗余如何一致'],
    refs:[['Second normal form（Codd 对 2NF 的定义）','https://en.wikipedia.org/wiki/Second_normal_form'],['Third normal form','https://en.wikipedia.org/wiki/Third_normal_form']],
    deep:[
      {
        title:'主键消不掉部分依赖',
        body:'代理主键能唯一标出一行，不改变“名称只跟商品编号走”这个依赖。第二范式要每个非主属性完全依赖每一个候选键。只依赖复合键的一半，就要拆，或明确写成有规则的冗余。改名时看要改几行。'
      },
      {
        title:'怎样自己验证',
        body:'在明细表里放两行同一商品的不同名称，试着只改商品表。若明细各写各的名字，更新无法一次完成，这就是部分依赖。拆出商品表后，改一处应同时改变所有引用这把商品键的行。'
      }
    ]
  },
{
    track:'java',
    group:'数据库',
    id:'mysql-union-distinct',
    title:'UNION 去重，并不保证按字段排序',
    prompt:'为什么“用 UNION 就会按字段顺序排序，UNION ALL 才不排序”不能当结论？',
    promptAnswer:'UNION 与 UNION DISTINCT 去掉重复行，行数少于两边简单相加；UNION ALL 保留重复，行数是两边之和。',
    core:'在 MySQL 8.4 中，UNION 默认等于 UNION DISTINCT，会去掉重复行；UNION ALL 保留重复行。集合运算的结果默认无序。子查询块里的 ORDER BY 若不配 LIMIT，通常对最终结果没有排序保证；要对整个 UNION 排序，应在最后一条查询之后写 ORDER BY。去重过程可能使用临时表，表面上像排过序，那是实现细节，不能写成 SQL 语义。选择 ALL 的首要条件是是否需要去重，其次才是少一次去重成本。',
    why:'错把 UNION 的去重记成按字段排序，分页和“第一行”会跟着执行计划变来变去。该保留重复时用了默认的 DISTINCT，还会多付一次去重。能分开的信号是：没有最终 ORDER BY 时，两次执行的行顺序是否一样。',
    example:'SELECT city FROM a UNION SELECT city FROM b 只保证城市值的去重集合；两次执行行顺序可能不同。需要按城市名输出时写成 ... UNION ... ORDER BY city。确认无重复且不需去重时用 UNION ALL。',
    task:'构造两个有重叠行的结果集，分别运行 UNION 与 UNION ALL，比较行数；不写 ORDER BY 时多次执行观察顺序是否稳定，再补上最终 ORDER BY。',
    answer:'UNION 与 UNION DISTINCT 去掉重复行，行数少于两边简单相加；UNION ALL 保留重复，行数是两边之和。不写 ORDER BY 时多次执行，行集合相同但顺序可以变，不能把某一次的第一行当成语义。要按城市名输出，ORDER BY 写在整个 UNION 之后。子查询里的 ORDER BY 若不配 LIMIT，不保证最终顺序。确认确实不需要去重时才用 ALL，理由是保留重复或省去一次去重，不是为了“加快排序”。',
    keywords:'MySQL 8.4 UNION UNION ALL DISTINCT ORDER BY 去重 无序 集合运算',
    points:['UNION 默认 DISTINCT 去重','集合结果默认无序','最终排序写在整个 UNION 之后'],
    refs:[['MySQL 8.4：UNION','https://dev.mysql.com/doc/refman/8.4/en/union.html'],['MySQL 8.4：集合运算与 ORDER BY','https://dev.mysql.com/doc/refman/8.4/en/set-operations.html']],
    deep:[
      {
        title:'去重不是排序',
        body:'DISTINCT 保证的是重复行消失。实现时可能用临时表，看起来像有顺序，那不是 SQL 承诺的顺序。最终顺序只来自包在整个集合运算外面的 ORDER BY。顺序要另写 ORDER BY。'
      },
      {
        title:'怎样自己验证',
        body:'造两份有重叠城市的结果，分别跑 UNION 和 UNION ALL，比较行数。UNION 不写 ORDER BY 时多执行几次，看顺序是否变化。补上最外层 ORDER BY city 后再跑，顺序才应稳定。'
      }
    ]
  },
{
    track:'java',
    group:'数据库',
    id:'mysql-innodb-index-lock',
    title:'InnoDB 行锁加在索引记录上，不是“没索引就变表锁”',
    prompt:'没有二级索引的 UPDATE 会不会让 InnoDB 改用表锁？',
    core:'InnoDB 的行锁是加在索引记录上的：记录锁、间隙锁和 next-key 锁都作用在索引项及其间隙。即使表没有用户定义的二级索引，InnoDB 仍有聚簇索引；若也没有主键和合适的非空唯一索引，会生成隐藏的 GEN_CLUST_INDEX。没有合适的过滤索引时，锁定读或更新可能扫描并锁住大量索引记录，并发表现类似整表被堵住，但机制仍是记录级锁，外加意向表锁（IS/IX）。真正的表级锁出现在 LOCK TABLES、部分 AUTO-INC 算法等场景，不能把“走不了业务索引”直接说成“升级为表锁”。',
    why:'错把没有二级索引的 UPDATE 理解成升级成了表锁，于是随便加一个索引就以为从锁表变成了锁行。实际仍是索引记录上的锁，只是扫过的记录变多，并发看起来像整表被堵住。能分开的信号是：状态里是 RECORD LOCKS，还是 LOCK TABLES 那种表锁。',
    example:'对无二级索引的 InnoDB 表执行 UPDATE ... WHERE name = ? 时，优化器可能扫描聚簇索引并锁住大量记录；SHOW ENGINE INNODB STATUS 里仍看到 RECORD LOCKS，同时有 IX 意向锁。给 name 建索引后，锁集合通常缩小到匹配项及其间隙。',
    task:'开两个会话，在 REPEATABLE READ 下对“无二级索引”和“有过滤索引”的同一更新分别观察锁等待；用 INNODB STATUS 区分记录锁与 LOCK TABLES 那种表锁。',
    answer:'没有二级索引时，InnoDB 仍用聚簇索引；若也没有合适的主键，就用隐藏的 GEN_CLUST_INDEX。行锁加在这些索引记录上，扫描范围大时会锁住很多记录，并带有 IX 这类意向锁。意向锁表示表上有行级锁的意图，不是把行锁换成 MyISAM 式表锁。给过滤列建上合适索引后，锁的集合缩到匹配记录及其间隙。LOCK TABLES 才是另一类真正的表级锁，要在状态里分开看。',
    keywords:'MySQL InnoDB record lock gap next-key clustered index GEN_CLUST_INDEX intention lock 行锁 表锁',
    points:['行锁加在索引记录和间隙上','无用户索引时仍用聚簇或隐藏索引加锁','扫描导致的大范围锁不是改用表锁'],
    refs:[['MySQL 8.4：InnoDB 锁','https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html'],['MySQL 8.4：聚簇索引与二级索引','https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html']],
    deep:[
      {
        title:'锁在索引记录上',
        body:'记录锁、间隙锁和 next-key 锁的对象是索引项。没有用户二级索引时，对象换成聚簇或隐藏索引，机制不变。扫了很多记录，现象像表被占住，状态里仍应看到记录锁。'
      },
      {
        title:'怎样自己验证',
        body:'在可重复读下用两个会话更新无二级索引的表，看锁等待，并在 INNODB STATUS 里找 RECORD LOCKS 和意向锁。给过滤列加上索引后再更新，锁住的记录应变少。再执行 LOCK TABLES，确认那种表锁在状态里是另一类。'
      }
    ]
  },
{
    track:'java',
    group:'数据库',
    id:'mysql-innodb-tablespace',
    title:'InnoDB 表大小：默认 16KB 页对应 64TB 量级，不是 2GB',
    prompt:'为什么不能再说“InnoDB 表一般最大 2GB”？',
    promptAnswer:'先查版本、innodb_page_size 和 innodb_file_per_table。',
    core:'MySQL 8.4 文档给出的 InnoDB 表空间上限随页大小变化：默认 16KB 页时最大表空间约 64TB，也是单表上限的内部限制。实际文件还受文件系统限制，例如部分 Linux ext4 上单个文件可能先碰到 16TB。历史上某些操作系统或 FAT 类文件系统才有 2GB/4GB 一类的文件上限，不能写成 InnoDB 引擎的一般容量。MySQL 8.0 起 InnoDB 使用数据字典，不再依赖旧的 .frm 作为表定义的权威存储；MyISAM 仍常以 .MYD/.MYI 等形式存放数据和索引。备份与可移植性要按存储引擎和 tablespace 配置讨论，而不是“所有表都在同一个 2GB 文件里”。',
    why:'错把“InnoDB 表一般最大 2GB”当成当前引擎的容量，会为了这个过时上限去拆库。2GB 来自某些旧文件系统的单文件限制，不是默认页大小下的表空间上限。能分开的信号是：这个数来自页大小对应的内部上限，还是来自某一类文件系统。',
    example:'在测试实例执行 SHOW VARIABLES，看到 innodb_page_size 为 16384。按文档，16KB 页对应的内部表空间上限约 64TB，而不是 2GB。若文件系统单文件先到 16TB，实际文件会先碰到这一层。',
    task:'查当前 MySQL 版本、innodb_page_size 和 innodb_file_per_table，对照官方上限表写出该实例的内部上限，并指出何种文件系统会先碰到更小的文件限制。',
    answer:'先查版本、innodb_page_size 和 innodb_file_per_table。页大小为默认的 16KB 时，内部表空间上限约 64TB，这也是单表上限的内部限制。再叠加文件系统：有的环境单文件会先到更小的上限，例如某些 ext4 上的 16TB。2GB 或 4GB 只属于历史上个别文件系统，不能写成当前 InnoDB 的一般表大小。规划时两层限制都要写上。',
    keywords:'MySQL 8.4 InnoDB tablespace 64TB innodb_page_size file-per-table 2GB .frm 容量',
    points:['默认 16KB 页时内部表空间上限约 64TB','实际大小还受文件系统单文件限制','2GB 不是 MySQL 8.4 InnoDB 的一般上限'],
    refs:[['MySQL 8.4：InnoDB 限制','https://dev.mysql.com/doc/refman/8.4/en/innodb-limits.html'],['MySQL 8.4：聚簇索引与隐藏主键','https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html']],
    deep:[
      {
        title:'两层上限',
        body:'引擎按页大小给出表空间的内部上限。文件还得放进操作系统的单个文件限制里。谁更小，谁先挡住增长。历史资料里的 2GB 属于后一层的旧例子，不能写成引擎今天的容量。'
      },
      {
        title:'怎样自己验证',
        body:'在实例上查看版本、innodb_page_size 和是否按表存放文件。把页大小对照文档里的上限表，写出内部上限。再查当前文件系统的单文件限制，看它是否比内部上限更小。不要把 2GB 填进这张表。'
      }
    ]
  }
];

for (const {points,refs,...lesson} of COVERAGE_BATCH_06) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
