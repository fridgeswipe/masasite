import React, { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { DemoOverlay } from '../demos/DemoOverlay'
import { MakinenDemo } from '../demos/MakinenDemo'
import { KultainenDemo } from '../demos/KultainenDemo'
import { ViialaDemo } from '../demos/ViialaDemo'
import { LaineDemo } from '../demos/LaineDemo'
import './Works.css'

// ── Project data ───────────────────────────────────────────────────────────────

interface Project {
  id: string
  title: string
  type: string
  desc: string
  accent: string
  dots: string[]
  urlLabel: string
}

const PROJECTS: Project[] = [
  {
    id: 'makinen',
    title: 'Rakennusliike Mäkinen',
    type: 'Yrityssivu',
    desc: 'Moderni yrityssivu rakennusalan ammattilaiselle. Palvelut, referenssit ja yhteydenotto.',
    accent: '#3b82f6',
    dots: ['#ff5f57', '#febc2e', '#28c840'],
    urlLabel: 'makinen-rakennus.fi',
  },
  {
    id: 'kultainen',
    title: 'Kahvila Kultainen',
    type: 'Verkkokauppa',
    desc: 'Käsintehtyjen kahvileivosten tilaussivu. Kalenteri, kuvakirjasto ja maksuintegraatio.',
    accent: '#f59e0b',
    dots: ['#ff5f57', '#febc2e', '#28c840'],
    urlLabel: 'kahvilakultainen.fi',
  },
  {
    id: 'viiala',
    title: 'Parturi Viiala',
    type: 'Ajanvaraussivu',
    desc: 'Selkeä ajanvaraussivu parturityölle. Kalenteri suoraan sivulle integroituna.',
    accent: '#e879a0',
    dots: ['#ff5f57', '#febc2e', '#28c840'],
    urlLabel: 'parturiviiala.fi',
  },
  {
    id: 'laine',
    title: 'Fysioterapia Laine',
    type: 'Palvelusivu',
    desc: 'Ammattimainen esittelysivu fysioterapeutille. Hoidot, hinnat ja Google Maps.',
    accent: '#10b981',
    dots: ['#ff5f57', '#febc2e', '#28c840'],
    urlLabel: 'fysioterapialaine.fi',
  },
]

// ── Demo components map ────────────────────────────────────────────────────────

const DEMOS: Record<string, () => React.ReactElement> = {
  makinen:  MakinenDemo,
  kultainen: KultainenDemo,
  viiala:   ViialaDemo,
  laine:    LaineDemo,
}

// ── Mockup screens ─────────────────────────────────────────────────────────────

function MakinenScreen() {
  return (
    <div className="ms ms-makinen">
      <div className="ms-nav">
        <span className="ms-logo" style={{ color: '#3b82f6', fontWeight: 700, fontSize: 11 }}>MÄKINEN</span>
        <div className="ms-nav-links">
          {['Palvelut','Referenssit','Yhteystiedot'].map(l => (
            <span key={l} className="ms-navlink">{l}</span>
          ))}
        </div>
      </div>
      <div className="ms-scroll">
        <div style={{ background: 'linear-gradient(160deg,#0f2044 0%,#0a1628 100%)', padding: '14px 14px 10px' }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 4 }}>
            Rakentamista<br />ammattitaidolla
          </div>
          <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Yli 20 vuoden kokemus talonrakennuksesta</div>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ background: '#3b82f6', color: '#fff', fontSize: 6, padding: '3px 8px', borderRadius: 3, fontWeight: 600 }}>Pyydä tarjous</div>
            <div style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)', fontSize: 6, padding: '3px 8px', borderRadius: 3 }}>Referenssit</div>
          </div>
        </div>
        <div style={{ padding: '8px 14px', display: 'flex', gap: 6 }}>
          {['Uudisrakentaminen','Saneeraukset','Pihatyöt'].map(s => (
            <div key={s} style={{ flex: 1, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 4, padding: '5px 4px', textAlign: 'center' }}>
              <div style={{ width: 12, height: 12, background: '#3b82f6', borderRadius: 3, margin: '0 auto 3px', opacity: 0.7 }} />
              <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ margin: '0 14px', height: 1, background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 22, height: 22, background: 'rgba(59,130,246,0.15)', borderRadius: '50%', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 2 }}>Ota yhteyttä</div>
            <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.4)' }}>info@makinen-rakennus.fi</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KultainenScreen() {
  return (
    <div className="ms ms-kultainen">
      <div className="ms-nav" style={{ background: '#1c0e00' }}>
        <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: 10, fontStyle: 'italic' }}>Kultainen</span>
        <div className="ms-nav-links">
          {['Menu','Tilaa','Galleria'].map(l => (
            <span key={l} className="ms-navlink">{l}</span>
          ))}
        </div>
      </div>
      <div className="ms-scroll">
        <div style={{ height: 56, background: 'linear-gradient(135deg,#3d1a00,#5c2a00)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 22, opacity: 0.4 }}>☕</div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,14,0,0.8) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 6, left: 10, fontSize: 8, color: '#f59e0b', fontWeight: 700 }}>Käsintehtyä joka päivä</div>
        </div>
        <div style={{ padding: '7px 12px', background: '#1c0e00' }}>
          <div style={{ fontSize: 6, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>Menu</div>
          {[['Croissant','3,80 €'],['Cinnamon Roll','4,20 €'],['Cappuccino','4,50 €']].map(([n, p]) => (
            <div key={n} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(245,158,11,0.1)', padding: '3px 0', fontSize: 6, color: 'rgba(255,255,255,0.7)' }}>
              <span>{n}</span><span style={{ color: '#f59e0b' }}>{p}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '6px 12px', background: 'rgba(245,158,11,0.06)' }}>
          <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.45)', marginBottom: 3 }}>Ma–Pe 07–18 · La–Su 09–16</div>
          <div style={{ background: '#f59e0b', color: '#000', fontSize: 6, padding: '3px 10px', borderRadius: 3, display: 'inline-block', fontWeight: 700 }}>Tilaa noudettavaksi</div>
        </div>
      </div>
    </div>
  )
}

function ViialaScreen() {
  return (
    <div className="ms ms-viiala">
      <div className="ms-nav" style={{ background: '#1a0d1a' }}>
        <span style={{ color: '#e879a0', fontWeight: 700, fontSize: 10 }}>Viiala</span>
        <div className="ms-nav-links">
          {['Palvelut','Ajanvaraus','Hinnasto'].map(l => (
            <span key={l} className="ms-navlink">{l}</span>
          ))}
        </div>
      </div>
      <div className="ms-scroll">
        <div style={{ background: 'linear-gradient(160deg,#1a0d1a,#0d0a14)', padding: '12px 12px 8px', textAlign: 'center' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Tyylikäs leikkaus,<br />joka kerta</div>
          <div style={{ background: '#e879a0', color: '#fff', fontSize: 6.5, padding: '4px 14px', borderRadius: 20, display: 'inline-block', fontWeight: 600, marginBottom: 6 }}>📅 Varaa aika</div>
        </div>
        <div style={{ padding: '6px 12px', background: '#120a12' }}>
          <div style={{ fontSize: 6, color: '#e879a0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Hinnasto</div>
          {[['Miesten leikkaus','25 €'],['Parranajo','15 €'],['Leikkaus + parta','35 €']].map(([n, p]) => (
            <div key={n} style={{ display: 'flex', justifyContent: 'space-between', padding: '2.5px 0', fontSize: 5.5, color: 'rgba(255,255,255,0.65)', borderBottom: '1px solid rgba(232,121,160,0.08)' }}>
              <span>{n}</span><span style={{ color: '#e879a0' }}>{p}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '5px 12px', background: 'rgba(232,121,160,0.05)', display: 'flex', gap: 6 }}>
          {['Aleksi','Mikko','Sara'].map(n => (
            <div key={n} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(232,121,160,0.2)', border: '1px solid rgba(232,121,160,0.3)', margin: '0 auto 2px' }} />
              <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)' }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LaineScreen() {
  return (
    <div className="ms ms-laine">
      <div className="ms-nav" style={{ background: '#f0faf4', borderBottom: '1px solid rgba(16,185,129,0.15)' }}>
        <span style={{ color: '#10b981', fontWeight: 700, fontSize: 10 }}>Laine FT</span>
        <div className="ms-nav-links">
          {['Hoidot','Hinnat','Sijainti'].map(l => (
            <span key={l} style={{ fontSize: 5.5, color: '#374151', marginLeft: 6 }}>{l}</span>
          ))}
        </div>
      </div>
      <div className="ms-scroll">
        <div style={{ background: 'linear-gradient(135deg,#f0faf4,#e6f7ef)', padding: '10px 12px 7px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#064e3b', lineHeight: 1.3, marginBottom: 3 }}>Ammattimaista fysioterapiaa</div>
          <div style={{ fontSize: 5.5, color: '#6b7280', marginBottom: 7 }}>Yksilöllinen hoito, nopea toipuminen</div>
          <div style={{ background: '#10b981', color: '#fff', fontSize: 6, padding: '3px 9px', borderRadius: 3, display: 'inline-block', fontWeight: 600 }}>Varaa aika</div>
        </div>
        <div style={{ padding: '6px 12px', background: '#fff' }}>
          <div style={{ fontSize: 6, color: '#10b981', fontWeight: 600, marginBottom: 4 }}>Hoidot</div>
          {['Perusfysioterapia','Urheilufysioterapia','Hieronta','Kotikäynti'].map(h => (
            <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0', fontSize: 5.5, color: '#374151' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
              {h}
            </div>
          ))}
        </div>
        <div style={{ padding: '5px 12px', background: '#f0faf4', display: 'flex', gap: 4, alignItems: 'center' }}>
          <div style={{ width: 36, height: 22, background: 'rgba(16,185,129,0.15)', borderRadius: 3, border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10 }}>🗺️</span>
          </div>
          <div>
            <div style={{ fontSize: 5.5, color: '#064e3b', fontWeight: 600 }}>Mannerheimintie 12, Helsinki</div>
            <div style={{ fontSize: 5, color: '#6b7280' }}>Näytä reitti</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SCREENS: Record<string, () => React.ReactElement> = {
  makinen: MakinenScreen,
  kultainen: KultainenScreen,
  viiala: ViialaScreen,
  laine: LaineScreen,
}

// ── Browser chrome wrapper ─────────────────────────────────────────────────────

function BrowserMock({ project }: { project: Project }) {
  const Screen = SCREENS[project.id]
  return (
    <div className="browser-mock">
      <div className="browser-bar">
        <div className="browser-dots">
          {project.dots.map((c, i) => (
            <span key={i} className="browser-dot" style={{ background: c }} />
          ))}
        </div>
        <div className="browser-url">
          <span className="url-lock">
            <svg width="7" height="8" viewBox="0 0 8 9" fill="none" aria-hidden>
              <path d="M1.5 4V3a2.5 2.5 0 0 1 5 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <rect x="0.5" y="3.5" width="7" height="5" rx="1" fill="currentColor" opacity="0.25"/>
            </svg>
          </span>
          <span className="url-text">{project.urlLabel}</span>
        </div>
      </div>
      <div className="browser-screen">
        <Screen />
      </div>
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Works() {
  const secRef = useRef<HTMLElement>(null!)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useGSAP(
    () => {
      gsap.from('.works-header', {
        y: 32,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.works-header',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.project-card', {
        y: 56,
        scale: 0.97,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: secRef },
  )

  const ActiveDemo = activeProject ? DEMOS[activeProject.id] : null

  return (
    <>
      <section ref={secRef} id="portfolio" className="works-section">
        <div className="works-inner">
          <header className="works-header">
            <p className="eyebrow">Referenssit</p>
            <h2 className="works-title">Aiempia töitä</h2>
            <p className="works-subtitle">
              Jokainen sivu on rakennettu alusta loppuun käsin —
              ei malleja, ei pikakoodia.
            </p>
          </header>

          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <article
                key={p.id}
                className="project-card"
                onClick={() => setActiveProject(p)}
                role="button"
                tabIndex={0}
                aria-label={`Avaa ${p.title} demo`}
                onKeyDown={e => e.key === 'Enter' && setActiveProject(p)}
              >
                <BrowserMock project={p} />
                <div className="project-info">
                  <span className="project-type" style={{ color: p.accent, borderColor: `${p.accent}33`, background: `${p.accent}0d` }}>
                    {p.type}
                  </span>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <span className="project-open" style={{ color: p.accent }}>
                    Avaa demo →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeProject && ActiveDemo && (
        <DemoOverlay
          urlLabel={activeProject.urlLabel}
          title={activeProject.title}
          onClose={() => setActiveProject(null)}
        >
          <ActiveDemo />
        </DemoOverlay>
      )}
    </>
  )
}
