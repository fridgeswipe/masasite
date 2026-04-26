import './KultainenDemo.css'

const leivokset = [
  { name: 'Hapanjuuricroissant', desc: 'Voinen, kerrostunut', price: '4,20 €' },
  { name: 'Kanelipulla', desc: 'Perinteinen resepti', price: '3,50 €' },
  { name: 'Suklaatuffi', desc: 'Tumma suklaa & vadelma', price: '4,80 €' },
  { name: 'Sitruunatorttu', desc: 'Tuore sitruunakreemi', price: '5,20 €' },
  { name: 'Korvapuusti', desc: 'Suuri & tuore', price: '3,80 €' },
]

const kahvit = [
  { name: 'Espresso', desc: 'Single origin, Etiopia', price: '3,20 €' },
  { name: 'Cappuccino', desc: 'Luomumaito', price: '4,50 €' },
  { name: 'Flat White', desc: 'Double espresso', price: '4,80 €' },
  { name: 'Cortado', desc: 'Equal parts', price: '4,20 €' },
  { name: 'Pour Over', desc: 'Päivän paahto', price: '5,50 €' },
]

const galleryColors = [
  'linear-gradient(135deg,#5c2a00,#3d1a00)',
  'linear-gradient(135deg,#7c3a10,#4a2000)',
  'linear-gradient(135deg,#4a2800,#6b3b10)',
  'linear-gradient(135deg,#3d1a00,#5c2a00)',
]

