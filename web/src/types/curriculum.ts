export type Track = 'frontend' | 'java'
export type LocalCategory = Track | 'ai'

export type DeepPart = {
  title: string
  body: string
}

export type Lesson = {
  track: Track
  group: string
  id: string
  title: string
  prompt: string
  promptAnswer?: string
  core: string
  why: string
  example: string
  task: string
  answer: string
  keywords: string
  points: string[]
  references: [string, string][]
  deep?: DeepPart[]
  map?: DeepPart[]
  diagram?: string
  origin?: string
  react?: string
  vue?: string
}

export type OutlineSection = {
  title: string
  ids: string[]
}

export type Curriculum = {
  schemaVersion: number
  groupOrder: Record<Track, string[]>
  groupLabels?: Record<Track, Record<string, string>>
  pathLead: Record<Track, Record<string, string[]>>
  outline?: Record<Track, Record<string, OutlineSection[]>>
  lessons: Lesson[]
}

export type ProgressState = {
  track: Track
  group: string
  done: string[]
  review: string[]
  recent: string[]
  notes: Record<string, string>
  theme: 'light' | 'dark'
  query: string
  audit: Record<string, { note: string; status: string }>
  localQuery: string
  localTopic: string
  localCategory: LocalCategory
  /** Monotonic write counter so a stale tab cannot blank a newer tab's notes. */
  revision: number
}
