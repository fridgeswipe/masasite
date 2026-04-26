import { useRef, type RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useTilt } from '../hooks/useTilt'
import './Pricing.css'

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES = [
  'Yksilöllinen design — ei valmiita malleja',
  'Mobiilioptimoitu ja nopea lataus',
  'Hakukoneystävällinen (SEO)',
  'Suomenkielinen tuki koko projektin ajan',
  'Julkaisu ja domain-asetus mukana',
  'Täydet hallintaoikeudet sivuun',
  '30 päivän ilmainen tukiaika julkaisun jälkeen',
]

const ADDONS = [
  { label: 'Lisäsivu', price: '+49 €' },
  { label: 'Verkkokauppa', price: 'alk. +199 €' },
  { label: 'Ajanvaraus­integraatio', price: '+79 €' },
  { label: 'Ylläpito', price: '19 €/kk' },
]

// ── Check icon ────────────────────────────────────────────────────────────────

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeOpacity="0.3" />
      <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Pricing() {
  const secRef = useRef<HTMLElement>(null!)
  const { ref: cardRef, onMouseMove, onMouseLeave } = useTilt<HTMLElement>(4)

  useGSAP(
    () => {
      gsap.from('.pricing-header', {
        y: 32,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.pricing-header',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.pricing-card', {
        y: 56,
        autoAlpha: 0,
        duration: 0.95,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.pricing-card',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.addon-item', {
        y: 24,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.addons-row',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: secRef },
  )

  return (
    <section ref={secRef} id="hinnat" className="pricing-section">
      <div className="pricing-inner">
        <header className="pricing-header">
          <p className="eyebrow">Hinnoittelu</p>
          <h2 className="pricing-title">Selkeä hinta, ei yllätyksiä</h2>
          <p className="pricing-subtitle">
            Yksi paketti kattaa kaiken mitä tarvitset —
            ammattimainen sivu valmiiksi.
          </p>
        </header>

        <div className="pricing-layout">
          <article
            className="pricing-card"
            ref={cardRef as RefObject<HTMLElement>}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* Glow orb */}
            <div className="card-glow" aria-hidden />

            {/* Top */}
            <div className="card-top">
              <div className="card-badge">Perus­paketti</div>
              <div className="card-price-row">
                <span className="card-price">149</span>
                <span className="card-currency">€</span>
                <span className="card-period">/ sivu</span>
              </div>
              <p className="card-tagline">Kaikki mukana. Ei kuukausimaksuja.</p>
            </div>

            <div className="card-divider" />

            {/* Features */}
            <ul className="features-list">
              {FEATURES.map((f) => (
                <li key={f} className="feature-item">
                  <span className="feature-icon"><Check /></span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="card-divider" />

            {/* CTA */}
            <a href="#yhteystiedot" className="card-cta">
              <span className="card-cta-label">Aloita projekti</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <p className="card-note">Tyypillinen toimitusaika 5–10 arkipäivää</p>
          </article>
        </div>

        {/* Add-ons */}
        <div className="addons-section">
          <p className="addons-label">Lisäpalvelut</p>
          <div className="addons-row">
            {ADDONS.map((a) => (
              <div key={a.label} className="addon-item">
                <span className="addon-name">{a.label}</span>
                <span className="addon-price">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
