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
import { groupsFor, lessonsFor, lessonsInGroup } from '@/data/curriculum'
import { TRACK_LABEL } from '@/data/meta'
import { probeLocalLibrary } from '@/api/localLibrary'
import { useProgress } from '@/state/progress'
import { ProgressAside } from '@/components/ProgressAside'

const { Header, Sider, Content } = Layout

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

  const selectedKeys = useMemo(() => {
    if (location.pathname.startsWith('/lesson/')) {
      const id = decodeURIComponent(location.pathname.replace('/lesson/', ''))
      return [id]
    }
    return []
  }, [location.pathname])

  const openKeys = progress.group ? [`group:${progress.group}`] : []

  const menuItems = groups.map((group, index) => {
    const items = lessonsInGroup(progress.track, group)
    const completed = items.filter((lesson) => progress.done.includes(lesson.id)).length
    return {
      key: `group:${group}`,
      label: (
        <Space size={8}>
          <Typography.Text type="secondary" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {String(index + 1).padStart(2, '0')}
          </Typography.Text>
          <span>{group}</span>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {completed}/{items.length}
          </Typography.Text>
        </Space>
      ),
      children: items.map((lesson) => ({
        key: lesson.id,
        label: (
          <Space size={6}>
            <span>{progress.done.includes(lesson.id) ? '✓' : '·'}</span>
            <span>{lesson.title}</span>
          </Space>
        ),
      })),
    }
  })

  const navSelected = (() => {
    if (location.pathname.startsWith('/lesson') || location.pathname === '/' || location.pathname === '/home')
      return ['home']
    if (location.pathname.startsWith('/knowledge')) return ['knowledge']
    if (location.pathname.startsWith('/audit')) return ['audit']
    if (location.pathname.startsWith('/review')) return ['review']
    if (location.pathname.startsWith('/local')) return ['local']
    return []
  })()

  const sider = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '16px 16px 8px' }}>
        <Typography.Text type="secondary" style={{ fontSize: 12, letterSpacing: 0.6 }}>
          LEARNING PATH
        </Typography.Text>
        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
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
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={(keys) => {
          const last = keys[keys.length - 1]
          if (typeof last === 'string' && last.startsWith('group:')) {
            progress.setGroup(last.slice(6))
          }
        }}
        onClick={({ key }) => {
          if (!String(key).startsWith('group:')) {
            progress.remember(String(key))
            navigate(`/lesson/${encodeURIComponent(String(key))}`)
            setMobileOpen(false)
          }
        }}
        items={menuItems}
        style={{ flex: 1, borderInlineEnd: 0, overflow: 'auto' }}
      />
      <div style={{ padding: 16, borderTop: `1px solid ${token.colorBorderSecondary}` }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          REACT / VUE SOURCE
        </Typography.Text>
        <div style={{ marginTop: 8 }}>
          <a href="https://xuyuanzhou.github.io/react-mastery-lab/" target="_blank" rel="noreferrer">
            React Mastery Lab ↗
          </a>
        </div>
        <div style={{ marginTop: 6 }}>
          <a href="https://xuyuanzhou.github.io/vue3-mastery-lab/#/" target="_blank" rel="noreferrer">
            Vue 3 Mastery Lab ↗
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <Layout className="app-shell">
      <Sider
        width={280}
        breakpoint="lg"
        collapsedWidth={0}
        trigger={null}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        {sider}
      </Sider>

      <div className="app-content">
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingInline: 20,
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Space>
            <Button
              className="mobile-only"
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileOpen(true)}
              style={{ display: 'none' }}
            />
            <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Space size={10}>
                <Typography.Text strong style={{ fontSize: 16 }}>
                  全栈学习实验室
                </Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  FULLSTACK LEARNING LAB
                </Typography.Text>
              </Space>
            </Link>
          </Space>
          <Menu
            mode="horizontal"
            selectedKeys={navSelected}
            style={{ flex: 1, minWidth: 0, justifyContent: 'center', borderBottom: 'none' }}
            items={[
              { key: 'home', icon: <ReadOutlined />, label: '学习路线' },
              { key: 'knowledge', icon: <BookOutlined />, label: '知识库' },
              { key: 'audit', icon: <ExperimentOutlined />, label: '知识核验' },
              {
                key: 'review',
                icon: <CheckSquareOutlined />,
                label: (
                  <Badge count={progress.review.length} size="small" offset={[8, 0]}>
                    复习清单
                  </Badge>
                ),
              },
              ...(localReady
                ? [{ key: 'local', icon: <FolderOpenOutlined />, label: '本机资料' }]
                : []),
            ]}
            onClick={({ key }) => navigate(`/${key === 'home' ? 'home' : key}`)}
          />
          <Space>
            <Typography.Text type="secondary">
              {doneCount}/{trackLessons.length} 已掌握
            </Typography.Text>
            <Button
              type="text"
              icon={progress.theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => progress.setTheme(progress.theme === 'dark' ? 'light' : 'dark')}
            />
          </Space>
        </Header>

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
        styles={{ body: { padding: 0 } }}
      >
        {sider}
      </Drawer>

      <style>{`
        @media (max-width: 992px) {
          .mobile-only { display: inline-flex !important; }
        }
      `}</style>
    </Layout>
  )
}
