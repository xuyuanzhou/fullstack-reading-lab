# 前端资料核验记录：React 面试题.md（批次 13）

续核私人资料 `4-前端八股文-专题分类/6.5.React面试题.md`。本批处理 SSR「少请求 / 一份 HTML 带齐数据」，以及「HOC 完全替代 mixins」。公开课程独立撰写。

| 原件位置 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| SSR 专节优势列表 | 一个 HTML 返回所有数据；减少 HTTP；首屏不依赖 JS | **绝对化。** SSR 提供可看标记再 `hydrateRoot`；脚本与静态资源仍会请求；现行服务端 API 含流式输出。水合一致性见既有 `ssr-hydration`，RSC 分工见 `react-rsc-vs-client`。 | `react-ssr-not-fewer-http` |
| HOC vs mixins | class 后 mixins 不能用，HOC 效果一致且更政治正确 | **过时默认。** mixins 批评成立；复用状态逻辑的现行默认是自定义 Hook。HOC 是可选包装，不是唯一替身。 | `react-hooks-over-hoc` |

## 官方依据

- [React：hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
- [React：Server React DOM APIs](https://react.dev/reference/react-dom/server)
- [React：Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

本记录不是整份 Markdown 的全文验收。JSX 非强制、createElement 仍可用，方向可接受，不单开课。
