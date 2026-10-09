/* 《分布式高并发》D8：禁止小数存货币；MVCC 不是两列版本号。 */
const COVERAGE_JAVA_63 = [
  {
    track:'java', group:'数据库', id:'mysql-money-decimal-not-ban',
    title:'“禁止小数存货币”不能禁掉 DECIMAL',
    prompt:'为什么规范写“禁止使用小数存储货币，小数容易导致钱对不上”？',
    core:'这里真正该禁的是 **FLOAT/DOUBLE** 一类二进制浮点：0.1 不能精确表示，累加会对不上，见 `mysql-float-ieee-not-8-digits`。**DECIMAL**（以及按分存的整数）是定点，金额常用 `DECIMAL(p,s)` 或最小货币单位整数。资料把“小数”一刀切，学习者会以为 `DECIMAL(10,2)` 也违规，反而改用浮点或字符串硬算。正确口令：货币用 DECIMAL 或整数分；不要用 FLOAT/DOUBLE；展示与四舍五入规则写进业务，而不是靠二进制浮点碰运气。',
    why:'评审看见 DECIMAL 就打回“规范禁止小数”，有人改成 FLOAT，对账出现分差。',
    example:'`amount DECIMAL(12,2)` 存 19.90，十次相加仍是 199.00。同值进 FLOAT 列再 SUM，常对不上。按分用 `BIGINT` 存 1990 也可以，展示时除以 100。',
    task:'划掉“凡小数都不能存货币”。分别标：FLOAT、DECIMAL、整数分——哪个禁、哪个用。',
    answer:'划掉「凡小数都不能存货币」。禁 FLOAT/DOUBLE。用 DECIMAL 或整数分。钱对不上来自二进制浮点，不是 DECIMAL 的定点小数。',
    keywords:'DECIMAL FLOAT 货币 定点 规范',
    origin:'《分布式高并发.pdf》约第 104 页：禁止使用小数存储货币',
    diagram:'diagrams/mysql-money-decimal-not-ban.svg',
    points:['禁的是浮点不是定点 DECIMAL','金额用 DECIMAL 或整数分','钱对不上来自二进制表示误差'],
    deep:[
      {title:'和手机号 varchar',body:'同页“手机号必须 varchar”方向对（含区号、不做算术）。类型规范要按语义拆，不能一句“小数”打全部数值类型。'},
      {title:'怎样自己验证',body:'建 FLOAT 与 DECIMAL(12,2) 各插十个 0.1，SUM 对比。DECIMAL 应为精确和；FLOAT 常不是。'}
    ],
    refs:[['MySQL：DECIMAL','https://dev.mysql.com/doc/refman/8.4/en/fixed-point-types.html'],['MySQL：浮点类型','https://dev.mysql.com/doc/refman/8.4/en/floating-point-types.html'],['IEEE 754','https://en.wikipedia.org/wiki/IEEE_754']]
  },
  {
    track:'java', group:'数据库', id:'mysql-mvcc-not-two-version-columns',
    title:'InnoDB MVCC 不是“行尾两个创建/删除版本列”那么简单',
    prompt:'为什么资料把 MVCC 说成每行后面加创建版本号、删除版本号两列，更新就删旧插新？',
    core:'教学比喻里的“创建/删除版本”能帮助建立直觉，但 **InnoDB 现行实现**并不是给业务行附加两列用户可见的版本号字段。聚簇索引记录带有事务 ID、回滚指针等系统字段，历史版本主要在 **undo log** 里串起来；一致性读按 Read View 判断可见性，见 `mysql-mvcc`、`mysql-redo-undo-binlog`。更新也不是简单“写删除版本再插一整行业务副本”的唯一故事——当前行会被修改，旧值通过 undo 保留供旧读。把资料表格当成物理表结构，会找不到那两列，也解释不清 purge、undo 长度与锁定读差异。面试应落到：快照读 vs 锁定读、undo 与 Read View，而不是背两列表格。',
    why:'有人 `SHOW CREATE TABLE` 找 create_version 列找不到，或以为更新一定物理插第二行业务数据，空间模型全错。',
    example:'事务 A 开启后普通 SELECT 读到价格 10。事务 B 提交改成 12。A 在可重复读下仍可能读到 10：靠 Read View + undo 链，不是表上多了一列 delete_version=B。A 若 `SELECT … FOR UPDATE` 则走锁定读，行为不同。',
    task:'划掉“表上真有创建/删除版本两列”。写出：旧版本主要在哪；普通 SELECT 与 FOR UPDATE 各看什么。',
    answer:'划掉「表上真有两列版本号」。旧版本主要在 undo；一致性读用 Read View 判断可见性。FOR UPDATE 是锁定读，不是同一套快照故事。资料表格是直觉模型，不是 InnoDB 表结构。',
    keywords:'InnoDB MVCC undo Read View 快照读',
    origin:'《分布式高并发.pdf》约第 116–118 页：MVCC 两个隐藏版本列',
    diagram:'diagrams/mysql-mvcc-not-two-version-columns.svg',
    points:['资料两列表格是直觉不是表结构','历史版本主要在 undo 链','快照读与锁定读规则不同'],
    deep:[
      {title:'和隔离级别',body:'RR/RC 下 Read View 建立时机不同，可见性细节以手册为准。不要用“版本号小于当前事务”一句盖所有级别。'},
      {title:'怎样自己验证',body:'对照 InnoDB 多版本与事务模型文档，确认没有业务列叫 create_version。开两事务做快照读与 FOR UPDATE，观察是否阻塞与读到的值。'}
    ],
    refs:[['MySQL：InnoDB 多版本','https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html'],['MySQL：一致性读','https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html'],['MySQL：事务模型','https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_63) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
