import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'
import './WebsitesPage.css'
import { LoadingScreen } from '../components/LoadingScreen'
import { DemoModal } from '../components/DemoModal'

// Cursor — shared with HomePage
function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null!)
  const ringRef = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove, { passive: true })
    function tick() {
      rx += (mx - rx) * .15; ry += (my - ry) * .15
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
      <div ref={dotRef}  className="hp-cursor" aria-hidden />
      <div ref={ringRef} className="hp-cursor-ring" aria-hidden />
    </>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.wp-reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    // Fallback: if observer never fires (e.g. back navigation), show all after 2.5s
    const fallback = setTimeout(() => els.forEach(el => el.classList.add('visible')), 2500)
    els.forEach(el => io.observe(el))
    return () => { io.disconnect(); clearTimeout(fallback) }
  }, [])
}

// ── Hero mockup ──────────────────────────────────────────────────────────────

function HeroMockup() {
  return (
    <div className="wp-hero-right">
      <div className="wp-hero-glow" />

      {/* Main browser */}
      <div className="wp-main-browser">
        <div className="wp-chrome">
          <div className="wp-dots"><span /><span /><span /></div>
          <div className="wp-url">yourclient.fi</div>
        </div>
        <div className="wp-site">
          <div className="wp-site-nav">
            <div className="wp-site-logo" />
            <div className="wp-site-links">
              <span /><span /><span />
            </div>
          </div>
          <div className="wp-site-hero">
            <div className="wp-sh" />
            <div className="wp-sh2" />
            <div className="wp-sp" />
            <div className="wp-sp2" />
            <div className="wp-sbtn" />
          </div>
          <div className="wp-site-footer">
            <div className="wp-sf-dot" />
            <div className="wp-sf-line" />
            <div className="wp-sf-line" style={{ maxWidth: 60 }} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="wp-mobile">
        <div className="wp-mob-notch" />
        <div className="wp-mob-body">
          <div className="wp-mob-tile">
            <div className="wp-mob-l" />
            <div className="wp-mob-a" />
          </div>
          <div className="wp-mob-img" />
          <div className="wp-mob-tile">
            <div className="wp-mob-l" />
            <div className="wp-mob-a" style={{ width: '50%' }} />
          </div>
        </div>
      </div>

      {/* PageSpeed badge */}
      <div className="wp-badge">
        <div className="wp-badge-top">PageSpeed</div>
        <div className="wp-badge-val">98</div>
        <div className="wp-badge-sub">Performance</div>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function WebsitesPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDemo, setActiveDemo] = useState<{ url: string; title: string } | null>(null)
  useReveal()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  function scrollToCta(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('wp-cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="wp">
      {activeDemo && (
        <DemoModal url={activeDemo.url} title={activeDemo.title} onClose={() => setActiveDemo(null)} />
      )}
      <LoadingScreen onDone={() => {}} />
      <Cursor />

      {/* Nav */}
      <nav className={`hp-nav${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="hp-nav-logo">Masa<span>site</span></Link>
        <div className="hp-nav-links">
          <Link to="/">Home</Link>
          <a href="#wp-cta" onClick={scrollToCta}>Pricing</a>
          <Link to="/dev">Dev</Link>
          <a href="#wp-cta" className="hp-nav-pill" onClick={scrollToCta}>
            <span className="hp-nav-dot" />
            Available now
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="wp-hero">
        <div className="wp-hero-grid" />
        <div className="wp-orb wp-orb-1" />
        <div className="wp-orb wp-orb-2" />

        <div className="wp-hero-left">
          <div className="wp-kicker">Done-for-you websites</div>
          <h1 className="wp-h1">
            <span className="line"><span className="line-inner">Your business</span></span>
            <span className="line"><span className="line-inner">website,</span></span>
            <span className="line"><span className="line-inner">done <span className="hi">right.</span></span></span>
          </h1>
          <p className="wp-hero-sub">
            Professional, fast, and built for real businesses. No templates, no hidden costs — just a site that works and makes you look great.
          </p>
          <div className="wp-hero-price">
            <span className="wp-price-note" style={{ fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)' }}>Starting from</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
              <span className="wp-price-eur">€</span>
              <span className="wp-price-num">149</span>
            </div>
          </div>
          <div className="wp-hero-actions">
            <a href="#wp-cta" className="wp-btn-primary" onClick={scrollToCta}>
              Get your website →
            </a>
            <a href="#wp-examples" className="wp-btn-ghost" onClick={e => { e.preventDefault(); document.getElementById('wp-examples')?.scrollIntoView({ behavior: 'smooth' }) }}>
              See examples
            </a>
          </div>
        </div>

        <HeroMockup />
      </section>

      {/* ── Features strip ── */}
      <div className="wp-features">
        {[
          { icon: '⚡', title: '7-day delivery', desc: 'Most sites are live within a week of kickoff.' },
          { icon: '€',  title: '€149 flat price', desc: 'One page, one price. No subscriptions, no surprises.' },
          { icon: '◈',  title: 'Custom design', desc: 'Designed from scratch to match your brand and industry.' },
          { icon: '◉',  title: 'You own it all', desc: 'Full ownership transferred to you on launch day.' },
        ].map((f, i) => (
          <div key={i} className={`wp-feature wp-reveal wp-rd${i}`}>
            <div className="wp-feature-icon">{f.icon}</div>
            <div className="wp-feature-title">{f.title}</div>
            <div className="wp-feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* ── Process ── */}
      <section className="wp-process">
        <div className="wp-reveal">
          <div className="wp-section-label">How it works</div>
          <div className="wp-section-title">Three steps<br />to launch.</div>
        </div>
        <div className="wp-steps">
          {[
            { num: '01', title: 'You tell me what you need', desc: 'A quick message or call is enough. We go over your goals, style preferences, and timeline — no lengthy briefs needed.' },
            { num: '02', title: 'I design and build it', desc: 'I create a custom design from scratch and build it. You get progress updates and two rounds of revisions included.' },
            { num: '03', title: 'Your site goes live', desc: 'Delivered on time. Full ownership transferred to you — code, domain, hosting setup, and 30 days of free support.' },
          ].map((s, i) => (
            <div key={i} className={`wp-step wp-reveal wp-rd${i}`}>
              <div className="wp-step-num">{s.num} //</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Portfolio examples ── */}
      <section className="wp-examples" id="wp-examples">
        <div className="wp-examples-header wp-reveal">
          <div>
            <div className="wp-section-label">Portfolio</div>
            <div className="wp-section-title">Real sites,<br />real businesses.</div>
          </div>
          <a href="https://masasite.com/client-demos/lappi-ravintola-c1357e50.html" target="_blank" rel="noopener noreferrer" className="wp-examples-link">
            See all demos →
          </a>
        </div>

        <div className="wp-examples-grid">
          {/* Beauty salon demo */}
          <div
            role="button" tabIndex={0}
            onClick={() => setActiveDemo({ url: 'https://masasite.com/client-demos/beauty-angels-8488f0c9.html', title: 'Beauty Angels' })}
            onKeyDown={e => e.key === 'Enter' && setActiveDemo({ url: 'https://masasite.com/client-demos/beauty-angels-8488f0c9.html', title: 'Beauty Angels' })}
            className="wp-example-item wp-reveal"
            style={{ cursor: 'pointer' }}
          >
            <div className="wp-example-thumb">
              <div className="wp-et-salon">
                <div className="wp-et-salon-nav">
                  <div className="wp-et-salon-logo" />
                  <div style={{ display:'flex', gap:8 }}>
                    <span style={{ width:24,height:5,background:'rgba(232,121,176,.3)',borderRadius:2 }} />
                    <span style={{ width:24,height:5,background:'rgba(232,121,176,.3)',borderRadius:2 }} />
                  </div>
                </div>
                <div className="wp-et-salon-body">
                  <div className="wp-et-salon-h" />
                  <div className="wp-et-salon-h2" />
                  <div className="wp-et-salon-p" />
                  <div className="wp-et-salon-p" style={{ width:'68%' }} />
                  <div className="wp-et-salon-btn" />
                </div>
              </div>
            </div>
            <div className="wp-example-overlay">
              <div style={{ fontFamily:'var(--font-m)', fontSize:10, color:'var(--accent)', letterSpacing:1, textTransform:'uppercase', marginBottom:4 }}>Open live demo ↗</div>
            </div>
            <div className="wp-example-footer">
              <div>
                <div className="wp-example-name">Beauty Angels</div>
                <div className="wp-example-type">Beauty salon · Helsinki</div>
              </div>
              <span className="wp-example-arrow">↗</span>
            </div>
          </div>

          {/* Restaurant demo */}
          <div
            role="button" tabIndex={0}
            onClick={() => setActiveDemo({ url: 'https://masasite.com/client-demos/lappi-ravintola-c1357e50.html', title: 'Lappi Ravintola' })}
            onKeyDown={e => e.key === 'Enter' && setActiveDemo({ url: 'https://masasite.com/client-demos/lappi-ravintola-c1357e50.html', title: 'Lappi Ravintola' })}
            className="wp-example-item wp-reveal wp-rd1"
            style={{ cursor: 'pointer' }}
          >
            <div className="wp-example-thumb">
              <div className="wp-et-rest">
                <div className="wp-et-rest-nav">
                  <div className="wp-et-rest-logo" />
                  <div style={{ display:'flex', gap:8 }}>
                    <span style={{ width:24,height:5,background:'rgba(232,168,76,.3)',borderRadius:2 }} />
                    <span style={{ width:24,height:5,background:'rgba(232,168,76,.3)',borderRadius:2 }} />
                  </div>
                </div>
                <div className="wp-et-rest-body">
                  <div className="wp-et-rest-h" />
                  <div className="wp-et-rest-h2" />
                  <div className="wp-et-rest-p" />
                  <div className="wp-et-rest-p" style={{ width:'68%' }} />
                  <div className="wp-et-rest-btn" />
                </div>
              </div>
            </div>
            <div className="wp-example-overlay">
              <div style={{ fontFamily:'var(--font-m)', fontSize:10, color:'var(--accent)', letterSpacing:1, textTransform:'uppercase', marginBottom:4 }}>Open live demo ↗</div>
            </div>
            <div className="wp-example-footer">
              <div>
                <div className="wp-example-name">Lappi Ravintola</div>
                <div className="wp-example-type">Restaurant · Helsinki</div>
              </div>
              <span className="wp-example-arrow">↗</span>
            </div>
          </div>

          {/* Trade/service demo */}
          <div
            role="button" tabIndex={0}
            onClick={() => setActiveDemo({ url: 'https://masasite.com/client-demos/strindberg-7458db53.html', title: 'Strindberg' })}
            onKeyDown={e => e.key === 'Enter' && setActiveDemo({ url: 'https://masasite.com/client-demos/strindberg-7458db53.html', title: 'Strindberg' })}
            className="wp-example-item wp-reveal wp-rd2"
            style={{ cursor: 'pointer' }}
          >
            <div className="wp-example-thumb">
              <div className="wp-et-trade">
                <div className="wp-et-trade-nav">
                  <div className="wp-et-trade-logo" />
                  <div style={{ display:'flex', gap:8 }}>
                    <span style={{ width:24,height:5,background:'oklch(74% 0.22 140 / .3)',borderRadius:2 }} />
                    <span style={{ width:24,height:5,background:'oklch(74% 0.22 140 / .3)',borderRadius:2 }} />
                  </div>
                </div>
                <div className="wp-et-trade-body">
                  <div className="wp-et-trade-h" />
                  <div className="wp-et-trade-h2" />
                  <div className="wp-et-trade-p" />
                  <div className="wp-et-trade-p" style={{ width:'68%' }} />
                  <div className="wp-et-trade-btn" />
                </div>
              </div>
            </div>
            <div className="wp-example-overlay">
              <div style={{ fontFamily:'var(--font-m)', fontSize:10, color:'var(--accent)', letterSpacing:1, textTransform:'uppercase', marginBottom:4 }}>Open live demo ↗</div>
            </div>
            <div className="wp-example-footer">
              <div>
                <div className="wp-example-name">Strindberg</div>
                <div className="wp-example-type">Restaurant & Bar · Helsinki</div>
              </div>
              <span className="wp-example-arrow">↗</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="wp-pricing" id="wp-pricing">
        <div className="wp-reveal">
          <div className="wp-section-label">Pricing</div>
          <div className="wp-section-title">Choose your<br />package.</div>
        </div>

        <div className="wp-packages-grid">
          {[
            {
              name: 'Starter',
              price: '149',
              per: '',
              tag: 'Best for: solo businesses',
              delivery: 'Delivered in 5 days',
              features: [
                'Single landing page',
                'Mobile-friendly design',
                'Custom design — no templates',
                'Domain & hosting setup',
                'Full code ownership',
                '30 days free support',
              ],
              highlight: false,
            },
            {
              name: 'Pro',
              price: '349',
              per: '',
              tag: 'Most popular',
              delivery: 'Delivered in 7 days',
              features: [
                'Up to 5 pages',
                'Contact form included',
                'Basic SEO setup',
                'Mobile-friendly design',
                'Custom design — no templates',
                'Full code ownership',
                '30 days free support',
              ],
              highlight: true,
            },
            {
              name: 'Business',
              price: '699',
              per: '',
              tag: 'Best for: growing companies',
              delivery: 'Delivered in 14 days',
              features: [
                'Full multi-page site',
                'Blog / news section',
                'Google Analytics setup',
                'Full SEO configuration',
                'Contact form included',
                'Custom design — no templates',
                'Full code ownership',
                '30 days free support',
              ],
              highlight: false,
            },
            {
              name: 'Maintenance',
              price: '29',
              per: '/mo',
              tag: 'Keep it running',
              delivery: 'Ongoing',
              features: [
                'Monthly updates & backups',
                'One content change per month',
                'Security monitoring',
                'Performance checks',
              ],
              highlight: false,
            },
          ].map((pkg, i) => (
            <div key={pkg.name} className={`wp-pkg wp-reveal wp-rd${i % 3}${pkg.highlight ? ' wp-pkg-hi' : ''}`}>
              {pkg.highlight && <div className="wp-pkg-popular">Most popular</div>}
              <div className="wp-pkg-name">{pkg.name}</div>
              <div className="wp-pkg-price-row">
                <span className="wp-pkg-eur">€</span>
                <span className="wp-pkg-amount">{pkg.price}</span>
                {pkg.per && <span className="wp-pkg-per">{pkg.per}</span>}
              </div>
              <div className="wp-pkg-delivery">{pkg.delivery}</div>
              <ul className="wp-pkg-features">
                {pkg.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href="mailto:team@masasite.com?subject=Website enquiry — {pkg.name} package" className="wp-pkg-cta">
                Get started →
              </a>
            </div>
          ))}
        </div>

        <div className="wp-guarantee wp-reveal">
          <div className="wp-guarantee-icon">✦</div>
          <div className="wp-guarantee-title">Satisfaction guarantee</div>
          <div className="wp-guarantee-desc">
            Not happy with the first draft? I'll revise until you are — or refund you in full.
          </div>
        </div>
      </section>

      {/* ── CTA / Contact form ── */}
      <section className="wp-cta" id="wp-cta">
        <div className="wp-cta-orb" />
        <div className="wp-cta-label wp-reveal">Let's get started</div>
        <h2 className="wp-cta-h2 wp-reveal">
          Ready for your<br /><span style={{ color:'oklch(74% 0.22 140)' }}>new website?</span>
        </h2>
        <p className="wp-cta-sub wp-reveal">
          Fill in the form and I'll get back to you within 4 hours.
        </p>

        <form
          className="wp-contact-form wp-reveal"
          action="mailto:team@masasite.com"
          method="post"
          encType="text/plain"
        >
          <div className="wp-form-row">
            <input
              type="text"
              name="Name"
              placeholder="Your name"
              required
              className="wp-form-input"
            />
            <input
              type="email"
              name="Email"
              placeholder="Your email"
              required
              className="wp-form-input"
            />
          </div>
          <textarea
            name="Message"
            placeholder="Tell me about your project — what kind of site, your industry, any references..."
            required
            className="wp-form-textarea"
            rows={4}
          />
          <div className="wp-form-footer">
            <button type="submit" className="wp-form-submit">Send message →</button>
            <span className="wp-form-note">Or email directly: <a href="mailto:team@masasite.com">team@masasite.com</a></span>
          </div>
        </form>
      </section>

      {/* ── Footer ── */}
      <footer className="wp-footer">
        <div className="wp-footer-top">
          <div>
            <div className="wp-footer-logo">Masa<span>site</span></div>
            <p className="wp-footer-tagline">Finnish digital agency. Websites and software, built to last.</p>
          </div>
          <div className="wp-footer-cols">
            <div className="wp-footer-col">
              <h5>Products</h5>
              <Link to="/websites">Websites</Link>
              <Link to="/dev">Dev Services</Link>
              <a href="https://www.fiverr.com/s/kLPAbmo" target="_blank" rel="noopener noreferrer">Fiverr ↗</a>
            </div>
            <div className="wp-footer-col">
              <h5>Examples</h5>
              <a href="https://masasite.com/client-demos/beauty-angels-8488f0c9.html" target="_blank" rel="noopener noreferrer">Beauty salon</a>
              <a href="https://masasite.com/client-demos/lappi-ravintola-c1357e50.html" target="_blank" rel="noopener noreferrer">Restaurant</a>
              <a href="https://masasite.com/client-demos/strindberg-7458db53.html" target="_blank" rel="noopener noreferrer">Bar & restaurant</a>
            </div>
            <div className="wp-footer-col">
              <h5>Contact</h5>
              <a href="mailto:team@masasite.com">team@masasite.com</a>
              <a href="mailto:team@masasite.com">Start a project</a>
            </div>
          </div>
        </div>
        <div className="wp-footer-bottom">
          <span>© 2026 Masasite. Helsinki, Finland.</span>
          <div className="wp-fi-flag">
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
