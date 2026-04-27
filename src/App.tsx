import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const HomePage     = lazy(() => import('./pages/HomePage'))
const WebsitesPage = lazy(() => import('./pages/WebsitesPage'))
const DevPage      = lazy(() => import('./pages/DevPage'))

const SuspenseFallback = () => (
  <div style={{ position: 'fixed', inset: 0, background: 'oklch(7% 0.015 250)' }} />
)

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/websites" element={<WebsitesPage />} />
          <Route path="/dev"      element={<DevPage />} />
          <Route path="*"         element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
