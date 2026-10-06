import type { Track } from '@/types/curriculum'

export const STORAGE_KEY = 'fullstack-learning-lab-v3'

export const TRACK_LABEL: Record<Track, string> = {
  frontend: '前端工程',
  java: 'Java 后端',
}

export const LOCAL_CATEGORY_LABEL = {
  frontend: '前端',
  java: 'Java',
  ai: 'AI',
} as const

export const TRACK_INTRO: Record<Track, string> = {
  frontend:
    '语言基础从相等、作用域、this、原型，到闭包、Promise、async 和事件循环。接着是类型、盒模型与定位、页面与浏览器帧，然后是各框架。技术选型按交付面只留一套更新模型和它的生态槽位，再进入测试和工程。',
  java:
    'Java 基础从类型、equals、字符串和集合，再进入算法、内存和线程。之后按 Spring、JPA、MyBatis、缓存、Nginx、Netty、网关、搜索分章；Spring Cloud Alibaba 按 Nacos、调用、Sentinel、Seata 排障，再是消息与分布式。',
}

export const REACT_BASE =
  'https://xuyuanzhou.github.io/react-mastery-lab/#/learn?chapter='
export const REACT_CHAPTERS: Record<string, string> = {
  hooks: 'React原理精通/04-useState与UpdateQueue.md',
  scheduler: 'React原理精通/08-Lane与Scheduler.md',
  fiber: 'React原理精通/01-Fiber数据结构与双缓冲.md',
  pipeline: 'React原理精通/00C-从编译入口到浏览器像素-完整渲染链路.md',
  diff: 'React原理精通/06-Reconciliation与Diff.md',
  effects: 'React原理精通/05-Effect系统.md',
  events: 'React原理精通/13-React事件系统.md',
  architecture: 'React原理精通/25-Profiler与性能工程.md',
}

export const VUE_BASE = 'https://xuyuanzhou.github.io/vue3-mastery-lab/#/learn/'
export const VUE_CHAPTERS: Record<string, string> = {
  javascript: 'javascript',
  reactive: 'reactive',
  computed: 'computed',
  diff: 'keyed-diff',
  scheduler: 'scheduler',
  optimization: 'optimization',
  teleport: 'basic-teleport',
  props: 'basic-props',
  composition: 'basic-composables',
  compiler: 'compiler',
  router: 'router',
  pinia: 'pinia',
  ssr: 'ssr',
}

export const AUDIT_CASES = [
  {
    title: '事件委派的位置',
    wrong: '“React 的所有事件都绑定到 document”',
    right: 'React 19 的许多事件监听关联根容器，另有特殊事件路径。',
    href: 'https://github.com/facebook/react/blob/v19.3.0/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js',
  },
  {
    title: '停止传播与默认行为',
    wrong: '“stopPropagation 无效，要用 preventDefault 阻止冒泡”',
    right: 'stopPropagation 控制传播；preventDefault 控制浏览器默认行为。',
    href: 'https://react.dev/learn/responding-to-events',
  },
  {
    title: '状态更新与快照',
    wrong: '“setState 默认异步，因此立刻读取会得到旧值”',
    right: '解释当前渲染的状态快照、更新队列和批处理，避免把旧实现术语用于现代 Hooks。',
    href: 'https://react.dev/learn/state-as-a-snapshot',
  },
  {
    title: 'Effect 与浏览器绘制',
    wrong: '“useEffect 一定在绘制后运行”',
    right: '绘制相对时序受触发路径影响，不能用绝对措辞描述所有情况。',
    href: 'https://react.dev/reference/react/useEffect',
  },
] as const

export function reactUrl(topic: string) {
  return REACT_BASE + encodeURIComponent(REACT_CHAPTERS[topic] || topic)
}

export function vueUrl(topic: string) {
  return VUE_BASE + encodeURIComponent(VUE_CHAPTERS[topic] || topic)
}
