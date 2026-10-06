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
import { Badge, Button, Drawer, Layout, Menu, Space, Typography, theme } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { findLesson, groupsFor, lessonsFor, lessonsInGroup } from '@/data/curriculum'
import { TRACK_LABEL } from '@/data/meta'
import { probeLocalLibrary } from '@/api/localLibrary'
import { useProgress } from '@/state/progress'
import { ProgressAside } from '@/components/ProgressAside'

const { Sider, Content } = Layout

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const progress = useProgress()
  const { token } = theme.useToken()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [localReady, setLocalReady] = useState(false)

  useEffect(() => {
    void probeLocalLibrary().then(setLocalReady)
  }, [])

  const groups = groupsFor(progress.track)
  const trackLessons = lessonsFor(progress.track)
  const doneCount = trackLessons.filter((lesson) => progress.done.includes(lesson.id)).length

  const currentLesson = useMemo(() => {
    if (!location.pathname.startsWith('/lesson/')) return undefined
    const id = decodeURIComponent(location.pathname.replace('/lesson/', ''))
    return findLesson(id)
  }, [location.pathname])

  useEffect(() => {
    if (!currentLesson) return
    if (progress.track !== currentLesson.track) {
      progress.setTrack(currentLesson.track)
      progress.setGroup(currentLesson.group)
      return
    }
    if (progress.group !== currentLesson.group) progress.setGroup(currentLesson.group)
  }, [
    currentLesson,
    progress.track,
    progress.group,
    progress.setTrack,
    progress.setGroup,
  ])

  const selectedKeys = currentLesson ? [currentLesson.id] : []
  const openKeys = progress.group ? [`group:${progress.group}`] : []

  const menuItems = groups.map((group, index) => {
    const items = lessonsInGroup(progress.track, group)
    const completed = items.filter((lesson) => progress.done.includes(lesson.id)).length
    return {
      key: `group:${group}`,
      label: (
        <span className="group-label">
          <span className="group-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="group-name">{group}</span>
          <span className="group-count">
            {completed}/{items.length}
          </span>
        </span>
      ),
      children: items.map((lesson) => ({
        key: lesson.id,
        label: (
          <span className="lesson-label">
            <span aria-hidden>{progress.done.includes(lesson.id) ? '✓' : '·'}</span>
            <span>{lesson.title}</span>
          </span>
        ),
      })),
    }
  })

  const navItems = [
    { key: 'home', icon: <ReadOutlined />, label: '学习路线' },
    { key: 'knowledge', icon: <BookOutlined />, label: '知识库' },
    { key: 'audit', icon: <ExperimentOutlined />, label: '知识核验' },
    {
      key: 'review',
      icon: <CheckSquareOutlined />,
      label: '复习清单',
      badge: progress.review.length,
    },
    ...(localReady
      ? [{ key: 'local', icon: <FolderOpenOutlined />, label: '本机资料', badge: 0 }]
      : []),
  ]

  const navSelected = (() => {
    if (
      location.pathname.startsWith('/lesson') ||
      location.pathname === '/' ||
      location.pathname === '/home'
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
        <span className="sider-label">Learning Path</span>
        <div className="track-switch">
          {(['frontend', 'java'] as const).map((track) => (
            <Button
              key={track}
              type={progress.track === track ? 'primary' : 'default'}
              onClick={() => {
                progress.setTrack(track)
                navigate('/home')
                setMobileOpen(false)
              }}
            >
              {TRACK_LABEL[track]}
            </Button>
          ))}
        </div>
      </div>
      <Menu
        className="path-menu"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={(keys) => {
          const groupKeys = keys.filter((key) => String(key).startsWith('group:'))
          const newest = groupKeys.find((key) => !openKeys.includes(String(key))) || groupKeys[groupKeys.length - 1]
          if (typeof newest === 'string') progress.setGroup(newest.slice(6))
          else progress.setGroup('')
        }}
        onClick={({ key }) => {
          if (!String(key).startsWith('group:')) {
            progress.remember(String(key))
            navigate(`/lesson/${encodeURIComponent(String(key))}`)
            setMobileOpen(false)
          }
        }}
        items={menuItems}
      />
      <div className="sider-foot">
        <Typography.Text type="secondary" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
          SOURCE LABS
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
      <Sider className="app-sider" width={292} trigger={null} collapsible={false}>
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
          <Link to="/home" className="brand-lockup">
            <span className="brand-mark">FS</span>
            <span className="brand-text">
              <strong>全栈学习实验室</strong>
              <small>Fullstack Learning Lab</small>
            </span>
          </Link>

          <nav className="top-nav" aria-label="主导航">
            {navItems.map((item) => {
              const active = navSelected === item.key
              const label = (
                <Space size={6}>
                  {item.icon}
                  <span className="nav-label-wide">{item.label}</span>
                </Space>
              )
              return (
                <Button
                  key={item.key}
                  className={`top-nav-btn${active ? ' is-active' : ''}`}
                  onClick={() => navigate(`/${item.key === 'home' ? 'home' : item.key}`)}
                >
                  {'badge' in item && item.badge ? (
                    <Badge count={item.badge} size="small" offset={[6, -2]}>
                      {label}
                    </Badge>
                  ) : (
                    label
                  )}
                </Button>
              )
            })}
          </nav>

          <Space size={8}>
            <Typography.Text type="secondary" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {doneCount}/{trackLessons.length}
            </Typography.Text>
            <Button
              type="text"
              icon={progress.theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => progress.setTheme(progress.theme === 'dark' ? 'light' : 'dark')}
              aria-label="切换深浅色"
            />
          </Space>
        </header>

        <div className="workspace">
          <Content className="app-main">
            <Outlet context={{ localReady }} />
          </Content>
          <aside className="app-aside">
            <ProgressAside localReady={localReady} />
          </aside>
        </div>
      </div>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        width={300}
        title="课程目录"
        styles={{ body: { padding: 0 }, header: { borderBottom: `1px solid ${token.colorBorderSecondary}` } }}
      >
        {siderBody}
      </Drawer>

      <style>{`
        .group-label {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }
        .group-index {
          color: var(--lab-muted);
          font-variant-numeric: tabular-nums;
          font-size: 12px;
        }
        .group-name {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .group-count {
          color: var(--lab-muted);
          font-size: 12px;
        }
        .lesson-label {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          white-space: normal;
          line-height: 1.35;
          padding-block: 2px;
        }
      `}</style>
    </Layout>
  )
}
