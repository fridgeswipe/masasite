import { useState } from 'react'
import './lib/gsap'
import { SmoothScroll } from './components/SmoothScroll'
import { Navbar } from './components/Navbar'
import { LoadingScreen } from './components/LoadingScreen'
import { CursorGlow, GrainOverlay } from './components/Ambient'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { Stats } from './sections/Stats'
import { Works } from './sections/Works'
import { Pricing } from './sections/Pricing'
import { Contact } from './sections/Contact'

function Divider() {
  return <div className="section-glow-divider" aria-hidden />
}

export default function App() {
  const [_loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <GrainOverlay />
      <CursorGlow />

      <SmoothScroll>
        <Navbar />
        <main style={{ backgroundColor: 'var(--color-bg)' }}>
          <Hero />
          <Divider />
          <HowItWorks />
          <Divider />
          <Stats />
          <Divider />
          <Works />
          <Divider />
          <Pricing />
          <Divider />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  )
}
