import cardsRaw from './curriculum-cards.json?raw'
import { curriculum } from './curriculum'

type LessonCard = {
  id: string
  prompt?: string
  promptAnswer?: string
  keywords?: string
  points?: string[]
}

const cards = JSON.parse(cardsRaw) as LessonCard[]
const byId = new Map(cards.map((card) => [card.id, card]))

for (const lesson of curriculum.lessons) {
  const card = byId.get(lesson.id)
  if (!card) continue
  if (card.prompt !== undefined) lesson.prompt = card.prompt
  if (card.promptAnswer !== undefined) lesson.promptAnswer = card.promptAnswer
  if (card.keywords !== undefined) lesson.keywords = card.keywords
  if (card.points) lesson.points = card.points
}

export const pointTotal = cards.reduce((sum, card) => sum + (card.points?.length ?? 0), 0)
