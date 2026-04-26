import './ViialaDemo.css'

const services = [
  { name: 'Miesten leikkaus', detail: 'Pesu + leikkaus + viimeistely', price: '25 €' },
  { name: 'Parranajo', detail: 'Terä + pyyhe + öljy', price: '18 €' },
  { name: 'Leikkaus + parta', detail: 'Täyspaketti', price: '38 €' },
  { name: 'Lasten leikkaus', detail: 'Alle 12 v', price: '18 €' },
  { name: 'Feidaus', detail: 'Gradienttileikkaus', price: '28 €' },
  { name: 'Parta + muotoilu', detail: 'Vaha + trimmi', price: '22 €' },
]

const team = [
  { name: 'Aleksi', role: 'Omistaja · 12 v kokemus', gradient: 'linear-gradient(160deg,#2d1a2d,#1a0d1a)' },
  { name: 'Mikko', role: 'Parturi · Fade-spesialisti', gradient: 'linear-gradient(160deg,#1a0d1a,#2d1a2d)' },
  { name: 'Sara', role: 'Parturi · Klassinen & moderni', gradient: 'linear-gradient(160deg,#200d1a,#2d1220)' },
]

const galleryBgs = [
  'linear-gradient(135deg,#2d1a2d,#1a0d1a)',
  'linear-gradient(160deg,#1a0d1a,#3d1535)',
  'linear-gradient(135deg,#200d1a,#2d1a2d)',
  'linear-gradient(160deg,#150a15,#2a1228)',
  'linear-gradient(135deg,#1a0d1a,#200d1a)',
  'linear-gradient(160deg,#2d1a2d,#150a15)',
]

export function ViialaDemo() {
  return (
    <div className="pv">

      {/* Nav */}
      <nav className="pv-nav">
        <span className="pv-logo">Viiala</span>
        <div className="pv-nav-links">
          <a href="#pv-palvelut">Palvelut</a>
          <a href="#pv-tiimi">Tiimi</a>
          <a href="#pv-galleria">Galleria</a>
          <a href="#pv-varaus" className="pv-nav-book">Varaa aika</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pv-hero">
        <div className="pv-hero-bg" aria-hidden />
        <span className="pv-hero-number" aria-hidden>V</span>

        <div className="pv-hero-content">
          <div className="pv-hero-tag">Vantaa · Parturi</div>
          <h1>
            Tyylikäs
            <span>leikkaus,</span>
            joka kerta.
          </h1>
          <p className="pv-hero-sub">
            Kolme ammattipartura, yhteinen intohimo. Tuloksena leikkaus,
            josta voit olla ylpeä — joka päivä.
          </p>
          <a href="#pv-varaus" className="pv-hero-cta">
            📅 Varaa aika nyt
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="pv-palvelut" className="pv-section">
        <div className="pv-section-label">Palvelut</div>
        <h2>Hinnasto</h2>

        <div className="pv-price-table">
          {services.map(s => (
            <div key={s.name} className="pv-price-row">
              <div>
                <div className="pv-price-name">{s.name}</div>
                <div className="pv-price-detail">{s.detail}</div>
              </div>
              <div className="pv-price-val">{s.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="pv-tiimi" className="pv-section" style={{ paddingTop: 0 }}>
        <div className="pv-section-label">Tiimi</div>
        <h2>Parturimme</h2>

        <div className="pv-team-grid">
          {team.map(m => (
            <div key={m.name} className="pv-team-member">
              <div className="pv-team-avatar" style={{ background: m.gradient }}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden>
                  <circle cx="40" cy="28" r="16" fill="rgba(232,121,160,0.15)" stroke="rgba(232,121,160,0.3)" strokeWidth="1"/>
                  <path d="M10 72 Q10 52 40 52 Q70 52 70 72" fill="rgba(232,121,160,0.1)" stroke="rgba(232,121,160,0.3)" strokeWidth="1"/>
                </svg>
              </div>
              <div className="pv-team-info">
                <div className="pv-team-name">{m.name}</div>
                <div className="pv-team-role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="pv-galleria" className="pv-section" style={{ paddingTop: 0 }}>
        <div className="pv-section-label">Galleria</div>
        <h2>Töitä</h2>

        <div className="pv-gallery-grid">
          {galleryBgs.map((bg, i) => (
            <div
              key={i}
              className={`pv-gallery-cell${i === 0 ? ' pv-gallery-cell--wide' : ''}`}
              style={{ background: bg }}
            >
              <svg style={{width:'100%',height:'100%',opacity:0.2}} viewBox="0 0 200 200" aria-hidden>
                {i % 3 === 0 && <circle cx="100" cy="100" r="60" fill="none" stroke="#e879a0" strokeWidth="1"/>}
                {i % 3 === 1 && <rect x="40" y="40" width="120" height="120" fill="none" stroke="#e879a0" strokeWidth="1"/>}
                {i % 3 === 2 && <path d="M100 30 L170 170 L30 170 Z" fill="none" stroke="#e879a0" strokeWidth="1"/>}
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* Book CTA */}
      <section id="pv-varaus" className="pv-book-section">
        <div className="pv-book-text">
          <h2>Varaa aika<br />tänään</h2>
          <p>Nopea varaus, ei turhia odotuksia.</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem', alignItems:'flex-start' }}>
          <a href="#" className="pv-hero-cta">
            📅 Ajanvaraus verkossa
          </a>
          <div style={{ fontSize:'0.85rem', color:'rgba(240,236,240,0.35)' }}>
            tai soita: <span style={{ color:'rgba(240,236,240,0.65)' }}>050 987 6543</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pv-footer">
        <span className="pv-footer-logo">Viiala</span>
        <span className="pv-footer-copy">© 2026 Parturi Viiala · Vantaa</span>
      </footer>

    </div>
  )
}
