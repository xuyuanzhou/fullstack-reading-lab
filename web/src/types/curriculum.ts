export type Track = 'frontend' | 'java'

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
  core: string
  why: string
  example: string
  task: string
  answer: string
  keywords: string
  points: string[]
  references: [string, string][]
  deep?: DeepPart[]
  diagram?: string
  origin?: string
  react?: string
  vue?: string
}

export type Curriculum = {
  generatedAt: string
  groupOrder: Record<Track, string[]>
  pathLead: Record<Track, Record<string, string[]>>
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
}
