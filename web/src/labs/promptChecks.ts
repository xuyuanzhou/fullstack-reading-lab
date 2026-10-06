export type PromptDraft = {
  task: string
  materials: string
  format: string
  ifUnknown: string
  limits: string
}

export type PromptCheck = {
  id: string
  ok: boolean
  label: string
  detail: string
}

export const EMPTY_PROMPT: PromptDraft = {
  task: '',
  materials: '',
  format: '',
  ifUnknown: '',
  limits: '',
}

export const SAMPLE_PROMPT: PromptDraft = {
  task: '只根据下面的材料回答报销需要什么。',
  materials: '报销需要发票。年假有十天。会议室需要预约。',
  format: '',
  ifUnknown: '',
  limits: '不要补充材料里没有的规定。',
}

const UNKNOWN_FIX = '如果材料里没有答案，就说明材料里没有，不要编。'
const FORMAT_FIX = '用短句回答，并抄出依据的原句。'

export function assemblePrompt(draft: PromptDraft) {
  const materials = draft.materials.trim() || '（这次没有提供材料）'
  return [
    `任务\n${draft.task.trim() || '（还没有写任务）'}`,
    `只能依据的材料\n${materials}`,
    `输出\n${draft.format.trim() || '（还没有规定格式）'}`,
    `材料里没有答案时\n${draft.ifUnknown.trim() || '（还没有规定）'}`,
    `不要做\n${draft.limits.trim() || '（没有额外限制）'}`,
  ].join('\n\n')
}

export function reviewPrompt(draft: PromptDraft): PromptCheck[] {
  const blob = `${draft.task}\n${draft.materials}\n${draft.format}\n${draft.ifUnknown}\n${draft.limits}`
  const asksForPrivate = /材料|文档|制度|原文|条款/.test(draft.task)
  const remembers = /请记住|以后都|永远记住|下次还/.test(blob)
  const pretendsTool = /去网上|打开我的|查看桌面|自己查一下/.test(blob)
  const packed = assemblePrompt(draft).length > 4000
  return [
    {
      id: 'task',
      ok: draft.task.trim().length > 0,
      label: '写清这一次要做成什么',
      detail: '任务为空时，模型只能自己猜你要的形状。',
    },
    {
      id: 'format',
      ok: draft.format.trim().length > 0,
      label: '规定输出的形状',
      detail: '没有格式时，顺的一段话也会被当成完成。',
    },
    {
      id: 'unknown',
      ok: draft.ifUnknown.trim().length > 0,
      label: '写明材料里没有时怎么说',
      detail: '不给这个出口，模型会把句子接完，接完的那句往往像真的。',
    },
    {
      id: 'materials',
      ok: !asksForPrivate || draft.materials.trim().length > 0,
      label: '要依据材料时，材料就在这次输入里',
      detail: '任务提到材料或制度，却没有贴上文字，它只能靠原来的权重接。',
    },
    {
      id: 'memory',
      ok: !remembers,
      label: '不要把“请记住”当成会改模型',
      detail: '这句话只存在于这一次上下文，对话结束就不起作用。',
    },
    {
      id: 'tool',
      ok: !pretendsTool,
      label: '查文件和上网交给程序，不交给提示词',
      detail: '提示词不能打开桌面或网页。那是工具，要在 agent 里声明权限。',
    },
    {
      id: 'length',
      ok: !packed,
      label: '这次输入还没有长到容易挤掉前面的约束',
      detail: '这里数的是字符，不是词元。超过大约四千字时，把仍有效的约束放到最新一段。',
    },
  ]
}

export function applyPromptFixes(draft: PromptDraft): PromptDraft {
  return {
    ...draft,
    format: draft.format.trim() ? draft.format : FORMAT_FIX,
    ifUnknown: draft.ifUnknown.trim() ? draft.ifUnknown : UNKNOWN_FIX,
  }
}

export function promptDiff(previous: string, current: string) {
  if (!previous || previous === current) return { added: [] as string[], removed: [] as string[] }
  const before = previous.split('\n')
  const after = current.split('\n')
  const beforeSet = new Set(before)
  const afterSet = new Set(after)
  return {
    added: after.filter((line) => line.trim() && !beforeSet.has(line)),
    removed: before.filter((line) => line.trim() && !afterSet.has(line)),
  }
}
