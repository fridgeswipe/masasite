import { useEffect, useCallback } from 'react'
import './DemoModal.css'

interface Props {
  url: string
  title: string
  onClose: () => void
}

export function DemoModal({ url, title, onClose }: Props) {
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

  return (
    <div className="dm-overlay" role="dialog" aria-modal aria-label={title}>
      {/* Browser chrome */}
      <div className="dm-chrome">
        <div className="dm-dots">
          <button className="dm-dot dm-red" onClick={onClose} aria-label="Close" title="Close" />
          <span className="dm-dot dm-yellow" aria-hidden />
          <span className="dm-dot dm-green" aria-hidden />
        </div>
        <div className="dm-urlbar">
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden>
            <path d="M1.5 4.5V3.5a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <rect x="0.5" y="4" width="8" height="5.5" rx="1.5" fill="currentColor" opacity="0.22"/>
          </svg>
          masasite.com/demo
        </div>
        <button className="dm-close-btn" onClick={onClose} aria-label="Close demo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Notice bar */}
      <div className="dm-notice">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Demo site — an example of what we can build for your business.
      </div>

      {/* iframe */}
      <iframe
        className="dm-frame"
        src={url}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />

      {/* Floating CTA */}
      <a
        href="mailto:team@masasite.com?subject=I want a website like this"
        className="dm-float-cta"
      >
        I want one like this →
      </a>
    </div>
  )
}
