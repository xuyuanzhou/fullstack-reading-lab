import type { Track } from '@/types/curriculum'

export const STORAGE_KEY = 'fullstack-learning-lab-v3'

export const TRACK_LABEL: Record<Track, string> = {
  frontend: '前端',
  java: 'Java',
}

export const LOCAL_CATEGORY_LABEL = {
  frontend: '前端',
  java: 'Java',
  ai: 'AI',
} as const

export const TRACK_INTRO: Record<Track, string> = {
  frontend:
    '从页面怎么把一次请求交到后端开始。先学 JavaScript、类型和 CSS，再学浏览器和网络，然后才是 React、Vue 和跨端。选型只留一套，最后才是测试和工程。',
  java:
    '从一次写入怎么进数据库开始。先学 Java、算法和 JVM，再学库和缓存，然后才是 Spring。消息、网关和微服务放在后面，最后是架构、部署和工程。',
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
  {
    title: '方法区不是永久代',
    wrong: '“方法区就是永久代，类元数据占 PermGen”',
    right: 'HotSpot 在 JDK 8 去掉永久代。类元数据在 Metaspace，由本地内存管理，不是堆里的 PermGen。',
    href: 'https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-2.html#jvms-2.5.4',
  },
  {
    title: 'Query Cache 不是现行调优项',
    wrong: '“把 query_cache_size 当作 MySQL 8 的常规调优”',
    right: 'Query Cache 已在 MySQL 8.0 移除。现行版本没有这些参数，不能再当默认建议。',
    href: 'https://dev.mysql.com/doc/refman/8.4/en/query-cache.html',
  },
  {
    title: 'Ingress 对象自己不开外网',
    wrong: '“apply 一份 Ingress，主机名就会通”',
    right: 'Ingress 只声明 HTTP 规则。必须有 Ingress 控制器执行规则；没有控制器时对象在，地址仍空。',
    href: 'https://kubernetes.io/docs/concepts/services-networking/ingress/',
  },
] as const

export function reactUrl(topic: string) {
  return REACT_BASE + encodeURIComponent(REACT_CHAPTERS[topic] || topic)
}

export function vueUrl(topic: string) {
  return VUE_BASE + encodeURIComponent(VUE_CHAPTERS[topic] || topic)
}
