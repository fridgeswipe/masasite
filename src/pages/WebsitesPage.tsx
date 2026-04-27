import { SmoothScroll } from '../components/SmoothScroll'
import { Navbar } from '../components/Navbar'
import { GrainOverlay, CursorGlow } from '../components/Ambient'
import { Hero } from '../sections/Hero'
import { HowItWorks } from '../sections/HowItWorks'
import { Stats } from '../sections/Stats'
import { Works } from '../sections/Works'
import { Pricing } from '../sections/Pricing'
import { Contact } from '../sections/Contact'

function Divider() {
  return <div className="section-glow-divider" aria-hidden />
}

export default function WebsitesPage() {
  return (
    <>
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
