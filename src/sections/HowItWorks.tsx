import { useRef, type ReactNode, type RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useTilt } from '../hooks/useTilt'
import './HowItWorks.css'

// ── Icons ─────────────────────────────────────────────────────────────────────

function ChatIcon() {
  return (
    <svg className="step-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        className="icon-path"
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg className="step-svg step-svg--code" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <polyline
        className="icon-path"
        points="16 18 22 12 16 6"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <polyline
        className="icon-path"
        points="8 6 2 12 8 18"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg className="step-svg step-svg--globe" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="icon-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        className="icon-path"
        d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

interface Step {
  num: string
  icon: ReactNode
  title: string
  desc: string
}

const STEPS: Step[] = [
  {
    num: '01',
    icon: <ChatIcon />,
    title: 'Kerrot mitä tarvitset',
    desc: 'Nopea tapaaminen tai viesti riittää. Käydään läpi tavoitteet, tyyli ja aikataulu.',
  },
  {
    num: '02',
    icon: <CodeIcon />,
    title: 'Rakennan sivusi',
    desc: 'Suunnittelen ja koodaan sivustosi ammattimaisesti. Saat päivityksiä koko matkan ajan.',
  },
  {
    num: '03',
    icon: <GlobeIcon />,
    title: 'Sivusi on verkossa',
    desc: 'Julkaisu aikataulussa. Saat täydet hallintaoikeudet ja jatkotuen pakettiin kuuluen.',
  },
]

// ── Tiltable card ─────────────────────────────────────────────────────────────

function StepCard({ step }: { step: Step }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLElement>(5)

  return (
    <article
      ref={ref as RefObject<HTMLElement>}
      className="step-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <span className="step-num">{step.num}</span>
      <div className="step-icon" aria-hidden>{step.icon}</div>
      <h3 className="step-title">{step.title}</h3>
      <p className="step-desc">{step.desc}</p>
    </article>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function HowItWorks() {
  const secRef = useRef<HTMLElement>(null!)

  useGSAP(
    () => {
      gsap.from('.hiw-header', {
        y: 32,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.hiw-header',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.step-card', {
        y: 56,
        scale: 0.95,
        autoAlpha: 0,
        stagger: 0.13,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.steps-grid',
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: secRef },
  )

  return (
    <section ref={secRef}>
      <div className="hiw">
        <header className="hiw-header">
          <p className="eyebrow">Prosessi</p>
          <h2 className="hiw-title">Näin se toimii</h2>
          <p className="hiw-subtitle">
            Kolme selkeää askelta ammattimaiseen verkkosivuun —
            ilman turhaa monimutkaisuutta.
          </p>
        </header>

        <div className="steps-grid">
          {STEPS.map((step) => (
            <StepCard key={step.num} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
