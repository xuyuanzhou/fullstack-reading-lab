# 打开网站和顶栏学习路线进总图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `#/paths`；课表页 `/:track/:groupKey` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

打开网站和顶栏「学习路线」落到上一章课表。总图还要再点一次。顶栏和 `#/paths` 都叫学习路线，点顶栏却离开总图。

## 决策

- 采用：`/`、`/home`、未知地址、顶栏「学习路线」和左上角标志都进 `#/paths`，不带 `?gate=`。在某一关里再点一次，回到总图。课文面包屑第一项也进总图，本章名称仍回课表。
- 采用：课表页留在原来的地址。侧栏切前端、Java，以及章内「继续学习」，仍走课表。课表上的「点亮技能树」留着。
- 不采用 / 刻意不做：不把总图嵌进课表。不把首页打开成某一关营地。不改九关和过关规则。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/App.tsx` | 首页和未知地址改到 `/paths` |
| `web/src/components/AppLayout.tsx` | 顶栏和标志进总图；只有总图点亮「学习路线」 |
| `web/src/pages/LessonPage.tsx` | 面包屑「学习路线」进总图 |
| `web/src/components/ReadingBoundary.tsx` | 出错后的返回直接去总图 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：类型检查通过。
- 浏览器：`#/home` 落到 `#/paths`，标题「架构师主线」，顶栏「学习路线」为当前页，没有 `?gate=`。
- 课表 `#/java/spring` 上顶栏没有当前项。点「学习路线」进总图，没有 `.route-fx`。
- `#/paths?gate=g1` 再点「学习路线」，地址回到 `#/paths`，标题仍是「架构师主线」。
- 课文面包屑是「学习路线 → `#/paths`」「Spring → `#/java/spring`」。目录里点 Spring 仍打开课表。

## 后续

- [x] 打开网站和顶栏进总图
- [ ] 不要把 `/` 或顶栏「学习路线」改回某一章课表

## 给下一模型

1. 先读：本文、`web/src/App.tsx` 的 index 路由、`web/src/components/AppLayout.tsx` 的 `homeTo`
2. 课表仍是 `/:track/:groupKey`。侧栏切轨道用 `resumePath`
3. 禁区：勿改 `gateCleared`；勿把已点亮写成认证；课表进总图不要改回 `warp`
