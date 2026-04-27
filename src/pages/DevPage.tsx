import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './DevPage.css'
import { LoadingScreen } from '../components/LoadingScreen'

// Reuse cursor from HomePage
function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null!)
  const ringRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove, { passive: true })

    function tick() {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15
      dotRef.current.style.left  = mx + 'px'
      dotRef.current.style.top   = my + 'px'
      ringRef.current.style.left = rx + 'px'
      ringRef.current.style.top  = ry + 'px'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="hp-cursor" aria-hidden style={{ position:'fixed', zIndex:9999 }} />
      <div ref={ringRef} className="hp-cursor-ring" aria-hidden style={{ position:'fixed', zIndex:9998 }} />
    </>
  )
}

function useReveal(prefix = 'dp') {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll(`.${prefix}-reveal`).forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [prefix])
}

export default function DevPage() {
  const [scrolled, setScrolled] = useState(false)
  useReveal('dp')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navRef = useRef<HTMLAnchorElement>(null!)

  return (
    <div className="dp">
      <LoadingScreen onDone={() => {}} />
      <Cursor />

      {/* Nav */}
      <nav className={`dp-nav${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="dp-nav-logo">Masa<span>sites</span></Link>
        <div className="dp-nav-links">
          <Link to="/">Home</Link>
          <Link to="/websites">Websites</Link>
          <a href="https://mkxgroup.co" target="_blank" rel="noopener noreferrer">Work ↗</a>
          <a href="mailto:team@masasite.com" className="dp-nav-cta">Start a project</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="dp-hero">
        <div className="dp-orb dp-orb-1" />
        <div className="dp-orb dp-orb-2" />

        <div className="dp-hero-left">
          <div className="dp-eyebrow">Dev Services</div>
          <h1 className="dp-h1">
            <span className="line"><span className="line-inner">Software that</span></span>
            <span className="line"><span className="line-inner">actually</span></span>
            <span className="line"><span className="line-inner hi">ships.</span></span>
          </h1>
          <p className="dp-sub">
            Web apps, mobile apps, dashboards, AI integrations, automation. I turn complex ideas into elegant, working software — fast.
          </p>
          <div className="dp-actions">
            <a href="mailto:team@masasite.com" className="dp-btn-primary">Start a project →</a>
            <a href="https://mkxgroup.co" target="_blank" rel="noopener noreferrer" className="dp-btn-ghost">View live work ↗</a>
            <a href="https://www.fiverr.com/s/pD5d4l3" target="_blank" rel="noopener noreferrer" className="dp-btn-fiverr">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.987h-1.33C19.386 7.237 15.748 3.6 11.388 2.307V1.01A1.01 1.01 0 0 0 10.379 0H9.373a1.01 1.01 0 0 0-1.01 1.01v1.297C3.64 3.6 0 7.238-1.282 11.6h-1.33A1.39 1.39 0 0 0-4 12.99v3.985c0 .768.622 1.39 1.39 1.39h1.33C-.002 22.762 3.638 26.4 7.998 27.694V29c0 .557.452 1.01 1.01 1.01h1.006c.558 0 1.01-.453 1.01-1.01v-1.306c4.36-1.294 8-4.932 9.284-9.295h1.33c.768 0 1.39-.622 1.39-1.39v-3.985a1.39 1.39 0 0 0-1.39-1.39" /></svg>
              Fiverr gigs
            </a>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="dp-hero-visual">
          <div className="dp-dash-wrap">
            <div className="dp-dash-glow" />
            <div className="dp-dash-card">
              <div className="dp-dash-topbar">
                <div className="dp-dash-dots"><span /><span /><span /></div>
                <div className="dp-dash-title">client-dashboard · analytics</div>
                <div className="dp-dash-badge">● LIVE</div>
              </div>
              <div className="dp-dash-body">
                <div className="dp-dash-kpis">
                  <div className="dp-dash-kpi">
                    <div className="dp-dash-kpi-label">REVENUE</div>
                    <div className="dp-dash-kpi-val g">€84.2k</div>
                  </div>
                  <div className="dp-dash-kpi">
                    <div className="dp-dash-kpi-label">USERS</div>
                    <div className="dp-dash-kpi-val">12.4k</div>
                  </div>
                  <div className="dp-dash-kpi">
                    <div className="dp-dash-kpi-label">GROWTH</div>
                    <div className="dp-dash-kpi-val o">+38%</div>
                  </div>
                </div>
                <div className="dp-dash-chart-area">
                  <div className="dp-dash-chart-label">MONTHLY REVENUE</div>
                  <div className="dp-dash-bars">
                    {[35,55,45,70,50,80,65,90,75,85,60,100].map((h,i) => (
                      <div key={i} className={`dp-dash-bar${h > 70 ? ' hi' : h > 55 ? ' m' : ''}`} style={{ height: h + '%' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal */}
            <div className="dp-terminal">
              <div className="dp-term-line"><span className="dp-term-prompt">$</span><span className="dp-term-cmd">npm run deploy</span></div>
              <div className="dp-term-out">✓ Build complete</div>
              <div className="dp-term-out">✓ Tests passed</div>
              <div className="dp-term-out">→ Deploying to prod<span className="dp-term-cursor" /></div>
            </div>

            {/* Phone badge */}
            <div className="dp-phone-badge">
              <div className="dp-pb-notch" />
              <div className="dp-pb-line" />
              <div className="dp-pb-line" style={{ width:'80%' }} />
              <div className="dp-pb-line" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="dp-services" id="services">
        <div className="dp-reveal">
          <div className="dp-section-label">What I build</div>
          <div className="dp-section-title">Full-stack,<br />front to back.</div>
        </div>

        <div className="dp-services-grid">
          {[
            {
              icon: '⬡',
              title: 'Web Applications',
              desc: 'Full-featured web apps built with React, Next.js, and TypeScript. From MVPs to production-scale products.',
              tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
            },
            {
              icon: '◈',
              title: 'Mobile Apps',
              desc: 'Cross-platform mobile apps with React Native. iOS and Android from a single codebase, shipped fast.',
              tags: ['React Native', 'Expo', 'iOS', 'Android'],
            },
            {
              icon: '▦',
              title: 'Dashboards & Analytics',
              desc: 'Custom analytics dashboards with real-time data, beautiful charts, and role-based access control.',
              tags: ['PostgreSQL', 'Recharts', 'REST', 'WebSocket'],
            },
            {
              icon: '◉',
              title: 'AI & Automation',
              desc: 'Intelligent automations, AI integrations, and pipelines that save hours every day. GPT, Claude, or custom models.',
              tags: ['OpenAI', 'Claude', 'Python', 'n8n'],
            },
          ].map((s, i) => (
            <div key={i} className={`dp-service-item dp-reveal dp-rd${i % 2}`}>
              <div className="dp-service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="dp-service-tags">
                {s.tags.map(t => <span key={t} className="dp-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case study */}
      <section className="dp-case" id="case">
        <div className="dp-case-grid">
          <div className="dp-reveal">
            <div className="dp-case-meta">Case study · 2024</div>
            <div className="dp-case-title">MKX Group — Full company website + custom dashboard</div>
            <p className="dp-case-desc">
              Built a complete digital presence for MKX Group: a premium marketing website and a bespoke analytics dashboard with real-time reporting and multi-user access.
            </p>
            <ul className="dp-case-points">
              <li>Full company website with animations and CMS</li>
              <li>Custom analytics dashboard with real-time data</li>
              <li>Role-based access — admin, manager, viewer</li>
              <li>PostgreSQL backend with REST API</li>
              <li>Deployed on Vercel + Railway, zero downtime</li>
            </ul>
            <a href="https://mkxgroup.co" target="_blank" rel="noopener noreferrer" className="dp-case-link">
              View live site ↗
            </a>
          </div>

          <div className="dp-reveal dp-rd1">
            <div className="dp-case-browser">
              <div className="dp-case-chrome">
                <div className="dp-case-dots"><span /><span /><span /></div>
                <div className="dp-case-url">mkxgroup.co</div>
              </div>
              <div className="dp-case-body">
                <div className="dp-case-sidebar">
                  <div className="dp-case-nav">
                    {[true,false,false,false,false].map((a,i) => (
                      <div key={i} className={`dp-case-nav-item${a ? ' active' : ''}`} />
                    ))}
                  </div>
                  <div className="dp-case-content">
                    <div className="dp-case-header-row">
                      <div className="dp-case-title-bar" />
                    </div>
                    <div className="dp-case-kpis">
                      {[
                        { color:'oklch(74% 0.22 140 / .7)' },
                        { color:'oklch(74% 0.22 30 / .7)' },
                        { color:'rgba(255,255,255,.3)' },
                      ].map((k,i) => (
                        <div key={i} className="dp-case-kpi">
                          <div className="dp-case-kpi-l" />
                          <div className="dp-case-kpi-v" style={{ background:k.color }} />
                        </div>
                      ))}
                    </div>
                    <div className="dp-case-chart">
                      <div className="dp-case-chart-bars">
                        {[40,65,35,85,55,75,50,90].map((h,i) => (
                          <div key={i} className={`dp-case-chart-bar${h > 65 ? ' hi' : ''}`} style={{ height: h + '%' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="dp-tech">
        <div className="dp-reveal">
          <div className="dp-section-label">Tech stack</div>
          <div className="dp-section-title">Built with the right tools.</div>
        </div>
        <div className="dp-tech-grid">
          {[
            { icon: '⚛', name: 'React' },
            { icon: '▲', name: 'Next.js' },
            { icon: '🔷', name: 'TypeScript' },
            { icon: '🟢', name: 'Node.js' },
            { icon: '🐘', name: 'PostgreSQL' },
            { icon: '🤖', name: 'OpenAI' },
          ].map((t, i) => (
            <div key={i} className={`dp-tech-item dp-reveal dp-rd${i % 3}`}>
              <div className="dp-tech-icon">{t.icon}</div>
              <div className="dp-tech-name">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Fiverr CTA */}
      <section className="dp-fiverr">
        <div className="dp-fiverr-left dp-reveal">
          <div className="dp-fiverr-badge">Available on Fiverr</div>
          <div className="dp-fiverr-title">Need something<br />smaller? Try a gig.</div>
          <p className="dp-fiverr-desc">
            Fixed-scope, fixed-price gigs for common dev tasks. Fast turnaround, no meetings required.
          </p>
          <a href="https://www.fiverr.com/s/pD5d4l3" target="_blank" rel="noopener noreferrer" className="dp-btn-fiverr">
            View Fiverr profile ↗
          </a>
        </div>

        <div className="dp-fiverr-right dp-reveal dp-rd1">
          <div className="dp-gig-list">
            {[
              ['Landing page in 3 days',     '€199'],
              ['React component library',    '€299'],
              ['REST API with Node.js',       '€349'],
              ['OpenAI / Claude integration', '€399'],
              ['Dashboard with charts',       '€449'],
            ].map(([name, price]) => (
              <div key={name} className="dp-gig">
                <span className="dp-gig-name">{name}</span>
                <span className="dp-gig-price">from {price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dp-footer">
        <div className="dp-footer-top">
          <div>
            <div className="dp-footer-logo">Masa<span>sites</span></div>
            <p className="dp-footer-tagline">Finnish digital agency. Websites and software, built to last.</p>
          </div>
          <div className="dp-footer-cols">
            <div className="dp-footer-col">
              <h5>Products</h5>
              <Link to="/websites">Websites</Link>
              <Link to="/dev">Dev Services</Link>
              <a href="https://www.fiverr.com/s/pD5d4l3" target="_blank" rel="noopener noreferrer">Fiverr ↗</a>
            </div>
            <div className="dp-footer-col">
              <h5>Work</h5>
              <a href="https://mkxgroup.co" target="_blank" rel="noopener noreferrer">mkxgroup.co ↗</a>
            </div>
            <div className="dp-footer-col">
              <h5>Contact</h5>
              <a href="mailto:team@masasite.com">team@masasite.com</a>
            </div>
          </div>
        </div>
        <div className="dp-footer-bottom">
          <span>© 2026 Masasites. Helsinki, Finland.</span>
          <div className="dp-fi-flag">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <rect width="20" height="14" fill="white" />
              <rect y="5" width="20" height="4" fill="#003580" />
              <rect x="5" width="4" height="14" fill="#003580" />
            </svg>
            Made in Finland
          </div>
        </div>
      </footer>
    </div>
  )
}