export function KultainenDemo() {
  return (
    <div className="kf">

      {/* Nav */}
      <nav className="kf-nav">
        <span className="kf-logo">Kultainen</span>
        <div className="kf-nav-links">
          <a href="#kf-menu">Menu</a>
          <a href="#kf-tarina">Tarina</a>
          <a href="#kf-yhteystiedot">Yhteystiedot</a>
          <a href="#kf-tilaa" className="kf-nav-order">Tilaa noudettavaksi</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="kf-hero">
        <div className="kf-hero-bg" aria-hidden />

        {/* Coffee cup art */}
        <div className="kf-hero-art" aria-hidden>
          <svg width="480" height="480" viewBox="0 0 480 480" fill="none">
            <circle cx="240" cy="240" r="220" stroke="#f59e0b" strokeWidth="1"/>
            <circle cx="240" cy="240" r="180" stroke="#f59e0b" strokeWidth="0.7"/>
            <circle cx="240" cy="240" r="140" stroke="#f59e0b" strokeWidth="0.5"/>
            <path d="M180 260 Q200 200 240 190 Q280 200 300 260" stroke="#f59e0b" strokeWidth="1.5" fill="none"/>
            <path d="M160 260 h160" stroke="#f59e0b" strokeWidth="1.5"/>
            <path d="M170 270 h140 a70 40 0 0 1 -140 0" stroke="#f59e0b" strokeWidth="1" fill="none"/>
            <path d="M300 265 Q330 265 330 285 Q330 305 300 305" stroke="#f59e0b" strokeWidth="1.2" fill="none"/>
            <path d="M220 185 Q225 165 220 150" stroke="#f59e0b" strokeWidth="1" opacity="0.6"/>
            <path d="M240 185 Q248 160 240 140" stroke="#f59e0b" strokeWidth="1" opacity="0.6"/>
            <path d="M260 185 Q255 165 260 150" stroke="#f59e0b" strokeWidth="1" opacity="0.6"/>
          </svg>
        </div>

        <div className="kf-hero-content">
          <span className="kf-hero-tag">Hämeenlinna · Artesaanikahvila</span>
          <h1>Käsintehtyä<br />joka päivä</h1>
          <p className="kf-hero-desc">
            Paahdamme kahvimme paikallisesti, leivomme leivoksemme aamulla.
            Tervetuloa hetkeen, jossa aika hidastuu.
          </p>
          <a href="#kf-tilaa" className="kf-hero-cta">
            Tilaa noudettavaksi
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <p className="kf-hero-hours">Ma–Pe 07–18 &ensp;·&ensp; La–Su 09–16</p>
        </div>
      </section>

      {/* Divider */}
      <div className="kf-divider">
        <div className="kf-divider-line" />
        <span className="kf-divider-ornament">✦</span>
        <div className="kf-divider-line" />
      </div>

      {/* Menu */}
      <section id="kf-menu" className="kf-section">
        <span className="kf-section-tag">Menu</span>
        <h2>Tämän päivän tarjonta</h2>
        <p className="kf-section-sub">
          Kaikki leivonnaiset tehdään käsin aamulla. Menu vaihtuu päivittäin
          saatavuuden ja vuodenajan mukaan.
        </p>

        <div className="kf-menu-grid">
          <div className="kf-menu-col">
            <h3>Leivonnaiset</h3>
            {leivokset.map(item => (
              <div key={item.name} className="kf-menu-item">
                <div>
                  <span className="kf-menu-item-name">{item.name}</span>
                  <span className="kf-menu-item-desc">{item.desc}</span>
                </div>
                <span className="kf-menu-item-price">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="kf-menu-col">
            <h3>Kahvijuomat</h3>
            {kahvit.map(item => (
              <div key={item.name} className="kf-menu-item">
                <div>
                  <span className="kf-menu-item-name">{item.name}</span>
                  <span className="kf-menu-item-desc">{item.desc}</span>
                </div>
                <span className="kf-menu-item-price">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="kf-divider">
        <div className="kf-divider-line" />
        <span className="kf-divider-ornament">✦</span>
        <div className="kf-divider-line" />
      </div>

      {/* Story */}
      <section id="kf-tarina" className="kf-section">
        <div className="kf-story">
          <div className="kf-story-visual">
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}} viewBox="0 0 400 320" aria-hidden>
              <defs>
                <radialGradient id="kf-grad" cx="50%" cy="60%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <rect width="400" height="320" fill="url(#kf-grad)"/>
              <circle cx="200" cy="160" r="80" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.5"/>
              <circle cx="200" cy="160" r="55" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4"/>
              <text x="200" y="165" textAnchor="middle" fontSize="52" fill="#f59e0b" opacity="0.3">☕</text>
              <text x="200" y="280" textAnchor="middle" fontSize="10" fill="#f59e0b" opacity="0.4" letterSpacing="5">KAHVILA KULTAINEN · 2018</text>
            </svg>
          </div>
          <div className="kf-story-text">
            <span className="kf-section-tag">Tarina</span>
            <h2 style={{ marginBottom: '1.5rem' }}>Perustettu rakkaudesta<br />kahviin</h2>
            <p>
              Kultainen avasi ovensa Hämeenlinnassa vuonna 2018. Halusimme luoda
              paikan, jossa kahvi on enemmän kuin juoma — se on kokemus.
            </p>
            <p>
              Jokainen pavun paahtamisesta alkaen on huolella mietitty.
              Yhteistyömme suomalaistenleipurien ja paikallisten maanviljelijöiden
              kanssa takaa tuoreuden.
            </p>
            <p>
              Tule istumaan. Ei kiirettä. Meillä on aikaa sinulle.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="kf-section" style={{ paddingTop: 0 }}>
        <span className="kf-section-tag">Galleria</span>
        <h2>Hetkiä Kultaisesta</h2>
        <div className="kf-gallery" style={{ marginTop: '2rem' }}>
          {galleryColors.map((bg, i) => (
            <div key={i} className="kf-gallery-cell" style={{ background: bg }}>
              <svg style={{width:'100%',height:'100%',opacity:0.3}} viewBox="0 0 120 150" aria-hidden>
                {i === 0 && <circle cx="60" cy="70" r="40" fill="none" stroke="#f59e0b" strokeWidth="1"/>}
                {i === 1 && <rect x="20" y="30" width="80" height="90" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1"/>}
                {i === 2 && <path d="M60 20 Q100 75 60 130 Q20 75 60 20" fill="none" stroke="#f59e0b" strokeWidth="1"/>}
                {i === 3 && <polygon points="60,20 110,130 10,130" fill="none" stroke="#f59e0b" strokeWidth="1"/>}
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* Order banner */}
      <section id="kf-tilaa" className="kf-order-banner">
        <h2>Tilaa leivonnaiset etukäteen</h2>
        <p>Varmista suosikkisi — tilaa edeltävänä päivänä niin on valmiina kun tulet.</p>
        <a href="#kf-yhteystiedot" className="kf-hero-cta" style={{ display:'inline-flex' }}>
          Tee tilaus →
        </a>
      </section>

      {/* Hours */}
      <section id="kf-yhteystiedot" className="kf-section">
        <span className="kf-section-tag">Aukioloajat</span>
        <h2>Löydät meidät täältä</h2>
        <div className="kf-hours-grid" style={{ marginBottom: '2.5rem' }}>
          {[
            { day: 'Maanantai–Perjantai', time: '07.00–18.00' },
            { day: 'Lauantai', time: '09.00–16.00' },
            { day: 'Sunnuntai', time: '10.00–15.00' },
          ].map(h => (
            <div key={h.day} className="kf-hours-card">
              <div className="kf-hours-day">{h.day}</div>
              <div className="kf-hours-time">{h.time}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap', fontSize:'0.9rem', color:'rgba(240,230,211,0.45)' }}>
          <span>📍 Raatihuoneenkatu 14, Hämeenlinna</span>
          <span>📞 03 456 7890</span>
          <span>✉ hei@kahvilakultainen.fi</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="kf-footer">
        <span className="kf-footer-logo">Kultainen</span>
        <span className="kf-footer-copy">© 2026 Kahvila Kultainen · Hämeenlinna</span>
      </footer>

    </div>
  )
}
