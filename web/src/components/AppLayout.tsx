import {
  BookOutlined,
  CheckSquareOutlined,
  ExperimentOutlined,
  FolderOpenOutlined,
  MenuOutlined,
  MoonOutlined,
  ReadOutlined,
  SunOutlined,
} from '@ant-design/icons'
import { Alert, Badge, Button, Drawer, Layout, Menu, Typography, theme } from 'antd'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { Link, matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { findLesson, isVersionSince, lessonsFor, lessonsInGroup, outlineFor, prefetchTrackBodies } from '@/data/curriculum'
import { TRACK_LABEL } from '@/data/meta'
import { shortTitle } from '@/data/reading'
import { courseGroups, groupLabel, groupPath, isTrack, lessonPath, resumePath } from '@/data/routes'
import { probeLocalLibrary } from '@/api/localLibrary'
import { useProgress } from '@/state/progress'
import { ProgressAside } from '@/components/ProgressAside'
import { ReadingBoundary } from '@/components/ReadingBoundary'

const { Sider, Content } = Layout

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const progress = useProgress()
  const { token } = theme.useToken()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [localReady, setLocalReady] = useState<boolean | null>(null)
  const localHost = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)

  async function reconnectLocal() {
    setLocalReady(null)
    const ready = await probeLocalLibrary()
    setLocalReady(ready)
    return ready
  }

  useEffect(() => {
    let active = true
    void probeLocalLibrary().then(ready => { if (active) setLocalReady(ready) })
    return () => { active = false }
  }, [])

  const courseLesson = matchPath('/:track/:groupKey/:lessonId', location.pathname)
  const courseGroup = matchPath('/:track/:groupKey', location.pathname)
  const routeTrack = courseLesson?.params.track || courseGroup?.params.track
  const routeGroupKey = courseLesson?.params.groupKey || courseGroup?.params.groupKey
  const activeTrack = isTrack(routeTrack) ? routeTrack : progress.track
  const activeGroupKey = isTrack(routeTrack) && routeGroupKey && groupLabel(activeTrack, routeGroupKey)
    ? routeGroupKey
    : progress.group
  const [menuCollapsed, setMenuCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>([])

  const groups = courseGroups(activeTrack)
  const trackLessons = lessonsFor(activeTrack)
  const doneCount = trackLessons.filter((lesson) => progress.done.includes(lesson.id)).length
  const homeTo = resumePath(activeTrack, activeGroupKey)

  const currentLesson = useMemo(() => {
    const id = courseLesson?.params.lessonId
    if (!id || !isTrack(routeTrack)) return undefined
    const lesson = findLesson(id)
    if (!lesson || lesson.track !== routeTrack) return undefined
    return lesson
  }, [courseLesson?.params.lessonId, routeTrack])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('main-content')?.focus({ preventScroll: true, focusVisible: false })
  }, [location.pathname])

  useEffect(() => {
    setMenuCollapsed(false)
    setOpenSections([])
  }, [activeGroupKey])

  useEffect(() => {
    setMenuCollapsed(false)
  }, [location.pathname])

  const onAi = location.pathname === '/ai' || location.pathname.startsWith('/ai/')
  const aiSectionKey = location.pathname.split('/')[2] || 'intro'
  const onLab = location.pathname.startsWith('/ai/lab')
  const labTitle = location.pathname.startsWith('/ai/lab/agent') ? '开发 agent' : '优化提示词'
  const [aiNav, setAiNav] = useState<{
    sections: { key: string; label: string }[]
    noteCount: number
    sectionCounts: Record<string, number>
    noteTitle: string
    sectionLabel: string
  } | null>(null)

  useEffect(() => {
    if (!onAi) {
      setAiNav(null)
      return
    }
    let cancelled = false
    const noteKey = location.pathname.split('/')[3]
    void import('@/data/aiCatalog').then((m) => {
      if (cancelled) return
      const sectionCounts: Record<string, number> = {}
      for (const section of m.AI_SECTIONS) {
        sectionCounts[section.key] = m.notesInSection(section.key).length
      }
      setAiNav({
        sections: m.AI_SECTIONS.map((section) => ({ key: section.key, label: section.label })),
        noteCount: m.AI_NOTES.length,
        sectionCounts,
        noteTitle: !onLab && noteKey ? m.aiNote(aiSectionKey, noteKey)?.title || '' : '',
        sectionLabel: m.AI_SECTIONS.find((section) => section.key === aiSectionKey)?.label || '',
      })
    })
    return () => {
      cancelled = true
    }
  }, [onAi, onLab, aiSectionKey, location.pathname])

  useEffect(() => {
    if (currentLesson) progress.remember(currentLesson.id)
    document.title = currentLesson
      ? `${shortTitle(currentLesson.title)} · 全栈学习实验室`
      : onLab
        ? `${labTitle} · AI · 全栈学习实验室`
        : aiNav?.noteTitle
          ? `${aiNav.noteTitle} · AI · 全栈学习实验室`
          : aiNav?.sectionLabel
            ? `${aiNav.sectionLabel} · AI · 全栈学习实验室`
            : '全栈学习实验室'
  }, [currentLesson, progress.remember, onLab, aiNav, labTitle])

  useEffect(() => {
    if (!isTrack(routeTrack) || !routeGroupKey || !groupLabel(routeTrack, routeGroupKey)) return
    progress.selectLesson(routeTrack, routeGroupKey)
  }, [routeTrack, routeGroupKey, progress.selectLesson])

  const pathChoice = onAi ? 'ai' : location.pathname.startsWith('/local') ? progress.localCategory : activeTrack
  const selectedKeys = onLab ? ['ai:lab'] : onAi ? [`ai:${aiSectionKey}`] : currentLesson ? [currentLesson.id] : []
  const currentSectionKey = (() => {
    if (!currentLesson) return ''
    const index = outlineFor(currentLesson.track, currentLesson.group).findIndex((section) => section.ids.includes(currentLesson.id))
    return index < 0 ? '' : `section:${activeGroupKey}:${index}`
  })()
  const openKeys = menuCollapsed || !activeGroupKey
    ? []
    : [`group:${activeGroupKey}`, ...new Set([currentSectionKey, ...openSections].filter(Boolean))]

  const lessonNode = (lesson: NonNullable<ReturnType<typeof findLesson>>) => ({
    key: lesson.id,
    label: (
      <Link
        to={lessonPath(lesson)}
        className="lesson-label"
        onMouseEnter={() => prefetchTrackBodies(lesson.track)}
        onClick={() => {
          progress.remember(lesson.id)
          setMobileOpen(false)
        }}
      >
        <span
          className={`lesson-status${progress.done.includes(lesson.id) ? ' is-done' : ''}`}
          aria-hidden
        />
        <span>{shortTitle(lesson.title)}</span>
        {isVersionSince(lesson.since) ? <span className="since-chip">{lesson.since}</span> : null}
      </Link>
    ),
  })

  const menuItems = groups.map((group, index) => {
    const items = lessonsInGroup(activeTrack, group.name)
    const completed = items.filter((lesson) => progress.done.includes(lesson.id)).length
    const sections = outlineFor(activeTrack, group.name)
    const listed = new Set(sections.flatMap((section) => section.ids))
    const children = sections.length >= 2
      ? [
          ...sections.map((section, sectionIndex) => {
            const sectionLessons = section.ids
              .map((id) => findLesson(id))
              .filter((item): item is NonNullable<ReturnType<typeof findLesson>> => !!item && item.group === group.name)
            const sectionDone = sectionLessons.filter((lesson) => progress.done.includes(lesson.id)).length
            return {
              key: `section:${group.key}:${sectionIndex}`,
              label: (
                <span className="section-label">
                  <span>{section.title}</span>
                  <span className="group-count">{sectionDone}/{sectionLessons.length}</span>
                </span>
              ),
              children: sectionLessons.map(lessonNode),
            }
          }),
          ...items.filter((lesson) => !listed.has(lesson.id)).map(lessonNode),
        ]
      : items.map(lessonNode)
    return {
      key: `group:${group.key}`,
      label: (
        <Link
          to={groupPath(activeTrack, group.key)}
          className="group-label"
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
            event.stopPropagation()
            setMenuCollapsed(false)
          }}
        >
          <span className="group-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="group-name">{group.label}</span>
          <span className="group-count">
            {completed}/{items.length}
          </span>
        </Link>
      ),
      children,
    }
  })

  const aiMenuItems = [
    ...(aiNav?.sections || []).map((section, index) => ({
      key: `ai:${section.key}`,
      label: (
        <Link to={`/ai/${section.key}`} className="group-label" onClick={() => setMobileOpen(false)}>
          <span className="group-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="group-name">{section.label}</span>
          <span className="group-count">{aiNav?.sectionCounts[section.key] ?? 0}</span>
        </Link>
      ),
    })),
    {
      key: 'ai:lab',
      label: (
        <Link to="/ai/lab/prompt" className="group-label" onClick={() => setMobileOpen(false)}>
          <span className="group-index">练</span>
          <span className="group-name">练习台</span>
        </Link>
      ),
    },
  ]

  const navItems = [
    { key: 'home', icon: <ReadOutlined />, label: '学习路线' },
    { key: 'knowledge', icon: <BookOutlined />, label: '知识库' },
    { key: 'audit', icon: <ExperimentOutlined />, label: '知识核验' },
    {
      key: 'review',
      icon: <CheckSquareOutlined />,
      label: '复习清单',
      badge: progress.localCategory === 'ai' || onAi ? progress.aiReview.length : progress.review.length,
    },
    ...(localReady
      ? [{ key: 'local', icon: <FolderOpenOutlined />, label: '本机资料', badge: 0 }]
      : localHost
        ? [{ key: 'local', icon: <FolderOpenOutlined />, label: '连接本机资料', badge: 0 }]
        : []),
  ]

  const navSelected = (() => {
    if (
      onAi ||
      isTrack(routeTrack) ||
      location.pathname === '/' ||
      location.pathname === '/home' ||
      location.pathname.startsWith('/lesson/')
    )
      return 'home'
    if (location.pathname.startsWith('/knowledge')) return 'knowledge'
    if (location.pathname.startsWith('/audit')) return 'audit'
    if (location.pathname.startsWith('/review')) return 'review'
    if (location.pathname.startsWith('/local')) return 'local'
    return 'home'
  })()

  const siderBody = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="sider-head">
        <span className="sider-label">学习路线</span>
        <div className="track-switch is-triple">
          {(['frontend', 'java'] as const).map((track) => (
            <Button
              key={track}
              type={pathChoice === track ? 'primary' : 'default'}
              onClick={() => {
                progress.setLocalCategory(track)
                navigate(resumePath(track, ''))
                setMobileOpen(false)
              }}
            >
              {TRACK_LABEL[track]}
            </Button>
          ))}
          <Button
            type={pathChoice === 'ai' ? 'primary' : 'default'}
            onClick={() => {
              progress.setLocalCategory('ai')
              navigate('/ai/intro')
              setMobileOpen(false)
            }}
          >
            AI
          </Button>
        </div>
      </div>
        <Menu
        className="path-menu"
        mode="inline"
        inlineIndent={8}
        selectedKeys={selectedKeys}
        openKeys={onAi ? [] : openKeys}
        onOpenChange={(keys) => {
          if (onAi) return
          const names = keys.map(String)
          const opened = names.filter((key) => key.startsWith('group:'))
          const current = `group:${activeGroupKey}`
          const added = opened.find((key) => key !== current)
          if (added) {
            navigate(groupPath(activeTrack, added.slice('group:'.length)))
            setMenuCollapsed(false)
            return
          }
          setOpenSections(names.filter((key) => key.startsWith(`section:${activeGroupKey}:`)))
          setMenuCollapsed(!opened.includes(current))
        }}
        items={onAi ? aiMenuItems : menuItems}
      />
      <div className="sider-foot">
        <Typography.Text type="secondary" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
          源码课
        </Typography.Text>
        <a href="https://xuyuanzhou.github.io/react-mastery-lab/" target="_blank" rel="noreferrer">
          React Mastery Lab ↗
        </a>
        <a href="https://xuyuanzhou.github.io/vue3-mastery-lab/#/" target="_blank" rel="noreferrer">
          Vue 3 Mastery Lab ↗
        </a>
      </div>
    </div>
  )

  return (
    <Layout className="app-shell">
      <a className="skip-link" href="#main-content" onClick={event => {
        event.preventDefault()
        document.getElementById('main-content')?.focus({ preventScroll: true, focusVisible: false })
      }}>跳到正文</a>
      <Sider className="app-sider" width={300} trigger={null} collapsible={false}>
        {siderBody}
      </Sider>

      <div className="app-content">
        <header className="app-header">
          <Button
            className="mobile-only"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileOpen(true)}
            aria-label="打开课程目录"
          />
          <Link to={homeTo} className="brand-lockup">
            <span className="brand-mark">FS</span>
            <span className="brand-text">
              <strong>全栈学习实验室</strong>
              <small>Fullstack Learning Lab</small>
            </span>
          </Link>

          <nav className="top-nav" aria-label="主导航">
            {navItems.map((item) => {
              const active = navSelected === item.key
              const button = (
                <Button
                  type="text"
                  icon={item.icon}
                  className={`top-nav-btn${active ? ' is-active' : ''}`}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                  title={item.label}
                  onClick={() => {
                    if (item.key === 'local' && localReady !== true) {
                      void reconnectLocal().then((ready) => { if (ready) navigate('/local') })
                      return
                    }
                    navigate(item.key === 'home' ? homeTo : `/${item.key}`)
                  }}
                >
                  <span className="nav-label-wide">{item.label}</span>
                </Button>
              )
              return 'badge' in item && item.badge ? (
                <Badge key={item.key} count={item.badge} size="small" offset={[-2, 6]}>
                  {button}
                </Badge>
              ) : (
                <span key={item.key} className="top-nav-item">
                  {button}
                </span>
              )
            })}
          </nav>

          <div className="header-tools">
            <span className="header-count">
              {onAi ? `${aiNav?.noteCount ?? '…'} 篇` : `${doneCount}/${trackLessons.length}`}
            </span>
            <Button
              type="text"
              icon={progress.theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => progress.setTheme(progress.theme === 'dark' ? 'light' : 'dark')}
              aria-label="切换深浅色"
            />
          </div>
        </header>

        <div className={onLab ? 'workspace is-workbench' : 'workspace'}>
          <Content className="app-main" id="main-content" role="main" tabIndex={-1}>
            {progress.storageIssue && <Alert type="warning" showIcon title={progress.storageIssue} />}
            {localHost && localReady === false && (
              <Alert
                type="info"
                showIcon
                title="本机资料服务还没连上。"
                action={<Button size="small" onClick={() => void reconnectLocal()}>重新连接</Button>}
              />
            )}
            <ReadingBoundary key={location.pathname}>
              <Suspense fallback={<div className="route-loading" role="status">正在打开课程…</div>}>
                <Outlet context={{ localReady, reconnectLocal, localHost }} />
              </Suspense>
            </ReadingBoundary>
          </Content>
          {!onLab && (
            <aside className="app-aside">
              <ProgressAside localReady={localReady === true} />
            </aside>
          )}
        </div>
      </div>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        size={300}
        title="课程目录"
        styles={{ body: { padding: 0 }, header: { borderBottom: `1px solid ${token.colorBorderSecondary}` } }}
      >
        {siderBody}
      </Drawer>
    </Layout>
  )
}
