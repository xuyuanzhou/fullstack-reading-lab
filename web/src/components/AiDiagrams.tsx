import type { ReactElement } from 'react'

const FIGURES: Record<string, () => ReactElement> = {
  'three-parts': ThreeParts,
  'next-piece': NextPiece,
  'context-window': ContextWindow,
  'prompt-once': PromptOnce,
  'find-then-answer': FindThenAnswer,
  'model-proposes': ModelProposes,
  'one-success': OneSuccess,
  'first-task': FirstTask,
}

export function AiDiagram({ name }: { name: string }) {
  const Figure = FIGURES[name]
  if (!Figure) return null
  return <Figure />
}

function ThreeParts() {
  return (
    <figure className="ai-figure" aria-label="提示交给模型接出下一段；查天气、读文件、跑测试由程序执行">
      <div className="ai-flow">
        <article className="ai-card">
          <strong>提示</strong>
          <p>你这一次写的问题、要求和贴上的材料。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card is-accent">
          <strong>模型</strong>
          <p>看着这些文字，接出下一段。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card">
          <strong>程序</strong>
          <p>查天气、读文件、跑测试。模型只能提议。</p>
        </article>
      </div>
    </figure>
  )
}

function NextPiece() {
  return (
    <figure className="ai-figure" aria-label="句子“我把伞带上，因为快”后面，下雨比考试、睡觉更常一起出现">
      <p className="ai-sentence">
        我把伞带上，因为快<span>？</span>
      </p>
      <ul className="ai-candidates">
        <li className="is-pick">
          <span>下雨</span>
          <small>常一起出现</small>
        </li>
        <li>
          <span>考试</span>
          <small>较少</small>
        </li>
        <li>
          <span>睡觉</span>
          <small>较少</small>
        </li>
      </ul>
      <figcaption>接上的是更常一起出现的片段，不是从事实库里查到的一句。</figcaption>
    </figure>
  )
}

function ContextWindow() {
  return (
    <figure className="ai-figure" aria-label="一小时前的约束已经被挤出这一次能看见的窗口">
      <p className="ai-dropped">
        <span>已被挤出</span>
        <s>一小时前的约束：回答不超过八个字</s>
      </p>
      <div className="ai-window">
        <span>这一次能看见的</span>
        <p>最新的问题</p>
        <p>刚贴上的材料</p>
      </div>
      <figcaption>更早的那句话已经不在窗口里，它就按还看得见的文字继续接。</figcaption>
    </figure>
  )
}

function PromptOnce() {
  return (
    <figure className="ai-figure" aria-label="“用三个短句回答”只存在于这次对话，新开的对话里没有这条要求">
      <div className="ai-split">
        <article className="ai-card is-accent">
          <strong>这次对话</strong>
          <ol>
            <li>用三个短句回答</li>
            <li>加上你的问题</li>
            <li>得到三行短句</li>
          </ol>
        </article>
        <article className="ai-card">
          <strong>新开的对话</strong>
          <ol>
            <li>只有问题</li>
            <li>没有那条要求</li>
            <li>形状回到原来的样子</li>
          </ol>
        </article>
      </div>
    </figure>
  )
}

function FindThenAnswer() {
  return (
    <figure className="ai-figure" aria-label="三段材料里，只有“报销需要发票”和问题有关，再把这一段交给模型">
      <div className="ai-split">
        <div className="ai-docs" aria-label="三段材料">
          <p className="is-pick">报销需要发票</p>
          <p>年假有十天</p>
          <p>会议室需要预约</p>
        </div>
        <div className="ai-flow ai-flow-col">
          <article className="ai-card">
            <strong>问题</strong>
            <p>报销要什么？</p>
          </article>
          <span className="ai-arrow" aria-hidden>↓</span>
          <article className="ai-card is-accent">
            <strong>交给模型的只有这一段</strong>
            <p>报销需要发票。回答要抄出这句。</p>
          </article>
        </div>
      </div>
    </figure>
  )
}

function ModelProposes() {
  return (
    <figure className="ai-figure" aria-label="模型提议调用查天气，程序执行后才有结果；没有程序时它仍可能写出查过了">
      <div className="ai-flow">
        <article className="ai-card">
          <strong>模型的提议</strong>
          <p>调用「查天气」，城市是杭州。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card is-accent">
          <strong>程序执行</strong>
          <p>真的去查，返回「小雨」。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card">
          <strong>再交给模型</strong>
          <p>根据「小雨」写成回答。</p>
        </article>
      </div>
      <p className="ai-warn">没有这个程序时，它仍可能直接写出「我已经查过了」。</p>
    </figure>
  )
}

function OneSuccess() {
  return (
    <figure className="ai-figure" aria-label="有原句的回答可以核对；材料里没有的问题如果被编出来，就不能只看这一次成功">
      <div className="ai-split">
        <article className="ai-card is-accent">
          <strong>材料里有</strong>
          <p>「报销需要发票」</p>
          <p>回答指出这句，可以核对。</p>
        </article>
        <article className="ai-card is-warn">
          <strong>材料里没有</strong>
          <p>问：加班费怎么算？</p>
          <p>它若编出一条，这次就不能算会了。</p>
        </article>
      </div>
    </figure>
  )
}

function FirstTask() {
  return (
    <figure className="ai-figure" aria-label="十行材料配三个问题，其中一题材料里没有答案">
      <div className="ai-split">
        <div className="ai-sheet" aria-hidden>
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} />
          ))}
          <small>十行以内的材料</small>
        </div>
        <ol className="ai-checks">
          <li>指出依据的原句</li>
          <li>指出依据的原句</li>
          <li className="is-warn">材料里没有，就要明说没有</li>
        </ol>
      </div>
    </figure>
  )
}
