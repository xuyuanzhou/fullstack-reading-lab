/* 《分布式高并发》D8：必须 UTF8；禁止外键。 */
const COVERAGE_JAVA_71 = [
  {
    track:'java', group:"数据库", id:"mysql-utf8-alias-not-utf8mb4",
    title:"“必须 UTF8”在 8.x 应对齐 utf8mb4",
    prompt:"为什么规范写“必须使用 UTF8 字符集”，并说万国码、省空间、无乱码？",
    core:"资料要表达的是：用 Unicode、别再用 latin1/gbk 混搭。但在 MySQL 里历史别名 utf8 实际是 utf8mb3（最多 3 字节/码点），emoji 与部分补充平面会踩坑；现行推荐是 utf8mb4。把 UTF8 背成三字节别名，还会和“省空间”口号打架：该省的是错误编码转换，不是故意截断 4 字节字符。库、表、连接、列四级 charset/collation 要一致。邻接 mysql-varchar-row-max。",
    why:"建库写 CHARSET=utf8，线上昵称带 emoji 插入失败或截断；或误以为 utf8 已等于 utf8mb4。",
    example:"CREATE DATABASE … CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci。旧表 utf8/utf8mb3 迁移前先查 INFORMATION_SCHEMA 与非法码点。连接串也指定 utf8mb4。",
    task:"划掉“UTF8 三字就完事”。写出：8.x 推荐字符集；utf8 别名实际是什么。",
    answer:"划掉含糊 UTF8。8.x 用 utf8mb4。历史 utf8 多是 utf8mb3。连接与列对齐，不要靠“省空间”拒绝四字节字符。",
    keywords:"MySQL utf8mb4 utf8mb3 字符集",
    origin:"《分布式高并发.pdf》约第 104 页：必须使用 UTF8 字符集",
    diagram:"diagrams/mysql-utf-eight-alias-not-mb-four.svg",
    points:["utf8 历史别名常是 utf8mb3","现行推荐 utf8mb4","库表连接列要字符集一致"],
    deep:[
      {title:"和行长度",body:"utf8mb4 按最多 4 字节计入 VARCHAR 行预算，见行大小课。换字符集要重算索引前缀长度。"},
      {title:"怎样自己验证",body:"SHOW CHARACTER SET；建表分别用 utf8 与 utf8mb4 插入 emoji，观察错误与 LENGTH。"}
    ],
    refs:[["MySQL：utf8mb4","https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-utf8mb4.html"],["MySQL：字符集","https://dev.mysql.com/doc/refman/8.4/en/charset.html"],["MySQL：utf8mb3","https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-utf8mb3.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-fk-ban-not-absolute",
    title:"“禁止外键”是并发启发式，不是完整性过时",
    prompt:"为什么规范写死禁止外键，理由是耦合、拖垮 update/delete、易死锁？",
    core:"高并发写入路径上，外键的级联检查与锁等待确实贵，多服务共库时外键也常帮不上忙——资料的运维动机成立。但绝对禁止会推出“完整性只靠应用”的幻觉：绕过 ORM 的 SQL、批导、多写者仍可能留下悬空引用。引擎级 FOREIGN KEY 仍是单库内声明式约束的合法工具；该不该用来看写入模型、是否共库、是否有对账。与 mysql-fk-redundancy 互补：那里讲冗余计数，这里拆规范禁令。",
    why:"规范背成“互联网表不能有外键”，核心订单行失去最后一道拒绝，脏子行先落库。",
    example:"单库订单/明细仍可用外键挡悬空明细；秒杀库存热点表若外键拖垮写入，可去掉外键并加对账任务。不要用“禁止”代替这两种设计。",
    task:"划掉“外键永远禁止”。给出：保留外键的条件；去掉外键时必须补上什么。",
    answer:"划掉一律禁止。单库强一致引用可保留外键。高并发多写者可去掉，但必须有应用校验与对账。性能借口不能等于没有完整性策略。",
    keywords:"MySQL 外键 完整性 对账 锁",
    origin:"《分布式高并发.pdf》约第 104 页：禁止使用外键",
    diagram:"diagrams/mysql-fk-ban-not-absolute.svg",
    points:["外键有写入与锁成本","禁令是启发式不是完整性过时","去掉外键必须补校验与对账"],
    deep:[
      {title:"和分布式",body:"跨服务外键本来就不成立。那是边界问题，不能用来证明单库内也不该有外键。"},
      {title:"怎样自己验证",body:"有外键时插入悬空子行应失败；去掉后应成功并留下脏行，再用对账查出。"}
    ],
    refs:[["MySQL：外键","https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html"],["MySQL：约束","https://dev.mysql.com/doc/refman/8.4/en/constraints.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_71) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
