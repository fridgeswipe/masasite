import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'
import { LoadingScreen } from '../components/LoadingScreen'

// ── Custom cursor ────────────────────────────────────────────────────────────

function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null!)
  const ringRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    let mx = 0, my = 0, rx = 0, ry = 0
    let raf = 0

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove, { passive: true })

    function tick() {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      dotRef.current.style.left  = mx + 'px'
      dotRef.current.style.top   = my + 'px'
      ringRef.current.style.left = rx + 'px'
      ringRef.current.style.top  = ry + 'px'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="hp-cursor" aria-hidden />
      <div ref={ringRef} className="hp-cursor-ring" aria-hidden />
    </>
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  function scrollToContact(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('hp-cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`hp-nav${scrolled ? ' scrolled' : ''}`}>
      <Link to="/" className="hp-nav-logo">Masa<span>sites</span></Link>
      <div className="hp-nav-links">
        <Link to="/websites">Websites</Link>
        <Link to="/dev">Dev</Link>
        <a href="#hp-cta" onClick={scrollToContact}>Contact</a>
        <a href="#hp-cta" className="hp-nav-pill" onClick={scrollToContact}>
          <span className="hp-nav-dot" />
          Available now
        </a>
      </div>
    </nav>
  )
}

// ── Hero right — floating widget composition ─────────────────────────────────

function HeroWidgets() {
  return (
    <div className="hp-hero-right">
      <div className="hp-hero-glow" />

      {/* Browser */}
      <div className="hp-w-card hp-w-browser">
        <div className="hp-wb-chrome">
          <div className="hp-wb-dots"><span /><span /><span /></div>
          <div className="hp-wb-url">client-website.fi</div>
        </div>
        <div className="hp-wb-body">
          <div className="hp-wb-inner">
            <div className="hp-wb-line w" />
            <div className="hp-wb-line a" />
            <div className="hp-wb-line m" />
            <div className="hp-wb-line m" style={{ width: '75%' }} />
            <div className="hp-wb-btn" />
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="hp-w-card hp-w-dash">
        <div className="hp-wd-header">analytics · live</div>
        <div className="hp-wd-body">
          <div className="hp-wd-kpi">
            <div className="hp-wd-label">Revenue</div>
            <div className="hp-wd-val">€48.2k</div>
          </div>
          <div className="hp-wd-bars">
            <div className="hp-wd-bar" style={{ height: '45%' }} />
            <div className="hp-wd-bar" style={{ height: '60%' }} />
            <div className="hp-wd-bar" style={{ height: '40%' }} />
            <div className="hp-wd-bar hi" style={{ height: '90%' }} />
            <div className="hp-wd-bar" style={{ height: '70%' }} />
            <div className="hp-wd-bar" style={{ height: '85%' }} />
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="hp-w-card hp-w-phone">
        <div className="hp-wp-notch" />
        <div className="hp-wp-body">
          <div className="hp-wp-tile">
            <div className="hp-wp-tl" />
            <div className="hp-wp-tv" />
          </div>
          <div className="hp-wp-tile">
            <div className="hp-wp-chart">
              {[40,80,55,90,60].map((h,i) => (
                <div key={i} className={`hp-wp-cb${h > 65 ? ' hi' : ''}`} style={{ height: h + '%' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stat badge */}
      <div className="hp-w-badge">
        <div className="hp-wb-top">Delivered</div>
        <div className="hp-wb-num">47+</div>
      </div>
    </div>
  )
}

// ── Scroll reveal hook ───────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.hp-reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.05 }
    )
    const fallback = setTimeout(() => els.forEach(el => el.classList.add('visible')), 2500)
    els.forEach(el => io.observe(el))
    return () => { io.disconnect(); clearTimeout(fallback) }
  }, [])
}

// ── Counter animation ────────────────────────────────────────────────────────

function useCounters() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const target = Number(el.dataset.target)
        const t0 = performance.now()
        const dur = 1400
        function step(now: number) {
          const p = Math.min((now - t0) / dur, 1)
          const e = 1 - Math.pow(1 - p, 3)
          el.textContent = String(Math.floor(e * target))
          if (p < 1) requestAnimationFrame(step)
          else el.textContent = String(target)
        }
        requestAnimationFrame(step)
        io.unobserve(el)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.hp-counter').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ── Magnetic buttons hook ────────────────────────────────────────────────────

function useMagnetic(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref])
}

