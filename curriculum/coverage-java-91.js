/* 《分布式高并发》D8：Docker 仓储混淆；sequence 表批量取号断号。 */
const COVERAGE_JAVA_91 = [
  {
    track:'java', group:'交付与运行', id:'docker-registry-not-just-repo-bucket',
    title:'“仓储放镜像”要拆成 Registry 与 Repository',
    prompt:'为什么资料把仓库说成集中存放镜像的场所，又提醒 Repository 与 Registry 有区别，总结里却常混称仓储？',
    promptAnswer:'Registry 是服务端点，Repository 是镜像名空间。不要混称成一个大桶。',
    core:'资料自己写了 **Registry（注册服务器）** 与 **Repository（仓库）** 不同，却在总结里用“仓储”一把搂——面试容易背糊。Registry 是**托管服务的访问端点**（如 `registry-1.docker.io`、私有 Harbor）；Repository 是端点下的**镜像名空间**（如 `library/nginx`）；**tag**（或 digest）才钉死某一构建。Docker Hub 是公开 Registry 产品，不是“仓储”概念的全部。推拉要写清：主机/命名空间/仓库名:tag，并理解权限与速率限制在 Registry 层。邻接 `docker-image-template-not-container`。',
    why:'只背“镜像在仓储”，配私有仓库时分不清登录的是 Registry 还是某个 Repository；或把 Hub 当成唯一合法源。',
    example:'`docker pull myharbor.example.com/team/api:1.2`：主机是 Registry，`team/api` 是 Repository，`1.2` 是 tag。同一 Repository 可有多 tag 指向不同 digest。',
    task:'划掉“仓储=一个大桶”。分别用一句话定义 Registry、Repository、tag。',
    answer:'划掉大桶口诀。Registry 是服务端点；Repository 是镜像名空间；tag/digest 指向具体镜像内容。Hub 只是一种公开 Registry。',
    keywords:'Docker Registry Repository tag Harbor',
    origin:'《分布式高并发.pdf》约第 187 页：仓库与注册服务器有区别；总结混称仓储',
    diagram:'diagrams/docker-registry-not-just-repo-bucket.svg',
    points:['Registry 是托管服务端点','Repository 是镜像名空间','tag 或 digest 才钉死构建'],
    deep:[
      {title:'和镜像层',body:'拉下来的是按 digest 寻址的内容地址存储；tag 只是可变指针，可能被重新指向。'},
      {title:'怎样自己验证',body:'对同一 Repository 列出两个 tag 的 digest，观察是否可不同；登录私有 Registry 后再 pull。'}
    ],
    refs:[['Docker：仓库与 Registry','https://docs.docker.com/get-started/docker-concepts/building-images/using-the-cli/#build-and-push-an-image'],['Docker Hub','https://docs.docker.com/docker-hub/'],['OCI Distribution','https://github.com/opencontainers/distribution-spec']]
  },
  {
    track:'java', group:'分布式与高并发', id:'db-sequence-batch-not-gapless',
    title:'sequence 表批量取号省的是往返，不是“又连续又省库”',
    prompt:'为什么资料用 sequence 表 + 乐观锁发号，又写一次取 500 个缓存到本机可以减压，同时仍强调有序连续？',
    promptAnswer:'号段批量预取会有断号。要的是吞吐，不是连续无洞。',
    core:'单行 `UPDATE … WHERE id=?` 乐观锁可以在多机间发号，方向成立，但**热点行**与重试成本真实存在。一次预取 500 能降库压，资料改进方案对；它**必然留下缺口**：进程崩溃、重启、段未用完都会跳号，也难再承诺“连续”。把批量与“连续”写在同一优点列表里会自相矛盾。分库分表场景还要约定每段归属与时钟无关的单调范围。邻接 `distributed-unique-id`、`redis-cluster-incr-not-five-steps`、`snowflake-params-need-capacity-math`。',
    why:'业务用号段当连续票据序号，批量取号后对账发现空洞；或高峰打爆同一 sequence 行。',
    example:'`UPDATE seq SET val=val+500 WHERE name=\'order\' AND val=?` 成功后本机分配 `[val, val+500)`。机器挂掉则该段剩余作废，下一机从新高水位继续——号不连续但可唯一。要严格连续只能串行取 1，并接受吞吐上限。',
    task:'划掉“批量取号仍保证连续”。写出：批量换到什么；失去什么；崩溃时号段怎样。',
    answer:'划掉又省又连续。批量换吞吐、丢连续性；崩溃浪费未用段。要连续就别批量；要分布式唯一可接受缺口或换雪花。',
    keywords:'sequence 乐观锁 号段 断号',
    origin:'《分布式高并发.pdf》约第 194–195 页：sequence 表乐观锁；一次取 500 缓存',
    diagram:'diagrams/db-sequence-batch-not-gapless.svg',
    points:['乐观锁发号有热点行成本','批量预取会跳号','连续与吞吐要二选一偏置'],
    deep:[
      {title:'和多 Master 步长',body:'多主不同起点+相同步长是另一路并行，也不是 Cluster 自动拆号，见 Redis 发号课。'},
      {title:'怎样自己验证',body:'两进程批量取段，杀其一，观察号是否出现空洞且无重复。'}
    ],
    refs:[['MySQL：UPDATE','https://dev.mysql.com/doc/refman/8.4/en/update.html'],['MySQL：InnoDB 锁','https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html'],['RFC 9562（有序 UUID）','https://www.rfc-editor.org/rfc/rfc9562']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_91) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
