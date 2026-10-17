/** 每一关一场 Boss。这一关每一课抽一题，有多选就用多选，单独记分。 */

import { BOSS_DISTRACTORS } from './bossDistractors.ts'
import { MASTERY_GATES } from './masteryGates.ts'
import type { DrillCourse, DrillGate, DrillPoint, DrillQuestion, OptionId } from './drillBank.ts'

export const BOSS_COURSE: DrillCourse = {
  id: 'boss',
  title: 'Boss',
  lead: '每一关一场考试。答完这一场，正确率达到 80%，这一关才算通过。',
}

let gates: DrillGate[] = []
let questions = new Map<string, DrillQuestion>()
let extraPoints = new Map<string, DrillPoint>()

/** 课文结论只有一句、章节里没有题的课。只进这一关的考试。 */
const GAPS: {
  lessonId: string
  title: string
  summary: string
  stem: string
  answer: DrillQuestion['answer']
  options: DrillQuestion['options']
  explain: string
  whyWrong: DrillQuestion['whyWrong']
}[] = [
  {
    lessonId: 'docker-image-run',
    title: '先构建再启动',
    summary: 'Dockerfile 写成镜像，docker build 打标签，docker run 用这个镜像启动容器。',
    stem: '怎样把当前目录的应用变成一个可以 docker run 的镜像？',
    answer: 'b',
    options: [
      { id: 'a', text: '把源码目录挂进生产容器，运行中的改动会写回镜像。' },
      { id: 'b', text: '写 Dockerfile，用 docker build 打标签，再用 docker run 启动。' },
      { id: 'c', text: 'docker run 会先编译 Dockerfile，不需要单独构建。' },
      { id: 'd', text: '把目录打成压缩包放进任意桶，容器启动时会自己当成镜像。' },
    ],
    explain: '镜像来自 Dockerfile 的构建。docker build 打出带标签的镜像，docker run 用这个镜像启动容器。',
    whyWrong: {
      a: '挂载目录不会生成镜像，运行中改的文件也不写回镜像层。',
      c: 'docker run 启动的是已经构建好的镜像，不会代替 docker build。',
      d: '压缩包不是镜像。要先 build 出镜像，再由仓库提供拉取。',
    },
  },
  {
    lessonId: 'docker-registry-not-just-repo-bucket',
    title: '端点不是名空间',
    summary: 'Registry 是服务端点，Repository 是镜像名空间。两者不是一个大桶。',
    stem: 'Registry 和 Repository 可以当成同一个存放镜像的桶吗？',
    answer: 'c',
    options: [
      { id: 'a', text: '可以。两者都只是对象存储里的一个目录，名字能够互换。' },
      { id: 'b', text: 'Repository 是拉取镜像的服务地址，Registry 只是其中一个标签。' },
      { id: 'c', text: '不可以。Registry 是服务端点，Repository 是镜像名空间。' },
      { id: 'd', text: '可以。把镜像文件放进任意桶，docker pull 会按桶名找到它。' },
    ],
    explain: 'Registry 是提供存放和拉取的服务端点。Repository 是这个端点上的镜像名空间。把两者混成一个大桶，就分不清地址和名字。',
    whyWrong: {
      a: '端点和名空间不是同一个目录，名字不能互换。',
      b: '服务地址是 Registry。Repository 是镜像名，不是端点。',
      d: '任意文件桶不会响应 docker pull。拉取走的是 Registry 上的镜像名。',
    },
  },
  {
    lessonId: 'gha-what-it-is',
    title: '仓库里的作业',
    summary: 'GitHub Actions 按仓库里的工作流，在 runner 上执行这次构建和测试。它不是持续集成的定义。',
    stem: '代码推进 GitHub 之后，谁按仓库里写的步骤去构建和跑测试？',
    answer: 'a',
    options: [
      { id: 'a', text: 'GitHub Actions。工作流写在仓库的 YAML 里，事件触发后在 runner 上执行作业。' },
      { id: 'b', text: '持续集成的定义就是这个产品，换一个产品就不再算持续集成。' },
      { id: 'c', text: '推进之后由生产集群按这份 YAML 直接拉起线上进程。' },
      { id: 'd', text: '只有装在自己机器上的一种服务器，才能读仓库里的步骤。' },
    ],
    explain: 'GitHub Actions 是跟着仓库走的服务。工作流写在仓库里，事件触发后在 runner 上执行作业。它是一种持续集成服务，不是持续集成的定义，也不等于线上进程已经起来。',
    whyWrong: {
      b: '换一个产品仍然可以做持续集成。这个名字不是定义本身。',
      c: '作业在 runner 上执行。线上进程要另一次部署，不由这次推送直接拉起。',
      d: '步骤写在仓库的工作流里，由托管的 runner 执行，不限定必须自备一台服务器。',
    },
  },
  {
    lessonId: 'gha-workflow-enter',
    title: '后一个作业等前一个',
    summary: '构建作业写 needs: test。测试失败时，构建不会开始。',
    stem: '怎样让测试通过之后才开始构建镜像？',
    answer: 'd',
    options: [
      { id: 'a', text: '把构建写在测试前面，失败了工作流会自动倒回去重跑测试。' },
      { id: 'b', text: '两个作业不写 needs，也会按文件从上到下等前一个结束。' },
      { id: 'c', text: '测试失败时构建仍会开始，只是最后把结论标成失败。' },
      { id: 'd', text: '写成两个作业，构建那个作业写 needs: test。测试失败时构建不会开始。' },
    ],
    explain: '作业默认不会按文件顺序排队。构建要写 needs: test，测试失败时构建不会开始。',
    whyWrong: {
      a: '写在前面的作业不会在失败后自动倒回。先后靠 needs，不靠文中的位置。',
      b: '没有 needs 的作业不会互相等待，文件顺序不构成排队。',
      c: 'needs 指向的作业失败时，后面的作业不会开始。',
    },
  },
  {
    lessonId: 'k8s-memory-limit',
    title: '堆要小于限制',
    summary: 'limit 到了由内核杀掉进程。最大堆必须小于这份限制，并给堆外内存留空。request 只管调度。',
    stem: 'Pod 的内存限制是 512Mi，JVM 却按 8G 机器去占堆，最后会怎样？',
    answer: 'b',
    options: [
      { id: 'a', text: '只会抛出 Java 的堆耗尽，容器限制不参与杀进程。' },
      { id: 'b', text: '堆超过容器限制时，内核会杀掉进程。最大堆必须小于这份限制，并给元空间和直接内存留空。' },
      { id: 'c', text: 'request 用尽就会杀进程，limit 只决定调度到哪一台。' },
      { id: 'd', text: '把最大堆设成节点内存，容器限制会自动跟着放大到同一数值。' },
    ],
    explain: 'limit 是运行时上限，到了由内核杀掉进程。request 只影响调度。堆如果按整台机器去占、大于限制，进程会被杀掉。最大堆必须小于这份限制，并给元空间、线程栈和直接内存留空。',
    whyWrong: {
      a: '超过容器限制时，内核会杀掉进程。这不是一次只停在 Java 堆耗尽的退出。',
      c: 'request 让调度器找得下的节点。杀进程的是 limit，不是 request。',
      d: '容器限制不会因为最大堆写得更大就跟着放大。堆超过限制，进程会被杀掉。',
    },
  },
  {
    lessonId: 'gha-not-the-runtime',
    title: '绿了不是线上进程',
    summary: '作业绿了只说明这次检查过了。线上进程在容器或集群里，要另一次部署。',
    stem: '工作流绿了，是不是生产里的应用已经在集群里跑着？',
    answer: 'c',
    options: [
      { id: 'a', text: '是。绿了就表示新副本已经换成这一次构建。' },
      { id: 'b', text: '是。runner 上的进程就是线上进程，作业结束它继续对外服务。' },
      { id: 'c', text: '不是。绿了只说明这次作业过了。线上进程要另一次部署。' },
      { id: 'd', text: '是。测试作业成功之后，集群会按同名镜像自动重启。' },
    ],
    explain: '工作流绿了只说明这次作业过了。线上进程在容器或集群里，要另一次部署，不会因为检查通过就自己换上。',
    whyWrong: {
      a: '检查通过不会自动替换正在跑的副本。部署是另一个作业。',
      b: 'runner 上的进程随作业结束。它不是对外服务的线上进程。',
      d: '测试成功不会让集群按同名镜像重启。线上要单独部署。',
    },
  },
  {
    lessonId: 'fault-inject-one-signal',
    title: '指出哪一个信号',
    summary: '注入之后要指出哪一个信号变了。只写变慢，分不清该看下游、CPU 还是磁盘。',
    stem: '停掉下游之后，为什么不能只写「系统变慢了」？',
    answer: 'a',
    options: [
      { id: 'a', text: '注入之后要指出哪一个信号变了。只写变慢，不知道该看下游、CPU 还是磁盘。' },
      { id: 'b', text: '变慢已经说明是下游，不需要再看 CPU 或磁盘。' },
      { id: 'c', text: '故障注入只证明系统还能响应，信号可以事后再补。' },
      { id: 'd', text: '只要错误率上升，就一定是这次停掉的下游，不用对照别的信号。' },
    ],
    explain: '停掉一个下游或结束进程之后，要指出哪一个信号变了。只写变慢，分不清该看下游、CPU 还是磁盘。',
    whyWrong: {
      b: '变慢可以来自下游，也可以来自 CPU 或磁盘。不指出信号，就不知道看哪里。',
      c: '注入的目的就是看见哪一个信号变了。事后再补，这次观察已经对不上。',
      d: '错误率上升不一定来自这次停掉的下游。要对照这次改变的那一个信号。',
    },
  },
]