// ── Split panels ─────────────────────────────────────────────────────────────

function Split() {
  return (
    <section className="hp-split" id="hp-split">
      {/* Panel A — Websites */}
      <Link to="/websites" className="hp-panel">
        <div className="hp-sp-grid" />
        <div className="hp-sp-visual">
          <div className="hp-sp-browser">
            <div className="hp-spb-chrome">
              <div className="hp-spb-dots"><span /><span /><span /></div>
            </div>
            <div className="hp-spb-body">
              <div className="hp-spb-h" />
              <div className="hp-spb-h2" />
              <div className="hp-spb-p" />
              <div className="hp-spb-p" style={{ width: '70%' }} />
              <div className="hp-spb-btn" />
            </div>
          </div>
        </div>
        <div className="hp-sp-number">01 // Websites</div>
        <div className="hp-sp-title">Done-for-you<br />websites.</div>
        <div className="hp-sp-desc">Fast, professional, affordable. For restaurants, shops, trades, services — any small business that deserves a great online presence.</div>
        <div className="hp-sp-from">Starting from €149 · Delivered in 7 days</div>
        <div className="hp-sp-cta">Explore websites</div>
      </Link>

      {/* Panel B — Dev */}
      <Link to="/dev" className="hp-panel">
        <div className="hp-sp-grid" />
        <div className="hp-sp-visual">
          <div className="hp-sp-dashboard">
            <div className="hp-spd-chrome">client-dashboard · live</div>
            <div className="hp-spd-body">
              <div className="hp-spd-kpis">
                <div className="hp-spd-kpi"><div className="hp-spd-kl" /><div className="hp-spd-kv" /></div>
                <div className="hp-spd-kpi"><div className="hp-spd-kl" /><div className="hp-spd-kv hp-spd-kv2" /></div>
              </div>
              <div className="hp-spd-chart">
                <div className="hp-spd-bars">
                  {[45,60,40,90,70,80].map((h,i) => (
                    <div key={i} className={`hp-spd-bar${h > 65 ? ' hi' : ''}`} style={{ height: h + '%' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hp-sp-number">02 // Development</div>
        <div className="hp-sp-title">Custom<br />software.</div>
        <div className="hp-sp-desc">Web apps, mobile apps, dashboards, AI integrations, automation. Complex ideas engineered into elegant, working software.</div>
        <div className="hp-sp-from">Scoped per project · Fiverr gigs available</div>
        <div className="hp-sp-cta">Explore dev services</div>
      </Link>
    </section>
  )
}

// ── Work grid ────────────────────────────────────────────────────────────────

function WorkGrid() {
  return (
    <section className="hp-work" id="hp-work">
      <div className="hp-work-header hp-reveal">
        <div>
          <div className="hp-work-label">Selected work</div>
          <div className="hp-work-title">Built to perform.</div>
        </div>
        <Link to="/dev" className="hp-work-link">View case studies →</Link>
      </div>

      <div className="hp-work-grid">
        {/* Item 1 — restaurant website demo */}
        <a
          href="https://masasite.com/client-demos/lappi-ravintola-c1357e50.html"
          target="_blank" rel="noopener noreferrer"
          className="hp-work-item hp-reveal"
          style={{ textDecoration:'none', color:'inherit', cursor:'none' }}
        >
          <div className="hp-work-thumb">
            <div className="hp-wt1">
              <div className="hp-wt1-nav">
                <div className="hp-wt1-logo" />
                <div style={{ display:'flex', gap:8 }}>
                  <span style={{ width:28, height:6, background:'rgba(200,134,42,.3)', borderRadius:2 }} />
                  <span style={{ width:28, height:6, background:'rgba(200,134,42,.3)', borderRadius:2 }} />
                </div>
              </div>
              <div className="hp-wt1-body">
                <div className="hp-wt1-h" />
                <div className="hp-wt1-h2" />
                <div className="hp-wt1-p" />
                <div className="hp-wt1-p" style={{ width:'70%' }} />
                <div className="hp-wt1-btn" />
              </div>
            </div>
          </div>
          <div className="hp-work-overlay">
            <div className="hp-work-meta">
              <h4>Lappi Ravintola</h4>
              <p>Restaurant · Website demo ↗</p>
            </div>
          </div>
        </a>

        {/* Item 2 — MKX Group */}
        <a
          href="https://mkxgroup.co"
          target="_blank" rel="noopener noreferrer"
          className="hp-work-item hp-reveal hp-rd1"
          style={{ textDecoration:'none', color:'inherit', cursor:'none' }}
        >
          <div className="hp-work-thumb">
            <div className="hp-wt2">
              <div className="hp-wt2-kpis">
                <div className="hp-wt2-k">
                  <div className="hp-wt2-kl" />
                  <div className="hp-wt2-kv" style={{ background:'oklch(74% 0.22 140 / .7)' }} />
                </div>
                <div className="hp-wt2-k">
                  <div className="hp-wt2-kl" />
                  <div className="hp-wt2-kv" style={{ background:'oklch(74% 0.22 30 / .7)' }} />
                </div>
              </div>
              <div className="hp-wt2-bars">
                {[40,80,50,90,60,70].map((h,i) => (
                  <div key={i} className={`hp-wt2-b${h > 65 ? ' hi' : ''}`} style={{ height: h + '%' }} />
                ))}
              </div>
              <div style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',borderRadius:4,padding:8,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <div style={{ height:7,width:80,background:'rgba(255,255,255,.15)',borderRadius:2 }} />
                <div style={{ height:7,width:40,background:'oklch(74% 0.22 140 / .5)',borderRadius:2 }} />
              </div>
            </div>
          </div>
          <div className="hp-work-overlay">
            <div className="hp-work-meta">
              <h4>MKX Group</h4>
              <p>AI automation platform · Full-stack build ↗</p>
            </div>
          </div>
        </a>

        {/* Item 3 — Dev services */}
        <Link
          to="/dev"
          className="hp-work-item hp-reveal hp-rd2"
          style={{ textDecoration:'none', color:'inherit', cursor:'none' }}
        >
          <div className="hp-work-thumb">
            <div className="hp-wt3">
              <div className="hp-wt3-header">
                <div className="hp-wt3-dot" />
                <div className="hp-wt3-title-bar" />
              </div>
              <div className="hp-wt3-code">
                <div><span className="hp-wt3-c2">const</span> <span className="hp-wt3-w">client</span> = <span className="hp-wt3-c2">await</span></div>
                <div style={{ paddingLeft:14 }}><span className="hp-wt3-c2">new</span> <span className="hp-wt3-c1">MasaClient</span><span className="hp-wt3-c2">(</span></div>
                <div style={{ paddingLeft:28 }}><span className="hp-wt3-c3">config.api_key</span></div>
                <div className="hp-wt3-c2">);</div>
                <div style={{ marginTop:6 }}><span className="hp-wt3-c2">const</span> <span className="hp-wt3-w">result</span> <span className="hp-wt3-c2">=</span> <span className="hp-wt3-c2">await</span></div>
                <div style={{ paddingLeft:14 }}><span className="hp-wt3-c1">client</span><span className="hp-wt3-c2">.deploy(</span><span className="hp-wt3-c3">'prod'</span><span className="hp-wt3-c2">);</span></div>
                <div style={{ marginTop:6, color:'oklch(74% 0.22 140 / .8)' }}>{'// ✓ deployed successfully'}</div>
              </div>
            </div>
          </div>
          <div className="hp-work-overlay">
            <div className="hp-work-meta">
              <h4>AI Automation Pipeline</h4>
              <p>Backend · OpenAI integration ↗</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

// ── Trust bar ────────────────────────────────────────────────────────────────

function Trust() {
  const stats = [
    { target: 47, suffix: '+', label: 'Projects delivered' },
    { target: 7,  suffix: 'd', label: 'Average website delivery' },
    { target: 98, suffix: '%', label: 'Client satisfaction' },
    { target: 3,  suffix: 'yr', label: 'In business' },
  ]

  return (
    <section className="hp-trust">
      {stats.map((s, i) => (
        <div key={i} className={`hp-trust-item hp-reveal hp-rd${i}`}>
          <div className="hp-trust-num">
            <span className="hp-counter" data-target={s.target}>0</span>
            <span className="acc">{s.suffix}</span>
          </div>
          <div className="hp-trust-label">{s.label}</div>
        </div>
      ))}
    </section>
  )
}

// ── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  const btnRef = useRef<HTMLAnchorElement>(null!)
  useMagnetic(btnRef)

  return (
    <section className="hp-cta" id="hp-cta">
      <div className="hp-cta-orb" />
      <div className="hp-cta-label hp-reveal">Ready when you are</div>
      <h2 className="hp-cta-h2 hp-reveal">
        Let's<br /><span style={{ color: 'oklch(74% 0.22 140)' }}>talk.</span>
      </h2>
      <div className="hp-cta-actions hp-reveal">
        <a
          ref={btnRef}
          href="mailto:team@masasite.com"
          className="hp-btn-primary"
        >
          Start a project →
        </a>
        <Link to="/dev" className="hp-btn-outline">Dev services</Link>
      </div>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-footer-top">
        <div>
          <div className="hp-footer-logo">Masa<span>sites</span></div>
          <p className="hp-footer-tagline">Finnish digital agency. Websites and software, built to last.</p>
        </div>
        <div className="hp-footer-cols">
          <div className="hp-footer-col">
            <h5>Products</h5>
            <Link to="/websites">Websites</Link>
            <Link to="/dev">Dev Services</Link>
            <a href="https://www.fiverr.com/s/pD5d4l3" target="_blank" rel="noopener noreferrer">Fiverr ↗</a>
          </div>
          <div className="hp-footer-col">
            <h5>Work</h5>
            <a href="https://mkxgroup.co" target="_blank" rel="noopener noreferrer">mkxgroup.co ↗</a>
            <Link to="/dev">Case studies</Link>
          </div>
          <div className="hp-footer-col">
            <h5>Contact</h5>
            <a href="mailto:team@masasite.com">team@masasite.com</a>
            <a href="mailto:team@masasite.com">Book a project</a>
          </div>
        </div>
      </div>
      <div className="hp-footer-bottom">
        <span>© 2026 Masasites. Helsinki, Finland.</span>
        <div className="hp-fi-flag">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect width="20" height="14" fill="white" />
            <rect y="5" width="20" height="4" fill="#003580" />
            <rect x="5" width="4" height="14" fill="#003580" />
          </svg>
          Made in Finland
        </div>
      </div>
    </footer>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  useReveal()
  useCounters()

  // Parallax for orbs
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      const o1 = document.querySelector('.hp-orb-1') as HTMLElement
      const o2 = document.querySelector('.hp-orb-2') as HTMLElement
      if (o1) o1.style.transform = `translate(${y * -0.02}px, ${y * 0.05}px)`
      if (o2) o2.style.transform = `translate(${y * 0.03}px, ${y * -0.04}px)`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="hp">
      <LoadingScreen onDone={() => {}} />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="hp-hero">
        <div className="hp-hero-grid" />
        <div className="hp-orb hp-orb-1" />
        <div className="hp-orb hp-orb-2" />

        <div className="hp-hero-left">
          <div className="hp-kicker">Finnish Digital Agency</div>
          <h1 className="hp-h1">
            <span className="line"><span className="line-inner">The last</span></span>
            <span className="line"><span className="line-inner">agency</span></span>
            <span className="line"><span className="line-inner">you'll <span className="hi">need.</span></span></span>
          </h1>
          <p className="hp-sub">
            We build websites and software for businesses ready to grow. Clean, fast, and built to last — from a single landing page to a full-stack product.
          </p>
          <div className="hp-paths">
            <Link to="/dev" className="hp-path-btn primary">
              I need something built
              <span className="hp-path-arrow">↗</span>
            </Link>
            <Link to="/websites" className="hp-path-btn">
              I need a website
              <span className="hp-path-arrow">↗</span>
            </Link>
          </div>
        </div>

        <HeroWidgets />
      </section>

      {/* Marquee */}
      <div className="hp-marquee-wrap">
        <div className="hp-marquee-track">
          {['Masasites','Helsinki, Finland','Est. 2022','Websites','Web Apps','Mobile Apps','AI Integrations','7-Day Delivery',
            'Masasites','Helsinki, Finland','Est. 2022','Websites','Web Apps','Mobile Apps','AI Integrations','7-Day Delivery']
            .map((item, i) => (
              <span key={i} className="hp-marquee-item">{item}</span>
            ))}
        </div>
      </div>

      <Split />
      <WorkGrid />
      <Trust />
      <CTA />
      <Footer />
    </div>
  )
}
