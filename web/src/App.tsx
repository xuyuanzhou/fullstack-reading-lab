import { App as AntApp, ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { lazy, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { ProgressProvider, useProgress } from '@/state/progress'
import { AiNotePage, AiPage } from '@/pages/AiPage'
import { HomePage } from '@/pages/HomePage'
import { ReadingBoundary } from '@/components/ReadingBoundary'
import { findLesson } from '@/data/curriculum'
import { isTrack, lessonPath, resumePath } from '@/data/routes'

const AuditPage = lazy(() => import('@/pages/AuditPage').then(m => ({ default: m.AuditPage })))
const KnowledgePage = lazy(() => import('@/pages/KnowledgePage').then(m => ({ default: m.KnowledgePage })))
const LessonPage = lazy(() => import('@/pages/LessonPage').then(m => ({ default: m.LessonPage })))
const LocalItemPage = lazy(() => import('@/pages/LocalItemPage').then(m => ({ default: m.LocalItemPage })))
const LocalPage = lazy(() => import('@/pages/LocalPage').then(m => ({ default: m.LocalPage })))
const ReviewPage = lazy(() => import('@/pages/ReviewPage').then(m => ({ default: m.ReviewPage })))

function ResumeRoute() {
  const progress = useProgress()
  return <Navigate to={resumePath(progress.track, progress.group)} replace />
}

function LegacyLessonRedirect() {
  const { lessonId = '' } = useParams()
  let id = lessonId
  try { id = decodeURIComponent(lessonId) } catch { /* keep the raw segment */ }
  const lesson = findLesson(id)
  if (!lesson || !isTrack(lesson.track)) return <ResumeRoute />
  return <Navigate to={lessonPath(lesson)} replace />
}

function ThemedApp() {
  const progress = useProgress()
  const dark = progress.theme === 'dark'
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: dark ? '#8fb5a0' : '#3f6a58',
          colorInfo: dark ? '#8fb5a0' : '#3f6a58',
          colorLink: dark ? '#8fb5a0' : '#3f6a58',
          colorBgLayout: 'transparent',
          colorBgContainer: dark ? '#252925' : '#fafaf8',
          colorBgElevated: dark ? '#252925' : '#fafaf8',
          colorBorder: dark ? '#343a36' : '#d9ddd8',
          colorBorderSecondary: dark ? '#2b2f2c' : '#e6e9e5',
          colorText: dark ? '#d0d5d1' : '#2e3330',
          colorTextSecondary: dark ? '#919a94' : '#5e6661',
          borderRadius: 8,
          fontFamily: "'IBM Plex Sans', 'Noto Sans SC', 'PingFang SC', sans-serif",
          fontSize: 14,
          controlHeight: 34,
        },
        components: {
          Layout: {
            headerBg: 'transparent',
            bodyBg: 'transparent',
            siderBg: 'transparent',
          },
          Menu: {
            itemBorderRadius: 8,
            itemMarginInline: 0,
            itemHeight: 36,
            itemSelectedBg: dark ? '#2a3530' : '#e6efe9',
            itemSelectedColor: dark ? '#c5ddd0' : '#2d4f41',
            itemHoverBg: dark ? 'rgba(143, 181, 160, 0.12)' : 'rgba(63, 106, 88, 0.08)',
            subMenuItemBg: 'transparent',
          },
          Button: {
            borderRadius: 8,
            primaryShadow: 'none',
            defaultShadow: 'none',
          },
          Breadcrumb: {
            fontSize: 13,
          },
        },
      }}
    >
      <AntApp>
        <HashRouter>
          <Suspense fallback={<div className="route-loading" role="status">正在打开课程…</div>}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<ResumeRoute />} />
              <Route path="home" element={<ResumeRoute />} />
              <Route path="lesson/:lessonId" element={<LegacyLessonRedirect />} />
              <Route path="knowledge" element={<KnowledgePage />} />
              <Route path="library" element={<Navigate to="/knowledge" replace />} />
              <Route path="audit" element={<AuditPage />} />
              <Route path="review" element={<ReviewPage />} />
              <Route path="saved" element={<Navigate to="/review" replace />} />
              <Route path="local" element={<LocalPage />} />
              <Route path="local/item/:itemId" element={<LocalItemPage />} />
              <Route path="ai" element={<AiPage />} />
              <Route path="ai/:sectionKey" element={<AiPage />} />
              <Route path="ai/:sectionKey/:noteKey" element={<AiNotePage />} />
              <Route path=":track/:groupKey" element={<HomePage />} />
              <Route path=":track/:groupKey/:lessonId" element={<LessonPage />} />
              <Route path="*" element={<ResumeRoute />} />
            </Route>
          </Routes>
          </Suspense>
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  )
}

export default function App() {
  return (
    <ReadingBoundary><ProgressProvider>
      <ThemedApp />
    </ProgressProvider></ReadingBoundary>
  )
}
