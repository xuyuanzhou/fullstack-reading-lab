import rawIndex from './curriculum-index.json'
import type { Curriculum, Lesson, Track } from '@/types/curriculum'

/** Nav / list / search card — core and body fields load with the track pack. */
export type LessonSummary = Pick<
  Lesson,
  'track' | 'group' | 'id' | 'title' | 'prompt' | 'keywords' | 'points'
> & {
  promptAnswer?: string
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

export const curriculum = rawIndex as unknown as CurriculumIndex
const byId = new Map(curriculum.lessons.map((lesson) => [lesson.id, lesson]))
const byTrack: Record<Track, LessonSummary[]> = {
  frontend: curriculum.lessons.filter((lesson) => lesson.track === 'frontend'),
  java: curriculum.lessons.filter((lesson) => lesson.track === 'java'),
}

const bodiesCache: Partial<Record<Track, Promise<Record<string, LessonBody>>>> = {}

function loadBodies(track: Track) {
  if (!bodiesCache[track]) {
    const loader =
      track === 'frontend'
        ? import('./curriculum-bodies-frontend.json')
        : import('./curriculum-bodies-java.json')
    bodiesCache[track] = loader.then(
      (mod) => (mod.default || mod) as unknown as Record<string, LessonBody>,
    )
  }
  return bodiesCache[track]!
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

/** Full lesson for the reading page; loads only that track's bodies chunk. */
export async function loadFullLesson(id: string): Promise<Lesson | undefined> {
  const summary = byId.get(id)
  if (!summary) return undefined
  const bodies = await loadBodies(summary.track)
  const body = bodies[id] || {}
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

/** Prefetch a track pack (e.g. when switching to that route). */
export function prefetchTrackBodies(track: Track) {
  void loadBodies(track)
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
  points: curriculum.lessons.reduce((sum, lesson) => sum + lesson.points.length, 0),
  frontend: lessonsFor('frontend').length,
  java: lessonsFor('java').length,
}
