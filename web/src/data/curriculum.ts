import raw from './curriculum.json'
import type { Curriculum, Lesson, Track } from '@/types/curriculum'

export const curriculum = raw as unknown as Curriculum
const byId = new Map(curriculum.lessons.map(lesson => [lesson.id, lesson]))
const byTrack: Record<Track, Lesson[]> = {
  frontend: curriculum.lessons.filter(lesson => lesson.track === 'frontend'),
  java: curriculum.lessons.filter(lesson => lesson.track === 'java'),
}

export function lessonsFor(track: Track): Lesson[] {
  return byTrack[track]
}

export function groupsFor(track: Track): string[] {
  const present = new Set(lessonsFor(track).map((lesson) => lesson.group))
  return curriculum.groupOrder[track].filter((group) => present.has(group))
}

export function lessonsInGroup(track: Track, group: string): Lesson[] {
  return lessonsFor(track).filter((lesson) => lesson.group === group)
}

export function outlineFor(track: Track, group: string) {
  return curriculum.outline?.[track]?.[group] || []
}

export function findLesson(id: string): Lesson | undefined {
  return byId.get(id)
}

export function nextLesson(track: Track, id: string): Lesson | undefined {
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
