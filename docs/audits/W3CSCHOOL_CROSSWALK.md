# W3CSchool / 现代 JS 主题 → 本站课 id

借鉴目录主题，不照搬页文。下列为 2026-10-09 补全批次对照。

## 前端 · 语言 / 浏览器

| 主题 | 本站课 |
| --- | --- |
| 可选链 / ?? | `js-optional-chaining` |
| Proxy 陷阱 | `js-proxy-get-set-trap` |
| class extends / super | `js-class-extends-super`（原型总览见 `js-prototype-chain`） |
| # 私有字段 | `js-private-field-hash` |
| Promise 链 / 错误 | `promise-chain` |
| Promise.all / allSettled | `promise-all-and-settled` |
| async/await | `js-async-await` |
| 微任务与宏任务 | `eventloop`、`js-microtask-vs-macrotask` |
| 定时器 | `js-timer-fn-not-string` |
| FormData 上传 | `formdata-multipart-upload` |
| localStorage | `browser-storage` |
| sessionStorage | `session-storage-tab-only` |
| IndexedDB | `indexeddb-when-needed` |
| DOM 事件流 | `dom-event-flow` |

## 前端 · 网络

| 主题 | 本站课 |
| --- | --- |
| HTTP 方法 | `http-methods`、`http-create-post-not-put` |
| Content-Type | `http-content-type-body` |
| Cookie / SameSite | `cookie-set-attributes`、`cookie-credential`、`fetch-credentials` |
| CORS | `cors`、`cors-credentials-allowlist` |
| 长轮询 / WebSocket | `long-poll-vs-websocket` |
| 中止请求 | `fetch-abort` |

## Java · Redis / MySQL

| 主题 | 本站课 |
| --- | --- |
| 数据类型总览 | `redis-data-types` |
| Hash 字段更新 | `redis-hash-field-update` |
| ZSet 排行 | `redis-zset-rank-range` |
| HyperLogLog | `redis-hyperloglog-approx` |
| Stream vs Pub/Sub | `redis-stream-vs-pubsub` |
| PSUBSCRIBE 模式 | `redis-pubsub-pattern-subscribe` |
| INNER JOIN | `mysql-inner-join-match` |
| 外连接 WHERE 陷阱 | `sql-outer-join-where` |
| GROUP BY / HAVING | `mysql-where-having`、`mysql-group-by-having` |
| VIEW 机制 | `mysql-view-is-stored-query` |

## 微前端 / D8

| 主题 | 本站课 |
| --- | --- |
| 选型对照 | `mfe-compare-matrix`、`mfe-pick-by-constraint` |
| Federation 接通 | `mfe-mf-host-setup`、`mfe-shared-deps` |
| qiankun container | `mfe-qiankun-html-entry`、`mfe-runtime-lifecycle` |
| DNS LB / TTL | `dns-lb-not-just-round-robin` |
| 墙钟锁 / FOR UPDATE | `redis-lock-getset-wall-clock`、`mysql-for-update-not-dist-lease` |

## 第二轮（2026-10-09）

已补：Proxy / extends / `#` 私有、PSUBSCRIBE、VIEW。加厚：`js-prototype-chain`、`redis-stream-vs-pubsub`。

下一轮可继续扫：Iterator / Generator 细边界、Fetch 流式读取、MySQL 存储过程「只是例程不是自动事务」、Redis 事务 vs Lua 对照加厚（已有 `redis-transaction` / `redis-lua-atomic` 则只交叉链接）。
