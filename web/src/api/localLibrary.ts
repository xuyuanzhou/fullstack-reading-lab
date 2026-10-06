export type LocalStats = {
  imported: number
  count: number
  emptyText: number
}

export type SubjectRow = {
  subject: string
  count: number
}

export type CatalogItem = {
  id: string
  title: string
  path: string
  format: string
  subject?: string
  snippet?: string
}

export type ItemPayload = {
  id: string
  title: string
  path: string
  format: string
  subject?: string
  page: number
  pages: number
  text?: string
  candidateText?: string
  ocrError?: string
  hasFullText?: boolean
  websites?: string[]
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, options)
  const data = (await response.json()) as T & { error?: string }
  if (!response.ok) throw new Error(data.error || '读取失败')
  return data
}

export async function probeLocalLibrary(): Promise<boolean> {
  try {
    const response = await fetch('/api/stats')
    return response.ok
  } catch {
    return false
  }
}

export const localApi = {
  stats: () => request<LocalStats>('/api/stats'),
  subjects: (category: string) =>
    request<{ total: number; subjects: SubjectRow[] }>(
      `/api/subjects?category=${encodeURIComponent(category)}`,
    ),
  catalog: (params: {
    category: string
    q?: string
    topic?: string
    offset?: number
    limit?: number
  }) => {
    const query = new URLSearchParams({
      category: params.category,
      q: params.q || '',
      topic: params.topic || '',
      offset: String(params.offset || 0),
      limit: String(params.limit || 100),
    })
    return request<{ items: CatalogItem[]; total: number; hasMore?: boolean }>(
      `/api/catalog?${query}`,
    )
  },
  search: (params: { category: string; q: string; offset?: number }) => {
    const query = new URLSearchParams({
      category: params.category,
      q: params.q,
      offset: String(params.offset || 0),
    })
    return request<{ items: CatalogItem[]; hasMore?: boolean }>(`/api/search?${query}`)
  },
  reindex: () => request<{ ok?: boolean }>('/api/reindex', { method: 'POST' }),
  item: (id: string, page: number) =>
    request<ItemPayload>(`/api/item?id=${encodeURIComponent(id)}&page=${page}`),
  ocr: (id: string, page: number) =>
    request<{ text: string }>(`/api/ocr?id=${encodeURIComponent(id)}&page=${page}`),
  parsed: (id: string) =>
    request<{ text: string }>(`/api/parsed?id=${encodeURIComponent(id)}`),
  mediaUrl: (id: string, page: number) =>
    `/api/media?id=${encodeURIComponent(id)}&page=${page}`,
}