export function bossPointById(id: string) {
  return extraPoints.get(id)
}

export function bossGates() {
  return gates
}

export function bossGateFor(pathGateId: string) {
  return gates.find((gate) => gate.id === `xb-${pathGateId}`)
}

export function bossGateById(id: string) {
  return gates.find((gate) => gate.id === id)
}

export function bossQuestionById(id: string) {
  return questions.get(id)
}

function isMulti(question: DrillQuestion) {
  return new Set(question.answers ?? []).size > 1
}

function withDistractors(question: DrillQuestion, lessonId: string): DrillQuestion {
  const fix = BOSS_DISTRACTORS[lessonId]
  if (!fix) return question
  const right = new Set<string>(question.answers?.length ? question.answers : [question.answer])
  const options = question.options.map((option) => {
    const next = fix[option.id]
    if (!next || right.has(option.id)) return { ...option }
    return { ...option, text: next.text }
  })
  const whyWrong = { ...question.whyWrong }
  for (const [id, next] of Object.entries(fix) as [OptionId, { text: string; why: string }][]) {
    if (!next || right.has(id) || !whyWrong[id]) continue
    whyWrong[id] = next.why
  }
  return { ...question, options, whyWrong }
}

export function installBossExams(points: readonly DrillPoint[], source: readonly DrillQuestion[]) {
  const lessonOf = new Map(points.map((point) => [point.id, point.lessonId]))
  const byLesson = new Map<string, DrillQuestion[]>()
  for (const question of source) {
    const lessonId = lessonOf.get(question.pointId)
    if (!lessonId) continue
    const list = byLesson.get(lessonId)
    if (list) list.push(question)
    else byLesson.set(lessonId, [question])
  }
  const nextGates: DrillGate[] = []
  const nextQuestions = new Map<string, DrillQuestion>()
  for (const [index, gate] of MASTERY_GATES.entries()) {
    const seen = new Set<string>()
    const picked: DrillQuestion[] = []
    const gapPoints = new Map<string, DrillPoint>()
    for (const lesson of gate.lessons) {
      const found = (byLesson.get(lesson.id) ?? []).filter((question) => !seen.has(question.id))
      const chosen = found.find(isMulti) ?? found[0]
      if (chosen) {
        seen.add(chosen.id)
        picked.push(chosen)
        continue
      }
      const gap = GAPS.find((item) => item.lessonId === lesson.id)
      if (!gap) continue
      const pointId = `xb-${lesson.id}`
      gapPoints.set(pointId, { id: pointId, courseId: 'boss', title: gap.title, lessonId: lesson.id, summary: gap.summary })
      picked.push({
        id: pointId,
        pointId,
        stem: gap.stem,
        options: gap.options.map((option) => ({ ...option })),
        answer: gap.answer,
        explain: gap.explain,
        whyWrong: { ...gap.whyWrong },
      })
    }
    if (!picked.length) continue
    const id = `xb-${gate.id}`
    const questionIds = picked.map((_, at) => `${id}-${at + 1}`)
    picked.forEach((question, at) => {
      const lessonId = lessonOf.get(question.pointId) ?? question.pointId.replace(/^xb-/, '')
      const shaped = withDistractors(question, lessonId)
      nextQuestions.set(questionIds[at], {
        ...shaped,
        id: questionIds[at],
        options: shaped.options.map((option) => ({ ...option })),
        answers: shaped.answers ? [...shaped.answers] : undefined,
        whyWrong: { ...shaped.whyWrong },
      })
    })
    nextGates.push({
      id,
      courseId: 'boss',
      level: index + 1,
      title: gate.learnTitle,
      lead: `每一课一题。正确率达到 80%，「${gate.learnTitle}」才算通过。当场判分，不是认证。`,
      questionIds,
    })
    for (const [pointId, point] of gapPoints) extraPoints.set(pointId, point)
  }
  gates = nextGates
  questions = nextQuestions
}
