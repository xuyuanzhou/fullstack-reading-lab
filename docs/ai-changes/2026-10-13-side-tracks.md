# 九关下面单独列出四条并行补强

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | `docs/全栈路线补强与升级方案-2026-10-13.md` 第 10 节 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

补强方案要求保留九关作为默认入口，把前端工程化、云与平台、安全与合规、协作与职业化做成并行线，而不是塞回九关或铺成另一条长课表。

## 决策

- 采用：路线页地图下方单独一节「并行补强」，只链接已有课。90 天清单增加压缩版最小覆盖。README 指向作品 A/B/C，并把云上交付的 D 留在 26 周版本。
- 不采用 / 刻意不做：不把四条补强写入 `MASTERY_GATES`，不改变过关、脊柱上下课和交付勾选。不新开 Next.js、Helm、Terraform、VPC 或合规条文课。没有对应课的主题只写「不排进九关」。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/sideTracks.ts` | 四条补强：进入时机、已有课 id、作品证据、暂不排进九关的主题 |
| `web/src/components/SideTracks.tsx` | 地图下方渲染；课链用完整课名 |
| `web/src/pages/PathPage.tsx` | 地图滚动区之后挂上该节 |
| `web/src/styles/_reading.scss` | `.path-sides` 卡片；宽容器两列 |
| `web/src/data/learningPaths.ts` | 架构师路线导语说明四条补强另计 |
| `docs/90天冲高级全栈主线清单.md` | 第 2.1 节，三行最小覆盖；作品 D 留在 26 周 |
| `README.md` | 默认入口仍是九关，并链到清单与方案 |
| `docs/全栈路线补强与升级方案-2026-10-13.md` | 第 10 节记已落地 |

## 验证

- 课 id 对照 `web/src/data/curriculum-index.json`：24 个都能找到，分组都有路由键。
- 浏览器 `http://localhost:5174/#/paths`：九颗关卡石仍在；「并行补强」下列出四条标题。课链 `#/frontend/typescript/ts-narrowing` 打开「判别联合与穷尽检查」。
- 课名改为全文后，`http://localhost:5173/#/paths` 上对象级授权链到「登录了，也不等于能读这条数据」。5174 当时已退出。
- 未改课程正文，未跑课程导出。

## 后续

- 完整培养范围与后续实验规划已由 [全栈完整路线规划](2026-10-13-fullstack-complete-roadmap.md) 接续；原实现仍保持不变。新版按能力证据规划 Java、React、Vue 和云实验，不再把“26 周”或“只链接已有课”作为所有后续工作的固定限制。
- [ ] 不要把这四条写进 `MASTERY_GATES` 或按 `gateId:index` 插交付物。
- [ ] 不要为 Helm、Terraform、Next.js、等保新开课，除非方案改口。
- [ ] 补强课链用完整课名。`shortTitle` 会在逗号处截断，「登录了，也不等于能读这条数据」会只剩「登录了」。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/sideTracks.ts`、`web/src/components/SideTracks.tsx`、`docs/全栈路线补强与升级方案-2026-10-13.md` 第 10 节
3. 若续作：只加已有课 id；缺课的主题继续写在 `hold`
4. 禁区：不改九关 id（g1–g6 / g-auth / g-test / g-triage / g4 / g5 / g6），不把补强算进过关
