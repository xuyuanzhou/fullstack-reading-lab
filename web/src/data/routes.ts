import { curriculum } from '@/data/curriculum'
import type { Track } from '@/types/curriculum'

/** Display names stay Chinese. Route segments use these keys only. */
const GROUP_KEYS: Record<Track, Record<string, string>> = {
  frontend: {
    全栈主线: 'fullstack',
    语言基础: 'language',
    TypeScript: 'typescript',
    'CSS 与布局': 'css',
    浏览器: 'browser',
    '网络与安全': 'network',
    安全: 'security',
    React: 'react',
    'React 生态': 'react-ecosystem',
    'React Native': 'react-native',
    Flutter: 'flutter',
    Vue: 'vue',
    'Vue 生态': 'vue-ecosystem',
    'UniApp 与 Taro': 'uniapp-taro',
    技术选型: 'selection',
    'Node.js': 'node',
    测试: 'testing',
    版本边界: 'versions',
    工程实践: 'engineering',
  },
  java: {
    全栈主线: 'fullstack',
    'Java 基础': 'java-basics',
    算法: 'algorithms',
    设计模式: 'patterns',
    JVM: 'jvm',
    并发: 'concurrency',
    数据库: 'database',
    缓存: 'cache',
    Spring: 'spring',
    JPA: 'jpa',
    MyBatis: 'mybatis',
    'Spring Cloud Alibaba': 'spring-cloud-alibaba',
    消息队列: 'messaging',
    Nginx: 'nginx',
    Netty: 'netty',
    网关: 'gateway',
    搜索: 'search',
    系统设计: 'system-design',
    '分布式与高并发': 'distributed',
    '交付与运行': 'delivery',
    安全: 'security',
    测试: 'testing',
    版本边界: 'versions',
    工程实践: 'engineering',
  },
}

export type CourseGroup = { key: string; label: string }

const labelByKey: Record<Track, Map<string, string>> = {
  frontend: new Map(),
  java: new Map(),
}

for (const track of ['frontend', 'java'] as const) {
  for (const label of curriculum.groupOrder[track]) {
    const key = GROUP_KEYS[track][label]
    if (!key) throw new Error(`missing route key for ${track} / ${label}`)
    if (labelByKey[track].has(key)) throw new Error(`duplicate route key ${track} / ${key}`)
    labelByKey[track].set(key, label)
  }
}

export function isTrack(value: string | undefined): value is Track {
  return value === 'frontend' || value === 'java'
}

export function courseGroups(track: Track): CourseGroup[] {
  return curriculum.groupOrder[track]
    .filter((label) => curriculum.lessons.some((lesson) => lesson.track === track && lesson.group === label))
    .map((label) => ({ key: GROUP_KEYS[track][label], label }))
}

export function groupKeyForLabel(track: Track, label: string): string {
  return GROUP_KEYS[track][label] || ''
}

export function groupLabel(track: Track, key: string): string {
  return labelByKey[track].get(key) || ''
}

export function groupPath(track: Track, key: string): string {
  return `/${track}/${key}`
}

export function lessonPath(lesson: { track: Track; group: string; id: string }): string {
  const key = groupKeyForLabel(lesson.track, lesson.group)
  if (!key) throw new Error(`missing route key for lesson ${lesson.id}`)
  return `/${lesson.track}/${key}/${lesson.id}`
}

export function resumePath(track: Track, preferredKey: string): string {
  const groups = courseGroups(track)
  const key = groups.some((group) => group.key === preferredKey) ? preferredKey : groups[0]?.key
  return key ? groupPath(track, key) : '/frontend/fullstack'
}
