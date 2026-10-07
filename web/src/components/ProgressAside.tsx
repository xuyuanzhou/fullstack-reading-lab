import { Button, Progress, Typography } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiBackupPanel } from '@/components/AiBackupPanel'
import { AI_NOTES, aiNote, sectionKeyForNote } from '@/data/aiCatalog'
import { findLesson, lessonsFor } from '@/data/curriculum'
import { shortTitle } from '@/data/reading'
import { lessonPath } from '@/data/routes'
import { useProgress } from '@/state/progress'

export function ProgressAside({ localReady }: { localReady: boolean }) {
  const progress = useProgress()
  const navigate = useNavigate()
  const location = useLocation()
  const onAi =
    progress.localCategory === 'ai' ||
    location.pathname === '/ai' ||
    location.pathname.startsWith('/ai/')

  if (onAi) {
    const total = AI_NOTES.length
    const completed = progress.aiDone.length
    const percent = total ? Math.round((100 * completed) / total) : 0
    const next = AI_NOTES.map((note) => aiNote(note.section, note.key)).find(
      (note) => note && !progress.aiDone.includes(`ai:${note.key}`),
    )
    const recent = progress.aiRecent
      .map((id) => {
        const key = id.replace(/^ai:/, '')
        return aiNote(sectionKeyForNote(key), key)
      })
      .filter(Boolean)
      .slice(0, 4)

    return (
      <div className="aside-stack">
        <div className="aside-block">
          <span className="aside-label">AI 进度</span>
          <div className="progress-figure">{percent}%</div>
          <Typography.Text type="secondary">
            {completed} / {total} 篇已掌握
          </Typography.Text>
          <Progress
            percent={percent}
            showInfo={false}
            strokeColor="var(--lab-accent)"
            railColor="var(--lab-line)"
            size="small"
            style={{ marginTop: 12 }}
          />
        </div>
        <div className="aside-block">
          <h5>下一步</h5>
          {next ? (
            <Link
              className="text-link"
              to={`/ai/${next.section}/${next.key}`}
              onClick={() => progress.rememberAi(`ai:${next.key}`)}
            >
              {next.title} →
            </Link>
          ) : (
            <Typography.Text type="secondary">AI 路线卡片已标记完成，可去复习清单。</Typography.Text>
          )}
        </div>
        <div className="aside-block">
          <h5>最近阅读</h5>
          {recent.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {recent.map((item) =>
                item ? (
                  <Link
                    key={item.key}
                    className="text-link"
                    to={`/ai/${item.section}/${item.key}`}
                    onClick={() => progress.rememberAi(`ai:${item.key}`)}
                  >
                    {item.title}
                  </Link>
                ) : null,
              )}
            </div>
          ) : (
            <Typography.Text type="secondary">打开 AI 课后会显示在这里。</Typography.Text>
          )}
        </div>
        <AiBackupPanel />
        {localReady ? (
          <div className="aside-block">
            <h5>我的本机资料</h5>
            <Button size="small" onClick={() => navigate('/local')}>
              浏览本机题库 →
            </Button>
          </div>
        ) : null}
      </div>
    )
  }

  const current = lessonsFor(progress.track)
  const completed = current.filter((lesson) => progress.done.includes(lesson.id)).length
  const percent = current.length ? Math.round((100 * completed) / current.length) : 0
  const next = current.find((lesson) => !progress.done.includes(lesson.id))
  const recent = progress.recent
    .map((id) => findLesson(id))
    .filter((item) => item && item.track === progress.track)
    .slice(0, 4)

  return (
    <div className="aside-stack">
      <div className="aside-block">
        <span className="aside-label">进度</span>
        <div className="progress-figure">{percent}%</div>
        <Typography.Text type="secondary">
          {completed} / {current.length} 课已掌握
        </Typography.Text>
        <Progress
          percent={percent}
          showInfo={false}
          strokeColor="var(--lab-accent)"
          railColor="var(--lab-line)"
          size="small"
          style={{ marginTop: 12 }}
        />
      </div>

      <div className="aside-block">
        <h5>下一步</h5>
        {next ? (
          <Link
            className="text-link"
            to={lessonPath(next)}
            onClick={() => progress.remember(next.id)}
          >
            {shortTitle(next.title)} →
          </Link>
        ) : (
          <Typography.Text type="secondary">当前路线全部完成，可以进入复习清单。</Typography.Text>
        )}
      </div>

      <div className="aside-block">
        <h5>最近阅读</h5>
        {recent.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {recent.map((item) =>
              item ? (
                <Link
                  key={item.id}
                  className="text-link"
                  to={lessonPath(item)}
                  onClick={() => progress.remember(item.id)}
                >
                  {shortTitle(item.title)}
                </Link>
              ) : null,
            )}
          </div>
        ) : (
          <Typography.Text type="secondary">打开课程后会显示在这里。</Typography.Text>
        )}
      </div>

      {localReady ? (
        <div className="aside-block">
          <h5>我的本机资料</h5>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 10, fontSize: 13 }}>
            已连接本地阅读服务。
          </Typography.Paragraph>
          <Button size="small" onClick={() => navigate('/local')}>
            浏览本机题库 →
          </Button>
        </div>
      ) : null}

      <div className="aside-block">
        <span className="aside-label">Open learning</span>
        <Typography.Paragraph style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }} type="secondary">
          知识卡与练习为原创内容。购买资料和 PDF 密码不会进入网站。学习记录只存在当前浏览器。
        </Typography.Paragraph>
      </div>
    </div>
  )
}
