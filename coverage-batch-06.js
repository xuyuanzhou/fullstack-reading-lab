/* Batch 06: independently written lessons from page-specific Vue and MySQL review. */
const COVERAGE_BATCH_06 = [
  {
    track:'frontend', group:'Vue', id:'vue-composition-options',
    title:'组合式 API 与选项式 API：复杂组件怎么组织',
    prompt:'复杂组件里，为什么不能把“改用 Composition API”说成解决所有问题？Options API 会被淘汰吗？',
    core:'Options API 按 data、computed、methods、watch 等选项分桶；同一业务关注点的代码往往散落在文件各处。Composition API 用导入的函数组织状态、计算、侦听器和生命周期，同一关注点可以放在一个组合式函数里，也更容易做 TypeScript 推断。Vue 官方说明 Options API 没有弃用计划：低到中等复杂度场景仍可使用；组合式 API 的优势主要出现在规模变大、需要复用有状态逻辑时。mixins 的属性来源不清、命名冲突和隐式耦合，是官方不再推荐它作为 Vue 3 复用方案的原因，而不是“选项式写不了复杂页面”。',
    why:'把教学资料里的绝对优劣当面试标准答案，会忽略团队约束、现有代码和官方并存策略，也会把 mixin 问题误判成整个 Options API 失败。',
    example:'一个同时含搜索输入、请求状态和弹窗开关的组件：选项式写法会在 data、methods、watch 之间跳转；抽出 useSearch() 与 useDialog() 后，修改搜索只需打开对应函数。小型展示组件继续用 Options API 并不违反官方定位。',
    task:'把同一行为分别写成 Options API 组件和 setup/组合式函数；统计改搜索逻辑要改几处。再写出为何不能对面试官说“Composition 全面替代 Options”。',
    answer:'按关注点组织组合式函数，复用时返回明确的 ref 而不是混入隐式字段。说明 Options API 仍受支持；组合式 API 解决的是复杂组件导航、类型推断和 mixin 式复用的问题，不是一切场景的唯一正确答案。',
    keywords:'Vue 3 Composition API Options API setup composable mixin TypeScript 组织 复用',
    points:['Options 按选项分桶，Composition 按关注点组织','Options API 没有弃用计划','官方不再推荐 mixin 作为 Vue 3 复用主路径'],
    refs:[['Vue：Composition API FAQ','https://vuejs.org/guide/extras/composition-api-faq.html'],['Vue：Composables','https://vuejs.org/guide/reusability/composables.html']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-tree-shake-options',
    title:'Vue 体积：树摇依赖构建条件，不是框架名称',
    prompt:'为什么“用了 Composition API 就会自动剪掉无用代码”并不完整？',
    core:'树摇（tree-shaking）发生在 ESM 静态导入、生产构建和无副作用标记都成立时。Vue 的 esm-bundler 构建可通过编译期标志关掉未使用的运行时能力；例如把 __VUE_OPTIONS_API__ 设为 false，才能让打包器移除 Options API 相关代码，默认值仍是 true。组合式 API 与 script setup 还因直接访问局部变量、减少实例代理，通常更利于压缩。业务模块同样需要未被引用才可能被删除；副作用导入、动态 require、把整个库挂到全局，都会留下代码。',
    why:'把“框架支持树摇”当成体积保证，会漏查构建模式、依赖实现和第三方组件是否仍使用 Options API。',
    example:'生产构建中分别比较：默认标志、显式 __VUE_OPTIONS_API__=false、以及一个从未调用的具名导出工具函数。只有未被引用且无副作用的 ESM 导出才应从产物中消失。',
    task:'在 Vite 或 webpack 生产构建里打开 sourcemap，确认未使用的具名导出是否还在包内；记录当前 __VUE_OPTIONS_API__ 的值，并解释依赖里若仍使用 Options API 为何不能随意关闭该标志。',
    answer:'树摇要同时满足 ESM、生产模式和副作用规则。关掉 Options API 能减小 Vue 运行时，但会破坏仍依赖该 API 的组件库。体积结论必须带构建配置，不能只报框架名。',
    keywords:'Vue tree-shaking ESM __VUE_OPTIONS_API__ esm-bundler Vite webpack 生产构建 副作用',
    points:['树摇需要 ESM、生产构建和无副作用条件','__VUE_OPTIONS_API__ 默认 true，关闭后才可能移除相关运行时','依赖若仍用 Options API 则不能随意裁掉'],
    refs:[['Vue：Compile-Time Flags','https://vuejs.org/api/compile-time-flags.html'],['Vue：Composition API FAQ','https://vuejs.org/guide/extras/composition-api-faq.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-second-nf',
    title:'第二范式不是“表有主键”',
    prompt:'给订单明细表加一个自增主键，表就一定满足第二范式吗？',
    core:'关系满足第一范式后，第二范式还要求：每个非主属性都完全函数依赖于每一个候选键，不能只依赖于复合候选键的一部分。第三范式进一步要求非主属性不经传递依赖于候选键。给表加一个代理主键，并不能自动消除“商品名称只依赖于商品编号”这类部分依赖。第一范式关注属性不可再分、避免重复组；它也不等于“所有关系数据库都已经设计正确”。实际建模常在规范化与查询性能之间取舍，但取舍应写明冗余字段如何同步，而不是改写范式定义。',
    why:'把 2NF 背成“每行能区分/加上主键”，会放过订单行里重复存放的商品属性，更新时出现不一致。',
    example:'候选键是 (order_id, product_id) 的明细表若同时存放 product_name，而 product_name 只由 product_id 决定，则违反 2NF。应拆出商品表，明细只保留商品键；若为展示历史名称而保留快照，那是有意识的反规范化，需要更新规则。',
    task:'列出一张含复合业务键和重复描述列的表，标出候选键、非主属性和部分依赖，再给出满足 2NF 的拆表或快照方案。',
    answer:'先找候选键和函数依赖，再判断是否存在部分依赖或传递依赖。主键列只是实现手段，不能代替 2NF/3NF 的依赖定义。',
    keywords:'MySQL 2NF 3NF 候选键 部分依赖 传递依赖 范式 反规范化 主键',
    points:['2NF 禁止非主属性对候选键的部分依赖','加主键不能自动满足第二范式','反规范化要单独规定冗余如何一致'],
    refs:[['Second normal form（Codd 对 2NF 的定义）','https://en.wikipedia.org/wiki/Second_normal_form'],['Third normal form','https://en.wikipedia.org/wiki/Third_normal_form']]
  },
  {
    track:'java', group:'数据库', id:'mysql-union-distinct',
    title:'UNION 去重，并不保证按字段排序',
    prompt:'为什么“用 UNION 就会按字段顺序排序，UNION ALL 才不排序”不能当结论？',
    core:'在 MySQL 8.4 中，UNION 默认等于 UNION DISTINCT，会去掉重复行；UNION ALL 保留重复行。集合运算的结果默认无序。子查询块里的 ORDER BY 若不配 LIMIT，通常对最终结果没有排序保证；要对整个 UNION 排序，应在最后一条查询之后写 ORDER BY。去重过程可能使用临时表，表面上像排过序，那是实现细节，不能写成 SQL 语义。选择 ALL 的首要条件是是否需要去重，其次才是少一次去重成本。',
    why:'把去重误记成排序，分页和“第一条记录”会变得不稳定；该用 ALL 时用 DISTINCT 也会增加不必要的去重开销。',
    example:'SELECT city FROM a UNION SELECT city FROM b 只保证城市值的去重集合；两次执行行顺序可能不同。需要按城市名输出时写成 ... UNION ... ORDER BY city。确认无重复且不需去重时用 UNION ALL。',
    task:'构造两个有重叠行的结果集，分别运行 UNION 与 UNION ALL，比较行数；不写 ORDER BY 时多次执行观察顺序是否稳定，再补上最终 ORDER BY。',
    answer:'UNION/DISTINCT 负责去重，UNION ALL 保留重复。最终顺序只在显式 ORDER BY 时作为语义保证；不要用“UNION 会排序”解释结果。',
    keywords:'MySQL 8.4 UNION UNION ALL DISTINCT ORDER BY 去重 无序 集合运算',
    points:['UNION 默认 DISTINCT 去重','集合结果默认无序','最终排序写在整个 UNION 之后'],
    refs:[['MySQL 8.4：UNION','https://dev.mysql.com/doc/refman/8.4/en/union.html'],['MySQL 8.4：集合运算与 ORDER BY','https://dev.mysql.com/doc/refman/8.4/en/set-operations.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-innodb-index-lock',
    title:'InnoDB 行锁加在索引记录上，不是“没索引就变表锁”',
    prompt:'没有二级索引的 UPDATE 会不会让 InnoDB 改用表锁？',
    core:'InnoDB 的行锁是加在索引记录上的：记录锁、间隙锁和 next-key 锁都作用在索引项及其间隙。即使表没有用户定义的二级索引，InnoDB 仍有聚簇索引；若也没有主键和合适的非空唯一索引，会生成隐藏的 GEN_CLUST_INDEX。没有合适的过滤索引时，锁定读或更新可能扫描并锁住大量索引记录，并发表现类似整表被堵住，但机制仍是记录级锁，外加意向表锁（IS/IX）。真正的表级锁出现在 LOCK TABLES、部分 AUTO-INC 算法等场景，不能把“走不了业务索引”直接说成“升级为表锁”。',
    why:'错误模型会让人以为“加个任意索引就从锁表变成锁行”，忽略扫描范围、隔离级别和间隙锁。',
    example:'对无二级索引的 InnoDB 表执行 UPDATE ... WHERE name = ? 时，优化器可能扫描聚簇索引并锁住大量记录；SHOW ENGINE INNODB STATUS 里仍看到 RECORD LOCKS，同时有 IX 意向锁。给 name 建索引后，锁集合通常缩小到匹配项及其间隙。',
    task:'开两个会话，在 REPEATABLE READ 下对“无二级索引”和“有过滤索引”的同一更新分别观察锁等待；用 INNODB STATUS 区分记录锁与 LOCK TABLES 那种表锁。',
    answer:'行锁始终落在索引记录上；无合适索引时锁的是聚簇/隐藏索引上的大量记录。意向锁是表级意图，不等于把行锁升级成 MyISAM 式表锁。',
    keywords:'MySQL InnoDB record lock gap next-key clustered index GEN_CLUST_INDEX intention lock 行锁 表锁',
    points:['行锁加在索引记录和间隙上','无用户索引时仍用聚簇或隐藏索引加锁','扫描导致的大范围锁不是改用表锁'],
    refs:[['MySQL 8.4：InnoDB 锁','https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html'],['MySQL 8.4：聚簇索引与二级索引','https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-innodb-tablespace',
    title:'InnoDB 表大小：默认 16KB 页对应 64TB 量级，不是 2GB',
    prompt:'为什么不能再说“InnoDB 表一般最大 2GB”？',
    core:'MySQL 8.4 文档给出的 InnoDB 表空间上限随页大小变化：默认 16KB 页时最大表空间约 64TB，也是单表上限的内部限制。实际文件还受文件系统限制，例如部分 Linux ext4 上单个文件可能先碰到 16TB。历史上某些操作系统或 FAT 类文件系统才有 2GB/4GB 一类的文件上限，不能写成 InnoDB 引擎的一般容量。MySQL 8.0 起 InnoDB 使用数据字典，不再依赖旧的 .frm 作为表定义的权威存储；MyISAM 仍常以 .MYD/.MYI 等形式存放数据和索引。备份与可移植性要按存储引擎和 tablespace 配置讨论，而不是“所有表都在同一个 2GB 文件里”。',
    why:'用过时的 2GB 上限规划容量或否定 InnoDB，会得出错误的分库分表理由。',
    example:'查看 innodb_page_size 与文件每表表空间是否开启；在测试实例用 SHOW VARIABLES 确认版本。容量规划应同时看官方表空间上限和文件系统单文件限制。',
    task:'查当前 MySQL 版本、innodb_page_size 和 innodb_file_per_table，对照官方上限表写出该实例的内部上限，并指出何种文件系统会先碰到更小的文件限制。',
    answer:'以 MySQL 8.4 的页大小对应表空间上限为准，再叠加文件系统限制。2GB 不是当前 InnoDB 的一般表大小上限。',
    keywords:'MySQL 8.4 InnoDB tablespace 64TB innodb_page_size file-per-table 2GB .frm 容量',
    points:['默认 16KB 页时内部表空间上限约 64TB','实际大小还受文件系统单文件限制','2GB 不是 MySQL 8.4 InnoDB 的一般上限'],
    refs:[['MySQL 8.4：InnoDB 限制','https://dev.mysql.com/doc/refman/8.4/en/innodb-limits.html'],['MySQL 8.4：聚簇索引与隐藏主键','https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_BATCH_06) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
