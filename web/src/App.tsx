import { App as AntApp, ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { ProgressProvider, useProgress } from '@/state/progress'
import { AuditPage } from '@/pages/AuditPage'
import { HomePage } from '@/pages/HomePage'
import { KnowledgePage } from '@/pages/KnowledgePage'
import { LessonPage } from '@/pages/LessonPage'
import { LocalItemPage } from '@/pages/LocalItemPage'
import { LocalPage } from '@/pages/LocalPage'
import { ReviewPage } from '@/pages/ReviewPage'

function ThemedApp() {
  const progress = useProgress()
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: progress.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#0b6b4f',
          colorInfo: '#0b6b4f',
          colorBgLayout: 'transparent',
          borderRadius: 12,
          fontFamily:
            "'IBM Plex Sans', 'Noto Sans SC', 'PingFang SC', sans-serif",
          fontSize: 14,
          controlHeight: 36,
        },
        components: {
          Layout: {
            headerBg: 'transparent',
            bodyBg: 'transparent',
            siderBg: 'transparent',
          },
          Menu: {
            itemBorderRadius: 10,
            itemMarginInline: 4,
            iconSize: 14,
          },
          Card: {
            paddingLG: 20,
          },
          Button: {
            borderRadius: 10,
          },
        },
      }}
    >
      <AntApp>
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="lesson/:lessonId" element={<LessonPage />} />
              <Route path="knowledge" element={<KnowledgePage />} />
              <Route path="library" element={<Navigate to="/knowledge" replace />} />
              <Route path="audit" element={<AuditPage />} />
              <Route path="review" element={<ReviewPage />} />
              <Route path="saved" element={<Navigate to="/review" replace />} />
              <Route path="local" element={<LocalPage />} />
              <Route path="local/item/:itemId" element={<LocalItemPage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  )
}

export default function App() {
  return (
    <ProgressProvider>
      <ThemedApp />
    </ProgressProvider>
  )
}
