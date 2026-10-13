# 首页、关卡、子关三种转场

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | docs/页面转场效果测试-2026-10-13.md |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

首页、关卡列表和课文之间原来是直接换页。需要三种不同的短过场，并在减少动态效果和低性能设备上停掉或简化。音效不能自动播。

## 决策

- 采用：路由遮罩。首页进 `/paths` 用 WebGL 星云；进入课文用左右拼接加 Canvas 粒子；返回用 CSS 3D 拉远。时长 900–1200 毫秒。音效用 Web Audio，默认关。
- 不采用 / 刻意不做：不给知识库等其它页加这套过场。不放音频文件。不把音效开关写进学习记录。不全屏频闪。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/transition/*` | 场景、性能档、WebGL、音效、遮罩 |
| `web/src/styles/_transition.scss` | 拼接、拉远、扫描线和扫边 |
| `web/src/components/AppLayout.tsx` | 挂上遮罩和音效开关 |
| `scripts/page-transition.test.mjs` | 场景和降级 |
| `docs/页面转场效果测试-2026-10-13.md` | 效果说明和浏览器结果 |

```ts
if (start === 'home' && end === 'levels') return 'warp'
if (end === 'sub') return 'splice'
if (depth[end] < depth[start]) return 'pullback'
```

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json && npm test
```

- 结果：类型检查通过。54 项测试通过。浏览器见测试文档里的五次切换：穿梭、拼接、拉远、窄屏、减少动态效果。

## 后续

- [ ] 音效保持默认关闭。不要在转场模块里自动 `localStorage.setItem('fs-transition-audio','on')`。
- [ ] 新页面若也要过场，只扩展 `pageScene`，不要在知识库路由上复用星云。
- [ ] WebGL 画布卸载时继续调用 `WEBGL_lose_context`，避免上下文占满。
