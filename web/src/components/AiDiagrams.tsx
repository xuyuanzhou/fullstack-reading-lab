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
  tokens: Tokens,
  loss: Loss,
  'attention-who': AttentionWho,
  'change-how': ChangeHow,
  embeddings: Embeddings,
  'decode-params': DecodeParams,
  'kv-cache': KvCache,
  'hybrid-retrieve': HybridRetrieve,
  'eval-set': EvalSet,
  'rag-layers': RagLayers,
  'hallucination-cite': HallucinationCite,
  'prompt-injection': PromptInjection,
  permissions: Permissions,
  'you-own': YouOwn,
  'interview-map': InterviewMap,
  'llm-interview': LlmInterview,
  'rag-interview': RagInterview,
  'agent-interview': AgentInterview,
  'find-skills': FindSkills,
  'write-skill': WriteSkill,
  'skill-place': SkillPlace,
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

function Tokens() {
  return (
    <figure className="ai-figure" aria-label="把牛奶放进冰箱被切成四个词元，每个词元对应一个整数">
      <p className="ai-sentence">把牛奶放进冰箱</p>
      <div className="ai-flow">
        <article className="ai-card is-accent"><strong>把</strong><p>101</p></article>
        <article className="ai-card is-accent"><strong>牛奶</strong><p>248</p></article>
        <article className="ai-card is-accent"><strong>放进</strong><p>36</p></article>
        <article className="ai-card is-accent"><strong>冰箱</strong><p>512</p></article>
      </div>
      <figcaption>编号只是示意。换一套词表，同样四个字会得到另一串数。</figcaption>
    </figure>
  )
}

function Loss() {
  return (
    <figure className="ai-figure" aria-label="正确词元分数不够高时损失变大，权重被挪一点；温度只影响挑选">
      <div className="ai-split">
        <article className="ai-card">
          <strong>下一个词元的分数</strong>
          <p>下雨：偏低</p>
          <p>考试：偏高</p>
        </article>
        <article className="ai-card is-warn">
          <strong>损失</strong>
          <p>正确答案是下雨，所以损失大。</p>
        </article>
        <article className="ai-card is-accent">
          <strong>被挪动的是权重</strong>
          <p>温度只决定生成时怎么挑，不参加这一步。</p>
        </article>
      </div>
    </figure>
  )
}

function AttentionWho() {
  return (
    <figure className="ai-figure" aria-label="表示追的时候，更多向猫和狗取信息">
      <div className="ai-grid" role="table" aria-label="追对猫、追、狗的注意程度">
        <span className="is-head" />
        <span className="is-head">猫</span>
        <span className="is-head">追</span>
        <span className="is-head">狗</span>
        <span className="is-head">追 在看</span>
        <span className="is-pick">多</span>
        <span>少</span>
        <span className="is-pick">多</span>
      </div>
      <figcaption>查询来自「追」。没有位置信息时，「猫追狗」和「狗追猫」会变成同一袋词。</figcaption>
    </figure>
  )
}

function ChangeHow() {
  return (
    <figure className="ai-figure" aria-label="提示只改这一次，检索放入材料，微调才改权重">
      <div className="ai-flow">
        <article className="ai-card">
          <strong>提示</strong>
          <p>只改这一次的输入。对话结束就没了。</p>
        </article>
        <article className="ai-card is-accent">
          <strong>检索</strong>
          <p>不改权重。把相关段落放进这次上下文。</p>
        </article>
        <article className="ai-card">
          <strong>微调</strong>
          <p>用例子改权重。没有评测就先不做。</p>
        </article>
      </div>
    </figure>
  )
}

function Embeddings() {
  return (
    <figure className="ai-figure" aria-label="意思相近的句子向量靠近，无关句子远离">
      <div className="ai-split">
        <div className="ai-docs" aria-label="三句话">
          <p className="is-pick">报销需要发票</p>
          <p className="is-pick">请交发票才能报销</p>
          <p>会议室需要预约</p>
        </div>
        <article className="ai-card is-accent">
          <strong>向量空间里</strong>
          <p>前两句靠近。</p>
          <p>会议室那句离得远。</p>
        </article>
      </div>
      <figcaption>换了嵌入模型，旧向量和新问题不在同一把尺子上，索引要重建。</figcaption>
    </figure>
  )
}

