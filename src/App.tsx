import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LoadingScreen } from './components/LoadingScreen'

const HomePage     = lazy(() => import('./pages/HomePage'))
const WebsitesPage = lazy(() => import('./pages/WebsitesPage'))
const DevPage      = lazy(() => import('./pages/DevPage'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen onDone={() => {}} />}>
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
