import { useRef, useState, type FormEvent } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import './Contact.css'

// ── Icons ─────────────────────────────────────────────────────────────────────

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m2 7 10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Contact() {
  const secRef = useRef<HTMLElement>(null!)
  const [sent, setSent] = useState(false)

  useGSAP(
    () => {
      gsap.from('.contact-header', {
        y: 32,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-header',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.contact-grid > *', {
        y: 48,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: secRef },
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(fd as unknown as Record<string, string>).toString(),
      })
    } catch {
      // fire-and-forget — show success regardless
    }
    setSent(true)
  }

  return (
    <section ref={secRef} id="yhteystiedot" className="contact-section">
      <div className="contact-inner">
        <header className="contact-header">
          <p className="eyebrow">Yhteystiedot</p>
          <h2 className="contact-title">Ota yhteyttä</h2>
          <p className="contact-subtitle">
            Kerro projektistasi — vastataan yleensä saman päivän aikana.
          </p>
        </header>

        <div className="contact-grid">
          {/* Info side */}
          <div className="contact-info">
            <div className="info-block">
              <h3 className="info-heading">Masa</h3>
              <p className="info-role">Web-kehittäjä, Helsinki</p>
            </div>

            <div className="contact-links">
              <a href="mailto:team@masasite.com" className="contact-link">
                <span className="contact-link-icon"><MailIcon /></span>
                <span>team@masasite.com</span>
              </a>
            </div>

            <div className="response-badge">
              <span className="response-dot" aria-hidden />
              <span>Vastataan yleensä alle 4 tunnissa</span>
            </div>
          </div>

          {/* Form side */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="form-success">
                <div className="success-icon" aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="success-title">Viesti lähetetty!</h3>
                <p className="success-body">Otan sinuun yhteyttä pian.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate
              data-netlify="true" name="contact" method="POST">
              <input type="hidden" name="form-name" value="contact" />
                <div className="field-row">
                  <div className="field">
                    <label className="field-label" htmlFor="name">Nimi</label>
                    <input id="name" name="name" type="text" className="field-input" placeholder="Matti Virtanen" required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="email">Sähköposti</label>
                    <input id="email" name="email" type="email" className="field-input" placeholder="sinä@esimerkki.fi" required autoComplete="email" />
                  </div>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="project">Projektista lyhyesti</label>
                  <textarea id="project" name="project" className="field-input field-textarea" placeholder="Esim. Yrityssivut kirvesmiehelle, tarvitaan ajanvaraus ja yhteydenottolomake..." rows={4} required />
                </div>

                <button type="submit" className="form-submit">
                  <span className="submit-label">Lähetä viesti</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-brand">masasite</span>
          <span className="footer-copy">© 2026 · Helsinki, Suomi</span>
        </div>
      </footer>
    </section>
  )
}
