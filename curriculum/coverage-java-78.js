/* 《分布式高并发》D8：DDL 合并；捕获 SQL 异常。 */
const COVERAGE_JAVA_78 = [
  {
    track:'java', group:"数据库", id:"mysql-ddl-merge-heuristic",
    title:"“同表 DDL 必须合并一条”是锁窗口策略",
    prompt:"为什么规范要求同表增删字段、索引合并一条 DDL 执行？",
    core:"多次 ALTER 可能多次获取元数据锁、拉长变更窗口，合并常能减少交互——资料有理。但必须合并不是语法法：在线 DDL、gh-ost/pt-osc、以及不兼容的算法组合下，拆开反而更安全。8.x ALGORITHM/LOCK 子句与工具链决定怎么做，不要背“一条才合法”。",
    why:"把两条不兼容变更硬捏一条失败回滚；或拆成十条拉长锁等待。",
    example:"加索引与改无关列类型：评估是否可一条 ALGORITHM=INPLACE；冲突则分开发布并观察复制延迟。",
    task:"划掉“必须一条 DDL”。写出：合并想降什么；何时该拆开。",
    answer:"划掉必须一条。合并为减少锁窗口与往返。算法冲突、风险隔离时应拆开，并用在线工具。",
    keywords:"DDL 在线变更 元数据锁",
    origin:"《分布式高并发.pdf》约第 105 页：同表 DDL 合并一条",
    diagram:"diagrams/mysql-ddl-merge-heuristic.svg",
    points:["合并为缩短变更窗口","不是语法强制","在线工具与算法优先"],
    deep:[
      {title:"和复制",body:"从库应用 DDL 的方式影响延迟，变更窗口要双边看。"},
      {title:"怎样自己验证",body:"在测试集对比合并与拆开的 MDL 等待与耗时。"}
    ],
    refs:[["MySQL：ALTER TABLE","https://dev.mysql.com/doc/refman/8.4/en/alter-table.html"],["MySQL：在线 DDL","https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl.html"],["MySQL：元数据锁","https://dev.mysql.com/doc/refman/8.4/en/metadata-locking.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-catch-sql-exception-not-enough",
    title:"“必须捕获 SQL 异常”不够，还要可重试语义",
    prompt:"为什么规范写应用程序必须捕获 SQL 异常并有相应处理？",
    core:"不捕获就崩溃或把栈甩给用户，资料最低要求对。但相应处理若只是 log 一下，仍会丢单、双写、连接泄漏。要区分：瞬时死锁/锁等待可重试；约束冲突转业务错误；连接耗尽要降载。事务边界与幂等键比 catch 关键字更重要。",
    why:"catch 后空处理，库存扣减失败却提示成功；或死锁不重试直接失败。",
    example:"下单事务：捕获死锁错误码有限次重试；唯一键冲突返回“已下过”；其它错误告警。",
    task:"划掉“有 catch 就合规”。列出三类 SQL 失败与处理策略。",
    answer:"划掉形式主义 catch。瞬时可重试；冲突变业务错误；资源耗尽要降载。配合事务与幂等。",
    keywords:"SQLException 死锁 幂等 重试",
    origin:"《分布式高并发.pdf》约第 105 页：应用程序必须捕获 SQL 异常",
    diagram:"diagrams/mysql-catch-sql-exception-not-enough.svg",
    points:["捕获是底线不是完成","按错误类决策","事务与幂等更关键"],
    deep:[
      {title:"和连接池",body:"异常路径也要归还连接，否则比不捕获更快炸池。"},
      {title:"怎样自己验证",body:"制造死锁与唯一冲突，断言重试与业务错误分支。"}
    ],
    refs:[["MySQL：错误码","https://dev.mysql.com/doc/refman/8.4/en/error-message-server.html"],["MySQL：死锁","https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_78) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