function DecodeParams() {
  return (
    <figure className="ai-figure" aria-label="温度低时几乎总挑最高分，温度高时次高分也可能被选中">
      <div className="ai-split">
        <article className="ai-card is-accent">
          <strong>温度低</strong>
          <p>几乎总挑最高分。</p>
          <p>更稳，也更重复。</p>
        </article>
        <article className="ai-card">
          <strong>温度高</strong>
          <p>次高分也有机会。</p>
          <p>更多样，也更容易跑偏。</p>
        </article>
      </div>
      <figcaption>Top-p / Top-k 先缩小候选。它们都不增加事实，也不改权重。</figcaption>
    </figure>
  )
}

function KvCache() {
  return (
    <figure className="ai-figure" aria-label="前缀的键值算过一次就缓存，新词只算自己的查询">
      <div className="ai-flow">
        <article className="ai-card">
          <strong>已生成的前缀</strong>
          <p>键和值算过一次，存进缓存。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card is-accent">
          <strong>新词元</strong>
          <p>只算自己的查询，再和缓存做注意力。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card">
          <strong>代价</strong>
          <p>省时间，显存随长度涨。</p>
        </article>
      </div>
    </figure>
  )
}

function HybridRetrieve() {
  return (
    <figure className="ai-figure" aria-label="向量抓同义，BM25 抓编号，合并后再重排出前几段">
      <div className="ai-flow">
        <article className="ai-card">
          <strong>向量</strong>
          <p>同义改写</p>
        </article>
        <article className="ai-card">
          <strong>BM25</strong>
          <p>编号、专有词</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card is-accent">
          <strong>重排</strong>
          <p>宽召回后收成前几段</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card">
          <strong>生成</strong>
          <p>带引用</p>
        </article>
      </div>
    </figure>
  )
}

function EvalSet() {
  return (
    <figure className="ai-figure" aria-label="评测至少包括有原句、应说没有、格式符合三类">
      <ol className="ai-checks">
        <li>材料里有原句，回答必须指到那句</li>
        <li className="is-warn">材料里没有，必须说没有</li>
        <li>日期、金额、名字符合你定的格式</li>
      </ol>
      <figcaption>见过的题目得了高分，只说明见过。换一份新材料，用同一套规则再判一次。</figcaption>
    </figure>
  )
}

function RagLayers() {
  return (
    <figure className="ai-figure" aria-label="索引、召回、生成三层，错在哪一层就只改那一层">
      <div className="ai-flow">
        <article className="ai-card">
          <strong>1 索引</strong>
          <p>含答案的那一块在不在库里。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card">
          <strong>2 召回</strong>
          <p>这次的前几名里有没有它。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card is-accent">
          <strong>3 生成</strong>
          <p>回答有没有引用它。</p>
        </article>
      </div>
    </figure>
  )
}

function HallucinationCite() {
  return (
    <figure className="ai-figure" aria-label="有依据就引用块标识；没有依据就拒答，不要编">
      <div className="ai-split">
        <article className="ai-card is-accent">
          <strong>有依据</strong>
          <p>回答带块标识。</p>
          <p>前端能点回原文。</p>
        </article>
        <article className="ai-card is-warn">
          <strong>没有依据</strong>
          <p>说材料里没有。</p>
          <p>编得再像也不展示。</p>
        </article>
      </div>
    </figure>
  )
}

function PromptInjection() {
  return (
    <figure className="ai-figure" aria-label="系统指令、用户内容和工具结果分开，危险动作仍要确认">
      <div className="ai-flow">
        <article className="ai-card is-accent">
          <strong>系统指令</strong>
          <p>你写的边界。</p>
        </article>
        <article className="ai-card is-warn">
          <strong>用户内容</strong>
          <p>可能含“忽略规则”。</p>
        </article>
        <article className="ai-card is-warn">
          <strong>工具结果</strong>
          <p>同样不可信。</p>
        </article>
      </div>
      <p className="ai-warn">导出、发信、写库仍走程序里的确认，不靠模型自觉。</p>
    </figure>
  )
}

function InterviewMap() {
  return (
    <figure className="ai-figure" aria-label="五块考点：机制、改哪一层、推理优化、系统设计、评测安全">
      <ol className="ai-checks">
        <li>注意力与词元</li>
        <li>提示 / 检索 / 微调</li>
        <li>KV Cache 与延迟</li>
        <li className="is-pick">设计 RAG / Agent</li>
        <li className="is-warn">评测、幻觉、注入</li>
      </ol>
      <figcaption>应用岗主攻后三块；算法岗再加深前两块和对齐。</figcaption>
    </figure>
  )
}

function LlmInterview() {
  return (
    <figure className="ai-figure" aria-label="口述顺序：结论、机制、失败情形">
      <div className="ai-flow">
        <article className="ai-card is-accent"><strong>结论</strong><p>先一句话说清。</p></article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card"><strong>机制</strong><p>它改的是哪一层。</p></article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card is-warn"><strong>失败</strong><p>一个具体会坏的情形。</p></article>
      </div>
    </figure>
  )
}

