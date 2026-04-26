import { useEffect, useCallback, type ReactNode } from 'react'
import { scrollToSection } from '../components/SmoothScroll'
import './DemoOverlay.css'

interface DemoOverlayProps {
  urlLabel: string
  title: string
  onClose: () => void
  children: ReactNode
}

export function DemoOverlay({ urlLabel, title, onClose, children }: DemoOverlayProps) {
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onKey])

  const handleCta = () => {
    onClose()
    setTimeout(() => scrollToSection('yhteystiedot'), 120)
  }

  return (
    <div className="demo-overlay" role="dialog" aria-modal aria-label={title}>

      {/* Browser chrome */}
      <div className="demo-chrome">
        <div className="demo-chrome-dots">
          <button className="demo-dot demo-dot-red" onClick={onClose} aria-label="Sulje" />
          <span className="demo-dot demo-dot-yellow" aria-hidden />
          <span className="demo-dot demo-dot-green" aria-hidden />
        </div>
        <div className="demo-urlbar" aria-label={`Sivusto: ${urlLabel}`}>
          <span className="demo-url-lock" aria-hidden>
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
              <path d="M1.5 4.5V3.5a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <rect x="0.5" y="4" width="8" height="5.5" rx="1.5" fill="currentColor" opacity="0.22"/>
            </svg>
          </span>
          {urlLabel}
        </div>
        <button className="demo-close" onClick={onClose} aria-label="Sulje demo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Preview notice bar */}
      <div className="demo-notice" role="status" aria-live="polite">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Tämä on mallisivu — esimerkki siitä, millaisen sivun voimme rakentaa sinulle.
      </div>

      {/* Scrollable site content — data-lenis-prevent stops Lenis hijacking wheel events */}
      <div className="demo-content" data-lenis-prevent>
        {children}
      </div>

      {/* Floating CTA */}
      <button className="demo-float-cta" onClick={handleCta}>
        Haluan samanlaisen
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </div>
  )
}
