import './LaineDemo.css'

const treatments = [
  {
    title: 'Perusfysioterapia',
    desc: 'Yksilöllinen tutkiminen ja hoito tuki- ja liikuntaelimistön vaivoihin. Kotiharjoitteluohjeet mukaan.',
    price: '65 € / 45 min',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4.5 12.5l7 7 10-11"/>
      </svg>
    ),
  },
  {
    title: 'Urheilufysioterapia',
    desc: 'Urheiluvammojen hoito ja palautumisen optimointi. Soveltuu kaiken tasoisille urheilijoille.',
    price: '75 € / 45 min',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    title: 'Hieronta',
    desc: 'Klassinen hieronta lihasjännityksen lievittämiseen. Rentouttava ja palauttava kokemus.',
    price: '60 € / 60 min',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    title: 'Kotikäynti',
    desc: 'Fysioterapia kotonasi. Ihanteellinen liikuntarajoitteisille tai toipilaille. Tampereen alue.',
    price: '90 € / 45 min',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
]

export function LaineDemo() {
  return (
    <div className="ft">

      {/* Nav */}
      <nav className="ft-nav">
        <div className="ft-logo">
          <span className="ft-logo-main">Fysioterapia Laine</span>
          <span className="ft-logo-sub">Kaisa Laine · ft, OMT</span>
        </div>
        <div className="ft-nav-links">
          <a href="#ft-hoidot">Hoidot</a>
          <a href="#ft-hinnasto">Hinnat</a>
          <a href="#ft-sijainti">Sijainti</a>
          <a href="#ft-sijainti" className="ft-nav-cta">Varaa aika</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="ft-hero">
        <div className="ft-hero-pattern" aria-hidden />

        {/* Right visual */}
        <div className="ft-hero-visual" aria-hidden>
          <svg width="380" height="480" viewBox="0 0 380 480" fill="none">
            <circle cx="190" cy="240" r="180" fill="rgba(16,185,129,0.06)"/>
            <circle cx="190" cy="240" r="140" fill="rgba(16,185,129,0.06)"/>
            <circle cx="190" cy="240" r="100" fill="rgba(16,185,129,0.08)"/>
            {/* Stylised figure */}
            <circle cx="190" cy="120" r="36" fill="rgba(16,185,129,0.18)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5"/>
            <path d="M155 200 Q190 175 225 200 L240 320 Q190 340 140 320 Z" fill="rgba(16,185,129,0.14)" stroke="rgba(16,185,129,0.35)" strokeWidth="1.5"/>
            <path d="M140 320 Q120 380 110 420" stroke="rgba(16,185,129,0.3)" strokeWidth="8" strokeLinecap="round"/>
            <path d="M240 320 Q260 380 270 420" stroke="rgba(16,185,129,0.3)" strokeWidth="8" strokeLinecap="round"/>
            <path d="M155 210 Q130 260 115 300" stroke="rgba(16,185,129,0.3)" strokeWidth="8" strokeLinecap="round"/>
            <path d="M225 210 Q250 260 265 300" stroke="rgba(16,185,129,0.3)" strokeWidth="8" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="ft-hero-content">
          <div className="ft-hero-badge">Vastaanotto Helsinki &amp; Etänä</div>
          <h1>
            Ammattimaista<br />
            <em>fysioterapiaa</em>
          </h1>
          <p className="ft-hero-sub">
            Yksilöllinen hoito, nopea toipuminen. Kaisa Laine on kokenut
            fysioterapeutti ja OMT-fysioterapeutti.
          </p>
          <div className="ft-hero-btns">
            <a href="#ft-sijainti" className="ft-btn-primary">Varaa aika</a>
            <a href="#ft-hoidot" className="ft-btn-outline">Katso hoidot</a>
          </div>
          <div className="ft-trust-row">
            {[
              'Kela-korvattava hoito',
              'Sähköinen ajanvaraus',
              'Alle 2 vrk odotusaika',
            ].map(t => (
              <span key={t} className="ft-trust-item">
                <svg className="ft-trust-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="ft-stats">
        {[
          { num: '12 v', label: 'Kokemus' },
          { num: '2000+', label: 'Asiakasta' },
          { num: '4.9★', label: 'Arvio' },
          { num: '< 2 vrk', label: 'Odotusaika' },
        ].map(s => (
          <div key={s.label} className="ft-stat">
            <div className="ft-stat-num">{s.num}</div>
            <div className="ft-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Treatments */}
      <section id="ft-hoidot" className="ft-section">
        <span className="ft-section-label">Hoidot</span>
        <h2>Mitä tarjoamme</h2>
        <p className="ft-section-sub">
          Jokainen hoito räätälöidään sinulle henkilökohtaisesti.
          Ensikäynnillä tehdään aina perusteellinen tutkimus.
        </p>
        <div className="ft-treatments">
          {treatments.map(t => (
            <div key={t.title} className="ft-treatment-card">
              <div className="ft-treatment-icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <span className="ft-treatment-price">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                {t.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="ft-section" style={{ background: '#f0faf4', borderTop: '1px solid rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
        <div className="ft-about">
          <div className="ft-about-card">
            <div className="ft-about-photo">
              <svg width="100" height="120" viewBox="0 0 100 120" fill="none" aria-hidden>
                <circle cx="50" cy="38" r="28" fill="rgba(16,185,129,0.25)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5"/>
                <path d="M15 110 Q15 78 50 78 Q85 78 85 110" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="ft-about-card-body">
              <div className="ft-about-name">Kaisa Laine</div>
              <div className="ft-about-title">ft, OMT · 12 vuoden kokemus</div>
            </div>
          </div>

          <div className="ft-about-text">
            <h3>Kokenut ammattilainen sinun tueksesi</h3>
            <p>
              Olen valmistunut fysioterapeutiksi Metropolia AMK:sta vuonna 2012 ja
              suorittanut OMT-erikoistumisen (ortopedinen manuaalinen terapia) 2016.
              Olen kouluttautunut jatkuvasti pitääkseni osaamiseni ajan tasalla.
            </p>
            <p>
              Minulle on tärkeää, että jokainen asiakas saa yksilöllisen ja perusteellisen
              hoidon. Kuuntelen, tutkin ja hoidan — ei pikareseptejä. Uskon, että paras
              tulos syntyy yhdistämällä laadukas manuaalinen terapia ja harjoittelun ohjaus.
            </p>
            <div className="ft-credentials">
              {['ft, OMT', 'McKenzie', 'Pilates', 'Kinesiotaping', 'Kela-hyväksytty'].map(c => (
                <span key={c} className="ft-credential">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="ft-hinnasto" className="ft-section">
        <span className="ft-section-label">Hinnasto</span>
        <h2>Selkeät hinnat</h2>
        <p className="ft-section-sub">
          Kaikki hinnat sisältävät alv. Kela-korvausta voi hakea jälkikäteen
          omavastuun ylittäville käynneille.
        </p>
        <div className="ft-pricing-grid">
          {[
            { name: 'Perusfysioterapia', dur: '45 min', price: '65 €' },
            { name: 'Urheilufysioterapia', dur: '45 min', price: '75 €' },
            { name: 'Hieronta', dur: '60 min', price: '60 €' },
            { name: 'Kotikäynti', dur: '45 min + matka', price: '90 €' },
            { name: 'Etäkonsultaatio', dur: '30 min', price: '45 €' },
            { name: 'Harjoitteluohjelma', dur: 'Yksilöllinen', price: '35 €' },
          ].map(p => (
            <div key={p.name} className="ft-price-card">
              <div>
                <div className="ft-price-card-name">{p.name}</div>
                <div className="ft-price-card-dur">{p.dur}</div>
              </div>
              <div className="ft-price-card-val">{p.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact + Location */}
      <section id="ft-sijainti" className="ft-section" style={{ background: '#f0faf4', borderTop: '1px solid rgba(16,185,129,0.1)' }}>
        <span className="ft-section-label">Yhteystiedot</span>
        <h2>Varaa aika</h2>
        <p className="ft-section-sub">
          Täytä alla oleva lomake tai soita suoraan. Vahvistus tulee sähköpostiin.
        </p>

        <div className="ft-contact-grid">
          <form className="ft-form" onSubmit={e => e.preventDefault()}>
            <input className="ft-input" type="text" placeholder="Etunimi ja sukunimi" />
            <input className="ft-input" type="email" placeholder="Sähköpostiosoite" />
            <input className="ft-input" type="tel" placeholder="Puhelinnumero" />
            <select className="ft-select">
              <option value="">Valitse hoito...</option>
              <option>Perusfysioterapia</option>
              <option>Urheilufysioterapia</option>
              <option>Hieronta</option>
              <option>Kotikäynti</option>
            </select>
            <textarea className="ft-textarea" placeholder="Lisätietoja vaivoistasi (valinnainen)" />
            <button type="submit" className="ft-btn-primary" style={{ alignSelf:'flex-start' }}>
              Lähetä ajanvaraus →
            </button>
          </form>

          <div>
            <div className="ft-map-placeholder">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden>
                <path d="M40 8a24 24 0 0 1 24 24c0 18-24 40-24 40S16 50 16 32A24 24 0 0 1 40 8z" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5"/>
                <circle cx="40" cy="32" r="8" fill="rgba(16,185,129,0.35)" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5"/>
              </svg>
            </div>

            <div className="ft-contact-details">
              {[
                { label: 'Osoite', val: 'Mannerheimintie 12, Helsinki' },
                { label: 'Puhelin', val: '050 234 5678' },
                { label: 'Sähköposti', val: 'kaisa@fysioterapialaine.fi' },
                { label: 'Aukiolo', val: 'Ma–Pe 08–18, La 09–14' },
              ].map(r => (
                <div key={r.label} className="ft-contact-row">
                  <strong>{r.label}</strong>
                  <span>{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ft-footer">
        <span className="ft-footer-logo">Fysioterapia Laine · Kaisa Laine ft, OMT</span>
        <span className="ft-footer-copy">© 2026 · Mannerheimintie 12, Helsinki · Y-tunnus 2345678-9</span>
      </footer>

    </div>
  )
}
