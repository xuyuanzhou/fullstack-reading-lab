# 构建与渲染补上 Webpack

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 技能树前端组 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

构建与渲染只有 Vite 和「服务端渲染」。课库里有一课专门讲 Webpack 的 `devtool`，星图上没有对应印章。

## 决策

- 采用：在「构建与渲染」里、Vite 和「服务端渲染」之间加 `webpack`。前置是 JavaScript，与 Vite 相同。只挂 `webpack-eval-sourcemap-dev-only`。总数 93。
- 不采用 / 刻意不做：不新写课文。不把拆包、缓存课从 Vite 挪走。不把 Module Federation 从微前端挪到这枚印章。不改点亮规则，不把 Webpack 写进浏览器场景的点亮顺序。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | `webpack` 技能、课文、视图 |
| `web/src/components/learning/SkillSigil.tsx` | 方格线稿，不用品牌标志 |
| `scripts/learning-platform.test.mjs` | 总数 93，组名与课文断言 |

## 验证

```bash
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：22 项通过。
- `#/skills` 展开「构建与渲染 0 / 3」：Vite、Webpack、服务端渲染。页头计 0/93，前端列 0/23，前端干线 0/24。点开 Webpack 进入 `webpack-eval-sourcemap-dev-only`。

## 后续

- [ ] 课库若再写出 Webpack 配置、loader 或拆包专课，挂到这枚印章上，不要另开一组
- [ ] 不要把 `build-code-splitting`、`build-cache` 从 Vite 拆走，除非课文改成只讲 Webpack
- [ ] 不要把 `mfe-*` 挂到 Webpack

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/learningSkills.ts` 的 `webpack`，以及 `web/src/data/bodies/frontend/webpack-eval-sourcemap-dev-only.json`
3. 若续作：先有课文再加印章；目前这一课讲的是开发用 `eval` 系 source map、生产用 `hidden-source-map` 或私有上传
4. 禁区：勿改 `gateCleared`；勿把已读课重置；勿用 Webpack 标志
