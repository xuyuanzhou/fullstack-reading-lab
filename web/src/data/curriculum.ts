import indexRaw from './curriculum-nav.json?raw'
import type { Curriculum, Lesson, Track } from '@/types/curriculum'

/** Nav / list / search card — core and body fields load with the track pack. */
export type LessonSummary = Pick<
  Lesson,
  'track' | 'group' | 'id' | 'title' | 'prompt' | 'keywords' | 'points'
> & {
  promptAnswer?: string
  since?: string
}

type CurriculumIndex = Omit<Curriculum, 'lessons'> & {
  lessons: LessonSummary[]
}

type LessonBody = Partial<
  Pick<
    Lesson,
    | 'core'
    | 'why'
    | 'example'
    | 'task'
    | 'answer'
    | 'deep'
    | 'map'
    | 'references'
    | 'diagram'
    | 'origin'
    | 'react'
    | 'vue'
  >
>

export const curriculum = JSON.parse(indexRaw) as CurriculumIndex
const byId = new Map(curriculum.lessons.map((lesson) => [lesson.id, lesson]))
const byTrack: Record<Track, LessonSummary[]> = {
  frontend: curriculum.lessons.filter((lesson) => lesson.track === 'frontend'),
  java: curriculum.lessons.filter((lesson) => lesson.track === 'java'),
}

const bodyModules = import.meta.glob('./bodies/*/*.json', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const lessonReady = new Map<string, LessonBody>()
const lessonPending = new Map<string, Promise<LessonBody>>()

function bodyPath(track: Track, id: string) {
  return `./bodies/${track}/${id}.json`
}

function loadLessonBody(track: Track, id: string) {
  const cached = lessonReady.get(id)
  if (cached) return Promise.resolve(cached)
  const pending = lessonPending.get(id)
  if (pending) return pending
  const load = bodyModules[bodyPath(track, id)]
  const next = (load ? load() : Promise.resolve('{}')).then((raw) => {
    const body = JSON.parse(raw) as LessonBody
    lessonReady.set(id, body)
    lessonPending.delete(id)
    return body
  }).catch((error: unknown) => {
    lessonPending.delete(id)
    throw error
  })
  lessonPending.set(id, next)
  return next
}

function lessonFrom(summary: LessonSummary, body: LessonBody): Lesson {
  return {
    ...summary,
    core: body.core || '',
    why: body.why || '',
    example: body.example || '',
    task: body.task || '',
    answer: body.answer || '',
    references: body.references || [],
    ...body,
  } as Lesson
}

export function lessonsFor(track: Track): LessonSummary[] {
  return byTrack[track]
}

export function groupsFor(track: Track): string[] {
  const present = new Set(lessonsFor(track).map((lesson) => lesson.group))
  return curriculum.groupOrder[track].filter((group) => present.has(group))
}

export function lessonsInGroup(track: Track, group: string): LessonSummary[] {
  return lessonsFor(track).filter((lesson) => lesson.group === group)
}

export function outlineFor(track: Track, group: string) {
  return curriculum.outline?.[track]?.[group] || []
}

/** Sync lookup for menus, home, knowledge, redirects — may lack body fields. */
export function findLesson(id: string): LessonSummary | undefined {
  return byId.get(id)
}

/** Already-loaded lesson, so a route change can paint without waiting on a promise. */
export function peekFullLesson(id: string): Lesson | undefined {
  const summary = byId.get(id)
  const body = lessonReady.get(id)
  if (!summary || !body) return undefined
  return lessonFrom(summary, body)
}

/** Full lesson for the reading page. Loads that lesson's file, not the whole track. */
export async function loadFullLesson(id: string): Promise<Lesson | undefined> {
  const summary = byId.get(id)
  if (!summary) return undefined
  const body = await loadLessonBody(summary.track, id)
  return lessonFrom(summary, body)
}

/** Warm the next lesson before the click, so the jump does not wait on a track pack. */
export function prefetchLessonBody(id: string) {
  const summary = byId.get(id)
  if (!summary || lessonReady.has(id)) return
  void loadLessonBody(summary.track, id).catch(() => {})
}

export function prefetchLessonBodies(ids: readonly string[]) {
  for (const id of ids) prefetchLessonBody(id)
}

export function nextLesson(track: Track, id: string): LessonSummary | undefined {
  const list = lessonsFor(track)
  const index = list.findIndex((lesson) => lesson.id === id)
  return index >= 0 ? list[index + 1] : undefined
}

export function lessonIndex(track: Track, id: string): number {
  return lessonsFor(track).findIndex((lesson) => lesson.id === id)
}

export const totals = {
  lessons: curriculum.lessons.length,
  frontend: lessonsFor('frontend').length,
  java: lessonsFor('java').length,
}

/**
 * Side-nav / lesson chips: only show introduction-boundary labels
 * (year, RFC/JEP, HTTP/TLS, ES6). Soft product baselines stay in data
 * but are not painted as「自 …」.
 */
export function isVersionSince(since?: string): boolean {
  if (!since || since.trim().length < 2) return false
  return /\d|RFC\b|JEP\b|HTTP\/|TLS\b|ES6\b/i.test(since)
}
