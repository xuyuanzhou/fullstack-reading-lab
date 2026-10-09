# JAVA_AUDIT_95 — W3CSchool 续扫：生成列≠WHERE 包函数 / Redis ACL≠requirepass

| 主题 | 易错说法 | 公开课 |
| --- | --- | --- |
| 生成列 / 函数索引 | 有函数索引 = WHERE 可乱包函数 | `mysql-generated-column-not-where-wrap` |
| Redis ACL | 有 requirepass = 已做授权 | `redis-acl-not-just-requirepass` |

交叉：`mysql-where-func-blocks-index`、`mysql-implicit-convert-breaks-index`、`redis-lua-atomic`、`redis-functions-not-just-eval`。
