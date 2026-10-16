import {
  BookOutlined,
  CheckSquareOutlined,
  ExperimentOutlined,
  FolderOpenOutlined,
  FormOutlined,
  MenuOutlined,
  MoonOutlined,
  ReadOutlined,
  SunOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Alert, Badge, Button, Drawer, Layout, Menu, Typography, theme } from 'antd'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { Link, matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { findLesson, isVersionSince, lessonsFor, lessonsInGroup, outlineFor, prefetchLessonBody } from '@/data/curriculum'
import { TRACK_LABEL } from '@/data/meta'
import { shortTitle } from '@/data/reading'
import { courseGroups, groupLabel, groupPath, isTrack, lessonPath, resumePath } from '@/data/routes'
import { useLearningSlice } from '@/state/progress'
import { useShallow } from 'zustand/react/shallow'
import { RouteSkeleton } from '@/components/RouteSkeleton'
import { ProgressAside } from '@/components/ProgressAside'
import { ReadingBoundary } from '@/components/ReadingBoundary'
import { RouteTransition, TransitionAudioButton } from '@/transition/RouteTransition'

const { Sider, Content } = Layout

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const progress = useLearningSlice(useShallow((state) => ({
    track: state.track,
    group: state.group,
    done: state.done,
    review: state.review,
    aiReview: state.aiReview,
    localCategory: state.localCategory,
    theme: state.theme,
    storageIssue: state.storageIssue,
    remember: state.remember,
    selectLesson: state.selectLesson,
    setLocalCategory: state.setLocalCategory,
    setTheme: state.setTheme,
  })))
  const onDrill = location.pathname === '/drill' || location.pathname.startsWith('/drill/')
  const drillLog = useLearningSlice((state) => (onDrill ? state.drill.log : null))
  const [drillPoints, setDrillPoints] = useState<number | null>(null)
  useEffect(() => {
    if (!drillLog) return
    let cancel = false
    void import('@/data/drillRules').then((mod) => {
      if (!cancel) setDrillPoints(mod.pointsOf({ log: drillLog }))
    })
    return () => {
      cancel = true
    }
  }, [drillLog])
  useEffect(() => {
    const warm = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest('a[href]')
      if (!link) return
      const id = lessonIdFromHref(link.getAttribute('href') || '')
      if (id) prefetchLessonBody(id)
    }
    document.addEventListener('pointerdown', warm, true)
    document.addEventListener('focusin', warm, true)
    return () => {
      document.removeEventListener('pointerdown', warm, true)
      document.removeEventListener('focusin', warm, true)
    }
  }, [])
  const localReady = useLearningSlice((state) => state.localReady)
  const reconnectLocal = useLearningSlice((state) => state.reconnectLocal)
  const { token } = theme.useToken()
  const [mobileOpen, setMobileOpen] = useState(false)
  const localHost = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)

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

  const trackLessons = lessonsFor(activeTrack)
  const doneCount = trackLessons.filter((lesson) => progress.done.includes(lesson.id)).length
  const homeTo = '/paths'

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
    const pageName = shellPageName({
      lesson: currentLesson ? shortTitle(currentLesson.title) : '',
      lab: onLab ? labTitle : '',
      note: aiNav?.noteTitle || '',
      section: onAi ? aiNav?.sectionLabel || '' : '',
      pathname: location.pathname,
      track: isTrack(routeTrack) ? TRACK_LABEL[routeTrack] : '',
    })
    document.title = pageName ? `${pageName} · 全栈学习实验室` : '全栈学习实验室'
  }, [currentLesson, progress.remember, onLab, onAi, aiNav, labTitle, location.pathname, routeTrack])

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

  const doneIds = progress.done
  const menuItems = useMemo(() => {
    const done = new Set(doneIds)
    const hold = (key: string) => [{ key: `hold:${key}`, label: <span className="menu-hold" />, disabled: true }]
    const lessonNode = (lesson: NonNullable<ReturnType<typeof findLesson>>) => ({
      key: lesson.id,
      label: (
        <Link
          to={lessonPath(lesson)}
          className="lesson-label"
          onClick={() => {
            progress.remember(lesson.id)
            setMobileOpen(false)
          }}
        >
          <span className={`lesson-status${done.has(lesson.id) ? ' is-done' : ''}`} aria-hidden />
          <span>{shortTitle(lesson.title)}</span>
          {isVersionSince(lesson.since) ? <span className="since-chip">{lesson.since}</span> : null}
        </Link>
      ),
    })

    return courseGroups(activeTrack).map((group, index) => {
      const items = lessonsInGroup(activeTrack, group.name)
      const completed = items.filter((lesson) => done.has(lesson.id)).length
      const groupOpen = !menuCollapsed && group.key === activeGroupKey
      const sections = outlineFor(activeTrack, group.name)
      const listed = new Set(sections.flatMap((section) => section.ids))
      const children = !groupOpen
        ? hold(group.key)
        : sections.length >= 2
          ? [
              ...sections.map((section, sectionIndex) => {
                const sectionKey = `section:${group.key}:${sectionIndex}`
                const sectionLessons = section.ids
                  .map((id) => findLesson(id))
                  .filter((item): item is NonNullable<ReturnType<typeof findLesson>> => !!item && item.group === group.name)
                const sectionDone = sectionLessons.filter((lesson) => done.has(lesson.id)).length
                const sectionOpen = currentSectionKey === sectionKey || openSections.includes(sectionKey)
                return {
                  key: sectionKey,
                  label: (
                    <span className="section-label">
                      <span>{section.title}</span>
                      <span className="group-count">{sectionDone}/{sectionLessons.length}</span>
                    </span>
                  ),
                  children: sectionOpen ? sectionLessons.map(lessonNode) : hold(sectionKey),
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
  }, [activeTrack, activeGroupKey, doneIds, menuCollapsed, currentSectionKey, openSections, progress.remember])

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
    { key: 'catalog', icon: <UnorderedListOutlined />, label: '课表' },
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
    { key: 'drill', icon: <FormOutlined />, label: '选择题' },
  ]

  const navSelected = (() => {
    if (location.pathname === '/paths' || location.pathname.startsWith('/paths/')) return 'home'
    if (courseGroup && !courseLesson && isTrack(courseGroup.params.track)) return 'catalog'
    if (location.pathname.startsWith('/knowledge')) return 'knowledge'
    if (location.pathname.startsWith('/audit')) return 'audit'
    if (location.pathname.startsWith('/review')) return 'review'
    if (location.pathname.startsWith('/local')) return 'local'
    if (location.pathname.startsWith('/drill')) return 'drill'
    return ''
  })()

  useEffect(() => {
    const nav = document.querySelector('.top-nav')
    if (!(nav instanceof HTMLElement)) return
    const reveal = () => {
      const active = nav.querySelector('.top-nav-btn.is-active')
      if (!(active instanceof HTMLElement)) return
      const navBox = nav.getBoundingClientRect()
      const itemBox = active.getBoundingClientRect()
      if (itemBox.left < navBox.left - 1) nav.scrollLeft -= navBox.left - itemBox.left
      else if (itemBox.right > navBox.right + 1) nav.scrollLeft += itemBox.right - navBox.right
    }
    reveal()
    window.addEventListener('resize', reveal)
    return () => window.removeEventListener('resize', reveal)
  }, [location.pathname])

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
      <RouteTransition />
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
                    if (item.key === 'catalog') {
                      navigate(resumePath(progress.track, progress.group))
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
              {onDrill ? `积分 ${drillPoints ?? '…'}` : onAi ? `${aiNav?.noteCount ?? '…'} 篇` : `${doneCount}/${trackLessons.length}`}
            </span>
            <TransitionAudioButton />
            <Button
              type="text"
              icon={progress.theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => progress.setTheme(progress.theme === 'dark' ? 'light' : 'dark')}
              aria-label="切换深浅色"
            />
          </div>
        </header>

        <div className={onLab || onDrill ? 'workspace is-workbench' : 'workspace'}>
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
              <Suspense fallback={<RouteSkeleton />}>
                <Outlet context={{ localReady, reconnectLocal, localHost }} />
              </Suspense>
            </ReadingBoundary>
          </Content>
          {!onLab && !onDrill && (
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

function shellPageName(page: {
  lesson: string
  lab: string
  note: string
  section: string
  pathname: string
  track: string
}) {
  if (page.lesson) return page.lesson
  if (page.lab) return `${page.lab} · AI`
  if (page.note) return `${page.note} · AI`
  if (page.section) return `${page.section} · AI`
  if (page.pathname.startsWith('/paths')) return '学习路线'
  if (page.pathname.startsWith('/skills')) return '技能'
  if (page.pathname.startsWith('/drill')) return '选择题'
  if (page.pathname.startsWith('/knowledge')) return '知识库'
  if (page.pathname.startsWith('/audit')) return '知识核验'
  if (page.pathname.startsWith('/review')) return '复习清单'
  if (page.pathname.startsWith('/local')) return '我的资料'
  if (page.track) return '课表'
  return ''
}

function lessonIdFromHref(href: string) {
  const parts = href.replace(/^#/, '').split('?')[0].split('/').filter(Boolean)
  if (parts.length === 3 && (parts[0] === 'frontend' || parts[0] === 'java')) return parts[2]
  return ''
}