function RagInterview() {
  return (
    <figure className="ai-figure" aria-label="RAG 面试流水线从切分到引用">
      <div className="ai-flow">
        <article className="ai-card"><strong>切分</strong><p>含重叠</p></article>
        <article className="ai-card"><strong>嵌入</strong><p>写入索引</p></article>
        <article className="ai-card is-accent"><strong>混合检索</strong><p>向量 + 关键词</p></article>
        <article className="ai-card"><strong>重排</strong><p>收窄</p></article>
        <article className="ai-card"><strong>生成</strong><p>带引用</p></article>
      </div>
      <p className="ai-warn">权限过滤插在召回之前。</p>
    </figure>
  )
}

function AgentInterview() {
  return (
    <figure className="ai-figure" aria-label="模型提议，程序执行，有副作用前确认，循环有上限">
      <div className="ai-flow">
        <article className="ai-card"><strong>提议</strong><p>工具名和参数</p></article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card is-accent"><strong>校验执行</strong><p>程序来做</p></article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card is-warn"><strong>确认</strong><p>发信、扣款之前</p></article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card"><strong>上限</strong><p>步数与失败次数</p></article>
      </div>
    </figure>
  )
}

function Permissions() {
  return (
    <figure className="ai-figure" aria-label="读可以放开，改、执行、联网要单独允许，发送之前等人确认">
      <div className="ai-flow">
        <article className="ai-card is-accent"><strong>读</strong><p>默认可看任务需要的文件。</p></article>
        <article className="ai-card"><strong>改</strong><p>默认关闭。</p></article>
        <article className="ai-card"><strong>执行</strong><p>默认关闭。</p></article>
        <article className="ai-card"><strong>联网</strong><p>单独批。</p></article>
      </div>
      <p className="ai-warn">发信、扣款、写库放在人确认之后。确认前只准备参数。</p>
    </figure>
  )
}

function FindSkills() {
  return (
    <figure className="ai-figure" aria-label="目录里先露出名字和说明，任务对上之后才读取技能全文">
      <div className="ai-flow">
        <article className="ai-card">
          <strong>目录</strong>
          <p>每个技能只露出名字，和一句何时使用。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card is-accent">
          <strong>对上任务</strong>
          <p>说明里的场景和这次要做的事一致。</p>
        </article>
        <span className="ai-arrow" aria-hidden>→</span>
        <article className="ai-card">
          <strong>再读全文</strong>
          <p>这时才把 SKILL.md 的步骤放进上下文。</p>
        </article>
      </div>
    </figure>
  )
}

function WriteSkill() {
  return (
    <figure className="ai-figure" aria-label="一份技能包含名字、何时使用和短步骤，长资料与脚本放在旁边">
      <div className="ai-flow">
        <article className="ai-card">
          <strong>name</strong>
          <p>和文件夹名相同。小写，用连字符。</p>
        </article>
        <article className="ai-card is-accent">
          <strong>description</strong>
          <p>做什么，以及什么任务该用它。</p>
        </article>
        <article className="ai-card">
          <strong>步骤</strong>
          <p>短。长表放 references，命令放 scripts。</p>
        </article>
      </div>
    </figure>
  )
}

function SkillPlace() {
  return (
    <figure className="ai-figure" aria-label="提示是这一次的任务，技能是可重复的做法，工具才执行动作">
      <div className="ai-flow">
        <article className="ai-card">
          <strong>提示</strong>
          <p>这一次的问题、材料和格式。</p>
        </article>
        <article className="ai-card is-accent">
          <strong>技能</strong>
          <p>下次还要照做的步骤。</p>
        </article>
        <article className="ai-card">
          <strong>工具</strong>
          <p>读、改、执行、联网。要单独授权。</p>
        </article>
      </div>
    </figure>
  )
}

function YouOwn() {
  return (
    <figure className="ai-figure" aria-label="材料、怎样算对、失败样例和停点由你写下，模型只在边界内提议">
      <div className="ai-split">
        <ol className="ai-checks">
          <li>材料从哪来，谁能看见</li>
          <li>怎样算答完</li>
          <li>一个失败样例</li>
          <li className="is-warn">必须停下的那一步</li>
        </ol>
        <article className="ai-card is-accent">
          <strong>模型只做这件事</strong>
          <p>在边界里提议下一段，或提议一次工具调用。</p>
        </article>
      </div>
    </figure>
  )
}
