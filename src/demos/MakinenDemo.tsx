import './MakinenDemo.css'

export function MakinenDemo() {
  return (
    <div className="mk">

      {/* Nav */}
      <nav className="mk-nav">
        <div className="mk-logo">
          <span className="mk-logo-main">MÄKINEN</span>
          <span className="mk-logo-sub">Rakennusliike Oy</span>
        </div>
        <div className="mk-nav-links">
          <a href="#mk-palvelut">Palvelut</a>
          <a href="#mk-referenssit">Referenssit</a>
          <a href="#mk-yhteystiedot">Yhteystiedot</a>
          <a href="#mk-yhteystiedot" className="mk-nav-cta">Pyydä tarjous</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="mk-hero">
        <div className="mk-hero-bg" aria-hidden />

        {/* Geometric background art */}
        <svg className="mk-hero-geo" viewBox="0 0 500 500" fill="none" aria-hidden>
          <polygon points="250,20 480,480 20,480" stroke="white" strokeWidth="1" fill="none" opacity="0.6"/>
          <polygon points="250,80 420,420 80,420" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/>
          <polygon points="250,140 360,360 140,360" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4"/>
          <polygon points="250,200 300,300 200,300" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3"/>
          <line x1="250" y1="20" x2="250" y2="480" stroke="white" strokeWidth="0.5" opacity="0.2"/>
          <line x1="20" y1="480" x2="480" y2="480" stroke="white" strokeWidth="0.5" opacity="0.2"/>
        </svg>

        <div className="mk-hero-content">
          <div className="mk-eyebrow">Tampere · Koko Suomi</div>
          <h1>
            Rakentamista<br />
            <em>ammattitaidolla</em>
          </h1>
          <p className="mk-hero-sub">
            Yli 22 vuoden kokemus talonrakennuksesta. Uudisrakentaminen,
            saneeraukset ja pihatyöt — laadukkaasti sovitussa aikataulussa.
          </p>
          <div className="mk-hero-btns">
            <a href="#mk-yhteystiedot" className="mk-btn-primary">Pyydä ilmainen tarjous</a>
            <a href="#mk-referenssit" className="mk-btn-outline">Katso referenssit</a>
          </div>
          <div className="mk-hero-chips">
            <span className="mk-chip">Yli 250 kohdetta</span>
            <span className="mk-chip">98% suosittelee</span>
            <span className="mk-chip">Laatu taattu</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="mk-stats">
        {[
          { num: '250+', label: 'Kohdetta' },
          { num: '22 v', label: 'Kokemus' },
          { num: '98 %', label: 'Suosittelee' },
          { num: 'Koko', label: 'Suomi' },
        ].map(s => (
          <div key={s.label} className="mk-stat">
            <div className="mk-stat-num">{s.num}</div>
            <div className="mk-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Services */}
      <section id="mk-palvelut" className="mk-section">
        <div className="mk-section-label">Mitä teemme</div>
        <h2>Palvelumme</h2>
        <p className="mk-section-sub">
          Toteutamme rakennusprojektit avaimet käteen -periaatteella.
          Ota yhteyttä ja kerro tarpeestasi — tarjous on aina maksuton.
        </p>
        <div className="mk-services-grid">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              ),
              title: 'Uudisrakentaminen',
              desc: 'Omakotitalot, rivitalot ja kerrostalot. Suunnittelusta rakennuslupaan ja avainten luovutukseen.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              ),
              title: 'Saneeraukset',
              desc: 'Kylpyhuone-, keittiö- ja julkisivuremontit. Putki-, sähkö- ja pintaremontit koordinoidusti.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M4.22 4.22l2.83 2.83m9.9 9.9 2.83 2.83M2 12h4m12 0h4M4.22 19.78l2.83-2.83m9.9-9.9 2.83-2.83"/>
                </svg>
              ),
              title: 'Pihatyöt',
              desc: 'Pihasuunnittelu ja toteutus, maanrakennus, terassit ja carportit. Kaunis piha nostaa kiinteistön arvoa.',
            },
          ].map(s => (
            <div key={s.title} className="mk-service-card">
              <div className="mk-service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="mk-referenssit" className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-section-label">Referenssit</div>
        <h2>Aiempia töitä</h2>
        <p className="mk-section-sub">
          Olemme toteuttaneet yli 250 rakennusprojektia ympäri Suomea.
          Jokainen kohde on tehty samalla huolellisuudella.
        </p>
        <div className="mk-projects-grid">
          {[
            { title: 'Omakotitalo, Tampere', desc: '165 m² · 2024 · Uudisrakentaminen', bg: 'linear-gradient(135deg,#0f2044 0%,#1e3a6e 50%,#2563eb22 100%)' },
            { title: 'Kylpyhuoneremontti, Helsinki', desc: '14 m² · 2024 · Saneeraus', bg: 'linear-gradient(135deg,#0a1628 0%,#1d3461 50%,#3b82f620 100%)' },
            { title: 'Pihaprojekti, Pirkkala', desc: '800 m² · 2023 · Pihatyö', bg: 'linear-gradient(135deg,#0d1b33 0%,#1a3a6b 50%,#60a5fa18 100%)' },
          ].map(p => (
            <div key={p.title} className="mk-project">
              <div className="mk-project-img" style={{ background: p.bg }}>
                <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.15 }} viewBox="0 0 300 180" aria-hidden>
                  <rect x="30" y="80" width="100" height="90" fill="none" stroke="white" strokeWidth="1.5"/>
                  <polygon points="80,40 130,80 30,80" fill="none" stroke="white" strokeWidth="1.5"/>
                  <rect x="160" y="100" width="110" height="70" fill="none" stroke="white" strokeWidth="1.5"/>
                  <polygon points="215,55 270,100 160,100" fill="none" stroke="white" strokeWidth="1.5"/>
                  <line x1="0" y1="170" x2="300" y2="170" stroke="white" strokeWidth="1"/>
                </svg>
              </div>
              <div className="mk-project-info">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="mk-yhteystiedot" className="mk-section" style={{ background: 'rgba(37,99,235,0.04)', borderTop: '1px solid rgba(59,130,246,0.1)' }}>
        <div className="mk-section-label">Ota yhteyttä</div>
        <h2>Pyydä tarjous</h2>
        <p className="mk-section-sub">
          Tarjouspyyntö on täysin maksuton ja sitoumukseton.
          Vastaamme yleensä saman päivän aikana.
        </p>
        <div className="mk-contact">
          <form className="mk-form" onSubmit={e => e.preventDefault()}>
            <input className="mk-input" type="text" placeholder="Nimesi" />
            <input className="mk-input" type="email" placeholder="Sähköpostiosoite" />
            <input className="mk-input" type="tel" placeholder="Puhelinnumero" />
            <textarea className="mk-textarea" placeholder="Kerro projektistasi — mitä haluat rakentaa tai remontata?" />
            <button type="submit" className="mk-btn-primary" style={{ alignSelf: 'flex-start' }}>
              Lähetä tarjouspyyntö →
            </button>
          </form>

          <div className="mk-contact-info">
            {[
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.87h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.3a16 16 0 0 0 6 6l.92-1.04a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                label: 'Puhelin',
                value: '040 123 4567',
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                label: 'Sähköposti',
                value: 'info@makinen-rakennus.fi',
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                label: 'Sijainti',
                value: 'Ratapihankatu 8, 33100 Tampere',
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                label: 'Aukioloajat',
                value: 'Ma–Pe 7.30–16.00',
              },
            ].map(item => (
              <div key={item.label} className="mk-contact-item">
                <div className="mk-contact-icon">{item.icon}</div>
                <div>
                  <h4>{item.label}</h4>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mk-footer">
        <span className="mk-footer-copy">© 2026 Rakennusliike Mäkinen Oy · Y-tunnus 1234567-8</span>
        <div className="mk-footer-links">
          <a href="#">Tietosuoja</a>
          <a href="#">Evästeet</a>
          <a href="#">Saavutettavuus</a>
        </div>
      </footer>

    </div>
  )
}
